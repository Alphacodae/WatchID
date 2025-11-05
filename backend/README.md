# WatchID Backend

This is the Spring Boot backend service for WatchID, providing REST APIs for movie management, user authentication, and access control.

## Technology Stack

- **Java**: 17
- **Framework**: Spring Boot 3.2.0
- **Database**: H2 (development), MySQL (production)
- **Build Tool**: Maven
- **Security**: Spring Security
- **API Documentation**: SpringDoc OpenAPI (Swagger)

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/watchid/
│   │   │   ├── controller/     # REST controllers
│   │   │   ├── service/        # Business logic
│   │   │   ├── model/          # JPA entities
│   │   │   ├── repository/     # Data access layer
│   │   │   ├── config/         # Configuration classes
│   │   │   ├── dto/            # Data transfer objects
│   │   │   └── WatchIdApplication.java
│   │   └── resources/
│   │       ├── application.yml
│   │       ├── application-dev.yml
│   │       └── application-prod.yml
│   └── test/
└── pom.xml
```

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- MySQL 8.0 (for production)

### Running the Application

1. **Development Mode (H2 Database)**

```bash
mvn clean install
mvn spring-boot:run
```

Or with a specific profile:

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

2. **Production Mode (MySQL Database)**

First, set up the database:

```sql
CREATE DATABASE watchid;
CREATE USER 'watchid_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON watchid.* TO 'watchid_user'@'localhost';
FLUSH PRIVILEGES;
```

Then run with production profile:

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=prod
```

### Building for Production

```bash
mvn clean package
java -jar target/watchid-backend-1.0.0-SNAPSHOT.jar
```

## API Endpoints

The backend exposes the following REST APIs:

### Movie Management

- `GET /api/movies` - Get all movies
- `GET /api/movies/{id}` - Get movie by ID
- `GET /api/movies/age/{age}` - Get movies accessible for a specific age
- `GET /api/movies/search?title={title}` - Search movies by title
- `POST /api/movies` - Create a new movie
- `PUT /api/movies/{id}` - Update a movie
- `DELETE /api/movies/{id}` - Delete a movie

### Access Control

- `POST /api/access/check` - Check if access should be granted based on detected age

Request body:
```json
{
  "movieId": 1,
  "detectedAge": 25,
  "userId": 1
}
```

Response:
```json
{
  "accessGranted": true,
  "message": "Access granted. Enjoy the movie!",
  "movie": {
    "id": 1,
    "title": "Sample Movie",
    "description": "A sample movie",
    "minAge": 18,
    "genre": "Action",
    "duration": 120,
    "posterUrl": "http://example.com/poster.jpg",
    "trailerUrl": "http://example.com/trailer.mp4"
  }
}
```

## API Documentation

Once the application is running, you can access:

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI Spec**: http://localhost:8080/v3/api-docs
- **H2 Console** (dev mode): http://localhost:8080/h2-console

H2 Console credentials (dev mode):
- JDBC URL: `jdbc:h2:mem:watchiddb`
- Username: `sa`
- Password: (empty)

## Configuration

### Application Profiles

- **dev**: Development profile with H2 in-memory database
- **prod**: Production profile with MySQL database

### Environment Variables

For production, set the following environment variables:

- `DB_USERNAME`: MySQL username (default: watchid_user)
- `DB_PASSWORD`: MySQL password (default: changeme)
- `JWT_SECRET`: Secret key for JWT token generation

## Testing

Run all tests:

```bash
mvn test
```

Run with coverage:

```bash
mvn test jacoco:report
```

## Database Schema

### Movies Table
- `id`: Primary key
- `title`: Movie title
- `description`: Movie description
- `min_age`: Minimum age requirement
- `genre`: Movie genre
- `duration`: Duration in minutes
- `poster_url`: URL to poster image
- `trailer_url`: URL to trailer video
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### Users Table
- `id`: Primary key
- `username`: Unique username
- `email`: Unique email
- `password`: Encrypted password
- `full_name`: User's full name
- `role`: User role (USER, ADMIN)
- `enabled`: Account status
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### Access Logs Table
- `id`: Primary key
- `user_id`: Foreign key to users
- `movie_id`: Foreign key to movies
- `detected_age`: Age detected during access attempt
- `access_granted`: Whether access was granted
- `denial_reason`: Reason if access was denied
- `accessed_at`: Timestamp of access attempt

## Development

### Adding a New Feature

1. Create the model in `model/` package
2. Create the repository in `repository/` package
3. Create the service in `service/` package
4. Create the controller in `controller/` package
5. Add appropriate DTOs in `dto/` package
6. Write tests

### Code Style

- Follow Java naming conventions
- Use Lombok annotations to reduce boilerplate
- Write comprehensive JavaDoc for public methods
- Keep controllers thin, move business logic to services

## Troubleshooting

### Port Already in Use

If port 8080 is already in use, change it in `application.yml`:

```yaml
server:
  port: 8081
```

### Database Connection Issues

Check your database credentials in `application-prod.yml` and ensure MySQL is running.

## License

MIT License
