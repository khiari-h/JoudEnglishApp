// chatbot/A2/scenarios/weatherAndSeasons.js

const weatherAndSeasons = {
    id: 9,
    title: "Weather and Seasons",
    level: "A2",
    description: "Learn how to have an elaborate conversation about weather, seasons, and related activities.",
    estimatedTime: "15-20 minutes",
    vocabulary: ["météo", "saison", "température", "climat", "prévisions", "préférence", "activités saisonnières", "changement climatique", "chaleur", "froid"],
    steps: [
      {
        id: 1,
        botMessage: "Bonjour ! Quel temps fait-il aujourd'hui chez vous ?",
        inputMode: "suggestions",
        suggestions: [
          "Il fait beau et ensoleillé, la température est d'environ 25 degrés.",
          "Il pleut depuis ce matin, et il fait assez frais pour la saison.",
          "C'est nuageux aujourd'hui, mais il ne pleut pas."
        ],
        hints: "Décrivez le temps qu'il fait aujourd'hui.",
        expectedKeywords: ["beau", "ensoleillé", "pleut", "frais", "nuageux", "température", "degrés", "saison", "pluie"],
        feedback: {
          correct: "C'est vrai ? Chez moi aussi ! Quelle est votre saison préférée ?",
          incorrect: "Parlez du temps qu'il fait aujourd'hui là où vous êtes."
        }
      },
      {
        id: 2,
        botMessage: "Quelle est votre saison préférée et pourquoi ?",
        inputMode: "hybrid",
        suggestions: [
          "J'adore l'été pour les longues journées ensoleillées et les activités de plein air.",
          "Je préfère l'automne, j'aime les couleurs des feuilles et la température plus fraîche.",
          "L'hiver est ma saison préférée, j'aime la neige et les sports d'hiver."
        ],
        hints: "Indiquez votre saison préférée et expliquez pourquoi.",
        expectedKeywords: ["préfère", "adore", "été", "automne", "hiver", "printemps", "aime", "température", "activités", "neige"],
        acceptablePhrases: [
          "j'adore",
          "je préfère",
          "ma saison préférée",
          "j'aime"
        ],
        feedback: {
          correct: "C'est une belle saison, en effet ! Quelles activités aimez-vous faire pendant cette saison ?",
          partial: "Cette saison a vraiment des caractéristiques uniques, n'est-ce pas ?",
          incorrect: "Dites quelle est votre saison préférée et expliquez pourquoi vous l'aimez."
        }
      },
      {
        id: 3,
        botMessage: "Quelles activités aimez-vous faire pendant cette saison ?",
        inputMode: "freeText",
        suggestions: [
          "J'aime faire des randonnées et des pique-niques en plein air.",
          "Je profite des journées à la plage et des soirées barbecue avec des amis.",
          "J'adore le ski et les promenades dans la neige, puis boire un chocolat chaud."
        ],
        hints: "Décrivez les activités que vous préférez faire pendant votre saison favorite.",
        expectedKeywords: ["aime", "faire", "randonnées", "plage", "ski", "pique-niques", "barbecue", "amis", "plein air", "neige"],
        feedback: {
          correct: "Ces activités sont parfaites pour cette saison ! Comment le climat change-t-il dans votre région au fil des saisons ?",
          partial: "Ça semble très agréable ! Faites-vous ces activités seul(e) ou avec d'autres personnes ?",
          incorrect: "Parlez des activités que vous aimez faire pendant votre saison préférée."
        }
      },
      {
        id: 4,
        botMessage: "Comment le climat change-t-il dans votre région au cours de l'année ?",
        inputMode: "suggestions",
        suggestions: [
          "Nous avons des étés très chauds et des hivers doux avec peu de neige.",
          "Le climat est assez constant, mais nous avons beaucoup de pluie en automne.",
          "Les saisons sont très marquées : étés chauds, automnes colorés, hivers froids avec neige et printemps pluvieux."
        ],
        hints: "Décrivez comment le climat change dans votre région au fil des saisons.",
        expectedKeywords: ["climat", "étés", "hivers", "chauds", "froids", "neige", "pluie", "automne", "printemps", "saisons"],
        feedback: {
          correct: "C'est intéressant ! Ces variations climatiques influencent-elles vos activités quotidiennes ?",
          incorrect: "Décrivez comment le temps change dans votre région au cours des différentes saisons."
        }
      },
      {
        id: 5,
        botMessage: "Est-ce que les conditions météorologiques influencent vos activités quotidiennes ou votre humeur ?",
        inputMode: "hybrid",
        suggestions: [
          "Oui, quand il pleut, je me sens plus fatigué(e) et je préfère rester à l'intérieur.",
          "Absolument, je suis de bien meilleure humeur quand il fait beau et ensoleillé !",
          "Pas vraiment, j'essaie de maintenir la même routine quelle que soit la météo."
        ],
        hints: "Expliquez comment la météo influence vos activités ou votre humeur.",
        expectedKeywords: ["influence", "humeur", "fatigué", "meilleure", "beau", "ensoleillé", "routine", "rester", "intérieur", "météo"],
        feedback: {
          correct: "Je comprends tout à fait ! Avez-vous remarqué des changements dans les tendances météorologiques ces dernières années ?",
          partial: "C'est intéressant de voir comment la météo peut nous affecter différemment.",
          incorrect: "Expliquez si et comment la météo influence votre humeur ou vos activités quotidiennes."
        }
      },
      {
        id: 6,
        botMessage: "Avez-vous remarqué des changements dans les tendances météorologiques ou saisonnières ces dernières années ?",
        inputMode: "freeText",
        suggestions: [
          "Oui, les étés semblent devenir de plus en plus chauds et les périodes de canicule plus fréquentes.",
          "J'ai remarqué que les saisons sont moins prévisibles, avec des hivers parfois très doux.",
          "Dans ma région, nous avons des événements météorologiques extrêmes plus fréquents comme des fortes pluies ou des tempêtes."
        ],
        hints: "Parlez des changements météorologiques que vous avez observés ces dernières années.",
        expectedKeywords: ["changements", "remarqué", "étés", "chauds", "canicule", "prévisibles", "hivers", "doux", "extrêmes", "tempêtes"],
        acceptablePhrases: [
          "j'ai remarqué",
          "il me semble que",
          "ces dernières années",
          "de plus en plus"
        ],
        feedback: {
          correct: "C'est vrai, beaucoup de personnes font des observations similaires. Comment vous adaptez-vous à ces changements ?",
          partial: "Ces changements sont-ils constants ou variables selon les années ?",
          incorrect: "Parlez des changements de temps ou de climat que vous avez remarqués récemment."
        }
      },
      {
        id: 7,
        botMessage: "Consultez-vous régulièrement les prévisions météo ? Si oui, comment ?",
        inputMode: "suggestions",
        suggestions: [
          "Oui, je vérifie l'application météo sur mon téléphone tous les matins.",
          "Parfois, surtout avant de planifier des activités de plein air ou des voyages.",
          "Pas vraiment, je préfère regarder par la fenêtre et m'adapter en conséquence !"
        ],
        hints: "Indiquez si vous consultez les prévisions météo et comment.",
        expectedKeywords: ["prévisions", "météo", "application", "téléphone", "vérifier", "planifier", "activités", "voyages", "fenêtre", "adapter"],
        feedback: {
          correct: "C'est pratique, en effet ! Pour finir, quel serait pour vous le climat idéal ?",
          incorrect: "Dites-moi si vous consultez les prévisions météo et comment vous le faites."
        }
      },
      {
        id: 8,
        botMessage: "Pour vous, quel serait le climat ou la météo idéale pour vivre ?",
        inputMode: "hybrid",
        suggestions: [
          "J'aimerais un climat méditerranéen : étés chauds et secs, hivers doux et ensoleillés.",
          "Je préfère les quatre saisons bien distinctes, mais sans températures extrêmes.",
          "Mon idéal serait un printemps perpétuel avec des températures modérées et un peu de pluie."
        ],
        hints: "Décrivez votre climat idéal pour vivre.",
        expectedKeywords: ["idéal", "climat", "méditerranéen", "saisons", "chaud", "doux", "ensoleillé", "modéré", "pluie", "températures"],
        feedback: {
          correct: "C'est un beau climat en effet ! Merci pour cette conversation sur la météo et les saisons.",
          partial: "Je comprends votre préférence. Nous avons tous des goûts différents en matière de climat.",
          incorrect: "Décrivez quel serait le climat idéal pour vous."
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à avoir une conversation élaborée sur la météo, les saisons et les activités associées en français.",
    learningObjectives: [
      "Décrire les conditions météorologiques",
      "Parler des saisons et de leurs caractéristiques",
      "Discuter des activités liées aux saisons",
      "Exprimer des préférences climatiques",
      "Parler des changements météorologiques"
    ],
    grammar: {
      points: [
        "Expressions météorologiques (faire + adjectif)",
        "Comparatifs et superlatifs",
        "Adjectifs descriptifs",
        "Expressions de fréquence et d'habitude"
      ]
    }
  };
  
  export default weatherAndSeasons;