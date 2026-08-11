import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SAMWidget from './components/SAMWidget';
import CartDrawer from './components/CartDrawer';

import Home from './pages/Home';
import Services from './pages/Services';
import Courses from './pages/Courses';
import Prompts from './pages/Prompts';
import SAMHub from './pages/SAMHub';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Permanent Dark Theme Enforcement
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('saiyam_theme', 'dark');
  }, []);

  // Global Cart State
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem('saiyam_cart') || '[]');
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync Cart to localStorage
  useEffect(() => {
    localStorage.setItem('saiyam_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === newItem.id);
      if (existing) {
        return prev.map(i => i.id === newItem.id ? { ...i, quantity: i.quantity + (newItem.quantity || 1) } : i);
      }
      return [...prev, newItem];
    });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} />;
      case 'services':
        return <Services setActiveTab={setActiveTab} addToCart={addToCart} setIsCartOpen={setIsCartOpen} />;
      case 'courses':
        return <Courses setActiveTab={setActiveTab} />;
      case 'prompts':
        return <Prompts />;
      case 'sam':
        return <SAMHub setActiveTab={setActiveTab} />;
      case 'contact':
        return <Contact setActiveTab={setActiveTab} />;
      case 'admin':
        return <Admin />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)', width: '100%', overflowX: 'hidden' }}>
      {/* Navigation Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cartCount={totalCartCount}
        setIsCartOpen={setIsCartOpen}
      />

      {/* Main Page View */}
      <main style={{ flex: 1 }}>
        {renderActivePage()}
      </main>

      {/* Interactive Cart Drawer & Checkout Modal */}
      <CartDrawer 
        cart={cart} 
        setCart={setCart} 
        isOpen={isCartOpen} 
        setIsOpen={setIsCartOpen} 
        setActiveTab={setActiveTab} 
      />

      {/* Global Floating AI Agent SAM Widget */}
      <SAMWidget setActiveTab={setActiveTab} />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
