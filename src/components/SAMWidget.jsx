import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, MessageSquare, Tag, CreditCard, GraduationCap, Lock, ExternalLink } from 'lucide-react';

export default function SAMWidget({ setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'sam',
      text: "👋 Hi! I am **SAM**, Saiyam Jain's AI Solution Engine! Ask me about AI prompts, website packages, 10% coupon code **SAIYAM10**, dynamic UPI QR codes, or courses!"
    }
  ]);
  const [input, setInput] = useState('');

  const generateQuickAnswer = (query) => {
    const q = query.toLowerCase();

    if (q.includes('coupon') || q.includes('discount') || q.includes('code') || q.includes('saiyam10')) {
      return `🏷️ **10% OFF Coupon Code**: Use **SAIYAM10** in your cart during checkout for an instant 10% discount on any website or AI ad package!`;
    }
    if (q.includes('price') || q.includes('cost') || q.includes('package') || q.includes('website')) {
      return `💰 **Website Plans**:
• Basic (₹4,999): 5 pages, 3-word free domain, SEO.
• Standard (₹8,999): 8 pages, 2-word domain, Free AI Chatbot, 1 Video Ad.
• Premium (₹11,999): 10 pages, Premium minimal design, 3 Video Ads.`;
    }
    if (q.includes('pay') || q.includes('qr') || q.includes('upi')) {
      return `💳 **UPI & Payments**: Official UPI ID is \`BHARATPE09910636684@yesbankltd\`. Our cart generates a dynamic QR code that pre-fills the exact payable amount in GPay/PhonePe!`;
    }
    if (q.includes('course') || q.includes('learn')) {
      return `🎓 **Courses**: Explore AI & Web Dev courses on our Courses page (\`/courses\`)! Managed live via the Admin Panel.`;
    }
    if (q.includes('admin') || q.includes('login')) {
      return `🔒 **Admin Portal**: Access via the tiny \`admin login\` link at the footer of \`/contact\`! Password: \`Sam93392s@\`.`;
    }
    if (q.includes('domain') || q.includes('claim')) {
      return `🌐 **Free Domain**: Claim a 3-word subdomain (e.g. \`trilok-tours.site.je\`) lifetime free with our Basic package!`;
    }

    return `⚡ **SAM Answer**: I can help you with Midjourney/ChatGPT prompts, website packages, coupon **SAIYAM10**, or technical build fixes! Visit the SAM AI Agent page for full voice/vision scanning.`;
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');

    setTimeout(() => {
      const reply = generateQuickAnswer(userText);
      setMessages(prev => [...prev, { sender: 'sam', text: reply }]);
    }, 400);
  };

  return (
    <>
      {/* Floating Trigger Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 999,
            background: 'linear-gradient(135deg, #8B5CF6, #38BDF8)',
            color: '#FFF',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            width: '56px',
            height: '56px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(139, 92, 246, 0.6), 0 0 20px rgba(56, 189, 248, 0.4)'
          }}
          title="Chat with SAM AI Agent"
        >
          <Bot size={28} />
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1000,
          width: '380px',
          maxWidth: 'calc(100vw - 32px)',
          height: '520px',
          background: 'rgba(11, 15, 26, 0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(168, 85, 247, 0.4)',
          borderRadius: '24px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '14px 18px',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(56, 189, 248, 0.2))',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bot size={20} style={{ color: '#38BDF8' }} />
              <div>
                <div style={{ color: '#FFF', fontWeight: 800, fontSize: '0.92rem' }}>SAM AI Solution Engine</div>
                <div style={{ color: '#10B981', fontSize: '0.7rem', fontWeight: 700 }}>● Online • Trained on All Updates</div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '4px' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages List */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '88%',
                  background: m.sender === 'user' ? 'linear-gradient(135deg, #8B5CF6, #6D28D9)' : 'rgba(255, 255, 255, 0.06)',
                  padding: '10px 14px',
                  borderRadius: m.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  color: '#FFF',
                  fontSize: '0.84rem',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-line'
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Quick Questions Chips */}
          <div style={{ padding: '8px 12px', display: 'flex', gap: '6px', overflowX: 'auto', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <button onClick={() => setInput("Coupon code?")} style={{ background: 'rgba(192, 132, 252, 0.15)', color: '#C084FC', border: '1px solid rgba(192, 132, 252, 0.3)', borderRadius: '8px', padding: '4px 8px', fontSize: '0.72rem', fontWeight: 700, whitespace: 'nowrap', cursor: 'pointer' }}>🏷️ Coupon Code?</button>
            <button onClick={() => setInput("Website prices?")} style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '8px', padding: '4px 8px', fontSize: '0.72rem', fontWeight: 700, whitespace: 'nowrap', cursor: 'pointer' }}>💰 Website Prices?</button>
            <button onClick={() => setInput("Free domain?")} style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', padding: '4px 8px', fontSize: '0.72rem', fontWeight: 700, whitespace: 'nowrap', cursor: 'pointer' }}>🌐 Free Domain?</button>
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} style={{ padding: '12px', background: 'rgba(7, 9, 19, 0.8)', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Ask SAM anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                padding: '8px 12px',
                background: 'var(--input-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: '10px',
                color: 'var(--text-main)',
                outline: 'none',
                fontSize: '0.84rem'
              }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '8px 14px', borderRadius: '10px', fontSize: '0.84rem' }}>
              <Send size={14} />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
