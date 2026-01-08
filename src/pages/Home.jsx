import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {

  useEffect(() => {
    // section reveal (keep)
    const sections = document.querySelectorAll(".section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.15 }
    );
    sections.forEach((sec) => observer.observe(sec));

    // HERO PARALLAX
    const heroImg = document.querySelector(".hero-image");
    const onScroll = () => {
      const y = window.scrollY;
      if (heroImg) {
        heroImg.style.transform = `translateY(${y * 0.25}px) scale(1.15)`;
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="home">

      {/* ================= HERO ================= */}
      <section className="hero-banner">

        {/* background image */}
        <div className="hero-image"></div>

        {/* overlay */}
        <div className="hero-overlay"></div>

        {/* CONTENT */}
        <div className="hero-content">
          <h1 className="hero-title">
            Taste That Makes You <br /> Say “Waah”
          </h1>

          <p className="hero-subtitle">
            Premium quality food, hygienic kitchen <br />
            and direct ordering from Waah Restaurant
          </p>

          <div className="hero-actions">
            <Link to="/menu" className="hero-btn primary">
              View Menu
            </Link>
            <Link to="/cart" className="hero-btn secondary">
              Order Now
            </Link>
          </div>
        </div>

      </section>

      {/* ================= FEATURES ================= */}
      <section className="section">
        <div className="features">
          <div className="feature-card">
            <h3>Fresh Food</h3>
            <p>Prepared daily with premium ingredients</p>
          </div>
          <div className="feature-card">
            <h3>Fast Service</h3>
            <p>Quick preparation & smooth ordering</p>
          </div>
          <div className="feature-card">
            <h3>Zero Commission</h3>
            <p>No Zomato, no Swiggy, direct order</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
