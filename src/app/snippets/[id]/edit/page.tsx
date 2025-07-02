'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import SnippetForm from '@/components/SnippetForm';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Snippet } from '@/types/snippet';

function EditSnippetContent({ snippetId }: { snippetId: string }) {
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !snippet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Error</h3>
          <p className="mt-1 text-sm text-gray-500">{error || 'Snippet not found'}</p>
        </div>
      </div>
    );
  }

  return <SnippetForm snippet={snippet} mode="edit" />;
}

export default function EditSnippetPage() {
  const params = useParams();
  const snippetId = params.id as string;

  return (
    <ProtectedRoute>
      <EditSnippetContent snippetId={snippetId} />
    </ProtectedRoute>
  );
}
