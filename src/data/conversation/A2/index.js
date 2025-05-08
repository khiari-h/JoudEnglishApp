// chatbot/A2/index.js
// Fichier principal qui combine tous les scénarios pour le niveau A2

import atTheRestaurant from "./scenarios/atTheRestaurant.js";
import travelPlanning from "./scenarios/travelPlanning.js";
import shoppingClothes from "./scenarios/shoppingClothes.js";
import jobInterview from "./scenarios/jobInterview.js";
import apartmentViewing from "./scenarios/apartmentViewing.js";
import atTheDoctorSpecialist from "./scenarios/atTheDoctorSpecialist.js";
import makingAppointments from "./scenarios/makingAppointments.js";
import talkingAboutHobbies from "./scenarios/talkingAboutHobbies.js";
import weatherAndSeasons from "./scenarios/weatherAndSeasons.js";
import gettingDirectionsDetailed from "./scenarios/gettingDirectionsDetailed.js";
import phoneProblems from "./scenarios/phoneProblems.js";
import meetingFriendOfFriend from "./scenarios/meetingFriendOfFriend.js";

// Combine tous les scénarios A2
const chatbotA2 = [
  atTheRestaurant,
  travelPlanning,
  shoppingClothes,
  jobInterview,
  apartmentViewing,
  atTheDoctorSpecialist,
  makingAppointments,
  talkingAboutHobbies,
  weatherAndSeasons,
  gettingDirectionsDetailed,
  phoneProblems,
  meetingFriendOfFriend,
];

// Export des scénarios individuels et du tableau complet
export {
  atTheRestaurant,
  travelPlanning,
  shoppingClothes,
  jobInterview,
  apartmentViewing,
  atTheDoctorSpecialist,
  makingAppointments,
  talkingAboutHobbies,
  weatherAndSeasons,
  gettingDirectionsDetailed,
  phoneProblems,
  meetingFriendOfFriend,
  chatbotA2,
};

// Export par défaut
export default chatbotA2;
