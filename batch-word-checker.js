const fs = require('fs');
const path = require('path');
const { checkWordExists } = require('./vocabulary_manager'); // Importe la fonction de vérification

// Mots à vérifier
const wordsToCheck = [
  // Émotions
  { word: "shy", translation: "timide", category: "15_emotions", example: "She is shy when meeting new people." },
  { word: "cheerful", translation: "joyeux", category: "15_emotions", example: "She has a cheerful personality." },
  { word: "amazed", translation: "étonné", category: "15_emotions", example: "I was amazed by the magic trick." },
  { word: "curious", translation: "curieux", category: "15_emotions", example: "Children are curious about everything." },
  
  // Météo
  { word: "sunshine", translation: "lumière du soleil", category: "11_meteo", example: "We enjoyed the sunshine at the beach." },
  { word: "breeze", translation: "brise légère", category: "11_meteo", example: "There's a cool breeze this evening." },
  { word: "shower", translation: "averse", category: "11_meteo", example: "We got caught in a shower without an umbrella." },
  { word: "clear", translation: "dégagé", category: "11_meteo", example: "The sky is clear tonight, we can see the stars." }
];

// Fonction principale pour vérifier tous les mots
async function batchCheckWords() {
  console.log('='.repeat(80));
  console.log('VÉRIFICATION EN LOT DE MOTS');
  console.log('='.repeat(80));
  
  const safeToAdd = [];
  const alreadyExists = [];
  
  // Vérifier chaque mot
  for (const wordInfo of wordsToCheck) {
    try {
      // Utilise la fonction check du vocabulary_manager
      console.log(`\nVérification de "${wordInfo.word}"...`);
      const result = await checkWordExists(wordInfo.word);
      
      if (result.exists) {
        // Le mot existe déjà
        alreadyExists.push({
          ...wordInfo,
          locations: result.occurrences.map(occ => `${occ.level}/${occ.category}`)
        });
      } else {
        // Le mot n'existe pas encore et peut être ajouté
        safeToAdd.push(wordInfo);
      }
    } catch (error) {
      console.error(`Erreur lors de la vérification de "${wordInfo.word}":`, error);
    }
  }
  
  // Afficher le récapitulatif
  console.log('\n='.repeat(80));
  console.log('RÉCAPITULATIF');
  console.log('='.repeat(80));
  
  console.log(`\nMots qui peuvent être ajoutés en toute sécurité (${safeToAdd.length}):`);
  console.log('-'.repeat(80));
  
  if (safeToAdd.length > 0) {
    safeToAdd.forEach(word => {
      console.log(`- "${word.word}" (${word.translation}) → ${word.category}`);
    });
    
    console.log('\nCommandes pour ajouter ces mots:');
    console.log('-'.repeat(80));
    
    safeToAdd.forEach(word => {
      console.log(`node vocabulary_manager.js add "${word.word}" "${word.translation}" A1 ${word.category} "${word.example}"`);
    });
  } else {
    console.log("Aucun mot ne peut être ajouté en toute sécurité.");
  }
  
  if (alreadyExists.length > 0) {
    console.log(`\nMots qui existent déjà (${alreadyExists.length}):`);
    console.log('-'.repeat(80));
    
    alreadyExists.forEach(word => {
      console.log(`- "${word.word}" existe déjà dans: ${word.locations.join(', ')}`);
    });
  } else {
    console.log("\nAucun mot n'existe déjà.");
  }
  
  return {
    safeToAdd,
    alreadyExists
  };
}

// Exécuter le script si appelé directement
if (require.main === module) {
  batchCheckWords().catch(error => {
    console.error('Erreur:', error);
  });
}

module.exports = {
  batchCheckWords
};