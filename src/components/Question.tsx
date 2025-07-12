import React from 'react';

interface QuestionProps {
  number: number;
  text: string;
  required?: boolean;
  keyAspects?: string;
  children: React.ReactNode;
  error?: boolean;
}

export function Question({ number, text, required, keyAspects, children, error }: QuestionProps) {
  return (
    <div className={`bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 transition-all duration-300 ${error ? 'ring-2 ring-red-500 bg-red-50 dark:bg-red-900/20' : ''}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {number}. {text}
          {required && <span className="text-red-500 ml-1">*</span>}
        </h3>
        {keyAspects && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-l-4 border-indigo-500 p-4 rounded-r-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Key Aspects to Consider:</span> {keyAspects}
            </p>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}