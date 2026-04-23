package dto

import "github.com/DavG20/propnest-backend/internal/models"

type RegisterRequest struct {
	Name            string      `json:"name" validate:"required,min=2"`
	Email           string      `json:"email" validate:"required,email"`
	Password        string      `json:"password" validate:"required,min=6"`
	ConfirmPassword string      `json:"confirm_password" validate:"required,eqfield=Password"`
	Role            models.Role `json:"role" validate:"required,oneof=admin realtor buyer seller"`
}

type LoginRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

type LogoutRequest struct {
	Token string `json:"token" validate:"required"`
}

type ForgotPasswordRequest struct {
	Email string `json:"email" validate:"required,email"`
}

type ResetPasswordRequest struct {
	Token           string `json:"token" validate:"required"`
	Password        string `json:"password" validate:"required,min=6"`
	ConfirmPassword string `json:"confirm_password" validate:"required,eqfield=Password"`
}

type UserResponse struct {
	ID    int         `json:"id"`
	Name  string      `json:"name"`
	Email string      `json:"email"`
	Role  models.Role `json:"role"`
}

type LoginResponse struct {
	Token string       `json:"token"`
	User  UserResponse `json:"user"`
}

type LogoutResponse struct {
	Status bool `json:"status"`
}
