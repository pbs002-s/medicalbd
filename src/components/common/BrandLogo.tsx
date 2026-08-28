import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', showSubtitle = true }) => {
  const iconSize = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-11 h-11' : 'w-9 h-9';
  const titleSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg';

  return (
    <div className="flex items-center gap-2.5 select-none cursor-pointer group">
      <div
        className={`${iconSize} shrink-0 flex items-center justify-center rounded-lg bg-blue-600 text-white`}
        aria-hidden="true"
      >
        {/* Pulse + cross mark — a single flat colour, no gradient or shadow */}
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 stroke-current" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 13h3.2l1.6-3.6 2 7.2 1.8-5.2 1.3 2.4h9.1" />
        </svg>
      </div>
      <div className="leading-tight">
        <div className={`font-bold tracking-tight text-ink font-serif ${titleSize} font-bangla leading-tight`}>
          স্বাস্থ্যসেতু বিডি
        </div>
        {showSubtitle && (
          <div className="text-[10px] font-semibold text-ink/50 tracking-[0.14em] uppercase leading-none mt-0.5">
            ShasthoSetu BD · OpenHealthBD
          </div>
        )}
      </div>
    </div>
  );
};
