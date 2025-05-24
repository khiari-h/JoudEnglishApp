// src/data/exercises/errorCorrection/A2/categories/errorCorrectionA2MultipleChoice.js

const errorCorrectionA2MultipleChoice = [
  // === PAST TENSE (2 exercices) ===
  {
    categoryId: 1,
    type: "multiple_choice",
    text: "I ____ to the cinema last night.",
    choices: ["go", "went", "gone", "going"],
    correctChoiceIndex: 1,
    correctedText: "I went to the cinema last night.",
    hint: "Choose the correct past tense form",
    explanation: "'Went' is the past tense of 'go' for completed past actions.",
  },
  {
    categoryId: 1,
    type: "multiple_choice", 
    text: "They ____ football when it started to rain.",
    choices: ["played", "were playing", "play", "are playing"],
    correctChoiceIndex: 1,
    correctedText: "They were playing football when it started to rain.",
    hint: "What tense shows an ongoing past action interrupted by another?",
    explanation: "Use past continuous 'were playing' for ongoing past actions interrupted by other events.",
  },

  // === FUTURE FORMS (2 exercices) ===
  {
    categoryId: 2,
    type: "multiple_choice",
    text: "I think it ____ rain tomorrow.",
    choices: ["will", "is going to", "going", "will to"],
    correctChoiceIndex: 0,
    correctedText: "I think it will rain tomorrow.",
    hint: "Which future form is used for predictions?",
    explanation: "Use 'will' for predictions and opinions about the future.",
  },
  {
    categoryId: 2,
    type: "multiple_choice",
    text: "We ____ move to a new house next month. We already bought it.",
    choices: ["will", "are going to", "going", "will be"],
    correctChoiceIndex: 1,
    correctedText: "We are going to move to a new house next month.",
    hint: "Which form shows a planned decision already made?",
    explanation: "Use 'going to' for plans and decisions already made.",
  },

  // === COMPARATIVE & SUPERLATIVE (1 exercice) ===
  {
    categoryId: 3,
    type: "multiple_choice",
    text: "This exercise is ____ than the previous one.",
    choices: ["more easy", "easier", "most easy", "easiest"],
    correctChoiceIndex: 1,
    correctedText: "This exercise is easier than the previous one.",
    hint: "How do you form the comparative of 'easy'?",
    explanation: "For adjectives ending in 'y', change 'y' to 'i' and add '-er': easier.",
  },

  // === PREPOSITIONS (2 exercices) ===
  {
    categoryId: 4,
    type: "multiple_choice",
    text: "The meeting is ____ Tuesday ____ 3 PM.",
    choices: ["in / at", "on / at", "at / in", "on / in"],
    correctChoiceIndex: 1,
    correctedText: "The meeting is on Tuesday at 3 PM.",
    hint: "Which prepositions go with days and specific times?",
    explanation: "Use 'on' for days of the week and 'at' for specific times.",
  },
  {
    categoryId: 4,
    type: "multiple_choice",
    text: "She is very good ____ playing the piano.",
    choices: ["in", "at", "on", "for"],
    correctChoiceIndex: 1,
    correctedText: "She is very good at playing the piano.",
    hint: "Which preposition follows 'good' for abilities?",
    explanation: "Use 'good at' for skills and abilities.",
  },

  // === MODAL VERBS (1 exercice) ===
  {
    categoryId: 5,
    type: "multiple_choice",
    text: "You ____ wear a seatbelt when driving. It's the law.",
    choices: ["should", "could", "must", "might"],
    correctChoiceIndex: 2,
    correctedText: "You must wear a seatbelt when driving. It's the law.",
    hint: "Which modal expresses strong obligation or legal requirement?",
    explanation: "'Must' expresses strong obligation, especially legal requirements.",
  }
];

export default errorCorrectionA2MultipleChoice;