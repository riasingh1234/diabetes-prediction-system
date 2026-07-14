import { useState, useEffect } from "react";
import "./styles/global.css";
import "./styles/layout.css";
import "./styles/form.css";
import "./styles/prediction.css";
import "./styles/history.css";
import "./styles/hero.css";
import "./styles/responsive.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import InputField from "./components/InputField";
import PredictionCard from "./components/PredictionCard";
import History from "./components/History";
import Hero from "./components/Hero";
import Features from "./components/Features";
import EDASection from "./components/EDASection";


import {
  predictDiabetes,
  fetchMetadata,
} from "./services/api";

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

  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    async function loadMetadata() {
      try {
        const data = await fetchMetadata();
        setMetadata(data);
      } catch (error) {
        console.log(error);
      }
    }

    loadMetadata();
  }, []);

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
      newErrors.BloodPressure =
        "Blood Pressure must be between 0 and 200.";

    if (formData.SkinThickness < 0 || formData.SkinThickness > 100)
      newErrors.SkinThickness =
        "Skin Thickness must be between 0 and 100.";

    if (formData.Insulin < 0 || formData.Insulin > 900)
      newErrors.Insulin =
        "Insulin must be between 0 and 900.";

    if (formData.BMI < 10 || formData.BMI > 70)
      newErrors.BMI =
        "BMI must be between 10 and 70.";

    if (
      formData.DiabetesPedigreeFunction < 0 ||
      formData.DiabetesPedigreeFunction > 3
    )
      newErrors.DiabetesPedigreeFunction =
        "Pedigree Function must be between 0 and 3.";

    if (formData.Age < 1 || formData.Age > 120)
      newErrors.Age =
        "Age must be between 1 and 120.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {

    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {

      const response = await predictDiabetes(formData);

      setResult(response);
      const history = JSON.parse(
  localStorage.getItem("history") || "[]"
);

history.unshift({
  date: new Date().toLocaleString(),
  patient: formData,
  result: response.risk,
  confidence: response.probability,
});

localStorage.setItem(
  "history",
  JSON.stringify(history.slice(0, 10))
);

    } catch (error) {

      console.error(error);

      if (error.response) {
        alert(JSON.stringify(error.response.data));
      } else {
        alert(error.message);
      }

    }

    setLoading(false);
  }

  function handleReset() {

    setFormData({
      Pregnancies: "",
      Glucose: "",
      BloodPressure: "",
      SkinThickness: "",
      Insulin: "",
      BMI: "",
      DiabetesPedigreeFunction: "",
      Age: "",
    });

    setResult(null);

    setErrors({});
  }

  function handleSampleData() {

    setFormData({
      Pregnancies: 2,
      Glucose: 140,
      BloodPressure: 72,
      SkinThickness: 30,
      Insulin: 120,
      BMI: 28.5,
      DiabetesPedigreeFunction: 0.45,
      Age: 35,
    });

    setErrors({});
  }
  
  return (
    <>

      <Navbar />
      <div id="hero">
         <Hero />
      </div>
      <Features />
      <EDASection />


<div id="dashboard" className="app-container">
  <h2 className="section-title">
    📊 Dashboard Overview
</h2>

<div className="dashboard-grid">
  <div className="stat-card">
    <div className="stat-icon">👥</div>

    <h3>Dataset</h3>

    <h2>768</h2>

    <p>Pima Indians Patients</p>
  </div>

  <div className="stat-card">
    <div className="stat-icon">🧠</div>

    <h3>Model</h3>

    <h2>{metadata?.best_model || "Loading..."}</h2>

    <p>Best Performing Model</p>
  </div>

  <div className="stat-card">
    <div className="stat-icon">🎯</div>

    <h3>Accuracy</h3>

    <h2>
      {metadata
        ? `${(metadata.accuracy * 100).toFixed(2)}%`
        : "Loading..."}
    </h2>

    <p>Model Test Accuracy</p>
  </div>

  <div className="stat-card">
    <div className="stat-icon">📊</div>

    <h3>Features</h3>

    <h2>
      {metadata ? metadata.features.length : "Loading..."}
    </h2>

    <p>Medical Parameters</p>
  </div>

</div>


  <div id="prediction" className="section">

        <div className="card prediction-form">

          <h2 className="form-title">
             Enter Patient Details
          </h2>

          <
            form onSubmit={handleSubmit}
            className="form-grid"
            >

            <InputField
              label="Pregnancies"
              name="Pregnancies"
              value={formData.Pregnancies}
              onChange={handleChange}
              placeholder="0 - 20"
              min={0}
              max={20}
              error={errors.Pregnancies}
              description="Number of times pregnant"
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
              description="Blood glucose concentration level"
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
              description="Diastolic blood pressure measurement"
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
              description="enter skin thickness"
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
              description="Insulin"
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
              description="Body Mass Index value"
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
              description="Diabetes Pedigree Function"
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
              description="Patient age in years"
            />

            <div className="button-group">

              <button
                className="primary-btn"
                type="submit"
              >
                {loading ? "⏳ Predicting..." : "🔍 Predict Diabetes"}
              </button>

              <button
                type="button"
                className="secondary-btn"
                onClick={handleReset}
              >
                🔄 Reset
              </button>

              <button
                type="button"
                className="secondary-btn"
                onClick={handleSampleData}
              >
                🧪 Sample Data
              </button>

            </div>

          </form>

        </div>

        <PredictionCard
        result={result}
        patient={formData}
        />
        
        <div id="history">
           <History />
        </div>

      </div>
     </div>
      <Footer />

    </>
  );
}

export default App;