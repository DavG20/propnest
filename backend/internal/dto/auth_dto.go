package dto

import "github.com/DavG20/propnest-backend/internal/models"

type RegisterRequest struct {
	Name     string      `json:"name"`
	Email    string      `json:"email"`
	Password string      `json:"password"`
	Role     models.Role `json:"role"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
