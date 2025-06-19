// chatbot/B1/scenarios/discussingMovies.js

const discussingMovies = {
    id: 2,
    title: "Discussing Movies",
    level: "B1",
    description: "Learn how to discuss movies with nuanced opinions, analyze plots and express preferences about cinema.",
    estimatedTime: "15-20 minutes",
    vocabulary: ["film", "cinéma", "acteur", "réalisateur", "scénario", "intrigue", "critique", "genre", "effets spéciaux", "chef-d'œuvre"],
    steps: [
      {
        id: 1,
        botMessage: "Salut ! J'ai vu que tu étais allé(e) au cinéma récemment. Quel film as-tu vu ?",
        inputMode: "suggestions",
        suggestions: [
          "J'ai vu le nouveau film d'action avec Tom Cruise. Les effets spéciaux étaient impressionnants !",
          "Je suis allé(e) voir le dernier film de science-fiction qui vient de sortir. L'histoire était vraiment originale.",
          "J'ai regardé un documentaire sur la nature. C'était à la fois éducatif et visuellement magnifique."
        ],
        hints: "Mentionnez un film que vous avez vu récemment et ajoutez un commentaire général.",
        expectedKeywords: ["vu", "film", "action", "science-fiction", "documentaire", "effets", "spéciaux", "histoire", "originale", "éducatif"],
        feedback: {
          correct: "Oh, intéressant ! Qu'est-ce qui t'a plu dans ce film ?",
          incorrect: "Parle-moi d'un film que tu as vu récemment et ce que tu en as pensé."
        }
      },
      {
        id: 2,
        botMessage: "Qu'est-ce qui t'a particulièrement plu dans ce film ?",
        inputMode: "hybrid",
        suggestions: [
          "J'ai beaucoup aimé la performance des acteurs, surtout le rôle principal qui était très convaincant dans ses émotions.",
          "Ce qui m'a impressionné(e), c'est la qualité de la photographie et la façon dont le réalisateur a créé l'atmosphère du film.",
          "L'histoire était captivante du début à la fin, avec des rebondissements que je n'avais pas prévus."
        ],
        hints: "Expliquez ce que vous avez apprécié dans le film en donnant des détails précis.",
        expectedKeywords: ["aimé", "performance", "acteurs", "impressionné", "photographie", "réalisateur", "atmosphère", "histoire", "captivante", "rebondissements"],
        acceptablePhrases: [
          "j'ai beaucoup aimé",
          "ce qui m'a impressionné",
          "l'histoire était",
          "j'ai apprécié"
        ],
        feedback: {
          correct: "Je vois. Et y avait-il des aspects du film que tu as moins appréciés ?",
          partial: "C'est un bon point. Y a-t-il d'autres éléments qui t'ont marqué(e) ?",
          incorrect: "Donne-moi des détails sur ce que tu as particulièrement apprécié dans ce film."
        }
      },
      {
        id: 3,
        botMessage: "Y a-t-il des aspects du film que tu as moins appréciés ou qui auraient pu être améliorés selon toi ?",
        inputMode: "freeText",
        suggestions: [
          "Le film était un peu trop long à mon goût, certaines scènes auraient pu être raccourcies sans perdre le fil de l'histoire.",
          "Je trouve que la fin était prévisible et manquait d'originalité par rapport au reste du film qui était innovant.",
          "Les dialogues étaient parfois un peu artificiels, ce qui rendait certaines scènes moins crédibles malgré le bon jeu des acteurs."
        ],
        hints: "Mentionnez des éléments du film que vous avez moins aimés en justifiant votre opinion.",
        expectedKeywords: ["long", "scènes", "raccourcies", "fin", "prévisible", "manquait", "originalité", "dialogues", "artificiels", "crédibles"],
        feedback: {
          correct: "C'est une critique intéressante. Qu'as-tu pensé des personnages principaux du film ?",
          partial: "Je comprends ton point de vue. Cet aspect aurait effectivement pu être travaillé différemment.",
          incorrect: "Indique des éléments du film qui t'ont moins plu ou qui auraient pu être améliorés selon toi."
        }
      },
      {
        id: 4,
        botMessage: "Les personnages du film t'ont-ils semblé bien développés et crédibles ? Lequel as-tu préféré et pourquoi ?",
        inputMode: "suggestions",
        suggestions: [
          "J'ai trouvé que le personnage principal avait une vraie évolution psychologique tout au long du film. Sa transformation était subtile et convaincante.",
          "Le personnage secondaire m'a semblé plus intéressant que le héros, avec un passé mystérieux et des motivations complexes qui nous font réfléchir.",
          "Honnêtement, les personnages manquaient de profondeur. Ils suivaient des archétypes assez classiques sans vraiment nous surprendre."
        ],
        hints: "Donnez votre opinion sur les personnages du film et expliquez quel personnage vous avez préféré.",
        expectedKeywords: ["personnage", "principal", "évolution", "psychologique", "transformation", "secondaire", "intéressant", "passé", "motivations", "profondeur"],
        feedback: {
          correct: "C'est une analyse pertinente des personnages. Ce film te fait-il penser à d'autres films que tu as vus ?",
          incorrect: "Donne ton avis sur les personnages du film et dis-moi lequel tu as préféré."
        }
      },
      {
        id: 5,
        botMessage: "Est-ce que ce film te fait penser à d'autres œuvres similaires ? Comment le comparerais-tu à d'autres films du même genre ?",
        inputMode: "hybrid",
        suggestions: [
          "Ce film m'a rappelé certaines œuvres de Christopher Nolan, notamment pour la complexité narrative et les questionnements philosophiques qu'il soulève.",
          "Il s'inspire clairement des classiques du genre, mais apporte une touche moderne et des perspectives nouvelles que je n'avais pas vues ailleurs.",
          "J'ai trouvé qu'il était assez conventionnel comparé à d'autres films récents sur le même thème. Il n'apporte pas vraiment d'éléments novateurs."
        ],
        hints: "Comparez ce film à d'autres œuvres similaires en expliquant les points communs et les différences.",
        expectedKeywords: ["rappelé", "œuvres", "complexité", "s'inspire", "classiques", "genre", "touche", "moderne", "conventionnel", "novateurs"],
        feedback: {
          correct: "C'est une comparaison intéressante. Recommanderais-tu ce film ? Et à quel type de public ?",
          partial: "Tu as raison de faire ce parallèle. Penses-tu que ce film se démarque dans ce genre ?",
          incorrect: "Compare ce film à d'autres œuvres similaires que tu connais."
        }
      },
      {
        id: 6,
        botMessage: "Recommanderais-tu ce film à d'autres personnes ? Si oui, à quel type de public conviendrait-il particulièrement ?",
        inputMode: "freeText",
        suggestions: [
          "Oui, je le recommanderais surtout aux amateurs de thrillers psychologiques qui aiment les films qui font réfléchir et qui ne dévoilent pas tout immédiatement.",
          "Je le conseillerais aux personnes qui apprécient les effets spéciaux impressionnants et l'action, mais pas à ceux qui cherchent une intrigue complexe ou des dialogues sophistiqués.",
          "Je pense que ce film plairait particulièrement aux fans du réalisateur et aux cinéphiles qui s'intéressent aux techniques cinématographiques innovantes, moins au grand public."
        ],
        hints: "Indiquez si vous recommanderiez ce film et à quel public spécifique il conviendrait le mieux.",
        expectedKeywords: ["recommanderais", "amateurs", "thrillers", "psychologiques", "réfléchir", "effets", "spéciaux", "action", "intrigue", "cinéphiles"],
        acceptablePhrases: [
          "je le recommanderais",
          "je le conseillerais",
          "ce film plairait",
          "il conviendrait"
        ],
        feedback: {
          correct: "C'est un bon conseil. Quel est ton genre de film préféré en général ?",
          partial: "Je comprends ton point de vue sur le public cible de ce film.",
          incorrect: "Dis-moi si tu recommanderais ce film et à quel type de spectateurs il conviendrait le mieux."
        }
      },
      {
        id: 7,
        botMessage: "Et toi, quel genre de films préfères-tu regarder en général ? As-tu des réalisateurs ou acteurs favoris ?",
        inputMode: "suggestions",
        suggestions: [
          "J'aime beaucoup les films de science-fiction qui explorent des concepts futuristes tout en posant des questions sur notre société actuelle. Christopher Nolan est l'un de mes réalisateurs préférés.",
          "Je suis plutôt fan de comédies et de films légers qui permettent de se détendre. J'apprécie particulièrement les films avec Emma Stone ou Ryan Reynolds.",
          "J'ai un faible pour les drames historiques et les biographies. J'admire le travail de réalisateurs comme Steven Spielberg qui savent raconter des histoires complexes de façon accessible."
        ],
        hints: "Parlez de vos genres de films préférés et mentionnez des réalisateurs ou acteurs que vous appréciez.",
        expectedKeywords: ["science-fiction", "comédies", "drames", "historiques", "réalisateurs", "acteurs", "préférés", "j'aime", "fan", "apprécie"],
        feedback: {
          correct: "C'est intéressant ! Y a-t-il un film récent que tu attends particulièrement de voir prochainement ?",
          incorrect: "Parle-moi des types de films que tu préfères et des réalisateurs ou acteurs que tu apprécies particulièrement."
        }
      },
      {
        id: 8,
        botMessage: "Y a-t-il un film qui va bientôt sortir et que tu as hâte de voir ? Pourquoi es-tu impatient(e) de le découvrir ?",
        inputMode: "hybrid",
        suggestions: [
          "J'attends avec impatience la suite de cette saga de science-fiction car le premier film m'avait vraiment captivé(e) et la bande-annonce promet des révélations importantes sur l'intrigue.",
          "Je suis curieux(se) de voir le prochain film de ce réalisateur reconnu, surtout qu'il s'agit d'un genre différent de ses œuvres habituelles.",
          "Pas vraiment, je préfère découvrir les films après leur sortie, quand j'ai pu lire quelques critiques et avoir l'avis de mes amis."
        ],
        hints: "Mentionnez un film à venir que vous attendez et expliquez pourquoi vous êtes impatient de le voir.",
        expectedKeywords: ["attends", "impatience", "suite", "saga", "captivé", "bande-annonce", "curieux", "prochain", "réalisateur", "critiques"],
        feedback: {
          correct: "Ça a l'air prometteur ! Merci pour cette discussion sur le cinéma, c'était très intéressant d'échanger nos points de vue.",
          partial: "Je comprends ta position. Chacun a sa façon de choisir les films qu'il va voir.",
          incorrect: "Parle-moi d'un film que tu attends prochainement ou explique pourquoi tu préfères ne pas anticiper les sorties."
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à discuter de films de façon nuancée, à analyser différents aspects cinématographiques et à exprimer vos préférences en matière de cinéma.",
    learningObjectives: [
      "Exprimer une opinion nuancée sur une œuvre",
      "Analyser différents aspects d'un film (intrigue, personnages, réalisation)",
      "Comparer des œuvres entre elles",
      "Formuler des recommandations ciblées",
      "Utiliser le vocabulaire spécifique au cinéma"
    ],
    grammar: {
      points: [
        "Utilisation du conditionnel pour les recommandations",
        "Comparatifs et superlatifs",
        "Structure cause-conséquence",
        "Expression de l'opinion personnelle"
      ]
    }
  };

  export default discussingMovies;
