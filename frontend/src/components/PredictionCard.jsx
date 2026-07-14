import RecommendationList from "./RecommendationList";

function PredictionCard({ result }) {
  if (!result) return null;

  const isHighRisk = result.prediction === 1;

  return (
    <div className="prediction-card">

      <h2>Prediction Result</h2>

      <div className={isHighRisk ? "risk high" : "risk low"}>
        {isHighRisk ? "🔴 High Diabetes Risk" : "🟢 Low Diabetes Risk"}
      </div>

      <div className="confidence">

        <p>
          <strong>Confidence</strong>
        </p>

        <div className="progress">

          <div
            className="progress-fill"
            style={{
              width: `${result.probability}%`
            }}
          ></div>

        </div>

        <p>{result.probability}%</p>

      </div>

      <RecommendationList
        recommendations={result.recommendation}
      />

    </div>
  );
}

export default PredictionCard;