import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', showSubtitle = true }) => {
  const { language } = useLanguage();
  const iconSize = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-11 h-11' : 'w-9 h-9';
  const titleSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-xl' : 'text-lg';

  const isBn = language === 'bn';

  return (
    <div className="flex items-center gap-2.5 select-none cursor-pointer group">
      <div
        className={`${iconSize} shrink-0 flex items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform`}
        aria-hidden="true"
      >
        {/* Bridge Node & Pulse Icon */}
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 stroke-current" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12h3.5l2-4 3 8 2.5-6 1.5 2h5.5" />
          <circle cx="3" cy="12" r="1.5" fill="currentColor" />
          <circle cx="21" cy="12" r="1.5" fill="currentColor" />
        </svg>
      </div>
      <div className="leading-tight">
        <div className={`font-bold tracking-tight text-ink font-sans ${titleSize} leading-none`}>
          {isBn ? 'স্বাস্থ্যসেতু বিডি' : 'ShasthoSetu BD'}
        </div>
        {showSubtitle && (
          <div className="text-[10.5px] font-semibold text-muted tracking-wider uppercase leading-none mt-1">
            {isBn ? 'ওপেনহেলথ বিডি • ডিজিটাল হেলথ' : 'OpenHealthBD · Healthcare'}
          </div>
        )}
      </div>
    </div>
  );
};
