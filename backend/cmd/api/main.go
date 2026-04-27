package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/DavG20/propnest-backend/internal/config"
	"github.com/DavG20/propnest-backend/internal/handlers"
	"github.com/DavG20/propnest-backend/internal/mailer"
	"github.com/DavG20/propnest-backend/internal/middleware"
	"github.com/DavG20/propnest-backend/internal/repository"
	"github.com/DavG20/propnest-backend/internal/service"
	"github.com/DavG20/propnest-backend/pkg/database"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, relying on system environment variables")
	}

	cfg := config.LoadConfig()

	// Initialize Database
	if err := database.InitDB(cfg); err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}

	// Initialize Repository, Service, and Handlers
	userRepo := repository.NewUserRepository(database.DB)
	tokenRepo := repository.NewUserTokenRepository(database.DB)
	resetRepo := repository.NewPasswordResetRepository(database.DB)

	m := mailer.New(mailer.Config{
		Host:     cfg.SMTPHost,
		Port:     cfg.SMTPPort,
		Username: cfg.SMTPUsername,
		Password: cfg.SMTPPassword,
		From:     cfg.SMTPFrom,
	})

	authService := service.NewAuthService(userRepo, tokenRepo, resetRepo, m, []byte(cfg.JWTSecret), cfg.AppURL)
	authHandler := handlers.NewAuthHandler(authService)

	propertyRepo := repository.NewPropertyRepository(database.DB)
	propertyService := service.NewPropertyService(propertyRepo)
	propertyHandler := handlers.NewPropertyHandler(propertyService)

	authMiddleware := middleware.AuthMiddleware(tokenRepo, []byte(cfg.JWTSecret))

	mux := http.NewServeMux()
	setupRoutes(mux, authHandler, propertyHandler, authMiddleware)

	// Simple CORS middleware
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		allowedOrigins := strings.Split(cfg.AllowedOrigins, ",")
		
		isAllowed := false
		for _, o := range allowedOrigins {
			if o == origin {
				isAllowed = true
				break
			}
		}

		if isAllowed {
			w.Header().Set("Access-Control-Allow-Origin", origin)
		} else {
			// Fallback to first allowed if not matched
			if len(allowedOrigins) > 0 {
				w.Header().Set("Access-Control-Allow-Origin", allowedOrigins[0])
			}
		}
		
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		mux.ServeHTTP(w, r)
	})

	port := ":8080"
	fmt.Printf("Starting Propnest backend server on %s\n", port)
	if err := http.ListenAndServe(port, handler); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
