import React from 'react';

interface ILabelProps {
  text: string;
  htmlFor?: string;
  className?: string;
}

const Label: React.FC<ILabelProps> = ({ text, htmlFor, className }) => {
  return (
    <label className={`text-sm font-medium text-gray-400 ${className}`} htmlFor={htmlFor}>
      {text}
    </label>
  );
}

export default Label;
