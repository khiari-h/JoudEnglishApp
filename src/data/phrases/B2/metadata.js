// src/data/exercises/phrases/b2/metadata.js

export const CATEGORIES = [
  { id: 35, name: "Arguments et débats" },
  { id: 36, name: "Avantages et inconvénients" },
  { id: 37, name: "Hypothèses et conditions" },
  { id: 38, name: "Langage des réunions et présentations" },
  { id: 39, name: "Expressions de cause et conséquence" },
  { id: 40, name: "Réclamations et résolution de problèmes" },
  { id: 41, name: "Expressions idiomatiques courantes" },
  { id: 42, name: "Communication diplomatique" },
  { id: 43, name: "Arts et littérature" },
  { id: 44, name: "Économie et politique" },
  { id: 45, name: "Processus et instructions complexes" },
  { id: 46, name: "Expressions de regret et souhait" },
  { id: 47, name: "Santé et bien-être avancés" },
  { id: 48, name: "Environnement et enjeux sociaux" }
];

export const DIFFICULTY = "B2";

export const CATEGORY_DESCRIPTIONS = {
  35: "Expressions pour structurer un argument, défendre un point de vue et participer à des débats organisés",
  36: "Phrases pour analyser et présenter de manière équilibrée les avantages et inconvénients d'une situation, d'une idée ou d'une proposition",
  37: "Expressions pour formuler des hypothèses, exprimer des conditions et explorer des scénarios hypothétiques",
  38: "Phrases professionnelles pour animer, participer à des réunions et réaliser des présentations efficaces",
  39: "Expressions pour établir des liens logiques de cause à effet et expliquer les conséquences d'actions ou de situations",
  40: "Phrases pour formuler des réclamations formelles, identifier des problèmes et proposer des solutions constructives",
  41: "Expressions idiomatiques couramment utilisées dans des contextes formels et informels pour enrichir le discours",
  42: "Phrases permettant de communiquer avec tact, d'éviter les conflits et d'exprimer des critiques constructives",
  43: "Expressions pour discuter d'œuvres artistiques et littéraires avec un vocabulaire spécialisé et nuancé",
  44: "Phrases pour aborder des sujets économiques et politiques avec précision et objectivité",
  45: "Expressions pour expliquer des processus complexes et donner des instructions détaillées en plusieurs étapes",
  46: "Phrases pour exprimer des regrets sur le passé et des souhaits pour l'avenir, en utilisant des structures conditionnelles",
  47: "Expressions avancées liées à la santé physique et mentale, aux traitements et au bien-être général",
  48: "Phrases pour discuter de manière approfondie des enjeux environnementaux et sociaux contemporains"
};

export const USAGE_NOTES = {
  formal: "Pour les contextes formels (milieux professionnels, académiques, interactions avec des inconnus ou supérieurs hiérarchiques)",
  informal: "Pour les situations informelles (entre amis, famille, collègues proches)",
  general: "Utilisable dans la plupart des contextes, à adapter selon le niveau de formalité requis",
  written: "Particulièrement adapté à la communication écrite (emails, rapports, articles)",
  spoken: "Particulièrement adapté à la communication orale (présentations, conversations, débats)",
  academic: "Adapté aux contextes académiques et scientifiques",
  business: "Spécifiquement conçu pour les environnements professionnels et commerciaux"
};

// Informations sur le niveau B2
export const LEVEL_INFO = {
  name: "B2 - Intermédiaire supérieur / Avancé indépendant",
  description: "Le niveau B2 correspond à un utilisateur indépendant avancé. À ce niveau, vous pouvez communiquer avec un degré de spontanéité et d'aisance qui rend possible une interaction normale avec un locuteur natif sans tension pour l'un ou l'autre. Vous pouvez comprendre le contenu essentiel de sujets concrets ou abstraits dans un texte complexe, y compris une discussion technique dans votre spécialité. Vous pouvez produire un discours clair et détaillé sur une grande gamme de sujets, exprimer un avis sur un sujet d'actualité et exposer les avantages et les inconvénients de différentes possibilités.",
  objectives: [
    "Participer activement à des discussions et débats en défendant son point de vue",
    "Développer une argumentation claire en soulignant les points significatifs",
    "Communiquer efficacement dans un contexte professionnel",
    "Exprimer des idées de manière nuancée avec différents degrés de certitude",
    "Formuler des hypothèses et explorer des scénarios hypothétiques",
    "Analyser et présenter les avantages et inconvénients de différentes approches",
    "Comprendre et utiliser des expressions idiomatiques courantes",
    "S'exprimer sur des sujets complexes comme l'économie, la politique ou l'environnement",
    "Rédiger des textes structurés en soulignant les points importants"
  ]
};

// Statistiques sur le contenu
export const CONTENT_STATS = {
  totalCategories: 14,
  totalPhrases: 380, // Nombre total de phrases pour le niveau B2
  phrasesPerCategory: 28, // Nombre moyen de phrases par catégorie (peut varier légèrement)
  recommendedLearningTime: "500-600 heures d'apprentissage actif"
};

// Progression suggérée
export const LEARNING_SEQUENCE = [
  "Commencer par les expressions de cause et conséquence (catégorie 39)",
  "Continuer avec les avantages et inconvénients (catégorie 36)",
  "Explorer les hypothèses et conditions (catégorie 37)",
  "Travailler sur les arguments et débats (catégorie 35)",
  "Apprendre les expressions idiomatiques courantes (catégorie 41)",
  "Développer les compétences en communication professionnelle (catégories 38, 40, 42)",
  "Aborder progressivement les sujets spécialisés (catégories 43, 44, 47, 48)",
  "Maîtriser l'expression des processus complexes et des instructions (catégorie 45)",
  "Terminer avec les expressions de regret et souhait (catégorie 46)"
];