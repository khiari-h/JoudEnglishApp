// grammarC1/index.js
// Fichier principal qui combine les règles et exercices pour le niveau C1

import grammarRulesC1 from "./rules/grammarRulesC1.js";
import grammarExercisesC1 from "./exercices/grammarExercisesC1.js";

// Combine les règles de grammaire avec leurs exercices
const grammarC1 = grammarRulesC1.map((rule) => ({
  ...rule,
  exercises: grammarExercisesC1[rule.id] || [],
}));

// Exporte les trois structures pour plus de flexibilité
export { grammarRulesC1, grammarExercisesC1, grammarC1 };

// Export par défaut
export default grammarC1;

