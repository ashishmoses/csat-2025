import React from 'react';
import { MessageSquare } from 'lucide-react';

interface RatingScaleProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  onLowRating?: (value: string) => void;
  lowRatingExample?: string;
  onEditLowRating?: () => void;
  includeNA?: boolean;
  required?: boolean;
}

export function RatingScale({ 
  name, 
  value, 
  onChange, 
  onLowRating, 
  lowRatingExample, 
  onEditLowRating, 
  includeNA, 
  required 
}: RatingScaleProps) {
  const ratings = [
    { value: '1', label: 'Below Expectations', color: 'from-red-500 to-red-600' },
    { value: '2', label: 'Mostly Meets Expectations', color: 'from-orange-500 to-orange-600' },
    { value: '3', label: 'Meets Expectations', color: 'from-yellow-500 to-yellow-600' },
    { value: '4', label: 'Exceeds Expectations', color: 'from-blue-500 to-blue-600' },
    { value: '5', label: 'Significantly Exceeds Expectations', color: 'from-green-500 to-green-600' },
  ];

  const handleChange = (ratingValue: string) => {
    if ((ratingValue === '1' || ratingValue === '2') && onLowRating) {
      onLowRating(ratingValue);
    } else {
      onChange(ratingValue);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2">
        {ratings.map((rating) => (
          <label
            key={rating.value}
            className={`
              relative cursor-pointer group transition-all duration-300 transform hover:scale-105
              ${value === rating.value ? 'scale-105' : ''}
            `}
          >
            <input
              type="radio"
              name={name}
              value={rating.value}
              checked={value === rating.value}
              onChange={(e) => handleChange(e.target.value)}
              className="sr-only"
              required={required}
            />
            <div
              className={`
                p-3 rounded-lg border-2 transition-all duration-300 h-20 flex flex-col items-center justify-center relative
                ${
                  value === rating.value
                    ? `bg-gradient-to-r ${rating.color} text-white border-transparent shadow-lg`
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500'
                }
              `}
            >
              {(rating.value === '1' || rating.value === '2') && lowRatingExample && value === rating.value && (
                <div className="absolute -top-1 -right-1">
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <MessageSquare size={10} className="text-white" />
                  </div>
                </div>
              )}
              <div
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold mb-1 flex-shrink-0
                  ${
                    value === rating.value
                      ? 'bg-white text-gray-900 border-white'
                      : 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'
                  }
                `}
              >
                {rating.value}
              </div>
              <span className={`text-xs font-medium text-center leading-tight flex-1 ${value === rating.value ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                {rating.label}
              </span>
            </div>
          </label>
        ))}
        
        {includeNA && (
          <label className="relative cursor-pointer group transition-all duration-300 transform hover:scale-105">
            <input
              type="radio"
              name={name}
              value="N/A"
              checked={value === 'N/A'}
              onChange={(e) => onChange(e.target.value)}
              className="sr-only"
              required={required}
            />
            <div
              className={`
                p-3 rounded-lg border-2 transition-all duration-300 h-20 flex flex-col items-center justify-center
                ${
                  value === 'N/A'
                    ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white border-transparent shadow-lg'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500'
                }
              `}
            >
              <div
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold mb-1 flex-shrink-0
                  ${
                    value === 'N/A'
                      ? 'bg-white text-gray-900 border-white'
                      : 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'
                  }
                `}
              >
                N/A
              </div>
              <span className={`text-xs font-medium text-center leading-tight flex-1 ${value === 'N/A' ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                Not Applicable
              </span>
            </div>
          </label>
        )}
      </div>

      {/* Low Rating Comment Display */}
      {(value === '1' || value === '2') && lowRatingExample && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <MessageSquare size={16} className="text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Rating {value} - Additional Feedback
                </h4>
                <button
                  type="button"
                  onClick={onEditLowRating}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium"
                >
                  Edit
                </button>
              </div>
              <p className="text-sm text-blue-800 dark:text-blue-200 break-words">
                {lowRatingExample.length > 100 
                  ? `${lowRatingExample.substring(0, 100)}...` 
                  : lowRatingExample
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}