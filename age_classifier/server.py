from fastapi import FastAPI, UploadFile, File
import shutil
import os
from run_model import predict_age_api

app = FastAPI()

@app.post("/predict-age/")
async def predict_age_endpoint(file: UploadFile = File(...)):
    temp_path = f"temp_{file.filename}"
    
    try:
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        result = predict_age_api(temp_path, return_image=False)
        
        return result
        
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)