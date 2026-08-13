import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SAMWidget from './components/SAMWidget';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';

import Home from './pages/Home';
import AboutSaiyam from './pages/AboutSaiyam';
import Services from './pages/Services';
import Courses from './pages/Courses';
import Prompts from './pages/Prompts';
import SAMHub from './pages/SAMHub';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import UserDashboard from './pages/UserDashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalDefaultTab, setAuthModalDefaultTab] = useState('signin');

  const openAuthModal = (tab = 'signin') => {
    setAuthModalDefaultTab(tab);
    setIsAuthModalOpen(true);
  };

  // URL Path Synchronization & Permanent Dark Theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('saiyam_theme', 'dark');

    const path = window.location.pathname.toLowerCase();
    if (path.includes('about')) {
      setActiveTab('about');
    } else if (path.includes('dashboard')) {
      setActiveTab('dashboard');
    }
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
      case 'about':
        return <AboutSaiyam setActiveTab={setActiveTab} />;
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
      case 'dashboard':
        return <UserDashboard setActiveTab={setActiveTab} openAuthModal={openAuthModal} />;
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
        openAuthModal={openAuthModal}
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

      {/* Sign In & Sign Up Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onAuthSuccess={() => setActiveTab('dashboard')} 
        defaultTab={authModalDefaultTab}
      />

      {/* Global Floating AI Agent SAM Widget */}
      <SAMWidget setActiveTab={setActiveTab} />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
