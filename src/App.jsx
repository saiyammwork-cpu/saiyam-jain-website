import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SAMWidget from './components/SAMWidget';

import Home from './pages/Home';
import Services from './pages/Services';
import Prompts from './pages/Prompts';
import SAMHub from './pages/SAMHub';
import Contact from './pages/Contact';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('saiyam_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('saiyam_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} />;
      case 'services':
        return <Services setActiveTab={setActiveTab} />;
      case 'prompts':
        return <Prompts />;
      case 'sam':
        return <SAMHub setActiveTab={setActiveTab} />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} toggleTheme={toggleTheme} />

      {/* Main Page View */}
      <main style={{ flex: 1 }}>
        {renderActivePage()}
      </main>

      {/* Global Floating AI Agent SAM Widget */}
      <SAMWidget setActiveTab={setActiveTab} />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
