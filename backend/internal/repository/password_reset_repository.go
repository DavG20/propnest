package repository

import (
	"time"

	"github.com/DavG20/propnest-backend/internal/models"
	"gorm.io/gorm"
)

// PasswordResetRepository manages one-time password reset tokens.
type PasswordResetRepository interface {
	// CreateResetToken stores a new reset token for the given user.
	CreateResetToken(userID int, token string, expiresAt time.Time) error
	// GetResetToken fetches the token record if it exists and is not yet used.
	GetResetToken(token string) (*models.PasswordResetToken, error)
	// MarkTokenUsed marks a token as consumed so it cannot be reused.
	MarkTokenUsed(token string) error
	// DeleteExpiredTokens prunes rows whose expiry has passed.
	DeleteExpiredTokens() error
}

type passwordResetRepository struct {
	db *gorm.DB
}

func NewPasswordResetRepository(db *gorm.DB) PasswordResetRepository {
	return &passwordResetRepository{db: db}
}

func (r *passwordResetRepository) CreateResetToken(userID int, token string, expiresAt time.Time) error {
	row := models.PasswordResetToken{
		UserID:    userID,
		Token:     token,
		ExpiresAt: expiresAt,
		Used:      false,
	}
	return r.db.Create(&row).Error
}

func (r *passwordResetRepository) GetResetToken(token string) (*models.PasswordResetToken, error) {
	var row models.PasswordResetToken
	err := r.db.
		Where("token = ? AND used = false AND expires_at > ?", token, time.Now()).
		First(&row).Error
	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &row, nil
}

func (r *passwordResetRepository) MarkTokenUsed(token string) error {
	return r.db.Model(&models.PasswordResetToken{}).
		Where("token = ?", token).
		Update("used", true).Error
}

func (r *passwordResetRepository) DeleteExpiredTokens() error {
	return r.db.Where("expires_at < ?", time.Now()).
		Delete(&models.PasswordResetToken{}).Error
}
