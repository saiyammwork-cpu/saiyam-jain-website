import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Sparkles, Send, RefreshCw, Zap, ExternalLink, CheckCircle, Flame, ArrowRight, User
} from 'lucide-react';

export default function SAMHub({ setActiveTab }) {
  const [messages, setMessages] = useState([
    {
      sender: 'sam',
      text: "⚡ Hello! I am SAM, Saiyam Jain's Autonomous AI Agent. I can help you explore Saiyam's services, past client work, or access the Prompts Vault. How can I assist your business today?",
      time: 'Just now'
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const presets = [
    '💻 What web development services do you offer?',
    '🤖 Tell me about AI Chatbot integration',
    '🏢 List past client projects (Cleanza, Jain Bhandar, etc.)',
    '🎥 How are AI Video ADs produced?',
    '📱 What is the process for Android App Dev?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { sender: 'user', text, time: timeNow }]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "";
      const lower = text.toLowerCase();

      if (lower.includes('service') || lower.includes('what do you do') || lower.includes('web')) {
        reply = "🛠️ **Saiyam's 6 Core Services**:\n\n1. **Building Websites**: Modern responsive websites built for speed and conversion.\n2. **Building Web Apps**: Full-stack web applications, client portals & SaaS.\n3. **Building AI Chatbots**: Custom-trained AI agents for 24/7 lead capture.\n4. **Android Apps**: Native & cross-platform Android mobile applications.\n5. **AI Generated Video ADs**: High-CTR viral video ad campaigns for Instagram & YouTube.\n6. **AI Generated Image ADs**: Photorealistic AI product renders and ad creatives.";
      } else if (lower.includes('prompt') || lower.includes('vault') || lower.includes('instagram')) {
        reply = "🚀 **Official Prompts Vault**:\n\nYou can access Saiyam's full curated AI Prompts collection directly at saiyam-prompts.base44.app!";
      } else if (lower.includes('client') || lower.includes('cleanza') || lower.includes('jain') || lower.includes('work')) {
        reply = "🏆 **Featured Client Projects**:\n\n• **Cleanza** - Corporate Web Portal & Automated AI Lead Capture\n• **Jain Bhandar** - Enterprise Web Catalog & Inventory System\n• **Trilokesh Tours** - Travel Package & Booking Web App\n• **White Hills** - Luxury Real Estate Property Showcase\n• **Balajee Sarees** - Fashion E-Commerce & AI Image Ads\n• **Noarch** - Architecture & Design Studio Portfolio";
      } else if (lower.includes('video') || lower.includes('ad')) {
        reply = "🎥 **AI Video AD Creation Process**:\n\n1. Hook & Script Conceptualization\n2. AI Visual Generation (Runway Gen-2 / Sora / Midjourney)\n3. Realistic AI Voiceover & Motion FX Sync\n4. High-CTR Social Media Editing for Instagram Reels & Shorts!";
      } else if (lower.includes('android') || lower.includes('app')) {
        reply = "📱 **Android App Engineering**:\n\nWe construct native and cross-platform Android mobile applications using modern UI/UX principles, fast offline caching, push notifications, and Play Store publishing setup.";
      } else {
        reply = "I'm trained on Saiyam Jain's complete suite of digital services. Would you like to check out his website packages, access the Prompts Vault, or connect directly via Instagram @saiyam.io?";
      }

      setMessages(prev => [...prev, { sender: 'sam', text: reply, time: timeNow }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div style={{ paddingTop: '110px', paddingBottom: '90px' }}>
      
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Hub Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div className="badge-glow" style={{ marginBottom: '14px' }}>
            <Bot size={16} style={{ color: '#38BDF8' }} /> AUTONOMOUS AI WORKSPACE
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 800 }}>
            SAM <span className="text-gradient">AI Assistant Hub</span>
          </h1>
          <p style={{ color: '#94A3B8', maxWidth: '580px', margin: '12px auto 0 auto', fontSize: '1rem' }}>
            Ask SAM anything about Saiyam Jain's services, portfolio, or prompt access.
          </p>
        </div>

        {/* Chat Console */}
        <div className="glass-panel" style={{
          borderRadius: '28px',
          border: '1px solid rgba(168, 85, 247, 0.35)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '620px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(139, 92, 246, 0.2)'
        }}>

          {/* Console Header */}
          <div style={{
            padding: '18px 24px',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(56, 189, 248, 0.15))',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
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
                <div style={{ color: '#FFF', fontWeight: 800, fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  SAM (Saiyam Automations Agent) <Sparkles size={16} style={{ color: '#38BDF8' }} />
                </div>
                <div style={{ color: '#10B981', fontSize: '0.78rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', backgroundColor: '#10B981', borderRadius: '50%', display: 'inline-block' }} />
                  Active Workspace • Official Assistant
                </div>
              </div>
            </div>

            <button
              onClick={() => setMessages([{ sender: 'sam', text: "Workspace reset. What would you like to explore next?", time: 'Just now' }])}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#94A3B8',
                borderRadius: '10px',
                padding: '8px 14px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <RefreshCw size={14} /> Clear Chat
            </button>
          </div>

          {/* Message Stream */}
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {messages.map((m, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>
                    {m.sender === 'user' ? 'You' : 'SAM AI Agent'} • {m.time}
                  </span>
                </div>

                <div style={{
                  maxWidth: '80%',
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
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#F1F5F9',
                    borderRadius: '20px 20px 20px 4px'
                  })
                }}>
                  {m.text}
                </div>

              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', gap: '8px', padding: '12px 18px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '14px', width: 'fit-content' }}>
                <span style={{ color: '#38BDF8', fontSize: '0.85rem', fontWeight: 600 }}>SAM is thinking and typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Presets Bar */}
          <div style={{ padding: '12px 24px', background: 'rgba(7, 9, 19, 0.7)', borderTop: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', gap: '8px', overflowX: 'auto' }}>
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
          <div style={{ padding: '16px 24px', background: 'rgba(7, 9, 19, 0.9)', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={{ display: 'flex', gap: '12px' }}>
              <input
                type="text"
                placeholder="Ask SAM about services or prompts..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '14px',
                  padding: '14px 20px',
                  color: '#FFF',
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
