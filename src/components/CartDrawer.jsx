import React, { useState } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight, CheckCircle, ExternalLink, QrCode, CreditCard, Sparkles, MessageSquare } from 'lucide-react';

export default function CartDrawer({ cart, setCart, isOpen, setIsOpen, setActiveTab }) {
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [clientInfo, setClientInfo] = useState({ name: '', phone: '', email: '', notes: '' });
  const [placedOrder, setPlacedOrder] = useState(null);

  const upiId = "BHARATPE09910636684@yesbankltd";
  const whatsappPhone = "919339256592";

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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
    const text = `Hello Saiyam! 👋\n\nI have placed an order on your website:\n\n📋 *Order ID*: ${placedOrder.id}\n👤 *Name*: ${placedOrder.client.name}\n📞 *Phone*: ${placedOrder.client.phone}\n💰 *Total Amount*: ₹${placedOrder.total}\n\n*Services Ordered*:\n${itemsText}\n\nI am attaching my payment screenshot below! 📸`;
    
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
            right: '24px',
            zIndex: 998,
            background: 'linear-gradient(135deg, #10B981, #38BDF8)',
            color: '#FFF',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '30px',
            padding: '12px 22px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 10px 30px rgba(16, 185, 129, 0.5), 0 0 20px rgba(56, 189, 248, 0.4)'
          }}
        >
          <ShoppingCart size={20} />
          <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>View Cart ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
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
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
              cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ color: 'var(--heading-color)', fontWeight: 800, fontSize: '0.95rem' }}>{item.name}</div>
                      <div style={{ color: '#38BDF8', fontWeight: 700, fontSize: '0.85rem' }}>₹{item.price} per unit</div>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '10px' }}>
                      <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}><Minus size={14} /></button>
                      <span style={{ color: '#FFF', fontWeight: 800, fontSize: '0.9rem', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}><Plus size={14} /></button>
                    </div>

                    <div style={{ color: '#10B981', fontWeight: 900, fontSize: '1.05rem' }}>
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Total & Checkout */}
          {cart.length > 0 && (
            <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(7, 9, 19, 0.8)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Total Amount Payable:</span>
                <span style={{ color: '#FFF', fontWeight: 900, fontSize: '1.6rem' }}>₹{totalAmount}</span>
              </div>

              <button
                onClick={() => { setIsOpen(false); setIsCheckoutModalOpen(true); }}
                className="btn-accent"
                style={{ width: '100%', justifyContent: 'center', padding: '14px', borderRadius: '14px', fontSize: '1rem' }}
              >
                Proceed to Checkout <ArrowRight size={18} />
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
          padding: '20px'
        }}>
          <div className="glass-panel" style={{
            width: '540px',
            maxWidth: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: '28px',
            padding: '32px',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.8)'
          }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--heading-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CreditCard size={24} style={{ color: '#38BDF8' }} /> Checkout & Payment
              </h2>
              <button
                onClick={() => { setIsCheckoutModalOpen(false); setPlacedOrder(null); }}
                style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#94A3B8', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            {placedOrder ? (
              /* Order Placed Success View */
              <div style={{ textAlign: 'center' }}>
                <CheckCircle size={54} style={{ color: '#10B981', margin: '0 auto 16px auto' }} />
                <h3 style={{ color: '#FFF', fontSize: '1.4rem', fontWeight: 800, marginBottom: '6px' }}>Order Placed & Registered!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px' }}>
                  Order ID: <strong style={{ color: '#38BDF8' }}>{placedOrder.id}</strong> • Total Payable: <strong style={{ color: '#10B981' }}>₹{placedOrder.total}</strong>
                </p>

                {/* QR Code & Pay Link Box */}
                <div style={{ background: '#FFF', borderRadius: '20px', padding: '20px', color: '#0F172A', marginBottom: '20px', border: '2px solid #00BAF2' }}>
                  <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '10px' }}>Scan QR Code or Tap Pay Now</div>
                  
                  {/* Clean Cropped QR View */}
                  <div style={{ width: '220px', height: '230px', overflow: 'hidden', margin: '0 auto 14px auto', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                    <img src="/payment-qr.jpg" alt="BharatPe QR Code" style={{ width: '100%', marginTop: '-30px' }} />
                  </div>

                  <a
                    href={upiPayLink}
                    className="btn-accent"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      padding: '12px',
                      borderRadius: '12px',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      textDecoration: 'none',
                      background: 'linear-gradient(135deg, #00BAF2, #0052FF)'
                    }}
                  >
                    ⚡ Pay ₹{placedOrder.total} via UPI <ExternalLink size={16} />
                  </a>

                  <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '8px', fontWeight: 600 }}>
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
                    gap: '10px',
                    background: '#25D366',
                    color: '#FFF',
                    padding: '14px 24px',
                    borderRadius: '14px',
                    fontWeight: 800,
                    fontSize: '1rem',
                    textDecoration: 'none',
                    boxShadow: '0 8px 25px rgba(37, 211, 102, 0.4)'
                  }}
                >
                  <MessageSquare size={20} /> Send Payment Screenshot on WhatsApp
                </a>
              </div>
            ) : (
              /* Client Information Form */
              <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.04)', padding: '16px', borderRadius: '16px', border: '1px solid var(--glass-border)', marginBottom: '8px' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '6px' }}>Order Summary</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FFF', fontWeight: 800, fontSize: '1.2rem' }}>
                    <span>{cart.length} Item(s) Selected</span>
                    <span style={{ color: '#10B981' }}>₹{totalAmount}</span>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-main)', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>WhatsApp Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9339256592"
                    value={clientInfo.phone}
                    onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-main)', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-main)', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Special Instructions / Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Domain name preference, video ad topic, etc."
                    value={clientInfo.notes}
                    onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-main)', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem', marginTop: '10px' }}
                >
                  Generate Payment QR & Link <ArrowRight size={18} />
                </button>
              </form>
            )}

          </div>
        </div>
      )}
    </>
  );
}
