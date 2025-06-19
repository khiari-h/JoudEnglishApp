// grammarRulesB1.js
// Fichier contenant uniquement les règles grammaticales pour le niveau B1 du CECR

const grammarRulesB1 = [
  {
    id: 1,
    title: "Le présent parfait continu",
    explanation: "Le présent parfait continu exprime une action qui a commencé dans le passé et continue jusqu'à maintenant, souvent avec une durée.",
    examples: [
      { english: "I have been working here for three years.", french: "Je travaille ici depuis trois ans." },
      { english: "How long have you been studying English?", french: "Depuis combien de temps étudies-tu l'anglais ?" },
      { english: "She has been waiting for an hour.", french: "Elle attend depuis une heure." }
    ],
    rules: [
      "Formation: have/has + been + verbe-ing",
      "Utilisé pour une action qui a duré jusqu'à maintenant",
      "Souvent avec for/since pour la durée",
      "Différence avec present perfect: l'action est toujours en cours"
    ]
  },
  {
    id: 2,
    title: "Le passé simple vs le présent parfait",
    explanation: "Comprendre la différence entre ces deux temps est essentiel pour parler correctement du passé.",
    examples: [
      { english: "I lived in London for 5 years (no longer).", french: "J'ai vécu à Londres pendant 5 ans (ce n'est plus le cas)." },
      { english: "I have lived in London for 5 years (still there).", french: "J'habite à Londres depuis 5 ans (j'y suis toujours)." },
      { english: "Have you ever been to Japan?", french: "Es-tu déjà allé au Japon ?" }
    ],
    rules: [
      "Passé simple: actions terminées avec temps spécifié",
      "Présent parfait: actions avec impact sur le présent",
      "Present perfect pour expérience de vie (ever/never)",
      "Past simple pour séquence chronologique"
    ]
  },
  {
    id: 3,
    title: "Le passé parfait",
    explanation: "Le passé parfait exprime une action qui était terminée avant une autre action passée.",
    examples: [
      { english: "When I arrived, she had already left.", french: "Quand je suis arrivé, elle était déjà partie." },
      { english: "I had never seen such a beautiful place.", french: "Je n'avais jamais vu un endroit aussi beau." },
      { english: "They had eaten before we called.", french: "Ils avaient mangé avant qu'on appelle." }
    ],
    rules: [
      "Formation: had + past participle",
      "Pour une action antérieure à une autre action passée",
      "Souvent avec when, after, before, already",
      "Utilisé pour la chronologie des événements passés"
    ]
  },
  {
    id: 4,
    title: "Le passé parfait continu",
    explanation: "Le passé parfait continu exprime une action qui était en cours avant une autre action passée.",
    examples: [
      { english: "I had been waiting for 2 hours when she arrived.", french: "J'attendais depuis 2 heures quand elle est arrivée." },
      { english: "They had been working all day before they took a break.", french: "Ils travaillaient toute la journée avant de faire une pause." },
      { english: "It had been raining for hours when the sun came out.", french: "Il pleuvait depuis des heures quand le soleil est apparu." }
    ],
    rules: [
      "Formation: had + been + verbe-ing",
      "Action continue avant une autre action passée",
      "Met l'accent sur la durée et la continuité",
      "Souvent avec for/since pour la durée"
    ]
  },
  {
    id: 5,
    title: "Used to, would, be used to, get used to",
    explanation: "Ces structures expriment des habitudes passées ou l'adaptation à de nouvelles situations.",
    examples: [
      { english: "I used to play tennis every weekend.", french: "J'avais l'habitude de jouer au tennis chaque weekend." },
      { english: "She would always arrive late.", french: "Elle arrivait toujours en retard." },
      { english: "I'm getting used to the cold weather.", french: "Je m'habitue au temps froid." },
      { english: "Are you used to living alone?", french: "Es-tu habitué à vivre seul ?" }
    ],
    rules: [
      "Used to: habitudes passées qui n'existent plus",
      "Would: habitudes répétées passées",
      "Be used to: être habitué à (présent)",
      "Get used to: s'habituer à (processus)"
    ]
  },
  {
    id: 6,
    title: "Le deuxième conditionnel",
    explanation: "Le deuxième conditionnel exprime des situations hypothétiques peu probables.",
    examples: [
      { english: "If I won the lottery, I would buy a house.", french: "Si je gagnais à la loterie, j'achèterais une maison." },
      { english: "What would you do if you were me?", french: "Que ferais-tu si tu étais moi ?" },
      { english: "If I had more time, I would travel more.", french: "Si j'avais plus de temps, je voyagerais plus." }
    ],
    rules: [
      "If + past simple, would + verbe base",
      "Pour des situations irréelles ou improbables",
      "Pour donner des conseils ('If I were you')",
      "Past tense ne signifie pas le passé ici"
    ]
  },
  {
    id: 7,
    title: "Le troisième conditionnel",
    explanation: "Le troisième conditionnel exprime des regrets ou des situations passées non réalisées.",
    examples: [
      { english: "If I had studied harder, I would have passed the exam.", french: "Si j'avais étudié plus, j'aurais réussi l'examen." },
      { english: "She wouldn't have been late if she had left earlier.", french: "Elle n'aurait pas été en retard si elle était partie plus tôt." },
      { english: "What would you have done if you had known?", french: "Qu'aurais-tu fait si tu avais su ?" }
    ],
    rules: [
      "If + past perfect, would have + past participle",
      "Pour des situations passées irréelles",
      "Pour exprimer des regrets",
      "Past perfect dans la condition, would have dans le résultat"
    ]
  },
  {
    id: 8,
    title: "La voix passive - temps simples",
    explanation: "La voix passive met l'accent sur l'action plutôt que sur l'agent qui la fait.",
    examples: [
      { english: "This house was built in 1990.", french: "Cette maison a été construite en 1990." },
      { english: "English is spoken all over the world.", french: "L'anglais est parlé dans le monde entier." },
      { english: "The window was broken by the children.", french: "La fenêtre a été cassée par les enfants." }
    ],
    rules: [
      "Formation: be + past participle",
      "Le complément devient sujet",
      "Par + agent optionnel (by + agent)",
      "Temps differ selon le temps du verbe be"
    ]
  },
  {
    id: 9,
    title: "Les propositions relatives",
    explanation: "Les propositions relatives donnent des informations supplémentaires sur un nom.",
    examples: [
      { english: "The book that I bought is very interesting.", french: "Le livre que j'ai acheté est très intéressant." },
      { english: "The woman who lives next door is a teacher.", french: "La femme qui habite à côté est enseignante." },
      { english: "The house where I was born has been sold.", french: "La maison où je suis né a été vendue." }
    ],
    rules: [
      "Who: pour les personnes (sujet et objet)",
      "Which: pour les choses (sujet et objet)",
      "That: pour personnes et choses (informel)",
      "Where: pour les lieux",
      "Whose: pour la possession"
    ]
  },
  {
    id: 10,
    title: "Les propositions relatives: defining vs non-defining",
    explanation: "La différence entre les propositions relatives essentielles et non essentielles.",
    examples: [
      { english: "Students who are late will not be allowed in.", french: "Les étudiants qui sont en retard ne seront pas autorisés à entrer." },
      { english: "My sister, who lives in Paris, is coming to visit.", french: "Ma sœur, qui habite à Paris, vient nous rendre visite." },
      { english: "The car that hit us was red. (defining)", french: "La voiture qui nous a heurtés était rouge." }
    ],
    rules: [
      "Defining: information essentielle, pas de virgules",
      "Non-defining: information supplémentaire, entre virgules",
      "Non-defining: ne peut pas utiliser 'that'",
      "Non-defining: souvent relatif à un nom propre"
    ]
  },
  {
    id: 11,
    title: "Le discours rapporté - affirmations",
    explanation: "Le discours rapporté permet de rapporter ce que quelqu'un a dit.",
    examples: [
      { english: "'I am tired,' she said. → She said she was tired.", french: "'Je suis fatiguée,' dit-elle. → Elle a dit qu'elle était fatiguée." },
      { english: "'I will help you,' he promised. → He promised he would help me.", french: "'Je t'aiderai,' promit-il. → Il a promis qu'il m'aiderait." },
      { english: "'We have finished,' they told us. → They told us they had finished.", french: "'Nous avons fini,' nous ont-ils dit. → Ils nous ont dit qu'ils avaient fini." }
    ],
    rules: [
      "Changement de temps (backshift): present → past",
      "Changement de pronoms selon le contexte",
      "Say vs tell: tell nécessite un objet",
      "Mots de liaison: that (optionnel)"
    ]
  },
  {
    id: 12,
    title: "Le discours rapporté - questions",
    explanation: "Rapporter des questions directes en questions indirectes.",
    examples: [
      { english: "'Where do you live?' he asked. → He asked where I lived.", french: "'Où habites-tu ?' demanda-t-il. → Il a demandé où j'habitais." },
      { english: "'Are you happy?' she asked. → She asked if I was happy.", french: "'Es-tu heureux ?' demanda-t-elle. → Elle a demandé si j'étais heureux." },
      { english: "'What time is it?' he wondered. → He wondered what time it was.", french: "'Quelle heure est-il ?' se demanda-t-il. → Il se demandait quelle heure il était." }
    ],
    rules: [
      "Questions oui/non: if/whether",
      "Questions WH: garder le mot interrogatif",
      "Ordre des mots: sujet + verbe",
      "Pas de do/does/did dans la question rapportée"
    ]
  },
  {
    id: 13,
    title: "Les verbes à particule (phrasal verbs) avancés",
    explanation: "Verbes à particule plus complexes et leurs différentes significations.",
    examples: [
      { english: "I ran into an old friend yesterday.", french: "Je suis tombé sur un vieil ami hier." },
      { english: "The meeting was put off until next week.", french: "La réunion a été reportée à la semaine prochaine." },
      { english: "She looks after her elderly parents.", french: "Elle s'occupe de ses parents âgés." }
    ],
    rules: [
      "Verbes à 3 éléments (look up to)",
      "Verbes avec significations multiples",
      "Séparables vs inséparables",
      "Contexte important pour le sens"
    ]
  },
  {
    id: 14,
    title: "Modaux pour déduction et probabilité",
    explanation: "Utiliser les modaux pour exprimer des déductions logiques.",
    examples: [
      { english: "She must be at work now.", french: "Elle doit être au travail maintenant." },
      { english: "That can't be true!", french: "Ce ne peut pas être vrai !" },
      { english: "They might have missed the train.", french: "Ils ont peut-être raté le train." }
    ],
    rules: [
      "Must: déduction logique forte",
      "Can't: impossibilité logique",
      "Might/may/could: possibilité",
      "Must have/can't have: déduction au passé"
    ]
  },
  {
    id: 15,
    title: "Articles: usages spéciaux",
    explanation: "Utilisations particulières des articles avec les noms propres, les institutions, etc.",
    examples: [
      { english: "The United States, the Netherlands", french: "Les États-Unis, les Pays-Bas" },
      { english: "I play the piano, but he plays tennis.", french: "Je joue du piano, mais il joue au tennis." },
      { english: "By car, on foot, at school", french: "En voiture, à pied, à l'école" }
    ],
    rules: [
      "Pas d'article: noms propres, pays (sauf exceptions)",
      "The: avec instruments de musique",
      "Pas d'article: moyens de transport, institutions",
      "The: avec noms géographiques au pluriel"
    ]
  },
  {
    id: 16,
    title: "Gérondifs et infinitifs - après les verbes",
    explanation: "Certains verbes sont suivis de gérondifs, d'autres d'infinitifs, parfois avec changement de sens.",
    examples: [
      { english: "I enjoy reading books.", french: "J'aime lire des livres." },
      { english: "She decided to study abroad.", french: "Elle a décidé d'étudier à l'étranger." },
      { english: "I stopped to rest vs I stopped resting.", french: "Je me suis arrêté pour me reposer vs J'ai arrêté de me reposer." }
    ],
    rules: [
      "Verbes + gérondif: enjoy, finish, avoid, mind",
      "Verbes + infinitif: want, decide, hope, plan",
      "Verbes + les deux: remember, forget, stop, try",
      "Changement de sens selon la structure"
    ]
  },
  {
    id: 17,
    title: "Marques de questionnement (question tags)",
    explanation: "Les question tags confirment ou vérifient une information.",
    examples: [
      { english: "You are French, aren't you?", french: "Tu es français, n'est-ce pas ?" },
      { english: "She doesn't like coffee, does she?", french: "Elle n'aime pas le café, si ?" },
      { english: "They came yesterday, didn't they?", french: "Ils sont venus hier, non ?" }
    ],
    rules: [
      "Phrase positive → tag négatif",
      "Phrase négative → tag positif",
      "Utilise l'auxiliaire de la phrase principale",
      "Intonation: montante (vraie question) ou descendante (confirmation)"
    ]
  },
  {
    id: 18,
    title: "Expressions de quantité",
    explanation: "Expressions complexes pour parler de quantité, degré et suffisamment.",
    examples: [
      { english: "There's a lot of/lots of traffic today.", french: "Il y a beaucoup de circulation aujourd'hui." },
      { english: "She has enough money to buy the car.", french: "Elle a assez d'argent pour acheter la voiture." },
      { english: "Too much noise! Not enough silence.", french: "Trop de bruit ! Pas assez de silence." }
    ],
    rules: [
      "A lot of/lots of: quantité importante",
      "Enough: suffisamment (avant nom, après adjectif)",
      "Too much/many: quantité excessive",
      "Plenty of: plus que nécessaire"
    ]
  },
  {
    id: 19,
    title: "Les pronoms réfléchis",
    explanation: "Les pronoms réfléchis renvoient à l'action ou l'état du sujet.",
    examples: [
      { english: "I hurt myself playing football.", french: "Je me suis blessé en jouant au football." },
      { english: "She made this dress herself.", french: "Elle a fait cette robe elle-même." },
      { english: "Do it yourself!", french: "Fais-le toi-même !" }
    ],
    rules: [
      "Myself, yourself, himself, herself, itself, ourselves, yourselves, themselves",
      "Usage réfléchi: le sujet et l'objet sont les mêmes",
      "Usage emphatique: renforcement (by myself)",
      "Attention aux verbes qui n'utilisent pas de réfléchis en anglais"
    ]
  },
  {
    id: 20,
    title: "Inversions emphatiques basiques",
    explanation: "Inversion du sujet et du verbe pour l'emphase ou style formel.",
    examples: [
      { english: "Never have I seen such a beautiful place.", french: "Jamais je n'ai vu un endroit aussi beau." },
      { english: "Hardly had we finished when it started raining.", french: "À peine avions-nous fini qu'il a commencé à pleuvoir." },
      { english: "Only then did I realize my mistake.", french: "C'est seulement alors que j'ai réalisé mon erreur." }
    ],
    rules: [
      "Adverbes négatifs en début de phrase: never, hardly, rarely",
      "Inversion auxiliaire + sujet après adverbes de fréquence/temps",
      "Only + expression: inversion pour l'emphase",
      "Structure formelle et littéraire"
    ]
  },
  {
    id: 21,
    title: "Prépositions dépendantes",
    explanation: "Prépositions qui accompagnent toujours certains adjectifs et verbes.",
    examples: [
      { english: "I'm interested in art.", french: "Je suis intéressé par l'art." },
      { english: "She's good at maths.", french: "Elle est bonne en maths." },
      { english: "They're afraid of dogs.", french: "Ils ont peur des chiens." }
    ],
    rules: [
      "Adjectif + préposition: good at, interested in, afraid of",
      "Verbe + préposition: depend on, look for, care about",
      "Ces combinaisons doivent être mémorisées",
      "Souvent différentes entre l'anglais et le français"
    ]
  },
  {
    id: 22,
    title: "Linking words (connecteurs logiques)",
    explanation: "Mots de liaison pour exprimer la cause, le contraste, l'addition, etc.",
    examples: [
      { english: "Although it was raining, we went out.", french: "Bien qu'il pleuve, nous sommes sortis." },
      { english: "She didn't study. However, she passed the exam.", french: "Elle n'a pas étudié. Cependant, elle a réussi l'examen." },
      { english: "Because of the rain, the match was cancelled.", french: "À cause de la pluie, le match a été annulé." }
    ],
    rules: [
      "Cause: because, as, since, due to",
      "Contraste: although, however, despite, whereas",
      "Addition: furthermore, moreover, in addition",
      "Résultat: therefore, consequently, as a result"
    ]
  },
  {
    id: 23,
    title: "L'emphase avec 'do'",
    explanation: "Utilisation de 'do' pour mettre l'accent sur l'action.",
    examples: [
      { english: "I do like chocolate! (emphasis)", french: "J'aime vraiment le chocolat !" },
      { english: "She does work hard.", french: "Elle travaille vraiment dur." },
      { english: "I did tell you! (emphatic past)", french: "Je te l'ai bien dit !" }
    ],
    rules: [
      "Do/Does + verbe base pour l'emphase au présent",
      "Did + verbe base pour l'emphase au passé",
      "Utilisé pour insister ou contredire",
      "Stressé à l'oral"
    ]
  },
  {
    id: 24,
    title: "Clauses de temps avancées",
    explanation: "Clauses plus complexes utilisant des conjonctions de temps.",
    examples: [
      { english: "As soon as I finish, I'll call you.", french: "Dès que j'aurai fini, je t'appellerai." },
      { english: "By the time you arrive, we'll have left.", french: "Le temps que tu arrives, nous serons partis." },
      { english: "I'll wait until you're ready.", french: "J'attendrai jusqu'à ce que tu sois prêt." }
    ],
    rules: [
      "As soon as: dès que",
      "By the time: le temps que",
      "Until/till: jusqu'à ce que",
      "While: pendant que, tandis que"
    ]
  },
  {
    id: 25,
    title: "La forme passive - formes continues",
    explanation: "Utilisation de la voix passive avec les temps continus.",
    examples: [
      { english: "The building is being renovated.", french: "Le bâtiment est en train d'être rénové." },
      { english: "The room was being cleaned when I arrived.", french: "La salle était en train d'être nettoyée quand je suis arrivé." },
      { english: "The report has been being written all day.", french: "Le rapport est en train d'être écrit toute la journée." }
    ],
    rules: [
      "Present continuous passive: is/are being + past participle",
      "Past continuous passive: was/were being + past participle",
      "Pas couramment utilisé avec tous les temps",
      "Met l'accent sur la durée de l'action passive"
    ]
  },
  {
    id: 26,
    title: "Le futur dans le passé",
    explanation: "Comment exprimer des actions futures vues d'un point de vue passé.",
    examples: [
      { english: "She said she would come to the party.", french: "Elle a dit qu'elle viendrait à la fête." },
      { english: "I was going to call you, but I forgot.", french: "J'allais t'appeler, mais j'ai oublié." },
      { english: "We were about to leave when it started raining.", french: "Nous étions sur le point de partir quand il a commencé à pleuvoir." }
    ],
    rules: [
      "Would + verbe base: futur simple vu du passé",
      "Was/were going to: intention ou plan dans le passé",
      "Was/were about to: sur le point de faire quelque chose",
      "Souvent utilisé dans le discours rapporté"
    ]
  },
  {
    id: 27,
    title: "Distinction entre 'as' et 'like'",
    explanation: "Différence d'utilisation entre 'as' et 'like' qui sont souvent confondus.",
    examples: [
      { english: "She works as a teacher. (She is a teacher)", french: "Elle travaille comme enseignante. (Elle est enseignante)" },
      { english: "She talks like a teacher. (She is not a teacher)", french: "Elle parle comme une enseignante. (Elle n'est pas enseignante)" },
      { english: "As I said before, we need to be careful.", french: "Comme je l'ai dit auparavant, nous devons être prudents." }
    ],
    rules: [
      "As: indique un rôle, une fonction ou une identité réelle",
      "Like: indique une ressemblance ou une comparaison",
      "As: utilisé comme conjonction pour introduire une clause (as you know)",
      "Like: généralement suivi d'un nom ou pronom, pas d'une clause complète (sauf en anglais informel)"
    ]
  },
  {
    id: 28,
    title: "Infinitif vs gérondif - détails avancés",
    explanation: "Analyse approfondie des verbes qui peuvent être suivis d'infinitifs ou de gérondifs avec changement de sens.",
    examples: [
      { english: "I remember posting the letter. (I did it)", french: "Je me souviens d'avoir posté la lettre. (Je l'ai fait)" },
      { english: "I remembered to post the letter. (I didn't forget)", french: "Je me suis souvenu de poster la lettre. (Je n'ai pas oublié)" },
      { english: "He stopped smoking. (He quit)", french: "Il a arrêté de fumer. (Il a cessé)" },
      { english: "He stopped to smoke. (He paused to have a cigarette)", french: "Il s'est arrêté pour fumer. (Il a fait une pause)" }
    ],
    rules: [
      "Remember + gérondif: se souvenir d'une action passée",
      "Remember + infinitif: se souvenir de faire quelque chose dans le futur",
      "Stop + gérondif: cesser une activité",
      "Stop + infinitif: s'arrêter pour faire quelque chose",
      "Autres verbes avec changement de sens: forget, try, regret, mean"
    ]
  },
  {
    id: 29,
    title: "Phrasal verbs idiomatiques courants",
    explanation: "Verbes à particule ayant des significations idiomatiques difficiles à deviner.",
    examples: [
      { english: "The plane took off an hour late.", french: "L'avion a décollé avec une heure de retard." },
      { english: "I can't put up with this noise anymore.", french: "Je ne peux plus supporter ce bruit." },
      { english: "She turned down the job offer.", french: "Elle a refusé l'offre d'emploi." }
    ],
    rules: [
      "Expressions idiomatiques à mémoriser",
      "Exemples courants: break down (tomber en panne), give up (abandonner), look forward to (attendre avec impatience)",
      "Bring up (élever/évoquer), come across (tomber sur), figure out (comprendre/résoudre)",
      "Run out of (manquer de), set up (établir/installer), make up (inventer/se réconcilier)"
    ]
  }
];

export default grammarRulesB1;
