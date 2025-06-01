// chatbot/A2/scenarios/apartmentViewing.js

const apartmentViewing = {
    id: 5,
    title: "Apartment Viewing",
    level: "A2",
    description: "Learn how to visit and ask questions about an apartment for rent.",
    estimatedTime: "15-20 minutes",
    vocabulary: ["loyer", "charges", "pièce", "meublé", "bail", "caution", "propriétaire", "agence", "cuisine équipée", "état des lieux"],
    steps: [
      {
        id: 1,
        botMessage: "Bonjour, je suis M. Martin, l'agent immobilier. Vous êtes bien là pour visiter l'appartement de la rue des Lilas ?",
        inputMode: "suggestions",
        suggestions: [
          "Oui, c'est bien ça. J'ai rendez-vous à 14h.",
          "Bonjour, exactement. J'ai vu l'annonce sur internet.",
          "Bonjour. Oui, je cherche un appartement à louer rapidement."
        ],
        hints: "Confirmez que vous êtes là pour la visite de l'appartement.",
        expectedKeywords: ["bonjour", "oui", "bien", "rendez-vous", "annonce", "appartement", "louer", "cherche"],
        feedback: {
          correct: "Parfait, entrons dans l'immeuble.",
          incorrect: "Veuillez confirmer que vous êtes là pour visiter l'appartement."
        }
      },
      {
        id: 2,
        botMessage: "Voici l'appartement. C'est un deux-pièces de 45m². Comme vous pouvez le voir, nous entrons directement dans le salon.",
        inputMode: "hybrid",
        suggestions: [
          "C'est lumineux ! Est-ce que l'appartement est exposé au sud ?",
          "Le salon est spacieux. Y a-t-il une chambre séparée ?",
          "Je vois. Est-ce que les meubles sont inclus dans la location ?"
        ],
        hints: "Commentez ce que vous voyez ou posez une question sur l'appartement.",
        expectedKeywords: ["lumineux", "spacieux", "exposé", "sud", "chambre", "séparée", "meubles", "inclus", "salon"],
        acceptablePhrases: [
          "est-ce que",
          "y a-t-il",
          "je vois",
          "c'est"
        ],
        feedback: {
          correct: "Oui, laissez-moi vous montrer le reste de l'appartement.",
          partial: "Vous avez raison, c'est une caractéristique intéressante de cet appartement.",
          incorrect: "Avez-vous des questions ou des remarques sur ce que vous voyez ?"
        }
      },
      {
        id: 3,
        botMessage: "Voici la cuisine. Elle est équipée avec un réfrigérateur, une cuisinière et un four micro-ondes.",
        inputMode: "freeText",
        suggestions: [
          "Est-ce qu'il y a un lave-vaisselle ?",
          "La cuisine est-elle récente ? Quand a-t-elle été rénovée ?",
          "Y a-t-il assez de placards pour ranger la vaisselle ?"
        ],
        hints: "Posez une question sur la cuisine ou ses équipements.",
        expectedKeywords: ["cuisine", "équipée", "lave-vaisselle", "récente", "rénovée", "placards", "ranger", "vaisselle"],
        feedback: {
          correct: "Pour répondre à votre question, la cuisine a été rénovée il y a deux ans.",
          partial: "C'est une bonne question. Les équipements sont en bon état.",
          incorrect: "Avez-vous des questions sur la cuisine ou ses équipements ?"
        }
      },
      {
        id: 4,
        botMessage: "Maintenant, voici la chambre. Elle fait environ 12m² et dispose d'un grand placard.",
        inputMode: "suggestions",
        suggestions: [
          "Est-ce qu'il y a assez de place pour un grand lit ?",
          "Le placard est-il aménagé avec des étagères ?",
          "La chambre donne sur quelle rue ?"
        ],
        hints: "Posez une question sur la chambre.",
        expectedKeywords: ["chambre", "place", "lit", "placard", "étagères", "aménagé", "donne", "rue"],
        feedback: {
          correct: "Oui, vous pouvez facilement y mettre un lit double et une commode.",
          incorrect: "Posez une question sur la chambre ou son aménagement."
        }
      },
      {
        id: 5,
        botMessage: "Et enfin, voici la salle de bain avec douche, lavabo et toilettes. Elle a été refaite à neuf l'année dernière.",
        inputMode: "hybrid",
        suggestions: [
          "Y a-t-il une machine à laver dans l'appartement ?",
          "Est-ce qu'il y a des problèmes d'humidité dans la salle de bain ?",
          "La pression de l'eau est-elle bonne dans la douche ?"
        ],
        hints: "Posez une question sur la salle de bain ou les équipements sanitaires.",
        expectedKeywords: ["salle de bain", "machine à laver", "humidité", "pression", "eau", "douche", "refaite", "neuf"],
        feedback: {
          correct: "Pour la machine à laver, il y a un emplacement prévu dans la salle de bain.",
          partial: "La plomberie est récente et en bon état.",
          incorrect: "Avez-vous des questions sur la salle de bain ?"
        }
      },
      {
        id: 6,
        botMessage: "Voilà pour la visite. Le loyer est de 850€ par mois, charges comprises. Qu'en pensez-vous ?",
        inputMode: "freeText",
        suggestions: [
          "L'appartement me plaît beaucoup. Quelles sont les charges incluses exactement ?",
          "C'est intéressant. Y a-t-il beaucoup de candidats pour cet appartement ?",
          "Le quartier a l'air calme. Y a-t-il des commerces à proximité ?"
        ],
        hints: "Donnez votre impression et posez une question sur le loyer ou le quartier.",
        expectedKeywords: ["plaît", "intéressant", "charges", "incluses", "quartier", "calme", "commerces", "candidats"],
        acceptablePhrases: [
          "l'appartement me plaît",
          "c'est intéressant",
          "y a-t-il",
          "quelles sont"
        ],
        feedback: {
          correct: "Les charges comprennent l'eau, l'électricité des communs et le chauffage. L'électricité de l'appartement est en supplément.",
          partial: "Je comprends votre intérêt. Avez-vous d'autres questions ?",
          incorrect: "Dites-moi ce que vous pensez de l'appartement ou posez une question sur le loyer."
        }
      },
      {
        id: 7,
        botMessage: "Pour louer cet appartement, il faut verser une caution de deux mois de loyer et fournir des justificatifs de revenus. Êtes-vous intéressé(e) ?",
        inputMode: "suggestions",
        suggestions: [
          "Oui, je suis très intéressé(e). Comment puis-je déposer ma candidature ?",
          "Peut-être. J'ai encore deux autres visites prévues aujourd'hui.",
          "Quels justificatifs de revenus exactement faut-il fournir ?"
        ],
        hints: "Exprimez votre intérêt ou posez une question sur les conditions de location.",
        expectedKeywords: ["intéressé", "candidature", "visites", "justificatifs", "revenus", "fournir", "caution", "déposer"],
        feedback: {
          correct: "Pour déposer votre candidature, il faut remplir ce dossier avec vos fiches de paie des trois derniers mois.",
          incorrect: "Dites-moi si vous êtes intéressé(e) par l'appartement."
        }
      },
      {
        id: 8,
        botMessage: "Parfait. Avez-vous d'autres questions avant de terminer la visite ?",
        inputMode: "hybrid",
        suggestions: [
          "Quand l'appartement est-il disponible ?",
          "Y a-t-il une possibilité de parking ?",
          "Non, j'ai toutes les informations dont j'ai besoin. Merci pour la visite."
        ],
        hints: "Posez une dernière question ou remerciez pour la visite.",
        expectedKeywords: ["disponible", "quand", "parking", "possibilité", "informations", "merci", "visite", "besoin"],
        feedback: {
          correct: "L'appartement est disponible à partir du 1er du mois prochain. Je vous recontacte très bientôt pour votre dossier.",
          partial: "Je note votre question. Je vous recontacterai rapidement avec la réponse.",
          incorrect: "Avez-vous une dernière question ou souhaitez-vous terminer la visite ?"
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à visiter un appartement et à obtenir toutes les informations nécessaires en français.",
    learningObjectives: [
      "Décrire et commenter un logement",
      "Poser des questions sur les caractéristiques d'un appartement",
      "Comprendre les conditions de location",
      "Exprimer des préférences concernant le logement",
      "Négocier avec un agent immobilier"
    ],
    grammar: {
      points: [
        "Phrases interrogatives",
        "Adjectifs descriptifs",
        "Expressions de localisation",
        "Conditionnel de politesse"
      ]
    }
  };

  export default apartmentViewing;
