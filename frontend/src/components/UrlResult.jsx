import { useState } from 'react';
import {
  Link2, Copy, Download, RotateCcw, Calendar,
  Clock, CheckCircle, ExternalLink, QrCode,
} from 'lucide-react';

const fmt = (d) => {
  if (!d) return '—';
  try {
    return new Date(d).toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch { return d; }
};

const labelStyle = {
  fontSize: '0.7rem',
  color: '#475569',
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  marginBottom: '6px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
};

export default function UrlResult({ data, onShortenAnother, onCopy, onDownload }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.short_url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      onCopy?.();
    } catch { onCopy?.(true); }
  };

  const qrSrc = data.qr_code_path
    ? (data.qr_code_path.startsWith('http') || data.qr_code_path.startsWith('data:'))
      ? data.qr_code_path
      : `http://localhost:8000/${data.qr_code_path}`
    : null;

  const handleDownload = () => {
    if (!qrSrc) return;
    const a = document.createElement('a');
    a.href = qrSrc;
    a.download = `qr-${data.short_url?.split('/').pop() || 'code'}.png`;
    a.click();
    onDownload?.();
  };

  return (
    <div style={{ padding: '0 24px 80px', maxWidth: '640px', margin: '0 auto' }} className="animate-fadeInUp">
      <div className="card-raised" style={{ padding: 'clamp(22px, 4vw, 36px)' }}>

        {/* Success header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div
            style={{
              width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
              background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <CheckCircle size={19} color="#10B981" />
          </div>
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: '#F1F5F9', fontSize: '1.1rem' }}>
              Link Created!
            </div>
            <div style={{ fontSize: '0.78rem', color: '#475569' }}>Your short URL is ready to share</div>
          </div>
        </div>

        <div className="divider" />

        {/* Body */}
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>

          {/* Info column */}
          <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '18px' }}>

            {/* Short URL */}
            <div>
              <div style={labelStyle}><Link2 size={11} color="#7C3AED" /> Short URL</div>
              <div className="short-url-pill">
                <a
                  href={data.short_url} target="_blank" rel="noopener noreferrer"
                  className="truncate-url"
                  style={{ flex: 1, color: '#A78BFA', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}
                >
                  {data.short_url}
                </a>
                <ExternalLink size={13} color="#7C3AED" style={{ flexShrink: 0 }} />
              </div>
            </div>

            {/* Original URL */}
            <div>
              <div style={labelStyle}>Original URL</div>
              <div className="truncate-url" style={{ color: '#64748B', fontSize: '0.82rem' }}>
                {data.original_url}
              </div>
            </div>

            {/* Dates */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <div style={labelStyle}><Calendar size={10} /> Created</div>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{fmt(data.created_at)}</div>
              </div>
              <div>
                <div style={labelStyle}><Clock size={10} /> Expires</div>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{fmt(data.expired_at)}</div>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                id="copy-url-btn"
                onClick={handleCopy}
                className="btn-secondary"
                style={{
                  flex: 1, justifyContent: 'center',
                  ...(copied && { background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.25)', color: '#34D399' }),
                }}
              >
                {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy URL'}
              </button>
              {qrSrc && (
                <button id="download-qr-btn" onClick={handleDownload} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  <Download size={14} /> Download QR
                </button>
              )}
            </div>
          </div>

          {/* QR column */}
          {qrSrc && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={labelStyle}><QrCode size={11} /> QR Code</div>
              <div className="qr-wrapper">
                <img src={qrSrc} alt="QR Code" style={{ width: '120px', height: '120px', display: 'block', borderRadius: '5px' }} />
              </div>
            </div>
          )}
        </div>

        <div className="divider" />

        <button
          id="shorten-another-btn"
          onClick={onShortenAnother}
          className="btn-secondary"
          style={{ width: '100%', justifyContent: 'center', padding: '11px' }}
        >
          <RotateCcw size={15} /> Shorten Another URL
        </button>
      </div>
    </div>
  );
}