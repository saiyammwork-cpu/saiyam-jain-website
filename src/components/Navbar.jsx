import React, { useState } from 'react';
import { ShoppingCart, Bot, Flame, X, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar({ activeTab, setActiveTab, cartCount = 0, setIsCartOpen }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services & Pricing' },
    { id: 'courses', label: 'Courses' },
    { id: 'prompts', label: 'Prompts Vault', badge: 'Hot' },
    { id: 'sam', label: 'SAM AI Hub', isAi: true },
    { id: 'contact', label: 'Contact & Hire' }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        pointerEvents: 'none',
        padding: '16px 20px'
      }}
    >
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pointerEvents: 'auto'
      }}>
        
        {/* DESKTOP NAV LINKS CONTAINER (Hidden on Mobile via CSS) */}
        <nav className="desktop-nav-container">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  border: 'none',
                  background: isActive ? '#FFFFFF' : 'transparent',
                  color: isActive ? '#070913' : 'var(--text-muted)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {/* Monochrome SAM AI Bot Icon */}
                {item.isAi && (
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: isActive ? '#070913' : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : '#070913',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Bot size={11} />
                  </div>
                )}
                {item.label}
                {item.badge && (
                  <span style={{
                    fontSize: '0.62rem',
                    background: '#FFFFFF',
                    color: '#070913',
                    padding: '2px 6px',
                    borderRadius: '6px',
                    fontWeight: 800
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* RIGHT SECTION: CART & MOBILE TOGGLE */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
          
          {/* Cart Icon Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'relative',
              background: '#FFFFFF',
              color: '#070913',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)'
            }}
            title="View Shopping Cart"
          >
            <ShoppingCart size={17} />
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

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            pointerEvents: 'auto',
            background: 'var(--bg-surface)',
            borderRadius: '20px',
            border: '1px solid var(--glass-border)',
            padding: '16px',
            marginTop: '10px',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                padding: '12px 18px',
                borderRadius: '12px',
                border: 'none',
                background: activeTab === item.id ? '#FFFFFF' : 'var(--glass-pill)',
                color: activeTab === item.id ? '#070913' : '#FFFFFF',
                fontWeight: 600,
                fontSize: '0.92rem',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>{item.label}</span>
              {item.isAi && <Bot size={16} />}
            </button>
          ))}
        </motion.div>
      )}

    </motion.header>
  );
}
