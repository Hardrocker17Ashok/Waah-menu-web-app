import { useRef, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const ctaRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // scroll detection
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 🔥 re-trigger animations on every route change
  useEffect(() => {
    if (logoRef.current) {
      logoRef.current.classList.remove("drop-logo");
      void logoRef.current.offsetWidth;
      logoRef.current.classList.add("drop-logo");
    }

    if (linksRef.current) {
      linksRef.current.classList.remove("nav-links-animate");
      void linksRef.current.offsetWidth;
      linksRef.current.classList.add("nav-links-animate");
    }

    if (ctaRef.current) {
      ctaRef.current.classList.remove("cta-bounce");
      void ctaRef.current.offsetWidth;
      ctaRef.current.classList.add("cta-bounce");
    }
  }, [location.pathname]);

  // magnetic CTA only
  const handleMouseMove = (e) => {
    const btn = ctaRef.current;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const reset = () => {
    ctaRef.current.style.transform = "translate(0,0)";
  };

  // smooth scroll
  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header ref={navRef} className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar-inner">

        {/* LOGO */}
        <div ref={logoRef} className="navbar-logo drop-logo">
          Waah<span>Restaurant</span>
        </div>

        {/* LINKS */}
        <nav ref={linksRef} className="navbar-links nav-links-animate">
          <button onClick={() => scrollToSection("about")}>About</button>
          <button onClick={() => scrollToSection("why")}>Why Us</button>

          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart</Link>
        </nav>

        {/* CTA */}
        <Link
          to="/menu"
          ref={ctaRef}
          className="navbar-cta cta-bounce"
          onMouseMove={handleMouseMove}
          onMouseLeave={reset}
        >
          Order Now
        </Link>

      </div>
    </header>
  );
};

export default Navbar;
