import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, ExternalLink, Sparkles, ArrowRight, X, CheckCircle, 
  CreditCard, MessageSquare, Check, AlertCircle, Copy, ShieldCheck 
} from 'lucide-react';
import { subscribeCourses, subscribeCoupons, createOrderInCloud } from '../services/db';
import { executeRazorpayCheckout } from '../services/razorpay';
import { getCurrentUser } from '../services/auth';

export default function Courses({ setActiveTab }) {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Payment Gateway Modal State
  const [clientInfo, setClientInfo] = useState({ name: '', phone: '', email: '' });
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [placedCourseOrder, setPlacedCourseOrder] = useState(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const whatsappPhone = "919339256592";

  useEffect(() => {
    // Subscribe to Centralized Production Database real-time stream
    const unsubscribeCourses = subscribeCourses((liveCourses) => {
      setCourses(liveCourses.filter(c => c.status === 'Published'));
    });

    const unsubscribeCoupons = subscribeCoupons(setAvailableCoupons);

    return () => {
      unsubscribeCourses();
      unsubscribeCoupons();
    };
  }, []);

  const openPaymentGateway = (course) => {
    setSelectedCourse(course);
    setPlacedCourseOrder(null);
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError('');
    setCheckoutError('');

    const user = getCurrentUser();
    if (user) {
      setClientInfo({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  };

  const closePaymentGateway = () => {
    setSelectedCourse(null);
    setPlacedCourseOrder(null);
  };

  // Pricing calculations
  const originalPrice = selectedCourse ? Number(selectedCourse.price || 0) : 0;
  const discountAmount = appliedCoupon && originalPrice > 0
    ? Math.round(originalPrice * (appliedCoupon.discount / 100))
    : 0;
  const finalPrice = Math.max(0, originalPrice - discountAmount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const match = availableCoupons.find(
      c => c.code.toUpperCase() === couponInput.trim().toUpperCase() && c.status === 'Active'
    );

    if (match) {
      setAppliedCoupon(match);
      setCouponError('');
    } else {
      setCouponError('Invalid or expired coupon code!');
    }
  };

  const handleProcessOrder = (e) => {
    e.preventDefault();
    if (!clientInfo.name || !clientInfo.phone || !selectedCourse) {
      setCheckoutError('Please enter your Name and WhatsApp mobile number.');
      return;
    }

    setCheckoutError('');

    const orderId = 'CRS-ORD-' + Math.floor(100000 + Math.random() * 900000);
    const dateStr = new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });

    // For FREE courses, unlock access link immediately
    if (finalPrice === 0) {
      const freeOrder = {
        id: orderId,
        date: dateStr,
        client: clientInfo,
        items: [{ name: `Course: ${selectedCourse.title}`, price: 0, quantity: 1 }],
        subtotal: 0,
        discount: 0,
        couponUsed: appliedCoupon ? appliedCoupon.code : null,
        total: 0,
        stage: 'Free Access Granted',
        courseLink: selectedCourse.link
      };
      createOrderInCloud(freeOrder);
      setPlacedCourseOrder(freeOrder);
      return;
    }

    // For Paid courses, trigger Razorpay Standard Checkout
    setIsProcessing(true);

    executeRazorpayCheckout({
      amount: finalPrice,
      receipt: orderId,
      name: 'Saiyam Jain Academy',
      description: `Course: ${selectedCourse.title}`,
      prefill: {
        name: clientInfo.name,
        email: clientInfo.email,
        contact: clientInfo.phone
      },
      onSuccess: (paymentData) => {
        setIsProcessing(false);

        const paidOrder = {
          id: orderId,
          date: dateStr,
          client: clientInfo,
          items: [{ name: `Course: ${selectedCourse.title}`, price: originalPrice, quantity: 1 }],
          subtotal: originalPrice,
          discount: discountAmount,
          couponUsed: appliedCoupon ? appliedCoupon.code : null,
          total: finalPrice,
          stage: 'Paid via Razorpay',
          paymentId: paymentData.paymentId,
          razorpayOrderId: paymentData.orderId,
          verified: true,
          courseLink: selectedCourse.link
        };

        createOrderInCloud(paidOrder);
        setPlacedCourseOrder(paidOrder);
      },
      onFailure: (errorMsg) => {
        setIsProcessing(false);
        setCheckoutError(errorMsg || 'Payment process failed. Please try again.');
      },
      onDismiss: () => {
        setIsProcessing(false);
      }
    });
  };

  const generateWhatsAppLink = () => {
    if (!placedCourseOrder || !selectedCourse) return '#';
    const text = `👋 Hello Saiyam! I just purchased access for course: *${selectedCourse.title}*\n\n📌 *Order ID*: ${placedCourseOrder.id}\n💳 *Payment ID*: ${placedCourseOrder.paymentId || 'FREE'}\n👤 *Name*: ${placedCourseOrder.client.name}\n📞 *Phone*: ${placedCourseOrder.client.phone}\n💰 *Amount*: ₹${placedCourseOrder.total}\n\nPayment verified via Razorpay!`;
    return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`;
  };

  const handleCopyLink = () => {
    if (selectedCourse?.link) {
      navigator.clipboard.writeText(selectedCourse.link);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
    }
  };

  return (
    <div style={{ paddingTop: '110px', paddingBottom: '90px' }}>
      
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="badge-glow" style={{ marginBottom: '14px' }}>
            <GraduationCap size={16} style={{ color: '#FFFFFF' }} /> SAIYAM JAIN ACADEMY & COURSES
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 800 }}>
            Master AI & Web Dev <span className="text-gradient">Courses</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '14px auto 0 auto', fontSize: '1rem', lineHeight: '1.6' }}>
            Learn step-by-step AI workflows, prompt engineering, vibe coding tricks, and full-stack web development.
          </p>
        </div>

        {/* Dynamic Courses Grid */}
        {courses.length === 0 ? (
          /* Empty State */
          <div className="glow-card-white" style={{
            maxWidth: '680px',
            margin: '0 auto',
            padding: '44px 28px',
            borderRadius: '28px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: '#FFFFFF',
              color: '#070913',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
            }}>
              <GraduationCap size={32} />
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '10px' }}>
              New Courses Launching Soon! 🚀
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: '1.6', marginBottom: '28px' }}>
              Saiyam Jain is currently curating practical masterclasses and guides on AI prompt architecture, free domain claiming tricks, and web dev. Courses added from the Admin Panel will appear right here instantly!
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setActiveTab('sam')} className="btn-primary" style={{ padding: '12px 22px', fontSize: '0.9rem' }}>
                Ask SAM AI Agent Anything <ArrowRight size={16} />
              </button>
              <button onClick={() => setActiveTab('prompts')} className="btn-secondary" style={{ padding: '12px 22px', fontSize: '0.9rem' }}>
                Explore Prompts Vault
              </button>
            </div>
          </div>
        ) : (
          /* Live Courses Display Grid */
          <div className="grid-responsive-3">
            {courses.map((course) => (
              <div 
                key={course.id}
                className="glass-panel-interactive"
                style={{
                  padding: '24px',
                  borderRadius: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '18px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      color: '#FFFFFF',
                      padding: '4px 10px',
                      borderRadius: '10px',
                      fontSize: '0.75rem',
                      fontWeight: 800
                    }}>
                      {course.badge || 'Featured Course'}
                    </span>

                    <span style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '1.1rem' }}>
                      {course.price ? `₹${course.price}` : 'FREE'}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
                    {course.title}
                  </h3>

                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#A1A1AA', marginBottom: '10px' }}>
                    By: {course.instructor || 'Saiyam Jain'}
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6' }}>
                    {course.description}
                  </p>
                </div>

                <button
                  onClick={() => openPaymentGateway(course)}
                  className="btn-accent"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '12px',
                    borderRadius: '14px',
                    fontWeight: 800,
                    fontSize: '0.92rem',
                    cursor: 'pointer'
                  }}
                >
                  {course.price ? `Enroll & Pay (₹${course.price})` : 'Get Free Course Link'} <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* COURSE PAYMENT & ENROLLMENT MODAL */}
      {selectedCourse && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.88)',
          backdropFilter: 'blur(12px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glow-card-white" style={{
            maxWidth: '520px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: '24px',
            padding: '28px',
            position: 'relative'
          }}>
            <button
              onClick={closePaymentGateway}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#FFF',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            {!placedCourseOrder ? (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <div className="badge-glow" style={{ marginBottom: '8px' }}>
                    <ShieldCheck size={14} style={{ color: '#FFFFFF' }} /> SECURE RAZORPAY CHECKOUT
                  </div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF' }}>
                    {selectedCourse.title}
                  </h2>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFFFFF' }}>
                      {finalPrice === 0 ? 'FREE' : `₹${finalPrice.toLocaleString()}`}
                    </span>
                    {discountAmount > 0 && (
                      <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        ₹{originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {checkoutError && (
                  <div style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid #EF4444',
                    color: '#EF4444',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <AlertCircle size={16} />
                    <span>{checkoutError}</span>
                  </div>
                )}

                {/* Coupon Code Section */}
                {originalPrice > 0 && (
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '14px', borderRadius: '16px', border: '1px solid var(--border-subtle)', marginBottom: '18px' }}>
                    {!appliedCoupon ? (
                      <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          placeholder="Coupon code (e.g. SAIYAM10)"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          style={{
                            flex: 1,
                            padding: '8px 12px',
                            background: 'var(--input-bg)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '10px',
                            color: '#FFF',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            textTransform: 'uppercase'
                          }}
                        />
                        <button type="submit" className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.82rem' }}>
                          Apply
                        </button>
                      </form>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#FFFFFF', fontWeight: 800, fontSize: '0.85rem' }}>
                        <span>🏷️ {appliedCoupon.code} ({appliedCoupon.discount}% OFF applied)</span>
                        <button onClick={() => setAppliedCoupon(null)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '0.78rem' }}>
                          Remove
                        </button>
                      </div>
                    )}
                    {couponError && <div style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '6px', fontWeight: 700 }}>{couponError}</div>}
                  </div>
                )}

                {/* Student Registration Form */}
                <form onSubmit={handleProcessOrder} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter full name"
                      value={clientInfo.name}
                      onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', background: 'var(--input-bg)', border: '1px solid var(--border-subtle)', borderRadius: '10px', color: '#FFF' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>WhatsApp Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={clientInfo.phone}
                      onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', background: 'var(--input-bg)', border: '1px solid var(--border-subtle)', borderRadius: '10px', color: '#FFF' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>Email Address</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={clientInfo.email}
                      onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', background: 'var(--input-bg)', border: '1px solid var(--border-subtle)', borderRadius: '10px', color: '#FFF' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="btn-accent"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      padding: '12px',
                      borderRadius: '12px',
                      fontWeight: 800,
                      fontSize: '0.92rem',
                      marginTop: '6px',
                      cursor: isProcessing ? 'not-allowed' : 'pointer',
                      opacity: isProcessing ? 0.7 : 1
                    }}
                  >
                    <CreditCard size={16} />
                    {isProcessing ? 'Opening Razorpay Gateway...' : (finalPrice === 0 ? 'Access Course Link Now' : `Pay via Razorpay (₹${finalPrice.toLocaleString()})`)}
                  </button>
                </form>
              </div>
            ) : (
              /* UNLOCKED COURSE LINK SCREEN */
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid #22C55E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#22C55E',
                  margin: '0 auto 16px auto'
                }}>
                  <CheckCircle size={32} />
                </div>

                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
                  {finalPrice === 0 ? 'Course Access Unlocked!' : 'Payment Verified & Access Unlocked!'}
                </h2>
                <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '0.9rem', marginBottom: '16px' }}>
                  Order ID: {placedCourseOrder.id}
                </div>

                {/* UNLOCKED DIRECT COURSE LINK */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  padding: '20px',
                  borderRadius: '18px',
                  marginBottom: '20px'
                }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <GraduationCap size={16} /> OFFICIAL COURSE ACCESS LINK
                  </div>

                  <a
                    href={selectedCourse.link}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      padding: '12px',
                      borderRadius: '12px',
                      fontSize: '0.95rem',
                      fontWeight: 800,
                      textDecoration: 'none',
                      marginBottom: '10px'
                    }}
                  >
                    Open Course Link Directly <ExternalLink size={16} />
                  </a>

                  <button
                    onClick={handleCopyLink}
                    className="btn-secondary"
                    style={{ width: '100%', justifyContent: 'center', padding: '8px', fontSize: '0.8rem' }}
                  >
                    {linkCopied ? <Check size={14} style={{ color: '#FFFFFF' }} /> : <Copy size={14} />}
                    {linkCopied ? 'Link Copied to Clipboard!' : 'Copy Link URL'}
                  </button>
                </div>

                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-accent"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '12px',
                    borderRadius: '12px',
                    background: '#25D366',
                    color: '#FFF',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    marginBottom: '12px'
                  }}
                >
                  <MessageSquare size={16} /> Send Confirmation on WhatsApp
                </a>

                <button onClick={closePaymentGateway} className="btn-secondary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                  Close Gateway Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
