// grammarExercisesB1.js
// Fichier contenant uniquement les exercices pour le niveau B1 du CECR

const grammarExercisesB1 = {
  1: [ // Le présent parfait continu
    {
      type: "fillInTheBlank",
      question: "I ___ (wait) for this bus for 30 minutes.",
      answer: "have been waiting"
    },
    {
      type: "transformation",
      question: "She studies English. (Since 2020, present perfect continuous)",
      answer: "She has been studying English since 2020."
    }
  ],
  2: [ // Le passé simple vs le présent parfait
    {
      type: "fillInTheBlank",
      question: "I ___ (live) in Paris for five years, but now I live in London.",
      answer: "lived"
    },
    {
      type: "fillInTheBlank",
      question: "I ___ (live) in London since 2018.",
      answer: "have lived"
    }
  ],
  3: [ // Le passé parfait
    {
      type: "fillInTheBlank",
      question: "By the time he arrived, she ___ (leave).",
      answer: "had left"
    },
    {
      type: "transformation",
      question: "I finished my homework. Then my friend called. (Use 'when' and past perfect)",
      answer: "I had finished my homework when my friend called."
    }
  ],
  4: [ // Le passé parfait continu
    {
      type: "fillInTheBlank",
      question: "She was tired because she ___ (work) all day.",
      answer: "had been working"
    },
    {
      type: "transformation",
      question: "We were playing for 2 hours. Then it started to rain. (Use past perfect continuous)",
      answer: "We had been playing for 2 hours when it started to rain."
    }
  ],
  5: [ // Used to, would, be used to, get used to
    {
      type: "fillInTheBlank",
      question: "She ___ smoke, but she quit last year.",
      answer: "used to"
    },
    {
      type: "multipleChoice",
      question: "I'm not ___ driving on the left side of the road.",
      options: ["used to", "get used to", "would", "using to"],
      answer: "used to"
    }
  ],
  6: [ // Le deuxième conditionnel
    {
      type: "fillInTheBlank",
      question: "If I ___ (be) you, I ___ (talk) to her.",
      answer: "were, would talk"
    },
    {
      type: "transformation",
      question: "I don't have a car so I can't drive you. (Use second conditional)",
      answer: "If I had a car, I would drive you."
    }
  ],
  7: [ // Le troisième conditionnel
    {
      type: "fillInTheBlank",
      question: "If he ___ (study) harder, he ___ (pass) the exam.",
      answer: "had studied, would have passed"
    },
    {
      type: "transformation",
      question: "I didn't see you so I didn't say hello. (Use third conditional)",
      answer: "If I had seen you, I would have said hello."
    }
  ],
  8: [ // La voix passive - temps simples
    {
      type: "transformation",
      question: "They built this house in 1980. (Use passive voice)",
      answer: "This house was built in 1980."
    },
    {
      type: "fillInTheBlank",
      question: "English ___ (speak) in many countries around the world.",
      answer: "is spoken"
    }
  ],
  9: [ // Les propositions relatives
    {
      type: "fillInTheBlank",
      question: "The woman ___ lives next door is a doctor.",
      answer: "who"
    },
    {
      type: "transformation",
      question: "I bought a car. The car is red. (Combine using a relative pronoun)",
      answer: "I bought a car which/that is red."
    }
  ],
  10: [ // Les propositions relatives: defining vs non-defining
    {
      type: "multipleChoice",
      question: "My brother, ___ lives in Paris, is visiting next week.",
      options: ["who", "which", "that", "whom"],
      answer: "who"
    },
    {
      type: "transformation",
      question: "My car is blue. My car is parked outside. (Combine with a defining relative clause)",
      answer: "My car that/which is parked outside is blue."
    }
  ],
  11: [ // Le discours rapporté - affirmations
    {
      type: "transformation",
      question: "'I am tired,' she said. (Reported speech)",
      answer: "She said (that) she was tired."
    },
    {
      type: "fillInTheBlank",
      question: "He told me that he ___ (finish) the project the day before.",
      answer: "had finished"
    }
  ],
  12: [ // Le discours rapporté - questions
    {
      type: "transformation",
      question: "'Where do you live?' he asked. (Reported speech)",
      answer: "He asked (me) where I lived."
    },
    {
      type: "fillInTheBlank",
      question: "She asked if I ___ (want) to join them for dinner.",
      answer: "wanted"
    }
  ],
  13: [ // Les verbes à particule (phrasal verbs) avancés
    {
      type: "multipleChoice",
      question: "The meeting has been ___ until next week.",
      options: ["put on", "put off", "put up", "put down"],
      answer: "put off"
    },
    {
      type: "fillInTheBlank",
      question: "I ___ ___ an old friend at the supermarket yesterday.",
      answer: "ran into"
    }
  ],
  14: [ // Modaux pour déduction et probabilité
    {
      type: "fillInTheBlank",
      question: "She's not answering her phone. She ___ be asleep.",
      answer: "must"
    },
    {
      type: "multipleChoice",
      question: "He ___ have seen the movie because he knows the plot so well.",
      options: ["must", "can't", "might", "should"],
      answer: "must"
    }
  ],
  15: [ // Articles: usages spéciaux
    {
      type: "fillInTheBlank",
      question: "He plays ___ guitar in a band.",
      answer: "the"
    },
    {
      type: "multipleChoice",
      question: "I go to school ___ bus.",
      options: ["by", "with", "on", "in"],
      answer: "by"
    }
  ],
  16: [ // Gérondifs et infinitifs - après les verbes
    {
      type: "fillInTheBlank",
      question: "I enjoy ___ (swim) in the sea.",
      answer: "swimming"
    },
    {
      type: "multipleChoice",
      question: "She stopped ___ to say hello.",
      options: ["to work", "working", "work", "to working"],
      answer: "working"
    }
  ],
  17: [ // Marques de questionnement (question tags)
    {
      type: "fillInTheBlank",
      question: "You're French, ___?",
      answer: "aren't you"
    },
    {
      type: "transformation",
      question: "She doesn't like coffee. (Add a question tag)",
      answer: "She doesn't like coffee, does she?"
    }
  ],
  18: [ // Expressions de quantité
    {
      type: "fillInTheBlank",
      question: "There's ___ of time before the train leaves.",
      answer: "plenty"
    },
    {
      type: "multipleChoice",
      question: "Do we have ___ milk for breakfast?",
      options: ["enough", "plenty", "too much", "very many"],
      answer: "enough"
    }
  ],
  19: [ // Les pronoms réfléchis
    {
      type: "fillInTheBlank",
      question: "She made the cake ___.",
      answer: "herself"
    },
    {
      type: "transformation",
      question: "I cut me when I was cooking. (Correct using a reflexive pronoun)",
      answer: "I cut myself when I was cooking."
    }
  ],
  20: [ // Inversions emphatiques basiques
    {
      type: "transformation",
      question: "I have never seen such a beautiful sunset. (Begin with 'Never')",
      answer: "Never have I seen such a beautiful sunset."
    },
    {
      type: "fillInTheBlank",
      question: "Hardly ___ we arrived when it started to rain.",
      answer: "had"
    }
  ],
  21: [ // Prépositions dépendantes
    {
      type: "fillInTheBlank",
      question: "She's very good ___ speaking languages.",
      answer: "at"
    },
    {
      type: "matching",
      pairs: [
        { item: "depend", match: "on" },
        { item: "afraid", match: "of" },
        { item: "interested", match: "in" },
        { item: "good", match: "at" }
      ]
    }
  ],
  22: [ // Linking words (connecteurs logiques)
    {
      type: "fillInTheBlank",
      question: "___ it was raining, we went for a walk.",
      answer: "Although"
    },
    {
      type: "multipleChoice",
      question: "We were late ___ the heavy traffic.",
      options: ["because of", "despite", "although", "however"],
      answer: "because of"
    }
  ],
  23: [ // L'emphase avec 'do'
    {
      type: "transformation",
      question: "I told you to call me. (Add emphasis with 'do')",
      answer: "I did tell you to call me."
    },
    {
      type: "fillInTheBlank",
      question: "She ___ love chocolate, despite what she says.",
      answer: "does"
    }
  ],
  24: [ // Clauses de temps avancées
    {
      type: "fillInTheBlank",
      question: "___ ___ I finish this report, I'll call you.",
      answer: "As soon as"
    },
    {
      type: "transformation",
      question: "You'll arrive. We will have left by then. (Use 'by the time')",
      answer: "By the time you arrive, we will have left."
    }
  ],
  25: [ // La forme passive - formes continues
    {
      type: "fillInTheBlank",
      question: "The house ___ ___ (renovate) at the moment.",
      answer: "is being renovated"
    },
    {
      type: "transformation",
      question: "They were cleaning the office when I arrived. (Use passive voice)",
      answer: "The office was being cleaned when I arrived."
    }
  ],
  26: [ // Le futur dans le passé
    {
      type: "fillInTheBlank",
      question: "She said she ___ (call) me later.",
      answer: "would call"
    },
    {
      type: "transformation",
      question: "We are going to leave at 6. (Change to future in the past)",
      answer: "We were going to leave at 6."
    }
  ],
  27: [ // Distinction entre 'as' et 'like'
    {
      type: "multipleChoice",
      question: "He works ___ a teacher at the local school.",
      options: ["as", "like", "for", "by"],
      answer: "as"
    },
    {
      type: "fillInTheBlank",
      question: "She talks ___ her mother, although she is not her mother.",
      answer: "like"
    }
  ],
  28: [ // Infinitif vs gérondif - détails avancés
    {
      type: "multipleChoice",
      question: "I remember ___ the letter yesterday.",
      options: ["to post", "posting", "post", "to posting"],
      answer: "posting"
    },
    {
      type: "transformation",
      question: "I forgot that I needed to buy milk. (Use 'forget + infinitive')",
      answer: "I forgot to buy milk."
    }
  ],
  29: [ // Phrasal verbs idiomatiques courants
    {
      type: "matching",
      pairs: [
        { item: "break down", match: "stop functioning" },
        { item: "give up", match: "quit" },
        { item: "look forward to", match: "anticipate with pleasure" },
        { item: "run out of", match: "have no more of something" }
      ]
    },
    {
      type: "fillInTheBlank",
      question: "I can't ___ ___ ___ the noise anymore.",
      answer: "put up with"
    }
  ]
};

export default grammarExercisesB1;