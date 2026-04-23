package models

import "time"

type RealtorClient struct {
	ID        int       `json:"id" gorm:"primaryKey"`
	RealtorID int       `json:"realtor_id" gorm:"not null;index"`
	ClientID  int       `json:"client_id" gorm:"not null;index"`
	CreatedAt time.Time `json:"created_at"`

	// Relationships
	Realtor User `json:"realtor" gorm:"foreignKey:RealtorID"`
	Client  User `json:"client" gorm:"foreignKey:ClientID"`
}
