// src/data/exercises/errorCorrection/A1/index.js

import errorCorrectionA1Full from './categories/errorCorrectionA1Full';
import errorCorrectionA1Identify from './categories/errorCorrectionA1Identify';
import errorCorrectionA1MultipleChoice from './categories/errorCorrectionA1MultipleChoice';

// Combine all exercises from the 3 files
const allExercises = [
  ...errorCorrectionA1Full,
  ...errorCorrectionA1Identify,
  ...errorCorrectionA1MultipleChoice
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

const errorCorrectionA1 = {
  level: "A1",
  totalExercises: allExercises.length,
  
  // Statistics by type
  statistics: {
    full: errorCorrectionA1Full.length,
    identify: errorCorrectionA1Identify.length,
    multiple_choice: errorCorrectionA1MultipleChoice.length,
    byCategory: {
      1: { name: "Articles", count: 5 },        // 2 full + 2 identify + 1 multiple_choice
      2: { name: "Verb to Be", count: 5 },      // 2 full + 2 identify + 1 multiple_choice
      3: { name: "Simple Present", count: 5 },  // 1 full + 2 identify + 2 multiple_choice
      4: { name: "Pronouns", count: 4 },        // 1 full + 2 identify + 1 multiple_choice
      5: { name: "Sentence Structure", count: 5 } // 1 full + 2 identify + 2 multiple_choice
    }
  },

  // Categories metadata (maintained for compatibility)
  categories: [
    {
      id: 1,
      name: "Articles",
      description: "Practicing correct usage of 'a', 'an', and 'the'",
      exerciseCount: 5,
      difficulty: "Basic",
      color: "#3b82f6"
    },
    {
      id: 2,
      name: "Verb to Be",
      description: "Correcting errors with the verb 'to be'",
      exerciseCount: 5,
      difficulty: "Basic", 
      color: "#10b981"
    },
    {
      id: 3,
      name: "Simple Present",
      description: "Fixing mistakes in simple present tense",
      exerciseCount: 5,
      difficulty: "Basic",
      color: "#f59e0b"
    },
    {
      id: 4,
      name: "Pronouns",
      description: "Identifying and correcting pronoun errors",
      exerciseCount: 4,
      difficulty: "Basic",
      color: "#8b5cf6"
    },
    {
      id: 5,
      name: "Sentence Structure",
      description: "Improving basic sentence construction",
      exerciseCount: 5,
      difficulty: "Basic",
      color: "#ef4444"
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

  // Validation
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
      
      // Check type-specific fields
      let hasTypeSpecificFields = true;
      if (exercise.type === 'multiple_choice') {
        hasTypeSpecificFields = exercise.choices && exercise.correctChoiceIndex !== undefined;
      } else {
        hasTypeSpecificFields = exercise.errorPositions && Array.isArray(exercise.errorPositions);
      }
      
      return hasRequiredFields && hasValidType && hasTypeSpecificFields;
    });
  }
};

// Validate structure on export
if (!errorCorrectionA1.validateStructure()) {
  console.warn('Error Correction A1: Some exercises have invalid structure');
}

export default errorCorrectionA1;