// grammarExercisesB1.js - Suite
// Fichier contenant uniquement les exercices pour le niveau B1 du CECR

const grammarExercisesB1 = {
  1: [ // Le présent parfait continu
    {
      type: "fillInTheBlank",
      question: "How long ___ you ___ (study) English?",
      answer: "have, been studying"
    },
    {
      type: "transformation",
      question: "I started working at 9 AM. It's now noon. (Use present perfect continuous)",
      answer: "I have been working for three hours."
    }
  ],
  2: [ // Le passé simple vs le présent parfait
    {
      type: "multipleChoice",
      question: "I ___ (live) in Paris for 5 years - then I moved to London.",
      options: ["lived", "have lived", "was living", "had lived"],
      answer: "lived"
    },
    {
      type: "multipleChoice",
      question: "___ you ever ___ to Japan?",
      options: ["Did/go", "Have/been", "Had/been", "Were/going"],
      answer: "Have/been"
    }
  ],
  3: [ // Le passé parfait
    {
      type: "fillInTheBlank",
      question: "When I ___ (arrive), she ___ already ___ (leave).",
      answer: "arrived, had, left"
    },
    {
      type: "transformation",
      question: "First she finished her work. Then she left. (Combine with 'after')",
      answer: "After she had finished her work, she left."
    }
  ],
  4: [ // Le passé parfait continu
    {
      type: "fillInTheBlank",
      question: "I ___ (wait) for two hours when the bus finally arrived.",
      answer: "had been waiting"
    },
    {
      type: "multipleChoice",
      question: "They ___ all day before they took a break.",
      options: ["worked", "had worked", "had been working", "were working"],
      answer: "had been working"
    }
  ],
  5: [ // Used to, would, be used to, get used to
    {
      type: "fillInTheBlank",
      question: "I ___ (play) tennis every weekend when I was young.",
      answer: "used to play"
    },
    {
      type: "multipleChoice",
      question: "Are you ___ the noise in the city?",
      options: ["used to", "use to", "using to", "get use to"],
      answer: "used to"
    }
  ],
  6: [ // Le deuxième conditionnel
    {
      type: "fillInTheBlank",
      question: "If I ___ (be) you, I ___ (take) the job.",
      answer: "were, would take"
    },
    {
      type: "transformation",
      question: "I don't have a car. I want to travel. (Use 2nd conditional)",
      answer: "If I had a car, I would travel."
    }
  ],
  7: [ // Le troisième conditionnel
    {
      type: "fillInTheBlank",
      question: "If you ___ (study) harder, you ___ (pass) the exam.",
      answer: "had studied, would have passed"
    },
    {
      type: "transformation",
      question: "I didn't bring my umbrella. It rained. (Use 3rd conditional)",
      answer: "If I had brought my umbrella, I wouldn't have got wet."
    }
  ],
  8: [ // La voix passive - temps simples
    {
      type: "transformation",
      question: "They speak English here. (Make passive)",
      answer: "English is spoken here."
    },
    {
      type: "fillInTheBlank",
      question: "The house ___ (build) in 1950.",
      answer: "was built"
    }
  ],
  9: [ // Les propositions relatives
    {
      type: "fillInTheBlank",
      question: "The man ___ car is outside is my neighbor.",
      answer: "whose"
    },
    {
      type: "multipleChoice",
      question: "I remember the day ___ I met her.",
      options: ["when", "which", "where", "who"],
      answer: "when"
    }
  ],
  10: [ // Les propositions relatives: defining vs non-defining
    {
      type: "multipleChoice",
      question: "My brother __ lives in London is a doctor. (non-defining)",
      options: ["who", ",who", "that", ",who,"],
      answer: ",who,"
    },
    {
      type: "transformation",
      question: "Students are late. They will not be allowed in. (Combine with 'who')",
      answer: "Students who are late will not be allowed in."
    }
  ],
  11: [ // Le discours rapporté - affirmations
    {
      type: "transformation",
      question: "'I am studying French,' she said. (Report this)",
      answer: "She said she was studying French."
    },
    {
      type: "transformation",
      question: "'I will help you tomorrow,' he promised. (Report this)",
      answer: "He promised he would help me the next day."
    }
  ],
  12: [ // Le discours rapporté - questions
    {
      type: "transformation",
      question: "'Where do you live?' he asked me. (Report this)",
      answer: "He asked me where I lived."
    },
    {
      type: "transformation",
      question: "'Are you coming?' she asked. (Report this)",
      answer: "She asked if I was coming."
    }
  ],
  13: [ // Les verbes à particule avancés
    {
      type: "fillInTheBlank",
      question: "I ___ ___ an old friend yesterday. (meet by chance)",
      answer: "ran into"
    },
    {
      type: "multipleChoice",
      question: "The meeting was ___ until next week.",
      options: ["put down", "put off", "put on", "put up"],
      answer: "put off"
    }
  ],
  14: [ // Modaux pour déduction
    {
      type: "fillInTheBlank",
      question: "She knows everything about the project. She ___ be the manager.",
      answer: "must"
    },
    {
      type: "multipleChoice",
      question: "John isn't here. He ___ have left early.",
      options: ["must", "can't", "might", "mustn't"],
      answer: "might"
    }
  ],
  15: [ // Articles: usages spéciaux
    {
      type: "fillInTheBlank",
      question: "I go to ___ school by ___ bus.",
      answer: "-, -"
    },
    {
      type: "multipleChoice",
      question: "She plays ___ piano beautifully.",
      options: ["a", "an", "the", "-"],
      answer: "the"
    }
  ],
  16: [ // Gérondifs et infinitifs
    {
      type: "fillInTheBlank",
      question: "I enjoy ___ (read) in my free time.",
      answer: "reading"
    },
    {
      type: "multipleChoice",
      question: "Remember ___ (turn off) the lights when you leave.",
      options: ["turning off", "to turn off", "turn off", "to turning off"],
      answer: "to turn off"
    }
  ],
  17: [ // Question tags
    {
      type: "fillInTheBlank",
      question: "You're coming to the party, ___?",
      answer: "aren't you"
    },
    {
      type: "fillInTheBlank",
      question: "She doesn't speak Spanish, ___?",
      answer: "does she"
    }
  ],
  18: [ // Expressions de quantité
    {
      type: "fillInTheBlank",
      question: "There's ___ traffic today. (a large amount)",
      answer: "a lot of"
    },
    {
      type: "multipleChoice",
      question: "She's not tall ___ to reach the shelf.",
      options: ["enough", "too", "very", "so"],
      answer: "enough"
    }
  ],
  19: [ // Les pronoms réfléchis
    {
      type: "fillInTheBlank",
      question: "He cut ___ while shaving.",
      answer: "himself"
    },
    {
      type: "multipleChoice",
      question: "Did you make this cake ___?",
      options: ["yourself", "yourselves", "by yourself", "by yourselves"],
      answer: "yourself"
    }
  ],
  20: [ // Inversions emphatiques
    {
      type: "transformation",
      question: "I have never seen such a beautiful place. (Start with 'Never')",
      answer: "Never have I seen such a beautiful place."
    },
    {
      type: "fillInTheBlank",
      question: "Hardly ___ we finished when it started to rain.",
      answer: "had"
    }
  ],
  21: [ // Prépositions dépendantes
    {
      type: "fillInTheBlank",
      question: "She's very good ___ mathematics.",
      answer: "at"
    },
    {
      type: "multipleChoice",
      question: "I'm interested ___ learning Spanish.",
      options: ["in", "on", "at", "for"],
      answer: "in"
    }
  ],
  22: [ // Linking words
    {
      type: "fillInTheBlank",
      question: "___ it was raining, we decided to go out.",
      answer: "Although"
    },
    {
      type: "transformation",
      question: "It was cold. Nevertheless, we went swimming. (Use 'despite')",
      answer: "Despite the cold, we went swimming."
    }
  ],
  23: [ // L'emphase avec 'do'
    {
      type: "transformation",
      question: "I like chocolate. (Make emphatic)",
      answer: "I do like chocolate."
    },
    {
      type: "fillInTheBlank",
      question: "I ___ tell you! (emphatic past)",
      answer: "did"
    }
  ],
  24: [ // Clauses de temps avancées
    {
      type: "fillInTheBlank",
      question: "I'll call you ___ ___ ___ I arrive.",
      answer: "as soon as"
    },
    {
      type: "multipleChoice",
      question: "I'll wait ___ you're ready.",
      options: ["until", "before", "since", "already"],
      answer: "until"
    }
  ],
  25: [ // La forme passive - formes continues
    {
      type: "fillInTheBlank",
      question: "The building ___ ___ renovated right now.",
      answer: "is being"
    },
    {
      type: "transformation",
      question: "They are repairing the road. (Make passive)",
      answer: "The road is being repaired."
    }
  ]
};

export default grammarExercisesB1;