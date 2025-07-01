'use client';

import { use, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import { Snippet } from '@/types/snippet';
import Toast from '@/components/Toast';

function SnippetDetailContent() {
  const params = useParams();
  const router = useRouter();
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const snippetId = params.id as string;

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const { data, error } = await supabase
          .from('snippets')
          .select('*')
          .eq('id', snippetId)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            setError('Snippet not found');
          } else {
            setError('Failed to load snippet');
          }
        } else {
          setSnippet(data);
        }
      } catch (err) {
        setError('An error occurred while loading the snippet');
      } finally {
        setLoading(false);
      }
    };

    if (snippetId) {
      fetchSnippet();
    }
  }, [snippetId]);

  const handleDelete = async () => {
    if (!snippet) return;

    if (!confirm('Are you sure you want to delete this snippet? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);
    try {
      const { error } = await supabase
        .from('snippets')
        .delete()
        .eq('id', snippet.id);

      if (error) throw error;
      router.push('/snippets');
    } catch (err: any) {
      setError(err.message || 'Failed to delete snippet');
    } finally {
      setDeleting(false);
    }
  };

  const copyToClipboard = async () => {
    if (!snippet) return;
    
    try {
      await navigator.clipboard.writeText(snippet.content);
      setToast({ message: 'Code copied to clipboard!', type: 'success' });
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      setToast({ message: 'Failed to copy to clipboard', type: 'error' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !snippet) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 theme-transition">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center theme-transition">
            <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Error</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{error || 'Snippet not found'}</p>
            <div className="mt-6">
              <Link
                href="/snippets"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                Back to Snippets
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 theme-transition">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow theme-transition">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{snippet.title}</h1>
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  {snippet.language && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                      {snippet.language}
                    </span>
                  )}
                  <span>Created {new Date(snippet.created_at).toLocaleDateString()}</span>
                  {snippet.updated_at && snippet.updated_at !== snippet.created_at && (
                    <span>Updated {new Date(snippet.updated_at).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={copyToClipboard}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </button>
                <Link
                  href={`/snippets/${snippet.id}/edit`}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
              <code>{snippet.content}</code>
            </pre>
          </div>
        </div>

        {/* Back to snippets */}
        <div className="mt-6">
          <Link
            href="/snippets"
            className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Snippets
          </Link>
        </div>
      </main>
      
      {/* Toast notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default function SnippetDetailPage() {
  return (
    <ProtectedRoute>
      <SnippetDetailContent />
    </ProtectedRoute>
  );
} 