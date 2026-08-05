import React, { useState } from 'react';
import { 
  Sparkles, Play, ArrowRight, Code, Cpu, Smartphone, Video, Image, Bot, Globe,
  CheckCircle2, Award, ExternalLink, Zap, Star, ShieldCheck
} from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from '../components/Icons';
import VideoModal from '../components/VideoModal';

export default function Home({ setActiveTab }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const clientBrands = [
    { name: 'Cleanza', tag: 'Hygiene & Services' },
    { name: 'Jain Bhandar', tag: 'Retail & Enterprise' },
    { name: 'Trilokesh Tours', tag: 'Travel & Logistics' },
    { name: 'White Hills', tag: 'Real Estate & Luxury' },
    { name: 'Balajee Sarees', tag: 'Fashion & E-Commerce' },
    { name: 'Noarch', tag: 'Design & Architecture' },
  ];

  const services = [
    { icon: Globe, title: 'Building Websites', desc: 'Ultra-fast, high-converting responsive websites built with modern UI design systems.', tag: 'Web Dev' },
    { icon: Code, title: 'Building Web Apps', desc: 'Custom full-stack web applications, SaaS dashboards, and database integrations.', tag: 'Full Stack' },
    { icon: Bot, title: 'Building AI Chatbots', desc: 'Autonomous AI agents and custom-trained chatbots for customer support & lead capture.', tag: 'AI Solutions' },
    { icon: Smartphone, title: 'Android Apps', desc: 'Native and cross-platform mobile apps for Android with sleek UI and seamless performance.', tag: 'Mobile Apps' },
    { icon: Video, title: 'AI Generated Video ADs', desc: 'Viral, studio-quality AI video advertisements designed to maximize ROI and engagement.', tag: 'Viral Ads' },
    { icon: Image, title: 'AI Generated Image ADs', desc: 'High-definition photorealistic product shots and social ad creatives powered by AI.', tag: 'Visual AI' },
  ];

  return (
    <div style={{ paddingTop: '100px' }}>
      
      {/* Hero Section */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px 80px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
          
          {/* Left Column: Headline & Intro */}
          <div>
            <div className="badge-glow" style={{ marginBottom: '20px' }}>
              <Sparkles size={16} style={{ color: '#38BDF8' }} /> CONTENT CREATOR & AI SOLUTIONS SPECIALIST
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: '1.15',
              letterSpacing: '-0.03em',
              marginBottom: '24px'
            }}>
              Crafting Premium <br />
              <span className="text-gradient">Digital Products</span> & <br />
              <span className="text-gradient-blue-white">AI Automations</span>
            </h1>

            <p style={{
              fontSize: '1.1rem',
              color: '#94A3B8',
              lineHeight: '1.7',
              marginBottom: '32px',
              maxWidth: '560px'
            }}>
              Hi, I'm <strong style={{ color: '#FFF' }}>Saiyam Jain</strong>. I help brands scale with high-converting websites, web apps, AI chatbots, mobile applications, and viral AI-generated ad creatives.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
              <button onClick={() => setActiveTab('services')} className="btn-primary">
                Explore Services <ArrowRight size={18} />
              </button>
              
              <button onClick={() => setIsVideoOpen(true)} className="btn-secondary">
                <Play size={18} style={{ color: '#38BDF8', fill: '#38BDF8' }} /> Watch Intro Video
              </button>

              <button onClick={() => setActiveTab('prompts')} className="btn-accent" style={{ padding: '12px 24px', fontSize: '0.95rem' }}>
                🔥 Prompts Vault
              </button>
            </div>

            {/* Quick Stats list */}
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '24px' }}>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#C084FC' }}>50+</div>
                <div style={{ fontSize: '0.85rem', color: '#64748B' }}>Projects Completed</div>
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#38BDF8' }}>6 Core</div>
                <div style={{ fontSize: '0.85rem', color: '#64748B' }}>Services Offered</div>
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10B981' }}>100%</div>
                <div style={{ fontSize: '0.85rem', color: '#64748B' }}>Client Satisfaction</div>
              </div>
            </div>

          </div>

          {/* Right Column: Saiyam's Portrait & Video Player Trigger */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            
            {/* Background Glow Orbs */}
            <div style={{
              position: 'absolute',
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(56, 189, 248, 0.2) 50%, transparent 70%)',
              filter: 'blur(40px)',
              zIndex: 0
            }} />

            {/* Photo Card */}
            <div className="glass-panel" style={{
              position: 'relative',
              zIndex: 1,
              padding: '16px',
              maxWidth: '380px',
              width: '100%',
              borderRadius: '28px',
              border: '1px solid rgba(168, 85, 247, 0.35)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(139, 92, 246, 0.2)'
            }}>
              
              <div style={{
                position: 'relative',
                width: '100%',
                borderRadius: '20px',
                overflow: 'hidden',
                aspectRatio: '4/5',
                background: '#0B0F19'
              }}>
                <img
                  src="/saiyam.jpg"
                  alt="Saiyam Jain - Content Creator & AI Specialist"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />

                {/* Overlaid Badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  background: 'rgba(7, 9, 19, 0.85)',
                  backdropFilter: 'blur(12px)',
                  padding: '12px 16px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ color: '#FFF', fontWeight: 700, fontSize: '0.95rem' }}>Saiyam Jain</div>
                    <div style={{ color: '#38BDF8', fontSize: '0.78rem', fontWeight: 600 }}>@saiyam.io</div>
                  </div>
                  <button
                    onClick={() => setIsVideoOpen(true)}
                    style={{
                      background: 'linear-gradient(135deg, #FF0000, #DC2626)',
                      border: 'none',
                      color: '#FFF',
                      borderRadius: '50%',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 0 15px rgba(239, 68, 68, 0.5)'
                    }}
                    title="Play Intro Video"
                  >
                    <Play size={16} fill="#FFF" />
                  </button>
                </div>
              </div>

              {/* Social Quick Links Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', padding: '0 8px' }}>
                <a
                  href="https://instagram.com/saiyam.io"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#E1306C', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <InstagramIcon size={18} /> instagram.com/saiyam.io
                </a>
                <a
                  href="https://youtube.com/@saiyam_io"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#FF0000', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <YoutubeIcon size={18} /> @saiyam_io
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* Social Proof: Businesses Worked With */}
      <section style={{ background: 'rgba(11, 15, 26, 0.7)', borderTop: '1px solid rgba(255, 255, 255, 0.06)', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', padding: '40px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', color: '#94A3B8', textTransform: 'uppercase' }}>
              Trusted By Growing Businesses & Enterprise Brands
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', alignItems: 'center' }}>
            {clientBrands.map((brand, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '14px 28px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <ShieldCheck size={20} style={{ color: '#38BDF8' }} />
                <div>
                  <div style={{ color: '#FFF', fontWeight: 700, fontSize: '0.95rem' }}>{brand.name}</div>
                  <div style={{ color: '#64748B', fontSize: '0.75rem' }}>{brand.tag}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* Services Section Grid */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '90px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="badge-glow" style={{ marginBottom: '16px' }}>
            <Zap size={14} style={{ color: '#A855F7' }} /> WHAT SAIYAM DELIVERS
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>
            6 High-Impact <span className="text-gradient">Offered Services</span>
          </h2>
          <p style={{ color: '#94A3B8', maxWidth: '600px', margin: '16px auto 0 auto', fontSize: '1rem' }}>
            From full-featured web applications and AI agents to viral AI video ad campaigns, built to scale your audience and conversion.
          </p>
        </div>

        <div className="grid-responsive-3">
          {services.map((srv, idx) => {
            const IconComp = srv.icon;
            return (
              <div key={idx} className="glass-panel-interactive" style={{ padding: '32px' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(56, 189, 248, 0.2))',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#38BDF8',
                  marginBottom: '20px'
                }}>
                  <IconComp size={26} />
                </div>

                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#C084FC',
                  background: 'rgba(192, 132, 252, 0.1)',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  display: 'inline-block',
                  marginBottom: '12px'
                }}>
                  {srv.tag}
                </span>

                <h3 style={{ color: '#FFF', fontSize: '1.3rem', fontWeight: 700, marginBottom: '12px' }}>{srv.title}</h3>
                <p style={{ color: '#94A3B8', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px' }}>{srv.desc}</p>

                <button
                  onClick={() => setActiveTab('services')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#38BDF8',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  Learn More <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </section>


      {/* Prompts Vault Callout for Instagram Bio Visitors */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 90px 24px' }}>
        <div className="glass-panel" style={{
          padding: '48px 36px',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(56, 189, 248, 0.15) 100%)',
          border: '1px solid rgba(168, 85, 247, 0.4)',
          borderRadius: '32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: '0.8rem', background: '#EF4444', color: '#FFF', fontWeight: 800, padding: '4px 12px', borderRadius: '20px' }}>
              🔥 INSTAGRAM BIO SPECIAL
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFF', marginTop: '16px', marginBottom: '12px' }}>
              Looking for AI Prompts from Saiyam's Instagram?
            </h2>
            <p style={{ color: '#CBD5E1', fontSize: '1rem', lineHeight: '1.6' }}>
              We have organized Saiyam's top viral AI Prompts (Midjourney, ChatGPT, Stable Diffusion, Sora/Runway) in one simple vault. Click below to view the dedicated prompts library or access the direct app link!
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
            <button onClick={() => setActiveTab('prompts')} className="btn-accent">
              ✨ Open Prompts Page
            </button>
            <a
              href="https://saiyam-prompts.base44.app"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{ justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}
            >
              <ExternalLink size={18} /> Direct App Link (saiyam-prompts.base44.app)
            </a>
          </div>
        </div>
      </section>

      {/* Video Modal Component */}
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />

    </div>
  );
}
