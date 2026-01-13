import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import Lenis from "@studio-freight/lenis";



const Home = () => {

  useEffect(() => {

    // ===== PREMIUM SMOOTH SCROLL ENGINE =====
    const lenis = new Lenis({
      duration: 1.8,      // inertia duration
      smooth: true,
      smoothTouch: false,
      wheelMultiplier: 1.2,
    });
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // ===== YOUR EXISTING LOGIC (UNCHANGED) =====

    // About section animation
    const aboutFrames = document.querySelectorAll(".about-frame");
    const aboutObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.3 }
    );

    aboutFrames.forEach((frame) => aboutObserver.observe(frame));

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

    // HERO PARALLAX (optimized)
    const heroImg = document.querySelector(".hero-image");
    const onScroll = () => {
      const y = window.scrollY;
      if (heroImg) {
        heroImg.style.transform = `translateY(${y * 0.15}px) scale(1.05)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      lenis.destroy();
    };

  }, []);



  return (
    <div className="home">

      {/* ================= HERO ================= */}
      <section className="hero-banner" id="home">

        {/* Background Video */}
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="newherovedio.mp4" type="video/mp4" />
        </video>

        {/* Soft overlay */}
        <div className="hero-overlay"></div>

        {/* Hero Content */}
        <div className="hero-wrapper">
          <div className="hero-glass">

            <h1 className="hero-title animate-title">
              Taste That Makes You <br /> Say <span>“Waah”</span>
            </h1>

            <p className="hero-subtitle animate-subtitle">
              Premium quality food, hygienic kitchen <br />
              and direct ordering from Waah Restaurant
            </p>

            <div className="hero-actions animate-buttons">
              <Link to="/menu" className="hero-btn primary">
                View Menu
              </Link>
              <Link to="/cart" className="hero-btn secondary">
                Order Now
              </Link>
            </div>

          </div>

        </div>

      </section>

      {/* ===== FOOD LUXURY BRIDGE ===== */}
      <div className="food-bridge">
        <div className="food-bridge-glow"></div>
        <div className="food-bridge-wave"></div>
      </div>


      {/* ================= ABOUT ================= */}


      <section className="about-section"id="about">
        {/* Frame 1 */}
        <div className="about-frame">
          <div className="about-image">
            <img
              src="/aboutfront.jpg"
              alt="About Waah Restaurant"
            />
          </div>



          <div className="about-text">
            <h2>About Waah Restaurant</h2>
            <p>
              Waah Restaurant brings you authentic taste crafted with premium
              ingredients and prepared in a hygienic kitchen. Our chefs blend
              traditional flavors with modern cooking techniques to give you
              an unforgettable dining experience.
            </p>

            <p>
              We believe food is not just a meal, it's a celebration of taste,
              culture, and quality. Every dish is made with love and served with pride.
            </p>
          </div>
        </div>

        {/* Frame 2 */}
        <div className="about-frame reverse">
          <div className="about-image">
            <img
              src="/promisfront.jpg"
              alt="About Waah Restaurant"
            />
          </div>


          <div className="about-text">
            <h2>Our Promise</h2>
            <p>
              We are committed to delivering freshly prepared food, fast service,
              and a seamless ordering experience. No middlemen, no commissions —
              just pure taste directly from our kitchen to your plate.
            </p>

            <p>
              Whether dining in or ordering online, Waah Restaurant promises
              premium quality and unmatched flavor in every bite.
            </p>
          </div>
        </div>

        {/* Frame 3 */}
        <div className="about-frame">
          <div className="about-image">
            <img
              src="/cheiffront.jpg"
              alt="About Waah Restaurant"
            />
          </div>


          <div className="about-text">
            <h2>Our Expert Chefs</h2>
            <p>
              Our expert chefs bring years of culinary experience and passion
              to every dish. Each recipe is carefully crafted to deliver
              authentic flavors and unforgettable taste.
            </p>

            <p>
              We focus on freshness, quality, and presentation to ensure every
              plate looks as good as it tastes.
            </p>
          </div>
        </div>

        {/* Frame 4 */}
        <div className="about-frame reverse">
          <div className="about-image">
            <img
              src="/frontabsence.jpg"
              alt="About Waah Restaurant"
            />
          </div>


          <div className="about-text">
            <h2>Our Ambience</h2>
            <p>
              Enjoy a warm, elegant, and comfortable dining environment.
              Our restaurant is designed to give you a relaxing and
              memorable experience.
            </p>

            <p>
              Whether you're with family, friends, or colleagues, Waah Restaurant
              is the perfect place to enjoy delicious food and great moments.
            </p>
          </div>
        </div>


      </section>


      <div className="food-bridge">
        <div className="food-bridge-glow"></div>
        <div className="food-bridge-wave"></div>
      </div>

      {/* ================= WHY US ================= */}
      <section className="section why-section" id="why">
        <div className="why-content">
          <h2>Why Choose Waah?</h2>
          {/* ===== WHY US IMAGE STRIP ===== */}

          <div className="why-image-strip">
            <div className="why-image-track">
              <img src="why1.jpg" alt="Food 1" />
              <img src="why2.jpg" alt="Food 2" />
              <img src="why3.jpg" alt="Food 3" />
              <img src="why4.jpg" alt="Food 4" />
              <img src="why5.jpg" alt="Food 5" />
              <img src="why6.jpg" alt="Food 6" />
              <img src="why7.jpg" alt="Food 7" />
              <img src="why8.jpg" alt="Food 8" />
              <img src="why9.jpg" alt="Food 9" />
              <img src="why10.jpg" alt="Food 10" />
              <img src="why11.jpg" alt="Food 10" />
              <img src="why12.jpg" alt="Food 10" />
              <img src="why13.jpg" alt="Food 10" />

              {/* Duplicate for infinite loop */}
              <img src="/why1.jpg" alt="Food 1" />
              <img src="/why2.jpg" alt="Food 2" />
              <img src="/why3.jpg" alt="Food 3" />
              <img src="/why4.jpg" alt="Food 4" />
            </div>
          </div>


          <ul>
            <li>🍽️ Freshly prepared food</li>
            <li>⚡ Fast service & instant order</li>
            <li>💰 No extra commission</li>
            <li>👨‍🍳 Hygienic kitchen</li>
          </ul>
        </div>
      </section>

      <div className="food-bridge">
        <div className="food-bridge-glow"></div>
        <div className="food-bridge-wave"></div>
      </div>

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
