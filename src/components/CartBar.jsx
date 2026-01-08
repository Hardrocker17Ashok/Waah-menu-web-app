import { Link } from "react-router-dom";
import { useCart } from "../store/CartContext";
import "./CartBar.css";

const CartBar = () => {
  const { cartItems, totalItems } = useCart();

  if (totalItems === 0) return null; // ❌ cart empty → hide

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
