// grammarB1/index.js
// Fichier principal qui combine les règles et exercices pour le niveau B1

import grammarRulesB1 from './rules/grammarRulesB1.js';
import grammarExercisesB1 from './exercises/grammarExercisesB1.js';

// Combine les règles de grammaire avec leurs exercices
const grammarB1 = grammarRulesB1.map(rule => ({
  ...rule,
  exercises: grammarExercisesB1[rule.id] || []
}));

// Exporte les trois structures pour plus de flexibilité
export { grammarRulesB1, grammarExercisesB1, grammarB1 };

// Export par défaut
export default grammarB1;