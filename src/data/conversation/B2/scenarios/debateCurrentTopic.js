// chatbot/B2/scenarios/debateCurrentTopic.js

const debateCurrentTopic = {
    id: 1,
    title: "Debate Current Topic",
    level: "B2",
    description: "Learn how to debate a contemporary issue with nuanced arguments, considering different perspectives and supporting your position with evidence.",
    estimatedTime: "20-25 minutes",
    vocabulary: ["débat", "argumentation", "nuance", "perspective", "enjeu", "controverse", "consensus", "objectivité", "source", "conséquence"],
    steps: [
      {
        id: 1,
        botMessage: "Bonjour et bienvenue à notre atelier de débat. Aujourd'hui, nous allons discuter d'un sujet contemporain important : l'intelligence artificielle et son impact sur l'emploi. Pour commencer, quelle est votre position générale sur ce sujet ?",
        inputMode: "suggestions",
        suggestions: [
          "Je pense que l'IA représente un progrès technologique majeur qui transformera positivement le marché du travail à long terme, bien qu'elle puisse causer des perturbations temporaires dans certains secteurs.",
          "Je suis préoccupé(e) par l'impact de l'IA sur l'emploi. Si elle peut créer de nouveaux métiers, elle risque surtout d'entraîner des suppressions massives de postes et d'accentuer les inégalités sociales.",
          "J'ai une position nuancée sur la question. L'IA offre des opportunités d'innovation considérables, mais elle soulève également des défis socio-économiques importants qui nécessitent une réflexion approfondie et des politiques adaptées."
        ],
        hints: "Exprimez votre position générale sur l'intelligence artificielle et son impact sur l'emploi.",
        expectedKeywords: ["IA", "intelligence artificielle", "emploi", "marché", "travail", "progrès", "perturbations", "métiers", "inégalités", "nuancée"],
        feedback: {
          correct: "Merci pour cette première réflexion. Pouvez-vous développer votre position en vous appuyant sur des arguments précis ou des exemples concrets ?",
          incorrect: "Pourriez-vous donner votre point de vue sur l'intelligence artificielle et son impact sur l'emploi de manière plus précise ?"
        }
      },
      {
        id: 2,
        botMessage: "Pouvez-vous approfondir votre position en développant des arguments précis et en vous appuyant sur des exemples concrets ?",
        inputMode: "hybrid",
        suggestions: [
          "L'histoire nous montre que les avancées technologiques ont toujours suscité des craintes sur l'emploi, mais ont finalement créé plus de postes qu'elles n'en ont supprimés. Par exemple, l'informatisation a fait disparaître certains métiers mais en a créé davantage dans le numérique. L'IA suivra probablement la même trajectoire, avec l'émergence de professions liées à la gestion, l'éthique et la supervision des systèmes automatisés.",
          "Les études récentes de l'OCDE estiment que 14% des emplois dans les pays développés risquent d'être automatisés, et 32% fortement transformés. Contrairement aux révolutions technologiques précédentes, l'IA peut remplacer des tâches cognitives complexes, touchant ainsi des secteurs jusqu'ici préservés comme la médecine, le droit ou la finance. La rapidité de cette transformation laisse peu de temps pour la reconversion des travailleurs concernés.",
          "Plusieurs facteurs doivent être considérés : d'un côté, l'IA augmente la productivité et peut libérer les humains des tâches répétitives, comme le montrent les assistants virtuels dans le service client. De l'autre, la transition sera douloureuse pour certains secteurs, notamment dans l'industrie ou le transport avec les véhicules autonomes. La question n'est pas tant de savoir si l'IA créera ou détruira des emplois, mais comment gérer cette transition et redistribuer les gains de productivité."
        ],
        hints: "Développez votre position avec des arguments précis et des exemples concrets concernant l'impact de l'IA sur l'emploi.",
        expectedKeywords: ["avancées", "technologiques", "craintes", "informatisation", "études", "OCDE", "automatisés", "tâches", "cognitives", "transition"],
        acceptablePhrases: [
          "l'histoire nous montre",
          "les études récentes",
          "plusieurs facteurs",
          "par exemple",
          "contrairement aux"
        ],
        feedback: {
          correct: "Votre argumentation est bien développée. Maintenant, pouvez-vous envisager les contre-arguments que l'on pourrait opposer à votre position et y répondre ?",
          partial: "Vous soulevez des points intéressants. Pourriez-vous approfondir davantage avec des données ou exemples spécifiques ?",
          incorrect: "Veuillez développer votre position avec des arguments plus précis et des exemples concrets sur l'impact de l'IA sur l'emploi."
        }
      },
      {
        id: 3,
        botMessage: "Toute position dans un débat peut faire l'objet de contestations. Quels contre-arguments pourrait-on opposer à votre position et comment y répondriez-vous ?",
        inputMode: "freeText",
        suggestions: [
          "On pourrait objecter que la comparaison avec les révolutions technologiques précédentes n'est pas pertinente car l'IA progresse à une vitesse sans précédent et peut remplacer des fonctions cognitives complexes. Je répondrais que malgré cette différence, l'histoire montre notre capacité d'adaptation : nous créons systématiquement de nouveaux besoins et services que même l'IA avancée ne pourra pas totalement satisfaire. De plus, la complémentarité humain-machine sera probablement plus efficace que l'automatisation complète dans de nombreux domaines.",
          "Les défenseurs de l'IA minimisent souvent les conséquences sociales à court terme en se focalisant sur les bénéfices à long terme. On pourrait me reprocher de faire l'inverse. J'admettrais que l'IA apportera certainement des avantages considérables en termes de productivité et d'innovation. Cependant, je maintiens que sans politiques d'accompagnement ambitieuses (formation continue, protection sociale renforcée, redistribution), ces gains bénéficieront principalement aux détenteurs de capital technologique, aggravant les inégalités.",
          "On pourrait critiquer ma position médiane comme manquant de conviction. Certains argumenteraient qu'il faut soit embrasser pleinement l'IA pour rester compétitif, soit la réguler strictement pour protéger l'emploi. Je répondrais que cette dichotomie est artificielle : nous pouvons simultanément encourager l'innovation responsable et mettre en place des mécanismes de protection sociale. Le véritable débat devrait porter sur la gouvernance de l'IA et non sur son adoption ou son rejet catégorique."
        ],
        hints: "Présentez les contre-arguments qu'on pourrait opposer à votre position et expliquez comment vous y répondriez.",
        expectedKeywords: ["objecter", "comparaison", "révolutions", "capacité", "adaptation", "défenseurs", "minimisent", "conséquences", "dichotomie", "artificielle"],
        feedback: {
          correct: "Vous démontrez une excellente capacité à anticiper les objections et à y répondre de manière nuancée. Examinons maintenant les implications éthiques et sociales plus larges de ce sujet.",
          partial: "Vous avez identifié certains contre-arguments pertinents. Pourriez-vous approfondir davantage votre réponse à ces objections ?",
          incorrect: "Veuillez identifier les arguments qui pourraient s'opposer à votre position et expliquer comment vous y répondriez."
        }
      },
      {
        id: 4,
        botMessage: "Au-delà de l'impact direct sur l'emploi, quelles sont selon vous les implications éthiques et sociales plus larges du développement de l'intelligence artificielle dans notre société ?",
        inputMode: "suggestions",
        suggestions: [
          "Le développement de l'IA soulève des questions fondamentales sur la vie privée et la surveillance de masse, avec la collecte massive de données nécessaire à son fonctionnement. Elle pose également la question de l'autonomie décisionnelle : jusqu'où déléguer nos choix aux algorithmes ? Enfin, elle risque d'accentuer les fractures numériques entre ceux qui maîtrisent ces technologies et les autres, créant potentiellement une nouvelle forme d'exclusion sociale.",
          "L'IA transforme profondément notre rapport au savoir et à la création. Elle remet en question la propriété intellectuelle quand des œuvres sont générées par des machines. Sur le plan éducatif, elle nous oblige à repenser les compétences à développer chez les jeunes, en valorisant davantage la créativité et l'esprit critique que la mémorisation. Socialement, elle pourrait aussi réduire certaines interactions humaines, affectant notre développement psychosocial.",
          "Une préoccupation majeure concerne les biais algorithmiques qui peuvent perpétuer ou amplifier les discriminations existantes, comme l'ont montré plusieurs cas dans le recrutement ou la justice prédictive. Il y a aussi la question de la responsabilité : qui est imputable en cas de décision préjudiciable prise par une IA ? Enfin, l'automatisation pourrait modifier notre conception même du travail et de sa valeur sociale, nous forçant à repenser le contrat social qui structure nos sociétés."
        ],
        hints: "Discutez des implications éthiques et sociales plus larges de l'intelligence artificielle, au-delà de son impact sur l'emploi.",
        expectedKeywords: ["vie privée", "surveillance", "données", "autonomie", "algorithmes", "fractures", "biais", "discrimination", "responsabilité", "contrat social"],
        feedback: {
          correct: "Vous soulevez des questions éthiques et sociales essentielles. Face à ces défis complexes, quelles mesures politiques ou réglementaires recommanderiez-vous ?",
          incorrect: "Veuillez aborder les implications éthiques et sociales plus larges de l'IA dans notre société, au-delà de son impact sur l'emploi."
        }
      },
      {
        id: 5,
        botMessage: "Face à ces défis complexes liés à l'IA, quelles politiques publiques ou mesures réglementaires recommanderiez-vous pour maximiser les bénéfices tout en minimisant les risques ?",
        inputMode: "hybrid",
        suggestions: [
          "Je préconise une approche réglementaire équilibrée qui encourage l'innovation tout en établissant des garde-fous. Cela passerait par : 1) Une législation sur la transparence des algorithmes, obligeant les entreprises à expliquer le fonctionnement de leurs systèmes d'IA; 2) Des investissements massifs dans la formation et la reconversion professionnelle; 3) Un encadrement strict de l'utilisation des données personnelles; et 4) Une taxation spécifique des gains de productivité liés à l'IA pour financer la protection sociale.",
          "Plutôt qu'une réglementation uniforme, je recommande une approche sectorielle adaptée aux risques spécifiques de chaque domaine. Par exemple, des standards plus stricts pour l'IA médicale ou juridique que pour les applications récréatives. J'encouragerais également la création d'organismes indépendants d'évaluation des systèmes d'IA, la mise en place d'un revenu universel pour faire face aux transitions professionnelles, et un soutien accru à la recherche sur l'IA éthique et explicable.",
          "Les mesures devraient opérer à plusieurs niveaux. Au niveau éducatif : refonte des programmes pour développer les compétences complémentaires à l'IA. Au niveau économique : incitations fiscales pour les entreprises qui utilisent l'IA pour augmenter leurs employés plutôt que les remplacer. Au niveau juridique : clarification des régimes de responsabilité pour les décisions automatisées. Et au niveau international : harmonisation des standards pour éviter les paradis de l'IA où les réglementations seraient contournées."
        ],
        hints: "Proposez des politiques publiques ou mesures réglementaires concrètes concernant l'IA.",
        expectedKeywords: ["réglementaire", "transparence", "algorithmes", "formation", "reconversion", "taxation", "sectorielle", "standards", "revenu universel", "responsabilité"],
        feedback: {
          correct: "Vos propositions politiques sont bien articulées et abordent différentes dimensions du problème. Comment évaluez-vous l'équilibre actuel du débat public sur l'IA ? Est-il suffisamment nuancé ?",
          partial: "Vos suggestions sont intéressantes. Pourriez-vous préciser comment elles seraient mises en œuvre concrètement ?",
          incorrect: "Veuillez proposer des politiques publiques ou mesures réglementaires concrètes pour gérer les défis liés à l'IA."
        }
      },
      {
        id: 6,
        botMessage: "Comment évaluez-vous la qualité du débat public actuel sur l'intelligence artificielle ? Quels aspects vous semblent sur-représentés ou au contraire négligés dans les discussions ?",
        inputMode: "freeText",
        suggestions: [
          "Le débat public sur l'IA oscille souvent entre techno-optimisme excessif et catastrophisme. Les médias privilégient les récits spectaculaires (IA surpassant les humains ou menaçant de les remplacer) au détriment d'analyses nuancées des applications concrètes. Les voix des experts techniques sont sur-représentées, tandis que celles des sciences humaines et sociales, qui pourraient éclairer les implications sociétales, sont trop peu entendues. Les débats négligent également la diversité géographique et culturelle, se concentrant principalement sur les perspectives occidentales.",
          "J'observe que les discussions sont dominées par les aspects économiques (productivité, compétitivité) et technologiques (performances, capacités), laissant peu de place aux considérations démocratiques. On parle rarement de la concentration du pouvoir qu'engendre l'IA entre les mains de quelques entreprises géantes, ni de l'accès inégal aux bénéfices selon les pays. Par ailleurs, les débats opposent souvent technologies et emploi, alors qu'il faudrait davantage réfléchir à leur complémentarité et à la redéfinition du travail humain à l'ère de l'IA.",
          "Le débat actuel tend à présenter l'IA comme une force autonome inévitable plutôt que comme un choix de société. On néglige ainsi les questions fondamentales : quelle IA voulons-nous développer et pour quelles finalités ? Les discussions se focalisent sur les effets plutôt que sur les causes et les objectifs. De plus, la voix des travailleurs potentiellement affectés est peu entendue par rapport à celle des développeurs et des investisseurs. Enfin, on aborde rarement les impacts environnementaux significatifs de ces technologies énergivores."
        ],
        hints: "Analysez la qualité du débat public sur l'IA en identifiant les aspects sur-représentés et négligés.",
        expectedKeywords: ["techno-optimisme", "catastrophisme", "spectaculaires", "nuancées", "experts", "sciences humaines", "démocratiques", "pouvoir", "complémentarité", "environnementaux"],
        acceptablePhrases: [
          "le débat public",
          "j'observe que",
          "les discussions sont",
          "on néglige",
          "la voix des"
        ],
        feedback: {
          correct: "Votre analyse du débat public est pertinente et équilibrée. Pour conclure, comment voyez-vous l'évolution de la relation homme-machine à long terme avec le développement de l'IA ?",
          partial: "Vous soulevez des points intéressants sur le débat public. Pourriez-vous approfondir votre analyse des perspectives manquantes ?",
          incorrect: "Veuillez analyser la qualité actuelle du débat public sur l'IA et indiquer quels aspects sont sur-représentés ou négligés."
        }
      },
      {
        id: 7,
        botMessage: "Comment imaginez-vous l'évolution de la relation homme-machine à long terme avec le développement continu de l'intelligence artificielle ? Quels scénarios vous semblent les plus probables ?",
        inputMode: "suggestions",
        suggestions: [
          "Je pense que nous nous dirigeons vers une symbiose homme-machine où l'IA amplifiera nos capacités cognitives plutôt que de nous remplacer. À terme, la frontière entre l'humain et la technologie deviendra plus floue, avec des interfaces cerveau-machine et des assistants IA personnalisés intégrés à notre quotidien. Cette coévolution exigera de repenser fondamentalement notre identité et nos valeurs, mais pourrait nous permettre de résoudre des problèmes aujourd'hui insurmontables, comme les maladies complexes ou la crise climatique.",
          "Le scénario le plus probable me semble être celui d'une société à deux vitesses, où ceux qui peuvent se former en permanence et travailler avec l'IA prospéreront, tandis que d'autres seront marginalisés. Les relations sociales seront également transformées, avec des interactions humaines de plus en plus médiatisées par les technologies. L'enjeu sera de préserver des espaces d'authenticité et d'autonomie humaine, tout en bénéficiant des avantages de l'IA dans des domaines comme la santé ou l'éducation.",
          "Je crois que nous connaîtrons plusieurs phases d'ajustement. Après une période d'enthousiasme technologique suivie de désillusions, nous établirons probablement un nouvel équilibre social répartissant les tâches entre humains et machines selon leurs forces respectives. L'IA excellera dans l'analyse de données et la prédiction, tandis que les humains conserveront l'avantage dans l'intelligence émotionnelle, la créativité contextuelle et le jugement éthique. Ce qui reste incertain, c'est si cette répartition se fera harmonieusement ou au prix de bouleversements sociaux majeurs."
        ],
        hints: "Présentez votre vision de l'évolution future de la relation homme-machine avec le développement de l'IA.",
        expectedKeywords: ["symbiose", "amplifiera", "frontière", "interfaces", "coévolution", "deux vitesses", "marginalisés", "authentique", "ajustement", "équilibre"],
        feedback: {
          correct: "Votre vision prospective est fascinante et bien argumentée. Pour conclure ce débat, pourriez-vous résumer brièvement votre position sur l'IA et l'emploi en intégrant les différentes perspectives que nous avons abordées ?",
          incorrect: "Veuillez présenter votre vision de l'évolution future de la relation entre l'humain et la machine avec le développement de l'IA."
        }
      },
      {
        id: 8,
        botMessage: "Pour conclure ce débat, pourriez-vous résumer votre position sur l'intelligence artificielle et l'emploi en quelques phrases, en intégrant les différentes perspectives que nous avons abordées ?",
        inputMode: "hybrid",
        suggestions: [
          "Ma position sur l'IA et l'emploi est prudemment optimiste : cette technologie transformera profondément le marché du travail, éliminant certains emplois mais en créant d'autres, souvent plus valorisants. Toutefois, cette transition ne sera bénéfique que si nous mettons en place des politiques d'accompagnement ambitieuses : formation continue, protection sociale renforcée et réglementation éthique. L'enjeu n'est pas technologique mais politique : c'est notre capacité collective à orienter l'IA vers le bien commun et à en distribuer équitablement les bénéfices qui déterminera si elle devient une source de progrès partagé ou d'inégalités accrues.",
          "Je maintiens une position nuancée sur l'impact de l'IA sur l'emploi. D'une part, elle présente des risques réels de disruption économique et sociale qui ne doivent pas être minimisés. D'autre part, elle offre des opportunités sans précédent pour augmenter notre productivité et nous libérer de tâches répétitives. Le défi consiste à naviguer entre innovation et protection, en encourageant les développements bénéfiques de l'IA tout en établissant des garde-fous contre ses dérives potentielles. Cela exige un débat public équilibré, incluant toutes les parties prenantes, et des solutions adaptées aux spécificités de chaque secteur et territoire.",
          "En conclusion, je vois l'IA comme un puissant amplificateur de nos choix collectifs plutôt qu'une force autonome inéluctable. Son impact sur l'emploi dépendra largement de nos décisions : quelles technologies développer, comment les déployer, et comment redistribuer la valeur créée. Je plaide pour une approche qui reconnaît les défis immédiats tout en préparant l'avenir, où la complémentarité homme-machine sera privilégiée plutôt que la substitution. Cela implique de repenser nos systèmes éducatifs, nos protections sociales et notre rapport même au travail, pour construire une société où la technologie sert l'épanouissement humain plutôt que l'inverse."
        ],
        hints: "Résumez votre position finale sur l'IA et l'emploi en intégrant différentes perspectives.",
        expectedKeywords: ["optimiste", "transformation", "transition", "politiques", "accompagnement", "nuancée", "risques", "opportunités", "amplificateur", "complémentarité"],
        feedback: {
          correct: "Merci pour cette synthèse équilibrée qui intègre habilement les multiples dimensions de ce sujet complexe. Votre capacité à présenter des arguments nuancés, à considérer différentes perspectives et à formuler des propositions concrètes témoigne d'une excellente maîtrise du débat. Ce type de réflexion approfondie est exactement ce dont nous avons besoin pour aborder les défis de l'IA de manière constructive.",
          partial: "Votre synthèse aborde plusieurs aspects importants du débat. Une intégration encore plus explicite des différentes perspectives discutées aurait renforcé votre conclusion.",
          incorrect: "Veuillez résumer votre position finale sur l'IA et l'emploi en intégrant les différentes perspectives abordées dans notre discussion."
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez démontré une excellente capacité à débattre d'un sujet contemporain complexe avec nuance, en considérant différentes perspectives et en soutenant vos arguments de manière approfondie.",
    learningObjectives: [
      "Exprimer une position nuancée sur un sujet controversé",
      "Développer une argumentation structurée avec exemples à l'appui",
      "Anticiper et répondre aux contre-arguments",
      "Analyser les dimensions éthiques et sociales d'une question",
      "Proposer des solutions concrètes à des problèmes complexes"
    ],
    grammar: {
      points: [
        "Connecteurs logiques pour structurer l'argumentation",
        "Modalisateurs pour nuancer le discours",
        "Conditionnel pour exprimer des hypothèses",
        "Subjonctif après l'expression d'opinions"
      ]
    }
  };
  
  export default debateCurrentTopic;