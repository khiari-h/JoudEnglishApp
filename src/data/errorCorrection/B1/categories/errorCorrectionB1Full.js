// src/data/exercises/errorCorrection/B1/categories/errorCorrectionB1Full.js

const errorCorrectionB1Full = [
  // === PRESENT PERFECT (2 exercices) ===
  {
    categoryId: 1,
    type: "full",
    text: "I have seen this movie yesterday and it was fantastic.",
    correctedText: "I saw this movie yesterday and it was fantastic.",
    hint: "Use past simple for specific past times, not present perfect",
    explanation: "Use past simple with specific time expressions like 'yesterday'. Present perfect is for indefinite past times.",
    errorPositions: [1, 2],
  },
  {
    categoryId: 1,
    type: "full",
    text: "She lives in London since 2018 and she loves it.",
    correctedText: "She has lived in London since 2018 and she loves it.",
    hint: "Use present perfect with 'since' for actions continuing to the present",
    explanation: "Use present perfect 'has lived' with 'since' to show an action that started in the past and continues now.",
    errorPositions: [1],
  },

  // === CONDITIONALS (3 exercices) ===
  {
    categoryId: 2,
    type: "full",
    text: "If I will have time tomorrow, I will call you.",
    correctedText: "If I have time tomorrow, I will call you.",
    hint: "Don't use 'will' in the if-clause of first conditionals",
    explanation: "In first conditionals, use present simple in the if-clause, not 'will'.",
    errorPositions: [2],
  },
  {
    categoryId: 2,
    type: "full",
    text: "If I was rich, I will buy a big house.",
    correctedText: "If I were rich, I would buy a big house.",
    hint: "Check the verb forms in second conditionals",
    explanation: "Second conditionals use 'were' (not 'was') and 'would' (not 'will').",
    errorPositions: [2, 5],
  },
  {
    categoryId: 2,
    type: "full",
    text: "I would have come to the party if you would have invited me.",
    correctedText: "I would have come to the party if you had invited me.",
    hint: "Don't use 'would have' in both clauses of third conditionals",
    explanation: "In third conditionals, use 'had + past participle' in the if-clause, not 'would have'.",
    errorPositions: [9, 10],
  },

  // === PASSIVE VOICE (2 exercices) ===
  {
    categoryId: 3,
    type: "full",
    text: "The house built in 1995 by my grandfather.",
    correctedText: "The house was built in 1995 by my grandfather.",
    hint: "Don't forget the auxiliary verb in passive constructions",
    explanation: "Passive voice needs 'be' verb + past participle: 'was built'.",
    errorPositions: [2],
  },
  {
    categoryId: 3,
    type: "full",
    text: "Many people have been affected from the new policy.",
    correctedText: "Many people have been affected by the new policy.",
    hint: "Use the correct preposition with passive voice",
    explanation: "Use 'by' to show the agent in passive voice, not 'from'.",
    errorPositions: [5],
  },

  // === REPORTED SPEECH (3 exercices) ===
  {
    categoryId: 4,
    type: "full",
    text: "He said that he will come tomorrow.",
    correctedText: "He said that he would come the next day.",
    hint: "Change tenses and time expressions in reported speech",
    explanation: "Change 'will' to 'would' and 'tomorrow' to 'the next day' in reported speech.",
    errorPositions: [4, 6],
  },
  {
    categoryId: 4,
    type: "full",
    text: "She asked me where do I live.",
    correctedText: "She asked me where I lived.",
    hint: "Use statement word order in reported questions",
    explanation: "In reported questions, use statement word order (where I lived), not question order.",
    errorPositions: [4, 5],
  },
  {
    categoryId: 4,
    type: "full",
    text: "They told that they have finished the project.",
    correctedText: "They said that they had finished the project.",
    hint: "Use correct reporting verb and change present perfect to past perfect",
    explanation: "Use 'said' for statements (not 'told' without object) and change 'have finished' to 'had finished'.",
    errorPositions: [1, 4, 5],
  },

  // === RELATIVE CLAUSES (2 exercices) ===
  {
    categoryId: 5,
    type: "full",
    text: "The woman which lives next door is a doctor.",
    correctedText: "The woman who lives next door is a doctor.",
    hint: "Use the correct relative pronoun for people",
    explanation: "Use 'who' for people, not 'which'. 'Which' is for things.",
    errorPositions: [2],
  },
  {
    categoryId: 5,
    type: "full",
    text: "This is the book, that I told you about.",
    correctedText: "This is the book that I told you about.",
    hint: "Don't use commas with defining relative clauses",
    explanation: "Defining relative clauses don't use commas. The information is essential to identify the noun.",
    errorPositions: [4],
  }
];

export default errorCorrectionB1Full;
