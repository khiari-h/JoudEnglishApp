// grammarA2/index.js
// Fichier principal qui combine les règles et exercices pour le niveau A2

import grammarRulesA2 from "./rules/grammarRulesA2.js";
import grammarExercisesA2 from "./exercices/grammarExercisesA2.js";

// Combine les règles de grammaire avec leurs exercices
const grammarA2 = grammarRulesA2.map((rule) => ({
  ...rule,
  exercises: grammarExercisesA2[rule.id] || [],
}));

// Exporte les trois structures pour plus de flexibilité
export { grammarRulesA2, grammarExercisesA2, grammarA2 };

// Export par défaut
export default grammarA2;

