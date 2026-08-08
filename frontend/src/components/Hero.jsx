import { Link } from 'react-router-dom';
import { Zap, ArrowRight, QrCode, Clock, Shield } from 'lucide-react';

const features = [
  { icon: <Zap size={18} color="#FFFFFF" />,   title: 'Instant Shortening', desc: 'Generate short links in milliseconds.' },
  { icon: <QrCode size={18} color="#AAAAAA" />, title: 'Auto QR Codes',    desc: 'Every link comes with a downloadable QR.' },
  { icon: <Clock size={18} color="#888888" />,  title: 'Expiry Control',   desc: 'Set TTL so links expire when you want.' },
  { icon: <Shield size={18} color="#AAAAAA" />, title: 'Custom Alias',     desc: 'Brand your links with memorable slugs.' },
];

export default function Hero() {
  return (
    <section
      className="hero-bg"
      style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px 60px',
        position: 'relative',
      }}
    >
      <div className="grid-lines" />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '820px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {/* Eyebrow badge */}
        <div
          className="animate-fadeInUp delay-1"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            padding: '5px 14px',
            borderRadius: '99px',
            background: '#111111',
            border: '1px solid #2A2A2A',
            marginBottom: '26px',
            color: '#666666',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
          }}
        >
          <Zap size={11} color="#FFFFFF" fill="#FFFFFF" />
          URL Shortener · QR Generator
        </div>

        {/* Headline */}
        <h1
          className="animate-fadeInUp delay-2"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.5rem, 6vw, 4.2rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            marginBottom: '20px',
          }}
        >
          Shorten URLs{' '}
          <span style={{ color: '#888888' }}>
            Instantly
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fadeInUp delay-3"
          style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
            color: '#555555',
            lineHeight: 1.7,
            marginBottom: '40px',
            maxWidth: '500px',
            margin: '0 auto 40px',
          }}
        >
          Create clean, shareable links with QR codes in seconds.
          Perfect for campaigns, portfolios, and professional sharing.
        </p>

        {/* CTA */}
        <div
          className="animate-fadeInUp delay-4"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '64px',
          }}
        >
          <a
            href="#url-form"
            className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
          >
            <Zap size={15} />
            Shorten a URL
            <ArrowRight size={14} />
          </a>
          <Link
            to="/dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 22px',
              borderRadius: '9px',
              textDecoration: 'none',
              color: '#666666',
              background: '#111111',
              border: '1px solid #2A2A2A',
              fontWeight: 500,
              fontSize: '0.925rem',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1A1A1A';
              e.currentTarget.style.color = '#AAAAAA';
              e.currentTarget.style.borderColor = '#3A3A3A';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#111111';
              e.currentTarget.style.color = '#666666';
              e.currentTarget.style.borderColor = '#2A2A2A';
            }}
          >
            View Dashboard
          </Link>
        </div>

        {/* Feature cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))',
            gap: '12px',
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              className={`card animate-fadeInUp delay-${i + 3}`}
              style={{
                padding: '18px',
                textAlign: 'left',
                transition: 'border-color 0.2s ease, transform 0.2s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#3A3A3A';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#2A2A2A';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ marginBottom: '10px' }}>{f.icon}</div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#EEEEEE',
                  marginBottom: '5px',
                }}
              >
                {f.title}
              </div>
              <div style={{ fontSize: '0.775rem', color: '#555555', lineHeight: 1.5 }}>
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}