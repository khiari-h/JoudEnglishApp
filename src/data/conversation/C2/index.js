// data/conversation/C2/index.js
// Fichier principal qui combine tous les scénarios pour le niveau C2

import theoreticalPhysics from "./scenarios/theoreticalPhysics.js";
import internationalRelations from "./scenarios/internationalRelations.js";
import advancedLinguistics from "./scenarios/advancedLinguistics.js";
import judicialReasoning from "./scenarios/judicialReasoning.js";
import neuroscientificTheories from "./scenarios/neuroscientificTheories.js";
import economicPolicyAnalysis from "./scenarios/economicPolicyAnalysis.js";
import literaryCriticism from "./scenarios/literaryCriticism.js";
import silenceCommunication from "././scenarios/silenceCommunication.js";
import quantumComputingExplanation from "./scenarios/quantumComputingExplanation.js";
import diplomaticCrisisMediation from "./scenarios/diplomaticCrisisMediation.js";

// Combine tous les scénarios C2
const chatbotC2 = [
  theoreticalPhysics,
  internationalRelations,
  advancedLinguistics,
  judicialReasoning,
  neuroscientificTheories,
  economicPolicyAnalysis,
  literaryCriticism,
  silenceCommunication,
  quantumComputingExplanation,
  diplomaticCrisisMediation,
];

// Export des scénarios individuels et du tableau complet
export {
  theoreticalPhysics,
  internationalRelations,
  advancedLinguistics,
  judicialReasoning,
  neuroscientificTheories,
  economicPolicyAnalysis,
  literaryCriticism,
  silenceCommunication,
  quantumComputingExplanation,
  diplomaticCrisisMediation,
  chatbotC2,
};

// Export par défaut
export default chatbotC2;
