

const { checkWordExists } = require('./vocabulary_manager'); // Importe la fonction de vérification

// Mots à vérifier
// Script de test pour entrepreneuriat (+30 mots)
const wordsToCheck = [
  // Financement et investissement (10 mots)
  { word: "seed funding", translation: "financement d'amorçage", category: "17_entrepreneuriat_et_economie_pratique", example: "The startup raised seed funding to develop their prototype." },
  { word: "venture capital", translation: "capital-risque", category: "17_entrepreneuriat_et_economie_pratique", example: "Venture capital firms invest in high-growth potential startups." },
  { word: "equity stake", translation: "participation au capital", category: "17_entrepreneuriat_et_economie_pratique", example: "Investors received a 20% equity stake in exchange for funding." },
  { word: "bootstrapping", translation: "autofinancement", category: "17_entrepreneuriat_et_economie_pratique", example: "She grew her business through bootstrapping without external investment." },
  { word: "crowdfunding", translation: "financement participatif", category: "17_entrepreneuriat_et_economie_pratique", example: "The crowdfunding campaign exceeded its target by 200%." },
  { word: "due diligence", translation: "vérification préalable", category: "17_entrepreneuriat_et_economie_pratique", example: "Investors conduct due diligence before making investment decisions." },
  { word: "valuation", translation: "évaluation", category: "17_entrepreneuriat_et_economie_pratique", example: "The company's valuation doubled after the successful product launch." },
  { word: "burn rate", translation: "taux de combustion", category: "17_entrepreneuriat_et_economie_pratique", example: "Managing burn rate is crucial for startup survival." },
  { word: "runway", translation: "trésorerie disponible", category: "17_entrepreneuriat_et_economie_pratique", example: "With current burn rate, they have 18 months of runway remaining." },
  { word: "exit strategy", translation: "stratégie de sortie", category: "17_entrepreneuriat_et_economie_pratique", example: "The founders developed an exit strategy for potential acquisition." },

  // Opérations et développement (10 mots)
  { word: "minimum viable product", translation: "produit minimum viable", category: "17_entrepreneuriat_et_economie_pratique", example: "They launched with a minimum viable product to test market response." },
  { word: "scalability", translation: "évolutivité", category: "17_entrepreneuriat_et_economie_pratique", example: "The platform's scalability allows for rapid user growth." },
  { word: "pivot", translation: "pivot", category: "17_entrepreneuriat_et_economie_pratique", example: "The startup decided to pivot after initial market feedback." },
  { word: "market validation", translation: "validation du marché", category: "17_entrepreneuriat_et_economie_pratique", example: "Market validation confirmed demand for their solution." },
  { word: "competitive advantage", translation: "avantage concurrentiel", category: "17_entrepreneuriat_et_economie_pratique", example: "Their patented technology provides a strong competitive advantage." },
  { word: "intellectual property", translation: "propriété intellectuelle", category: "17_entrepreneuriat_et_economie_pratique", example: "Protecting intellectual property is crucial for tech startups." },
  { word: "disruptive innovation", translation: "innovation de rupture", category: "17_entrepreneuriat_et_economie_pratique", example: "Their disruptive innovation transformed the entire industry." },
  { word: "agile methodology", translation: "méthodologie agile", category: "17_entrepreneuriat_et_economie_pratique", example: "The team uses agile methodology for rapid product development." },
  { word: "business incubator", translation: "incubateur d'entreprises", category: "17_entrepreneuriat_et_economie_pratique", example: "Business incubators provide resources and mentorship to startups." },
  { word: "accelerator program", translation: "programme d'accélération", category: "17_entrepreneuriat_et_economie_pratique", example: "The accelerator program helped them scale rapidly." },

  // Économie numérique (10 mots)
  { word: "digital transformation", translation: "transformation numérique", category: "17_entrepreneuriat_et_economie_pratique", example: "Digital transformation is essential for modern business success." },
  { word: "e-commerce platform", translation: "plateforme de commerce électronique", category: "17_entrepreneuriat_et_economie_pratique", example: "Their e-commerce platform processes thousands of orders daily." },
  { word: "subscription model", translation: "modèle d'abonnement", category: "17_entrepreneuriat_et_economie_pratique", example: "The subscription model provides predictable recurring revenue." },
  { word: "customer acquisition cost", translation: "coût d'acquisition client", category: "17_entrepreneuriat_et_economie_pratique", example: "Reducing customer acquisition cost improved overall profitability." },
  { word: "lifetime value", translation: "valeur vie client", category: "17_entrepreneuriat_et_economie_pratique", example: "High customer lifetime value justifies premium acquisition spending." },
  { word: "churn rate", translation: "taux d'attrition", category: "17_entrepreneuriat_et_economie_pratique", example: "Low churn rate indicates strong customer satisfaction." },
  { word: "growth hacking", translation: "piratage de croissance", category: "17_entrepreneuriat_et_economie_pratique", example: "Growth hacking techniques drove viral user adoption." },
  { word: "conversion rate", translation: "taux de conversion", category: "17_entrepreneuriat_et_economie_pratique", example: "Optimizing the checkout process improved conversion rates." },
  { word: "api integration", translation: "intégration d'API", category: "17_entrepreneuriat_et_economie_pratique", example: "API integration enables seamless third-party service connections." },
  { word: "data analytics", translation: "analyse de données", category: "17_entrepreneuriat_et_economie_pratique", example: "Data analytics reveals insights about customer behavior patterns." }
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