# WatchID Frontend

This is the Angular frontend for WatchID - an AI-powered content access management system.

## Technology Stack

- **Framework**: Angular 17
- **Language**: TypeScript
- **Styling**: CSS3
- **HTTP Client**: Angular HttpClient

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   └── app.module.ts
│   ├── assets/
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

### Running the Application

Development mode:

```bash
npm start
```

Or:

```bash
ng serve
```

The application will be available at `http://localhost:4200`

### Building for Production

```bash
npm run build
```

Or:

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Features

### Current Status (Simulated UI)

This is a simulated UI that demonstrates the planned features of WatchID:

- **Content Library**: Browse movies and shows with age ratings
- **Face Detection**: Real-time facial recognition using AI (to be implemented)
- **Access Control**: Automatic age verification and access management
- **Analytics**: Track viewing history and preferences

### Planned Components

- **Movie List Component**: Display available movies
- **Movie Detail Component**: Show detailed movie information
- **Camera Component**: Capture face for age detection
- **Access Request Component**: Handle access requests
- **User Profile Component**: Manage user preferences
- **Admin Dashboard**: Content and user management

## API Integration

The frontend connects to the backend API at:

- **Development**: `http://localhost:8080/api`
- **Production**: `https://api.watchid.com/api`

API endpoints are configured in `src/environments/environment.ts` and `src/environments/environment.prod.ts`.

## Development

### Adding a New Component

```bash
ng generate component components/movie-list
```

### Adding a New Service

```bash
ng generate service services/movie
```

### Code Style

- Follow Angular style guide
- Use TypeScript strict mode
- Keep components focused and small
- Use services for API communication
- Use reactive forms for complex forms

## Testing

Run unit tests:

```bash
npm test
```

Or:

```bash
ng test
```

## Configuration

### Environment Variables

Update the API URL in environment files:

**Development** (`src/environments/environment.ts`):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

**Production** (`src/environments/environment.prod.ts`):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.watchid.com/api'
};
```

## Troubleshooting

### Port Already in Use

If port 4200 is already in use, specify a different port:

```bash
ng serve --port 4201
```

### API Connection Issues

Check that:
1. Backend server is running on `http://localhost:8080`
2. CORS is properly configured in the backend
3. API URL in environment file is correct

## License

MIT License
