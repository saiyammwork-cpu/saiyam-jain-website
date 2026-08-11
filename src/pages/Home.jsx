import React, { useState } from 'react';
import { 
  Sparkles, Play, ArrowRight, Code, Cpu, Smartphone, Video, Image, Bot, Globe,
  CheckCircle2, Award, ExternalLink, Zap, Star, ShieldCheck, ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';
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
    { icon: Globe, title: 'Websites (Basic, Standard & Premium)', desc: 'High-converting responsive websites with free domain, SEO, SSL, and AI chatbot options starting @ ₹4,999.', tag: 'From ₹4,999' },
    { icon: Code, title: 'E-Commerce Store', desc: 'Custom online retail stores with product catalogs, shopping cart, and online payment gateway integration.', tag: 'Custom Quote' },
    { icon: Video, title: 'AI Generated Video ADs', desc: 'Viral, 1080p studio-quality 45-60s AI video ads with scripting, voiceovers, and sound effects.', tag: '₹1,999 (3 Videos)' },
    { icon: Image, title: 'AI Generated Image ADs', desc: 'High-definition brand-tailored image ads, posters, and banners with free fonts & elements.', tag: '₹699 (2 Images)' },
    { icon: Bot, title: 'AI Chatbot Integration', desc: 'Smart conversational AI agents trained on your business data to handle customer inquiries 24/7.', tag: '₹999 Extra' },
    { icon: Smartphone, title: 'Mobile App Development', desc: 'Cross-platform iOS and Android mobile applications built for performance, speed, and scale.', tag: 'Enterprise Plan' },
  ];

  // Ease cubic bezier for smooth motion
  const easeTransition = [0.16, 1, 0.3, 1];

  return (
    <div style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
      
      {/* ====================================================================
          FULL-SCREEN BIONIC HERO SECTION (MIN-HEIGHT 100VH) WITH HAND IN MOTION
          ==================================================================== */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#FAFAFB',
        paddingTop: '90px'
      }}>

        {/* 1. ABSOLUTELY POSITIONED FULL-SCREEN BACKGROUND VIDEO */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: easeTransition }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(1.02) contrast(1.04)'
            }}
          >
            <source 
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4" 
              type="video/mp4" 
            />
          </video>
        </motion.div>


        {/* 2. HAND IN MOTION EFFECT (3D ANIMATED BIONIC HAND VISUAL OVERLAY) */}
        <div style={{
          position: 'absolute',
          top: '52%',
          left: '55%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          pointerEvents: 'none',
          maxWidth: '520px',
          width: '85%'
        }}>
          <motion.div
            animate={{
              y: [-14, 14, -14],
              rotate: [-3, 3, -3],
              scale: [1, 1.04, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Ambient Lighting Orb Behind Hand */}
            <div style={{
              position: 'absolute',
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(37, 99, 235, 0.15) 45%, transparent 70%)',
              filter: 'blur(35px)',
              zIndex: 1
            }} />

            {/* Render High-Res Bionic Hand Graphics & Motion Frame */}
            <div style={{
              position: 'relative',
              zIndex: 2,
              filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.15))'
            }}>
              <svg width="340" height="340" viewBox="0 0 400 400" fill="none">
                {/* Outer Motion Halo Rings */}
                <circle cx="200" cy="200" r="170" stroke="rgba(9, 9, 11, 0.08)" strokeWidth="1.5" strokeDasharray="6 6" />
                <circle cx="200" cy="200" r="140" stroke="rgba(9, 9, 11, 0.12)" strokeWidth="1" />

                {/* Styled 3D Bionic Mechanical Hand Silhouette */}
                <g opacity="0.92">
                  {/* Palm base */}
                  <path d="M160 270 Q200 290 240 270 L250 210 Q200 190 150 210 Z" fill="#09090B" />
                  {/* Wrist joint */}
                  <rect x="175" y="275" width="50" height="40" rx="8" fill="#18181B" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  
                  {/* Thumb */}
                  <path d="M145 220 C120 200 110 180 125 160 C135 150 145 165 155 190 Z" fill="#09090B" />
                  
                  {/* Index Finger */}
                  <path d="M165 200 L160 120 C160 100 175 100 175 120 L180 200 Z" fill="#09090B" />
                  <circle cx="168" cy="150" r="3" fill="#38BDF8" />

                  {/* Middle Finger */}
                  <path d="M190 195 L190 105 C190 85 205 85 205 105 L205 195 Z" fill="#18181B" />
                  <circle cx="197" cy="140" r="3" fill="#2563EB" />

                  {/* Ring Finger */}
                  <path d="M215 200 L220 120 C220 100 235 100 235 120 L228 200 Z" fill="#09090B" />
                  <circle cx="227" cy="150" r="3" fill="#38BDF8" />

                  {/* Pinky Finger */}
                  <path d="M238 210 L248 145 C248 130 260 130 260 145 L248 210 Z" fill="#18181B" />

                  {/* Bionic Sensor Nodes */}
                  <circle cx="200" cy="235" r="7" fill="#09090B" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="200" cy="235" r="3" fill="#38BDF8" />
                </g>
              </svg>
            </div>
          </motion.div>
        </div>


        {/* 3. HERO CENTER CONTENT (OPTIONAL TOP SPACER) */}
        <div style={{ position: 'relative', zIndex: 20, padding: '0 24px' }}>
          {/* Subtle spacer for alignment */}
        </div>


        {/* 4. FOOTER CONTENT PINNED TO BOTTOM OVER WHITE GRADIENT FADE-UP */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: easeTransition }}
          style={{
            position: 'relative',
            zIndex: 30,
            width: '100%',
            background: 'linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.85) 50%, transparent 100%)',
            padding: '60px 32px 32px 32px'
          }}
        >
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '32px'
          }}>
            
            {/* LEFT BLOCK: SUBTITLE, HEADING & BUTTONS */}
            <div style={{ maxWidth: '680px' }}>
              
              {/* 1. Subtitle Line */}
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: easeTransition }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px'
                }}
              >
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#09090B',
                  animation: 'pulseDot 2s infinite'
                }} />
                <span style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'rgba(9, 9, 11, 0.55)',
                  letterSpacing: '-0.01em'
                }}>
                  Seen on Shark Tank in India → Best digital bionic card 2026
                </span>
              </motion.div>

              {/* 2. Main Heading */}
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease: easeTransition }}
                style={{
                  fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                  fontWeight: 300,
                  lineHeight: '1.02',
                  letterSpacing: '-0.03em',
                  color: '#09090B',
                  marginBottom: '24px'
                }}
              >
                One Card, Zero <br />
                Limits. Worldwide.
              </motion.h1>

              {/* 3. Action Buttons */}
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0, ease: easeTransition }}
                style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
              >
                <button
                  onClick={() => setActiveTab('services')}
                  className="btn-primary"
                  style={{
                    padding: '12px 24px',
                    fontSize: '13px',
                    borderRadius: '9999px',
                    fontWeight: 600
                  }}
                >
                  See Features & Services <ArrowUpRight size={14} />
                </button>

                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="btn-secondary"
                  style={{
                    padding: '12px 24px',
                    fontSize: '13px',
                    borderRadius: '9999px',
                    background: 'transparent',
                    border: '1px solid rgba(0, 0, 0, 0.35)',
                    color: '#09090B',
                    fontWeight: 500
                  }}
                >
                  How It Works / Watch Intro
                </button>
              </motion.div>

            </div>

            {/* RIGHT BLOCK: THREE TAG PILLS */}
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1, ease: easeTransition }}
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                alignItems: 'center'
              }}
            >
              {['Neuromorphic', 'AGI', 'Cybernetics'].map((tag, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    borderRadius: '9999px',
                    padding: '6px 14px',
                    fontSize: '11px',
                    fontWeight: 500,
                    color: '#09090B',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}
                >
                  {tag}
                </div>
              ))}
            </motion.div>

          </div>
        </motion.div>

      </section>


      {/* ====================================================================
          PRESERVED SECTIONS: BRANDS, SERVICES GRID & PROMPTS VAULT
          ==================================================================== */}

      {/* Social Proof: Client Brands */}
      <section style={{ background: '#FFFFFF', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '48px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', color: '#71717A', textTransform: 'uppercase' }}>
              Trusted By Growing Businesses & Enterprise Brands
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
            {clientBrands.map((brand, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FAFAFB',
                  padding: '14px 24px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}
              >
                <ShieldCheck size={18} style={{ color: '#09090B' }} />
                <div>
                  <div style={{ color: '#09090B', fontWeight: 700, fontSize: '0.92rem' }}>{brand.name}</div>
                  <div style={{ color: '#71717A', fontSize: '0.75rem' }}>{brand.tag}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* Services Showcase Grid */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '90px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="badge-glow" style={{ marginBottom: '16px' }}>
            <Zap size={14} style={{ color: '#09090B' }} /> WHAT SAIYAM DELIVERS
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>
            6 High-Impact <span className="text-gradient">Offered Services</span>
          </h2>
          <p style={{ color: '#71717A', maxWidth: '600px', margin: '16px auto 0 auto', fontSize: '1rem' }}>
            From full-featured web applications and AI agents to viral AI video ad campaigns, built to scale your audience and conversion.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {services.map((srv, idx) => {
            const IconComp = srv.icon;
            return (
              <div key={idx} className="glass-panel-interactive" style={{ padding: '32px' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '16px',
                  background: '#F4F4F6',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#09090B',
                  marginBottom: '20px'
                }}>
                  <IconComp size={26} />
                </div>

                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#09090B',
                  background: '#F4F4F6',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  display: 'inline-block',
                  marginBottom: '12px'
                }}>
                  {srv.tag}
                </span>

                <h3 style={{ color: '#09090B', fontSize: '1.3rem', fontWeight: 700, marginBottom: '12px' }}>{srv.title}</h3>
                <p style={{ color: '#71717A', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px' }}>{srv.desc}</p>

                <button
                  onClick={() => setActiveTab('services')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#09090B',
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


      {/* Prompts Vault Banner */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 90px 24px' }}>
        <div style={{
          padding: '48px 36px',
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: '32px',
          boxShadow: 'var(--shadow-md)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: '0.8rem', background: '#09090B', color: '#FFF', fontWeight: 800, padding: '4px 12px', borderRadius: '20px' }}>
              🔥 INSTAGRAM BIO SPECIAL
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#09090B', marginTop: '16px', marginBottom: '12px' }}>
              Looking for AI Prompts from Saiyam's Instagram?
            </h2>
            <p style={{ color: '#71717A', fontSize: '1rem', lineHeight: '1.6' }}>
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
              style={{ justifyContent: 'center' }}
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
