import { Link, useLocation } from 'react-router-dom';
import { Zap, LayoutDashboard, Home } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home', icon: <Home size={15} /> },
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={15} /> },
  ];

  return (
    <nav className="navbar">
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Zap size={17} color="#000000" fill="#000000" />
          </div>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '1.2rem',
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
            }}
          >
            HotShot
          </span>
        </Link>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {navLinks.map(({ to, label, icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '7px',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  color: active ? '#FFFFFF' : '#666666',
                  background: active ? '#1A1A1A' : 'transparent',
                  border: `1px solid ${active ? '#333333' : 'transparent'}`,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = '#AAAAAA';
                    e.currentTarget.style.background = '#141414';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = '#666666';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {icon}
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}