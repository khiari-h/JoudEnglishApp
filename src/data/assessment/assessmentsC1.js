// src/data/assessments/AssessmentC1.js

export default {
  level: "C1",
  description: "Évaluez vos compétences d'utilisateur expérimenté en anglais niveau C1",
  totalQuestions: 50,
  timeLimit: 80, // minutes
  passScore: 90, // pourcentage

  sophisticated_vocabulary: {
    title: "Vocabulaire Sophistiqué",
    description: "Maîtrisez le vocabulaire académique et professionnel avancé",
    icon: "📚",
    questions: [
      {
        text: "The senator's comments were widely criticized as being _____ and inflammatory, designed more to provoke than to inform.",
        options: ["erudite", "incendiary", "meticulous", "prosaic"],
        correctAnswer: 1,
        explanation: "'Incendiary' means intended to cause strong feelings or violence, fitting with 'inflammatory' and 'provoke'.",
      },
      {
        text: "Her _____ approach to problem-solving, while time-consuming, invariably yields thorough and reliable results.",
        options: ["haphazard", "superficial", "methodical", "expedient"],
        correctAnswer: 2,
        explanation: "'Methodical' means systematic and orderly, which explains why results are thorough despite being time-consuming.",
      },
      {
        text: "The author's _____ style makes even complex philosophical concepts accessible to the general reader.",
        options: ["pedantic", "lucid", "convoluted", "esoteric"],
        correctAnswer: 1,
        explanation: "'Lucid' means clear and easy to understand, making complex ideas accessible.",
      },
      {
        text: "The company's decision to _____ environmental concerns in favor of short-term profits proved costly in the long run.",
        options: ["prioritize", "circumvent", "address", "acknowledge"],
        correctAnswer: 1,
        explanation: "'Circumvent' means to find a way around or avoid, which fits ignoring concerns for profits.",
      },
      {
        text: "The documentary's _____ portrayal of historical events has been praised by scholars for its balanced perspective.",
        options: ["partisan", "cursory", "dispassionate", "sensationalized"],
        correctAnswer: 2,
        explanation: "'Dispassionate' means unemotional and impartial, leading to a balanced perspective that scholars would praise.",
      },
    ],
  },

  advanced_syntax: {
    title: "Syntaxe Avancée",
    description: "Maîtrisez les structures syntaxiques les plus complexes",
    icon: "📝",
    questions: [
      {
        text: "_____ the committee to approve the proposal, significant changes would need to be made.",
        options: ["For", "Were", "Should", "Were we"],
        correctAnswer: 1,
        explanation: "Formal conditional inversion: 'Were the committee to approve' = 'If the committee were to approve'.",
      },
      {
        text: "Little _____ that their decision would have such far-reaching consequences.",
        options: ["they knew", "did they know", "they did know", "knew they"],
        correctAnswer: 1,
        explanation: "After negative adverbs like 'little', use inversion: 'little did they know'.",
      },
      {
        text: "_____ as the proposal may seem, it addresses several critical issues.",
        options: ["Controversial", "However controversial", "Despite controversial", "Although controversial"],
        correctAnswer: 0,
        explanation: "Adjective fronting for emphasis: 'Controversial as it may seem' = 'Although it may seem controversial'.",
      },
      {
        text: "The research, _____ groundbreaking, raises ethical questions that cannot be ignored.",
        options: ["while being", "despite being", "for all its being", "however"],
        correctAnswer: 2,
        explanation: "'For all its being' is a sophisticated way to express 'despite being' or 'although it is'.",
      },
      {
        text: "Not only _____ the new policy controversial, but it also lacks scientific backing.",
        options: ["is", "it is", "does", "has"],
        correctAnswer: 0,
        explanation: "After 'not only' at the start, use inversion: 'not only is the policy'.",
      },
    ],
  },

  stylistic_nuances: {
    title: "Nuances Stylistiques",
    description: "Distinguez les subtilités de registre et de ton",
    icon: "🎨",
    questions: [
      {
        text: "Which response shows the most diplomatic disagreement in an academic context?",
        options: [
          "I fundamentally disagree with your position",
          "While I appreciate your perspective, I would venture to suggest an alternative view",
          "Your argument is flawed",
          "I'm afraid you're quite wrong about that"
        ],
        correctAnswer: 1,
        explanation: "'While I appreciate... I would venture to suggest' is maximally diplomatic and academic in tone.",
      },
      {
        text: "In literary criticism, which phrase indicates subtle disapproval?",
        options: [
          "The work is masterful",
          "The work is competent",
          "The work is adequate",
          "The work is not without merit"
        ],
        correctAnswer: 3,
        explanation: "'Not without merit' is diplomatic understatement suggesting mediocrity with faint praise.",
      },
      {
        text: "Which phrase suggests ironic understatement?",
        options: [
          "The hurricane caused some inconvenience",
          "The hurricane was devastating",
          "The hurricane was terrible",
          "The hurricane was destructive"
        ],
        correctAnswer: 0,
        explanation: "Calling a hurricane 'some inconvenience' is classic understatement/irony given its severity.",
      },
      {
        text: "In formal academic writing, how would you express strong certainty?",
        options: [
          "I'm absolutely sure that",
          "It is incontrovertible that",
          "Everyone knows that",
          "Obviously"
        ],
        correctAnswer: 1,
        explanation: "'Incontrovertible' is formal and academic, meaning impossible to dispute or deny.",
      },
      {
        text: "Which phrase indicates polite skepticism in professional discourse?",
        options: [
          "That's impossible",
          "I find that somewhat difficult to reconcile with",
          "You're wrong",
          "I don't believe you"
        ],
        correctAnswer: 1,
        explanation: "'Difficult to reconcile with' is diplomatic language expressing doubt or skepticism professionally.",
      },
    ],
  },

  idiomatic_expressions: {
    title: "Expressions Idiomatiques",
    description: "Maîtrisez les expressions idiomatiques sophistiquées",
    icon: "🌟",
    questions: [
      {
        text: "The new CEO promised to _____ the company's outdated practices.",
        options: ["sweep under the rug", "turn over a new leaf", "make a clean sweep of", "beat around the bush"],
        correctAnswer: 2,
        explanation: "'Make a clean sweep of' means to completely eliminate or reform something.",
      },
      {
        text: "Despite initial setbacks, the project is now _____ smoothly.",
        options: ["running like clockwork", "going against the grain", "cutting corners", "burning bridges"],
        correctAnswer: 0,
        explanation: "'Running like clockwork' means operating very smoothly and efficiently.",
      },
      {
        text: "His tendency to _____ during meetings frustrates his colleagues.",
        options: ["spill the beans", "beat around the bush", "break the ice", "let the cat out of the bag"],
        correctAnswer: 1,
        explanation: "'Beat around the bush' means to avoid talking directly about a topic, which would frustrate colleagues.",
      },
      {
        text: "The negotiations reached a _____ when neither side would compromise.",
        options: ["turning point", "stumbling block", "sticking point", "breaking point"],
        correctAnswer: 2,
        explanation: "'Sticking point' refers to an issue that prevents agreement or progress in negotiations.",
      },
      {
        text: "After the scandal, the politician tried to _____ but the damage was done.",
        options: ["save face", "face the music", "lose face", "show face"],
        correctAnswer: 0,
        explanation: "'Save face' means to preserve one's reputation or dignity after a mistake or failure.",
      },
    ],
  },

  rhetorical_devices: {
    title: "Argumentation & Rhétorique",
    description: "Analysez les techniques argumentatives sophistiquées",
    icon: "🎯",
    questions: [
      {
        text: "The speaker's use of 'We must ask ourselves...' is an example of:",
        options: ["Direct statement", "Rhetorical question", "Inclusive rhetoric", "Logical fallacy"],
        correctAnswer: 2,
        explanation: "'We must ask ourselves' creates inclusive rhetoric, involving the audience in the thinking process.",
      },
      {
        text: "'Either we act now, or we face catastrophe.' This statement uses:",
        options: ["False dichotomy", "Valid comparison", "Logical progression", "Neutral analysis"],
        correctAnswer: 0,
        explanation: "This presents only two extreme options, which is a false dichotomy - there may be other alternatives.",
      },
      {
        text: "When a politician says 'My opponent wants to destroy our way of life,' this is:",
        options: ["Factual reporting", "Emotional appeal", "Logical argument", "Statistical evidence"],
        correctAnswer: 1,
        explanation: "This uses emotional language ('destroy our way of life') to appeal to fears rather than present facts.",
      },
      {
        text: "'Studies show, experts agree, data indicates...' This repetitive structure is:",
        options: ["Redundant", "Anaphora for emphasis", "Poor style", "Accidental repetition"],
        correctAnswer: 1,
        explanation: "Anaphora is the deliberate repetition of similar phrase structures for rhetorical emphasis.",
      },
      {
        text: "'The proposal deserves consideration' vs 'The proposal demands immediate action.' The difference is:",
        options: ["Factual vs emotional", "Passive vs active voice", "Weak vs strong modal force", "Past vs present tense"],
        correctAnswer: 2,
        explanation: "'Deserves consideration' is weaker than 'demands action' - different degrees of modal force.",
      },
    ],
  },

  implicit_meaning: {
    title: "Sens Implicite & Sous-entendus",
    description: "Décodez les messages indirects et les implications",
    icon: "🔍",
    questions: [
      {
        text: "'Your report is... thorough.' (said with hesitation) This likely means:",
        options: ["The report is excellent", "The report is too long/detailed", "The report is incomplete", "The report is perfect"],
        correctAnswer: 1,
        explanation: "Hesitation before 'thorough' suggests diplomatic criticism - likely too long or unnecessarily detailed.",
      },
      {
        text: "'I'm sure you did your best.' This comment typically implies:",
        options: ["Genuine praise", "Faint praise/disappointment", "Strong approval", "Neutral observation"],
        correctAnswer: 1,
        explanation: "'I'm sure you did your best' often implies the result wasn't good enough despite effort.",
      },
      {
        text: "'That's certainly one way to look at it.' This response suggests:",
        options: ["Agreement", "Polite disagreement", "Confusion", "Enthusiasm"],
        correctAnswer: 1,
        explanation: "This is diplomatic language suggesting there are other (better) ways to view the situation.",
      },
      {
        text: "When someone says 'How interesting...' in a flat tone, they likely mean:",
        options: ["They find it fascinating", "They're genuinely curious", "They're being sarcastic/dismissive", "They want more information"],
        correctAnswer: 2,
        explanation: "A flat tone with 'How interesting' typically indicates sarcasm or polite dismissal.",
      },
      {
        text: "'We'll give your proposal the consideration it deserves.' This probably means:",
        options: ["Careful review promised", "Rejection likely", "Immediate approval", "Request for more information"],
        correctAnswer: 1,
        explanation: "This is often diplomatic language for rejection - if the proposal lacks merit, it 'deserves' little consideration.",
      },
    ],
  },

  complex_modality: {
    title: "Modalité Complexe",
    description: "Maîtrisez les nuances de modalité avancées",
    icon: "🌀",
    questions: [
      {
        text: "He _____ have been more careful with his words, given the sensitive nature of the topic.",
        options: ["should", "could", "might", "would"],
        correctAnswer: 1,
        explanation: "'Could have been' expresses a missed opportunity or possibility that wasn't realized.",
      },
      {
        text: "The data _____ suggest a correlation, but we need more research to establish causation.",
        options: ["may well", "can't", "mustn't", "won't"],
        correctAnswer: 0,
        explanation: "'May well' expresses tentative possibility with some confidence but acknowledging uncertainty.",
      },
      {
        text: "You _____ told me about the meeting earlier! (strong reproach)",
        options: ["should have", "could have", "might have", "would have"],
        correctAnswer: 1,
        explanation: "'Could have' here expresses strong reproach - you had the ability/opportunity but didn't do it.",
      },
      {
        text: "The results _____ be more conclusive if we had a larger sample size.",
        options: ["will", "would", "should", "must"],
        correctAnswer: 1,
        explanation: "'Would be' expresses a hypothetical situation - if we had larger sample, results would be more conclusive.",
      },
      {
        text: "She _____ be the most qualified candidate, but her interview performance was disappointing.",
        options: ["may", "might", "could", "can"],
        correctAnswer: 0,
        explanation: "'May be' acknowledges possibility while introducing a contrasting point with 'but'.",
      },
    ],
  },

  textual_cohesion: {
    title: "Cohésion Textuelle",
    description: "Maîtrisez les liens logiques sophistiqués",
    icon: "🔗",
    questions: [
      {
        text: "The proposal has merit. _____, its implementation would require substantial resources.",
        options: ["Moreover", "Be that as it may", "In addition", "Similarly"],
        correctAnswer: 1,
        explanation: "'Be that as it may' acknowledges the previous point while introducing a contrasting consideration.",
      },
      {
        text: "The study's findings are significant. _____, they should be interpreted with caution.",
        options: ["Furthermore", "That notwithstanding", "Likewise", "Accordingly"],
        correctAnswer: 1,
        explanation: "'That notwithstanding' means 'despite that' - acknowledging significance while urging caution.",
      },
      {
        text: "The theory appears sound _____ the limited evidence available.",
        options: ["in spite of", "given", "regardless of", "by virtue of"],
        correctAnswer: 1,
        explanation: "'Given' introduces the condition/context - the theory seems sound considering the evidence limitation.",
      },
      {
        text: "_____ the challenges, the project proceeded on schedule.",
        options: ["Notwithstanding", "Because of", "Due to", "Owing to"],
        correctAnswer: 0,
        explanation: "'Notwithstanding' means 'despite' or 'in spite of' - challenges didn't prevent progress.",
      },
      {
        text: "The policy has been criticized. _____, it has some merit worth considering.",
        options: ["Therefore", "For all that", "Consequently", "Thus"],
        correctAnswer: 1,
        explanation: "'For all that' means 'despite everything mentioned' - acknowledging criticism while finding merit.",
      },
    ],
  },

  error_correction_subtle: {
    title: "Correction d'Erreurs Subtiles",
    description: "Identifiez les erreurs dans l'usage le plus sophistiqué",
    icon: "✏️",
    questions: [
      {
        text: "Which sentence is correct?",
        options: [
          "The data supports our hypothesis.",
          "The data support our hypothesis.",
          "The data is supporting our hypothesis.",
          "The data has supported our hypothesis."
        ],
        correctAnswer: 1,
        explanation: "In formal academic writing, 'data' is plural, so it takes 'support' not 'supports'.",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "He is one of those people who always gets what he wants.",
          "He is one of those people who always get what they want.",
          "He is one of those people who always get what he wants.",
          "He is one of those people who always gets what they want."
        ],
        correctAnswer: 1,
        explanation: "'One of those people who' takes plural verb (get) and pronoun (they) referring to 'people'.",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "Neither the professor nor his students was satisfied with the results.",
          "Neither the professor nor his students were satisfied with the results.",
          "Neither the professor nor his students are satisfied with the results.",
          "Neither the professor nor his students is satisfied with the results."
        ],
        correctAnswer: 1,
        explanation: "With 'neither...nor', the verb agrees with the closest subject ('students' = plural 'were').",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "I could care less about his opinion.",
          "I couldn't care less about his opinion.",
          "I could care fewer about his opinion.",
          "I couldn't care fewer about his opinion."
        ],
        correctAnswer: 1,
        explanation: "'I couldn't care less' is correct - meaning I care so little that I couldn't care any less.",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "The committee decided to forego with their original plan.",
          "The committee decided to forgo their original plan.",
          "The committee decided to forgo with their original plan.",
          "The committee decided to foregoe their original plan."
        ],
        correctAnswer: 1,
        explanation: "'Forgo' (not 'forego') means to do without, and doesn't take 'with'.",
      },
    ],
  },

  critical_analysis: {
    title: "Analyse Critique Avancée",
    description: "Analysez des textes complexes avec une profondeur critique",
    icon: "📖",
    questions: [
      {
        text: "Read: 'The author's ostensibly objective analysis betrays a subtle but unmistakable bias toward technological determinism, evident not in what is explicitly stated, but in the absence of any serious consideration of social agency in shaping technological outcomes.' What criticism is being made?",
        options: [
          "The analysis is too technical",
          "The author favors technology over social factors",
          "The analysis is too short",
          "The author is against technology"
        ],
        correctAnswer: 1,
        explanation: "The criticism is that despite claiming objectivity, the author shows bias toward 'technological determinism' by not considering 'social agency'.",
      },
      {
        text: "Read: 'While the minister's rhetoric emphasized transparency and accountability, the actual implementation of the policy suggests a rather different set of priorities, revealing a troubling disconnect between public pronouncements and administrative practice.' What disconnect is identified?",
        options: [
          "Between rhetoric and implementation",
          "Between ministers and the public",
          "Between policy and law",
          "Between transparency and secrecy"
        ],
        correctAnswer: 0,
        explanation: "The disconnect is between what was said (rhetoric about transparency) and what was done (implementation suggesting different priorities).",
      },
      {
        text: "Read: 'The study's methodology, while adhering to conventional standards, may inadvertently perpetuate the very assumptions it purports to examine critically. By employing traditional frameworks without questioning their underlying premises, the researchers risk reproducing rather than challenging existing paradigms.' What methodological concern is raised?",
        options: [
          "The study is too unconventional",
          "Traditional methods may reinforce what they study",
          "The researchers lack training",
          "The study is too short"
        ],
        correctAnswer: 1,
        explanation: "The concern is that using traditional frameworks without questioning them may 'reproduce rather than challenge existing paradigms'.",
      },
      {
        text: "Read: 'The novelist's apparent simplicity masks a sophisticated understanding of narrative structure. What initially appears to be straightforward storytelling reveals itself, upon closer examination, to be a carefully orchestrated critique of contemporary social mores, delivered through seemingly innocent observations.' What literary technique is described?",
        options: [
          "Direct criticism",
          "Sophisticated simplicity/irony",
          "Traditional storytelling",
          "Complex vocabulary"
        ],
        correctAnswer: 1,
        explanation: "The technique is using 'apparent simplicity' to mask 'sophisticated understanding' - ironic simplicity for deeper critique.",
      },
      {
        text: "Read: 'The economist's model, elegant in its mathematical formulation, nevertheless suffers from a fundamental flaw: it abstracts away the very human factors that drive economic behavior. In privileging quantifiable variables over qualitative insights, the model achieves precision at the cost of explanatory power.' What critique is offered?",
        options: [
          "The math is wrong",
          "Precision comes at cost of real understanding",
          "The model is too simple",
          "Economic behavior can't be studied"
        ],
        correctAnswer: 1,
        explanation: "The critique is that by focusing on quantifiable data over human factors, the model 'achieves precision at the cost of explanatory power'.",
      },
    ],
  },
};