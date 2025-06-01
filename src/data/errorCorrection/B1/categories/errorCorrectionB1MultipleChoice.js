// src/data/exercises/errorCorrection/B1/categories/errorCorrectionB1MultipleChoice.js

const errorCorrectionB1MultipleChoice = [
  // === PRESENT PERFECT (2 exercices) ===
  {
    categoryId: 1,
    type: "multiple_choice",
    text: "I ____ in this company for five years.",
    choices: ["work", "am working", "have worked", "worked"],
    correctChoiceIndex: 2,
    correctedText: "I have worked in this company for five years.",
    hint: "Which tense shows duration from past to present?",
    explanation: "Use present perfect with 'for' to show duration from past to present.",
  },
  {
    categoryId: 1,
    type: "multiple_choice",
    text: "She has ____ finished her degree.",
    choices: ["yet", "already", "since", "for"],
    correctChoiceIndex: 1,
    correctedText: "She has already finished her degree.",
    hint: "Which word means 'before now' in positive sentences?",
    explanation: "'Already' is used in positive sentences to mean 'before now or sooner than expected'.",
  },

  // === CONDITIONALS (1 exercice) ===
  {
    categoryId: 2,
    type: "multiple_choice",
    text: "If I ____ you, I would apologize immediately.",
    choices: ["am", "was", "were", "will be"],
    correctChoiceIndex: 2,
    correctedText: "If I were you, I would apologize immediately.",
    hint: "What form is used in hypothetical conditionals with 'I'?",
    explanation: "Use 'were' (not 'was') with all persons in second conditional hypothetical situations.",
  },

  // === PASSIVE VOICE (2 exercices) ===
  {
    categoryId: 3,
    type: "multiple_choice",
    text: "The new shopping center ____ next year.",
    choices: ["will build", "will be built", "will be building", "will have built"],
    correctChoiceIndex: 1,
    correctedText: "The new shopping center will be built next year.",
    hint: "The shopping center receives the action - use passive voice",
    explanation: "Use passive voice 'will be built' when the subject receives the action.",
  },
  {
    categoryId: 3,
    type: "multiple_choice",
    text: "This song ____ by millions of people around the world.",
    choices: ["loves", "is loved", "is loving", "has loved"],
    correctChoiceIndex: 1,
    correctedText: "This song is loved by millions of people around the world.",
    hint: "The song receives the action of loving",
    explanation: "Use passive 'is loved' when the subject receives the action of the verb.",
  },

  // === REPORTED SPEECH (2 exercices) ===
  {
    categoryId: 4,
    type: "multiple_choice",
    text: "She said, 'I am tired.' → She said that she ____ tired.",
    choices: ["is", "was", "has been", "will be"],
    correctChoiceIndex: 1,
    correctedText: "She said that she was tired.",
    hint: "How does present tense change in reported speech?",
    explanation: "Present tense 'am' changes to past tense 'was' in reported speech.",
  },
  {
    categoryId: 4,
    type: "multiple_choice",
    text: "'Where do you live?' → He asked me where ____.",
    choices: ["do I live", "did I live", "I lived", "I live"],
    correctChoiceIndex: 2,
    correctedText: "He asked me where I lived.",
    hint: "What word order is used in reported questions?",
    explanation: "Use statement word order and change tense: 'where I lived'.",
  },

  // === RELATIVE CLAUSES (2 exercices) ===
  {
    categoryId: 5,
    type: "multiple_choice",
    text: "The woman ____ car was stolen called the police.",
    choices: ["who", "whose", "which", "that"],
    correctChoiceIndex: 1,
    correctedText: "The woman whose car was stolen called the police.",
    hint: "Which relative pronoun shows possession?",
    explanation: "'Whose' is the possessive relative pronoun (= her car).",
  },
  {
    categoryId: 5,
    type: "multiple_choice",
    text: "My brother, ____ is a doctor, lives in London.",
    choices: ["that", "who", "which", "whose"],
    correctChoiceIndex: 1,
    correctedText: "My brother, who is a doctor, lives in London.",
    hint: "Which relative pronoun is used for people in non-defining clauses?",
    explanation: "Use 'who' for people in non-defining relative clauses (with commas).",
  }
];

export default errorCorrectionB1MultipleChoice;
