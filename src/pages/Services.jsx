import React, { useState, useEffect } from 'react';
import { 
  Globe, Code, Bot, Smartphone, Video, Image, CheckCircle, ArrowRight,
  ShieldCheck, Calculator, Sparkles, Send, Building2, ShoppingBag, Lock, Info, Star, Gift, Check, ArrowUpRight, ShoppingCart, Plus, Minus
} from 'lucide-react';
import { subscribePricing } from '../services/db';

export default function Services({ setActiveTab, addToCart, setIsCartOpen }) {
  const [extraVideosCount, setExtraVideosCount] = useState(0);
  const [extraImagesCount, setExtraImagesCount] = useState(0);

  const [pricing, setPricing] = useState({
    basicPrice: 4999,
    standardPrice: 8999,
    premiumPrice: 11999,
    videoAdsBase: 1999,
    videoAdsExtra: 799,
    imageAdsBase: 699,
    imageAdsExtra: 149
  });

  useEffect(() => {
    const unsubscribe = subscribePricing(setPricing);
    return () => unsubscribe();
  }, []);

  // Websites Pricing Tiers
  const websitePlans = [
    {
      id: 'web-basic',
      name: 'BASIC Website Package',
      price: pricing.basicPrice,
      displayPrice: `₹${pricing.basicPrice.toLocaleString()}`,
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
      id: 'web-standard',
      name: 'STANDARD Website Package',
      price: pricing.standardPrice,
      displayPrice: `₹${pricing.standardPrice.toLocaleString()}`,
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
      id: 'web-premium',
      name: 'PREMIUM Website Package',
      price: pricing.premiumPrice,
      displayPrice: `₹${pricing.premiumPrice.toLocaleString()}`,
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
      results: 'Automated Lead System'
    },
    {
      name: 'Jain Bhandar',
      category: 'Enterprise Retail & Wholesale',
      desc: 'Built a sleek web catalog and mobile inventory tracker for managing product inventory across multiple store locations.',
      results: 'Digital Catalog System'
    },
    {
      name: 'Trilokesh Tours',
      category: 'Travel & Destination Logistics',
      desc: 'Custom web app for package customization, automated itinerary generation, and online tour reservations.',
      results: 'Online Booking Portal'
    },
    {
      name: 'White Hills',
      category: 'Luxury Real Estate & Living',
      desc: 'Ultra-premium glassmorphic property showcase site with 3D virtual tour video embeds and lead capture agent.',
      results: 'Luxury Showcase Site'
    },
    {
      name: 'Balajee Sarees',
      category: 'Fashion & E-Commerce',
      desc: 'Generated photorealistic AI model image ads and modern web store showcasing luxury ethnic fashion.',
      results: 'AI Ad Campaigns'
    },
    {
      name: 'Noarch',
      category: 'Architecture & Design Studio',
      desc: 'Minimalist architectural portfolio showcasing high-definition project case studies and dynamic client inquiry forms.',
      results: 'Custom Design Portfolio'
    }
  ];

  const handleAddVideoAdsToCart = () => {
    const basePrice = pricing.videoAdsBase || 1999;
    const extraPrice = extraVideosCount * (pricing.videoAdsExtra || 799);
    const totalVideoPrice = basePrice + extraPrice;
    const totalVideos = 3 + extraVideosCount;

    addToCart({
      id: `ai-video-ads-${extraVideosCount}`,
      name: `AI Video ADs (${totalVideos} Videos Total)`,
      price: totalVideoPrice,
      quantity: 1
    });
    setIsCartOpen(true);
  };

  const handleAddImageAdsToCart = () => {
    const basePrice = pricing.imageAdsBase || 699;
    const extraPrice = extraImagesCount * (pricing.imageAdsExtra || 149);
    const totalImagePrice = basePrice + extraPrice;
    const totalImages = 2 + extraImagesCount;

    addToCart({
      id: `ai-image-ads-${extraImagesCount}`,
      name: `AI Image ADs (${totalImages} Images/Ads Total)`,
      price: totalImagePrice,
      quantity: 1
    });
    setIsCartOpen(true);
  };

  return (
    <div style={{ paddingTop: '110px', paddingBottom: '90px' }}>
      
      {/* Header */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 50px 24px', textAlign: 'center' }}>
        <div className="badge-glow" style={{ marginBottom: '16px' }}>
          <Sparkles size={16} style={{ color: '#FFFFFF' }} /> OFFICIAL SERVICES & PRICING PLANS
        </div>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 800 }}>
          Core Services & <span className="text-gradient">Pricing Plans</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '680px', margin: '16px auto 0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
          Select multiple services, add extra ad creatives, and generate your dynamic payment QR & WhatsApp receipt in 1-click!
        </p>
      </section>

      {/* SECTION 1: WEBSITES PRICING (BASIC, STANDARD, PREMIUM) */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 80px 24px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            💻 WEBSITE DEVELOPMENT PACKAGES
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginTop: '8px' }}>
            Choose Your <span className="text-gradient">Website Plan</span>
          </h2>
        </div>

        <div className="grid-responsive-3" style={{ alignItems: 'stretch' }}>
          {websitePlans.map((plan) => (
            <div
              key={plan.id}
              className={plan.popular ? "glow-card-white" : "glass-panel-interactive"}
              style={{
                padding: '36px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-14px',
                  right: '24px',
                  background: '#FFFFFF',
                  color: '#070913',
                  fontSize: '0.75rem',
                  fontWeight: 900,
                  padding: '4px 14px',
                  borderRadius: '9999px',
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
                }}>
                  🔥 MOST POPULAR
                </div>
              )}

              <div>
                <div style={{ fontSize: '0.8rem', color: '#A1A1AA', fontWeight: 800, letterSpacing: '0.08em', marginBottom: '6px' }}>
                  {plan.tag}
                </div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
                  {plan.name}
                </h3>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '24px' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#FFFFFF' }}>{plan.displayPrice}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>INR / One-time</span>
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px', marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '14px' }}>
                    What's Included:
                  </div>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {plan.features.map((feat, fidx) => (
                      <li key={fidx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                        <CheckCircle size={18} style={{ color: '#FFFFFF', flexShrink: 0, marginTop: '2px' }} />
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
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  textAlign: 'center',
                  marginBottom: '16px'
                }}>
                  ⚠️ Revisions: {plan.changes}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button
                    onClick={() => {
                      addToCart({ id: plan.id, name: plan.name, price: plan.price, quantity: 1 });
                      setIsCartOpen(true);
                    }}
                    className="btn-accent"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <ShoppingCart size={16} /> Add to Cart & Checkout
                  </button>

                  <button
                    onClick={() => setActiveTab('contact')}
                    className="btn-secondary"
                    style={{ width: '100%', justifyContent: 'center', padding: '10px', fontSize: '0.85rem' }}
                  >
                    Inquire Package <ArrowRight size={14} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: AI VIDEO ADS & AI IMAGE ADS PACKAGES */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 80px 24px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            🎬 AI CREATIVE & ADVERTISEMENT PACKAGES
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginTop: '8px' }}>
            AI Video Ads & <span className="text-gradient">Image Ads</span>
          </h2>
        </div>

        <div className="grid-responsive-2" style={{ gap: '32px' }}>
          
          {/* AI Generated Video ADs Card */}
          <div className="glass-panel-interactive" style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                marginBottom: '20px'
              }}>
                <Video size={28} />
              </div>

              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#FFFFFF', background: 'rgba(255, 255, 255, 0.1)', padding: '4px 12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)' }}>
                VIRAL ADVERTISING
              </span>

              <h3 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#FFFFFF', marginTop: '12px', marginBottom: '8px' }}>
                AI Generated Video ADs
              </h3>

              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '2.4rem', fontWeight: 900, color: '#FFFFFF' }}>₹{pricing.videoAdsBase || 1999}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}> (Includes 3 AI Videos)</span>
                <div style={{ fontSize: '0.82rem', color: '#A1A1AA', fontWeight: 700, marginTop: '4px' }}>
                  + ₹{pricing.videoAdsExtra || 799} per additional video added to this plan
                </div>
              </div>

              {/* Add Extra Videos Counter Selector */}
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '14px', borderRadius: '14px', border: '1px solid var(--border-subtle)', marginBottom: '20px' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '8px' }}>
                  Add Extra Videos (+₹{pricing.videoAdsExtra || 799} each):
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.5)', padding: '6px 12px', borderRadius: '10px' }}>
                    <button onClick={() => setExtraVideosCount(Math.max(0, extraVideosCount - 1))} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}><Minus size={14} /></button>
                    <span style={{ color: '#FFF', fontWeight: 900, fontSize: '0.95rem' }}>+{extraVideosCount} Extra Video(s)</span>
                    <button onClick={() => setExtraVideosCount(extraVideosCount + 1)} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}><Plus size={14} /></button>
                  </div>
                  <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '1.1rem' }}>
                    Total: ₹{(pricing.videoAdsBase || 1999) + (extraVideosCount * (pricing.videoAdsExtra || 799))}
                  </div>
                </div>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#FFFFFF', flexShrink: 0 }} /> {3 + extraVideosCount} AI Generated Videos Included
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#FFFFFF', flexShrink: 0 }} /> 45 - 60 Seconds Duration
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#FFFFFF', flexShrink: 0 }} /> FREE Professional Scripting
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#FFFFFF', flexShrink: 0 }} /> 1080p Full HD Quality Renders
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#FFFFFF', flexShrink: 0 }} /> Advanced Video Editing & Cuts
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#FFFFFF', flexShrink: 0 }} /> Background Music & Sound Effects
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#FFFFFF', flexShrink: 0 }} /> Realistic AI Voiceovers
                </li>
              </ul>
            </div>

            <div>
              <div style={{ padding: '10px 14px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.06)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem', fontWeight: 700, color: '#FFFFFF', textAlign: 'center', marginBottom: '16px' }}>
                ⚠️ Revisions: 2 changes per video limit
              </div>

              <button
                onClick={handleAddVideoAdsToCart}
                className="btn-accent"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <ShoppingCart size={16} /> Add Video Package to Cart (₹{(pricing.videoAdsBase || 1999) + (extraVideosCount * (pricing.videoAdsExtra || 799))})
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
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                marginBottom: '20px'
              }}>
                <Image size={28} />
              </div>

              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#FFFFFF', background: 'rgba(255, 255, 255, 0.1)', padding: '4px 12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)' }}>
                BRAND CREATIVES
              </span>

              <h3 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#FFFFFF', marginTop: '12px', marginBottom: '8px' }}>
                AI Generated Image ADs
              </h3>

              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '2.4rem', fontWeight: 900, color: '#FFFFFF' }}>₹{pricing.imageAdsBase || 699}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}> (Includes 2 HD Images/Posters)</span>
                <div style={{ fontSize: '0.82rem', color: '#A1A1AA', fontWeight: 700, marginTop: '4px' }}>
                  + ₹{pricing.imageAdsExtra || 149} per additional image added to this plan
                </div>
              </div>

              {/* Add Extra Images Counter Selector */}
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '14px', borderRadius: '14px', border: '1px solid var(--border-subtle)', marginBottom: '20px' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '8px' }}>
                  Add Extra Images (+₹{pricing.imageAdsExtra || 149} each):
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.5)', padding: '6px 12px', borderRadius: '10px' }}>
                    <button onClick={() => setExtraImagesCount(Math.max(0, extraImagesCount - 1))} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}><Minus size={14} /></button>
                    <span style={{ color: '#FFF', fontWeight: 900, fontSize: '0.95rem' }}>+{extraImagesCount} Extra Image(s)</span>
                    <button onClick={() => setExtraImagesCount(extraImagesCount + 1)} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}><Plus size={14} /></button>
                  </div>
                  <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '1.1rem' }}>
                    Total: ₹{(pricing.imageAdsBase || 699) + (extraImagesCount * (pricing.imageAdsExtra || 149))}
                  </div>
                </div>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#FFFFFF', flexShrink: 0 }} /> {2 + extraImagesCount} HD AI Brand Images Included
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#FFFFFF', flexShrink: 0 }} /> High Resolution (4K Quality) Output
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#FFFFFF', flexShrink: 0 }} /> Tailored Brand Concepts & Themes
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#FFFFFF', flexShrink: 0 }} /> Free Fonts, Banners & Graphic Elements
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={16} style={{ color: '#FFFFFF', flexShrink: 0 }} /> Social Media Optimized Formats
                </li>
              </ul>
            </div>

            <div>
              <div style={{ padding: '10px 14px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.06)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem', fontWeight: 700, color: '#FFFFFF', textAlign: 'center', marginBottom: '16px' }}>
                ⚠️ Revisions: 3 changes per image limit
              </div>

              <button
                onClick={handleAddImageAdsToCart}
                className="btn-accent"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <ShoppingCart size={16} /> Add Image Package to Cart (₹{(pricing.imageAdsBase || 699) + (extraImagesCount * (pricing.imageAdsExtra || 149))})
              </button>
            </div>
          </div>

        </div>

      </section>

      {/* SECTION 3: CLIENT PORTFOLIO SHOWCASE */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="badge-glow" style={{ marginBottom: '14px' }}>
            <Building2 size={16} style={{ color: '#FFFFFF' }} /> REAL CLIENT CASE STUDIES
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
            Featured Client <span className="text-gradient">Portfolio</span>
          </h2>
        </div>

        <div className="grid-responsive-3" style={{ gap: '28px' }}>
          {clientPortfolio.map((client, idx) => (
            <div key={idx} className="glass-panel-interactive" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#A1A1AA', textTransform: 'uppercase', marginBottom: '6px' }}>
                  {client.category}
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
                  {client.name}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>
                  {client.desc}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#FFFFFF', background: 'rgba(255, 255, 255, 0.08)', padding: '4px 10px', borderRadius: '8px' }}>
                  {client.results}
                </span>
                <button onClick={() => setActiveTab('contact')} style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  View <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
