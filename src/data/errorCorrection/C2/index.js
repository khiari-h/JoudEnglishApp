// src/data/exercises/errorCorrection/C2/index.js

import errorCorrectionC2Full from './categories/errorCorrectionC2Full';
import errorCorrectionC2Identify from './categories/errorCorrectionC2Identify';
import errorCorrectionC2MultipleChoice from './categories/errorCorrectionC2MultipleChoice';

// Combine all exercises from the 3 files
const allExercises = [
  ...errorCorrectionC2Full,
  ...errorCorrectionC2Identify,
  ...errorCorrectionC2MultipleChoice
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

const errorCorrectionC2 = {
  level: "C2",
  totalExercises: allExercises.length,

  // Statistics by type
  statistics: {
    full: errorCorrectionC2Full.length,
    identify: errorCorrectionC2Identify.length,
    multiple_choice: errorCorrectionC2MultipleChoice.length,
    byCategory: {
      1: { name: "Literary & Artistic Language", count: 12 },    // 4 full + 5 identify + 3 multiple_choice
      2: { name: "Sophisticated Rhetoric", count: 10 },         // 4 full + 4 identify + 2 multiple_choice
      3: { name: "Linguistic Mastery", count: 10 },             // 4 full + 4 identify + 2 multiple_choice
      4: { name: "Cultural Expertise", count: 11 },             // 4 full + 5 identify + 2 multiple_choice
      5: { name: "Advanced Stylistics", count: 11 }             // 4 full + 4 identify + 3 multiple_choice
    }
  },

  // Categories metadata for C2 mastery level
  categories: [
    {
      id: 1,
      name: "Literary & Artistic Language",
      description: "Literary devices, aesthetic expression, artistic language mastery",
      exerciseCount: 12,
      difficulty: "Mastery",
      color: "#3b82f6",
      topics: ["literary devices", "aesthetic expression", "artistic language", "poetic structures", "literary analysis", "prosody"],
      commonErrors: ["unnecessary articles", "redundant modifiers", "overly formal language", "redundant literary terms"],
      skillsTargeted: ["literary sophistication", "aesthetic sensitivity", "artistic expression", "cultural literacy", "poetic awareness"]
    },
    {
      id: 2,
      name: "Sophisticated Rhetoric",
      description: "Advanced rhetorical mastery, persuasive excellence, oratory sophistication",
      exerciseCount: 10,
      difficulty: "Mastery",
      color: "#10b981",
      topics: ["rhetorical mastery", "persuasive excellence", "dialectical reasoning", "oratory sophistication", "argumentative artistry"],
      commonErrors: ["wordy constructions", "unnecessary formality", "redundant phrases", "weak intensifiers"],
      skillsTargeted: ["rhetorical mastery", "persuasive artistry", "oratorical excellence", "argumentative sophistication", "dialectical thinking"]
    },
    {
      id: 3,
      name: "Linguistic Mastery",
      description: "Perfect command of language, semantic precision, lexical sophistication",
      exerciseCount: 10,
      difficulty: "Mastery",
      color: "#f59e0b",
      topics: ["semantic mastery", "lexical precision", "linguistic sophistication", "perfect command", "stylistic finesse"],
      commonErrors: ["redundant modifiers", "imprecise vocabulary", "unnecessary intensifiers", "wordy expressions"],
      skillsTargeted: ["linguistic perfection", "semantic precision", "lexical mastery", "expressive excellence", "linguistic artistry"]
    },
    {
      id: 4,
      name: "Cultural Expertise",
      description: "Deep cultural knowledge, literary references, mythological sophistication",
      exerciseCount: 11,
      difficulty: "Mastery",
      color: "#8b5cf6",
      topics: ["cultural mastery", "literary allusions", "mythological references", "cross-cultural competence", "archetypal understanding"],
      commonErrors: ["unnecessary elaboration", "redundant cultural markers", "over-explanation", "wordy constructions"],
      skillsTargeted: ["cultural expertise", "literary knowledge", "cultural sophistication", "intellectual breadth", "mythological literacy"]
    },
    {
      id: 5,
      name: "Advanced Stylistics",
      description: "Stylistic mastery, register perfection, expressive sophistication",
      exerciseCount: 11,
      difficulty: "Mastery",
      color: "#ef4444",
      topics: ["stylistic mastery", "register perfection", "expressive sophistication", "artistic communication", "linguistic modulation"],
      commonErrors: ["redundant specifications", "unnecessary intensifiers", "overly complex constructions", "lack of economy"],
      skillsTargeted: ["stylistic excellence", "expressive mastery", "communicative artistry", "linguistic elegance", "expressive economy"]
    }
  ],

  // All exercises combined and sorted
  exercises: allExercises,

  // Master-level helper methods for C2
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

  // Get exercises for mastery-level skills
  getMasteryLevelExercises: () => {
    return allExercises.filter(exercise => {
      const wordCount = exercise.text.split(' ').length;
      const hasAdvancedVocab = exercise.text.length > 120;
      const hasSophisticatedTerms = ['literary', 'rhetorical', 'aesthetic', 'linguistic', 'cultural']
        .some(term => exercise.text.toLowerCase().includes(term));
      return wordCount >= 18 && hasAdvancedVocab && hasSophisticatedTerms;
    });
  },

  // Get exercises with literary and cultural references
  getLiteraryExercises: () => {
    return allExercises.filter(exercise => {
      const literaryKeywords = ['literary', 'poet', 'novelist', 'prose', 'rhetoric', 'aesthetic', 'artistic'];
      return literaryKeywords.some(keyword => 
        exercise.text.toLowerCase().includes(keyword)
      );
    });
  },

  getCulturalReferenceExercises: () => {
    return allExercises.filter(exercise => {
      const culturalKeywords = ['Kafkaesque', 'quixotic', 'Faustian', 'Prometheus', 'Pandora', 'archetypal', 'mythological'];
      return culturalKeywords.some(keyword => 
        exercise.text.includes(keyword) || exercise.correctedText.includes(keyword)
      );
    });
  },

  // Get exercises focusing on linguistic artistry
  getArtisticLanguageExercises: () => {
    return allExercises.filter(exercise => {
      return exercise.categoryId === 1 || exercise.categoryId === 5 ||
             exercise.explanation.toLowerCase().includes('artistic') ||
             exercise.explanation.toLowerCase().includes('sophisticated');
    });
  },

  // Get exercises for stylistic precision
  getStylisticPrecisionExercises: () => {
    return allExercises.filter(exercise => {
      const precisionKeywords = ['redundant', 'unnecessary', 'elegant', 'sophisticated', 'precise'];
      return precisionKeywords.some(keyword => 
        exercise.explanation.toLowerCase().includes(keyword)
      );
    });
  },

  // Ultimate validation for C2 mastery level
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

      // Check valid category (1-5 for C2)
      const hasValidCategory = exercise.categoryId >= 1 && exercise.categoryId <= 5;

      // Check C2 mastery level complexity
      const hasMasteryComplexity = exercise.text.split(' ').length >= 15;
      const hasSophisticatedVocab = exercise.text.length > 100;
      const hasAdvancedConcepts = exercise.explanation.length > 50; // Detailed explanations

      // Check type-specific fields with C2 mastery standards
      let hasTypeSpecificFields = true;
      if (exercise.type === 'multiple_choice') {
        hasTypeSpecificFields = exercise.choices && 
                               Array.isArray(exercise.choices) &&
                               exercise.choices.length === 4 && // C2 should have exactly 4 sophisticated choices
                               exercise.correctChoiceIndex !== undefined &&
                               exercise.correctChoiceIndex >= 0 &&
                               exercise.correctChoiceIndex < exercise.choices.length &&
                               exercise.choices.every(choice => choice.length > 3); // Sophisticated vocabulary
      } else {
        hasTypeSpecificFields = exercise.errorPositions && Array.isArray(exercise.errorPositions);
      }

      return hasRequiredFields && hasValidType && hasValidCategory && 
             hasMasteryComplexity && hasSophisticatedVocab && hasAdvancedConcepts && hasTypeSpecificFields;
    });
  },

  // Comprehensive C2 mastery summary with ultimate metrics
  getSummary: () => {
    const totalErrorPositions = allExercises
      .filter(ex => ex.errorPositions)
      .reduce((sum, ex) => sum + ex.errorPositions.length, 0);

    const totalTextLength = allExercises.reduce((sum, ex) => sum + ex.text.length, 0);
    const masteryExercises = errorCorrectionC2.getMasteryLevelExercises().length;
    const literaryExercises = errorCorrectionC2.getLiteraryExercises().length;
    const culturalExercises = errorCorrectionC2.getCulturalReferenceExercises().length;
    const artisticExercises = errorCorrectionC2.getArtisticLanguageExercises().length;

    return {
      level: "C2",
      totalExercises: allExercises.length,
      categories: errorCorrectionC2.categories.length,
      difficulty: "Mastery",
      focus: "Perfect linguistic command, literary sophistication, cultural expertise, artistic expression",
      progression: "Ultimate mastery: native-speaker level precision with artistic and cultural sophistication",
      distribution: {
        full: errorCorrectionC2Full.length,
        identify: errorCorrectionC2Identify.length,
        multiple_choice: errorCorrectionC2MultipleChoice.length
      },
      complexity: {
        averageTextLength: Math.round(totalTextLength / allExercises.length),
        averageWordCount: Math.round(allExercises.reduce((sum, ex) => sum + ex.text.split(' ').length, 0) / allExercises.length),
        totalErrorPositions,
        averageErrorsPerExercise: Math.round(totalErrorPositions / allExercises.filter(ex => ex.errorPositions).length * 10) / 10,
        masteryExercisesPercentage: Math.round((masteryExercises / allExercises.length) * 100),
        literaryFocusPercentage: Math.round((literaryExercises / allExercises.length) * 100),
        culturalReferencePercentage: Math.round((culturalExercises / allExercises.length) * 100),
        artisticLanguagePercentage: Math.round((artisticExercises / allExercises.length) * 100)
      },
      masteryIndicators: [
        "Perfect linguistic precision",
        "Literary and artistic sophistication", 
        "Advanced cultural competence",
        "Stylistic and rhetorical mastery",
        "Semantic and expressive perfection"
      ],
      skillsTargeted: [
        "Perfect linguistic mastery",
        "Literary and artistic sophistication",
        "Advanced cultural competence",
        "Stylistic and rhetorical excellence",
        "Semantic and expressive precision",
        "Communicative artistry",
        "Linguistic elegance"
      ]
    };
  }
};

// Validate structure on export
if (!errorCorrectionC2.validateStructure()) {
  // empty: structure invalid, handle if needed
} else {
  // empty: structure valid, nothing to do
}

export default errorCorrectionC2;
