'use client';

import Image from 'next/image';
import { FileText, Download, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Material {
  id: string;
  title: string;
  description?: string | null;
  fileUrl: string;
  thumbnailUrl?: string | null;
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
  const formattedDate = new Date(material.createdAt).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Card className={cn('overflow-hidden group hover:shadow-xl transition-all duration-300 bg-white/5 backdrop-blur-sm border-white/10', className)}>
      {/* Thumbnail */}
      <div className="aspect-video relative bg-burgundy-medium/30 overflow-hidden">
        {material.thumbnailUrl ? (
          <Image
            src={material.thumbnailUrl}
            alt={material.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {isPdf ? (
              <FileText className="h-16 w-16 text-cream/30" />
            ) : (
              <div className="h-16 w-16 rounded-lg bg-white/10 flex items-center justify-center">
                <FileText className="h-8 w-8 text-cream/50" />
              </div>
            )}
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-burgundy/0 group-hover:bg-burgundy/20 transition-colors duration-300" />
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-semibold line-clamp-1 flex-1 text-cream">
            {material.title}
          </CardTitle>
        </div>
        {material.description && (
          <CardDescription className="line-clamp-2 text-sm text-cream/60">
            {material.description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge 
            variant="outline" 
            className="bg-cream/10 text-cream border-cream/30"
          >
            {material.city}
          </Badge>
          <Badge 
            variant="outline"
            className="bg-burgundy-light/30 text-cream border-burgundy-light/50"
          >
            {material.propertyType}
          </Badge>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex items-center gap-1 text-xs text-cream/50">
            <Calendar className="h-3 w-3" />
            <span>{formattedDate}</span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-cream hover:text-cream hover:bg-white/10"
            asChild
          >
            <a
              href={material.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Скачать</span>
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
