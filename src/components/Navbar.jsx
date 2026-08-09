import React, { useState } from 'react';
import { Sparkles, Bot, Menu, X, Flame, PhoneCall, Code2, Sun, Moon, ShoppingCart, Lock } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, theme, toggleTheme, cartCount = 0, setIsCartOpen }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services & Pricing' },
    { id: 'prompts', label: 'Prompts Vault', badge: 'Hot' },
    { id: 'sam', label: 'SAM AI Agent', isAi: true },
    { id: 'contact', label: 'Contact & Hire' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <img 
            src="/logo.png" 
            alt="saiyam.io Logo" 
            style={{ 
              height: '42px',
              width: 'auto',
              objectFit: 'contain',
              filter: theme === 'dark' ? 'invert(1)' : 'none',
              mixBlendMode: theme === 'dark' ? 'screen' : 'multiply'
            }} 
          />
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="desktop-nav">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  position: 'relative',
                  padding: '10px 18px',
                  borderRadius: '12px',
                  border: 'none',
                  background: isActive 
                    ? (item.isAi 
                        ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(56, 189, 248, 0.3))' 
                        : 'var(--glass-bg)')
                    : 'transparent',
                  color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {item.isAi && <Bot size={16} style={{ color: '#38BDF8' }} />}
                {item.label}
                {item.badge && (
                  <span style={{
                    fontSize: '0.65rem',
                    background: 'linear-gradient(135deg, #EF4444, #F97316)',
                    color: '#FFF',
                    padding: '2px 6px',
                    borderRadius: '8px',
                    fontWeight: 800,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '2px'
                  }}>
                    <Flame size={10} /> {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons: Cart, Theme Toggle, Admin & Hire Me */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Cart Icon Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'relative',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#10B981',
              borderRadius: '12px',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="View Shopping Cart"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#EF4444',
                color: '#FFF',
                fontSize: '0.7rem',
                fontWeight: 900,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px rgba(239, 68, 68, 0.6)'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Dark / Light Mode Working Button */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'rgba(139, 92, 246, 0.12)',
              border: '1px solid var(--glass-border)',
              color: theme === 'dark' ? '#F59E0B' : '#8B5CF6',
              borderRadius: '12px',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Admin Lock Button */}
          <button
            onClick={() => handleNavClick('admin')}
            style={{
              background: activeTab === 'admin' ? 'rgba(168, 85, 247, 0.4)' : 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--glass-border)',
              color: activeTab === 'admin' ? '#FFF' : 'var(--text-muted)',
              borderRadius: '12px',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="Saiyam Admin Panel"
          >
            <Lock size={18} />
          </button>

          <button 
            onClick={() => handleNavClick('contact')}
            className="btn-primary"
            style={{ padding: '10px 18px', fontSize: '0.88rem' }}
          >
            <PhoneCall size={16} /> Hire Saiyam
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'rgba(139, 92, 246, 0.12)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-main)',
              padding: '10px',
              borderRadius: '10px',
              cursor: 'pointer'
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          background: 'rgba(11, 15, 26, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--glass-border)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                padding: '12px 16px',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === item.id ? 'var(--glass-bg)' : 'transparent',
                color: 'var(--text-main)',
                fontWeight: 600,
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {item.isAi && <Bot size={18} style={{ color: '#38BDF8' }} />}
                {item.label}
              </span>
              {item.badge && (
                <span style={{ fontSize: '0.7rem', background: '#EF4444', color: '#FFF', padding: '2px 8px', borderRadius: '10px' }}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('admin')}
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              border: '1px solid var(--glass-border)',
              background: 'rgba(168, 85, 247, 0.15)',
              color: '#C084FC',
              fontWeight: 700,
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Lock size={18} /> Admin Dashboard (/admin)
          </button>
        </div>
      )}
    </header>
  );
}
