// src/data/exercises/phrases/b2/index.js
// Fichier index pour le niveau B2
// Importe toutes les catégories et les exporte comme un seul objet

import { CATEGORIES, DIFFICULTY, CATEGORY_DESCRIPTIONS, USAGE_NOTES, LEVEL_INFO, CONTENT_STATS, LEARNING_SEQUENCE } from './metadata.js';
import argumentsDebates from './categories/arguments-debates.js';
import advantagesDisadvantages from './categories/advantages-disadvantages.js';
import hypothesesConditions from './categories/hypotheses-conditions.js';
import meetingsPresentations from './categories/meetings-presentations.js';
import causeConsequence from './categories/cause-consequence.js';
import complaintsProblemSolving from './categories/complaints-problem-solving.js';
import idiomaticExpressions from './categories/idiomatic-expressions.js';
import diplomaticCommunication from './categories/diplomatic-communication.js';
import artsLiterature from './categories/arts-literature.js';
import economyPolitics from './categories/economy-politics.js';
import complexProcesses from './categories/complex-processes.js';
import regretWish from './categories/regret-wish.js';
import advancedHealth from './categories/advanced-health.js';
import environmentSocialIssues from './categories/environment-social-issues.js';

/**
 * Contient toutes les données pour les phrases de niveau B2
 * @typedef {Object} PhrasesB2
 * @property {Array<Object>} categories - Liste des catégories
 * @property {Array<Object>} phrases - Liste complète des phrases de toutes les catégories
 * @property {string} difficulty - Niveau de difficulté CECR
 * @property {Object} categoryDescriptions - Descriptions détaillées de chaque catégorie
 * @property {Object} usageNotes - Notes sur l'utilisation formelle/informelle
 * @property {Object} levelInfo - Informations sur le niveau B2
 * @property {Object} contentStats - Statistiques sur le contenu
 * @property {Array<string>} learningSequence - Séquence d'apprentissage recommandée
 */
const phrasesB2 = {
  // Métadonnées
  difficulty: DIFFICULTY,
  categoryDescriptions: CATEGORY_DESCRIPTIONS,
  usageNotes: USAGE_NOTES,
  levelInfo: LEVEL_INFO,
  contentStats: CONTENT_STATS,
  learningSequence: LEARNING_SEQUENCE,

  // Données principales
  categories: CATEGORIES,
  phrases: [
    ...argumentsDebates,
    ...advantagesDisadvantages,
    ...hypothesesConditions,
    ...meetingsPresentations,
    ...causeConsequence,
    ...complaintsProblemSolving,
    ...idiomaticExpressions,
    ...diplomaticCommunication,
    ...artsLiterature,
    ...economyPolitics,
    ...complexProcesses,
    ...regretWish,
    ...advancedHealth,
    ...environmentSocialIssues
  ]
};

// Export principal (pour import default)
export default phrasesB2;

// Exports nommés pour permettre d'importer des catégories spécifiques
export { 
  argumentsDebates,
  advantagesDisadvantages,
  hypothesesConditions,
  meetingsPresentations,
  causeConsequence,
  complaintsProblemSolving,
  idiomaticExpressions,
  diplomaticCommunication,
  artsLiterature,
  economyPolitics,
  complexProcesses,
  regretWish,
  advancedHealth,
  environmentSocialIssues,
  CATEGORIES,
  DIFFICULTY,
  CATEGORY_DESCRIPTIONS,
  USAGE_NOTES,
  LEVEL_INFO,
  CONTENT_STATS,
  LEARNING_SEQUENCE
};