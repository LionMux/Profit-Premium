/**
 * Material Card Template
 * Use for: Displaying real estate materials (presentations)
 * Location: src/components/materials/MaterialCard.tsx
 * 
 * Features:
 * - Thumbnail preview (image or PDF icon)
 * - Title and description
 * - City and property type badges
 * - Download link
 * - Hover effects
 */

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Download } from 'lucide-react';

interface Material {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  thumbnailUrl?: string;
  city: string;
  propertyType: string;
  createdAt: Date;
}

interface MaterialCardProps {
  material: Material;
  className?: string;
}

export function MaterialCard({ material, className }: MaterialCardProps) {
  const isPdf = material.fileUrl.toLowerCase().endsWith('.pdf');
  const hasThumbnail = !!material.thumbnailUrl;

  return (
    <Card className={cn('overflow-hidden hover:shadow-lg transition-shadow', className)}>
      {/* Thumbnail */}
      <div className="aspect-video relative bg-muted">
        {hasThumbnail ? (
          <Image
            src={material.thumbnailUrl!}
            alt={material.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : isPdf ? (
          <div className="absolute inset-0 flex items-center justify-center bg-red-50">
            <FileText className="h-16 w-16 text-red-400" />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <ImageIcon className="h-16 w-16 text-gray-400" />
          </div>
        )}

        {/* Download Button Overlay */}
        <a
          href={material.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-2 right-2 
                     bg-white/90 hover:bg-white rounded-full p-2 
                     shadow-sm opacity-0 hover:opacity-100 transition-opacity
                     focus:opacity-100"
          aria-label="Скачать файл"
          download
        >
          <Download className="h-4 w-4 text-gray-700" />
        </a>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base line-clamp-1 flex-1">
            {material.title}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {material.city}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {material.propertyType}
          </Badge>
        </div>

        {/* Description */}
        {material.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {material.description}
          </p>
        )}

        {/* Date */}
        <p className="text-xs text-muted-foreground mt-2">
          {new Date(material.createdAt).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </CardContent>
    </Card>
  );
}

// Helper icon component
function ImageIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}
