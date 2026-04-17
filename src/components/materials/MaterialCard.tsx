'use client';

import Image from 'next/image';
import { FileText, Download, Calendar, ArrowUpRight, MapPin, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';

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
  delay?: number;
  className?: string;
}

export function MaterialCard({ material, delay = 0, className }: MaterialCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const isPdf = material.fileUrl.toLowerCase().endsWith('.pdf');
  const formattedDate = new Date(material.createdAt).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000 + 100);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={cn(
        'group relative bg-burgundy border border-white/10  overflow-hidden',
        'transition-all duration-500 ease-out hover:bg-burgundy-medium/30 hover:shadow-xl hover:shadow-black/10',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className
      )}
    >
      {/* Thumbnail */}
      <div className="aspect-video relative bg-burgundy-medium/30 overflow-hidden">
        {material.thumbnailUrl ? (
          <Image
            src={material.thumbnailUrl}
            alt={material.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="h-20 w-20 bg-cream/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
              <FileText className="h-10 w-10 text-cream/40" />
            </div>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* PDF Badge */}
        {isPdf && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-cream/20 backdrop-blur-sm text-[10px] text-cream uppercase tracking-wider">
            PDF
          </div>
        )}

        {/* Download Button (appears on hover) */}
        <a
          href={material.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'absolute bottom-3 right-3 h-10 w-10',
            'bg-cream text-burgundy-dark flex items-center justify-center',
            'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0',
            'transition-all duration-300 hover:bg-cream/90'
          )}
        >
          <Download className="h-5 w-5" />
        </a>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="font-serif text-lg text-cream font-semibold mb-2 line-clamp-1 group-hover:text-cream transition-colors">
          {material.title}
        </h3>

        {/* Description */}
        {material.description && (
          <p className="text-sm text-cream/60 line-clamp-2 mb-4 leading-relaxed">
            {material.description}
          </p>
        )}

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge
            variant="outline"
            className="bg-cream/10 text-cream border-cream/30 text-[10px] tracking-wider uppercase"
          >
            <MapPin className="h-3 w-3 mr-1" />
            {material.city}
          </Badge>
          <Badge
            variant="outline"
            className="bg-burgundy-light/30 text-cream border-burgundy-light/50 text-[10px] tracking-wider uppercase"
          >
            <Home className="h-3 w-3 mr-1" />
            {material.propertyType}
          </Badge>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-1.5 text-xs text-cream/50">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formattedDate}</span>
          </div>

          <a
            href={material.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-center gap-1.5 text-xs text-cream/60 hover:text-cream',
              'transition-colors duration-200'
            )}
          >
            <span className="hidden sm:inline">Открыть</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Bottom Border Animation */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-cream/30 transition-all duration-500 group-hover:w-full" />
    </div>
  );
}
