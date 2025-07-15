// src/data/exercises/errorCorrection/A2/index.js

import errorCorrectionA2Full from './categories/errorCorrectionA2Full';
import errorCorrectionA2Identify from './categories/errorCorrectionA2Identify';
import errorCorrectionA2MultipleChoice from './categories/errorCorrectionA2MultipleChoice';

// Combine all exercises from the 3 files
const allExercises = [
  ...errorCorrectionA2Full,
  ...errorCorrectionA2Identify,
  ...errorCorrectionA2MultipleChoice
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

const errorCorrectionA2 = {
  level: "A2",
  totalExercises: allExercises.length,

  // Statistics by type
  statistics: {
    full: errorCorrectionA2Full.length,
    identify: errorCorrectionA2Identify.length,
    multiple_choice: errorCorrectionA2MultipleChoice.length,
    byCategory: {
      1: { name: "Past Tense", count: 7 },           // 2 full + 3 identify + 2 multiple_choice
      2: { name: "Future Forms", count: 6 },         // 2 full + 2 identify + 2 multiple_choice
      3: { name: "Comparative & Superlative", count: 5 }, // 2 full + 2 identify + 1 multiple_choice
      4: { name: "Prepositions", count: 7 },         // 2 full + 3 identify + 2 multiple_choice
      5: { name: "Modal Verbs", count: 5 }           // 2 full + 2 identify + 1 multiple_choice
    }
  },

  // Categories metadata for A2 intermediate level
  categories: [
    {
      id: 1,
      name: "Past Tense",
      description: "Past simple, past continuous, and irregular verbs",
      exerciseCount: 7,
      difficulty: "Intermediate",
      color: "#3b82f6",
      topics: ["past simple", "past continuous", "irregular verbs", "past negatives"]
    },
    {
      id: 2,
      name: "Future Forms",
      description: "Will, going to, and present continuous for future",
      exerciseCount: 6,
      difficulty: "Intermediate", 
      color: "#10b981",
      topics: ["will", "going to", "future plans", "predictions"]
    },
    {
      id: 3,
      name: "Comparative & Superlative",
      description: "Comparative and superlative adjectives",
      exerciseCount: 5,
      difficulty: "Intermediate",
      color: "#f59e0b",
      topics: ["comparative adjectives", "superlative adjectives", "irregular forms"]
    },
    {
      id: 4,
      name: "Prepositions",
      description: "Prepositions of time, place, and movement",
      exerciseCount: 7,
      difficulty: "Intermediate",
      color: "#8b5cf6",
      topics: ["time prepositions", "place prepositions", "verb + preposition"]
    },
    {
      id: 5,
      name: "Modal Verbs",
      description: "Can, could, should, must, and have to",
      exerciseCount: 5,
      difficulty: "Intermediate",
      color: "#ef4444",
      topics: ["ability", "obligation", "advice", "permission"]
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
      const category = errorCorrectionA2.categories.find(cat => cat.id === exercise.categoryId);
      return category?.topics.includes(topic);
    });
  },

  // Validation
  validateStructure: () => {
    const requiredFields = ['categoryId', 'type', 'text', 'correctedText', 'hint', 'explanation'];
    const validTypes = ['full', 'identify', 'multiple_choice'];

    return allExercises.every(exercise => {
      // Check required fields
      const hasRequiredFields = requiredFields.every(field => 
        Object.prototype.hasOwnProperty.call(exercise, field) && exercise[field] !== undefined
      );

      // Check valid type
      const hasValidType = validTypes.includes(exercise.type);

      // Check valid category (1-5 for A2)
      const hasValidCategory = exercise.categoryId >= 1 && exercise.categoryId <= 5;

      // Check type-specific fields
      let hasTypeSpecificFields = true;
      if (exercise.type === 'multiple_choice') {
        hasTypeSpecificFields = exercise.choices && 
                               Array.isArray(exercise.choices) &&
                               exercise.choices.length >= 2 &&
                               exercise.correctChoiceIndex !== undefined &&
                               exercise.correctChoiceIndex >= 0 &&
                               exercise.correctChoiceIndex < exercise.choices.length;
      } else {
        hasTypeSpecificFields = exercise.errorPositions && Array.isArray(exercise.errorPositions);
      }

      return hasRequiredFields && hasValidType && hasValidCategory && hasTypeSpecificFields;
    });
  },

  // Get summary statistics
  getSummary: () => {
    return {
      level: "A2",
      totalExercises: allExercises.length,
      categories: errorCorrectionA2.categories.length,
      difficulty: "Intermediate",
      progression: "Builds on A1 with past/future tenses, comparatives, prepositions, and modals",
      distribution: {
        full: errorCorrectionA2Full.length,
        identify: errorCorrectionA2Identify.length,
        multiple_choice: errorCorrectionA2MultipleChoice.length
      }
    };
  }
};

// Validate structure on export
if (!errorCorrectionA2.validateStructure()) {
  // empty: structure invalid, handle if needed
} else {
  // empty: structure valid, nothing to do
}

export default errorCorrectionA2;
