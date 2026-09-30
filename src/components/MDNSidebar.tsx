import React from 'react';
import {
  BookOpen,
  Smartphone,
  Layers,
  Wrench,
  Sparkles,
  Keyboard,
  Code,
  CheckSquare,
  Home,
  FileText,
  Workflow,
  ShieldCheck,
  ChevronRight,
  Terminal,
  Cpu,
} from 'lucide-react';

export interface PageDefinition {
  id: string;
  hash: string;
  title: string;
  shortTitle: string;
  category: 'Guides & Méthodologie' | 'Spécifications & Runtimes Mobiles' | 'Architecture & Référence Technique';
  icon: any;
  description: string;
}

export const PAGES_CATALOG: PageDefinition[] = [
  // 1. Guides & Méthodologie
  {
    id: 'overview',
    hash: '#/overview',
    title: 'Vue d\'ensemble & Architecture Nomade',
    shortTitle: 'Vue d\'ensemble',
    category: 'Guides & Méthodologie',
    icon: Home,
    description: 'Introduction fondamentale, contraintes physiques et architecture de développement 100% smartphone.',
  },
  {
    id: 'workflow',
    hash: '#/workflow',
    title: 'Cycle de Vie du Développement Mobile (Workflow en 6 Étapes)',
    shortTitle: 'Workflow en 6 Étapes',
    category: 'Guides & Méthodologie',
    icon: Workflow,
    description: 'Spécification normative du cycle complet : idéation, vibe coding, persistance, tests et déploiement.',
  },
  {
    id: 'parcours',
    hash: '#/parcours',
    title: 'Spécifications des 4 Parcours de A à Z',
    shortTitle: 'Les 4 Parcours',
    category: 'Guides & Méthodologie',
    icon: BookOpen,
    description: 'Recettes techniques exhaustives : Sites Vitrines, SaaS Full-Stack, Apps Natives Expo et Serveurs Linux.',
  },

  // 2. Spécifications & Runtimes Mobiles
  {
    id: 'compatibilite',
    hash: '#/compatibilite',
    title: 'Matrice de Compatibilité OS & Navigateurs',
    shortTitle: 'Compatibilité Mobile',
    category: 'Spécifications & Runtimes Mobiles',
    icon: ShieldCheck,
    description: 'Tableau normatif des capacités et plafonds mémoires : iOS WebKit, Android Blink, Hermes et Termux PKG.',
  },
  {
    id: 'playground',
    hash: '#/playground',
    title: 'Spécifications des Runtimes Mobiles & Moteurs d\'Exécution',
    shortTitle: 'Runtimes Mobiles',
    category: 'Spécifications & Runtimes Mobiles',
    icon: Cpu,
    description: 'Analyse approfondie de WebContainers (Node in-browser), Hermes JS Engine, JSCore et Linux proot sur Termux.',
  },
  {
    id: 'ergonomie',
    hash: '#/ergonomie',
    title: 'Spécifications du Viewport, Claviers & Débogage Eruda',
    shortTitle: 'Viewport & Ergonomie',
    category: 'Spécifications & Runtimes Mobiles',
    icon: Keyboard,
    description: 'Gestion du 100dvh, interactive-widget=resizes-content, Safe Area insets et console inspectrice Eruda sans PC.',
  },

  // 3. Architecture & Référence Technique
  {
    id: 'ai-architect',
    hash: '#/ai-architect',
    title: 'Architectures de Référence & Blueprints Techniques',
    shortTitle: 'Architectures & Blueprints',
    category: 'Architecture & Référence Technique',
    icon: Sparkles,
    description: 'Arborescences de fichiers complètes, schémas de bases de données relationnelles et générateur IA Gemini.',
  },
  {
    id: 'prompts',
    hash: '#/prompts',
    title: 'Bibliothèque de Master Prompts & Spécifications de Prompting',
    shortTitle: 'Master Prompts',
    category: 'Architecture & Référence Technique',
    icon: Code,
    description: 'Formules de vibe coding rigoureusement typées : génération de PRD, contrats d\'API et résolution de bugs.',
  },
  {
    id: 'outils',
    hash: '#/outils',
    title: 'Annuaire de Référence des 20+ Outils & Plateformes',
    shortTitle: 'Annuaire Outils',
    category: 'Architecture & Référence Technique',
    icon: Wrench,
    description: 'Fiches de référence exhaustives avec modèle économique, capacités tactiles, URLs de l\'outil et documentations officielles.',
  },
  {
    id: 'checklist',
    hash: '#/checklist',
    title: 'Spécifications d\'Audit de Production & Déploiement',
    shortTitle: 'Audit de Production',
    category: 'Architecture & Référence Technique',
    icon: CheckSquare,
    description: 'Critères de certification pré-lancement : manifeste PWA, Service Worker, headers CSP, SSL et accessibilité tactile WCAG 2.2.',
  },
];

interface MDNSidebarProps {
  currentPageId: string;
  onSelectPage: (pageId: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const MDNSidebar: React.FC<MDNSidebarProps> = ({
  currentPageId,
  onSelectPage,
  isOpenMobile,
  onCloseMobile,
}) => {
  const categories: PageDefinition['category'][] = [
    'Guides & Méthodologie',
    'Spécifications & Runtimes Mobiles',
    'Architecture & Référence Technique',
  ];

  const handleLinkClick = (pageId: string) => {
    onSelectPage(pageId);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-16 z-50 lg:z-10 h-screen lg:h-[calc(100vh-4rem)] w-72 sm:w-80 shrink-0 bg-[#15141a] border-r border-[#2e2d38] overflow-y-auto p-4 transition-transform duration-200 ease-in-out font-sans ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Mobile Header in Drawer */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#2e2d38] lg:hidden">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-cyan-400 flex items-center justify-center">
              <span className="font-mono font-bold text-slate-950 text-xs">P</span>
            </div>
            <span className="font-mono font-bold text-white text-sm">Table des matières</span>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-1 rounded text-slate-400 hover:text-white"
            aria-label="Fermer la table des matières"
          >
            ✕
          </button>
        </div>

        {/* MDN Section Groups */}
        <div className="space-y-6">
          <div className="text-[11px] font-mono text-cyan-400 font-semibold tracking-wider uppercase px-2">
            Table des matières de référence
          </div>

          {categories.map((category) => {
            const pagesInCategory = PAGES_CATALOG.filter((p) => p.category === category);
            return (
              <div key={category} className="space-y-1">
                <div className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <span>{category}</span>
                </div>
                <div className="space-y-0.5 mt-1">
                  {pagesInCategory.map((page) => {
                    const isSelected = currentPageId === page.id;
                    const Icon = page.icon;
                    return (
                      <button
                        key={page.id}
                        onClick={() => handleLinkClick(page.id)}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-left text-xs transition-colors group ${
                          isSelected
                            ? 'bg-[#23222b] text-cyan-300 font-semibold border-l-2 border-cyan-400 pl-2'
                            : 'text-slate-300 hover:text-white hover:bg-[#1e1d24]'
                        }`}
                      >
                        <Icon
                          className={`w-3.5 h-3.5 shrink-0 ${
                            isSelected ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                          }`}
                        />
                        <span className="truncate">{page.shortTitle}</span>
                        {isSelected && (
                          <ChevronRight className="w-3 h-3 text-cyan-400 ml-auto shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Standards & Baseline Reference Widget */}
          <div className="pt-4 border-t border-[#2e2d38] px-2 text-[11px] font-mono text-slate-500 space-y-1.5">
            <div className="text-slate-400 font-semibold">Standard de documentation</div>
            <div>Inspiré des spécifications de <strong>MDN Web Docs</strong>.</div>
            <div className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Mobile Baseline 2026</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
