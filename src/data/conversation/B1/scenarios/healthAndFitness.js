// chatbot/B1/scenarios/healthAndFitness.js

const healthAndFitness = {
    id: 3,
    title: "Health and Fitness",
    level: "B1",
    description: "Learn how to discuss fitness routines, diet habits and health goals.",
    estimatedTime: "15-20 minutes",
    vocabulary: ["exercice", "alimentation", "nutrition", "régime", "musculation", "cardio", "calories", "hydratation", "métabolisme", "récupération"],
    steps: [
      {
        id: 1,
        botMessage: "Salut ! J'ai remarqué que tu t'intéresses au fitness. Est-ce que tu pratiques une activité physique régulière ?",
        inputMode: "suggestions",
        suggestions: [
          "Oui, je fais du jogging trois fois par semaine et un peu de musculation le week-end.",
          "Je vais à la salle de sport deux fois par semaine où je suis des cours collectifs comme le yoga et le pilates.",
          "Pas autant que je le voudrais, mais j'essaie de marcher au moins 30 minutes par jour et de prendre les escaliers."
        ],
        hints: "Décrivez votre routine d'exercice actuelle, en précisant le type d'activité et la fréquence.",
        expectedKeywords: ["jogging", "musculation", "salle", "sport", "cours", "yoga", "pilates", "marcher", "semaine", "fois"],
        feedback: {
          correct: "C'est une bonne routine ! Quels sont tes objectifs en matière de forme physique ?",
          incorrect: "Parle-moi de ton activité physique actuelle, même si elle est limitée."
        }
      },
      {
        id: 2,
        botMessage: "Quels sont tes objectifs principaux en matière de fitness et de santé en ce moment ?",
        inputMode: "hybrid",
        suggestions: [
          "J'aimerais perdre quelques kilos et tonifier mes muscles, surtout au niveau des bras et des jambes.",
          "Mon objectif principal est d'améliorer mon endurance pour pouvoir participer à une course de 10 km dans quelques mois.",
          "Je cherche surtout à réduire mon stress et à améliorer ma souplesse, c'est pourquoi je m'intéresse aux pratiques comme le yoga."
        ],
        hints: "Expliquez vos objectifs de fitness actuels, qu'ils soient liés à la perte de poids, au renforcement musculaire, à l'endurance ou au bien-être général.",
        expectedKeywords: ["perdre", "kilos", "tonifier", "muscles", "améliorer", "endurance", "course", "réduire", "stress", "souplesse"],
        acceptablePhrases: [
          "j'aimerais",
          "mon objectif est",
          "je cherche à",
          "je veux"
        ],
        feedback: {
          correct: "Ce sont des objectifs intéressants. Et concernant ton alimentation, fais-tu attention à ce que tu manges ?",
          partial: "C'est un bon objectif. As-tu établi un plan pour l'atteindre ?",
          incorrect: "Indique quels sont tes objectifs en matière de fitness et de santé actuellement."
        }
      },
      {
        id: 3,
        botMessage: "Concernant l'alimentation, as-tu adopté un régime particulier ou des habitudes alimentaires spécifiques pour soutenir tes objectifs ?",
        inputMode: "freeText",
        suggestions: [
          "J'essaie de manger plus de protéines et de légumes, et de limiter les aliments transformés et le sucre. Je ne suis pas un régime strict, mais je fais attention aux portions.",
          "Je suis actuellement un régime méditerranéen, riche en fruits, légumes, poissons et huile d'olive. J'ai remarqué que ça me donne plus d'énergie.",
          "Je compte mes calories et j'utilise une application pour suivre mon apport nutritionnel. J'essaie de maintenir un déficit calorique léger pour perdre du poids progressivement."
        ],
        hints: "Décrivez vos habitudes alimentaires actuelles et comment elles sont liées à vos objectifs de fitness.",
        expectedKeywords: ["manger", "protéines", "légumes", "régime", "limiter", "sucre", "calories", "application", "méditerranéen", "portions"],
        feedback: {
          correct: "C'est une approche sensée de l'alimentation. As-tu rencontré des défis particuliers dans ton parcours fitness jusqu'à présent ?",
          partial: "Ton alimentation joue effectivement un rôle important. As-tu remarqué des changements depuis que tu as modifié tes habitudes ?",
          incorrect: "Parle-moi de tes habitudes alimentaires actuelles et de leur lien avec tes objectifs de fitness."
        }
      },
      {
        id: 4,
        botMessage: "Quels sont les plus grands défis que tu as rencontrés dans ton parcours fitness ou dans le maintien d'une alimentation équilibrée ?",
        inputMode: "suggestions",
        suggestions: [
          "Mon plus grand défi est de rester motivé(e) sur le long terme, surtout quand je ne vois pas de résultats rapides ou quand j'ai un emploi du temps chargé.",
          "Je trouve difficile de résister aux tentations comme les sucreries ou les repas entre amis, où il est compliqué de faire des choix alimentaires sains.",
          "Le manque de temps est mon principal obstacle. Entre le travail et les obligations familiales, c'est difficile de trouver des créneaux réguliers pour faire de l'exercice."
        ],
        hints: "Expliquez les difficultés que vous rencontrez dans votre parcours fitness ou alimentaire.",
        expectedKeywords: ["motivé", "résultats", "résister", "tentations", "sucreries", "temps", "obstacle", "travail", "créneaux", "réguliers"],
        feedback: {
          correct: "Je comprends ce défi, c'est très courant. As-tu trouvé des stratégies pour surmonter cette difficulté ?",
          incorrect: "Parle-moi des difficultés que tu rencontres dans ton parcours fitness ou dans le maintien d'une alimentation équilibrée."
        }
      },
      {
        id: 5,
        botMessage: "As-tu trouvé des stratégies efficaces pour surmonter ces défis ou rester motivé(e) ?",
        inputMode: "hybrid",
        suggestions: [
          "J'ai commencé à m'entraîner avec un(e) ami(e), ce qui me rend plus responsable et rend l'exercice plus agréable. On se motive mutuellement.",
          "Je me fixe des petits objectifs réalisables à court terme plutôt qu'un grand objectif lointain, et je célèbre chaque progrès pour rester motivé(e).",
          "J'ai intégré l'exercice à ma routine quotidienne, comme faire du vélo pour aller au travail ou faire des exercices pendant que je regarde la télévision."
        ],
        hints: "Partagez les stratégies que vous utilisez pour rester motivé(e) et surmonter les obstacles dans votre parcours fitness.",
        expectedKeywords: ["ami", "responsable", "objectifs", "court terme", "célèbre", "progrès", "routine", "quotidienne", "intégré", "exercice"],
        feedback: {
          correct: "Ce sont d'excellentes stratégies ! As-tu remarqué des changements positifs dans ta santé ou ton bien-être depuis que tu as adopté ces habitudes ?",
          partial: "C'est une bonne approche. Est-ce que cela t'aide à maintenir ta motivation sur le long terme ?",
          incorrect: "Explique quelles stratégies tu utilises pour rester motivé(e) et surmonter les défis de ton parcours fitness."
        }
      },
      {
        id: 6,
        botMessage: "Quels changements positifs as-tu remarqués dans ta santé ou ton bien-être depuis que tu as adopté ces habitudes de fitness ?",
        inputMode: "freeText",
        suggestions: [
          "J'ai remarqué une nette amélioration de mon énergie au quotidien et de ma qualité de sommeil. Je me sens moins fatigué(e) et plus productif(ve) au travail.",
          "Ma confiance en moi a augmenté, et mes vêtements me vont mieux. J'ai aussi constaté que mon humeur est plus stable et que je gère mieux le stress.",
          "Physiquement, j'ai perdu quelques kilos et je me sens plus fort(e), mais le plus important est que je me sens fier(ère) de prendre soin de ma santé."
        ],
        hints: "Décrivez les effets positifs du fitness et d'une alimentation équilibrée sur votre santé physique et mentale.",
        expectedKeywords: ["énergie", "sommeil", "fatigué", "confiance", "vêtements", "humeur", "stress", "perdu", "kilos", "fier"],
        acceptablePhrases: [
          "j'ai remarqué",
          "je me sens",
          "j'ai constaté",
          "j'ai perdu"
        ],
        feedback: {
          correct: "Ces bénéfices sont vraiment motivants ! As-tu des projets pour faire évoluer ton programme de fitness à l'avenir ?",
          partial: "C'est formidable de constater ces améliorations dans ton bien-être général.",
          incorrect: "Décris les changements positifs que tu as observés dans ta santé ou ton bien-être depuis que tu as commencé à faire du fitness."
        }
      },
      {
        id: 7,
        botMessage: "As-tu des projets pour faire évoluer ton programme de fitness ou essayer de nouvelles activités à l'avenir ?",
        inputMode: "suggestions",
        suggestions: [
          "J'aimerais essayer des cours de CrossFit pour diversifier mon entraînement et me challenger davantage.",
          "Je pense m'inscrire à un semi-marathon l'année prochaine, ce qui me donnera un objectif concret pour améliorer mon endurance.",
          "Je voudrais explorer des activités en plein air comme l'escalade ou le paddle, pour combiner fitness et découverte de nouveaux environnements."
        ],
        hints: "Parlez de vos projets futurs concernant votre programme de fitness ou de nouvelles activités que vous aimeriez essayer.",
        expectedKeywords: ["essayer", "CrossFit", "diversifier", "inscrire", "semi-marathon", "objectif", "améliorer", "explorer", "activités", "plein air"],
        feedback: {
          correct: "Ce projet semble très stimulant ! As-tu des conseils que tu donnerais à quelqu'un qui souhaite commencer un parcours fitness similaire au tien ?",
          incorrect: "Parle-moi de tes projets futurs concernant ton programme de fitness ou de nouvelles activités que tu aimerais essayer."
        }
      },
      {
        id: 8,
        botMessage: "Si tu devais donner des conseils à quelqu'un qui souhaite améliorer sa forme physique et adopter un mode de vie plus sain, que lui dirais-tu ?",
        inputMode: "hybrid",
        suggestions: [
          "Je lui conseillerais de commencer progressivement et de se fixer des objectifs réalistes. Il vaut mieux faire un peu d'exercice régulièrement que de se lancer dans un programme trop intense qu'on abandonnera vite.",
          "L'important est de trouver une activité qu'on aime vraiment, sinon il sera difficile de maintenir la motivation. Et aussi, ne pas être trop dur avec soi-même en cas d'écart ou d'échec.",
          "Je dirais que la constance est plus importante que l'intensité, et qu'il est essentiel d'écouter son corps. Changer son alimentation progressivement plutôt que de suivre des régimes drastiques est aussi plus durable."
        ],
        hints: "Donnez des conseils pratiques pour quelqu'un qui souhaite améliorer sa forme physique et son alimentation.",
        expectedKeywords: ["commencer", "progressivement", "objectifs", "réalistes", "activité", "aime", "motivation", "constance", "écouter", "corps"],
        feedback: {
          correct: "Ce sont d'excellents conseils, très équilibrés et réalistes. Merci d'avoir partagé ton expérience et tes idées sur la santé et la forme physique !",
          partial: "Ce conseil est précieux et reflète bien l'importance d'une approche durable du fitness.",
          incorrect: "Donne des conseils pratiques pour quelqu'un qui souhaite améliorer sa forme physique, basés sur ta propre expérience."
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à discuter en détail de vos habitudes fitness, de votre alimentation et de vos objectifs de santé en français.",
    learningObjectives: [
      "Décrire une routine d'exercice physique",
      "Expliquer des objectifs de santé et de forme physique",
      "Discuter d'habitudes alimentaires",
      "Parler des défis et des solutions liés au fitness",
      "Donner des conseils sur un mode de vie sain"
    ],
    grammar: {
      points: [
        "Conditionnel pour exprimer des souhaits",
        "Expressions de fréquence et d'habitude",
        "Structures pour donner des conseils",
        "Vocabulaire lié à la santé et au sport"
      ]
    }
  };
  
  export default healthAndFitness;