// src/data/assessments/AssessmentB1.js

export default {
  level: "B1",
  description: "Évaluez vos compétences intermédiaires-avancées en anglais niveau B1",
  totalQuestions: 45, // ← MIS À JOUR (9 sections × 5 questions)
  timeLimit: 60, // minutes
  passScore: 80, // pourcentage

  vocabulary: {
    title: "Vocabulaire Avancé",
    description: "Testez votre connaissance du vocabulaire B1",
    icon: "📚",
    questions: [
      {
        text: "What does 'to implement' mean?",
        options: ["To destroy", "To put into action", "To ignore", "To criticize"],
        correctAnswer: 1,
        explanation: "'To implement' means to put a plan or decision into effect, to carry out or execute.",
      },
      {
        text: "Someone who is 'reliable' is:",
        options: ["Unreliable", "Trustworthy and dependable", "Funny", "Intelligent"],
        correctAnswer: 1,
        explanation: "'Reliable' means you can trust and depend on someone to do what they promise.",
      },
      {
        text: "What is a 'breakthrough'?",
        options: ["A breakdown", "An important discovery", "A mistake", "A routine task"],
        correctAnswer: 1,
        explanation: "A 'breakthrough' is an important discovery or development that removes a barrier to progress.",
      },
      {
        text: "To 'compromise' means to:",
        options: ["Refuse completely", "Reach a mutual agreement", "Fight", "Ignore"],
        correctAnswer: 1,
        explanation: "'To compromise' means to settle a dispute by mutual concession, finding middle ground.",
      },
      {
        text: "What does 'substantial' mean?",
        options: ["Very small", "Considerable in size or amount", "Temporary", "Colorful"],
        correctAnswer: 1,
        explanation: "'Substantial' means considerable in importance, size, or worth; significant.",
      },
    ],
  },

  grammar_complex: {
    title: "Grammaire Complexe",
    description: "Testez votre maîtrise des structures grammaticales avancées",
    icon: "📝",
    questions: [
      {
        text: "I _____ working here for three years when I got promoted.",
        options: ["was", "have been", "had been", "am"],
        correctAnswer: 2,
        explanation: "Past perfect continuous 'had been working' shows an action that continued up to a point in the past.",
      },
      {
        text: "The report _____ by the team yesterday.",
        options: ["completed", "was completed", "has completed", "completes"],
        correctAnswer: 1,
        explanation: "Passive voice 'was completed' is used when the focus is on the action, not who did it.",
      },
      {
        text: "If I _____ you, I would accept the job offer.",
        options: ["am", "was", "were", "will be"],
        correctAnswer: 2,
        explanation: "In second conditional 'If I were you', we use 'were' for all persons (subjunctive mood).",
      },
      {
        text: "She told me that she _____ the movie the week before.",
        options: ["saw", "had seen", "has seen", "sees"],
        correctAnswer: 1,
        explanation: "In reported speech, past simple becomes past perfect: 'saw' → 'had seen'.",
      },
      {
        text: "I wish I _____ more languages.",
        options: ["speak", "spoke", "have spoken", "will speak"],
        correctAnswer: 1,
        explanation: "'I wish' + past simple expresses regret about present situations.",
      },
    ],
  },

  phrasal_verbs: {
    title: "Verbes à Particule",
    description: "Testez votre connaissance des phrasal verbs courants",
    icon: "🔄",
    questions: [
      {
        text: "The meeting has been _____ until next week.",
        options: ["put off", "put on", "put up", "put down"],
        correctAnswer: 0,
        explanation: "'Put off' means to postpone or delay something to a later time.",
      },
      {
        text: "I need to _____ this problem before it gets worse.",
        options: ["deal with", "deal in", "deal out", "deal off"],
        correctAnswer: 0,
        explanation: "'Deal with' means to handle or take action to solve a problem.",
      },
      {
        text: "She _____ smoking last year.",
        options: ["gave in", "gave up", "gave out", "gave away"],
        correctAnswer: 1,
        explanation: "'Give up' means to stop doing something, especially a habit or addiction.",
      },
      {
        text: "The plane will _____ at 6:30 PM.",
        options: ["take off", "take up", "take on", "take down"],
        correctAnswer: 0,
        explanation: "'Take off' means to leave the ground and begin flight (for aircraft).",
      },
      {
        text: "I'm _____ meeting new people at the conference.",
        options: ["looking up to", "looking forward to", "looking down on", "looking after"],
        correctAnswer: 1,
        explanation: "'Look forward to' means to anticipate something with pleasure.",
      },
    ],
  },

  conditional_subjunctive: {
    title: "Conditionnels & Subjonctif",
    description: "Testez votre maîtrise des phrases conditionnelles",
    icon: "🤔",
    questions: [
      {
        text: "If you _____ harder, you would have passed the exam.",
        options: ["studied", "had studied", "study", "have studied"],
        correctAnswer: 1,
        explanation: "Third conditional uses 'if + past perfect' for hypothetical past situations.",
      },
      {
        text: "Unless it _____, we'll have the party in the garden.",
        options: ["rains", "will rain", "rained", "would rain"],
        correctAnswer: 0,
        explanation: "'Unless' (= if not) is followed by present simple, not future tense.",
      },
      {
        text: "I'd rather you _____ here early tomorrow.",
        options: ["come", "came", "will come", "have come"],
        correctAnswer: 1,
        explanation: "'I'd rather + past simple' is used to express preference about someone else's actions.",
      },
      {
        text: "It's important that he _____ the meeting on time.",
        options: ["attends", "attend", "attended", "will attend"],
        correctAnswer: 1,
        explanation: "After 'It's important that', we use the subjunctive (base form of verb).",
      },
      {
        text: "Supposing you _____ a million dollars, what would you do?",
        options: ["win", "won", "have won", "will win"],
        correctAnswer: 1,
        explanation: "'Supposing' (imagine if) takes past simple for hypothetical situations.",
      },
    ],
  },

  passive_voice: {
    title: "Voix Passive",
    description: "Testez votre maîtrise de la voix passive",
    icon: "🔄",
    questions: [
      {
        text: "The new hospital _____ next year.",
        options: ["will build", "will be built", "will have built", "builds"],
        correctAnswer: 1,
        explanation: "Future passive: 'will be built' - the hospital receives the action.",
      },
      {
        text: "English _____ all over the world.",
        options: ["speaks", "is spoken", "has spoken", "was spoken"],
        correctAnswer: 1,
        explanation: "Present simple passive 'is spoken' - English receives the action of speaking.",
      },
      {
        text: "The letter _____ yesterday.",
        options: ["sent", "was sent", "has sent", "sends"],
        correctAnswer: 1,
        explanation: "Past simple passive 'was sent' - the letter received the action of sending.",
      },
      {
        text: "This computer _____ by my brother.",
        options: ["was repaired", "repaired", "has repaired", "repairs"],
        correctAnswer: 0,
        explanation: "Past passive 'was repaired' - the computer received the action, focus on what happened to it.",
      },
      {
        text: "The homework must _____ by Friday.",
        options: ["finish", "be finished", "have finished", "finishing"],
        correctAnswer: 1,
        explanation: "Modal passive: 'must be finished' - obligation in passive form.",
      },
    ],
  },

  reported_speech: {
    title: "Discours Rapporté",
    description: "Testez votre connaissance du discours indirect",
    icon: "💭",
    questions: [
      {
        text: "He said, 'I am working late tonight.' → He said _____ late that night.",
        options: ["he is working", "he was working", "he works", "he worked"],
        correctAnswer: 1,
        explanation: "Present continuous becomes past continuous in reported speech: 'am working' → 'was working'.",
      },
      {
        text: "She asked me, 'Where do you live?' → She asked me _____.",
        options: ["where do I live", "where I lived", "where I live", "where did I live"],
        correctAnswer: 1,
        explanation: "In reported questions, use statement word order and change tense: 'do you live' → 'I lived'.",
      },
      {
        text: "'Don't forget to call me,' she said. → She _____ to call her.",
        options: ["told me don't forget", "told me not to forget", "said me not forget", "asked me don't forget"],
        correctAnswer: 1,
        explanation: "Reported commands use 'told someone (not) to + infinitive'.",
      },
      {
        text: "'I have finished my work,' he said. → He said _____ his work.",
        options: ["he has finished", "he had finished", "he finished", "he finishes"],
        correctAnswer: 1,
        explanation: "Present perfect becomes past perfect in reported speech: 'have finished' → 'had finished'.",
      },
      {
        text: "'Can you help me?' she asked. → She asked _____ her.",
        options: ["if I can help", "if I could help", "can I help", "could I help"],
        correctAnswer: 1,
        explanation: "Yes/no questions become 'if/whether' + statement order with tense change: 'can' → 'could'.",
      },
    ],
  },

  relative_clauses: {
    title: "Propositions Relatives",
    description: "Testez votre maîtrise des relatives complexes",
    icon: "🔗",
    questions: [
      {
        text: "The man _____ car was stolen reported it to the police.",
        options: ["who", "whose", "which", "that"],
        correctAnswer: 1,
        explanation: "'Whose' shows possession - the man's car was stolen.",
      },
      {
        text: "This is the restaurant _____ we had dinner last night.",
        options: ["which", "where", "that", "when"],
        correctAnswer: 1,
        explanation: "'Where' is used for places: the restaurant is where the dinner happened.",
      },
      {
        text: "The book _____ you recommended was excellent.",
        options: ["who", "which", "whose", "where"],
        correctAnswer: 1,
        explanation: "'Which' or 'that' can be used for things. Here, 'which' refers to 'the book'.",
      },
      {
        text: "Do you remember the day _____ we first met?",
        options: ["which", "where", "when", "whose"],
        correctAnswer: 2,
        explanation: "'When' is used for time expressions: the day when something happened.",
      },
      {
        text: "The people _____ live next door are very friendly.",
        options: ["who", "which", "whose", "where"],
        correctAnswer: 0,
        explanation: "'Who' is used for people as the subject of the relative clause.",
      },
    ],
  },

  argumentation: {
    title: "Argumentation & Opinion",
    description: "Testez votre capacité à exprimer des opinions nuancées",
    icon: "💡",
    questions: [
      {
        text: "How do you express a strong disagreement politely?",
        options: ["You're completely wrong", "I'm afraid I disagree", "That's ridiculous", "I don't like your idea"],
        correctAnswer: 1,
        explanation: "'I'm afraid I disagree' is a polite way to express strong disagreement.",
      },
      {
        text: "Which phrase shows you're considering both sides of an argument?",
        options: ["Only one thing matters", "On the one hand... on the other hand", "I'm absolutely certain", "There's no doubt"],
        correctAnswer: 1,
        explanation: "'On the one hand... on the other hand' shows you're weighing different perspectives.",
      },
      {
        text: "How do you express uncertainty about a statement?",
        options: ["I'm absolutely sure", "It might be true", "It's definitely correct", "I know for certain"],
        correctAnswer: 1,
        explanation: "'It might be true' expresses uncertainty or possibility rather than certainty.",
      },
      {
        text: "Which phrase introduces a contrasting point?",
        options: ["Furthermore", "However", "Therefore", "Additionally"],
        correctAnswer: 1,
        explanation: "'However' introduces a contrasting or opposing point to what was said before.",
      },
      {
        text: "How do you politely interrupt someone in a discussion?",
        options: ["Stop talking", "Excuse me, but...", "Be quiet", "I don't care"],
        correctAnswer: 1,
        explanation: "'Excuse me, but...' is a polite way to interrupt and add your point to the discussion.",
      },
    ],
  },

  reading_comprehension: {
    title: "Compréhension Écrite Complexe",
    description: "Analysez des textes nuancés et inférez le sens",
    icon: "📖",
    questions: [
      {
        text: "Read: 'The company's new policy, while well-intentioned, has created unexpected challenges. Employees appreciate the flexibility it offers, but managers are struggling to maintain productivity standards. Some departments have adapted successfully, whereas others are experiencing significant difficulties.' What is the overall tone of this passage?",
        options: ["Entirely positive", "Entirely negative", "Balanced and nuanced", "Uncertain"],
        correctAnswer: 2,
        explanation: "The passage presents both positive aspects (well-intentioned, flexibility) and challenges, showing a balanced perspective.",
      },
      {
        text: "Read: 'Research suggests that remote working has fundamentally changed workplace dynamics. While productivity has increased in many sectors, the lack of face-to-face interaction has led to concerns about team cohesion and company culture. Organizations are now seeking hybrid solutions that combine the benefits of both approaches.' What can be inferred about the future of work?",
        options: ["Everyone will work remotely", "Offices will disappear completely", "A mixed approach will likely emerge", "Nothing will change"],
        correctAnswer: 2,
        explanation: "The text mentions 'hybrid solutions that combine the benefits of both approaches', indicating a mixed model.",
      },
      {
        text: "Read: 'The environmental impact of fast fashion has become a pressing concern. Despite increased awareness, consumer behavior hasn't changed dramatically. Young people, traditionally the target market, are paradoxically both the most environmentally conscious and the biggest consumers of cheap clothing.' What paradox is mentioned?",
        options: ["Young people don't care about the environment", "Expensive clothes are worse for the environment", "The most aware consumers are the biggest buyers", "Fashion isn't really harmful"],
        correctAnswer: 2,
        explanation: "The paradox is that young people are 'most environmentally conscious' yet 'biggest consumers of cheap clothing'.",
      },
      {
        text: "Read: 'Dr. Martinez's groundbreaking research into renewable energy storage has attracted international attention. Her innovative approach to battery technology could revolutionize how we store solar and wind energy. However, commercial implementation remains several years away due to manufacturing challenges and cost considerations.' What limits immediate implementation?",
        options: ["Lack of interest", "Technical impossibility", "Manufacturing and cost issues", "Government regulations"],
        correctAnswer: 2,
        explanation: "The text specifically mentions 'manufacturing challenges and cost considerations' as limiting factors.",
      },
      {
        text: "Read: 'The museum's new exhibition challenges traditional narratives about historical events. By presenting multiple perspectives, curators hope to encourage visitors to think critically about the past. This approach has been praised by educators but criticized by some historians who prefer more conventional presentations.' Who supports the new approach?",
        options: ["Historians", "Educators", "All visitors", "Government officials"],
        correctAnswer: 1,
        explanation: "The text states the approach 'has been praised by educators' while 'criticized by some historians'.",
      },
    ],
  },

};