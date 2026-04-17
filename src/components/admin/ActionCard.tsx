import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { ModernBuildingIllustration } from '@/components/illustrations/BuildingIllustrations';

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  href?: string;
  onClick?: () => void;
}

export function ActionCard({
  icon: Icon,
  title,
  description,
  actionLabel,
  href,
  onClick,
}: ActionCardProps) {
  const content = (
    <div className="bg-cream rounded-lg p-6 h-full flex flex-col relative overflow-hidden">
      {/* Decorative illustration */}
      <div className="absolute top-4 right-4 w-16 h-20 opacity-15">
        <ModernBuildingIllustration className="w-full h-full text-burgundy" />
      </div>

      <div className="w-12 h-12 bg-burgundy rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-cream" />
      </div>
      <h3 className="font-serif text-xl text-burgundy-dark font-semibold mb-2">{title}</h3>
      <p className="text-sm text-burgundy-dark/60 mb-4 flex-1">{description}</p>
      <button
        onClick={onClick}
        className="w-full bg-burgundy text-cream py-3 rounded-lg hover:bg-burgundy-medium transition-colors flex items-center justify-center gap-2"
      >
        <span className="text-sm font-medium">{actionLabel}</span>
      </button>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
