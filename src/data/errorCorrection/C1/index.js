// src/data/exercises/errorCorrection/C1/index.js

import errorCorrectionC1Full from './categories/errorCorrectionC1Full';
import errorCorrectionC1Identify from './categories/errorCorrectionC1Identify';
import errorCorrectionC1MultipleChoice from './categories/errorCorrectionC1MultipleChoice';

// Combine all exercises from the 3 files
const allExercises = [
  ...errorCorrectionC1Full,
  ...errorCorrectionC1Identify,
  ...errorCorrectionC1MultipleChoice
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

const errorCorrectionC1 = {
  level: "C1",
  totalExercises: allExercises.length,
  
  // Statistics by type
  statistics: {
    full: errorCorrectionC1Full.length,
    identify: errorCorrectionC1Identify.length,
    multiple_choice: errorCorrectionC1MultipleChoice.length,
    byCategory: {
      1: { name: "Nuanced Grammar & Style", count: 9 },          // 3 full + 4 identify + 2 multiple_choice
      2: { name: "Advanced Discourse & Rhetoric", count: 10 },  // 3 full + 4 identify + 3 multiple_choice
      3: { name: "Cultural & Contextual Language", count: 9 },   // 3 full + 4 identify + 2 multiple_choice
      4: { name: "Complex Argumentation", count: 11 },          // 4 full + 4 identify + 3 multiple_choice
      5: { name: "Linguistic Precision", count: 9 }             // 3 full + 4 identify + 2 multiple_choice
    }
  },

  // Categories metadata for C1 expert level
  categories: [
    {
      id: 1,
      name: "Nuanced Grammar & Style",
      description: "Sophisticated grammatical structures, stylistic nuances, advanced syntax",
      exerciseCount: 9,
      difficulty: "Expert",
      color: "#3b82f6",
      topics: ["complex inversions", "parallel structures", "nuanced modality", "sophisticated conjunctions", "advanced syntax"],
      commonErrors: ["tense inconsistency", "redundant expressions", "inappropriate register"],
      skillsTargeted: ["grammatical sophistication", "stylistic awareness", "syntactic complexity", "academic precision"]
    },
    {
      id: 2,
      name: "Advanced Discourse & Rhetoric",
      description: "Rhetorical devices, advanced discourse markers, persuasive language structures",
      exerciseCount: 10,
      difficulty: "Expert",
      color: "#10b981",
      topics: ["rhetorical devices", "advanced connectors", "discourse sophistication", "formal transitions", "academic argumentation"],
      commonErrors: ["inappropriate connectors", "redundant hedging", "informal discourse markers"],
      skillsTargeted: ["rhetorical competence", "advanced argumentation", "discourse mastery", "academic sophistication"]
    },
    {
      id: 3,
      name: "Cultural & Contextual Language",
      description: "Cultural references, idiomatic sophistication, contextual appropriateness",
      exerciseCount: 9,
      difficulty: "Expert",
      color: "#f59e0b",
      topics: ["cultural allusions", "mythological references", "sophisticated idioms", "contextual precision", "literary references"],
      commonErrors: ["incorrect cultural references", "inappropriate register", "spelling of cultural terms"],
      skillsTargeted: ["cultural competence", "implicit understanding", "contextual sensitivity", "literary knowledge"]
    },
    {
      id: 4,
      name: "Complex Argumentation",
      description: "Advanced argumentative structures, logical precision, academic reasoning",
      exerciseCount: 11,
      difficulty: "Expert",
      color: "#8b5cf6",
      topics: ["complex reasoning", "logical structures", "academic argumentation", "analytical precision", "empirical reasoning"],
      commonErrors: ["misused logical terms", "unsupported claims", "redundant qualifications", "imprecise terminology"],
      skillsTargeted: ["analytical thinking", "logical precision", "academic discourse", "critical reasoning"]
    },
    {
      id: 5,
      name: "Linguistic Precision",
      description: "Precise word choice, semantic nuances, register mastery, conciseness",
      exerciseCount: 9,
      difficulty: "Expert",
      color: "#ef4444",
      topics: ["semantic precision", "register mastery", "lexical sophistication", "conciseness", "elegant expression"],
      commonErrors: ["redundant expressions", "wordy constructions", "imprecise vocabulary", "inappropriate formality"],
      skillsTargeted: ["lexical precision", "semantic awareness", "register expertise", "expressive economy"]
    }
  ],

  // All exercises combined and sorted
  exercises: allExercises,

  // Advanced helper methods for C1 level
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

  // Get exercises by specific expert skills
  getExpertLevelExercises: () => {
    return allExercises.filter(exercise => {
      const wordCount = exercise.text.split(' ').length;
      const hasAdvancedVocab = exercise.text.length > 100;
      return wordCount >= 15 && hasAdvancedVocab; // Very sophisticated texts
    });
  },

  // Get exercises with cultural references
  getCulturalReferenceExercises: () => {
    return allExercises.filter(exercise => {
      const culturalKeywords = ['Sisyphean', 'Kafkaesque', 'Machiavellian', 'Pyrrhic', 'Achilles', 'quixotic'];
      return culturalKeywords.some(keyword => 
        exercise.text.toLowerCase().includes(keyword.toLowerCase())
      );
    });
  },

  // Get exercises focusing on academic precision
  getAcademicPrecisionExercises: () => {
    return allExercises.filter(exercise => {
      const academicKeywords = ['research', 'methodology', 'hypothesis', 'empirical', 'evidence'];
      return academicKeywords.some(keyword => 
        exercise.text.toLowerCase().includes(keyword)
      );
    });
  },

  // Get exercises for stylistic sophistication
  getStylisticExercises: () => {
    return allExercises.filter(exercise => {
      return exercise.categoryId === 1 || exercise.categoryId === 5 ||
             exercise.explanation.toLowerCase().includes('style') ||
             exercise.explanation.toLowerCase().includes('sophisticated');
    });
  },

  // Enhanced validation for C1 expert level
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
      
      // Check valid category (1-5 for C1)
      const hasValidCategory = exercise.categoryId >= 1 && exercise.categoryId <= 5;
      
      // Check C1 level complexity (sophisticated texts and vocabulary)
      const hasExpertComplexity = exercise.text.split(' ').length >= 12;
      const hasSophisticatedVocab = exercise.text.length > 80;
      
      // Check type-specific fields with C1 standards
      let hasTypeSpecificFields = true;
      if (exercise.type === 'multiple_choice') {
        hasTypeSpecificFields = exercise.choices && 
                               Array.isArray(exercise.choices) &&
                               exercise.choices.length >= 4 && // C1 should have 4 sophisticated choices
                               exercise.correctChoiceIndex !== undefined &&
                               exercise.correctChoiceIndex >= 0 &&
                               exercise.correctChoiceIndex < exercise.choices.length;
      } else {
        hasTypeSpecificFields = exercise.errorPositions && Array.isArray(exercise.errorPositions);
      }
      
      return hasRequiredFields && hasValidType && hasValidCategory && 
             hasExpertComplexity && hasSophisticatedVocab && hasTypeSpecificFields;
    });
  },

  // Comprehensive C1 summary with expert metrics
  getSummary: () => {
    const totalErrorPositions = allExercises
      .filter(ex => ex.errorPositions)
      .reduce((sum, ex) => sum + ex.errorPositions.length, 0);
    
    const totalTextLength = allExercises.reduce((sum, ex) => sum + ex.text.length, 0);
    const expertExercises = errorCorrectionC1.getExpertLevelExercises().length;
    const culturalExercises = errorCorrectionC1.getCulturalReferenceExercises().length;
    const academicExercises = errorCorrectionC1.getAcademicPrecisionExercises().length;
    
    return {
      level: "C1",
      totalExercises: allExercises.length,
      categories: errorCorrectionC1.categories.length,
      difficulty: "Expert",
      focus: "Sophisticated grammatical structures, cultural competence, rhetorical mastery, academic precision",
      progression: "Builds on B2 with advanced stylistic awareness, cultural sophistication, and expert-level precision",
      distribution: {
        full: errorCorrectionC1Full.length,
        identify: errorCorrectionC1Identify.length,
        multiple_choice: errorCorrectionC1MultipleChoice.length
      },
      complexity: {
        averageTextLength: Math.round(totalTextLength / allExercises.length),
        averageWordCount: Math.round(allExercises.reduce((sum, ex) => sum + ex.text.split(' ').length, 0) / allExercises.length),
        totalErrorPositions: totalErrorPositions,
        averageErrorsPerExercise: Math.round(totalErrorPositions / allExercises.filter(ex => ex.errorPositions).length * 10) / 10,
        expertExercisesPercentage: Math.round((expertExercises / allExercises.length) * 100),
        culturalReferencePercentage: Math.round((culturalExercises / allExercises.length) * 100),
        academicFocusPercentage: Math.round((academicExercises / allExercises.length) * 100)
      },
      skillsTargeted: [
        "Expert grammatical competence",
        "Cultural and literary sophistication",
        "Advanced rhetorical skills",
        "Academic precision and register mastery",
        "Sophisticated stylistic awareness"
      ]
    };
  }
};

// Validate structure on export
if (!errorCorrectionC1.validateStructure()) {
  console.warn('Error Correction C1: Some exercises have invalid structure');
} else {
  console.log(`Error Correction C1: Successfully loaded ${allExercises.length} expert-level exercises`);
}

export default errorCorrectionC1;