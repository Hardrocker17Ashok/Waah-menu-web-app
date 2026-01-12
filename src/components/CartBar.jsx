import { Link, useLocation } from "react-router-dom";
import { useCart } from "../store/CartContext";
import "./CartBar.css";

const CartBar = () => {
  const { cartItems, totalItems } = useCart();
  const location = useLocation();

  //  cart empty → hide
  if (totalItems === 0) return null;

  //  sirf menu page par hi dikhe
  if (location.pathname !== "/menu") return null;

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="cart-bar">
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
