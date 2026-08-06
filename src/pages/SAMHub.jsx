import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Sparkles, Send, RefreshCw, Zap, ExternalLink, CheckCircle, Flame, ArrowRight, Copy, Check, Code, Image, Video, FileText
} from 'lucide-react';

export default function SAMHub({ setActiveTab }) {
  const [messages, setMessages] = useState([
    {
      sender: 'sam',
      text: "⚡ Welcome to SAM AI Prompt Architect Studio!\n\nTell me what you want to create (e.g., 'Midjourney prompt for a luxury watch', 'ChatGPT prompt for SaaS sales email', 'AI Video ad prompt for street fashion'), and I will write a custom-engineered prompt for you!",
      time: 'Just now'
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);
  
  // Custom Prompt Builder Studio State
  const [promptCategory, setPromptCategory] = useState('Midjourney');
  const [promptTopic, setPromptTopic] = useState('');
  const messagesEndRef = useRef(null);

  const promptAppUrl = "https://saiyam-prompts.base44.app";

  const presets = [
    '🎨 Midjourney prompt for a cyberpunk neon city',
    '📝 ChatGPT prompt for viral Instagram Reel script',
    '🎥 AI Video prompt for high-speed luxury car ad',
    '💻 React component prompt for modern glass dashboard',
    '🏢 Show client work (Cleanza, Jain Bhandar, etc.)'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleCopyPrompt = (idx, text) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2500);
  };

  const generatePromptEngine = (topic, category) => {
    const cleanTopic = topic || "futuristic luxury brand product";
    
    if (category === 'Midjourney' || category.toLowerCase().includes('image') || category.toLowerCase().includes('midjourney')) {
      return {
        category: '🎨 Midjourney v6 Photorealistic Studio',
        prompt: `Cinematic 8k hyper-detailed studio photograph of ${cleanTopic}, luxury aesthetic, soft violet rim lighting and cyan ambient reflections, depth of field, shot on 35mm lens, photorealistic, 4k render --ar 16:9 --v 6.0 --style raw`,
        tip: 'Best for Midjourney v6 / DALL-E 3. Change --ar to 9:16 for portrait format.'
      };
    }

    if (category === 'AI Video' || category.toLowerCase().includes('video') || category.toLowerCase().includes('sora')) {
      return {
        category: '🎥 AI Video Prompt (Sora / Runway Gen-2)',
        prompt: `Dynamic 60fps drone camera fly-through shot featuring ${cleanTopic}, dramatic violet volumetric fog, studio lighting, hyper-realistic physics, cinematic camera movement, smooth 4k pan`,
        tip: 'Best for Runway Gen-2, Sora, or Luma Dream Machine for video ads.'
      };
    }

    if (category === 'ChatGPT' || category.toLowerCase().includes('copy') || category.toLowerCase().includes('chatgpt')) {
      return {
        category: '📝 ChatGPT-4o / Claude 3.5 Viral Copywriting',
        prompt: `Act as an elite conversion copywriter specializing in ${cleanTopic}. Write a high-converting 3-part marketing framework: 1) A 3-second visual scroll-stopping hook, 2) Core value proposition with 3 bullet benefits, and 3) A compelling Call-To-Action urging users to comment "START".`,
        tip: 'Paste directly into ChatGPT-4o or Claude 3.5 for instant copy.'
      };
    }

    return {
      category: '💻 Web & AI Code Architecture',
      prompt: `Act as a senior full-stack developer. Write clean, production-ready React component code for ${cleanTopic} using modern CSS glassmorphism, responsive flex/grid layouts, dark/light theme variables, and clean accessibility attributes.`,
      tip: 'Paste into ChatGPT, Claude, or Antigravity AI assistant for clean code.'
    };
  };

  const handleSend = (textToSend) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { sender: 'user', text, time: timeNow }]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = "";
      let promptObj = null;
      const lower = text.toLowerCase();

      const isPromptReq = lower.includes('prompt') || lower.includes('make') || lower.includes('generate') || 
                          lower.includes('write') || lower.includes('create') || lower.includes('midjourney') || 
                          lower.includes('chatgpt') || lower.includes('video') || lower.includes('image');

      if (isPromptReq && !lower.includes('service') && !lower.includes('cleanza') && !lower.includes('contact')) {
        let cat = 'Midjourney';
        if (lower.includes('video') || lower.includes('sora') || lower.includes('runway')) cat = 'AI Video';
        else if (lower.includes('chatgpt') || lower.includes('copy') || lower.includes('text')) cat = 'ChatGPT';
        else if (lower.includes('code') || lower.includes('react') || lower.includes('dev')) cat = 'Coding';

        const subject = text.replace(/generate|make|create|write|prompt|for|midjourney|chatgpt|sora|runway|a/gi, '').trim();
        promptObj = generatePromptEngine(subject, cat);
        replyText = `✨ **Custom AI Prompt Engineered!**\n\nCategory: ${promptObj.category}`;
      } else if (lower.includes('client') || lower.includes('cleanza') || lower.includes('work')) {
        replyText = "🏆 **Featured Client Projects**:\n\n1. **Cleanza** - Hygiene portal + AI Customer Support\n2. **Jain Bhandar** - Enterprise Web Catalog & Inventory\n3. **Trilokesh Tours** - Travel Package & Booking Web App\n4. **White Hills** - Luxury Real Estate Showcase\n5. **Balajee Sarees** - Fashion E-Commerce + AI Image Ads\n6. **Noarch** - Architecture & Design Studio Portfolio";
      } else {
        const subject = text.replace(/generate|make|create|write|prompt|for|midjourney|chatgpt|sora|runway|a/gi, '').trim();
        promptObj = generatePromptEngine(subject, 'Midjourney');
        replyText = `I have engineered a custom AI prompt for your request:\n\nCategory: ${promptObj.category}`;
      }

      setMessages(prev => [...prev, { sender: 'sam', text: replyText, promptObj, time: timeNow }]);
      setIsTyping(false);
    }, 900);
  };

  const handleStudioSubmit = (e) => {
    e.preventDefault();
    if (!promptTopic.trim()) return;
    const promptText = `Generate a ${promptCategory} prompt for ${promptTopic}`;
    handleSend(promptText);
    setPromptTopic('');
  };

  return (
    <div style={{ paddingTop: '110px', paddingBottom: '90px' }}>
      
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Hub Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div className="badge-glow" style={{ marginBottom: '14px' }}>
            <Bot size={16} style={{ color: '#38BDF8' }} /> AUTONOMOUS AI PROMPT ARCHITECT
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 800 }}>
            SAM <span className="text-gradient">AI Prompt Studio</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '12px auto 0 auto', fontSize: '1rem' }}>
            Ask SAM to engineer custom AI Prompts for Midjourney, ChatGPT, AI Video Ads, or Web Development.
          </p>
        </div>

        {/* Quick Prompt Builder Studio Bar */}
        <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px', border: '1px solid rgba(168, 85, 247, 0.35)' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={18} style={{ color: '#38BDF8' }} /> Instant Prompt Builder Tool:
          </div>

          <form onSubmit={handleStudioSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', alignItems: 'center' }}>
            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                AI Platform / Model
              </label>
              <select
                value={promptCategory}
                onChange={(e) => setPromptCategory(e.target.value)}
                className="glass-input"
                style={{ width: '100%', background: 'var(--bg-main)' }}
              >
                <option value="Midjourney">🎨 Midjourney v6 Image</option>
                <option value="ChatGPT">📝 ChatGPT Copywriting</option>
                <option value="AI Video">🎥 AI Video (Sora / Runway)</option>
                <option value="Coding">💻 Coding & Web Dev</option>
              </select>
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Enter Topic or Subject
              </label>
              <input
                type="text"
                placeholder="e.g. Luxury sports watch in neon studio, SaaS sales email..."
                value={promptTopic}
                onChange={(e) => setPromptTopic(e.target.value)}
                className="glass-input"
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%' }}>
              <button
                type="submit"
                className="btn-accent"
                style={{ width: '100%', padding: '12px 18px', fontSize: '0.9rem', borderRadius: '12px', marginTop: 'auto' }}
              >
                ✨ Generate Prompt <Sparkles size={16} />
              </button>
            </div>
          </form>
        </div>

        {/* Chat Console */}
        <div className="glass-panel" style={{
          borderRadius: '28px',
          border: '1px solid rgba(168, 85, 247, 0.35)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '600px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(139, 92, 246, 0.2)'
        }}>

          {/* Console Header */}
          <div style={{
            padding: '18px 24px',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(56, 189, 248, 0.15))',
            borderBottom: '1px solid var(--glass-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #8B5CF6, #38BDF8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF'
              }}>
                <Bot size={24} />
              </div>
              <div>
                <div style={{ color: 'var(--heading-color)', fontWeight: 800, fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  SAM (Prompt Architect Agent) <Sparkles size={16} style={{ color: '#38BDF8' }} />
                </div>
                <div style={{ color: '#10B981', fontSize: '0.78rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', backgroundColor: '#10B981', borderRadius: '50%', display: 'inline-block' }} />
                  Active Workspace • Midjourney, ChatGPT & Sora AI
                </div>
              </div>
            </div>

            <a
              href={promptAppUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.8rem' }}
            >
              Prompts Vault App <ExternalLink size={14} />
            </a>
          </div>

          {/* Message Stream */}
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {messages.map((m, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {m.sender === 'user' ? 'You' : 'SAM AI Agent'} • {m.time}
                  </span>
                </div>

                <div style={{
                  maxWidth: '85%',
                  padding: '16px 20px',
                  whiteSpace: 'pre-line',
                  fontSize: '0.94rem',
                  lineHeight: '1.6',
                  ...(m.sender === 'user' ? {
                    background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
                    color: '#FFF',
                    borderRadius: '20px 20px 4px 20px',
                    boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)'
                  } : {
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-main)',
                    borderRadius: '20px 20px 20px 4px'
                  })
                }}>
                  {m.text}

                  {/* Engineered Prompt Block Card */}
                  {m.promptObj && (
                    <div style={{
                      marginTop: '14px',
                      background: 'rgba(5, 7, 14, 0.9)',
                      border: '1px solid rgba(168, 85, 247, 0.45)',
                      borderRadius: '14px',
                      padding: '16px',
                      fontFamily: 'monospace',
                      fontSize: '0.88rem'
                    }}>
                      <div style={{ color: '#C084FC', fontWeight: 600, wordBreak: 'break-word', lineHeight: '1.5', marginBottom: '12px' }}>
                        {m.promptObj.prompt}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px' }}>
                        <span style={{ fontSize: '0.76rem', color: '#94A3B8' }}>
                          💡 {m.promptObj.tip}
                        </span>

                        <button
                          onClick={() => handleCopyPrompt(idx, m.promptObj.prompt)}
                          style={{
                            background: copiedIdx === idx ? '#10B981' : 'linear-gradient(135deg, #8B5CF6, #38BDF8)',
                            border: 'none',
                            color: '#FFF',
                            padding: '6px 14px',
                            borderRadius: '8px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          {copiedIdx === idx ? <Check size={14} /> : <Copy size={14} />}
                          {copiedIdx === idx ? 'Copied!' : 'Copy Prompt'}
                        </button>
                      </div>
                    </div>
                  )}

                </div>

              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', gap: '8px', padding: '12px 18px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '14px', width: 'fit-content' }}>
                <span style={{ color: '#38BDF8', fontSize: '0.85rem', fontWeight: 600 }}>SAM is engineering your AI prompt...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Presets Bar */}
          <div style={{ padding: '12px 24px', background: 'var(--nav-bg)', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '8px', overflowX: 'auto' }}>
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                style={{
                  background: 'rgba(139, 92, 246, 0.12)',
                  border: '1px solid rgba(168, 85, 247, 0.25)',
                  color: '#C084FC',
                  borderRadius: '20px',
                  padding: '6px 14px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div style={{ padding: '16px 24px', background: 'var(--nav-bg)', borderTop: '1px solid var(--glass-border)' }}>
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={{ display: 'flex', gap: '12px' }}>
              <input
                type="text"
                placeholder="Ask SAM to write a prompt for..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                style={{
                  flex: 1,
                  background: 'var(--input-bg)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '14px',
                  padding: '14px 20px',
                  color: 'var(--text-main)',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                className="btn-primary"
                style={{ borderRadius: '14px', padding: '0 24px' }}
              >
                Send <Send size={18} />
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
