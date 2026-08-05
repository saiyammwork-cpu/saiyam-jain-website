import React, { useState } from 'react';
import { 
  Globe, Code, Bot, Smartphone, Video, Image, CheckCircle, ArrowRight,
  ShieldCheck, Calculator, Sparkles, Send, Building2
} from 'lucide-react';

export default function Services({ setActiveTab }) {
  const [selectedServices, setSelectedServices] = useState(['Building Websites']);
  const [timeline, setTimeline] = useState('Standard (2-3 Weeks)');

  const serviceDetails = [
    {
      id: 'websites',
      title: '1. Building Websites',
      icon: Globe,
      tag: 'Web Architecture',
      priceBadge: 'Custom Quote',
      desc: 'Sleek, lightning-fast modern websites built using responsive CSS grids, glassmorphism, SEO best practices, and captivating visual micro-animations.',
      features: ['100% Mobile & Desktop Responsive', 'SEO Optimization & Meta Tag Structure', 'Glassmorphic Modern Design System', 'Speed Optimization & CWV Compliance']
    },
    {
      id: 'webapps',
      title: '2. Building Web Apps',
      icon: Code,
      tag: 'Full-Stack SaaS',
      priceBadge: 'Tailored Package',
      desc: 'Custom web applications, client portals, SaaS platforms, and dynamic API integrations engineered for speed and reliability.',
      features: ['React & Next.js Framework Architecture', 'Database & API Integrations', 'Authentication & User Management', 'Custom Admin Dashboards']
    },
    {
      id: 'aichatbots',
      title: '3. Building AI Chatbots',
      icon: Bot,
      tag: 'AI Intelligence',
      priceBadge: 'Project-Based',
      desc: 'Autonomous AI agents trained specifically on your business knowledge base, product catalog, and customer support guidelines.',
      features: ['Custom Data Training & Embeddings', '24/7 Automated Customer Support', 'Lead Capture & CRM Syncing', 'Multi-channel Embed Widget']
    },
    {
      id: 'androidapps',
      title: '4. Android Apps',
      icon: Smartphone,
      tag: 'Mobile Engineering',
      priceBadge: 'Custom Quote',
      desc: 'User-friendly, performant Android applications with custom UI controls, offline caching, push notifications, and Play Store readiness.',
      features: ['Android Native & Flutter Development', 'Push Notifications Integration', 'Play Store Deployment Guidance', 'Clean UI & Smooth Navigation']
    },
    {
      id: 'aivideoads',
      title: '5. AI Generated Video ADs',
      icon: Video,
      tag: 'Viral Creative Ads',
      priceBadge: 'Campaign Tier',
      desc: 'High-converting studio quality AI video ad campaigns designed for Instagram Reels, YouTube Shorts, and TikTok ads.',
      features: ['Sora / Runway / Midjourney Visuals', 'Realistic AI Voiceovers & Scripts', 'High Click-Through Rate Hooks', 'Custom Brand Overlay & Sound FX']
    },
    {
      id: 'aiimageads',
      title: '6. AI Generated Image ADs',
      icon: Image,
      tag: 'Visual Assets',
      priceBadge: 'Asset Pack',
      desc: 'Photorealistic AI generated product renders, banner ads, and social media carousels tailored for high engagement.',
      features: ['Ultra HD 4K Quality Renders', 'Custom Product Placement Prompts', 'Social Media Campaign Kits', 'Fast Turnaround']
    }
  ];

  const clientPortfolio = [
    {
      name: 'Cleanza',
      category: 'Hygiene & Cleaning Solutions',
      desc: 'Designed a high-converting corporate website and AI customer support assistant for automated booking requests.',
      results: 'Automated Lead Capture',
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
      results: 'Online Booking System',
      color: '#10B981'
    },
    {
      name: 'White Hills',
      category: 'Luxury Real Estate & Living',
      desc: 'Ultra-premium glassmorphic property showcase site with 3D virtual tour video embeds and lead capture agent.',
      results: 'Luxury Property Showcase',
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
      results: 'Custom Studio Portfolio',
      color: '#6366F1'
    }
  ];

  const toggleServiceSelection = (srvTitle) => {
    if (selectedServices.includes(srvTitle)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== srvTitle));
      }
    } else {
      setSelectedServices([...selectedServices, srvTitle]);
    }
  };

  return (
    <div style={{ paddingTop: '110px', paddingBottom: '80px' }}>
      
      {/* Header */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 60px 24px', textAlign: 'center' }}>
        <div className="badge-glow" style={{ marginBottom: '16px' }}>
          <Sparkles size={16} style={{ color: '#38BDF8' }} /> SERVICES & PORTFOLIO SHOWCASE
        </div>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 800 }}>
          High-Value Services & <span className="text-gradient">Client Case Studies</span>
        </h1>
        <p style={{ color: '#94A3B8', maxWidth: '650px', margin: '16px auto 0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
          Explore Saiyam Jain's specialized service offerings and see how we have transformed businesses like Cleanza, Jain Bhandar, Trilokesh Tours, and White Hills.
        </p>
      </section>

      {/* Services Grid */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 80px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
          {serviceDetails.map((srv) => {
            const IconComp = srv.icon;
            return (
              <div key={srv.id} className="glass-panel-interactive" style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(56, 189, 248, 0.25))',
                      border: '1px solid rgba(168, 85, 247, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#38BDF8'
                    }}>
                      <IconComp size={28} />
                    </div>
                    <span style={{
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      color: '#FFF',
                      background: 'rgba(255, 255, 255, 0.08)',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      border: '1px solid rgba(255, 255, 255, 0.12)'
                    }}>
                      {srv.priceBadge}
                    </span>
                  </div>

                  <h3 style={{ color: '#FFF', fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px' }}>{srv.title}</h3>
                  <p style={{ color: '#94A3B8', fontSize: '0.94rem', lineHeight: '1.6', marginBottom: '24px' }}>{srv.desc}</p>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                    {srv.features.map((feat, fidx) => (
                      <li key={fidx} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#CBD5E1', fontSize: '0.88rem' }}>
                        <CheckCircle size={16} style={{ color: '#10B981', flexShrink: 0 }} />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setSelectedServices([srv.title.replace(/^\d+\.\s*/, '')]);
                    const calcElem = document.getElementById('quote-calculator');
                    if (calcElem) calcElem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Request Proposal <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Portfolio & Businesses Worked With */}
      <section style={{ background: 'rgba(11, 15, 26, 0.7)', borderTop: '1px solid rgba(255, 255, 255, 0.06)', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', padding: '90px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="badge-glow" style={{ marginBottom: '16px' }}>
              <Building2 size={16} style={{ color: '#38BDF8' }} /> PROVEN TRACK RECORD
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
              Businesses Saiyam Has <span className="text-gradient">Worked With</span>
            </h2>
            <p style={{ color: '#94A3B8', maxWidth: '550px', margin: '14px auto 0 auto' }}>
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
                  <h3 style={{ color: '#FFF', fontSize: '1.4rem', fontWeight: 800 }}>{item.name}</h3>
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

                <p style={{ color: '#94A3B8', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px' }}>
                  {item.desc}
                </p>

                <div style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>Deliverable:</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: item.color }}>{item.results}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Project Inquiry & Quote Request */}
      <section id="quote-calculator" style={{ maxWidth: '1000px', margin: '90px auto 0 auto', padding: '0 24px' }}>
        <div className="glass-panel" style={{
          padding: '48px 36px',
          border: '1px solid rgba(168, 85, 247, 0.4)',
          boxShadow: '0 20px 50px rgba(139, 92, 246, 0.25)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div className="badge-glow" style={{ marginBottom: '12px' }}>
              <Calculator size={16} style={{ color: '#38BDF8' }} /> PROJECT PROPOSAL
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
              Request a Custom <span className="text-gradient">Project Proposal</span>
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginTop: '8px' }}>
              Select the services you need and click below to send your request directly to Saiyam.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            
            {/* Service Selection */}
            <div>
              <label style={{ color: '#FFF', fontWeight: 700, fontSize: '0.95rem', display: 'block', marginBottom: '16px' }}>
                Select Required Services:
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Building Websites', 'Building Web Apps', 'Building AI Chatbots', 'Android Apps', 'AI Generated Video ADs', 'AI Generated Image ADs'].map((name) => {
                  const isChecked = selectedServices.includes(name);
                  return (
                    <button
                      key={name}
                      onClick={() => toggleServiceSelection(name)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: isChecked ? '1px solid rgba(168, 85, 247, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                        background: isChecked ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                        color: isChecked ? '#FFF' : '#94A3B8',
                        fontWeight: isChecked ? 700 : 500,
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <span>{name}</span>
                      {isChecked && <CheckCircle size={18} style={{ color: '#38BDF8' }} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Timeline & Action */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <label style={{ color: '#FFF', fontWeight: 700, fontSize: '0.95rem', display: 'block', marginBottom: '16px' }}>
                  Target Delivery Timeline:
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                  {['Standard (2-3 Weeks)', 'Express (1 Week)', 'Flexible / Retainer'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimeline(t)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: timeline === t ? '1px solid rgba(56, 189, 248, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                        background: timeline === t ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                        color: timeline === t ? '#FFF' : '#94A3B8',
                        fontWeight: timeline === t ? 700 : 500,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Box */}
              <div style={{
                padding: '24px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(56, 189, 248, 0.1))',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.9rem', color: '#FFF', fontWeight: 700 }}>
                  {selectedServices.length} Service{selectedServices.length > 1 ? 's' : ''} Selected
                </div>
                <div style={{ fontSize: '0.85rem', color: '#94A3B8', margin: '6px 0 16px 0' }}>
                  Timeline: {timeline}
                </div>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="btn-accent"
                  style={{ width: '100%' }}
                >
                  Send Proposal Request <Send size={16} />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
