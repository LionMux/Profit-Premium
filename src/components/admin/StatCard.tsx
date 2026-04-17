'use client';

import { cn } from '@/lib/utils';
import {
  TrendingUp,
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

interface StatCardProps {
  icon: string;
  label: string;
  value: number;
  trend?: string | null;
  color?: string;
  delay?: number;
  className?: string;
}

export function StatCard({
  icon,
  label,
  value,
  trend,
  color = 'bg-cream/10',
  delay = 0,
  className,
}: StatCardProps) {
  const Icon = iconMap[icon] || FileText;
  const [isVisible, setIsVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000 + 100);
    return () => clearTimeout(timer);
  }, [delay]);

  // Animate number counting
  useEffect(() => {
    if (!isVisible) return;

    const duration = 1000;
    const steps = 30;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div
      className={cn(
        'relative p-5 lg:p-6 rounded-xl overflow-hidden group',
        'bg-cream/5 backdrop-blur-sm border border-white/10',
        'hover:bg-cream/10 transition-all duration-500',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          'h-10 w-10 rounded-lg flex items-center justify-center mb-4',
          'transition-transform duration-300 group-hover:scale-110',
          color
        )}
      >
        <Icon className="h-5 w-5 text-cream" />
      </div>

      {/* Label */}
      <p className="text-xs text-cream/50 uppercase tracking-wider mb-2">
        {label}
      </p>

      {/* Value */}
      <div className="flex items-end gap-3">
        <span className="font-serif text-3xl lg:text-4xl text-cream font-semibold">
          {displayValue.toLocaleString()}
        </span>

        {trend && (
          <span className="flex items-center gap-1 text-xs text-green-400 mb-1.5">
            <TrendingUp className="h-3 w-3" />
            {trend}
          </span>
        )}
      </div>

      {/* Bottom Border Animation */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-cream/30 transition-all duration-500 group-hover:w-full" />
    </div>
  );
}
