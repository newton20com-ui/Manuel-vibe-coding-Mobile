import React, { useState, useEffect } from 'react';
import { PARCOURS_LIST, Parcours } from '../data/parcoursData';
import {
  Globe,
  Layers,
  Smartphone,
  Terminal,
  Copy,
  Check,
  Clock,
  Coins,
  ChevronRight,
  Lightbulb,
  AlertTriangle,
  Award,
  Sparkles,
} from 'lucide-react';
import { MDNAnchorButton } from './MDNAnchorButton';

interface ParcoursSelectorProps {
  initialTrackId?: string;
  onSelectTrack?: (trackId: string) => void;
  onNavigateToPrompts?: () => void;
}

export const ParcoursSelector: React.FC<ParcoursSelectorProps> = ({
  initialTrackId,
  onSelectTrack,
  onNavigateToPrompts,
}) => {
  const [selectedParcoursId, setSelectedParcoursId] = useState<string>(() => {
    if (initialTrackId && PARCOURS_LIST.some((p) => p.id === initialTrackId)) {
      return initialTrackId;
    }
    return PARCOURS_LIST[0].id;
  });
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);
  const [activeStepTab, setActiveStepTab] = useState<number>(0);

  // Sync if initialTrackId changes externally (e.g. from footer link)
  useEffect(() => {
    if (initialTrackId && PARCOURS_LIST.some((p) => p.id === initialTrackId)) {
      setSelectedParcoursId(initialTrackId);
      setActiveStepTab(0);
    }
  }, [initialTrackId]);

  const activeParcours: Parcours =
    PARCOURS_LIST.find((p) => p.id === selectedParcoursId) || PARCOURS_LIST[0];

  const handleCopyPrompt = (promptText: string, index: number) => {
    navigator.clipboard.writeText(promptText);
    setCopiedPromptIndex(index);
    setTimeout(() => {
      setCopiedPromptIndex(null);
    }, 2000);
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Globe':
        return <Globe className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5" />;
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  return (
    <section id="parcours" className="py-2 sm:py-4 max-w-full">
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
          <span>SPECIFICATION // COMPLETE_DEVELOPMENT_TRACKS</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2 font-sans">
          <span>Les 4 Parcours de A à Z sur Smartphone</span>
          <MDNAnchorButton pageId="parcours" subParam={activeParcours.id} />
        </h2>
        <p className="text-xs sm:text-base text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Sélectionnez le format que vous souhaitez bâtir pour obtenir la recette exacte, la stack recommandée et les instructions étape par étape.
        </p>
      </div>

      {/* Segmented Control Selector Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 p-1 sm:p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 mb-8 sm:mb-10">
        {PARCOURS_LIST.map((parcours) => {
          const isSelected = parcours.id === selectedParcoursId;
          return (
            <button
              key={parcours.id}
              onClick={() => {
                setSelectedParcoursId(parcours.id);
                setActiveStepTab(0);
                if (onSelectTrack) onSelectTrack(parcours.id);
              }}
              className={`flex items-center gap-2 sm:gap-3 p-2.5 sm:p-4 rounded-xl text-left transition-all min-h-[56px] ${
                isSelected
                  ? 'bg-slate-800 text-white shadow-md border border-slate-700/60'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <div
                className={`p-1.5 sm:p-2 rounded-lg shrink-0 ${
                  isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {renderIcon(parcours.iconName)}
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-semibold truncate text-white">{parcours.title}</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">{parcours.badge}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Track Overview Banner */}
      <div className="p-4 sm:p-8 rounded-2xl bg-[#1e1d24] border border-[#2e2d38] mb-8 sm:mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 pb-5 sm:pb-6 border-b border-[#2e2d38]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/80 font-semibold">{activeParcours.badge}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">Ergonomie tactile : <strong className="text-white">{activeParcours.mobileScore}/10</strong></span>
            </div>
            <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-2 font-sans">{activeParcours.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">{activeParcours.heroSummary}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-mono text-slate-300 shrink-0">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-md bg-[#15141a] border border-[#2e2d38]">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
              <span>{activeParcours.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-md bg-[#15141a] border border-[#2e2d38]">
              <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
              <span>{activeParcours.cost}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-md bg-[#15141a] border border-[#2e2d38]">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
              <span>{activeParcours.difficulty}</span>
            </div>
          </div>
        </div>

        {/* Recommended Mobile Stack Grid */}
        <div className="pt-5 sm:pt-6">
          <div className="text-[11px] sm:text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-3 sm:mb-4">
            STACK_SPECIFICATION // OUTILS_RECOMMANDES
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {activeParcours.stack.map((item, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-[#15141a] border border-[#2e2d38]">
                <div className="font-semibold text-xs text-white truncate font-mono">{item.name}</div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {item.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step by Step Timeline from A to Z */}
      <div className="mb-10 sm:mb-12">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h4 className="text-base sm:text-xl font-bold text-white">Le Pipeline étape par étape de A à Z</h4>
            <p className="text-xs text-slate-400 mt-0.5">Touchez une étape pour consulter les actions et copier les prompts.</p>
          </div>
        </div>

        {/* Step Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar touch-pan-x">
          {activeParcours.steps.map((step, idx) => {
            const isActive = activeStepTab === idx;
            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStepTab(idx)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap min-h-[44px] shrink-0 ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center text-[10px] font-bold">
                  {step.stepNumber}
                </span>
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Step Detailed Card */}
        {(() => {
          const step = activeParcours.steps[activeStepTab] || activeParcours.steps[0];
          return (
            <div className="p-4 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <span>Étape {step.stepNumber} sur {activeParcours.steps.length}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-cyan-400 font-semibold">{step.duration}</span>
                  </div>
                  <h4 className="text-base sm:text-xl font-bold text-white">{step.title}</h4>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-medium text-slate-200 w-fit">
                  <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Outil : {step.tool}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{step.description}</p>

              {/* Actions List */}
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                  Actions concrètes sur l'écran tactile
                </div>
                <ul className="space-y-2">
                  {step.actions.map((action, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vibe Prompt Box - MDN Style Code Block */}
              {step.vibePrompt && !step.vibePrompt.startsWith('(Action') && (
                <div className="rounded-xl border border-[#2e2d38] overflow-hidden bg-[#15141a]">
                  <div className="flex items-center justify-between px-3.5 py-2 bg-[#1e1d24] border-b border-[#2e2d38]">
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">&gt;_</span>
                      <span>vibe_prompt.txt · {step.tool}</span>
                    </span>
                    <div className="flex items-center gap-2">
                      {onNavigateToPrompts && (
                        <button
                          onClick={onNavigateToPrompts}
                          className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors hidden sm:inline-block"
                        >
                          Voir d'autres prompts →
                        </button>
                      )}
                      <button
                        onClick={() => handleCopyPrompt(step.vibePrompt, step.stepNumber)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded transition-all min-h-[32px]"
                      >
                        {copiedPromptIndex === step.stepNumber ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copié !</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            <span>Copier</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <pre className="text-xs font-mono text-cyan-200/90 p-4 overflow-x-auto max-h-[240px] overflow-y-auto whitespace-pre-wrap leading-relaxed">
                    {step.vibePrompt}
                  </pre>
                </div>
              )}

              {/* Mobile Pro Tip - MDN Note Callout */}
              <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-lg bg-[#1e1d24] border-l-4 border-cyan-400 text-xs text-slate-300">
                <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-cyan-300 font-mono">Note ergonomie : </strong>
                  <span>{step.mobileTip}</span>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Case Study & Pitfalls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real World Example */}
        <div className="p-5 sm:p-6 rounded-xl bg-[#1e1d24] border border-[#2e2d38]">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <Award className="w-4 h-4" />
            <span>EXEMPLE_REEL // CASE_STUDY</span>
          </div>
          <h4 className="text-base font-bold text-white mb-2 font-sans">{activeParcours.realWorldExample.name}</h4>
          <p className="text-xs sm:text-sm text-slate-400 mb-4">{activeParcours.realWorldExample.description}</p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#15141a] border border-[#2e2d38] text-xs font-mono text-emerald-300">
            <Clock className="w-3.5 h-3.5" />
            <span>Temps de production : {activeParcours.realWorldExample.builtIn}</span>
          </div>
        </div>

        {/* Pitfalls to Avoid - MDN Warning Callout */}
        <div className="p-5 sm:p-6 rounded-xl bg-[#1e1d24] border-l-4 border-amber-400 border-r border-t border-b border-[#2e2d38]">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <AlertTriangle className="w-4 h-4" />
            <span>AVERTISSEMENT // PIEGES_A_EVITER</span>
          </div>
          <ul className="space-y-2.5 mt-3">
            {activeParcours.keyPitfalls.map((pitfall, pIdx) => (
              <li key={pIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                <span className="text-amber-400 font-bold shrink-0">⚠</span>
                <span>{pitfall}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
