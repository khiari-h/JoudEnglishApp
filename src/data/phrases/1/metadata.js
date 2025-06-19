// src/data/exercises/phrases/a1/metadata.js

export const CATEGORIES = [
  { id: 1, name: "Salutations et politesse" },
  { id: 2, name: "Présentations personnelles" },
  { id: 3, name: "Besoins essentiels" },
  { id: 4, name: "Demandes d'aide" },
  { id: 5, name: "Chiffres, dates et heure" },
  { id: 6, name: "Achats simples" },
  { id: 7, name: "Lieux et directions" },
  { id: 8, name: "Nourriture et restaurant" },
  { id: 9, name: "Descriptions simples" },
  { id: 10, name: "Temps et météo" }
];

export const DIFFICULTY = "A1";

export const CATEGORY_DESCRIPTIONS = {
  1: "Expressions pour saluer, prendre congé, remercier et formules de politesse de base",
  2: "Phrases pour se présenter, parler de soi et demander des informations personnelles",
  3: "Expressions pour communiquer des besoins fondamentaux comme la faim, la soif, la fatigue",
  4: "Phrases pour demander de l'aide, de l'assistance ou des clarifications",
  5: "Expressions liées aux nombres, heures, dates et informations temporelles",
  6: "Expressions utilisées pour les achats, les prix et les transactions simples",
  7: "Phrases pour demander son chemin, comprendre et donner des directions",
  8: "Expressions pour commander de la nourriture et interagir au restaurant",
  9: "Phrases pour décrire des objets, des personnes et des situations en termes simples",
  10: "Expressions pour parler de la météo et des saisons"
};

export const USAGE_NOTES = {
  formal: "Pour les situations formelles (avec des personnes que vous ne connaissez pas, des personnes plus âgées, en contexte professionnel)",
  informal: "Pour les situations informelles (avec des amis, de la famille, des personnes de votre âge)",
  general: "Utilisable dans la plupart des contextes, quel que soit le niveau de formalité"
};

// Informations sur le niveau A1
export const LEVEL_INFO = {
  name: "A1 - Débutant",
  description: "Le niveau A1 correspond aux bases élémentaires de la langue. À ce niveau, vous pouvez comprendre et utiliser des expressions familières et quotidiennes ainsi que des énoncés très simples qui visent à satisfaire des besoins concrets. Vous pouvez vous présenter ou présenter quelqu'un et poser à une personne des questions la concernant - par exemple, sur son lieu d'habitation, ses relations, ce qui lui appartient, etc. - et vous pouvez répondre au même type de questions. Vous pouvez communiquer de façon simple si l'interlocuteur parle lentement et distinctement et se montre coopératif.",
  objectives: [
    "Saluer et prendre congé de manière appropriée",
    "Se présenter et présenter d'autres personnes",
    "Demander et comprendre des informations personnelles simples",
    "Exprimer des besoins immédiats",
    "Comprendre et donner des directions simples",
    "Demander et comprendre des informations de base sur les prix, l'heure, la date",
    "Commander de la nourriture et des boissons",
    "Faire des descriptions simples"
  ]
};

// Statistiques sur le contenu
export const CONTENT_STATS = {
  totalCategories: 10,
  totalPhrases: 215, // Nombre approximatif basé sur la somme de toutes les phrases dans les fichiers
  phrasesPerCategory: 21.5, // Moyenne de phrases par catégorie
  recommendedLearningTime: "50-60 heures d'apprentissage actif"
};

// Progression suggérée
export const LEARNING_SEQUENCE = [
  "Commencer par les salutations et la politesse (catégorie 1)",
  "Passer aux présentations personnelles (catégorie 2)",
  "Apprendre à exprimer les besoins essentiels (catégorie 3)",
  "Continuer avec les demandes d'aide (catégorie 4)",
  "Maîtriser les chiffres, dates et heures (catégorie 5)",
  "Puis progresser vers les autres catégories selon les besoins spécifiques"
];
