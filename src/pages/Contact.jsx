import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, Sparkles,
  ShieldCheck, ArrowRight, Zap, Lock
} from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from '../components/Icons';

export default function Contact({ setActiveTab }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Websites (Basic ₹4,999)',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Save submission to localStorage so Admin Panel reads it in real-time
    const newInquiry = {
      id: 'INQ-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }),
      name: formData.name,
      email: formData.email,
      phone: formData.phone || 'Not provided',
      service: formData.service,
      message: formData.message
    };

    const existing = JSON.parse(localStorage.getItem('saiyam_inquiries') || '[]');
    localStorage.setItem('saiyam_inquiries', JSON.stringify([newInquiry, ...existing]));

    setSubmitted(true);
  };

  return (
    <div style={{ paddingTop: '110px', paddingBottom: '90px' }}>
      
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge-glow" style={{ marginBottom: '14px' }}>
            <Mail size={16} style={{ color: '#38BDF8' }} /> GET IN TOUCH & HIRE
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 800 }}>
            Contact & <span className="text-gradient">Hire Saiyam</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '14px auto 0 auto', fontSize: '1rem', lineHeight: '1.6' }}>
            Have a website project in mind or need custom AI Video/Image Ads? Fill out the inquiry form below or connect directly on social media.
          </p>
        </div>

        {/* Contact Form & Direct Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
          
          {/* Inquiry Form */}
          <div className="glass-panel" style={{ padding: '28px', borderRadius: '24px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--heading-color)', marginBottom: '6px' }}>
              Send an Inquiry
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px' }}>
              Fill out the form below to receive a response within 2 hours.
            </p>

            {submitted ? (
              <div style={{ padding: '24px', textAlign: 'center', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '16px' }}>
                <CheckCircle size={40} style={{ color: '#10B981', margin: '0 auto 10px auto' }} />
                <h4 style={{ color: '#FFF', fontSize: '1.1rem', fontWeight: 800 }}>Inquiry Received!</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', marginTop: '4px' }}>
                  Thank you! Saiyam Jain will contact you shortly regarding your project.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>Your Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter your name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                    style={{ width: '100%', padding: '12px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-main)', outline: 'none' }} 
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="name@example.com" 
                    value={formData.email} 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                    style={{ width: '100%', padding: '12px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-main)', outline: 'none' }} 
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>Mobile Number (Optional)</label>
                  <input 
                    type="tel" 
                    placeholder="+91 9876543210" 
                    value={formData.phone} 
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                    style={{ width: '100%', padding: '12px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-main)', outline: 'none' }} 
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>Service Package Needed</label>
                  <select 
                    value={formData.service} 
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })} 
                    style={{ width: '100%', padding: '12px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-main)', outline: 'none' }}
                  >
                    <option value="Websites (Basic ₹4,999)">Websites - Basic Package (₹4,999)</option>
                    <option value="Websites (Standard ₹8,999)">Websites - Standard Package (₹8,999)</option>
                    <option value="Websites (Premium ₹11,999)">Websites - Premium Package (₹11,999)</option>
                    <option value="AI Generated Video ADs (₹1,999)">AI Generated Video ADs (₹1,999)</option>
                    <option value="AI Generated Image ADs (₹699)">AI Generated Image ADs (₹699)</option>
                    <option value="E-Commerce Store (Custom Quote)">E-Commerce Store (Custom Quote)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>Project Requirements / Message *</label>
                  <textarea 
                    rows={4} 
                    required 
                    placeholder="Describe your website or AI ad requirements..." 
                    value={formData.message} 
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                    style={{ width: '100%', padding: '12px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-main)', outline: 'none', resize: 'vertical' }} 
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ padding: '12px', justifyContent: 'center' }}>
                  Submit Inquiry <Send size={16} />
                </button>
              </form>
            )}
          </div>

          {/* Social Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <a 
              href="https://instagram.com/saiyam.io" 
              target="_blank" 
              rel="noreferrer"
              className="glass-panel-interactive"
              style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #E1306C, #F77737)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                <InstagramIcon size={22} />
              </div>
              <div>
                <div style={{ color: 'var(--heading-color)', fontWeight: 800, fontSize: '1rem' }}>Instagram @saiyam.io</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Send DM for quick queries</div>
              </div>
            </a>

            <a 
              href="https://youtube.com/@saiyam_io" 
              target="_blank" 
              rel="noreferrer"
              className="glass-panel-interactive"
              style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: '#FF0000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                <YoutubeIcon size={22} />
              </div>
              <div>
                <div style={{ color: 'var(--heading-color)', fontWeight: 800, fontSize: '1rem' }}>YouTube @saiyam_io</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Watch AI Tutorials & Demos</div>
              </div>
            </a>

            <div className="glass-panel" style={{ padding: '20px', borderRadius: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px' }}>
                <ShieldCheck size={18} /> Guaranteed Delivery & Support
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: '1.5' }}>
                All projects come with free maintenance, SEO optimization, and direct support from Saiyam Jain.
              </p>
            </div>

          </div>

        </div>

        {/* Very Small Discrete Admin Login Button at Footer Bottom */}
        <div style={{ marginTop: '70px', textAlign: 'center', opacity: 0.25 }}>
          <button 
            onClick={() => {
              if (setActiveTab) setActiveTab('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--text-muted)', 
              fontSize: '0.65rem', 
              cursor: 'pointer', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '4px',
              padding: '4px 8px'
            }}
            title="Admin Login Portal"
          >
            <Lock size={9} /> admin login
          </button>
        </div>

      </div>

    </div>
  );
}
