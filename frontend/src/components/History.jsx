import { useEffect, useState } from "react";


function History() {


  const [history, setHistory] = useState([]);



  useEffect(() => {

    loadHistory();

  }, []);



  function loadHistory() {

    const data = JSON.parse(
      localStorage.getItem("history") || "[]"
    );

    setHistory(data);

  }




  function clearHistory() {

    localStorage.removeItem("history");

    setHistory([]);

  }




  return (

    <div className="history-container">


      <h2 className="history-title">
        📜 Prediction History
      </h2>




      {

        history.length === 0 ?


        (

          <div className="history-card empty-history">

            <p>
              No previous predictions available.
            </p>

          </div>

        )


        :


        (

          <>


          {

          history.map((item,index)=>(


            <div

              key={index}

              className="history-card"


            >


              <div>


                <h3>

                  Prediction #{history.length-index}

                </h3>



                <p>

                  📅 {item.date}

                </p>



                <p>

                  👤 Age:
                  {" "}
                  {item.patient.Age} years

                </p>



                <p>

                  🩸 Glucose:
                  {" "}
                  {item.patient.Glucose}

                </p>



                <p>

                  ⚖ BMI:
                  {" "}
                  {item.patient.BMI}

                </p>



              </div>





              <div>


                <p
                  className="history-risk"
                >

                  ⚠ {item.result}

                </p>



                <p>

                  🎯 Confidence:
                  {" "}
                  {item.confidence}%

                </p>


              </div>



            </div>


          ))

          }





          <button

            className="clear-btn"

            onClick={clearHistory}

          >

            🗑 Clear History

          </button>


          </>

        )

      }



    </div>

  );

}


export default History;