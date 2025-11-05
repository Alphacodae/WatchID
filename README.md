# WatchID - AI-Powered Content Access Management System

WatchID is an AI-driven content access system for age-restricted media that uses facial recognition and age detection to restrict or allow movie access based on detected viewer age.

## 🎯 Project Overview

WatchID combines modern web technologies with AI to create an intelligent content management system that:
- Detects viewer faces using computer vision
- Estimates age from facial features
- Restricts or grants access to age-appropriate content
- Provides a seamless user experience for content browsing and access

## 🏗️ Architecture

This is a full-stack application with three main components:

### Frontend (Angular)
- **Technology**: Angular
- **Status**: Completed (simulated UI)
- **Location**: `/frontend`
- **Purpose**: User interface for content browsing and access management

### Backend (Spring Boot)
- **Technology**: Spring Boot + Java
- **Status**: In Development
- **Location**: `/backend`
- **Database**: MySQL (production), H2 (dev/testing)
- **Purpose**: REST API, business logic, and data management

### AI Service (Python + OpenCV)
- **Technology**: Python + OpenCV
- **Status**: Future Development
- **Location**: `/ai-service`
- **Purpose**: Face detection and age estimation

## 📁 Repository Structure

```
WatchID/
├── backend/                 # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/watchid/
│   │   │   │       ├── controller/    # REST controllers
│   │   │   │       ├── service/       # Business logic
│   │   │   │       ├── model/         # Entity models
│   │   │   │       ├── repository/    # Data access layer
│   │   │   │       ├── config/        # Configuration
│   │   │   │       ├── dto/           # Data transfer objects
│   │   │   │       └── WatchIdApplication.java
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       └── application-dev.yml
│   │   └── test/
│   └── pom.xml
│
├── frontend/                # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   └── environments/
│   ├── angular.json
│   └── package.json
│
├── ai-service/             # Python AI service
│   ├── src/
│   │   ├── face_detection/
│   │   ├── age_estimation/
│   │   └── api/
│   ├── models/             # Trained models
│   ├── requirements.txt
│   └── README.md
│
├── docker/                 # Docker configurations
│   ├── backend.Dockerfile
│   ├── frontend.Dockerfile
│   ├── ai-service.Dockerfile
│   └── docker-compose.yml
│
├── docs/                   # Documentation
│   ├── ARCHITECTURE.md
│   ├── API.md
│   └── SETUP.md
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── .gitignore
├── LICENSE
├── README.md
└── CONTRIBUTING.md
```

## 🚀 Quick Start

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- Python 3.8 or higher
- MySQL 8.0 or higher (for production)
- Docker (optional, for containerization)

### Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend API will be available at `http://localhost:8080`

### Frontend Setup

```bash
cd frontend
npm install
ng serve
```

The frontend will be available at `http://localhost:4200`

### AI Service Setup (Future)

```bash
cd ai-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python src/api/main.py
```

The AI service will be available at `http://localhost:5000`

## 🔧 Configuration

### Backend Configuration

The backend uses Spring profiles:
- `dev`: Development mode with H2 in-memory database
- `prod`: Production mode with MySQL database

Configuration files:
- `backend/src/main/resources/application.yml` - Main configuration
- `backend/src/main/resources/application-dev.yml` - Development profile
- `backend/src/main/resources/application-prod.yml` - Production profile

### Database Setup

For development, H2 database is used automatically. For production:

```sql
CREATE DATABASE watchid;
CREATE USER 'watchid_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON watchid.* TO 'watchid_user'@'localhost';
FLUSH PRIVILEGES;
```

## 🐳 Docker Deployment

Build and run all services using Docker Compose:

```bash
docker-compose -f docker/docker-compose.yml up --build
```

## 📚 API Documentation

Once the backend is running, access the API documentation at:
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI Spec: `http://localhost:8080/v3/api-docs`

## 🧪 Testing

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
pytest
```

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

- [x] Project structure setup
- [ ] Backend API development
  - [ ] User management
  - [ ] Content management
  - [ ] Access control logic
- [ ] Frontend UI implementation
  - [ ] Content browsing
  - [ ] Camera integration
  - [ ] Access request flow
- [ ] AI Service development
  - [ ] Face detection module
  - [ ] Age estimation model
  - [ ] API integration
- [ ] Integration testing
- [ ] Deployment setup
- [ ] Performance optimization

## 👥 Authors

* **Alphacodae** - *Initial work*

## 🙏 Acknowledgments

- OpenCV community for face detection resources
- Spring Boot documentation and community
- Angular framework team
