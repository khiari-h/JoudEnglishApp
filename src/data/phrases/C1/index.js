// src/data/exercises/phrases/c1/index.js
// Fichier index pour le niveau C1
// Importe toutes les catégories et les exporte comme un seul objet

import { CATEGORIES, DIFFICULTY, CATEGORY_DESCRIPTIONS, USAGE_NOTES, LEVEL_INFO, CONTENT_STATS, LEARNING_SEQUENCE } from './metadata.js';
import academicCommunication from './categories/academic-communication.js';
import negotiationsPersuasion from './categories/negotiations-persuasion.js';
import idiomaticExpressionsAdvanced from './categories/idiomatic-expressions-advanced.js';
import opinionNuances from './categories/opinion-nuances.js';
import critiquesEvaluations from './categories/critiques-evaluations.js';
import humorCulturalSubtleties from './categories/humor-cultural-subtleties.js';
import historicalCulturalReferences from './categories/historical-cultural-references.js';
import complexDebates from './categories/complex-debates.js';
import formalInformalDiscourse from './categories/formal-informal-discourse.js';
import euphemismsDiplomaticLanguage from './categories/euphemisms-diplomatic-language.js';
import certitudeDoubtExpressions from './categories/certitude-doubt-expressions.js';
import literaryExpressions from './categories/literary-expressions.js';
import ethicalPhilosophicalQuestions from './categories/ethical-philosophical-questions.js';
import advancedTechnologyScience from './categories/advanced-technology-science.js';
import internationalRelations from './categories/international-relations.js';

/**
 * Contient toutes les données pour les phrases de niveau C1
 * @typedef {Object} PhrasesC1
 * @property {Array<Object>} categories - Liste des catégories
 * @property {Array<Object>} phrases - Liste complète des phrases de toutes les catégories
 * @property {string} difficulty - Niveau de difficulté CECR
 * @property {Object} categoryDescriptions - Descriptions détaillées de chaque catégorie
 * @property {Object} usageNotes - Notes sur l'utilisation formelle/informelle
 * @property {Object} levelInfo - Informations sur le niveau C1
 * @property {Object} contentStats - Statistiques sur le contenu
 * @property {Array<string>} learningSequence - Séquence d'apprentissage recommandée
 */
const phrasesC1 = {
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
    ...academicCommunication,
    ...negotiationsPersuasion,
    ...idiomaticExpressionsAdvanced,
    ...opinionNuances,
    ...critiquesEvaluations,
    ...humorCulturalSubtleties,
    ...historicalCulturalReferences,
    ...complexDebates,
    ...formalInformalDiscourse,
    ...euphemismsDiplomaticLanguage,
    ...certitudeDoubtExpressions,
    ...literaryExpressions,
    ...ethicalPhilosophicalQuestions,
    ...advancedTechnologyScience,
    ...internationalRelations
  ]
};

// Export principal (pour import default)
export default phrasesC1;

// Exports nommés pour permettre d'importer des catégories spécifiques
export { 
  academicCommunication,
  negotiationsPersuasion,
  idiomaticExpressionsAdvanced,
  opinionNuances,
  critiquesEvaluations,
  humorCulturalSubtleties,
  historicalCulturalReferences,
  complexDebates,
  formalInformalDiscourse,
  euphemismsDiplomaticLanguage,
  certitudeDoubtExpressions,
  literaryExpressions,
  ethicalPhilosophicalQuestions,
  advancedTechnologyScience,
  internationalRelations,
  CATEGORIES,
  DIFFICULTY,
  CATEGORY_DESCRIPTIONS,
  USAGE_NOTES,
  LEVEL_INFO,
  CONTENT_STATS,
  LEARNING_SEQUENCE
};