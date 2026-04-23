package service

import (
	"crypto/rand"
	"encoding/hex"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/DavG20/propnest-backend/internal/auth"
	"github.com/DavG20/propnest-backend/internal/dto"
	"github.com/DavG20/propnest-backend/internal/mailer"
	"github.com/DavG20/propnest-backend/internal/models"
	"github.com/DavG20/propnest-backend/internal/repository"
)

type AuthService interface {
	Register(req *dto.RegisterRequest) (int, error)
	Login(req *dto.LoginRequest) (string, *models.User, error)
	Logout(req *dto.LogoutRequest) (bool, error)
	ForgotPassword(req *dto.ForgotPasswordRequest) (bool, error)
	ResetPassword(req *dto.ResetPasswordRequest) (bool, error)
}

type authService struct {
	repo      repository.UserRepository
	tokenRepo repository.UserTokenRepository
	resetRepo repository.PasswordResetRepository
	mailer    mailer.Mailer
	jwtSecret []byte
	appURL    string
}

func NewAuthService(
	repo repository.UserRepository,
	tokenRepo repository.UserTokenRepository,
	resetRepo repository.PasswordResetRepository,
	m mailer.Mailer,
	secret []byte,
	appURL string,
) AuthService {
	return &authService{
		repo:      repo,
		tokenRepo: tokenRepo,
		resetRepo: resetRepo,
		mailer:    m,
		jwtSecret: secret,
		appURL:    appURL,
	}
}

func (s *authService) Register(req *dto.RegisterRequest) (int, error) {
	existingUser, err := s.repo.GetUserByEmail(req.Email)
	if err != nil {
		return 0, err
	}
	if existingUser != nil {
		return 0, errors.New("user with this email already exists")
	}

	if req.Password != req.ConfirmPassword {
		return 0, errors.New("password and confirm password do not match")
	}
	hashedPassword, err := auth.HashPassword(req.Password)
	if err != nil {
		return 0, err
	}

	return s.repo.CreateUser(req.Name, req.Email, hashedPassword, req.Role)
}

func (s *authService) Login(req *dto.LoginRequest) (string, *models.User, error) {
	user, err := s.repo.GetUserByEmail(req.Email)
	if err != nil {
		return "", nil, err
	}
	if user == nil {
		return "", nil, errors.New("invalid email or password")
	}

	if !auth.CheckPasswordHash(req.Password, user.PasswordHash) {
		return "", nil, errors.New("invalid email or password")
	}

	token, err := auth.GenerateJWT(user.ID, user.Email, s.jwtSecret)
	if err != nil {
		return "", nil, err
	}

	expiresAt := time.Now().Add(time.Hour * 24)
	if err = s.tokenRepo.CreateToken(user.ID, token, expiresAt); err != nil {
		return "", nil, err
	}

	return token, user, nil
}

func (s *authService) Logout(req *dto.LogoutRequest) (bool, error) {
	if err := s.tokenRepo.InvalidateToken(req.Token); err != nil {
		return false, err
	}
	return true, nil
}

func (s *authService) ForgotPassword(req *dto.ForgotPasswordRequest) (bool, error) {
	user, err := s.repo.GetUserByEmail(req.Email)
	if err != nil {
		return false, err
	}
	if user == nil {
		return false, nil
	}

	// Generate a 32-byte cryptographically random token
	b := make([]byte, 32)
	if _, err := rand.Read(b); err != nil {
		return false, err
	}
	token := hex.EncodeToString(b)

	expiresAt := time.Now().Add(time.Hour)
	if err := s.resetRepo.CreateResetToken(user.ID, token, expiresAt); err != nil {
		return false, err
	}

	resetURL := fmt.Sprintf("%s/reset-password?token=%s", s.appURL, token)
	log.Printf("[DEBUG] Password reset link for %s: %s", user.Email, resetURL)

	// Fire-and-forget: don't block the response on the email delivery
	go func() {
		_ = s.mailer.SendPasswordReset(user.Email, user.Name, resetURL)
	}()

	return true, nil
}
func (s *authService) ResetPassword(req *dto.ResetPasswordRequest) (bool, error) {
	row, err := s.resetRepo.GetResetToken(req.Token)
	if err != nil {
		return false, err
	}
	if row == nil {
		return false, errors.New("invalid or expired reset token")
	}
	if req.Password != req.ConfirmPassword {
		return false, errors.New("password and confirm password do not match")
	}
	newHash, err := auth.HashPassword(req.Password)
	if err != nil {
		return false, err
	}

	if err := s.repo.UpdatePasswordHash(row.UserID, newHash); err != nil {
		return false, err
	}

	if err := s.resetRepo.MarkTokenUsed(req.Token); err != nil {
		return false, err
	}
	_ = s.tokenRepo.InvalidateAllUserTokens(row.UserID)

	return true, nil
}
