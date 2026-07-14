function Features() {
  const features = [
    {
      icon: "🧠",
      title: "AI Powered",
      text: "Random Forest model trained on medical data.",
    },
    {
      icon: "⚡",
      title: "Instant Prediction",
      text: "Receive diabetes risk analysis in seconds.",
    },
    {
      icon: "🔒",
      title: "Secure",
      text: "Predictions are processed securely without storing patient data.",
    },
    {
      icon: "📊",
      title: "8 Health Parameters",
      text: "Prediction based on eight important medical features.",
    },
  ];

  return (
    <section className="features-section">

      <h2 className="section-title">
        Why Use This System?
      </h2>

      <div className="features-grid">

        {features.map((feature, index) => (
          <div className="feature-card" key={index}>

            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.text}</p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Features;