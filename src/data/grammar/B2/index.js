// grammarB2/index.js
// Fichier principal qui combine les règles et exercices pour le niveau B2

import grammarRulesB2 from "./rules/grammarRulesB2.js";
import grammarExercisesB2 from "./exercices/grammarExercicesB2.js";

// Combine les règles de grammaire avec leurs exercices
const grammarB2 = grammarRulesB2.map((rule) => ({
  ...rule,
  exercises: grammarExercisesB2[rule.id] || [],
}));

// Exporte les trois structures pour plus de flexibilité
export { grammarRulesB2, grammarExercisesB2, grammarB2 };

// Export par défaut
export default grammarB2;
