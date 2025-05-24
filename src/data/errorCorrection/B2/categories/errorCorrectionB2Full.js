// src/data/exercises/errorCorrection/B2/categories/errorCorrectionB2Full.js

const errorCorrectionB2Full = [
  // === ADVANCED CONDITIONALS (3 exercices) ===
  {
    categoryId: 1,
    type: "full",
    text: "If I would have studied harder, I would be working in a better company now.",
    correctedText: "If I had studied harder, I would be working in a better company now.",
    hint: "Check the verb form in the if-clause of mixed conditionals",
    explanation: "In mixed conditionals, use 'had + past participle' in the if-clause, not 'would have'.",
    errorPositions: [2, 3],
  },
  {
    categoryId: 1,
    type: "full",
    text: "Providing that you will finish the project on time, you will get the bonus.",
    correctedText: "Providing that you finish the project on time, you will get the bonus.",
    hint: "Don't use 'will' after conditional conjunctions",
    explanation: "After 'providing that', 'unless', 'as long as', use present simple, not 'will'.",
    errorPositions: [3],
  },
  {
    categoryId: 1,
    type: "full",
    text: "I wish I would have more time to spend with my family.",
    correctedText: "I wish I had more time to spend with my family.",
    hint: "Check the correct verb form after 'wish' for present situations",
    explanation: "Use past simple after 'wish' for present unreal situations, not 'would have'.",
    errorPositions: [2, 3],
  },

  // === SUBJUNCTIVE & FORMAL GRAMMAR (3 exercices) ===
  {
    categoryId: 2,
    type: "full",
    text: "It is essential that every student hands in their assignment on time.",
    correctedText: "It is essential that every student hand in their assignment on time.",
    hint: "Use the subjunctive mood after expressions of necessity",
    explanation: "After 'it is essential that', use the subjunctive (base form): 'hand', not 'hands'.",
    errorPositions: [6],
  },
  {
    categoryId: 2,
    type: "full",
    text: "The committee suggested that the proposal should be reviewed more carefully.",
    correctedText: "The committee suggested that the proposal be reviewed more carefully.",
    hint: "Avoid 'should' in formal subjunctive constructions",
    explanation: "In formal English, use the subjunctive 'be reviewed' rather than 'should be reviewed'.",
    errorPositions: [6],
  },
  {
    categoryId: 2,
    type: "full",
    text: "Had I known about the meeting, I would have attended it.",
    correctedText: "Had I known about the meeting, I would have attended it.",
    hint: "This sentence is actually correct - it uses inversion",
    explanation: "This is correct formal inversion: 'Had I known' = 'If I had known'.",
    errorPositions: [],
  },

  // === ADVANCED PASSIVE & CAUSATIVE (3 exercices) ===
  {
    categoryId: 3,
    type: "full",
    text: "I had my car to be repaired by the mechanic yesterday.",
    correctedText: "I had my car repaired by the mechanic yesterday.",
    hint: "Check the structure of the causative 'have'",
    explanation: "Causative 'have' uses: have + object + past participle, not 'to be + past participle'.",
    errorPositions: [4, 5],
  },
  {
    categoryId: 3,
    type: "full",
    text: "The decision is being taken by the board of directors next week.",
    correctedText: "The decision will be taken by the board of directors next week.",
    hint: "Check the tense for future scheduled actions",
    explanation: "Use future passive 'will be taken' for future actions, not present continuous passive.",
    errorPositions: [2, 3],
  },
  {
    categoryId: 3,
    type: "full",
    text: "She got her hair to cut at the new salon downtown.",
    correctedText: "She got her hair cut at the new salon downtown.",
    hint: "Check the structure after 'get' in causative constructions",
    explanation: "Causative 'get' uses: get + object + past participle, not 'to + infinitive'.",
    errorPositions: [4, 5],
  },

  // === DISCOURSE & COHESION (3 exercices) ===
  {
    categoryId: 4,
    type: "full",
    text: "The research shows promising results. However, more studies are needed. Despite, the initial findings are encouraging.",
    correctedText: "The research shows promising results. However, more studies are needed. Nevertheless, the initial findings are encouraging.",
    hint: "Use appropriate discourse markers for contrast",
    explanation: "'Despite' needs a noun/gerund. Use 'Nevertheless' or 'Nonetheless' as discourse markers.",
    errorPositions: [12],
  },
  {
    categoryId: 4,
    type: "full",
    text: "Firstly, we need to analyze the data. Secondly, we should draw conclusions. Finally, we must present the findings.",
    correctedText: "First, we need to analyze the data. Second, we should draw conclusions. Finally, we must present the findings.",
    hint: "Use appropriate sequencing adverbs",
    explanation: "In formal writing, prefer 'First' and 'Second' over 'Firstly' and 'Secondly'.",
    errorPositions: [0, 11],
  },
  {
    categoryId: 4,
    type: "full",
    text: "The company faced financial difficulties. As a result of this, they had to lay off workers.",
    correctedText: "The company faced financial difficulties. Consequently, they had to lay off workers.",
    hint: "Use more concise discourse markers",
    explanation: "Use 'Consequently' or 'Therefore' instead of the wordy 'As a result of this'.",
    errorPositions: [7, 8, 9, 10],
  },

  // === REGISTER & STYLE (2 exercices) ===
  {
    categoryId: 5,
    type: "full",
    text: "The professor told us to hand in our essays and he said we shouldn't be late.",
    correctedText: "The professor instructed us to submit our essays and emphasized that punctuality was essential.",
    hint: "Elevate the register for academic contexts",
    explanation: "Use formal vocabulary: 'instructed' vs 'told', 'submit' vs 'hand in', 'punctuality was essential' vs 'shouldn't be late'.",
    errorPositions: [2, 6, 9, 11, 12, 13, 14],
  },
  {
    categoryId: 5,
    type: "full",
    text: "Hey John, I gotta tell you that your presentation was awesome and really cool stuff.",
    correctedText: "Dear John, I wanted to inform you that your presentation was excellent and very impressive.",
    hint: "Use appropriate formal register for professional communication",
    explanation: "Replace informal elements: 'Hey' → 'Dear', 'gotta' → 'wanted to', 'awesome/cool stuff' → 'excellent/impressive'.",
    errorPositions: [0, 3, 4, 12, 14, 15, 16, 17],
  }
];

export default errorCorrectionB2Full;