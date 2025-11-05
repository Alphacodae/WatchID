# WatchID Setup Guide

This guide will help you set up and run the WatchID application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Java Development Kit (JDK) 17 or higher**
   - Download from: https://adoptium.net/
   - Verify: `java -version`

2. **Node.js 16 or higher and npm**
   - Download from: https://nodejs.org/
   - Verify: `node --version` and `npm --version`

3. **Python 3.8 or higher**
   - Download from: https://www.python.org/
   - Verify: `python --version` or `python3 --version`

4. **Maven 3.6 or higher** (optional, included in project)
   - Download from: https://maven.apache.org/
   - Verify: `mvn --version`

5. **MySQL 8.0** (for production deployment)
   - Download from: https://dev.mysql.com/downloads/
   - Verify: `mysql --version`

6. **Docker and Docker Compose** (optional, for containerized deployment)
   - Download from: https://www.docker.com/
   - Verify: `docker --version` and `docker-compose --version`

## Quick Start

### Option 1: Manual Setup (Development)

#### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Build the project
mvn clean install

# Run the application (development mode with H2 database)
mvn spring-boot:run

# Backend will be available at http://localhost:8080
```

**Verify Backend:**
- Open http://localhost:8080/swagger-ui.html
- You should see the API documentation

#### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run the development server
npm start

# Frontend will be available at http://localhost:4200
```

**Verify Frontend:**
- Open http://localhost:4200
- You should see the WatchID welcome page

#### 3. AI Service Setup

```bash
# Navigate to ai-service directory
cd ai-service

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the service
python src/api/main.py

# AI Service will be available at http://localhost:5000
```

**Verify AI Service:**
```bash
curl http://localhost:5000/health
```

You should see:
```json
{
  "status": "healthy",
  "service": "WatchID AI Service",
  "version": "1.0.0"
}
```

### Option 2: Docker Deployment

This option runs all services in containers.

```bash
# From project root directory
cd docker

# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

**Services will be available at:**
- Frontend: http://localhost
- Backend API: http://localhost:8080
- AI Service: http://localhost:5000
- MySQL: localhost:3306

**Stop services:**
```bash
docker-compose down
```

**Stop services and remove volumes:**
```bash
docker-compose down -v
```

## Detailed Setup Instructions

### Backend Configuration

#### Development Mode (H2 Database)

The backend is pre-configured to use H2 in-memory database for development.

**Configuration:** `backend/src/main/resources/application-dev.yml`

**H2 Console Access:**
- URL: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:watchiddb`
- Username: `sa`
- Password: (empty)

#### Production Mode (MySQL Database)

1. **Create MySQL Database:**

```sql
CREATE DATABASE watchid;
CREATE USER 'watchid_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON watchid.* TO 'watchid_user'@'localhost';
FLUSH PRIVILEGES;
```

2. **Update Configuration:**

Edit `backend/src/main/resources/application-prod.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/watchid?useSSL=false&serverTimezone=UTC
    username: watchid_user
    password: your_password
```

3. **Run with Production Profile:**

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=prod
```

Or with environment variables:

```bash
export DB_USERNAME=watchid_user
export DB_PASSWORD=your_password
export JWT_SECRET=your-secure-secret-key
mvn spring-boot:run -Dspring-boot.run.profiles=prod
```

### Frontend Configuration

#### Environment Configuration

**Development:** `frontend/src/environments/environment.ts`
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

**Production:** `frontend/src/environments/environment.prod.ts`
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.watchid.com/api'
};
```

#### Build for Production

```bash
cd frontend
npm run build

# Output will be in frontend/dist/watchid-frontend
```

### AI Service Configuration

#### Environment Variables

Create a `.env` file in `ai-service/`:

```env
FLASK_ENV=development
MODEL_PATH=models/
PORT=5000
HOST=0.0.0.0
```

#### Adding Pre-trained Models

1. Download age estimation models
2. Place them in `ai-service/models/`
3. Update `ai-service/src/age_estimation/estimator.py` to load the models

## Testing

### Backend Tests

```bash
cd backend
mvn test
```

### Frontend Tests

```bash
cd frontend
npm test
```

### AI Service Tests

```bash
cd ai-service
source venv/bin/activate  # or venv\Scripts\activate on Windows
pytest tests/
```

## Common Issues and Solutions

### Backend Issues

**Issue:** Port 8080 already in use
```bash
# Solution: Change port in application.yml
server:
  port: 8081
```

**Issue:** Database connection failed
```bash
# Solution: Verify MySQL is running
sudo service mysql status  # Linux
brew services list          # Mac
# Or use H2 for development
```

### Frontend Issues

**Issue:** Port 4200 already in use
```bash
# Solution: Use a different port
ng serve --port 4201
```

**Issue:** Module not found errors
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### AI Service Issues

**Issue:** OpenCV import error
```bash
# Solution: Install system dependencies (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install -y libglib2.0-0 libsm6 libxext6 libxrender-dev libgomp1

# Or use headless version
pip install opencv-python-headless
```

**Issue:** Port 5000 already in use
```bash
# Solution: Change port
export PORT=5001
python src/api/main.py
```

## Development Workflow

### 1. Start Backend
```bash
cd backend
mvn spring-boot:run
```

### 2. Start Frontend
```bash
cd frontend
npm start
```

### 3. Start AI Service
```bash
cd ai-service
source venv/bin/activate
python src/api/main.py
```

### 4. Make Changes
- Backend: Edit Java files, Spring Boot will auto-reload
- Frontend: Edit TypeScript/HTML/CSS files, Angular will auto-reload
- AI Service: Edit Python files, restart the service manually

### 5. Test Changes
- Access frontend: http://localhost:4200
- Test API: http://localhost:8080/swagger-ui.html
- Test AI: http://localhost:5000/health

## Production Deployment

### Using Docker

```bash
# Build and deploy all services
cd docker
docker-compose -f docker-compose.yml up -d --build

# Check logs
docker-compose logs -f

# Scale services
docker-compose up -d --scale backend=3
```

### Manual Deployment

#### 1. Build Backend
```bash
cd backend
mvn clean package -DskipTests
# JAR file: target/watchid-backend-1.0.0-SNAPSHOT.jar
```

#### 2. Build Frontend
```bash
cd frontend
npm run build
# Files in: dist/watchid-frontend/
```

#### 3. Deploy Backend
```bash
java -jar -Dspring.profiles.active=prod target/watchid-backend-1.0.0-SNAPSHOT.jar
```

#### 4. Deploy Frontend
- Copy `dist/watchid-frontend/` to web server (Nginx/Apache)
- Configure reverse proxy to backend

#### 5. Deploy AI Service
```bash
cd ai-service
gunicorn -w 4 -b 0.0.0.0:5000 src.api.main:app
```

## Next Steps

1. **Explore the API**: http://localhost:8080/swagger-ui.html
2. **Browse the UI**: http://localhost:4200
3. **Read the Documentation**: 
   - [Architecture](ARCHITECTURE.md)
   - [API Documentation](API.md)
4. **Start Development**:
   - [Contributing Guidelines](../CONTRIBUTING.md)

## Getting Help

- Check the [README](../README.md) for project overview
- Review [Architecture](ARCHITECTURE.md) for system design
- See [API Documentation](API.md) for endpoint details
- Open an issue on GitHub for bugs or questions

## Useful Commands

### Backend
```bash
mvn clean install          # Build project
mvn spring-boot:run       # Run application
mvn test                  # Run tests
mvn package               # Create JAR file
```

### Frontend
```bash
npm install               # Install dependencies
npm start                 # Start dev server
npm test                  # Run tests
npm run build             # Build for production
ng generate component X   # Generate component
ng generate service X     # Generate service
```

### AI Service
```bash
pip install -r requirements.txt    # Install dependencies
python src/api/main.py             # Run service
pytest tests/                       # Run tests
pip freeze > requirements.txt      # Update requirements
```

### Docker
```bash
docker-compose up -d              # Start services
docker-compose down               # Stop services
docker-compose logs -f            # View logs
docker-compose ps                 # List containers
docker-compose restart backend    # Restart service
```
