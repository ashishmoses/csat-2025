import React from 'react';
import { ChevronRight } from 'lucide-react';

interface SurveySectionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function SurveySection({ title, children, icon }: SurveySectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200/50 dark:border-gray-600/50">
        <div className="flex items-center space-x-3">
          {icon && (
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
              {icon}
            </div>
          )}
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex-1">
            {title}
          </h2>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      <div className="p-6 space-y-8">
        {children}
      </div>
    </div>
  );
}