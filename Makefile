.PHONY: up down backend frontend

up: db backend frontend

down:
	docker-compose down

db:
	docker-compose up -d db

backend:
	cd backend && go run cmd/api/main.go &

frontend:
	cd frontend && npm run dev &
