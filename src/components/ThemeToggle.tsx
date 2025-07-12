import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'light' as const, icon: Sun, label: 'Light' },
    { value: 'dark' as const, icon: Moon, label: 'Dark' },
    { value: 'system' as const, icon: Monitor, label: 'System' },
  ];

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="flex items-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl p-1 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
        {themes.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={`p-3 rounded-xl transition-all duration-300 ${
              theme === value
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-110'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            title={label}
          >
            <Icon size={18} />
          </button>
        ))}
      </div>
    </div>
  );
}