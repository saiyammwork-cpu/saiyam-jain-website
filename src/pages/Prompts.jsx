import React, { useState } from 'react';
import { Sparkles, ExternalLink, Flame, Check, Copy, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function Prompts() {
  const [copied, setCopied] = useState(false);
  const promptAppUrl = "https://saiyam-prompts.base44.app";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(promptAppUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Main Hero Card (White & Black Glow Aesthetics) */}
        <div className="glow-card-white" style={{
          padding: '56px 36px',
          borderRadius: '32px',
          textAlign: 'center'
        }}>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#FFFFFF',
            color: '#070913',
            fontWeight: 900,
            padding: '8px 20px',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            letterSpacing: '0.05em',
            marginBottom: '20px',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
          }}>
            <Flame size={18} /> INSTAGRAM BIO PROMPTS VAULT
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '20px', lineHeight: '1.15' }}>
            Saiyam's Official <br />
            <span className="text-gradient">AI Prompts Vault</span>
          </h1>

          <p style={{ color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto 36px auto', fontSize: '1.1rem', lineHeight: '1.7' }}>
            Welcome! If you visited from Saiyam's Instagram (<strong style={{ color: '#FFFFFF' }}>@saiyam.io</strong>), you can access all curated AI Prompts (Midjourney, ChatGPT, Stable Diffusion, and AI Video) directly in our web app.
          </p>

          {/* MAIN REDIRECT BUTTON */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <a
              href={promptAppUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-accent"
              style={{
                fontSize: '1.15rem',
                padding: '18px 40px',
                borderRadius: '18px',
                width: '100%',
                maxWidth: '480px',
                boxShadow: '0 0 35px rgba(255, 255, 255, 0.35)'
              }}
            >
              🚀 Open Prompts Vault (saiyam-prompts.base44.app) <ExternalLink size={22} />
            </a>

            <button
              onClick={handleCopyLink}
              className="btn-secondary"
              style={{ padding: '12px 24px', fontSize: '0.9rem' }}
            >
              {copied ? <Check size={18} style={{ color: '#FFFFFF' }} /> : <Copy size={18} />}
              {copied ? 'Link Copied to Clipboard!' : 'Copy Direct App Link'}
            </button>
          </div>

        </div>

        {/* Feature Cards Grid */}
        <div className="grid-responsive-3" style={{ marginTop: '48px' }}>
          
          <div className="glass-panel-interactive" style={{ padding: '28px' }}>
            <div style={{ color: '#FFFFFF', marginBottom: '12px' }}><Zap size={28} /></div>
            <h3 style={{ color: '#FFFFFF', fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>Viral Prompts</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Direct access to all tested prompts featured on Saiyam's Instagram Reels and YouTube Shorts.
            </p>
          </div>

          <div className="glass-panel-interactive" style={{ padding: '28px' }}>
            <div style={{ color: '#FFFFFF', marginBottom: '12px' }}><Sparkles size={28} /></div>
            <h3 style={{ color: '#FFFFFF', fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>Multi-Model Support</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Optimized for Midjourney v6, ChatGPT-4o, Claude 3.5, Sora, Runway Gen-2, and Stable Diffusion.
            </p>
          </div>

          <div className="glass-panel-interactive" style={{ padding: '28px' }}>
            <div style={{ color: '#FFFFFF', marginBottom: '12px' }}><ShieldCheck size={28} /></div>
            <h3 style={{ color: '#FFFFFF', fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>Always Updated</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Regularly updated with new prompt templates for copywriting, video creation, and photorealistic design.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
