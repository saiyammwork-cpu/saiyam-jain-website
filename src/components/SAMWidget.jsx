import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Flame, Copy, Check, ExternalLink, Zap, RefreshCw } from 'lucide-react';

export default function SAMWidget({ setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'sam',
      text: "👋 Hey! I'm SAM, Saiyam Jain's AI Solution & Troubleshooting Specialist.\n\nStuck on Base44, connecting GitHub, claiming free custom domains, or AI tools? Tell me where you are stuck and I'll give you the exact solution!",
      options: ['📦 Fix Base44 GitHub Connection', '🌐 Fix Free Custom Domain Issue', '🎨 Generate AI Prompt', '💼 View Saiyam\'s Services']
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

  // Comprehensive AI Technical Problem Solver
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

    // Problem 5: Client Portfolio (Matched ONLY for explicit portfolio inquiries)
    if (lower.includes('client portfolio') || lower.includes('past projects') || lower.includes('past work') || lower.includes('cleanza') || lower.includes('jain bhandar') || lower.includes('trilokesh') || lower.includes('white hills') || lower.includes('balajee') || lower.includes('noarch')) {
      return "🏆 **Saiyam's Client Portfolio**:\n• **Cleanza** (Hygiene portal + AI Support)\n• **Jain Bhandar** (Enterprise catalog)\n• **Trilokesh Tours** (Travel booking)\n• **White Hills** (Luxury real estate)\n• **Balajee Sarees** (Fashion e-commerce)\n• **Noarch** (Architecture studio)";
    }

    // Problem 6: Services offered
    if (lower.includes('service') || lower.includes('what do you offer') || lower.includes('hire saiyam')) {
      return "🛠️ **Saiyam Jain's 6 Core Services**:\n1. 💻 Website Building\n2. ⚡ Web Apps Development\n3. 🤖 AI Chatbots & Automations\n4. 📱 Android Apps\n5. 🎥 AI Generated Video ADs\n6. 🖼️ AI Generated Image ADs";
    }

    // Default intelligent problem-solver response
    return `💡 **SAM Solution Assistant**:\n\nI understand you are working on: "${userText}".\n\nTo solve this:\n1. If it's a **Base44 or GitHub error**: Disconnect & re-authorize GitHub in settings, or create a fresh repository on GitHub manually first.\n2. If it's a **Domain / Hosting issue**: Ensure A Record is 76.76.21.21 and CNAME points to Vercel.\n3. If it's an **AI Tool / Prompt request**: Ask me to write a custom prompt or check saiyam-prompts.base44.app!\n\nTell me the exact error message or open SAM Hub (/sam-agent) to scan your screen via Camera!`;
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: query }];
    setMessages(newMessages);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const replyText = solveTechnicalProblem(query);
      let replyOptions = ['📦 Base44 & GitHub Fix', '🌐 Free Custom Domain Setup', '🎨 Generate AI Prompt', '📬 Contact Saiyam'];

      setMessages((prev) => [
        ...prev, 
        { 
          sender: 'sam', 
          text: replyText, 
          options: replyOptions 
        }
      ]);
      setIsTyping(false);
    }, 800);
  };

  const handleOptionClick = (opt) => {
    if (opt === '🔥 Prompts Vault App') {
      window.open(promptAppUrl, '_blank');
    } else if (opt === 'Go to Prompts Page') {
      setActiveTab('prompts');
      setIsOpen(false);
    } else if (opt === '💼 View Saiyam\'s Services' || opt === 'View Services & Portfolio') {
      setActiveTab('services');
      setIsOpen(false);
    } else if (opt === 'Go to Contact Page' || opt === '📬 Contact Saiyam') {
      setActiveTab('contact');
      setIsOpen(false);
    } else if (opt === '📦 Fix Base44 GitHub Connection' || opt === '📦 Base44 & GitHub Fix') {
      handleSendMessage("I am having an issue connecting Base44 to my GitHub account. How do I fix it?");
    } else if (opt === '🌐 Fix Free Custom Domain Issue' || opt === '🌐 Free Custom Domain Setup') {
      handleSendMessage("How do I claim and link a free custom domain to Vercel?");
    } else if (opt === '🎨 Generate AI Prompt') {
      handleSendMessage("Generate a Midjourney prompt for a luxury brand product");
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
            <Sparkles size={10} /> AI SOLVER
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
                  SAM AI Solution Specialist <Sparkles size={14} style={{ color: '#38BDF8' }} />
                </div>
                <div style={{ color: '#10B981', fontSize: '0.72rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', backgroundColor: '#10B981', borderRadius: '50%', display: 'inline-block' }} />
                  Online • Base44, GitHub & AI Tech Solver
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
                <span style={{ color: '#38BDF8', fontSize: '0.8rem', fontWeight: 600 }}>SAM is generating your exact solution...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(7, 9, 19, 0.8)' }}>
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Where are you stuck? Ask SAM..."
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
