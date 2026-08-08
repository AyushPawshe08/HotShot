import { useState } from 'react';
import Hero from '../components/Hero';
import UrlForm from '../components/UrlForm';
import UrlResult from '../components/UrlResult';
import { useToast } from '../hooks/useToast';
import ToastContainer from '../components/ToastContainer';

export default function Home() {
  const [result, setResult] = useState(null);
  const { toasts, addToast, removeToast } = useToast();

  const handleSuccess = (data) => {
    setResult(data);
    addToast('🎉 URL shortened successfully!', 'success');
  };

  const handleError = (msg) => {
    addToast(msg, 'error');
  };

  const handleShortenAnother = () => {
    setResult(null);
  };

  const handleCopy = (isError) => {
    if (isError) {
      addToast('Failed to copy. Please copy manually.', 'error');
    } else {
      addToast('Short URL copied to clipboard!', 'success', 2500);
    }
  };

  const handleDownload = () => {
    addToast('QR Code downloaded!', 'success', 2500);
  };

  return (
    <div
      className="page-enter"
      style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 68px)' }}
    >
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Hero always visible */}
      <Hero />

      {/* Form OR Result */}
      <div style={{ position: 'relative' }}>
        {result ? (
          <UrlResult
            data={result}
            onShortenAnother={handleShortenAnother}
            onCopy={handleCopy}
            onDownload={handleDownload}
          />
        ) : (
          <UrlForm onSuccess={handleSuccess} onError={handleError} />
        )}
      </div>
    </div>
  );
}
