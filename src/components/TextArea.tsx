import React, { useRef, useEffect } from 'react';

interface TextAreaProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

export function TextArea({ name, value, onChange, placeholder, required, rows = 4 }: TextAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="
          w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
          border-2 border-gray-200 dark:border-gray-700 rounded-xl resize-none
          transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/20
          focus:border-indigo-500 dark:focus:border-indigo-400
          placeholder-gray-500 dark:placeholder-gray-400
          hover:border-gray-300 dark:hover:border-gray-600
        "
        style={{ minHeight: `${rows * 1.5}rem` }}
      />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 peer-focus:opacity-100 pointer-events-none" />
    </div>
  );
}