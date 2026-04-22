package repository

import (
	"time"

	"github.com/DavG20/propnest-backend/internal/models"
	"gorm.io/gorm"
)

type UserTokenRepository interface {
	CreateToken(userID int, token string, expiresAt time.Time) error
	InvalidateToken(token string) error
	IsTokenActive(token string) (bool, error)
	InvalidateAllUserTokens(userID int) error
	DeleteExpiredTokens() error
}

type userTokenRepository struct {
	db *gorm.DB
}

func NewUserTokenRepository(db *gorm.DB) UserTokenRepository {
	return &userTokenRepository{db: db}
}

func (r *userTokenRepository) CreateToken(userID int, token string, expiresAt time.Time) error {
	ut := models.UserToken{
		UserID:    userID,
		Token:     token,
		ExpiresAt: expiresAt,
		IsActive:  true,
	}
	return r.db.Create(&ut).Error
}

func (r *userTokenRepository) InvalidateToken(token string) error {
	return r.db.Model(&models.UserToken{}).
		Where("token = ?", token).
		Update("is_active", false).Error
}

func (r *userTokenRepository) IsTokenActive(token string) (bool, error) {
	var ut models.UserToken
	err := r.db.Where("token = ? AND is_active = ? AND expires_at > ?", token, true, time.Now()).First(&ut).Error
	if err == gorm.ErrRecordNotFound {
		return false, nil
	}
	if err != nil {
		return false, err
	}
	return true, nil
}

func (r *userTokenRepository) InvalidateAllUserTokens(userID int) error {
	return r.db.Model(&models.UserToken{}).
		Where("user_id = ?", userID).
		Update("is_active", false).Error
}

func (r *userTokenRepository) DeleteExpiredTokens() error {
	return r.db.Where("expires_at < ?", time.Now()).Delete(&models.UserToken{}).Error
}
