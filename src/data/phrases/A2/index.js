// src/data/exercises/phrases/a2/index.js

import { CATEGORIES, DIFFICULTY, CATEGORY_DESCRIPTIONS, USAGE_NOTES, LEVEL_INFO, CONTENT_STATS, LEARNING_SEQUENCE } from './metadata.js';
import dailyRoutines from './categories/daily-routines.js';
import pastExperiences from './categories/past-experiences.js';
import futurePlans from './categories/future-plans.js';
import opinionsPreferences from './categories/opinions-preferences.js';
import healthWellbeing from './categories/health-wellbeing.js';
import housingEnvironment from './categories/housing-environment.js';
import leisureFreetime from './categories/leisure-freetime.js';
import travelTransport from './categories/travel-transport.js';
import socialLife from './categories/social-life.js';
import communication from './categories/communication.js';
import workStudies from './categories/work-studies.js';
import simpleComplaints from './categories/simple-complaints.js';

/**
 * Contient toutes les données pour les phrases de niveau A2
 * @typedef {Object} PhrasesA2
 * @property {Array<Object>} categories - Liste des catégories
 * @property {Array<Object>} phrases - Liste complète des phrases de toutes les catégories
 * @property {string} difficulty - Niveau de difficulté CECR
 * @property {Object} categoryDescriptions - Descriptions détaillées de chaque catégorie
 * @property {Object} usageNotes - Notes sur l'utilisation formelle/informelle
 * @property {Object} levelInfo - Informations sur le niveau A2
 * @property {Object} contentStats - Statistiques sur le contenu
 * @property {Array<string>} learningSequence - Séquence d'apprentissage recommandée
 */
const phrasesA2 = {
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
    ...dailyRoutines,
    ...pastExperiences,
    ...futurePlans,
    ...opinionsPreferences,
    ...healthWellbeing,
    ...housingEnvironment,
    ...leisureFreetime,
    ...travelTransport,
    ...socialLife,
    ...communication,
    ...workStudies,
    ...simpleComplaints
  ]
};

// Export principal (pour import default)
export default phrasesA2;

// Exports nommés pour permettre d'importer des catégories spécifiques
export { 
  dailyRoutines,
  pastExperiences,
  futurePlans,
  opinionsPreferences,
  healthWellbeing,
  housingEnvironment,
  leisureFreetime,
  travelTransport,
  socialLife,
  communication,
  workStudies,
  simpleComplaints,
  CATEGORIES,
  DIFFICULTY,
  CATEGORY_DESCRIPTIONS,
  USAGE_NOTES,
  LEVEL_INFO,
  CONTENT_STATS,
  LEARNING_SEQUENCE
};