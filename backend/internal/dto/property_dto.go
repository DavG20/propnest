package dto

import "time"

type CreatePropertyRequest struct {
	Title       string  `json:"title" validate:"required"`
	Description string  `json:"description"`
	Price       float64 `json:"price" validate:"required"`
	Location    string  `json:"location" validate:"required"`
	Beds        int     `json:"beds" validate:"required"`
	Baths       float32 `json:"baths" validate:"required"`
	Sqft        float64 `json:"sqft" validate:"required"`
	ImageUrl    string  `json:"image_url" validate:"required"`
	Badge       string  `json:"badge"`
	BadgeColor  string  `json:"badge_color"`
}

type PropertyResponse struct {
	ID          int       `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Price       float64   `json:"price"`
	Location    string    `json:"location"`
	Beds        int       `json:"beds"`
	Baths       float32   `json:"baths"`
	Sqft        float64   `json:"sqft"`
	ImageUrl    string    `json:"image_url"`
	Badge       string    `json:"badge"`
	BadgeColor  string    `json:"badge_color"`
	Status      string    `json:"status"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	Owner       *UserDTO  `json:"owner,omitempty"`
}

type UserDTO struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	Role  string `json:"role"`
}
