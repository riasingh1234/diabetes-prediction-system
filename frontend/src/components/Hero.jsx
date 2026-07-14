function Hero() {

    function scrollToForm() {

        document
            .querySelector(".prediction-form")
            ?.scrollIntoView({
                behavior: "smooth"
            });

    }


    return (

        <section className="hero fade-in">

            <h1>
                🩺 AI Diabetes Prediction System
            </h1>


            <p>
                Predict diabetes risk using Machine Learning
                and get instant health insights.
            </p>


            <p>

                Early detection helps prevent serious health
                complications.

                <br />

                This application uses

                <strong>
                    {" "}Random Forest Classification{" "}
                </strong>

                trained on the

                <strong>
                    {" "}Pima Indians Diabetes Dataset.
                </strong>

            </p>


            <button
                onClick={scrollToForm}
            >
                🔽 Start Prediction
            </button>


        </section>

    );

}


export default Hero;