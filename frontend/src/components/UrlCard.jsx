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
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch { return d; }
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
    setClicks((p) => p + 1);
    try {
      const stored = JSON.parse(localStorage.getItem('urls') || '[]');
      const updated = stored.map((item) =>
        item.id === data.id ? { ...item, clicks: (item.clicks || 0) + 1 } : item
      );
      localStorage.setItem('urls', JSON.stringify(updated));
    } catch {}
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.short_url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
      onCopy?.();
    } catch { onCopy?.(true); }
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
        background: '#111111',
        border: '1px solid #2A2A2A',
        borderRadius: '12px',
        width: '100%',
        minWidth: 0,
        boxSizing: 'border-box',
      }}
    >
      {/* Left: QR + badges */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '170px' }}>
        {qrSrc ? (
          <div className="qr-wrapper" style={{ flexShrink: 0 }}>
            <img src={qrSrc} alt="QR" style={{ width: '52px', height: '52px', display: 'block', borderRadius: '3px' }} />
          </div>
        ) : (
          <div style={{
            width: '52px', height: '52px', borderRadius: '8px',
            background: '#1A1A1A', border: '1px solid #2A2A2A',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <QrCode size={20} color="#444444" />
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span className="badge" style={{
            background: expired ? '#1A1A1A' : '#1A1A1A',
            color: expired ? '#777777' : '#CCCCCC',
            border: `1px solid ${expired ? '#333333' : '#444444'}`,
            padding: '3px 10px', fontSize: '0.7rem', alignSelf: 'flex-start',
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: expired ? '#555555' : '#AAAAAA', display: 'inline-block' }} />
            {expired ? 'Expired' : 'Active'}
          </span>
          <span className="badge" style={{
            background: '#1A1A1A', color: '#888888',
            border: '1px solid #2A2A2A', padding: '3px 10px', fontSize: '0.7rem', alignSelf: 'flex-start',
          }}>
            <MousePointerClick size={11} color="#888888" />
            {clicks} {clicks === 1 ? 'click' : 'clicks'}
          </span>
        </div>
      </div>

      {/* Middle: URLs */}
      <div style={{ flex: '1 1 300px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{
          background: '#1A1A1A', border: '1px solid #333333', borderRadius: '8px',
          padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '10px',
          minWidth: 0, overflow: 'hidden',
        }}>
          <Link2 size={13} color="#888888" style={{ flexShrink: 0 }} />
          <a
            href={data.short_url} target="_blank" rel="noopener noreferrer"
            onClick={handleLinkClick} className="truncate-url"
            style={{ color: '#EEEEEE', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', flex: 1, minWidth: 0 }}
          >
            {data.short_url}
          </a>
          <a
            href={data.short_url} target="_blank" rel="noopener noreferrer"
            onClick={handleLinkClick} title="Open link"
            style={{ color: '#666666', display: 'flex', alignItems: 'center', flexShrink: 0 }}
          >
            <ExternalLink size={13} />
          </a>
        </div>
        <div className="truncate-url" title={data.original_url} style={{ color: '#555555', fontSize: '0.8rem', paddingLeft: '4px' }}>
          <span style={{ color: '#444444', fontWeight: 600, marginRight: '6px' }}>Target:</span>
          {data.original_url}
        </div>
      </div>

      {/* Dates */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '6px',
        padding: '8px 14px', background: '#1A1A1A',
        borderRadius: '8px', border: '1px solid #2A2A2A',
        minWidth: '160px', fontSize: '0.75rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <span style={{ color: '#555555', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
            <Calendar size={11} color="#555555" /> Created
          </span>
          <span style={{ color: '#AAAAAA', fontWeight: 500 }}>{fmtDate(data.created_at)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <span style={{ color: '#555555', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
            <Clock size={11} color="#555555" /> Expires
          </span>
          <span style={{ color: expired ? '#888888' : '#AAAAAA', fontWeight: 500 }}>{fmtDate(data.expired_at)}</span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <button onClick={handleCopy} className="btn-secondary" style={{
          padding: '8px 14px', fontSize: '0.8rem',
          background: copied ? '#222222' : undefined,
          borderColor: copied ? '#444444' : undefined,
          color: copied ? '#FFFFFF' : undefined,
        }}>
          {copied ? <CheckCircle size={13} /> : <Copy size={13} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
        {qrSrc && (
          <button onClick={handleDownload} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.8rem' }}>
            <Download size={13} /> QR
          </button>
        )}
        <button onClick={() => onDelete?.(data.id)} className="btn-danger" title="Delete" style={{ padding: '8px 12px', fontSize: '0.8rem' }}>
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}
