.PHONY: up down backend frontend stop

up: db backend frontend

down: stop
	docker-compose down

db:
	docker-compose up -d db

backend:
	cd backend && go run ./cmd/api & echo $$! > .backend.pid

frontend:
	cd frontend && npm run dev & echo $$! > .frontend.pid

stop:
	@if [ -f .backend.pid ]; then kill $$(cat .backend.pid) 2>/dev/null && rm .backend.pid || true; fi
	@if [ -f .frontend.pid ]; then kill $$(cat .frontend.pid) 2>/dev/null && rm .frontend.pid || true; fi
	@lsof -ti:8080 | xargs kill -9 2>/dev/null || true
	@lsof -ti:3000,3001 | xargs kill -9 2>/dev/null || true
