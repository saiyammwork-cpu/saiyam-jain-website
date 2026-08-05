import { X, Sparkles } from 'lucide-react';
import { YoutubeIcon } from './Icons';

export default function VideoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      background: 'rgba(5, 7, 14, 0.88)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '420px',
        background: 'rgba(11, 15, 26, 0.95)',
        border: '1px solid rgba(168, 85, 247, 0.4)',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 25px 60px rgba(139, 92, 246, 0.35)'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(56, 189, 248, 0.15))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FFF', fontWeight: 700, fontSize: '0.95rem' }}>
            <YoutubeIcon size={20} color="#FF0000" />
            Saiyam Jain Intro Short
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#FFF',
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

        {/* Video Frame */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '9/16', background: '#000' }}>
          <iframe
            src="https://www.youtube.com/embed/kQaWu8FIlls?autoplay=1"
            title="Saiyam Jain Intro Video"
            style={{ width: '100%', height: '100%', border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Footer info */}
        <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(7, 9, 19, 0.9)' }}>
          <a
            href="https://youtube.com/@saiyam_io"
            target="_blank"
            rel="noreferrer"
            style={{ color: '#38BDF8', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            Subscribe @saiyam_io <Sparkles size={14} />
          </a>
          <button
            onClick={onClose}
            style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#FFF', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer' }}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
