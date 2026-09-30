export interface ErgonomicTip {
  id: string;
  category: 'Claviers & Saisie' | 'Navigateurs & Réglages' | 'Matériel Nomade' | 'Mindset Vibe Coding';
  title: string;
  description: string;
  actionableStep: string;
  badge: string;
  system: 'iOS & Android' | 'Android Spécifique' | 'iOS Spécifique';
}

export const ERGONOMIC_TIPS: ErgonomicTip[] = [
  {
    id: 'voice-first-coding',
    category: 'Claviers & Saisie',
    title: 'La Dictée Vocale Continue comme IDE principal',
    description: 'Taper du texte sur un clavier virtuel est lent et source de fautes. La dictée vocale moderne (Gboard, Apple Dictation, Whisper) transcrit le langage naturel à plus de 150 mots par minute avec ponctuation automatique.',
    actionableStep: 'Sur votre clavier, appuyez sur l\'icône du microphone. Dictez vos prompts en précisant la ponctuation : "Crée une section avec trois cartes virgule un fond sombre et un bouton bleu point d\'exclamation".',
    badge: 'Gain de temps x4',
    system: 'iOS & Android',
  },
  {
    id: 'text-replacement-snippets',
    category: 'Claviers & Saisie',
    title: 'Raccourcis de remplacement de texte pour les Prompts',
    description: 'Configurez des abréviations dans les paramètres de votre smartphone qui se transforment instantanément en prompts techniques complets.',
    actionableStep: 'Allez dans Réglages > Clavier > Remplacement de texte. Associez "!vibe" au prompt : "Tu es un ingénieur senior React 19 et Tailwind CSS. Code propre, typé, accessible WCAG, responsive tactile."',
    badge: 'Astuce Pro',
    system: 'iOS & Android',
  },
  {
    id: 'hackers-keyboard',
    category: 'Claviers & Saisie',
    title: 'Hacker\'s Keyboard : Les touches Ctrl, Alt et Tab sur Android',
    description: 'Pour utiliser Termux, Nano, Git ou un terminal sur smartphone, le clavier par défaut manque de touches de contrôle essentielles.',
    actionableStep: 'Installez "Hacker\'s Keyboard" depuis F-Droid ou le Play Store. Vous disposez d\'une disposition complète de 5 rangées avec touches Ctrl+C, Ctrl+Z, Tabulation et flèches directionnelles.',
    badge: 'Indispensable Terminal',
    system: 'Android Spécifique',
  },
  {
    id: 'home-screen-pwa-shortcut',
    category: 'Navigateurs & Réglages',
    title: 'Installer un outil sur l\'écran d\'accueil (Mode Plein Écran PWA)',
    description: 'Transforme n\'importe quel site ou atelier web (comme Google AI Studio, Bolt.new ou Replit) en véritable application autonome sans les barres de navigation Safari ou Chrome qui rognent l\'écran.',
    actionableStep: 'Sur iPhone (Safari) : touchez l\'icône Partager (carré avec flèche vers le haut) > "Sur l\'écran d\'accueil" > "Ajouter". Sur Android (Chrome) : touchez les 3 points > "Ajouter à l\'écran d\'accueil" ou "Installer".',
    badge: 'Confort 100% Plein Écran',
    system: 'iOS & Android',
  },
  {
    id: 'desktop-mode-browsers',
    category: 'Navigateurs & Réglages',
    title: 'Activer le mode "Version pour ordinateur" en 1 clic',
    description: 'Certains outils de vibe coding comme Bolt.new ou Replit adaptent leur interface s\'ils détectent un écran mobile. Passer en mode bureau débloque la vue partagée Code + Preview.',
    actionableStep: 'Sur Safari : touchez l\'icône "aA" à gauche de l\'URL > "Version pour ordinateur". Sur Chrome : touchez les 3 points verticaux > cochez "Version pour ordinateur".',
    badge: 'Affichage Débloqué',
    system: 'iOS & Android',
  },
  {
    id: 'eruda-mobile-inspector',
    category: 'Navigateurs & Réglages',
    title: 'Inspecteur DevTools complet sur smartphone avec Eruda',
    description: 'Pas besoin d\'ordinateur pour voir la console JavaScript, les erreurs de réseau ou inspecter le CSS sur votre téléphone.',
    actionableStep: 'Ajoutez un favori dans votre navigateur mobile avec le script Eruda : `javascript:(function(){var script=document.createElement(\'script\');script.src="//cdn.jsdelivr.net/npm/eruda";document.body.appendChild(script);script.onload=function(){eruda.init()}})();`. Cliquez dessus sur n\'importe quelle page pour faire apparaître la console F12 !',
    badge: 'Super-pouvoir Debug',
    system: 'iOS & Android',
  },
  {
    id: 'folding-keyboard-pocket',
    category: 'Matériel Nomade',
    title: 'Le Mini Clavier Pliable Bluetooth de poche (20 €)',
    description: 'Un clavier qui se plie en trois parties tient dans la poche de votre veste et pèse moins de 150 grammes. Il transforme n\'importe quelle table de café ou siège de train en bureau de développement.',
    actionableStep: 'Choisissez un modèle tri-fold avec trackpad intégré. Il s\'appaire en 2 secondes en Bluetooth à votre iPhone ou Android.',
    badge: 'Ergonomie Matérielle',
    system: 'iOS & Android',
  },
  {
    id: 'magsafe-ring-stand',
    category: 'Matériel Nomade',
    title: 'Support magnétique orientable (Portrait & Paysage)',
    description: 'Maintenir son téléphone à bout de bras fatigue les poignets. Un anneau magnétique ou support MagSafe permet de poser le téléphone à un angle parfait de 60°.',
    actionableStep: 'Orientez le smartphone en mode Paysage pour le Vibe Coding (vue large) et en mode Portrait pour tester l\'expérience utilisateur mobile finale.',
    badge: 'Confort Vertébral',
    system: 'iOS & Android',
  },
  {
    id: 'vibe-sprints-mindset',
    category: 'Mindset Vibe Coding',
    title: 'Le Découpage en Micro-Sprints de 3 à 5 minutes',
    description: 'Sur smartphone, la pire méthode est de vouloir coder pendant 4 heures d\'affilée. La meilleure méthode est l\'asynchrone : soumettez un prompt précis, laissez l\'agent travailler pendant que vous faites autre chose, puis validez le résultat.',
    actionableStep: 'Règle d\'or : 1 prompt vocal = 1 fonctionnalité atomique (ex: "Ajoute la validation de l\'adresse email"). Dès que l\'agent commence, fermez le téléphone ou changez d\'app, puis revenez tester.',
    badge: 'Productivité Extrême',
    system: 'iOS & Android',
  },
];
