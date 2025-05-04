// grammarExercisesB2.js - Partie 2
// Fichier contenant uniquement les exercices pour le niveau B2 du CECR

const grammarExercisesB2 = {
  1: [ // Les temps futurs avancés
    {
      type: "fillInTheBlank",
      question: "By midnight, we ___ ___ (drive) for 10 hours.",
      answer: "will have been driving"
    },
    {
      type: "multipleChoice",
      question: "This time tomorrow, we ___ over the Atlantic.",
      options: ["will fly", "will be flying", "will have flown", "will have been flying"],
      answer: "will be flying"
    }
  ],
  2: [ // Les conditionnels mixtes
    {
      type: "fillInTheBlank",
      question: "If he ___ (study) harder last year, he ___ (have) a better job now.",
      answer: "had studied, would have"
    },
    {
      type: "transformation",
      question: "She is not rich. She didn't travel the world. (Combine using mixed conditional)",
      answer: "If she were rich, she would have traveled the world."
    }
  ],
  3: [ // Alternatives à 'if'
    {
      type: "transformation",
      question: "If you should need help, call me. (Start with 'Should')",
      answer: "Should you need help, call me."
    },
    {
      type: "fillInTheBlank",
      question: "___ I to win the lottery, I'd travel the world.",
      answer: "Were"
    }
  ],
  4: [ // La voix passive avancée
    {
      type: "fillInTheBlank",
      question: "The project ___ ___ ___ by next month. (will/complete)",
      answer: "will have been completed"
    },
    {
      type: "transformation",
      question: "They might have cancelled the meeting. (Make passive)",
      answer: "The meeting might have been cancelled."
    }
  ],
  5: [ // Les propositions relatives avancées
    {
      type: "fillInTheBlank",
      question: "The person ___ ___ I spoke is the manager.",
      answer: "to whom"
    },
    {
      type: "transformation",
      question: "The car is parked outside. It belongs to my boss. (Combine with past participle)",
      answer: "The car parked outside belongs to my boss."
    }
  ],
  6: [ // Discours rapporté avancé
    {
      type: "transformation",
      question: "'Let's go to the beach,' she suggested. (Report)",
      answer: "She suggested going to the beach."
    },
    {
      type: "transformation",
      question: "'Don't forget to lock the door,' he reminded me. (Report)",
      answer: "He reminded me not to forget to lock the door."
    }
  ],
  7: [ // Modaux de probabilité passé
    {
      type: "fillInTheBlank",
      question: "She knows a lot about it. She ___ ___ studied the subject before.",
      answer: "must have"
    },
    {
      type: "multipleChoice",
      question: "He failed the exam. He ___ studied harder.",
      options: ["can't have", "should have", "might not have", "wouldn't have"],
      answer: "should have"
    }
  ],
  8: [ // Inversion pour emphase
    {
      type: "transformation",
      question: "I have never seen such a beautiful sunrise. (Start with 'Never')",
      answer: "Never have I seen such a beautiful sunrise."
    },
    {
      type: "fillInTheBlank",
      question: "Not only ___ she win, but she broke the record too.",
      answer: "did"
    }
  ],
  9: [ // Participle clauses
    {
      type: "transformation",
      question: "When I heard the news, I immediately called her. (Use participle)",
      answer: "Hearing the news, I immediately called her."
    },
    {
      type: "fillInTheBlank",
      question: "___ finished his work, he left the office.",
      answer: "Having"
    }
  ],
  10: [ // Cleft sentences
    {
      type: "transformation",
      question: "John broke the window. (Start with 'It was')",
      answer: "It was John who broke the window."
    },
    {
      type: "fillInTheBlank",
      question: "___ I need is some advice.",
      answer: "What"
    }
  ],
  11: [ // Wish et if only
    {
      type: "fillInTheBlank",
      question: "I wish I ___ (not/say) that yesterday.",
      answer: "hadn't said"
    },
    {
      type: "multipleChoice",
      question: "If only it ___ rain!",
      options: ["would", "will", "did", "does"],
      answer: "would"
    }
  ],
  12: [ // Le subjonctif
    {
      type: "fillInTheBlank",
      question: "It's important that he ___ (be) there on time.",
      answer: "be"
    },
    {
      type: "multipleChoice",
      question: "I suggest that she ___ for the job.",
      options: ["applies", "apply", "will apply", "applying"],
      answer: "apply"
    }
  ],
  13: [ // Verbes causatifs
    {
      type: "fillInTheBlank",
      question: "I need to ___ my car ___ (repair).",
      answer: "have, repaired"
    },
    {
      type: "transformation",
      question: "Someone painted our house last week. (Use causative)",
      answer: "We had our house painted last week."
    }
  ],
  14: [ // Verbes aux sens multiples
    {
      type: "multipleChoice",
      question: "I saw him ___ the street.",
      options: ["cross", "crossing", "crossed", "to cross"],
      answer: "cross"
    },
    {
      type: "fillInTheBlank",
      question: "The cake ___ (smell) delicious!",
      answer: "smells"
    }
  ],
  15: [ // Ellipse et substitution
    {
      type: "fillInTheBlank",
      question: "She can dance well, but her sister can't ___.",
      answer: "(dance)"
    },
    {
      type: "multipleChoice",
      question: "I like coffee, and ___ does my brother.",
      options: ["so", "neither", "nor", "also"],
      answer: "so"
    }
  ],
  16: [ // Phénomènes grammaticaux particuliers
    {
      type: "fillInTheBlank",
      question: "The sooner we leave, ___ ___ we'll arrive.",
      answer: "the sooner"
    },
    {
      type: "transformation",
      question: "We had just left when it started raining. (Use 'Hardly')",
      answer: "Hardly had we left when it started raining."
    }
  ],
  17: [ // Prépositions avancées
    {
      type: "fillInTheBlank",
      question: "___ ___ ___ your request, we have prepared a report.",
      answer: "With regard to"
    },
    {
      type: "multipleChoice",
      question: "I'm looking forward ___ the summer holidays.",
      options: ["to", "for", "at", "on"],
      answer: "to"
    }
  ],
  18: [ // Inversion conditionnelle
    {
      type: "transformation",
      question: "If I had known earlier, I would have helped. (Start with 'Had')",
      answer: "Had I known earlier, I would have helped."
    },
    {
      type: "fillInTheBlank",
      question: "___ it not for your help, we would have failed.",
      answer: "Were"
    }
  ],
  19: [ // It patterns
    {
      type: "fillInTheBlank",
      question: "It's no ___ complaining about it now.",
      answer: "use"
    },
    {
      type: "multipleChoice",
      question: "It ___ effort to learn a new language.",
      options: ["gets", "needs", "takes", "has"],
      answer: "takes"
    }
  ],
  20: [ // Connecteurs avancés
    {
      type: "fillInTheBlank",
      question: "___, the results were disappointing despite our efforts.",
      answer: "Nevertheless"
    },
    {
      type: "multipleChoice",
      question: "The weather was bad. ___, we decided to continue.",
      options: ["Notwithstanding", "Furthermore", "Consequently", "Therefore"],
      answer: "Notwithstanding"
    }
  ],
  21: [ // Négations avancées
    {
      type: "multipleChoice",
      question: "I can't help ___ about the exam.",
      options: ["worry", "to worry", "worrying", "worried"],
      answer: "worrying"
    },
    {
      type: "transformation",
      question: "She is willing to help. (Make negative with 'unwilling')",
      answer: "She is not unwilling to help."
    }
  ],
  22: [ // Modaux pour critiques
    {
      type: "fillInTheBlank",
      question: "You ___ ___ told me earlier!",
      answer: "might have"
    },
    {
      type: "multipleChoice",
      question: "You ___ worried so much. Everything turned out fine.",
      options: ["wouldn't have", "needn't have", "mustn't have", "shouldn't have"],
      answer: "needn't have"
    }
  ],
  23: [ // Adjectifs avec prépositions
    {
      type: "fillInTheBlank",
      question: "She's very capable ___ handling the situation.",
      answer: "of"
    },
    {
      type: "multipleChoice",
      question: "The results are independent ___ our efforts.",
      options: ["from", "of", "to", "with"],
      answer: "of"
    }
  ],
  24: [ // Passive infinitive et gerund
    {
      type: "fillInTheBlank",
      question: "I don't like ___ ___ what to do.",
      answer: "being told"
    },
    {
      type: "transformation",
      question: "Someone needs to finish the report. (Use passive with 'need')",
      answer: "The report needs to be finished."
    }
  ],
  25: [ // Emphasis et Hedging
    {
      type: "fillInTheBlank",
      question: "It was ___ because of this that we succeeded.",
      answer: "precisely"
    },
    {
      type: "multipleChoice",
      question: "___, the results were positive.",
      options: ["To some extent", "Precisely", "Exactly", "Indeed"],
      answer: "To some extent"
    }
  ]
};

export default grammarExercisesB2;