'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  ArrowUpRight,
  FileText,
  User,
  Phone,
  Send,
  ExternalLink,
  Landmark,
  Settings,
  Clock,
  LayoutGrid,
  Users,
  Building2,
  ImageIcon,
  Pencil,
  Trash2,
  Plus,
  GripVertical,
  Check,
  X,
  Loader2,
  MapPin,
  Home,
  Calendar,
  Download,
  Shield,
  Mail,
  SlidersHorizontal,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const iconMap: Record<string, React.ElementType> = {
  fileText: FileText,
  user: User,
  phone: Phone,
  send: Send,
  externalLink: ExternalLink,
  landmark: Landmark,
  settings: Settings,
  clock: Clock,
  layoutGrid: LayoutGrid,
  users: Users,
  building2: Building2,
  imageIcon: ImageIcon,
  pencil: Pencil,
  trash2: Trash2,
  plus: Plus,
  gripVertical: GripVertical,
  check: Check,
  x: X,
  loader2: Loader2,
  mapPin: MapPin,
  home: Home,
  calendar: Calendar,
  download: Download,
  shield: Shield,
  mail: Mail,
  slidersHorizontal: SlidersHorizontal,
  trendingUp: TrendingUp,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
};

interface QuickActionCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  variant?: 'primary' | 'secondary';
  delay?: number;
  className?: string;
}

export function QuickActionCard({
  icon,
  title,
  description,
  href,
  variant = 'secondary',
  delay = 0,
  className,
}: QuickActionCardProps) {
  const Icon = iconMap[icon] || FileText;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000 + 200);
    return () => clearTimeout(timer);
  }, [delay]);

  const isPrimary = variant === 'primary';

  return (
    <Link
      href={href}
      className={cn(
        'group relative block p-6 lg:p-8  overflow-hidden',
        'transition-all duration-500 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        isPrimary
          ? 'bg-cream text-burgundy-dark hover:bg-cream/90'
          : 'bg-burgundy border border-white/10 hover:bg-burgundy-medium/30',
        className
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          'h-12 w-12 flex items-center justify-center mb-6',
          'transition-transform duration-300 group-hover:scale-110',
          isPrimary ? 'bg-burgundy-dark/10' : 'bg-burgundy-light/50'
        )}
      >
        <Icon className={cn('h-6 w-6', isPrimary ? 'text-burgundy-dark' : 'text-white')} />
      </div>

      {/* Content */}
      <h3
        className={cn(
          'text-sm font-bold tracking-[0.2em] mb-3',
          isPrimary ? 'text-burgundy-dark' : 'text-cream'
        )}
      >
        {title}
      </h3>

      <p
        className={cn(
          'text-sm leading-relaxed',
          isPrimary ? 'text-burgundy-dark/70' : 'text-cream/60'
        )}
      >
        {description}
      </p>

      {/* Arrow */}
      <div
        className={cn(
          'absolute top-6 right-6 h-8 w-8',
          'flex items-center justify-center',
          'transition-all duration-300',
          'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0',
          isPrimary ? 'bg-burgundy-dark/10' : 'bg-white/10'
        )}
      >
        <ArrowUpRight className={cn('h-4 w-4', isPrimary ? 'text-burgundy-dark' : 'text-cream')} />
      </div>
    </Link>
  );
}
