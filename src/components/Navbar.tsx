import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Layers, Menu, X, Search, ChevronRight, BookOpen, Wrench, Cpu, ShieldCheck, Code, CheckSquare } from 'lucide-react';
import { PAGES_CATALOG } from './MDNSidebar';
import { TOOLS_DATA } from '../data/toolsData';
import { PARCOURS_LIST } from '../data/parcoursData';

interface NavbarProps {
  currentPageId: string;
  onNavigate: (pageId: string, subParam?: string) => void;
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

interface SearchItem {
  id: string;
  pageId: string;
  subParam?: string;
  title: string;
  badge: string;
  category: string;
  icon: any;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPageId,
  onNavigate,
  onToggleMobileMenu,
  isMobileMenuOpen,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Build a comprehensive search index across pages, tracks and tools
  const searchIndex: SearchItem[] = useMemo(() => {
    const list: SearchItem[] = [];

    // 1. Pages
    PAGES_CATALOG.forEach((p) => {
      list.push({
        id: `page-${p.id}`,
        pageId: p.id,
        title: p.title,
        badge: 'Page Doc',
        category: p.category,
        icon: p.icon,
      });
    });

    // 2. Specific Parcours Tracks
    PARCOURS_LIST.forEach((track) => {
      list.push({
        id: `track-${track.id}`,
        pageId: 'parcours',
        subParam: track.id,
        title: track.title,
        badge: 'Parcours',
        category: `Durée : ${track.duration}`,
        icon: BookOpen,
      });
    });

    // 3. Dev Tools
    TOOLS_DATA.forEach((tool) => {
      list.push({
        id: `tool-${tool.id}`,
        pageId: 'outils',
        subParam: tool.name,
        title: `${tool.name} — ${tool.tagline}`,
        badge: 'Outil Mobile',
        category: tool.category,
        icon: Wrench,
      });
    });

    return list;
  }, []);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    return searchIndex
      .filter((item) => item.title.toLowerCase().includes(query) || item.category.toLowerCase().includes(query))
      .slice(0, 8);
  }, [searchQuery, searchIndex]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#15141a]/95 backdrop-blur-md border-b border-[#2e2d38]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
        {/* Zone 1: MDN inspired wordmark */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('overview')}
            className="flex items-center gap-2 group py-1 text-left"
          >
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-xs">
              <span className="font-mono font-black text-slate-950 text-sm tracking-tighter">P_</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold tracking-tight text-white text-base group-hover:text-cyan-400 transition-colors">
                pocketstack<span className="text-cyan-400 font-normal">_</span>
              </span>
              <span className="text-[9px] font-mono text-slate-400 -mt-1 hidden sm:block tracking-wider uppercase">
                web_mobile:docs
              </span>
            </div>
          </button>

          {/* Zone 2: MDN clean documentation nav links */}
          <nav className="hidden xl:flex items-center gap-5 text-xs font-mono font-medium text-slate-300">
            <button
              onClick={() => onNavigate('parcours')}
              className={`hover:text-cyan-400 transition-colors py-1 ${currentPageId === 'parcours' ? 'text-cyan-400 font-bold' : ''}`}
            >
              /parcours
            </button>
            <button
              onClick={() => onNavigate('workflow')}
              className={`hover:text-cyan-400 transition-colors py-1 ${currentPageId === 'workflow' ? 'text-cyan-400 font-bold' : ''}`}
            >
              /workflow
            </button>
            <button
              onClick={() => onNavigate('playground')}
              className={`hover:text-cyan-400 transition-colors py-1 ${currentPageId === 'playground' ? 'text-cyan-400 font-bold' : ''}`}
            >
              /runtimes
            </button>
            <button
              onClick={() => onNavigate('compatibilite')}
              className={`hover:text-cyan-400 transition-colors py-1 ${currentPageId === 'compatibilite' ? 'text-cyan-400 font-bold' : ''}`}
            >
              /compatibilité
            </button>
            <button
              onClick={() => onNavigate('outils')}
              className={`hover:text-cyan-400 transition-colors py-1 ${currentPageId === 'outils' ? 'text-cyan-400 font-bold' : ''}`}
            >
              /outils
            </button>
            <button
              onClick={() => onNavigate('checklist')}
              className={`hover:text-cyan-400 transition-colors py-1 ${currentPageId === 'checklist' ? 'text-cyan-400 font-bold' : ''}`}
            >
              /audit
            </button>
          </nav>
        </div>

        {/* Zone 3: Search bar & Blueprints button */}
        <div className="flex items-center gap-2.5">
          {/* MDN Search Trigger Input with live dropdown */}
          <div ref={searchRef} className="relative hidden md:block w-48 lg:w-72">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchFocused(true);
              }}
              onFocus={() => setSearchFocused(true)}
              placeholder="Rechercher page, runtime, outil..."
              className="w-full pl-8 pr-8 py-1.5 text-xs bg-[#1e1d24] border border-[#2e2d38] rounded-md text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}

            {/* Search Dropdown Results */}
            {searchFocused && searchResults.length > 0 && (
              <div className="absolute top-full mt-1.5 left-0 right-0 bg-[#1e1d24] border border-[#2e2d38] rounded-lg shadow-2xl p-1.5 z-50 max-h-72 overflow-y-auto">
                <div className="text-[10px] font-mono text-slate-500 px-2 py-1 uppercase">
                  Résultats de documentation ({searchResults.length})
                </div>
                {searchResults.map((result) => {
                  const Icon = result.icon;
                  return (
                    <button
                      key={result.id}
                      onClick={() => {
                        onNavigate(result.pageId, result.subParam);
                        setSearchFocused(false);
                        setSearchQuery('');
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-[#23222b] text-left transition-colors text-xs text-slate-200 hover:text-cyan-400"
                    >
                      <Icon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold truncate">{result.title}</div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1.5">
                          <span className="px-1 py-0.2 rounded bg-[#15141a] text-cyan-300 font-mono text-[9px]">{result.badge}</span>
                          <span className="truncate">{result.category}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate('ai-architect')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold rounded-md transition-all shadow-sm whitespace-nowrap min-h-[38px] ${
              currentPageId === 'ai-architect'
                ? 'bg-cyan-300 text-slate-950 ring-2 ring-cyan-400'
                : 'bg-[#1e1d24] hover:bg-slate-800 text-slate-200 border border-[#2e2d38]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Blueprints</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden min-h-[44px] min-w-[44px] -mr-1 flex items-center justify-center text-slate-400 hover:text-white active:scale-90 transition-transform"
            aria-label="Ouvrir le sommaire de la documentation"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
