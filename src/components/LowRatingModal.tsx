import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface LowRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (example: string) => void;
  rating: string;
}

export function LowRatingModal({ isOpen, onClose, onSubmit, rating }: LowRatingModalProps) {
  const [example, setExample] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setExample('');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (example.trim()) {
      onSubmit(example.trim());
      onClose();
    }
  };

  const handleCancel = () => {
    setExample('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleCancel}
      />
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Please provide specific examples
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Rating: {rating} out of 5
              </p>
            </div>
            <button
              onClick={handleCancel}
              className="ml-auto p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Since you selected a rating of {rating}, please provide specific examples to help us understand and improve:
          </p>
          
          <textarea
            id="lowRatingTextarea"
            value={example}
            onChange={(e) => setExample(e.target.value)}
            placeholder="Please provide specific examples..."
            rows={4}
            className="
              w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700
              border-2 border-gray-200 dark:border-gray-600 rounded-xl resize-none
              transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/20
              focus:border-indigo-500 dark:focus:border-indigo-400
              placeholder-gray-500 dark:placeholder-gray-400
            "
            autoFocus
          />
          
          <div className="flex space-x-3 mt-6">
            <button
              onClick={handleCancel}
              className="
                flex-1 px-4 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700
                rounded-xl font-medium transition-all duration-300
                hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300/50
              "
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!example.trim()}
              className="
                flex-1 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white
                rounded-xl font-medium transition-all duration-300 transform
                hover:from-indigo-600 hover:to-purple-700 hover:scale-105
                focus:outline-none focus:ring-4 focus:ring-indigo-500/50
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
              "
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}