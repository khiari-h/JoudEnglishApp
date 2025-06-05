// src/data/exercises/phrases/c2/index.js
// Fichier index pour le niveau C2
// Importe toutes les catégories et les exporte comme un seul objet

import { CATEGORIES, DIFFICULTY, CATEGORY_DESCRIPTIONS, USAGE_NOTES, LEVEL_INFO, CONTENT_STATS, LEARNING_SEQUENCE } from './metadata.js';
import rareIdiomaticExpressions from './categories/rare-idiomatic-expressions.js';
import wordplayDoubleMeaning from './categories/wordplay-double-meaning.js';
import ironySarcasmHumor from './categories/irony-sarcasm-humor.js';
import metaphorsCulturalAllusions from './categories/metaphors-cultural-allusions.js';
import legalAdministrative from './categories/legal-administrative.js';
import academicScientific from './categories/academic-scientific.js';
import literaryArtisticCriticism from './categories/literary-artistic-criticism.js';
import rhetoricSophisticatedPersuasion from './categories/rhetoric-sophisticated-persuasion.js';
import preciseEmotionalNuances from './categories/precise-emotional-nuances.js';
import quotesCulturalReferences from './categories/quotes-cultural-references.js';
import complexAnalysisInterpretation from './categories/complex-analysis-interpretation.js';
import poeticFigurativeLanguage from './categories/poetic-figurative-language.js';
import advancedInterculturalCommunication from './categories/advanced-intercultural-communication.js';
import stylisticMasteryVariations from './categories/stylistic-mastery-variations.js';

/**
 * Contient toutes les données pour les phrases de niveau C2
 * @typedef {Object} PhrasesC2
 * @property {Array<Object>} categories - Liste des catégories
 * @property {Array<Object>} phrases - Liste complète des phrases de toutes les catégories
 * @property {string} difficulty - Niveau de difficulté CECR
 * @property {Object} categoryDescriptions - Descriptions détaillées de chaque catégorie
 * @property {Object} usageNotes - Notes sur l'utilisation selon les registres
 * @property {Object} levelInfo - Informations sur le niveau C2
 * @property {Object} contentStats - Statistiques sur le contenu
 * @property {Array<string>} learningSequence - Séquence d'apprentissage recommandée
 */
const phrasesC2 = {
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
    ...rareIdiomaticExpressions,
    ...wordplayDoubleMeaning,
    ...ironySarcasmHumor,
    ...metaphorsCulturalAllusions,
    ...legalAdministrative,
    ...academicScientific,
    ...literaryArtisticCriticism,
    ...rhetoricSophisticatedPersuasion,
    ...preciseEmotionalNuances,
    ...quotesCulturalReferences,
    ...complexAnalysisInterpretation,
    ...poeticFigurativeLanguage,
    ...advancedInterculturalCommunication,
    ...stylisticMasteryVariations
  ]
};

// Export principal (pour import default)
export default phrasesC2;

// Exports nommés pour permettre d'importer des catégories spécifiques
export { 
  rareIdiomaticExpressions,
  wordplayDoubleMeaning,
  ironySarcasmHumor,
  metaphorsCulturalAllusions,
  legalAdministrative,
  academicScientific,
  literaryArtisticCriticism,
  rhetoricSophisticatedPersuasion,
  preciseEmotionalNuances,
  quotesCulturalReferences,
  complexAnalysisInterpretation,
  poeticFigurativeLanguage,
  advancedInterculturalCommunication,
  stylisticMasteryVariations,
  CATEGORIES,
  DIFFICULTY,
  CATEGORY_DESCRIPTIONS,
  USAGE_NOTES,
  LEVEL_INFO,
  CONTENT_STATS,
  LEARNING_SEQUENCE
};
