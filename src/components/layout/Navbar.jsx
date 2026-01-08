import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navRef = useRef(null);
  const ctaRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  // scroll detection
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <header
      ref={navRef}
      className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
      
    >
      <div className="navbar-inner">

        <div className="navbar-logo">
          Waah<span>Restaurant</span>
        </div>

        <nav className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart</Link>
        </nav>

        <Link
          to="/menu"
          ref={ctaRef}
          className="navbar-cta"
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
