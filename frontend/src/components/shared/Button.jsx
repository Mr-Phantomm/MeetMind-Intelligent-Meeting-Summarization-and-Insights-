import React from 'react';

export function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  ...props
}) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontWeight: '500',
    borderRadius: 'var(--radius-md)',
    transition: 'all var(--transition-fast)',
    border: '1px solid transparent',
  };

  const sizeStyles = {
    sm: { padding: '0.35rem 0.75rem', fontSize: '0.85rem' },
    md: { padding: '0.5rem 1rem', fontSize: '0.95rem' },
    lg: { padding: '0.75rem 1.5rem', fontSize: '1.05rem' },
  };

  const variantStyles = {
    primary: {
      backgroundColor: 'var(--color-primary)',
      color: '#ffffff',
      borderColor: 'var(--color-primary)',
    },
    secondary: {
      backgroundColor: 'var(--color-surface)',
      color: 'var(--color-text-main)',
      borderColor: 'var(--color-border)',
    },
    danger: {
      backgroundColor: 'var(--color-danger)',
      color: '#ffffff',
      borderColor: 'var(--color-danger)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--color-primary)',
      borderColor: 'var(--color-primary)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-text-muted)',
      borderColor: 'transparent',
    },
  };

  const style = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
    opacity: disabled || loading ? 0.6 : 1,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
  };

  return (
    <button
      type={type}
      style={style}
      disabled={disabled || loading}
      onClick={onClick}
      className={`btn btn-${variant} ${className}`}
      {...props}
    >
      {loading && (
        <span
          style={{
            display: 'inline-block',
            width: '14px',
            height: '14px',
            border: '2px solid currentColor',
            borderRightColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.7s linear infinite',
          }}
        />
      )}
      {children}
    </button>
  );
}
