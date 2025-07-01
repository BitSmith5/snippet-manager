'use client';
import { useTheme } from '@/lib/theme-context';
import { useState, useEffect } from 'react';

function ThemeTestContent() {
  const { theme, toggleTheme } = useTheme();
  const [documentClass, setDocumentClass] = useState('');

  useEffect(() => {
    setDocumentClass(document.documentElement.className);
  }, [theme]);

  return (
    <div className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        Current Theme: <span className="font-bold">{theme}</span>
      </div>
      <button
        onClick={toggleTheme}
        className="px-3 py-1 bg-indigo-600 dark:bg-indigo-500 text-white rounded text-sm hover:bg-indigo-700 dark:hover:bg-indigo-600"
      >
        Toggle Theme
      </button>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Document class: {documentClass}
      </div>
    </div>
  );
}

export default function ThemeTest() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Loading theme...
        </div>
      </div>
    );
  }

  return <ThemeTestContent />;
} 