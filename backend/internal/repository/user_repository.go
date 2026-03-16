package repository

import (
	"errors"

	"github.com/DavG20/propnest-backend/internal/models"
	"gorm.io/gorm"
)

type UserRepository interface {
	CreateUser(name, email, passwordHash string, role models.Role) (int, error)
	GetUserByEmail(email string) (*models.User, error)
}

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{db: db}
}

func (r *userRepository) CreateUser(name, email, passwordHash string, role models.Role) (int, error) {
	user := models.User{
		Name:         name,
		Email:        email,
		PasswordHash: passwordHash,
		Role:         role,
	}

	if err := r.db.Create(&user).Error; err != nil {
		return 0, err
	}
	return user.ID, nil
}

func (r *userRepository) GetUserByEmail(email string) (*models.User, error) {
	var user models.User
	err := r.db.Where("email = ?", email).First(&user).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil // No user found
	}

	if err != nil {
		return nil, err
	}

	return &user, nil
}
