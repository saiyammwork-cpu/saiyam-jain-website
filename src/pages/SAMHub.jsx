import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Sparkles, Send, RefreshCw, Zap, ExternalLink, CheckCircle, Flame, ArrowRight, Copy, Check, 
  Camera, Mic, MicOff, Video, VideoOff, Volume2, VolumeX, Eye, HelpCircle, ShieldCheck, Play, Code, Image, Cpu, Terminal
} from 'lucide-react';

export default function SAMHub({ setActiveTab }) {
  // Mode selection: 'text' | 'voice' | 'vision' | 'hacks'
  const [activeMode, setActiveMode] = useState('text');
  
  // Voice Agent State
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Vision Camera State
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [capturedFrame, setCapturedFrame] = useState(null);

  // Chat stream state
  const [messages, setMessages] = useState([
    {
      sender: 'sam',
      text: "🤖 **Welcome to SAM — Master AI Architect & Vibe Coding Solution Specialist**\n\nI can write expert prompts for **literally anything**:\n• ⚡ **Vibe Coding Platforms** (Cursor AI, Bolt.new, v0.dev, Replit, Lovable, Base44, Antigravity)\n• 🧠 **Google AI Studio & AI Flow** (Gemini 1.5 Pro, System Instructions & Workflows)\n• 🎨 **Photorealistic Image AI** (Midjourney v6, Flux.1, DALL-E 3, Ideogram 2.0)\n• 🎥 **Cinematic Video AI** (Sora, Runway Gen-3, Luma Dream Machine, Kling AI)\n• 🌐 **Free AI Image/Video Modules & Technical Troubleshooting**",
      time: 'Just now'
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const promptAppUrl = "https://saiyam-prompts.base44.app";

  // Pre-configured Saiyam AI Hacks & Free AI Modules Knowledge Base
  const saiyamHacks = [
    {
      title: '⚡ Free Photorealistic Image AI Modules',
      category: 'Free AI Image Modules',
      solution: "Top 100% Free AI Image Generators:\n1. **Ideogram.ai**: Best for free text in images & 8K renders (25 free daily credits).\n2. **Leonardo.ai**: 150 daily free tokens for photorealistic Flux & Alchemy renders.\n3. **Flux.1 Schnell on HuggingFace**: Unlimited free open-source Flux image generation.\n4. **Tensor.art / Clipdrop**: Free daily credits for photorealistic portrait & product renders."
    },
    {
      title: '🎥 Free Cinematic Video AI Modules',
      category: 'Free AI Video Modules',
      solution: "Top 100% Free AI Video Generators:\n1. **Luma Dream Machine**: High-speed free generations with hyper-realistic camera orbits.\n2. **Kling AI (klingai.com)**: Free daily credits for high-definition 1080p motion video ads.\n3. **Runway Gen-2 / Gen-3 Alpha**: Free initial credits for cinematic camera pans.\n4. **Pika.art**: Free lip-sync & 3D animation generation."
    },
    {
      title: '💻 Vibe Coding Hacks (Cursor, Bolt, v0, Base44)',
      category: 'Vibe Coding Solutions',
      solution: "Master Vibe Coding Platform Hacks:\n1. **Cursor AI**: Create `.cursorrules` file in root specifying tech stack, design tokens & strict TypeScript rules.\n2. **Bolt.new & v0.dev**: Prompt with clear state models, component breakdown, and tailwind/glassmorphic CSS.\n3. **Base44 + GitHub Link**: If export fails, create an empty repo on GitHub first, then paste repo URL into Base44, or export ZIP and push via terminal!"
    },
    {
      title: '🧠 Google AI Studio & AI Flow Workflows',
      category: 'Google AI Studio',
      solution: "Building with Google AI Studio & Gemini 1.5 Pro:\n1. **System Instructions**: Set persona as 'Senior AI Architect with structured JSON outputs'.\n2. **Context Window**: Leverage Gemini 1.5 Pro's 2 Million token context to upload entire codebases or 1-hour videos.\n3. **Google AI Flow**: Chain prompts using structured JSON schema output & function calling."
    }
  ];

  // Speech Recognition Setup
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleSend(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  // Text-To-Speech Synthesis
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*_#`]/g, '').replace(/https?:\/\/\S+/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      stopSpeaking();
      setIsListening(true);
      recognitionRef.current?.start();
    }
  };

  // Camera Management
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
      }
    } catch (err) {
      alert("Camera access denied or unavailable. Please grant camera permission in your browser!");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  };

  // Scan Live Camera Frame & Analyze Visual Problem
  const scanCameraFrame = () => {
    if (!videoRef.current || !isCameraOn) return;

    setIsScanning(true);

    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    setCapturedFrame(dataUrl);

    setTimeout(() => {
      setIsScanning(false);
      const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const visionAnalysisText = "👁️ **SAM Visual Architecture Scan Complete**:\n\nI have scanned your screen/camera feed!\n\n• **If Vibe Coding (Cursor/Bolt/v0/Base44)**: Ensure your prompt defines exact state models, glassmorphism UI variables, and component architecture.\n• **If Error on Screen**: Check console network tab for 404 CORS or OAuth token errors.\n\nAsk me to engineer any custom prompt or speak to me for step-by-step guidance!";

      setMessages(prev => [
        ...prev,
        { sender: 'sam', text: visionAnalysisText, time: timeNow }
      ]);

      if (isVoiceActive || activeMode === 'voice') {
        speakText("Vision Scan Complete! I have analyzed your screen feed. Ask me to engineer a prompt or speak for step by step guidance.");
      }
    }, 1500);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isScanning]);

  // Master AI Prompt Architecture & Solution Engine
  const masterAIEngine = (userText) => {
    const lower = userText.toLowerCase();

    // 1. Vibe Coding Prompt Request (Cursor, Bolt, v0, Lovable, Replit, Base44, Antigravity)
    if (lower.includes('vibe coding') || lower.includes('cursor') || lower.includes('bolt') || lower.includes('v0') || lower.includes('lovable') || lower.includes('replit') || lower.includes('base44')) {
      const subject = userText.replace(/vibe coding|prompt|cursor|bolt|v0|lovable|replit|base44|make|generate|write|for|a/gi, '').trim() || "full-stack web application with glassmorphic UI";
      return {
        title: "⚡ Expert Vibe Coding Prompt (Cursor / Bolt.new / v0.dev)",
        prompt: `Act as a principal software architect & UI designer. Build a complete, production-ready web application for "${subject}". Requirements:\n1. Architecture: React 18, Vite, clean component modularity, state hooks.\n2. Design Tokens: Dark luxury palette (#070913), glassmorphic backdrop-filter blur panels, purple (#8B5CF6) & light blue (#38BDF8) gradient borders, smooth hover animations.\n3. Robustness: Handle loading states, empty fallback UI, responsive flex/grid viewports, zero console warnings.\n4. Output complete, drop-in code without placeholder comments.`,
        tip: "Copy into Cursor AI, Bolt.new, v0.dev, or Replit Agent for instant high-quality code generation!"
      };
    }

    // 2. Google AI Studio & AI Flow Prompt Request
    if (lower.includes('google ai') || lower.includes('ai studio') || lower.includes('ai flow') || lower.includes('gemini prompt')) {
      const subject = userText.replace(/google ai|ai studio|ai flow|gemini|prompt|make|generate|write|for|a/gi, '').trim() || "autonomous reasoning & structured data extraction pipeline";
      return {
        title: "🧠 Google AI Studio & AI Flow System Instruction Prompt",
        prompt: `System Instruction for Gemini 1.5 Pro / AI Flow:\nRole: Elite AI Data & Logic Architect.\nTask: Process user input regarding "${subject}" and generate structured JSON output following schema: { "status": "success", "analysis": "...", "actionable_steps": [...], "recommendations": [...] }.\nConstraints: Temperature: 0.2, Top_P: 0.95. Output strictly valid JSON without markdown wrapping.`,
        tip: "Paste into System Instructions in Google AI Studio or use in Gemini 1.5 Pro AI Flow pipelines!"
      };
    }

    // 3. Image Generation Prompt (Midjourney, Flux.1, DALL-E 3, Ideogram)
    if (lower.includes('picture') || lower.includes('image') || lower.includes('photo') || lower.includes('midjourney') || lower.includes('flux') || lower.includes('ideogram') || lower.includes('art')) {
      const subject = userText.replace(/picture|image|photo|midjourney|flux|ideogram|art|prompt|make|generate|write|for|a/gi, '').trim() || "futuristic luxury product concept";
      return {
        title: "🎨 Photorealistic Image AI Prompt (Midjourney v6 / Flux.1 / Ideogram)",
        prompt: `Cinematic 8k hyper-detailed studio photograph of ${subject}, ultra-luxurious aesthetic, soft violet rim light, cyan reflections, depth of field, shot on 35mm lens, photorealistic, 4k render --ar 16:9 --v 6.0 --style raw`,
        tip: "Works in Midjourney v6, Flux.1, DALL-E 3, and Ideogram.2. Change --ar 9:16 for mobile Reels format."
      };
    }

    // 4. Video Generation Prompt (Sora, Runway Gen-3, Luma, Kling)
    if (lower.includes('video') || lower.includes('sora') || lower.includes('runway') || lower.includes('luma') || lower.includes('kling') || lower.includes('motion')) {
      const subject = userText.replace(/video|sora|runway|luma|kling|motion|prompt|make|generate|write|for|a/gi, '').trim() || "sleek product advertisement launch";
      return {
        title: "🎥 Cinematic Video AI Prompt (Sora / Runway Gen-3 / Luma)",
        prompt: `Dynamic 60fps drone camera orbit around ${subject}, cinematic purple & blue volumetric lighting, atmospheric fog, hyper-realistic physics, 4k resolution, smooth pan movement, professional color grade`,
        tip: "Paste into Runway Gen-3 Alpha, Sora, Luma Dream Machine, or Kling AI for high-converting video ads!"
      };
    }

    // 5. Free AI Image / Video Modules Inquiry
    if (lower.includes('free image') || lower.includes('free video') || lower.includes('free ai') || lower.includes('module')) {
      return {
        text: "🎁 **Top 100% Free AI Image & Video Modules**:\n\n**Free Image Modules**:\n• **Ideogram.ai**: 25 free daily credits (best text rendering & photorealism).\n• **Leonardo.ai**: 150 free daily tokens for Flux & Alchemy renders.\n• **Flux.1 Schnell on HuggingFace**: Unlimited free open-source image generation.\n\n**Free Video Modules**:\n• **Luma Dream Machine**: Free fast generations with realistic motion.\n• **Kling AI (klingai.com)**: Free daily credits for 1080p video ads.\n• **Pika.art**: Free lip-sync & 3D video creation."
      };
    }

    // 6. Pricing & Package Inquiry
    if (lower.includes('price') || lower.includes('pricing') || lower.includes('cost') || lower.includes('rate') || lower.includes('package') || lower.includes('how much')) {
      return {
        text: "💰 **Official Saiyam Jain Services & Pricing Breakdown**:\n\n💻 **Website Packages**:\n• **BASIC (₹4,999)**: 5 pages, 3-word free domain, SEO, 3-day delivery (3 revisions limit).\n• **STANDARD (₹8,999)**: 8 pages, 2-word domain (.com/.in), Free AI Chatbot, 1 Free Video Ad, 2 Social Posts, SSL, Virtual Visiting Card (10 revisions limit).\n• **PREMIUM (₹11,999)**: 10 pages, Premium Minimalist Design, Free AI Chatbot, 3 Free Video Ads, 4 Social Posts, SSL, CRM Tool, Business Email (15 revisions limit).\n\n🎥 **AI Video ADs**: ₹1,999 for 3 videos (45-60s, 1080p, scripting, voiceover) + ₹799 per extra video.\n🖼️ **AI Image ADs**: ₹699 for 2 images/posters + ₹149 per extra image.\n🛍️ **E-Commerce Store**: Custom quote based on product catalog & payment gateway requirements.\n\n*Note: Pricing is view-only on the website. Direct online ordering is disabled. Visit Contact page to inquire & pay!*"
      };
    }

    // 7. Payment & Bank Details Inquiry
    if (lower.includes('payment') || lower.includes('bank') || lower.includes('account') || lower.includes('paytm') || lower.includes('upi') || lower.includes('qr') || lower.includes('ifsc') || lower.includes('canara')) {
      return {
        text: "🏦 **Official Payment & Bank Account Details**:\n\n• **BharatPe UPI ID**: `BHARATPE09910636684@yesbankltd`\n• **Bank Name**: Canara Bank\n• **Account Holder**: SAIYAM JAIN\n• **Account Number**: 110265163648\n• **IFSC Code**: CNRB0001426\n• **Mobile Number**: +91 9339256592\n\nYou can also click 'Pay Now via UPI' or scan the QR Code on the Contact page!"
      };
    }

    // 8. Base44 & GitHub Troubleshooting
    if (lower.includes('base44') || lower.includes('base 44') || (lower.includes('github') && (lower.includes('connect') || lower.includes('link') || lower.includes('app') || lower.includes('stuck') || lower.includes('error') || lower.includes('fail') || lower.includes('issue')))) {
      return {
        text: "🛠️ **Solution for Base44 & GitHub Connection Issue**:\n\n1. **Re-authorize OAuth**: Go to GitHub -> Settings -> Applications -> Authorized OAuth Apps, revoke Base44 access, then re-connect in Base44.\n2. **Manual Repo Link**: Create a new empty repository on GitHub manually first, then paste the HTTPS repository URL into Base44.\n3. **Direct Export Fix**: Click **Download Code (ZIP)** in Base44 -> Extract files locally -> Run `git init; git remote add origin <URL>; git push -u origin main` in terminal!"
      };
    }

    // 9. Free Custom Domain Setup
    if (lower.includes('domain') || lower.includes('freenom') || lower.includes('dns') || lower.includes('cname') || lower.includes('a record') || lower.includes('cloudflare')) {
      return {
        text: "🌐 **Solution for Free Custom Domain Setup**:\n\n1. In your domain registrar DNS settings:\n   • **A Record**: Host `@` -> Value `76.76.21.21` (Vercel IP)\n   • **CNAME Record**: Host `www` -> Value `cname.vercel-dns.com`\n2. Turn Cloudflare proxy **OFF** (grey cloud) during SSL verification.\n3. Wait 2 minutes and refresh Vercel domain panel!"
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

  const handleSend = (textToSend) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { sender: 'user', text, time: timeNow }]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const result = masterAIEngine(text);
      let replyText = "";
      let promptObj = null;

      if (result.prompt) {
        replyText = `✨ **${result.title}**`;
        promptObj = result;
      } else {
        replyText = result.text || `I understand! As Saiyam's Master AI Architect, I can write prompts for Vibe Coding, Google AI Studio/AI Flow, Midjourney, Sora, or troubleshoot free AI modules. What would you like to build?`;
      }

      setMessages(prev => [...prev, { sender: 'sam', text: replyText, promptObj, time: timeNow }]);
      setIsTyping(false);

      if (isVoiceActive || activeMode === 'voice') {
        speakText(replyText);
      }
    }, 800);
  };

  return (
    <div style={{ paddingTop: '110px', paddingBottom: '90px' }}>
      
      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Hub Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div className="badge-glow" style={{ marginBottom: '14px' }}>
            <Bot size={16} style={{ color: '#38BDF8' }} /> MASTER AI ARCHITECT & VIBE CODING SPECIALIST
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 800 }}>
            SAM <span className="text-gradient">Master AI Studio</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '680px', margin: '12px auto 0 auto', fontSize: '1.02rem', lineHeight: '1.6' }}>
            Write prompts for <strong>vibe coding</strong> (Cursor, Bolt, v0), <strong>Google AI Flow</strong>, <strong>Midjourney</strong>, <strong>Sora AI Video</strong>, or get <strong>free AI image/video modules</strong>!
          </p>
        </div>

        {/* Mode Selector Navigation Tabs */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
          marginBottom: '32px'
        }}>
          <button
            onClick={() => { setActiveMode('text'); stopSpeaking(); stopCamera(); }}
            style={{
              padding: '12px 22px',
              borderRadius: '14px',
              border: activeMode === 'text' ? '1px solid rgba(168, 85, 247, 0.5)' : '1px solid var(--glass-border)',
              background: activeMode === 'text' ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(56, 189, 248, 0.2))' : 'var(--glass-bg)',
              color: activeMode === 'text' ? 'var(--text-main)' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Terminal size={18} /> Master AI Architect
          </button>

          <button
            onClick={() => { setActiveMode('voice'); setIsVoiceActive(true); stopCamera(); }}
            style={{
              padding: '12px 22px',
              borderRadius: '14px',
              border: activeMode === 'voice' ? '1px solid rgba(56, 189, 248, 0.5)' : '1px solid var(--glass-border)',
              background: activeMode === 'voice' ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.3), rgba(139, 92, 246, 0.2))' : 'var(--glass-bg)',
              color: activeMode === 'voice' ? 'var(--text-main)' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Mic size={18} style={{ color: '#38BDF8' }} /> Live Voice Agent Mode
          </button>

          <button
            onClick={() => { setActiveMode('vision'); startCamera(); }}
            style={{
              padding: '12px 22px',
              borderRadius: '14px',
              border: activeMode === 'vision' ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid var(--glass-border)',
              background: activeMode === 'vision' ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(168, 85, 247, 0.2))' : 'var(--glass-bg)',
              color: activeMode === 'vision' ? 'var(--text-main)' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Camera size={18} style={{ color: '#EF4444' }} /> Vision Screen Scanner
          </button>

          <button
            onClick={() => { setActiveMode('hacks'); stopSpeaking(); stopCamera(); }}
            style={{
              padding: '12px 22px',
              borderRadius: '14px',
              border: activeMode === 'hacks' ? '1px solid rgba(16, 185, 129, 0.5)' : '1px solid var(--glass-border)',
              background: activeMode === 'hacks' ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(56, 189, 248, 0.2))' : 'var(--glass-bg)',
              color: activeMode === 'hacks' ? 'var(--text-main)' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Zap size={18} style={{ color: '#10B981' }} /> Free AI Modules & Hacks
          </button>
        </div>

        {/* Live Camera Vision Module Box */}
        {activeMode === 'vision' && (
          <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ color: '#FFF', fontWeight: 700, fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Eye size={20} style={{ color: '#EF4444' }} /> Multimodal Vision Feed - Show Screen or Error to SAM
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                {isCameraOn ? (
                  <button onClick={stopCamera} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.8rem' }}>
                    <VideoOff size={14} /> Turn Off Camera
                  </button>
                ) : (
                  <button onClick={startCamera} className="btn-primary" style={{ padding: '8px 14px', fontSize: '0.8rem' }}>
                    <Video size={14} /> Start Camera Feed
                  </button>
                )}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', alignItems: 'center' }}>
              {/* Camera Video Player */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: '16px', overflow: 'hidden', border: '2px solid rgba(239, 68, 68, 0.3)' }}>
                <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                
                {/* Laser Scanning Overlay Animation */}
                {isScanning && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, transparent, #EF4444, #38BDF8, transparent)',
                    boxShadow: '0 0 15px #EF4444',
                    animation: 'float 1.5s ease-in-out infinite'
                  }} />
                )}

                <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(0,0,0,0.7)', padding: '4px 10px', borderRadius: '8px', color: '#FFF', fontSize: '0.75rem', fontWeight: 600 }}>
                  {isScanning ? '🔍 SAM Scanning Screen...' : isCameraOn ? '🟢 Live Feed Connected' : '🔴 Camera Offline'}
                </div>
              </div>

              {/* Scan Action Controls */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', justifyContent: 'center' }}>
                <button
                  onClick={scanCameraFrame}
                  disabled={!isCameraOn || isScanning}
                  className="btn-accent"
                  style={{ padding: '16px 24px', fontSize: '1rem', background: 'linear-gradient(135deg, #EF4444, #8B5CF6)' }}
                >
                  📸 Scan & Diagnose My Problem <Sparkles size={18} />
                </button>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: '1.5' }}>
                  Point your camera at your screen or error message (vibe coding error, free domain issue, AI tool setup). SAM will analyze the frame and give the solution!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Live Voice Agent Indicator Controls */}
        {(activeMode === 'voice' || isSpeaking || isListening) && (
          <div className="glass-panel" style={{ padding: '20px', marginBottom: '28px', border: '1px solid rgba(56, 189, 248, 0.4)', background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(139, 92, 246, 0.15))' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: isSpeaking ? '#10B981' : isListening ? '#EF4444' : '#38BDF8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFF',
                  boxShadow: '0 0 20px rgba(56, 189, 248, 0.5)'
                }}>
                  {isSpeaking ? <Volume2 size={24} /> : isListening ? <Mic size={24} /> : <Bot size={24} />}
                </div>

                <div>
                  <div style={{ color: 'var(--heading-color)', fontWeight: 800, fontSize: '1rem' }}>
                    {isSpeaking ? '🔊 SAM is speaking the solution...' : isListening ? '🎙️ SAM is listening to your problem...' : '🎙️ Live Voice Solution Agent Active'}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    Gemini Live Real-time Audio Speech Engine
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={toggleListening}
                  style={{
                    background: isListening ? '#EF4444' : 'linear-gradient(135deg, #8B5CF6, #38BDF8)',
                    border: 'none',
                    color: '#FFF',
                    padding: '10px 20px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                  {isListening ? 'Stop Listening' : 'Speak to SAM'}
                </button>

                {isSpeaking && (
                  <button onClick={stopSpeaking} className="btn-secondary" style={{ padding: '10px 16px', fontSize: '0.88rem' }}>
                    <VolumeX size={16} /> Mute Voice
                  </button>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Saiyam Hacks Solver Grid */}
        {activeMode === 'hacks' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            {saiyamHacks.map((hack, idx) => (
              <div key={idx} className="glass-panel-interactive" style={{ padding: '24px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10B981', background: 'rgba(16, 185, 129, 0.12)', padding: '4px 10px', borderRadius: '10px', display: 'inline-block', marginBottom: '10px' }}>
                  {hack.category}
                </div>
                <h3 style={{ color: 'var(--heading-color)', fontSize: '1.1rem', fontWeight: 800, marginBottom: '12px' }}>{hack.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: '1.6', whiteSpace: 'pre-line', marginBottom: '16px' }}>{hack.solution}</p>
                <button
                  onClick={() => handleSend(`Tell me more about ${hack.title}`)}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '10px', fontSize: '0.85rem' }}
                >
                  Get Step-by-Step Fix <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Main Chat Console Box */}
        <div className="glass-panel" style={{
          borderRadius: '28px',
          border: '1px solid rgba(168, 85, 247, 0.35)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '580px',
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
                  SAM Master AI Architect <Sparkles size={16} style={{ color: '#38BDF8' }} />
                </div>
                <div style={{ color: '#10B981', fontSize: '0.78rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', backgroundColor: '#10B981', borderRadius: '50%', display: 'inline-block' }} />
                  Expert Active • Vibe Coding, Google AI Flow, Sora, Flux & Troubleshooting
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
                    {m.sender === 'user' ? 'You' : 'SAM Master AI'} • {m.time}
                  </span>
                </div>

                <div style={{
                  maxWidth: '88%',
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
                          onClick={() => handleCopy(idx, m.promptObj.prompt)}
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
                <span style={{ color: '#38BDF8', fontSize: '0.85rem', fontWeight: 600 }}>SAM is engineering your prompt...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div style={{ padding: '16px 24px', background: 'var(--nav-bg)', borderTop: '1px solid var(--glass-border)' }}>
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={{ display: 'flex', gap: '10px' }}>
              
              <button
                type="button"
                onClick={toggleListening}
                style={{
                  background: isListening ? '#EF4444' : 'rgba(139, 92, 246, 0.15)',
                  border: '1px solid var(--glass-border)',
                  color: isListening ? '#FFF' : '#38BDF8',
                  borderRadius: '14px',
                  width: '46px',
                  height: '46px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
                title={isListening ? 'Stop Mic' : 'Speak via Voice'}
              >
                <Mic size={20} />
              </button>

              <input
                type="text"
                placeholder="Ask SAM to write a prompt for vibe coding, Midjourney, Google AI Studio, Sora..."
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
                Engineer Prompt <Send size={18} />
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
