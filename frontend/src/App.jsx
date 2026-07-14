import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import InputField from "./components/InputField";
import PredictionCard from "./components/PredictionCard";

import { predictDiabetes } from "./services/api";

function App() {

  const [formData, setFormData] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: "",
  });

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function validateForm() {

  const newErrors = {};

  if (formData.Pregnancies < 0 || formData.Pregnancies > 20)
    newErrors.Pregnancies = "Pregnancies must be between 0 and 20.";

  if (formData.Glucose < 0 || formData.Glucose > 300)
    newErrors.Glucose = "Glucose must be between 0 and 300.";

  if (formData.BloodPressure < 0 || formData.BloodPressure > 200)
    newErrors.BloodPressure = "Blood Pressure must be between 0 and 200.";

  if (formData.SkinThickness < 0 || formData.SkinThickness > 100)
    newErrors.SkinThickness = "Skin Thickness must be between 0 and 100.";

  if (formData.Insulin < 0 || formData.Insulin > 900)
    newErrors.Insulin = "Insulin must be between 0 and 900.";

  if (formData.BMI < 10 || formData.BMI > 70)
    newErrors.BMI = "BMI must be between 10 and 70.";

  if (
    formData.DiabetesPedigreeFunction < 0 ||
    formData.DiabetesPedigreeFunction > 3
  )
    newErrors.DiabetesPedigreeFunction =
      "Pedigree Function must be between 0 and 3.";

  if (formData.Age < 1 || formData.Age > 120)
    newErrors.Age = "Age must be between 1 and 120.";

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
}

  async function handleSubmit(e) {

    e.preventDefault();
    if (!validateForm()) {
  return;
}

    setLoading(true);

    try {

      const response = await predictDiabetes(formData);

      setResult(response);

    } catch (error) {
  console.error("FULL ERROR:", error);

  if (error.response) {
    console.log("Status:", error.response.status);
    console.log("Data:", error.response.data);
    alert(JSON.stringify(error.response.data));
  } else {
    alert(error.message);
  }
}

    setLoading(false);
  }

  return (

    <>

      <Navbar />
      <div className="stats-container">

  <div className="stat-card">
    <h3>👥 Dataset</h3>
    <p>768 Patients</p>
  </div>

  <div className="stat-card">
    <h3>🧠 Model</h3>
    <p>Random Forest</p>
  </div>

  <div className="stat-card">
    <h3>🎯 Accuracy</h3>
    <p>77.92%</p>
  </div>

  <div className="stat-card">
    <h3>📊 Features</h3>
    <p>8</p>
  </div>

</div>
      <div className="container">

        <div className="form-card">

          <h2>Enter Patient Details</h2>

          <form onSubmit={handleSubmit}>

            <InputField
              label="Pregnancies"
               name="Pregnancies"
               value={formData.Pregnancies}
                onChange={handleChange}
              placeholder="0 - 20"
               min={0}
               max={20}
               error={errors.Pregnancies}
            />

            <InputField
              label="Glucose"
              name="Glucose"
              value={formData.Glucose}
              onChange={handleChange}
              placeholder="70 - 180"
              min={0}
              max={300}
              error={errors.Glucose}
            />

            <InputField
              label="Blood Pressure"
              name="BloodPressure"
              value={formData.BloodPressure}
              onChange={handleChange}
              placeholder="80 - 120"
              min={0}
              max={200}
              error={errors.BloodPressure}
            />

            <InputField
              label="Skin Thickness"
              name="SkinThickness"
              value={formData.SkinThickness}
              onChange={handleChange}
              placeholder="20 - 50"
              min={0}
              max={100}
              error={errors.SkinThickness}
            />

            <InputField
              label="Insulin"
              name="Insulin"
              value={formData.Insulin}
              onChange={handleChange}
              placeholder="15 - 276"
              min={0}
              max={900}
              error={errors.Insulin}
            />

            <InputField
              label="BMI"
              name="BMI"
              value={formData.BMI}
              onChange={handleChange}
              placeholder="18.5 - 30"
              min={10}
              max={70}
              step="0.1"
              error={errors.BMI}
            />

            <InputField
              label="Diabetes Pedigree Function"
              name="DiabetesPedigreeFunction"
              value={formData.DiabetesPedigreeFunction}
              onChange={handleChange}
              placeholder="0.078 - 2.42"
              min={0}
              max={3}
              step="0.001"
              error={errors.DiabetesPedigreeFunction}
            />

            <InputField
              label="Age"
              name="Age"
              value={formData.Age}
              onChange={handleChange}
              placeholder="21 - 81"
              min={1}
              max={120}
              error={errors.Age}
            />

            <button
              className="predict-btn"
              type="submit"
            >
              {loading ? "⏳ Predicting..." : "🔍 Predict Diabetes"}
            </button>

          </form>

        </div>

        <PredictionCard result={result} />

      </div>

      <Footer />

    </>

  );
}

export default App;