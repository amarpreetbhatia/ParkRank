# Australian National Parks Voting App - Docker Deployment

Deploy the Australian National Parks Voting application on any VM or cloud platform using Docker.

## Quick Start

### Prerequisites
- Docker (version 20.10+)
- Docker Compose (version 2.0+)
- Git (for cloning the repository)

### Development Deployment

1. **Clone and Prepare**
   ```bash
   git clone <repository-url>
   cd australian-parks-voting
   chmod +x docker-scripts.sh
   ```

2. **Build the Application**
   ```bash
   # Option 1: Using the helper script
   ./docker-scripts.sh build
   
   # Option 2: Using Docker directly
   docker build -t nps-rank-app .
   ```

3. **Start Development Environment**
   ```bash
   # Option 1: Using the helper script
   ./docker-scripts.sh run
   
   # Option 2: Using Docker Compose directly
   docker-compose up -d
   ```

4. **Access Application**
   - Application: http://localhost:5000
   - Database: localhost:5432 (postgres/postgres)
   - Health Check: http://localhost:5000/api/statistics

### Troubleshooting Build Issues

If you encounter the error "Cannot find package 'vite'", this indicates a build configuration issue. The application has been fixed to properly separate development and production dependencies. Ensure you're using the latest Dockerfile.

**Build Verification:**
```bash
# Test build locally first
npm run build
ls -la dist/  # Should show built files

# Then build Docker image
docker build -t nps-rank-app .
```

### Production Deployment

1. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your production values:
   # - Set strong POSTGRES_PASSWORD
   # - Configure DATABASE_URL
   # - Set NODE_ENV=production
   ```

2. **Deploy Production Stack**
   ```bash
   ./docker-scripts.sh prod
   ```

3. **Verify Deployment**
   ```bash
   curl http://localhost:5000/api/statistics
   ```

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Nginx       │    │    App Server   │    │   PostgreSQL    │
│  (Reverse Proxy)│────│   (Node.js)     │────│   (Database)    │
│     Port 80     │    │    Port 5000    │    │    Port 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Docker Services

### Application Container
- **Base Image**: node:18-alpine
- **Multi-stage Build**: Optimized for production
- **Security**: Non-root user, read-only filesystem
- **Health Checks**: Built-in health monitoring

### Database Container
- **Image**: postgres:15-alpine
- **Persistent Storage**: Docker volume
- **Initialization**: Automatic database setup

### Nginx Container (Optional)
- **Load Balancing**: Reverse proxy to app
- **Security Headers**: XSS protection, CSRF mitigation
- **Rate Limiting**: API endpoint protection
- **SSL/TLS**: HTTPS support (configure certs)

## Management Commands

```bash
# Build image
./docker-scripts.sh build

# Start development
./docker-scripts.sh run

# Start production
./docker-scripts.sh prod

# View logs
./docker-scripts.sh logs

# Stop containers
./docker-scripts.sh stop

# Clean up
./docker-scripts.sh clean
```

## Environment Variables

### Required
```bash
DATABASE_URL=postgresql://user:password@host:5432/database
POSTGRES_PASSWORD=your_secure_password
```

### Optional
```bash
POSTGRES_USER=postgres
POSTGRES_DB=nps_rank
NODE_ENV=production
PORT=5000
HOST=0.0.0.0
APP_PORT=5000
```

## Data Persistence

- **Database**: PostgreSQL data stored in `postgres_data` volume
- **Logs**: Application logs mounted to `./logs`
- **Backups**: Configure backup directory in production

## Security Features

### Container Security
- Non-root user execution
- Read-only root filesystem
- Minimal capabilities
- Security options: no-new-privileges

### Network Security
- Internal Docker network
- No exposed database ports in production
- Rate limiting on API endpoints
- Security headers (XSS, CSRF protection)

### Data Security
- Environment-based secrets
- Secure PostgreSQL configuration
- Optional SSL/TLS termination

## Monitoring & Health Checks

### Application Health
```bash
# Check application status
curl http://localhost:5000/api/statistics

# View container health
docker ps
```

### Logs
```bash
# Application logs
./docker-scripts.sh logs

# Database logs
docker-compose logs postgres

# All services
docker-compose logs
```

## Scaling & Production

### Horizontal Scaling
- Use Docker Swarm or Kubernetes
- Configure load balancer
- Database connection pooling

### Performance Optimization
- Enable Nginx gzip compression
- Configure database indexes
- Implement caching strategy

### Backup Strategy
```bash
# Database backup
docker exec nps-rank-db-prod pg_dump -U postgres nps_rank > backup.sql

# Restore database
docker exec -i nps-rank-db-prod psql -U postgres nps_rank < backup.sql
```

## Troubleshooting

### Common Issues

1. **Container Won't Start**
   ```bash
   # Check logs
   docker-compose logs app
   
   # Verify environment
   docker-compose config
   ```

2. **Database Connection Failed**
   ```bash
   # Check database status
   docker-compose ps postgres
   
   # Test connection
   docker exec nps-rank-db psql -U postgres -d nps_rank -c "SELECT 1;"
   ```

3. **Port Already in Use**
   ```bash
   # Change ports in docker-compose.yml
   ports:
     - "8080:5000"  # Use port 8080 instead
   ```

### Support

For issues and questions:
1. Check container logs: `./docker-scripts.sh logs`
2. Verify configuration: `docker-compose config`
3. Review environment variables in `.env`

## Updates

To update the application:
```bash
./docker-scripts.sh stop
git pull
./docker-scripts.sh build
./docker-scripts.sh run  # or prod
```