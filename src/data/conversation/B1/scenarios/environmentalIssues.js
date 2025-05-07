// chatbot/B1/scenarios/environmentalIssues.js

const environmentalIssues = {
    id: 4,
    title: "Environmental Issues",
    level: "B1",
    description: "Learn how to discuss environmental problems, express opinions on ecology and propose solutions.",
    estimatedTime: "15-20 minutes",
    vocabulary: ["environnement", "pollution", "changement climatique", "recyclage", "développement durable", "énergie renouvelable", "empreinte carbone", "biodiversité", "écosystème", "ressources naturelles"],
    steps: [
      {
        id: 1,
        botMessage: "Bonjour ! On m'a dit que tu t'intéressais aux questions environnementales. Selon toi, quel est le problème écologique le plus urgent actuellement ?",
        inputMode: "suggestions",
        suggestions: [
          "Je pense que le changement climatique est le défi le plus urgent, car il affecte tous les écosystèmes et menace la stabilité de notre planète.",
          "Pour moi, la pollution plastique des océans est particulièrement alarmante, car elle détruit la vie marine et entre dans notre chaîne alimentaire.",
          "La déforestation me préoccupe beaucoup, car les forêts sont essentielles pour la biodiversité et l'absorption du CO2."
        ],
        hints: "Identifiez un problème environnemental majeur et expliquez pourquoi vous le considérez comme prioritaire.",
        expectedKeywords: ["changement", "climatique", "pollution", "plastique", "océans", "déforestation", "biodiversité", "urgent", "préoccupe", "écosystèmes"],
        feedback: {
          correct: "C'est effectivement une préoccupation majeure. Quelles sont selon toi les principales causes de ce problème ?",
          incorrect: "Indique quel problème environnemental te semble le plus urgent et explique pourquoi."
        }
      },
      {
        id: 2,
        botMessage: "Quelles sont, selon toi, les principales causes de ce problème environnemental ?",
        inputMode: "hybrid",
        suggestions: [
          "Les activités industrielles et la consommation excessive d'énergies fossiles sont les principales responsables des émissions de gaz à effet de serre.",
          "C'est principalement dû à notre société de consommation et au modèle économique qui favorise les produits jetables et les emballages à usage unique.",
          "L'exploitation intensive des ressources naturelles pour l'agriculture et l'urbanisation est la cause principale, ainsi que le manque de réglementation efficace."
        ],
        hints: "Identifiez les causes principales du problème environnemental que vous avez mentionné.",
        expectedKeywords: ["industrielles", "fossiles", "émissions", "consommation", "jetables", "emballages", "exploitation", "ressources", "agriculture", "réglementation"],
        acceptablePhrases: [
          "c'est principalement dû à",
          "les principales causes sont",
          "cela vient de",
          "c'est causé par"
        ],
        feedback: {
          correct: "Tu as bien identifié des causes importantes. Dans ta vie quotidienne, quelles actions fais-tu personnellement pour réduire ton impact environnemental ?",
          partial: "C'est une analyse intéressante de certains facteurs. Y en a-t-il d'autres que tu voudrais ajouter ?",
          incorrect: "Explique quelles sont les principales causes du problème environnemental que tu as mentionné."
        }
      },
      {
        id: 3,
        botMessage: "Dans ta vie quotidienne, quelles actions fais-tu personnellement pour réduire ton impact environnemental ?",
        inputMode: "freeText",
        suggestions: [
          "J'essaie de limiter ma consommation de plastique en utilisant des sacs réutilisables et une gourde. Je fais aussi attention à bien trier mes déchets et je privilégie les transports en commun ou le vélo.",
          "J'ai considérablement réduit ma consommation de viande car l'élevage a un impact environnemental important. J'achète aussi des produits locaux et de saison pour réduire l'empreinte carbone.",
          "Je limite ma consommation d'eau et d'électricité à la maison. J'ai aussi adopté une approche minimaliste, en achetant moins mais mieux, et en réparant les objets plutôt que de les remplacer."
        ],
        hints: "Décrivez les actions concrètes que vous entreprenez dans votre vie quotidienne pour protéger l'environnement.",
        expectedKeywords: ["limiter", "plastique", "trier", "déchets", "transports", "réduit", "viande", "locaux", "saison", "consommation"],
        feedback: {
          correct: "Ce sont des initiatives importantes ! Penses-tu que les actions individuelles sont suffisantes ou faut-il des mesures plus larges pour résoudre ces problèmes ?",
          partial: "C'est un bon début. As-tu remarqué un impact positif de ces changements ?",
          incorrect: "Décris les actions concrètes que tu fais personnellement au quotidien pour réduire ton impact sur l'environnement."
        }
      },
      {
        id: 4,
        botMessage: "Selon toi, les actions individuelles sont-elles suffisantes pour résoudre les problèmes environnementaux ou faut-il des mesures plus larges ?",
        inputMode: "suggestions",
        suggestions: [
          "Je pense que les actions individuelles sont importantes mais insuffisantes. Il faut des politiques environnementales strictes au niveau gouvernemental et des engagements des grandes entreprises.",
          "Les deux sont nécessaires et complémentaires. Les changements individuels créent une demande pour des produits plus écologiques, mais les réglementations sont essentielles pour transformer les industries polluantes.",
          "Les mesures à grande échelle sont plus efficaces. Sans régulation des industries et sans accords internationaux, les efforts individuels auront un impact limité sur les problèmes globaux."
        ],
        hints: "Donnez votre opinion sur l'efficacité des actions individuelles par rapport aux mesures collectives et gouvernementales.",
        expectedKeywords: ["insuffisantes", "politiques", "gouvernemental", "entreprises", "complémentaires", "réglementations", "industries", "échelle", "régulation", "accords"],
        feedback: {
          correct: "C'est une analyse nuancée. Quelle mesure politique ou quelle innovation technologique te semble la plus prometteuse pour l'avenir ?",
          incorrect: "Donne ton opinion sur l'efficacité des actions individuelles par rapport aux mesures plus larges comme les politiques gouvernementales."
        }
      },
      {
        id: 5,
        botMessage: "Quelle innovation ou politique environnementale te semble la plus prometteuse pour l'avenir ?",
        inputMode: "hybrid",
        suggestions: [
          "Le développement des énergies renouvelables comme l'éolien et le solaire, accompagné d'un système de stockage d'énergie efficace, pourrait révolutionner notre façon de produire et consommer l'énergie.",
          "Une taxation significative du carbone qui reflète le véritable coût environnemental des produits et services me semble essentielle pour orienter l'économie vers la durabilité.",
          "Les innovations dans l'agriculture durable et l'économie circulaire permettraient de repenser notre système alimentaire et de production pour minimiser les déchets et l'utilisation des ressources."
        ],
        hints: "Identifiez une solution technologique ou politique qui vous semble particulièrement prometteuse pour l'environnement.",
        expectedKeywords: ["énergies", "renouvelables", "taxation", "carbone", "agriculture", "durable", "économie", "circulaire", "stockage", "ressources"],
        feedback: {
          correct: "C'est une piste intéressante. Es-tu optimiste ou pessimiste quant à notre capacité collective à résoudre les problèmes environnementaux ?",
          partial: "Cette approche pourrait effectivement avoir un impact significatif.",
          incorrect: "Indique quelle innovation technologique ou politique environnementale te semble la plus prometteuse pour l'avenir."
        }
      },
      {
        id: 6,
        botMessage: "Es-tu plutôt optimiste ou pessimiste concernant notre capacité à résoudre les défis environnementaux dans les prochaines décennies ?",
        inputMode: "freeText",
        suggestions: [
          "Je suis prudemment optimiste. La prise de conscience environnementale s'accélère et les jeunes générations sont très mobilisées. Les technologies vertes progressent aussi rapidement, même si le temps presse.",
          "Je tends vers le pessimisme car les changements nécessaires sont énormes et les intérêts économiques à court terme dominent souvent les décisions politiques. Mais j'espère me tromper.",
          "Je suis partagé(e). D'un côté, nous avons les connaissances et technologies nécessaires, mais de l'autre, la volonté politique internationale semble insuffisante face à l'urgence de la situation."
        ],
        hints: "Exprimez votre niveau d'optimisme ou de pessimisme concernant l'avenir environnemental et justifiez votre position.",
        expectedKeywords: ["optimiste", "pessimiste", "conscience", "générations", "technologies", "changements", "économiques", "politiques", "partagé", "urgence"],
        acceptablePhrases: [
          "je suis optimiste",
          "je suis pessimiste",
          "je suis partagé",
          "j'espère que"
        ],
        feedback: {
          correct: "C'est une perspective intéressante et nuancée. Comment penses-tu que l'éducation pourrait jouer un rôle dans la résolution des problèmes environnementaux ?",
          partial: "Tu soulèves des points pertinents sur les défis et opportunités que nous avons devant nous.",
          incorrect: "Indique si tu es plutôt optimiste ou pessimiste concernant notre capacité à résoudre les problèmes environnementaux et explique pourquoi."
        }
      },
      {
        id: 7,
        botMessage: "Selon toi, quel rôle l'éducation peut-elle jouer dans la sensibilisation et la résolution des problèmes environnementaux ?",
        inputMode: "suggestions",
        suggestions: [
          "L'éducation est fondamentale car elle permet aux jeunes de comprendre les enjeux environnementaux dès leur plus jeune âge et d'adopter des comportements responsables qui deviendront naturels.",
          "Les programmes scolaires devraient intégrer davantage les questions environnementales dans toutes les matières, pas seulement en sciences, pour montrer que c'est un enjeu transversal.",
          "L'éducation environnementale devrait aussi cibler les adultes à travers des campagnes de sensibilisation et des formations continues, car ce sont eux qui prennent les décisions aujourd'hui."
        ],
        hints: "Expliquez comment l'éducation peut contribuer à résoudre les problèmes environnementaux.",
        expectedKeywords: ["éducation", "jeunes", "comprendre", "enjeux", "comportements", "programmes", "scolaires", "matières", "sensibilisation", "formations"],
        feedback: {
          correct: "Tu as parfaitement raison sur l'importance de l'éducation. Pour finir, y a-t-il un aspect de l'environnement qui te tient particulièrement à cœur ?",
          incorrect: "Explique comment l'éducation peut aider à résoudre les problèmes environnementaux."
        }
      },
      {
        id: 8,
        botMessage: "Pour terminer notre discussion, y a-t-il un aspect particulier de l'environnement ou une cause écologique qui te tient spécialement à cœur ?",
        inputMode: "hybrid",
        suggestions: [
          "La protection des océans me passionne particulièrement, car ils représentent un écosystème vital pour la planète mais souffrent énormément de la pollution et de la surpêche.",
          "La préservation de la biodiversité est ma principale préoccupation, car l'extinction des espèces est irréversible et nous ne comprenons pas encore toutes les conséquences de ces pertes.",
          "L'accès à l'eau potable est un enjeu qui me touche, car c'est à la fois un problème environnemental et social qui affecte des milliards de personnes et risque de s'aggraver avec le changement climatique."
        ],
        hints: "Partagez une cause environnementale qui vous tient particulièrement à cœur et expliquez pourquoi.",
        expectedKeywords: ["protection", "océans", "biodiversité", "préservation", "espèces", "extinction", "eau", "potable", "social", "passionne"],
        feedback: {
          correct: "C'est une cause très importante. Merci pour cette discussion enrichissante sur l'environnement et pour avoir partagé tes perspectives !",
          partial: "Cette cause mérite effectivement toute notre attention.",
          incorrect: "Indique s'il y a un aspect de l'environnement ou une cause écologique qui te tient particulièrement à cœur."
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à discuter de problèmes environnementaux, à exprimer des opinions nuancées sur l'écologie et à proposer des solutions.",
    learningObjectives: [
      "Identifier et expliquer des problèmes environnementaux",
      "Discuter des causes et conséquences des problèmes écologiques",
      "Parler d'actions individuelles et collectives",
      "Exprimer des opinions nuancées sur des questions environnementales",
      "Utiliser le vocabulaire spécifique à l'écologie"
    ],
    grammar: {
      points: [
        "Structures pour exprimer l'opinion (je pense que, selon moi)",
        "Comparatifs et superlatifs",
        "Expressions de cause et conséquence",
        "Conditionnel pour les propositions hypothétiques"
      ]
    }
  };
  
  export default environmentalIssues;