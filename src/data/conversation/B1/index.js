// chatbot/B1/index.js
// Fichier principal qui combine tous les scénarios pour le niveau B1

import jobApplicationCall from "./scenarios/jobApplicationCall";
import discussingMovies from "./scenarios/discussingMovies.js";
import healthAndFitness from "./scenarios/healthAndFitness.js";
import environmentalIssues from "./scenarios/environmentalIssues.js";
import complainingService from "./scenarios/complainingService.js";
import explainProblemIT from "./scenarios/explainProblemIT.js";
import planningEvent from "./scenarios/planningEvent.js";
import discussingNews from "./scenarios/discussingNews.js";
import culturalDifferences from "./scenarios/culturalDifferences.js";
import travelExperiences from "./scenarios/travelExperiences.js";
import rentingCar from "./scenarios/rentingCar.js";
import educationChoices from "./scenarios/educationChoices.js";
import businessMeeting from "./scenarios/businessMeeting.js";
import describingIllness from "./scenarios/describingIllness.js";
import makingComplaint from "./scenarios/makingComplaint.js";

// Combine tous les scénarios B1
const chatbotB1 = [
  jobApplicationCall,
  discussingMovies,
  healthAndFitness,
  environmentalIssues,
  complainingService,
  explainProblemIT,
  planningEvent,
  discussingNews,
  culturalDifferences,
  travelExperiences,
  rentingCar,
  educationChoices,
  businessMeeting,
  describingIllness,
  makingComplaint,
];

// Export des scénarios individuels et du tableau complet
export {
  jobApplicationCall,
  discussingMovies,
  healthAndFitness,
  environmentalIssues,
  complainingService,
  explainProblemIT,
  planningEvent,
  discussingNews,
  culturalDifferences,
  travelExperiences,
  rentingCar,
  educationChoices,
  businessMeeting,
  describingIllness,
  makingComplaint,
  chatbotB1,
};

// Export par défaut
export default chatbotB1;

