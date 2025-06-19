// grammarExercisesA2.js
// Fichier contenant uniquement les exercices pour le niveau A2 du CECR

const grammarExercisesA2 = {
  1: [ // Le passé simple (past simple)
    {
      type: "fillInTheBlank",
      question: "She ___ (go) to Paris last summer.",
      answer: "went"
    },
    {
      type: "transformation",
      question: "They visited Rome. (make negative)",
      answer: "They didn't visit Rome."
    }
  ],
  2: [ // Le présent parfait
    {
      type: "fillInTheBlank",
      question: "I ___ (live) here for five years.",
      answer: "have lived"
    },
    {
      type: "multipleChoice",
      question: "She ___ to Paris before.",
      options: ["has never been", "has been never", "never has been", "been has never"],
      answer: "has never been"
    }
  ],
  3: [ // Le passé continu
    {
      type: "fillInTheBlank",
      question: "It ___ (rain) when I left the house.",
      answer: "was raining"
    },
    {
      type: "transformation",
      question: "I read a book. He came. (Combine with 'when')",
      answer: "I was reading a book when he came."
    }
  ],
  4: [ // Le futur avec 'going to'
    {
      type: "fillInTheBlank",
      question: "Look at those clouds! It ___ (rain).",
      answer: "is going to rain"
    },
    {
      type: "transformation",
      question: "They plan to move next month. (Use 'going to')",
      answer: "They are going to move next month."
    }
  ],
  5: [ // Le futur avec 'will'
    {
      type: "fillInTheBlank",
      question: "I think it ___ (be) sunny tomorrow.",
      answer: "will be"
    },
    {
      type: "multipleChoice",
      question: "Don't worry, I ___ help you.",
      options: ["will", "going to", "am going to", "would"],
      answer: "will"
    }
  ],
  6: [ // Les conditionnels 0 et 1
    {
      type: "fillInTheBlank",
      question: "If you ___ (heat) ice, it ___ (melt).",
      answer: "heat, melts"
    },
    {
      type: "fillInTheBlank",
      question: "If it ___ (rain), I ___ (stay) home.",
      answer: "rains, will stay"
    }
  ],
  7: [ // Les comparatifs et superlatifs
    {
      type: "fillInTheBlank",
      question: "This book is ___ (interesting) than that one.",
      answer: "more interesting"
    },
    {
      type: "fillInTheBlank",
      question: "She is the ___ (tall) girl in her class.",
      answer: "tallest"
    }
  ],
  8: [ // Les noms dénombrables et indénombrables
    {
      type: "multipleChoice",
      question: "We don't have ___ money left.",
      options: ["many", "much", "few", "a few"],
      answer: "much"
    },
    {
      type: "fillInTheBlank",
      question: "How ___ friends do you have?",
      answer: "many"
    }
  ],
  9: [ // L'impératif
    {
      type: "transformation",
      question: "You close the door. (Make it an order)",
      answer: "Close the door."
    },
    {
      type: "transformation",
      question: "We go to the park. (Make a suggestion)",
      answer: "Let's go to the park."
    }
  ],
  10: [ // Should, shouldn't
    {
      type: "fillInTheBlank",
      question: "You ___ (go) to bed earlier.",
      answer: "should go"
    },
    {
      type: "multipleChoice",
      question: "We ___ eat too much junk food.",
      options: ["should", "shouldn't", "must", "mustn't"],
      answer: "shouldn't"
    }
  ],
  11: [ // Must, mustn't, have to
    {
      type: "fillInTheBlank",
      question: "You ___ (not/park) here. It's forbidden.",
      answer: "mustn't park"
    },
    {
      type: "multipleChoice",
      question: "I ___ finish this report by tomorrow.",
      options: ["have to", "mustn't", "shouldn't", "might"],
      answer: "have to"
    }
  ],
  12: [ // Might, might not, may
    {
      type: "fillInTheBlank",
      question: "She ___ (come) to the party tonight.",
      answer: "might come"
    },
    {
      type: "multipleChoice",
      question: "_____ I borrow your pen, please?",
      options: ["May", "Might", "Must", "Would"],
      answer: "May"
    }
  ],
  13: [ // Les quantifieurs
    {
      type: "fillInTheBlank",
      question: "I have ___ questions for you.",
      answer: "some"
    },
    {
      type: "fillInTheBlank",
      question: "Is there ___ milk in the fridge?",
      answer: "any"
    }
  ],
  14: [ // Would like
    {
      type: "fillInTheBlank",
      question: "I ___ a coffee, please.",
      answer: "would like"
    },
    {
      type: "transformation",
      question: "She wants to learn French. (Use 'would like')",
      answer: "She would like to learn French."
    }
  ],
  15: [ // Les verbes à particule
    {
      type: "fillInTheBlank",
      question: "Please ___ ___ the lights when you leave.",
      answer: "turn off"
    },
    {
      type: "multipleChoice",
      question: "I have to ___ for my keys. I can't find them.",
      options: ["look after", "look for", "look out", "look up"],
      answer: "look for"
    }
  ],
  16: [ // Adjectifs en -ing et -ed
    {
      type: "fillInTheBlank",
      question: "The movie was really ___.",
      answer: "boring"
    },
    {
      type: "multipleChoice",
      question: "I'm ___ in learning Spanish.",
      options: ["interesting", "interested", "interest", "interests"],
      answer: "interested"
    }
  ],
  17: [ // Pronoms indéfinis
    {
      type: "fillInTheBlank",
      question: "___ left a message for you.",
      answer: "Someone"
    },
    {
      type: "multipleChoice",
      question: "Is there ___ interesting on TV tonight?",
      options: ["something", "someone", "somewhere", "somebody"],
      answer: "something"
    }
  ],
  18: [ // Le présent continu pour le futur
    {
      type: "fillInTheBlank",
      question: "I ___ (meet) Sarah tomorrow at 5 PM.",
      answer: "am meeting"
    },
    {
      type: "transformation",
      question: "We have planned to visit Paris next month. (Use present continuous)",
      answer: "We are visiting Paris next month."
    }
  ],
  19: [ // Les adverbes de manière
    {
      type: "fillInTheBlank",
      question: "She sings ___. (beautiful)",
      answer: "beautifully"
    },
    {
      type: "transformation",
      question: "He is a careful driver. (Rewrite using an adverb)",
      answer: "He drives carefully."
    }
  ],
  20: [ // Questions avec mots interrogatifs avancés
    {
      type: "fillInTheBlank",
      question: "___ ___ have you been studying English?",
      answer: "How long"
    },
    {
      type: "multipleChoice",
      question: "___ does the train leave?",
      options: ["How often", "How long", "How much", "How many"],
      answer: "How often"
    }
  ],
  21: [ // So, neither - réponses courtes
    {
      type: "fillInTheBlank",
      question: "I'm hungry. - So ___ I.",
      answer: "am"
    },
    {
      type: "transformation",
      question: "She doesn't like coffee. - I don't like coffee either. (Use 'neither')",
      answer: "She doesn't like coffee. - Neither do I."
    }
  ],
  22: [ // Les dates et les chiffres
    {
      type: "fillInTheBlank",
      question: "My birthday is ___ March ___.",
      answer: "on, 21st",
      options: ["in, 21", "on, 21st", "at, 21", "in, 21st"]
    },
    {
      type: "multipleChoice",
      question: "It's quarter ___ ten. (10:15)",
      options: ["past", "to", "at", "for"],
      answer: "past"
    }
  ],
  23: [ // Questions avec how + adjectif
    {
      type: "fillInTheBlank",
      question: "__ __ is your brother?",
      answer: "How old"
    },
    {
      type: "matching",
      pairs: [
        { item: "How old", match: "age" },
        { item: "How tall", match: "height" },
        { item: "How big", match: "size" },
        { item: "How far", match: "distance" }
      ]
    }
  ]
};

export default grammarExercisesA2;
