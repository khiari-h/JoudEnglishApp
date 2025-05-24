// src/data/exercises/errorCorrection/A2/categories/errorCorrectionA2Identify.js

const errorCorrectionA2Identify = [
  // === PAST TENSE (3 exercices) ===
  {
    categoryId: 1,
    type: "identify",
    text: "Last week I see a good movie and eat pizza.",
    correctedText: "Last week I saw a good movie and ate pizza.",
    errorPositions: [3, 8],
    hint: "Find the verbs that should be in past tense",
    explanation: "Use 'saw' (past of see) and 'ate' (past of eat) for past actions.",
  },
  {
    categoryId: 1,
    type: "identify",
    text: "She don't come to the party yesterday.",
    correctedText: "She didn't come to the party yesterday.",
    errorPositions: [1],
    hint: "Look for incorrect past tense negative form",
    explanation: "Use 'didn't' (did not) for past tense negatives, not 'don't'.",
  },
  {
    categoryId: 1,
    type: "identify",
    text: "When we was children, we play in the park every day.",
    correctedText: "When we were children, we played in the park every day.",
    errorPositions: [2, 5],
    hint: "Check subject-verb agreement and verb tenses",
    explanation: "Use 'were' with 'we' and 'played' for past habitual actions.",
  },

  // === FUTURE FORMS (2 exercices) ===
  {
    categoryId: 2,
    type: "identify",
    text: "I will to call you tomorrow morning.",
    correctedText: "I will call you tomorrow morning.",
    errorPositions: [2],
    hint: "Find the unnecessary word with 'will'",
    explanation: "'Will' is followed directly by the base verb, no 'to' needed.",
  },
  {
    categoryId: 2,
    type: "identify",
    text: "They going to travel to Spain next month.",
    correctedText: "They are going to travel to Spain next month.",
    errorPositions: [1],
    hint: "What's missing in the 'going to' construction?",
    explanation: "Use 'are going to' - the auxiliary verb 'are' is required.",
  },

  // === COMPARATIVE & SUPERLATIVE (2 exercices) ===
  {
    categoryId: 3,
    type: "identify",
    text: "My car is more fast than yours.",
    correctedText: "My car is faster than yours.",
    errorPositions: [3, 4],
    hint: "Find the incorrect comparative form",
    explanation: "Use 'faster' for one-syllable adjectives, not 'more fast'.",
  },
  {
    categoryId: 3,
    type: "identify",
    text: "This is the most difficult exam of all.",
    correctedText: "This is the most difficult exam of all.",
    errorPositions: [],
    hint: "This sentence is actually correct!",
    explanation: "This sentence is correct - 'most difficult' is the proper superlative for multi-syllable adjectives.",
  },

  // === PREPOSITIONS (3 exercices) ===
  {
    categoryId: 4,
    type: "identify",
    text: "I arrive to London on 3 PM yesterday.",
    correctedText: "I arrived in London at 3 PM yesterday.",
    errorPositions: [1, 2, 4, 5],
    hint: "Check the verb tense and prepositions for place and time",
    explanation: "Use 'arrived' (past), 'in' (cities), and 'at' (specific times).",
  },
  {
    categoryId: 4,
    type: "identify", 
    text: "She is good in mathematics and bad in sports.",
    correctedText: "She is good at mathematics and bad at sports.",
    errorPositions: [3, 7],
    hint: "Find the incorrect prepositions with 'good' and 'bad'",
    explanation: "Use 'good at' and 'bad at' for skills and subjects.",
  },
  {
    categoryId: 4,
    type: "identify",
    text: "We live in Paris since 2010.",
    correctedText: "We have lived in Paris since 2010.",
    errorPositions: [1],
    hint: "What tense should be used with 'since'?",
    explanation: "Use present perfect 'have lived' with 'since' for ongoing situations.",
  },

  // === MODAL VERBS (2 exercices) ===
  {
    categoryId: 5,
    type: "identify",
    text: "You can to drive but you shouldn't to speed.",
    correctedText: "You can drive but you shouldn't speed.",
    errorPositions: [2, 6],
    hint: "Find the unnecessary words after modal verbs",
    explanation: "Modal verbs 'can' and 'shouldn't' don't use 'to' before the main verb.",
  },
  {
    categoryId: 5,
    type: "identify",
    text: "Students must studies hard to pass the exam.",
    correctedText: "Students must study hard to pass the exam.",
    errorPositions: [2],
    hint: "Check the verb form after 'must'",
    explanation: "Use the base form 'study' after modal verbs, not the third person 's' form.",
  }
];

export default errorCorrectionA2Identify;