package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/DavG20/propnest-backend/internal/config"
	"github.com/DavG20/propnest-backend/internal/handlers"
	"github.com/DavG20/propnest-backend/internal/middleware"
	"github.com/DavG20/propnest-backend/internal/models"
	"github.com/DavG20/propnest-backend/internal/repository"
	"github.com/DavG20/propnest-backend/internal/service"
	"github.com/DavG20/propnest-backend/pkg/database"
	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	"strings"
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

	// Run migrations for the new model
	database.DB.AutoMigrate(&models.UserToken{})

	// Initialize Repository, Service, and Handlers
	userRepo := repository.NewUserRepository(database.DB)
	tokenRepo := repository.NewUserTokenRepository(database.DB)
	authService := service.NewAuthService(userRepo, tokenRepo, []byte(cfg.JWTSecret))
	authHandler := handlers.NewAuthHandler(authService)

	authMiddleware := middleware.AuthMiddleware(tokenRepo, []byte(cfg.JWTSecret))

	mux := http.NewServeMux()

	mux.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status": "ok"}`))
	})

	// Auth routes
	mux.HandleFunc("/api/register", authHandler.Register)
	mux.HandleFunc("/api/login", authHandler.Login)
	mux.HandleFunc("/api/logout", authHandler.Logout)

	// Protected routes
	mux.Handle("/api/me", authMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		claims := r.Context().Value(middleware.UserContextKey).(jwt.MapClaims)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"user": claims,
		})
	})))

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
