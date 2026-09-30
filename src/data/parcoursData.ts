export interface ParcoursStep {
  stepNumber: number;
  title: string;
  tool: string;
  duration: string;
  description: string;
  actions: string[];
  vibePrompt: string;
  mobileTip: string;
}

export interface Parcours {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  badge: string;
  duration: string;
  cost: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Tous niveaux';
  mobileScore: number; // /10
  iconName: string;
  heroSummary: string;
  stack: { name: string; role: string; icon: string }[];
  steps: ParcoursStep[];
  realWorldExample: {
    name: string;
    description: string;
    builtIn: string;
  };
  keyPitfalls: string[];
}

export const PARCOURS_LIST: Parcours[] = [
  {
    id: 'landing_showcase',
    title: 'Sites Web & Landing Pages Vitrines',
    subtitle: 'Créer un site moderne, ultra-rapide et optimisé SEO en moins de 2 heures',
    tagline: 'De l\'idée au nom de domaine personnalisé directement depuis votre navigateur smartphone',
    badge: 'Idéal pour démarrer',
    duration: '1h à 2h',
    cost: '0 € (Hébergement gratuit)',
    difficulty: 'Débutant',
    mobileScore: 9.8,
    iconName: 'Globe',
    heroSummary: 'Concevez des pages d\'atterrissage de niveau professionnel, des portfolios ou des sites vitrines pour clients sans écrire une seule ligne de code à la main, grâce au vibe coding sur v0, Lovable ou Bolt.new combiné à Cloudflare Pages.',
    stack: [
      { name: 'v0.dev / Bolt.new', role: 'Vibe Coding & Génération UI React', icon: 'Sparkles' },
      { name: 'Dictée Vocale Smartphone', role: 'Idéation et rédaction des prompts sans taper', icon: 'Mic' },
      { name: 'Unsplash / Gemini', role: 'Génération et sélection d\'assets visuels', icon: 'Image' },
      { name: 'GitHub Mobile', role: 'Gestion du dépôt de code au doigt', icon: 'Github' },
      { name: 'Vercel / Cloudflare Pages', role: 'Déploiement mondial avec HTTPS gratuit', icon: 'Zap' },
    ],
    realWorldExample: {
      name: 'Landing d\'un restaurant gastronomique avec réservation WhatsApp',
      description: 'Site vitrine avec carte des menus, photos haute définition, avis clients et bouton de réservation direct vers WhatsApp.',
      builtIn: '45 minutes dans le train',
    },
    keyPitfalls: [
      'Vouloir éditer le CSS ligne par ligne sur écran tactile : demandez toujours à l\'IA de réajuster le style ("augmente l\'espacement et rends le texte plus lisible")',
      'Oublier de tester le menu hamburger sur son propre téléphone (l\'avantage d\'être sur mobile est que vous êtes votre premier testeur !)',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Brainstorming & Structure par dictée vocale',
        tool: 'ChatGPT / Claude / Gemini App',
        duration: '15 min',
        description: 'Utilisez vos écouteurs pour décrire verbalement l\'objectif du site, votre cible et les sections indispensables (Hero, Services, Preuves, FAQ, Contact).',
        actions: [
          'Activez la dictée vocale continue sur votre clavier ou l\'app IA',
          'Présentez l\'offre commerciale et demandez la structure complète de la landing page',
          'Demandez à l\'IA de formater le prompt initial pour v0 ou Bolt.new',
        ],
        vibePrompt: `Agis comme un designer web senior expert en conversion.
Je veux créer une landing page moderne pour [décrire votre activité].
Génère :
1. Une proposition de valeur percutante en 1 titre + 1 sous-titre
2. Les 5 sections indispensables avec les arguments clés
3. Le Master Prompt structuré prêt à être collé dans v0.dev ou Bolt.new avec React et Tailwind CSS.`,
        mobileTip: 'Parlez naturellement comme si vous racontiez votre projet à un ami : la dictée vocale moderne capture les nuances sans aucune fatigue.',
      },
      {
        stepNumber: 2,
        title: 'Vibe Coding de l\'interface sur navigateur mobile',
        tool: 'Bolt.new ou v0.dev (Safari / Chrome)',
        duration: '40 min',
        description: 'Ouvrez l\'outil de vibe coding directement dans le navigateur de votre smartphone, collez le Master Prompt et regardez l\'interface s\'assembler en direct.',
        actions: [
          'Activez l\'option "Version pour ordinateur" si vous souhaitez voir l\'aperçu et le chat simultanément',
          'Collez le prompt et lancez la génération',
          'Testez les interactions au doigt : scroll, boutons, animations',
          'Ajustez par requêtes courtes : "Remplace la couleur d\'accent par un bleu marine profond" ou "Rends le formulaire plus compact"',
        ],
        vibePrompt: `Crée une landing page ultra-moderne et responsive pour [Mon Projet].
Stack : React, Tailwind CSS, Lucide React.
Règles :
- Design épuré, typographie soignée et grands espaces
- Section Hero avec CTA fort et preuve sociale immédiate
- Section Fonctionnalités avec cartes élégantes
- FAQ en accordéon cliquable
- Formulaire de contact avec validation immédiate.`,
        mobileTip: 'Pour prévisualiser le rendu desktop depuis votre mobile, pivotez simplement votre téléphone en mode paysage.',
      },
      {
        stepNumber: 3,
        title: 'Exportation vers GitHub en 1 tap',
        tool: 'Interface Bolt / Lovable + GitHub Mobile',
        duration: '10 min',
        description: 'Connectez votre compte GitHub gratuit et cliquez sur "Deploy to GitHub" ou "Export". Votre code source est sauvegardé dans le cloud.',
        actions: [
          'Cliquez sur l\'icône GitHub en haut de l\'écran de l\'outil de vibe coding',
          'Autorisez la création d\'un nouveau dépôt (ex: `mon-site-vitrine`)',
          'Ouvrez l\'application GitHub Mobile pour vérifier que tous les fichiers sont en ligne',
        ],
        vibePrompt: `(Action d'export automatique intégrée dans l'interface de l'outil)`,
        mobileTip: 'L\'application officielle GitHub Mobile vous permet de modifier un fichier texte ou un texte d\'accroche directement au doigt en cas de typo.',
      },
      {
        stepNumber: 4,
        title: 'Mise en ligne mondiale & Domaine personnalisé',
        tool: 'Vercel Mobile Web ou Cloudflare Pages',
        duration: '15 min',
        description: 'Liez votre dépôt GitHub à Vercel. En moins de 45 secondes, votre site est compilé et accessible sur une adresse en `.vercel.app` sécurisée avec certificat SSL.',
        actions: [
          'Ouvrez vercel.com dans votre navigateur mobile',
          'Cliquez sur "Add New Project" et sélectionnez votre dépôt',
          'Validez en cliquant sur "Deploy"',
          'Optionnel : ajoutez votre nom de domaine acheté chez Cloudflare ou Namecheap en modifiant les DNS depuis votre smartphone',
        ],
        vibePrompt: `(Déploiement automatique sans configuration de serveur)`,
        mobileTip: 'Vous recevez une notification dès que le site est en ligne. Vous pouvez partager le lien directement par SMS, WhatsApp ou LinkedIn !',
      },
    ],
  },
  {
    id: 'saas_fullstack',
    title: 'Applications Web & SaaS Full-Stack',
    subtitle: 'Créer un logiciel SaaS complet avec base de données, comptes clients et paiements Stripe',
    tagline: 'L\'arsenal des fondateurs modernes qui pilotent leur startup depuis leur poche',
    badge: 'Le plus puissant',
    duration: '3h à 6h',
    cost: '0 € (Tier gratuit Supabase + Vercel)',
    difficulty: 'Intermédiaire',
    mobileScore: 9.4,
    iconName: 'Layers',
    heroSummary: 'Développez un produit SaaS complet comprenant l\'authentification sécurisée, la persistance des données en temps réel dans une base PostgreSQL Supabase, un dashboard interactif et la facturation, entièrement guidé par des agents de vibe coding.',
    stack: [
      { name: 'Lovable.dev / Replit Mobile', role: 'Vibe Coding Full-Stack avec agents IA', icon: 'Cpu' },
      { name: 'Supabase Mobile Web', role: 'Base PostgreSQL, Row Level Security & Auth', icon: 'Database' },
      { name: 'Clerk ou Supabase Auth', role: 'Connexion Google & Email sans coder l\'auth', icon: 'Lock' },
      { name: 'Stripe Mobile Dashboard', role: 'Gestion des abonnements et paiements', icon: 'CreditCard' },
      { name: 'GitHub & Vercel', role: 'Intégration continue et hébergement serverless', icon: 'Cloud' },
    ],
    realWorldExample: {
      name: 'Micro-SaaS de facturation pour freelances avec devis PDF',
      description: 'Application avec espace client, création de devis en 3 clics, export PDF et suivi des paiements en temps réel.',
      builtIn: '4 heures réparties sur 2 soirées',
    },
    keyPitfalls: [
      'Oublier d\'activer les politiques de sécurité RLS (Row Level Security) dans Supabase : vos utilisateurs pourraient voir les données des autres !',
      'Tenter de déboguer des erreurs complexes de bundle à l\'écran : copiez le message d\'erreur intégral et collez-le directement à l\'agent IA pour qu\'il le corrige lui-même.',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Architecture des données & Modèle relationnel',
        tool: 'ChatGPT / Claude / Gemini App',
        duration: '30 min',
        description: 'Définissez le modèle de données de votre SaaS : tables, relations, droits d\'accès et flux business.',
        actions: [
          'Détaillez le rôle de chaque entité (utilisateurs, projets, factures, abonnements)',
          'Générez le schéma SQL Supabase prêt à l\'emploi avec contraintes d\'intégrité',
          'Demandez les politiques de sécurité Row Level Security (RLS)',
        ],
        vibePrompt: `Je construis un SaaS nommé [Nom] dont le principe est : [Principe].
Génère le script SQL complet pour Supabase comprenant :
1. La création des tables avec UUID et timestamps
2. Les relations de clés étrangères (Foreign Keys)
3. L'activation de RLS sur toutes les tables
4. Les politiques de sécurité (chaque utilisateur accède UNIQUEMENT à ses propres lignes via auth.uid())
5. Les index nécessaires pour les performances.`,
        mobileTip: 'Copiez le script SQL généré directement dans le presse-papiers de votre smartphone.',
      },
      {
        stepNumber: 2,
        title: 'Initialisation de la base Supabase au doigt',
        tool: 'Supabase Mobile Web (app.supabase.com)',
        duration: '20 min',
        description: 'Créez un projet sur le cloud Supabase gratuit depuis votre navigateur mobile et appliquez les migrations SQL.',
        actions: [
          'Créez un nouveau projet gratuit en choisissant la région la plus proche',
          'Ouvrez le "SQL Editor" dans le menu latéral',
          'Collez le script SQL généré à l\'étape 1 et cliquez sur "Run"',
          'Vérifiez dans "Table Editor" que vos tables sont prêtes avec leurs colonnes',
          'Copiez l\'URL de l\'API et la clé `anon public` dans les notes de votre téléphone',
        ],
        vibePrompt: `(Exécution directe du script SQL dans le SQL Editor Supabase)`,
        mobileTip: 'L\'interface mobile de Supabase est entièrement responsive et permet de naviguer dans vos tables avec une ergonomie tactile remarquable.',
      },
      {
        stepNumber: 3,
        title: 'Vibe Coding du SaaS avec Lovable ou Replit Agent',
        tool: 'Lovable.dev ou Replit Mobile App',
        duration: '2h',
        description: 'Donnez à l\'agent de vibe coding vos clés Supabase et laissez-le générer les interfaces, les formulaires, l\'authentification et les requêtes.',
        actions: [
          'Ouvrez Lovable ou Replit Mobile (app native disponible sur iOS/Android)',
          'Donnez la directive initiale avec les clés Supabase',
          'L\'agent configure automatiquement l\'authentification (login/signup), la gestion de session et les écrans CRUD',
          'Testez en temps réel la création d\'un compte utilisateur sur votre téléphone',
        ],
        vibePrompt: `Construis l'application SaaS complète avec React 19, Tailwind CSS et Supabase.
Intègre :
- Page d'accueil avec présentation et tarification
- Système d'authentification complet (Inscription, Connexion, Mot de passe oublié)
- Dashboard utilisateur protégé par auth guard
- Opérations CRUD complètes sur les données avec feedback toast
- Gestion des états de chargement (skeletons) et états vides élégants.`,
        mobileTip: 'Sur Replit Mobile, vous disposez d\'un véritable IDE avec émulateur web intégré et terminal Linux sous les doigts.',
      },
      {
        stepNumber: 4,
        title: 'Intégration du paiement Stripe sans code serveur lourd',
        tool: 'Stripe Payment Links ou Supabase Edge Functions',
        duration: '45 min',
        description: 'Activez les abonnements payants en utilisant les Payment Links de Stripe gérés depuis le navigateur ou l\'app mobile Stripe.',
        actions: [
          'Ouvrez le dashboard Stripe sur mobile et créez un produit avec prix mensuel',
          'Générez un "Payment Link" partageable',
          'Indiquez à votre agent de vibe coding de rediriger le bouton "Passer Pro" vers ce lien et de webhook le statut',
        ],
        vibePrompt: `Intègre un bouton "Passer au forfait Pro" qui redirige vers mon lien Stripe Payment Link. Configure la gestion visuelle du badge "Pro" dans le profil utilisateur.`,
        mobileTip: 'L\'application officielle Stripe Mobile vous envoie une notification push avec sonnerie de caisse enregistreuse à chaque vente réalisée !',
      },
      {
        stepNumber: 5,
        title: 'Lancement et supervision en temps réel',
        tool: 'Vercel App / Supabase App sur smartphone',
        duration: '20 min',
        description: 'Votre SaaS est en production mondiale avec monitoring de logs et analyse des utilisateurs.',
        actions: [
          'Validez le build final sur Vercel',
          'Consultez les métriques d\'usage et inscriptions en temps réel sur Supabase',
        ],
        vibePrompt: `(Déploiement continu automatisé à chaque commit)`,
        mobileTip: 'Ajoutez l\'icône de votre SaaS sur l\'écran d\'accueil de votre smartphone pour l\'utiliser exactement comme une application native.',
      },
    ],
  },
  {
    id: 'native_mobile_apps',
    title: 'Applications Mobiles Natives (iOS & Android)',
    subtitle: 'Créer de véritables applications téléchargeables sur l\'App Store et le Play Store',
    tagline: 'L\'effet magique : concevoir et tester une application sur le smartphone même qui l\'exécute !',
    badge: 'Magie Pure',
    duration: '4h à 8h',
    cost: '0 € (Expo gratuit, compte Store optionnel)',
    difficulty: 'Intermédiaire',
    mobileScore: 9.6,
    iconName: 'Smartphone',
    heroSummary: 'Le summum de l\'ergonomie nomade : vous créez une application mobile React Native ou Flutter directement dans le navigateur de votre smartphone, et vous la testez instantanément en live-reload sur ce MÊME téléphone grâce à Expo Go. Zéro Mac, zéro Xcode, zéro PC.',
    stack: [
      { name: 'Expo Snack / GitHub Codespaces', role: 'Éditeur React Native cloud dans le navigateur mobile', icon: 'Code' },
      { name: 'Expo Go (App iOS & Android)', role: 'Exécution native immédiate avec rechargement à chaud', icon: 'Play' },
      { name: 'FlutterFlow Web Mobile', role: 'Alternative No-Code visuelle tactile pour Flutter', icon: 'Layout' },
      { name: 'Supabase Mobile', role: 'Base de données mobile et synchronisation hors-ligne', icon: 'Database' },
      { name: 'Expo EAS Build', role: 'Ferme de compilation cloud pour générer .APK et .IPA', icon: 'Package' },
    ],
    realWorldExample: {
      name: 'Application de suivi d\'habitudes et de méditation avec notifications push',
      description: 'App avec retour haptique vibrant, minuteur visuel, statistiques graphiques et alertes locales programmées.',
      builtIn: '5 heures de développement nomade',
    },
    keyPitfalls: [
      'Vouloir installer des dépendances C++ natives sans passer par le workflow Expo : privilégiez l\'écosystème officiel Expo SDK (caméra, géolocalisation, capteurs, haptique)',
      'Ne pas tester la gestion du mode sombre ou de la zone d\'encoche (SafeAreaView).',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Conception des écrans tactiles & Expérience utilisateur',
        tool: 'Claude / ChatGPT / Gemini Mobile',
        duration: '30 min',
        description: 'Structurez les écrans avec les spécificités du mobile : gestes tactiles, retour haptique, barre d\'onglets basse et SafeArea.',
        actions: [
          'Définissez les 3 à 4 onglets principaux de l\'application',
          'Demandez le code React Native utilisant `expo-router` et `@react-navigation`',
          'Prévoyez l\'utilisation de `expo-haptics` pour faire vibrer le téléphone sur les actions importantes',
        ],
        vibePrompt: `Tu es un développeur expert React Native et Expo.
Je veux créer une application mobile native : [Description].
Génère la structure complète du projet avec Expo Router :
1. Layout racine avec Tab Navigation tactile
2. 3 écrans soignés avec SafeAreaView, Tailwind (NativeWind) ou StyleSheet propre
3. Intégration de expo-haptics pour les retours tactiles
4. Gestion des états réactifs et persistance avec AsyncStorage ou Supabase.`,
        mobileTip: 'Pensez à la règle de la zone du pouce : les boutons d\'action majeurs doivent toujours se trouver dans les 40% inférieurs de l\'écran.',
      },
      {
        stepNumber: 2,
        title: 'Initialisation dans Expo Snack depuis le navigateur',
        tool: 'snack.expo.dev sur mobile',
        duration: '45 min',
        description: 'Snack est l\'environnement officiel d\'Expo qui fonctionne dans n\'importe quel navigateur web de smartphone.',
        actions: [
          'Ouvrez snack.expo.dev dans Safari ou Chrome',
          'Collez le code React Native généré par l\'IA',
          'Cliquez sur l\'onglet "My Device" ou scannez le QR code (ou ouvrez l\'URL directe de Snack dans Expo Go)',
        ],
        vibePrompt: `(Code React Native collé dans l'arborescence de fichiers de Snack)`,
        mobileTip: 'Snack synchronise votre code en moins d\'une seconde : modifiez une couleur ou un texte, et votre écran se met à jour instantanément.',
      },
      {
        stepNumber: 3,
        title: 'Test natif en direct dans l\'app Expo Go',
        tool: 'Application officielle Expo Go',
        duration: '2h',
        description: 'Votre smartphone exécute l\'application exactement comme si elle avait été téléchargée depuis l\'App Store, avec accès à la caméra, à l\'accéléromètre et aux vibrations.',
        actions: [
          'Ouvrez Expo Go sur votre téléphone',
          'Votre projet apparaît automatiquement dans la liste des projets récents',
          'Touchez pour ouvrir : votre application se lance avec le moteur JavaScript natif',
          'Secouez le téléphone avec votre main pour afficher le menu de dev et inspecter les logs',
        ],
        vibePrompt: `Améliore l'écran [Nom] en ajoutant un geste de balayage pour supprimer (Swipeable) et une animation de transition fluide avec react-native-reanimated.`,
        mobileTip: 'Vous pouvez prêter votre téléphone à vos proches ou envoyer le lien Expo Go pour qu\'ils testent l\'application sur leur propre smartphone immédiatement.',
      },
      {
        stepNumber: 4,
        title: 'Compilation Cloud EAS sans ordinateur',
        tool: 'EAS Build Cloud (expo.dev)',
        duration: '30 min',
        description: 'Traditionnellement, il fallait un Mac avec Xcode à 1500€ pour compiler une app iOS. Avec EAS Build, les serveurs d\'Expo compilent votre application dans le cloud.',
        actions: [
          'Liez votre compte GitHub à Expo',
          'Dans le tableau de bord mobile expo.dev, lancez un "Build"',
          'Les serveurs cloud compilent le fichier `.apk` pour Android ou envoient la version sur Apple TestFlight',
          'Vous recevez un lien de téléchargement direct sur votre smartphone pour installer l\'app en 1 clic !',
        ],
        vibePrompt: `Génère la configuration eas.json pour compiler un profil preview APK installable immédiatement sur smartphone Android sans passer par le Play Store.`,
        mobileTip: 'Vous pouvez installer le fichier APK directement sur votre téléphone Android en appuyant sur le lien reçu.',
      },
    ],
  },
  {
    id: 'scripts_bots_software',
    title: 'Logiciels, Scripts & Bots Automatisés',
    subtitle: 'Créer des bots Telegram/Discord, des scrapers de données et des automatisations cloud 24h/24',
    tagline: 'Transformez votre smartphone en terminal de contrôle de logiciels autonomes',
    badge: 'Automatisation Pure',
    duration: '2h à 4h',
    cost: '0 € (Railway/Modal + Termux)',
    difficulty: 'Tous niveaux',
    mobileScore: 9.7,
    iconName: 'Terminal',
    heroSummary: 'Exécutez de vrais environnements Linux (Python, Node.js, Git) directement sur le processeur de votre téléphone avec Termux ou iSH, faites coder vos bots et scrapers par l\'IA, et déployez-les dans le cloud pour qu\'ils tournent 24h/24 sans dépendre de votre batterie.',
    stack: [
      { name: 'Termux (Android) / iSH (iOS)', role: 'Terminal Linux complet natif sur smartphone', icon: 'Terminal' },
      { name: 'Claude / ChatGPT / Gemini', role: 'Génération chirurgicale de scripts Python & Bash', icon: 'Cpu' },
      { name: 'Make.com / n8n Cloud', role: 'Automatisation visuelle sans code & webhooks', icon: 'Workflow' },
      { name: 'Railway / Modal / Render', role: 'Hébergement cloud 24h/24 des scripts et bots', icon: 'Server' },
      { name: 'Telegram Bot API / Discord', role: 'Interface utilisateur conversationnelle de votre logiciel', icon: 'Send' },
    ],
    realWorldExample: {
      name: 'Bot Telegram de veille des prix de billets d\'avion et alerte instantanée',
      description: 'Script Python qui scrape les comparateurs toutes les 30 minutes et envoie une alerte Telegram avec bouton d\'achat dès qu\'un prix baisse de plus de 30%.',
      builtIn: '2 heures dans un café',
    },
    keyPitfalls: [
      'Laisser tourner un script lourd en boucle infinie sur son smartphone : la batterie va se vider et le système d\'exploitation risque de tuer le processus en tâche de fond. Utilisez toujours Railway ou Modal pour la production 24/7.',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Spécification et génération du script par l\'IA',
        tool: 'Assistant IA Mobile',
        duration: '20 min',
        description: 'Décrivez précisément ce que votre logiciel autonome doit faire, quelles API il interroge et comment il notifie les résultats.',
        actions: [
          'Formulez la tâche d\'automatisation avec les bibliothèques recommandées (ex: `python-telegram-bot`, `httpx`, `beautifulsoup4`)',
          'Demandez un script prêt à l\'emploi avec gestion des erreurs et reconnexion automatique',
        ],
        vibePrompt: `Écris un script Python 3 de production pour [Description de la tâche du bot].
Exigences :
- Utilise des variables d'environnement (.env) pour les jetons de sécurité
- Gestion des erreurs avec retries exponentiels
- Logging clair avec horodatage
- Fournis le fichier requirements.txt et la commande d'installation en une ligne.`,
        mobileTip: 'Demandez à l\'IA de structurer le code en fonctions courtes faciles à lire sur un écran vertical.',
      },
      {
        stepNumber: 2,
        title: 'Test local immédiat sur le processeur du smartphone',
        tool: 'Termux (Android) ou iSH Shell (iOS)',
        duration: '35 min',
        description: 'Votre téléphone est un ordinateur surpuissant. Ouvrez votre terminal mobile pour exécuter le script en local.',
        actions: [
          'Installez Python : tapez `pkg install python git` (ou `apk add python3` sous iSH)',
          'Créez le fichier de script ou clonez votre dépôt',
          'Installez les dépendances avec `pip install -r requirements.txt`',
          'Lancez le script avec `python bot.py` et observez la magie opérer !',
        ],
        vibePrompt: `Donne-moi les commandes exactes à taper dans Termux pour créer un environnement virtuel Python et exécuter le script sans erreur de permission.`,
        mobileTip: 'Sur Android, installez le clavier virtuel "Hacker\'s Keyboard" pour disposer des touches Ctrl, Tab et des flèches pour naviguer dans le terminal.',
      },
      {
        stepNumber: 3,
        title: 'Déploiement sur le cloud pour exécution 24h/24',
        tool: 'Railway.app ou Modal.com sur mobile',
        duration: '25 min',
        description: 'Pour que votre bot tourne même quand votre smartphone est éteint ou en mode avion, confiez-le à un conteneur cloud gratuit.',
        actions: [
          'Poussez le code sur GitHub depuis votre terminal mobile (`git push`) ou via l\'app GitHub',
          'Ouvrez Railway.app dans votre navigateur mobile et cliquez sur "Deploy from GitHub"',
          'Renseignez les variables d\'environnement secrètes (vos tokens d\'API)',
          'Votre bot est actif 24h/24 sur des serveurs haute disponibilité !',
        ],
        vibePrompt: `Génère le fichier Procfile ou Dockerfile ultra-léger pour déployer ce bot Python sur Railway en 1 clic.`,
        mobileTip: 'Vous pouvez suivre les logs de votre bot en temps réel directement sur le tableau de bord mobile de Railway.',
      },
    ],
  },
];
