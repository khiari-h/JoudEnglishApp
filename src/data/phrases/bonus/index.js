// src/data/exercises/phrases/bonus/index.js
// Fichier index pour le niveau BONUS (natif)
// Importe toutes les catégories et les exporte comme un seul objet

import { CATEGORIES, DIFFICULTY, CATEGORY_DESCRIPTIONS, USAGE_NOTES, LEVEL_INFO, CONTENT_STATS, LEARNING_SEQUENCE, NATIVE_CHARACTERISTICS } from './metadata.js';
import slangConversations from './categories/slang-conversations.js';
import workplaceCasual from './categories/workplace-casual.js';
import reactionsEmotions from './categories/reactions-emotions.js';
import smallTalkSocial from './categories/small-talk-social.js';
import foodRestaurant from './categories/food-restaurant.js';
import problemsComplaints from './categories/problems-complaints.js';
import phrasalVerbsContext from './categories/phrasal-verbs-context.js';
import relationshipDynamics from './categories/relationship-dynamics.js';
import modernLifeSituations from './categories/modern-life-situations.js';
import shoppingConsumer from './categories/shopping-consumer.js';

/**
 * Contient toutes les données pour les phrases de niveau BONUS (natif)
 * @typedef {Object} PhrasesBonus
 * @property {Array<Object>} categories - Liste des catégories
 * @property {Array<Object>} phrases - Liste complète des phrases de toutes les catégories
 * @property {string} difficulty - Niveau de difficulté (BONUS)
 * @property {Object} categoryDescriptions - Descriptions détaillées de chaque catégorie
 * @property {Object} usageNotes - Notes sur l'utilisation authentique
 * @property {Object} levelInfo - Informations sur le niveau BONUS
 * @property {Object} contentStats - Statistiques sur le contenu
 * @property {Array<string>} learningSequence - Séquence d'apprentissage recommandée
 * @property {Object} nativeCharacteristics - Caractéristiques du niveau natif
 */
const phrasesBonus = {
  // Métadonnées
  difficulty: DIFFICULTY,
  categoryDescriptions: CATEGORY_DESCRIPTIONS,
  usageNotes: USAGE_NOTES,
  levelInfo: LEVEL_INFO,
  contentStats: CONTENT_STATS,
  learningSequence: LEARNING_SEQUENCE,
  nativeCharacteristics: NATIVE_CHARACTERISTICS,

  // Données principales
  categories: CATEGORIES,
  phrases: [
    ...slangConversations,
    ...workplaceCasual,
    ...reactionsEmotions,
    ...smallTalkSocial,
    ...foodRestaurant,
    ...problemsComplaints,
    ...phrasalVerbsContext,
    ...relationshipDynamics,
    ...modernLifeSituations,
    ...shoppingConsumer
  ]
};

// Export principal (pour import default)
export default phrasesBonus;

// Exports nommés pour permettre d'importer des catégories spécifiques
export { 
  slangConversations,
  workplaceCasual,
  reactionsEmotions,
  smallTalkSocial,
  foodRestaurant,
  problemsComplaints,
  phrasalVerbsContext,
  relationshipDynamics,
  modernLifeSituations,
  shoppingConsumer,
  CATEGORIES,
  DIFFICULTY,
  CATEGORY_DESCRIPTIONS,
  USAGE_NOTES,
  LEVEL_INFO,
  CONTENT_STATS,
  LEARNING_SEQUENCE,
  NATIVE_CHARACTERISTICS
};