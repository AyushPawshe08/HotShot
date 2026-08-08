import { Zap } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: '1px solid #1E293B',
        background: '#0B1120',
        padding: '32px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '18px',
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Zap size={15} color="white" fill="white" />
          </div>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '1rem',
              background: 'linear-gradient(135deg, #9F67FF 0%, #60A5FA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            HotShot
          </span>
        </div>

        {/* Built by Ayush Pawshe with text <a> tags */}
        <div
          style={{
            fontSize: '0.9rem',
            color: '#64748B',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 500,
          }}
        >
          <span>Built by <strong style={{ color: '#F1F5F9', fontWeight: 600 }}>Ayush Pawshe</strong></span>
          <span style={{ color: '#334155' }}>·</span>
          <a
            href="https://github.com/AyushPawshe08"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#A78BFA',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#F1F5F9')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#A78BFA')}
          >
            GitHub
          </a>
          <span style={{ color: '#334155' }}>·</span>
          <a
            href="https://www.linkedin.com/in/ayush-pawshe/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#60A5FA',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#F1F5F9')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#60A5FA')}
          >
            LinkedIn
          </a>
        </div>

        {/* Copyright */}
        <div style={{ fontSize: '0.78rem', color: '#334155' }}>
          © {year} HotShot. All rights reserved.
        </div>
      </div>
    </footer>
  );
}