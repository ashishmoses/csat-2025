import React from 'react';

interface Option {
  value: string;
  label: string;
  hasOther?: boolean;
}

interface MultipleChoiceProps {
  name: string;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  options: Option[];
  type?: 'radio' | 'checkbox';
  otherValue?: string;
  onOtherChange?: (value: string) => void;
  required?: boolean;
}

export function MultipleChoice({
  name,
  value,
  onChange,
  options,
  type = 'radio',
  otherValue = '',
  onOtherChange,
  required
}: MultipleChoiceProps) {
  const isSelected = (optionValue: string) => {
    if (type === 'checkbox') {
      return Array.isArray(value) && value.includes(optionValue);
    }
    return value === optionValue;
  };

  const handleChange = (optionValue: string, checked: boolean) => {
    if (type === 'checkbox') {
      const currentValues = Array.isArray(value) ? value : [];
      if (checked) {
        onChange([...currentValues, optionValue]);
      } else {
        onChange(currentValues.filter(v => v !== optionValue));
      }
    } else {
      onChange(optionValue);
    }
  };

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label
          key={option.value}
          className={`
            group relative cursor-pointer block transition-all duration-300 transform hover:scale-[1.02]
            ${isSelected(option.value) ? 'scale-[1.02]' : ''}
          `}
        >
          <div
            className={`
              p-4 rounded-xl border-2 transition-all duration-300
              ${
                isSelected(option.value)
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent shadow-lg'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500'
              }
            `}
          >
            <div className="flex items-center space-x-3">
              <input
                type={type}
                name={name}
                value={option.value}
                checked={isSelected(option.value)}
                onChange={(e) => handleChange(option.value, e.target.checked)}
                className="sr-only"
                required={required && type === 'radio'}
              />
              <div
                className={`
                  w-5 h-5 border-2 flex items-center justify-center transition-all duration-300
                  ${type === 'checkbox' ? 'rounded-md' : 'rounded-full'}
                  ${
                    isSelected(option.value)
                      ? 'bg-white border-white'
                      : 'border-gray-300 dark:border-gray-600'
                  }
                `}
              >
                {isSelected(option.value) && (
                  <div
                    className={`
                      ${type === 'checkbox' ? 'w-3 h-3 rounded-sm' : 'w-2.5 h-2.5 rounded-full'}
                      bg-gradient-to-r from-indigo-500 to-purple-600
                    `}
                  />
                )}
              </div>
              <span className={`text-sm font-medium flex-1 ${isSelected(option.value) ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                {option.label}
              </span>
              {option.hasOther && (
                <input
                  type="text"
                  value={otherValue}
                  onChange={(e) => onOtherChange?.(e.target.value)}
                  placeholder="Please specify..."
                  className={`
                    ml-3 px-3 py-2 text-sm rounded-lg border transition-all duration-300
                    ${
                      isSelected(option.value)
                        ? 'bg-white/20 border-white/30 text-white placeholder-white/70'
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100'
                    }
                    focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
                  `}
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>
          </div>
        </label>
      ))}
    </div>
  );
}