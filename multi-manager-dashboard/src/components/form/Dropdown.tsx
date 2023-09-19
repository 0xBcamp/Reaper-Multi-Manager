import React, { useEffect, useRef, useState } from 'react';
import Label from './Label';

export type DropdownOptionType = {
  label: string;
  key: string;
};

interface IDropdownProps {
  options: DropdownOptionType[];
  placeholder?: string;
  selectedKey?: string;
  onChange: (key: string) => void;
  label?: string;
  error?: string | null;
}

const Dropdown: React.FC<IDropdownProps> = ({ options, placeholder = "Select...", selectedKey, onChange, label, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOptionType | undefined>();

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setSelectedOption(options.find(x => x.key === selectedKey));
  }, [selectedKey, options])

  const handleSelect = (option: DropdownOptionType) => {
    onChange(option.key);
    setIsOpen(false);
  };

  return (
    <div className="relative w-64 z-50" ref={dropdownRef}>
      {label && <Label text={label} />} 
      <div className={`flex items-center border bg-white ${error ? "border-red-400 hover:border-red-600" : "focus:border-blue-400 hover:border-blue-600"}`}>
        <input
          readOnly
          value={selectedOption ? selectedOption.label : ""}
          placeholder={placeholder}
          onClick={() => setIsOpen(!isOpen)}
          className={`flex-1 py-2 px-3 text-sm bg-transparent outline-none text-gray-500 cursor-pointer`}
        />
        <svg
          onClick={() => setIsOpen(!isOpen)}
          className="w-4 h-4 mr-2 cursor-pointer transform transition-transform duration-200 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
      {error && <div className="pl-1 mt-1 text-xs text-red-500">{error}</div>}
      {isOpen && (
        <div className="absolute w-full bg-white border border-gray-300">
          {options.map(option => (
            <div
              key={option.key}
              onClick={() => handleSelect(option)}
              className="py-2 px-2 hover:bg-gray-200 cursor-pointer text-sm text-gray-500"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
