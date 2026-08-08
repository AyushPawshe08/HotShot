import { useEffect, useRef, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const ICONS = {
  success: <CheckCircle size={18} color="#10B981" />,
  error: <XCircle size={18} color="#EF4444" />,
  warning: <AlertCircle size={18} color="#F59E0B" />,
  info: <Info size={18} color="#3B82F6" />,
};

/**
 * Individual Toast item
 */
function ToastItem({ toast, onRemove }) {
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => onRemove(toast.id), toast.duration ?? 3500);
    return () => clearTimeout(timerRef.current);
  }, [toast.id, toast.duration, onRemove]);

  return (
    <div
      className={`toast ${toast.type}`}
      style={{ position: 'relative' }}
    >
      {ICONS[toast.type] || ICONS.info}
      <span style={{ flex: 1, lineHeight: 1.4 }}>{toast.message}</span>
      <button
        onClick={() => onRemove(toast.id)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#64748B',
          display: 'flex',
          padding: '2px',
          borderRadius: '4px',
          transition: 'color 0.2s',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#F8FAFC')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}
      >
        <X size={14} />
      </button>
    </div>
  );
}

/**
 * Toast container — renders the list of toasts
 */
export default function ToastContainer({ toasts, onRemove }) {
  const handleRemove = useCallback((id) => {
    onRemove(id);
  }, [onRemove]);

  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onRemove={handleRemove} />
      ))}
    </div>
  );
}
