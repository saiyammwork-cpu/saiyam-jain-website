import { Sparkles, Code2, ArrowUpRight, Heart, Bot } from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from './Icons';

export default function Footer({ setActiveTab }) {
  return (
    <footer style={{
      background: 'rgba(5, 7, 14, 0.95)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      paddingTop: '60px',
      paddingBottom: '40px',
      marginTop: '80px'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '50px' }}>
          
          {/* Col 1: Bio */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <img 
                src="/logo.png" 
                alt="saiyam.io Logo" 
                style={{ 
                  height: '36px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'invert(1)',
                  mixBlendMode: 'screen'
                }} 
              />
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px' }}>
              Content Creator, Web Developer & AI Automations Specialist crafting high-converting websites, AI chatbots, mobile apps, and viral AI Ads.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a 
                href="https://instagram.com/saiyam.io" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#E1306C',
                  transition: 'all 0.3s ease'
                }}
              >
                <InstagramIcon size={20} />
              </a>
              <a 
                href="https://youtube.com/@saiyam_io" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FF0000',
                  transition: 'all 0.3s ease'
                }}
              >
                <YoutubeIcon size={20} />
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 style={{ color: '#FFF', fontSize: '1.05rem', fontWeight: 700, marginBottom: '20px' }}>Our Core Offerings</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', color: '#94A3B8', fontSize: '0.9rem' }}>
              <li>💻 Custom Website Development</li>
              <li>⚡ Full-Stack Web Applications</li>
              <li>🤖 AI Chatbots & Automations</li>
              <li>📱 Android Mobile Apps</li>
              <li>🎥 AI Generated Video ADs</li>
              <li>🖼️ AI Generated Image ADs</li>
            </ul>
          </div>

          {/* Col 3: Prompts & AI Agent */}
          <div>
            <h4 style={{ color: '#FFF', fontSize: '1.05rem', fontWeight: 700, marginBottom: '20px' }}>Exclusive Resources</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a 
                href="https://saiyam-prompts.base44.app" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(56, 189, 248, 0.15))',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  color: '#FFF',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>🔥 Instagram Bio Prompts Vault</span>
                <ArrowUpRight size={16} />
              </a>

              <button
                onClick={() => { setActiveTab('sam'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#38BDF8',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Bot size={16} /> Talk to SAM AI Agent
                </div>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          {/* Col 4: Trusted Brands */}
          <div>
            <h4 style={{ color: '#FFF', fontSize: '1.05rem', fontWeight: 700, marginBottom: '20px' }}>Trusted By Brands</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Cleanza', 'Jain Bhandar', 'Trilokesh Tours', 'White Hills', 'Balajee Sarees', 'Noarch'].map((brand, i) => (
                <span key={i} style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '0.8rem',
                  color: '#CBD5E1'
                }}>
                  {brand}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '0.85rem',
          color: '#64748B'
        }}>
          <div>
            © {new Date().getFullYear()} Saiyam Jain. All rights reserved. Built with Purple-Blue Gradient Aesthetics.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            Powered by AI & Code <Heart size={14} style={{ color: '#EC4899', fill: '#EC4899' }} />
          </div>
        </div>

      </div>
    </footer>
  );
}
