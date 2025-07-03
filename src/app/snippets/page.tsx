'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import SnippetCard from '@/components/SnippetCard';
import { Snippet } from '@/types/snippet';

function SnippetListContent() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [filteredSnippets, setFilteredSnippets] = useState<Snippet[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);

  useEffect(() => {
    const fetchSnippets = async () => {
        const { data, error } = await supabase
            .from('snippets')
            .select('*');
        if (error) console.error(error);
        const snippetsData = data || [];
        setSnippets(snippetsData);
        
        const allLanguages = snippetsData
          .map(snippet => snippet.language)
          .filter((language): language is string => !!language)
          .filter((language, index, arr) => arr.indexOf(language) === index)
          .sort();
        setAvailableLanguages(allLanguages);
    };
    fetchSnippets();
  }, []);

  useEffect(() => {
    if (selectedLanguage) {
      const filtered = snippets.filter(snippet => 
        snippet.language === selectedLanguage
      );
      setFilteredSnippets(filtered);
    } else {
      setFilteredSnippets(snippets);
    }
  }, [snippets, selectedLanguage]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 theme-transition">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Snippets</h1>
          <Link
            href="/snippets/new"
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Create New Snippet
          </Link>
        </div>

        {/* Language Filter */}
        {availableLanguages.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4 flex-shrink-0">
                <label htmlFor="language-filter" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Filter:
                </label>
                <select
                  id="language-filter"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                >
                  <option value="">All snippets</option>
                  {availableLanguages.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
                {selectedLanguage && (
                  <button
                    onClick={() => setSelectedLanguage('')}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    Clear filter
                  </button>
                )}
              </div>
              <div className="flex-1 flex justify-end">
                <input
                  type="text"
                  placeholder="Search snippets..."
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 w-full max-w-xs"
                  onChange={(e) => {
                    const searchTerm = e.target.value.toLowerCase();
                    setFilteredSnippets(snippets.filter(snippet => 
                      snippet.title.toLowerCase().includes(searchTerm) ||
                      (snippet.language && snippet.language.toLowerCase().includes(searchTerm))
                    ));
                  }}
                />
              </div>
            </div>
          </div>
        )}
        
        {filteredSnippets.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center theme-transition">
            {snippets.length === 0 ? (
              <>
                <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No snippets yet</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating your first snippet.</p>
                <div className="mt-6">
                  <Link
                    href="/snippets/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                  >
                    Create Snippet
                  </Link>
                </div>
              </>
            ) : (
              <>
                <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No snippets found</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {selectedLanguage ? `No snippets found with language "${selectedLanguage}"` : 'No snippets match your filter'}
                </p>
                {selectedLanguage && (
                  <div className="mt-6">
                    <button
                      onClick={() => setSelectedLanguage('')}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                    >
                      Clear filter
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredSnippets.map((snippet) => (
              <SnippetCard 
                key={snippet.id} 
                snippet={snippet} 
                onLanguageClick={(language) => setSelectedLanguage(language)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default function SnippetListPage() {
  return (
    <ProtectedRoute>
      <SnippetListContent />
    </ProtectedRoute>
  );
}