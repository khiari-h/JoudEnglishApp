// src/data/assessments/AssessmentC2.js

export default {
  level: "C2",
  description: "Évaluez votre maîtrise complète de l'anglais niveau C2 - Niveau de compétence native",
  totalQuestions: 50,
  timeLimit: 90, // minutes
  passScore: 95, // pourcentage

  precision_vocabulary: {
    title: "Vocabulaire de Précision",
    description: "Maîtrisez les nuances lexicales les plus fines",
    icon: "🔬",
    questions: [
      {
        text: "The critic's review was not merely negative but genuinely _____, displaying a level of contempt that bordered on personal animosity.",
        options: ["disparaging", "vitriolic", "critical", "disapproving"],
        correctAnswer: 1,
        explanation: "'Vitriolic' means filled with bitter criticism or malice, stronger than merely 'disparaging' and fitting with 'contempt' and 'animosity'.",
      },
      {
        text: "Her argument, while superficially compelling, was ultimately _____, built on premises that could not withstand rigorous scrutiny.",
        options: ["specious", "spurious", "fallacious", "erroneous"],
        correctAnswer: 0,
        explanation: "'Specious' specifically means superficially plausible but actually wrong, perfectly matching the contrast between 'compelling' and unsound premises.",
      },
      {
        text: "The senator's speech was characterized by its _____ tone, skillfully avoiding any commitment while appearing to address every concern.",
        options: ["evasive", "equivocal", "ambiguous", "vague"],
        correctAnswer: 1,
        explanation: "'Equivocal' means deliberately ambiguous to mislead, capturing the skillful avoidance while appearing responsive.",
      },
      {
        text: "The novelist's prose style is distinctly _____, marked by elaborate sentences that seem to luxuriate in their own complexity.",
        options: ["ornate", "florid", "baroque", "grandiloquent"],
        correctAnswer: 1,
        explanation: "'Florid' suggests excessive ornamentation and self-indulgent elaboration, fitting with 'luxuriate in their own complexity'.",
      },
      {
        text: "His _____ manner of speaking, while impressive to some, often alienated audiences who found it pretentious.",
        options: ["erudite", "pedantic", "scholarly", "learned"],
        correctAnswer: 1,
        explanation: "'Pedantic' implies showing off learning in an irritating way, explaining why it would alienate audiences as pretentious.",
      },
    ],
  },

  literary_syntax: {
    title: "Syntaxe Littéraire",
    description: "Maîtrisez les structures syntaxiques les plus sophistiquées",
    icon: "✒️",
    questions: [
      {
        text: "_____ the profound implications of this discovery, we can only speculate about its long-term significance.",
        options: ["As to", "As for", "As regards", "As with"],
        correctAnswer: 0,
        explanation: "'As to' introduces uncertainty or speculation about something, fitting perfectly with 'we can only speculate'.",
      },
      {
        text: "The committee, _____ its initial enthusiasm, ultimately rejected the proposal.",
        options: ["notwithstanding", "despite of", "for all", "in spite"],
        correctAnswer: 2,
        explanation: "'For all' (meaning 'despite') is the most literary and sophisticated form here.",
      },
      {
        text: "Seldom _____ such a comprehensive analysis of the economic factors at play.",
        options: ["have we seen", "we have seen", "did we see", "we saw"],
        correctAnswer: 0,
        explanation: "After 'seldom' at the beginning, use present perfect with inversion: 'seldom have we seen'.",
      },
      {
        text: "The author's technique, _____ it may appear, serves a deliberate aesthetic purpose.",
        options: ["however unconventional", "unconventional as", "despite unconventional", "for all unconventional"],
        correctAnswer: 1,
        explanation: "Adjective fronting 'unconventional as it may appear' is a sophisticated literary construction.",
      },
      {
        text: "_____ to understand the complexity of the situation, one must examine its historical context.",
        options: ["If one is", "Were one", "Should one wish", "One must"],
        correctAnswer: 1,
        explanation: "'Were one' is a formal literary construction equivalent to 'If one were' but more elegant.",
      },
    ],
  },

  specialized_registers: {
    title: "Registres Spécialisés",
    description: "Maîtrisez les langages juridique, académique et technique",
    icon: "⚖️",
    questions: [
      {
        text: "In legal contexts, what does 'ex parte' mean?",
        options: ["From the party", "On behalf of one party only", "Outside the party", "Former party"],
        correctAnswer: 1,
        explanation: "'Ex parte' refers to legal proceedings conducted for the benefit of one party without notice to or presence of other parties.",
      },
      {
        text: "In academic discourse, 'sui generis' refers to something that is:",
        options: ["Generally accepted", "Of its own kind/unique", "Scientifically proven", "Systematically organized"],
        correctAnswer: 1,
        explanation: "'Sui generis' (Latin) means constituting a class alone; unique or peculiar to itself.",
      },
      {
        text: "The philosophical concept of 'a priori' knowledge refers to knowledge that is:",
        options: ["Gained through experience", "Independent of experience", "Previously established", "Prioritized above others"],
        correctAnswer: 1,
        explanation: "'A priori' knowledge is that which can be known independently of experience, through reason alone.",
      },
      {
        text: "In formal rhetoric, 'ipso facto' means:",
        options: ["In actual fact", "By the fact itself", "After the fact", "Despite the facts"],
        correctAnswer: 1,
        explanation: "'Ipso facto' means by the fact itself; by the very nature of the fact mentioned.",
      },
      {
        text: "The term 'sine qua non' in formal writing refers to:",
        options: ["Something without question", "An essential condition", "A final conclusion", "A questionable assumption"],
        correctAnswer: 1,
        explanation: "'Sine qua non' means an essential condition; something absolutely necessary.",
      },
    ],
  },

  cultural_allusions: {
    title: "Allusions Culturelles",
    description: "Comprenez les références culturelles et historiques implicites",
    icon: "🏛️",
    questions: [
      {
        text: "When someone says 'It's a Pyrrhic victory,' they mean:",
        options: ["A glorious triumph", "A victory won at too great a cost", "A victory by fire", "An ancient victory"],
        correctAnswer: 1,
        explanation: "A Pyrrhic victory (from King Pyrrhus) is one won at such great cost that it's tantamount to defeat.",
      },
      {
        text: "'He's a real Machiavellian character' suggests someone who is:",
        options: ["Italian", "Politically cunning and unscrupulous", "Very intelligent", "From the Renaissance"],
        correctAnswer: 1,
        explanation: "Machiavellian refers to cunning, scheming, and unscrupulous political behavior, from Niccolò Machiavelli's 'The Prince'.",
      },
      {
        text: "Describing an argument as 'Kafkaesque' implies it is:",
        options: ["From Czech literature", "Absurdly complex and nightmarish", "Very logical", "Coffee-related"],
        correctAnswer: 1,
        explanation: "Kafkaesque describes situations that are absurdly complex, illogical, and nightmarish, like Franz Kafka's writings.",
      },
      {
        text: "A 'Faustian bargain' refers to:",
        options: ["A good deal", "Trading something valuable for immediate gain", "A German agreement", "A musical arrangement"],
        correctAnswer: 1,
        explanation: "A Faustian bargain involves sacrificing something important (like one's soul) for immediate power or gain, from the Faust legend.",
      },
      {
        text: "When someone mentions 'tilting at windmills,' they're referring to:",
        options: ["Alternative energy", "Fighting imaginary enemies", "Spanish culture", "Medieval combat"],
        correctAnswer: 1,
        explanation: "From Don Quixote, 'tilting at windmills' means fighting imaginary enemies or attacking problems that don't exist.",
      },
    ],
  },

  subtle_humor: {
    title: "Humour & Ironie Sophistiqués",
    description: "Décodez l'humour subtil, l'ironie et les double-sens",
    icon: "😏",
    questions: [
      {
        text: "'The politician's speech was notably brief—a refreshing change that lasted all of three minutes.' The humor here comes from:",
        options: ["The politician's honesty", "The ironic use of 'refreshing' for something very short", "The accurate timing", "The positive description"],
        correctAnswer: 1,
        explanation: "The irony is calling three minutes 'refreshing' for being brief, when three minutes is actually very short for any speech.",
      },
      {
        text: "'I love working weekends,' she said, 'especially when it's mandatory fun.' The phrase 'mandatory fun' is:",
        options: ["Literally accurate", "An oxymoron highlighting workplace absurdity", "A positive description", "A scheduling term"],
        correctAnswer: 1,
        explanation: "'Mandatory fun' is an oxymoron—fun cannot be mandatory—highlighting the absurdity of forced workplace activities.",
      },
      {
        text: "'With friends like these, who needs enemies?' This expression uses:",
        options: ["Genuine gratitude", "Rhetorical irony", "Literal comparison", "Honest appreciation"],
        correctAnswer: 1,
        explanation: "This is rhetorical irony suggesting that the 'friends' are so bad they're worse than enemies would be.",
      },
      {
        text: "'The budget meeting was so exciting, I nearly stayed awake.' This employs:",
        options: ["Literal description", "Understatement for ironic effect", "Genuine enthusiasm", "Accurate reporting"],
        correctAnswer: 1,
        explanation: "This is ironic understatement—'nearly stayed awake' ironically emphasizes how boring the meeting was.",
      },
      {
        text: "'His presentation had all the energy of a sedated sloth.' This is an example of:",
        options: ["Zoological accuracy", "Hyperbolic simile for humorous effect", "Scientific comparison", "Literal description"],
        correctAnswer: 1,
        explanation: "This is a hyperbolic simile combining the naturally slow sloth with 'sedated' for comic emphasis of extreme dullness.",
      },
    ],
  },

  philosophical_discourse: {
    title: "Discours Philosophique",
    description: "Analysez les concepts abstraits et les arguments philosophiques",
    icon: "🤔",
    questions: [
      {
        text: "In epistemology, the problem of 'infinite regress' in justification refers to:",
        options: ["Going backwards in time", "The endless chain of 'why' questions", "Circular reasoning", "Mathematical infinity"],
        correctAnswer: 1,
        explanation: "Infinite regress occurs when every justification for a belief requires another justification, creating an endless chain.",
      },
      {
        text: "The philosophical concept of 'qualia' relates to:",
        options: ["Quantity", "Quality of conscious experience", "Qualifications", "Questions"],
        correctAnswer: 1,
        explanation: "Qualia are the subjective, experiential qualities of conscious states—like the 'redness' of red or the 'painfulness' of pain.",
      },
      {
        text: "In ethics, 'moral relativism' suggests that:",
        options: ["Morals are related to religion", "Ethical truths are relative to context", "Family relationships matter", "Morals are absolutely fixed"],
        correctAnswer: 1,
        explanation: "Moral relativism holds that ethical judgments are not absolutely true but relative to culture, society, or individual perspectives.",
      },
      {
        text: "The 'naturalistic fallacy' in philosophy refers to:",
        options: ["Errors about nature", "Deriving 'ought' from 'is'", "Natural logical mistakes", "Fallacies in science"],
        correctAnswer: 1,
        explanation: "The naturalistic fallacy is the error of deriving normative conclusions (what ought to be) from descriptive premises (what is).",
      },
      {
        text: "In metaphysics, the 'hard problem of consciousness' concerns:",
        options: ["Difficult mental calculations", "Why we have subjective experience", "Brain surgery challenges", "Psychological disorders"],
        correctAnswer: 1,
        explanation: "The hard problem asks why and how physical processes give rise to subjective, first-person conscious experience.",
      },
    ],
  },

  stylistic_mastery: {
    title: "Maîtrise Stylistique",
    description: "Adaptez le style selon le contexte avec finesse",
    icon: "🎨",
    questions: [
      {
        text: "Which response best maintains appropriate academic distance while acknowledging error?",
        options: [
          "I was wrong and I'm sorry.",
          "Upon reflection, my initial analysis appears to have been somewhat hasty.",
          "I made a mistake in my reasoning.",
          "My earlier conclusion was incorrect."
        ],
        correctAnswer: 1,
        explanation: "'Upon reflection, my initial analysis appears to have been somewhat hasty' maintains academic tone with appropriate hedging and distance.",
      },
      {
        text: "In a diplomatic context, how would you express strong disagreement?",
        options: [
          "We categorically reject this proposal.",
          "We find ourselves unable to reconcile this approach with our fundamental principles.",
          "This idea is completely unacceptable.",
          "We strongly disagree with this suggestion."
        ],
        correctAnswer: 1,
        explanation: "The diplomatic version uses formal language and focuses on incompatibility rather than direct rejection.",
      },
      {
        text: "Which phrasing shows the most sophisticated literary criticism?",
        options: [
          "The novel is very good and well-written.",
          "The author's narrative technique demonstrates considerable sophistication.",
          "The novelist's deployment of unreliable narration serves to interrogate the very foundations of textual authority.",
          "This book has excellent storytelling."
        ],
        correctAnswer: 2,
        explanation: "The third option uses sophisticated critical vocabulary and analyzes technique at a meta-textual level.",
      },
      {
        text: "In formal academic writing, which transition is most sophisticated?",
        options: [
          "But this view has problems.",
          "However, this perspective is problematic.",
          "This conceptualization, while intuitively appealing, proves problematic upon closer scrutiny.",
          "There are issues with this idea."
        ],
        correctAnswer: 2,
        explanation: "This version acknowledges initial appeal while introducing criticism through sophisticated academic phrasing.",
      },
      {
        text: "Which demonstrates the highest register for expressing uncertainty?",
        options: [
          "I'm not sure about this.",
          "This remains uncertain.",
          "The extent to which this holds true remains a matter of some conjecture.",
          "This might not be correct."
        ],
        correctAnswer: 2,
        explanation: "This uses formal vocabulary ('extent', 'conjecture') and complex syntax to express sophisticated uncertainty.",
      },
    ],
  },

  metalinguistic_awareness: {
    title: "Conscience Métalinguistique",
    description: "Analysez le langage sur le langage",
    icon: "🔍",
    questions: [
      {
        text: "The statement 'This sentence is false' creates what logical problem?",
        options: ["Grammatical error", "Semantic paradox", "Syntactic ambiguity", "Pragmatic failure"],
        correctAnswer: 1,
        explanation: "This creates a semantic paradox: if true, it's false; if false, it's true—demonstrating self-reference problems.",
      },
      {
        text: "When someone says 'I could care less' but means 'I couldn't care less,' this represents:",
        options: ["Semantic drift", "Pragmatic reanalysis", "Syntactic change", "Phonetic evolution"],
        correctAnswer: 1,
        explanation: "This is pragmatic reanalysis where the literal meaning has been reinterpreted through usage to mean the opposite.",
      },
      {
        text: "The phrase 'That's so random' (meaning 'unexpected') shows language:",
        options: ["Deteriorating", "Expanding metaphorically", "Becoming more precise", "Following rules strictly"],
        correctAnswer: 1,
        explanation: "This shows metaphorical expansion—'random' (statistical term) extended to mean 'unexpected' in casual speech.",
      },
      {
        text: "When academics write 'It could be argued that...' they're often:",
        options: ["Being genuinely uncertain", "Presenting their own view indirectly", "Quoting others", "Showing confusion"],
        correctAnswer: 1,
        explanation: "This hedge often allows authors to present their own controversial views while maintaining scholarly distance.",
      },
      {
        text: "The euphemism 'downsizing' for 'firing employees' demonstrates:",
        options: ["Linguistic precision", "Corporate jargon as face-saving", "Technical terminology", "Clear communication"],
        correctAnswer: 1,
        explanation: "'Downsizing' softens the harsh reality of job loss through abstract corporate language.",
      },
    ],
  },

  error_correction_native: {
    title: "Erreurs de Niveau Natif",
    description: "Identifiez les erreurs subtiles que font même les locuteurs natifs",
    icon: "✏️",
    questions: [
      {
        text: "Which sentence is correct?",
        options: [
          "Hopefully, the weather will improve tomorrow.",
          "It is hoped that the weather will improve tomorrow.",
          "I hope the weather will improve tomorrow.",
          "Both B and C are correct."
        ],
        correctAnswer: 3,
        explanation: "Traditional grammar objects to 'hopefully' as a sentence adverb, preferring 'it is hoped' or 'I hope', though usage is evolving.",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "The reason is because costs have increased.",
          "The reason is that costs have increased.",
          "The reason is due to increased costs.",
          "Both B and C are correct."
        ],
        correctAnswer: 1,
        explanation: "'The reason is because' is redundant (both words indicate causation). Use 'the reason is that' or 'this is because'.",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "Between you and I, this is confidential.",
          "Between you and myself, this is confidential.",
          "Between you and me, this is confidential.",
          "Between I and you, this is confidential."
        ],
        correctAnswer: 2,
        explanation: "After prepositions, use object pronouns: 'between you and me' (not 'I' or 'myself').",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "The media are reporting conflicting stories.",
          "The media is reporting conflicting stories.",
          "Both are acceptable depending on context.",
          "Neither is correct."
        ],
        correctAnswer: 2,
        explanation: "'Media' is traditionally plural but increasingly treated as singular in modern usage, especially in journalism.",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "If I was you, I would reconsider.",
          "If I were you, I would reconsider.",
          "Both are equally correct.",
          "Neither follows proper grammar."
        ],
        correctAnswer: 1,
        explanation: "Subjunctive 'were' is correct in hypothetical conditionals, though 'was' is increasingly common in speech.",
      },
    ],
  },

  literary_analysis: {
    title: "Analyse Littéraire Sophistiquée",
    description: "Analysez des textes littéraires avec expertise critique",
    icon: "📚",
    questions: [
      {
        text: "Read this passage: 'The city stretched before them like a vast organism, its arteries pulsing with the lifeblood of commerce, while in the shadowed recesses, the forgotten dreamed their forgotten dreams.' This employs:",
        options: ["Simple description", "Extended organic metaphor", "Historical allegory", "Religious symbolism"],
        correctAnswer: 1,
        explanation: "The passage uses extended organic metaphor: city as organism, streets as arteries, commerce as lifeblood, creating a living entity.",
      },
      {
        text: "In the context 'The silence spoke volumes about their relationship,' the figure of speech serves to:",
        options: ["Describe quietness", "Emphasize meaningful absence of communication", "Create confusion", "Provide literal information"],
        correctAnswer: 1,
        explanation: "The oxymoron 'silence spoke' emphasizes how the absence of words reveals relationship problems more than words could.",
      },
      {
        text: "A narrative that begins with 'In the end, it was the roses that betrayed her' employs which technique?",
        options: ["Chronological order", "In medias res", "Proleptic irony", "Character exposition"],
        correctAnswer: 2,
        explanation: "Starting with the end result ('betrayed') while referencing something seemingly innocent ('roses') creates proleptic irony.",
      },
      {
        text: "The phrase 'time's winged chariot' (from Marvell) exemplifies:",
        options: ["Literal transportation", "Metaphysical conceit", "Simple metaphor", "Historical reference"],
        correctAnswer: 1,
        explanation: "This is a metaphysical conceit—an elaborate, intellectually surprising metaphor comparing time to a chariot with wings.",
      },
      {
        text: "When a text's narrator says 'What fools these mortals be!' while being clearly mortal themselves, this creates:",
        options: ["Character consistency", "Dramatic irony", "Narrative reliability", "Thematic clarity"],
        correctAnswer: 1,
        explanation: "This creates dramatic irony—the reader sees the contradiction that the narrator doesn't acknowledge.",
      },
    ],
  },
};
