# Contributing to WatchID

First off, thank you for considering contributing to WatchID! It's people like you that make WatchID such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* Use a clear and descriptive title
* Describe the exact steps which reproduce the problem
* Provide specific examples to demonstrate the steps
* Describe the behavior you observed after following the steps
* Explain which behavior you expected to see instead and why
* Include screenshots and animated GIFs if possible

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* Use a clear and descriptive title
* Provide a step-by-step description of the suggested enhancement
* Provide specific examples to demonstrate the steps
* Describe the current behavior and explain which behavior you expected to see instead
* Explain why this enhancement would be useful

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Include screenshots and animated GIFs in your pull request whenever possible
* Follow the Java, JavaScript, and Python style guides
* Include thoughtfully-worded, well-structured tests
* Document new code
* End all files with a newline

## Development Setup

### Backend (Spring Boot)

1. Install Java 17 or higher
2. Install Maven
3. Clone the repository
4. Navigate to the backend directory
5. Run `mvn clean install`
6. Run `mvn spring-boot:run`

### Frontend (Angular)

1. Install Node.js 16 or higher
2. Navigate to the frontend directory
3. Run `npm install`
4. Run `ng serve`

### AI Service (Python)

1. Install Python 3.8 or higher
2. Navigate to the ai-service directory
3. Create a virtual environment: `python -m venv venv`
4. Activate the virtual environment
5. Install dependencies: `pip install -r requirements.txt`

## Style Guides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

### Java Style Guide

* Follow standard Java naming conventions
* Use 4 spaces for indentation
* Keep lines under 120 characters
* Use meaningful variable and method names
* Add JavaDoc comments for public methods and classes

### JavaScript/TypeScript Style Guide

* Use 2 spaces for indentation
* Use semicolons
* Use single quotes for strings
* Follow Angular style guide for component structure

### Python Style Guide

* Follow PEP 8
* Use 4 spaces for indentation
* Use docstrings for functions and classes
* Keep lines under 100 characters

## Testing

* Write unit tests for new features
* Ensure all tests pass before submitting a PR
* Aim for high test coverage

### Running Tests

Backend:
```bash
cd backend
mvn test
```

Frontend:
```bash
cd frontend
npm test
```

AI Service:
```bash
cd ai-service
pytest
```

## Project Structure

Please maintain the following structure:

* Backend code goes in `backend/src/main/java/com/watchid/`
* Frontend code goes in `frontend/src/app/`
* AI service code goes in `ai-service/src/`
* Tests go in corresponding test directories
* Documentation goes in `docs/`

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

Thank you for contributing to WatchID! 🎉
