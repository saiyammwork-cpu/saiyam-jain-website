import React, { useState } from 'react';
import { 
  Sparkles, Play, ArrowRight, Code, Cpu, Smartphone, Video, Image, Bot, Globe,
  CheckCircle2, Award, ExternalLink, Zap, Star, ShieldCheck, ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { InstagramIcon, YoutubeIcon } from '../components/Icons';
import VideoModal from '../components/VideoModal';
import saiyamPhoto from '../assets/saiyam_photo_v2.png';

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

  const easeTransition = [0.16, 1, 0.3, 1];

  return (
    <div style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
      
      {/* ====================================================================
          FULL-SCREEN HERO SECTION (MIN-HEIGHT 100VH) WITH CLEAN VIDEO BACKGROUND
          ==================================================================== */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'var(--bg-main)',
        paddingTop: '90px'
      }}>

        {/* ABSOLUTELY POSITIONED FULL-SCREEN BACKGROUND VIDEO */}
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


        {/* HERO CENTER CONTENT (TOP SPACER) */}
        <div style={{ position: 'relative', zIndex: 20, padding: '0 24px' }}>
          {/* Alignment spacer */}
        </div>


        {/* FOOTER CONTENT PINNED TO BOTTOM OVER SOFT GRADIENT FADE-UP */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: easeTransition }}
          style={{
            position: 'relative',
            zIndex: 30,
            width: '100%',
            background: 'linear-gradient(to top, rgba(7, 9, 19, 0.65) 0%, rgba(7, 9, 19, 0.3) 50%, transparent 100%)',
            padding: '60px 24px 32px 24px'
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
            <div style={{ maxWidth: '720px' }}>
              
              {/* Subtitle Line */}
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
                  backgroundColor: '#FFFFFF',
                  animation: 'pulseDot 2s infinite'
                }} />
                <span style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#E2E8F0',
                  letterSpacing: '-0.01em',
                  textShadow: '0 2px 8px rgba(0,0,0,0.7)'
                }}>
                  Seen on Shark Tank in India • Web Developer & AI Solutions Specialist
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease: easeTransition }}
                style={{
                  fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
                  fontWeight: 800,
                  lineHeight: '1.05',
                  letterSpacing: '-0.03em',
                  color: '#FFFFFF',
                  marginBottom: '24px',
                  textShadow: '0 4px 20px rgba(0,0,0,0.8)'
                }}
              >
                Crafting High-Converting <br />
                Websites & AI Automations.
              </motion.h1>

              {/* Action Buttons */}
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
                    padding: '12px 26px',
                    fontSize: '13.5px',
                    fontWeight: 600
                  }}
                >
                  Explore Services & Pricing <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="btn-secondary"
                  style={{
                    padding: '12px 24px',
                    fontSize: '13.5px',
                    fontWeight: 600
                  }}
                >
                  <Play size={16} /> Watch Intro Video
                </button>

                <button
                  onClick={() => setActiveTab('sam')}
                  className="btn-accent"
                  style={{
                    padding: '12px 24px',
                    fontSize: '13.5px',
                    fontWeight: 700
                  }}
                >
                  <Bot size={16} /> Ask SAM AI Agent
                </button>
              </motion.div>

            </div>

            {/* RIGHT BLOCK: QUICK STATS */}
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1, ease: easeTransition }}
              style={{
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
                alignItems: 'center'
              }}
            >
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', padding: '12px 20px', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>50+</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Projects Delivered</div>
              </div>

              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', padding: '12px 20px', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>100%</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Client Rating</div>
              </div>
            </motion.div>

          </div>
        </motion.div>

      </section>


      {/* ====================================================================
          PREMIUM EDITORIAL PROFILE CARD: MEET SAIYAM
          ==================================================================== */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 24px 20px 24px' }}>
        <motion.div
          whileHover={{ y: -6, scale: 1.01 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="glow-card-white"
          style={{
            padding: '36px',
            borderRadius: '32px',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            alignItems: 'center'
          }}>
            {/* Left Info Column */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#FFFFFF',
                color: '#070913',
                fontSize: '0.75rem',
                fontWeight: 900,
                padding: '4px 14px',
                borderRadius: '9999px',
                marginBottom: '16px',
                letterSpacing: '0.08em'
              }}>
                <Sparkles size={13} /> MEET SAIYAM
              </div>

              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
                Behind the <span className="text-gradient">Screens</span>
              </h2>

              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '24px', maxWidth: '520px' }}>
                Content creator. Builder. AI enthusiast. Always experimenting with what's next.
              </p>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.95rem'
              }}>
                <span>Explore Full Story & Journey</span>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  color: '#070913',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 15px rgba(255,255,255,0.3)'
                }}>
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>

            {/* Right Photo Column */}
            <div style={{
              position: 'relative',
              height: '240px',
              borderRadius: '24px',
              overflow: 'hidden',
              background: '#111422'
            }}>
              <img 
                src={saiyamPhoto} 
                alt="Saiyam Jain - Meet Saiyam" 
                onError={(e) => { e.target.src = '/saiyam_photo_v2.png'; }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  transition: 'transform 0.5s ease',
                  display: 'block',
                  position: 'relative',
                  zIndex: 1
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(7,9,19,0.7) 0%, transparent 60%)',
                zIndex: 2,
                pointerEvents: 'none'
              }} />
            </div>

          </div>
        </motion.div>
      </section>

      {/* Social Proof: Client Brands */}
      <section style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '48px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Trusted By Growing Businesses & Enterprise Brands
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
            {clientBrands.map((brand, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--glass-pill)',
                  padding: '14px 24px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <ShieldCheck size={18} style={{ color: 'var(--text-main)' }} />
                <div>
                  <div style={{ color: 'var(--text-main)', fontWeight: 700, fontSize: '0.92rem' }}>{brand.name}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{brand.tag}</div>
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
            <Zap size={14} style={{ color: 'var(--text-main)' }} /> WHAT SAIYAM DELIVERS
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>
            6 High-Impact <span className="text-gradient">Offered Services</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '16px auto 0 auto', fontSize: '1rem' }}>
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
                  background: 'var(--glass-pill)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-main)',
                  marginBottom: '20px'
                }}>
                  <IconComp size={26} />
                </div>

                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  background: 'var(--glass-pill)',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  display: 'inline-block',
                  marginBottom: '12px'
                }}>
                  {srv.tag}
                </span>

                <h3 style={{ color: 'var(--text-main)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '12px' }}>{srv.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px' }}>{srv.desc}</p>

                <button
                  onClick={() => setActiveTab('services')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-main)',
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
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '32px',
          boxShadow: 'var(--shadow-md)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: '0.8rem', background: 'var(--text-main)', color: 'var(--bg-main)', fontWeight: 800, padding: '4px 12px', borderRadius: '20px' }}>
              🔥 INSTAGRAM BIO SPECIAL
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '16px', marginBottom: '12px' }}>
              Looking for AI Prompts from Saiyam's Instagram?
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>
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
