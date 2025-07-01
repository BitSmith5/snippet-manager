'use client';

import SnippetForm from '@/components/SnippetForm';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function NewSnippetPage() {
  return (
    <ProtectedRoute>
      <SnippetForm mode="create" />
    </ProtectedRoute>
  );
}
