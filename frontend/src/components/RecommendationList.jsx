function RecommendationList({ recommendations }) {

  if (!recommendations) return null;

  return (

    <div className="recommendations">

      <h3>💡 Health Recommendations</h3>

      <ul>

        {recommendations.map((item, index) => (

          <li key={index}>
            ✅ {item}
          </li>

        ))}

      </ul>

    </div>

  );
}

export default RecommendationList;