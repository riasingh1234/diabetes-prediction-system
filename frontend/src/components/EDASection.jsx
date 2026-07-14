function EDASection() {
  return (
    <section className="eda-section">

      <h2 className="section-title">
        📊 Exploratory Data Analysis
      </h2>

      <p className="eda-description">
        Before training the machine learning model, the dataset was explored
        to understand class balance, feature relationships, and data distribution.
      </p>

      <div className="eda-grid">

        <div className="eda-card">
          <h3>Class Distribution</h3>
          <img
            src="/images/class_distribution.png"
            alt="Class Distribution"
          />
        </div>

        <div className="eda-card">
          <h3>Correlation Heatmap</h3>
          <img
            src="/images/correlation_heatmap.png"
            alt="Correlation Heatmap"
          />
        </div>

        <div className="eda-card full-width">
          <h3>Feature Histograms</h3>
          <img
            src="/images/histograms.png"
            alt="Feature Histograms"
          />
        </div>

      </div>

    </section>
  );
}

export default EDASection;