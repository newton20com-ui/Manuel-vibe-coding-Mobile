import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PAGES_CATALOG, PageDefinition } from './MDNSidebar';

interface MDNPagePaginationProps {
  currentPageId: string;
  onNavigate: (pageId: string) => void;
}

export const MDNPagePagination: React.FC<MDNPagePaginationProps> = ({
  currentPageId,
  onNavigate,
}) => {
  const currentIndex = PAGES_CATALOG.findIndex((p) => p.id === currentPageId);

  const prevPage: PageDefinition | null =
    currentIndex > 0 ? PAGES_CATALOG[currentIndex - 1] : null;
  const nextPage: PageDefinition | null =
    currentIndex < PAGES_CATALOG.length - 1 ? PAGES_CATALOG[currentIndex + 1] : null;

  return (
    <div className="mt-14 pt-8 border-t border-[#2e2d38] grid grid-cols-1 sm:grid-cols-2 gap-4">
      {prevPage ? (
        <button
          onClick={() => onNavigate(prevPage.id)}
          className="p-4 rounded-xl bg-[#1e1d24] border border-[#2e2d38] hover:border-slate-600 text-left transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 group-hover:text-cyan-400 mb-1">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Page précédente</span>
          </div>
          <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors font-sans truncate w-full">
            {prevPage.title}
          </div>
        </button>
      ) : (
        <div className="hidden sm:block" />
      )}

      {nextPage ? (
        <button
          onClick={() => onNavigate(nextPage.id)}
          className="p-4 rounded-xl bg-[#1e1d24] border border-[#2e2d38] hover:border-slate-600 text-right transition-all group flex flex-col justify-between items-end sm:col-start-2"
        >
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 group-hover:text-cyan-400 mb-1">
            <span>Page suivante</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors font-sans truncate w-full">
            {nextPage.title}
          </div>
        </button>
      ) : null}
    </div>
  );
};
