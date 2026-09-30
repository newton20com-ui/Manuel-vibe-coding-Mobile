import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface MDNAnchorButtonProps {
  pageId: string;
  subParam?: string;
  ariaLabel?: string;
}

export const MDNAnchorButton: React.FC<MDNAnchorButtonProps> = ({
  pageId,
  subParam,
  ariaLabel = 'Copier le lien direct vers cette section',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}${window.location.pathname}#/${pageId}${subParam ? `/${subParam}` : ''}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopyLink}
      title="Copier le permalien de cette section"
      aria-label={ariaLabel}
      className="inline-flex items-center text-slate-500 hover:text-cyan-400 text-lg font-mono font-normal transition-colors px-1"
    >
      {copied ? (
        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-1.5 py-0.5 rounded">
          <Check className="w-3 h-3 text-emerald-400" />
          <span>Lien copié</span>
        </span>
      ) : (
        <span>#</span>
      )}
    </button>
  );
};
