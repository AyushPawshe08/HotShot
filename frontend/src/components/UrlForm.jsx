import { useState } from 'react';
import { Link2, Tag, Clock, Zap } from 'lucide-react';
import { shortenUrl } from '../services/api';

export default function UrlForm({ onSuccess, onError }) {
  const [formData, setFormData] = useState({ original_url: '', custom_alias: '', expiry_hours: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.original_url.trim()) { onError('Please enter a URL.'); return; }
    try { new URL(formData.original_url); } catch {
      onError('Enter a valid URL (include https://).'); return;
    }

    setLoading(true);
    try {
      const payload = {
        original_url: formData.original_url.trim(),
        ...(formData.custom_alias.trim() && { custom_alias: formData.custom_alias.trim() }),
        ...(formData.expiry_hours && { expiry_hours: Number(formData.expiry_hours) }),
      };
      const result = await shortenUrl(payload);
      const stored = JSON.parse(localStorage.getItem('urls') || '[]');
      const entry = { ...result, original_url: formData.original_url.trim(), id: Date.now() };
      localStorage.setItem('urls', JSON.stringify([entry, ...stored]));
      setFormData({ original_url: '', custom_alias: '', expiry_hours: '' });
      onSuccess(entry);
    } catch (err) {
      onError(err?.response?.data?.detail || err?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="url-form" style={{ padding: '0 24px 80px', maxWidth: '640px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        <div className="card-raised" style={{ padding: 'clamp(24px, 5vw, 40px)' }}>

          {/* Header */}
          <div style={{ marginBottom: '28px' }}>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.35rem',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '6px',
              }}
            >
              Create Short Link
            </h2>
            <p style={{ color: '#555555', fontSize: '0.875rem' }}>
              Paste your long URL — we'll make it tiny.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Original URL */}
            <div>
              <label
                htmlFor="original_url"
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  color: '#666666', fontSize: '0.8rem', fontWeight: 600,
                  marginBottom: '7px', letterSpacing: '0.04em', textTransform: 'uppercase',
                }}
              >
                <Link2 size={13} color="#888888" />
                Original URL <span style={{ color: '#AAAAAA' }}>*</span>
              </label>
              <input
                id="original_url" name="original_url" type="text"
                className="input-field"
                placeholder="https://your-very-long-url.com/path/to/page"
                value={formData.original_url}
                onChange={handleChange} required
              />
            </div>

            {/* Alias + Expiry */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label
                  htmlFor="custom_alias"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    color: '#94A3B8', fontSize: '0.8rem', fontWeight: 600,
                    marginBottom: '7px', letterSpacing: '0.04em', textTransform: 'uppercase',
                  }}
                >
                   <Tag size={13} color="#888888" />
                  Alias
                  <span style={{ fontSize: '0.68rem', color: '#334155', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
                    optional
                  </span>
                </label>
                <input
                  id="custom_alias" name="custom_alias" type="text"
                  className="input-field" placeholder="my-brand"
                  value={formData.custom_alias} onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="expiry_hours"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    color: '#94A3B8', fontSize: '0.8rem', fontWeight: 600,
                    marginBottom: '7px', letterSpacing: '0.04em', textTransform: 'uppercase',
                  }}
                >
                   <Clock size={13} color="#888888" />
                  Expiry
                  <span style={{ fontSize: '0.68rem', color: '#334155', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
                    optional
                  </span>
                </label>
                <input
                  id="expiry_hours" name="expiry_hours" type="number"
                  min="1" max="8760" className="input-field" placeholder="24 hrs"
                  value={formData.expiry_hours} onChange={handleChange}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              id="shorten-btn" type="submit"
              className="btn-primary"
              disabled={loading}
              style={{
                width: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '9px', marginTop: '4px',
                opacity: loading ? 0.8 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
                padding: '14px',
                fontSize: '1rem',
              }}
            >
              {loading
                ? <><div className="spinner" /> Shortening…</>
                : <><Zap size={17} /> Shorten URL</>
              }
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
