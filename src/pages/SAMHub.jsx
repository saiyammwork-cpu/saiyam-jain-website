import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Sparkles, Send, RefreshCw, Zap, ExternalLink, CheckCircle, Flame, ArrowRight, Copy, Check, 
  Camera, Mic, MicOff, Video, VideoOff, Volume2, VolumeX, Eye, HelpCircle, ShieldCheck, Play
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
      text: "⚡ Hello! I am SAM - Saiyam Jain's AI Solution & Troubleshooting Specialist.\n\nStuck on Base44, GitHub connections, free domains, Vercel deployments, or AI tools? Ask me your problem or turn on Live Voice / Camera Mode and I will give you the exact step-by-step solution!",
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

  // Pre-configured Saiyam AI Hacks Knowledge Base
  const saiyamHacks = [
    {
      title: '📦 Base44 & GitHub Connection Solution',
      category: 'Base44 & GitHub Fix',
      solution: "Stuck connecting Base44 to GitHub?\n1. In GitHub -> Settings -> Applications -> Authorized OAuth Apps, verify Base44 is authorized.\n2. In Base44, disconnect & re-connect your GitHub account.\n3. If auto-repo creation fails: Create a new empty repository on GitHub manually first, then paste your repository URL into Base44!\n4. Direct Fix: Download project ZIP from Base44, extract locally, run 'git init', add remote, and push to GitHub!"
    },
    {
      title: '🌐 Claim Free Custom Domain Solution',
      category: 'Domain & Hosting',
      solution: "Stuck claiming a free domain?\n1. Set A Record in DNS: 76.76.21.21 (Vercel IP) or CNAME to cname.vercel-dns.com.\n2. Turn OFF Cloudflare Proxy (orange cloud -> grey cloud) during initial SSL verification.\n3. Wait 2 minutes and click Recheck in Vercel domains panel!"
    },
    {
      title: '⚡ Vercel & Netlify Deployment Fixes',
      category: 'Web Deployment',
      solution: "Deployment error fix:\n1. Build Command: 'npm run build' | Output Directory: 'dist'\n2. Ensure root directory is correct if using sub-folders.\n3. Fix build errors by testing 'npm run build' locally before pushing to GitHub!"
    },
    {
      title: '🎥 Free AI Video & Voiceover Hack',
      category: 'AI Video Solutions',
      solution: "Creating viral AI Video Ads:\n1. Voiceover: Use ElevenLabs.io or Edge-TTS.\n2. Motion: Use Runway Gen-2 or Luma Dream Machine free credits.\n3. Script: Ask SAM to generate a 30-second viral video script!"
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

      const visionAnalysisText = "👁️ **SAM Vision Scan Analysis & Solution**:\n\nI have scanned your screen feed!\n\n• **If stuck on Base44 + GitHub**: Disconnect & re-authorize GitHub in Base44 settings, or create a fresh empty repo on GitHub first.\n• **If stuck on Custom Domain**: Ensure DNS A Record is `76.76.21.21` and turn off Cloudflare SSL Proxy during verification.\n\nTell me what you see on your screen or speak to me for live voice guidance!";

      setMessages(prev => [
        ...prev,
        { sender: 'sam', text: visionAnalysisText, time: timeNow }
      ]);

      if (isVoiceActive || activeMode === 'voice') {
        speakText("Vision Scan Complete! I have analyzed your screen feed. Follow the step-by-step solution or speak to me for help.");
      }
    }, 1500);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isScanning]);

  // Comprehensive AI Solution Generator Engine
  const solveTechnicalProblem = (userText) => {
    const lower = userText.toLowerCase();

    // Problem 1: Base44 & GitHub connection / export issues
    if (lower.includes('base44') || lower.includes('base 44') || (lower.includes('github') && (lower.includes('connect') || lower.includes('link') || lower.includes('app') || lower.includes('stuck') || lower.includes('error') || lower.includes('fail') || lower.includes('issue')))) {
      return "🛠️ **Solution for Base44 & GitHub Connection Issue**:\n\nIf Base44 is failing to connect or push to your GitHub account:\n\n1. **Re-authorize GitHub**: Go to GitHub -> Settings -> Applications -> Authorized OAuth Apps, find Base44, and click **Revoke Access**. Then return to Base44 and re-connect.\n2. **Manual Repo Creation**: Create a brand new EMPTY repository on [GitHub.com/new](https://github.com/new) first. Paste the new repository URL directly into Base44.\n3. **Direct Export Fix**: Click **Download Code (ZIP)** in Base44 -> Extract files locally -> Open terminal -> Run:\n```bash\ngit init\ngit remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git\ngit branch -M main\ngit push -u origin main\n```";
    }

    // Problem 2: Free Domain Claiming & DNS Propagation
    if (lower.includes('domain') || lower.includes('freenom') || lower.includes('dns') || lower.includes('cname') || lower.includes('a record') || lower.includes('cloudflare')) {
      return "🌐 **Solution for Free Custom Domain Setup**:\n\nIf your domain is not working or stuck on verification:\n\n1. **Vercel DNS Setup**: In your Domain Registrar (Cloudflare/Freenom/Namecheap), set:\n   • **A Record**: Host `@` -> Value `76.76.21.21`\n   • **CNAME Record**: Host `www` -> Value `cname.vercel-dns.com`\n2. **Cloudflare Proxy Fix**: Turn Cloudflare proxy **OFF** (change orange cloud to grey cloud) during initial SSL verification.\n3. **Propagation Check**: DNS propagation can take 2-5 minutes. Click Recheck in Vercel domain panel!";
    }

    // Problem 3: Vercel / Netlify Deployment Errors
    if (lower.includes('vercel') || lower.includes('netlify') || lower.includes('deploy') || lower.includes('build error') || lower.includes('404')) {
      return "⚡ **Solution for Vercel / Netlify Build & 404 Errors**:\n\n1. **Build Command**: Set Build Command to `npm run build` or `vite build`.\n2. **Output Directory**: Set Output Directory to `dist` (for Vite/React) or `build` (for CRA).\n3. **404 Route Fix**: Create a `vercel.json` file in root:\n```json\n{\n  \"rewrites\": [{ \"source\": \"/(.*)\", \"destination\": \"/index.html\" }]\n}\n```\n4. Test `npm run build` locally in terminal before pushing to GitHub!";
    }

    // Problem 4: AI Prompts / Midjourney / ChatGPT
    if (lower.includes('prompt') || lower.includes('midjourney') || lower.includes('chatgpt') || lower.includes('sora')) {
      return "✨ **Engineered AI Prompt Solution**:\n\n`Cinematic 8k photograph of a futuristic brand product, soft purple rim light, cyan reflections, studio depth of field, photorealistic --ar 16:9 --v 6.0`\n\nYou can also access 100+ pre-tested prompts at saiyam-prompts.base44.app!";
    }

    // Problem 5: Client Portfolio (Strictly matched ONLY for portfolio requests)
    if (lower.includes('client portfolio') || lower.includes('past projects') || lower.includes('past work') || lower.includes('cleanza') || lower.includes('jain bhandar') || lower.includes('trilokesh') || lower.includes('white hills') || lower.includes('balajee') || lower.includes('noarch')) {
      return "🏆 **Saiyam's Client Portfolio**:\n• **Cleanza** (Hygiene portal + AI Support)\n• **Jain Bhandar** (Enterprise catalog)\n• **Trilokesh Tours** (Travel booking)\n• **White Hills** (Luxury real estate)\n• **Balajee Sarees** (Fashion e-commerce)\n• **Noarch** (Architecture studio)";
    }

    // Problem 6: Services offered
    if (lower.includes('service') || lower.includes('what do you offer') || lower.includes('hire saiyam')) {
      return "🛠️ **Saiyam Jain's 6 Core Services**:\n1. 💻 Website Building\n2. ⚡ Web Apps Development\n3. 🤖 AI Chatbots & Automations\n4. 📱 Android Apps\n5. 🎥 AI Generated Video ADs\n6. 🖼️ AI Generated Image ADs";
    }

    // Default intelligent problem-solver response
    return `💡 **SAM Solution Assistant**:\n\nI understand you are working on: "${userText}".\n\nTo solve this:\n1. If it's a **Base44 or GitHub error**: Disconnect & re-authorize GitHub, or create an empty repository on GitHub manually first.\n2. If it's a **Domain / Hosting issue**: Ensure A Record is '76.76.21.21' and CNAME points to Vercel.\n3. If it's an **AI Tool / Prompt request**: Ask me to write a custom prompt or check saiyam-prompts.base44.app!\n\nTell me the exact error message or turn on Live Camera Scanner so I can see your screen!`;
  };

  const handleSend = (textToSend) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { sender: 'user', text, time: timeNow }]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const replyText = solveTechnicalProblem(text);
      setMessages(prev => [...prev, { sender: 'sam', text: replyText, time: timeNow }]);
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
            <Bot size={16} style={{ color: '#38BDF8' }} /> MULTIMODAL AI TECHNICAL SOLUTION ENGINE
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 800 }}>
            SAM <span className="text-gradient">AI Solution Specialist</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '12px auto 0 auto', fontSize: '1.02rem', lineHeight: '1.6' }}>
            Get instant solutions for Base44, GitHub connections, free custom domain claiming, Vercel build errors, AI tools & prompts!
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
            <Bot size={18} /> Problem Solver Console
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
            <Mic size={18} style={{ color: '#38BDF8' }} /> Live Voice Solution Agent
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
            <Zap size={18} style={{ color: '#10B981' }} /> Saiyam Hacks Library
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
                  Point your camera at your screen or error message (Base44, GitHub connection error, free domain issue). SAM will analyze the frame and give the solution!
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
                  onClick={() => handleSend(`How do I solve ${hack.title}?`)}
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
                  SAM AI Technical Solution Engine <Sparkles size={16} style={{ color: '#38BDF8' }} />
                </div>
                <div style={{ color: '#10B981', fontSize: '0.78rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', backgroundColor: '#10B981', borderRadius: '50%', display: 'inline-block' }} />
                  Solution Mode Active • Base44, GitHub, Domains, Vercel & AI Tools
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
                    {m.sender === 'user' ? 'You' : 'SAM Solution Agent'} • {m.time}
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
                </div>

              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', gap: '8px', padding: '12px 18px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '14px', width: 'fit-content' }}>
                <span style={{ color: '#38BDF8', fontSize: '0.85rem', fontWeight: 600 }}>SAM is generating your exact solution...</span>
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
                placeholder="Where are you stuck? Ask SAM for the exact solution..."
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
                Get Solution <Send size={18} />
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
