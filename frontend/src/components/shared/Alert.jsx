import React from 'react';

const alertStyles = {
  info: { bg: 'var(--color-info-light)', text: 'var(--color-info-text)', icon: 'ℹ️' },
  success: { bg: 'var(--color-success-light)', text: 'var(--color-success-text)', icon: '✅' },
  warning: { bg: 'var(--color-warning-light)', text: 'var(--color-warning-text)', icon: '⚠️' },
  error: { bg: 'var(--color-danger-light)', text: 'var(--color-danger-text)', icon: '🚨' },
};

export function Alert({ type = 'info', title, message, children, onClose }) {
  const current = alertStyles[type] || alertStyles.info;

  return (
    <div
      style={{
        backgroundColor: current.bg,
        color: current.text,
        padding: 'var(--space-md)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        marginBottom: 'var(--space-md)',
        fontSize: '0.9rem',
      }}
      role="alert"
    >
      <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{current.icon}</span>
      <div style={{ flex: 1 }}>
        {title && <strong style={{ display: 'block', marginBottom: '0.25rem' }}>{title}</strong>}
        {message && <p>{message}</p>}
        {children}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            color: 'inherit',
            fontWeight: 'bold',
            fontSize: '1rem',
            padding: '0 0.25rem',
          }}
          aria-label="Close alert"
        >
          ×
        </button>
      )}
    </div>
  );
}
