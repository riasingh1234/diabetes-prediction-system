function Navbar() {

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <nav className="navbar">

      <div className="navbar-logo">

        <h1>🩺 DiabetesAI</h1>

        <p>AI Powered Healthcare</p>

      </div>

      <div className="navbar-links">

        <button onClick={() => scrollTo("hero")}>
          Home
        </button>

        <button onClick={() => scrollTo("dashboard")}>
          Dashboard
        </button>

        <button onClick={() => scrollTo("prediction")}>
          Prediction
        </button>

        <button onClick={() => scrollTo("history")}>
          History
        </button>

      </div>

    </nav>
  );
}

export default Navbar;