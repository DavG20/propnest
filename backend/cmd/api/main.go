package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/DavG20/propnest-backend/internal/config"
	"github.com/DavG20/propnest-backend/internal/handlers"
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
	authService := service.NewAuthService(userRepo, []byte(cfg.JWTSecret))
	authHandler := handlers.NewAuthHandler(authService)

	mux := http.NewServeMux()

	mux.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status": "ok"}`))
	})

	// Auth routes
	mux.HandleFunc("/api/register", authHandler.Register)
	mux.HandleFunc("/api/login", authHandler.Login)

	port := ":8080"
	fmt.Printf("Starting Propnest backend server on %s\n", port)
	if err := http.ListenAndServe(port, mux); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
