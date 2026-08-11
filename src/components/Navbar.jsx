import React, { useState } from 'react';
import { Plus, ShoppingCart, Sun, Moon, Sparkles, Bot, Flame, X, Menu, Grid } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar({ activeTab, setActiveTab, theme, toggleTheme, cartCount = 0, setIsCartOpen }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Story' },
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
        padding: '16px 24px'
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
        
        {/* LEFT SECTION */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              background: '#FFFFFF',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              padding: '6px 14px',
              borderRadius: '9999px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
            }}
          >
            {/* Custom SVG Icon: Two rotated rounded rectangles at -35deg */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ transform: 'rotate(-35deg)' }}>
              <rect x="3" y="5" width="8" height="14" rx="3" fill="#09090B" />
              <rect x="13" y="5" width="8" height="14" rx="3" fill="#09090B" opacity="0.6" />
            </svg>
            
            <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#09090B', letterSpacing: '-0.02em' }}>
              NeuralKinetics
            </span>
          </div>

          {/* Menu Button Pill */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: '#09090B',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '9999px',
              padding: '5px 12px 5px 5px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#FFFFFF',
              color: '#09090B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Plus size={12} strokeWidth={3} />
            </div>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Menu
            </span>
          </button>

          {/* Tags Pill (Desktop) */}
          <div 
            className="desktop-only-tags"
            style={{
              background: '#F4F4F6',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: '9999px',
              padding: '6px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#71717A' }}>Advanced Bionics</span>
            <span style={{ fontSize: '10px', color: '#D4D4D8' }}>•</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#09090B' }}>Cognitive AI</span>
          </div>
        </div>

        {/* CENTER / DESKTOP NAV LINKS */}
        <nav 
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            padding: '4px 8px',
            borderRadius: '9999px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  padding: '7px 15px',
                  borderRadius: '9999px',
                  border: 'none',
                  background: isActive ? '#09090B' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#71717A',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {item.isAi && <Bot size={13} style={{ color: isActive ? '#38BDF8' : '#0284C7' }} />}
                {item.label}
                {item.badge && (
                  <span style={{
                    fontSize: '0.6rem',
                    background: '#EF4444',
                    color: '#FFF',
                    padding: '2px 5px',
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

        {/* RIGHT SECTION */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          
          {/* Adaptive Systems Label Pill (Desktop) */}
          <div 
            className="desktop-only-tags"
            style={{
              background: '#F4F4F6',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: '9999px',
              padding: '4px 12px 4px 4px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#09090B',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Grid size={12} />
            </div>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#09090B' }}>Adaptive Systems</span>
          </div>

          {/* Cart Icon Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'relative',
              background: '#09090B',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0,0,0,0.12)'
            }}
            title="View Shopping Cart"
          >
            <ShoppingCart size={16} />
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

          {/* Dark / Light Mode Button */}
          <button
            onClick={toggleTheme}
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(0,0,0,0.1)',
              color: '#09090B',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
            }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
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
            background: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid rgba(0,0,0,0.1)',
            padding: '16px',
            marginTop: '10px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
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
                padding: '10px 16px',
                borderRadius: '12px',
                border: 'none',
                background: activeTab === item.id ? '#09090B' : '#F4F4F6',
                color: activeTab === item.id ? '#FFFFFF' : '#09090B',
                fontWeight: 600,
                fontSize: '0.9rem',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>{item.label}</span>
              {item.isAi && <Bot size={16} style={{ color: '#38BDF8' }} />}
            </button>
          ))}
        </motion.div>
      )}

    </motion.header>
  );
}
