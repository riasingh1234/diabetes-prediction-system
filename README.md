# 🩺 DiabetesAI – AI-Powered Diabetes Prediction System

An end-to-end Machine Learning web application that predicts whether a patient is at risk of diabetes using medical parameters. The project combines a **React.js frontend**, **Flask REST API**, and a **Random Forest Classifier** trained on the **Pima Indians Diabetes Dataset**.

---

## 🌐 Live Demo

### 🚀 Frontend
**https://diabetes-prediction-system-one.vercel.app**

### ⚙️ Backend API
**https://diabetes-prediction-system-w7pb.onrender.com**

---

## 📌 Features

- 🧠 Machine Learning based diabetes prediction
- 📊 Random Forest model with model comparison
- 🎨 Modern and responsive React UI
- 📈 Dashboard with dataset and model information
- 📝 Patient data input with validation
- 💡 Health recommendations based on prediction
- 📚 Prediction history
- 📊 Exploratory Data Analysis (EDA) visualizations
- 🌐 REST API built using Flask
- 🚀 Deployed using Vercel + Render

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Axios
- CSS3

### Backend
- Flask
- Flask-CORS
- Gunicorn

### Machine Learning
- Python
- Scikit-learn
- Pandas
- NumPy
- Matplotlib
- Seaborn
- Joblib

---

## 🤖 Machine Learning Models Compared

| Model | Accuracy |
|--------|---------:|
| Logistic Regression | 70.78% |
| Decision Tree | 68.18% |
| **Random Forest** | **77.92%** ⭐ |
| K-Nearest Neighbors | 75.32% |

The **Random Forest Classifier** achieved the highest accuracy and was selected as the final prediction model.

---

## 📊 Dataset

**Pima Indians Diabetes Dataset**

- Total Samples: **768**
- Medical Features: **8**
- Target Variable: Diabetes Outcome (0 or 1)

Features:

- Pregnancies
- Glucose
- Blood Pressure
- Skin Thickness
- Insulin
- BMI
- Diabetes Pedigree Function
- Age

---

## 📈 Exploratory Data Analysis

The project includes:

- Class Distribution
- Correlation Heatmap
- Feature Histograms
- Data Cleaning
- Missing Value Handling
- Feature Scaling

---

## 📷 Screenshots

### 🏠 Home Page

![Home](assets/home.png)

---

### 📊 Dashboard

![Dashboard](assets/dashboard.png)

---

### 🩺 Prediction

![Prediction](assets/prediction.png)

---

### 📜 Prediction History

![History](assets/history.png)

---

### 📈 EDA Visualizations

![EDA](assets/eda.png)

---

## 📂 Project Structure

```text
diabetes-prediction-system/
│
├── backend/
│   ├── app.py
│   ├── model.pkl
│   ├── scaler.pkl
│   ├── model_metadata.json
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── data/
│   └── diabetes.csv
│
├── notebooks/
│   └── train_model.py
│
├── outputs/
│   ├── class_distribution.png
│   ├── correlation_heatmap.png
│   └── histograms.png
│
├── assets/
│   ├── home.png
│   ├── dashboard.png
│   ├── prediction.png
│   ├── history.png
│   └── eda.png
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/riasingh1234/diabetes-prediction-system.git
cd diabetes-prediction-system
```

### Backend

```bash
cd backend

pip install -r requirements.txt

python app.py
```

Backend runs at:

```
http://localhost:5000
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|----------|-----------|-------------|
| GET | `/` | API Status |
| GET | `/health` | Health Check |
| GET | `/metadata` | Model Metadata |
| POST | `/predict` | Diabetes Prediction |

---

## 📊 Prediction Output

The API returns:

- Diabetes Prediction
- Risk Level
- Confidence Score
- Personalized Health Recommendations

---

## 🚀 Deployment

### Frontend

- Vercel

### Backend

- Render

---

## 👩‍💻 Developed By

**Ria Singh**

GitHub: https://github.com/riasingh1234

---
