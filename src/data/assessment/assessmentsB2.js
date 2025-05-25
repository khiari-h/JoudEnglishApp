// src/data/assessments/AssessmentB2.js

export default {
  level: "B2",
  description: "Évaluez vos compétences avancées en anglais niveau B2",
  totalQuestions: 50,
  timeLimit: 70, // minutes
  passScore: 85, // pourcentage

  vocabulary_context: {
    title: "Vocabulaire en Contexte",
    description: "Testez votre maîtrise du vocabulaire sophistiqué",
    icon: "📚",
    questions: [
      {
        text: "The politician's speech was deliberately _____ to avoid taking a clear stance on the controversial issue.",
        options: ["ambiguous", "transparent", "decisive", "articulate"],
        correctAnswer: 0,
        explanation: "'Ambiguous' means unclear or open to more than one interpretation, which fits avoiding a clear stance.",
      },
      {
        text: "The company's _____ approach to environmental issues has earned them widespread criticism.",
        options: ["proactive", "negligent", "innovative", "comprehensive"],
        correctAnswer: 1,
        explanation: "'Negligent' means failing to take proper care, which would lead to criticism on environmental issues.",
      },
      {
        text: "Her _____ for languages is evident in her ability to speak six fluently.",
        options: ["aptitude", "attitude", "gratitude", "amplitude"],
        correctAnswer: 0,
        explanation: "'Aptitude' means natural ability or talent, which explains her language skills.",
      },
      {
        text: "The documentary provides a _____ analysis of the economic crisis.",
        options: ["superficial", "comprehensive", "biased", "outdated"],
        correctAnswer: 1,
        explanation: "'Comprehensive' means complete and including everything, suggesting thorough analysis.",
      },
      {
        text: "The new regulations aim to _____ the gap between rich and poor.",
        options: ["widen", "diminish", "ignore", "exploit"],
        correctAnswer: 1,
        explanation: "'Diminish' means to make smaller or reduce, which fits reducing inequality.",
      },
    ],
  },

  advanced_grammar: {
    title: "Grammaire Avancée",
    description: "Maîtrisez les structures grammaticales sophistiquées",
    icon: "📝",
    questions: [
      {
        text: "Hardly _____ the meeting started when the fire alarm went off.",
        options: ["did", "had", "was", "has"],
        correctAnswer: 1,
        explanation: "After 'hardly' at the beginning of a sentence, we use inversion with past perfect: 'hardly had'.",
      },
      {
        text: "It was the team's dedication _____ made the project successful.",
        options: ["what", "that", "which", "who"],
        correctAnswer: 1,
        explanation: "Cleft sentence 'It was... that...' emphasizes 'the team's dedication'.",
      },
      {
        text: "_____ she studied harder, she wouldn't have failed the exam.",
        options: ["If only", "Should", "Had", "Were"],
        correctAnswer: 2,
        explanation: "Inversion in third conditional: 'Had she studied' = 'If she had studied'.",
      },
      {
        text: "The sooner we leave, _____ we'll arrive.",
        options: ["the earlier", "the more early", "the earliest", "earlier"],
        correctAnswer: 0,
        explanation: "Double comparative structure: 'The sooner..., the earlier...'",
      },
      {
        text: "Not until the results were published _____ the extent of the problem.",
        options: ["we realized", "did we realize", "we did realize", "realized we"],
        correctAnswer: 1,
        explanation: "After 'not until' at the start, we use inversion: 'did we realize'.",
      },
    ],
  },

  collocations: {
    title: "Collocations & Expressions",
    description: "Testez votre connaissance des combinaisons naturelles",
    icon: "🔗",
    questions: [
      {
        text: "The new evidence _____ serious doubts on the witness's testimony.",
        options: ["puts", "casts", "makes", "gives"],
        correctAnswer: 1,
        explanation: "'Cast doubt(s) on' is the correct collocation meaning to make something questionable.",
      },
      {
        text: "After years of research, the scientist finally made a major _____.",
        options: ["breakthrough", "breakdown", "outbreak", "breakout"],
        correctAnswer: 0,
        explanation: "'Make a breakthrough' is the correct collocation for an important discovery.",
      },
      {
        text: "The company decided to _____ an investigation into the alleged corruption.",
        options: ["make", "do", "conduct", "perform"],
        correctAnswer: 2,
        explanation: "'Conduct an investigation' is the standard collocation for organizing a formal inquiry.",
      },
      {
        text: "The athlete's performance was _____ expectations.",
        options: ["beyond", "over", "above", "past"],
        correctAnswer: 0,
        explanation: "'Beyond expectations' means better than what was anticipated.",
      },
      {
        text: "The proposal _____ fierce opposition from environmental groups.",
        options: ["met with", "came across", "ran into", "went through"],
        correctAnswer: 0,
        explanation: "'Meet with opposition' is the correct collocation for encountering resistance.",
      },
    ],
  },

  register_style: {
    title: "Registre & Style",
    description: "Distinguez les niveaux de langue appropriés",
    icon: "👔",
    questions: [
      {
        text: "Which is the most appropriate way to disagree in a formal business meeting?",
        options: ["You're wrong about that", "I'm afraid I have to disagree", "That's rubbish", "No way!"],
        correctAnswer: 1,
        explanation: "'I'm afraid I have to disagree' is polite and formal, appropriate for business contexts.",
      },
      {
        text: "In academic writing, which phrase is most appropriate?",
        options: ["It's obvious that", "It is evident that", "Everyone knows that", "You can see that"],
        correctAnswer: 1,
        explanation: "'It is evident that' is formal and objective, suitable for academic discourse.",
      },
      {
        text: "Which is the most formal way to request information?",
        options: ["I want to know about", "I would like to inquire about", "Tell me about", "What about"],
        correctAnswer: 1,
        explanation: "'I would like to inquire about' is the most formal and polite request form.",
      },
      {
        text: "In a casual conversation, how would you express surprise?",
        options: ["I am astounded", "That's amazing!", "It is remarkable", "I find it extraordinary"],
        correctAnswer: 1,
        explanation: "'That's amazing!' is informal and natural for casual conversation.",
      },
      {
        text: "Which phrase is most appropriate for a job application letter?",
        options: ["I really want this job", "I am keen to work for", "I would be delighted to contribute to", "I'd love to be part of"],
        correctAnswer: 2,
        explanation: "'I would be delighted to contribute to' is formal and shows professionalism.",
      },
    ],
  },

  complex_conditionals: {
    title: "Conditionnels Complexes",
    description: "Maîtrisez les nuances des phrases conditionnelles",
    icon: "🌀",
    questions: [
      {
        text: "_____ you to reconsider, I'd be willing to negotiate the terms.",
        options: ["Should", "Were", "Had", "If"],
        correctAnswer: 1,
        explanation: "Formal conditional with inversion: 'Were you to...' = 'If you were to...'",
      },
      {
        text: "I'll lend you the money _____ you promise to pay it back next month.",
        options: ["provided that", "unless", "in case", "even if"],
        correctAnswer: 0,
        explanation: "'Provided that' means 'on the condition that', setting a requirement.",
      },
      {
        text: "Take an umbrella _____ it rains later.",
        options: ["provided", "unless", "in case", "supposing"],
        correctAnswer: 2,
        explanation: "'In case' expresses precaution against a possible future event.",
      },
      {
        text: "_____ I had known about the traffic, I would have left earlier.",
        options: ["If only", "Only if", "Even if", "As if"],
        correctAnswer: 0,
        explanation: "'If only' expresses regret about a past situation (like third conditional).",
      },
      {
        text: "He acts _____ he owns the company.",
        options: ["as though", "even though", "provided that", "in case"],
        correctAnswer: 0,
        explanation: "'As though' introduces a comparison that seems unreal (he doesn't actually own it).",
      },
    ],
  },

  advanced_passives: {
    title: "Passifs Avancés",
    description: "Maîtrisez les constructions passives complexes",
    icon: "🔄",
    questions: [
      {
        text: "The suspect is believed _____ the country last week.",
        options: ["to leave", "to have left", "leaving", "left"],
        correctAnswer: 1,
        explanation: "'Is believed to have left' shows the leaving happened before the believing (perfect infinitive).",
      },
      {
        text: "The issue needs _____ immediately.",
        options: ["to address", "addressing", "addressed", "to be addressed"],
        correctAnswer: 1,
        explanation: "After 'need', we can use -ing form with passive meaning: 'needs addressing' = 'needs to be addressed'.",
      },
      {
        text: "It _____ that the company will announce layoffs next month.",
        options: ["says", "is said", "said", "has said"],
        correctAnswer: 1,
        explanation: "'It is said that...' is a common impersonal passive construction for reports/rumors.",
      },
      {
        text: "The windows want _____ before the guests arrive.",
        options: ["clean", "cleaning", "to clean", "cleaned"],
        correctAnswer: 1,
        explanation: "'Want cleaning' is similar to 'need addressing' - -ing form with passive meaning.",
      },
      {
        text: "The prisoners are thought _____ through a tunnel.",
        options: ["escape", "to escape", "to have escaped", "escaping"],
        correctAnswer: 2,
        explanation: "'Are thought to have escaped' indicates the escape happened before the thinking.",
      },
    ],
  },

  discourse_markers: {
    title: "Marqueurs de Discours",
    description: "Utilisez les connecteurs sophistiqués",
    icon: "🎯",
    questions: [
      {
        text: "The plan seemed perfect. _____, there were several hidden flaws.",
        options: ["Therefore", "Nevertheless", "Furthermore", "Consequently"],
        correctAnswer: 1,
        explanation: "'Nevertheless' introduces a contrast to the previous positive statement.",
      },
      {
        text: "The results were disappointing. _____, we learned valuable lessons.",
        options: ["On the contrary", "By contrast", "On the other hand", "That said"],
        correctAnswer: 3,
        explanation: "'That said' acknowledges the previous point while introducing a balancing consideration.",
      },
      {
        text: "_____ the weather forecast, the event was cancelled.",
        options: ["In light of", "Regardless of", "By means of", "On behalf of"],
        correctAnswer: 0,
        explanation: "'In light of' means 'considering' or 'because of' - the forecast caused the cancellation.",
      },
      {
        text: "The project failed, _____ the team's hard work.",
        options: ["despite", "because of", "due to", "owing to"],
        correctAnswer: 0,
        explanation: "'Despite' shows contrast - failure happened even though the team worked hard.",
      },
      {
        text: "_____ global warming, sea levels continue to rise.",
        options: ["As a result of", "In spite of", "Apart from", "Instead of"],
        correctAnswer: 0,
        explanation: "'As a result of' shows cause and effect - global warming causes rising sea levels.",
      },
    ],
  },

  subtle_meanings: {
    title: "Nuances de Sens",
    description: "Distinguez les subtilités de signification",
    icon: "🎭",
    questions: [
      {
        text: "What's the difference between 'He didn't use to smoke' and 'He used not to smoke'?",
        options: ["No difference", "First is more formal", "Second is more formal", "First is incorrect"],
        correctAnswer: 2,
        explanation: "'Used not to' is more formal/literary than 'didn't use to', though both are correct.",
      },
      {
        text: "She _____ have called me, but she forgot. (reproach for not doing something)",
        options: ["should", "could", "would", "might"],
        correctAnswer: 0,
        explanation: "'Should have called' expresses obligation/expectation that wasn't fulfilled (reproach).",
      },
      {
        text: "Which expresses the strongest criticism?",
        options: ["His work is adequate", "His work is satisfactory", "His work leaves much to be desired", "His work is acceptable"],
        correctAnswer: 2,
        explanation: "'Leaves much to be desired' is a diplomatic way of saying something is quite poor.",
      },
      {
        text: "I _____ go to the party if I finish my work. (less certain than 'will')",
        options: ["might", "must", "should", "can"],
        correctAnswer: 0,
        explanation: "'Might go' expresses possibility/uncertainty, less definite than 'will go'.",
      },
      {
        text: "Which sentence implies the speaker expected a different result?",
        options: ["He passed the exam", "He did pass the exam", "He has passed the exam", "He passes exams"],
        correctAnswer: 1,
        explanation: "'Did pass' (emphatic auxiliary) suggests surprise or contradiction of expectations.",
      },
    ],
  },

  error_correction_advanced: {
    title: "Correction d'Erreurs Sophistiquées",
    description: "Identifiez les erreurs subtiles dans l'usage avancé",
    icon: "✏️",
    questions: [
      {
        text: "Which sentence is correct?",
        options: [
          "The reason why I'm late is because of traffic.",
          "The reason I'm late is that there was traffic.",
          "The reason for I'm late is traffic.",
          "The reason I'm late is because of traffic.",
        ],
        correctAnswer: 1,
        explanation: "Use 'The reason... is that...' not 'The reason... is because...' (redundant).",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "I look forward to hear from you.",
          "I look forward to hearing from you.",
          "I look forward hearing from you.",
          "I look forward that I hear from you.",
        ],
        correctAnswer: 1,
        explanation: "'Look forward to' is followed by -ing form, not infinitive.",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "Between you and I, this is confidential.",
          "Between you and me, this is confidential.",
          "Between you and myself, this is confidential.",
          "Between I and you, this is confidential.",
        ],
        correctAnswer: 1,
        explanation: "After prepositions like 'between', use object pronoun 'me', not subject 'I'.",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "Neither of them are coming to the party.",
          "Neither of them is coming to the party.",
          "Neither of them were coming to the party.",
          "Neither of them have come to the party.",
        ],
        correctAnswer: 1,
        explanation: "'Neither' is singular, so it takes 'is' not 'are', even with 'of them'.",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "I wish I would have studied harder.",
          "I wish I had studied harder.",
          "I wish I have studied harder.",
          "I wish I will study harder.",
        ],
        correctAnswer: 1,
        explanation: "'I wish' about the past uses past perfect: 'I wish I had studied'.",
      },
    ],
  },

  reading_comprehension_critical: {
    title: "Compréhension Critique",
    description: "Analysez des textes complexes et des arguments nuancés",
    icon: "📖",
    questions: [
      {
        text: "Read: 'While technological advancement has undoubtedly improved many aspects of modern life, critics argue that our increasing dependence on digital devices is fundamentally altering human relationships and cognitive processes. The paradox lies in the fact that tools designed to connect us may, in reality, be isolating us from meaningful human interaction.' What paradox does the author identify?",
        options: ["Technology is too expensive", "Connecting tools may cause isolation", "Devices break too easily", "People don't like technology"],
        correctAnswer: 1,
        explanation: "The paradox is that 'tools designed to connect us may... be isolating us' - opposite of intended effect.",
      },
      {
        text: "Read: 'The researcher's methodology, while innovative, raises questions about the validity of her conclusions. By selecting participants exclusively from urban areas, she may have inadvertently introduced bias that limits the generalizability of her findings to rural populations.' What criticism is implied?",
        options: ["The research is completely wrong", "The sample may not represent all populations", "Urban people can't be studied", "The methodology is too old"],
        correctAnswer: 1,
        explanation: "The criticism is about 'generalizability' - urban-only sample may not apply to rural populations.",
      },
      {
        text: "Read: 'The company's sustainability report presents an impressive array of environmental initiatives. However, a closer examination reveals that many of these measures are either superficial gestures or long-term commitments with no concrete implementation timeline.' What is the author's attitude?",
        options: ["Completely supportive", "Skeptically critical", "Entirely negative", "Indifferent"],
        correctAnswer: 1,
        explanation: "The author is 'skeptically critical' - acknowledging positive appearance but questioning substance.",
      },
      {
        text: "Read: 'The politician's carefully crafted speech managed to appeal to diverse constituencies without alienating any particular group. This rhetorical balancing act, while politically astute, left many wondering where she actually stands on the key issues.' What does this suggest about the speech?",
        options: ["It was very clear", "It was deliberately vague", "It was too technical", "It was too emotional"],
        correctAnswer: 1,
        explanation: "The speech was 'deliberately vague' - avoiding clear positions to avoid alienating anyone.",
      },
      {
        text: "Read: 'The study's findings challenge conventional wisdom about learning styles. Rather than supporting the popular notion that individuals learn better when information is presented in their preferred modality, the data suggests that instructional effectiveness depends more on the content being taught than on matching teaching methods to supposed learning preferences.' What does this research indicate?",
        options: ["Learning styles are very important", "Content matters more than learning style", "All teaching methods are equal", "Students don't have preferences"],
        correctAnswer: 1,
        explanation: "The research suggests 'content matters more than learning style' - challenging the importance of matching teaching to preferences.",
      },
    ],
  },
};