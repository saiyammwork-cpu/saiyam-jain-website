import React, { useState } from 'react';
import { ShoppingCart, Bot, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import saiyamProfilePhoto from '../assets/saiyam_profile.jpg';

export default function Navbar({ activeTab, setActiveTab, cartCount = 0, setIsCartOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Saiyam' },
    { id: 'services', label: 'Services & Pricing' },
    { id: 'courses', label: 'Courses' },
    { id: 'prompts', label: 'Prompts Vault', badge: 'Hot' },
    { id: 'sam', label: 'SAM AI Hub', isAi: true },
    { id: 'contact', label: 'Contact & Hire' }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Right Floating Action Controls */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        {/* Cart Icon Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          style={{
            position: 'relative',
            background: '#FFFFFF',
            color: '#070913',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(255, 255, 255, 0.2)'
          }}
          title="View Shopping Cart"
        >
          <ShoppingCart size={18} />
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              background: '#EF4444',
              color: '#FFF',
              fontSize: '0.65rem',
              fontWeight: 900,
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {cartCount}
            </span>
          )}
        </button>

        {/* Menu Pill Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: '#070913',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: '9999px',
            padding: '10px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontSize: '0.88rem',
            fontWeight: 700,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)'
          }}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
        </button>
      </div>

      {/* Full Glass Menu Overlay when Menu Pill is Tapped */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: '76px',
              right: '20px',
              zIndex: 9998,
              width: '300px',
              maxWidth: 'calc(100vw - 40px)',
              background: 'rgba(17, 20, 34, 0.96)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '24px',
              padding: '14px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  padding: '12px 18px',
                  borderRadius: '14px',
                  border: 'none',
                  background: activeTab === item.id ? '#FFFFFF' : 'rgba(255, 255, 255, 0.06)',
                  color: activeTab === item.id ? '#070913' : '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{item.label}</span>
                {item.isAi ? (
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: activeTab === item.id ? '#070913' : '#FFFFFF', color: activeTab === item.id ? '#FFFFFF' : '#070913', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bot size={12} />
                  </div>
                ) : item.badge ? (
                  <span style={{ fontSize: '0.62rem', background: '#FFFFFF', color: '#070913', padding: '2px 6px', borderRadius: '6px', fontWeight: 900 }}>
                    {item.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
