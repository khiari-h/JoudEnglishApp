// src/data/exercises/phrases/a1/index.js
// Fichier index pour le niveau A1
// Importe toutes les catégories et les exporte comme un seul objet

import { CATEGORIES, DIFFICULTY, CATEGORY_DESCRIPTIONS, USAGE_NOTES, LEVEL_INFO, CONTENT_STATS, LEARNING_SEQUENCE } from './metadata.js';
import salutationsPolite from './categories/salutations-polite.js';
import personalIntro from './categories/personal-intro.js';
import basicNeeds from './categories/basic-needs.js';
import askingHelp from './categories/asking-help.js';
import numbersDateTime from './categories/numbers-date-time.js';
import simpleShopping from './categories/simple-shopping.js';
import locationsDirections from './categories/locations-directions.js';
import foodRestaurant from './categories/food-restaurant.js';
import simpleDescriptions from './categories/simple-descriptions.js';
import weatherSeasons from './categories/weather-seasons.js';

/**
 * Contient toutes les données pour les phrases de niveau A1
 * @typedef {Object} PhrasesA1
 * @property {Array<Object>} categories - Liste des catégories
 * @property {Array<Object>} phrases - Liste complète des phrases de toutes les catégories
 * @property {string} difficulty - Niveau de difficulté CECR
 * @property {Object} categoryDescriptions - Descriptions détaillées de chaque catégorie
 * @property {Object} usageNotes - Notes sur l'utilisation formelle/informelle
 * @property {Object} levelInfo - Informations sur le niveau A1
 * @property {Object} contentStats - Statistiques sur le contenu
 * @property {Array<string>} learningSequence - Séquence d'apprentissage recommandée
 */
const phrasesA1 = {
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
    ...salutationsPolite,
    ...personalIntro,
    ...basicNeeds,
    ...askingHelp,
    ...numbersDateTime,
    ...simpleShopping,
    ...locationsDirections,
    ...foodRestaurant,
    ...simpleDescriptions,
    ...weatherSeasons
  ]
};

// Export principal (pour import default)
export default phrasesA1;

// Exports nommés pour permettre d'importer des catégories spécifiques
export { 
  salutationsPolite,
  personalIntro,
  basicNeeds,
  askingHelp,
  numbersDateTime,
  simpleShopping,
  locationsDirections,
  foodRestaurant,
  simpleDescriptions,
  weatherSeasons,
  CATEGORIES,
  DIFFICULTY,
  CATEGORY_DESCRIPTIONS,
  USAGE_NOTES,
  LEVEL_INFO,
  CONTENT_STATS,
  LEARNING_SEQUENCE
};