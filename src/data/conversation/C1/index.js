// data/conversation/C1/index.js
// Fichier principal qui combine tous les scénarios pour le niveau C1

import corporateStrategy from "./scenarios/corporateStrategy.js";
import culturalDiplomacy from "./scenarios/culturalDiplomacy.js";
import medicalConsultation from "./scenarios/medicalConsultation.js";
import philosophicalDebate from "./scenarios/philosophicalDebate.js";
import literaryAnalysis from "./scenarios/literaryAnalysis.js";
import diplomaticNegotiation from "./scenarios/diplomaticNegotiation.js";
import academicPresentation from "./scenarios/academicPresentation.js";
import ethicalDilemma from "./scenarios/ethicalDilemma.js";
import researchMethodology from "./scenarios/researchMethodology.js";
import socialPolicyDebate from "./scenarios/socialPolicyDebate.js";
import psychotherapySession from "./scenarios/psychotherapySession.js";
import financialConsulting from "./scenarios/financialConsulting.js";

// Combine tous les scénarios C1
const chatbotC1 = [
  corporateStrategy,
  culturalDiplomacy,
  medicalConsultation,
  philosophicalDebate,
  literaryAnalysis,
  diplomaticNegotiation,
  academicPresentation,
  ethicalDilemma,
  researchMethodology,
  socialPolicyDebate,
  psychotherapySession,
  financialConsulting,
];

// Export des scénarios individuels et du tableau complet
export {
  corporateStrategy,
  culturalDiplomacy,
  medicalConsultation,
  philosophicalDebate,
  literaryAnalysis,
  diplomaticNegotiation,
  academicPresentation,
  ethicalDilemma,
  researchMethodology,
  socialPolicyDebate,
  psychotherapySession,
  financialConsulting,
  chatbotC1,
};

// Export par défaut
export default chatbotC1;