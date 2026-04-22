package service

import (
	"errors"
	"time"

	"github.com/DavG20/propnest-backend/internal/auth"
	"github.com/DavG20/propnest-backend/internal/dto"
	"github.com/DavG20/propnest-backend/internal/models"
	"github.com/DavG20/propnest-backend/internal/repository"
)

type AuthService interface {
	Register(req *dto.RegisterRequest) (int, error)
	Login(req *dto.LoginRequest) (string, *models.User, error)
	Logout(req *dto.LogoutRequest) (bool, error)
}

type authService struct {
	repo       repository.UserRepository
	tokenRepo  repository.UserTokenRepository
	jwtSecret  []byte
}

func NewAuthService(repo repository.UserRepository, tokenRepo repository.UserTokenRepository, secret []byte) AuthService {
	return &authService{
		repo:      repo,
		tokenRepo: tokenRepo,
		jwtSecret: secret,
	}
}

func (s *authService) Register(req *dto.RegisterRequest) (int, error) {
	// Check if user exists
	existingUser, err := s.repo.GetUserByEmail(req.Email)
	if err != nil {
		return 0, err
	}
	if existingUser != nil {
		return 0, errors.New("user with this email already exists")
	}

	// Hash password
	hashedPassword, err := auth.HashPassword(req.Password)
	if err != nil {
		return 0, err
	}

	// Save to DB
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

	// Check password
	if !auth.CheckPasswordHash(req.Password, user.PasswordHash) {
		return "", nil, errors.New("invalid email or password")
	}

	// Generate JWT
	token, err := auth.GenerateJWT(user.ID, user.Email, s.jwtSecret)
	if err != nil {
		return "", nil, err
	}

	// Save token to whitelist (active by default)
	expiresAt := time.Now().Add(time.Hour * 24)
	err = s.tokenRepo.CreateToken(user.ID, token, expiresAt)
	if err != nil {
		return "", nil, err
	}

	return token, user, nil
}

func (s *authService) Logout(req *dto.LogoutRequest) (bool, error) {
	err := s.tokenRepo.InvalidateToken(req.Token)
	if err != nil {
		return false, err
	}
	return true, nil
}
