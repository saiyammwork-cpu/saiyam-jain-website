import { Sparkles, Code2, ArrowUpRight, Heart, Bot } from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from './Icons';

export default function Footer({ setActiveTab }) {
  return (
    <footer style={{
      background: '#FFFFFF',
      borderTop: '1px solid rgba(0, 0, 0, 0.08)',
      paddingTop: '60px',
      paddingBottom: '40px',
      marginTop: '80px'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px', marginBottom: '50px' }}>
          
          {/* Col 1: Bio */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ transform: 'rotate(-35deg)' }}>
                <rect x="3" y="5" width="8" height="14" rx="3" fill="#09090B" />
                <rect x="13" y="5" width="8" height="14" rx="3" fill="#09090B" opacity="0.6" />
              </svg>
              <span style={{ fontWeight: 800, fontSize: '1rem', color: '#09090B', letterSpacing: '-0.02em' }}>
                NeuralKinetics
              </span>
            </div>

            <p style={{ color: '#71717A', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px' }}>
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
                  background: '#F4F4F6',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
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
                  background: '#F4F4F6',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
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
            <h4 style={{ color: '#09090B', fontSize: '1.05rem', fontWeight: 700, marginBottom: '20px' }}>Core Services & Pricing</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', color: '#71717A', fontSize: '0.9rem' }}>
              <li onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ cursor: 'pointer', fontWeight: 700, color: '#09090B' }}>👤 About Saiyam Jain</li>
              <li>💻 Websites (Basic, Standard, Premium)</li>
              <li>🛍️ E-Commerce Online Stores</li>
              <li>🎥 AI Generated Video ADs</li>
              <li>🖼️ AI Generated Image ADs</li>
              <li>🤖 AI Chatbot Integration</li>
            </ul>
          </div>

          {/* Col 3: Prompts & AI Agent */}
          <div>
            <h4 style={{ color: '#09090B', fontSize: '1.05rem', fontWeight: 700, marginBottom: '20px' }}>Exclusive Resources</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a 
                href="https://saiyam-prompts.base44.app" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  padding: '12px 16px',
                  borderRadius: '14px',
                  background: '#F4F4F6',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  color: '#09090B',
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
                  borderRadius: '14px',
                  background: '#09090B',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Bot size={16} style={{ color: '#38BDF8' }} /> Talk to SAM AI Agent
                </div>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          {/* Col 4: Trusted Brands */}
          <div>
            <h4 style={{ color: '#09090B', fontSize: '1.05rem', fontWeight: 700, marginBottom: '20px' }}>Trusted By Brands</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Cleanza', 'Jain Bhandar', 'Trilokesh Tours', 'White Hills', 'Balajee Sarees', 'Noarch'].map((brand, i) => (
                <span key={i} style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  background: '#F4F4F6',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  fontSize: '0.8rem',
                  color: '#09090B',
                  fontWeight: 500
                }}>
                  {brand}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '0.85rem',
          color: '#71717A'
        }}>
          <div>
            © {new Date().getFullYear()} Saiyam Jain. All rights reserved. Minimal Bionic & AI Theme.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>Powered by AI & Code</span>
            
            {/* Subtle Admin Login Button */}
            <button
              onClick={() => { setActiveTab('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(113, 113, 122, 0.5)',
                fontSize: '0.72rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              admin login
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
