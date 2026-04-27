package models

import (
	"time"
)

type PropertyUser struct {
	PropertyID int       `json:"property_id" gorm:"primaryKey"`
	UserID     int       `json:"user_id" gorm:"not null;index"`
	CreatedAt  time.Time `json:"created_at"`

	// Relationships
	Property *Property `json:"property" gorm:"foreignKey:PropertyID"`
	User     User      `json:"user" gorm:"foreignKey:UserID"`
}
