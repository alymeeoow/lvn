import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./components/context/cartContext";
import { NotifProvider } from "./components/context/notifContext";

// ===== Layout =====
// import Header from "./components/layout/header";
// import Footer from "./components/layout/footer";

// ===== Pages =====
// import Home from "./components/pages/home/home";
// import Categories from "./components/pages/categories/categories";
// import Bookings from "./components/pages/booking/bookings";
// import Faq from "./components/pages/faq/faq";

// ===== Cart / Notifications =====
// import CartPage from "./components/layout/cart";
// import CartSidebar from "./components/layout/cartSidebar";
// import NotifSidebar from "./components/layout/notifSidebar";

// ===== Auth =====
// import Login from "./components/pages/auth/login";
// import Signup from "./components/pages/auth/signup";

// ===== Account =====
// import ProfilePage from "./components/pages/account/profile";
// import MyAddresses from "./components/pages/account/address";
// import ChangePassword from "./components/pages/account/changePassword";
// import Payment from "./components/pages/account/payment";

// ===== Coming Soon =====
import ComingSoon from "./components/pages/coming-soon/comingSoon";

import "./App.css";
import "./assets/styles/cart.css";

function App() {
  return (
    <CartProvider>
      <NotifProvider>
        <Router>
          {/* ========================= */}
          {/* COMING SOON MODE (ACTIVE) */}
          {/* ========================= */}

          <main>
            <ComingSoon />
          </main>

          {/* ========================= */}
          {/* FULL APP (DISABLED) */}
          {/* ========================= */}

          {/*
          <Header />
          <CartSidebar />
          <NotifSidebar />

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route path="/addresses" element={<MyAddresses />} />
              <Route path="/changepass" element={<ChangePassword />} />
              <Route path="/payment" element={<Payment />} />

              <Route path="/profile" element={<ProfilePage />}>
                <Route path="payment" element={<div>Payment Options</div>} />
              </Route>
            </Routes>
          </main>

          <Footer />
          */}
        </Router>
      </NotifProvider>
    </CartProvider>
  );
}

export default App;
