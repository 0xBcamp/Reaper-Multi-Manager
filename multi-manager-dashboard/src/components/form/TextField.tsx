import React from 'react';
import Label from './Label';

interface ITextFieldProps {
  placeholder?: string;
  value?: string | number;
  onChange: (value: string | number) => void;
  label?: string;
  error?: string | null;
  type?: "text" | "number";
}

const TextField: React.FC<ITextFieldProps> = ({ placeholder = "", value = "", onChange, label, error, type }) => {
  return (
    <div className="relative">
      {label && <Label text={label} />} 
      
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`block w-full py-2 px-3 text-sm bg-white border ${error ? "border-red-400 hover:border-red-600" : "border-gray-300 hover:border-blue-400"} focus:border-blue-500 outline-none text-gray-500`}
      />
      
      {error && <div className="pl-1 mt-1 text-xs text-red-500">{error}</div>}
    </div>
  );
}

export default TextField;
