import "./OrderStatus.css";

const OrderStatus = () => {
  return (
    <div className="order-status-page">
      <div className="success-card">
        <div className="check-animation">
          ✔
        </div>

        <h1>Order Placed Successfully!</h1>
        <p>Your delicious food is being prepared 👨‍🍳</p>

        <div className="order-info">
          <div>
            <span>Status</span>
            <strong>Confirmed</strong>
          </div>
          <div>
            <span>Estimated Time</span>
            <strong>30 Minutes</strong>
          </div>
          <div>
            <span>Payment</span>
            <strong>Cash on Delivery</strong>
          </div>
        </div>

        <button
          className="back-home-btn"
          onClick={() => window.location.href = "/menu"}
        >
          Back to Menu 🍔
        </button>
      </div>
    </div>
  );
};

export default OrderStatus;
