// grammarRulesA2.js
// Fichier contenant uniquement les règles grammaticales pour le niveau A2 du CECR

const grammarRulesA2 = [
  {
    id: 1,
    title: "Le passé simple (past simple)",
    explanation: "Le passé simple est utilisé pour parler d'actions terminées dans le passé à un moment précis.",
    examples: [
      { english: "I visited Paris last summer.", french: "J'ai visité Paris l'été dernier." },
      { english: "She bought a new car in 2020.", french: "Elle a acheté une nouvelle voiture en 2020." },
      { english: "Did you watch the movie yesterday?", french: "As-tu regardé le film hier ?" }
    ],
    rules: [
      "Verbes réguliers: ajouter -ed (work → worked)",
      "Verbes irréguliers: formes spécifiques à apprendre (go → went, see → saw)",
      "Forme négative: did not (didn't) + verbe base",
      "Forme interrogative: did + sujet + verbe base?"
    ]
  },
  {
    id: 2,
    title: "Le présent parfait",
    explanation: "Le présent parfait est utilisé pour parler d'actions qui ont commencé dans le passé et qui ont un impact sur le présent.",
    examples: [
      { english: "I have lived here for three years.", french: "J'habite ici depuis trois ans." },
      { english: "She has just finished her homework.", french: "Elle vient de terminer ses devoirs." },
      { english: "They have never been to Paris.", french: "Ils ne sont jamais allés à Paris." }
    ],
    rules: [
      "Formation: Have/Has + past participle",
      "Utilisé avec 'for' (durée) et 'since' (point de départ dans le temps)",
      "Pour exprimer des expériences passées avec 'ever' et 'never'",
      "Pour parler d'actions récentes avec 'just', 'already', 'yet'"
    ]
  },
  {
    id: 3,
    title: "Le passé continu",
    explanation: "Le passé continu exprime une action qui était en cours à un moment précis du passé.",
    examples: [
      { english: "I was reading when he called.", french: "J'étais en train de lire quand il a appelé." },
      { english: "They were playing football at 3 PM.", french: "Ils jouaient au football à 15 heures." },
      { english: "It was raining all day.", french: "Il pleuvait toute la journée." }
    ],
    rules: [
      "Formation: Was/Were + verbe + ing",
      "Utilisé pour une action en cours à un moment spécifique du passé",
      "Souvent utilisé avec 'when' pour montrer une interruption",
      "Utilisé avec 'while' pour deux actions simultanées"
    ]
  },
  {
    id: 4,
    title: "Le futur avec 'going to'",
    explanation: "Le futur avec 'going to' exprime des intentions ou des prédictions basées sur des preuves présentes.",
    examples: [
      { english: "I'm going to buy a car next year.", french: "Je vais acheter une voiture l'année prochaine." },
      { english: "It's going to rain soon.", french: "Il va pleuvoir bientôt." },
      { english: "We're not going to travel this summer.", french: "Nous n'allons pas voyager cet été." }
    ],
    rules: [
      "Formation: Be + going to + verbe base",
      "Pour des plans et intentions définis",
      "Pour des prédictions basées sur des preuves présentes",
      "Question: Am/Is/Are + subject + going to + verb?"
    ]
  },
  {
    id: 5,
    title: "Le futur avec 'will'",
    explanation: "Le futur avec 'will' exprime des décisions spontanées, des promesses et des prédictions générales.",
    examples: [
      { english: "I'll help you with your homework.", french: "Je t'aiderai avec tes devoirs." },
      { english: "It will be sunny tomorrow.", french: "Il fera beau demain." },
      { english: "I think he won't come.", french: "Je pense qu'il ne viendra pas." }
    ],
    rules: [
      "Formation: Will + verbe base",
      "Pour des décisions prises au moment de parler",
      "Pour des promesses et offres d'aide",
      "Pour des prédictions générales",
      "Contraction: will → 'll, will not → won't"
    ]
  },
  {
    id: 6,
    title: "Les conditionnels 0 et 1",
    explanation: "Les conditionnels expriment des conditions et leurs résultats.",
    examples: [
      { english: "If you heat water, it boils. (0)", french: "Si vous chauffez l'eau, elle bout." },
      { english: "If it rains, I'll stay home. (1)", french: "S'il pleut, je resterai à la maison." },
      { english: "If you don't hurry, you'll miss the bus. (1)", french: "Si tu ne te dépêches pas, tu rateras le bus." }
    ],
    rules: [
      "Conditionnel 0: If + présent, présent (faits généraux)",
      "Conditionnel 1: If + présent, will + verbe base (situations réelles ou possibles)",
      "L'ordre des propositions peut être inversé",
      "When peut remplacer if dans le conditionnel 0"
    ]
  },
  {
    id: 7,
    title: "Les comparatifs et superlatifs",
    explanation: "Les comparatifs et superlatifs sont utilisés pour comparer des personnes, des objets ou des actions.",
    examples: [
      { english: "This book is more interesting than that one.", french: "Ce livre est plus intéressant que celui-là." },
      { english: "He is the tallest in the class.", french: "Il est le plus grand de la classe." },
      { english: "She works harder than me.", french: "Elle travaille plus dur que moi." }
    ],
    rules: [
      "Adjectifs courts: -er (comparatif), -est (superlatif)",
      "Adjectifs longs: more (comparatif), most (superlatif)",
      "Irréguliers: good → better → best, bad → worse → worst",
      "Égalité: as + adjectif + as"
    ]
  },
  {
    id: 8,
    title: "Les noms dénombrables et indénombrables",
    explanation: "Les noms dénombrables peuvent être comptés, les indénombrables ne le peuvent pas.",
    examples: [
      { english: "There are three apples on the table.", french: "Il y a trois pommes sur la table." },
      { english: "I need some advice.", french: "J'ai besoin de conseils." },
      { english: "How much water do you need?", french: "Combien d'eau avez-vous besoin ?" }
    ],
    rules: [
      "Dénombrables: peuvent avoir un pluriel (one book → two books)",
      "Indénombrables: pas de pluriel (rice, water, information)",
      "Some/any utilisés avec les deux types",
      "Much avec indénombrables, many avec dénombrables"
    ]
  },
  {
    id: 9,
    title: "L'impératif",
    explanation: "L'impératif est utilisé pour donner des ordres, des instructions ou faire des suggestions.",
    examples: [
      { english: "Open the window, please.", french: "Ouvre la fenêtre, s'il te plaît." },
      { english: "Don't touch that!", french: "Ne touche pas à ça !" },
      { english: "Let's go to the cinema.", french: "Allons au cinéma." }
    ],
    rules: [
      "Forme affirmative: verbe base (sans sujet)",
      "Forme négative: Don't + verbe base",
      "Pour les suggestions: Let's + verbe base",
      "Pour la politesse: ajouter 'please'"
    ]
  },
  {
    id: 10,
    title: "Should, shouldn't",
    explanation: "Should et shouldn't sont utilisés pour donner des conseils ou exprimer une obligation morale.",
    examples: [
      { english: "You should see a doctor.", french: "Tu devrais voir un médecin." },
      { english: "We shouldn't eat too much sugar.", french: "Nous ne devrions pas manger trop de sucre." },
      { english: "Should I bring an umbrella?", french: "Devrais-je apporter un parapluie ?" }
    ],
    rules: [
      "Should + verbe base pour donner des conseils",
      "Shouldn't + verbe base pour déconseiller",
      "Question: Should + sujet + verbe base?",
      "Moins fort que must (obligation)"
    ]
  },
  {
    id: 11,
    title: "Must, mustn't, have to",
    explanation: "Ces modaux expriment l'obligation ou l'interdiction.",
    examples: [
      { english: "You must wear a seatbelt.", french: "Tu dois porter une ceinture de sécurité." },
      { english: "You mustn't smoke here.", french: "Tu ne dois pas fumer ici." },
      { english: "I have to work late today.", french: "Je dois travailler tard aujourd'hui." }
    ],
    rules: [
      "Must: obligation forte ou déduction",
      "Mustn't: interdiction",
      "Have to: obligation externe",
      "Don't have to: pas d'obligation"
    ]
  },
  {
    id: 12,
    title: "Might, might not, may",
    explanation: "Might et may expriment la possibilité ou la permission.",
    examples: [
      { english: "It might rain tomorrow.", french: "Il se peut qu'il pleuve demain." },
      { english: "She might not come to the party.", french: "Elle ne viendra peut-être pas à la fête." },
      { english: "May I use your phone?", french: "Puis-je utiliser votre téléphone ?" }
    ],
    rules: [
      "Might/may + verbe base pour la possibilité",
      "Might not pour l'incertitude",
      "May pour demander la permission (formel)",
      "Moins sûr que will"
    ]
  },
  {
    id: 13,
    title: "Les quantifieurs - some, any, much, many",
    explanation: "Les quantifieurs expriment la quantité.",
    examples: [
      { english: "I need some help.", french: "J'ai besoin d'aide." },
      { english: "Do you have any money?", french: "As-tu de l'argent ?" },
      { english: "There isn't much food left.", french: "Il ne reste pas beaucoup de nourriture." }
    ],
    rules: [
      "Some: phrases affirmatives, offres polies",
      "Any: phrases négatives et interrogatives",
      "Much: noms indénombrables",
      "Many: noms dénombrables pluriels"
    ]
  },
  {
    id: 14,
    title: "Would like",
    explanation: "Would like est une forme polie pour exprimer ce qu'on veut.",
    examples: [
      { english: "I would like a coffee, please.", french: "Je voudrais un café, s'il vous plaît." },
      { english: "Would you like to join us?", french: "Voudrais-tu nous rejoindre ?" },
      { english: "She wouldn't like to go alone.", french: "Elle ne voudrait pas y aller seule." }
    ],
    rules: [
      "Would like + nom (vouloir quelque chose)",
      "Would like to + verbe (vouloir faire quelque chose)",
      "Question: Would + sujet + like + ...?",
      "Plus poli que 'want'"
    ]
  },
  {
    id: 15,
    title: "Les verbes à particule (phrasal verbs) basiques",
    explanation: "Les verbes à particule sont des verbes suivis de prépositions ou d'adverbes qui changent leur sens.",
    examples: [
      { english: "Turn on the light, please.", french: "Allume la lumière, s'il te plaît." },
      { english: "I get up at 7 AM.", french: "Je me lève à 7 heures." },
      { english: "They took off their coats.", french: "Ils ont enlevé leurs manteaux." }
    ],
    rules: [
      "Verbe + préposition/adverbe = nouveau sens",
      "Certains sont séparables (put on/put it on)",
      "D'autres sont inséparables (look after)",
      "Phrasal verbs courants: get up, turn on/off, put on, take off, look for"
    ]
  },
  {
    id: 16,
    title: "Adjectifs en -ing et -ed",
    explanation: "Les adjectifs finissant en -ing et -ed décrivent différents aspects d'une situation.",
    examples: [
      { english: "The movie was boring.", french: "Le film était ennuyeux." },
      { english: "I was bored during the lecture.", french: "Je m'ennuyais pendant la conférence." },
      { english: "This is an exciting game!", french: "C'est un jeu passionnant !" }
    ],
    rules: [
      "-ing: décrit la cause de l'émotion/sensation",
      "-ed: décrit l'émotion/sensation ressentie",
      "Courants: interesting/interested, exciting/excited, boring/bored",
      "Confusing/confused, surprising/surprised, tiring/tired"
    ]
  },
  {
    id: 17,
    title: "Pronoms indéfinis",
    explanation: "Les pronoms indéfinis font référence à des personnes ou choses de manière générale.",
    examples: [
      { english: "Someone is at the door.", french: "Quelqu'un est à la porte." },
      { english: "Nobody knows the answer.", french: "Personne ne connaît la réponse." },
      { english: "Did you find anything interesting?", french: "As-tu trouvé quelque chose d'intéressant ?" }
    ],
    rules: [
      "Personnes: someone/somebody, anyone/anybody, no one/nobody, everyone/everybody",
      "Choses: something, anything, nothing, everything",
      "Lieux: somewhere, anywhere, nowhere, everywhere",
      "Utilisation similaire à some/any"
    ]
  },
  {
    id: 18,
    title: "Le présent continu pour le futur",
    explanation: "Le présent continu peut exprimer des arrangements futurs définis.",
    examples: [
      { english: "I'm meeting John tomorrow.", french: "Je rencontre John demain." },
      { english: "We're flying to London next week.", french: "Nous prenons l'avion pour Londres la semaine prochaine." },
      { english: "Are you working this weekend?", french: "Travailles-tu ce weekend ?" }
    ],
    rules: [
      "Pour des arrangements prévus avec certitude",
      "Souvent avec des expressions de temps future",
      "Plus défini que will, moins que present simple",
      "Nécessite une organisation préalable"
    ]
  },
  {
    id: 19,
    title: "Les adverbes de manière",
    explanation: "Les adverbes de manière décrivent comment une action est réalisée.",
    examples: [
      { english: "She speaks English fluently.", french: "Elle parle anglais couramment." },
      { english: "He drove carefully in the rain.", french: "Il a conduit prudemment sous la pluie." },
      { english: "They worked quickly to finish on time.", french: "Ils ont travaillé rapidement pour finir à temps." }
    ],
    rules: [
      "Formation: adjectif + ly (quick → quickly)",
      "Irréguliers: good → well, fast → fast",
      "Position: après le verbe ou à la fin de la phrase",
      "Ne pas confondre avec l'adjectif"
    ]
  },
  {
    id: 20,
    title: "Questions avec mots interrogatifs avancés",
    explanation: "Utilisation avancée des mots interrogatifs pour poser des questions.",
    examples: [
      { english: "How long have you been here?", french: "Depuis combien de temps es-tu ici ?" },
      { english: "How often do you exercise?", french: "À quelle fréquence fais-tu de l'exercice ?" },
      { english: "How far is the station?", french: "À quelle distance est la gare ?" }
    ],
    rules: [
      "How long: durée",
      "How often: fréquence",
      "How far: distance",
      "How much/many: quantité",
      "Which: choix parmi des options"
    ]
  },
  {
    id: 21,
    title: "So, neither - réponses courtes",
    explanation: "So et neither sont utilisés pour montrer un accord ou un désaccord.",
    examples: [
      { english: "I'm tired. - So am I.", french: "Je suis fatigué. - Moi aussi." },
      { english: "I don't like coffee. - Neither do I.", french: "Je n'aime pas le café. - Moi non plus." },
      { english: "She can swim. - So can he.", french: "Elle sait nager. - Lui aussi." }
    ],
    rules: [
      "So + auxiliaire + sujet (accord affirmatif)",
      "Neither + auxiliaire + sujet (accord négatif)",
      "L'auxiliaire suit le temps du verbe original",
      "Me too/Me neither pour des réponses plus simples"
    ]
  },
  {
    id: 22,
    title: "Les dates et les chiffres",
    explanation: "Comment exprimer les dates, heures et chiffres en anglais.",
    examples: [
      { english: "My birthday is on June 15th.", french: "Mon anniversaire est le 15 juin." },
      { english: "It's quarter past ten. (10:15)", french: "Il est dix heures et quart." },
      { english: "The temperature is minus five degrees. (-5°)", french: "La température est de moins cinq degrés." }
    ],
    rules: [
      "Dates: préposition 'on' + jour + mois (on March 21st)",
      "Heures: It's + heure (It's half past eight = 8:30)",
      "Années: En anglais britannique 'nineteen ninety-nine' (1999), en anglais américain parfois 'nineteen ninety-nine' ou 'two thousand'",
      "Nombres ordinaux: first (1st), second (2nd), third (3rd), fourth (4th)..."
    ]
  },
  {
    id: 23,
    title: "Questions avec how + adjectif",
    explanation: "Formation de questions avec 'how' suivi d'un adjectif pour demander des informations spécifiques.",
    examples: [
      { english: "How old are you?", french: "Quel âge as-tu ?" },
      { english: "How tall is your brother?", french: "Quelle est la taille de ton frère ?" },
      { english: "How big is your apartment?", french: "Quelle est la taille de ton appartement ?" }
    ],
    rules: [
      "Structure: How + adjectif + be + sujet",
      "Courant avec: old (âge), tall (hauteur), big (taille), heavy (poids), long (longueur)",
      "Peut être utilisé pour demander des mesures ou des caractéristiques",
      "Réponse: souvent avec unités de mesure (I'm 25 years old, It's 2 meters long)"
    ]
  }
];

export default grammarRulesA2;
