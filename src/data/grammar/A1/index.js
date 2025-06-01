// grammarA1.js
// Fichier qui combine les règles de grammaire et les exercices pour le niveau A1 du CECR

import grammarRulesA1 from './rules/grammarRulesA1.js';
import grammarExercisesA1 from './exercices/grammarExercisesA1.js';

// Combine les règles de grammaire avec leurs exercices
const grammarA1 = grammarRulesA1.map(rule => ({
  ...rule,
  exercises: grammarExercisesA1[rule.id] || []
}));

// Exporte les trois structures pour plus de flexibilité
export { grammarRulesA1, grammarExercisesA1, grammarA1 };

// Export par défaut
export default grammarA1;
