// src/data/exercises/errorCorrection/B2/categories/errorCorrectionB2MultipleChoice.js

const errorCorrectionB2MultipleChoice = [
  // === ADVANCED CONDITIONALS (2 exercices) ===
  {
    categoryId: 1,
    type: "multiple_choice",
    text: "If you ____ studied medicine, you would be working as a doctor now.",
    choices: ["would have", "had", "have", "would"],
    correctChoiceIndex: 1,
    correctedText: "If you had studied medicine, you would be working as a doctor now.",
    hint: "This is a mixed conditional - past action, present result",
    explanation: "Mixed conditionals use 'had + past participle' for past actions affecting present situations.",
  },
  {
    categoryId: 1,
    type: "multiple_choice",
    text: "____ that I know the truth, I can make a better decision.",
    choices: ["Now", "Given", "Since", "Because"],
    correctChoiceIndex: 1,
    correctedText: "Given that I know the truth, I can make a better decision.",
    hint: "Which formal conjunction introduces a conditional relationship?",
    explanation: "'Given that' is a formal way to introduce conditional or causal relationships.",
  },

  // === SUBJUNCTIVE & FORMAL GRAMMAR (2 exercices) ===
  {
    categoryId: 2,
    type: "multiple_choice",
    text: "The board of directors insisted that the CEO ____ his resignation.",
    choices: ["submits", "submit", "submitted", "to submit"],
    correctChoiceIndex: 1,
    correctedText: "The board of directors insisted that the CEO submit his resignation.",
    hint: "What form follows expressions of insistence?",
    explanation: "After 'insisted that', use the subjunctive base form 'submit'.",
  },
  {
    categoryId: 2,
    type: "multiple_choice",
    text: "It is imperative that every student ____ present during the examination.",
    choices: ["is", "be", "will be", "should be"],
    correctChoiceIndex: 1,
    correctedText: "It is imperative that every student be present during the examination.",
    hint: "Which form is used after expressions of necessity?",
    explanation: "After 'it is imperative that', use the subjunctive 'be'.",
  },

  // === ADVANCED PASSIVE & CAUSATIVE (2 exercices) ===
  {
    categoryId: 3,
    type: "multiple_choice",
    text: "I need to ____ my passport renewed before traveling.",
    choices: ["have", "get", "make", "let"],
    correctChoiceIndex: 0,
    correctedText: "I need to have my passport renewed before traveling.",
    hint: "Which verb is used for causative constructions with services?",
    explanation: "'Have' is typically used for services: 'have something done'.",
  },
  {
    categoryId: 3,
    type: "multiple_choice",
    text: "The witness is believed ____ the crime scene immediately after the incident.",
    choices: ["to leave", "to have left", "leaving", "left"],
    correctChoiceIndex: 1,
    correctedText: "The witness is believed to have left the crime scene immediately after the incident.",
    hint: "What infinitive form shows a past action in passive reporting?",
    explanation: "Use perfect infinitive 'to have left' for past actions in passive reporting verbs.",
  },

  // === DISCOURSE & COHESION (2 exercices) ===
  {
    categoryId: 4,
    type: "multiple_choice",
    text: "The study showed positive results. ____, further research is needed to confirm these findings.",
    choices: ["However", "Therefore", "Furthermore", "Consequently"],
    correctChoiceIndex: 0,
    correctedText: "The study showed positive results. However, further research is needed to confirm these findings.",
    hint: "Which connector shows contrast despite positive information?",
    explanation: "'However' introduces a contrasting idea despite the positive results.",
  },
  {
    categoryId: 4,
    type: "multiple_choice",
    text: "The company faced financial difficulties. ____, they managed to avoid bankruptcy.",
    choices: ["Therefore", "Nevertheless", "Consequently", "Furthermore"],
    correctChoiceIndex: 1,
    correctedText: "The company faced financial difficulties. Nevertheless, they managed to avoid bankruptcy.",
    hint: "Which connector shows an unexpected positive outcome?",
    explanation: "'Nevertheless' shows contrast - an unexpected positive result despite difficulties.",
  },

  // === REGISTER & STYLE (3 exercices) ===
  {
    categoryId: 5,
    type: "multiple_choice",
    text: "We would like to ____ our concerns about the proposed changes.",
    choices: ["talk about", "express", "say", "mention"],
    correctChoiceIndex: 1,
    correctedText: "We would like to express our concerns about the proposed changes.",
    hint: "Which is the most formal way to communicate concerns?",
    explanation: "'Express' is more formal than 'talk about', 'say', or 'mention' in business contexts.",
  },
  {
    categoryId: 5,
    type: "multiple_choice",
    text: "The research findings ____ that immediate action is required.",
    choices: ["show", "indicate", "say", "tell"],
    correctChoiceIndex: 1,
    correctedText: "The research findings indicate that immediate action is required.",
    hint: "Which verb is most appropriate in academic/formal writing?",
    explanation: "'Indicate' is more formal and precise than 'show' in academic contexts.",
  },
  {
    categoryId: 5,
    type: "multiple_choice",
    text: "Choose the most appropriate formal response: 'Thank you for your inquiry.'",
    choices: [
      "No problem, I'll get back to you.",
      "Sure thing, I'll check that out.",
      "I will investigate this matter and respond accordingly.",
      "OK, I'll look into it and let you know."
    ],
    correctChoiceIndex: 2,
    correctedText: "I will investigate this matter and respond accordingly.",
    hint: "Which response maintains formal professional register?",
    explanation: "Option 3 uses formal vocabulary: 'investigate', 'matter', 'respond accordingly'.",
  }
];

export default errorCorrectionB2MultipleChoice;
