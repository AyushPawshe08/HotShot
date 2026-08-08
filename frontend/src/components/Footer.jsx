import { Zap } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: '1px solid #1E1E1E', background: '#080808', padding: '28px 24px' }}>
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        display: 'flex', flexWrap: 'wrap',
        alignItems: 'center', justifyContent: 'space-between', gap: '16px',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
          <div style={{
            width: '26px', height: '26px', borderRadius: '7px',
            background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={14} color="#000000" fill="#000000" />
          </div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#FFFFFF' }}>
            HotShot
          </span>
        </div>

        {/* Built by + links */}
        <div style={{ fontSize: '0.875rem', color: '#555555', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 }}>
          <span>Built by <strong style={{ color: '#CCCCCC', fontWeight: 600 }}>Ayush Pawshe</strong></span>
          <span style={{ color: '#2A2A2A' }}>·</span>
          <a
            href="https://github.com/AyushPawshe08"
            target="_blank" rel="noopener noreferrer"
            style={{ color: '#888888', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#888888')}
          >
            GitHub
          </a>
          <span style={{ color: '#2A2A2A' }}>·</span>
          <a
            href="https://www.linkedin.com/in/ayush-pawshe/"
            target="_blank" rel="noopener noreferrer"
            style={{ color: '#888888', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#888888')}
          >
            LinkedIn
          </a>
        </div>

        {/* Copyright */}
        <div style={{ fontSize: '0.75rem', color: '#333333' }}>
          © {year} HotShot
        </div>
      </div>
    </footer>
  );
}