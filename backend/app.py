from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import json
import os

app = Flask(__name__)
CORS(app)

# ----------------------------------------------------
# Load model files
# ----------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model = joblib.load(os.path.join(BASE_DIR, "model.pkl"))
scaler = joblib.load(os.path.join(BASE_DIR, "scaler.pkl"))

with open(os.path.join(BASE_DIR, "model_metadata.json"), "r") as f:
    metadata = json.load(f)


# ----------------------------------------------------
# Home Route
# ----------------------------------------------------
@app.route("/")
def home():
    return jsonify({
        "message": "Diabetes Prediction API is running successfully!"
    })


# ----------------------------------------------------
# Health Check
# ----------------------------------------------------
@app.route("/health")
def health():
    return jsonify({
        "status": "healthy"
    })


# ----------------------------------------------------
# Model Metadata
# ----------------------------------------------------
@app.route("/metadata")
def get_metadata():
    return jsonify(metadata)


# ----------------------------------------------------
# Prediction Endpoint
# ----------------------------------------------------
@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No JSON data received."
        }), 400

    try:

        # -------------------------------
        # Required Fields
        # -------------------------------
        required_fields = [
            "Pregnancies",
            "Glucose",
            "BloodPressure",
            "SkinThickness",
            "Insulin",
            "BMI",
            "DiabetesPedigreeFunction",
            "Age"
        ]

        for field in required_fields:
            if field not in data:
                return jsonify({
                    "error": f"Missing field: {field}"
                }), 400

        # -------------------------------
        # Convert values
        # -------------------------------
        pregnancies = int(data["Pregnancies"])
        glucose = float(data["Glucose"])
        blood_pressure = float(data["BloodPressure"])
        skin_thickness = float(data["SkinThickness"])
        insulin = float(data["Insulin"])
        bmi = float(data["BMI"])
        pedigree = float(data["DiabetesPedigreeFunction"])
        age = int(data["Age"])

        # -------------------------------
        # Backend Validation
        # -------------------------------
        if not (0 <= pregnancies <= 20):
            return jsonify({
                "error": "Pregnancies must be between 0 and 20."
            }), 400

        if not (0 <= glucose <= 300):
            return jsonify({
                "error": "Glucose must be between 0 and 300."
            }), 400

        if not (0 <= blood_pressure <= 200):
            return jsonify({
                "error": "Blood Pressure must be between 0 and 200."
            }), 400

        if not (0 <= skin_thickness <= 100):
            return jsonify({
                "error": "Skin Thickness must be between 0 and 100."
            }), 400

        if not (0 <= insulin <= 900):
            return jsonify({
                "error": "Insulin must be between 0 and 900."
            }), 400

        if not (10 <= bmi <= 70):
            return jsonify({
                "error": "BMI must be between 10 and 70."
            }), 400

        if not (0 <= pedigree <= 3):
            return jsonify({
                "error": "Diabetes Pedigree Function must be between 0 and 3."
            }), 400

        if not (1 <= age <= 120):
            return jsonify({
                "error": "Age must be between 1 and 120."
            }), 400

        # -------------------------------
        # Create Feature Array
        # -------------------------------
        features = np.array([[
            pregnancies,
            glucose,
            blood_pressure,
            skin_thickness,
            insulin,
            bmi,
            pedigree,
            age
        ]])

        # -------------------------------
        # Scale Features
        # -------------------------------
        scaled_features = scaler.transform(features)

        # -------------------------------
        # Prediction
        # -------------------------------
        prediction = int(model.predict(scaled_features)[0])

        probability = float(
            model.predict_proba(scaled_features)[0][prediction]
        )

        risk = "High" if prediction == 1 else "Low"

        # -------------------------------
        # Recommendations
        # -------------------------------
        if prediction == 1:

            recommendation = [
                "Consult a healthcare professional.",
                "Monitor your blood glucose regularly.",
                "Maintain a healthy and balanced diet.",
                "Exercise for at least 30 minutes daily.",
                "Follow your doctor's medical advice."
            ]

        else:

            recommendation = [
                "Maintain a healthy lifestyle.",
                "Exercise regularly.",
                "Eat a balanced diet.",
                "Schedule routine health check-ups."
            ]

        return jsonify({
            "prediction": prediction,
            "risk": risk,
            "probability": round(probability * 100, 2),
            "recommendation": recommendation
        })

    except (ValueError, TypeError):

        return jsonify({
            "error": "Invalid input type."
        }), 400

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# ----------------------------------------------------
# Run Server
# ----------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)