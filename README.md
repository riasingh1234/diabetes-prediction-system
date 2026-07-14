DiabetesAI 🩺

AI-powered Diabetes Risk Prediction using Machine Learning.

Overview

DiabetesAI is a full-stack healthcare web application that predicts the likelihood of diabetes using patient medical information. The application uses a trained Random Forest model on the Pima Indians Diabetes Dataset and provides real-time risk predictions along with health recommendations.

Features
🧠 Random Forest Machine Learning Model
⚡ Real-time Diabetes Prediction
📊 Interactive Dashboard
📈 Exploratory Data Analysis (EDA) Visualizations
📜 Prediction History
💡 Personalized Health Recommendations
✅ Input Validation
📱 Responsive Modern UI
Tech Stack
Frontend
React
Vite
CSS3
Axios
Backend
Flask
Flask-CORS
NumPy
Joblib
Machine Learning
Scikit-learn
Random Forest
Logistic Regression
Decision Tree
KNN
Dataset

Pima Indians Diabetes Dataset

768 patients
8 medical features
Binary classification
Machine Learning Workflow
Dataset
     │
EDA
     │
Data Cleaning
     │
Feature Scaling
     │
Train-Test Split
     │
Train Multiple Models
     │
Select Best Model
     │
Save Model
     │
Flask API
     │
React Frontend

## Screenshots

### Home

![Home](assets/home.png)

### Dashboard

![Dashboard](assets/dashboard.png)

### Prediction

![Prediction](assets/prediction.png)

### History

![History](assets/history.png)

### EDA

![EDA](assets/eda.png)

Installation
git clone <repo-url>

cd diabetes-prediction-system

Backend

cd backend

pip install -r requirements.txt

python app.py

Frontend

cd frontend

npm install

npm run dev
Project Structure
diabetes-prediction-system/

backend/
    app.py
    model.pkl
    scaler.pkl

frontend/
    src/
    public/

scripts/
    train_model.py

data/
    diabetes.csv

outputs/
API Endpoint
POST /predict

Request

{
  "Pregnancies": 2,
  "Glucose": 140,
  "BloodPressure": 72,
  "SkinThickness": 30,
  "Insulin": 120,
  "BMI": 28.5,
  "DiabetesPedigreeFunction": 0.45,
  "Age": 35
}
Prediction Output
{
  "prediction": 0,
  "risk": "Low",
  "probability": 78.24
}
Author

Ria Singh

License

MIT License