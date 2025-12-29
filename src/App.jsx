import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/context/cartContext';

import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Home from './components/pages/home';
import Categories from './components/pages/categories';
import CartPage from './components/layout/cart'; // Cart page component
import CartSidebar from './components/layout/cartSidebar'; // Cart sidebar component
import CartIcon from './components/layout/cartIcon'; // Cart icon for header

// You might need placeholders for these if you haven't created them yet
// import Bookings from './components/pages/bookings'
import Faq from './components/pages/faq'
// import Login from './components/pages/login'

import './App.css';
import './assets/styles/cart.css'; // Import cart styles

function App() {
  return (
    <CartProvider> {/* Wrap entire app with CartProvider */}
      <Router>
        <Header>
          {/* Add CartIcon to your header */}
          <CartIcon />
        </Header>
        
        {/* Cart Sidebar - Available on all pages */}
        <CartSidebar />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/cart" element={<CartPage />} /> {/* Cart page route */}
            
            {/* Placeholder routes for the other menu items */}
            <Route path="/bookings" element={<div>Bookings Page</div>} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;