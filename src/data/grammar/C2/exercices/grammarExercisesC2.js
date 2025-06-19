// grammarExercisesC2.js
// Fichier contenant uniquement les exercices pour le niveau C2 du CECR

const grammarExercisesC2 = {
  1: [ // Inversion archaïque et stylistique
    {
      type: "transformation",
      question: "His achievements may be great, but he remains humble. (Begin with 'Great though')",
      answer: "Great though his achievements may be, he remains humble."
    },
    {
      type: "fillInTheBlank",
      question: "___ spoke the prophet, and all were silent.",
      answer: "Thus"
    }
  ],
  2: [ // Modalité épistémique supérieure
    {
      type: "fillInTheBlank",
      question: "One ___ ___ ___ to think that this assumption lacks merit.",
      answer: "would be inclined"
    },
    {
      type: "transformation",
      question: "It's reasonable to suppose that the evidence points elsewhere. (Using epistemic hedging)",
      answer: "It would not be unreasonable to suppose that the evidence points elsewhere."
    }
  ],
  3: [ // Subjunctive mood archaïque et formel
    {
      type: "fillInTheBlank",
      question: "___ I but known, I would have acted differently.",
      answer: "Had"
    },
    {
      type: "transformation",
      question: "Whatever happens, we shall persevere. (Using archaic subjunctive)",
      answer: "Come what may, we shall persevere."
    }
  ],
  4: [ // Discourse metaphors et métastructures
    {
      type: "matching",
      pairs: [
        { item: "unfolds along a trajectory", match: "development pattern" },
        { item: "cornerstone of the edifice", match: "foundational element" },
        { item: "navigate between Scylla and Charybdis", match: "avoid two dangers" },
        { item: "streams of thought", match: "intellectual trends" }
      ]
    },
    {
      type: "fillInTheBlank",
      question: "The argument ___ along the following trajectory.",
      answer: "unfolds"
    }
  ],
  5: [ // Cataphoric et anaphoric references complexes
    {
      type: "transformation",
      question: "I will now explain the methodology in detail. (Using cataphoric reference)",
      answer: "What follows is a detailed exposition of the methodology employed in this study."
    },
    {
      type: "fillInTheBlank",
      question: "The ___ considerations notwithstanding, we must proceed with caution.",
      answer: "aforementioned"
    }
  ],
  6: [ // Metalinguistic commentaire
    {
      type: "fillInTheBlank",
      question: "If I ___ ___ ___ to use a colloquialism, the plan went south.",
      answer: "may be permitted"
    },
    {
      type: "transformation",
      question: "I'll use a common phrase: 'Rome wasn't built in a day.' (Using metalinguistic commentary)",
      answer: "To employ a somewhat hackneyed phrase, Rome wasn't built in a day."
    }
  ],
  7: [ // Information packaging sophistiqué
    {
      type: "transformation",
      question: "The fact that previous studies overlooked this variable is significant. (Using fronted packaging)",
      answer: "Not insignificant is the fact that previous studies overlooked this variable."
    },
    {
      type: "fillInTheBlank",
      question: "___ ___ ___ is the replicability of these results.",
      answer: "What bears emphasizing"
    }
  ],
  8: [ // Register shift and code-switching
    {
      type: "multipleChoice",
      question: "The economic indicators suggest—___ I say it—a recession looms.",
      options: ["dare", "must", "should", "might"],
      answer: "dare"
    },
    {
      type: "fillInTheBlank",
      question: "The theory, ___ ___ ___, fails to account for practical realities.",
      answer: "as it were"
    }
  ],
  9: [ // Irony et indirect critique
    {
      type: "transformation",
      question: "People might question the validity of such assumptions. (Using indirect critique)",
      answer: "One might be forgiven for questioning the validity of such assumptions."
    },
    {
      type: "fillInTheBlank",
      question: "It would be an ___ to say the evidence is inconclusive.",
      answer: "understatement"
    }
  ],
  10: [ // Conditional sophistication extrême
    {
      type: "fillInTheBlank",
      question: "___ it not been for the intervention of chance, the outcome would have differed markedly.",
      answer: "Had"
    },
    {
      type: "transformation",
      question: "If one considers the implications thoroughly, certain inconsistencies emerge. (Using conditional inversion)",
      answer: "Were one to consider the implications thoroughly, certain inconsistencies emerge."
    }
  ],
  11: [ // Idiomatic académique élaboré
    {
      type: "matching",
      pairs: [
        { item: "flies in the face of", match: "contradicts" },
        { item: "cuts across", match: "transcends boundaries" },
        { item: "calls into question", match: "challenges" },
        { item: "turns on its head", match: "reverses" }
      ]
    },
    {
      type: "fillInTheBlank",
      question: "This finding ___ ___ ___ ___ ___ conventional wisdom.",
      answer: "flies in the face of"
    }
  ],
  12: [ // Nominalization et dénominalization stratégique
    {
      type: "transformation",
      question: "They implemented the policy in a certain way. (Using nominalization, then dénominalization)",
      answer: "The implementation of the policy, or rather, how the policy was implemented..."
    },
    {
      type: "fillInTheBlank",
      question: "To ___ this abstract concept, let us examine what reification entails.",
      answer: "reify"
    }
  ],
  13: [ // Hedging épistémique sophistiqué
    {
      type: "fillInTheBlank",
      question: "The data would ___ to suggest, albeit tentatively, a correlation.",
      answer: "appear"
    },
    {
      type: "transformation",
      question: "I think the relationship is not coincidental. (Using complex hedging)",
      answer: "One might venture to propose that the relationship is not entirely coincidental."
    }
  ],
  14: [ // Concessive sophistication
    {
      type: "multipleChoice",
      question: "___ the inherent limitations of the methodology...",
      options: ["Notwithstanding", "Despite", "Although", "Nevertheless"],
      answer: "Notwithstanding"
    },
    {
      type: "fillInTheBlank",
      question: "The evidence, compelling ___ ___ ___ ___, does not constitute conclusive proof.",
      answer: "as it may be"
    }
  ],
  15: [ // Discours rapporté et attribution sophistiqués
    {
      type: "fillInTheBlank",
      question: "Smith (2020) ___ that the phenomenon transcends simple categorization.",
      answer: "contends"
    },
    {
      type: "transformation",
      question: "Johnson et al. developed a theory with three parts. (Using sophisticated attribution)",
      answer: "The theory, as propounded by Johnson et al., posits a tripartite framework."
    }
  ],
  16: [ // Syntax parallèle complexe
    {
      type: "transformation",
      question: "The theory explains observed phenomena. It also predicts future occurrences with remarkable accuracy. (Using parallel structure)",
      answer: "Not only does the theory account for observed phenomena, but it also predicts future occurrences with remarkable accuracy."
    },
    {
      type: "fillInTheBlank",
      question: "Whether the results can be generalized to other populations ___ whether they remain context-specific constitutes a matter of ongoing debate.",
      answer: "or"
    }
  ],
  17: [ // Deixis et temporal anchoring
    {
      type: "fillInTheBlank",
      question: "___ ___ ___ this in the summer of 2024, the implications of these findings continue to resonate.",
      answer: "As I write"
    },
    {
      type: "multipleChoice",
      question: "___, consensus remains elusive.",
      options: ["At the time of this writing", "During this phase", "In this day", "By now"],
      answer: "At the time of this writing"
    }
  ],
  18: [ // Modality dense et surposée
    {
      type: "transformation",
      question: "People expect that such a methodology will yield questionable results. (Using modal stacking)",
      answer: "One might reasonably be expected to anticipate that such a methodology would necessarily yield questionable results."
    },
    {
      type: "fillInTheBlank",
      question: "It could ___ be argued that the potential implications might well necessitate reconsideration.",
      answer: "conceivably"
    }
  ],
  19: [ // Genre-switching et style hybride
    {
      type: "fillInTheBlank",
      question: "One might frame the question ___ what paradigmatic shift do these findings herald?",
      answer: "thus:"
    },
    {
      type: "transformation",
      question: "The methodology follows a recipe for empirical rigor. (Using domain metaphor)",
      answer: "The methodology, if one may employ a culinary metaphor, follows a recipe for empirical rigor."
    }
  ],
  20: [ // Ellipsis sophistiqué
    {
      type: "transformation",
      question: "The first hypothesis proved correct. The second hypothesis proved less correct. (Using ellipsis)",
      answer: "The first hypothesis proved correct; the second, less so."
    },
    {
      type: "fillInTheBlank",
      question: "Some researchers advocate for qualitative methods, others ___ quantitative.",
      answer: "for"
    }
  ],
  21: [ // Metalinguistic reflection
    {
      type: "fillInTheBlank",
      question: "To characterize this as 'revolutionary' might seem ___, yet the term captures the essence of the transformation.",
      answer: "hyperbolic"
    },
    {
      type: "transformation",
      question: "I'm using the term 'paradigm' deliberately, referring to Kuhn's work. (Using explicit lexical choice justification)",
      answer: "The choice of the term 'paradigm' here is deliberate, invoking Kuhn's framework."
    }
  ],
  22: [ // Presupposition et implicature gestion
    {
      type: "transformation",
      question: "Granting that these assumptions are valid, they still need scrutiny. (Manage presuppositions)",
      answer: "Even granting the validity of these assumptions, which themselves require scrutiny..."
    },
    {
      type: "fillInTheBlank",
      question: "The notion that objectivity is attainable—a premise we must ___—underpins this argument.",
      answer: "question"
    }
  ],
  23: [ // Syntactic ambiguity résolue
    {
      type: "transformation",
      question: "The students who studied thoroughly passed. (Clarify potential ambiguity)",
      answer: "The students who had studied thoroughly passed, as opposed to those who had studied thoroughly passed exams."
    },
    {
      type: "fillInTheBlank",
      question: "More important than studying grammar is understanding its application—not '___ ___ ___ ___ ___' the activity.",
      answer: "more important than studying grammar"
    }
  ],
  24: [ // Recursive structures et nesting
    {
      type: "fillInTheBlank",
      question: "The evidence that researchers, who had access to data that was itself ___, used to support claims that others had questioned, remains controversial.",
      answer: "contested"
    },
    {
      type: "transformation",
      question: "Studies of methodologies have shown something about meta-analysis. (Using recursive structure)",
      answer: "What studies of studies of methodology have shown is that methodological meta-analysis, itself a methodology, requires its own methodological framework."
    }
  ],
  25: [ // Rhétorique académique et persuasion sophistiquée
    {
      type: "fillInTheBlank",
      question: "One ___ ___ subscribe to the theoretical framework wholesale to appreciate its explanatory power.",
      answer: "need not"
    },
    {
      type: "transformation",
      question: "Consistent results across diverse contexts suggest robustness rather than limitations. (Using sophisticated persuasion)",
      answer: "That such a methodology yields consistent results across diverse contexts speaks to its robustness rather than its limitations."
    }
  ],
  26: [ // Analyse critique du discours
    {
      type: "fillInTheBlank",
      question: "The text subtly ___ dominant narratives through its selective emphasis on certain aspects of the issue.",
      answer: "reinforces"
    },
    {
      type: "transformation",
      question: "These rhetorical devices make contingent social arrangements seem natural. (Using critical discourse analysis)",
      answer: "The rhetorical devices employed herein function to naturalize what are, in fact, contingent social arrangements."
    }
  ],
  27: [ // Jeux de mots et double sens
    {
      type: "transformation",
      question: "Their research was revolutionary in geological exploration. (Using intentional double meaning)",
      answer: "Their groundbreaking research was, quite literally, breaking new ground in geological exploration."
    },
    {
      type: "multipleChoice",
      question: "The ___ of the situation cannot be overstated—particularly in astrophysical terms.",
      options: ["gravity", "weight", "pressure", "force"],
      answer: "gravity"
    }
  ],
  28: [ // Usage littéraire de structures archaïques
    {
      type: "fillInTheBlank",
      question: "___ cometh this notion, if not from a fundamentally flawed understanding?",
      answer: "Whence"
    },
    {
      type: "transformation",
      question: "I think the theory promises too much. (Using archaic structure)",
      answer: "Methinks the theory doth promise too much."
    }
  ]
};

export default grammarExercisesC2;
