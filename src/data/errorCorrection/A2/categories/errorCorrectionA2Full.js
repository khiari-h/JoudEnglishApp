// src/data/exercises/errorCorrection/A2/categories/errorCorrectionA2Full.js

const errorCorrectionA2Full = [
  // === PAST TENSE (2 exercices) ===
  {
    categoryId: 1,
    type: "full",
    text: "Yesterday I go to the store and buy some bread.",
    correctedText: "Yesterday I went to the store and bought some bread.",
    hint: "Use past tense forms for actions completed in the past",
    explanation: "Use 'went' (past of go) and 'bought' (past of buy) for past actions.",
    errorPositions: [2, 6],
  },
  {
    categoryId: 1,
    type: "full", 
    text: "When I was young, I live in Paris and study French.",
    correctedText: "When I was young, I lived in Paris and studied French.",
    hint: "All verbs should be in past tense when describing past situations",
    explanation: "Use past tense 'lived' and 'studied' to match the past time context.",
    errorPositions: [6, 10],
  },

  // === FUTURE FORMS (2 exercices) ===
  {
    categoryId: 2,
    type: "full",
    text: "Tomorrow I go to visit my grandmother.",
    correctedText: "Tomorrow I will go to visit my grandmother.",
    hint: "Use future forms for actions that will happen in the future",
    explanation: "Use 'will go' or 'am going to go' for future plans.",
    errorPositions: [2],
  },
  {
    categoryId: 2,
    type: "full",
    text: "Next week we move to a new house.",
    correctedText: "Next week we are going to move to a new house.",
    hint: "Express future plans with 'going to' or 'will'",
    explanation: "Use 'are going to move' for planned future actions.",
    errorPositions: [3],
  },

  // === COMPARATIVE & SUPERLATIVE (2 exercices) ===
  {
    categoryId: 3,
    type: "full",
    text: "This book is more good than that one.",
    correctedText: "This book is better than that one.",
    hint: "Some adjectives have irregular comparative forms",
    explanation: "The comparative of 'good' is 'better', not 'more good'.",
    errorPositions: [3, 4],
  },
  {
    categoryId: 3,
    type: "full",
    text: "She is the most tall girl in the class.",
    correctedText: "She is the tallest girl in the class.",
    hint: "Use correct superlative form for one-syllable adjectives",
    explanation: "For one-syllable adjectives, use '-est' (tallest), not 'most tall'.",
    errorPositions: [3, 4],
  },

  // === PREPOSITIONS (2 exercices) ===
  {
    categoryId: 4,
    type: "full",
    text: "I wake up in 7 o'clock and go to work with bus.",
    correctedText: "I wake up at 7 o'clock and go to work by bus.",
    hint: "Use correct prepositions for time and transportation",
    explanation: "Use 'at' for specific times and 'by' for means of transportation.",
    errorPositions: [3, 10],
  },
  {
    categoryId: 4,
    type: "full",
    text: "The meeting is in Monday in the morning.",
    correctedText: "The meeting is on Monday in the morning.",
    hint: "Use correct prepositions for days and time periods",
    explanation: "Use 'on' for specific days and 'in' for time periods like 'morning'.",
    errorPositions: [3],
  },

  // === MODAL VERBS (2 exercices) ===
  {
    categoryId: 5,
    type: "full",
    text: "You should to study more for the exam.",
    correctedText: "You should study more for the exam.",
    hint: "Modal verbs don't use 'to' before the main verb",
    explanation: "After modal verbs like 'should', use the base form without 'to'.",
    errorPositions: [2],
  },
  {
    categoryId: 5,
    type: "full",
    text: "I must to finish this work before 5 PM.",
    correctedText: "I must finish this work before 5 PM.",
    hint: "Don't use 'to' after modal verbs",
    explanation: "'Must' is followed by the base form of the verb, not infinitive 'to'.",
    errorPositions: [2],
  }
];

export default errorCorrectionA2Full;