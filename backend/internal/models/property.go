package models

import (
	"time"
)

type Property struct {
	ID          int       `json:"id" gorm:"primaryKey"`
	Title       string    `json:"title" gorm:"not null"`
	Description string    `json:"description" gorm:"type:text"`
	Price       float64   `json:"price" gorm:"not null"`
	Location    string    `json:"location" gorm:"not null"`
	Beds        int       `json:"beds" gorm:"not null"`
	Baths       float32   `json:"baths" gorm:"not null"`
	Sqft        float64   `json:"sqft" gorm:"not null"`
	ImageUrl    string    `json:"image_url" gorm:"not null"`
	Badge       string    `json:"badge"`
	BadgeColor  string    `json:"badge_color" gorm:"default:'black'"`
	Status      string    `json:"status" gorm:"default:'active'"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`

	// Relationships
	UserAssociation *PropertyUser `json:"user_association" gorm:"foreignKey:PropertyID"`
}
