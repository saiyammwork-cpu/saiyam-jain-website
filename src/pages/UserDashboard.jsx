import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, ShoppingBag, ExternalLink, MessageSquare, PhoneCall, 
  LogOut, CheckCircle, Clock, ShieldCheck, GraduationCap, ArrowRight, Sparkles 
} from 'lucide-react';
import { getCurrentUser, signOutUser } from '../services/auth';
import { subscribeOrders } from '../services/db';

export default function UserDashboard({ setActiveTab, openAuthModal }) {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const saiyamPhone = "+91 9339256592";
  const whatsappPhone = "919339256592";

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);

    if (!user) {
      setLoading(false);
      return;
    }

    // Subscribe to live production orders and filter for current user
    const unsubscribe = subscribeOrders((allOrders) => {
      const userEmail = (user.email || '').toLowerCase();
      const userPhone = (user.phone || '').trim();

      const matched = allOrders.filter(order => {
        const clientEmail = (order.client?.email || '').toLowerCase();
        const clientPhone = (order.client?.phone || '').trim();

        return (userEmail && clientEmail === userEmail) || (userPhone && clientPhone === userPhone);
      });

      setUserOrders(matched);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOutUser();
    setCurrentUser(null);
    setActiveTab('home');
  };

  if (!currentUser) {
    return (
      <div style={{ paddingTop: '130px', paddingBottom: '90px', maxWidth: '600px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px', textAlign: 'center' }}>
        <div className="glow-card-white" style={{ padding: '40px 28px', borderRadius: '28px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <User size={32} />
          </div>

          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '10px' }}>
            User Dashboard & Purchases
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '28px' }}>
            Please Sign In or Create an Account to view your active website packages, purchased courses, AI ad campaigns, and order receipts.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => openAuthModal('signin')} className="btn-accent" style={{ padding: '14px 28px', fontSize: '0.95rem' }}>
              Sign In to Account <ArrowRight size={16} />
            </button>
            <button onClick={() => openAuthModal('signup')} className="btn-secondary" style={{ padding: '14px 28px', fontSize: '0.95rem' }}>
              Create New Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '90px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* User Header Profile Card */}
        <div className="glow-card-white" style={{
          padding: '32px',
          borderRadius: '28px',
          marginBottom: '36px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#FFFFFF',
              color: '#070913',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '1.5rem',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)'
            }}>
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF' }}>
                  {currentUser.name}
                </h1>
                <span style={{ background: 'rgba(255,255,255,0.1)', color: '#FFF', fontSize: '0.72rem', fontWeight: 800, padding: '3px 10px', borderRadius: '8px' }}>
                  Member
                </span>
              </div>

              <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '6px', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={14} /> {currentUser.email}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={14} /> {currentUser.phone}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="btn-secondary"
            style={{ padding: '10px 18px', fontSize: '0.85rem', gap: '8px' }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        {/* Direct Contact Saiyam Jain Options Card */}
        <div style={{
          background: 'rgba(17, 20, 34, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '24px',
          padding: '24px',
          marginBottom: '36px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
              Direct Creator Support & Inquiry
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF' }}>
              Contact Saiyam Jain: {saiyamPhone}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href={`tel:${saiyamPhone}`}
              className="btn-secondary"
              style={{ padding: '10px 18px', fontSize: '0.88rem', textDecoration: 'none', gap: '8px' }}
            >
              <PhoneCall size={16} /> Call Saiyam
            </a>

            <a
              href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(`👋 Hi Saiyam! I am ${currentUser.name} (${currentUser.phone}). I need assistance with my dashboard orders.`)}`}
              target="_blank"
              rel="noreferrer"
              className="btn-accent"
              style={{ padding: '10px 18px', fontSize: '0.88rem', textDecoration: 'none', background: '#25D366', color: '#FFF', gap: '8px' }}
            >
              <MessageSquare size={16} /> WhatsApp Saiyam
            </a>
          </div>
        </div>

        {/* My Purchases & Orders Grid */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <ShoppingBag size={22} style={{ color: '#FFFFFF' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF' }}>
              My Purchases & Active Orders ({userOrders.length})
            </h2>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              Loading your purchases from cloud database...
            </div>
          ) : userOrders.length === 0 ? (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '50px 20px', borderRadius: '24px' }}>
              <ShoppingBag size={48} style={{ opacity: 0.3, margin: '0 auto 16px auto' }} />
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
                No Purchases Found Yet
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '24px', maxWidth: '480px', margin: '0 auto 24px auto' }}>
                You haven't purchased any website packages, AI video ads, or courses yet. Browse our pricing plans to get started!
              </p>
              <button onClick={() => setActiveTab('services')} className="btn-primary" style={{ margin: '0 auto' }}>
                Explore Services & Pricing <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {userOrders.map((order) => (
                <div
                  key={order.id}
                  className="glass-panel"
                  style={{
                    padding: '24px',
                    borderRadius: '20px',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}
                >
                  {/* Order Top Bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '1.1rem' }}>
                          Order #{order.id}
                        </span>
                        <span style={{
                          background: order.stage?.includes('Paid') ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.1)',
                          color: order.stage?.includes('Paid') ? '#22C55E' : '#FFFFFF',
                          border: `1px solid ${order.stage?.includes('Paid') ? '#22C55E' : 'rgba(255,255,255,0.2)'}`,
                          padding: '3px 10px',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontWeight: 800
                        }}>
                          {order.stage || 'Processing'}
                        </span>
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={12} /> Placed on: {order.date}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '1.3rem' }}>
                        ₹{order.total?.toLocaleString()}
                      </div>
                      {order.paymentId && (
                        <div style={{ color: '#22C55E', fontSize: '0.75rem', fontWeight: 800, marginTop: '2px' }}>
                          Razorpay ID: {order.paymentId}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Order Items List */}
                  <div style={{ background: 'rgba(0,0,0,0.4)', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '8px' }}>
                      PURCHASED SERVICES & ITEMS:
                    </div>
                    {order.items?.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', color: '#FFFFFF', fontWeight: 700, fontSize: '0.9rem', margin: '4px 0' }}>
                        <span>• {item.name} {item.quantity > 1 ? `(x${item.quantity})` : ''}</span>
                        <span>₹{item.price * (item.quantity || 1)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Course Direct Link Button if Course Purchase */}
                  {order.courseLink && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255, 255, 255, 0.08)', padding: '12px 16px', borderRadius: '12px' }}>
                      <GraduationCap size={20} style={{ color: '#FFFFFF' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '0.85rem' }}>Unlocked Course Access</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Click to view video masterclass directly</div>
                      </div>
                      <a
                        href={order.courseLink}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary"
                        style={{ padding: '8px 14px', fontSize: '0.8rem', textDecoration: 'none' }}
                      >
                        Open Course <ExternalLink size={14} />
                      </a>
                    </div>
                  )}

                  {/* Support Button */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <a
                      href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(`👋 Hi Saiyam! I need an update/support on my Order #${order.id} (${order.items?.map(i => i.name).join(', ')}).`)}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', fontWeight: 700 }}
                    >
                      <MessageSquare size={14} /> Get WhatsApp Support for this Order
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
