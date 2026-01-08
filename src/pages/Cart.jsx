import { useState } from "react";
import { useCart } from "../store/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cartItems, increaseQty, decreaseQty, removeFromCart } = useCart();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handlePlaceOrder = () => {
    if (!name || mobile.length !== 10) {
      alert("Please enter valid name & 10 digit mobile number");
      return;
    }

    alert("✅ Order placed successfully!");
    // 🔥 Yaha aage tu WhatsApp / Firebase / API integrate karega
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty 🛒</p>
      ) : (
        <div className="cart-layout">
          {/* LEFT SIDE – ITEMS */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />

                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>

                  <div className="qty-control">
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>
                </div>

                <div className="item-total">
                  ₹{item.price * item.qty}
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE – SUMMARY */}
          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Total Items</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="summary-row">
              <span>Total Amount</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="divider"></div>

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="tel"
              placeholder="Mobile Number"
              value={mobile}
              maxLength="10"
              onChange={(e) => setMobile(e.target.value)}
            />

            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order ₹{totalPrice}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
