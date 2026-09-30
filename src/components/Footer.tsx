import React from 'react';
import { Smartphone, Heart, Sparkles, BookOpen, Layers } from 'lucide-react';

interface FooterProps {
  onNavigate: (pageId: string, subParam?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[#2e2d38] bg-[#111015] py-12 sm:py-16 text-slate-400 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#2e2d38]">
          {/* Brand & mission */}
          <div className="md:col-span-1 space-y-3">
            <button
              onClick={() => onNavigate('overview')}
              className="flex items-center gap-2 group text-left"
            >
              <div className="w-6 h-6 rounded bg-cyan-400 flex items-center justify-center">
                <span className="font-mono font-black text-slate-950 text-xs">P_</span>
              </div>
              <span className="font-mono font-bold text-white text-base group-hover:text-cyan-400 transition-colors">
                pocketstack<span className="text-cyan-400">_</span>
              </span>
            </button>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              La plateforme de documentation technique de référence pour le développement de logiciels, d'applications mobiles et de sites web 100% sur smartphone.
            </p>
            <div className="text-[11px] font-mono text-cyan-400">
              #MobileFirst #VibeCoding #ZeroPC #MDNStyle
            </div>
          </div>

          {/* Links Column 1: Guides & Parcours spécifiques */}
          <div>
            <div className="font-mono text-xs font-semibold uppercase text-slate-200 tracking-wider mb-3">
              Guides & Parcours
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('parcours', 'landing_showcase')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Sites Web & Landing Pages Jamstack
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('parcours', 'saas_fullstack')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Applications SaaS Full-Stack Supabase
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('parcours', 'native_mobile_apps')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Apps Mobiles Natives Expo & Hermes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('parcours', 'scripts_bots_software')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Bots & Logiciels Linux Termux
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Spécifications & Runtimes */}
          <div>
            <div className="font-mono text-xs font-semibold uppercase text-slate-200 tracking-wider mb-3">
              Spécifications & Runtimes
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('workflow')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Cycle de Vie du Développement (6 Étapes)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('compatibilite')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Matrice de Compatibilité OS & Navigateurs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('playground')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Spécifications des Runtimes Mobiles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ergonomie')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Spécifications du Viewport & Claviers
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Architecture & Référence */}
          <div>
            <div className="font-mono text-xs font-semibold uppercase text-slate-200 tracking-wider mb-3">
              Architecture & Référence
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('ai-architect')}
                  className="hover:text-cyan-400 transition-colors text-left flex items-center gap-1.5 text-cyan-300 font-semibold"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Architectures & Blueprints Techniques</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('prompts')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Bibliothèque de Master Prompts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('outils')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Annuaire de Référence des 20+ Outils
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('checklist')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Spécifications d'Audit de Production
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            Inspiré par les standards de documentation de <strong>MDN Web Docs</strong>.
          </div>
          <div>
            Spécifications logicielles 100% exécutables sur smartphone.
          </div>
        </div>
      </div>
    </footer>
  );
};
