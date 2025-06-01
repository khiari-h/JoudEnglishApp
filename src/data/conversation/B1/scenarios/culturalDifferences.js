// chatbot/B1/scenarios/culturalDifferences.js

const culturalDifferences = {
    id: 9,
    title: "Cultural Differences",
    level: "B1",
    description: "Learn how to compare cultural differences and discuss adaptation to new environments.",
    estimatedTime: "15-20 minutes",
    vocabulary: ["culture", "tradition", "coutume", "adaptation", "choc culturel", "intégration", "différence", "similitude", "stéréotype", "diversité"],
    steps: [
      {
        id: 1,
        botMessage: "Bonjour ! J'ai entendu dire que vous avez vécu ou voyagé dans différents pays. Pouvez-vous me parler d'une différence culturelle qui vous a marqué(e) ou surpris(e) ?",
        inputMode: "suggestions",
        suggestions: [
          "Quand j'ai visité le Japon, j'ai été surpris(e) par l'importance des règles de politesse et du respect de l'espace personnel dans les transports en commun, très différent de chez moi.",
          "En vivant en Espagne, j'ai dû m'adapter aux horaires des repas, particulièrement le dîner qui se prend beaucoup plus tard que dans mon pays d'origine.",
          "Lors de mon séjour aux États-Unis, j'ai été frappé(e) par la culture du travail très différente : les relations professionnelles plus informelles et l'importance du networking."
        ],
        hints: "Décrivez une différence culturelle qui vous a marqué(e) lors d'un voyage ou d'un séjour à l'étranger.",
        expectedKeywords: ["surpris", "différent", "adapter", "horaires", "repas", "politesse", "culture", "relations", "professionnelles", "informelles"],
        feedback: {
          correct: "C'est une observation intéressante ! Comment avez-vous réagi face à cette différence culturelle ?",
          incorrect: "Pourriez-vous parler d'une différence culturelle spécifique que vous avez remarquée en voyageant ou en vivant dans un autre pays ?"
        }
      },
      {
        id: 2,
        botMessage: "Comment avez-vous réagi face à cette différence culturelle ? A-t-il été facile de vous adapter ?",
        inputMode: "hybrid",
        suggestions: [
          "Au début, j'étais un peu désorienté(e) et j'ai commis quelques maladresses. Mais après avoir observé les locaux et posé des questions, je me suis progressivement adapté(e).",
          "L'adaptation a été difficile les premières semaines. Je me sentais constamment fatigué(e) à cause du décalage des horaires de repas, mais finalement j'ai commencé à apprécier ce rythme différent.",
          "J'ai trouvé cette différence rafraîchissante et je me suis adapté(e) assez facilement. En fait, j'ai même adopté certaines de ces habitudes et les ai conservées après mon retour."
        ],
        hints: "Expliquez votre réaction face à cette différence culturelle et votre processus d'adaptation.",
        expectedKeywords: ["désorienté", "maladresses", "observé", "adapté", "difficile", "apprécier", "rythme", "rafraîchissante", "facilement", "adopté"],
        acceptablePhrases: [
          "au début",
          "j'étais",
          "l'adaptation a été",
          "je me suis adapté",
          "j'ai trouvé"
        ],
        feedback: {
          correct: "Merci pour ce partage d'expérience. Pensez-vous que cette différence culturelle reflète des valeurs ou des priorités différentes dans cette société ?",
          partial: "C'est intéressant de voir comment on s'adapte progressivement à de nouvelles normes culturelles.",
          incorrect: "Décrivez comment vous avez réagi face à cette différence culturelle et si l'adaptation a été facile ou difficile."
        }
      },
      {
        id: 3,
        botMessage: "Selon vous, cette différence culturelle reflète-t-elle des valeurs ou des priorités différentes dans cette société ? Qu'est-ce que cela nous apprend sur cette culture ?",
        inputMode: "freeText",
        suggestions: [
          "Je pense que les règles de politesse strictes au Japon reflètent l'importance de l'harmonie collective et du respect mutuel dans leur société, où l'individu passe après le groupe.",
          "Les horaires tardifs des repas en Espagne montrent l'importance accordée à la vie sociale et familiale par rapport au travail. Les repas sont des moments de partage et de connexion, pas juste de nutrition.",
          "L'approche plus informelle aux États-Unis traduit une valorisation de l'initiative individuelle et de l'efficacité, où la hiérarchie est moins rigide et où les idées peuvent circuler plus librement."
        ],
        hints: "Analysez ce que cette différence culturelle révèle sur les valeurs ou priorités de cette société.",
        expectedKeywords: ["reflètent", "importance", "harmonie", "respect", "société", "valorisation", "sociale", "familiale", "initiative", "hiérarchie"],
        feedback: {
          correct: "Votre analyse est perspicace ! Avez-vous observé d'autres différences culturelles dans ce même pays ou dans d'autres pays que vous avez visités ?",
          partial: "C'est une interprétation intéressante de cette différence culturelle.",
          incorrect: "Essayez d'analyser ce que cette différence culturelle nous apprend sur les valeurs ou priorités de cette société."
        }
      },
      {
        id: 4,
        botMessage: "Avez-vous observé d'autres différences culturelles significatives, soit dans ce même pays, soit dans d'autres pays que vous avez visités ?",
        inputMode: "suggestions",
        suggestions: [
          "Oui, j'ai également remarqué des différences dans la communication : dans certains pays nordiques, les gens sont plus directs et concis, alors que dans les cultures méditerranéennes, la communication est plus expressive et indirecte.",
          "La notion du temps varie énormément selon les cultures. Dans certains pays, la ponctualité est essentielle, tandis que dans d'autres, les horaires sont beaucoup plus flexibles et les retards acceptés.",
          "Les pratiques autour de la nourriture sont très révélatrices : qui mange quoi, quand, comment et avec qui peut nous apprendre beaucoup sur les valeurs familiales, religieuses et sociales d'une culture."
        ],
        hints: "Mentionnez d'autres différences culturelles que vous avez observées lors de vos voyages ou séjours.",
        expectedKeywords: ["communication", "directs", "expressive", "temps", "ponctualité", "flexibles", "nourriture", "pratiques", "familiales", "religieuses"],
        feedback: {
          correct: "Ces observations sont très pertinentes. Pensez-vous que voyager et être exposé à différentes cultures a changé votre façon de voir votre propre culture ?",
          incorrect: "Mentionnez d'autres différences culturelles que vous avez remarquées dans vos expériences avec d'autres pays ou cultures."
        }
      },
      {
        id: 5,
        botMessage: "Est-ce que voyager et être exposé(e) à différentes cultures a changé votre façon de voir votre propre culture ? Si oui, comment ?",
        inputMode: "hybrid",
        suggestions: [
          "Absolument. J'ai commencé à remettre en question certaines habitudes que je considérais comme 'normales', en réalisant qu'elles sont en fait culturellement déterminées. J'ai aussi appris à apprécier certains aspects de ma culture que je tenais pour acquis.",
          "Oui, j'ai développé un regard plus critique sur certains aspects de ma propre culture, notamment sur notre rapport au travail et au temps libre. Je pense avoir trouvé un meilleur équilibre en m'inspirant d'autres modèles culturels.",
          "Définitivement. Je suis devenu(e) plus conscient(e) des stéréotypes que j'avais intériorisés, non seulement sur les autres cultures mais aussi sur la mienne. Cela m'a permis d'avoir une vision plus nuancée des forces et faiblesses de chaque culture."
        ],
        hints: "Expliquez si et comment l'exposition à d'autres cultures a modifié votre vision de votre propre culture.",
        expectedKeywords: ["remettre", "question", "normales", "apprécier", "critique", "rapport", "équilibre", "conscient", "stéréotypes", "nuancée"],
        feedback: {
          correct: "C'est exactement ce type de réflexion qui rend les échanges interculturels si enrichissants. Avez-vous déjà fait face à un véritable 'choc culturel' ? Comment l'avez-vous surmonté ?",
          partial: "Cette prise de recul sur sa propre culture est souvent une conséquence positive des voyages et des expériences interculturelles.",
          incorrect: "Expliquez si et comment vos expériences avec d'autres cultures ont changé votre vision de votre propre culture."
        }
      },
      {
        id: 6,
        botMessage: "Avez-vous déjà vécu un véritable 'choc culturel' ? Si oui, comment l'avez-vous surmonté ?",
        inputMode: "freeText",
        suggestions: [
          "Oui, lors de mon premier voyage en Inde, l'intensité des stimulations sensorielles, la foule omniprésente et les différences dans la notion d'espace personnel m'ont vraiment déstabilisé(e). J'ai surmonté ce choc en me donnant du temps pour m'acclimater et en échangeant avec des expatriés et des locaux bienveillants.",
          "Mon année d'études en Chine a été un véritable choc au début, notamment à cause de la barrière de la langue. J'ai surmonté cette difficulté en prenant des cours intensifs de chinois et en me faisant des amis locaux qui étaient patients avec moi.",
          "J'ai ressenti un choc culturel inversé en rentrant dans mon pays après deux ans à l'étranger. Ce qui était autrefois familier me semblait étrange. J'ai dû redécouvrir ma propre culture et accepter que j'avais changé pendant mon absence."
        ],
        hints: "Décrivez une expérience de choc culturel que vous avez vécue et comment vous avez réussi à la surmonter.",
        expectedKeywords: ["choc", "déstabilisé", "surmonté", "temps", "acclimater", "échangeant", "barrière", "langue", "amis", "redécouvrir"],
        acceptablePhrases: [
          "j'ai ressenti",
          "j'ai surmonté",
          "ce qui m'a aidé",
          "au début",
          "progressivement"
        ],
        feedback: {
          correct: "Merci de partager cette expérience personnelle. Quels conseils donneriez-vous à quelqu'un qui s'apprête à vivre dans une culture très différente de la sienne ?",
          partial: "Le choc culturel est une expérience commune mais très personnelle. Votre façon de le surmonter est instructive.",
          incorrect: "Parlez d'une expérience de choc culturel que vous avez vécue et expliquez comment vous avez réussi à vous adapter."
        }
      },
      {
        id: 7,
        botMessage: "Quels conseils donneriez-vous à quelqu'un qui s'apprête à s'installer dans un pays dont la culture est très différente de la sienne ?",
        inputMode: "suggestions",
        suggestions: [
          "Je lui conseillerais de se renseigner sur la culture et les coutumes avant de partir, mais aussi de rester ouvert et de ne pas se fier uniquement aux stéréotypes. Il est important d'observer, d'écouter et de poser des questions respectueuses aux locaux.",
          "Le plus important est d'être patient avec soi-même et de ne pas s'attendre à tout comprendre immédiatement. L'adaptation prend du temps. Je recommanderais aussi de trouver un équilibre entre s'intégrer et préserver certains aspects de sa propre identité culturelle.",
          "Je suggérerais de rejoindre des groupes ou associations locales qui partagent vos centres d'intérêt, c'est un excellent moyen de faire des rencontres authentiques. Et surtout, garder son sens de l'humour face aux inévitables malentendus culturels !"
        ],
        hints: "Donnez des conseils pratiques pour quelqu'un qui va vivre dans une culture très différente.",
        expectedKeywords: ["renseigner", "ouvert", "stéréotypes", "observer", "patient", "adaptation", "équilibre", "intégrer", "identité", "rencontres"],
        feedback: {
          correct: "Ce sont d'excellents conseils qui peuvent vraiment aider quelqu'un dans cette situation. Pour finir, pensez-vous que la mondialisation tend à uniformiser les cultures ou, au contraire, à renforcer les identités culturelles ?",
          incorrect: "Donnez quelques conseils pratiques à une personne qui va s'installer dans un pays dont la culture est très différente de la sienne."
        }
      },
      {
        id: 8,
        botMessage: "Pour terminer notre discussion, pensez-vous que la mondialisation tend à uniformiser les cultures ou, au contraire, à renforcer les identités culturelles ?",
        inputMode: "hybrid",
        suggestions: [
          "Je pense que la mondialisation a ces deux effets simultanément : elle crée une certaine uniformisation (mêmes chaînes de restaurants, films, musiques...) mais aussi une réaction de préservation des traditions locales et un regain d'intérêt pour le patrimoine culturel unique.",
          "La mondialisation uniformise certainement les aspects superficiels des cultures (mode, nourriture, divertissement), mais les valeurs profondes et les manières de penser restent très ancrées et distinctes. C'est plutôt une hybridation qu'une homogénéisation.",
          "Les nouvelles générations développent des identités multiculturelles complexes, adoptant certains aspects globaux tout en réinterprétant leurs traditions. Internet permet également aux cultures minoritaires de se faire connaître et d'être préservées, ce qui était plus difficile avant."
        ],
        hints: "Donnez votre opinion sur l'impact de la mondialisation sur les différences culturelles.",
        expectedKeywords: ["uniformisation", "préservation", "traditions", "patrimoine", "superficiels", "valeurs", "profondes", "hybridation", "multiculturelles", "minoritaires"],
        feedback: {
          correct: "Merci pour cette réflexion nuancée sur la mondialisation et les cultures. Cette discussion sur les différences culturelles a été très enrichissante !",
          partial: "C'est une perspective intéressante sur la complexité des interactions culturelles dans notre monde globalisé.",
          incorrect: "Donnez votre avis sur l'impact de la mondialisation sur la diversité culturelle."
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à discuter des différences culturelles, à analyser vos expériences interculturelles et à partager vos réflexions sur l'adaptation à de nouveaux environnements.",
    learningObjectives: [
      "Décrire des différences culturelles spécifiques",
      "Analyser la signification des comportements culturels",
      "Partager des expériences d'adaptation culturelle",
      "Réfléchir sur sa propre culture avec un regard critique",
      "Discuter des enjeux de la diversité culturelle dans un monde globalisé"
    ],
    grammar: {
      points: [
        "Comparatifs et superlatifs",
        "Expressions d'opinion nuancées",
        "Temps du passé pour raconter des expériences",
        "Connecteurs logiques pour structurer un récit"
      ]
    }
  };

  export default culturalDifferences;
