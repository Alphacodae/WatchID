# Backend Dockerfile
FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY backend/pom.xml .
COPY backend/.mvn .mvn
COPY backend/mvnw .

# Download dependencies
RUN ./mvnw dependency:go-offline

# Copy source code
COPY backend/src src

# Build the application
RUN ./mvnw clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the built artifact
COPY --from=build /app/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
