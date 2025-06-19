// src/data/exercises/errorCorrection/C1/categories/errorCorrectionC1Full.js

const errorCorrectionC1Full = [
  // === NUANCED GRAMMAR & STYLE (3 exercices) ===
  {
    categoryId: 1,
    type: "full",
    text: "Not only did the research reveal significant findings, but it also has provided insights that were previously unthinkable.",
    correctedText: "Not only did the research reveal significant findings, but it also provided insights that were previously unthinkable.",
    hint: "Check tense consistency in parallel structures",
    explanation: "In parallel structures with 'not only...but also', maintain tense consistency: both clauses should use past simple.",
    errorPositions: [14, 15],
  },
  {
    categoryId: 1,
    type: "full",
    text: "Scarcely had he arrived when the complications begun to manifest themselves with alarming rapidity.",
    correctedText: "Scarcely had he arrived when the complications began to manifest themselves with alarming rapidity.",
    hint: "Check the past tense form of irregular verbs",
    explanation: "The past tense of 'begin' is 'began', not 'begun' (which is the past participle).",
    errorPositions: [7],
  },
  {
    categoryId: 1,
    type: "full",
    text: "The implications of this discovery are far more profound than what was initially anticipated by the research team.",
    correctedText: "The implications of this discovery are far more profound than initially anticipated by the research team.",
    hint: "Avoid unnecessary words in comparative constructions",
    explanation: "Remove 'what was' for more elegant expression: 'than initially anticipated' is more concise and sophisticated.",
    errorPositions: [10, 11],
  },

  // === ADVANCED DISCOURSE & RHETORIC (3 exercices) ===
  {
    categoryId: 2,
    type: "full",
    text: "Notwithstanding the considerable challenges, the team managed to complete the project; albeit with some compromises being made.",
    correctedText: "Notwithstanding the considerable challenges, the team managed to complete the project, albeit with some compromises.",
    hint: "Check punctuation and conciseness with transitional phrases",
    explanation: "Use comma before 'albeit', not semicolon, and remove redundant 'being made' for elegant conciseness.",
    errorPositions: [13, 16, 17],
  },
  {
    categoryId: 2,
    type: "full",
    text: "The hypothesis, while intriguing in its simplicity, proves to be woefully inadequate when one subjects it to rigorous empirical scrutiny.",
    correctedText: "The hypothesis, while intriguing in its simplicity, proves to be woefully inadequate when subjected to rigorous empirical scrutiny.",
    hint: "Use passive voice for more formal academic tone",
    explanation: "Academic writing often prefers passive constructions: 'when subjected to' rather than 'when one subjects it to'.",
    errorPositions: [16, 17, 18, 19],
  },
  {
    categoryId: 2,
    type: "full",
    text: "Furthermore, the evidence suggests that the correlation is not merely coincidental, but rather it indicates a causal relationship.",
    correctedText: "Furthermore, the evidence suggests that the correlation is not merely coincidental but rather indicates a causal relationship.",
    hint: "Avoid redundant pronouns in parallel structures",
    explanation: "Remove redundant 'it' in parallel structure for more elegant flow: 'but rather indicates'.",
    errorPositions: [15, 16],
  },

  // === CULTURAL & CONTEXTUAL LANGUAGE (3 exercices) ===
  {
    categoryId: 3,
    type: "full",
    text: "The author's allusion to Sisyphean task suggests that he views the endeavor as ultimately futile and doomed to failure.",
    correctedText: "The author's allusion to a Sisyphean task suggests that he views the endeavor as ultimately futile.",
    hint: "Add appropriate article and avoid redundancy",
    explanation: "Use 'a Sisyphean task' with article, and remove 'doomed to failure' as it's redundant with 'futile'.",
    errorPositions: [4, 17, 18, 19],
  },
  {
    categoryId: 3,
    type: "full",
    text: "His Machiavellian approach to politics would make even the most cynical observer to recoil in disgust at such machinations.",
    correctedText: "His Machiavellian approach to politics would make even the most cynical observer recoil in disgust at such machinations.",
    hint: "Remove unnecessary preposition in causative construction",
    explanation: "'Make' is followed by bare infinitive: 'make someone recoil', not 'make someone to recoil'.",
    errorPositions: [14],
  },
  {
    categoryId: 3,
    type: "full",
    text: "The novel's Kafkaesque atmosphere creates a sense of unease that permeates every aspect of the protagonist's existence.",
    correctedText: "The novel's Kafkaesque atmosphere creates a sense of unease that permeates every aspect of the protagonist's existence.",
    hint: "This sentence is actually correct",
    explanation: "Perfect use of cultural reference 'Kafkaesque' with sophisticated vocabulary and structure.",
    errorPositions: [],
  },

  // === COMPLEX ARGUMENTATION (4 exercices) ===
  {
    categoryId: 4,
    type: "full",
    text: "While the data ostensibly supports the hypothesis, a closer examination reveals that the correlation might be spurious rather than causal in nature.",
    correctedText: "While the data ostensibly support the hypothesis, a closer examination reveals that the correlation might be spurious rather than causal.",
    hint: "Check subject-verb agreement and remove redundancy",
    explanation: "'Data' is plural (takes 'support'), and remove redundant 'in nature' after 'causal'.",
    errorPositions: [4, 21, 22],
  },
  {
    categoryId: 4,
    type: "full",
    text: "The phenomenon begs the question: are we witnessing a paradigm shift or merely a temporary anomaly that will resolve itself?",
    correctedText: "The phenomenon raises the question: are we witnessing a paradigm shift or merely a temporary anomaly?",
    hint: "Correct the misused idiom and remove redundancy",
    explanation: "'Begs the question' means circular reasoning. Use 'raises the question'. Remove redundant 'that will resolve itself'.",
    errorPositions: [2, 3, 4, 17, 18, 19, 20],
  },
  {
    categoryId: 4,
    type: "full",
    text: "Granted that the methodology was sound, the conclusions drawn from the study remain highly contentious among experts in the field.",
    correctedText: "Granted that the methodology was sound, the conclusions drawn from the study remain highly contentious among experts.",
    hint: "Remove unnecessary qualification",
    explanation: "Remove redundant 'in the field' - it's implied that experts are in the relevant field.",
    errorPositions: [17, 18, 19],
  },
  {
    categoryId: 4,
    type: "full",
    text: "The researcher's claim that the results are definitive is somewhat premature, given the limited scope of the investigation that was conducted.",
    correctedText: "The researcher's claim that the results are definitive is premature, given the limited scope of the investigation.",
    hint: "Remove hedge word and redundant clause",
    explanation: "Remove weakening 'somewhat' for stronger academic tone, and remove redundant 'that was conducted'.",
    errorPositions: [12, 21, 22, 23],
  },

  // === LINGUISTIC PRECISION (3 exercices) ===
  {
    categoryId: 5,
    type: "full",
    text: "The committee's decision to postpone the vote was prudent, given the contentious nature of the proposal and the need for further deliberation among members.",
    correctedText: "The committee's decision to postpone the vote was prudent, given the contentious nature of the proposal and the need for further deliberation.",
    hint: "Remove redundant specification",
    explanation: "Remove 'among members' as it's redundant - committee deliberation obviously involves members.",
    errorPositions: [21, 22],
  },
  {
    categoryId: 5,
    type: "full",
    text: "The author's propensity for verbose language occasionally obfuscates rather than clarifies the central argument she is attempting to make.",
    correctedText: "The author's propensity for verbose language occasionally obfuscates rather than clarifies her central argument.",
    hint: "Use more concise and elegant expression",
    explanation: "Replace wordy 'the central argument she is attempting to make' with concise 'her central argument'.",
    errorPositions: [12, 13, 14, 15, 16, 17, 18],
  },
  {
    categoryId: 5,
    type: "full",
    text: "The findings of this research study contribute significantly to our understanding of the phenomena that have been observed in recent years.",
    correctedText: "This research contributes significantly to our understanding of recently observed phenomena.",
    hint: "Eliminate redundant words for more sophisticated expression",
    explanation: "Remove redundancies: 'findings of...study', 'that have been observed in recent years' becomes 'recently observed'.",
    errorPositions: [0, 1, 2, 3, 4, 13, 14, 15, 16, 17, 18, 19],
  }
];

export default errorCorrectionC1Full;
