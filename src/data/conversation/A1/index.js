// chatbotA1/index.js
// Fichier principal qui combine tous les scénarios pour le niveau A1

import greetingsBasics from './scenarios/greetingsBasics.js';
import coffeeShop from './scenarios/coffeeShop.js';
import askingDirections from './scenarios/askingDirections.js';
import shoppingClothes from './scenarios/shoppingClothes.js';
import restaurantReservation from './scenarios/restaurantReservation.js';
import hotelCheckIn from './scenarios/hotelCheckIn.js';
import doctorVisit from './scenarios/doctorVisit.js';
import supermarketShopping from './scenarios/supermarketShopping.js';
import bankBasics from './scenarios/bankBasics.js';
import transportPublic from './scenarios/transportPublic.js';

// Combine tous les scénarios A1
const chatbotA1 = [
  greetingsBasics,
  coffeeShop,
  askingDirections,
  shoppingClothes,
  restaurantReservation,
  hotelCheckIn,
  doctorVisit,
  supermarketShopping,
  bankBasics,
  transportPublic
];

// Export des scénarios individuels et du tableau complet
export {
  greetingsBasics,
  coffeeShop,
  askingDirections,
  shoppingClothes,
  restaurantReservation,
  hotelCheckIn,
  doctorVisit,
  supermarketShopping,
  bankBasics,
  transportPublic,
  chatbotA1
};

// Export par défaut
export default chatbotA1;
