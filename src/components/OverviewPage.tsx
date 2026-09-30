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
  Workflow,
  ShieldCheck,
  ArrowRight,
  Cpu,
  Terminal,
  Globe,
  Lock,
} from 'lucide-react';
import { PAGES_CATALOG } from './MDNSidebar';

interface OverviewPageProps {
  onNavigate: (pageId: string, subParam?: string) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ onNavigate }) => {
  const sections = PAGES_CATALOG.filter((p) => p.id !== 'overview');

  return (
    <div className="space-y-10 animate-fadeIn max-w-5xl">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-4">
          <span>Documentation</span>
          <span>/</span>
          <span className="text-cyan-400 font-semibold">Vue_d'ensemble</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#1e1d24] border border-[#2e2d38] text-[11px] font-mono text-cyan-300 mb-4">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>OFFICIAL SPECIFICATION // 2026</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400">Mobile-Only Software Architecture</span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight font-sans">
          Développer de A à Z sur Smartphone
        </h1>

        <p className="text-sm sm:text-lg text-slate-300 leading-relaxed font-sans mb-6">
          Documentation technique de référence inspirée des standards <strong>MDN Web Docs</strong> pour concevoir, coder, tester et déployer des applications logicielles complètes (sites Jamstack, SaaS Full-Stack, applications natives iOS/Android et scripts serveurs Linux) exclusivement depuis un smartphone.
        </p>

        {/* Quick Navigation Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate('parcours')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-mono font-bold transition-all min-h-[44px]"
          >
            <BookOpen className="w-4 h-4" />
            <span>Consulter les 4 Parcours</span>
          </button>
          <button
            onClick={() => onNavigate('ai-architect')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#1e1d24] hover:bg-slate-800 text-slate-200 border border-[#2e2d38] text-xs font-mono font-semibold transition-all min-h-[44px]"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Architectures & Blueprints</span>
          </button>
          <button
            onClick={() => onNavigate('playground')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#1e1d24] hover:bg-slate-800 text-slate-300 border border-[#2e2d38] text-xs font-mono transition-all min-h-[44px]"
          >
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Spécifications des Runtimes</span>
          </button>
        </div>
      </div>

      {/* MDN Note Callout */}
      <div className="p-4 sm:p-5 rounded-lg bg-[#1e1d24] border-l-4 border-cyan-400 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <strong className="text-cyan-300 font-mono">Principe architectural : </strong>
        Le développement 100% mobile repose sur la dissociation entre <strong>l'interface d'édition</strong> (vocal, tactile, prompt engineering) et <strong>le moteur d'exécution</strong> (déporté dans le navigateur via WebAssembly ou dans des cloud builders serverless). Vous ne compilez jamais de C++ ou de gros binaires en local : l'infrastructure cloud s'en charge.
      </div>

      {/* Key Metrics Specifications Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-3.5 rounded-lg bg-[#1e1d24] border border-[#2e2d38]">
          <div className="text-[10px] text-slate-400 uppercase">Matériel requis</div>
          <div className="text-base sm:text-xl font-bold text-white mt-0.5">0 PC</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">iOS 17+ ou Android 14+</div>
        </div>
        <div className="p-3.5 rounded-lg bg-[#1e1d24] border border-[#2e2d38]">
          <div className="text-[10px] text-slate-400 uppercase">Parcours couverts</div>
          <div className="text-base sm:text-xl font-bold text-white mt-0.5">4 Formats</div>
          <div className="text-[10px] text-cyan-400 mt-0.5">Jamstack, SaaS, Native, Bots</div>
        </div>
        <div className="p-3.5 rounded-lg bg-[#1e1d24] border border-[#2e2d38]">
          <div className="text-[10px] text-slate-400 uppercase">Outils analysés</div>
          <div className="text-base sm:text-xl font-bold text-white mt-0.5">20+ Outils</div>
          <div className="text-[10px] text-cyan-400 mt-0.5">Fiches techniques complètes</div>
        </div>
        <div className="p-3.5 rounded-lg bg-[#1e1d24] border border-[#2e2d38]">
          <div className="text-[10px] text-slate-400 uppercase">Coût de démarrage</div>
          <div className="text-base sm:text-xl font-bold text-white mt-0.5">0.00 €</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">Quotas freemium suffisants</div>
        </div>
      </div>

      {/* Hardware & Runtime Requirements (Spécifications Matérielles) */}
      <div className="p-6 rounded-2xl bg-[#1e1d24] border border-[#2e2d38] space-y-4">
        <div className="flex items-center justify-between border-b border-[#2e2d38] pb-3">
          <h2 className="text-base sm:text-lg font-bold text-white font-sans flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-cyan-400" />
            <span>Spécifications & Prérequis Système Recommandés</span>
          </h2>
          <span className="text-[11px] font-mono text-emerald-400">Baseline 2026</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-3.5 rounded-lg bg-[#15141a] border border-[#2e2d38] space-y-1.5">
            <div className="font-mono text-cyan-400 font-bold uppercase">1. Système & Navigateurs</div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Safari iOS 17+ (moteur WebKit avec support de SharedArrayBuffer) ou Google Chrome Android 120+ (moteur Blink). Navigateurs alternatifs recommandés : Firefox Mobile et Brave.
            </p>
          </div>
          <div className="p-3.5 rounded-lg bg-[#15141a] border border-[#2e2d38] space-y-1.5">
            <div className="font-mono text-emerald-400 font-bold uppercase">2. Mémoire & Stockage</div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Minimum 4 Go de mémoire RAM (6 à 8 Go recommandés pour éviter l'expulsion d'onglets WebContainers sous iOS). Espace de stockage libre : 5 Go pour Termux ou Expo Go.
            </p>
          </div>
          <div className="p-3.5 rounded-lg bg-[#15141a] border border-[#2e2d38] space-y-1.5">
            <div className="font-mono text-blue-400 font-bold uppercase">3. Comptes Tiers Cloud</div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Un compte GitHub (gratuit), un compte Supabase (BaaS PostgreSQL gratuit) et un compte Vercel ou Cloudflare Pages pour le déploiement continu en production.
            </p>
          </div>
        </div>
      </div>

      {/* Pages Directory Table of Contents */}
      <div>
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#2e2d38]">
          <h2 className="text-lg sm:text-2xl font-bold text-white font-sans flex items-center gap-2">
            <span>Sommaire des 9 Chapitres Techniques</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">Documentation intégrale</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => onNavigate(section.id)}
                className="p-4 sm:p-5 rounded-xl bg-[#1e1d24] border border-[#2e2d38] hover:border-cyan-500/60 hover:bg-[#23222b] text-left transition-all group flex flex-col justify-between min-h-[140px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">
                      {section.category}
                    </span>
                    <div className="p-1.5 rounded-md bg-[#15141a] text-slate-400 group-hover:text-cyan-400 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-1.5 font-sans">
                    {section.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {section.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#2e2d38]/80 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-cyan-400">
                  <span>Consulter le chapitre technique</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Foundational Pillars */}
      <div className="p-6 rounded-2xl bg-[#1e1d24] border border-[#2e2d38] space-y-4">
        <h3 className="text-base sm:text-xl font-bold text-white font-sans">
          Les 3 Piliers de l'Architecture Mobile-Only
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-3.5 rounded-lg bg-[#15141a] border border-[#2e2d38]">
            <div className="font-mono text-cyan-400 font-bold mb-1">01. Le Vibe Coding Découplé</div>
            <p className="text-slate-400 leading-relaxed">
              Le code est formulé par intention vocale et prompt structuré (v0, Bolt, Lovable), éliminant la saisie fastidieuse de code source caractère par caractère sur clavier virtuel.
            </p>
          </div>
          <div className="p-3.5 rounded-lg bg-[#15141a] border border-[#2e2d38]">
            <div className="font-mono text-emerald-400 font-bold mb-1">02. Les Moteurs Cloud & Wasm</div>
            <p className="text-slate-400 leading-relaxed">
              Exécution des serveurs Node.js dans WebContainers ou des compilations lourdes dans le cloud (Expo EAS, Vercel), avec prévisualisation immédiate sur l'écran du smartphone.
            </p>
          </div>
          <div className="p-3.5 rounded-lg bg-[#15141a] border border-[#2e2d38]">
            <div className="font-mono text-blue-400 font-bold mb-1">03. Le Terminal POSIX de Poche</div>
            <p className="text-slate-400 leading-relaxed">
              Disponibilité d'un environnement Linux complet en espace utilisateur (Termux / iSH) pour manipuler Git, générer des clés SSH et automatiser des micro-scripts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
