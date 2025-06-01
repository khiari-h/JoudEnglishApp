// src/data/exercises/errorCorrection/B2/index.js

import errorCorrectionB2Full from './categories/errorCorrectionB2Full';
import errorCorrectionB2Identify from './categories/errorCorrectionB2Identify';
import errorCorrectionB2MultipleChoice from './categories/errorCorrectionB2MultipleChoice';

// Combine all exercises from the 3 files
const allExercises = [
  ...errorCorrectionB2Full,
  ...errorCorrectionB2Identify,
  ...errorCorrectionB2MultipleChoice
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

const errorCorrectionB2 = {
  level: "B2",
  totalExercises: allExercises.length,

  // Statistics by type
  statistics: {
    full: errorCorrectionB2Full.length,
    identify: errorCorrectionB2Identify.length,
    multiple_choice: errorCorrectionB2MultipleChoice.length,
    byCategory: {
      1: { name: "Advanced Conditionals", count: 8 },        // 3 full + 3 identify + 2 multiple_choice
      2: { name: "Subjunctive & Formal Grammar", count: 8 }, // 3 full + 3 identify + 2 multiple_choice
      3: { name: "Advanced Passive & Causative", count: 9 }, // 3 full + 4 identify + 2 multiple_choice
      4: { name: "Discourse & Cohesion", count: 9 },         // 3 full + 4 identify + 2 multiple_choice
      5: { name: "Register & Style", count: 8 }              // 2 full + 3 identify + 3 multiple_choice
    }
  },

  // Categories metadata for B2 advanced level
  categories: [
    {
      id: 1,
      name: "Advanced Conditionals",
      description: "Mixed conditionals, complex hypothetical situations, advanced conditional patterns",
      exerciseCount: 8,
      difficulty: "Advanced",
      color: "#3b82f6",
      topics: ["mixed conditionals", "complex hypotheticals", "conditional with modals", "implied conditionals", "formal conditional conjunctions"],
      commonErrors: ["would have in if-clauses", "tense mixing", "inappropriate conjunctions"],
      skillsTargeted: ["hypothetical reasoning", "complex time relationships", "formal register"]
    },
    {
      id: 2,
      name: "Subjunctive & Formal Grammar",
      description: "Subjunctive mood, formal constructions, advanced verb patterns",
      exerciseCount: 8,
      difficulty: "Advanced", 
      color: "#10b981",
      topics: ["subjunctive mood", "formal registers", "complex verb patterns", "inversion", "mandative subjunctive"],
      commonErrors: ["indicative instead of subjunctive", "incorrect formal inversions", "should instead of subjunctive"],
      skillsTargeted: ["formal register awareness", "advanced grammar structures", "academic writing"]
    },
    {
      id: 3,
      name: "Advanced Passive & Causative",
      description: "Complex passive constructions, causative forms, advanced passive patterns",
      exerciseCount: 9,
      difficulty: "Advanced",
      color: "#f59e0b",
      topics: ["complex passives", "causative have/get", "passive reporting", "perfect infinitives", "passive with modals"],
      commonErrors: ["incorrect causative structures", "wrong infinitive forms", "missing auxiliaries"],
      skillsTargeted: ["complex sentence transformation", "causative understanding", "passive mastery"]
    },
    {
      id: 4,
      name: "Discourse & Cohesion",
      description: "Advanced linking devices, discourse markers, text cohesion",
      exerciseCount: 9,
      difficulty: "Advanced",
      color: "#8b5cf6",
      topics: ["discourse markers", "cohesive devices", "substitution", "ellipsis", "advanced connectors"],
      commonErrors: ["inappropriate connectors", "wordiness", "repetition", "informal markers in formal text"],
      skillsTargeted: ["text organization", "coherence", "advanced writing skills", "academic discourse"]
    },
    {
      id: 5,
      name: "Register & Style",
      description: "Formal vs informal register, academic writing, stylistic appropriateness",
      exerciseCount: 8,
      difficulty: "Advanced",
      color: "#ef4444",
      topics: ["register awareness", "academic style", "formal language", "appropriateness", "professional communication"],
      commonErrors: ["mixed registers", "inappropriate informality", "lack of precision", "colloquial expressions"],
      skillsTargeted: ["register sensitivity", "professional communication", "academic writing", "stylistic awareness"]
    },
  ],

  // All exercises combined and sorted
  exercises: allExercises,

  // Advanced helper methods for B2 level
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

  // Get exercises by specific skills
  getExercisesBySkill: (skill) => {
    return allExercises.filter(exercise => {
      const category = errorCorrectionB2.categories.find(cat => cat.id === exercise.categoryId);
      return category?.skillsTargeted.includes(skill);
    });
  },

  // Get exercises by difficulty within B2
  getAdvancedExercises: () => {
    return allExercises.filter(exercise => {
      const wordCount = exercise.text.split(' ').length;
      const errorCount = exercise.errorPositions ? exercise.errorPositions.length : 1;
      // B2 advanced: longer texts (10+ words) or multiple errors (3+)
      return wordCount >= 10 || errorCount >= 3;
    });
  },

  // Get exercises focusing on formal register
  getFormalRegisterExercises: () => {
    return allExercises.filter(exercise => {
      return exercise.categoryId === 2 || exercise.categoryId === 5 || 
             exercise.explanation.toLowerCase().includes('formal');
    });
  },

  // Get exercises for academic preparation
  getAcademicPreparationExercises: () => {
    return allExercises.filter(exercise => {
      const academicKeywords = ['academic', 'formal', 'discourse', 'register', 'subjunctive'];
      return academicKeywords.some(keyword => 
        exercise.explanation.toLowerCase().includes(keyword) ||
        exercise.hint.toLowerCase().includes(keyword)
      );
    });
  },

  // Enhanced validation for B2 level
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

      // Check valid category (1-5 for B2)
      const hasValidCategory = exercise.categoryId >= 1 && exercise.categoryId <= 5;

      // Check B2 level complexity (minimum text length and sophistication)
      const hasMinimumComplexity = exercise.text.split(' ').length >= 8;
      const hasAdvancedVocabulary = exercise.text.length > 50; // More sophisticated texts

      // Check type-specific fields with B2 standards
      let hasTypeSpecificFields = true;
      if (exercise.type === 'multiple_choice') {
        hasTypeSpecificFields = exercise.choices && 
                               Array.isArray(exercise.choices) &&
                               exercise.choices.length >= 4 && // B2 should have 4 choices for complexity
                               exercise.correctChoiceIndex !== undefined &&
                               exercise.correctChoiceIndex >= 0 &&
                               exercise.correctChoiceIndex < exercise.choices.length;
      } else {
        hasTypeSpecificFields = exercise.errorPositions && Array.isArray(exercise.errorPositions);
      }

      return hasRequiredFields && hasValidType && hasValidCategory && 
             hasMinimumComplexity && hasAdvancedVocabulary && hasTypeSpecificFields;
    });
  },

  // Comprehensive B2 summary with advanced metrics
  getSummary: () => {
    const totalErrorPositions = allExercises
      .filter(ex => ex.errorPositions)
      .reduce((sum, ex) => sum + ex.errorPositions.length, 0);

    const totalTextLength = allExercises.reduce((sum, ex) => sum + ex.text.length, 0);
    const complexExercises = errorCorrectionB2.getAdvancedExercises().length;
    const formalExercises = errorCorrectionB2.getFormalRegisterExercises().length;

    return {
      level: "B2",
      totalExercises: allExercises.length,
      categories: errorCorrectionB2.categories.length,
      difficulty: "Advanced",
      focus: "Complex grammatical structures, register awareness, and discourse competence",
      progression: "Builds on B1 with mixed conditionals, subjunctive, advanced passive, discourse markers, and register sensitivity",
      distribution: {
        full: errorCorrectionB2Full.length,
        identify: errorCorrectionB2Identify.length,
        multiple_choice: errorCorrectionB2MultipleChoice.length
      },
      complexity: {
        averageTextLength: Math.round(totalTextLength / allExercises.length),
        averageWordCount: Math.round(allExercises.reduce((sum, ex) => sum + ex.text.split(' ').length, 0) / allExercises.length),
        totalErrorPositions: totalErrorPositions,
        averageErrorsPerExercise: Math.round(totalErrorPositions / allExercises.filter(ex => ex.errorPositions).length * 10) / 10,
        complexExercisesPercentage: Math.round((complexExercises / allExercises.length) * 100),
        formalRegisterFocus: Math.round((formalExercises / allExercises.length) * 100)
      },
      skillsTargeted: [
        "Advanced grammatical competence",
        "Register and style awareness", 
        "Discourse organization",
        "Academic writing preparation",
        "Professional communication"
      ]
    };
  }
};

// Validate structure on export
if (!errorCorrectionB2.validateStructure()) {

} else {

}

export default errorCorrectionB2;
