import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API endpoint: Generate Mobile Vibe Coding Blueprint
  app.post('/api/generate-blueprint', async (req, res) => {
    const { projectType, idea, skillLevel, os } = req.body || {};

    if (!idea || typeof idea !== 'string') {
      res.status(400).json({ error: 'La description de votre idée est requise.' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const systemInstruction = `Tu es l'architecte expert mondial du développement de projets technologiques 100% sur smartphone (sans aucun ordinateur).
Tu maîtrises le "Vibe Coding", les outils no-code, les générateurs d'UI (v0, Bolt.new, Lovable), les backends cloud tactiles (Supabase, Firebase), les environnements mobiles (Expo Go, Replit Mobile, Termux, Blink Shell), et les pipelines d'automatisation IA.
Ta mission est de concevoir un plan ultra-pragmatique, réalisable de A à Z avec UNIQUEMENT un téléphone.`;

        const prompt = `Génère une architecture et un plan de développement complet 100% sur smartphone pour ce projet :
- Type de projet : ${projectType || 'Application Web'}
- Idée du projet : "${idea}"
- Niveau utilisateur : ${skillLevel || 'Débutant'}
- Système d'exploitation du smartphone : ${os || 'iOS / Android'}

Réponds UNIQUEMENT avec un objet JSON strictement valide respectant exactement ce schéma TypeScript :
{
  "summary": "Résumé percutant du projet et de la stratégie mobile (2 phrases)",
  "feasibilityScore": "95%",
  "estimatedTimeHours": "3 à 6 heures",
  "recommendedStack": [
    {
      "name": "Nom de l'outil (ex: Bolt.new, Supabase, Expo Go, Replit)",
      "category": "UI / Backend / Terminal / Déploiement / IA",
      "role": "Rôle exact dans ce projet",
      "mobileErgonomy": "Excellent / Très bon / Bon",
      "isFree": true,
      "mobileTip": "Astuce spécifique pour l'utiliser sur smartphone (ex: passer en mode bureau, utiliser dictée vocale)"
    }
  ],
  "steps": [
    {
      "stepNumber": 1,
      "title": "Nom de l'étape",
      "toolUsed": "Outil principal à ouvrir sur le téléphone",
      "estimatedDuration": "30 min",
      "instructions": ["Action 1 sur smartphone", "Action 2 sur smartphone"],
      "vibeCodingPrompt": "Le prompt exact rédigé prêt à être copié/collé dans l'outil d'IA ou de vibe coding",
      "mobileProTip": "Conseil ergonomique smartphone pour cette étape"
    }
  ],
  "mobileSetupChecklist": [
    "Conseil de configuration du smartphone (ex: clavier Gboard avec dictée activée, installer app GitHub...)"
  ],
  "pitfallsToAvoid": [
    "Erreur typique sur mobile à éviter absolument"
  ]
}`;

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Gemini API timeout')), 8000)
        );

        const aiPromise = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            temperature: 0.4,
          },
        });

        const response: any = await Promise.race([aiPromise, timeoutPromise]);

        if (response && response.text) {
          const parsed = JSON.parse(response.text);
          res.json({ success: true, blueprint: parsed });
          return;
        }
      } catch (err: unknown) {
        console.error('Gemini API call failed, generating tailored fallback blueprint:', err);
      }
    }

    // High quality tailored fallback when no API key is provided or quota is exceeded
    const fallback = generateTailoredFallback(projectType, idea, skillLevel, os);
    res.json({ success: true, blueprint: fallback, isFallback: true });
  });

  // Mount Vite middleware in development or static serving in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PocketStack fullstack server running on http://0.0.0.0:${PORT}`);
  });
}

function generateTailoredFallback(projectType = 'web_app', idea = '', skillLevel = 'Débutant', os = 'Tous') {
  const isMobileApp = projectType === 'mobile_app' || idea.toLowerCase().includes('mobile') || idea.toLowerCase().includes('ios');
  const isBotOrScript = projectType === 'software_bot' || idea.toLowerCase().includes('bot') || idea.toLowerCase().includes('scrap');
  const isLandingPage = projectType === 'landing_page' || idea.toLowerCase().includes('vitrine') || idea.toLowerCase().includes('landing');

  if (isMobileApp) {
    return {
      summary: `Projet d'application mobile native "${idea.slice(0, 50)}..." réalisable en direct avec Expo Snack, Expo Go et l'assistance de vibe coding Claude/Gemini, sans jamais allumer un Mac ou un PC.`,
      feasibilityScore: '92%',
      estimatedTimeHours: '4 à 8 heures',
      recommendedStack: [
        {
          name: 'Expo Snack & Expo Go',
          category: 'Mobile Natif & Preview Live',
          role: 'Environnement de dev React Native dans le navigateur mobile + test immédiat sur votre écran tactile via l\'app Expo Go.',
          mobileErgonomy: 'Excellent',
          isFree: true,
          mobileTip: 'Ouvrez Snack sur le navigateur mobile, scannez votre propre écran ou cliquez sur "Open in Expo Go" pour voir les modifications en temps réel.',
        },
        {
          name: 'Lovable.dev ou v0.dev',
          category: 'Vibe Coding UI',
          role: 'Génération de l\'arborescence de composants, du style Tailwind et de la navigation par prompt vocal.',
          mobileErgonomy: 'Très bon',
          isFree: true,
          mobileTip: 'Utilisez la dictée vocale du smartphone pour décrire vos écrans avec fluidité sans taper au clavier virtuel.',
        },
        {
          name: 'Supabase Mobile Web',
          category: 'Backend & Authentification',
          role: 'Base de données PostgreSQL temps réel, authentification utilisateur et stockage de médias.',
          mobileErgonomy: 'Bon',
          isFree: true,
          mobileTip: 'Utilisez le SQL Editor avec les prompts d\'IA générés par Gemini pour créer vos tables sans écrire de code SQL.',
        },
        {
          name: 'EAS Build (Expo Application Services)',
          category: 'Compilation Cloud & Déploiement',
          role: 'Compilation des fichiers .apk (Android) et .ipa (iOS) sur les serveurs cloud d\'Expo, déclenchable depuis GitHub Mobile.',
          mobileErgonomy: 'Très bon',
          isFree: true,
          mobileTip: 'Liez votre dépôt GitHub et déclenchez les builds via l\'interface mobile expo.dev en un tap.',
        },
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Spécification vocale & PRD en marchant',
          toolUsed: 'Application ChatGPT / Claude / Gemini (Mode Vocal)',
          estimatedDuration: '25 min',
          instructions: [
            'Activez le mode vocal de votre assistant IA sur votre smartphone.',
            'Décrivez précisément l\'expérience utilisateur de votre app mobile, les écrans indispensables et les données sauvegardées.',
            'Demandez à l\'IA de synthétiser le PRD et la liste des composants React Native avec les hooks nécessaires.',
          ],
          vibeCodingPrompt: `Agis comme un Tech Lead Mobile senior. Voici mon idée d'app mobile : "${idea}".
Rédige un Product Requirements Document (PRD) ultra-concis comprenant :
1. Les 3 écrans clés (Accueil, Détail/Action, Profil/Réglages)
2. La structure des données à stocker dans Supabase
3. La liste des bibliothèques React Native légères recommandées pour Expo SDK
4. Les états locaux et flux utilisateurs.`,
          mobileProTip: 'Enregistrez le résumé dans les Notes de votre téléphone ou copiez-le dans votre presse-papiers.',
        },
        {
          stepNumber: 2,
          title: 'Vibe Coding des écrans sur navigateur mobile',
          toolUsed: 'Lovable.dev ou v0.dev (Navigateur Smartphone)',
          estimatedDuration: '1h 30min',
          instructions: [
            'Ouvrez le navigateur (Safari ou Chrome) et connectez-vous.',
            'Collez le prompt initial issu du PRD.',
            'Procédez par micro-itérations : validez d\'abord la barre de navigation basse, puis chaque écran individuel.',
          ],
          vibeCodingPrompt: `Crée une interface mobile React Native / Tailwind pour "${idea}".
Inclus :
- Une TabBar inférieure tactile native avec 3 onglets
- Un design moderne épuré avec contraste adapté à la lecture sur smartphone
- Des animations fluides sur les touches et boutons d'action (touchableOpacity)
- Des composants modulaires prêts à être assemblés.`,
          mobileProTip: 'Si l\'interface de prévisualisation semble étroite, basculez votre téléphone en mode paysage ou activez l\'option "Version pour ordinateur" du navigateur.',
        },
        {
          stepNumber: 3,
          title: 'Configuration de la BDD Supabase au toucher',
          toolUsed: 'Supabase Dashboard Mobile (app.supabase.com)',
          estimatedDuration: '45 min',
          instructions: [
            'Créez un nouveau projet Supabase gratuit en quelques taps.',
            'Allez dans "SQL Editor" et demandez à l\'IA de générer le script SQL de création des tables et des règles RLS.',
            'Collez et exécutez le script directement depuis le presse-papiers mobile.',
          ],
          vibeCodingPrompt: `Génère le script SQL complet pour Supabase pour l'application "${idea}".
Inclus la création des tables avec UUID, horodatages, clés étrangères, et active le Row Level Security (RLS) avec les politiques CRUD pour les utilisateurs authentifiés.`,
          mobileProTip: 'Copiez l\'URL de votre projet Supabase et la clé "anon public" directement dans les variables d\'environnement de votre projet.',
        },
        {
          stepNumber: 4,
          title: 'Assemblage & Test immédiat sur l\'écran avec Expo Go',
          toolUsed: 'Application mobile Expo Go (iOS / Android)',
          estimatedDuration: '1h 15min',
          instructions: [
            'Installez l\'application officielle "Expo Go" depuis l\'App Store ou le Google Play Store.',
            'Chargez votre projet React Native sur Expo Snack ou GitHub Codespaces.',
            'Ouvrez le projet dans Expo Go : votre smartphone exécute nativement l\'application en direct avec hot-reload immédiat !',
          ],
          vibeCodingPrompt: `Voici les écrans et la configuration Supabase. Assemble le code dans un projet Expo Router avec gestion d'erreurs et retour haptique au clic.`,
          mobileProTip: 'Secouez votre smartphone pour ouvrir le menu de développement Expo et afficher la console de débugging.',
        },
        {
          stepNumber: 5,
          title: 'Compilation Cloud EAS et déploiement Store',
          toolUsed: 'Console EAS Cloud (expo.dev) + GitHub Mobile',
          estimatedDuration: '30 min',
          instructions: [
            'Connectez votre compte Expo à votre dépôt GitHub.',
            'Lancez un "EAS Build" gratuit sur le cloud : les serveurs d\'Expo génèrent le fichier d\'installation Android (.apk) et iOS TestFlight.',
            'Téléchargez et installez directement l\'APK sur votre téléphone Android ou recevez l\'invitation TestFlight sur iPhone.',
          ],
          vibeCodingPrompt: `Génère le fichier eas.json optimisé pour un build de test preview et production avec les credentials automatiques.`,
          mobileProTip: 'Zéro ordinateur requis : l\'intégralité de la compilation s\'effectue sur les fermes de serveurs distantes.',
        },
      ],
      mobileSetupChecklist: [
        'Installer l\'application Expo Go sur votre téléphone',
        'Installer l\'application GitHub Mobile pour gérer vos dépôts et actions',
        'Activer le clavier Gboard ou SwiftKey avec dictée vocale continue',
        'Créer un raccourci d\'écran d\'accueil vers Supabase et Lovable/v0',
      ],
      pitfallsToAvoid: [
        'Ne pas essayer de compiler du C++ ou des modules natifs non supportés par Expo Go sans EAS Build',
        'Éviter de taper des longs blocs de code au clavier virtuel : toujours guider l\'IA par prompts chirurgicaux',
      ],
    };
  }

  if (isBotOrScript) {
    return {
      summary: `Projet de logiciel / bot automatisé "${idea.slice(0, 50)}..." orchestré via Termux (Android) ou iSH (iOS) et déployé 24h/24 sur Railway / Modal sans serveur physique.`,
      feasibilityScore: '96%',
      estimatedTimeHours: '2 à 4 heures',
      recommendedStack: [
        {
          name: 'Termux (Android) / iSH (iOS)',
          category: 'Terminal Linux Mobile',
          role: 'Exécution d\'un environnement Linux complet (Python, Node.js, Git, curl) directement sur la puce de votre smartphone.',
          mobileErgonomy: 'Très bon',
          isFree: true,
          mobileTip: 'Sous Android, installez Hacker\'s Keyboard pour avoir les touches Ctrl, Alt, Tab et les flèches directionnelles.',
        },
        {
          name: 'Claude / ChatGPT / Gemini Mobile',
          category: 'Vibe Coding & Scripting',
          role: 'Génération de l\'intégralité du script Python/Node.js, gestion des bibliothèques et résolution des bugs.',
          mobileErgonomy: 'Excellent',
          isFree: true,
          mobileTip: 'Partagez directement la capture d\'écran d\'une erreur de terminal avec l\'IA pour qu\'elle vous donne la commande exacte de correction.',
        },
        {
          name: 'Railway.app / Modal.com Mobile Web',
          category: 'Hébergement Cloud 24/7',
          role: 'Exécution permanente de votre bot ou script sans vider la batterie de votre smartphone.',
          mobileErgonomy: 'Très bon',
          isFree: true,
          mobileTip: 'Un simple git push depuis Termux ou l\'interface mobile de GitHub déclenche le redéploiement instantané.',
        },
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Spécification et génération du script par prompt IA',
          toolUsed: 'Application IA Mobile',
          estimatedDuration: '20 min',
          instructions: [
            'Expliquez à l\'IA le rôle du bot, les API cibles et la fréquence d\'exécution.',
            'Demandez un script autonome avec variables d\'environnement sécurisées et journalisation des logs.',
          ],
          vibeCodingPrompt: `Écris un script Python de production complet pour : "${idea}".
Inclus :
- Gestion robuste des erreurs et reconnexion automatique
- Variables d'environnement chargées via python-dotenv
- Logging détaillé avec horodatage
- Dépendances légères spécifiées dans un requirements.txt`,
          mobileProTip: 'Demandez à l\'IA de générer aussi la commande one-line d\'installation de toutes les dépendances.',
        },
        {
          stepNumber: 2,
          title: 'Test local immédiat dans le terminal mobile',
          toolUsed: 'Termux (Android) ou iSH Shell (iOS)',
          estimatedDuration: '30 min',
          instructions: [
            'Ouvrez votre terminal mobile.',
            'Installez Python et Git en 1 tap (ex: `pkg install python git`).',
            'Créez le fichier de script via `nano main.py` ou en le clonant depuis GitHub.',
            'Lancez le script : observez le fonctionnement directement sous vos yeux sur le smartphone !',
          ],
          vibeCodingPrompt: `Donne-moi les 4 commandes bash exactes pour initialiser l'environnement virtuel, installer les modules et lancer le script sur Termux.`,
          mobileProTip: 'Le terminal mobile consomme très peu de données et permet de tester en conditions réelles instantanément.',
        },
        {
          stepNumber: 3,
          title: 'Déploiement en tâche de fond permanente',
          toolUsed: 'Railway.app ou Modal.com sur navigateur mobile',
          estimatedDuration: '25 min',
          instructions: [
            'Poussez le code sur un dépôt GitHub privé depuis votre téléphone.',
            'Connectez Railway à votre dépôt GitHub : le bot se lance dans un conteneur sécurisé.',
            'Configurez les variables d\'environnement secrètes (API tokens) au doigt.',
          ],
          vibeCodingPrompt: `Génère le Dockerfile ou le fichier Procfile minimaliste pour déployer ce bot sur Railway sans configuration complexe.`,
          mobileProTip: 'Configurez des alertes Telegram ou Discord pour recevoir des notifications d\'état sur votre téléphone.',
        },
      ],
      mobileSetupChecklist: [
        'Installer Termux (via F-Droid sous Android) ou iSH Shell (App Store sous iOS)',
        'Activer les touches supplémentaires de terminal dans les paramètres',
        'Créer un compte GitHub et générer un Personal Access Token pour vos pushs',
      ],
      pitfallsToAvoid: [
        'Ne laissez pas le bot tourner indéfiniment en local sur le téléphone pour préserver l\'autonomie de la batterie : préférez le cloud Railway/Modal',
      ],
    };
  }

  // Default: Web App / Full-Stack SaaS
  return {
    summary: `Projet SaaS Full-Stack "${idea.slice(0, 50)}..." développé par itérations de vibe coding avec Lovable/Bolt.new, adossé à Supabase et déployé mondialement sur Vercel sans jamais toucher un PC.`,
    feasibilityScore: '95%',
    estimatedTimeHours: '3 à 6 heures',
    recommendedStack: [
      {
        name: 'Bolt.new ou Lovable.dev',
        category: 'Vibe Coding Full-Stack',
        role: 'Génération du frontend React/Tailwind, des pages, des formulaires et des composants interactifs par dialogue IA.',
        mobileErgonomy: 'Très bon',
        isFree: true,
        mobileTip: 'Activez l\'option "Vue Ordinateur" dans votre navigateur mobile pour avoir le panneau de code et la prévisualisation côte-à-côte.',
      },
      {
        name: 'Supabase Mobile Web',
        category: 'Backend & Données',
        role: 'Authentification des utilisateurs (Google, Email/Password) et base de données PostgreSQL temps réel.',
        mobileErgonomy: 'Bon',
        isFree: true,
        mobileTip: 'Générez les politiques RLS et le schéma avec l\'éditeur SQL intégré au navigateur mobile.',
      },
      {
        name: 'GitHub Mobile + Vercel Mobile',
        category: 'Gestion de code & Déploiement',
        role: 'Hébergement du code source et publication automatique avec nom de domaine sécurisé (HTTPS).',
        mobileErgonomy: 'Excellent',
        isFree: true,
        mobileTip: 'L\'app officielle GitHub permet d\'éditer des fichiers en un clic et de merger vos Pull Requests depuis votre canapé.',
      },
      {
        name: 'Make.com ou Resend',
        category: 'Automatisations & Emails',
        role: 'Envoi d\'emails transactionnels et synchronisation de données sans écrire de code backend lourd.',
        mobileErgonomy: 'Très bon',
        isFree: true,
        mobileTip: 'L\'interface tactile de Make permet de glisser-déposer des modules pour créer des webhooks en 5 minutes.',
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Cahier des charges & architecture par dictée vocale',
        toolUsed: 'ChatGPT / Gemini Mobile (Mode Vocal)',
        estimatedDuration: '25 min',
        instructions: [
          'Enfilez vos écouteurs et lancez la conversation vocale avec l\'IA.',
          'Détaillez le fonctionnement exact de votre SaaS : qui sont les utilisateurs, que font-ils, comment ils paient.',
          'Demandez un schéma d\'architecture prêt pour Bolt/Lovable et Supabase.',
        ],
        vibeCodingPrompt: `Je construis une application web : "${idea}".
Rédige un cahier des charges technique en 4 volets :
1. Architecture des pages (Landing, Login, Dashboard, Paramètres)
2. Schéma de base de données relationnelle Supabase (Tables, Champs, Types)
3. Flux d'actions utilisateurs prioritaires (MVP)
4. Prompt de démarrage pour l'outil de Vibe Coding.`,
        mobileProTip: 'Vous pouvez dicter vos idées n\'importe où (transports, marche, pause) sans contrainte de bureau.',
      },
      {
        stepNumber: 2,
        title: 'Génération du MVP complet dans le navigateur mobile',
        toolUsed: 'Bolt.new ou Lovable.dev (Safari / Chrome)',
        estimatedDuration: '1h 45min',
        instructions: [
          'Ouvrez Bolt.new ou Lovable dans votre navigateur mobile.',
          'Collez le Master Prompt généré à l\'étape 1.',
          'Laissez l\'agent d\'IA installer les packages, structurer les routes et composer l\'interface.',
          'Interagissez directement avec l\'écran tactile pour tester les boutons, filtres et modales.',
        ],
        vibeCodingPrompt: `Construis une application SaaS full-stack moderne pour "${idea}".
Technologies : React 19, TypeScript, Tailwind CSS, Lucide Icons, Shadcn UI.
Inclus :
- Une interface soignée, responsive et optimisée pour mobile et desktop
- État réactif et persistance des données
- Tableaux de bord avec filtres interactifs et métriques claires
- Modales d'action et validation de formulaire intuitive.`,
        mobileProTip: 'Basculez le smartphone en mode paysage pour prévisualiser le rendu grand écran de votre SaaS.',
      },
      {
        stepNumber: 3,
        title: 'Connexion de la base Supabase & Auth au doigt',
        toolUsed: 'Dashboard Supabase Mobile',
        estimatedDuration: '40 min',
        instructions: [
          'Créez votre projet Supabase gratuit en quelques taps.',
          'Dans SQL Editor, collez le schéma SQL généré par l\'IA pour créer vos tables.',
          'Dans Lovable ou Bolt, connectez la clé API Supabase : votre SaaS est désormais relié à une base de données mondiale.',
        ],
        vibeCodingPrompt: `Génère le script SQL Supabase pour "${idea}" avec les politiques de sécurité RLS qui permettent à chaque utilisateur de voir et modifier uniquement ses propres données.`,
        mobileProTip: 'Utilisez le gestionnaire de mots de passe de votre smartphone pour stocker et remplir vos clés d\'API en toute sécurité.',
      },
      {
        stepNumber: 4,
        title: 'Publication et mise en ligne mondiale',
        toolUsed: 'GitHub Mobile + Vercel / Netlify Mobile',
        estimatedDuration: '20 min',
        instructions: [
          'Depuis Lovable ou Bolt, cliquez sur "Export to GitHub" ou liez votre compte.',
          'Ouvrez Vercel sur votre navigateur mobile : votre projet est détecté et déployé en moins de 60 secondes.',
          'Votre site dispose immédiatement d\'une URL HTTPS sécurisée et partageable.',
        ],
        vibeCodingPrompt: `Vérifie la compatibilité de build Vite et assure-toi qu'aucune variable d'environnement critique n'est absente pour le déploiement de production.`,
        mobileProTip: 'Ajoutez votre nom de domaine personnalisé directement depuis les paramètres Vercel sur mobile.',
      },
    ],
    mobileSetupChecklist: [
      'Navigateur mobile réglé par défaut en mode zoom adapté',
      'Comptes créés sur Bolt/Lovable, GitHub, Supabase et Vercel',
      'Gestionnaire de mot de passe (iCloud Keychain, Bitwarden, 1Password) pour un copier/coller instantané des tokens',
    ],
    pitfallsToAvoid: [
      'Ne pas tenter de corriger des milliers de lignes de code manuellement : décrivez le problème à l\'agent en collant le message d\'erreur',
      'Ne pas oublier d\'activer les règles de sécurité RLS dans Supabase pour protéger les données utilisateurs',
    ],
  };
}

startServer();
