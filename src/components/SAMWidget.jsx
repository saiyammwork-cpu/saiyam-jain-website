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
      {/* Floating Trigger Icon (Monochrome Black & White) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 999,
            background: 'var(--text-main)',
            color: 'var(--bg-main)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '50%',
            width: '56px',
            height: '56px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-lg)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          title="Chat with SAM AI Agent"
        >
          <Bot size={26} />
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
          background: 'var(--bg-surface)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '24px',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--bg-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'var(--text-main)',
                color: 'var(--bg-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bot size={18} />
              </div>
              <div>
                <div style={{ color: 'var(--text-main)', fontWeight: 800, fontSize: '0.95rem' }}>SAM AI Agent</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} /> Online & Trained
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => { setIsOpen(false); setActiveTab('sam'); }}
                style={{ background: 'var(--glass-pill)', border: 'none', color: 'var(--text-main)', padding: '6px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Full View <ExternalLink size={12} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--bg-main)' }}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: m.sender === 'user' ? 'var(--text-main)' : 'var(--bg-surface)',
                  color: m.sender === 'user' ? 'var(--bg-main)' : 'var(--text-main)',
                  padding: '12px 16px',
                  borderRadius: '16px',
                  border: m.sender === 'user' ? 'none' : '1px solid var(--border-subtle)',
                  fontSize: '0.86rem',
                  lineHeight: '1.5',
                  boxShadow: 'var(--shadow-sm)',
                  whiteSpace: 'pre-line'
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Quick Chips */}
          <div style={{ padding: '8px 12px', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '6px', overflowX: 'auto' }}>
            <button onClick={() => setInput('Coupon code')} style={{ padding: '4px 10px', borderRadius: '12px', background: 'var(--glass-pill)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>🏷️ SAIYAM10</button>
            <button onClick={() => setInput('Website pricing')} style={{ padding: '4px 10px', borderRadius: '12px', background: 'var(--glass-pill)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>💰 Pricing</button>
            <button onClick={() => setInput('UPI Payment')} style={{ padding: '4px 10px', borderRadius: '12px', background: 'var(--glass-pill)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>💳 UPI QR</button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} style={{ padding: '12px', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Ask SAM AI anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 14px',
                background: 'var(--input-bg)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                color: 'var(--text-main)',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                background: 'var(--text-main)',
                color: 'var(--bg-main)',
                border: 'none',
                borderRadius: '12px',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
