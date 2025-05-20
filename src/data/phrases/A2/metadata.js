// src/data/exercises/phrases/a2/metadata.js

export const CATEGORIES = [
  { id: 11, name: "Habitudes et routines quotidiennes" },
  { id: 12, name: "Expériences passées" },
  { id: 13, name: "Projets et intentions futures" },
  { id: 14, name: "Opinions et préférences" },
  { id: 15, name: "Santé et bien-être" },
  { id: 16, name: "Logement et environnement" },
  { id: 17, name: "Loisirs et temps libre" },
  { id: 18, name: "Voyages et transports" },
  { id: 19, name: "Vie sociale et invitations" },
  { id: 20, name: "Communication" },
  { id: 21, name: "Travail et études" },
  { id: 22, name: "Réclamations simples" }
];

export const DIFFICULTY = "A2";

export const CATEGORY_DESCRIPTIONS = {
  11: "Expressions pour décrire sa routine quotidienne, ses habitudes et les activités régulières",
  12: "Phrases pour parler d'événements et d'expériences passés",
  13: "Expressions pour parler de projets, d'intentions et d'événements futurs",
  14: "Phrases pour exprimer ses opinions, préférences et goûts personnels",
  15: "Expressions liées à la santé, au bien-être et aux problèmes médicaux courants",
  16: "Phrases pour décrire son logement, son quartier et son environnement",
  17: "Expressions pour parler de ses loisirs, activités et temps libre",
  18: "Phrases utilisées pour voyager, se déplacer et utiliser les transports",
  19: "Expressions pour les interactions sociales, les invitations et les propositions",
  20: "Phrases pour communiquer efficacement et maintenir une conversation",
  21: "Expressions liées au milieu professionnel et éducatif",
  22: "Phrases pour exprimer des réclamations simples et résoudre des problèmes courants"
};

export const USAGE_NOTES = {
  formal: "Pour les situations formelles (avec des personnes que vous ne connaissez pas, des personnes plus âgées, en contexte professionnel)",
  informal: "Pour les situations informelles (avec des amis, de la famille, des personnes de votre âge)",
  general: "Utilisable dans la plupart des contextes, quel que soit le niveau de formalité"
};

// Informations sur le niveau A2
export const LEVEL_INFO = {
  name: "A2 - Élémentaire",
  description: "Le niveau A2 correspond à un niveau élémentaire où l'apprenant peut communiquer dans des situations simples et habituelles. À ce niveau, vous pouvez comprendre des phrases isolées et des expressions fréquemment utilisées en relation avec des domaines de priorité immédiate (par exemple, informations personnelles et familiales simples, achats, environnement proche, travail). Vous pouvez communiquer lors de tâches simples et habituelles ne demandant qu'un échange d'informations simple et direct sur des sujets familiers et habituels. Vous pouvez décrire avec des moyens simples votre formation, votre environnement immédiat et évoquer des sujets qui correspondent à des besoins immédiats.",
  objectives: [
    "Décrire sa routine quotidienne et ses habitudes",
    "Parler d'événements passés et futurs de manière simple",
    "Exprimer ses opinions et préférences",
    "Communiquer dans des situations pratiques de la vie quotidienne",
    "Participer à des conversations simples sur des sujets familiers",
    "Comprendre et rédiger des messages courts et simples",
    "Décrire son logement, son environnement et ses activités",
    "Faire des achats et utiliser les services de base"
  ]
};

// Statistiques sur le contenu
export const CONTENT_STATS = {
  totalCategories: 12,
  totalPhrases: 216, // Si nous avons 18 phrases par catégorie x 12 catégories
  phrasesPerCategory: 18, // Ajusté pour avoir environ 216 phrases au total
  recommendedLearningTime: "180-200 heures d'apprentissage actif"
};

// Progression suggérée
export const LEARNING_SEQUENCE = [
  "Commencer par les habitudes et routines quotidiennes (catégorie 11)",
  "Continuer avec les opinions et préférences (catégorie 14)",
  "Aborder les expériences passées (catégorie 12)",
  "Puis les projets futurs (catégorie 13)",
  "Explorer les loisirs et le temps libre (catégorie 17)",
  "Progresser vers les autres catégories selon les besoins spécifiques"
];