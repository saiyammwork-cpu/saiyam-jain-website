import React, { useState } from 'react';
import { 
  Globe, Code, Bot, Smartphone, Video, Image, CheckCircle, ArrowRight,
  ShieldCheck, Calculator, Sparkles, Send, Building2, ShoppingBag, Lock, Info, Star, Gift, Check, ArrowUpRight
} from 'lucide-react';

export default function Services({ setActiveTab }) {
  // Websites Pricing Tiers
  const websitePlans = [
    {
      name: 'BASIC',
      price: '₹4,999',
      tag: 'Starter Web Solution',
      popular: false,
      features: [
        '3 word domain/subdomain (Lifetime Free, e.g. trilok-tours.site.je)',
        'WordPress / AI generated structure',
        'Can avail/add AI chatbot @ ₹999 extra',
        'Delivery Timeline: 3 Days',
        'SEO Optimization Included',
        '₹0 Maintenance Cost',
        '5 Pages (Limit) Website'
      ],
      changes: '3 changes allowed only'
    },
    {
      name: 'STANDARD',
      price: '₹8,999',
      tag: 'Most Popular Growth Plan',
      popular: true,
      features: [
        '2 word Domain (.com / .in / etc...)',
        'WordPress / AI generated build',
        'FREE AI Chatbot Included',
        'SEO Optimization Included',
        '8 Pages Limit Website',
        'Delivery Timeline: 6 Days',
        'Minimal | Eye-catching Website Design',
        'FREE 1 Video Ad (40-45 sec)',
        'FREE 2 Social Media Posts',
        'FREE SSL Certificate',
        'FREE Virtual Visiting Card'
      ],
      changes: '10 changes allowed only'
    },
    {
      name: 'PREMIUM',
      price: '₹11,999',
      tag: 'Ultimate Business Experience',
      popular: false,
      features: [
        '2 word Domain (.com / .in / etc...)',
        'WordPress / AI generated build',
        'FREE AI Chatbot Included',
        'SEO Optimization Included',
        '10 Pages Limit Website',
        'Premium Designs | Minimalist & Sleek',
        'Delivery Timeline: 7-10 Days',
        'FREE 3 Video Ads (40-45 sec)',
        'FREE 4 Social Media Posts',
        'FREE Virtual Visiting Card',
        'FREE SSL Certificate',
        'FREE CRM Tool',
        'FREE Business Email'
      ],
      changes: '15 changes allowed only'
    }
  ];

  const clientPortfolio = [
    {
      name: 'Cleanza',
      category: 'Hygiene & Cleaning Solutions',
      desc: 'Designed a high-converting corporate website and AI customer support assistant for automated booking requests.',
      results: 'Automated Lead System',
      color: '#38BDF8'
    },
    {
      name: 'Jain Bhandar',
      category: 'Enterprise Retail & Wholesale',
      desc: 'Built a sleek web catalog and mobile inventory tracker for managing product inventory across multiple store locations.',
      results: 'Digital Catalog System',
      color: '#A855F7'
    },
    {
      name: 'Trilokesh Tours',
      category: 'Travel & Destination Logistics',
      desc: 'Custom web app for package customization, automated itinerary generation, and online tour reservations.',
      results: 'Online Booking Portal',
      color: '#10B981'
    },
    {
      name: 'White Hills',
      category: 'Luxury Real Estate & Living',
      desc: 'Ultra-premium glassmorphic property showcase site with 3D virtual tour video embeds and lead capture agent.',
      results: 'Luxury Showcase Site',
      color: '#F59E0B'
    },
    {
      name: 'Balajee Sarees',
      category: 'Fashion & E-Commerce',
      desc: 'Generated photorealistic AI model image ads and modern web store showcasing luxury ethnic fashion.',
      results: 'AI Ad Campaigns',
      color: '#EC4899'
    },
    {
      name: 'Noarch',
      category: 'Architecture & Design Studio',
      desc: 'Minimalist architectural portfolio showcasing high-definition project case studies and dynamic client inquiry forms.',
      results: 'Custom Design Portfolio',
      color: '#6366F1'
    }
  ];

  return (
    <div style={{ paddingTop: '110px', paddingBottom: '90px' }}>
      
      {/* Header */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 50px 24px', textAlign: 'center' }}>
        <div className="badge-glow" style={{ marginBottom: '16px' }}>
          <Sparkles size={16} style={{ color: '#38BDF8' }} /> OFFICIAL SERVICES & PRICING PLANS
        </div>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 800 }}>
          Core Services & <span className="text-gradient">Pricing Plans</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '680px', margin: '16px auto 0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
          Transparent pricing for Websites, E-Commerce Stores, AI Video Ads, and AI Image Ads.
        </p>

        {/* View-Only Informational Notice */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(56, 189, 248, 0.12)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          color: '#38BDF8',
          padding: '8px 18px',
          borderRadius: '30px',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginTop: '20px'
        }}>
          <Lock size={16} /> Note: Pricing is for viewing & inquiry only. Direct online checkout is disabled.
        </div>
      </section>

      {/* SECTION 1: WEBSITES PRICING (BASIC, STANDARD, PREMIUM) */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 80px 24px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#A855F7', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            💻 WEBSITE DEVELOPMENT PACKAGES
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginTop: '8px' }}>
            Choose Your <span className="text-gradient">Website Plan</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'stretch' }}>
          {websitePlans.map((plan, idx) => (
            <div
              key={idx}
              className="glass-panel-interactive"
              style={{
                padding: '36px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                border: plan.popular ? '2px solid rgba(168, 85, 247, 0.6)' : '1px solid var(--glass-border)',
                background: plan.popular ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(56, 189, 248, 0.12))' : 'var(--glass-bg)',
                boxShadow: plan.popular ? '0 20px 50px rgba(139, 92, 246, 0.35)' : '0 10px 30px rgba(0, 0, 0, 0.2)'
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-14px',
                  right: '24px',
                  background: 'linear-gradient(135deg, #EF4444, #F97316)',
                  color: '#FFF',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '4px 14px',
                  borderRadius: '20px',
                  boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)'
                }}>
                  🔥 MOST POPULAR
                </div>
              )}

              <div>
                <div style={{ fontSize: '0.8rem', color: '#38BDF8', fontWeight: 800, letterSpacing: '0.08em', marginBottom: '6px' }}>
                  {plan.tag}
                </div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--heading-color)', marginBottom: '8px' }}>
                  {plan.name}
                </h3>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '24px' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#FFF' }}>{plan.price}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>INR / One-time</span>
                </div>

                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '20px', marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--heading-color)', marginBottom: '14px' }}>
                    What's Included:
                  </div>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {plan.features.map((feat, fidx) => (
                      <li key={fidx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                        <CheckCircle size={18} style={{ color: '#10B981', flexShrink: 0, marginTop: '2px' }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div style={{
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--glass-border)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#C084FC',
                  textAlign: 'center',
                  marginBottom: '16px'
                }}>
                  ⚠️ Revisions: {plan.changes}
                </div>

                <button
                  onClick={() => setActiveTab('contact')}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Inquire Package <ArrowRight size={16} />
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: AI VIDEO ADS & AI IMAGE ADS PACKAGES */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 80px 24px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            🎬 AI CREATIVE & ADVERTISEMENT PACKAGES
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginTop: '8px' }}>
            AI Video Ads & <span className="text-gradient">Image Ads</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
          
          {/* AI Generated Video ADs Card */}
          <div className="glass-panel-interactive" style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.25), rgba(168, 85, 247, 0.25))',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#EF4444',
                marginBottom: '20px'
              }}>
                <Video size={28} />
              </div>

              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#EF4444', background: 'rgba(239, 68, 68, 0.12)', padding: '4px 12px', borderRadius: '12px' }}>
                VIRAL ADVERTISING
              </span>

              <h3 style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--heading-color)', marginTop: '12px', marginBottom: '8px' }}>
                AI Generated Video ADs
              </h3>

              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '2.4rem', fontWeight: 900, color: '#FFF' }}>₹1,999</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}> (Includes 3 AI Videos)</span>
                <div style={{ fontSize: '0.82rem', color: '#38BDF8', fontWeight: 700, marginTop: '4px' }}>
                  + ₹799 per additional video added to this plan
                </div>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#10B981', flexShrink: 0 }} /> 3 AI Generated Videos Included
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#10B981', flexShrink: 0 }} /> 45 - 60 Seconds Duration
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#10B981', flexShrink: 0 }} /> FREE Professional Scripting
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#10B981', flexShrink: 0 }} /> 1080p Full HD Quality Renders
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#10B981', flexShrink: 0 }} /> Advanced Video Editing & Cuts
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#10B981', flexShrink: 0 }} /> Background Music & Sound Effects
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#10B981', flexShrink: 0 }} /> Realistic AI Voiceovers
                </li>
              </ul>
            </div>

            <div>
              <div style={{ padding: '10px 14px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', fontSize: '0.8rem', fontWeight: 700, color: '#C084FC', textAlign: 'center', marginBottom: '16px' }}>
                ⚠️ Revisions: 2 changes per video limit
              </div>

              <button
                onClick={() => setActiveTab('contact')}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Inquire Video Ads <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* AI Generated Image ADs Card */}
          <div className="glass-panel-interactive" style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.25), rgba(139, 92, 246, 0.25))',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38BDF8',
                marginBottom: '20px'
              }}>
                <Image size={28} />
              </div>

              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#38BDF8', background: 'rgba(56, 189, 248, 0.12)', padding: '4px 12px', borderRadius: '12px' }}>
                GRAPHIC & SOCIAL AD CREATIVES
              </span>

              <h3 style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--heading-color)', marginTop: '12px', marginBottom: '8px' }}>
                AI Generated Image ADs
              </h3>

              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '2.4rem', fontWeight: 900, color: '#FFF' }}>₹699</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}> (Includes 2 Images / Ads)</span>
                <div style={{ fontSize: '0.82rem', color: '#38BDF8', fontWeight: 700, marginTop: '4px' }}>
                  + ₹149 per additional image/ad/poster with this plan
                </div>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#10B981', flexShrink: 0 }} /> 2 Images / Ads / Poster / Banners Included
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#10B981', flexShrink: 0 }} /> Tailored with Your Brand Kit
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#10B981', flexShrink: 0 }} /> FREE Premium Design Elements
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#10B981', flexShrink: 0 }} /> FREE Custom Typography & Fonts
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#10B981', flexShrink: 0 }} /> Ultra-HD 4K Export Quality
                </li>
              </ul>
            </div>

            <div>
              <div style={{ padding: '10px 14px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', fontSize: '0.8rem', fontWeight: 700, color: '#C084FC', textAlign: 'center', marginBottom: '16px' }}>
                ⚠️ Revisions: 3 changes allowed only
              </div>

              <button
                onClick={() => setActiveTab('contact')}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Inquire Image Ads <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* E-Commerce Store Solution Card */}
          <div className="glass-panel-interactive" style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(56, 189, 248, 0.25))',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10B981',
                marginBottom: '20px'
              }}>
                <ShoppingBag size={28} />
              </div>

              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#10B981', background: 'rgba(16, 185, 129, 0.12)', padding: '4px 12px', borderRadius: '12px' }}>
                FULL-STACK RETAIL
              </span>

              <h3 style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--heading-color)', marginTop: '12px', marginBottom: '8px' }}>
                E-Commerce Store
              </h3>

              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '2.4rem', fontWeight: 900, color: '#FFF' }}>Custom Quote</span>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>Tailored Store Architecture</div>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#10B981', flexShrink: 0 }} /> Complete Product Catalog & Inventory System
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#10B981', flexShrink: 0 }} /> Razorpay / Stripe / Paytm Gateway Setup
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#10B981', flexShrink: 0 }} /> Shopping Cart & Order Management Panel
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#10B981', flexShrink: 0 }} /> Mobile-First Responsive Design
                </li>
              </ul>
            </div>

            <div>
              <button
                onClick={() => setActiveTab('contact')}
                className="btn-accent"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Request Custom Store Quote <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Portfolio & Businesses Worked With */}
      <section style={{ background: 'rgba(11, 15, 26, 0.7)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="badge-glow" style={{ marginBottom: '16px' }}>
              <Building2 size={16} style={{ color: '#38BDF8' }} /> PROVEN TRACK RECORD
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
              Businesses Saiyam Has <span className="text-gradient">Worked With</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '550px', margin: '14px auto 0 auto' }}>
              Here are real-world client projects delivered across enterprise retail, travel, fashion, real estate, and services.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
            {clientPortfolio.map((item, idx) => (
              <div key={idx} className="glass-panel-interactive" style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: item.color
                }} />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3 style={{ color: 'var(--heading-color)', fontSize: '1.4rem', fontWeight: 800 }}>{item.name}</h3>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: item.color,
                    background: 'rgba(255,255,255,0.06)',
                    padding: '4px 10px',
                    borderRadius: '12px'
                  }}>
                    {item.category}
                  </span>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px' }}>
                  {item.desc}
                </p>

                <div style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--glass-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Deliverable:</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: item.color }}>{item.results}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
