import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', showSubtitle = true }) => {
  const iconSize = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  const titleSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg';

  return (
    <div className="flex items-center gap-2.5 select-none cursor-pointer group">
      <div className={`${iconSize} relative flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200`}>
        {/* Heartbeat Cross SVG */}
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 stroke-current stroke-2 stroke-linecap-round stroke-linejoin-round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" className="opacity-40" />
          <path d="M12 5v14M5 12h14" className="stroke-[2.5]" />
        </svg>
      </div>
      <div>
        <div className={`font-bold tracking-tight text-slate-900 font-bangla ${titleSize} leading-tight flex items-center gap-1.5`}>
          <span>স্বাস্থ্যসেতু বিডি</span>
        </div>
        {showSubtitle && (
          <div className="text-[11px] font-medium text-slate-500 tracking-wider flex items-center gap-1 leading-none">
            <span>ShasthoSetu BD</span>
            <span className="text-teal-600 font-semibold">• OpenHealthBD</span>
          </div>
        )}
      </div>
    </div>
  );
};
