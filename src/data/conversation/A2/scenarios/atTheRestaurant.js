// chatbot/A2/scenarios/atTheRestaurant.js

const atTheRestaurant = {
    id: 1,
    title: "At The Restaurant",
    level: "A2",
    description: "Learn how to order a complete meal and interact with waiters in a restaurant setting.",
    estimatedTime: "15-20 minutes",
    vocabulary: ["menu", "starter", "main course", "dessert", "bill", "allergies", "reservation", "waiter", "order", "recommend"],
    steps: [
      {
        id: 1,
        botMessage: "Bonjour ! Bienvenue au restaurant Le Gourmet. Avez-vous une réservation ?",
        inputMode: "suggestions",
        suggestions: [
          "Oui, j'ai réservé une table pour 2 personnes.",
          "Non, je n'ai pas de réservation. Avez-vous une table disponible ?",
          "Bonsoir, réservation au nom de Martin pour 19h."
        ],
        hints: "Indiquez si vous avez une réservation ou non.",
        expectedKeywords: ["réservation", "table", "disponible", "nom", "personne", "oui", "non"],
        feedback: {
          correct: "Très bien, je vais vérifier votre réservation.",
          incorrect: "Pourriez-vous me dire si vous avez une réservation ?"
        }
      },
      {
        id: 2,
        botMessage: "Parfait. Suivez-moi, votre table est prête. Voici la carte. Souhaitez-vous un apéritif pour commencer ?",
        inputMode: "hybrid",
        suggestions: [
          "Oui, je voudrais un verre de vin blanc, s'il vous plaît.",
          "Qu'est-ce que vous proposez comme apéritif ?",
          "Non merci, juste de l'eau pour l'instant."
        ],
        hints: "Commandez un apéritif ou demandez ce qui est disponible.",
        expectedKeywords: ["apéritif", "vin", "eau", "proposer", "verre", "blanc", "rouge"],
        acceptablePhrases: [
          "je voudrais",
          "qu'est-ce que vous proposez",
          "avez-vous",
          "je prends"
        ],
        feedback: {
          correct: "Je vous apporte votre boisson tout de suite.",
          partial: "Quel type de boisson souhaitez-vous ?",
          incorrect: "Souhaitez-vous boire quelque chose avant de commander ?"
        }
      },
      {
        id: 3,
        botMessage: "Avez-vous des allergies alimentaires dont nous devrions être informés ?",
        inputMode: "freeText",
        suggestions: [
          "Oui, je suis allergique aux fruits de mer.",
          "Non, je n'ai pas d'allergies.",
          "Je ne mange pas de gluten, s'il vous plaît."
        ],
        hints: "Mentionnez vos allergies ou restrictions alimentaires si vous en avez.",
        expectedKeywords: ["allergique", "allergie", "gluten", "lactose", "fruits de mer", "noix", "non"],
        feedback: {
          correct: "Merci de m'en informer, je vais prévenir le chef.",
          partial: "Y a-t-il d'autres allergies que je devrais mentionner au chef ?",
          incorrect: "Veuillez me dire si vous avez des allergies alimentaires."
        }
      },
      {
        id: 4,
        botMessage: "Êtes-vous prêts à commander ou avez-vous besoin d'un peu plus de temps ?",
        inputMode: "suggestions",
        suggestions: [
          "Nous sommes prêts à commander.",
          "Pouvez-vous nous recommander des spécialités ?",
          "Nous avons besoin de quelques minutes supplémentaires."
        ],
        hints: "Indiquez si vous êtes prêt à commander ou si vous avez besoin de plus de temps.",
        expectedKeywords: ["prêt", "commander", "recommander", "spécialité", "besoin", "temps", "minutes"],
        feedback: {
          correct: "Parfait, je vous écoute.",
          incorrect: "Prenez votre temps pour décider."
        }
      },
      {
        id: 5,
        botMessage: "Que souhaitez-vous comme entrée ?",
        inputMode: "hybrid",
        suggestions: [
          "Je voudrais la salade de chèvre chaud, s'il vous plaît.",
          "Quelle est la soupe du jour ?",
          "Nous partagerons une assiette de charcuterie."
        ],
        hints: "Commandez votre entrée ou posez une question sur le menu.",
        expectedKeywords: ["entrée", "salade", "soupe", "charcuterie", "voudrais", "prendre", "partager"],
        feedback: {
          correct: "Excellent choix. Et pour le plat principal ?",
          partial: "Souhaitez-vous autre chose en entrée ?",
          incorrect: "Quelle entrée souhaitez-vous commander ?"
        }
      },
      {
        id: 6,
        botMessage: "Pour le plat principal, qu'est-ce qui vous ferait plaisir ?",
        inputMode: "freeText",
        suggestions: [
          "Je prendrai le steak avec des frites, s'il vous plaît.",
          "Comment est préparé le poisson du jour ?",
          "Je voudrais les pâtes aux champignons."
        ],
        hints: "Commandez votre plat principal ou posez une question sur un plat.",
        expectedKeywords: ["plat", "steak", "poisson", "pâtes", "préparé", "cuisson", "accompagnement"],
        acceptablePhrases: [
          "je prendrai",
          "je voudrais",
          "comment est",
          "pouvez-vous"
        ],
        feedback: {
          correct: "Un excellent choix. Comment souhaitez-vous votre viande/poisson ?",
          partial: "Souhaitez-vous un accompagnement particulier ?",
          incorrect: "Quel plat principal souhaitez-vous commander ?"
        }
      },
      {
        id: 7,
        botMessage: "Souhaitez-vous un dessert pour terminer le repas ?",
        inputMode: "suggestions",
        suggestions: [
          "Oui, je voudrais le chocolat fondant.",
          "Pouvez-vous nous suggérer un dessert ?",
          "Non merci, juste l'addition s'il vous plaît."
        ],
        hints: "Commandez un dessert ou demandez l'addition.",
        expectedKeywords: ["dessert", "chocolat", "fondant", "suggestion", "addition", "café", "non"],
        feedback: {
          correct: "Je vous apporte cela tout de suite.",
          incorrect: "Souhaitez-vous terminer avec un dessert ou l'addition ?"
        }
      },
      {
        id: 8,
        botMessage: "Voici votre addition. Comment souhaitez-vous régler ?",
        inputMode: "hybrid",
        suggestions: [
          "Par carte bancaire, s'il vous plaît.",
          "En espèces.",
          "Pouvons-nous diviser l'addition ?"
        ],
        hints: "Indiquez votre mode de paiement.",
        expectedKeywords: ["carte", "bancaire", "espèces", "diviser", "addition", "payer", "régler"],
        feedback: {
          correct: "Merci pour votre visite. Passez une excellente soirée !",
          partial: "Est-ce que vous payez ensemble ou séparément ?",
          incorrect: "Comment souhaitez-vous payer votre repas ?"
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à commander un repas complet et à interagir avec le serveur en français.",
    learningObjectives: [
      "Faire une réservation",
      "Commander un repas complet",
      "Mentionner des allergies",
      "Demander des recommandations",
      "Payer l'addition"
    ],
    grammar: {
      points: [
        "Conditionnel de politesse",
        "Questions avec inversion",
        "Verbes au présent (prendre, vouloir)",
        "Expressions de quantité"
      ]
    }
  };

  export default atTheRestaurant;
