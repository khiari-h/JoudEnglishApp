// grammarExercisesC2.js
// Fichier contenant uniquement les exercices pour le niveau C2 du CECR

const grammarExercisesC2 = {
  1: [ // Inversion archaïque
    {
      type: "transformation",
      question: "The days of innocence were gone. (Start with 'Gone')",
      answer: "Gone were the days of innocence."
    },
    {
      type: "transformation",
      question: "Though his achievements may be great, he remains humble. (Start with 'Great')",
      answer: "Great though his achievements may be, he remains humble."
    }
  ],
  2: [ // Modalité épistémique supérieure
    {
      type: "fillInTheBlank",
      question: "One would be ___ to think that this assumption lacks merit.",
      answer: "inclined"
    },
    {
      type: "multipleChoice",
      question: "The evidence would tend to ___ such a conclusion.",
      options: ["support", "militate against", "prove", "deny"],
      answer: "militate against"
    }
  ],
  3: [ // Subjunctive mood archaïque
    {
      type: "fillInTheBlank",
      question: "___ what may, we shall persevere.",
      answer: "Come"
    },
    {
      type: "transformation",
      question: "If only I had known, I would have acted differently. (Start with 'Had I but')",
      answer: "Had I but known, I would have acted differently."
    }
  ],
  4: [ // Discourse metaphors
    {
      type: "fillInTheBlank",
      question: "The argument ___ along the following trajectory...",
      answer: "unfolds"
    },
    {
      type: "multipleChoice",
      question: "These findings constitute a ___ of the theoretical edifice.",
      options: ["part", "cornerstone", "element", "component"],
      answer: "cornerstone"
    }
  ],
  5: [ // Cataphoric et anaphoric references
    {
      type: "fillInTheBlank",
      question: "___ follows is a detailed exposition.",
      answer: "What"
    },
    {
      type: "multipleChoice",
      question: "The ___ considerations notwithstanding, we must proceed.",
      options: ["mentioned", "aforementioned", "stated", "discussed"],
      answer: "aforementioned"
    }
  ],
  6: [ // Metalinguistic commentary
    {
      type: "fillInTheBlank",
      question: "If I may ___ ___ to use a colloquialism...",
      answer: "be permitted"
    },
    {
      type: "multipleChoice",
      question: "To employ a ___ hackneyed phrase...",
      options: ["somewhat", "little", "very", "rather"],
      answer: "somewhat"
    }
  ],
  7: [ // Information packaging
    {
      type: "transformation",
      question: "The fact that studies overlooked this variable is not insignificant. (Start with 'Not insignificant')",
      answer: "Not insignificant is the fact that studies overlooked this variable."
    },
    {
      type: "fillInTheBlank",
      question: "What ___ emphasizing is the replicability.",
      answer: "bears"
    }
  ],
  8: [ // Register shift
    {
      type: "fillInTheBlank",
      question: "The theory, ___ ___ ___, fails to account for realities.",
      answer: "as it were"
    },
    {
      type: "multipleChoice",
      question: "___ speaking, the project was doomed.",
      options: ["Academically", "Colloquially", "Formally", "Professionally"],
      answer: "Colloquially"
    }
  ],
  9: [ // Irony et indirect critique
    {
      type: "fillInTheBlank",
      question: "One might be ___ for questioning the validity.",
      answer: "forgiven"
    },
    {
      type: "multipleChoice",
      question: "It would be an ___ to say the evidence is inconclusive.",
      options: ["exaggeration", "overstatement", "understatement", "misstatement"],
      answer: "understatement"
    }
  ],
  10: [ // Conditional sophistication
    {
      type: "transformation",
      question: "If it had not been for chance, the outcome would have differed. (Start with 'Had it not')",
      answer: "Had it not been for chance, the outcome would have differed."
    },
    {
      type: "fillInTheBlank",
      question: "___ one to consider thoroughly, inconsistencies emerge.",
      answer: "Were"
    }
  ],
  11: [ // Idiomatic académique
    {
      type: "fillInTheBlank",
      question: "This finding ___ in the face of conventional wisdom.",
      answer: "flies"
    },
    {
      type: "multipleChoice",
      question: "The evidence ___ traditional boundaries.",
      options: ["crosses", "cuts across", "overcomes", "breaks"],
      answer: "cuts across"
    }
  ],
  12: [ // Nominalization stratégique
    {
      type: "transformation",
      question: "How the policy was implemented needs consideration. (Use nominalization)",
      answer: "The implementation of the policy needs consideration."
    },
    {
      type: "fillInTheBlank",
      question: "To reify this concept, let us examine what ___ entails.",
      answer: "reification"
    }
  ],
  13: [ // Hedging épistémique
    {
      type: "fillInTheBlank",
      question: "The data would ___ to suggest, albeit tentatively, a correlation.",
      answer: "appear"
    },
    {
      type: "multipleChoice",
      question: "One might ___ to propose that the relationship is not coincidental.",
      options: ["dare", "venture", "attempt", "try"],
      answer: "venture"
    }
  ],
  14: [ // Concessive sophistication
    {
      type: "fillInTheBlank",
      question: "___ the inherent limitations of the methodology...",
      answer: "Notwithstanding"
    },
    {
      type: "transformation",
      question: "The evidence is compelling, but it does not constitute proof. (Use 'as')",
      answer: "The evidence, compelling as it may be, does not constitute proof."
    }
  ],
  15: [ // Discours rapporté sophistiqué
    {
      type: "fillInTheBlank",
      question: "Smith ___ that the phenomenon transcends categorization.",
      answer: "contends"
    },
    {
      type: "multipleChoice",
      question: "The theory, as ___ by Johnson et al., posits a framework.",
      options: ["suggested", "propounded", "mentioned", "stated"],
      answer: "propounded"
    }
  ],
  16: [ // Syntax parallèle
    {
      type: "fillInTheBlank",
      question: "Not only ___ the theory account for phenomena...",
      answer: "does"
    },
    {
      type: "multipleChoice",
      question: "___ the results can be generalized or ___ they remain specific...",
      options: ["If/if", "Whether/whether", "Either/or", "Both/and"],
      answer: "Whether/whether"
    }
  ],
  17: [ // Deixis temporel
    {
      type: "fillInTheBlank",
      question: "At the ___ of this writing, consensus remains elusive.",
      answer: "time"
    },
    {
      type: "multipleChoice",
      question: "In the ___ state of knowledge, categorization is premature.",
      options: ["current", "present", "actual", "existing"],
      answer: "present"
    }
  ],
  18: [ // Modality superposée
    {
      type: "fillInTheBlank",
      question: "It could ___ be argued that implications might necessitate reconsideration.",
      answer: "conceivably"
    },
    {
      type: "multipleChoice",
      question: "One might ___ be expected to anticipate that...",
      options: ["possibly", "reasonably", "certainly", "definitely"],
      answer: "reasonably"
    }
  ],
  19: [ // Genre-switching
    {
      type: "fillInTheBlank",
      question: "One might ___ the question thus:",
      answer: "frame"
    },
    {
      type: "multipleChoice",
      question: "The methodology, if one may employ a ___ metaphor...",
      options: ["academic", "scientific", "culinary", "technical"],
      answer: "culinary"
    }
  ],
  20: [ // Ellipsis sophistiqué
    {
      type: "transformation",
      question: "The first hypothesis proved correct; the second proved less correct. (Use ellipsis)",
      answer: "The first hypothesis proved correct; the second, less so."
    },
    {
      type: "fillInTheBlank",
      question: "Some advocate for qualitative methods, ___ for quantitative.",
      answer: "others"
    }
  ],
  21: [ // Metalinguistic reflection
    {
      type: "fillInTheBlank",
      question: "The choice of the term 'paradigm' here is ___, invoking Kuhn's framework.",
      answer: "deliberate"
    },
    {
      type: "multipleChoice",
      question: "To characterize this as 'revolutionary' might seem ___",
      options: ["accurate", "hyperbolic", "precise", "literal"],
      answer: "hyperbolic"
    }
  ],
  22: [ // Presupposition gestion
    {
      type: "fillInTheBlank",
      question: "Even ___ the validity of these assumptions...",
      answer: "granting"
    },
    {
      type: "multipleChoice",
      question: "The notion that objectivity is attainable—a premise we must ___",
      options: ["accept", "question", "believe", "support"],
      answer: "question"
    }
  ],
  23: [ // Syntactic ambiguity résolue
    {
      type: "transformation",
      question: "More important than studying grammar is understanding its application. (Disambiguate)",
      answer: "More important than studying grammar is understanding its application—not 'more important than studying grammar' the activity."
    }
  ],
  24: [ // Recursive structures
    {
      type: "fillInTheBlank",
      question: "What studies of studies have shown is that meta-analysis requires its ___ framework.",
      answer: "own"
    }
  ],
  25: [ // Rhétorique sophistiquée
    {
      type: "fillInTheBlank",
      question: "One need not subscribe to the framework ___ to appreciate its power.",
      answer: "wholesale"
    },
    {
      type: "multipleChoice",
      question: "That such methodology yields results ___ speaks to its robustness.",
      options: ["sometimes", "rarely", "across diverse contexts", "occasionally"],
      answer: "across diverse contexts"
    }
  ]
};

export default grammarExercisesC2;