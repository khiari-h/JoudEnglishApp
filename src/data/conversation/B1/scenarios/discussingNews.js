// chatbot/B1/scenarios/discussingNews.js

const discussingNews = {
    id: 8,
    title: "Discussing News",
    level: "B1",
    description: "Learn how to comment on current events and discuss news topics with nuanced opinions.",
    estimatedTime: "15-20 minutes",
    vocabulary: ["actualité", "information", "événement", "article", "journal", "média", "débat", "politique", "économie", "société"],
    steps: [
      {
        id: 1,
        botMessage: "Bonjour ! Avez-vous suivi les actualités récemment ? Y a-t-il un sujet d'actualité qui vous intéresse particulièrement en ce moment ?",
        inputMode: "suggestions",
        suggestions: [
          "Oui, je suis très intéressé(e) par les derniers développements concernant la crise énergétique en Europe et les mesures prises pour réduire la consommation.",
          "Ces derniers jours, j'ai suivi l'actualité sur les nouvelles technologies et notamment le débat sur l'intelligence artificielle et ses implications éthiques.",
          "Je m'intéresse beaucoup à l'actualité sportive en ce moment, particulièrement aux championnats et aux performances des athlètes de mon pays."
        ],
        hints: "Mentionnez un sujet d'actualité qui vous intéresse actuellement et pourquoi.",
        expectedKeywords: ["crise", "énergétique", "mesures", "technologies", "intelligence artificielle", "éthiques", "sportive", "championnats", "athlètes", "intéressé"],
        feedback: {
          correct: "C'est un sujet très actuel en effet ! Comment vous informez-vous sur ce sujet ? Quelles sources utilisez-vous ?",
          incorrect: "Pourriez-vous mentionner un sujet d'actualité récent qui vous intéresse particulièrement ?"
        }
      },
      {
        id: 2,
        botMessage: "Comment vous informez-vous généralement sur l'actualité ? Utilisez-vous plutôt les médias traditionnels ou les réseaux sociaux ?",
        inputMode: "hybrid",
        suggestions: [
          "Je consulte principalement les sites d'information en ligne comme Le Monde ou Le Figaro, mais je regarde aussi le journal télévisé le soir. J'apprécie d'avoir différentes perspectives.",
          "Je m'informe surtout via les réseaux sociaux comme Twitter et LinkedIn où je suis des journalistes et experts. C'est plus rapide, mais je vérifie toujours les informations sur des sites officiels.",
          "J'utilise une application qui agrège les nouvelles de différentes sources. J'écoute aussi des podcasts d'analyse hebdomadaires qui approfondissent les sujets importants."
        ],
        hints: "Décrivez vos sources d'information habituelles et expliquez votre préférence.",
        expectedKeywords: ["sites", "information", "journal", "télévisé", "réseaux sociaux", "twitter", "application", "podcasts", "sources", "vérifie"],
        acceptablePhrases: [
          "je consulte",
          "je m'informe",
          "j'utilise",
          "j'écoute",
          "je regarde"
        ],
        feedback: {
          correct: "Intéressant ! Concernant le sujet d'actualité que vous avez mentionné, quelle est votre opinion à ce propos ?",
          partial: "C'est important d'avoir des sources variées. Trouvez-vous que la qualité de l'information varie selon les médias ?",
          incorrect: "Pourriez-vous préciser comment vous vous informez habituellement sur l'actualité ?"
        }
      },
      {
        id: 3,
        botMessage: "Concernant le sujet d'actualité que vous avez mentionné, quelle est votre opinion à ce propos ? Y a-t-il différents points de vue sur cette question ?",
        inputMode: "freeText",
        suggestions: [
          "Je pense que la crise énergétique révèle notre dépendance excessive aux énergies fossiles. Certains estiment que c'est l'occasion d'accélérer la transition écologique, tandis que d'autres s'inquiètent des conséquences économiques immédiates.",
          "Concernant l'intelligence artificielle, je suis partagé(e). D'un côté, les innovations sont impressionnantes et utiles, mais de l'autre, les questions éthiques et l'impact sur l'emploi sont préoccupants. Le débat est très polarisé entre techno-optimistes et ceux qui appellent à plus de régulation.",
          "Dans le domaine sportif, je trouve que les médias se concentrent trop sur quelques sports populaires et négligent les autres disciplines. Certains défendent cette approche pour des raisons commerciales, d'autres militent pour une couverture plus diversifiée."
        ],
        hints: "Exprimez votre opinion sur le sujet d'actualité et présentez différents points de vue sur la question.",
        expectedKeywords: ["pense", "révèle", "estiment", "s'inquiètent", "partagé", "innovations", "éthiques", "emploi", "débat", "polarisé"],
        feedback: {
          correct: "Votre analyse est nuancée et vous présentez bien les différentes perspectives. Pensez-vous que les médias traitent ce sujet de manière objective ?",
          partial: "C'est un point de vue intéressant. Y a-t-il d'autres aspects de ce sujet qui vous semblent importants ?",
          incorrect: "Pourriez-vous donner votre opinion sur le sujet d'actualité mentionné et présenter différents points de vue ?"
        }
      },
      {
        id: 4,
        botMessage: "Selon vous, les médias traitent-ils ce sujet de manière objective et complète, ou pensez-vous qu'il y a des biais dans la couverture médiatique ?",
        inputMode: "suggestions",
        suggestions: [
          "Je trouve que la couverture médiatique est souvent simplifiée et manque de nuances. Certains médias ont clairement un angle politique qui influence leur traitement de l'information.",
          "Les médias traditionnels essaient généralement d'être objectifs, mais le format court des reportages ne permet pas toujours d'approfondir la complexité des enjeux.",
          "Il y a un vrai problème de polarisation des médias aujourd'hui. Selon la source consultée, on peut avoir une vision complètement différente du même événement, ce qui rend difficile l'accès à une information équilibrée."
        ],
        hints: "Donnez votre avis sur l'objectivité des médias concernant ce sujet d'actualité.",
        expectedKeywords: ["couverture", "simplifiée", "nuances", "angle", "politique", "objectifs", "format", "court", "polarisation", "équilibrée"],
        feedback: {
          correct: "C'est une réflexion pertinente sur le traitement médiatique. Pensez-vous que ce sujet d'actualité aura des conséquences importantes à long terme ?",
          incorrect: "Donnez votre opinion sur l'objectivité des médias dans leur traitement de ce sujet d'actualité."
        }
      },
      {
        id: 5,
        botMessage: "À votre avis, quelles pourraient être les conséquences à long terme de cette actualité ou de cette situation ?",
        inputMode: "hybrid",
        suggestions: [
          "Sur le long terme, je pense que cette crise énergétique pourrait accélérer l'adoption des énergies renouvelables et modifier nos habitudes de consommation. Elle pourrait aussi renforcer la coopération européenne en matière d'énergie.",
          "Les développements en intelligence artificielle vont probablement transformer de nombreux secteurs professionnels dans les années à venir, créant de nouveaux métiers mais en rendant d'autres obsolètes. La question sera de gérer cette transition socialement.",
          "Ce débat sportif pourrait mener à une réforme du système de financement du sport, avec peut-être plus d'équité entre les disciplines. Mais sans pression publique continue, je crains que rien ne change vraiment."
        ],
        hints: "Analysez les possibles conséquences à long terme de la situation ou de l'événement d'actualité.",
        expectedKeywords: ["long terme", "accélérer", "adoption", "modifier", "habitudes", "transformer", "secteurs", "nouveaux", "obsolètes", "transition"],
        feedback: {
          correct: "Votre analyse prospective est très intéressante. Avez-vous discuté de ce sujet avec d'autres personnes ? Les opinions sont-elles partagées dans votre entourage ?",
          partial: "C'est une perspective intéressante sur les implications futures.",
          incorrect: "Expliquez quelles pourraient être les conséquences à long terme de cette situation selon vous."
        }
      },
      {
        id: 6,
        botMessage: "Avez-vous discuté de ce sujet d'actualité avec d'autres personnes ? Y a-t-il des débats ou des opinions divergentes dans votre entourage ?",
        inputMode: "freeText",
        suggestions: [
          "Oui, j'en ai discuté avec des collègues et les avis sont assez partagés. Les plus jeunes semblent plus préoccupés par les aspects environnementaux, tandis que les plus âgés s'inquiètent davantage des implications économiques immédiates.",
          "J'ai eu des discussions animées avec des amis qui travaillent dans le secteur technologique, et leurs perspectives sont très différentes des miennes. Ils sont beaucoup plus optimistes quant aux bénéfices de ces innovations.",
          "Ce sujet crée des débats passionnés dans ma famille, surtout lors des repas ! Certains défendent farouchement leur point de vue, ce qui rend parfois la conversation difficile mais toujours enrichissante."
        ],
        hints: "Parlez des discussions que vous avez eues sur ce sujet et des différentes opinions dans votre entourage.",
        expectedKeywords: ["discuté", "collègues", "avis", "partagés", "jeunes", "âgés", "discussions", "animées", "perspectives", "différentes"],
        acceptablePhrases: [
          "j'en ai discuté",
          "j'ai eu des discussions",
          "les avis sont",
          "ce sujet crée",
          "certains pensent"
        ],
        feedback: {
          correct: "C'est intéressant de voir comment les opinions peuvent varier selon les personnes et leurs perspectives. Y a-t-il d'autres sujets d'actualité qui vous semblent importants actuellement ?",
          partial: "Les discussions avec des personnes ayant des points de vue différents sont souvent enrichissantes.",
          incorrect: "Indiquez si vous avez discuté de ce sujet avec d'autres personnes et quelles sont les différentes opinions dans votre entourage."
        }
      },
      {
        id: 7,
        botMessage: "Y a-t-il d'autres sujets d'actualité qui vous préoccupent ou vous intéressent en ce moment ?",
        inputMode: "suggestions",
        suggestions: [
          "Je suis également préoccupé(e) par les questions environnementales, notamment les récents rapports sur le changement climatique et ses conséquences déjà visibles dans plusieurs régions du monde.",
          "L'actualité économique retient aussi mon attention, particulièrement l'inflation et son impact sur le pouvoir d'achat des ménages. C'est un sujet qui affecte directement la vie quotidienne.",
          "Je m'intéresse beaucoup aux avancées médicales et scientifiques récentes, comme les nouveaux traitements ou vaccins. Ces innovations peuvent avoir un impact majeur sur la santé publique."
        ],
        hints: "Mentionnez un autre sujet d'actualité qui vous intéresse ou vous préoccupe.",
        expectedKeywords: ["environnementales", "changement", "climatique", "économique", "inflation", "pouvoir d'achat", "médicales", "scientifiques", "traitements", "innovations"],
        feedback: {
          correct: "C'est effectivement un sujet important. Pour finir, pensez-vous que les citoyens sont suffisamment informés sur les sujets d'actualité importants ?",
          incorrect: "Mentionnez un autre sujet d'actualité qui vous intéresse ou vous préoccupe actuellement."
        }
      },
      {
        id: 8,
        botMessage: "Pour conclure notre discussion, pensez-vous que les citoyens sont suffisamment informés sur les sujets d'actualité importants ? Comment pourrait-on améliorer l'accès à une information de qualité ?",
        inputMode: "hybrid",
        suggestions: [
          "Je pense que beaucoup de citoyens sont surinformés mais mal informés. L'éducation aux médias dès l'école et la promotion de sources fiables et diversifiées pourraient améliorer la situation. Il faudrait aussi encourager l'esprit critique.",
          "L'accès à l'information n'a jamais été aussi facile, mais paradoxalement, les gens s'enferment dans des bulles informationnelles. Les plateformes devraient proposer des contenus plus diversifiés et les médias publics devraient être renforcés.",
          "Je crois que le problème n'est pas tant l'accès à l'information que le temps disponible pour s'informer correctement. Des formats synthétiques mais rigoureux, comme certains podcasts ou newsletters, peuvent aider les citoyens occupés."
        ],
        hints: "Donnez votre avis sur la qualité de l'information accessible aux citoyens et proposez des améliorations.",
        expectedKeywords: ["surinformés", "mal informés", "éducation", "médias", "sources", "fiables", "esprit", "critique", "bulles", "informationnelles"],
        feedback: {
          correct: "Merci pour cette réflexion pertinente sur l'accès à l'information. C'était très intéressant de discuter de l'actualité avec vous et d'échanger nos points de vue !",
          partial: "C'est une perspective intéressante sur les défis de l'information aujourd'hui.",
          incorrect: "Donnez votre opinion sur la qualité de l'information accessible aux citoyens et suggérez des façons de l'améliorer."
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à discuter de sujets d'actualité en français, à exprimer des opinions nuancées et à analyser différentes perspectives sur des questions contemporaines.",
    learningObjectives: [
      "Discuter de sujets d'actualité avec nuance",
      "Exprimer une opinion personnelle argumentée",
      "Analyser différentes perspectives sur un sujet",
      "Évaluer la qualité de l'information médiatique",
      "Débattre de questions sociétales contemporaines"
    ],
    grammar: {
      points: [
        "Expressions d'opinion (je pense que, à mon avis)",
        "Connecteurs logiques pour structurer l'argumentation",
        "Conditionnel pour exprimer des hypothèses",
        "Vocabulaire spécifique aux médias et à l'information"
      ]
    }
  };

  export default discussingNews;
