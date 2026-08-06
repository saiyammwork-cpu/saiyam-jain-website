import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Flame, Copy, Check, ExternalLink, Zap, RefreshCw } from 'lucide-react';

export default function SAMWidget({ setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [messages, setMessages] = useState([
    {
      sender: 'sam',
      text: "👋 Hey there! I'm SAM, Saiyam Jain's AI Assistant & Prompt Generator.\n\nAsk me to write any custom AI Prompt for Midjourney, ChatGPT, AI Video, or Coding!",
      options: ['🎨 Create Midjourney Prompt', '📝 Create ChatGPT Copy Prompt', '🎥 Create AI Video Prompt', '💼 View Saiyam\'s Services']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const promptAppUrl = "https://saiyam-prompts.base44.app";

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

  // Advanced Prompt Generation Engine trained for Midjourney, ChatGPT, AI Video, and Coding
  const generateAIPrompt = (userQuery) => {
    const lower = userQuery.toLowerCase();
    
    // Extract subject/topic if user provided one
    let subject = userQuery
      .replace(/generate|make|create|write|prompt|for|midjourney|chatgpt|sora|runway|a/gi, '')
      .trim();

    if (!subject || subject.length < 2) {
      subject = "futuristic brand product showcase";
    }

    if (lower.includes('midjourney') || lower.includes('image') || lower.includes('picture') || lower.includes('photo') || lower.includes('art') || lower.includes('design')) {
      return {
        type: '🎨 Midjourney v6 Photorealistic Prompt',
        prompt: `Cinematic 8k hyper-detailed studio photograph of ${subject}, premium luxury aesthetic, soft violet rim lighting and cyan ambient reflections, depth of field, 35mm lens, photorealistic, 4k render --ar 16:9 --v 6.0 --style raw`,
        tip: 'Paste this into Midjourney v6 or Discord. Adjust --ar 9:16 for Instagram Reels / Stories format!'
      };
    }

    if (lower.includes('video') || lower.includes('sora') || lower.includes('runway') || lower.includes('ad') || lower.includes('movie') || lower.includes('clip')) {
      return {
        type: '🎥 AI Video Prompt (Sora / Runway Gen-2)',
        prompt: `Dynamic 60fps drone camera orbit around ${subject}, dramatic violet volumetric fog, studio lighting, hyper-realistic physics, cinematic camera movement, smooth 4k pan, 1080p high bitrate`,
        tip: 'Best used in Runway Gen-2, Luma Dream Machine, or Sora for viral video ad creation!'
      };
    }

    if (lower.includes('chatgpt') || lower.includes('copy') || lower.includes('write') || lower.includes('text') || lower.includes('marketing') || lower.includes('sales')) {
      return {
        type: '📝 ChatGPT-4o High-Converting Copy Prompt',
        prompt: `Act as an elite conversion copywriter specializing in ${subject}. Write a 3-part viral marketing framework including: 1) A 3-second visual scroll-stopping hook, 2) Core value proposition with 3 bullet benefits, and 3) A compelling Call-To-Action urging users to comment "START".`,
        tip: 'Copy and paste into ChatGPT or Claude 3.5 for instant viral copywriting.'
      };
    }

    if (lower.includes('code') || lower.includes('dev') || lower.includes('react') || lower.includes('web') || lower.includes('app')) {
      return {
        type: '💻 Web & AI Developer Prompt',
        prompt: `Act as a senior full-stack architect. Write clean, production-ready React code for ${subject} using modern CSS glassmorphism, responsive flex/grid layouts, dark/light theme variables, and accessible keyboard navigation.`,
        tip: 'Copy into ChatGPT, Claude, or Antigravity AI assistant for clean code generation.'
      };
    }

    // Default versatile prompt generator
    return {
      type: '✨ Custom Tailored AI Prompt',
      prompt: `Cinematic 8k hyper-detailed visual representation of ${subject}, ultra-luxurious dark purple and light blue gradient ambient glow, depth of field, photorealistic, studio lighting --ar 16:9 --v 6.0`,
      tip: 'You can also explore 100+ pre-tested prompts in Saiyam\'s Prompts Vault at saiyam-prompts.base44.app!'
    };
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: query }];
    setMessages(newMessages);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = "";
      let generatedObj = null;
      let replyOptions = [];
      const lower = query.toLowerCase();

      const isPromptRequest = lower.includes('prompt') || lower.includes('make') || lower.includes('generate') || 
                              lower.includes('create') || lower.includes('midjourney') || lower.includes('chatgpt') || 
                              lower.includes('sora') || lower.includes('video') || lower.includes('image') || lower.includes('write');

      if (isPromptRequest && !lower.includes('service') && !lower.includes('client') && !lower.includes('contact')) {
        generatedObj = generateAIPrompt(query);
        replyText = `✨ **Here is your custom-engineered AI Prompt!**\n\nType of Prompt: ${generatedObj.type}`;
        replyOptions = ['🎨 Another Image Prompt', '📝 Copywriting Prompt', '🎥 Video Ad Prompt', '🔥 Prompts Vault App'];
      } else if (lower.includes('service') || lower.includes('offer') || lower.includes('build')) {
        replyText = "Saiyam Jain offers 6 core high-impact services:\n1. 💻 Website Building\n2. ⚡ Web Apps Development\n3. 🤖 AI Chatbots & Automations\n4. 📱 Android Apps\n5. 🎥 AI Generated Video ADs\n6. 🖼️ AI Generated Image ADs";
        replyOptions = ['🎨 Generate Midjourney Prompt', '🏢 View Client Work', '📬 Contact Saiyam'];
      } else if (lower.includes('client') || lower.includes('work') || lower.includes('cleanza')) {
        replyText = "Saiyam has built custom websites, apps, and AI systems for top brands including:\n• Cleanza\n• Jain Bhandar\n• Trilokesh Tours\n• White Hills\n• Balajee Sarees\n• Noarch";
        replyOptions = ['🎨 Create AI Prompt for Brand', '💼 View Services', '📬 Contact Saiyam'];
      } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('talk')) {
        replyText = "You can reach Saiyam directly via Instagram @saiyam.io or YouTube @saiyam_io, or fill out the Contact form on our site for priority project onboarding!";
        replyOptions = ['Go to Contact Page', 'Instagram Link'];
      } else {
        generatedObj = generateAIPrompt(query);
        replyText = `I have engineered a custom AI Prompt based on your message:\n\nType: ${generatedObj.type}`;
        replyOptions = ['🎨 Create Midjourney Prompt', '📝 Create Copy Prompt', '🔥 Prompts Vault App'];
      }

      setMessages((prev) => [
        ...prev, 
        { 
          sender: 'sam', 
          text: replyText, 
          promptObj: generatedObj,
          options: replyOptions 
        }
      ]);
      setIsTyping(false);
    }, 850);
  };

  const handleOptionClick = (opt) => {
    if (opt === '🔥 Prompts Vault App') {
      window.open(promptAppUrl, '_blank');
    } else if (opt === 'Go to Prompts Page') {
      setActiveTab('prompts');
      setIsOpen(false);
    } else if (opt === '💼 View Services' || opt === 'View Services & Portfolio') {
      setActiveTab('services');
      setIsOpen(false);
    } else if (opt === 'Go to Contact Page' || opt === '📬 Contact Saiyam') {
      setActiveTab('contact');
      setIsOpen(false);
    } else if (opt === 'Instagram Link') {
      window.open('https://instagram.com/saiyam.io', '_blank');
    } else if (opt === '🎨 Create Midjourney Prompt' || opt === '🎨 Another Image Prompt') {
      handleSendMessage("Generate a Midjourney prompt for a luxury futuristic product");
    } else if (opt === '📝 Create ChatGPT Copy Prompt' || opt === '📝 Copywriting Prompt') {
      handleSendMessage("Generate a ChatGPT prompt for viral SaaS landing page copy");
    } else if (opt === '🎥 Create AI Video Prompt' || opt === '🎥 Video Ad Prompt') {
      handleSendMessage("Generate an AI Video prompt for a 3D cinematic video ad");
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
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}>
            <Sparkles size={10} /> PROMPT AI
          </span>
        </button>
      )}

      {/* Chat Window Box */}
      {isOpen && (
        <div style={{
          width: '380px',
          maxWidth: 'calc(100vw - 32px)',
          height: '560px',
          maxHeight: 'calc(100vh - 90px)',
          background: 'rgba(11, 15, 26, 0.96)',
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
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(56, 189, 248, 0.2))',
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
                  SAM AI Prompt Generator <Sparkles size={14} style={{ color: '#38BDF8' }} />
                </div>
                <div style={{ color: '#10B981', fontSize: '0.72rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', backgroundColor: '#10B981', borderRadius: '50%', display: 'inline-block' }} />
                  Online • Midjourney, ChatGPT & Sora AI
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

          {/* Messages Stream */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '90%',
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

                  {/* Render Custom Engineered Prompt Card inside Chat */}
                  {msg.promptObj && (
                    <div style={{
                      marginTop: '12px',
                      background: 'rgba(5, 7, 14, 0.85)',
                      border: '1px solid rgba(168, 85, 247, 0.4)',
                      borderRadius: '12px',
                      padding: '12px',
                      fontFamily: 'monospace',
                      fontSize: '0.82rem'
                    }}>
                      <div style={{ color: '#C084FC', fontWeight: 600, wordBreak: 'break-word', lineHeight: '1.5', marginBottom: '10px' }}>
                        {msg.promptObj.prompt}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px' }}>
                        <span style={{ fontSize: '0.7rem', color: '#64748B' }}>
                          💡 {msg.promptObj.tip}
                        </span>

                        <button
                          onClick={() => handleCopyPrompt(idx, msg.promptObj.prompt)}
                          style={{
                            background: copiedIdx === idx ? '#10B981' : 'linear-gradient(135deg, #8B5CF6, #38BDF8)',
                            border: 'none',
                            color: '#FFF',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            flexShrink: 0
                          }}
                        >
                          {copiedIdx === idx ? <Check size={12} /> : <Copy size={12} />}
                          {copiedIdx === idx ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  )}

                </div>

                {/* Suggestion Chips */}
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
                <span style={{ color: '#38BDF8', fontSize: '0.8rem', fontWeight: 600 }}>SAM is engineering your AI prompt...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(7, 9, 19, 0.8)' }}>
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Ask SAM to write a prompt for..."
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
