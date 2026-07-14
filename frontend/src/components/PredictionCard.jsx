import RecommendationList from "./RecommendationList";


function PredictionCard({ result }) {


  if (!result) return null;


  const isHighRisk = result.prediction === 1;


  return (

    <div className="card result-card fade-in">


      <h2>
        🩺 Prediction Result
      </h2>



      <div
        className={
          `risk-badge ${
            isHighRisk 
            ? "high-risk" 
            : "low-risk"
          }`
        }
      >

        {
          isHighRisk
          ? "🔴 High Diabetes Risk"
          : "🟢 Low Diabetes Risk"
        }

      </div>




      <div className="health-score">

    <div>

        {result.probability}%

        <br/>

        <span>
            Health Score
        </span>

    </div>

</div>




      <div className="confidence-container">


        <div className="progress-bar">

          <div

            className="progress-fill"

            style={{
              width:`${result.probability}%`
            }}

          >

          </div>


        </div>


      </div>





      <div className="recommendation-card">


        <h3>
          📋 Prediction Summary
        </h3>



        <ul>

          <li>
            🧠 Model Used:
            <strong>
              {" "}Random Forest
            </strong>
          </li>


          <li>
            ⚠ Risk Level:
            <strong>
              {" "}{result.risk}
            </strong>
          </li>


          <li>
            🎯 Confidence:
            <strong>
              {" "}{result.probability}%
            </strong>
          </li>


          <li>
            📅 Time:
            <strong>
              {" "}
              {new Date().toLocaleString()}
            </strong>
          </li>


        </ul>


      </div>





      <RecommendationList

        recommendations={
          result.recommendation
        }

      />


    </div>

  );

}


export default PredictionCard;