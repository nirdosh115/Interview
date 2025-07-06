import React from 'react';

interface RadioOption {
  label: string;
  value: string;
}

interface AstroRadioProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const AstroRadio: React.FC<AstroRadioProps> = ({
  options,
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((option) => (
        <label
          key={option.value}
          className={`
            inline-flex items-center px-3 py-1.5 rounded-full cursor-pointer
            transition-colors duration-200 ease-in-out
            ${value === option.value
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          <input
            type="radio"
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="hidden"
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
};
