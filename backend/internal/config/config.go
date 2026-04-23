package config

import (
	"log"
	"os"
)

type Config struct {
	DBHost         string
	DBPort         string
	DBUser         string
	DBPassword     string
	DBName         string
	JWTSecret      string
	AllowedOrigins string
	// SMTP / email
	SMTPHost     string
	SMTPPort     string
	SMTPUsername string
	SMTPPassword string
	SMTPFrom     string
	// Public app URL used to build password-reset links
	AppURL string
}

func LoadConfig() *Config {
	cfg := &Config{
		DBHost:         getEnvOrFatal("DB_HOST"),
		DBPort:         getEnvOrFatal("DB_PORT"),
		DBUser:         getEnvOrFatal("DB_USER"),
		DBPassword:     getEnvOrFatal("DB_PASSWORD"),
		DBName:         getEnvOrFatal("DB_NAME"),
		JWTSecret:      getEnvOrFatal("JWT_SECRET"),
		AllowedOrigins: getEnvOrDefault("ALLOWED_ORIGINS", "http://localhost:3000"),
		SMTPHost:       getEnvOrDefault("SMTP_HOST", "localhost"),
		SMTPPort:       getEnvOrDefault("SMTP_PORT", "1025"),
		SMTPUsername:   getEnvOrDefault("SMTP_USERNAME", ""),
		SMTPPassword:   getEnvOrDefault("SMTP_PASSWORD", ""),
		SMTPFrom:       getEnvOrDefault("SMTP_FROM", "no-reply@propnest.com"),
		AppURL:         getEnvOrDefault("APP_URL", "http://localhost:3000"),
	}
	return cfg
}

func getEnvOrFatal(key string) string {
	val := os.Getenv(key)
	if val == "" {
		log.Fatalf("Environment variable %s is required but not set", key)
	}
	return val
}

func getEnvOrDefault(key, defaultVal string) string {
	val := os.Getenv(key)
	if val == "" {
		return defaultVal
	}
	return val
}
