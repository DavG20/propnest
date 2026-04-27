package database

import (
	"fmt"
	"log"
	"github.com/DavG20/propnest-backend/internal/config"
	"github.com/DavG20/propnest-backend/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB(cfg *config.Config) error {
	connStr := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=UTC",
		cfg.DBHost, cfg.DBUser, cfg.DBPassword, cfg.DBName, cfg.DBPort)

	var err error
	DB, err = gorm.Open(postgres.Open(connStr), &gorm.Config{})
	if err != nil {
		return fmt.Errorf("error opening database: %w", err)
	}

	log.Println("Successfully connected to the database via GORM")

	// Run migrations
	err = DB.AutoMigrate(
		&models.User{},
		&models.UserToken{},
		&models.PasswordResetToken{},
		&models.Property{},
		&models.PropertyUser{},
	)
	if err != nil {
		return fmt.Errorf("error migrating database: %w", err)
	}
	
	log.Println("Database AutoMigrate successful")

	return nil
}

