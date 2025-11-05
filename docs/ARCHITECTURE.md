# WatchID Architecture

## Overview

WatchID is a three-tier application consisting of:
1. **Frontend**: Angular-based user interface
2. **Backend**: Spring Boot REST API
3. **AI Service**: Python-based face detection and age estimation

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User Interface                        │
│                     (Angular Frontend)                       │
│                         Port: 4200                           │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ HTTP/REST
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                      API Gateway                             │
│                   (Spring Boot Backend)                      │
│                         Port: 8080                           │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │ Controllers  │  │   Services   │  │  Repositories   │  │
│  └──────────────┘  └──────────────┘  └─────────────────┘  │
└─────────────┬───────────────────────────────┬──────────────┘
              │                                │
              │ HTTP                           │ JDBC
              │                                │
┌─────────────▼────────────┐    ┌─────────────▼──────────────┐
│      AI Service          │    │        Database            │
│  (Python + OpenCV)       │    │  (MySQL / H2)              │
│      Port: 5000          │    │      Port: 3306            │
└──────────────────────────┘    └────────────────────────────┘
```

## Component Details

### Frontend (Angular)

**Responsibilities:**
- User interface rendering
- Camera access for face capture
- Movie browsing and selection
- Display access decisions
- User authentication

**Key Technologies:**
- Angular 17
- TypeScript
- RxJS for reactive programming
- Angular HttpClient for API communication

**Communication:**
- REST API calls to backend
- WebSocket (future) for real-time updates

### Backend (Spring Boot)

**Responsibilities:**
- REST API endpoints
- Business logic
- Data persistence
- Authentication and authorization
- Integration with AI service

**Key Technologies:**
- Spring Boot 3.2
- Spring Data JPA
- Spring Security
- MySQL (production) / H2 (development)

**API Endpoints:**
```
Movies:
  GET    /api/movies           - List all movies
  GET    /api/movies/{id}      - Get movie details
  GET    /api/movies/age/{age} - Get age-appropriate movies
  POST   /api/movies           - Create movie (admin)
  PUT    /api/movies/{id}      - Update movie (admin)
  DELETE /api/movies/{id}      - Delete movie (admin)

Access Control:
  POST   /api/access/check     - Check access permissions
```

### AI Service (Python + OpenCV)

**Responsibilities:**
- Face detection in images
- Age estimation from facial features
- Image preprocessing
- Model inference

**Key Technologies:**
- Python 3.8+
- OpenCV
- Flask
- NumPy

**API Endpoints:**
```
  GET  /health        - Health check
  POST /detect-age    - Detect faces and estimate age
  POST /detect-faces  - Detect faces only
```

### Database

**Schema:**

**movies**
- id (PK)
- title
- description
- min_age
- genre
- duration
- poster_url
- trailer_url
- created_at
- updated_at

**users**
- id (PK)
- username
- email
- password (encrypted)
- full_name
- role
- enabled
- created_at
- updated_at

**access_logs**
- id (PK)
- user_id (FK)
- movie_id (FK)
- detected_age
- access_granted
- denial_reason
- accessed_at

## Data Flow

### Content Access Flow

1. **User requests access to content**
   - Frontend captures image from camera
   - Image sent to AI service

2. **AI Service processes image**
   - Detects faces in image
   - Estimates age for each face
   - Returns detected age

3. **Backend validates access**
   - Receives movie ID and detected age
   - Compares detected age with movie's min_age
   - Logs access attempt
   - Returns access decision

4. **Frontend displays result**
   - Shows access granted/denied message
   - If granted, displays content
   - If denied, shows reason and alternatives

### Movie Management Flow

1. **Admin creates/updates movie**
   - Frontend sends movie data to backend
   - Backend validates and stores in database
   - Returns confirmation

2. **User browses movies**
   - Frontend requests movies from backend
   - Backend queries database
   - Returns filtered list based on criteria

## Security Architecture

### Authentication
- JWT-based authentication
- Password hashing with BCrypt
- Session management

### Authorization
- Role-based access control (RBAC)
- Admin role for content management
- User role for content access

### Data Protection
- HTTPS for all communications
- Encrypted passwords
- Secure token storage
- Input validation and sanitization

## Scalability Considerations

### Horizontal Scaling
- Backend: Stateless design allows multiple instances
- AI Service: Can be scaled independently
- Database: Master-slave replication

### Caching Strategy
- Frontend: Browser caching for static assets
- Backend: Redis cache for frequently accessed data
- AI Service: Model caching in memory

### Load Balancing
- Nginx for frontend
- Spring Cloud Gateway (future)
- Round-robin for AI service instances

## Deployment Architecture

### Development Environment
```
Localhost
├── Frontend (ng serve) - Port 4200
├── Backend (Spring Boot) - Port 8080
├── AI Service (Flask) - Port 5000
└── H2 Database (in-memory)
```

### Production Environment (Docker)
```
Docker Network
├── Frontend Container (Nginx) - Port 80
├── Backend Container (Java) - Port 8080
├── AI Service Container (Python) - Port 5000
└── MySQL Container - Port 3306
```

### Cloud Deployment (Future)
```
AWS/Azure/GCP
├── Frontend (S3 + CloudFront / Azure Static Web Apps)
├── Backend (ECS/AKS/GKE)
├── AI Service (Lambda/Functions/Cloud Run)
└── Database (RDS/Azure SQL/Cloud SQL)
```

## Technology Stack Summary

| Component | Primary Tech | Language | Framework |
|-----------|--------------|----------|-----------|
| Frontend | Angular 17 | TypeScript | Angular |
| Backend | Spring Boot 3.2 | Java 17 | Spring |
| AI Service | Flask | Python 3.8+ | Flask |
| Database | MySQL 8.0 | SQL | - |
| Dev Database | H2 | SQL | - |
| Containerization | Docker | - | Docker Compose |

## Future Enhancements

1. **Real-time Processing**
   - WebSocket support for live camera feed
   - Real-time age detection

2. **Enhanced AI**
   - Improved age estimation models
   - Multi-face handling
   - Emotion detection
   - Gender classification

3. **Advanced Features**
   - Content recommendations
   - Watch history
   - Parental controls
   - Multi-user profiles

4. **Infrastructure**
   - Kubernetes deployment
   - CI/CD pipeline
   - Monitoring and logging
   - Auto-scaling
