import { useEffect, useState, useRef } from "react";
import "./Menu.css";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useCart } from "../store/CartContext";
import { useLocation, useNavigate } from "react-router-dom";







const Menu = () => {



  const categoryEmojis = {
    "Chatpati Chaat": "🌶️",
    "Chinese": "🥡",
    "Italian": "🍝",
    "Paranthe Wali Gali": "🫓",
    "Rolls": "🌯",
    "Salad": "🥗",
    "Sandwiches & Burgers": "🍔",
    "Snacks": "🍟",
    "Soup": "🍜",
    "South Indian": "🥘",
    "Tandoori Bread & Papad": "🫓",
    "Tandoori Snacks": "🔥",
    "Thali & Combos": "🍱"
  };


  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [stopScroll, setStopScroll] = useState(false);

  const categoryRefs = useRef({});
  const scrollTimerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { cartItems, addToCart, increaseQty, decreaseQty } = useCart();

  // 🔥 TOTAL QTY FOR FOOTER CART
  const totalQty = cartItems.reduce((sum, i) => sum + i.qty, 0);

  const getQty = (id) => {
    const item = cartItems.find((i) => i.id === id);
    return item ? item.qty : 0;
  };

  // 🔹 FETCH MENU
  useEffect(() => {
    const fetchMenu = async () => {
      const q = query(collection(db, "menu"), orderBy("createdAt", "asc"));
      const snapshot = await getDocs(q);

      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMenuItems(items);
    };

    fetchMenu();
  }, []);

  // 🔹 REPEATABLE SCROLL ANIMATION (DESKTOP + MOBILE)
  useEffect(() => {
    if (menuItems.length === 0) return;

    const cards = document.querySelectorAll(".menu-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [menuItems]);

  // 🔹 UNIQUE CATEGORIES
  const categories = [...new Set(menuItems.map((i) => i.category))];

  // 🔹 CLICK CATEGORY
  const scrollToCategory = (cat) => {
    setActiveCategory(cat);

    // 🛑 temporarily stop animation
    setStopScroll(true);

    // ⏱️ resume after 2.5 sec
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
    }

    scrollTimerRef.current = setTimeout(() => {
      setStopScroll(false);
    }, 2500);

    categoryRefs.current[cat]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // 🔹 SCROLL → AUTO HIGHLIGHT BANNER
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.dataset.category);
          }
        });
      },
      { threshold: 0.35 }
    );

    Object.values(categoryRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [menuItems]);

  return (
    <div className="menu-wrapper">
      {/* 🍳 KITCHEN DECOR ANIMATION */}
      <div className="kitchen-decor left">
        <span>🍳</span>
      </div>

      <div className="kitchen-decor right">
        <span>👨‍🍳</span>
      </div>

      <div className="menu-page">
        <h1 className="menu-title animate-title">
          <span className="menu-title-emoji">📋</span>
          <span className="menu-title-text">Our Menu</span>
        </h1>



        {/* 🔥 STICKY CATEGORY BAR */}
        <div
          className="category-bar"
          onMouseEnter={() => setStopScroll(true)}  // 🛑 stop when hover
          onMouseLeave={() => {
            // ⏱ resume after 1.5 sec
            if (scrollTimerRef.current) {
              clearTimeout(scrollTimerRef.current);
            }

            scrollTimerRef.current = setTimeout(() => {
              setStopScroll(false);
            }, 1500);
          }}
        >
          <div className={`category-track ${stopScroll ? "stop" : ""}`}>
            {[...categories, ...categories].map((cat, i) => (
              <button
                key={i}
                className={`category-pill ${activeCategory === cat ? "active" : ""}`}
                onClick={() => scrollToCategory(cat)}
              >
                <span className="cat-number">
                  {(i % categories.length) + 1}.
                </span>

                <span className="cat-name">{cat}</span>

                <span className="cat-emoji">
                  {categoryEmojis[cat] || "🍽️"}
                </span>
              </button>
            ))}


          </div>
        </div>

        {/* 🔹 MENU LIST */}
        {categories.map((cat) => (
          <div
            key={cat}
            ref={(el) => (categoryRefs.current[cat] = el)}
            data-category={cat}
            className="menu-category-section"
          >
            <h2 className="category-title">
              <span className="title-emoji">{categoryEmojis[cat] || "🍽️"}</span>
              {cat}
            </h2>


            <div className="menu-list grid">
              {menuItems
                .filter((item) => item.category === cat)
                .map((item, index) => {
                  const qty = getQty(item.id);

                  return (
                    <div
                      key={item.id}
                      className={`menu-card ${index % 2 === 0 ? "from-left" : "from-right"
                        }`}
                    >
                      <div
                        className="menu-image"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>

                      <div className="menu-info">
                        <h3>
                          {item.veg && <span className="veg-dot"></span>}
                          {item.name}
                        </h3>

                        <p>₹{item.price}</p>

                        {qty === 0 ? (
                          <button
                            className={`add-btn ${qty > 0 ? "added" : ""}`}
                            onClick={() => addToCart(item)}
                          >
                            {qty > 0 ? "✔ Added" : "Add to Cart"}
                          </button>
                        ) : (
                          <div className="qty-box">
                            <button onClick={() => decreaseQty(item.id)}>
                              -
                            </button>
                            <span>{qty}</span>
                            <button onClick={() => increaseQty(item.id)}>
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 FLOATING CART FOOTER (HIDE ON CART PAGE) */}
      {location.pathname !== "/cart" && totalQty > 0 && (
        <div className="floating-cart">
          <span>{totalQty} item(s) added</span>
          <button onClick={() => navigate("/cart")}>
            View Cart →
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
