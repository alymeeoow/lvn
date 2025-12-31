import React from 'react';
import '../../assets/styles/button.css';
import { FiUser } from 'react-icons/fi';

const LoginButton = ({ 
  children = "Log In", 
  onClick, 
  variant = "default",
  size = "medium",
  fullWidth = false,
  disabled = false,
  loading = false,
  icon = null,
  className = "",
  ...props 
}) => {
  const variantClass = {
    default: '',
    outline: 'login-btn-outline',
    ghost: 'login-btn-ghost'
  }[variant] || '';
  
  const sizeClass = {
    small: 'login-btn-small',
    medium: '',
    large: 'login-btn-large'
  }[size] || '';
  
  const classes = [
    'login-btn',
    variantClass,
    sizeClass,
    fullWidth ? 'login-btn-full' : '',
    loading ? 'login-btn-loading' : '',
    icon ? 'login-btn-icon' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {icon && !loading && <span className="login-btn-icon-wrapper">{icon}</span>}
      {children}
    </button>
  );
};
export const HeaderLoginButton = () => {
  const handleLogin = () => {
    console.log('Login clicked');
  };
  
  return (
    <LoginButton 
      onClick={handleLogin}
      className="desktop-only"
      icon={<FiUser />}
    />
  );
};
export const FormLoginButton = ({ onSubmit, loading }) => {
  return (
    <LoginButton
      onClick={onSubmit}
      loading={loading}
      fullWidth
      size="large"
    >
      Sign In
    </LoginButton>
  );
};
export const OutlineLoginButton = ({ onClick }) => {
  return (
    <LoginButton
      variant="outline"
      onClick={onClick}
    >
      Log In
    </LoginButton>
  );
};

export default LoginButton;