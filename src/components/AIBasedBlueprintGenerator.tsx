import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Loader2,
  Copy,
  Check,
  Smartphone,
  ShieldAlert,
  Clock,
  ChevronRight,
  Download,
  Flame,
  CheckCircle2,
  FolderTree,
  Database,
  Layers,
  Code,
  FileText,
  Zap,
} from 'lucide-react';
import { MDNAnchorButton } from './MDNAnchorButton';

interface BlueprintArchetype {
  id: string;
  name: string;
  subtitle: string;
  targetStack: string;
  treeStructure: string;
  dataFlowDescription: string;
  primaryConfigSnippet: {
    filename: string;
    code: string;
  };
}

const BLUEPRINT_ARCHETYPES: BlueprintArchetype[] = [
  {
    id: 'landing_showcase',
    name: 'Archétype 1 : Site Vitrine & Landing Page Jamstack',
    subtitle: 'Architecture découplée statique haute performance (TTFB < 50ms, 100/100 Lighthouse)',
    targetStack: 'React 19, Tailwind CSS v4, Vite 6, Cloudflare Pages ou Vercel Edge Network',
    treeStructure: `mon-site-vitrine/
├── public/
│   ├── favicon.ico
│   ├── manifest.webmanifest      # Support PWA mobile
│   └── og-image.png             # Aperçu pour réseaux sociaux
├── src/
│   ├── components/
│   │   ├── HeroSection.tsx       # Accroche, CTA & Preuve sociale
│   │   ├── FeaturesGrid.tsx      # Grille des services / bénéfices
│   │   ├── PricingTable.tsx      # Grille de tarifs
│   │   ├── Testimonials.tsx      # Avis clients réels
│   │   └── ContactForm.tsx       # Formulaire avec API serverless
│   ├── App.tsx                   # Composition de la page unique
│   ├── main.tsx                  # Montage React 19
│   └── index.css                 # Import Tailwind CSS v4
├── index.html                    # Méta-balises SEO, OpenGraph & Viewport
├── package.json                  # Dépendances minimales
└── vite.config.ts                # Configuration de compilation`,
    dataFlowDescription: 'Le site est pré-compilé dans le cloud. Lorsqu\'un visiteur soumet un formulaire de contact, la requête POST est routée vers un webhook Resend ou Formspree sans nécessiter de serveur applicatif dédié.',
    primaryConfigSnippet: {
      filename: 'index.html',
      code: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover, interactive-widget=resizes-content" />
    <title>Mon Projet — Présentation Officielle</title>
    <meta name="description" content="Solution moderne conçue pour une expérience mobile fluide." />
    <!-- Balises OpenGraph pour partage WhatsApp/iMessage -->
    <meta property="og:title" content="Mon Projet — Présentation Officielle" />
    <meta property="og:description" content="Solution moderne conçue pour une expérience mobile fluide." />
    <meta property="og:image" content="/og-image.png" />
    <link rel="manifest" href="/manifest.webmanifest" />
  </head>
  <body class="bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/20">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
    },
  },
  {
    id: 'saas_fullstack',
    name: 'Archétype 2 : Application SaaS Full-Stack Nomade',
    subtitle: 'Architecture SPA réactive avec persistance PostgreSQL et authentification sécurisée',
    targetStack: 'React 19, Supabase (PostgreSQL 16, RLS, Auth), Stripe Payment Links, Vercel',
    treeStructure: `mon-saas-mobile/
├── src/
│   ├── components/
│   │   ├── AuthModal.tsx         # Connexion, Inscription, Magic Link
│   │   ├── DashboardLayout.tsx   # En-tête mobile avec profil utilisateur
│   │   ├── DataTable.tsx         # Affichage responsive des enregistrements
│   │   └── UpgradeBanner.tsx     # Lien vers Stripe Checkout
│   ├── hooks/
│   │   ├── useAuth.ts            # État d'authentification et session
│   │   └── useUserData.ts        # Requêtes Supabase avec cache React
│   ├── lib/
│   │   └── supabase.ts           # Initialisation du client Supabase
│   ├── App.tsx                   # Routeur d'écrans (Public / Authentifié)
│   └── main.tsx
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql # Schéma des tables et Row Level Security
│   └── functions/
│       └── stripe-webhook/       # Edge Function Deno pour valider les paiements
└── vite.config.ts`,
    dataFlowDescription: 'Le client web mobile communique directement avec l\'API REST/GraphQL générée par Supabase via HTTPS. La sécurité n\'est pas gérée par un backend maison mais au niveau de la base de données via le Row Level Security (RLS). Les paiements Stripe mettent à jour le statut utilisateur via un webhook serverless.',
    primaryConfigSnippet: {
      filename: 'src/lib/supabase.ts',
      code: `import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Clés Supabase manquantes dans les variables d\\'environnement');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});`,
    },
  },
  {
    id: 'native_mobile',
    name: 'Archétype 3 : Application Mobile Native Multiplateforme',
    subtitle: 'Application native iOS & Android compilée dans le cloud via Expo EAS',
    targetStack: 'Expo SDK 52+, React Native, Expo Router v4, Hermes Engine, EAS Build',
    treeStructure: `mon-app-native/
├── app/                          # File-based routing Expo Router
│   ├── (auth)/
│   │   ├── login.tsx             # Écran de connexion natif
│   │   └── register.tsx          # Écran d'inscription
│   ├── (tabs)/
│   │   ├── _layout.tsx           # Barre d'onglets native inférieure
│   │   ├── index.tsx             # Flux d'actualités / accueil
│   │   ├── search.tsx            # Écran de recherche avec haptique
│   │   └── profile.tsx           # Paramètres et profil
│   └── _layout.tsx               # Root Stack Navigator
├── assets/
│   ├── icon.png                  # Icône 1024x1024 pour App Store
│   └── splash.png                # Écran de démarrage
├── app.json                      # Métadonnées natives et bundle ID
├── eas.json                      # Profils de compilation cloud EAS
└── package.json`,
    dataFlowDescription: 'L\'interface tourne sur les composants natifs UIView (iOS) et ViewGroup (Android). Les tests s\'effectuent en direct sur smartphone via l\'application Expo Go. Lorsque l\'application est prête, la commande Expo EAS compile le binaire .ipa et .apk dans le cloud sans jamais nécessiter d\'ordinateur Mac en local.',
    primaryConfigSnippet: {
      filename: 'eas.json',
      code: `{
  "cli": {
    "version": ">= 12.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "autoIncrement": true
    }
  }
}`,
    },
  },
  {
    id: 'backend_bot',
    name: 'Archétype 4 : Bot & Logiciel Serveur Autonome',
    subtitle: 'Microservice Python / Node.js conteneurisé tournant 24h/24 sans vider la batterie',
    targetStack: 'Python 3.12, python-telegram-bot / aiogram, SQLite, Railway ou Render',
    treeStructure: `mon-bot-cloud/
├── bot.py                        # Script principal avec écouteurs d'événements
├── config.py                     # Chargement des variables d'environnement
├── database.py                   # Modèles SQLite / PostgreSQL avec SQLAlchemy
├── requirements.txt              # Dépendances Python légères
├── Procfile                      # Directive d'exécution pour Railway / Heroku
└── README.md                     # Documentation d'installation locale Termux`,
    dataFlowDescription: 'Le script tourne en boucle d\'événements asynchrone (asyncio). Il écoute les webhooks ou utilise le long-polling pour répondre instantanément aux messages. Développé et testé localement dans Termux sur smartphone, il est ensuite déployé sur un conteneur cloud Railway gratuit pour rester actif 24h/24 même quand le téléphone est éteint.',
    primaryConfigSnippet: {
      filename: 'Procfile',
      code: `worker: python bot.py`,
    },
  },
];

export const AIBasedBlueprintGenerator: React.FC = () => {
  const [selectedArchetype, setSelectedArchetype] = useState<string>(BLUEPRINT_ARCHETYPES[0].id);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Custom AI Generator State
  const [idea, setIdea] = useState('');
  const [projectType, setProjectType] = useState<'web_app' | 'mobile_app' | 'landing_page' | 'software_bot'>('web_app');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedBlueprint, setGeneratedBlueprint] = useState<any | null>(null);

  const activeArchetype = BLUEPRINT_ARCHETYPES.find((a) => a.id === selectedArchetype) || BLUEPRINT_ARCHETYPES[0];

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectType,
          idea,
          skillLevel: 'Tous niveaux',
          os: 'Tous',
        }),
      });

      const data = await response.json();
      if (data.success && data.blueprint) {
        setGeneratedBlueprint(data.blueprint);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="architectures" className="py-2 sm:py-4 max-w-full space-y-10">
      {/* MDN Heading */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
          <span>SPECIFICATIONS // SOFTWARE_ARCHITECTURE_BLUEPRINTS</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-2.5 font-sans">
          <span>Architectures de Référence & Blueprints Techniques</span>
          <MDNAnchorButton pageId="ai-architect" />
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-3xl leading-relaxed">
          Spécifications complètes des quatre architectures logicielles éprouvées pour le développement nomade sur smartphone : arborescences de dossiers, flux de données, fichiers de configuration de référence et générateur de spécifications sur mesure.
        </p>
      </div>

      {/* MDN Note Callout */}
      <div className="p-4 sm:p-5 rounded-lg bg-[#1e1d24] border-l-4 border-cyan-400 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <strong className="text-cyan-300 font-mono">Principe architectural : </strong>
        Chaque archétype est optimisé pour minimiser la complexité d'édition tactile. Les fichiers sont modulaires, courts (moins de 150 lignes par composant) et tirent parti de services managés (BaaS) pour éliminer la maintenance de serveurs d'infrastructure.
      </div>

      {/* Archetype Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-1.5 bg-slate-900/90 rounded-xl border border-slate-800">
        {BLUEPRINT_ARCHETYPES.map((arch) => {
          const isSelected = arch.id === selectedArchetype;
          return (
            <button
              key={arch.id}
              onClick={() => setSelectedArchetype(arch.id)}
              className={`p-3 rounded-lg text-left transition-all min-h-[58px] ${
                isSelected
                  ? 'bg-slate-800 text-white shadow-md border border-slate-700/80'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <div className="text-xs font-semibold text-white truncate">{arch.name.split(' : ')[1]}</div>
              <div className="text-[10px] text-slate-400 truncate font-mono mt-0.5">{arch.targetStack.split(',')[0]}</div>
            </button>
          );
        })}
      </div>

      {/* Selected Archetype Detailed Blueprint */}
      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-[#1e1d24] border border-[#2e2d38] space-y-4">
          <div className="border-b border-[#2e2d38] pb-4">
            <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">SPÉCIFICATION_STRUCTURELLE</span>
            <h2 className="text-lg sm:text-2xl font-bold text-white mt-1">{activeArchetype.name}</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">{activeArchetype.subtitle}</p>
          </div>

          <div className="text-xs text-slate-300">
            <strong className="text-white font-mono">Stack technique recommandée : </strong>
            <span className="text-cyan-300">{activeArchetype.targetStack}</span>
          </div>

          <div className="p-3.5 rounded-lg bg-[#15141a] border border-[#2e2d38] text-xs text-slate-300 leading-relaxed">
            <strong className="text-white font-mono">Flux de données & communication : </strong>
            <span>{activeArchetype.dataFlowDescription}</span>
          </div>
        </div>

        {/* Tree Directory Structure */}
        <div className="p-6 rounded-2xl bg-[#1e1d24] border border-[#2e2d38] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
              <FolderTree className="w-4 h-4 text-cyan-400" />
              <span>Arborescence de Fichiers Normative</span>
            </h3>
            <button
              onClick={() => handleCopy(activeArchetype.treeStructure, `${activeArchetype.id}-tree`)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
            >
              {copiedCodeId === `${activeArchetype.id}-tree` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCodeId === `${activeArchetype.id}-tree` ? 'Copié' : 'Copier arborescence'}</span>
            </button>
          </div>
          <pre className="text-xs font-mono text-cyan-200/90 p-4 rounded-xl bg-[#15141a] border border-[#2e2d38] overflow-x-auto leading-relaxed">
            {activeArchetype.treeStructure}
          </pre>
        </div>

        {/* Primary Config File */}
        <div className="p-6 rounded-2xl bg-[#1e1d24] border border-[#2e2d38] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
              <Code className="w-4 h-4 text-cyan-400" />
              <span>Fichier de Configuration Clé : {activeArchetype.primaryConfigSnippet.filename}</span>
            </h3>
            <button
              onClick={() => handleCopy(activeArchetype.primaryConfigSnippet.code, `${activeArchetype.id}-cfg`)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
            >
              {copiedCodeId === `${activeArchetype.id}-cfg` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCodeId === `${activeArchetype.id}-cfg` ? 'Copié' : 'Copier fichier'}</span>
            </button>
          </div>
          <pre className="text-xs font-mono text-cyan-200/90 p-4 rounded-xl bg-[#15141a] border border-[#2e2d38] overflow-x-auto leading-relaxed">
            {activeArchetype.primaryConfigSnippet.code}
          </pre>
        </div>
      </div>

      {/* Tailored Blueprint Specification Generator Tool */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#1e1d24] border border-cyan-800/40 space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OUTIL // GÉNÉRATEUR DE SPÉCIFICATION TECHNIQUE SUR MESURE</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-bold text-white font-sans">
            Générer un Dossier d'Architecture Spécifique par IA
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
            Vous avez un projet particulier ? Soumettez votre idée ci-dessous pour que le modèle IA génère instantanément la roadmap technique complète, la stack recommandée et les Master Prompts adaptés.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'web_app', label: 'SaaS Full-Stack' },
              { id: 'mobile_app', label: 'App Mobile Expo' },
              { id: 'landing_page', label: 'Site Vitrine' },
              { id: 'software_bot', label: 'Bot / Script Cloud' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setProjectType(item.id as any)}
                className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                  projectType === item.id
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-[#15141a] text-slate-300 hover:bg-slate-800 border border-[#2e2d38]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Décrivez votre projet (ex: Application de gestion de stock pour caviste avec scan de code-barres par la caméra du smartphone et synchronisation Supabase)..."
              rows={3}
              className="w-full p-3.5 rounded-xl bg-[#15141a] border border-[#2e2d38] text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-sans leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !idea.trim()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-mono font-bold transition-all disabled:opacity-50 min-h-[44px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Génération du dossier d'architecture...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Générer le dossier d'architecture technique</span>
              </>
            )}
          </button>
        </form>

        {/* Generated Blueprint Output */}
        {generatedBlueprint && (
          <div className="pt-6 border-t border-[#2e2d38] space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">DOSSIER_GÉNÉRÉ</span>
                <h3 className="text-base font-bold text-white mt-0.5">{generatedBlueprint.projectTitle}</h3>
              </div>
              <span className="text-xs font-mono text-cyan-400">{generatedBlueprint.estimatedDuration}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{generatedBlueprint.summary}</p>

            <div className="space-y-3">
              <div className="text-xs font-mono font-semibold text-slate-400 uppercase">Étapes d'Exécution :</div>
              {generatedBlueprint.steps.map((step: any, sIdx: number) => (
                <div key={sIdx} className="p-3.5 rounded-lg bg-[#15141a] border border-[#2e2d38] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{step.stepNumber}. {step.title}</span>
                    <span className="font-mono text-cyan-400">{step.tool}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{step.description}</p>
                  {step.prompt && (
                    <div className="pt-2">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                        <span>Master Prompt Vibe Coding :</span>
                        <button
                          onClick={() => handleCopy(step.prompt, `gen-prompt-${sIdx}`)}
                          className="text-cyan-400 hover:underline"
                        >
                          {copiedCodeId === `gen-prompt-${sIdx}` ? 'Copié' : 'Copier'}
                        </button>
                      </div>
                      <pre className="text-[11px] font-mono text-cyan-200/90 p-2.5 rounded bg-[#1e1d24] overflow-x-auto whitespace-pre-wrap">
                        {step.prompt}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Voir aussi Section */}
      <div className="pt-6 border-t border-[#2e2d38] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <div>
          Spécifications connexes : <strong className="text-white">Capacitor.js</strong>, <strong className="text-white">Supabase CLI</strong>, <strong className="text-white">Expo SDK 52</strong>.
        </div>
        <a href="#/parcours" className="text-cyan-400 hover:underline">
          Accéder aux 4 parcours pas-à-pas de A à Z →
        </a>
      </div>
    </section>
  );
};
