# WatchID API Documentation

## Base URLs

- **Development**: `http://localhost:8080/api`
- **Production**: `https://api.watchid.com/api`

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Movie Management APIs

### Get All Movies

Retrieve a list of all available movies.

**Endpoint:** `GET /movies`

**Authentication:** Not required

**Response:**
```json
[
  {
    "id": 1,
    "title": "The Matrix",
    "description": "A computer hacker learns about the true nature of reality.",
    "minAge": 13,
    "genre": "Sci-Fi",
    "duration": 136,
    "posterUrl": "https://example.com/matrix-poster.jpg",
    "trailerUrl": "https://example.com/matrix-trailer.mp4"
  }
]
```

**Status Codes:**
- `200 OK` - Success

---

### Get Movie by ID

Retrieve details of a specific movie.

**Endpoint:** `GET /movies/{id}`

**Authentication:** Not required

**Path Parameters:**
- `id` (required) - Movie ID

**Response:**
```json
{
  "id": 1,
  "title": "The Matrix",
  "description": "A computer hacker learns about the true nature of reality.",
  "minAge": 13,
  "genre": "Sci-Fi",
  "duration": 136,
  "posterUrl": "https://example.com/matrix-poster.jpg",
  "trailerUrl": "https://example.com/matrix-trailer.mp4"
}
```

**Status Codes:**
- `200 OK` - Success
- `404 Not Found` - Movie not found

---

### Get Movies by Age

Retrieve movies accessible for a specific age.

**Endpoint:** `GET /movies/age/{age}`

**Authentication:** Not required

**Path Parameters:**
- `age` (required) - Age in years

**Response:**
```json
[
  {
    "id": 1,
    "title": "The Lion King",
    "description": "A young lion prince flees his kingdom.",
    "minAge": 0,
    "genre": "Animation",
    "duration": 88,
    "posterUrl": "https://example.com/lion-king-poster.jpg",
    "trailerUrl": "https://example.com/lion-king-trailer.mp4"
  }
]
```

**Status Codes:**
- `200 OK` - Success

---

### Search Movies

Search for movies by title.

**Endpoint:** `GET /movies/search`

**Authentication:** Not required

**Query Parameters:**
- `title` (required) - Search term

**Example:** `GET /movies/search?title=matrix`

**Response:**
```json
[
  {
    "id": 1,
    "title": "The Matrix",
    "description": "A computer hacker learns about the true nature of reality.",
    "minAge": 13,
    "genre": "Sci-Fi",
    "duration": 136,
    "posterUrl": "https://example.com/matrix-poster.jpg",
    "trailerUrl": "https://example.com/matrix-trailer.mp4"
  }
]
```

**Status Codes:**
- `200 OK` - Success

---

### Create Movie

Add a new movie to the system.

**Endpoint:** `POST /movies`

**Authentication:** Required (Admin only)

**Request Body:**
```json
{
  "title": "Inception",
  "description": "A thief who steals corporate secrets through dream-sharing technology.",
  "minAge": 13,
  "genre": "Sci-Fi",
  "duration": 148,
  "posterUrl": "https://example.com/inception-poster.jpg",
  "trailerUrl": "https://example.com/inception-trailer.mp4"
}
```

**Response:**
```json
{
  "id": 2,
  "title": "Inception",
  "description": "A thief who steals corporate secrets through dream-sharing technology.",
  "minAge": 13,
  "genre": "Sci-Fi",
  "duration": 148,
  "posterUrl": "https://example.com/inception-poster.jpg",
  "trailerUrl": "https://example.com/inception-trailer.mp4"
}
```

**Status Codes:**
- `201 Created` - Movie created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Admin role required

---

### Update Movie

Update an existing movie.

**Endpoint:** `PUT /movies/{id}`

**Authentication:** Required (Admin only)

**Path Parameters:**
- `id` (required) - Movie ID

**Request Body:**
```json
{
  "title": "Inception (Updated)",
  "description": "Updated description",
  "minAge": 13,
  "genre": "Sci-Fi",
  "duration": 148,
  "posterUrl": "https://example.com/inception-poster-new.jpg",
  "trailerUrl": "https://example.com/inception-trailer-new.mp4"
}
```

**Response:**
```json
{
  "id": 2,
  "title": "Inception (Updated)",
  "description": "Updated description",
  "minAge": 13,
  "genre": "Sci-Fi",
  "duration": 148,
  "posterUrl": "https://example.com/inception-poster-new.jpg",
  "trailerUrl": "https://example.com/inception-trailer-new.mp4"
}
```

**Status Codes:**
- `200 OK` - Movie updated successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Admin role required
- `404 Not Found` - Movie not found

---

### Delete Movie

Remove a movie from the system.

**Endpoint:** `DELETE /movies/{id}`

**Authentication:** Required (Admin only)

**Path Parameters:**
- `id` (required) - Movie ID

**Response:** No content

**Status Codes:**
- `204 No Content` - Movie deleted successfully
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Admin role required
- `404 Not Found` - Movie not found

---

## Access Control APIs

### Check Access

Check if access should be granted based on detected age.

**Endpoint:** `POST /access/check`

**Authentication:** Not required (Optional user ID)

**Request Body:**
```json
{
  "movieId": 1,
  "detectedAge": 25,
  "userId": 1
}
```

**Field Descriptions:**
- `movieId` (required) - ID of the movie to access
- `detectedAge` (required) - Age detected by AI service
- `userId` (optional) - User ID if logged in

**Response (Access Granted):**
```json
{
  "accessGranted": true,
  "message": "Access granted. Enjoy the movie!",
  "movie": {
    "id": 1,
    "title": "The Matrix",
    "description": "A computer hacker learns about the true nature of reality.",
    "minAge": 13,
    "genre": "Sci-Fi",
    "duration": 136,
    "posterUrl": "https://example.com/matrix-poster.jpg",
    "trailerUrl": "https://example.com/matrix-trailer.mp4"
  }
}
```

**Response (Access Denied):**
```json
{
  "accessGranted": false,
  "message": "Access denied. This content requires minimum age 18, detected age: 15",
  "movie": {
    "id": 2,
    "title": "Deadpool",
    "description": "A wisecracking mercenary with accelerated healing powers.",
    "minAge": 18,
    "genre": "Action",
    "duration": 108,
    "posterUrl": "https://example.com/deadpool-poster.jpg",
    "trailerUrl": "https://example.com/deadpool-trailer.mp4"
  }
}
```

**Status Codes:**
- `200 OK` - Access check completed
- `400 Bad Request` - Invalid request data (e.g., movie not found)

---

## AI Service APIs

### Health Check

Check if the AI service is running.

**Endpoint:** `GET /health`

**Authentication:** Not required

**Response:**
```json
{
  "status": "healthy",
  "service": "WatchID AI Service",
  "version": "1.0.0"
}
```

**Status Codes:**
- `200 OK` - Service is healthy

---

### Detect Age

Detect faces and estimate age from an image.

**Endpoint:** `POST /detect-age`

**Authentication:** Not required

**Request Body:**
```json
{
  "image": "base64_encoded_image_data"
}
```

**Response:**
```json
{
  "faces": [
    {
      "bbox": [100, 150, 200, 200],
      "age": 25
    }
  ],
  "count": 1
}
```

**Field Descriptions:**
- `bbox` - Bounding box coordinates [x, y, width, height]
- `age` - Estimated age in years
- `count` - Number of faces detected

**Status Codes:**
- `200 OK` - Detection successful
- `400 Bad Request` - Invalid image data
- `500 Internal Server Error` - Processing error

---

### Detect Faces

Detect faces without age estimation.

**Endpoint:** `POST /detect-faces`

**Authentication:** Not required

**Request Body:**
```json
{
  "image": "base64_encoded_image_data"
}
```

**Response:**
```json
{
  "faces": [
    {
      "bbox": [100, 150, 200, 200]
    }
  ],
  "count": 1
}
```

**Status Codes:**
- `200 OK` - Detection successful
- `400 Bad Request` - Invalid image data
- `500 Internal Server Error` - Processing error

---

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "timestamp": "2025-11-05T21:00:00.000+00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Invalid request data",
  "path": "/api/movies"
}
```

## Rate Limiting

API rate limits:
- Authenticated requests: 1000 requests per hour
- Anonymous requests: 100 requests per hour

Rate limit headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1635868800
```

## Versioning

The API uses URL versioning. The current version is v1, which is the default.

Future versions will be accessible via:
- `http://localhost:8080/api/v2/...`

## CORS

CORS is enabled for the following origins:
- Development: `http://localhost:4200`
- Production: `https://watchid.com`

## Swagger Documentation

Interactive API documentation is available at:
- `http://localhost:8080/swagger-ui.html`

OpenAPI specification:
- `http://localhost:8080/v3/api-docs`
