# Define variables
ENV_FILE := .env
COMPOSE_FILE := infrastructure/docker/docker-compose.yml
COMPOSE_FILE_DEVELOPMENT := infrastructure/docker/docker-compose.development.yml

FULL_COMPOSE_COMMAND := docker compose -f $(COMPOSE_FILE) -f $(COMPOSE_FILE_DEVELOPMENT) --env-file $(ENV_FILE)

# Default target to be executed if no target is specified
.DEFAULT_GOAL := help

# Help message
help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  dev-up       			Start the Docker containers"
	@echo "  dev-up-detached 		Start Docker containers in detached mode"
	@echo "  dev-logs     			Start Docker containers in watch log mode"
	@echo "  dev-stop     			Stop Docker containers"
	@echo "  dev-down     			Stop and remove Docker containers"
	@echo "  dev-build    			Build Docker images"

dev-up:
	$(FULL_COMPOSE_COMMAND) up

# Start Docker containers in detached mode
dev-up-detached:
	$(FULL_COMPOSE_COMMAND) up -d
	@echo "Containers started in detached mode. Run 'make dev-logs' to watch logs."

# Start Docker containers in watch log mode
dev-logs:
	$(FULL_COMPOSE_COMMAND) logs -f

# Stop containers
dev-stop:
	$(FULL_COMPOSE_COMMAND) stop

# Stop and remove containers
dev-down:
	$(FULL_COMPOSE_COMMAND) down

# Build Docker images
dev-build:
	$(FULL_COMPOSE_COMMAND) build
