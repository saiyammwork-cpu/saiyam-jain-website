import React, { useState } from 'react';
import { Sparkles, Bot, Menu, X, Flame, PhoneCall, Code2, Sun, Moon } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, theme, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services & Works' },
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
              height: '34px',
              width: 'auto',
              objectFit: 'contain',
              filter: theme === 'dark' ? 'invert(1)' : 'none',
              mixBlendMode: theme === 'dark' ? 'screen' : 'multiply',
              transition: 'all 0.3s ease'
            }} 
          />
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none', gap: '8px', alignItems: 'center' }} className="desktop-nav">
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
                  background: isActive ? 'rgba(139, 92, 246, 0.18)' : 'transparent',
                  color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: isActive ? '1px solid rgba(168, 85, 247, 0.35)' : '1px solid transparent'
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
                    display: 'flex',
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

        {/* Action Buttons: Theme Toggle & Hire Me */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
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
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button 
            onClick={() => handleNavClick('contact')}
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: '0.9rem' }}
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          background: 'var(--nav-bg)',
          borderBottom: '1px solid var(--glass-border)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                padding: '14px 18px',
                borderRadius: '12px',
                border: 'none',
                background: activeTab === item.id ? 'rgba(139, 92, 246, 0.25)' : 'rgba(139, 92, 246, 0.06)',
                color: 'var(--text-main)',
                textAlign: 'left',
                fontWeight: 600,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {item.isAi && <Bot size={18} style={{ color: '#38BDF8' }} />}
                {item.label}
              </div>
              {item.badge && (
                <span style={{
                  fontSize: '0.7rem',
                  background: '#EF4444',
                  color: '#FFF',
                  padding: '2px 8px',
                  borderRadius: '10px'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Media Query CSS inline injection for responsive menu */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 899px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
