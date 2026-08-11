import React, { useState, useEffect } from 'react';
import { 
  Lock, ShieldCheck, Package, ListFilter, DollarSign, Settings, MessageSquare, ExternalLink,
  CheckCircle, Clock, Trash2, Edit3, Save, RefreshCw, Key, LogOut, FileText, Globe, Image, Video, AlertTriangle, ArrowRight, UserCheck, Tag, Plus, GraduationCap
} from 'lucide-react';
import {
  subscribeOrders, updateOrderStageInCloud, deleteOrderFromCloud,
  subscribeCourses, addCourseToCloud, toggleCourseStatusInCloud, deleteCourseFromCloud,
  subscribeCoupons, saveCouponToCloud, toggleCouponStatusInCloud, deleteCouponFromCloud,
  subscribeInquiries, deleteInquiryFromCloud,
  subscribePricing, savePricingToCloud,
  subscribeMediaLinks, saveMediaLinksToCloud
} from '../services/db';

export default function Admin() {
  const adminPasswordRequired = "Sam93392s@";

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('saiyam_admin_auth') === 'true';
  });

  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Active Admin Sub-Tab: 'orders' | 'courses' | 'coupons' | 'inquiries' | 'pricing' | 'media'
  const [adminTab, setAdminTab] = useState('orders');

  // Persistent Database States
  const [orders, setOrders] = useState([]);
  const [courses, setCourses] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [pricing, setPricing] = useState({
    basicPrice: 4999,
    standardPrice: 8999,
    premiumPrice: 11999,
    videoAdsBase: 1999,
    videoAdsExtra: 799,
    imageAdsBase: 699,
    imageAdsExtra: 149
  });
  const [mediaLinks, setMediaLinks] = useState({
    upiId: 'BHARATPE09910636684@yesbankltd',
    whatsappPhone: '+91 9339256592',
    canaraAc: '110265163648',
    canaraIfsc: 'CNRB0001426',
    ytShorts: 'https://youtube.com/shorts/kQaWu8FIlls?si=fcy-YmBsZkMzfI4D',
    instagram: 'https://instagram.com/saiyam.io'
  });

  const [newCoupon, setNewCoupon] = useState({ code: '', discount: 10, type: 'percentage', status: 'Active' });
  const [newCourse, setNewCourse] = useState({ title: '', price: '', link: '', badge: 'Featured', description: '', status: 'Published' });
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Subscribe to Centralized Production Database Streams
  useEffect(() => {
    const unsubs = [
      subscribeOrders(setOrders),
      subscribeCourses(setCourses),
      subscribeCoupons(setCoupons),
      subscribeInquiries(setInquiries),
      subscribePricing(setPricing),
      subscribeMediaLinks(setMediaLinks)
    ];

    return () => unsubs.forEach(unsub => unsub && unsub());
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === adminPasswordRequired) {
      setIsAuthenticated(true);
      sessionStorage.setItem('saiyam_admin_auth', 'true');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('saiyam_admin_auth');
  };

  const handleUpdateOrderStage = (orderId, newStage) => {
    updateOrderStageInCloud(orderId, newStage);
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order record from the production database?")) {
      deleteOrderFromCloud(orderId);
    }
  };

  const handleDeleteInquiry = (inquiryId) => {
    deleteInquiryFromCloud(inquiryId);
  };

  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (!newCoupon.code.trim()) return;

    const formattedCode = newCoupon.code.trim().toUpperCase();
    saveCouponToCloud({ ...newCoupon, code: formattedCode });
    setNewCoupon({ code: '', discount: 10, type: 'percentage', status: 'Active' });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleToggleCouponStatus = (code, status) => {
    toggleCouponStatusInCloud(code, status);
  };

  const handleDeleteCoupon = (code) => {
    deleteCouponFromCloud(code);
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title.trim() || !newCourse.link.trim()) return;

    addCourseToCloud(newCourse);
    setNewCourse({ title: '', price: '', link: '', badge: 'Featured', description: '', status: 'Published' });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleToggleCourseStatus = (id, status) => {
    toggleCourseStatusInCloud(id, status);
  };

  const handleDeleteCourse = (id) => {
    if (window.confirm("Delete this course link from production database?")) {
      deleteCourseFromCloud(id);
    }
  };

  const handleSavePricing = () => {
    savePricingToCloud(pricing);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleSaveMedia = () => {
    saveMediaLinksToCloud(mediaLinks);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const orderStages = [
    { label: '🟡 Pending Payment', value: 'Pending Payment', color: '#F59E0B' },
    { label: '🔵 Payment Verified', value: 'Payment Verified', color: '#38BDF8' },
    { label: '⚙️ In Progress', value: 'In Progress', color: '#A855F7' },
    { label: '🔍 Under Review', value: 'Under Review', color: '#EC4899' },
    { label: '🚚 Delivered', value: 'Delivered', color: '#6366F1' },
    { label: '✅ Completed', value: 'Completed', color: '#10B981' }
  ];

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  if (!isAuthenticated) {
    return (
      <div style={{ paddingTop: '130px', paddingBottom: '90px', minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px' }}>
        <div className="glass-panel" style={{
          width: '420px',
          maxWidth: '100%',
          padding: '32px',
          borderRadius: '24px',
          border: '1px solid rgba(168, 85, 247, 0.4)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '18px',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(56, 189, 248, 0.2))',
            border: '1px solid rgba(168, 85, 247, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#38BDF8',
            margin: '0 auto 18px auto'
          }}>
            <Lock size={26} />
          </div>

          <h1 style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--heading-color)', marginBottom: '6px' }}>
            Saiyam Admin Gateway
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px' }}>
            Enter the master administrator password to access orders, courses, coupons, and pricing.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <input
              type="password"
              placeholder="Enter Admin Password..."
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'var(--input-bg)',
                border: authError ? '1px solid #EF4444' : '1px solid var(--glass-border)',
                borderRadius: '12px',
                color: 'var(--text-main)',
                fontSize: '1rem',
                textAlign: 'center',
                outline: 'none'
              }}
            />

            {authError && (
              <div style={{ color: '#EF4444', fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <AlertTriangle size={14} /> Incorrect Admin Password! Try again.
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '12px', borderRadius: '12px', fontSize: '0.95rem' }}
            >
              Unlock Dashboard <Key size={16} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '110px', paddingBottom: '90px' }}>
      
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Admin Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
          <div>
            <div className="badge-glow" style={{ marginBottom: '8px' }}>
              <ShieldCheck size={16} style={{ color: '#10B981' }} /> CENTRALIZED PRODUCTION DB • SAIYAM JAIN MASTER ADMIN
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800 }}>
              Management <span className="text-gradient">Dashboard</span>
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '6px 14px', borderRadius: '12px', color: '#10B981', fontWeight: 800, fontSize: '0.85rem' }}>
              💰 Revenue: ₹{totalRevenue.toLocaleString()}
            </div>

            <button onClick={handleLogout} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs (Mobile Scrollable Pill Container) */}
        <div className="scroll-pills-container" style={{ marginBottom: '24px' }}>
          <button
            onClick={() => setAdminTab('orders')}
            style={{
              padding: '10px 16px',
              borderRadius: '12px',
              border: adminTab === 'orders' ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid var(--border-subtle)',
              background: adminTab === 'orders' ? '#FFFFFF' : 'var(--glass-bg)',
              color: adminTab === 'orders' ? '#070913' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.86rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
          >
            <Package size={16} /> Live Orders ({orders.length})
          </button>

          <button
            onClick={() => setAdminTab('courses')}
            style={{
              padding: '10px 16px',
              borderRadius: '12px',
              border: adminTab === 'courses' ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid var(--border-subtle)',
              background: adminTab === 'courses' ? '#FFFFFF' : 'var(--glass-bg)',
              color: adminTab === 'courses' ? '#070913' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.86rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
          >
            <GraduationCap size={16} /> Course Manager ({courses.length})
          </button>

          <button
            onClick={() => setAdminTab('coupons')}
            style={{
              padding: '10px 16px',
              borderRadius: '12px',
              border: adminTab === 'coupons' ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid var(--border-subtle)',
              background: adminTab === 'coupons' ? '#FFFFFF' : 'var(--glass-bg)',
              color: adminTab === 'coupons' ? '#070913' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.86rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
          >
            <Tag size={16} /> Coupon Manager ({coupons.length})
          </button>

          <button
            onClick={() => setAdminTab('inquiries')}
            style={{
              padding: '10px 16px',
              borderRadius: '12px',
              border: adminTab === 'inquiries' ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid var(--border-subtle)',
              background: adminTab === 'inquiries' ? '#FFFFFF' : 'var(--glass-bg)',
              color: adminTab === 'inquiries' ? '#070913' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.86rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
          >
            <Mail size={16} /> Form Inquiries ({inquiries.length})
          </button>

          <button
            onClick={() => setAdminTab('pricing')}
            style={{
              padding: '10px 16px',
              borderRadius: '12px',
              border: adminTab === 'pricing' ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid var(--border-subtle)',
              background: adminTab === 'pricing' ? '#FFFFFF' : 'var(--glass-bg)',
              color: adminTab === 'pricing' ? '#070913' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.86rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
          >
            <IndianRupee size={16} /> Pricing Manager
          </button>

          <button
            onClick={() => setAdminTab('media')}
            style={{
              padding: '10px 16px',
              borderRadius: '12px',
              border: adminTab === 'media' ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid var(--border-subtle)',
              background: adminTab === 'media' ? '#FFFFFF' : 'var(--glass-bg)',
              color: adminTab === 'media' ? '#070913' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.86rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
          >
            <LinkIcon size={16} /> Media & Links
          </button>
        </div>

        {savedSuccess && (
          <div style={{ padding: '10px 16px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '12px', color: '#10B981', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
            <CheckCircle size={16} /> Changes successfully saved to Cloud Production Database!
          </div>
        )}

        {/* TAB 1: ORDERS & STAGE MANAGER */}
        {adminTab === 'orders' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {orders.length === 0 ? (
              <div className="glass-panel" style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <Package size={40} style={{ opacity: 0.3, margin: '0 auto 12px auto' }} />
                <h3 style={{ color: 'var(--heading-color)', fontSize: '1.1rem', fontWeight: 800 }}>No Orders Placed Yet</h3>
                <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>Orders placed by buyers via cart checkout will automatically sync here from the database in real-time.</p>
              </div>
            ) : (
              orders.map((ord) => (
                <div key={ord.id} className="glass-panel" style={{ padding: '20px', borderRadius: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '14px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ color: '#38BDF8', fontWeight: 900, fontSize: '1.1rem' }}>{ord.id}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>• {ord.date}</span>
                        {ord.couponUsed && (
                          <span style={{ background: 'rgba(192, 132, 252, 0.15)', border: '1px solid rgba(192, 132, 252, 0.4)', color: '#C084FC', padding: '2px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800 }}>
                            🏷️ {ord.couponUsed} (-₹{ord.discount})
                          </span>
                        )}
                      </div>
                      <div style={{ color: 'var(--heading-color)', fontWeight: 800, fontSize: '1rem', marginTop: '4px' }}>
                        👤 {ord.client.name} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({ord.client.phone})</span>
                      </div>
                      {ord.client.notes && (
                        <div style={{ fontSize: '0.82rem', color: '#C084FC', marginTop: '4px' }}>
                          💬 Note: "{ord.client.notes}"
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      {/* Order Stage Selector */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '2px' }}>Stage Status:</label>
                        <select
                          value={ord.stage}
                          onChange={(e) => handleUpdateOrderStage(ord.id, e.target.value)}
                          style={{
                            background: 'var(--input-bg)',
                            border: '1px solid rgba(168, 85, 247, 0.4)',
                            borderRadius: '10px',
                            padding: '6px 10px',
                            color: '#FFF',
                            fontWeight: 700,
                            fontSize: '0.82rem',
                            outline: 'none'
                          }}
                        >
                          {orderStages.map((stg, sidx) => (
                            <option key={sidx} value={stg.value}>{stg.label}</option>
                          ))}
                        </select>
                      </div>

                      <a
                        href={`https://wa.me/${ord.client.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${ord.client.name}! Regarding your order ${ord.id}...`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-accent"
                        style={{ padding: '6px 12px', fontSize: '0.78rem', background: '#25D366' }}
                      >
                        <MessageSquare size={13} /> Chat
                      </a>

                      <button onClick={() => handleDeleteOrder(ord.id)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Items Table */}
                  <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '12px', padding: '14px', border: '1px solid var(--glass-border)' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '8px' }}>ORDERED SERVICES & PACKAGES:</div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {ord.items.map((it, iidx) => (
                        <li key={iidx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', color: '#FFF' }}>
                          <span>• {it.name} <strong style={{ color: '#38BDF8' }}>(x{it.quantity})</strong></span>
                          <span style={{ fontWeight: 800, color: '#10B981' }}>₹{it.price * it.quantity}</span>
                        </li>
                      ))}
                    </ul>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginTop: '8px', fontWeight: 900, fontSize: '1rem', color: '#FFF' }}>
                      <span>Final Payable Amount:</span>
                      <span style={{ color: '#10B981' }}>₹{ord.total}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: COURSES MANAGER */}
        {adminTab === 'courses' && (
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--heading-color)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <GraduationCap size={20} style={{ color: '#38BDF8' }} /> Add & Manage Courses via Link
            </h2>

            {/* Form to Add New Course */}
            <form onSubmit={handleAddCourse} style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: 'rgba(255,255,255,0.04)', padding: '20px', borderRadius: '16px', border: '1px solid var(--glass-border)', marginBottom: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>Course Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AI Prompt Engineering Masterclass"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: '#FFF', fontWeight: 700 }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>Course Link / URL *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={newCourse.link}
                    onChange={(e) => setNewCourse({ ...newCourse, link: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: '#FFF', fontWeight: 700 }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>Price (₹, Leave empty for FREE)</label>
                  <input
                    type="number"
                    placeholder="0 or empty for Free"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: '#FFF', fontWeight: 700 }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>Badge Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Featured, Hot, Free"
                    value={newCourse.badge}
                    onChange={(e) => setNewCourse({ ...newCourse, badge: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: '#FFF', fontWeight: 700 }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>Course Description / Details</label>
                <textarea
                  rows={2}
                  placeholder="Explain what students will learn in this course..."
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: '#FFF', resize: 'vertical' }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '10px 20px', alignSelf: 'flex-start', borderRadius: '10px' }}>
                <Plus size={16} /> Publish Course to Database
              </button>
            </form>

            {/* Courses List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {courses.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No courses added yet. Add your first course link using the form above!
                </div>
              ) : (
                courses.map((c) => (
                  <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '14px', border: '1px solid var(--glass-border)' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ color: '#FFF', fontWeight: 800, fontSize: '1rem' }}>{c.title}</span>
                        <span style={{ color: '#10B981', fontWeight: 900, fontSize: '0.88rem' }}>{c.price ? `₹${c.price}` : 'FREE'}</span>
                        <span style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#C084FC', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>{c.badge}</span>
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '2px' }}>Link: {c.link}</div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        onClick={() => handleToggleCourseStatus(c.id, c.status)}
                        style={{
                          background: c.status === 'Published' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          border: c.status === 'Published' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)',
                          color: c.status === 'Published' ? '#10B981' : '#EF4444',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontWeight: 800,
                          fontSize: '0.78rem',
                          cursor: 'pointer'
                        }}
                      >
                        {c.status}
                      </button>

                      <button onClick={() => handleDeleteCourse(c.id)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: COUPON MANAGER */}
        {adminTab === 'coupons' && (
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--heading-color)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Tag size={20} style={{ color: '#C084FC' }} /> Manage Active Coupon Codes
            </h2>

            {/* Create New Coupon Form */}
            <form onSubmit={handleAddCoupon} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', background: 'rgba(255,255,255,0.04)', padding: '16px', borderRadius: '14px', border: '1px solid var(--glass-border)', marginBottom: '24px' }}>
              <input
                type="text"
                required
                placeholder="Coupon Code (e.g. SAIYAM10)"
                value={newCoupon.code}
                onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                style={{ flex: 1, minWidth: '180px', padding: '10px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: '#FFF', fontWeight: 700, textTransform: 'uppercase' }}
              />

              <input
                type="number"
                required
                placeholder="Discount % (e.g. 10)"
                value={newCoupon.discount}
                onChange={(e) => setNewCoupon({ ...newCoupon, discount: Number(e.target.value) })}
                style={{ width: '140px', padding: '10px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: '#FFF', fontWeight: 700 }}
              />

              <button type="submit" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.88rem' }}>
                <Plus size={16} /> Add Coupon Code
              </button>
            </form>

            {/* Active Coupons List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {coupons.map((c, cidx) => (
                <div key={cidx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.05)', padding: '14px 18px', borderRadius: '14px', border: '1px solid var(--glass-border)' }}>
                  <div>
                    <span style={{ color: '#C084FC', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '0.05em' }}>{c.code}</span>
                    <span style={{ color: '#10B981', fontWeight: 800, fontSize: '0.9rem', marginLeft: '12px' }}>{c.discount}% Instant Discount</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                      onClick={() => handleToggleCouponStatus(c.code, c.status)}
                      style={{
                        background: c.status === 'Active' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        border: c.status === 'Active' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)',
                        color: c.status === 'Active' ? '#10B981' : '#EF4444',
                        padding: '6px 12px',
                        borderRadius: '10px',
                        fontWeight: 800,
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      {c.status}
                    </button>

                    <button onClick={() => handleDeleteCoupon(c.code)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: FORM INQUIRIES */}
        {adminTab === 'inquiries' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {inquiries.length === 0 ? (
              <div className="glass-panel" style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <MessageSquare size={40} style={{ opacity: 0.3, margin: '0 auto 12px auto' }} />
                <h3 style={{ color: 'var(--heading-color)', fontSize: '1.1rem', fontWeight: 800 }}>No Contact Form Submissions Yet</h3>
              </div>
            ) : (
              inquiries.map((inq, idx) => (
                <div key={idx} className="glass-panel" style={{ padding: '18px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ color: '#38BDF8', fontWeight: 800, fontSize: '0.95rem' }}>
                      {inq.name} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({inq.email} • {inq.phone})</span>
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '2px' }}>Date: {inq.date} • Requested Service: {inq.service}</div>
                    <p style={{ color: 'var(--text-main)', fontSize: '0.88rem', marginTop: '8px', whiteSpace: 'pre-line' }}>"{inq.message}"</p>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {inq.phone && inq.phone !== 'Not provided' && (
                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${inq.name}! Regarding your inquiry for ${inq.service}...`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-accent"
                        style={{ padding: '6px 12px', fontSize: '0.78rem', background: '#25D366' }}
                      >
                        <MessageSquare size={13} /> Chat
                      </a>
                    )}
                    <button onClick={() => handleDeleteInquiry(inq.id || idx)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 5: PRICING MANAGER */}
        {adminTab === 'pricing' && (
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--heading-color)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <DollarSign size={20} style={{ color: '#10B981' }} /> Dynamically Edit Package Prices & Fees
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>Websites BASIC Price (₹)</label>
                <input
                  type="number"
                  value={pricing.basicPrice}
                  onChange={(e) => setPricing({ ...pricing, basicPrice: Number(e.target.value) })}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: '#FFF', fontWeight: 800 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>Websites STANDARD Price (₹)</label>
                <input
                  type="number"
                  value={pricing.standardPrice}
                  onChange={(e) => setPricing({ ...pricing, standardPrice: Number(e.target.value) })}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: '#FFF', fontWeight: 800 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>Websites PREMIUM Price (₹)</label>
                <input
                  type="number"
                  value={pricing.premiumPrice}
                  onChange={(e) => setPricing({ ...pricing, premiumPrice: Number(e.target.value) })}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: '#FFF', fontWeight: 800 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>Basic LMS Website Price (₹)</label>
                <input
                  type="number"
                  value={pricing.lmsBasicPrice || 9999}
                  onChange={(e) => setPricing({ ...pricing, lmsBasicPrice: Number(e.target.value) })}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: '#FFF', fontWeight: 800 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>Standard LMS Website Price (₹)</label>
                <input
                  type="number"
                  value={pricing.lmsStandardPrice || 10999}
                  onChange={(e) => setPricing({ ...pricing, lmsStandardPrice: Number(e.target.value) })}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: '#FFF', fontWeight: 800 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>Premium LMS Website Price (₹)</label>
                <input
                  type="number"
                  value={pricing.lmsPremiumPrice || 14999}
                  onChange={(e) => setPricing({ ...pricing, lmsPremiumPrice: Number(e.target.value) })}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: '#FFF', fontWeight: 800 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>AI Video Ads Base Plan (₹)</label>
                <input
                  type="number"
                  value={pricing.videoAdsBase}
                  onChange={(e) => setPricing({ ...pricing, videoAdsBase: Number(e.target.value) })}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: '#FFF', fontWeight: 800 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>AI Video Ads Extra Per Video (₹)</label>
                <input
                  type="number"
                  value={pricing.videoAdsExtra}
                  onChange={(e) => setPricing({ ...pricing, videoAdsExtra: Number(e.target.value) })}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: '#FFF', fontWeight: 800 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>AI Image Ads Base Plan (₹)</label>
                <input
                  type="number"
                  value={pricing.imageAdsBase}
                  onChange={(e) => setPricing({ ...pricing, imageAdsBase: Number(e.target.value) })}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: '#FFF', fontWeight: 800 }}
                />
              </div>
            </div>

            <button onClick={handleSavePricing} className="btn-primary" style={{ padding: '12px 24px' }}>
              <Save size={16} /> Save Pricing to Database
            </button>
          </div>
        )}

        {/* TAB 6: LINKS & MEDIA MANAGER */}
        {adminTab === 'media' && (
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--heading-color)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Settings size={20} style={{ color: '#EC4899' }} /> System Links, UPI & Contact Controls
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>Official BharatPe UPI ID</label>
                <input
                  type="text"
                  value={mediaLinks.upiId}
                  onChange={(e) => setMediaLinks({ ...mediaLinks, upiId: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: '#FFF', fontWeight: 700 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>WhatsApp Mobile Number</label>
                <input
                  type="text"
                  value={mediaLinks.whatsappPhone}
                  onChange={(e) => setMediaLinks({ ...mediaLinks, whatsappPhone: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: '#FFF', fontWeight: 700 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>Canara Bank Account Number</label>
                <input
                  type="text"
                  value={mediaLinks.canaraAc}
                  onChange={(e) => setMediaLinks({ ...mediaLinks, canaraAc: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: '#FFF', fontWeight: 700 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>Canara Bank IFSC Code</label>
                <input
                  type="text"
                  value={mediaLinks.canaraIfsc}
                  onChange={(e) => setMediaLinks({ ...mediaLinks, canaraIfsc: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: '#FFF', fontWeight: 700 }}
                />
              </div>
            </div>

            <button onClick={handleSaveMedia} className="btn-primary" style={{ padding: '12px 24px' }}>
              <Save size={16} /> Save System Links to Database
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
