export interface PromptItem {
  id: string;
  category: 'Idéation & PRD' | 'Vibe Coding UI' | 'Base de Données & SQL' | 'Mobile React Native' | 'Résolution de Bugs';
  title: string;
  targetTool: string;
  context: string;
  promptText: string;
  tags: string[];
}

export const PROMPTS_LIBRARY: PromptItem[] = [
  {
    id: 'prd-voice-spec',
    category: 'Idéation & PRD',
    title: 'Génération de PRD complet par dictée vocale',
    targetTool: 'ChatGPT / Claude / Gemini',
    context: 'À utiliser lors de votre session de brainstorming en marchant avec vos écouteurs.',
    promptText: `Agis comme un Principal Product Manager & Tech Lead.
Je vais te décrire mon idée d'application à l'oral. Je veux que tu transformes ma description en un PRD (Product Requirements Document) technique prêt pour du Vibe Coding.

Mon idée : "[Insérez votre dictée vocale ici]"

Structure obligatoire :
1. Objectif produit & métrique de succès
2. Les 3 personas clés et leurs flux prioritaires
3. Arborescence des écrans et composants
4. Modèle de données simplifié (Entités, Attributs)
5. Les 3 "Master Prompts" à soumettre dans l'ordre chronologique à un outil de Vibe Coding (v0/Bolt/Lovable).`,
    tags: ['PRD', 'Vocal', 'Idéation', 'Spécifications'],
  },
  {
    id: 'ui-clean-vibe',
    category: 'Vibe Coding UI',
    title: 'Master Prompt UI Moderne sans clichés d\'IA',
    targetTool: 'Bolt.new / Lovable / v0.dev',
    context: 'Pour générer une interface propre, sans bordures violettes kitsch, avec de vraies interactions fonctionnelles.',
    promptText: `Construis l'interface complète de [Nom du Projet].
Directives de design strictes :
- Palette soignée : Fond neutre sobre (ardoise profonde ou blanc cassé net), contraste WCAG AA rigoureux, accent discret sur les boutons d'action.
- Typographie : hiérarchie affirmée, pas de titres tronqués ou d'orphelins.
- Zéro gadget inutile : pas de badges superflus ni de fausses métriques factices.
- Tous les boutons, filtres et onglets doivent avoir un gestionnaire d'état actif et fonctionnel.
- Rendu parfaitement responsive avec cibles tactiles de 44px minimum pour l'usage smartphone.`,
    tags: ['UI', 'React', 'Tailwind', 'Vibe Coding'],
  },
  {
    id: 'supabase-rls-schema',
    category: 'Base de Données & SQL',
    title: 'Schéma Supabase relationnel sécurisé avec RLS',
    targetTool: 'Supabase SQL Editor',
    context: 'À coller directement dans le SQL Editor de Supabase sur votre navigateur mobile.',
    promptText: `Génère le script SQL PostgreSQL complet pour Supabase pour mon application : [Description].
Exigences :
1. Création des tables avec extensions uuid-ossp et types enum propres.
2. Clés primaires en UUID avec default gen_random_uuid().
3. Relations avec ON DELETE CASCADE adaptées.
4. Active Row Level Security (ALTER TABLE ... ENABLE ROW LEVEL SECURITY) sur TOUTES les tables sans exception.
5. Crée les politiques de sécurité (CREATE POLICY) pour que chaque utilisateur connecté ne puisse lire, insérer, modifier et supprimer UNIQUEMENT ses propres enregistrements (auth.uid() = user_id).
6. Ajoute des triggers pour mettre à jour automatiquement le champ updated_at.`,
    tags: ['Supabase', 'SQL', 'RLS', 'PostgreSQL', 'Sécurité'],
  },
  {
    id: 'expo-router-native',
    category: 'Mobile React Native',
    title: 'Squelette Expo Router avec TabBar tactile et vibrations',
    targetTool: 'Expo Snack / Claude',
    context: 'Pour générer une application React Native tactile immédiatement testable dans Expo Go.',
    promptText: `Crée la structure d'une application mobile native avec Expo Router et React Native pour : [Description].
Inclus impérativement :
- Navigation par onglets inférieurs avec icônes nettes et état actif coloré
- Utilisation de expo-haptics pour déclencher une vibration tactile légère à chaque tap
- SafeAreaView pour éviter l'encoche et la barre d'accueil de l'iPhone/Android
- Composant Swipeable pour les actions rapides au doigt
- Gestion d'état local réactif fluide à 60 FPS sans lag.`,
    tags: ['Expo', 'React Native', 'Mobile Natif', 'Haptics'],
  },
  {
    id: 'debug-error-paste',
    category: 'Résolution de Bugs',
    title: 'Correction chirurgicale d\'erreur sur smartphone',
    targetTool: 'Claude / ChatGPT / Gemini',
    context: 'Quand un build échoue ou qu\'une erreur rouge apparaît sur votre téléphone.',
    promptText: `Voici l'erreur exacte que je viens d'obtenir sur mon environnement mobile :
\`\`\`
[Collez ici la capture de texte ou les logs d'erreur]
\`\`\`

Voici le contexte de mon application : [Nom de l'outil et framework utilisé].
Consignes :
1. Explique en UNE phrase la cause racine du problème.
2. Fournis le code corrigé complet ou la commande terminal exacte à exécuter.
3. Ne me donne pas de théorie superflue : je suis sur smartphone, j'ai juste besoin de la solution prête à copier.`,
    tags: ['Debug', 'Erreur', 'Quick Fix', 'Terminal'],
  },
];
