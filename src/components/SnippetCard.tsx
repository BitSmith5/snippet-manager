import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, memo } from 'react';
import { Snippet } from '@/types/snippet';

type SnippetCardProps = {
  snippet: Snippet;
  showEditLink?: boolean;
  compact?: boolean;
  onLanguageClick?: (language: string) => void;
};

const SnippetCard = memo(function SnippetCard({ snippet, showEditLink = true, compact = false, onLanguageClick }: SnippetCardProps) {
  const router = useRouter();

  const handleEditClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/snippets/${snippet.id}/edit`);
  }, [router, snippet.id]);

  const handleLanguageClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onLanguageClick?.(snippet.language!);
  }, [onLanguageClick, snippet.language]);

  return (
    <Link href={`/snippets/${snippet.id}`} className="block">
      <div className={`bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow theme-transition ${compact ? 'p-4' : ''}`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className={`font-medium text-gray-900 dark:text-white mb-2 ${compact ? 'text-sm' : 'text-lg'}`}>
              {snippet.title}
            </h3>
            
            {snippet.language && (
              <button 
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium mb-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-800 ${
                  onLanguageClick ? 'cursor-pointer' : 'cursor-default'
                }`}
                onClick={onLanguageClick ? handleLanguageClick : undefined}
                disabled={!onLanguageClick}
              >
                {snippet.language}
              </button>
            )}
            
            {snippet.content && (
              <p className={`text-gray-600 dark:text-gray-300 text-sm ${compact ? 'line-clamp-2' : 'line-clamp-3'}`}>
                {snippet.content.substring(0, compact ? 100 : 200)}...
              </p>
            )}
            
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              Created {new Date(snippet.created_at || '').toLocaleDateString()}
              {snippet.updated_at && snippet.updated_at !== snippet.created_at && (
                <span> • Updated {new Date(snippet.updated_at).toLocaleDateString()}</span>
              )}
            </p>
          </div>
          
          {showEditLink && (
            <button
              onClick={handleEditClick}
              className="ml-4 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </Link>
  );
});

export default SnippetCard;
