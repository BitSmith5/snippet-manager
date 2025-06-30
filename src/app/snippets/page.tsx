'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

type Snippet = {
  id: string;
  title: string;
  content?: string;
  created_at?: string;
};

function SnippetListContent() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  useEffect(() => {
    const fetchSnippets = async () => {
        const { data, error } = await supabase
            .from('snippets')
            .select('*');
        if (error) console.error(error);
        setSnippets(data || []);
    };
    fetchSnippets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Snippets</h1>
          <Link
            href="/snippets/new"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Create New Snippet
          </Link>
        </div>
        
        {snippets.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No snippets yet</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating your first snippet.</p>
            <div className="mt-6">
              <Link
                href="/snippets/new"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Create Snippet
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {snippets.map((snippet) => (
              <div key={snippet.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      <Link href={`/snippets/${snippet.id}`} className="hover:text-indigo-600">
                        {snippet.title}
                      </Link>
                    </h3>
                    {snippet.content && (
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {snippet.content.substring(0, 200)}...
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      Created {new Date(snippet.created_at || '').toLocaleDateString()}
                    </p>
                  </div>
                  <Link
                    href={`/snippets/${snippet.id}/edit`}
                    className="ml-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    Edit
                  </Link>
                </div>
              </div>
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