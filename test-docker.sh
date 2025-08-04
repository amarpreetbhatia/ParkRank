#!/bin/bash
# Test script for Docker deployment of Australian National Parks Voting App

set -e

echo "🐳 Testing Docker setup for Australian National Parks Voting App"
echo "============================================================"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is available
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed or not in PATH${NC}"
    echo "Please install Docker first: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed or not in PATH${NC}"
    echo "Please install Docker Compose first: https://docs.docker.com/compose/install/"
    exit 1
fi

echo -e "${GREEN}✅ Docker and Docker Compose are available${NC}"

# Check if build files exist
if [ ! -f "dist/index.js" ]; then
    echo -e "${YELLOW}⚠️  Build files not found. Running build...${NC}"
    npm run build
fi

echo -e "${GREEN}✅ Build files are ready${NC}"

# Test Docker build
echo -e "${YELLOW}🔨 Building Docker image...${NC}"
if docker build -t nps-rank-app-test .; then
    echo -e "${GREEN}✅ Docker image built successfully${NC}"
else
    echo -e "${RED}❌ Docker build failed${NC}"
    exit 1
fi

# Test Docker Compose configuration
echo -e "${YELLOW}🔍 Validating Docker Compose configuration...${NC}"
if docker-compose config > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Docker Compose configuration is valid${NC}"
else
    echo -e "${RED}❌ Docker Compose configuration has errors${NC}"
    docker-compose config
    exit 1
fi

# Create test environment file
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  Creating test .env file...${NC}"
    cat > .env << EOF
DATABASE_URL=postgresql://postgres:testpass123@localhost:5432/nps_rank
POSTGRES_USER=postgres
POSTGRES_PASSWORD=testpass123
POSTGRES_DB=nps_rank
NODE_ENV=production
PORT=5000
HOST=0.0.0.0
EOF
    echo -e "${GREEN}✅ Test .env file created${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Docker setup test completed successfully!${NC}"
echo ""
echo "Next steps:"
echo "1. Start the application: ./docker-scripts.sh run"
echo "2. Access the app at: http://localhost:5000"
echo "3. Check health: curl http://localhost:5000/api/statistics"
echo ""
echo "For production deployment:"
echo "1. Update .env with secure passwords"
echo "2. Run: ./docker-scripts.sh prod"
echo "3. Consider using docker-compose.prod.yml for enhanced security"