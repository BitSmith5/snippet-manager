'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Header from './Header';
import { Snippet, createSnippetSchema, updateSnippetSchema } from '@/types/snippet';
import { validateData } from '@/lib/validation';

type SnippetFormProps = {
  snippet?: Snippet;
  mode: 'create' | 'edit';
};

export default function SnippetForm({ snippet, mode }: SnippetFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(snippet?.title || '');
  const [content, setContent] = useState(snippet?.content || '');
  const [language, setLanguage] = useState(snippet?.language || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // UI-level required check
    if (!title.trim() || !content.trim()) {
      setError('Title and code content are required.');
      setLoading(false);
      return;
    }

    // Prepare form data
    const formData = {
      title: title.trim(),
      content: content.trim(),
      language: language.trim() || undefined,
    };

    // Validate form data using Zod
    const schema = mode === 'create' ? createSnippetSchema : updateSnippetSchema;
    const validation = validateData(schema, formData);

    if (!validation.success) {
      setError(validation.error);
      setLoading(false);
      return;
    }

    try {
      if (mode === 'create') {
        const { data, error } = await supabase
          .from('snippets')
          .insert([
            {
              ...validation.data,
              language: validation.data.language || null,
              user_id: (await supabase.auth.getUser()).data.user?.id,
            }
          ])
          .select()
          .single();

        if (error) throw error;
        router.push(`/snippets/${data.id}`);
      } else {
        const user = (await supabase.auth.getUser()).data.user;
        const { error } = await supabase
          .from('snippets')
          .update({
            ...validation.data,
            language: validation.data.language || null
          })
          .eq('id', snippet!.id)
          .eq('user_id', user?.id);

        if (error) throw error;
        router.push(`/snippets/${snippet!.id}`);
      }
    } catch (err: unknown) {
      console.error('Supabase update error:', err);
      setError(err && typeof err === 'object' && 'message' in err ? (err as any).message : JSON.stringify(err) || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (mode === 'edit' && snippet) {
      router.push(`/snippets/${snippet.id}`);
    } else {
      router.push('/snippets');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 theme-transition">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 theme-transition">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {mode === 'create' ? 'Create New Snippet' : 'Edit Snippet'}
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {mode === 'create' 
                ? 'Add a new code snippet to your collection' 
                : 'Update your snippet details'
              }
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-md">
              <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                placeholder="Enter snippet title"
                required
              />
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Language
              </label>
              <input
                type="text"
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                placeholder="e.g., JavaScript, Python, CSS"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Code Content *
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                placeholder="Paste your code here..."
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : mode === 'create' ? 'Create Snippet' : 'Update Snippet'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 