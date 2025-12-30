// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/context/cartContext";
import { NotifProvider } from "./components/context/notifContext";

import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import Home from "./components/pages/home";
import Categories from "./components/pages/categories";
import CartPage from "./components/layout/cart";
import CartSidebar from "./components/layout/cartSidebar";
import NotifSidebar from "./components/layout/notifSidebar";

import Faq from "./components/pages/faq";
import Login from "./components/pages/login";
import Signup from "./components/pages/signup";

import ProfilePage from "./components/pages/profile"; // ✅ ADD THIS

import "./App.css";
import "./assets/styles/cart.css";

function App() {
  return (
    <CartProvider>
      <NotifProvider>
        <Router>
          <Header />
          <CartSidebar />
          <NotifSidebar />

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/bookings" element={<div>Bookings Page</div>} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* ✅ REAL PROFILE PAGE */}
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>

          <Footer />
        </Router>
      </NotifProvider>
    </CartProvider>
  );
}

export default App;
