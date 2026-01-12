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

    window.location.href = "/order-status";
  };

  //  REMOVE WITH ANIMATION
  const handleRemove = (id) => {
    const el = document.getElementById("item-" + id);
    if (el) {
      el.classList.add("remove-anim");
      setTimeout(() => removeFromCart(id), 300);
    } else {
      removeFromCart(id);
    }
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart-ui">
          <div className="empty-cart-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
              alt="Chef"
              className="empty-cart-illustration"
            />

            <h2>Your cart is feeling hungry 😋</h2>
            <p>Looks like the chef is waiting for your order!</p>

            <button
              className="empty-cart-btn"
              onClick={() => window.history.back()}
            >
              🍔 Explore Menu
            </button>
          </div>
        </div>
      ) : (
        <div className="cart-layout">

          {/* LEFT SIDE – ITEMS */}
          <div className="cart-left">

            <div className="cart-items">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  id={"item-" + item.id}
                  className="cart-item animate-item"
                >
                  <img src={item.image} alt={item.name} />

                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p className="price">₹{item.price}</p>

                    <div className="qty-control">
                      <button onClick={() => decreaseQty(item.id)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => increaseQty(item.id)}>+</button>
                    </div>
                  </div>

                  <div className="item-actions">
                    <div className="item-price-total">
                      ₹{item.price * item.qty}
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ADD MORE BUTTON BELOW ITEMS */}
            <button
              className="add-more-btn"
              onClick={() => window.history.back()}
            >
              + Add More Items
            </button>
          </div>

          {/* RIGHT SIDE – BILLING */}
          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Total Items</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="summary-row">
              <span>Items Total</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="divider"></div>

            <div className="grand-total-box">
              <p>Total Payable</p>
              <h2>₹{totalPrice}</h2>
            </div>

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
