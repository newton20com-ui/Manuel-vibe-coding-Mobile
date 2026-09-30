import React, { useState, useEffect } from 'react';
import { PROMPTS_LIBRARY, PromptItem } from '../data/promptLibraryData';
import { Copy, Check, Sparkles, Terminal } from 'lucide-react';
import { MDNAnchorButton } from './MDNAnchorButton';

interface PromptLibraryProps {
  initialCategory?: string;
}

export const PromptLibrary: React.FC<PromptLibraryProps> = ({
  initialCategory = 'Tous',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const categories = [
    'Tous',
    'Idéation & PRD',
    'Vibe Coding UI',
    'Base de Données & SQL',
    'Mobile React Native',
    'Résolution de Bugs',
  ];

  const filteredPrompts =
    selectedCategory === 'Tous'
      ? PROMPTS_LIBRARY
      : PROMPTS_LIBRARY.filter((p) => p.category === selectedCategory);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="prompts" className="py-2 sm:py-4 max-w-full">
      {/* Section Header */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
          <span>CODE_SNIPPETS // VIBE_CODING_PROMPTS</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2 font-sans">
          <span>Bibliothèque de Master Prompts prêts à l'emploi</span>
          <MDNAnchorButton pageId="prompts" />
        </h2>
        <p className="text-xs sm:text-base text-slate-400 mt-2 [text-wrap:balance]">
          Extraits de code et formules de vibe coding testés pour générer des architectures propres, du code typé TypeScript et des schémas de base de données sans erreurs.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar touch-pan-x">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all min-h-[40px] ${
              selectedCategory === cat
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Prompts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredPrompts.map((item) => (
          <div
            key={item.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#1e1d24] border border-[#2e2d38] flex flex-col justify-between hover:border-slate-600 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono text-cyan-400 font-semibold px-2 py-0.5 rounded bg-[#15141a] border border-[#2e2d38]">
                  {item.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {item.targetTool}
                </span>
              </div>

              <h3 className="font-bold text-base text-white mb-2 font-sans">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                {item.context}
              </p>

              {/* Code snippet block */}
              <div className="rounded-xl border border-[#2e2d38] overflow-hidden bg-[#15141a] mb-4">
                <div className="flex items-center justify-between px-3 py-1.5 bg-[#1e1d24] border-b border-[#2e2d38]">
                  <span className="text-[10px] font-mono text-slate-400">master_prompt.md</span>
                  <span className="text-[10px] font-mono text-cyan-400">{item.targetTool}</span>
                </div>
                <pre className="text-xs font-mono text-cyan-200/90 p-3.5 max-h-44 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                  {item.promptText}
                </pre>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#2e2d38]">
              <span className="text-[11px] text-slate-500 font-mono">Prêt à copier</span>
              <button
                onClick={() => handleCopy(item.promptText, item.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-all min-h-[34px]"
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copier le prompt</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
