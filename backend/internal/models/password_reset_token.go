package models

import "time"

type PasswordResetToken struct {
	ID        int       `gorm:"primaryKey"`
	UserID    int       `gorm:"not null;index"`
	Token     string    `gorm:"uniqueIndex;not null"`
	ExpiresAt time.Time `gorm:"not null"`
	Used      bool      `gorm:"not null;default:false"`
	CreatedAt time.Time
}
