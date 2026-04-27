package main

import (
	"encoding/json"
	"net/http"

	"github.com/DavG20/propnest-backend/internal/handlers"
	"github.com/DavG20/propnest-backend/internal/middleware"
	"github.com/golang-jwt/jwt/v5"
)

func setupRoutes(
	mux *http.ServeMux,
	authHandler *handlers.AuthHandler,
	propertyHandler *handlers.PropertyHandler,
	authMiddleware func(http.Handler) http.Handler,
) {
	mux.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status": "ok"}`))
	})

	// Auth routes
	mux.HandleFunc("/api/register", authHandler.Register)
	mux.HandleFunc("/api/login", authHandler.Login)
	mux.HandleFunc("/api/logout", authHandler.Logout)
	mux.HandleFunc("/api/forgot-password", authHandler.ForgotPassword)
	mux.HandleFunc("/api/reset-password", authHandler.ResetPassword)

	// Property routes (Public)
	mux.HandleFunc("/api/properties", propertyHandler.ListProperties)
	mux.HandleFunc("/api/properties/view", propertyHandler.GetProperty)

	// Protected routes
	mux.Handle("/api/me", authMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		claims := r.Context().Value(middleware.UserContextKey).(jwt.MapClaims)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"user": claims,
		})
	})))

	mux.Handle("/api/properties/create", authMiddleware(http.HandlerFunc(propertyHandler.CreateProperty)))
	mux.Handle("/api/properties/my", authMiddleware(http.HandlerFunc(propertyHandler.GetMyProperties)))
}
