import { useState } from 'react';
import {
  Copy, Download, Trash2, ExternalLink,
  CheckCircle, Calendar, Clock, Link2, QrCode,
  MousePointerClick,
} from 'lucide-react';

const fmtDate = (d) => {
  if (!d) return 'Never';
  try {
    return new Date(d).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return d;
  }
};

const isExpired = (dt) => dt && new Date(dt) < new Date();

export default function UrlCard({ data, onDelete, onCopy, onDownload }) {
  const [copied, setCopied] = useState(false);
  const [clicks, setClicks] = useState(data.clicks ?? 0);
  const expired = isExpired(data.expired_at);

  const qrSrc = data.qr_code_path
    ? (data.qr_code_path.startsWith('http') || data.qr_code_path.startsWith('data:'))
      ? data.qr_code_path
      : `http://localhost:8000/${data.qr_code_path}`
    : null;

  const handleLinkClick = () => {
    setClicks((prev) => prev + 1);
    // Update local storage entry as well
    try {
      const stored = JSON.parse(localStorage.getItem('urls') || '[]');
      const updated = stored.map((item) =>
        item.id === data.id ? { ...item, clicks: (item.clicks || 0) + 1 } : item
      );
      localStorage.setItem('urls', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.short_url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
      onCopy?.();
    } catch {
      onCopy?.(true);
    }
  };

  const handleDownload = () => {
    if (!qrSrc) return;
    const a = document.createElement('a');
    a.href = qrSrc;
    a.download = `qr-${data.short_url?.split('/').pop() || 'code'}.png`;
    a.click();
    onDownload?.();
  };

  return (
    <div
      className="card url-card"
      style={{
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        background: '#111827',
        border: '1px solid #1E293B',
        borderRadius: '14px',
        width: '100%',
        minWidth: 0,
        boxSizing: 'border-box',
      }}
    >
      {/* Left Block: QR Thumbnail + Status Badges */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '180px' }}>
        {/* QR Code thumbnail */}
        {qrSrc ? (
          <div
            className="qr-wrapper"
            style={{
              padding: '4px',
              borderRadius: '8px',
              background: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              flexShrink: 0,
            }}
          >
            <img
              src={qrSrc}
              alt="QR Code"
              style={{ width: '56px', height: '56px', display: 'block', borderRadius: '4px' }}
            />
          </div>
        ) : (
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '8px',
              background: '#1A2235',
              border: '1px solid #1E293B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <QrCode size={22} color="#475569" />
          </div>
        )}

        {/* Status + Clicks stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {/* Active / Expired badge */}
          <span
            className="badge"
            style={{
              background: expired ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
              color: expired ? '#F87171' : '#34D399',
              border: `1px solid ${expired ? 'rgba(239,68,68,0.25)' : 'rgba(16,185,129,0.25)'}`,
              padding: '3px 10px',
              fontSize: '0.72rem',
              alignSelf: 'flex-start',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: expired ? '#EF4444' : '#10B981',
                display: 'inline-block',
              }}
            />
            {expired ? 'Expired' : 'Active'}
          </span>

          {/* Clicks counter badge */}
          <span
            className="badge"
            style={{
              background: 'rgba(124, 58, 237, 0.1)',
              color: '#A78BFA',
              border: '1px solid rgba(124, 58, 237, 0.25)',
              padding: '3px 10px',
              fontSize: '0.72rem',
              alignSelf: 'flex-start',
            }}
          >
            <MousePointerClick size={12} color="#A78BFA" />
            {clicks} {clicks === 1 ? 'click' : 'clicks'}
          </span>
        </div>
      </div>

      {/* Middle Block: Short Link + Original URL */}
      <div style={{ flex: '1 1 300px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {/* Shortened URL */}
        <div
          style={{
            background: 'rgba(124, 58, 237, 0.08)',
            border: '1px solid rgba(124, 58, 237, 0.2)',
            borderRadius: '9px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            minWidth: 0,
            overflow: 'hidden',
          }}
        >
          <Link2 size={14} color="#7C3AED" style={{ flexShrink: 0 }} />
          <a
            href={data.short_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            className="truncate-url"
            style={{
              color: '#A78BFA',
              fontWeight: 700,
              fontSize: '0.925rem',
              textDecoration: 'none',
              flex: 1,
              minWidth: 0,
            }}
          >
            {data.short_url}
          </a>
          <a
            href={data.short_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            title="Open link"
            style={{ color: '#7C3AED', display: 'flex', alignItems: 'center', flexShrink: 0 }}
          >
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Original Target URL */}
        <div
          className="truncate-url"
          title={data.original_url}
          style={{
            color: '#64748B',
            fontSize: '0.8rem',
            paddingLeft: '4px',
          }}
        >
          <span style={{ color: '#475569', fontWeight: 600, marginRight: '6px' }}>Target:</span>
          {data.original_url}
        </div>
      </div>

      {/* Dates Block */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          padding: '8px 14px',
          background: '#1A2235',
          borderRadius: '9px',
          border: '1px solid #1E293B',
          minWidth: '160px',
          fontSize: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <span style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
            <Calendar size={11} color="#64748B" /> Created
          </span>
          <span style={{ color: '#CBD5E1', fontWeight: 600 }}>{fmtDate(data.created_at)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <span style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
            <Clock size={11} color={expired ? '#EF4444' : '#64748B'} /> Expires
          </span>
          <span style={{ color: expired ? '#F87171' : '#CBD5E1', fontWeight: 600 }}>{fmtDate(data.expired_at)}</span>
        </div>
      </div>

      {/* Action Buttons Block */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <button
          onClick={handleCopy}
          className="btn-secondary"
          style={{
            padding: '8px 14px',
            fontSize: '0.8rem',
            background: copied ? 'rgba(16,185,129,0.1)' : undefined,
            borderColor: copied ? 'rgba(16,185,129,0.3)' : undefined,
            color: copied ? '#34D399' : undefined,
          }}
        >
          {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>

        {qrSrc && (
          <button
            onClick={handleDownload}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.8rem' }}
          >
            <Download size={14} />
            QR
          </button>
        )}

        <button
          onClick={() => onDelete?.(data.id)}
          className="btn-danger"
          title="Delete Link"
          style={{ padding: '8px 12px', fontSize: '0.8rem' }}
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
