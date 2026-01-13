import { useRef, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";


const Navbar = () => {
  const mobileMenuRef = useRef(null);

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
  // close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setMobileMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mobileMenuOpen]);


  // logo animation re-trigger
  useEffect(() => {
    if (!logoRef.current) return;
    logoRef.current.classList.remove("drop-logo");
    void logoRef.current.offsetWidth;
    logoRef.current.classList.add("drop-logo");
  }, [location.pathname]);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);

    const waitForSectionAndScroll = () => {
      const section = document.getElementById(id);

      if (!section) {
        // DOM not ready yet, retry
        setTimeout(waitForSectionAndScroll, 100);
        return;
      }

      // Use Lenis if available
      if (window.lenis) {
        window.lenis.scrollTo(section, {
          offset: -90,
          duration: 1.3,
          easing: (t) => 1 - Math.pow(1 - t, 3),
        });
      } else {
        section.scrollIntoView({ behavior: "smooth" });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      waitForSectionAndScroll();   // start waiting immediately
    } else {
      waitForSectionAndScroll();
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
        ref={mobileMenuRef}
        className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}
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
