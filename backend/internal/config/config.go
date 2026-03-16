package config

import (
	"log"
	"os"
)

type Config struct {
	DBHost     string
	DBPort     string
	DBUser     string
	DBPassword string
	DBName     string
	JWTSecret  string
}

func LoadConfig() *Config {
	cfg := &Config{
		DBHost:     getEnvOrFatal("DB_HOST"),
		DBPort:     getEnvOrFatal("DB_PORT"),
		DBUser:     getEnvOrFatal("DB_USER"),
		DBPassword: getEnvOrFatal("DB_PASSWORD"),
		DBName:     getEnvOrFatal("DB_NAME"),
		JWTSecret:  getEnvOrFatal("JWT_SECRET"),
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
