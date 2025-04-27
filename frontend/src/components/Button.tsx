// src/components/Button.tsx
import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`button button--${variant} button--${size} ${fullWidth ? 'button--full-width' : ''} ${className}`}
      {...props}
    >
      {icon && <span className="button__icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;