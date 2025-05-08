// chatbot/B2/index.js
// Fichier principal qui combine tous les scénarios pour le niveau B2

import debateCurrentTopic from './scenarios/debateCurrentTopic.js';
import jobPerformanceReview from './scenarios/jobPerformanceReview.js';
import negotiatingContract from './scenarios/negotiatingContract.js';
import academicDiscussion from './scenarios/academicDiscussion.js';
import presentingIdeas from './scenarios/presentingIdeas.js';
import technicalExplanation from './scenarios/technicalExplanation.js';
import mediationConflict from './scenarios/mediationConflict.js';
import persuasiveArgument from './scenarios/persuasiveArgument.js';
import diplomacyDisagreement from './scenarios/diplomacyDisagreement.js';
import economicDiscussion from './scenarios/economicDiscussion.js';
import moralDilemma from './scenarios/moralDilemma.js';
import psychologicalAnalysis from './scenarios/psychologicalAnalysis.js';
import culturalDebate from './scenarios/culturalDebate.js';
import scientificResearch from './scenarios/scientificResearch.js';
import artCriticism from './scenarios/artCriticism.js';

// Combine tous les scénarios B2
const chatbotB2 = [
  debateCurrentTopic,
  jobPerformanceReview,
  negotiatingContract,
  academicDiscussion,
  presentingIdeas,
  technicalExplanation,
  mediationConflict,
  persuasiveArgument,
  diplomacyDisagreement,
  economicDiscussion,
  moralDilemma,
  psychologicalAnalysis,
  culturalDebate,
  scientificResearch,
  artCriticism
];

// Export des scénarios individuels et du tableau complet
export {
  debateCurrentTopic,
  jobPerformanceReview,
  negotiatingContract,
  academicDiscussion,
  presentingIdeas,
  technicalExplanation,
  mediationConflict,
  persuasiveArgument,
  diplomacyDisagreement,
  economicDiscussion,
  moralDilemma,
  psychologicalAnalysis,
  culturalDebate,
  scientificResearch,
  artCriticism,
  chatbotB2
};

// Export par défaut
export default chatbotB2;