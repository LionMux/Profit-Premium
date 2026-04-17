import Link from 'next/link';

interface ProfitPremiumLogoProps {
  className?: string;
}

export function ProfitPremiumLogo({ className }: ProfitPremiumLogoProps) {
  return (
    <Link href="/dashboard" className={className}>
      <div className="text-cream font-serif">
        <div className="text-xl lg:text-2xl tracking-[0.2em] font-light leading-tight">PROFIT</div>
        <div className="text-xl lg:text-2xl tracking-[0.3em] font-semibold leading-tight">
          PREMIUM
        </div>
      </div>
    </Link>
  );
}
