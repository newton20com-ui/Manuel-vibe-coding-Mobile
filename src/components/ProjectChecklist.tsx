import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Code,
  Copy,
  Check,
  Smartphone,
  Zap,
  Globe,
  Lock,
} from 'lucide-react';
import { MDNAnchorButton } from './MDNAnchorButton';

interface AuditRule {
  id: string;
  category: 'Viewport & Méta-balises' | 'PWA & Mode Hors-ligne' | 'Accessibilité Tactile' | 'Sécurité & Headers' | 'Performance & Bundle';
  title: string;
  standard: string;
  whyCriticalOnMobile: string;
  codeSnippet: string;
  verificationMethod: string;
}

const AUDIT_RULES: AuditRule[] = [
  {
    id: 'viewport-meta',
    category: 'Viewport & Méta-balises',
    title: 'Méta-balise Viewport avec interactive-widget',
    standard: 'W3C CSS Device Adaptation Module / HTML5 Spec',
    whyCriticalOnMobile: 'Empêche le clavier virtuel de masquer les champs de formulaire ou de provoquer un zoom involontaire lors du focus sur écran tactile.',
    codeSnippet: `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover, interactive-widget=resizes-content">`,
    verificationMethod: 'Tester sur iOS Safari et Chrome Android en touchant un champ input : le contenu doit s\'adapter sans défilement horizontal parasite.',
  },
  {
    id: 'safe-area-insets',
    category: 'Viewport & Méta-balises',
    title: 'Prise en charge des Zones Protégées (Safe Area Insets)',
    standard: 'CSS Environment Variables Module Level 1',
    whyCriticalOnMobile: 'Empêche les boutons de navigation et les barres d\'action inférieures d\'être masqués par l\'encoche (notch), la Dynamic Island ou la barre de gestes système.',
    codeSnippet: `/* Global CSS pour application tactile */
:root {
  --sat: env(safe-area-inset-top, 0px);
  --sab: env(safe-area-inset-bottom, 0px);
}

.bottom-nav {
  padding-bottom: max(12px, env(safe-area-inset-bottom));
}`,
    verificationMethod: 'Vérifier sur iPhone avec barre de geste inférieure : aucun élément cliquable ne doit chevaucher la ligne noire de swipe.',
  },
  {
    id: 'pwa-manifest',
    category: 'PWA & Mode Hors-ligne',
    title: 'Manifeste d\'Application Web PWA (manifest.webmanifest)',
    standard: 'W3C Web App Manifest Specification',
    whyCriticalOnMobile: 'Permet à l\'utilisateur d\'ajouter l\'application sur son écran d\'accueil smartphone avec icône native, sans barre d\'adresse de navigateur.',
    codeSnippet: `{
  "name": "PocketStack Application",
  "short_name": "PocketApp",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#15141a",
  "theme_color": "#15141a",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}`,
    verificationMethod: 'Sur Chrome mobile, vérifier l\'apparition du message "Ajouter à l\'écran d\'accueil" ou l\'option dans Safari "Sur l\'écran d\'accueil".',
  },
  {
    id: 'touch-target-size',
    category: 'Accessibilité Tactile',
    title: 'Dimensionnement des Cibles Tactiles (Touch Target Size)',
    standard: 'WCAG 2.2 Critère 2.5.8 (Target Size Minimum) & Apple HIG',
    whyCriticalOnMobile: 'Un doigt humain a une surface de contact de 8 à 10 mm. Une cible trop petite entraîne des clics erronés et de la frustration utilisateur.',
    codeSnippet: `/* Taille minimale WCAG 2.2 : 44x44px (iOS) ou 48x48px (Android) */
.touch-target {
  min-height: 48px;
  min-width: 48px;
  padding: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}`,
    verificationMethod: 'Inspecter les boutons au doigt : aucun bouton ne doit être plus petit que 44px de hauteur effective.',
  },
  {
    id: 'content-security-policy',
    category: 'Sécurité & Headers',
    title: 'Headers de Sécurité HTTP & Isolation Supabase',
    standard: 'IETF RFC 6797 (HSTS) & W3C CSP Level 3',
    whyCriticalOnMobile: 'Les réseaux mobiles Wi-Fi publics sont vulnérables aux attaques de type Man-in-the-Middle. HSTS et CSP bloquent le chargement de scripts non autorisés.',
    codeSnippet: `# Configuration des en-têtes HTTP (Vercel vercel.json ou Cloudflare)
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains; preload" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}`,
    verificationMethod: 'Tester l\'URL du projet sur securityheaders.com pour valider l\'obtention d\'un score A ou A+.',
  },
  {
    id: 'bundle-size-budget',
    category: 'Performance & Bundle',
    title: 'Budget de Taille du Bundle JavaScript Initial',
    standard: 'Web Vitals Mobile Standards (Google Chrome Core Web Vitals)',
    whyCriticalOnMobile: 'Sur réseau 4G avec couverture instable, chaque 100 Ko de JavaScript supplémentaire ajoute entre 300 ms et 1 seconde de temps de parsing CPU.',
    codeSnippet: `// vite.config.ts - Découpage automatique des chunks
export default defineConfig({
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 250 // Avertissement si un chunk dépasse 250 Ko
  }
});`,
    verificationMethod: 'Lancer un audit Google Lighthouse Mobile : le Total Blocking Time (TBT) doit être inférieur à 200 ms.',
  },
];

export const ProjectChecklist: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'Tous',
    'Viewport & Méta-balises',
    'PWA & Mode Hors-ligne',
    'Accessibilité Tactile',
    'Sécurité & Headers',
    'Performance & Bundle',
  ];

  const filteredRules =
    selectedCategory === 'Tous'
      ? AUDIT_RULES
      : AUDIT_RULES.filter((r) => r.category === selectedCategory);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="production-audit" className="py-2 sm:py-4 max-w-full space-y-10">
      {/* MDN Heading */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
          <span>SPECIFICATIONS // PRODUCTION_READINESS_AUDIT</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-2.5 font-sans">
          <span>Spécifications d'Audit & Déploiement de Production</span>
          <MDNAnchorButton pageId="checklist" />
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-3xl leading-relaxed">
          Standard normatif de qualité pour certifier qu'une application web, un SaaS ou une application mobile conçue sur smartphone répond aux exigences industrielles de performance, d'accessibilité et de sécurité.
        </p>
      </div>

      {/* MDN Note Callout */}
      <div className="p-4 sm:p-5 rounded-lg bg-[#1e1d24] border-l-4 border-cyan-400 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <strong className="text-cyan-300 font-mono">Standard de certification : </strong>
        Toute application créée sur mobile doit respecter les spécifications WCAG 2.2, les métriques Core Web Vitals pour écran tactile et les directives de sécurité HSTS/CSP avant publication sur son nom de domaine personnalisé.
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar touch-pan-x">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all min-h-[38px] ${
              selectedCategory === cat
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Audit Rules Technical Cards */}
      <div className="space-y-6">
        {filteredRules.map((rule) => (
          <div
            key={rule.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#1e1d24] border border-[#2e2d38] space-y-4 hover:border-slate-600 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2e2d38] pb-3">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">
                  {rule.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white font-sans mt-0.5">
                  {rule.title}
                </h3>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#15141a] border border-[#2e2d38] text-[11px] font-mono text-slate-300 w-fit">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Norme : {rule.standard}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-slate-300">
              <div>
                <strong className="text-white font-semibold">Importance critique sur mobile : </strong>
                <span className="leading-relaxed">{rule.whyCriticalOnMobile}</span>
              </div>
            </div>

            {/* Code Specification snippet */}
            <div className="rounded-xl border border-[#2e2d38] overflow-hidden bg-[#15141a]">
              <div className="flex items-center justify-between px-3.5 py-2 bg-[#1e1d24] border-b border-[#2e2d38]">
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                  <Code className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Spécification technique de référence</span>
                </span>
                <button
                  onClick={() => handleCopy(rule.codeSnippet, rule.id)}
                  className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
                >
                  {copiedId === rule.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copié</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-400" />
                      <span>Copier snippet</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-xs font-mono text-cyan-200/90 p-3.5 overflow-x-auto leading-relaxed">
                {rule.codeSnippet}
              </pre>
            </div>

            {/* Verification method */}
            <div className="p-3 rounded-lg bg-[#15141a] border border-[#2e2d38] text-xs text-slate-300 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-400 font-mono">Méthode de vérification : </strong>
                <span>{rule.verificationMethod}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Voir aussi Section */}
      <div className="pt-6 border-t border-[#2e2d38] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <div>
          Références normatives : <strong className="text-white">WCAG 2.2</strong>, <strong className="text-white">Google Lighthouse Mobile</strong>, <strong className="text-white">W3C Web App Manifest</strong>.
        </div>
        <a href="#/outils" className="text-cyan-400 hover:underline">
          Consulter l'annuaire des outils de déploiement →
        </a>
      </div>
    </section>
  );
};
