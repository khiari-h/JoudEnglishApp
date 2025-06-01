// src/data/exercises/errorCorrection/B1/index.js

import errorCorrectionB1Full from './categories/errorCorrectionB1Full';
import errorCorrectionB1Identify from './categories/errorCorrectionB1Identify';
import errorCorrectionB1MultipleChoice from './categories/errorCorrectionB1MultipleChoice';

// Combine all exercises from the 3 files
const allExercises = [
  ...errorCorrectionB1Full,
  ...errorCorrectionB1Identify,
  ...errorCorrectionB1MultipleChoice
];

// Sort exercises by categoryId to maintain logical order
allExercises.sort((a, b) => {
  if (a.categoryId !== b.categoryId) {
    return a.categoryId - b.categoryId;
  }
  // Within same category, order by type: full, identify, multiple_choice
  const typeOrder = { 'full': 1, 'identify': 2, 'multiple_choice': 3 };
  return typeOrder[a.type] - typeOrder[b.type];
});

const errorCorrectionB1 = {
  level: "B1",
  totalExercises: allExercises.length,
  
  // Statistics by type
  statistics: {
    full: errorCorrectionB1Full.length,
    identify: errorCorrectionB1Identify.length,
    multiple_choice: errorCorrectionB1MultipleChoice.length,
    byCategory: {
      1: { name: "Present Perfect", count: 7 },      // 2 full + 3 identify + 2 multiple_choice
      2: { name: "Conditionals", count: 7 },         // 3 full + 3 identify + 1 multiple_choice
      3: { name: "Passive Voice", count: 7 },        // 2 full + 3 identify + 2 multiple_choice
      4: { name: "Reported Speech", count: 8 },      // 3 full + 3 identify + 2 multiple_choice
      5: { name: "Relative Clauses", count: 7 }      // 2 full + 3 identify + 2 multiple_choice
    }
  },

  // Categories metadata for B1 intermediate-advanced level
  categories: [
    {
      id: 1,
      name: "Present Perfect",
      description: "Present perfect vs past simple, for/since, already/yet/just",
      exerciseCount: 7,
      difficulty: "Intermediate-Advanced",
      color: "#3b82f6",
      topics: ["present perfect formation", "vs past simple", "time expressions", "experience", "duration"],
      commonErrors: ["using with specific past times", "wrong past participle", "confusion with past simple"]
    },
    {
      id: 2,
      name: "Conditionals",
      description: "First, second, and mixed conditionals",
      exerciseCount: 7,
      difficulty: "Intermediate-Advanced", 
      color: "#10b981",
      topics: ["first conditional", "second conditional", "third conditional", "mixed conditionals", "unless"],
      commonErrors: ["will in if-clause", "wrong verb forms", "mixing conditional types"]
    },
    {
      id: 3,
      name: "Passive Voice",
      description: "Passive voice in different tenses and contexts",
      exerciseCount: 7,
      difficulty: "Intermediate-Advanced",
      color: "#f59e0b",
      topics: ["passive formation", "different tenses", "by/with agents", "passive reporting"],
      commonErrors: ["missing be verb", "wrong prepositions", "incorrect past participle"]
    },
    {
      id: 4,
      name: "Reported Speech",
      description: "Direct to indirect speech, reporting verbs",
      exerciseCount: 8,
      difficulty: "Intermediate-Advanced",
      color: "#8b5cf6",
      topics: ["tense changes", "pronoun changes", "time/place changes", "reporting questions", "reporting verbs"],
      commonErrors: ["wrong tense changes", "question word order", "incorrect reporting verbs"]
    },
    {
      id: 5,
      name: "Relative Clauses",
      description: "Defining and non-defining relative clauses",
      exerciseCount: 7,
      difficulty: "Intermediate-Advanced",
      color: "#ef4444",
      topics: ["who/which/that", "defining vs non-defining", "whose", "where/when", "prepositions"],
      commonErrors: ["wrong relative pronouns", "unnecessary prepositions", "comma usage"]
    },
  ],

  // All exercises combined and sorted
  exercises: allExercises,

  // Helper methods for filtering exercises
  getExercisesByCategory: (categoryId) => {
    return allExercises.filter(exercise => exercise.categoryId === categoryId);
  },

  getExercisesByType: (type) => {
    return allExercises.filter(exercise => exercise.type === type);
  },

  getExercisesByCategoryAndType: (categoryId, type) => {
    return allExercises.filter(exercise => 
      exercise.categoryId === categoryId && exercise.type === type
    );
  },

  // Get exercises by difficulty or topic
  getExercisesByTopic: (topic) => {
    return allExercises.filter(exercise => {
      const category = errorCorrectionB1.categories.find(cat => cat.id === exercise.categoryId);
      return category?.topics.includes(topic);
    });
  },

  // Get exercises by common error type
  getExercisesByErrorType: (errorType) => {
    return allExercises.filter(exercise => {
      const category = errorCorrectionB1.categories.find(cat => cat.id === exercise.categoryId);
      return category?.commonErrors.some(error => error.includes(errorType));
    });
  },

  // Advanced filtering for B1 level
  getAdvancedExercises: () => {
    // Return exercises that are more challenging (longer texts, multiple errors)
    return allExercises.filter(exercise => {
      const wordCount = exercise.text.split(' ').length;
      const errorCount = exercise.errorPositions ? exercise.errorPositions.length : 1;
      return wordCount > 8 || errorCount > 2;
    });
  },

  // Validation with B1-specific checks
  validateStructure: () => {
    const requiredFields = ['categoryId', 'type', 'text', 'correctedText', 'hint', 'explanation'];
    const validTypes = ['full', 'identify', 'multiple_choice'];
    
    return allExercises.every(exercise => {
      // Check required fields
      const hasRequiredFields = requiredFields.every(field => 
        exercise.hasOwnProperty(field) && exercise[field] !== undefined
      );
      
      // Check valid type
      const hasValidType = validTypes.includes(exercise.type);
      
      // Check valid category (1-5 for B1)
      const hasValidCategory = exercise.categoryId >= 1 && exercise.categoryId <= 5;
      
      // Check B1 level complexity (minimum text length)
      const hasMinimumComplexity = exercise.text.split(' ').length >= 6;
      
      // Check type-specific fields
      let hasTypeSpecificFields = true;
      if (exercise.type === 'multiple_choice') {
        hasTypeSpecificFields = exercise.choices && 
                               Array.isArray(exercise.choices) &&
                               exercise.choices.length >= 3 && // B1 should have at least 3 choices
                               exercise.correctChoiceIndex !== undefined &&
                               exercise.correctChoiceIndex >= 0 &&
                               exercise.correctChoiceIndex < exercise.choices.length;
      } else {
        hasTypeSpecificFields = exercise.errorPositions && Array.isArray(exercise.errorPositions);
      }
      
      return hasRequiredFields && hasValidType && hasValidCategory && 
             hasMinimumComplexity && hasTypeSpecificFields;
    });
  },

  // Get comprehensive summary for B1
  getSummary: () => {
    const totalErrorPositions = allExercises
      .filter(ex => ex.errorPositions)
      .reduce((sum, ex) => sum + ex.errorPositions.length, 0);
    
    return {
      level: "B1",
      totalExercises: allExercises.length,
      categories: errorCorrectionB1.categories.length,
      difficulty: "Intermediate-Advanced",
      focus: "Complex grammatical structures and tense relationships",
      progression: "Builds on A2 with present perfect, conditionals, passive voice, reported speech, and relative clauses",
      distribution: {
        full: errorCorrectionB1Full.length,
        identify: errorCorrectionB1Identify.length,
        multiple_choice: errorCorrectionB1MultipleChoice.length
      },
      complexity: {
        averageTextLength: Math.round(allExercises.reduce((sum, ex) => sum + ex.text.split(' ').length, 0) / allExercises.length),
        totalErrorPositions: totalErrorPositions,
        averageErrorsPerExercise: Math.round(totalErrorPositions / allExercises.filter(ex => ex.errorPositions).length * 10) / 10
      }
    };
  }
};

// Validate structure on export
if (!errorCorrectionB1.validateStructure()) {
  console.warn('Error Correction B1: Some exercises have invalid structure');
} else {
  console.log(`Error Correction B1: Successfully loaded ${allExercises.length} exercises`);
}

export default errorCorrectionB1;