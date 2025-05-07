// chatbot/A2/scenarios/travelPlanning.js

const travelPlanning = {
    id: 2,
    title: "Travel Planning",
    level: "A2",
    description: "Learn how to plan a simple trip with a travel agent.",
    estimatedTime: "15-20 minutes",
    vocabulary: ["voyage", "hôtel", "vol", "billets", "destination", "réservation", "dates", "budget", "séjour", "transport"],
    steps: [
      {
        id: 1,
        botMessage: "Bonjour ! Bienvenue à l'agence Voyages Monde. Comment puis-je vous aider aujourd'hui ?",
        inputMode: "suggestions",
        suggestions: [
          "Je voudrais organiser un voyage à Paris.",
          "Avez-vous des offres pour l'Espagne ce mois-ci ?",
          "J'ai besoin d'aide pour planifier mes vacances."
        ],
        hints: "Expliquez ce que vous recherchez comme voyage.",
        expectedKeywords: ["voyage", "organiser", "planifier", "vacances", "destination", "offres"],
        feedback: {
          correct: "Bien sûr, je peux vous aider avec cela.",
          incorrect: "Dites-moi quelle destination vous intéresse ou quel type de voyage vous souhaitez."
        }
      },
      {
        id: 2,
        botMessage: "Pour quelle destination souhaitez-vous voyager ?",
        inputMode: "hybrid",
        suggestions: [
          "Je voudrais aller à Rome pour un week-end.",
          "Je pense à la Grèce ou au Portugal.",
          "Pouvez-vous me recommander une destination pour la plage ?"
        ],
        hints: "Indiquez votre destination ou demandez une recommandation.",
        expectedKeywords: ["destination", "aller", "voyager", "Rome", "plage", "recommander", "week-end"],
        acceptablePhrases: [
          "je voudrais aller",
          "je pense à",
          "pouvez-vous recommander",
          "j'aimerais visiter"
        ],
        feedback: {
          correct: "Excellente destination ! Pour quelles dates souhaitez-vous voyager ?",
          partial: "Avez-vous une préférence pour le type de voyage (plage, ville, montagne) ?",
          incorrect: "Veuillez me dire où vous souhaitez aller."
        }
      },
      {
        id: 3,
        botMessage: "Quelles sont vos dates de voyage idéales ?",
        inputMode: "freeText",
        suggestions: [
          "Du 15 au 22 juillet, si possible.",
          "Pour une semaine début septembre.",
          "Je suis flexible sur les dates."
        ],
        hints: "Précisez vos dates de voyage ou votre flexibilité.",
        expectedKeywords: ["dates", "juillet", "septembre", "flexible", "semaine", "jours", "partir", "retour"],
        feedback: {
          correct: "D'accord, je note ces dates. Combien de personnes voyageront ?",
          partial: "Pour combien de jours souhaitez-vous partir ?",
          incorrect: "J'ai besoin de savoir quand vous voulez voyager."
        }
      },
      {
        id: 4,
        botMessage: "Combien de personnes voyageront ensemble ?",
        inputMode: "suggestions",
        suggestions: [
          "Je voyage seul(e).",
          "Nous sommes deux adultes.",
          "Deux adultes et un enfant de 10 ans."
        ],
        hints: "Indiquez le nombre de voyageurs et leur âge si nécessaire.",
        expectedKeywords: ["personnes", "adultes", "enfants", "seul", "deux", "trois", "famille", "ans"],
        feedback: {
          correct: "Parfait. Quel est votre budget approximatif pour ce voyage ?",
          incorrect: "Veuillez préciser le nombre de personnes qui voyageront."
        }
      },
      {
        id: 5,
        botMessage: "Quel est votre budget approximatif pour ce voyage ?",
        inputMode: "hybrid",
        suggestions: [
          "Environ 1000 euros par personne tout compris.",
          "Je cherche quelque chose d'économique, moins de 600 euros.",
          "Le budget n'est pas un problème, je veux du confort."
        ],
        hints: "Donnez une estimation de votre budget.",
        expectedKeywords: ["budget", "euros", "économique", "confort", "approximatif", "personne", "compris"],
        feedback: {
          correct: "Je vais chercher des options dans cette gamme de prix.",
          partial: "Ce budget est-il pour l'hébergement uniquement ou tout compris ?",
          incorrect: "Pourriez-vous me donner une idée de votre budget ?"
        }
      },
      {
        id: 6,
        botMessage: "Quel type d'hébergement préférez-vous ? Hôtel, appartement, ou autre ?",
        inputMode: "freeText",
        suggestions: [
          "Je préfère un hôtel central avec petit-déjeuner.",
          "Un appartement serait idéal pour plus d'indépendance.",
          "Qu'est-ce que vous recommandez pour une famille ?"
        ],
        hints: "Précisez vos préférences d'hébergement.",
        expectedKeywords: ["hôtel", "appartement", "préfère", "central", "petit-déjeuner", "recommander", "étoiles"],
        acceptablePhrases: [
          "je préfère",
          "nous cherchons",
          "idéalement",
          "qu'est-ce que vous recommandez"
        ],
        feedback: {
          correct: "Je comprends vos préférences. Comment souhaitez-vous voyager jusqu'à votre destination ?",
          partial: "Avez-vous des exigences particulières pour l'hébergement ?",
          incorrect: "Dites-moi quel type d'hébergement vous préférez."
        }
      },
      {
        id: 7,
        botMessage: "Comment souhaitez-vous voyager jusqu'à cette destination ? Avion, train, ou autre ?",
        inputMode: "suggestions",
        suggestions: [
          "En avion, si possible vol direct.",
          "Je préfère le train, c'est plus écologique.",
          "Quelles sont les options les plus rapides ?"
        ],
        hints: "Indiquez votre moyen de transport préféré.",
        expectedKeywords: ["avion", "train", "vol", "direct", "rapide", "options", "écologique", "préfère"],
        feedback: {
          correct: "Entendu. Avez-vous besoin d'une voiture de location à l'arrivée ?",
          incorrect: "Veuillez préciser comment vous souhaitez voyager vers votre destination."
        }
      },
      {
        id: 8,
        botMessage: "D'après vos critères, j'ai trouvé plusieurs options. Souhaitez-vous recevoir ces propositions par email ?",
        inputMode: "hybrid",
        suggestions: [
          "Oui, mon email est jean.dupont@email.com",
          "Pouvez-vous d'abord me donner plus de détails sur les options ?",
          "Je préfère réserver tout de suite si c'est possible."
        ],
        hints: "Indiquez si vous souhaitez recevoir les propositions par email ou voir plus de détails maintenant.",
        expectedKeywords: ["email", "détails", "options", "propositions", "réserver", "maintenant", "envoyer"],
        feedback: {
          correct: "Parfait ! Je vous envoie toutes les informations. Avez-vous d'autres questions ?",
          partial: "Quel est votre email pour vous envoyer les propositions ?",
          incorrect: "Comment souhaitez-vous recevoir les informations sur ces options de voyage ?"
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à planifier un voyage en français en expliquant vos préférences et besoins.",
    learningObjectives: [
      "Exprimer ses préférences de voyage",
      "Discuter de dates et de budget",
      "Parler d'hébergement et de transport",
      "Poser des questions sur les options disponibles",
      "Comprendre des propositions de voyage"
    ],
    grammar: {
      points: [
        "Questions ouvertes",
        "Conditionnel pour exprimer des souhaits",
        "Futur proche",
        "Expressions de temps et de durée"
      ]
    }
  };
  
  export default travelPlanning;