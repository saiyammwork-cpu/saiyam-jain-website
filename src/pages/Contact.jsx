import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, Sparkles, ExternalLink,
  CreditCard, QrCode, Copy, Check, Building, ShieldCheck, ArrowRight, Zap, Lock
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
  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  const [customAmount, setCustomAmount] = useState('');

  const bankInfo = {
    bankName: "Canara Bank",
    accountNumber: "110265163648",
    mobileNumber: "+91 9339256592",
    accountHolder: "SAIYAM JAIN",
    ifscCode: "CNRB0001426",
    upiId: "BHARATPE09910636684@yesbankltd"
  };

  const dynamicPayLink = customAmount 
    ? `upi://pay?pa=${bankInfo.upiId}&pn=Saiyam%20Jain&am=${customAmount}&cu=INR`
    : `upi://pay?pa=${bankInfo.upiId}&pn=Saiyam%20Jain&cu=INR`;

  const handleCopyBankDetails = () => {
    const text = `Canara Bank A/C Details:
Account Number: ${bankInfo.accountNumber}
Mobile Number: ${bankInfo.mobileNumber}
Account Holder Name: ${bankInfo.accountHolder}
IFSC Code: ${bankInfo.ifscCode}
UPI ID: ${bankInfo.upiId}`;

    navigator.clipboard.writeText(text);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(bankInfo.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

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
            <Mail size={16} style={{ color: '#38BDF8' }} /> GET IN TOUCH & PAYMENTS
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 800 }}>
            Contact & <span className="text-gradient">Payment Details</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '14px auto 0 auto', fontSize: '1rem', lineHeight: '1.6' }}>
            Have a project in mind or ready to pay? Send a direct message or scan the UPI QR code / Bank details below.
          </p>
        </div>

        {/* Payment & Bank Details Section */}
        <div className="glass-panel" style={{
          padding: '28px',
          borderRadius: '24px',
          border: '1px solid rgba(168, 85, 247, 0.4)',
          marginBottom: '50px',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(56, 189, 248, 0.12))',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(139, 92, 246, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <CreditCard size={24} style={{ color: '#38BDF8' }} />
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--heading-color)' }}>
                Official Bank & Payment QR Details
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Scan the QR code or click the Pay Now button to launch your UPI payment app directly.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'center' }}>
            
            {/* BharatPe UPI QR Code Card with Dynamic Amount Support */}
            <div style={{
              background: '#FFF',
              borderRadius: '20px',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
              border: '2px solid rgba(56, 189, 248, 0.4)'
            }}>
              <div style={{ color: '#0F172A', fontWeight: 800, fontSize: '1rem', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <QrCode size={18} style={{ color: '#00BAF2' }} /> Scan Dynamic Amount QR Code
              </div>

              {/* Custom Amount Input Bar */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, marginBottom: '4px' }}>
                  Enter Amount to Pre-Fill in Scanner App:
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <span style={{ color: '#0F172A', fontWeight: 900, fontSize: '1rem' }}>₹</span>
                  <input
                    type="number"
                    placeholder="Enter amount..."
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    style={{
                      width: '140px',
                      padding: '6px 10px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                      fontWeight: 800,
                      textAlign: 'center',
                      color: '#0F172A',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Dynamic QR Code Image */}
              <div style={{
                width: '210px',
                height: '210px',
                margin: '0 auto 12px auto',
                borderRadius: '14px',
                overflow: 'hidden',
                border: '2px solid #00BAF2',
                background: '#FFF',
                padding: '8px'
              }}>
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(dynamicPayLink)}`} 
                  alt="Dynamic UPI QR Code" 
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                  onError={(e) => { e.target.src = "/payment-qr.jpg"; }}
                />
              </div>

              {/* Pay Now Button & UPI ID Bar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                
                <a
                  href={dynamicPayLink}
                  className="btn-accent"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '12px 18px',
                    borderRadius: '12px',
                    fontWeight: 800,
                    fontSize: '0.92rem',
                    textDecoration: 'none',
                    background: 'linear-gradient(135deg, #00BAF2, #0052FF)'
                  }}
                >
                  ⚡ Pay {customAmount ? `₹${customAmount}` : 'via UPI'} <ExternalLink size={16} />
                </a>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ color: '#0F172A', fontSize: '0.8rem', fontWeight: 700 }}>UPI ID:</span>
                  <span style={{ color: '#0052FF', fontWeight: 800, fontSize: '0.82rem', wordBreak: 'break-all' }}>{bankInfo.upiId}</span>
                  <button
                    onClick={handleCopyUpi}
                    style={{
                      background: copiedUpi ? '#10B981' : '#0F172A',
                      color: '#FFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '4px 8px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {copiedUpi ? <Check size={12} /> : <Copy size={12} />}
                    {copiedUpi ? 'Copied' : 'Copy'}
                  </button>
                </div>

              </div>
            </div>

            {/* Canara Bank Details Table */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: '20px',
                padding: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Building size={18} style={{ color: '#10B981' }} />
                    <span style={{ color: 'var(--heading-color)', fontWeight: 800, fontSize: '1rem' }}>Canara Bank Account</span>
                  </div>

                  <button
                    onClick={handleCopyBankDetails}
                    className="btn-secondary"
                    style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                  >
                    {copiedBank ? <Check size={12} style={{ color: '#10B981' }} /> : <Copy size={12} />}
                    {copiedBank ? 'Copied!' : 'Copy Details'}
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '6px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }}>Account Holder</span>
                    <span style={{ color: 'var(--heading-color)', fontWeight: 800, fontSize: '0.88rem' }}>{bankInfo.accountHolder}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '6px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }}>Account Number</span>
                    <span style={{ color: '#38BDF8', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.05em' }}>{bankInfo.accountNumber}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '6px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }}>IFSC Code</span>
                    <span style={{ color: '#C084FC', fontWeight: 800, fontSize: '0.88rem', letterSpacing: '0.05em' }}>{bankInfo.ifscCode}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '6px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }}>Mobile Number</span>
                    <span style={{ color: 'var(--heading-color)', fontWeight: 800, fontSize: '0.88rem' }}>{bankInfo.mobileNumber}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }}>BharatPe UPI ID</span>
                    <span style={{ color: '#10B981', fontWeight: 800, fontSize: '0.78rem', wordBreak: 'break-all' }}>{bankInfo.upiId}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Contact Form & Direct Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
          
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
                  Thank you! Saiyam Jain will contact you shortly regarding your inquiry.
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
