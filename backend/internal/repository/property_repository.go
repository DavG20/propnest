package repository

import (
	"errors"

	"github.com/DavG20/propnest-backend/internal/models"
	"gorm.io/gorm"
)

type PropertyRepository interface {
	CreateProperty(property *models.Property, userID int) error
	GetPropertyByID(id int) (*models.Property, error)
	ListProperties() ([]models.Property, error)
	GetPropertiesByUserID(userID int) ([]models.Property, error)
	UpdateProperty(property *models.Property) error
	DeleteProperty(id int) error
}

type propertyRepository struct {
	db *gorm.DB
}

func NewPropertyRepository(db *gorm.DB) PropertyRepository {
	return &propertyRepository{db: db}
}

func (r *propertyRepository) CreateProperty(property *models.Property, userID int) error {
	return r.db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(property).Error; err != nil {
			return err
		}

		association := models.PropertyUser{
			PropertyID: property.ID,
			UserID:     userID,
		}

		if err := tx.Create(&association).Error; err != nil {
			return err
		}

		return nil
	})
}

func (r *propertyRepository) GetPropertyByID(id int) (*models.Property, error) {
	var property models.Property
	err := r.db.Preload("UserAssociation.User").First(&property, id).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &property, nil
}

func (r *propertyRepository) ListProperties() ([]models.Property, error) {
	var properties []models.Property
	err := r.db.Preload("UserAssociation.User").Find(&properties).Error
	return properties, err
}

func (r *propertyRepository) GetPropertiesByUserID(userID int) ([]models.Property, error) {
	var properties []models.Property
	err := r.db.Joins("JOIN property_users ON property_users.property_id = properties.id").
		Where("property_users.user_id = ?", userID).
		Preload("UserAssociation.User").
		Find(&properties).Error
	return properties, err
}

func (r *propertyRepository) UpdateProperty(property *models.Property) error {
	return r.db.Save(property).Error
}

func (r *propertyRepository) DeleteProperty(id int) error {
	return r.db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Where("property_id = ?", id).Delete(&models.PropertyUser{}).Error; err != nil {
			return err
		}
		return tx.Delete(&models.Property{}, id).Error
	})
}
