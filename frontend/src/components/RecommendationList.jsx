function RecommendationList({ recommendations }) {

  if (!recommendations || recommendations.length === 0) return null;

  return (

    <div className="recommendation-section">

      <h3>💡 Personalized Health Recommendations</h3>

      <div className="recommendation-grid">

        {recommendations.map((item, index) => (

          <div
            className="recommendation-item"
            key={index}
          >

            <div className="recommendation-icon">

              {index === 0 && "🥗"}
              {index === 1 && "🚶"}
              {index === 2 && "💧"}
              {index === 3 && "😴"}
              {index > 3 && "✅"}

            </div>

            <p>{item}</p>

          </div>

        ))}

      </div>

    </div>

  );
}

export default RecommendationList;