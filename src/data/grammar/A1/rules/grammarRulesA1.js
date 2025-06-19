// grammarRulesA1.js
// Fichier contenant uniquement les règles grammaticales pour le niveau A1 du CECR

const grammarRulesA1 = [
  {
    id: 1,
    title: "Le verbe 'être' (to be)",
    explanation: "Le verbe 'être' est utilisé pour décrire des caractéristiques, des états, des identités et des localisations.",
    examples: [
      { english: "I am a student.", french: "Je suis étudiant(e)." },
      { english: "She is happy.", french: "Elle est heureuse." },
      { english: "They are at home.", french: "Ils/Elles sont à la maison." }
    ],
    rules: [
      "Forme affirmative: I am (I'm), you are (you're), he/she/it is (he's/she's/it's), we are (we're), they are (they're)",
      "Forme négative: I am not (I'm not), you are not (you aren't), he/she/it is not (he/she/it isn't), we are not (we aren't), they are not (they aren't)",
      "Forme interrogative: Am I?, Are you?, Is he/she/it?, Are we?, Are they?"
    ]
  },
  {
    id: 2,
    title: "Le présent simple",
    explanation: "Le présent simple est utilisé pour parler d'habitudes, de faits généraux, de vérités permanentes et d'actions répétées.",
    examples: [
      { english: "I work in a bank.", french: "Je travaille dans une banque." },
      { english: "He plays tennis every Sunday.", french: "Il joue au tennis tous les dimanches." },
      { english: "The sun rises in the east.", french: "Le soleil se lève à l'est." }
    ],
    rules: [
      "Forme de base: I/You/We/They + verbe base",
      "Troisième personne du singulier: He/She/It + verbe + s/es/ies",
      "Forme négative: I/You/We/They do not (don't) + verbe base, He/She/It does not (doesn't) + verbe base",
      "Forme interrogative: Do + I/you/we/they + verbe base?, Does + he/she/it + verbe base?"
    ]
  },
  {
    id: 3,
    title: "Le présent continu",
    explanation: "Le présent continu est utilisé pour parler d'actions qui se déroulent au moment où l'on parle ou autour du moment présent.",
    examples: [
      { english: "I am reading a book now.", french: "Je suis en train de lire un livre maintenant." },
      { english: "They are working on a project.", french: "Ils/Elles travaillent sur un projet." },
      { english: "She is not studying at the moment.", french: "Elle n'est pas en train d'étudier en ce moment." }
    ],
    rules: [
      "Formation: sujet + be (am/is/are) + verbe + ing",
      "Forme négative: sujet + be + not + verbe + ing",
      "Forme interrogative: be + sujet + verbe + ing?"
    ]
  },
  {
    id: 4,
    title: "Les pronoms personnels",
    explanation: "Les pronoms personnels remplacent les noms et évitent les répétitions.",
    examples: [
      { english: "I am from France.", french: "Je viens de France." },
      { english: "She likes music.", french: "Elle aime la musique." },
      { english: "They live in London.", french: "Ils/Elles habitent à Londres." }
    ],
    rules: [
      "Pronoms sujets: I, you, he, she, it, we, they",
      "Pronoms compléments: me, you, him, her, it, us, them"
    ]
  },
  {
    id: 5,
    title: "Les adjectifs possessifs",
    explanation: "Les adjectifs possessifs indiquent la possession ou l'appartenance.",
    examples: [
      { english: "This is my book.", french: "C'est mon livre." },
      { english: "Her car is red.", french: "Sa voiture est rouge." },
      { english: "Their house is big.", french: "Leur maison est grande." }
    ],
    rules: [
      "Adjectifs possessifs: my, your, his, her, its, our, their",
      "Ils s'accordent avec le possesseur (qui possède) et non avec l'objet possédé (comme en français)"
    ]
  },
  {
    id: 6,
    title: "Les articles (a/an, the)",
    explanation: "Les articles sont des déterminants qui précèdent les noms.",
    examples: [
      { english: "I have a car.", french: "J'ai une voiture." },
      { english: "She is an engineer.", french: "Elle est ingénieure." },
      { english: "The book is on the table.", french: "Le livre est sur la table." }
    ],
    rules: [
      "Article indéfini 'a' - utilisé devant les noms singuliers commençant par une consonne",
      "Article indéfini 'an' - utilisé devant les noms singuliers commençant par une voyelle",
      "Article défini 'the' - utilisé pour les choses spécifiques ou déjà mentionnées"
    ]
  },
  {
    id: 7,
    title: "Les noms au pluriel",
    explanation: "En anglais, la plupart des noms forment leur pluriel en ajoutant -s ou -es.",
    examples: [
      { english: "one book - two books", french: "un livre - deux livres" },
      { english: "one box - two boxes", french: "une boîte - deux boîtes" },
      { english: "one child - two children", french: "un enfant - deux enfants" }
    ],
    rules: [
      "Règle générale: ajouter -s (book → books)",
      "Noms se terminant par s, ss, sh, ch, x, o: ajouter -es (box → boxes)",
      "Noms se terminant par consonne + y: changer y en i et ajouter -es (baby → babies)",
      "Certains pluriels irréguliers: child → children, man → men, woman → women, foot → feet"
    ]
  },
  {
    id: 8,
    title: "Les prépositions de base",
    explanation: "Les prépositions sont utilisées pour exprimer les relations de temps, de lieu ou de manière.",
    examples: [
      { english: "The book is on the table.", french: "Le livre est sur la table." },
      { english: "She lives in London.", french: "Elle habite à Londres." },
      { english: "The class starts at 9 o'clock.", french: "Le cours commence à 9 heures." }
    ],
    rules: [
      "Prépositions de lieu: in, on, at, under, behind, in front of, next to, between",
      "Prépositions de temps: at, in, on, before, after, during",
      "Prépositions de mouvement: to, from, into, out of"
    ]
  },
  {
    id: 9,
    title: "Formation des questions",
    explanation: "En anglais, les questions sont formées en inversant le sujet et l'auxiliaire.",
    examples: [
      { english: "Are you a teacher?", french: "Es-tu professeur ?" },
      { english: "Do you like coffee?", french: "Aimes-tu le café ?" },
      { english: "Where does she live?", french: "Où habite-t-elle ?" }
    ],
    rules: [
      "Questions avec be: Be + sujet (Is she happy?)",
      "Questions au présent simple: Do/Does + sujet + verbe base (Do you work here?)",
      "Questions au présent continu: Be + sujet + verbe-ing (Are you working now?)",
      "Questions avec mots interrogatifs: What, Where, When, Why, How + auxiliaire + sujet"
    ]
  },
  {
    id: 10,
    title: "There is/There are",
    explanation: "There is/are est utilisé pour indiquer l'existence ou la présence de quelque chose.",
    examples: [
      { english: "There is a book on the table.", french: "Il y a un livre sur la table." },
      { english: "There are some students in the class.", french: "Il y a des étudiants dans la classe." },
      { english: "There isn't any milk in the fridge.", french: "Il n'y a pas de lait dans le réfrigérateur." }
    ],
    rules: [
      "There is + nom singulier - pour parler d'une seule chose",
      "There are + nom pluriel - pour parler de plusieurs choses",
      "Forme négative: There is not (isn't) / There are not (aren't)",
      "Forme interrogative: Is there...? / Are there...?"
    ]
  },
  {
    id: 11,
    title: "Le modal 'can'",
    explanation: "Can est utilisé pour exprimer la capacité, la possibilité ou demander la permission.",
    examples: [
      { english: "I can swim.", french: "Je sais/peux nager." },
      { english: "She can't drive.", french: "Elle ne sait pas/ne peut pas conduire." },
      { english: "Can you help me, please?", french: "Peux-tu m'aider, s'il te plaît ?" }
    ],
    rules: [
      "Forme affirmative: sujet + can + verbe base",
      "Forme négative: sujet + cannot (can't) + verbe base",
      "Forme interrogative: Can + sujet + verbe base?"
    ]
  },
  {
    id: 12,
    title: "Have got",
    explanation: "Have got est utilisé pour exprimer la possession ou les relations.",
    examples: [
      { english: "I've got a new car.", french: "J'ai une nouvelle voiture." },
      { english: "She has got two brothers.", french: "Elle a deux frères." },
      { english: "They haven't got any money.", french: "Ils n'ont pas d'argent." }
    ],
    rules: [
      "Forme affirmative: I/You/We/They + have got, He/She/It + has got",
      "Forme contractée: I've got, You've got, He's/She's/It's got, We've got, They've got",
      "Forme négative: I/You/We/They + have not got (haven't got), He/She/It + has not got (hasn't got)",
      "Forme interrogative: Have + I/you/we/they + got?, Has + he/she/it + got?"
    ]
  },
  {
    id: 13,
    title: "Les démonstratifs (this, that, these, those)",
    explanation: "Les démonstratifs sont utilisés pour indiquer des personnes ou des choses en fonction de leur proximité.",
    examples: [
      { english: "This is my book.", french: "C'est mon livre. (proche)" },
      { english: "That is her house.", french: "C'est sa maison. (éloigné)" },
      { english: "These are my friends.", french: "Ce sont mes amis. (proche)" },
      { english: "Those are his parents.", french: "Ce sont ses parents. (éloigné)" }
    ],
    rules: [
      "This - pour désigner quelque chose de proche (singulier)",
      "That - pour désigner quelque chose d'éloigné (singulier)",
      "These - pour désigner des choses proches (pluriel)",
      "Those - pour désigner des choses éloignées (pluriel)"
    ]
  },
  {
    id: 14,
    title: "Some et any",
    explanation: "Some et any sont des déterminants utilisés avec des noms dénombrables pluriels et des noms indénombrables.",
    examples: [
      { english: "I have some money.", french: "J'ai de l'argent." },
      { english: "Do you have any friends in London?", french: "As-tu des amis à Londres ?" },
      { english: "There aren't any books on the table.", french: "Il n'y a pas de livres sur la table." }
    ],
    rules: [
      "Some - généralement utilisé dans les phrases affirmatives",
      "Any - généralement utilisé dans les phrases négatives et interrogatives",
      "Some - peut aussi être utilisé dans les questions qui sont des offres ou des demandes polies"
    ]
  },
  {
    id: 15,
    title: "Quantifieurs de base (much, many, a lot of)",
    explanation: "Les quantifieurs sont utilisés pour exprimer la quantité.",
    examples: [
      { english: "I don't have much time.", french: "Je n'ai pas beaucoup de temps." },
      { english: "She has many friends.", french: "Elle a beaucoup d'amis." },
      { english: "They have a lot of money.", french: "Ils ont beaucoup d'argent." }
    ],
    rules: [
      "Much - utilisé avec des noms indénombrables (water, time, money)",
      "Many - utilisé avec des noms dénombrables pluriels (books, people, cars)",
      "A lot of / Lots of - utilisé avec des noms dénombrables et indénombrables"
    ]
  },
  {
    id: 16,
    title: "Les adverbes de fréquence",
    explanation: "Les adverbes de fréquence indiquent à quelle fréquence une action se produit.",
    examples: [
      { english: "I always drink coffee in the morning.", french: "Je bois toujours du café le matin." },
      { english: "She sometimes goes to the gym.", french: "Elle va parfois à la salle de sport." },
      { english: "They never eat meat.", french: "Ils ne mangent jamais de viande." }
    ],
    rules: [
      "Position: généralement avant le verbe principal, mais après le verbe 'be'",
      "Ordre de fréquence: always (100%), usually, often, sometimes, rarely, never (0%)",
      "She is always late. / He always comes early."
    ]
  },
  {
    id: 17,
    title: "Le génitif possessif ('s)",
    explanation: "Le génitif possessif est utilisé pour exprimer la possession ou la relation.",
    examples: [
      { english: "John's car is red.", french: "La voiture de John est rouge." },
      { english: "My sister's husband works here.", french: "Le mari de ma sœur travaille ici." },
      { english: "The children's toys are on the floor.", french: "Les jouets des enfants sont sur le sol." }
    ],
    rules: [
      "Singulier: ajouter 's (John's)",
      "Pluriel se terminant par -s: ajouter juste l'apostrophe (my parents' house)",
      "Pluriel irrégulier: ajouter 's (children's)",
      "Pour les objets inanimés, on utilise souvent 'of' à la place (the leg of the table)"
    ]
  },
  {
    id: 18,
    title: "Les conjonctions simples",
    explanation: "Les conjonctions simples sont utilisées pour relier des mots, des expressions ou des propositions.",
    examples: [
      { english: "I like tea and coffee.", french: "J'aime le thé et le café." },
      { english: "She is tired but happy.", french: "Elle est fatiguée mais heureuse." },
      { english: "Do you want tea or coffee?", french: "Veux-tu du thé ou du café ?" }
    ],
    rules: [
      "And: pour ajouter des informations",
      "But: pour exprimer un contraste",
      "Or: pour présenter une alternative",
      "So: pour indiquer un résultat ou une conséquence",
      "Because: pour donner une raison"
    ]
  },
  {
    id: 19,
    title: "L'impératif",
    explanation: "L'impératif est utilisé pour donner des ordres, des instructions, des conseils ou faire des suggestions.",
    examples: [
      { english: "Open the door, please.", french: "Ouvre la porte, s'il te plaît." },
      { english: "Don't touch that!", french: "Ne touche pas à ça !" },
      { english: "Be quiet in the library.", french: "Sois silencieux dans la bibliothèque." }
    ],
    rules: [
      "Forme affirmative: utiliser la forme base du verbe sans sujet (Listen!)",
      "Forme négative: Don't + forme base du verbe (Don't listen!)",
      "Pour être poli, ajouter 'please' au début ou à la fin",
      "Pour inclure le locuteur: Let's + verbe base (Let's go!)"
    ]
  },
  {
    id: 20,
    title: "Les mots interrogatifs",
    explanation: "Les mots interrogatifs sont utilisés pour poser des questions spécifiques.",
    examples: [
      { english: "What is your name?", french: "Quel est ton nom ?" },
      { english: "Where do you live?", french: "Où habites-tu ?" },
      { english: "When does the movie start?", french: "Quand commence le film ?" }
    ],
    rules: [
      "What: pour demander des informations sur les choses",
      "Where: pour demander des informations sur les lieux",
      "When: pour demander des informations sur le temps",
      "Who: pour demander des informations sur les personnes",
      "Why: pour demander des raisons",
      "How: pour demander la manière ou les moyens"
    ]
  }
];

export default grammarRulesA1;
