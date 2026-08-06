import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Flame, Copy, Check, ExternalLink, Zap, RefreshCw, Terminal } from 'lucide-react';

export default function SAMWidget({ setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'sam',
      text: "🤖 **I'm SAM, Saiyam Jain's Master AI Architect**\n\nI can write expert prompts for **vibe coding** (Cursor, Bolt, v0, Base44), **Google AI Studio/AI Flow**, **Midjourney v6**, **Sora AI Video**, or solve technical errors & free AI modules!",
      options: ['⚡ Vibe Coding Prompt', '🧠 Google AI Flow Prompt', '🎨 Midjourney Image Prompt', '🎥 Sora Video Prompt', '🎁 Free AI Modules']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);
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

  // Master AI Prompt Architecture Engine
  const masterAIEngine = (userText) => {
    const lower = userText.toLowerCase();

    // 1. Vibe Coding Prompt Request (Cursor, Bolt, v0, Lovable, Replit, Base44, Antigravity)
    if (lower.includes('vibe coding') || lower.includes('cursor') || lower.includes('bolt') || lower.includes('v0') || lower.includes('lovable') || lower.includes('replit') || lower.includes('base44')) {
      const subject = userText.replace(/vibe coding|prompt|cursor|bolt|v0|lovable|replit|base44|make|generate|write|for|a/gi, '').trim() || "full-stack web app with glassmorphic UI";
      return {
        title: "⚡ Expert Vibe Coding Prompt (Cursor / Bolt.new / v0)",
        prompt: `Act as a principal software architect & UI designer. Build a complete, production-ready web application for "${subject}". Requirements:\n1. Architecture: React 18, Vite, clean component modularity, state hooks.\n2. Design System: Dark luxury theme (#070913), glassmorphic backdrop-filter panels, purple (#8B5CF6) & blue (#38BDF8) accents.\n3. Zero console warnings, responsive layout, full code output.`,
        tip: "Copy into Cursor AI, Bolt.new, v0.dev, or Replit Agent for instant code generation!"
      };
    }

    // 2. Google AI Studio & AI Flow Prompt Request
    if (lower.includes('google ai') || lower.includes('ai studio') || lower.includes('ai flow') || lower.includes('gemini prompt')) {
      const subject = userText.replace(/google ai|ai studio|ai flow|gemini|prompt|make|generate|write|for|a/gi, '').trim() || "autonomous reasoning pipeline";
      return {
        title: "🧠 Google AI Studio & AI Flow System Instruction Prompt",
        prompt: `System Instruction for Gemini 1.5 Pro / AI Flow:\nRole: Elite AI Data & Logic Architect.\nTask: Process user input regarding "${subject}" and generate structured JSON output following schema: { "status": "success", "analysis": "...", "actionable_steps": [...] }.\nConstraints: Temperature: 0.2. Output strictly valid JSON.`,
        tip: "Paste into System Instructions in Google AI Studio or use in Gemini 1.5 Pro AI Flow pipelines!"
      };
    }

    // 3. Image Generation Prompt (Midjourney, Flux.1, DALL-E 3, Ideogram)
    if (lower.includes('picture') || lower.includes('image') || lower.includes('photo') || lower.includes('midjourney') || lower.includes('flux') || lower.includes('ideogram') || lower.includes('art')) {
      const subject = userText.replace(/picture|image|photo|midjourney|flux|ideogram|art|prompt|make|generate|write|for|a/gi, '').trim() || "futuristic product design concept";
      return {
        title: "🎨 Photorealistic Image AI Prompt (Midjourney v6 / Flux.1)",
        prompt: `Cinematic 8k hyper-detailed studio photograph of ${subject}, luxury aesthetic, soft violet rim light, cyan reflections, depth of field, 35mm lens, photorealistic, 4k render --ar 16:9 --v 6.0 --style raw`,
        tip: "Works in Midjourney v6, Flux.1, and DALL-E 3. Change --ar 9:16 for Reels format."
      };
    }

    // 4. Video Generation Prompt (Sora, Runway Gen-3, Luma, Kling)
    if (lower.includes('video') || lower.includes('sora') || lower.includes('runway') || lower.includes('luma') || lower.includes('kling') || lower.includes('motion')) {
      const subject = userText.replace(/video|sora|runway|luma|kling|motion|prompt|make|generate|write|for|a/gi, '').trim() || "sleek product launch advertisement";
      return {
        title: "🎥 Cinematic Video AI Prompt (Sora / Runway Gen-3 / Luma)",
        prompt: `Dynamic 60fps drone camera orbit around ${subject}, cinematic purple & blue volumetric lighting, atmospheric fog, hyper-realistic physics, 4k resolution, smooth pan movement`,
        tip: "Paste into Runway Gen-3 Alpha, Sora, Luma Dream Machine, or Kling AI for video ads!"
      };
    }

    // 5. Free AI Image / Video Modules Inquiry
    if (lower.includes('free image') || lower.includes('free video') || lower.includes('free ai') || lower.includes('module')) {
      return {
        text: "🎁 **Top 100% Free AI Image & Video Modules**:\n\n**Free Image Modules**:\n• **Ideogram.ai**: 25 free daily credits (best text rendering & photorealism).\n• **Leonardo.ai**: 150 free daily tokens for Flux renders.\n• **Flux.1 Schnell on HuggingFace**: Unlimited free open-source image generation.\n\n**Free Video Modules**:\n• **Luma Dream Machine**: Free fast generations with realistic motion.\n• **Kling AI**: Free daily 1080p video credits.\n• **Pika.art**: Free lip-sync & 3D video creation."
      };
    }

    // 6. Base44 & GitHub Troubleshooting
    if (lower.includes('base44') || lower.includes('base 44') || (lower.includes('github') && (lower.includes('connect') || lower.includes('link') || lower.includes('app') || lower.includes('stuck') || lower.includes('error') || lower.includes('fail') || lower.includes('issue')))) {
      return {
        text: "🛠️ **Solution for Base44 & GitHub Connection Issue**:\n\n1. **Re-authorize OAuth**: Go to GitHub -> Settings -> Applications -> Authorized OAuth Apps, revoke Base44 access, then re-connect in Base44.\n2. **Manual Repo Link**: Create a new empty repository on GitHub manually first, then paste the HTTPS repository URL into Base44.\n3. **Direct Export Fix**: Download Code ZIP from Base44 -> Extract files -> Run `git init; git remote add origin <URL>; git push -u origin main` in terminal!"
      };
    }

    // Default Master AI prompt generator
    const cleanSubject = userText.replace(/generate|make|create|write|prompt|for|a/gi, '').trim() || "futuristic AI technology innovation";
    return {
      title: "✨ Master Engineered AI Prompt",
      prompt: `Act as a world-class AI Specialist. Create a high-converting visual and textual architecture for "${cleanSubject}". Specs: 8k hyper-detailed rendering, studio lighting, depth of field, photorealistic aesthetics, clean structural design system.`,
      tip: "You can also explore 100+ pre-tested prompts in Saiyam's Prompts Vault at saiyam-prompts.base44.app!"
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
      const result = masterAIEngine(query);
      let replyText = "";
      let promptObj = null;

      if (result.prompt) {
        replyText = `✨ **${result.title}**`;
        promptObj = result;
      } else {
        replyText = result.text || `I understand! As Saiyam's Master AI Architect, I can write prompts for Vibe Coding, Google AI Studio/AI Flow, Midjourney, Sora, or troubleshoot free AI modules. What would you like to build?`;
      }

      setMessages((prev) => [
        ...prev, 
        { 
          sender: 'sam', 
          text: replyText, 
          promptObj: promptObj,
          options: ['⚡ Vibe Coding Prompt', '🧠 Google AI Flow Prompt', '🎨 Midjourney Prompt', '🎥 Sora Video Prompt'] 
        }
      ]);
      setIsTyping(false);
    }, 800);
  };

  const handleOptionClick = (opt) => {
    if (opt === '⚡ Vibe Coding Prompt') {
      handleSendMessage("Generate a vibe coding prompt for Cursor AI to build a modern web app");
    } else if (opt === '🧠 Google AI Flow Prompt') {
      handleSendMessage("Generate a Google AI Studio system instruction prompt for Gemini 1.5 Pro");
    } else if (opt === '🎨 Midjourney Image Prompt' || opt === '🎨 Midjourney Prompt') {
      handleSendMessage("Generate a Midjourney prompt for a photorealistic product design");
    } else if (opt === '🎥 Sora Video Prompt') {
      handleSendMessage("Generate a Sora AI video prompt for a 3D cinematic video ad");
    } else if (opt === '🎁 Free AI Modules') {
      handleSendMessage("What are the best free AI image and video generation modules?");
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
            <Sparkles size={10} /> MASTER AI
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
                  SAM Master AI Specialist <Sparkles size={14} style={{ color: '#38BDF8' }} />
                </div>
                <div style={{ color: '#10B981', fontSize: '0.72rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', backgroundColor: '#10B981', borderRadius: '50%', display: 'inline-block' }} />
                  Online • Vibe Coding, Google AI Studio & Sora
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
                placeholder="Ask SAM for vibe coding, Google AI Studio, Sora..."
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
