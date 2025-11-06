@echo off
echo Starting Age Detection API Server...
echo.
echo Server will be available at: http://localhost:8000
echo API endpoint: http://localhost:8000/predict-age/
echo.
python -m uvicorn server:app --reload --host 0.0.0.0 --port 8000
