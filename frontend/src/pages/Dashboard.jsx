import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Zap,
  Trash2,
  RefreshCw,
} from 'lucide-react';
import UrlCard from '../components/UrlCard';
import ToastContainer from '../components/ToastContainer';
import { useToast } from '../hooks/useToast';
import { getUrlStats } from '../services/api';

/* ── Empty State SVG illustration ── */
function EmptyIllustration() {
  return (
    <svg
      width="180"
      height="140"
      viewBox="0 0 180 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.7 }}
    >
      <rect x="20" y="30" width="140" height="90" rx="14" fill="rgba(124,58,237,0.1)" stroke="rgba(124,58,237,0.25)" strokeWidth="1.5" />
      <rect x="34" y="50" width="60" height="8" rx="4" fill="rgba(124,58,237,0.3)" />
      <rect x="34" y="64" width="100" height="6" rx="3" fill="rgba(255,255,255,0.08)" />
      <rect x="34" y="76" width="80" height="6" rx="3" fill="rgba(255,255,255,0.06)" />
      <rect x="34" y="92" width="40" height="18" rx="6" fill="rgba(59,130,246,0.2)" stroke="rgba(59,130,246,0.3)" strokeWidth="1" />
      <circle cx="150" cy="22" r="18" fill="rgba(124,58,237,0.15)" stroke="rgba(124,58,237,0.3)" strokeWidth="1.5" />
      <path d="M143 22L148 27L157 17" stroke="#9F67FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <circle cx="30" cy="18" r="10" fill="rgba(59,130,246,0.12)" stroke="rgba(59,130,246,0.25)" strokeWidth="1" />
      <path d="M26 18H34M30 14V22" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [loadingStats, setLoadingStats] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const loadUrls = async () => {
    try {
      const stored = JSON.parse(localStorage.getItem('urls') || '[]');
      setUrls(stored);

      if (stored.length > 0) {
        setLoadingStats(true);
        const updated = await Promise.all(
          stored.map(async (item) => {
            try {
              const code = item.short_url?.split('/').pop();
              if (code) {
                const stats = await getUrlStats(code);
                return { ...item, clicks: stats.clicks };
              }
            } catch {
              // Return original item if backend fails
            }
            return item;
          })
        );
        localStorage.setItem('urls', JSON.stringify(updated));
        setUrls(updated);
        setLoadingStats(false);
      }
    } catch {
      setUrls([]);
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    loadUrls();
  }, []);

  const handleDelete = (id) => {
    const updated = urls.filter((u) => u.id !== id);
    localStorage.setItem('urls', JSON.stringify(updated));
    setUrls(updated);
    addToast('URL removed from dashboard.', 'info', 2500);
  };

  const handleCopy = (isError) => {
    if (isError) {
      addToast('Failed to copy. Please copy manually.', 'error');
    } else {
      addToast('Short URL copied!', 'success', 2000);
    }
  };

  const handleDownload = () => {
    addToast('QR Code downloaded!', 'success', 2000);
  };

  const handleClearAll = () => {
    if (window.confirm('Delete all saved URLs? This cannot be undone.')) {
      localStorage.removeItem('urls');
      setUrls([]);
      addToast('All URLs cleared.', 'info');
    }
  };

  return (
    <div
      className="page-enter"
      style={{
        minHeight: 'calc(100vh - 68px)',
        padding: '48px 24px 80px',
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '40px',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(59,130,246,0.3) 100%)',
                border: '1px solid rgba(124,58,237,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LayoutDashboard size={20} color="#C4B5FD" />
            </div>
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
                fontWeight: 700,
                color: '#F8FAFC',
                letterSpacing: '-0.02em',
              }}
            >
              My Dashboard
            </h1>
          </div>
          <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
            {urls.length > 0
              ? `${urls.length} shortened link${urls.length !== 1 ? 's' : ''} saved locally.`
              : 'Your shortened links will appear here.'}
          </p>
        </div>

        {/* Actions row */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={loadUrls}
            className="btn-secondary"
            title="Refresh click statistics"
          >
            <RefreshCw size={15} className={loadingStats ? 'animate-spin' : ''} />
            {loadingStats ? 'Syncing...' : 'Refresh Stats'}
          </button>
          {urls.length > 0 && (
            <button onClick={handleClearAll} className="btn-danger">
              <Trash2 size={15} />
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Stats row */}
      {urls.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '36px',
          }}
        >
          {[
            {
              label: 'Total Links',
              value: urls.length,
              color: '#9F67FF',
              bg: 'rgba(124,58,237,0.12)',
              border: 'rgba(124,58,237,0.2)',
            },
            {
              label: 'Total Clicks',
              value: urls.reduce((acc, u) => acc + (u.clicks || 0), 0),
              color: '#60A5FA',
              bg: 'rgba(59,130,246,0.12)',
              border: 'rgba(59,130,246,0.2)',
            },
            {
              label: 'Active Links',
              value: urls.filter(
                (u) => !u.expired_at || new Date(u.expired_at) >= new Date()
              ).length,
              color: '#34D399',
              bg: 'rgba(16,185,129,0.1)',
              border: 'rgba(16,185,129,0.2)',
            },
            {
              label: 'Expired Links',
              value: urls.filter(
                (u) => u.expired_at && new Date(u.expired_at) < new Date()
              ).length,
              color: '#FCA5A5',
              bg: 'rgba(239,68,68,0.1)',
              border: 'rgba(239,68,68,0.2)',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: stat.bg,
                border: `1px solid ${stat.border}`,
                borderRadius: '12px',
                padding: '14px 22px',
                minWidth: '130px',
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: stat.color,
                  lineHeight: 1.1,
                  marginBottom: '4px',
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      {urls.length === 0 ? (
        /* ── Empty State ── */
        <div className="empty-state animate-fadeInUp">
          <EmptyIllustration />
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#F8FAFC',
              marginTop: '28px',
              marginBottom: '12px',
            }}
          >
            No URLs created yet.
          </h2>
          <p
            style={{
              color: '#64748B',
              fontSize: '0.95rem',
              marginBottom: '30px',
              maxWidth: '360px',
              lineHeight: 1.6,
            }}
          >
            Head over to the home page to shorten your first link and it will appear here.
          </p>
          <Link
            to="/"
            className="btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={17} />
              Shorten Your First URL
            </span>
          </Link>
        </div>
      ) : (
        /* ── Cards Grid ── */
        <div className="cards-grid">
          {urls.map((url) => (
            <UrlCard
              key={url.id}
              data={url}
              onDelete={handleDelete}
              onCopy={handleCopy}
              onDownload={handleDownload}
            />
          ))}
        </div>
      )}
    </div>
  );
}
