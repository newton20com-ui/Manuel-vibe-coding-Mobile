import React, { useState } from 'react';
import { ERGONOMIC_TIPS, ErgonomicTip } from '../data/mobileErgonomicsData';
import {
  Keyboard,
  Settings,
  Pocket,
  Brain,
  Smartphone,
  ChevronRight,
  Copy,
  Check,
  Terminal,
  Code,
  AlertTriangle,
  Lightbulb,
  Maximize2,
  Share2,
  ExternalLink,
  PlusSquare,
  Sparkles,
} from 'lucide-react';
import { MDNAnchorButton } from './MDNAnchorButton';

export const MobileErgonomicsGuide: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const categories = [
    'Tous',
    'Navigateurs & Réglages',
    'Claviers & Saisie',
    'Matériel Nomade',
    'Mindset Vibe Coding',
  ];

  const filteredTips =
    selectedCategory === 'Tous'
      ? ERGONOMIC_TIPS
      : ERGONOMIC_TIPS.filter((t) => t.category === selectedCategory);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <section id="ergonomie" className="py-2 sm:py-4 max-w-full space-y-10">
      {/* MDN Heading */}
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
          <span>SPECIFICATIONS // MOBILE_VIEWPORT_AND_ERGONOMICS</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-2.5 font-sans">
          <span>Spécifications du Viewport, Claviers & Débogage Eruda</span>
          <MDNAnchorButton pageId="ergonomie" />
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-3xl leading-relaxed">
          Documentation des standards techniques indispensables pour concevoir et déboguer sur écran tactile : installation en raccourci plein écran, unités CSS dynamiques (`100dvh`), console d'inspection DOM mobile et configuration des claviers.
        </p>
      </div>

      {/* Flagship Feature: L'Astuce de l'icône sur l'écran d'accueil (PWA / Plein Écran) */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#1e1d24] border border-cyan-800/50 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2e2d38] pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 font-semibold uppercase">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>ASTUCE_INCONTOURNABLE // MODE_PLEIN_ÉCRAN</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-white mt-1">
              Installer un outil web sur l'écran d'accueil (Raccourci PWA)
            </h2>
          </div>
          <span className="px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-700/80 text-[11px] font-mono text-cyan-300 w-fit">
            Recommandé pour Google AI Studio, Bolt & Lovable
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Lorsque vous utilisez un outil de développement web (comme <strong>Google AI Studio</strong>, <strong>Bolt.new</strong> ou <strong>Lovable</strong>) directement dans votre navigateur mobile, la barre d'adresse en haut et la barre d'onglets en bas occupent jusqu'à <strong>20% de l'écran utile</strong>. En ajoutant l'outil comme raccourci sur l'écran d'accueil de votre téléphone, il se lance en <strong>mode autonome plein écran (standalone)</strong>, exactement comme une application native téléchargée sur l'App Store ou Google Play.
        </p>

        {/* 2 OS Step by Step Guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* iOS Safari */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#15141a] border border-[#2e2d38] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                <Share2 className="w-4 h-4" />
                <span>Sur iPhone (Safari)</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">iOS 16+</span>
            </div>
            <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
              <li>
                Ouvrez l'outil dans Safari (ex: <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">aistudio.google.com</code>).
              </li>
              <li>
                Touchez le bouton de partage au centre en bas <span className="text-cyan-300 font-mono font-bold">(le carré avec une flèche vers le haut ↑)</span>.
              </li>
              <li>
                Faites défiler le menu vers le bas et touchez <strong>« Sur l'écran d'accueil »</strong>.
              </li>
              <li>
                Confirmez en touchant <strong>« Ajouter »</strong> en haut à droite.
              </li>
            </ol>
            <div className="text-[11px] text-emerald-400 font-mono pt-1">
              ✓ L'icône apparaît sur votre écran d'accueil et s'ouvre sans barre Safari.
            </div>
          </div>

          {/* Android Chrome */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#15141a] border border-[#2e2d38] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                <PlusSquare className="w-4 h-4" />
                <span>Sur Android (Google Chrome)</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">Android 12+</span>
            </div>
            <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
              <li>
                Ouvrez l'outil dans Chrome (ex: <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">aistudio.google.com</code>).
              </li>
              <li>
                Touchez le menu des <span className="text-emerald-300 font-mono font-bold">trois points verticaux (⋮)</span> en haut à droite.
              </li>
              <li>
                Touchez <strong>« Installer l'application »</strong> ou <strong>« Ajouter à l'écran d'accueil »</strong>.
              </li>
              <li>
                Confirmez. L'application est ajoutée avec son icône haute résolution.
              </li>
            </ol>
            <div className="text-[11px] text-emerald-400 font-mono pt-1">
              ✓ L'application se lance désormais en plein écran dans sa propre fenêtre isolée.
            </div>
          </div>
        </div>
      </div>

      {/* Special Technical Section 1: Eruda Mobile Inspector */}
      <div className="p-6 rounded-2xl bg-[#1e1d24] border border-[#2e2d38] space-y-4">
        <div className="flex items-center justify-between border-b border-[#2e2d38] pb-3">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">OUTIL_DE_DÉBOGAGE_TACTILE</span>
            <h2 className="text-base sm:text-xl font-bold text-white mt-0.5">La Console Développeur Embarquée sans PC (Eruda)</h2>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60">
            Équivalent F12 sur smartphone
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Sur iOS Safari et Chrome Android, les outils de développement (DevTools) ne sont pas accessibles nativement sans brancher un câble à un Mac ou un PC. Pour afficher la console JavaScript, inspecter le DOM, surveiller les requêtes réseau (XHR/Fetch) et lire le localStorage directement sur l'écran de votre téléphone, injectez la librairie <strong>Eruda</strong>.
        </p>

        <div className="rounded-xl border border-[#2e2d38] overflow-hidden bg-[#15141a]">
          <div className="flex items-center justify-between px-3.5 py-2 bg-[#1e1d24] border-b border-[#2e2d38]">
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              <span>Snippet à injecter dans index.html en mode développement</span>
            </span>
            <button
              onClick={() => handleCopy(`<!-- Eruda DevTools Mobile (À retirer en production) -->
<script src="https://cdn.jsdelivr.net/npm/eruda"></script>
<script>
  if (typeof eruda !== 'undefined') {
    eruda.init();
  }
</script>`, 'eruda-script')}
              className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
            >
              {copiedSnippet === 'eruda-script' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
              <span>{copiedSnippet === 'eruda-script' ? 'Copié' : 'Copier script'}</span>
            </button>
          </div>
          <pre className="text-xs font-mono text-cyan-200/90 p-3.5 overflow-x-auto leading-relaxed">
{`<!-- Eruda DevTools Mobile (À retirer en production) -->
<script src="https://cdn.jsdelivr.net/npm/eruda"></script>
<script>
  if (typeof eruda !== 'undefined') {
    eruda.init();
  }
</script>`}
          </pre>
        </div>
      </div>

      {/* Special Technical Section 2: CSS 100dvh and Viewport Standards */}
      <div className="p-6 rounded-2xl bg-[#1e1d24] border border-[#2e2d38] space-y-4">
        <div className="border-b border-[#2e2d38] pb-3">
          <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">NORMES_CSS_DU_VIEWPORT</span>
          <h2 className="text-base sm:text-xl font-bold text-white mt-0.5">Le Piège du 100vh et la Spécification 100dvh</h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Sur mobile, la barre d'adresse du navigateur se rétracte et s'affiche au défilement. L'unité historique <code>100vh</code> ne tient pas compte de cette barre dynamique, provoquant des éléments tronqués ou un scroll vertical non désiré. Les standards W3C recommandent désormais impérativement l'usage de <code>100dvh</code> (Dynamic Viewport Height).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3.5 rounded-lg bg-[#15141a] border border-[#2e2d38]">
            <div className="text-slate-400 font-bold">100svh (Small)</div>
            <div className="text-slate-400 text-[11px] mt-1">Hauteur quand la barre d'adresse est entièrement déployée.</div>
          </div>
          <div className="p-3.5 rounded-lg bg-[#15141a] border border-[#2e2d38]">
            <div className="text-slate-400 font-bold">100lvh (Large)</div>
            <div className="text-slate-400 text-[11px] mt-1">Hauteur maximale quand la barre d'adresse est rétractée.</div>
          </div>
          <div className="p-3.5 rounded-lg bg-[#15141a] border border-cyan-800/60">
            <div className="text-cyan-400 font-bold">100dvh (Dynamic)</div>
            <div className="text-cyan-300 text-[11px] mt-1">S'adapte dynamiquement en temps réel. Recommandé en 2026.</div>
          </div>
        </div>
      </div>

      {/* Category Tabs for Practical Tips */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white font-sans">
          Fiches Pratiques de Configuration Tactile
        </h2>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar touch-pan-x">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap min-h-[40px] ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredTips.map((tip) => (
          <div
            key={tip.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#1e1d24] border border-[#2e2d38] flex flex-col justify-between hover:border-slate-600 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#15141a] border border-[#2e2d38] text-cyan-400">
                  {tip.category}
                </span>
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-850">
                  {tip.system}
                </span>
              </div>

              <h3 className="font-bold text-base text-white mb-2 font-sans">
                {tip.title}
              </h3>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                {tip.description}
              </p>

              {/* Actionable callout */}
              <div className="p-3 rounded-xl bg-[#15141a] border border-[#2e2d38] text-xs text-cyan-200/90 mb-3">
                <strong className="text-cyan-300 font-mono">Action recommandée : </strong>
                <span>{tip.actionableStep}</span>
              </div>
            </div>

            {/* Copy Action Step */}
            <div className="mt-2 pt-3 border-t border-[#2e2d38] flex items-center justify-between text-xs">
              <span className="text-[11px] font-mono text-slate-500">Action smartphone</span>
              <button
                onClick={() => handleCopy(tip.actionableStep, tip.id)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors min-h-[30px]"
              >
                {copiedSnippet === tip.id ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copié</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-slate-400" />
                    <span>Copier l'instruction</span>
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
