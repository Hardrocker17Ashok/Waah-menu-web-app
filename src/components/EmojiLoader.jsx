import "./EmojiLoader.css";

const EmojiLoader = () => {
  return (
    <div className="emoji-loader-wrapper">
      <div className="emoji-circle-loader small">

        <div className="emoji-rotator">
          <span className="e1">🍔</span>
          <span className="e2">🍕</span>
          <span className="e3">🌮</span>
          <span className="e4">🍟</span>
        </div>

        <div className="loader-text">
          Loading...
        </div>

      </div>
    </div>
  );
};

export default EmojiLoader;
