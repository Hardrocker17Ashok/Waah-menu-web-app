import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./EmojiLoader.css";

const EmojiLoader = () => {
  const barRef = useRef(null);

  useEffect(() => {
    gsap.to(barRef.current, {
      x: 420,
      duration: 2.2,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  return (
    <div className="pro-loader-screen">
      <div className="pro-loader-box">

        <h1 className="pro-brand">
          <span className="brand-fill">WAAH</span>
          <span className="brand-outline">WAAH</span>
        </h1>

        <p className="pro-tagline">Taste that makes you smile 🤤</p>

        <div className="pro-line-track">
          <div className="pro-line" ref={barRef}></div>
        </div>

      </div>
    </div>
  );
};

export default EmojiLoader;


