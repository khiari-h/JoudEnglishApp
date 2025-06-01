// src/data/exercises/errorCorrection/B1/categories/errorCorrectionB1Identify.js

const errorCorrectionB1Identify = [
  // === PRESENT PERFECT (3 exercices) ===
  {
    categoryId: 1,
    type: "identify",
    text: "I have went to Paris three times in my life.",
    correctedText: "I have been to Paris three times in my life.",
    errorPositions: [2],
    hint: "Find the incorrect past participle",
    explanation: "Use 'been' (past participle of 'go' for places visited), not 'went'.",
  },
  {
    categoryId: 1,
    type: "identify",
    text: "They have already finished their homework yesterday.",
    correctedText: "They finished their homework yesterday.",
    errorPositions: [1, 2, 3],
    hint: "Present perfect and specific past time don't go together",
    explanation: "Use past simple with specific past times like 'yesterday', not present perfect.",
  },
  {
    categoryId: 1,
    type: "identify",
    text: "Have you ever been visiting Japan?",
    correctedText: "Have you ever been to Japan?",
    errorPositions: [4],
    hint: "Check the construction after 'been' for places",
    explanation: "Use 'been to' for places visited, not 'been visiting'.",
  },

  // === CONDITIONALS (3 exercices) ===
  {
    categoryId: 2,
    type: "identify", 
    text: "If it will rain tomorrow, we won't go to the beach.",
    correctedText: "If it rains tomorrow, we won't go to the beach.",
    errorPositions: [2],
    hint: "Find the incorrect verb form in the if-clause",
    explanation: "Use present simple (rains) in first conditional if-clauses, not 'will'.",
  },
  {
    categoryId: 2,
    type: "identify",
    text: "I would help you if I would have time.",
    correctedText: "I would help you if I had time.",
    errorPositions: [6, 7],
    hint: "Look for the repeated conditional form",
    explanation: "Don't use 'would' in both clauses of conditionals. Use 'had' in the if-clause.",
  },
  {
    categoryId: 2,
    type: "identify",
    text: "If I studied harder, I will pass the exam.",
    correctedText: "If I studied harder, I would pass the exam.",
    errorPositions: [6],
    hint: "Check the consistency of the conditional type",
    explanation: "With 'studied' (past) in the if-clause, use 'would' (not 'will') in the main clause.",
  },

  // === PASSIVE VOICE (3 exercices) ===
  {
    categoryId: 3,
    type: "identify",
    text: "The letter was wrote by my grandmother.",
    correctedText: "The letter was written by my grandmother.",
    errorPositions: [3],
    hint: "Find the incorrect past participle",
    explanation: "Use 'written' (past participle of write), not 'wrote' (past simple).",
  },
  {
    categoryId: 3,
    type: "identify",
    text: "This book has read by millions of people.",
    correctedText: "This book has been read by millions of people.",
    errorPositions: [2],
    hint: "Something is missing in the passive construction",
    explanation: "Passive voice needs 'been' with present perfect: 'has been read'.",
  },
  {
    categoryId: 3,
    type: "identify",
    text: "The new bridge will be open next month.",
    correctedText: "The new bridge will be opened next month.",
    errorPositions: [5],
    hint: "Check the verb form after 'will be'",
    explanation: "Use past participle 'opened' in passive voice, not the adjective 'open'.",
  },

  // === REPORTED SPEECH (3 exercices) ===
  {
    categoryId: 4,
    type: "identify",
    text: "She said me that she was feeling sick.",
    correctedText: "She told me that she was feeling sick.",
    errorPositions: [1],
    hint: "Find the incorrect reporting verb construction",
    explanation: "Use 'told me' (with object) or 'said that' (without object), not 'said me'.",
  },
  {
    categoryId: 4,
    type: "identify",
    text: "He asked where was the nearest hospital.",
    correctedText: "He asked where the nearest hospital was.",
    errorPositions: [3, 4, 5, 6],
    hint: "Check the word order in the reported question",
    explanation: "Use statement word order in reported questions: 'where the hospital was'.",
  },
  {
    categoryId: 4,
    type: "identify",
    text: "They said they will come to the party tomorrow.",
    correctedText: "They said they would come to the party the next day.",
    errorPositions: [3, 8],
    hint: "Find the tense and time expression that need changing",
    explanation: "Change 'will' to 'would' and 'tomorrow' to 'the next day' in reported speech.",
  },

  // === RELATIVE CLAUSES (3 exercices) ===
  {
    categoryId: 5,
    type: "identify",
    text: "The book what I'm reading is very interesting.",
    correctedText: "The book that I'm reading is very interesting.",
    errorPositions: [2],
    hint: "Find the incorrect relative pronoun",
    explanation: "Use 'that' or 'which' for things, not 'what'.",
  },
  {
    categoryId: 5,
    type: "identify",
    text: "The man, that lives next door, is a teacher.",
    correctedText: "The man who lives next door is a teacher.",
    errorPositions: [2, 3, 6, 7],
    hint: "Check the relative pronoun and punctuation",
    explanation: "Use 'who' for people in defining clauses, and don't use commas with defining relative clauses.",
  },
  {
    categoryId: 5,
    type: "identify",
    text: "This is the house where I was born in.",
    correctedText: "This is the house where I was born.",
    errorPositions: [8],
    hint: "Find the unnecessary preposition",
    explanation: "'Where' already contains the meaning of 'in', so don't add 'in' at the end.",
  }
];

export default errorCorrectionB1Identify;
