import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight, CheckCircle, CreditCard, Sparkles, MessageSquare, AlertCircle, ShieldCheck } from 'lucide-react';
import { subscribeCoupons, createOrderInCloud } from '../services/db';
import { executeRazorpayCheckout } from '../services/razorpay';
import { getCurrentUser } from '../services/auth';

export default function CartDrawer({ cart, setCart, isOpen, setIsOpen, setActiveTab }) {
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [clientInfo, setClientInfo] = useState({ name: '', phone: '', email: '', notes: '' });
  const [placedOrder, setPlacedOrder] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  // Auto-fill logged in user info
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setClientInfo(prev => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || ''
      }));
    }
  }, [isCheckoutModalOpen, isOpen]);

  // Coupon Code State
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [availableCoupons, setAvailableCoupons] = useState([]);

  const whatsappPhone = "919339256592";

  // Subscribe to Live Production Coupons
  useEffect(() => {
    const unsubscribe = subscribeCoupons(setAvailableCoupons);
    return () => unsubscribe();
  }, []);

  // Subtotal before discount
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Calculate discount amount
  const discountAmount = appliedCoupon 
    ? Math.round(subtotal * (appliedCoupon.discount / 100)) 
    : 0;

  const totalAmount = Math.max(0, subtotal - discountAmount);

  // Validate coupon against production database stream
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

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError('');
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Launch Razorpay Standard Web Checkout Modal
  const handleRazorpayCheckout = (e) => {
    e.preventDefault();
    if (!clientInfo.name || !clientInfo.phone || cart.length === 0) {
      setCheckoutError('Please enter your Name and WhatsApp phone number.');
      return;
    }

    setCheckoutError('');
    setIsProcessing(true);

    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const dateStr = new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });

    executeRazorpayCheckout({
      amount: totalAmount,
      receipt: orderId,
      name: 'Saiyam Jain | saiyam.io',
      description: `Payment for ${cart.length} Service(s)`,
      prefill: {
        name: clientInfo.name,
        email: clientInfo.email,
        contact: clientInfo.phone
      },
      onSuccess: (paymentData) => {
        setIsProcessing(false);

        const newOrder = {
          id: orderId,
          date: dateStr,
          client: clientInfo,
          items: cart,
          subtotal: subtotal,
          discount: discountAmount,
          couponUsed: appliedCoupon ? appliedCoupon.code : null,
          total: totalAmount,
          stage: 'Paid via Razorpay',
          paymentId: paymentData.paymentId,
          razorpayOrderId: paymentData.orderId,
          verified: true
        };

        // Save order to Cloud Database
        createOrderInCloud(newOrder);

        setPlacedOrder(newOrder);
        setCart([]);
      },
      onFailure: (errorMsg) => {
        setIsProcessing(false);
        setCheckoutError(errorMsg || 'Payment failed or was declined. Please try again.');
      },
      onDismiss: () => {
        setIsProcessing(false);
      }
    });
  };

  const generateWhatsAppLink = () => {
    if (!placedOrder) return '#';
    const text = `👋 Hello Saiyam! I just paid via Razorpay on *saiyam.io*!\n\n📌 *Order ID*: ${placedOrder.id}\n💳 *Payment ID*: ${placedOrder.paymentId}\n👤 *Name*: ${placedOrder.client.name}\n📞 *Phone*: ${placedOrder.client.phone}\n💰 *Amount Paid*: ₹${placedOrder.total}\n\nPayment verified automatically. Please confirm and start work!`;
    return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      {/* Floating Bottom Cart Pill Trigger when Cart Has Items */}
      {cart.length > 0 && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 998,
            background: '#FFFFFF',
            color: '#070913',
            border: 'none',
            borderRadius: '9999px',
            padding: '12px 24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.2)'
          }}
        >
          <ShoppingCart size={20} />
          <span style={{ fontWeight: 800, fontSize: '0.92rem' }}>View Cart ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
          <span style={{ background: '#070913', color: '#FFFFFF', padding: '4px 10px', borderRadius: '12px', fontWeight: 900, fontSize: '0.85rem' }}>
            ₹{totalAmount}
          </span>
        </button>
      )}

      {/* Cart Drawer Box */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '420px',
          maxWidth: '100vw',
          background: 'var(--bg-surface)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderLeft: '1px solid var(--border-subtle)',
          zIndex: 1000,
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <div style={{
            padding: '20px 24px',
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShoppingCart size={22} style={{ color: '#FFFFFF' }} />
              <div>
                <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1.1rem' }}>Your Service Cart</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{cart.length} unique services selected</div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#94A3B8', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Cart Item List */}
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', background: 'var(--bg-main)' }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                <ShoppingCart size={48} style={{ opacity: 0.3, margin: '0 auto 16px auto' }} />
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--heading-color)', marginBottom: '8px' }}>Your Cart is Empty</div>
                <p style={{ fontSize: '0.88rem', marginBottom: '20px' }}>Add website packages, AI video ads, or image ads to your cart!</p>
                <button
                  onClick={() => { setIsOpen(false); setActiveTab('services'); }}
                  className="btn-primary"
                  style={{ margin: '0 auto' }}
                >
                  Browse Pricing Plans <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '16px',
                      padding: '14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '0.92rem' }}>{item.name}</div>
                        <div style={{ color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.82rem' }}>₹{item.price} per unit</div>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.5)', padding: '4px 10px', borderRadius: '8px' }}>
                        <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}><Minus size={12} /></button>
                        <span style={{ color: '#FFF', fontWeight: 800, fontSize: '0.85rem' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}><Plus size={12} /></button>
                      </div>

                      <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '1rem' }}>
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Coupon Code Box inside Cart Drawer */}
                <div style={{ background: 'var(--bg-surface)', padding: '14px', borderRadius: '16px', border: '1px solid var(--border-subtle)', marginTop: '6px' }}>
                  {!appliedCoupon ? (
                    <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="Coupon code (SAIYAM10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          background: 'var(--input-bg)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '10px',
                          color: '#FFF',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          textTransform: 'uppercase'
                        }}
                      />
                      <button type="submit" className="btn-secondary" style={{ padding: '8px 12px', fontSize: '0.8rem' }}>
                        Apply
                      </button>
                    </form>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#FFFFFF', fontWeight: 800, fontSize: '0.85rem' }}>
                      <span>🏷️ {appliedCoupon.code} ({appliedCoupon.discount}% OFF applied)</span>
                      <button onClick={removeCoupon} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '0.78rem' }}>
                        Remove
                      </button>
                    </div>
                  )}

                  {couponError && (
                    <div style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '6px', fontWeight: 700 }}>
                      {couponError}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer Summary & Checkout Trigger */}
          {cart.length > 0 && (
            <div style={{
              padding: '20px',
              background: 'var(--bg-surface)',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#FFFFFF', fontWeight: 700 }}>
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 900, color: '#FFFFFF', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                <span>Total Payable</span>
                <span>₹{totalAmount}</span>
              </div>

              <button
                onClick={() => { setIsOpen(false); setIsCheckoutModalOpen(true); }}
                className="btn-accent"
                style={{ width: '100%', justifyContent: 'center', padding: '14px', borderRadius: '14px', fontSize: '0.95rem' }}
              >
                Proceed to Checkout (₹{totalAmount}) <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* RAZORPAY STANDARD WEB CHECKOUT MODAL */}
      {isCheckoutModalOpen && (
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
            maxWidth: '500px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: '24px',
            padding: '28px',
            position: 'relative'
          }}>
            <button
              onClick={() => setIsCheckoutModalOpen(false)}
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

            {!placedOrder ? (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <div className="badge-glow" style={{ marginBottom: '8px' }}>
                    <ShieldCheck size={14} style={{ color: '#FFFFFF' }} /> SECURE RAZORPAY CHECKOUT
                  </div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF' }}>Checkout Summary</h2>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#FFFFFF', marginTop: '4px' }}>
                    Total Payable: ₹{totalAmount.toLocaleString()}
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

                {/* Client Contact Details Form */}
                <form onSubmit={handleRazorpayCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter full name"
                      value={clientInfo.name}
                      onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', background: 'var(--input-bg)', border: '1px solid var(--border-subtle)', borderRadius: '12px', color: '#FFF', fontSize: '0.9rem' }}
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
                      style={{ width: '100%', padding: '12px 14px', background: 'var(--input-bg)', border: '1px solid var(--border-subtle)', borderRadius: '12px', color: '#FFF', fontSize: '0.9rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>Email Address</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={clientInfo.email}
                      onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', background: 'var(--input-bg)', border: '1px solid var(--border-subtle)', borderRadius: '12px', color: '#FFF', fontSize: '0.9rem' }}
                    />
                  </div>

                  <div style={{
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    textAlign: 'center'
                  }}>
                    🔒 Supports UPI, Credit/Debit Cards, NetBanking & Wallets via Razorpay Standard Checkout.
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="btn-accent"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      padding: '14px',
                      borderRadius: '14px',
                      fontWeight: 900,
                      fontSize: '1rem',
                      marginTop: '4px',
                      cursor: isProcessing ? 'not-allowed' : 'pointer',
                      opacity: isProcessing ? 0.7 : 1
                    }}
                  >
                    <CreditCard size={18} />
                    {isProcessing ? 'Opening Payment Gateway...' : `Pay via Razorpay (₹${totalAmount.toLocaleString()})`}
                  </button>
                </form>
              </div>
            ) : (
              /* ORDER SUCCESS & AUTOMATIC VERIFICATION SCREEN */
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid #22C55E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#22C55E',
                  margin: '0 auto 16px auto'
                }}>
                  <CheckCircle size={36} />
                </div>

                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
                  Payment Verified & Successful!
                </h2>

                <div style={{ background: 'rgba(255,255,255,0.06)', padding: '12px', borderRadius: '12px', margin: '14px 0', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '0.88rem' }}>Order ID: {placedOrder.id}</div>
                  <div style={{ color: '#22C55E', fontWeight: 800, fontSize: '0.82rem', marginTop: '4px' }}>Razorpay Payment ID: {placedOrder.paymentId}</div>
                  <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '1.1rem', marginTop: '6px' }}>Amount Paid: ₹{placedOrder.total}</div>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '20px' }}>
                  Your payment has been automatically verified. Click below to initiate instant order updates on WhatsApp!
                </p>

                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-accent"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '14px',
                    borderRadius: '14px',
                    background: '#25D366',
                    color: '#FFF',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    marginBottom: '12px'
                  }}
                >
                  <MessageSquare size={18} /> Connect on WhatsApp
                </a>

                <button
                  onClick={() => { setIsCheckoutModalOpen(false); setPlacedOrder(null); }}
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Done & Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
