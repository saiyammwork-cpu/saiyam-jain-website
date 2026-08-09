import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight, CheckCircle, ExternalLink, QrCode, CreditCard, Sparkles, MessageSquare, Tag, Check, AlertCircle } from 'lucide-react';

export default function CartDrawer({ cart, setCart, isOpen, setIsOpen, setActiveTab }) {
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [clientInfo, setClientInfo] = useState({ name: '', phone: '', email: '', notes: '' });
  const [placedOrder, setPlacedOrder] = useState(null);

  // Coupon Code State
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  const upiId = "BHARATPE09910636684@yesbankltd";
  const whatsappPhone = "919339256592";

  // Subtotal before discount
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Calculate discount amount
  const discountAmount = appliedCoupon 
    ? Math.round(subtotal * (appliedCoupon.discount / 100)) 
    : 0;

  const totalAmount = Math.max(0, subtotal - discountAmount);

  // Load Coupons from localStorage
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const savedCoupons = JSON.parse(localStorage.getItem('saiyam_coupons') || 'null') || [
      { code: 'SAIYAM10', discount: 10, type: 'percentage', status: 'Active' }
    ];

    const match = savedCoupons.find(
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

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!clientInfo.name || !clientInfo.phone || cart.length === 0) return;

    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const dateStr = new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });

    const newOrder = {
      id: orderId,
      date: dateStr,
      client: clientInfo,
      items: cart,
      subtotal: subtotal,
      discount: discountAmount,
      couponUsed: appliedCoupon ? appliedCoupon.code : null,
      total: totalAmount,
      stage: 'Pending Payment',
      upiId: upiId
    };

    // Save to localStorage for Admin Dashboard to read
    const existingOrders = JSON.parse(localStorage.getItem('saiyam_orders') || '[]');
    localStorage.setItem('saiyam_orders', JSON.stringify([newOrder, ...existingOrders]));

    setPlacedOrder(newOrder);
    setCart([]);
  };

  const generateWhatsAppLink = () => {
    if (!placedOrder) return '#';
    const itemsText = placedOrder.items.map(i => `• ${i.name} (x${i.quantity}) - ₹${i.price * i.quantity}`).join('\n');
    const couponInfo = placedOrder.couponUsed ? `\n🏷️ *Coupon Applied*: ${placedOrder.couponUsed} (-₹${placedOrder.discount})` : '';

    const text = `Hello Saiyam! 👋\n\nI have placed an order on your website:\n\n📋 *Order ID*: ${placedOrder.id}\n👤 *Name*: ${placedOrder.client.name}\n📞 *Phone*: ${placedOrder.client.phone}${couponInfo}\n💰 *Final Payable Amount*: ₹${placedOrder.total}\n\n*Services Ordered*:\n${itemsText}\n\nI am attaching my payment screenshot below! 📸`;
    
    return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`;
  };

  const upiPayLink = placedOrder ? `upi://pay?pa=${upiId}&pn=Saiyam%20Jain&am=${placedOrder.total}&cu=INR` : '#';

  return (
    <>
      {/* Floating Cart Trigger Button */}
      {cart.length > 0 && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            zIndex: 998,
            background: 'linear-gradient(135deg, #10B981, #38BDF8)',
            color: '#FFF',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '30px',
            padding: '12px 20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 10px 30px rgba(16, 185, 129, 0.5), 0 0 20px rgba(56, 189, 248, 0.4)'
          }}
        >
          <ShoppingCart size={20} />
          <span style={{ fontWeight: 800, fontSize: '0.92rem' }}>View Cart ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
          <span style={{ background: 'rgba(0,0,0,0.25)', padding: '4px 10px', borderRadius: '12px', fontWeight: 900, fontSize: '0.85rem' }}>
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
          background: 'rgba(11, 15, 26, 0.96)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderLeft: '1px solid rgba(168, 85, 247, 0.35)',
          zIndex: 1000,
          boxShadow: '-20px 0 50px rgba(0,0,0,0.7)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <div style={{
            padding: '20px 24px',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(56, 189, 248, 0.2))',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShoppingCart size={22} style={{ color: '#38BDF8' }} />
              <div>
                <div style={{ color: '#FFF', fontWeight: 800, fontSize: '1.1rem' }}>Your Service Cart</div>
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
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
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
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      padding: '14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ color: 'var(--heading-color)', fontWeight: 800, fontSize: '0.92rem' }}>{item.name}</div>
                        <div style={{ color: '#38BDF8', fontWeight: 700, fontSize: '0.82rem' }}>₹{item.price} per unit</div>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '10px' }}>
                        <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}><Minus size={14} /></button>
                        <span style={{ color: '#FFF', fontWeight: 800, fontSize: '0.88rem', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}><Plus size={14} /></button>
                      </div>

                      <div style={{ color: '#10B981', fontWeight: 900, fontSize: '1rem' }}>
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Coupon Code Section */}
                <div style={{ background: 'rgba(139, 92, 246, 0.12)', border: '1px dashed rgba(168, 85, 247, 0.4)', borderRadius: '14px', padding: '14px', marginTop: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#C084FC', fontWeight: 700, fontSize: '0.82rem', marginBottom: '8px' }}>
                    <Tag size={14} /> Have a Coupon Code? (Try "SAIYAM10")
                  </div>

                  {appliedCoupon ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '8px 12px', borderRadius: '10px', color: '#10B981', fontWeight: 800, fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle size={16} /> Code <strong>{appliedCoupon.code}</strong> Applied ({appliedCoupon.discount}% OFF)
                      </div>
                      <button onClick={removeCoupon} style={{ background: 'none', border: 'none', color: '#EF4444', fontWeight: 800, cursor: 'pointer', fontSize: '0.78rem' }}>
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="Enter coupon (e.g. SAIYAM10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        style={{ flex: 1, padding: '8px 12px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: '#FFF', fontSize: '0.85rem', outline: 'none', textTransform: 'uppercase' }}
                      />
                      <button type="submit" className="btn-primary" style={{ padding: '8px 14px', fontSize: '0.82rem', borderRadius: '10px' }}>
                        Apply
                      </button>
                    </form>
                  )}

                  {couponError && (
                    <div style={{ color: '#EF4444', fontSize: '0.78rem', fontWeight: 700, marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <AlertCircle size={12} /> {couponError}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer Total Breakdown & Checkout */}
          {cart.length > 0 && (
            <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(7, 9, 19, 0.8)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <span>Subtotal:</span>
                  <span>₹{subtotal}</span>
                </div>

                {appliedCoupon && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#10B981', fontWeight: 700 }}>
                    <span>Discount ({appliedCoupon.code} - {appliedCoupon.discount}% OFF):</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '6px' }}>
                  <span style={{ color: '#FFF', fontWeight: 700, fontSize: '0.95rem' }}>Total Amount Payable:</span>
                  <span style={{ color: '#FFF', fontWeight: 900, fontSize: '1.5rem' }}>₹{totalAmount}</span>
                </div>
              </div>

              <button
                onClick={() => { setIsOpen(false); setIsCheckoutModalOpen(true); }}
                className="btn-accent"
                style={{ width: '100%', justifyContent: 'center', padding: '12px', borderRadius: '12px', fontSize: '0.95rem' }}
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1001,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div className="glass-panel" style={{
            width: '520px',
            maxWidth: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: '24px',
            padding: '24px',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.8)'
          }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--heading-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CreditCard size={22} style={{ color: '#38BDF8' }} /> Checkout & Payment
              </h2>
              <button
                onClick={() => { setIsCheckoutModalOpen(false); setPlacedOrder(null); }}
                style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#94A3B8', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            {placedOrder ? (
              /* Order Placed Success View */
              <div style={{ textAlign: 'center' }}>
                <CheckCircle size={48} style={{ color: '#10B981', margin: '0 auto 12px auto' }} />
                <h3 style={{ color: '#FFF', fontSize: '1.3rem', fontWeight: 800, marginBottom: '4px' }}>Order Placed & Registered!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>
                  Order ID: <strong style={{ color: '#38BDF8' }}>{placedOrder.id}</strong> • Total Payable: <strong style={{ color: '#10B981' }}>₹{placedOrder.total}</strong>
                </p>

                {/* QR Code & Pay Link Box */}
                <div style={{ background: '#FFF', borderRadius: '18px', padding: '18px', color: '#0F172A', marginBottom: '16px', border: '2px solid #00BAF2' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '8px' }}>Scan QR Code or Tap Pay Now</div>
                  
                  {/* Clean Cropped QR View */}
                  <div style={{ width: '200px', height: '210px', overflow: 'hidden', margin: '0 auto 12px auto', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <img src="/payment-qr.jpg" alt="BharatPe QR Code" style={{ width: '100%', marginTop: '-26px' }} />
                  </div>

                  <a
                    href={upiPayLink}
                    className="btn-accent"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      padding: '10px',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                      background: 'linear-gradient(135deg, #00BAF2, #0052FF)'
                    }}
                  >
                    ⚡ Pay ₹{placedOrder.total} via UPI <ExternalLink size={14} />
                  </a>

                  <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '6px', fontWeight: 600 }}>
                    UPI ID: <strong>{upiId}</strong>
                  </div>
                </div>

                {/* WhatsApp Receipt Button */}
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    background: '#25D366',
                    color: '#FFF',
                    padding: '12px 20px',
                    borderRadius: '12px',
                    fontWeight: 800,
                    fontSize: '0.92rem',
                    textDecoration: 'none',
                    boxShadow: '0 8px 25px rgba(37, 211, 102, 0.4)'
                  }}
                >
                  <MessageSquare size={18} /> Send Payment Screenshot on WhatsApp
                </a>
              </div>
            ) : (
              /* Client Information Form */
              <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ background: 'rgba(255,255,255,0.04)', padding: '14px', borderRadius: '14px', border: '1px solid var(--glass-border)', marginBottom: '4px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '4px' }}>Order Breakdown</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FFF', fontWeight: 800, fontSize: '1.1rem' }}>
                    <span>{cart.length} Item(s)</span>
                    <span style={{ color: '#10B981' }}>₹{totalAmount} {appliedCoupon && <span style={{ fontSize: '0.78rem', color: '#C084FC' }}>({appliedCoupon.code} -10%)</span>}</span>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'var(--text-main)', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>WhatsApp Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9339256592"
                    value={clientInfo.phone}
                    onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'var(--text-main)', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'var(--text-main)', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Special Instructions / Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Domain name preference, video ad topic, etc."
                    value={clientInfo.notes}
                    onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'var(--text-main)', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem', marginTop: '6px' }}
                >
                  Generate Payment QR & Link <ArrowRight size={16} />
                </button>
              </form>
            )}

          </div>
        </div>
      )}
    </>
  );
}
