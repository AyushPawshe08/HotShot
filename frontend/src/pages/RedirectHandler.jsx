import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export default function RedirectHandler() {
  const { shortcode } = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (shortcode) {
      // Clean target backend API endpoint
      const targetApiUrl = `${BASE_URL.replace(/\/$/, '')}/${shortcode}`;
      // Trigger native browser redirect so FastAPI handles 307 and click increment
      window.location.replace(targetApiUrl);
    }
  }, [shortcode]);

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 160px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        textAlign: 'center',
      }}
    >
      {!error ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div className="spinner" style={{ width: '36px', height: '36px', borderWidth: '3px' }} />
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: '#F1F5F9',
              fontSize: '1.25rem',
              fontWeight: 600,
            }}
          >
            Redirecting to destination…
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.875rem' }}>
            Please wait while HotShot processes your link.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <h2 style={{ color: '#F87171', fontSize: '1.2rem', fontWeight: 600 }}>{error}</h2>
          <a href="/" className="btn-primary" style={{ textDecoration: 'none', padding: '10px 20px', fontSize: '0.875rem' }}>
            Back to Home
          </a>
        </div>
      )}
    </div>
  );
}
