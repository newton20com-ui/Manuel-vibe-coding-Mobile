import React from 'react';
import {
  Mic,
  Sparkles,
  Terminal,
  Database,
  Workflow,
  Cloud,
  ArrowRight,
  Smartphone,
  FileCode,
  CheckCircle2,
} from 'lucide-react';
import { MDNAnchorButton } from './MDNAnchorButton';

interface UniversalWorkflowProps {
  onOpenAIGenerator: () => void;
}

export const UniversalWorkflow: React.FC<UniversalWorkflowProps> = ({ onOpenAIGenerator }) => {
  const steps = [
    {
      num: '01',
      title: 'Idéation & Spécification PRD par la Voix',
      icon: Mic,
      tool: 'ChatGPT / Claude / Gemini App',
      artifact: 'Document PRD (Markdown) + User Stories',
      description:
        'Enregistrement vocal des exigences en marchant. L\'assistant IA structure le cahier des charges technique, liste les entités de données et rédige les Master Prompts initiaux.',
      tip: 'La dictée vocale capture 150 mots/minute contre 35 mots/minute sur clavier virtuel tactile.',
    },
    {
      num: '02',
      title: 'Vibe Coding & Génération des Composants UI',
      icon: Sparkles,
      tool: 'v0.dev / Bolt.new / Lovable.dev',
      artifact: 'Composants React 19 typés TypeScript + CSS Tailwind v4',
      description:
        'Injection du Master Prompt dans le moteur WebContainers ou l\'environnement cloud. L\'IA assemble l\'arborescence de composants, la mise en page responsive et les formulaires.',
      tip: 'Utilisez le mode paysage pour vérifier simultanément l\'arborescence de fichiers et le rendu tactile.',
    },
    {
      num: '03',
      title: 'Environnement de Code & Synchronisation Git',
      icon: Terminal,
      tool: 'GitHub Mobile / Replit / Termux',
      artifact: 'Dépôt Git distant (`main` branch) + Historique de commits',
      description:
        'Sauvegarde du code source sur GitHub en 1 tap. Réajustements minutieux de lignes de code ou corrections de typos via l\'éditeur tactile ou l\'app native GitHub Mobile.',
      tip: 'Générez une clé SSH ed25519 dans Termux pour pusher sans ressaisir vos identifiants.',
    },
    {
      num: '04',
      title: 'Persistance PostgreSQL & Sécurité RLS',
      icon: Database,
      tool: 'Supabase Mobile Web / PostgreSQL 16',
      artifact: 'Schéma relationnel SQL + Politiques Row Level Security',
      description:
        'Exécution des migrations SQL depuis le SQL Editor tactile de Supabase. Activation obligatoire du Row Level Security (RLS) pour isoler les données privées sans serveur backend custom.',
      tip: 'Les clés `anon public` sont stockées dans le fichier .env et injectées par le bundler Vite.',
    },
    {
      num: '05',
      title: 'Automatisation d\'Événements & Webhooks',
      icon: Workflow,
      tool: 'Make.com / Supabase Edge Functions (Deno)',
      artifact: 'Scénarios automatisés + Endpoints webhooks sécurisés',
      description:
        'Raccordement de Stripe pour les paiements, de Resend pour les notifications transactionnelles et d\'APIs tierces sans écrire de code d\'infrastructure lourd.',
      tip: 'Les Edge Functions Deno se déploient en quelques millisecondes et n\'ont aucun coût fixe à l\'arrêt.',
    },
    {
      num: '06',
      title: 'Déploiement Cloud Continu & Tests Réels',
      icon: Cloud,
      tool: 'Vercel / Cloudflare Pages / Expo EAS',
      artifact: 'Binaire natif (.apk / TestFlight) ou URL HTTPS de production',
      description:
        'Chaque push sur GitHub déclenche le build automatique dans le cloud. Le site ou l\'application est immédiatement accessible avec certificat SSL mondial et nom de domaine personnalisé.',
      tip: 'Vous testez l\'expérience utilisateur sur le smartphone physique exact qui a servi à la concevoir.',
    },
  ];

  return (
    <section id="workflow" className="py-2 sm:py-4 max-w-full space-y-10">
      {/* MDN Heading */}
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
          <span>SPECIFICATION // MOBILE_DEVELOPMENT_LIFECYCLE</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-2.5 font-sans">
          <span>Cycle de Vie du Développement Mobile (Workflow en 6 Étapes)</span>
          <MDNAnchorButton pageId="workflow" />
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-3xl leading-relaxed">
          Spécification de référence formalisant les six phases consécutives du développement logiciel nomade. Chaque étape génère un artefact vérifiable et s'exécute de manière asynchrone sur smartphone.
        </p>
      </div>

      {/* Grid of 6 Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="p-5 sm:p-6 rounded-xl bg-[#1e1d24] border border-[#2e2d38] flex flex-col justify-between hover:border-slate-600 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-sm font-mono font-bold px-2 py-0.5 rounded bg-[#15141a] border border-[#2e2d38] text-cyan-400">
                    STAGE_{step.num}
                  </span>
                  <div className="p-2 rounded-lg bg-[#15141a] text-slate-300 border border-[#2e2d38]">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  </div>
                </div>

                <div className="text-[11px] font-mono text-cyan-400/90 mb-1">
                  <code>{step.tool}</code>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-sans">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">{step.description}</p>

                {/* Produced artifact */}
                <div className="p-2.5 rounded-lg bg-[#15141a] border border-[#2e2d38] text-[11px] text-emerald-300 font-mono mb-4 flex items-start gap-1.5">
                  <FileCode className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>Artefact : {step.artifact}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#2e2d38] text-[11px] text-slate-400">
                <span className="font-mono text-cyan-300">Spécification mobile : </span>
                <span>{step.tip}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* MDN Cross-Reference Callout */}
      <div className="p-6 rounded-2xl bg-[#1e1d24] border border-[#2e2d38] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white font-sans">
            Passer à l'implémentation concrète
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Consultez les dossiers d'architecture de référence et les arborescences de dossiers détaillées pour chacun des 4 projets types.
          </p>
        </div>
        <button
          onClick={onOpenAIGenerator}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-mono font-bold transition-all min-h-[42px] shrink-0"
        >
          <span>Consulter les Blueprints d'Architecture</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
