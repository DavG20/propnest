package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/DavG20/propnest-backend/internal/dto"
	"github.com/DavG20/propnest-backend/internal/middleware"
	"github.com/DavG20/propnest-backend/internal/service"
	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v5"
)

type PropertyHandler struct {
	propertyService service.PropertyService
	validate        *validator.Validate
}

func NewPropertyHandler(service service.PropertyService) *PropertyHandler {
	return &PropertyHandler{
		propertyService: service,
		validate:        validator.New(),
	}
}

func (h *PropertyHandler) CreateProperty(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	claims := r.Context().Value(middleware.UserContextKey).(jwt.MapClaims)
	userID := int(claims["user_id"].(float64))

	var req dto.CreatePropertyRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if err := h.validate.Struct(req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	resp, err := h.propertyService.CreateProperty(&req, userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

func (h *PropertyHandler) ListProperties(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	properties, err := h.propertyService.GetAllProperties()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(properties)
}

func (h *PropertyHandler) GetProperty(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	idStr := r.URL.Query().Get("id")
	if idStr == "" {
		// Try to get from path if using a router that supports it, 
		// but here we use a simple mux, so we might need to parse the path or use query.
		// For simplicity, let's use query param ?id=X
		http.Error(w, "ID is required", http.StatusBadRequest)
		return
	}

	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	property, err := h.propertyService.GetPropertyByID(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if property == nil {
		http.Error(w, "Property not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(property)
}

func (h *PropertyHandler) GetMyProperties(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	claims := r.Context().Value(middleware.UserContextKey).(jwt.MapClaims)
	userID := int(claims["user_id"].(float64))

	properties, err := h.propertyService.GetPropertiesByUserID(userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(properties)
}
