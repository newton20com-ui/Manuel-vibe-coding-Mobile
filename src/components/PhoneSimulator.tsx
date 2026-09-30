import React, { useState } from 'react';
import {
  Cpu,
  Terminal,
  Smartphone,
  Database,
  Layers,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Check,
  Copy,
  ExternalLink,
  Code,
  Zap,
} from 'lucide-react';
import { MDNAnchorButton } from './MDNAnchorButton';

type RuntimeTab = 'webcontainers' | 'hermes' | 'supabase_edge' | 'termux_proot';

export const PhoneSimulator: React.FC = () => {
  const [activeRuntime, setActiveRuntime] = useState<RuntimeTab>('webcontainers');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <section id="runtimes" className="py-2 sm:py-4 max-w-full space-y-10">
      {/* MDN Heading */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
          <span>SPECIFICATIONS // MOBILE_EXECUTION_RUNTIMES</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-2.5 font-sans">
          <span>Spécifications des Runtimes Mobiles & Moteurs d'Exécution</span>
          <MDNAnchorButton pageId="playground" />
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-3xl leading-relaxed">
          Documentation technique approfondie des quatre environnements d'exécution qui rendent possible le développement logiciel complet sur smartphone, sans nécessiter d'ordinateur hôte.
        </p>
      </div>

      {/* MDN Note Callout */}
      <div className="p-4 sm:p-5 rounded-lg bg-[#1e1d24] border-l-4 border-cyan-400 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <strong className="text-cyan-300 font-mono">Principe architectural : </strong>
        Sur mobile, le compilateur traditionnel lourd est déporté soit dans le moteur WebAssembly du navigateur (WebContainers), soit dans des machines virtuelles cloud serverless synchronisées à la milliseconde, soit dans un sous-système Linux allégé en espace utilisateur (proot).
      </div>

      {/* Segmented Control Runtime Switcher */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 p-1.5 bg-slate-900/90 rounded-xl border border-slate-800">
        {[
          {
            id: 'webcontainers' as RuntimeTab,
            label: 'WebContainers',
            sub: 'Node.js in-browser (Wasm)',
            icon: Cpu,
          },
          {
            id: 'hermes' as RuntimeTab,
            label: 'Hermes Engine',
            sub: 'React Native / Expo Go',
            icon: Smartphone,
          },
          {
            id: 'supabase_edge' as RuntimeTab,
            label: 'PostgreSQL & Edge',
            sub: 'V8 Isolates & Supabase',
            icon: Database,
          },
          {
            id: 'termux_proot' as RuntimeTab,
            label: 'Linux proot / iSH',
            sub: 'Termux Android & Alpine iOS',
            icon: Terminal,
          },
        ].map((item) => {
          const Icon = item.icon;
          const isSelected = activeRuntime === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveRuntime(item.id)}
              className={`flex items-start gap-2.5 p-3 rounded-lg text-left transition-all min-h-[58px] ${
                isSelected
                  ? 'bg-slate-800 text-white shadow-md border border-slate-700/80'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <div
                className={`p-1.5 rounded-md shrink-0 mt-0.5 ${
                  isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-white truncate">{item.label}</div>
                <div className="text-[10px] text-slate-400 truncate font-mono">{item.sub}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Runtime 1: WebContainers */}
      {activeRuntime === 'webcontainers' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-2xl bg-[#1e1d24] border border-[#2e2d38] space-y-4">
            <div className="flex items-center justify-between border-b border-[#2e2d38] pb-4">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase font-semibold">RUNTIME_01 // WASM_BASED_NODEJS</span>
                <h2 className="text-lg sm:text-2xl font-bold text-white mt-1">WebContainers (Node.js dans le Navigateur Mobile)</h2>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60">
                Supporté Safari iOS & Chrome Android
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Propulsé par WebAssembly et l'isolation SharedArrayBuffer, WebContainers permet à des outils comme <strong>Bolt.new</strong> ou <strong>StackBlitz</strong> d'exécuter un runtime Node.js complet, un gestionnaire de paquets npm et un serveur de développement Vite directement dans le fil d'exécution de votre navigateur mobile, sans aucun serveur distant pour la compilation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs pt-2">
              <div className="p-3 rounded-lg bg-[#15141a] border border-[#2e2d38]">
                <div className="text-slate-500 text-[10px] uppercase">Moteur sous-jacent</div>
                <div className="text-white font-semibold mt-0.5">Wasm + Web Workers</div>
              </div>
              <div className="p-3 rounded-lg bg-[#15141a] border border-[#2e2d38]">
                <div className="text-slate-500 text-[10px] uppercase">Plafond Mémoire WebKit</div>
                <div className="text-amber-400 font-semibold mt-0.5">~1.4 Go RAM (iOS limit)</div>
              </div>
              <div className="p-3 rounded-lg bg-[#15141a] border border-[#2e2d38]">
                <div className="text-slate-500 text-[10px] uppercase">Latence de rechargement</div>
                <div className="text-emerald-400 font-semibold mt-0.5">&lt; 50 ms (Vite HMR)</div>
              </div>
            </div>
          </div>

          {/* Technical Code Specification */}
          <div className="p-6 rounded-2xl bg-[#1e1d24] border border-[#2e2d38] space-y-4">
            <h3 className="text-base font-bold text-white font-sans flex items-center justify-between">
              <span>Configuration du Serveur de Dev Mobile (vite.config.ts)</span>
              <button
                onClick={() => handleCopy(`// vite.config.ts pour environnement nomade mobile
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Écoute sur 0.0.0.0 pour prévisualisation réseau local
    port: 3000,
    hmr: {
      overlay: false, // Évite que les overlays d'erreurs bloquent tout l'écran tactile
    },
  },
  optimizeDeps: {
    include: ['lucide-react', 'react', 'react-dom'],
  },
});`, 'vite-cfg')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
              >
                {copiedCodeId === 'vite-cfg' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCodeId === 'vite-cfg' ? 'Copié' : 'Copier config'}</span>
              </button>
            </h3>

            <pre className="text-xs font-mono text-cyan-200/90 p-4 rounded-xl bg-[#15141a] border border-[#2e2d38] overflow-x-auto leading-relaxed">
{`// vite.config.ts pour environnement nomade mobile
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Écoute sur 0.0.0.0 pour prévisualisation réseau local
    port: 3000,
    hmr: {
      overlay: false, // Évite que les overlays d'erreurs bloquent tout l'écran tactile
    },
  },
  optimizeDeps: {
    include: ['lucide-react', 'react', 'react-dom'],
  },
});`}
            </pre>
          </div>

          {/* MDN Warning Callout */}
          <div className="p-4 sm:p-5 rounded-lg bg-[#1e1d24] border-l-4 border-amber-400 text-xs text-slate-300 space-y-1">
            <div className="font-mono text-amber-300 font-bold uppercase flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Contrainte critique WebKit (iOS Safari) :</span>
            </div>
            <p className="leading-relaxed">
              Safari sur iOS applique une politique agressive de terminaison d'onglets (tab eviction) dès qu'un onglet WebContainers dépasse 1.4 Go de mémoire tampon. Ne laissez pas plusieurs sessions de vibe coding ouvertes simultanément et redémarrez l'onglet si le dev server ralentit.
            </p>
          </div>
        </div>
      )}

      {/* Runtime 2: Hermes JS Engine */}
      {activeRuntime === 'hermes' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-2xl bg-[#1e1d24] border border-[#2e2d38] space-y-4">
            <div className="flex items-center justify-between border-b border-[#2e2d38] pb-4">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase font-semibold">RUNTIME_02 // NATIVE_REACT_NATIVE_ENGINE</span>
                <h2 className="text-lg sm:text-2xl font-bold text-white mt-1">Hermes JavaScript Engine (Expo & React Native)</h2>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60">
                Moteur Par Défaut Expo SDK 52+
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Hermes est un moteur JavaScript open source spécialement conçu pour exécuter des applications React Native sur Android et iOS. Plutôt que de parser du code JavaScript brut au démarrage, Hermes précompile le code en <strong>bytecode optimisé</strong>. Dans le cadre du développement mobile sans PC via <strong>Expo Go</strong>, Hermes permet d'obtenir un démarrage instantané de votre app native sur votre propre téléphone en scannant un QR code.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs pt-2">
              <div className="p-3 rounded-lg bg-[#15141a] border border-[#2e2d38]">
                <div className="text-slate-500 text-[10px] uppercase">Format exécuté</div>
                <div className="text-white font-semibold mt-0.5">Bytecode Hermes (HBC)</div>
              </div>
              <div className="p-3 rounded-lg bg-[#15141a] border border-[#2e2d38]">
                <div className="text-slate-500 text-[10px] uppercase">Temps de démarrage TTI</div>
                <div className="text-emerald-400 font-semibold mt-0.5">&lt; 150 ms</div>
              </div>
              <div className="p-3 rounded-lg bg-[#15141a] border border-[#2e2d38]">
                <div className="text-slate-500 text-[10px] uppercase">Empreinte RAM</div>
                <div className="text-cyan-400 font-semibold mt-0.5">-40% vs JSCore standard</div>
              </div>
            </div>
          </div>

          {/* Technical Expo app.json Specification */}
          <div className="p-6 rounded-2xl bg-[#1e1d24] border border-[#2e2d38] space-y-4">
            <h3 className="text-base font-bold text-white font-sans flex items-center justify-between">
              <span>Spécification app.json pour Hermes & Expo EAS</span>
              <button
                onClick={() => handleCopy(`{
  "expo": {
    "name": "PocketApp",
    "slug": "pocket-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "dark",
    "jsEngine": "hermes",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#15141a"
    },
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "com.pocketstack.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#15141a"
      },
      "package": "com.pocketstack.app"
    }
  }
}`, 'app-json')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
              >
                {copiedCodeId === 'app-json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCodeId === 'app-json' ? 'Copié' : 'Copier app.json'}</span>
              </button>
            </h3>

            <pre className="text-xs font-mono text-cyan-200/90 p-4 rounded-xl bg-[#15141a] border border-[#2e2d38] overflow-x-auto leading-relaxed">
{`{
  "expo": {
    "name": "PocketApp",
    "slug": "pocket-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "dark",
    "jsEngine": "hermes",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#15141a"
    },
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "com.pocketstack.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#15141a"
      },
      "package": "com.pocketstack.app"
    }
  }
}`}
            </pre>
          </div>
        </div>
      )}

      {/* Runtime 3: Supabase & Edge Workers */}
      {activeRuntime === 'supabase_edge' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-2xl bg-[#1e1d24] border border-[#2e2d38] space-y-4">
            <div className="flex items-center justify-between border-b border-[#2e2d38] pb-4">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase font-semibold">RUNTIME_03 // SERVERLESS_POSTGRESQL</span>
                <h2 className="text-lg sm:text-2xl font-bold text-white mt-1">PostgreSQL Serverless & V8 Edge Isolates (Supabase)</h2>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60">
                Console Web 100% Tactile
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Développer un SaaS complet depuis un smartphone nécessite une base de données relationnelle robuste administrable sans installer de client lourd (comme pgAdmin ou DBeaver). Supabase fournit une instance <strong>PostgreSQL 16</strong> hébergée, avec un Table Editor tactile complet et des <strong>Edge Functions</strong> écrites en TypeScript sous Deno (V8 Isolates avec temps de démarrage quasi nul).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs pt-2">
              <div className="p-3 rounded-lg bg-[#15141a] border border-[#2e2d38]">
                <div className="text-slate-500 text-[10px] uppercase">Moteur de Données</div>
                <div className="text-white font-semibold mt-0.5">PostgreSQL 16 + RLS</div>
              </div>
              <div className="p-3 rounded-lg bg-[#15141a] border border-[#2e2d38]">
                <div className="text-slate-500 text-[10px] uppercase">Sécurité native</div>
                <div className="text-emerald-400 font-semibold mt-0.5">Row Level Security (RLS)</div>
              </div>
              <div className="p-3 rounded-lg bg-[#15141a] border border-[#2e2d38]">
                <div className="text-slate-500 text-[10px] uppercase">Cold Start Edge</div>
                <div className="text-cyan-400 font-semibold mt-0.5">&lt; 10 ms (Deno Isolates)</div>
              </div>
            </div>
          </div>

          {/* SQL Specification snippet */}
          <div className="p-6 rounded-2xl bg-[#1e1d24] border border-[#2e2d38] space-y-4">
            <h3 className="text-base font-bold text-white font-sans flex items-center justify-between">
              <span>Script SQL de Migration avec RLS (À exécuter dans le SQL Editor mobile)</span>
              <button
                onClick={() => handleCopy(`-- 1. Table des profils utilisateurs liée à auth.users
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  is_pro BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Activation impérative de la sécurité ligne par ligne (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3. Politiques de sécurité (Lecture publique, écriture réservée au propriétaire)
CREATE POLICY "Lecture des profils publics" 
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Modification réservée à l'utilisateur" 
  ON profiles FOR UPDATE USING (auth.uid() = id);`, 'sql-schema')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
              >
                {copiedCodeId === 'sql-schema' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCodeId === 'sql-schema' ? 'Copié' : 'Copier SQL'}</span>
              </button>
            </h3>

            <pre className="text-xs font-mono text-cyan-200/90 p-4 rounded-xl bg-[#15141a] border border-[#2e2d38] overflow-x-auto leading-relaxed">
{`-- 1. Table des profils utilisateurs liée à auth.users
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  is_pro BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Activation impérative de la sécurité ligne par ligne (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3. Politiques de sécurité (Lecture publique, écriture réservée au propriétaire)
CREATE POLICY "Lecture des profils publics" 
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Modification réservée à l'utilisateur" 
  ON profiles FOR UPDATE USING (auth.uid() = id);`}
            </pre>
          </div>
        </div>
      )}

      {/* Runtime 4: Termux Linux proot */}
      {activeRuntime === 'termux_proot' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-2xl bg-[#1e1d24] border border-[#2e2d38] space-y-4">
            <div className="flex items-center justify-between border-b border-[#2e2d38] pb-4">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase font-semibold">RUNTIME_04 // LOCAL_POSIX_ENVIRONMENT</span>
                <h2 className="text-lg sm:text-2xl font-bold text-white mt-1">Environnement Linux en Espace Utilisateur (Termux & iSH)</h2>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono text-amber-400 bg-amber-950/60 border border-amber-800/60">
                Exécution Locale Sans Root
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Sur Android, <strong>Termux</strong> exploite directement le noyau Linux sous-jacent via l'espace utilisateur sans nécessiter de droits root. Il fournit un environnement POSIX complet avec gestionnaire de paquets APT/PKG capable d'exécuter Python 3, Node.js 22, Git, OpenSSH et SQLite. Sur iOS, <strong>iSH</strong> émule une architecture x86 sous Alpine Linux, permettant d'exécuter des scripts shell et Python directement sur iPhone.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs pt-2">
              <div className="p-3 rounded-lg bg-[#15141a] border border-[#2e2d38]">
                <div className="text-slate-500 text-[10px] uppercase">Gestionnaire de paquets</div>
                <div className="text-white font-semibold mt-0.5">pkg / apt (Termux) - apk (iSH)</div>
              </div>
              <div className="p-3 rounded-lg bg-[#15141a] border border-[#2e2d38]">
                <div className="text-slate-500 text-[10px] uppercase">Architecture Processeur</div>
                <div className="text-emerald-400 font-semibold mt-0.5">ARM64 natif (Zéro émulation sur Android)</div>
              </div>
              <div className="p-3 rounded-lg bg-[#15141a] border border-[#2e2d38]">
                <div className="text-slate-500 text-[10px] uppercase">Accès Stockage</div>
                <div className="text-cyan-400 font-semibold mt-0.5">termux-setup-storage (/sdcard)</div>
              </div>
            </div>
          </div>

          {/* Terminal Command Sequence */}
          <div className="p-6 rounded-2xl bg-[#1e1d24] border border-[#2e2d38] space-y-4">
            <h3 className="text-base font-bold text-white font-sans flex items-center justify-between">
              <span>Commandes d'Initialisation de la Chaîne d'Outils (Termux)</span>
              <button
                onClick={() => handleCopy(`# 1. Mise à jour des dépôts
pkg update && pkg upgrade -y

# 2. Installation de Git, Node.js LTS, Python et OpenSSH
pkg install git nodejs-lts python openssh curl -y

# 3. Génération d'une paire de clés SSH pour GitHub sur smartphone
ssh-keygen -t ed25519 -C "mon-smartphone@pocketstack.dev"

# 4. Affichage de la clé publique à copier dans les paramètres GitHub
cat ~/.ssh/id_ed25519.pub`, 'termux-cli')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
              >
                {copiedCodeId === 'termux-cli' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCodeId === 'termux-cli' ? 'Copié' : 'Copier commandes'}</span>
              </button>
            </h3>

            <pre className="text-xs font-mono text-cyan-200/90 p-4 rounded-xl bg-[#15141a] border border-[#2e2d38] overflow-x-auto leading-relaxed">
{`# 1. Mise à jour des dépôts
pkg update && pkg upgrade -y

# 2. Installation de Git, Node.js LTS, Python et OpenSSH
pkg install git nodejs-lts python openssh curl -y

# 3. Génération d'une paire de clés SSH pour GitHub sur smartphone
ssh-keygen -t ed25519 -C "mon-smartphone@pocketstack.dev"

# 4. Affichage de la clé publique à copier dans les paramètres GitHub
cat ~/.ssh/id_ed25519.pub`}
            </pre>
          </div>
        </div>
      )}

      {/* Cross-Reference Section (Voir aussi) */}
      <div className="pt-6 border-t border-[#2e2d38] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <div>
          Normes associées : <strong className="text-white">POSIX.1-2017</strong>, <strong className="text-white">ECMA-262</strong>, <strong className="text-white">WebAssembly 2.0</strong>.
        </div>
        <div className="flex items-center gap-3">
          <a href="#/compatibilite" className="text-cyan-400 hover:underline">
            Consulter la matrice de compatibilité →
          </a>
        </div>
      </div>
    </section>
  );
};
