// chatbot/A2/scenarios/talkingAboutHobbies.js

const talkingAboutHobbies = {
    id: 8,
    title: "Talking About Hobbies",
    level: "A2",
    description: "Learn how to discuss hobbies and leisure activities with details.",
    estimatedTime: "15-20 minutes",
    vocabulary: ["loisirs", "passion", "passe-temps", "pratiquer", "fréquence", "équipement", "club", "compétition", "débutant", "expérience"],
    steps: [
      {
        id: 1,
        botMessage: "Salut ! Ça fait plaisir de te rencontrer. Qu'est-ce que tu aimes faire pendant ton temps libre ?",
        inputMode: "suggestions",
        suggestions: [
          "J'adore faire du sport, surtout du tennis et de la natation.",
          "J'aime beaucoup lire et regarder des films.",
          "Je suis passionné(e) de photographie et de voyages."
        ],
        hints: "Mentionnez vos activités ou hobbies préférés.",
        expectedKeywords: ["aime", "adore", "passion", "sport", "tennis", "natation", "lire", "films", "photographie", "voyages"],
        feedback: {
          correct: "C'est intéressant ! Depuis combien de temps pratiques-tu ces activités ?",
          incorrect: "Parle-moi de ce que tu aimes faire pendant ton temps libre."
        }
      },
      {
        id: 2,
        botMessage: "Depuis combien de temps pratiques-tu cette activité ?",
        inputMode: "hybrid",
        suggestions: [
          "Je fais ça depuis environ 5 ans.",
          "J'ai commencé quand j'étais enfant, donc ça fait longtemps !",
          "C'est assez récent, j'ai débuté il y a seulement 6 mois."
        ],
        hints: "Indiquez depuis quand vous pratiquez cette activité.",
        expectedKeywords: ["depuis", "ans", "commencé", "enfant", "longtemps", "récent", "débuté", "mois", "pratique"],
        acceptablePhrases: [
          "je fais ça depuis",
          "j'ai commencé",
          "ça fait",
          "j'ai débuté"
        ],
        feedback: {
          correct: "Je vois. À quelle fréquence pratiques-tu cette activité ?",
          partial: "Tu as beaucoup d'expérience alors !",
          incorrect: "Dis-moi depuis combien de temps tu pratiques cette activité."
        }
      },
      {
        id: 3,
        botMessage: "À quelle fréquence pratiques-tu cette activité ?",
        inputMode: "freeText",
        suggestions: [
          "J'essaie de le faire au moins deux fois par semaine.",
          "Presque tous les jours, c'est vraiment ma passion !",
          "Quand j'ai le temps, environ une fois par mois."
        ],
        hints: "Précisez la fréquence à laquelle vous pratiquez cette activité.",
        expectedKeywords: ["fois", "semaine", "jours", "mois", "régulièrement", "week-end", "temps", "souvent", "rarement"],
        feedback: {
          correct: "C'est bien de trouver du temps pour ses passions. Est-ce que tu pratiques seul(e) ou en groupe ?",
          partial: "Tu arrives à concilier cette activité avec tes autres obligations ?",
          incorrect: "Indique à quelle fréquence tu pratiques cette activité."
        }
      },
      {
        id: 4,
        botMessage: "Tu pratiques cette activité seul(e) ou avec d'autres personnes ?",
        inputMode: "suggestions",
        suggestions: [
          "Je préfère pratiquer seul(e), c'est plus relaxant.",
          "Je fais partie d'un club, donc c'est toujours en groupe.",
          "Parfois seul(e), parfois avec des amis, ça dépend de mon humeur."
        ],
        hints: "Précisez si vous pratiquez votre hobby seul ou avec d'autres personnes.",
        expectedKeywords: ["seul", "groupe", "club", "amis", "équipe", "préfère", "relaxant", "ensemble", "humeur"],
        feedback: {
          correct: "Je comprends. As-tu besoin d'équipements spécifiques pour cette activité ?",
          incorrect: "Dis-moi si tu pratiques cette activité seul(e) ou avec d'autres personnes."
        }
      },
      {
        id: 5,
        botMessage: "As-tu besoin d'équipements particuliers pour pratiquer cette activité ?",
        inputMode: "hybrid",
        suggestions: [
          "Oui, j'ai dû investir dans pas mal de matériel, comme...",
          "Pas vraiment, juste des vêtements confortables.",
          "Au début non, mais maintenant j'ai acheté quelques accessoires pour améliorer mon expérience."
        ],
        hints: "Décrivez l'équipement nécessaire pour votre activité.",
        expectedKeywords: ["équipement", "matériel", "investir", "acheté", "accessoires", "vêtements", "confortables", "besoin", "expérience"],
        feedback: {
          correct: "C'est intéressant. Est-ce que tu participes à des compétitions ou des événements liés à cette activité ?",
          partial: "Ce matériel est-il coûteux ?",
          incorrect: "Parle-moi de l'équipement nécessaire pour ton activité."
        }
      },
      {
        id: 6,
        botMessage: "Est-ce que tu participes à des compétitions ou des événements spéciaux liés à cette activité ?",
        inputMode: "freeText",
        suggestions: [
          "Oui, je participe à des tournois locaux deux ou trois fois par an.",
          "Non, je pratique uniquement pour le plaisir, pas pour la compétition.",
          "Pas encore, mais j'aimerais essayer quand je serai plus à l'aise."
        ],
        hints: "Indiquez si vous participez à des compétitions ou événements.",
        expectedKeywords: ["compétitions", "tournois", "événements", "participe", "plaisir", "essayer", "l'aise", "locaux", "encore"],
        acceptablePhrases: [
          "je participe à",
          "pas encore",
          "pour le plaisir",
          "j'aimerais essayer"
        ],
        feedback: {
          correct: "Intéressant ! Qu'est-ce qui te plaît le plus dans cette activité ?",
          partial: "La compétition peut ajouter un niveau d'excitation supplémentaire à un hobby.",
          incorrect: "Dis-moi si tu participes à des compétitions ou événements liés à ton activité."
        }
      },
      {
        id: 7,
        botMessage: "Qu'est-ce qui te plaît le plus dans cette activité ?",
        inputMode: "suggestions",
        suggestions: [
          "J'aime la sensation de liberté et le fait de me dépasser.",
          "C'est relaxant et ça me permet d'oublier le stress quotidien.",
          "J'apprécie de rencontrer des personnes qui partagent la même passion."
        ],
        hints: "Expliquez ce que vous aimez particulièrement dans cette activité.",
        expectedKeywords: ["aime", "plaît", "liberté", "dépasser", "relaxant", "stress", "rencontrer", "passion", "personnes"],
        feedback: {
          correct: "Je comprends ce sentiment. Recommanderais-tu cette activité à d'autres personnes ?",
          incorrect: "Dis-moi ce que tu aimes particulièrement dans cette activité."
        }
      },
      {
        id: 8,
        botMessage: "Est-ce que tu recommanderais cette activité à d'autres personnes ? Pourquoi ?",
        inputMode: "hybrid",
        suggestions: [
          "Absolument ! C'est accessible à tous et très enrichissant.",
          "Oui, mais il faut être prêt à y consacrer du temps et de l'énergie.",
          "Ça dépend des goûts de chacun, mais personnellement, ça m'apporte beaucoup."
        ],
        hints: "Dites si vous recommanderiez cette activité et pourquoi.",
        expectedKeywords: ["recommander", "accessible", "enrichissant", "temps", "énergie", "goûts", "apporte", "personnellement", "absolument"],
        feedback: {
          correct: "Merci pour ton partage ! C'est toujours intéressant de découvrir les passions des autres.",
          partial: "C'est une bonne façon de voir les choses.",
          incorrect: "Dis-moi si tu recommanderais cette activité à d'autres personnes."
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à parler en détail de vos loisirs et activités en français.",
    learningObjectives: [
      "Décrire ses activités de loisirs",
      "Parler de la fréquence et durée d'une pratique",
      "Discuter d'équipements spécifiques",
      "Exprimer ses préférences et motivations",
      "Partager son expérience personnelle"
    ],
    grammar: {
      points: [
        "Verbes d'opinion au présent",
        "Expressions de temps et de fréquence",
        "Adjectifs pour exprimer des sentiments",
        "Questions directes et indirectes"
      ]
    }
  };

  export default talkingAboutHobbies;
