// grammarExercisesB2.js
// Fichier contenant uniquement les exercices pour le niveau B2 du CECR

const grammarExercisesB2 = {
  1: [ // Les temps futurs avancés
    {
      type: "fillInTheBlank",
      question: "This time tomorrow, I ___ (lie) on the beach.",
      answer: "will be lying"
    },
    {
      type: "transformation",
      question: "By next year, I will study here for 5 years. (Use future perfect)",
      answer: "By next year, I will have studied here for 5 years."
    }
  ],
  2: [ // Les conditionnels mixtes
    {
      type: "fillInTheBlank",
      question: "If I ___ (know) about the problem earlier, I ___ (be) able to help you now.",
      answer: "had known, would be"
    },
    {
      type: "transformation",
      question: "I am not rich. I didn't travel the world. (Use mixed conditional)",
      answer: "If I were rich, I would have traveled the world."
    }
  ],
  3: [ // Alternatives à 'if' dans les conditionnels
    {
      type: "transformation",
      question: "If you need any help, call me. (Using 'should')",
      answer: "Should you need any help, call me."
    },
    {
      type: "fillInTheBlank",
      question: "___ it not been for your help, I would have failed.",
      answer: "Had"
    }
  ],
  4: [ // La voix passive - temps complexes
    {
      type: "fillInTheBlank",
      question: "The project ___ ___ ___ (complete) by the end of next month.",
      answer: "will have been completed"
    },
    {
      type: "transformation",
      question: "People have been discussing the issue for months. (Use passive)",
      answer: "The issue has been being discussed for months."
    }
  ],
  5: [ // Les propositions relatives avancées
    {
      type: "transformation",
      question: "She is the manager. I was speaking to her. (Using 'to whom')",
      answer: "She is the manager to whom I was speaking."
    },
    {
      type: "multipleChoice",
      question: "The man ___ over there is my boss.",
      options: ["standing", "stands", "stand", "stood"],
      answer: "standing"
    }
  ],
  6: [ // Discours rapporté - structures avancées
    {
      type: "transformation",
      question: "'Don't forget to call me,' she reminded him. (Reported speech)",
      answer: "She reminded him not to forget to call her."
    },
    {
      type: "fillInTheBlank",
      question: "She ___ going to the beach. (suggest)",
      answer: "suggested"
    }
  ],
  7: [ // Modaux de probabilité et déduction au passé
    {
      type: "fillInTheBlank",
      question: "She isn't here. She ___ ___ (leave) early.",
      answer: "must have left"
    },
    {
      type: "multipleChoice",
      question: "He ___ have eaten the cake – he's allergic to sugar.",
      options: ["can't", "must", "should", "might"],
      answer: "can't"
    }
  ],
  8: [ // Inversion pour emphase et style formel
    {
      type: "transformation",
      question: "She not only passed the exam, but she also got the highest score. (Beginning with 'Not only')",
      answer: "Not only did she pass the exam, but she also got the highest score."
    },
    {
      type: "fillInTheBlank",
      question: "_____ have I seen such a magnificent view.",
      answer: "Seldom"
    }
  ],
  9: [ // Participer clauses (clauses participiales)
    {
      type: "transformation",
      question: "Because she was feeling tired, she went to bed early. (Using a present participle)",
      answer: "Feeling tired, she went to bed early."
    },
    {
      type: "fillInTheBlank",
      question: "___ ___ his work, he went home.",
      answer: "Having finished"
    }
  ],
  10: [ // Cleft sentences (phrases clivées)
    {
      type: "transformation",
      question: "John broke the window. (Focus on 'John')",
      answer: "It was John who broke the window."
    },
    {
      type: "fillInTheBlank",
      question: "___ ___ I need is some peace and quiet.",
      answer: "What all"
    }
  ],
  11: [ // Wish et if only
    {
      type: "fillInTheBlank",
      question: "I wish I ___ (have) more time to study.",
      answer: "had"
    },
    {
      type: "transformation",
      question: "I didn't prepare for the interview. I regret that now. (Using 'If only')",
      answer: "If only I had prepared for the interview."
    }
  ],
  12: [ // Le subjonctif en anglais
    {
      type: "fillInTheBlank",
      question: "It is essential that he ___ (be) there on time.",
      answer: "be"
    },
    {
      type: "transformation",
      question: "They suggested that she joins the team. (Correct with subjunctive)",
      answer: "They suggested that she join the team."
    }
  ],
  13: [ // Verbes causatifs (have/get something done)
    {
      type: "fillInTheBlank",
      question: "I ___ my car ___ (repair) yesterday.",
      answer: "had, repaired"
    },
    {
      type: "transformation",
      question: "Someone cut her hair. (Causative)",
      answer: "She had/got her hair cut."
    }
  ],
  14: [ // Verbes aux sens multiples
    {
      type: "multipleChoice",
      question: "I ___ him leave the building.",
      options: ["saw", "watched", "looked", "noticed"],
      answer: "saw"
    },
    {
      type: "fillInTheBlank",
      question: "The food ___ delicious.",
      answer: "tastes"
    }
  ],
  15: [ // Ellipse et substitution
    {
      type: "fillInTheBlank",
      question: "She can swim faster than I ___.",
      answer: "can"
    },
    {
      type: "transformation",
      question: "I don't like coffee. She doesn't like coffee. (Using 'neither')",
      answer: "I don't like coffee and neither does she."
    }
  ],
  16: [ // Phénomènes grammaticaux particuliers
    {
      type: "transformation",
      question: "We had just left. Then it started to rain. (Using 'Hardly')",
      answer: "Hardly had we left when it started to rain."
    },
    {
      type: "fillInTheBlank",
      question: "The sooner we start, ___ ___ it will be.",
      answer: "the better"
    }
  ],
  17: [ // Prépositions avancées et phrasal verbs
    {
      type: "fillInTheBlank",
      question: "___ ___ ___ the rain, we decided to continue our hike.",
      answer: "In spite of"
    },
    {
      type: "multipleChoice",
      question: "I'm looking forward ___ seeing you again.",
      options: ["to", "for", "at", "on"],
      answer: "to"
    }
  ],
  18: [ // Inversion conditionnelle
    {
      type: "transformation",
      question: "If I had known earlier, I would have told you. (Using inversion)",
      answer: "Had I known earlier, I would have told you."
    },
    {
      type: "fillInTheBlank",
      question: "___ it not for your help, we would be lost.",
      answer: "Were"
    }
  ],
  19: [ // It patterns (structures avec 'it')
    {
      type: "fillInTheBlank",
      question: "It's ___ ___ complaining about the situation.",
      answer: "no use"
    },
    {
      type: "multipleChoice",
      question: "It ___ time to learn a new language.",
      options: ["takes", "makes", "spends", "uses"],
      answer: "takes"
    }
  ],
  20: [ // Connecteurs de discours avancés
    {
      type: "matching",
      pairs: [
        { item: "nevertheless", match: "despite this" },
        { item: "subsequently", match: "afterwards" },
        { item: "conversely", match: "in contrast" },
        { item: "hence", match: "therefore" }
      ]
    },
    {
      type: "fillInTheBlank",
      question: "The project was difficult; ___, we managed to complete it on time.",
      answer: "nevertheless"
    }
  ],
  21: [ // Négations avancées
    {
      type: "fillInTheBlank",
      question: "I ___ help laughing when I saw his face.",
      answer: "couldn't"
    },
    {
      type: "transformation",
      question: "She is willing to help. (Double negative for emphasis)",
      answer: "She is not unwilling to help."
    }
  ],
  22: [ // Modaux pour critiques et reproches
    {
      type: "fillInTheBlank",
      question: "You ___ ___ told me earlier about this problem.",
      answer: "should have"
    },
    {
      type: "multipleChoice",
      question: "You ___ have worried so much; everything turned out fine.",
      options: ["needn't", "mustn't", "wouldn't", "couldn't"],
      answer: "needn't"
    }
  ],
  23: [ // Adjectifs avec prépositions
    {
      type: "matching",
      pairs: [
        { item: "pleased", match: "with" },
        { item: "dependent", match: "on" },
        { item: "capable", match: "of" },
        { item: "similar", match: "to" }
      ]
    },
    {
      type: "fillInTheBlank",
      question: "She's very proud ___ her achievements.",
      answer: "of"
    }
  ],
  24: [ // Passive infinitive et gerund
    {
      type: "transformation",
      question: "I don't like it when people tell me what to do. (Using passive infinitive)",
      answer: "I don't like being told what to do."
    },
    {
      type: "fillInTheBlank",
      question: "The report needs ___ ___ by tomorrow.",
      answer: "to be finished"
    }
  ],
  25: [ // Emphasis et Hedging
    {
      type: "fillInTheBlank",
      question: "It was ___ because of your help that we succeeded.",
      answer: "precisely"
    },
    {
      type: "multipleChoice",
      question: "___, the results were positive.",
      options: ["To some extent", "Exactly", "Certainly", "Absolutely"],
      answer: "To some extent"
    }
  ],
  26: [ // Structures causatives détaillées
    {
      type: "fillInTheBlank",
      question: "She ___ her car ___ last night.",
      answer: "had, stolen"
    },
    {
      type: "transformation",
      question: "The teacher makes the students practice every day. (Using causative structure)",
      answer: "The teacher has the students practice every day."
    }
  ],
  27: [ // Expressions idiomatiques avec prépositions
    {
      type: "matching",
      pairs: [
        { item: "on edge", match: "nervous" },
        { item: "in trouble", match: "having problems" },
        { item: "at odds with", match: "in disagreement with" },
        { item: "out of the blue", match: "unexpectedly" }
      ]
    },
    {
      type: "fillInTheBlank",
      question: "We're still not ___ ___ ___ ___ yet with this project.",
      answer: "out of the woods"
    }
  ],
  28: [ // Conditionnels mixtes complexes
    {
      type: "transformation",
      question: "He drove too fast. Now he's in hospital. (Mixed conditional)",
      answer: "If he hadn't driven so fast, he wouldn't be in hospital now."
    },
    {
      type: "fillInTheBlank",
      question: "If I were you, I ___ ___ ___ the problem differently.",
      answer: "would have approached"
    }
  ]
};

export default grammarExercisesB2;