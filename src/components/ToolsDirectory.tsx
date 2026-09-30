import React, { useState, useMemo, useEffect } from 'react';
import { TOOLS_DATA, DevTool } from '../data/toolsData';
import { Search, ExternalLink, Smartphone, Star, Filter, Copy, Check, BookOpen } from 'lucide-react';
import { MDNAnchorButton } from './MDNAnchorButton';

interface ToolsDirectoryProps {
  initialSearch?: string;
  initialCategory?: string;
}

export const ToolsDirectory: React.FC<ToolsDirectoryProps> = ({
  initialSearch = '',
  initialCategory = 'Tous',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('Tous');
  const [copiedUrlId, setCopiedUrlId] = useState<string | null>(null);

  useEffect(() => {
    if (initialSearch) {
      setSearchQuery(initialSearch);
    }
  }, [initialSearch]);

  useEffect(() => {
    if (initialCategory && initialCategory !== 'Tous') {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const categories = [
    'Tous',
    'Vibe Coding',
    'Backend & BDD',
    'Mobile Natif',
    'Terminal & IDE',
    'Automatisation No-Code',
    'Déploiement Cloud',
    'Assistants IA',
  ];

  const platforms = ['Tous', 'iOS', 'Android', 'Web Mobile'];

  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.whyOnMobile.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'Tous' || tool.category === selectedCategory;

      const matchesPlatform =
        selectedPlatform === 'Tous' ||
        tool.platforms.includes(selectedPlatform as any);

      return matchesSearch && matchesCategory && matchesPlatform;
    });
  }, [searchQuery, selectedCategory, selectedPlatform]);

  const handleCopyUrl = (e: React.MouseEvent, url: string, id: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(url);
    setCopiedUrlId(id);
    setTimeout(() => setCopiedUrlId(null), 2000);
  };

  return (
    <section id="outils" className="py-2 sm:py-4 max-w-full">
      {/* Section Header */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
          <span>REFERENCE // TOOLS_AND_PLATFORMS</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2 font-sans">
          <span>Annuaire de référence : 20+ outils analysés</span>
          <MDNAnchorButton pageId="outils" />
        </h2>
        <p className="text-xs sm:text-base text-slate-400 mt-2 [text-wrap:balance]">
          Spécifications détaillées, ergonomie tactile notée sur 10, support des systèmes d'exploitation et accès direct séparé entre l'application web et la documentation technique.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="space-y-4 mb-8">
        {/* Search input */}
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filtrer par nom, stack ou usage..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar touch-pan-x">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors min-h-[36px] ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Platform Pills */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-mono text-[11px]">Plateforme :</span>
          <div className="flex items-center gap-1.5">
            {platforms.map((plat) => (
              <button
                key={plat}
                onClick={() => setSelectedPlatform(plat)}
                className={`px-2.5 py-1 rounded text-xs transition-colors min-h-[32px] ${
                  selectedPlatform === plat
                    ? 'bg-slate-800 text-white font-semibold border border-slate-700'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                {plat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tools Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            className="p-5 rounded-2xl bg-[#1e1d24] border border-[#2e2d38] flex flex-col justify-between hover:border-slate-600 transition-all group"
          >
            <div>
              {/* Card Top */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors font-sans">
                      {tool.name}
                    </h3>
                    {tool.isPopular && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Top
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400">
                    {tool.category}
                  </span>
                </div>

                {/* Touch Ergonomy Score */}
                <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#15141a] border border-[#2e2d38] text-xs font-mono shrink-0">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-white">{tool.touchScore}</span>
                  <span className="text-slate-400 text-[10px]">/10</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {tool.tagline}
              </p>

              {/* Specs & Pricing */}
              <div className="space-y-2 mb-4 text-xs">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>Modèle économique :</span>
                  <span className="font-mono text-emerald-400 font-semibold">{tool.pricing}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>Support tactile :</span>
                  <div className="flex items-center gap-1">
                    {tool.platforms.map((p) => (
                      <span key={p} className="px-1.5 py-0.5 rounded bg-[#15141a] border border-[#2e2d38] text-[10px] text-slate-300">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Why & Tip */}
              <div className="space-y-2 pt-3 border-t border-[#2e2d38] text-xs">
                <div className="text-slate-300 text-[11px] leading-relaxed">
                  <strong className="text-white">Pourquoi sur mobile : </strong>
                  <span>{tool.whyOnMobile}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#15141a] border border-[#2e2d38] text-[11px] text-cyan-200/90">
                  <strong className="text-cyan-300 font-mono">Note tactile : </strong>
                  <span>{tool.mobileProTip}</span>
                </div>
              </div>
            </div>

            {/* Direct Link buttons: Explicit separation between App and Docs */}
            <div className="pt-3 mt-4 border-t border-[#2e2d38] flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                {/* 1. App Builder Direct Link */}
                <a
                  href={tool.appUrl}
                  target="_blank"
                  rel="noreferrer"
                  title={`Lancer l'application web ${tool.name} (${tool.appUrl})`}
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-md bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 hover:text-cyan-200 text-[11px] font-mono transition-colors min-h-[36px] border border-cyan-800/60 truncate"
                >
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
                  <span className="truncate">Lancer l'outil</span>
                </a>

                {/* 2. Official Technical Documentation Link */}
                <a
                  href={tool.docsUrl}
                  target="_blank"
                  rel="noreferrer"
                  title={`Consulter la documentation officielle de ${tool.name} (${tool.docsUrl})`}
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-md bg-[#15141a] hover:bg-slate-800 text-slate-300 hover:text-white text-[11px] font-mono transition-colors min-h-[36px] border border-[#2e2d38] truncate"
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                  <span className="truncate">Documentation</span>
                </a>
              </div>

              {/* 3. Copy Link Action */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1">
                <span className="truncate">{tool.appUrl.replace('https://', '')}</span>
                <button
                  type="button"
                  onClick={(e) => handleCopyUrl(e, tool.appUrl, tool.id)}
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors py-0.5 px-1.5 rounded hover:bg-slate-800 shrink-0"
                >
                  {copiedUrlId === tool.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="text-emerald-400 text-[10px]">Copié</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 shrink-0" />
                      <span className="text-[10px]">Copier</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-12 text-slate-500 text-sm">
          Aucun outil ne correspond à votre recherche "{searchQuery}". Essayez un autre mot-clé ou réinitialisez les filtres.
        </div>
      )}
    </section>
  );
};
