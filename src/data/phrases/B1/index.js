// src/data/exercises/phrases/b1/index.js
// Fichier index pour le niveau B1
// Importe toutes les catégories et les exporte comme un seul objet

import { CATEGORIES, DIFFICULTY, CATEGORY_DESCRIPTIONS, USAGE_NOTES, LEVEL_INFO, CONTENT_STATS, LEARNING_SEQUENCE } from './metadata.js';
import opinionsPreferences from './categories/opinions-preferences.js';
import pastExperiences from './categories/past-experiences.js';
import eventNarration from './categories/event-narration.js';
import adviceRecommendations from './categories/advice-recommendations.js';
import comparisonsContrasts from './categories/comparisons-contrasts.js';
import nuancedFeelings from './categories/nuanced-feelings.js';
import agreementsDisagreements from './categories/agreements-disagreements.js';
import formalRequests from './categories/formal-requests.js';
import professionalCommunication from './categories/professional-communication.js';
import cultureEntertainment from './categories/culture-entertainment.js';
import technology from './categories/technology.js';
import environmentSociety from './categories/environment-society.js';

/**
 * Contient toutes les données pour les phrases de niveau B1
 * @typedef {Object} PhrasesB1
 * @property {Array<Object>} categories - Liste des catégories
 * @property {Array<Object>} phrases - Liste complète des phrases de toutes les catégories
 * @property {string} difficulty - Niveau de difficulté CECR
 * @property {Object} categoryDescriptions - Descriptions détaillées de chaque catégorie
 * @property {Object} usageNotes - Notes sur l'utilisation formelle/informelle
 * @property {Object} levelInfo - Informations sur le niveau B1
 * @property {Object} contentStats - Statistiques sur le contenu
 * @property {Array<string>} learningSequence - Séquence d'apprentissage recommandée
 */
const phrasesB1 = {
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
    ...opinionsPreferences,
    ...pastExperiences,
    ...eventNarration,
    ...adviceRecommendations,
    ...comparisonsContrasts,
    ...nuancedFeelings,
    ...agreementsDisagreements,
    ...formalRequests,
    ...professionalCommunication,
    ...cultureEntertainment,
    ...technology,
    ...environmentSociety
  ]
};

// Export principal (pour import default)
export default phrasesB1;

// Exports nommés pour permettre d'importer des catégories spécifiques
export { 
  opinionsPreferences,
  pastExperiences,
  eventNarration,
  adviceRecommendations,
  comparisonsContrasts,
  nuancedFeelings,
  agreementsDisagreements,
  formalRequests,
  professionalCommunication,
  cultureEntertainment,
  technology,
  environmentSociety,
  CATEGORIES,
  DIFFICULTY,
  CATEGORY_DESCRIPTIONS,
  USAGE_NOTES,
  LEVEL_INFO,
  CONTENT_STATS,
  LEARNING_SEQUENCE
};