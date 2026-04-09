/**
 * Client Component Template
 * Use for: Interactive components with React state
 * Location: src/components/[feature]/[ComponentName].tsx
 * 
 * Features:
 * - 'use client' directive
 * - useState and useCallback hooks
 * - Loading states
 * - Error handling
 * - Event handlers
 * - TypeScript types
 */

'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface ClientComponentTemplateProps {
  initialData?: string;
  onAction?: (data: string) => void;
  className?: string;
}

export function ClientComponentTemplate({
  initialData = '',
  onAction,
  className,
}: ClientComponentTemplateProps) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAction = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Your logic here
      const result = `Processed: ${data}`;

      onAction?.(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  }, [data, onAction]);

  return (
    <div className={cn('p-4 border rounded-lg', className)}>
      <h3 className="text-lg font-medium mb-4">Client Component</h3>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Данные</label>
          <input
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Введите данные"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-500 rounded-md text-sm">
            {error}
          </div>
        )}

        <Button
          onClick={handleAction}
          disabled={isLoading || !data}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Обработка...
            </>
          ) : (
            'Выполнить действие'
          )}
        </Button>
      </div>
    </div>
  );
}
