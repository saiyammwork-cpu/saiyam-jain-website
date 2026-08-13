import React, { useState } from 'react';
import { X, User, Mail, Phone, Lock, ArrowRight, ShieldCheck, AlertCircle, CheckCircle } from 'lucide-react';
import { signInUser, signUpUser } from '../services/auth';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, defaultTab = 'signin' }) {
  const [mode, setMode] = useState(defaultTab); // 'signin' | 'signup'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!formData.name || !formData.email || !formData.phone || !formData.password) {
          throw new Error('Please fill in all required fields.');
        }
        const user = await signUpUser(formData);
        if (onAuthSuccess) onAuthSuccess(user);
        onClose();
      } else {
        if (!formData.email || !formData.password) {
          throw new Error('Please enter your Email and Password.');
        }
        const user = await signInUser(formData);
        if (onAuthSuccess) onAuthSuccess(user);
        onClose();
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      zIndex: 99999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glow-card-white" style={{
        maxWidth: '440px',
        width: '100%',
        borderRadius: '28px',
        padding: '32px',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: '#FFF',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div className="badge-glow" style={{ marginBottom: '10px' }}>
            <ShieldCheck size={14} style={{ color: '#FFFFFF' }} /> SAIYAM JAIN USER PORTAL
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF' }}>
            {mode === 'signin' ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
            {mode === 'signin' ? 'Sign in to view your orders & course access' : 'Sign up to track purchases & manage your services'}
          </p>
        </div>

        {/* Mode Toggle Switch */}
        <div style={{
          display: 'flex',
          background: 'rgba(255, 255, 255, 0.06)',
          padding: '4px',
          borderRadius: '14px',
          marginBottom: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <button
            type="button"
            onClick={() => { setMode('signin'); setError(''); }}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '10px',
              border: 'none',
              background: mode === 'signin' ? '#FFFFFF' : 'transparent',
              color: mode === 'signin' ? '#070913' : '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => { setMode('signup'); setError(''); }}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '10px',
              border: 'none',
              background: mode === 'signup' ? '#FFFFFF' : 'transparent',
              color: mode === 'signup' ? '#070913' : '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #EF4444',
            color: '#EF4444',
            padding: '10px 14px',
            borderRadius: '12px',
            fontSize: '0.82rem',
            fontWeight: 700,
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {mode === 'signup' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>
                Full Name *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 40px',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    color: '#FFF',
                    fontSize: '0.9rem'
                  }}
                />
                <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>
              Email Address *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 40px',
                  background: 'var(--input-bg)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  color: '#FFF',
                  fontSize: '0.9rem'
                }}
              />
              <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>
                WhatsApp Phone Number *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="tel"
                  required
                  placeholder="+91 9339256592"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 40px',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    color: '#FFF',
                    fontSize: '0.9rem'
                  }}
                />
                <Phone size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>
              Password *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 40px',
                  background: 'var(--input-bg)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  color: '#FFF',
                  fontSize: '0.9rem'
                }}
              />
              <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-accent"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '14px',
              borderRadius: '14px',
              fontWeight: 900,
              fontSize: '0.98rem',
              marginTop: '6px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Processing...' : (mode === 'signin' ? 'Sign In to Dashboard' : 'Create Account')} <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
