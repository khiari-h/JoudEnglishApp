// src/data/exercises/phrases/bonus/metadata.js

export const CATEGORIES = [
  { id: 55, name: "Slang Conversations" },
  { id: 56, name: "Workplace Casual" },
  { id: 57, name: "Reactions & Emotions" },
  { id: 58, name: "Small Talk & Social" },
  { id: 59, name: "Food & Restaurant" },
  { id: 60, name: "Problems & Complaints" },
  { id: 61, name: "Phrasal Verbs in Context" },
  { id: 62, name: "Relationship Dynamics" },
  { id: 63, name: "Modern Life Situations" },
  { id: 64, name: "Shopping & Consumer" }
];

export const DIFFICULTY = "BONUS";

export const CATEGORY_DESCRIPTIONS = {
  55: "Expressions authentiques du slang moderne et conversations décontractées entre natifs avec vocabulaire générationnel",
  56: "Phrases et jargon professionnel décontracté utilisés dans les environnements de travail modernes et startups",
  57: "Expressions naturelles et spontanées pour communiquer des émotions intenses et des réactions authentiques",
  58: "Conversations sociales légères et naturelles pour tisser des liens et maintenir des relations interpersonnelles",
  59: "Expressions culinaires natives pour restaurants, critiques gastronomiques et discussions sur la nourriture",
  60: "Formulations assertives et directes pour exprimer des frustrations et résoudre des problèmes de manière efficace",
  61: "Phrasal verbs contextualisés dans des situations réelles avec les nuances d'usage des locuteurs natifs",
  62: "Expressions authentiques sur les relations humaines, l'amour, l'amitié et les dynamiques interpersonnelles complexes",
  63: "Conversations sur les défis et situations typiques de la vie moderne, technology et société contemporaine",
  64: "Expressions natives pour le shopping, les achats en ligne, les retours et l'expérience consommateur moderne"
};

export const USAGE_NOTES = {
  casual: "Pour les conversations décontractées entre amis, famille et collègues proches",
  authentic: "Langage réel utilisé par les natifs dans des situations authentiques du quotidien",
  informal: "Registre informel adapté aux interactions sociales et professionnelles relaxed",
  conversational: "Adapté aux conversations orales spontanées et aux échanges naturels",
  modern: "Vocabulaire et expressions contemporaines reflétant l'usage actuel de la langue",
  emotional: "Pour exprimer des émotions authentiques et des réactions spontanées",
  social_media: "Langage adapté aux interactions sur les réseaux sociaux et communication digitale",
  workplace_informal: "Jargon professionnel décontracté des environnements de travail modernes"
};

// Informations sur le niveau BONUS
export const LEVEL_INFO = {
  name: "BONUS - Niveau natif authentique",
  description: "Le niveau BONUS correspond à la maîtrise native authentique de l'anglais contemporain. À ce niveau, vous utilisez la langue comme un locuteur natif éduqué, avec toutes les nuances, le slang moderne, et les subtilités culturelles. Vous comprenez les références implicites, l'humour, le sarcasme, et vous exprimez naturellement dans tous les registres selon le contexte. Votre anglais sonne authentique et naturel, pas appris.",
  objectives: [
    "Maîtriser le slang et les expressions contemporaines des natifs",
    "Communiquer avec authenticité dans tous les contextes sociaux",
    "Exprimer des émotions complexes avec nuance et spontanéité", 
    "Naviguer les situations sociales avec aisance culturelle",
    "Utiliser les phrasal verbs comme un natif avec toutes leurs subtilités",
    "Gérer les conflits et problèmes avec assertivité naturelle",
    "Discuter de sujets modernes avec vocabulaire contemporain",
    "Comprendre et utiliser les références culturelles implicites",
    "Adapter son registre de langue selon le contexte social"
  ]
};

// Statistiques sur le contenu
export const CONTENT_STATS = {
  totalCategories: 10,
  totalPhrases: 100, // 10 phrases par catégorie
  phrasesPerCategory: 10,
  recommendedLearningTime: "300-400 heures de pratique conversationnelle avec natifs",
  targetLevel: "Post-C2 / Native fluency"
};

// Progression suggérée
export const LEARNING_SEQUENCE = [
  "Commencer par les conversations décontractées (Slang Conversations - catégorie 55)",
  "Maîtriser le small talk authentique (Small Talk & Social - catégorie 58)", 
  "Apprendre les réactions émotionnelles naturelles (Reactions & Emotions - catégorie 57)",
  "Développer l'aisance professionnelle informelle (Workplace Casual - catégorie 56)",
  "Pratiquer les phrasal verbs en contexte (Phrasal Verbs in Context - catégorie 61)",
  "Explorer les situations de la vie moderne (Modern Life Situations - catégorie 63)",
  "Maîtriser les discussions relationnelles (Relationship Dynamics - catégorie 62)",
  "Apprendre à gérer les problèmes efficacement (Problems & Complaints - catégorie 60)",
  "Pratiquer les contextes culinaires (Food & Restaurant - catégorie 59)",
  "Finaliser avec l'expérience shopping moderne (Shopping & Consumer - catégorie 64)"
];

// Différences clés avec les niveaux CECR
export const NATIVE_CHARACTERISTICS = {
  vocabulary: "Slang contemporain, expressions générâtionnelles, références culturelles",
  grammar: "Structures relâchées, contractions naturelles, ellipses conversationnelles", 
  pragmatics: "Sous-entendus, humour, sarcasme, ironie, communication indirecte",
  cultural: "Références pop culture, actualité, codes sociaux implicites",
  authentic: "Langage réel non-édulcoré, avec toutes ses imperfections naturelles"
};