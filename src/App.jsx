import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CartBar from "./components/CartBar";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderStatus from "./pages/OrderStatus";

import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";

import SeedMenu from "./seed/SeedMenu";

import { CartProvider } from "./store/CartContext";

import EmojiLoader from "./components/EmojiLoader";

function App() {
  const [loading, setLoading] = useState(true);

  // 🔥 GLOBAL LOADER (ALL PAGES)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />

        {/* 🔥 EMOJI LOADER */}
        {loading && <EmojiLoader />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-status" element={<OrderStatus />} />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />

          {/* ⚠️ Seed route: use only once then remove */}
          <Route path="/seed-menu" element={<SeedMenu />} />
        </Routes>

        <CartBar />
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
