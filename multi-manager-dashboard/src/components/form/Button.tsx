import React from 'react';

interface IButtonProps {
  text: string;
  variant?: 'contained' | 'outlined';
  color?: 'primary' | 'secondary' | 'default';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<IButtonProps> = ({ text, variant = 'contained', color = 'default', onClick, disabled, className }) => {
  let baseStyles = 'text-sm px-4 py-2 rounded font-medium focus:outline-none';
  let colorStyles: string;

  switch (color) {
    case 'primary':
      colorStyles = variant === 'contained' 
        ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500' 
        : 'border border-blue-600 text-blue-600 hover:bg-blue-100';
      break;
    case 'secondary':
      colorStyles = variant === 'contained' 
        ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500' 
        : 'border border-red-600 text-red-600 hover:bg-red-100';
      break;
    default:
      colorStyles = variant === 'contained' 
        ? 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500' 
        : 'border border-gray-600 text-gray-600 hover:bg-gray-100';
      break;
  }

  if (disabled) {
    baseStyles += ' cursor-not-allowed opacity-60';
  }

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${colorStyles} ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;
