// grammarRulesB2.js
// Fichier contenant uniquement les règles grammaticales pour le niveau B2 du CECR

const grammarRulesB2 = [
  {
    id: 1,
    title: "Les temps futurs avancés",
    explanation: "Utilisation des futurs complexes (future continuous, future perfect, future perfect continuous).",
    examples: [
      { english: "This time tomorrow, I'll be lying on the beach.", french: "Demain à cette heure-ci, je serai en train de bronzer sur la plage." },
      { english: "By 2030, they will have completed the project.", french: "D'ici 2030, ils auront terminé le projet." },
      { english: "By next year, she will have been working here for 10 years.", french: "L'année prochaine, cela fera 10 ans qu'elle travaille ici." }
    ],
    rules: [
      "Future continuous: will + be + verbe-ing",
      "Future perfect: will + have + past participle",
      "Future perfect continuous: will + have + been + verbe-ing",
      "Utilisés pour des actions futures en cours ou terminées à un moment précis"
    ]
  },
  {
    id: 2,
    title: "Les conditionnels mixtes",
    explanation: "Combinaison de différentes formes conditionnelles pour exprimer des situations complexes.",
    examples: [
      { english: "If I had studied harder (past), I would have a better job now (present).", french: "Si j'avais étudié plus dur, j'aurais un meilleur emploi maintenant." },
      { english: "If I were rich (present), I would have traveled the world (past).", french: "Si j'étais riche, j'aurais voyagé à travers le monde." },
      { english: "If she had left earlier, she would be here by now.", french: "Si elle était partie plus tôt, elle serait ici maintenant." }
    ],
    rules: [
      "Condition passée + résultat présent",
      "Condition présente + résultat passé",
      "Mélange les structures du 2ème et 3ème conditionnel",
      "Exprime des liens complexes entre passé et présent"
    ]
  },
  {
    id: 3,
    title: "Alternatives à 'if' dans les conditionnels",
    explanation: "Autres façons d'exprimer des conditions sans utiliser 'if'.",
    examples: [
      { english: "Should you need help, please call me.", french: "Si vous aviez besoin d'aide, appelez-moi." },
      { english: "Were I to win the lottery, I'd buy a house.", french: "Si je gagnais à la loterie, j'achèterais une maison." },
      { english: "Had I known earlier, I would have acted differently.", french: "Si j'avais su plus tôt, j'aurais agi différemment." }
    ],
    rules: [
      "Inversion avec should, were, had",
      "Unless = if not",
      "Provided/providing (that)",
      "As long as (du moment que)"
    ]
  },
  {
    id: 4,
    title: "La voix passive - temps complexes",
    explanation: "Utilisation de la voix passive avec des structures plus avancées.",
    examples: [
      { english: "The project will have been completed by next month.", french: "Le projet aura été terminé d'ici le mois prochain." },
      { english: "The building has been being renovated for months.", french: "Le bâtiment est en cours de rénovation depuis des mois." },
      { english: "If the forms had been filled out correctly, the process would have been completed.", french: "Si les formulaires avaient été correctement remplis, le processus aurait été terminé." }
    ],
    rules: [
      "Passive avec modaux: can be done, must be done",
      "Passive avec temps parfaits: has been done, had been done",
      "Passive avec gérondifs: being done",
      "Passive dans les conditionnels"
    ]
  },
  {
    id: 5,
    title: "Les propositions relatives avancées",
    explanation: "Propositions relatives avec prépositions et relatives réduites.",
    examples: [
      { english: "The person to whom I was speaking is the manager.", french: "La personne à qui je parlais est le directeur." },
      { english: "The issue we're dealing with is serious.", french: "Le problème dont nous nous occupons est sérieux." },
      { english: "The man standing over there is my boss.", french: "L'homme qui se tient là-bas est mon patron." }
    ],
    rules: [
      "Relatives avec prépositions: to whom, with which",
      "Relatives réduites: omission du pronom + 'be'",
      "Which pour référer à une phrase entière",
      "Relatives de participes: the book written by..."
    ]
  },
  {
    id: 6,
    title: "Discours rapporté - structures avancées",
    explanation: "Rapporter des ordres, suggestions et questions complexes.",
    examples: [
      { english: "'Don't forget to call me,' she reminded him. → She reminded him not to forget to call her.", french: "'N'oublie pas de m'appeler,' lui rappela-t-elle. → Elle lui a rappelé de ne pas oublier de l'appeler." },
      { english: "'Let's go to the beach,' he suggested. → He suggested going to the beach.", french: "'Allons à la plage,' suggéra-t-il. → Il a suggéré d'aller à la plage." },
      { english: "'If I were you...' she advised. → She advised me what to do.", french: "'Si j'étais toi...' conseilla-t-elle. → Elle m'a conseillé sur ce qu'il fallait faire." }
    ],
    rules: [
      "Rapporter des ordres: told/asked someone to...",
      "Rapporter des suggestions: suggested + gerund",
      "Rapporter des questions: wondered, wanted to know",
      "Backshift: temps qui reculent d'un cran"
    ]
  },
  {
    id: 7,
    title: "Modaux de probabilité et déduction au passé",
    explanation: "Utilisation des modaux pour des déductions sur des actions passées.",
    examples: [
      { english: "She must have left early - she's not here.", french: "Elle a dû partir tôt - elle n'est pas là." },
      { english: "He can't have passed the exam - he didn't study.", french: "Il n'a pas pu réussir l'examen - il n'a pas étudié." },
      { english: "They might have gone to the cinema.", french: "Ils sont peut-être allés au cinéma." }
    ],
    rules: [
      "Must have + past participle: probabilité forte",
      "Can't have + past participle: impossibilité",
      "Might/could have + past participle: possibilité",
      "Should have + past participle: ce qui aurait dû arriver"
    ]
  },
  {
    id: 8,
    title: "Inversion pour emphase et style formel",
    explanation: "Utilisation d'inversions avancées pour l'emphase.",
    examples: [
      { english: "Not only did she pass, but she got the highest score.", french: "Non seulement elle a réussi, mais elle a obtenu la meilleure note." },
      { english: "Seldom have I seen such talent.", french: "Rarement ai-je vu un tel talent." },
      { english: "Under no circumstances should you give up.", french: "En aucun cas tu ne devrais abandonner." }
    ],
    rules: [
      "Not only... but also",
      "Seldom, rarely: inversion avec auxiliaire",
      "Under no circumstances: inversion",
      "So + adjectif: inversion avec auxiliaire"
    ]
  },
  {
    id: 9,
    title: "Participer clauses (clauses participiales)",
    explanation: "Structures utilisant des participes pour raccourcir les phrases.",
    examples: [
      { english: "Having finished his work, he went home.", french: "Ayant fini son travail, il est rentré chez lui." },
      { english: "Being very tired, she decided to rest.", french: "Étant très fatiguée, elle a décidé de se reposer." },
      { english: "The man sitting next to me is famous.", french: "L'homme assis à côté de moi est célèbre." }
    ],
    rules: [
      "Present participle: verbe-ing pour simultanéité",
      "Past participle: participe passé pour action antérieure",
      "Perfect participle: having + past participle",
      "Having been + past participle pour action passive antérieure"
    ]
  },
  {
    id: 10,
    title: "Cleft sentences (phrases clivées)",
    explanation: "Structures pour mettre l'accent sur un élément particulier de la phrase.",
    examples: [
      { english: "It was John who broke the window.", french: "C'est John qui a cassé la fenêtre." },
      { english: "What I need is some rest.", french: "Ce dont j'ai besoin, c'est du repos." },
      { english: "All I want is to be left alone.", french: "Tout ce que je veux, c'est qu'on me laisse tranquille." }
    ],
    rules: [
      "It + be + élément à souligner + who/that/when/where...",
      "What/All/The thing + pronom relatif + be",
      "Pour l'emphase et la focalisation",
      "Très utilisé à l'oral pour clarifier"
    ]
  },
  {
    id: 11,
    title: "Wish et if only",
    explanation: "Exprimer des regrets ou des souhaits irréels.",
    examples: [
      { english: "I wish I had more time.", french: "J'aimerais avoir plus de temps." },
      { english: "If only I hadn't said that!", french: "Si seulement je n'avais pas dit ça !" },
      { english: "I wish you wouldn't smoke.", french: "J'aimerais que tu ne fumes pas." }
    ],
    rules: [
      "Wish + past simple: souhait présent",
      "Wish + past perfect: regret passé",
      "Wish + would: comportement irritant",
      "If only: plus emphatique que wish"
    ]
  },
  {
    id: 12,
    title: "Le subjonctif en anglais",
    explanation: "Utilisations limitées mais importantes du subjonctif en anglais moderne.",
    examples: [
      { english: "It's essential that he be there on time.", french: "Il est essentiel qu'il soit là à l'heure." },
      { english: "I suggest that she apply for the job.", french: "Je suggère qu'elle postule pour l'emploi." },
      { english: "If I were you, I would go.", french: "Si j'étais toi, j'irais." }
    ],
    rules: [
      "Subjonctif après des verbes de suggestion: suggest, recommend, insist",
      "Subjonctif avec certaines expressions: it's important that...",
      "Were au lieu de was dans les conditionnels",
      "Forme base du verbe pour toutes les personnes"
    ]
  },
  {
    id: 13,
    title: "Verbes causatifs (have/get something done)",
    explanation: "Structures pour exprimer qu'on fait faire quelque chose par quelqu'un d'autre.",
    examples: [
      { english: "I had my car repaired.", french: "J'ai fait réparer ma voiture." },
      { english: "She got her hair cut yesterday.", french: "Elle s'est fait couper les cheveux hier." },
      { english: "We need to have the house painted.", french: "Nous devons faire peindre la maison." }
    ],
    rules: [
      "Have + objet + past participle (plus formel)",
      "Get + objet + past participle (plus familier)",
      "Indique que l'action est faite par quelqu'un d'autre",
      "Passif: I had my wallet stolen"
    ]
  },
  {
    id: 14,
    title: "Verbes aux sens multiples",
    explanation: "Verbes de perception et autres verbes avec plusieurs sens et constructions.",
    examples: [
      { english: "I saw him leave. / I saw him leaving.", french: "Je l'ai vu partir. / Je l'ai vu en train de partir." },
      { english: "I heard you calling. / I heard you call.", french: "Je t'ai entendu appeler. / Je t'ai entendu appeler." },
      { english: "The food smells good. / He smells the flowers.", french: "La nourriture sent bon. / Il sent les fleurs." }
    ],
    rules: [
      "See/hear/watch + objet + infinitive (action complète)",
      "See/hear/watch + objet + present participle (action en cours)",
      "Look/sound/feel/taste + adjectif (description)",
      "Différence entre actif et statif"
    ]
  },
  {
    id: 15,
    title: "Ellipse et substitution",
    explanation: "Éviter les répétitions en omettant ou en substituant des éléments.",
    examples: [
      { english: "I can swim, but my brother can't (swim).", french: "Je sais nager, mais mon frère ne sait pas." },
      { english: "She likes coffee, and so do I.", french: "Elle aime le café, et moi aussi." },
      { english: "If you can help me, please do (so).", french: "Si tu peux m'aider, fais-le s'il te plaît." }
    ],
    rules: [
      "Ellipse du verbe principal après auxiliaire",
      "So pour remplacer une clause entière",
      "One/ones pour remplacer un nom",
      "Do pour remplacer un verbe principal"
    ]
  },
  {
    id: 16,
    title: "Phénomènes grammaticaux particuliers",
    explanation: "Constructions uniques et exceptions grammaticales.",
    examples: [
      { english: "Hardly had we left when it started raining.", french: "À peine étions-nous partis qu'il a commencé à pleuvoir." },
      { english: "The sooner we start, the better it will be.", french: "Plus vite nous commencerons, mieux ce sera." },
      { english: "Whether you like it or not, we're going.", french: "Que ça te plaise ou non, nous y allons." }
    ],
    rules: [
      "Hardly...when construction",
      "The + comparatif...the + comparatif",
      "Whether...or (not)",
      "Much as / even though constructions"
    ]
  },
  {
    id: 17,
    title: "Prépositions avancées et phrasal verbs",
    explanation: "Prépositions complexes et verbes à particule avec multiples significations.",
    examples: [
      { english: "In spite of / despite the rain, we continued.", french: "Malgré la pluie, nous avons continué." },
      { english: "With regard to your application...", french: "En ce qui concerne votre candidature..." },
      { english: "I'm looking forward to seeing you.", french: "J'ai hâte de te voir." }
    ],
    rules: [
      "Prépositions complexes: in spite of, with regard to",
      "To après certaines expressions: look forward to",
      "Phrasal verbs avec prépositions obligatoires",
      "Verbes différents selon la préposition"
    ]
  },
  {
    id: 18,
    title: "Inversion conditionnelle",
    explanation: "Inversion dans les structures conditionnelles alternatives.",
    examples: [
      { english: "Should you need any help, call me.", french: "Si vous aviez besoin d'aide, appelez-moi." },
      { english: "Were it not for your help, I'd be lost.", french: "Sans votre aide, je serais perdu." },
      { english: "Had I known, I would have come earlier.", french: "Si j'avais su, je serais venu plus tôt." }
    ],
    rules: [
      "Should + sujet + verbe (pour if + present)",
      "Were + sujet + to-infinitive (pour if + past)",
      "Had + sujet + past participle (pour if + past perfect)",
      "Utilisé dans un style formel et écrit"
    ]
  },
  {
    id: 19,
    title: "It patterns (structures avec 'it')",
    explanation: "Différentes structures utilisant 'it' comme sujet formel.",
    examples: [
      { english: "It's no use complaining.", french: "Ça ne sert à rien de se plaindre." },
      { english: "It's worth trying.", french: "Ça vaut la peine d'essayer." },
      { english: "It takes time to learn a language.", french: "Il faut du temps pour apprendre une langue." }
    ],
    rules: [
      "It's no use/good + gerund",
      "It's worth + gerund",
      "It takes + time/effort",
      "It + be + adjectif + to-infinitive"
    ]
  },
  {
    id: 20,
    title: "Connecteurs de discours avancés",
    explanation: "Mots de liaison sophistiqués pour structurer le discours.",
    examples: [
      { english: "Notwithstanding the difficulties, we succeeded.", french: "Malgré les difficultés, nous avons réussi." },
      { english: "The project was, nevertheless, successful.", french: "Le projet fut néanmoins réussi." },
      { english: "Moreover, the costs were lower than expected.", french: "De plus, les coûts étaient inférieurs aux prévisions." }
    ],
    rules: [
      "Notwithstanding, nevertheless, nonetheless",
      "Moreover, furthermore, in addition",
      "Consequently, subsequently, hence",
      "In contrast, conversely, on the contrary"
    ]
  },
  {
    id: 21,
    title: "Négations avancées",
    explanation: "Structures de négation complexes et leurs nuances.",
    examples: [
      { english: "I can't help laughing.", french: "Je ne peux pas m'empêcher de rire." },
      { english: "Nothing could be further from the truth.", french: "Rien ne saurait être plus éloigné de la vérité." },
      { english: "I'm not unwilling to help.", french: "Je ne suis pas réticent à aider." }
    ],
    rules: [
      "Double négatives pour affirmation implicite",
      "Can't help + gerund",
      "Nothing/no one + comparatif",
      "Pas même: not even, not so much as"
    ]
  },
  {
    id: 22,
    title: "Modaux pour critiques et reproches",
    explanation: "Utiliser les modaux pour exprimer critiques et reproches.",
    examples: [
      { english: "You should have told me earlier.", french: "Tu aurais dû me le dire plus tôt." },
      { english: "You needn't have worried.", french: "Tu n'avais pas besoin de t'inquiéter." },
      { english: "You might have called!", french: "Tu aurais pu appeler !" }
    ],
    rules: [
      "Should have: critique/regret",
      "Needn't have: action inutile accomplie",
      "Could have: opportunité manquée",
      "Might have: reproche modéré"
    ]
  },
  {
    id: 23,
    title: "Adjectifs avec prépositions",
    explanation: "Adjectifs suivis de prépositions spécifiques et leur usage dans des contextes avancés.",
    examples: [
      { english: "I'm pleased with your progress.", french: "Je suis content de tes progrès." },
      { english: "The decision is independent of politics.", french: "La décision est indépendante de la politique." },
      { english: "She's very capable of handling the situation.", french: "Elle est tout à fait capable de gérer la situation." }
    ],
    rules: [
      "Pleased/content with",
      "Independent/dependent of",
      "Capable/incapable of",
      "Different from/to, similar to"
    ]
  },
  {
    id: 24,
    title: "Passive infinitive et gerund",
    explanation: "Utilisation du passif avec les infinitifs et les gérondifs.",
    examples: [
      { english: "I don't like being told what to do.", french: "Je n'aime pas qu'on me dise quoi faire." },
      { english: "The report needs to be finished by tomorrow.", french: "Le rapport doit être terminé d'ici demain." },
      { english: "Having been warned, they left early.", french: "Ayant été prévenus, ils sont partis tôt." }
    ],
    rules: [
      "Being + past participle (gerund passif)",
      "To be + past participle (infinitif passif)",
      "Having been + past participle (participe passif parfait)",
      "Need/want/require + gerund (sens passif)"
    ]
  },
  {
    id: 25,
    title: "Emphasis et Hedging",
    explanation: "Techniques pour souligner ou atténuer des affirmations.",
    examples: [
      { english: "It was precisely because of this that we succeeded.", french: "C'est précisément pour cette raison que nous avons réussi." },
      { english: "To some extent, the results were positive.", french: "Dans une certaine mesure, les résultats étaient positifs." },
      { english: "It would appear that we have a problem.", french: "Il semblerait que nous ayons un problème." }
    ],
    rules: [
      "Emphasis: precisely, exactly, indeed",
      "Hedging: somewhat, to some extent, apparently",
      "Distancing: It would seem/appear that",
      "Qualifying: largely, partly, mainly"
    ]
  }
];

export default grammarRulesB2;