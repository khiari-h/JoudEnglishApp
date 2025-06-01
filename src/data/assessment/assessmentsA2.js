// src/data/assessments/AssessmentA2.js

export default {
  level: "A2",
  description: "Évaluez vos compétences intermédiaires en anglais niveau A2",
  totalQuestions: 50,
  timeLimit: 50, // minutes
  passScore: 75, // pourcentage

  vocabulary: {
    title: "Vocabulaire",
    description: "Testez votre connaissance du vocabulaire intermédiaire",
    icon: "📚",
    questions: [
      {
        text: "What do you call someone who helps sick people in a hospital?",
        options: ["Teacher", "Engineer", "Nurse", "Lawyer"],
        correctAnswer: 2,
        explanation: "A 'nurse' is a healthcare professional who cares for sick people in hospitals.",
      },
      {
        text: "Which word means 'to reserve a table at a restaurant'?",
        options: ["Order", "Book", "Buy", "Take"],
        correctAnswer: 1,
        explanation: "To 'book' means to reserve or make a reservation in advance.",
      },
      {
        text: "What is the opposite of 'expensive'?",
        options: ["Big", "Cheap", "Fast", "New"],
        correctAnswer: 1,
        explanation: "'Cheap' is the opposite of 'expensive' when talking about prices.",
      },
      {
        text: "Which word describes feeling very tired?",
        options: ["Hungry", "Thirsty", "Exhausted", "Excited"],
        correctAnswer: 2,
        explanation: "'Exhausted' means extremely tired or worn out.",
      },
      {
        text: "What do you call the person who cuts and styles hair?",
        options: ["Dentist", "Hairdresser", "Mechanic", "Chef"],
        correctAnswer: 1,
        explanation: "A 'hairdresser' is a professional who cuts, colors, and styles hair.",
      },
    ],
  },

  grammar: {
    title: "Grammaire",
    description: "Testez votre compréhension des structures grammaticales A2",
    icon: "📝",
    questions: [
      {
        text: "Yesterday, I _____ to the cinema with my friends.",
        options: ["go", "went", "going", "will go"],
        correctAnswer: 1,
        explanation: "'Went' is the past simple form of 'go'. We use past simple for completed actions in the past.",
      },
      {
        text: "She is _____ than her sister.",
        options: ["tall", "taller", "tallest", "more tall"],
        correctAnswer: 1,
        explanation: "For short adjectives, we add '-er' to make comparatives: tall → taller.",
      },
      {
        text: "I _____ study harder for my exams.",
        options: ["should", "can", "will", "am"],
        correctAnswer: 0,
        explanation: "'Should' is used to give advice or express what is right to do.",
      },
      {
        text: "Right now, she _____ dinner in the kitchen.",
        options: ["cooks", "cooked", "is cooking", "will cook"],
        correctAnswer: 2,
        explanation: "Present continuous 'is cooking' is used for actions happening right now.",
      },
      {
        text: "_____ you ever been to France?",
        options: ["Do", "Are", "Have", "Did"],
        correctAnswer: 2,
        explanation: "'Have you ever...?' is the correct form for present perfect questions about life experiences.",
      },
    ],
  },

  phrases_expressions: {
    title: "Expressions & Communication",
    description: "Testez votre connaissance des expressions de niveau A2",
    icon: "🗣️",
    questions: [
      {
        text: "How do you politely ask someone to repeat something?",
        options: ["What?", "I'm sorry, could you repeat that?", "Say again!", "I don't understand you."],
        correctAnswer: 1,
        explanation: "'Could you repeat that?' is a polite way to ask someone to say something again.",
      },
      {
        text: "What do you say when you want to make a suggestion?",
        options: ["You must do this", "Why don't we...?", "Do this now", "I want you to..."],
        correctAnswer: 1,
        explanation: "'Why don't we...?' is a common way to make polite suggestions.",
      },
      {
        text: "How do you express disagreement politely?",
        options: ["You're wrong", "I don't think so", "That's stupid", "No way"],
        correctAnswer: 1,
        explanation: "'I don't think so' is a polite way to express disagreement.",
      },
      {
        text: "What do you say when you're not sure about something?",
        options: ["I know everything", "I'm not sure", "That's impossible", "I don't care"],
        correctAnswer: 1,
        explanation: "'I'm not sure' is used to express uncertainty or doubt.",
      },
      {
        text: "How do you ask for someone's opinion?",
        options: ["Tell me now", "What do you think?", "You must answer", "I need to know"],
        correctAnswer: 1,
        explanation: "'What do you think?' is a common way to ask for someone's opinion.",
      },
    ],
  },

  past_future: {
    title: "Passé & Futur",
    description: "Testez votre connaissance des temps passés et futurs",
    icon: "⏰",
    questions: [
      {
        text: "Tomorrow, I _____ visit my grandmother.",
        options: ["am going to", "visited", "visit", "have visited"],
        correctAnswer: 0,
        explanation: "'Am going to' is used for future plans that are already decided.",
      },
      {
        text: "Last week, they _____ a new car.",
        options: ["buy", "bought", "will buy", "are buying"],
        correctAnswer: 1,
        explanation: "'Bought' is the past simple form of 'buy' for completed actions in the past.",
      },
      {
        text: "I _____ never _____ sushi before.",
        options: ["did / eat", "have / eaten", "am / eating", "will / eat"],
        correctAnswer: 1,
        explanation: "'Have never eaten' is present perfect, used for experiences up to now.",
      },
      {
        text: "The train _____ at 3:30 PM.",
        options: ["will leave", "leaves", "is leaving", "left"],
        correctAnswer: 1,
        explanation: "We use present simple for scheduled events like train timetables.",
      },
      {
        text: "While I _____ TV, the phone rang.",
        options: ["watched", "was watching", "watch", "am watching"],
        correctAnswer: 1,
        explanation: "Past continuous 'was watching' describes an ongoing action interrupted by another action.",
      },
    ],
  },

  comparatives_superlatives: {
    title: "Comparatifs & Superlatifs",
    description: "Testez votre connaissance des comparaisons",
    icon: "📊",
    questions: [
      {
        text: "London is _____ than Paris.",
        options: ["big", "bigger", "biggest", "more big"],
        correctAnswer: 1,
        explanation: "For short adjectives, we add '-er' for comparatives: big → bigger.",
      },
      {
        text: "This is the _____ book I've ever read.",
        options: ["interesting", "more interesting", "most interesting", "interestinger"],
        correctAnswer: 2,
        explanation: "For long adjectives, we use 'the most' for superlatives: the most interesting.",
      },
      {
        text: "My car is _____ expensive than yours.",
        options: ["less", "least", "little", "few"],
        correctAnswer: 0,
        explanation: "'Less' is used with adjectives to mean 'not as much': less expensive = cheaper.",
      },
      {
        text: "She runs _____ than her brother.",
        options: ["fast", "faster", "fastest", "more fast"],
        correctAnswer: 1,
        explanation: "'Fast' becomes 'faster' in the comparative form (short adjective rule).",
      },
      {
        text: "This is _____ difficult exercise in the book.",
        options: ["more", "most", "the more", "the most"],
        correctAnswer: 3,
        explanation: "'The most' is used for superlatives with long adjectives: the most difficult.",
      },
    ],
  },

  modals: {
    title: "Modaux (Should, Could, Would)",
    description: "Testez votre connaissance des verbes modaux",
    icon: "🎯",
    questions: [
      {
        text: "You _____ eat more vegetables. It's good for your health.",
        options: ["should", "could", "would", "must"],
        correctAnswer: 0,
        explanation: "'Should' is used to give advice or recommendations.",
      },
      {
        text: "_____ you help me with this heavy box?",
        options: ["Should", "Could", "Would", "Must"],
        correctAnswer: 1,
        explanation: "'Could' is used to make polite requests.",
      },
      {
        text: "If I had money, I _____ buy a new car.",
        options: ["should", "could", "would", "must"],
        correctAnswer: 2,
        explanation: "'Would' is used in conditional sentences to express hypothetical situations.",
      },
      {
        text: "When I was young, I _____ swim very fast.",
        options: ["should", "could", "would", "must"],
        correctAnswer: 1,
        explanation: "'Could' expresses past ability (what someone was able to do before).",
      },
      {
        text: "You _____ be more careful when driving.",
        options: ["should", "could", "would", "might"],
        correctAnswer: 0,
        explanation: "'Should' is used to give advice about what is the right thing to do.",
      },
    ],
  },

  prepositions_advanced: {
    title: "Prépositions Avancées",
    description: "Testez votre connaissance des prépositions complexes",
    icon: "📍",
    questions: [
      {
        text: "I'm looking forward _____ seeing you again.",
        options: ["to", "for", "at", "with"],
        correctAnswer: 0,
        explanation: "'Look forward to' is a phrasal verb that always uses 'to'.",
      },
      {
        text: "She's good _____ mathematics.",
        options: ["in", "at", "on", "with"],
        correctAnswer: 1,
        explanation: "We use 'good at' when talking about skills and abilities.",
      },
      {
        text: "The meeting was cancelled _____ the bad weather.",
        options: ["because", "due to", "since", "for"],
        correctAnswer: 1,
        explanation: "'Due to' is used to explain the reason for something (followed by a noun).",
      },
      {
        text: "I arrived _____ the station just in time.",
        options: ["in", "at", "on", "to"],
        correctAnswer: 1,
        explanation: "We use 'at' with specific places like stations, airports, stops.",
      },
      {
        text: "The book is _____ sale for 50% off.",
        options: ["in", "on", "at", "for"],
        correctAnswer: 1,
        explanation: "'On sale' is a fixed expression meaning available at a reduced price.",
      },
    ],
  },

  connectors: {
    title: "Connecteurs Logiques",
    description: "Testez votre connaissance des mots de liaison",
    icon: "🔗",
    questions: [
      {
        text: "I wanted to go out, _____ it was raining.",
        options: ["and", "but", "so", "because"],
        correctAnswer: 1,
        explanation: "'But' is used to show contrast or opposition between two ideas.",
      },
      {
        text: "She studied hard, _____ she passed the exam.",
        options: ["but", "because", "so", "although"],
        correctAnswer: 2,
        explanation: "'So' is used to show result or consequence.",
      },
      {
        text: "I'm tired _____ I worked late last night.",
        options: ["so", "but", "because", "and"],
        correctAnswer: 2,
        explanation: "'Because' is used to give a reason or explanation.",
      },
      {
        text: "_____ it was expensive, I bought the dress.",
        options: ["Because", "Although", "So", "And"],
        correctAnswer: 1,
        explanation: "'Although' is used to show contrast (despite the fact that...).",
      },
      {
        text: "First, I'll have lunch _____ then I'll go shopping.",
        options: ["but", "so", "and", "because"],
        correctAnswer: 2,
        explanation: "'And then' is used to show sequence of actions.",
      },
    ],
  },

  error_correction: {
    title: "Correction d'Erreurs",
    description: "Trouvez et corrigez les erreurs grammaticales",
    icon: "✏️",
    questions: [
      {
        text: "Which sentence is correct?",
        options: [
          "I have went to London last year.",
          "I went to London last year.",
          "I have go to London last year.",
          "I was go to London last year.",
        ],
        correctAnswer: 1,
        explanation: "Use past simple 'went' for completed actions in the past with time markers like 'last year'.",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "She is more tall than me.",
          "She is taller than me.",
          "She is more taller than me.",
          "She is tallest than me.",
        ],
        correctAnswer: 1,
        explanation: "For short adjectives, add '-er' not 'more': tall → taller.",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "I am living here since 2020.",
          "I live here since 2020.",
          "I have been living here since 2020.",
          "I was living here since 2020.",
        ],
        correctAnswer: 2,
        explanation: "Use present perfect continuous with 'since' for actions that started in the past and continue now.",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "Could you to help me?",
          "Could you help me?",
          "Could you helping me?",
          "Could you helps me?",
        ],
        correctAnswer: 1,
        explanation: "After modal verbs like 'could', use the base form of the verb without 'to'.",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "If I will have time, I will call you.",
          "If I have time, I will call you.",
          "If I had time, I will call you.",
          "If I having time, I will call you.",
        ],
        correctAnswer: 1,
        explanation: "In first conditional, use present simple after 'if' and 'will' in the main clause.",
      },
    ],
  },

  reading_comprehension: {
    title: "Compréhension Écrite",
    description: "Lisez les textes et répondez aux questions",
    icon: "📖",
    questions: [
      {
        text: "Read: 'Emma works as a teacher in a primary school. She has been teaching for 5 years and loves working with children. Every morning, she prepares lessons and in the afternoon, she grades homework. She usually stays late on Fridays to plan the next week.' How long has Emma been teaching?",
        options: ["3 years", "5 years", "7 years", "10 years"],
        correctAnswer: 1,
        explanation: "The text clearly states 'She has been teaching for 5 years'.",
      },
      {
        text: "Read: 'The new shopping center opened last month. It has over 100 shops, 3 restaurants, and a cinema. The parking is free for the first two hours, then costs £2 per hour. It's open every day from 9 AM to 10 PM except Sundays when it closes at 6 PM.' How much does parking cost after 2 hours?",
        options: ["Free", "£1 per hour", "£2 per hour", "£3 per hour"],
        correctAnswer: 2,
        explanation: "The text states parking 'costs £2 per hour' after the first two free hours.",
      },
      {
        text: "Read: 'Mike decided to learn Spanish because he wanted to travel to South America. He started taking classes in January and has been studying for 6 months now. Although it's difficult, he's making good progress and can already have simple conversations.' Why did Mike start learning Spanish?",
        options: ["For his job", "To travel to South America", "Because it's easy", "His friends suggested it"],
        correctAnswer: 1,
        explanation: "Mike learned Spanish 'because he wanted to travel to South America'.",
      },
      {
        text: "Read: 'The weather forecast shows it will be sunny tomorrow with temperatures reaching 25°C. However, there's a 30% chance of rain in the evening. It's perfect weather for outdoor activities during the day.' What's the chance of rain?",
        options: ["0%", "25%", "30%", "50%"],
        correctAnswer: 2,
        explanation: "The text mentions 'there's a 30% chance of rain in the evening'.",
      },
      {
        text: "Read: 'Sarah has just moved to a new apartment. It's smaller than her old one but much closer to her work. She can now walk to the office in 10 minutes instead of driving for 45 minutes. Although she misses her old garden, she's happy with the change.' How long does it take Sarah to get to work now?",
        options: ["10 minutes walking", "45 minutes driving", "30 minutes", "1 hour"],
        correctAnswer: 0,
        explanation: "Sarah 'can now walk to the office in 10 minutes' from her new apartment.",
      },
    ],
  },
};
