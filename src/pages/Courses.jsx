import React, { useState, useEffect, useCallback } from 'react';
import { GraduationCap, ExternalLink, Sparkles, BookOpen, Clock, PlayCircle, ShieldCheck, ArrowRight, Zap } from 'lucide-react';

export default function Courses({ setActiveTab }) {
  const [courses, setCourses] = useState([]);

  const fetchCourses = useCallback(() => {
    const savedCourses = JSON.parse(localStorage.getItem('saiyam_courses') || '[]');
    setCourses(savedCourses.filter(c => c.status === 'Published'));
  }, []);

  useEffect(() => {
    fetchCourses();
    window.addEventListener('storage', fetchCourses);
    const interval = setInterval(fetchCourses, 1500);

    return () => {
      window.removeEventListener('storage', fetchCourses);
      clearInterval(interval);
    };
  }, [fetchCourses]);

  return (
    <div style={{ paddingTop: '110px', paddingBottom: '90px' }}>
      
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="badge-glow" style={{ marginBottom: '14px' }}>
            <GraduationCap size={16} style={{ color: '#A855F7' }} /> SAIYAM JAIN ACADEMY & COURSES
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 800 }}>
            Master AI & Web Dev <span className="text-gradient">Courses</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '14px auto 0 auto', fontSize: '1rem', lineHeight: '1.6' }}>
            Learn step-by-step AI workflows, prompt engineering, vibe coding tricks, and full-stack web development.
          </p>
        </div>

        {/* Dynamic Courses Grid */}
        {courses.length === 0 ? (
          /* Empty State / Launch Announcement */
          <div className="glass-panel" style={{
            maxWidth: '680px',
            margin: '0 auto',
            padding: '40px 24px',
            borderRadius: '28px',
            textAlign: 'center',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(56, 189, 248, 0.08))',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(56, 189, 248, 0.3))',
              border: '1px solid rgba(168, 85, 247, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38BDF8',
              margin: '0 auto 20px auto'
            }}>
              <GraduationCap size={32} />
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--heading-color)', marginBottom: '8px' }}>
              New Courses Launching Soon! 🚀
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '24px' }}>
              Saiyam Jain is currently curating practical, high-value video masterclasses and guides on AI prompt architecture, free domain claiming tricks, and web dev. Courses added from the Admin Panel will appear right here instantly!
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setActiveTab('sam')} className="btn-primary" style={{ padding: '12px 20px', fontSize: '0.9rem' }}>
                Ask SAM AI Agent Anything <ArrowRight size={16} />
              </button>
              <button onClick={() => setActiveTab('prompts')} className="btn-secondary" style={{ padding: '12px 20px', fontSize: '0.9rem' }}>
                Explore Prompts Vault
              </button>
            </div>
          </div>
        ) : (
          /* Live Courses Display Grid */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {courses.map((course) => (
              <div 
                key={course.id}
                className="glass-panel-interactive"
                style={{
                  padding: '24px',
                  borderRadius: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '18px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{
                      background: 'rgba(139, 92, 246, 0.15)',
                      border: '1px solid rgba(168, 85, 247, 0.4)',
                      color: '#C084FC',
                      padding: '4px 10px',
                      borderRadius: '10px',
                      fontSize: '0.75rem',
                      fontWeight: 800
                    }}>
                      {course.badge || 'Featured Course'}
                    </span>

                    <span style={{ color: '#10B981', fontWeight: 900, fontSize: '1.1rem' }}>
                      {course.price ? `₹${course.price}` : 'FREE'}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--heading-color)', marginBottom: '8px' }}>
                    {course.title}
                  </h3>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6' }}>
                    {course.description}
                  </p>
                </div>

                <a
                  href={course.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-accent"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '12px',
                    borderRadius: '14px',
                    fontWeight: 800,
                    fontSize: '0.92rem',
                    textDecoration: 'none'
                  }}
                >
                  Access Course Link <ExternalLink size={16} />
                </a>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
