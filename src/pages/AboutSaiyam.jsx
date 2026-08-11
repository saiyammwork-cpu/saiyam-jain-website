import React, { useEffect } from 'react';
import { 
  Sparkles, ArrowRight, Play, Globe, Bot, Code, Terminal, Layers, 
  Lightbulb, Share2, Compass, ShieldCheck, ExternalLink, MessageSquare, 
  ArrowUpRight, ChevronDown, CheckCircle, Cpu, BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';
import saiyamProfilePhoto from '../assets/saiyam_profile.jpg';

export default function AboutSaiyam({ setActiveTab }) {
  useEffect(() => {
    document.title = "About Saiyam Jain | Creator, Builder & AI Enthusiast";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Meet Saiyam Jain — a content creator, website builder and AI enthusiast exploring technology, digital creation, websites and the future of AI.');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const easeTransition = [0.16, 1, 0.3, 1];

  const socialLinks = [
    { name: 'Instagram', handle: '@saiyam.io', url: 'https://instagram.com/saiyam.io?utm_source=chatgpt.com' },
    { name: 'YouTube', handle: '@saiyam_io', url: 'https://youtube.com/@saiyam_io?utm_source=chatgpt.com' },
    { name: 'Facebook', handle: 'Saiyam.io', url: 'https://www.facebook.com/saiyam.io?utm_source=chatgpt.com' },
    { name: 'LinkedIn', handle: 'Saiyam Jain', url: 'https://www.linkedin.com/in/saiyamio?utm_source=chatgpt.com' },
    { name: 'X (Twitter)', handle: '@SaiyamJain', url: 'https://x.com/SaiyamJain?utm_source=chatgpt.com' },
    { name: 'Threads', handle: '@saiyam.io', url: 'https://www.threads.com/@saiyam.io?utm_source=chatgpt.com' }
  ];

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', overflowX: 'hidden' }}>
      
      {/* ====================================================================
          1. HERO SECTION
          ==================================================================== */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 24px 80px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}>
          
          {/* Left Column: Headings & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: easeTransition }}
          >
            <div className="badge-glow" style={{ marginBottom: '20px' }}>
              <Sparkles size={14} style={{ color: '#FFFFFF' }} /> ABOUT SAIYAM
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              fontWeight: 800,
              lineHeight: '1.08',
              marginBottom: '20px',
              color: '#FFFFFF'
            }}>
              Building. Creating. <br />
              <span className="text-gradient">Experimenting.</span>
            </h1>

            <p style={{
              color: 'var(--text-muted)',
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              lineHeight: '1.65',
              marginBottom: '32px',
              maxWidth: '580px'
            }}>
              I'm Saiyam Jain — a content creator, website builder and AI enthusiast exploring how technology can help people create, build and grow faster.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <a
                href="#my-journey"
                className="btn-primary"
                style={{ padding: '14px 28px', fontSize: '0.95rem' }}
              >
                Explore My Journey <ArrowRight size={16} />
              </a>

              <button
                onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-secondary"
                style={{ padding: '14px 28px', fontSize: '0.95rem' }}
              >
                Work With Me
              </button>
            </div>
          </motion.div>

          {/* Right Column: Profile Card Composition with Real Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: easeTransition }}
            style={{ position: 'relative' }}
          >
            <div className="glow-card-white" style={{
              position: 'relative',
              padding: '16px',
              borderRadius: '32px',
              overflow: 'hidden',
              maxWidth: '440px',
              margin: '0 auto'
            }}>
              <div style={{
                width: '100%',
                aspectRatio: '4/5',
                minHeight: '400px',
                borderRadius: '24px',
                overflow: 'hidden',
                position: 'relative',
                background: '#111422'
              }}>
                <img 
                  src={saiyamProfilePhoto} 
                  alt="Saiyam Jain - Content Creator & Website Builder" 
                  onError={(e) => { e.target.src = '/saiyam_profile.jpg'; }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 42%',
                    transform: 'scale(1.15)',
                    display: 'block',
                    position: 'relative',
                    zIndex: 1
                  }}
                />
                
                {/* Gradient vignette */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(7,9,19,0.85) 0%, transparent 60%)',
                  zIndex: 2,
                  pointerEvents: 'none'
                }} />

                {/* Bottom Overlay Label */}
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  zIndex: 3
                }}>
                  <div>
                    <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1.2rem' }}>Saiyam Jain</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>@saiyam.io</div>
                  </div>

                  <span style={{
                    background: '#FFFFFF',
                    color: '#070913',
                    fontWeight: 900,
                    fontSize: '0.72rem',
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    boxShadow: '0 0 15px rgba(255,255,255,0.4)'
                  }}>
                    FOUNDER
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Badge 1 */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '-10px',
              background: 'rgba(17, 20, 34, 0.95)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '16px',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 4
            }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#FFFFFF', color: '#070913', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={15} />
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FFFFFF' }}>AI Explorer</span>
            </div>

            {/* Floating Badge 2 */}
            <div style={{
              position: 'absolute',
              bottom: '40px',
              right: '-10px',
              background: 'rgba(17, 20, 34, 0.95)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '16px',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 4
            }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#FFFFFF', color: '#070913', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Code size={15} />
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FFFFFF' }}>Website Builder</span>
            </div>
          </motion.div>

        </div>

        {/* Subtle Scroll Indicator */}
        <div style={{ textAlign: 'center', marginTop: '48px', opacity: 0.6 }}>
          <a href="#introduction" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '6px', fontSize: '0.78rem' }}>
            Scroll to explore
            <ChevronDown size={16} />
          </a>
        </div>
      </section>


      {/* ====================================================================
          2. INTRODUCTION SECTION
          ==================================================================== */}
      <section id="introduction" style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px' }}>
        <div className="glass-panel" style={{ padding: '48px 36px', borderRadius: '32px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '24px' }}>
            Hey, I'm Saiyam.
          </h2>

          <div style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p>
              I'm Saiyam Jain. I create content around AI, technology, websites and digital opportunities, while also building real-world projects and experimenting with new tools.
            </p>
            <p>
              What started as curiosity about technology gradually turned into something much bigger — creating websites, exploring AI tools, building digital products, helping businesses establish themselves online, and sharing what I learn with others.
            </p>
            <p style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.15rem' }}>
              I don't want to just talk about technology. I want to build with it.
            </p>
          </div>
        </div>
      </section>


      {/* ====================================================================
          3. MY STORY (TIMELINE)
          ==================================================================== */}
      <section id="my-journey" style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="badge-glow" style={{ marginBottom: '12px' }}>
            <Compass size={14} style={{ color: '#FFFFFF' }} /> CHRONOLOGICAL TIMELINE
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>
            The Journey <span className="text-gradient">So Far</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative' }}>
          
          {/* Chapter 01 */}
          <div className="glass-panel-interactive" style={{ padding: '36px', borderRadius: '24px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#A1A1AA', letterSpacing: '0.1em', marginBottom: '8px' }}>
              CHAPTER 01
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px' }}>
              Curiosity
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.7' }}>
              My journey began with a deep curiosity about how technology, websites, AI, and online systems function behind the scenes. I became obsessed with exploring what was possible when code, design, and digital tools come together to create something meaningful.
            </p>
          </div>

          {/* Chapter 02 */}
          <div className="glass-panel-interactive" style={{ padding: '36px', borderRadius: '24px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#A1A1AA', letterSpacing: '0.1em', marginBottom: '8px' }}>
              CHAPTER 02
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px' }}>
              Experimenting
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '16px' }}>
              Experimentation quickly became my primary way of learning. I spent countless hours testing:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['AI Tools', 'Website Builders', 'WordPress', 'Website Development', 'Automation', 'Digital Marketing', 'AI Agents', 'Web Applications', 'Content Creation'].map((item, idx) => (
                <span key={idx} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-subtle)', color: '#FFFFFF', padding: '6px 14px', borderRadius: '12px', fontSize: '0.82rem', fontWeight: 600 }}>
                  {item}
                </span>
              ))}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: '1.6', marginTop: '16px', fontStyle: 'italic' }}>
              Experimentation wasn't always smooth sailing — there were plenty of bugs, failed ideas, technical roadblocks, and invaluable lessons along the way.
            </p>
          </div>

          {/* Chapter 03 */}
          <div className="glass-panel-interactive" style={{ padding: '36px', borderRadius: '24px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#A1A1AA', letterSpacing: '0.1em', marginBottom: '8px' }}>
              CHAPTER 03
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px' }}>
              Creating Content
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '16px' }}>
              I began documenting and sharing everything I learned across social media — focusing on Artificial Intelligence, AI tools, website creation, website monetization, digital opportunities, tech tutorials, prompts, and AI-powered workflows.
            </p>
            <blockquote style={{ background: 'rgba(255,255,255,0.06)', borderLeft: '4px solid #FFFFFF', padding: '16px 20px', borderRadius: '0 16px 16px 0', color: '#FFFFFF', fontWeight: 700, fontSize: '1rem', fontStyle: 'italic' }}>
              "I realized that learning something is only half the journey. Sharing it can help someone else start theirs."
            </blockquote>
          </div>

          {/* Chapter 04 */}
          <div className="glass-panel-interactive" style={{ padding: '36px', borderRadius: '24px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#A1A1AA', letterSpacing: '0.1em', marginBottom: '8px' }}>
              CHAPTER 04
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px' }}>
              Building For Real People
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '16px' }}>
              Over time, my personal experiments evolved into building real-world digital solutions for businesses, creators, and entrepreneurs:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              {['Business Websites', 'E-Commerce Stores', 'AI-Powered Websites', 'Web Applications', 'Digital Marketing', 'LMS Platforms', 'Custom Online Systems'].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FFFFFF', fontSize: '0.88rem', fontWeight: 600 }}>
                  <CheckCircle size={15} style={{ color: '#FFFFFF' }} /> {item}
                </div>
              ))}
            </div>
          </div>

          {/* Chapter 05 */}
          <div className="glass-panel-interactive" style={{ padding: '36px', borderRadius: '24px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#A1A1AA', letterSpacing: '0.1em', marginBottom: '8px' }}>
              CHAPTER 05
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px' }}>
              Building a Personal Brand
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.7' }}>
              This journey led to the creation of <strong>saiyam.io</strong> — a personal brand and digital hub dedicated to AI, web development, education, and empowering others to build using modern technology.
            </p>
          </div>

        </div>
      </section>


      {/* ====================================================================
          4. FROM LEARNING TO CREATING (CONTENT CREATION)
          ==================================================================== */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="badge-glow" style={{ marginBottom: '12px' }}>
            <Play size={14} style={{ color: '#FFFFFF' }} /> DOCUMENTING THE PROCESS
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>
            From Learning <span className="text-gradient">to Creating</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '14px auto 0 auto', fontSize: '1rem', lineHeight: '1.6' }}>
            Content creation is my way of documenting real experiments, discoveries, tutorials, and practical builds.
          </p>
        </div>

        <div className="grid-responsive-3" style={{ marginBottom: '40px' }}>
          
          <div className="glass-panel-interactive" style={{ padding: '28px' }}>
            <Bot size={28} style={{ color: '#FFFFFF', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>AI</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Exploring AI tools, agents, workflows and practical real-world use cases.
            </p>
          </div>

          <div className="glass-panel-interactive" style={{ padding: '28px' }}>
            <Globe size={28} style={{ color: '#FFFFFF', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>Websites</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Building modern websites using low-code/no-code platforms, custom code, and AI.
            </p>
          </div>

          <div className="glass-panel-interactive" style={{ padding: '28px' }}>
            <Sparkles size={28} style={{ color: '#FFFFFF', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>Digital Opportunities</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Showing people how technology can be leveraged to create new opportunities online.
            </p>
          </div>

          <div className="glass-panel-interactive" style={{ padding: '28px' }}>
            <BookOpen size={28} style={{ color: '#FFFFFF', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>Tutorials</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Breaking complicated technical concepts into simple, actionable steps anyone can follow.
            </p>
          </div>

          <div className="glass-panel-interactive" style={{ padding: '28px' }}>
            <Terminal size={28} style={{ color: '#FFFFFF', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>Experiments</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Testing new AI tools and technologies and sharing what actually works.
            </p>
          </div>

        </div>

        {/* Statement Quote Box */}
        <div className="glow-card-white" style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 28px', textAlign: 'center', borderRadius: '24px' }}>
          <p style={{ color: '#FFFFFF', fontSize: '1.15rem', fontWeight: 700, lineHeight: '1.6' }}>
            "I don't create content just to follow trends. I create around things I'm genuinely building, testing and learning."
          </p>
        </div>
      </section>


      {/* ====================================================================
          5. WHAT I DO
          ==================================================================== */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="badge-glow" style={{ marginBottom: '12px' }}>
            <Layers size={14} style={{ color: '#FFFFFF' }} /> ROLES & CAPABILITIES
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>
            What <span className="text-gradient">I Do</span>
          </h2>
        </div>

        <div className="grid-responsive-3">
          
          <div className="glass-panel-interactive" style={{ padding: '32px' }}>
            <Play size={28} style={{ color: '#FFFFFF', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '10px' }}>Content Creator</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
              I create educational and practical content around AI, technology, websites and digital tools.
            </p>
          </div>

          <div className="glass-panel-interactive" style={{ padding: '32px' }}>
            <Globe size={28} style={{ color: '#FFFFFF', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '10px' }}>Website Builder</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
              I design and build websites and online experiences for businesses and creators.
            </p>
          </div>

          <div className="glass-panel-interactive" style={{ padding: '32px' }}>
            <Bot size={28} style={{ color: '#FFFFFF', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '10px' }}>AI Explorer</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
              I constantly experiment with new AI tools, agents and workflows.
            </p>
          </div>

          <div className="glass-panel-interactive" style={{ padding: '32px' }}>
            <Code size={28} style={{ color: '#FFFFFF', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '10px' }}>Digital Builder</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
              I build digital products, web applications, online platforms and experiments.
            </p>
          </div>

          <div className="glass-panel-interactive" style={{ padding: '32px' }}>
            <Lightbulb size={28} style={{ color: '#FFFFFF', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '10px' }}>Educator</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
              I simplify complicated technology so more people can understand and use it.
            </p>
          </div>

        </div>
      </section>


      {/* ====================================================================
          6. BEYOND CONTENT
          ==================================================================== */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <div className="glass-panel" style={{ padding: '56px 36px', borderRadius: '32px' }}>
          <div className="badge-glow" style={{ marginBottom: '16px' }}>
            <Cpu size={14} style={{ color: '#FFFFFF' }} /> THE BUILDING MINDSET
          </div>
          
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '20px' }}>
            There’s More Than Just Content
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8', maxWidth: '720px', margin: '0 auto 28px auto' }}>
            I am deeply interested in the entire end-to-end process of building:
          </p>

          {/* Process Flow Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '32px' }}>
            {['Idea', 'Experiment', 'Build', 'Break', 'Fix', 'Launch', 'Improve'].map((step, idx) => (
              <React.Fragment key={idx}>
                <span style={{ background: '#FFFFFF', color: '#070913', fontWeight: 900, fontSize: '0.88rem', padding: '8px 16px', borderRadius: '9999px', boxShadow: '0 0 15px rgba(255,255,255,0.2)' }}>
                  {step}
                </span>
                {idx < 6 && <span style={{ color: 'var(--text-muted)', alignSelf: 'center', fontWeight: 700 }}>→</span>}
              </React.Fragment>
            ))}
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.7', maxWidth: '720px', margin: '0 auto 36px auto' }}>
            One of the biggest lessons I've learned is that technology isn't always about knowing everything beforehand. It's about being willing to figure things out along the way.
          </p>

          {/* Large Typography Quote */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '32px' }}>
            <div style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em', textShadow: '0 0 25px rgba(255,255,255,0.3)' }}>
              “Build first. Learn faster. Improve constantly.”
            </div>
          </div>
        </div>
      </section>


      {/* ====================================================================
          7. MY APPROACH (4 PRINCIPLES)
          ==================================================================== */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="badge-glow" style={{ marginBottom: '12px' }}>
            <ShieldCheck size={14} style={{ color: '#FFFFFF' }} /> CORE PRINCIPLES
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>
            My <span className="text-gradient">Approach</span>
          </h2>
        </div>

        <div className="grid-responsive-2" style={{ gap: '28px' }}>
          
          <div className="glass-panel-interactive" style={{ padding: '36px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#A1A1AA', letterSpacing: '0.1em', marginBottom: '8px' }}>PRINCIPLE 01</div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '10px' }}>BUILD</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.6' }}>
              Don't just consume technology. Build with it.
            </p>
          </div>

          <div className="glass-panel-interactive" style={{ padding: '36px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#A1A1AA', letterSpacing: '0.1em', marginBottom: '8px' }}>PRINCIPLE 02</div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '10px' }}>EXPERIMENT</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.6' }}>
              Try new tools instead of blindly following what everyone else says.
            </p>
          </div>

          <div className="glass-panel-interactive" style={{ padding: '36px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#A1A1AA', letterSpacing: '0.1em', marginBottom: '8px' }}>PRINCIPLE 03</div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '10px' }}>SIMPLIFY</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.6' }}>
              Technology is only useful when people can actually understand it.
            </p>
          </div>

          <div className="glass-panel-interactive" style={{ padding: '36px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#A1A1AA', letterSpacing: '0.1em', marginBottom: '8px' }}>PRINCIPLE 04</div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '10px' }}>SHARE</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.6' }}>
              If something works, share the knowledge.
            </p>
          </div>

        </div>
      </section>


      {/* ====================================================================
          8. WHAT I'M WORKING TOWARDS
          ==================================================================== */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 24px' }}>
        <div className="glow-card-white" style={{ padding: '48px 36px', borderRadius: '32px', textAlign: 'center' }}>
          <div className="badge-glow" style={{ marginBottom: '16px' }}>
            <Globe size={14} style={{ color: '#FFFFFF' }} /> VISION
          </div>
          
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '20px' }}>
            The Bigger Picture
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '760px', margin: '0 auto' }}>
            "I want to build a brand around creating, learning and sharing. The goal isn't to become someone who simply talks about AI or technology. The goal is to actually build things with it — websites, products, tools, businesses, content and opportunities — and bring people along for the journey."
          </p>
        </div>
      </section>


      {/* ====================================================================
          9. MY DIGITAL WORLD
          ==================================================================== */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="badge-glow" style={{ marginBottom: '12px' }}>
            <Globe size={14} style={{ color: '#FFFFFF' }} /> ECOSYSTEM
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>
            My <span className="text-gradient">Digital World</span>
          </h2>
        </div>

        <div className="grid-responsive-2" style={{ gap: '28px' }}>
          
          <div 
            onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="glass-panel-interactive" 
            style={{ padding: '32px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>Saiyam.io</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>My personal digital hub.</p>
            </div>
            <ArrowUpRight size={22} style={{ color: '#FFFFFF' }} />
          </div>

          <div 
            onClick={() => { setActiveTab('prompts'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="glass-panel-interactive" 
            style={{ padding: '32px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>AI & Prompts</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Tools, prompts, experiments and resources.</p>
            </div>
            <ArrowUpRight size={22} style={{ color: '#FFFFFF' }} />
          </div>

          <div 
            onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="glass-panel-interactive" 
            style={{ padding: '32px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>Websites & Digital Solutions</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Websites and digital experiences for businesses.</p>
            </div>
            <ArrowUpRight size={22} style={{ color: '#FFFFFF' }} />
          </div>

          <div 
            onClick={() => { setActiveTab('courses'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="glass-panel-interactive" 
            style={{ padding: '32px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>Content & Masterclasses</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>AI, technology, websites and digital opportunities.</p>
            </div>
            <ArrowUpRight size={22} style={{ color: '#FFFFFF' }} />
          </div>

        </div>
      </section>


      {/* ====================================================================
          10. SOCIAL MEDIA
          ==================================================================== */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="badge-glow" style={{ marginBottom: '12px' }}>
            <Share2 size={14} style={{ color: '#FFFFFF' }} /> CONNECT WITH ME
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>
            Follow The <span className="text-gradient">Journey</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '540px', margin: '12px auto 0 auto', fontSize: '1rem' }}>
            I share what I'm building, learning and experimenting with.
          </p>
        </div>

        <div className="grid-responsive-3" style={{ gap: '24px', marginBottom: '40px' }}>
          {socialLinks.map((s, idx) => (
            <a
              key={idx}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="glass-panel-interactive"
              style={{
                padding: '24px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1.05rem', marginBottom: '4px' }}>
                  {s.name}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {s.handle}
                </div>
              </div>
              <ExternalLink size={18} style={{ color: '#FFFFFF' }} />
            </a>
          ))}
        </div>

        {/* Prominent Watch Intro Button */}
        <div style={{ textAlign: 'center' }}>
          <a
            href="https://youtube.com/shorts/kQaWu8FIlls?si=u0_Ya9oQsqtHwpPT&utm_source=chatgpt.com"
            target="_blank"
            rel="noreferrer"
            className="btn-accent"
            style={{ padding: '16px 36px', fontSize: '1.05rem', textDecoration: 'none' }}
          >
            <Play size={18} /> Watch My Intro Video
          </a>
        </div>
      </section>


      {/* ====================================================================
          11. CONTACT / FINAL CTA
          ==================================================================== */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 24px 40px 24px' }}>
        <div className="glow-card-white" style={{ padding: '56px 36px', borderRadius: '32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px' }}>
            Want to build something?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7', maxWidth: '640px', margin: '0 auto 32px auto' }}>
            "Whether you want to work together, explore an idea, build a website, talk about AI or simply follow what I'm creating — I'd love to hear from you."
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="btn-accent"
              style={{ padding: '14px 32px', fontSize: '1rem' }}
            >
              Work With Me <MessageSquare size={16} />
            </button>

            <button
              onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="btn-secondary"
              style={{ padding: '14px 32px', fontSize: '1rem' }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
