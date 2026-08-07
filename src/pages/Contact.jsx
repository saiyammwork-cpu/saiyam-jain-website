import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, Sparkles, ExternalLink,
  CreditCard, QrCode, Copy, Check, Building, ShieldCheck, ArrowRight
} from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from '../components/Icons';

export default function Contact() {
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

  const bankInfo = {
    bankName: "Canara Bank",
    accountNumber: "110265163648",
    mobileNumber: "+91 9339256592",
    accountHolder: "SAIYAM JAIN",
    ifscCode: "CNRB0001426",
    upiId: "noarch@ptyes"
  };

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
    setSubmitted(true);
  };

  return (
    <div style={{ paddingTop: '110px', paddingBottom: '90px' }}>
      
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="badge-glow" style={{ marginBottom: '16px' }}>
            <Mail size={16} style={{ color: '#38BDF8' }} /> GET IN TOUCH & PAYMENTS
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 800 }}>
            Contact & <span className="text-gradient">Payment Details</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '14px auto 0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Have a project in mind or ready to pay? Send a direct message or scan the Paytm UPI QR code / Bank details below.
          </p>
        </div>

        {/* Payment & Bank Details Section */}
        <div className="glass-panel" style={{
          padding: '36px',
          borderRadius: '28px',
          border: '1px solid rgba(168, 85, 247, 0.4)',
          marginBottom: '60px',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(56, 189, 248, 0.12))',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(139, 92, 246, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <CreditCard size={26} style={{ color: '#38BDF8' }} />
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--heading-color)' }}>
                Official Bank & Payment QR Details
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Direct bank transfer or UPI payment gateway for project milestone payments.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'center' }}>
            
            {/* Paytm UPI QR Code Card */}
            <div style={{
              background: '#FFF',
              borderRadius: '24px',
              padding: '24px',
              textAlign: 'center',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
              border: '2px solid rgba(56, 189, 248, 0.4)'
            }}>
              <div style={{ color: '#0F172A', fontWeight: 800, fontSize: '1.1rem', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <QrCode size={20} style={{ color: '#00BAF2' }} /> Scan Paytm UPI QR Code
              </div>

              <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                maxWidth: '280px',
                margin: '0 auto 16px auto',
                border: '1px solid #E2E8F0'
              }}>
                <img 
                  src="/payment-qr.jpg" 
                  alt="Saiyam Jain Paytm UPI Payment QR Code" 
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span style={{ color: '#0F172A', fontSize: '0.88rem', fontWeight: 700 }}>UPI ID:</span>
                <span style={{ color: '#00BAF2', fontWeight: 800, fontSize: '0.95rem' }}>{bankInfo.upiId}</span>
                <button
                  onClick={handleCopyUpi}
                  style={{
                    background: copiedUpi ? '#10B981' : '#0F172A',
                    color: '#FFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '4px 10px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {copiedUpi ? <Check size={12} /> : <Copy size={12} />}
                  {copiedUpi ? 'Copied' : 'Copy UPI'}
                </button>
              </div>
            </div>

            {/* Canara Bank Details Table */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: '20px',
                padding: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Building size={20} style={{ color: '#10B981' }} />
                    <span style={{ color: 'var(--heading-color)', fontWeight: 800, fontSize: '1.1rem' }}>Canara Bank Account</span>
                  </div>

                  <button
                    onClick={handleCopyBankDetails}
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                  >
                    {copiedBank ? <Check size={14} style={{ color: '#10B981' }} /> : <Copy size={14} />}
                    {copiedBank ? 'Copied All!' : 'Copy Bank Details'}
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Account Holder</span>
                    <span style={{ color: 'var(--heading-color)', fontWeight: 800, fontSize: '0.92rem' }}>{bankInfo.accountHolder}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Account Number</span>
                    <span style={{ color: '#38BDF8', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.05em' }}>{bankInfo.accountNumber}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>IFSC Code</span>
                    <span style={{ color: '#C084FC', fontWeight: 800, fontSize: '0.92rem', letterSpacing: '0.05em' }}>{bankInfo.ifscCode}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Mobile Number</span>
                    <span style={{ color: 'var(--heading-color)', fontWeight: 800, fontSize: '0.92rem' }}>{bankInfo.mobileNumber}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Paytm UPI ID</span>
                    <span style={{ color: '#10B981', fontWeight: 800, fontSize: '0.92rem' }}>{bankInfo.upiId}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Contact Form & Direct Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px' }}>
          
          {/* Inquiry Form */}
          <div className="glass-panel" style={{ padding: '36px', borderRadius: '24px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--heading-color)', marginBottom: '8px' }}>
              Send an Inquiry
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Fill out the form below to receive a response within 2 hours.
            </p>

            {submitted ? (
              <div style={{ padding: '30px', textAlign: 'center', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '18px' }}>
                <CheckCircle size={44} style={{ color: '#10B981', margin: '0 auto 12px auto' }} />
                <h4 style={{ color: '#FFF', fontSize: '1.2rem', fontWeight: 800 }}>Inquiry Received!</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px' }}>
                  Thank you! Saiyam Jain will contact you shortly regarding your service package inquiry.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Your Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter your name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                    style={{ width: '100%', padding: '12px 16px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-main)', outline: 'none' }} 
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="name@example.com" 
                    value={formData.email} 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                    style={{ width: '100%', padding: '12px 16px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-main)', outline: 'none' }} 
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Service Package Needed</label>
                  <select 
                    value={formData.service} 
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })} 
                    style={{ width: '100%', padding: '12px 16px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-main)', outline: 'none' }}
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
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Project Requirements / Message *</label>
                  <textarea 
                    rows={4} 
                    required 
                    placeholder="Describe your website or AI ad requirements..." 
                    value={formData.message} 
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                    style={{ width: '100%', padding: '12px 16px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-main)', outline: 'none', resize: 'vertical' }} 
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ padding: '14px', justifyContent: 'center' }}>
                  Submit Inquiry <Send size={16} />
                </button>
              </form>
            )}
          </div>

          {/* Social Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <a 
              href="https://instagram.com/saiyam.io" 
              target="_blank" 
              rel="noreferrer"
              className="glass-panel-interactive"
              style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: 'linear-gradient(135deg, #E1306C, #F77737)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                <InstagramIcon size={24} />
              </div>
              <div>
                <div style={{ color: 'var(--heading-color)', fontWeight: 800, fontSize: '1.1rem' }}>Instagram @saiyam.io</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Send DM for quick queries</div>
              </div>
            </a>

            <a 
              href="https://youtube.com/@saiyam_io" 
              target="_blank" 
              rel="noreferrer"
              className="glass-panel-interactive"
              style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: '#FF0000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                <YoutubeIcon size={24} />
              </div>
              <div>
                <div style={{ color: 'var(--heading-color)', fontWeight: 800, fontSize: '1.1rem' }}>YouTube @saiyam_io</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Watch AI Tutorials & Demos</div>
              </div>
            </a>

            <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10B981', fontWeight: 700, fontSize: '0.95rem', marginBottom: '8px' }}>
                <ShieldCheck size={20} /> Guaranteed Delivery & Support
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: '1.5' }}>
                All projects come with free maintenance, SEO optimization, and direct support from Saiyam Jain.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
