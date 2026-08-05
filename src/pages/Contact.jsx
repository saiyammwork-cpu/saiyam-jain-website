import React, { useState } from 'react';
import { 
  Send, CheckCircle2, Sparkles, Mail, MessageSquare, Clock, ShieldCheck, ChevronDown, ExternalLink
} from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from '../components/Icons';

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Building Websites',
    budget: '$500 - $1,500',
    message: ''
  });

  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
  };

  const faqs = [
    {
      q: 'What is the typical turnaround time for a project?',
      a: 'Standard websites and AI Chatbots are delivered within 1 to 2 weeks. Complex Web Apps and Android Apps take 2 to 4 weeks depending on feature scope. Express delivery is also available!'
    },
    {
      q: 'How do I access your AI Prompts from Instagram?',
      a: 'You can access all curated prompts on our dedicated Prompts page or directly at saiyam-prompts.base44.app!'
    },
    {
      q: 'Do you offer ongoing support and updates after launch?',
      a: 'Yes! All client projects include 30 days of complimentary post-launch support, bug fixes, and performance tuning.'
    },
    {
      q: 'How do we start a project?',
      a: 'Fill out the contact form below or reach out directly on Instagram @saiyam.io. We will schedule a quick strategy call and provide an official project proposal.'
    }
  ];

  return (
    <div style={{ paddingTop: '110px', paddingBottom: '90px' }}>
      
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="badge-glow" style={{ marginBottom: '16px' }}>
            <Sparkles size={16} style={{ color: '#38BDF8' }} /> LET'S BUILD SOMETHING EXTRAORDINARY
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 800 }}>
            Get in Touch With <span className="text-gradient">Saiyam Jain</span>
          </h1>
          <p style={{ color: '#94A3B8', maxWidth: '600px', margin: '14px auto 0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Have a project in mind, need a custom AI chatbot, or want to collaborate? Fill out the form or reach out via social media.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px', alignItems: 'start' }}>
          
          {/* Form */}
          <div className="glass-panel" style={{ padding: '40px', border: '1px solid rgba(168, 85, 247, 0.35)' }}>
            
            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid #10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10B981',
                  margin: '0 auto 20px auto'
                }}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ color: '#FFF', fontSize: '1.6rem', fontWeight: 800, marginBottom: '12px' }}>Message Received!</h3>
                <p style={{ color: '#CBD5E1', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
                  Thank you, <strong>{formData.name}</strong>! Saiyam will review your request for <strong>{formData.service}</strong> and respond within 24 hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="btn-secondary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <h3 style={{ color: '#FFF', fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>
                  Send a Project Inquiry
                </h3>

                <div>
                  <label style={{ color: '#CBD5E1', fontSize: '0.88rem', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="glass-input"
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ color: '#CBD5E1', fontSize: '0.88rem', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="glass-input"
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ color: '#CBD5E1', fontSize: '0.88rem', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                    Required Service
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="glass-input"
                    style={{ width: '100%', background: '#0D111A' }}
                  >
                    <option value="Building Websites">Building Websites</option>
                    <option value="Building Web Apps">Building Web Apps</option>
                    <option value="Building AI Chatbots">Building AI Chatbots</option>
                    <option value="Android Apps">Android Apps</option>
                    <option value="AI Generated Video ADs">AI Generated Video ADs</option>
                    <option value="AI Generated Image ADs">AI Generated Image ADs</option>
                  </select>
                </div>

                <div>
                  <label style={{ color: '#CBD5E1', fontSize: '0.88rem', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                    Estimated Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="glass-input"
                    style={{ width: '100%', background: '#0D111A' }}
                  >
                    <option value="$300 - $500">$300 - $500</option>
                    <option value="$500 - $1,500">$500 - $1,500</option>
                    <option value="$1,500 - $3,000">$1,500 - $3,000</option>
                    <option value="$3,000+">$3,000+ Enterprise</option>
                  </select>
                </div>

                <div>
                  <label style={{ color: '#CBD5E1', fontSize: '0.88rem', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                    Project Details & Goals
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your brand, target audience, and feature expectations..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="glass-input"
                    style={{ width: '100%', resize: 'none' }}
                  />
                </div>

                <button type="submit" className="btn-accent" style={{ marginTop: '10px' }}>
                  Submit Inquiry <Send size={18} />
                </button>

              </form>
            )}

          </div>

          {/* Social Channels & Availability */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            {/* Status Card */}
            <div className="glass-panel" style={{ padding: '28px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10B981', fontWeight: 700, fontSize: '0.95rem', marginBottom: '10px' }}>
                <span style={{ width: '10px', height: '10px', backgroundColor: '#10B981', borderRadius: '50%', boxShadow: '0 0 10px #10B981' }} />
                Open for New Projects & Collaborations
              </div>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Saiyam is currently taking on select web application, AI chatbot, mobile app, and video ad projects for this month.
              </p>
            </div>

            {/* Direct Social Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <a
                href="https://instagram.com/saiyam.io"
                target="_blank"
                rel="noreferrer"
                className="glass-panel-interactive"
                style={{
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textDecoration: 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #E1306C, #F77737)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFF'
                  }}>
                    <InstagramIcon size={24} />
                  </div>
                  <div>
                    <div style={{ color: '#FFF', fontWeight: 700, fontSize: '1rem' }}>Instagram DM</div>
                    <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>instagram.com/saiyam.io</div>
                  </div>
                </div>
                <ExternalLink size={18} style={{ color: '#94A3B8' }} />
              </a>

              <a
                href="https://youtube.com/@saiyam_io"
                target="_blank"
                rel="noreferrer"
                className="glass-panel-interactive"
                style={{
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textDecoration: 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '14px',
                    background: '#FF0000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFF'
                  }}>
                    <YoutubeIcon size={24} />
                  </div>
                  <div>
                    <div style={{ color: '#FFF', fontWeight: 700, fontSize: '1rem' }}>YouTube Channel</div>
                    <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>youtube.com/@saiyam_io</div>
                  </div>
                </div>
                <ExternalLink size={18} style={{ color: '#94A3B8' }} />
              </a>

              <a
                href="https://saiyam-prompts.base44.app"
                target="_blank"
                rel="noreferrer"
                className="glass-panel-interactive"
                style={{
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textDecoration: 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #8B5CF6, #38BDF8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFF'
                  }}>
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <div style={{ color: '#FFF', fontWeight: 700, fontSize: '1rem' }}>Prompts Vault Web App</div>
                    <div style={{ color: '#38BDF8', fontSize: '0.85rem' }}>saiyam-prompts.base44.app</div>
                  </div>
                </div>
                <ExternalLink size={18} style={{ color: '#38BDF8' }} />
              </a>
            </div>

            {/* FAQ Accordion */}
            <div className="glass-panel" style={{ padding: '28px' }}>
              <h3 style={{ color: '#FFF', fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px' }}>
                Frequently Asked Questions
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {faqs.map((faq, idx) => (
                  <div key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
                    <button
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      style={{
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        color: '#FFF',
                        fontWeight: 600,
                        fontSize: '0.92rem',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        padding: '6px 0'
                      }}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown size={16} style={{ transform: activeFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', color: '#38BDF8' }} />
                    </button>
                    {activeFaq === idx && (
                      <p style={{ color: '#94A3B8', fontSize: '0.86rem', lineHeight: '1.6', marginTop: '8px' }}>
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
