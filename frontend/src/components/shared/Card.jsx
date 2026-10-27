import React from 'react';

export function Card({
  children,
  title,
  subtitle,
  action,
  className = '',
  style = {},
}) {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        padding: 'var(--space-lg)',
        ...style,
      }}
      className={`card ${className}`}
    >
      {(title || action) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-md)',
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: 'var(--space-sm)',
          }}
        >
          <div>
            {title && (
              <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                {subtitle}
              </p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
