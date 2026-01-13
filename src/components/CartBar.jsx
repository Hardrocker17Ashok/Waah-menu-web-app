import { Link, useLocation } from "react-router-dom";
import { useCart } from "../store/CartContext";
import "./CartBar.css";
import { useEffect, useState } from "react";

const CartBar = () => {
  const { cartItems, totalItems } = useCart();
  const location = useLocation();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (totalItems > 0) {
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 450); // exit animation time
    }
  }, [totalItems]);

  // cart empty & animation finished → hide
  if (!visible && totalItems === 0) return null;

  // sirf menu page par hi dikhe
  if (location.pathname !== "/menu") return null;

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className={`cart-bar ${totalItems === 0 ? "hide" : "show"}`}>
      <div className="cart-bar-left">
        <strong>{totalItems} item{totalItems > 1 ? "s" : ""}</strong>
        <span>₹{totalPrice}</span>
      </div>

      <Link to="/cart" className="cart-bar-btn">
        View Cart →
      </Link>
    </div>
  );
};

export default CartBar;
