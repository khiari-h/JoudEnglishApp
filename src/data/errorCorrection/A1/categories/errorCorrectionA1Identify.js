// src/data/exercises/errorCorrection/A1/errorCorrectionA1Identify.js

const errorCorrectionA1Identify = [
  // === ARTICLES (2 exercices) ===
  {
    categoryId: 1,
    type: "identify",
    text: "He is engineer working in office.",
    correctedText: "He is an engineer working in an office.",
    errorPositions: [3, 6],
    hint: "Find the missing articles before 'engineer' and 'office'",
    explanation: "Use 'an' before 'engineer' (vowel sound) and 'an' before 'office'",
  },
  {
    categoryId: 1,
    type: "identify", 
    text: "I need book and pen for class.",
    correctedText: "I need a book and a pen for class.",
    errorPositions: [2, 5],
    hint: "Look for missing articles before countable nouns",
    explanation: "Use 'a' before singular countable nouns 'book' and 'pen'",
  },

  // === VERB TO BE (2 exercices) ===
  {
    categoryId: 2,
    type: "identify",
    text: "I is student from France.",
    correctedText: "I am a student from France.",
    errorPositions: [1, 2],
    hint: "Check the verb 'to be' with different subjects",
    explanation: "Use 'am' with 'I', not 'is', and add 'a' before 'student'",
  },
  {
    categoryId: 2,
    type: "identify",
    text: "You is my best friend.",
    correctedText: "You are my best friend.",
    errorPositions: [1],
    hint: "What form of 'to be' goes with 'you'?",
    explanation: "Use 'are' with 'you', not 'is'",
  },

  // === SIMPLE PRESENT (2 exercices) ===
  {
    categoryId: 3,
    type: "identify",
    text: "She work in a hospital every day.",
    correctedText: "She works in a hospital every day.",
    errorPositions: [1],
    hint: "Check the verb form for third-person singular",
    explanation: "Add 's' to 'work' when the subject is 'she'",
  },
  {
    categoryId: 3,
    type: "identify",
    text: "My brother like to swim and he go to pool.",
    correctedText: "My brother likes to swim and he goes to the pool.",
    errorPositions: [2, 7, 10],
    hint: "Find verbs that need 's' and missing articles",
    explanation: "Add 's' to 'like' and 'go' for third-person singular, and 'the' before 'pool'",
  },

  // === PRONOUNS (2 exercices) ===
  {
    categoryId: 4,
    type: "identify",
    text: "Her work in a bank.",
    correctedText: "She works in a bank.",
    errorPositions: [0, 2],
    hint: "Check the subject and verb agreement",
    explanation: "Use 'she' as the subject and add 's' to the verb",
  },
  {
    categoryId: 4,
    type: "identify",
    text: "Him is my brother and me like him.",
    correctedText: "He is my brother and I like him.",
    errorPositions: [0, 5],
    hint: "Find the incorrect subject pronouns",
    explanation: "Use 'he' and 'I' as subject pronouns, not 'him' and 'me'",
  },

  // === SENTENCE STRUCTURE (2 exercices) ===
  {
    categoryId: 5,
    type: "identify",
    text: "To school I go every morning.",
    correctedText: "I go to school every morning.",
    errorPositions: [0, 1, 2, 3],
    hint: "Reorder the sentence to follow English word order",
    explanation: "Subject (I) comes before verb (go) in English",
  },
  {
    categoryId: 5,
    type: "identify",
    text: "Like I very much chocolate.",
    correctedText: "I like chocolate very much.",
    errorPositions: [0, 1, 2, 3, 4],
    hint: "Arrange the words in the correct English order",
    explanation: "Standard order: Subject + Verb + Object + Adverb",
  }
];

export default errorCorrectionA1Identify;