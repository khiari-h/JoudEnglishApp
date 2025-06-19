// grammarExercisesC1.js
// Fichier contenant uniquement les exercices pour le niveau C1 du CECR

const grammarExercisesC1 = {
  1: [ // Le fronting pour l'emphase
    {
      type: "transformation",
      question: "The days when we could afford such luxury are gone. (Using fronting)",
      answer: "Gone are the days when we could afford such luxury."
    },
    {
      type: "fillInTheBlank",
      question: "___ did they realize the consequences of their actions.",
      answer: "Little"
    }
  ],
  2: [ // Subjunctive mood avancé
    {
      type: "fillInTheBlank",
      question: "The committee proposed that he ___ (resign) immediately.",
      answer: "resign"
    },
    {
      type: "transformation",
      question: "It doesn't matter what happens. We will continue. (Using 'be that as it may')",
      answer: "Be that as it may, we will continue."
    }
  ],
  3: [ // Discourse markers sophistiqués
    {
      type: "matching",
      pairs: [
        { item: "by and large", match: "generally speaking" },
        { item: "in other words", match: "to put it differently" },
        { item: "for all that", match: "despite that" },
        { item: "what's more", match: "furthermore" }
      ]
    },
    {
      type: "fillInTheBlank",
      question: "___ ___ ___, the company's performance has been satisfactory this quarter.",
      answer: "By and large"
    }
  ],
  4: [ // Cleft sentences avancées
    {
      type: "transformation",
      question: "He only realized the truth yesterday. (Using negative it-cleft)",
      answer: "It was not until yesterday that he realized the truth."
    },
    {
      type: "fillInTheBlank",
      question: "___ ___ we failed was lack of preparation.",
      answer: "The reason why"
    }
  ],
  5: [ // Inversion après expressions négatives
    {
      type: "transformation",
      question: "The country has not faced such hardship since the war. (Begin with 'Not since')",
      answer: "Not since the war has the country faced such hardship."
    },
    {
      type: "fillInTheBlank",
      question: "At no point ___ he ___ giving up.",
      answer: "did, consider"
    }
  ],
  6: [ // Complex participle clauses
    {
      type: "transformation",
      question: "The document was approved after it had been thoroughly examined. (Using participle clause)",
      answer: "Having been thoroughly examined, the document was approved."
    },
    {
      type: "fillInTheBlank",
      question: "___ ___, we'll hold the event outside.",
      answer: "Weather permitting"
    }
  ],
  7: [ // Distancing dans l'écriture académique
    {
      type: "fillInTheBlank",
      question: "It ___ ___ ___ that the results are inconclusive.",
      answer: "could be argued"
    },
    {
      type: "transformation",
      question: "There is a discrepancy in the findings. (Using distancing language)",
      answer: "There appears to be a discrepancy in the findings."
    }
  ],
  8: [ // Hedging (atténuation) académique
    {
      type: "multipleChoice",
      question: "The results ___ indicate a significant relationship.",
      options: ["tend to", "must", "always", "clearly"],
      answer: "tend to"
    },
    {
      type: "fillInTheBlank",
      question: "To a ___ extent, the theory appears valid.",
      answer: "certain"
    }
  ],
  9: [ // Nominalization avancée
    {
      type: "transformation",
      question: "They implemented the policy and this led to improvements. (Using nominalization)",
      answer: "The implementation of the policy led to improvements."
    },
    {
      type: "fillInTheBlank",
      question: "The ___ of the situation requires careful consideration.",
      answer: "complexity"
    }
  ],
  10: [ // Rapport de discours indirect complexe
    {
      type: "fillInTheBlank",
      question: "The minister ___ ___ to explain that the reforms would be gradual.",
      answer: "went on"
    },
    {
      type: "transformation",
      question: "She said, 'The decision was inevitable.' (Using 'quoted as saying')",
      answer: "She was quoted as saying that the decision was inevitable."
    }
  ],
  11: [ // Concessives avancées
    {
      type: "multipleChoice",
      question: "___ controversial, the decision was necessary.",
      options: ["Albeit", "Despite", "Although", "Even"],
      answer: "Albeit"
    },
    {
      type: "fillInTheBlank",
      question: "___ ___ her experience, she found the task challenging.",
      answer: "For all"
    }
  ],
  12: [ // Qualifying expressions
    {
      type: "fillInTheBlank",
      question: "The results are valid, at least ___ ___ ___.",
      answer: "to some degree"
    },
    {
      type: "matching",
      pairs: [
        { item: "up to a point", match: "with limitations" },
        { item: "by and large", match: "mostly" },
        { item: "to some extent", match: "partially" },
        { item: "provided that", match: "if condition is met" }
      ]
    }
  ],
  13: [ // Complex preposition patterns
    {
      type: "fillInTheBlank",
      question: "His success came ___ ___ ___ ___ his health.",
      answer: "at the expense of"
    },
    {
      type: "multipleChoice",
      question: "The proposal falls ___ the scope of our project.",
      options: ["within", "without", "beside", "against"],
      answer: "within"
    }
  ],
  14: [ // Non-finite clauses sophistiqués
    {
      type: "transformation",
      question: "The door was locked, so we had to wait outside. (Using absolute construction)",
      answer: "The door having been locked, we had to wait outside."
    },
    {
      type: "fillInTheBlank",
      question: "___ him ___ succeed, conditions must be perfect.",
      answer: "For, to"
    }
  ],
  15: [ // Emphasis through repetition and parallelism
    {
      type: "transformation",
      question: "We will fight on the beaches. We will fight on the landing grounds. (Using parallelism)",
      answer: "We shall fight on the beaches, we shall fight on the landing grounds."
    },
    {
      type: "fillInTheBlank",
      question: "The more you practice, ___ ___ you become.",
      answer: "the better"
    }
  ],
  16: [ // Advanced modal meanings
    {
      type: "fillInTheBlank",
      question: "The experiment ___ ___ to confirm our hypothesis.",
      answer: "would seem"
    },
    {
      type: "multipleChoice",
      question: "The data ___ well indicate a correlation.",
      options: ["might", "should", "can", "will"],
      answer: "might"
    }
  ],
  17: [ // Restrictions and limitations in academic writing
    {
      type: "transformation",
      question: "The findings only apply to urban areas. (Using limitation language)",
      answer: "The findings are confined to urban areas."
    },
    {
      type: "fillInTheBlank",
      question: "This research is ___ to qualitative data.",
      answer: "restricted"
    }
  ],
  18: [ // Advanced passive constructions
    {
      type: "fillInTheBlank",
      question: "The decision ___ ___ ___ taken at the highest level.",
      answer: "is to be"
    },
    {
      type: "transformation",
      question: "It's likely that the committee will reject the proposal. (Using passive construction)",
      answer: "The proposal is likely to be rejected."
    }
  ],
  19: [ // Cohesion and coherence devices
    {
      type: "multipleChoice",
      question: "___ methodology is concerned, we adopted a mixed approach.",
      options: ["As far as", "Despite", "About", "Referring to"],
      answer: "As far as"
    },
    {
      type: "fillInTheBlank",
      question: "___ to the results, we can observe significant variations.",
      answer: "Turning"
    }
  ],
  20: [ // Conditional variations sophistiqués
    {
      type: "transformation",
      question: "If the circumstances had been different, the outcome might have been better. (Using inversion)",
      answer: "Were circumstances different, the outcome might have been better."
    },
    {
      type: "fillInTheBlank",
      question: "___ ___ your intervention, the situation would have deteriorated.",
      answer: "But for"
    }
  ],
  21: [ // Metaphorical language patterns
    {
      type: "matching",
      pairs: [
        { item: "shed light on", match: "illuminate" },
        { item: "bridge the gap", match: "connect" },
        { item: "lay groundwork", match: "establish foundation" },
        { item: "navigate through", match: "traverse complexities" }
      ]
    },
    {
      type: "fillInTheBlank",
      question: "The study ___ ___ on previously unexplored territories.",
      answer: "sheds light"
    }
  ],
  22: [ // Cause-effect relationships complexes
    {
      type: "fillInTheBlank",
      question: "The decline in sales can be ___ to multiple factors.",
      answer: "attributed"
    },
    {
      type: "multipleChoice",
      question: "The emergence of these patterns ___ from underlying structural changes.",
      options: ["stems", "reaches", "appears", "holds"],
      answer: "stems"
    }
  ],
  23: [ // Syntactic complexity in academic prose
    {
      type: "transformation",
      question: "What they established through extensive research is that... (Using complex embedded clause)",
      answer: "What has been established, through extensive research, is that..."
    },
    {
      type: "fillInTheBlank",
      question: "The extent to which these factors ___ outcomes remains unclear.",
      answer: "influence"
    }
  ],
  24: [ // Formulaic expressions dans le discours académique
    {
      type: "fillInTheBlank",
      question: "___ ___ ___ can be ascertained, the data is accurate.",
      answer: "As far as"
    },
    {
      type: "multipleChoice",
      question: "___, the results should be consistent.",
      options: ["All things being equal", "For the most part", "By and large", "To some extent"],
      answer: "All things being equal"
    }
  ],
  25: [ // Corpus et registre académique
    {
      type: "transformation",
      question: "The data shows significant correlation coefficients. (Using formal academic verb)",
      answer: "The data demonstrates significant correlation coefficients."
    },
    {
      type: "matching",
      pairs: [
        { item: "demonstrate", match: "show" },
        { item: "employ", match: "use" },
        { item: "facilitate", match: "help" },
        { item: "methodology", match: "method" }
      ]
    }
  ],
  26: [ // Utilisation stratégique de la ponctuation
    {
      type: "transformation",
      question: "The research addresses three key areas. They are methodology, analysis and interpretation. (Using colon)",
      answer: "The research addresses three key areas: methodology, analysis and interpretation."
    },
    {
      type: "fillInTheBlank",
      question: "The findings—while preliminary—suggest a correlation; ___, further research is needed.",
      answer: "however"
    }
  ],
  27: [ // Euphémismes et langage diplomatique
    {
      type: "multipleChoice",
      question: "The results were ___ less promising than anticipated.",
      options: ["somewhat", "very", "totally", "absolutely"],
      answer: "somewhat"
    },
    {
      type: "transformation",
      question: "The arguments are not convincing. (Using diplomatic language)",
      answer: "The arguments presented are not entirely persuasive."
    }
  ],
  28: [ // Registre et adaptation stylistique
    {
      type: "matching",
      pairs: [
        { item: "We found some important stuff", match: "informal" },
        { item: "Our investigation yielded significant results", match: "formal" },
        { item: "The aforementioned considerations notwithstanding", match: "very formal" },
        { item: "We discovered several key findings", match: "semi-formal" }
      ]
    },
    {
      type: "transformation",
      question: "Convert to formal academic style: 'We found some pretty important stuff.'",
      answer: "Our investigation yielded significant results."
    }
  ]
};

export default grammarExercisesC1;
