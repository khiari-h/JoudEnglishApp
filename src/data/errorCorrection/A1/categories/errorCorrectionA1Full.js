// src/data/exercises/errorCorrection/A1/errorCorrectionA1Full.js

const errorCorrectionA1Full = [
  // === ARTICLES (2 exercices) ===
  {
    categoryId: 1,
    type: "full",
    text: "I am student in Paris.",
    correctedText: "I am a student in Paris.",
    hint: "Remember to use 'a' before singular countable nouns",
    explanation: "When describing your profession or status, use 'a' before the noun.",
    errorPositions: [3],
  },
  {
    categoryId: 1,
    type: "full",
    text: "She works as teacher in school.",
    correctedText: "She works as a teacher in a school.",
    hint: "Both 'teacher' and 'school' need articles",
    explanation: "Use 'a' before both 'teacher' (profession) and 'school' (singular countable noun).",
    errorPositions: [4, 7],
  },

  // === VERB TO BE (2 exercices) ===
  {
    categoryId: 2,
    type: "full",
    text: "They be happy today.",
    correctedText: "They are happy today.",
    hint: "Remember the correct form of 'to be' for different subjects",
    explanation: "Use 'are' for 'they' in the verb 'to be'",
    errorPositions: [1, 2],
  },
  {
    categoryId: 2,
    type: "full",
    text: "My friends is very nice people.",
    correctedText: "My friends are very nice people.",
    hint: "Check subject-verb agreement with plural subjects",
    explanation: "Use 'are' with plural subjects like 'friends', not 'is'",
    errorPositions: [2],
  },

  // === SIMPLE PRESENT (1 exercice) ===
  {
    categoryId: 3,
    type: "full",
    text: "He play football every weekend.",
    correctedText: "He plays football every weekend.",
    hint: "Remember the third-person singular 's' in simple present",
    explanation: "Add 's' to the verb for third-person singular subjects",
    errorPositions: [2],
  },

  // === PRONOUNS (1 exercice) ===
  {
    categoryId: 4,
    type: "full",
    text: "Me is happy to meet you.",
    correctedText: "I am happy to meet you.",
    hint: "Use the correct subject pronoun",
    explanation: "Use 'I' as the subject pronoun, not 'me'",
    errorPositions: [0, 1],
  },

  // === SENTENCE STRUCTURE (1 exercice) ===
  {
    categoryId: 5,
    type: "full",
    text: "Happy I am today.",
    correctedText: "I am happy today.",
    hint: "Follow the standard English sentence structure",
    explanation: "In English, the subject typically comes before the verb",
    errorPositions: [0, 1, 2],
  }
];

export default errorCorrectionA1Full;