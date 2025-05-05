// grammarC2/index.js
// Fichier principal qui combine les règles et exercices pour le niveau C2

import grammarRulesC2 from "./rules/grammarRulesC2.js";
import grammarExercisesC2 from "./exercices/grammarExercicesC2.js";

// Combine les règles de grammaire avec leurs exercices
const grammarC2 = grammarRulesC2.map((rule) => ({
  ...rule,
  exercises: grammarExercisesC2[rule.id] || [],
}));

// Exporte les trois structures pour plus de flexibilité
export { grammarRulesC2, grammarExercisesC2, grammarC2 };

// Export par défaut
export default grammarC2;
