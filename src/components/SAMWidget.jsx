import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, MessageSquare, Zap, ExternalLink, ArrowRight, User } from 'lucide-react';

export default function SAMWidget({ setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'sam',
      text: "👋 Hey there! I'm SAM, Saiyam Jain's AI Assistant. How can I help you accelerate your business today?",
      options: ['What services do you offer?', 'View Client Work', 'Get AI Prompts Vault', 'Contact Saiyam']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text: query }];
    setMessages(newMessages);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // AI Response generation logic
    setTimeout(() => {
      let replyText = "";
      let replyOptions = [];
      const lower = query.toLowerCase();

      if (lower.includes('service') || lower.includes('what do you do') || lower.includes('offer')) {
        replyText = "Saiyam offers 6 core high-impact digital services:\n1. 💻 Website Building\n2. ⚡ Web Apps Development\n3. 🤖 AI Chatbots & Automations\n4. 📱 Android Apps\n5. 🎥 AI Generated Video ADs\n6. 🖼️ AI Generated Image ADs";
        replyOptions = ['See Client Work', 'Talk to Saiyam Direct', 'Get AI Prompts Vault'];
      } else if (lower.includes('prompt') || lower.includes('vault') || lower.includes('instagram')) {
        replyText = "Looking for AI Prompts from Saiyam's Instagram? You can access our official Prompts Vault directly at saiyam-prompts.base44.app!";
        replyOptions = ['Go to Prompts Page', 'Ask SAM Another Question'];
      } else if (lower.includes('client') || lower.includes('work') || lower.includes('portfolio') || lower.includes('past')) {
        replyText = "Saiyam has built custom digital products and AI solutions for top brands including:\n• Cleanza\n• Jain Bhandar\n• Trilokesh Tours\n• White Hills\n• Balajee Sarees\n• Noarch\n...and many more!";
        replyOptions = ['View Services & Portfolio', 'Contact Saiyam'];
      } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('talk') || lower.includes('book')) {
        replyText = "You can reach Saiyam directly via Instagram @saiyam.io or YouTube @saiyam_io. Or fill out our Contact form for priority project onboarding!";
        replyOptions = ['Go to Contact Page', 'Instagram Link'];
      } else {
        replyText = `Thanks for reaching out! Saiyam specializes in creating high-converting websites, web apps, AI chatbots, Android apps, and viral AI Ads. Would you like to check out his services or view the Prompts Vault?`;
        replyOptions = ['What services do you offer?', 'Get AI Prompts Vault', 'Contact Saiyam'];
      }

      setMessages((prev) => [...prev, { sender: 'sam', text: replyText, options: replyOptions }]);
      setIsTyping(false);
    }, 900);
  };

  const handleOptionClick = (opt) => {
    if (opt === 'Go to Prompts Page' || opt === 'Get AI Prompts Vault') {
      setActiveTab('prompts');
      setIsOpen(false);
    } else if (opt === 'Go to Services Page' || opt === 'What services do you offer?' || opt === 'View Services & Portfolio' || opt === 'See Client Work') {
      setActiveTab('services');
      setIsOpen(false);
    } else if (opt === 'Go to Contact Page' || opt === 'Contact Saiyam' || opt === 'Talk to Saiyam Direct') {
      setActiveTab('contact');
      setIsOpen(false);
    } else if (opt === 'Instagram Link') {
      window.open('https://instagram.com/saiyam.io', '_blank');
    } else {
      handleSendMessage(opt);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 999 }}>
      
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'relative',
            background: 'linear-gradient(135deg, #8B5CF6, #38BDF8)',
            color: '#FFF',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '30px',
            padding: '12px 20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 10px 30px rgba(139, 92, 246, 0.5), 0 0 20px rgba(56, 189, 248, 0.4)',
            transition: 'all 0.3s ease'
          }}
        >
          <div style={{ position: 'relative' }}>
            <Bot size={22} />
            <span style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '8px',
              height: '8px',
              backgroundColor: '#10B981',
              borderRadius: '50%',
              border: '2px solid #000'
            }} />
          </div>
          <span style={{ fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.02em' }}>Ask SAM</span>
          <span style={{
            fontSize: '0.65rem',
            background: 'rgba(255, 255, 255, 0.25)',
            padding: '2px 6px',
            borderRadius: '10px',
            fontWeight: 800
          }}>AI</span>
        </button>
      )}

      {/* Chat Window Box */}
      {isOpen && (
        <div style={{
          width: '360px',
          maxWidth: 'calc(100vw - 32px)',
          height: '520px',
          maxHeight: 'calc(100vh - 100px)',
          background: 'rgba(11, 15, 26, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(168, 85, 247, 0.35)',
          borderRadius: '24px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(139, 92, 246, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>

          {/* Header */}
          <div style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(56, 189, 248, 0.15))',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #8B5CF6, #38BDF8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF'
              }}>
                <Bot size={22} />
              </div>
              <div>
                <div style={{ color: '#FFF', fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  SAM AI Agent <Sparkles size={14} style={{ color: '#38BDF8' }} />
                </div>
                <div style={{ color: '#10B981', fontSize: '0.72rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', backgroundColor: '#10B981', borderRadius: '50%', display: 'inline-block' }} />
                  Online • Assistant for Saiyam Jain
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#94A3B8',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Container */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '85%',
                  padding: '12px 16px',
                  whiteSpace: 'pre-line',
                  fontSize: '0.88rem',
                  lineHeight: '1.5',
                  ...(msg.sender === 'user' ? {
                    background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
                    color: '#FFF',
                    borderRadius: '16px 16px 4px 16px',
                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                  } : {
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#E2E8F0',
                    borderRadius: '16px 16px 16px 4px'
                  })
                }}>
                  {msg.text}
                </div>

                {/* Option Suggestion Chips */}
                {msg.options && msg.options.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
                    {msg.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(opt)}
                        style={{
                          background: 'rgba(139, 92, 246, 0.15)',
                          border: '1px solid rgba(168, 85, 247, 0.3)',
                          color: '#C084FC',
                          borderRadius: '16px',
                          padding: '6px 12px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', gap: '6px', padding: '10px 14px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '12px', width: 'fit-content' }}>
                <span style={{ color: '#38BDF8', fontSize: '0.8rem', fontWeight: 600 }}>SAM is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(7, 9, 19, 0.8)' }}>
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Ask SAM anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  color: '#FFF',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #8B5CF6, #38BDF8)',
                  border: 'none',
                  borderRadius: '12px',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFF',
                  cursor: 'pointer'
                }}
              >
                <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
}
