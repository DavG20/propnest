package service

import (
	"github.com/DavG20/propnest-backend/internal/dto"
	"github.com/DavG20/propnest-backend/internal/models"
	"github.com/DavG20/propnest-backend/internal/repository"
)

type PropertyService interface {
	CreateProperty(req *dto.CreatePropertyRequest, userID int) (*dto.PropertyResponse, error)
	GetAllProperties() ([]dto.PropertyResponse, error)
	GetPropertyByID(id int) (*dto.PropertyResponse, error)
	GetPropertiesByUserID(userID int) ([]dto.PropertyResponse, error)
}

type propertyService struct {
	repo repository.PropertyRepository
}

func NewPropertyService(repo repository.PropertyRepository) PropertyService {
	return &propertyService{repo: repo}
}

func (s *propertyService) CreateProperty(req *dto.CreatePropertyRequest, userID int) (*dto.PropertyResponse, error) {
	property := &models.Property{
		Title:       req.Title,
		Description: req.Description,
		Price:       req.Price,
		Location:    req.Location,
		Beds:        req.Beds,
		Baths:       req.Baths,
		Sqft:        req.Sqft,
		ImageUrl:    req.ImageUrl,
		Badge:       req.Badge,
		BadgeColor:  req.BadgeColor,
		Status:      "active",
	}

	if err := s.repo.CreateProperty(property, userID); err != nil {
		return nil, err
	}

	return s.mapToResponse(property), nil
}

func (s *propertyService) GetAllProperties() ([]dto.PropertyResponse, error) {
	properties, err := s.repo.ListProperties()
	if err != nil {
		return nil, err
	}

	responses := make([]dto.PropertyResponse, len(properties))
	for i, p := range properties {
		responses[i] = *s.mapToResponse(&p)
	}

	return responses, nil
}

func (s *propertyService) GetPropertyByID(id int) (*dto.PropertyResponse, error) {
	property, err := s.repo.GetPropertyByID(id)
	if err != nil {
		return nil, err
	}
	if property == nil {
		return nil, nil
	}

	return s.mapToResponse(property), nil
}

func (s *propertyService) GetPropertiesByUserID(userID int) ([]dto.PropertyResponse, error) {
	properties, err := s.repo.GetPropertiesByUserID(userID)
	if err != nil {
		return nil, err
	}

	responses := make([]dto.PropertyResponse, len(properties))
	for i, p := range properties {
		responses[i] = *s.mapToResponse(&p)
	}

	return responses, nil
}

func (s *propertyService) mapToResponse(p *models.Property) *dto.PropertyResponse {
	resp := &dto.PropertyResponse{
		ID:          p.ID,
		Title:       p.Title,
		Description: p.Description,
		Price:       p.Price,
		Location:    p.Location,
		Beds:        p.Beds,
		Baths:       p.Baths,
		Sqft:        p.Sqft,
		ImageUrl:    p.ImageUrl,
		Badge:       p.Badge,
		BadgeColor:  p.BadgeColor,
		Status:      p.Status,
		CreatedAt:   p.CreatedAt,
		UpdatedAt:   p.UpdatedAt,
	}

	if p.UserAssociation != nil {
		resp.Owner = &dto.UserDTO{
			ID:    p.UserAssociation.User.ID,
			Name:  p.UserAssociation.User.Name,
			Email: p.UserAssociation.User.Email,
			Role:  string(p.UserAssociation.User.Role),
		}
	}

	return resp
}
