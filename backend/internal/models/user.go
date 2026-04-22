package models

import (
	"time"
)

type Role string

const (
	RoleAdmin   Role = "admin"
	RoleRealtor Role = "realtor"
	RoleBuyer   Role = "buyer"
	RoleSeller  Role = "seller"
)

type User struct {
	ID           int       `json:"id" gorm:"primaryKey"`
	Name         string    `json:"name" gorm:"not null"`
	Email        string    `json:"email" gorm:"uniqueIndex;not null"`
	PasswordHash string    `json:"-" gorm:"not null"`
	Role         Role      `json:"role" gorm:"type:varchar(20);not null;default:'client'"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}
