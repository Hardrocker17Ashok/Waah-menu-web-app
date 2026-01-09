import { useRef, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // logo animation re-trigger
  useEffect(() => {
    if (!logoRef.current) return;
    logoRef.current.classList.remove("drop-logo");
    void logoRef.current.offsetWidth;
    logoRef.current.classList.add("drop-logo");
  }, [location.pathname]);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);

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
        <Link
          to="/"
          ref={logoRef}
          className="navbar-logo drop-logo"
          style={{ textDecoration: "none" }}
        >
          Waah<span>Restaurant</span>
        </Link>


        {/* DESKTOP LINKS */}
        <nav className="navbar-links desktop-only">
          <button onClick={() => scrollToSection("about")}>About</button>
          <button onClick={() => scrollToSection("why")}>Why Us</button>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart</Link>
        </nav>

        {/* CTA */}
        <Link to="/menu" className="navbar-cta">
          Order Now
        </Link>

        {/* MOBILE MENU ICON */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <div
        className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}
        onMouseLeave={() => setMobileMenuOpen(false)}
      >
        <button onClick={() => scrollToSection("about")}>About</button>
        <button onClick={() => scrollToSection("why")}>Why Us</button>
        <Link to="/menu" onClick={() => setMobileMenuOpen(false)}>Menu</Link>
        <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>Cart</Link>
      </div>
    </header>
  );
};

export default Navbar;
