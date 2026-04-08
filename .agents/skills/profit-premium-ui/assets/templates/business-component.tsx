/**
 * Business Component Template
 * Use for: Feature-specific components (MaterialCard, StoryCard, etc.)
 * Location: src/components/[feature]/
 */

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Define the data interface based on your Prisma model
interface /*Item*/ {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  // Add other fields
}

interface /*ComponentName*/Props {
  item: /*Item*/;
  className?: string;
}

export function /*ComponentName*/({ item, className }: /*ComponentName*/Props) {
  return (
    <Card className={cn('overflow-hidden hover:shadow-lg transition-shadow', className)}>
      {item.imageUrl && (
        <div className="aspect-video bg-muted">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      {item.description && (
        <CardContent>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </CardContent>
      )}
    </Card>
  );
}
