#!/bin/bash
# Docker management scripts for Australian National Parks Voting App

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to build Docker image
docker_build() {
    print_status "Building Docker image for Australian National Parks Voting App..."
    docker build -t nps-rank-app .
    print_status "Docker image built successfully!"
}

# Function to run development environment
docker_run() {
    print_status "Starting development environment with Docker Compose..."
    docker-compose up -d
    print_status "Application is running at http://localhost:5000"
    print_status "Database is running at localhost:5432"
}

# Function to run production environment
docker_prod() {
    print_status "Starting production environment..."
    if [ ! -f .env ]; then
        print_warning "No .env file found. Creating from .env.example..."
        cp .env.example .env
        print_warning "Please edit .env file with your production values!"
        exit 1
    fi
    docker-compose -f docker-compose.prod.yml up -d
    print_status "Production environment is running!"
}

# Function to stop containers
docker_stop() {
    print_status "Stopping Docker containers..."
    docker-compose down
    docker-compose -f docker-compose.prod.yml down 2>/dev/null || true
    print_status "Containers stopped!"
}

# Function to view logs
docker_logs() {
    print_status "Showing application logs..."
    docker-compose logs -f app
}

# Function to clean up
docker_clean() {
    print_status "Cleaning up Docker resources..."
    docker-compose down -v
    docker system prune -f
    print_status "Cleanup completed!"
}

# Function to show help
show_help() {
    echo "Australian National Parks Voting App - Docker Management"
    echo ""
    echo "Usage: ./docker-scripts.sh [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  build     Build the Docker image"
    echo "  run       Start development environment"
    echo "  prod      Start production environment"
    echo "  stop      Stop all containers"
    echo "  logs      Show application logs"
    echo "  clean     Clean up Docker resources"
    echo "  help      Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./docker-scripts.sh build    # Build the image"
    echo "  ./docker-scripts.sh run      # Start development"
    echo "  ./docker-scripts.sh prod     # Start production"
    echo "  ./docker-scripts.sh logs     # View logs"
}

# Main script logic
case "$1" in
    build)
        docker_build
        ;;
    run)
        docker_run
        ;;
    prod)
        docker_prod
        ;;
    stop)
        docker_stop
        ;;
    logs)
        docker_logs
        ;;
    clean)
        docker_clean
        ;;
    help|--help|-h|"")
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        show_help
        exit 1
        ;;
esac