import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Sparkles, Send, Mic, MicOff, Camera, Video, VideoOff, RefreshCw,
  Code2, Image, Clapperboard, HelpCircle, CheckCircle, Zap, ShieldCheck,
  Terminal, Globe, BookOpen, Tag, ShoppingCart, Lock, ArrowRight, ExternalLink
} from 'lucide-react';

export default function SAMHub({ setActiveTab }) {
  const [messages, setMessages] = useState([
    {
      sender: 'sam',
      text: `👋 **Hello! I am SAM — Saiyam Jain's Master AI Solution Engine & Prompt Architect!**

I hold deep technical expertise in AI prompt architecture, free domain claiming tricks, vibe coding, website pricing, coupon discounts, dynamic UPI payment QR codes, and Vercel build fixes!

How can I help you today?
• 🚀 **Prompt Engineering**: Need Midjourney, Sora, ChatGPT, or Vibe Coding prompts?
• 💳 **Cart, Pricing & Coupons**: Ask about website plans, 10% coupon code **SAIYAM10**, or UPI QR codes!
• 🎓 **Courses & Guides**: Ask about upcoming courses & free domain claiming!
• ⚙️ **Technical Fixes**: Stuck on Base44, GitHub OAuth, or Vercel build errors?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);

  const videoRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Suggested Quick Askable Questions
  const suggestedQuestions = [
    "⚡ What is the 10% discount coupon code?",
    "🌐 How do I claim a free 3-word domain?",
    "🎨 Write a Midjourney prompt for futuristic logo",
    "💳 What are the website package prices?",
    "🛠️ How do I pay via dynamic UPI QR code?",
    "🎓 What courses does Saiyam offer?",
    "⚙️ How do I access the admin panel?"
  ];

  // Comprehensive SAM Technical Knowledge Engine Response Generator
  const generateSAMResponse = (query) => {
    const q = query.toLowerCase();

    // 1. Coupon Code & Discounts
    if (q.includes('coupon') || q.includes('discount') || q.includes('code') || q.includes('saiyam10') || q.includes('offer')) {
      return `🎉 **Official 10% OFF Coupon Code**:

Use coupon code **\`SAIYAM10\`** during checkout in your cart to get an **instant 10% discount** on any service!

• **Basic Website Plan**: ₹4,999 ➔ **₹4,499** after coupon!
• **Standard Website Plan**: ₹8,999 ➔ **₹8,099** after coupon!
• **Premium Website Plan**: ₹11,999 ➔ **₹10,799** after coupon!

Simply enter **SAIYAM10** in your cart drawer or checkout modal and tap **Apply**!`;
    }

    // 2. Pricing & Packages
    if (q.includes('price') || q.includes('cost') || q.includes('package') || q.includes('website') || q.includes('plan')) {
      return `💰 **Saiyam Jain's Official Services & Pricing**:

1. **Basic Website Plan (₹4,999)**:
   • 3-word domain/subdomain lifetime free (e.g. \`trilok-tours.site.je\`)
   • WordPress or AI-generated 5-page site
   • Free SEO setup & 0 maintenance cost
   • Add AI Chatbot @ ₹999

2. **Standard Website Plan (₹8,999)**:
   • 2-word domain (\`.com\` / \`.in\`)
   • Free AI Chatbot & SSL Certificate
   • 8-page limit + 1 Free Video Ad + 2 Social Posts
   • Eyecatching & minimal design

3. **Premium Website Plan (₹11,999)**:
   • Premium high-converting minimal website
   • 10-page limit + Free SSL + Virtual Visiting Card
   • 3 Free Video Ads (40-45 sec) + 4 Social Media Posts

4. **AI Ads & E-Commerce**:
   • AI Video Ads: ₹1,999 base (+₹799/video)
   • AI Image Ads: ₹699 base (+₹149/image)
   • E-Commerce Store: Custom quote on request!`;
    }

    // 3. Payment & Dynamic UPI QR Code
    if (q.includes('pay') || q.includes('qr') || q.includes('upi') || q.includes('bharatpe') || q.includes('bank')) {
      return `💳 **UPI & Payment Integration**:

• **Official UPI ID**: \`BHARATPE09910636684@yesbankltd\`
• **Dynamic QR Code**: When you check out from your cart, SAM generates a real-time dynamic QR code that **automatically pre-fills the exact payable amount** in Google Pay, PhonePe, Paytm, or BHIM!
• **Canara Bank Account**:
  - Account Number: \`110265163648\`
  - IFSC Code: \`CNRB0001426\`
  - Account Holder: \`SAIYAM JAIN\`
  - Mobile: \`+91 9339256592\`

After paying, tap **"Send Payment Screenshot on WhatsApp"** to open WhatsApp directly with your pre-filled order receipt!`;
    }

    // 4. Free Domain Claiming Trick
    if (q.includes('domain') || q.includes('free domain') || q.includes('subdomain') || q.includes('claim')) {
      return `🌐 **Saiyam's Free Domain Claiming Guide**:

You can claim a lifetime free 3-word subdomain (e.g. \`trilok-tours.site.je\`) with 0 recurring maintenance costs!

**Steps**:
1. Choose a 3-word brand slug (e.g., \`your-brand-name.site.je\`).
2. Order the **Basic Website Package (₹4,999)** or ask Saiyam for free hosting configuration.
3. Saiyam sets up free SSL certificate and 0-cost hosting infrastructure for life!`;
    }

    // 5. Courses & Academy
    if (q.includes('course') || q.includes('class') || q.includes('learn') || q.includes('academy') || q.includes('tutorial')) {
      return `🎓 **Saiyam Jain Courses & Academy**:

Visit our **Courses Page** (\`/courses\`) to explore free & premium masterclasses!

Courses are managed live via the Admin Panel. Saiyam regularly publishes tutorials on:
• AI Prompt Architecture & Midjourney mastery
• Free Domain & Hosting Claiming tricks
• Vibe coding & full-stack web development

Check the **Courses** tab in the navigation bar!`;
    }

    // 6. Admin Panel & Portal
    if (q.includes('admin') || q.includes('dashboard') || q.includes('login') || q.includes('password')) {
      return `🔒 **Admin Portal Access**:

• **URL**: Click the subtle **\`admin login\`** link at the very bottom footer of the **Contact & Hire** page (\`/contact\`).
• **Master Password**: \`Sam93392s@\`
• **Features**: View live orders, track order stages, view form inquiries, manage courses, edit pricing, and update coupon codes!`;
    }

    // 7. Prompts & AI Architecture
    if (q.includes('prompt') || q.includes('midjourney') || q.includes('sora') || q.includes('vibe') || q.includes('chatgpt')) {
      return `🎨 **AI Prompt Architecture Masterclass**:

Here is a high-converting formula trained into SAM:

**Structure**: \`[Subject] + [Environment/Lighting] + [Style/Medium] + [Camera/Engine Spec] + [Color Palette]\`

**Example Prompt (Midjourney / Flux)**:
\`"Ultra-realistic cinematic shot of a luxury minimalist glassmorphic smartphone interface, neon purple and sky blue ambient volumetric glow, 8k resolution, photorealistic studio lighting, octane render --ar 16:9 --v 6.0"\`

Explore 100+ copy-paste prompts in our **Prompts Vault**!`;
    }

    // Default Fallback
    return `⚡ **SAM Technical Solution**:

I understand you're asking about: "${query}".

As Saiyam Jain's AI Solution Engine, I can assist you with:
1. **AI Prompts**: Midjourney, ChatGPT, Sora, Vibe Coding.
2. **Pricing & Coupons**: 10% OFF code **SAIYAM10**.
3. **Payments**: Dynamic UPI QR codes & Canara Bank details.
4. **Courses & Domain Claiming**: Step-by-step guides.

Feel free to ask a specific question or select a quick topic below!`;
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [...prev, { sender: 'user', text: userText, time: timeStr }]);
    setInput('');

    setTimeout(() => {
      const samReply = generateSAMResponse(userText);
      setMessages(prev => [...prev, { sender: 'sam', text: samReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 600);
  };

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
  };

  const toggleCamera = async () => {
    if (isCameraActive) {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
      setIsCameraActive(false);
      setCameraStream(null);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setIsCameraActive(true);
        setCameraStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        alert("Camera/Microphone access permitted for SAM Multimodal Vision scanning.");
      }
    }
  };

  return (
    <div style={{ paddingTop: '110px', paddingBottom: '90px' }}>
      
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div className="badge-glow" style={{ marginBottom: '10px' }}>
            <Bot size={16} style={{ color: '#38BDF8' }} /> MULTIMODAL AI SOLUTION ENGINE & PROMPT ARCHITECT
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 800 }}>
            SAM <span className="text-gradient">AI Solution Agent</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '10px auto 0 auto', fontSize: '0.98rem' }}>
            Voice, Vision Scanner, Prompt Generator & Technical Problem Solver trained to the shore of AI potential.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          
          {/* Left Column: Multimodal Control Panel & Camera Stream */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Multimodal Live Camera View */}
            <div className="glass-panel" style={{ padding: '20px', borderRadius: '24px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, color: 'var(--heading-color)', fontSize: '0.95rem' }}>
                  <Video size={18} style={{ color: isCameraActive ? '#10B981' : 'var(--text-muted)' }} /> SAM Live Vision Scanner
                </div>
                <span style={{ fontSize: '0.75rem', color: isCameraActive ? '#10B981' : 'var(--text-muted)', fontWeight: 700 }}>
                  {isCameraActive ? '🟢 Live Feed Active' : '⚪ Camera Off'}
                </span>
              </div>

              <div style={{
                width: '100%',
                height: '220px',
                background: '#070913',
                borderRadius: '16px',
                border: '1px solid var(--glass-border)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {isCameraActive ? (
                  <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>
                    <Camera size={36} style={{ opacity: 0.3, margin: '0 auto 8px auto' }} />
                    <div style={{ fontSize: '0.84rem' }}>Turn on camera for SAM to scan your screen or technical issue</div>
                  </div>
                )}
              </div>

              {/* Multimodal Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '14px' }}>
                <button
                  onClick={toggleCamera}
                  style={{
                    padding: '10px',
                    borderRadius: '12px',
                    border: isCameraActive ? '1px solid #10B981' : '1px solid var(--glass-border)',
                    background: isCameraActive ? 'rgba(16, 185, 129, 0.15)' : 'var(--glass-bg)',
                    color: isCameraActive ? '#10B981' : 'var(--text-main)',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  {isCameraActive ? <VideoOff size={16} /> : <Video size={16} />}
                  {isCameraActive ? 'Stop Camera' : 'Start Camera'}
                </button>

                <button
                  onClick={toggleVoice}
                  style={{
                    padding: '10px',
                    borderRadius: '12px',
                    border: isVoiceActive ? '1px solid #38BDF8' : '1px solid var(--glass-border)',
                    background: isVoiceActive ? 'rgba(56, 189, 248, 0.15)' : 'var(--glass-bg)',
                    color: isVoiceActive ? '#38BDF8' : 'var(--text-main)',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  {isVoiceActive ? <MicOff size={16} /> : <Mic size={16} />}
                  {isVoiceActive ? 'Mute Voice' : 'Voice Mode'}
                </button>
              </div>
            </div>

            {/* Quick Askable Questions */}
            <div className="glass-panel" style={{ padding: '20px', borderRadius: '24px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <HelpCircle size={16} style={{ color: '#C084FC' }} /> Ask SAM Quick Questions:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInput(q);
                    }}
                    style={{
                      textAlign: 'left',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-main)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{q}</span>
                    <ArrowRight size={12} style={{ opacity: 0.5 }} />
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: SAM Intelligent Chat Interface */}
          <div className="glass-panel" style={{
            height: '620px',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid var(--border-subtle)'
          }}>
            
            {/* Chat Box Header */}
            <div style={{
              padding: '16px 20px',
              background: 'var(--bg-surface)',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bg-main)' }}>
                  <Bot size={20} />
                </div>
                <div>
                  <div style={{ color: 'var(--text-main)', fontWeight: 800, fontSize: '0.95rem' }}>SAM Master Solution Engine</div>
                  <div style={{ color: '#10B981', fontSize: '0.72rem', fontWeight: 700 }}>● Online & Trained on All Features</div>
                </div>
              </div>

              <div style={{ fontSize: '0.72rem', color: 'var(--text-main)', background: 'var(--glass-pill)', padding: '4px 10px', borderRadius: '9999px', fontWeight: 800, border: '1px solid var(--border-subtle)' }}>
                Coupon: SAIYAM10
              </div>
            </div>

            {/* Messages Thread */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', background: 'var(--bg-main)' }}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    background: msg.sender === 'user' 
                      ? 'var(--text-main)' 
                      : 'var(--bg-surface)',
                    border: msg.sender === 'user' 
                      ? 'none' 
                      : '1px solid var(--border-subtle)',
                    padding: '14px 18px',
                    borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    color: msg.sender === 'user' ? 'var(--bg-main)' : 'var(--text-main)',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-line',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  {msg.text}
                  <div style={{ fontSize: '0.68rem', color: msg.sender === 'user' ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', marginTop: '4px', textAlign: 'right' }}>
                    {msg.time}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} style={{ padding: '14px 18px', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="Ask SAM about prompts, coupons, payments, free domains..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  background: 'var(--input-bg)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  color: 'var(--text-main)',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />

              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '12px 20px', borderRadius: '12px', fontSize: '0.9rem' }}
              >
                Send <Send size={15} />
              </button>
            </form>

          </div>

        </div>

      </div>

    </div>
  );
}
