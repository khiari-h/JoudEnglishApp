// src/data/exercises/errorCorrection/B2/categories/errorCorrectionB2Identify.js

const errorCorrectionB2Identify = [
  // === ADVANCED CONDITIONALS (3 exercices) ===
  {
    categoryId: 1,
    type: "identify",
    text: "If she would have left earlier, she wouldn't have missed the train.",
    correctedText: "If she had left earlier, she wouldn't have missed the train.",
    errorPositions: [2, 3],
    hint: "Find the incorrect conditional form in the if-clause",
    explanation: "Use 'had left' (past perfect) in third conditional if-clauses, not 'would have left'.",
  },
  {
    categoryId: 1,
    type: "identify",
    text: "Unless you won't finish the report, you can't attend the meeting.",
    correctedText: "Unless you finish the report, you can't attend the meeting.",
    errorPositions: [2],
    hint: "Check the verb form after 'unless'",
    explanation: "'Unless' takes present simple, not negative forms with 'won't'.",
  },
  {
    categoryId: 1,
    type: "identify",
    text: "Suppose you will win the lottery, what would you do with the money?",
    correctedText: "Suppose you won the lottery, what would you do with the money?",
    errorPositions: [2],
    hint: "Find the incorrect tense in the hypothetical situation",
    explanation: "Use past simple 'won' for hypothetical situations after 'suppose', not 'will win'.",
  },

  // === SUBJUNCTIVE & FORMAL GRAMMAR (3 exercices) ===
  {
    categoryId: 2,
    type: "identify",
    text: "The judge demanded that the witness tells the truth.",
    correctedText: "The judge demanded that the witness tell the truth.",
    errorPositions: [6],
    hint: "Find the incorrect verb form after expressions of demand",
    explanation: "Use subjunctive base form 'tell' after 'demanded that', not 'tells'.",
  },
  {
    categoryId: 2,
    type: "identify",
    text: "It is crucial that every employee is following the safety procedures.",
    correctedText: "It is crucial that every employee follow the safety procedures.",
    errorPositions: [6, 7],
    hint: "Check the verb form after expressions of importance",
    explanation: "Use subjunctive base form 'follow' after 'it is crucial that', not 'is following'.",
  },
  {
    categoryId: 2,
    type: "identify",
    text: "Were I you, I would have accepted the job offer immediately.",
    correctedText: "Were I you, I would accept the job offer immediately.",
    errorPositions: [6, 7],
    hint: "Check the tense consistency in the hypothetical situation",
    explanation: "With 'were I you' (present hypothetical), use 'would accept', not 'would have accepted'.",
  },

  // === ADVANCED PASSIVE & CAUSATIVE (4 exercices) ===
  {
    categoryId: 3,
    type: "identify",
    text: "I need to have my computer to be fixed before the presentation.",
    correctedText: "I need to have my computer fixed before the presentation.",
    errorPositions: [6, 7],
    hint: "Find the unnecessary words in the causative construction",
    explanation: "Causative 'have' uses: have + object + past participle, not 'to be + past participle'.",
  },
  {
    categoryId: 3,
    type: "identify",
    text: "The building is said to be built in the 18th century.",
    correctedText: "The building is said to have been built in the 18th century.",
    errorPositions: [4, 5],
    hint: "Check the infinitive form for past actions",
    explanation: "Use perfect infinitive 'to have been built' for past actions in passive reporting.",
  },
  {
    categoryId: 3,
    type: "identify",
    text: "She made her assistant to prepare the documents urgently.",
    correctedText: "She made her assistant prepare the documents urgently.",
    errorPositions: [4],
    hint: "Find the unnecessary word after 'made'",
    explanation: "'Make' is followed by bare infinitive (without 'to'): 'made her prepare'.",
  },
  {
    categoryId: 3,
    type: "identify",
    text: "The contract needs to be signed by both parties immediately.",
    correctedText: "The contract needs to be signed by both parties immediately.",
    errorPositions: [],
    hint: "This sentence is actually correct!",
    explanation: "This passive construction is correct: 'needs to be signed by both parties'.",
  },

  // === DISCOURSE & COHESION (4 exercices) ===
  {
    categoryId: 4,
    type: "identify",
    text: "The results were disappointing. However, we continued the research. But, the funding was limited.",
    correctedText: "The results were disappointing. However, we continued the research. Nevertheless, the funding was limited.",
    errorPositions: [12],
    hint: "Find the inappropriate discourse marker",
    explanation: "Don't start sentences with 'But' in formal writing. Use 'Nevertheless' or 'However'.",
  },
  {
    categoryId: 4,
    type: "identify",
    text: "On the one hand, technology improves efficiency. On the other hand, technology can be expensive. In conclusion, we must balance both aspects.",
    correctedText: "On the one hand, technology improves efficiency. On the other hand, it can be expensive. In conclusion, we must balance both aspects.",
    errorPositions: [14],
    hint: "Find unnecessary repetition that affects cohesion",
    explanation: "Use 'it' to avoid repetition of 'technology' for better cohesion.",
  },
  {
    categoryId: 4,
    type: "identify",
    text: "Firstly, let's examine the data. Secondly, let's analyze the trends. Thirdly, let's draw conclusions.",
    correctedText: "First, let's examine the data. Second, let's analyze the trends. Finally, let's draw conclusions.",
    errorPositions: [0, 8, 16],
    hint: "Find the overly formal sequencing words",
    explanation: "Use 'First, Second, Finally' rather than 'Firstly, Secondly, Thirdly' in modern English.",
  },
  {
    categoryId: 4,
    type: "identify",
    text: "Due to the fact that the weather was bad, the event was cancelled.",
    correctedText: "Because the weather was bad, the event was cancelled.",
    errorPositions: [0, 1, 2, 3, 4],
    hint: "Find the unnecessarily wordy phrase",
    explanation: "Use concise 'Because' instead of wordy 'Due to the fact that'.",
  },

  // === REGISTER & STYLE (3 exercices) ===
  {
    categoryId: 5,
    type: "identify",
    text: "The professor's lecture was really awesome and super interesting to listen to.",
    correctedText: "The professor's lecture was highly engaging and extremely informative.",
    errorPositions: [4, 6, 7],
    hint: "Find the informal language inappropriate for academic context",
    explanation: "Replace informal 'really awesome' and 'super' with formal 'highly engaging' and 'extremely'.",
  },
  {
    categoryId: 5,
    type: "identify",
    text: "We regret to inform you that we cannot proceed with your application due to budgetary constraints.",
    correctedText: "We regret to inform you that we cannot proceed with your application due to budgetary constraints.",
    errorPositions: [],
    hint: "This sentence is appropriately formal!",
    explanation: "This sentence uses appropriate formal register for official communication.",
  },
  {
    categoryId: 5,
    type: "identify",
    text: "The company's performance this quarter has been pretty good, though there's room for improvement.",
    correctedText: "The company's performance this quarter has been satisfactory, although there is room for improvement.",
    errorPositions: [7, 8, 11],
    hint: "Find informal elements in business writing",
    explanation: "Replace 'pretty good' with 'satisfactory' and 'though there's' with formal 'although there is'.",
  }
];

export default errorCorrectionB2Identify;