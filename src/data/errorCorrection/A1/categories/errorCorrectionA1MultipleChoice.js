// src/data/exercises/errorCorrection/A1/errorCorrectionA1MultipleChoice.js

const errorCorrectionA1MultipleChoice = [
  // === ARTICLES (1 exercice) ===
  {
    categoryId: 1,
    type: "multiple_choice",
    text: "She is ____ engineer.",
    choices: ["a", "an", "the", "no article"],
    correctChoiceIndex: 1,
    correctedText: "She is an engineer.",
    hint: "Use 'an' before words starting with a vowel sound",
    explanation: "'An' is used before words that start with a vowel sound (a, e, i, o, u)",
  },

  // === VERB TO BE (1 exercice) ===
  {
    categoryId: 2,
    type: "multiple_choice",
    text: "We ____ students at the university.",
    choices: ["am", "is", "are", "be"],
    correctChoiceIndex: 2,
    correctedText: "We are students at the university.",
    hint: "Which form of 'to be' goes with 'we'?",
    explanation: "Use 'are' with plural subjects like 'we'",
  },

  // === SIMPLE PRESENT (2 exercices) ===
  {
    categoryId: 3,
    type: "multiple_choice",
    text: "They ____ to the park every Sunday.",
    choices: ["go", "goes", "going", "gone"],
    correctChoiceIndex: 0,
    correctedText: "They go to the park every Sunday.",
    hint: "Use the base form of the verb with 'they'",
    explanation: "'They' requires the base form of the verb in simple present",
  },
  {
    categoryId: 3,
    type: "multiple_choice",
    text: "Maria ____ English every day.",
    choices: ["study", "studies", "studying", "studied"],
    correctChoiceIndex: 1,
    correctedText: "Maria studies English every day.",
    hint: "What happens to verbs with third-person singular subjects?",
    explanation: "Add 's' or 'es' to verbs when the subject is third-person singular",
  },

  // === PRONOUNS (1 exercice) ===
  {
    categoryId: 4,
    type: "multiple_choice",
    text: "____ am a doctor.",
    choices: ["Me", "I", "My", "Mine"],
    correctChoiceIndex: 1,
    correctedText: "I am a doctor.",
    hint: "Which pronoun is used as a subject?",
    explanation: "'I' is the subject pronoun, while 'me' is the object pronoun",
  },

  // === SENTENCE STRUCTURE (2 exercices) ===
  {
    categoryId: 5,
    type: "multiple_choice",
    text: "____ book is on the table.",
    choices: ["A", "An", "The", "Some"],
    correctChoiceIndex: 2,
    correctedText: "The book is on the table.",
    hint: "Think about specific vs. general reference",
    explanation: "Use 'the' when referring to a specific, known item",
  },
  {
    categoryId: 5,
    type: "multiple_choice",
    text: "Choose the correct sentence:",
    choices: [
      "Plays he football?",
      "He plays football?", 
      "Does he play football?",
      "He does play football?"
    ],
    correctChoiceIndex: 2,
    correctedText: "Does he play football?",
    hint: "How do you form questions in English?",
    explanation: "Use 'do/does' + subject + base verb to form questions in simple present",
  }
];

export default errorCorrectionA1MultipleChoice;