package service

import (
	"errors"
	"github.com/DavG20/propnest-backend/internal/auth"
	"github.com/DavG20/propnest-backend/internal/models"
	"github.com/DavG20/propnest-backend/internal/repository"
)

type AuthService interface {
	Register(name, email, password string, role models.Role) (int, error)
	Login(email, password string) (string, error)
}

type authService struct {
	repo      repository.UserRepository
	jwtSecret []byte
}

func NewAuthService(repo repository.UserRepository, secret []byte) AuthService {
	return &authService{repo: repo, jwtSecret: secret}
}

func (s *authService) Register(name, email, password string, role models.Role) (int, error) {
	// Validate role
	if role != models.RoleAdmin && role != models.RoleAgent && role != models.RoleClient {
		return 0, errors.New("invalid role provided")
	}

	// Check if user exists
	existingUser, err := s.repo.GetUserByEmail(email)
	if err != nil {
		return 0, err
	}
	if existingUser != nil {
		return 0, errors.New("user with this email already exists")
	}

	// Hash password
	hashedPassword, err := auth.HashPassword(password)
	if err != nil {
		return 0, err
	}

	// Save to DB
	return s.repo.CreateUser(name, email, hashedPassword, role)
}

func (s *authService) Login(email, password string) (string, error) {
	user, err := s.repo.GetUserByEmail(email)
	if err != nil {
		return "", err
	}
	if user == nil {
		return "", errors.New("invalid email or password")
	}

	// Check password
	if !auth.CheckPasswordHash(password, user.PasswordHash) {
		return "", errors.New("invalid email or password")
	}

	// Generate JWT
	token, err := auth.GenerateJWT(user.ID, user.Email, s.jwtSecret)
	if err != nil {
		return "", err
	}

	return token, nil
}
