// chatbot/A2/scenarios/shoppingClothes.js

const shoppingClothes = {
    id: 3,
    title: "Shopping for Clothes",
    level: "A2",
    description: "Learn how to shop for clothes, ask for sizes, and negotiate in a clothing store.",
    estimatedTime: "15-20 minutes",
    vocabulary: ["vêtements", "taille", "couleur", "cabine d'essayage", "réduction", "prix", "payer", "essayer", "matière", "mode"],
    steps: [
      {
        id: 1,
        botMessage: "Bonjour, bienvenue dans notre boutique. Est-ce que je peux vous aider à trouver quelque chose ?",
        inputMode: "suggestions",
        suggestions: [
          "Je cherche un pull en laine pour l'hiver.",
          "Où se trouve le rayon des chemises ?",
          "Avez-vous cette veste en bleu ?"
        ],
        hints: "Expliquez ce que vous cherchez ou demandez où se trouve un rayon spécifique.",
        expectedKeywords: ["chercher", "pull", "chemise", "veste", "rayon", "bleu", "laine", "hiver"],
        feedback: {
          correct: "Bien sûr, je peux vous aider avec cela.",
          incorrect: "Dites-moi quel type de vêtement vous recherchez."
        }
      },
      {
        id: 2,
        botMessage: "Suivez-moi, c'est par ici. Quelle est votre taille habituellement ?",
        inputMode: "hybrid",
        suggestions: [
          "Je fais du M en général.",
          "Je ne suis pas sûr(e), je peux essayer ?",
          "Du 40 pour les pantalons et du S pour les hauts."
        ],
        hints: "Indiquez votre taille habituelle ou demandez à essayer.",
        expectedKeywords: ["taille", "M", "S", "L", "40", "42", "essayer", "habituellement", "général"],
        acceptablePhrases: [
          "je fais du",
          "je porte du",
          "ma taille est",
          "je ne suis pas sûr"
        ],
        feedback: {
          correct: "Parfait, voici quelques modèles qui pourraient vous convenir.",
          partial: "Les tailles peuvent varier selon les marques, il vaut mieux essayer.",
          incorrect: "Pouvez-vous me dire quelle taille vous portez habituellement ?"
        }
      },
      {
        id: 3,
        botMessage: "Préférez-vous une couleur particulière ?",
        inputMode: "freeText",
        suggestions: [
          "Je cherche quelque chose en noir ou en gris.",
          "J'aime les couleurs vives comme le rouge.",
          "Quelles couleurs sont à la mode cette saison ?"
        ],
        hints: "Mentionnez vos préférences de couleur ou demandez des conseils.",
        expectedKeywords: ["couleur", "noir", "gris", "rouge", "bleu", "mode", "saison", "préfère", "aime"],
        feedback: {
          correct: "D'accord, je vais vous montrer nos modèles dans ces tons.",
          partial: "Ces couleurs vous iront très bien.",
          incorrect: "Quelles couleurs préférez-vous pour ce vêtement ?"
        }
      },
      {
        id: 4,
        botMessage: "Voici plusieurs modèles qui pourraient vous plaire. Voulez-vous en essayer un ?",
        inputMode: "suggestions",
        suggestions: [
          "Oui, j'aimerais essayer celui-ci en M.",
          "Avez-vous ce modèle dans une autre couleur ?",
          "Quel est le prix de celui-là ?"
        ],
        hints: "Choisissez un modèle à essayer ou posez une question sur un modèle spécifique.",
        expectedKeywords: ["essayer", "modèle", "celui-ci", "couleur", "prix", "autre", "aimer", "plaire"],
        feedback: {
          correct: "Bien sûr, la cabine d'essayage est juste là.",
          incorrect: "Dites-moi si vous voulez essayer un de ces modèles."
        }
      },
      {
        id: 5,
        botMessage: "Comment vous va ce vêtement ? La taille est-elle bonne ?",
        inputMode: "hybrid",
        suggestions: [
          "C'est un peu trop grand, avez-vous une taille en dessous ?",
          "La couleur me plaît, mais le style n'est pas tout à fait ce que je cherche.",
          "C'est parfait ! Je vais le prendre."
        ],
        hints: "Donnez votre avis sur le vêtement essayé.",
        expectedKeywords: ["trop grand", "trop petit", "parfait", "taille", "couleur", "style", "prendre", "chercher"],
        feedback: {
          correct: "Je comprends. Souhaitez-vous essayer autre chose ?",
          partial: "Je peux vous proposer d'autres modèles similaires.",
          incorrect: "Dites-moi si le vêtement vous convient ou s'il y a un problème."
        }
      },
      {
        id: 6,
        botMessage: "Ce modèle est à 49,90€. Nous avons actuellement une promotion de 20% sur la deuxième pièce achetée. Cela vous intéresse ?",
        inputMode: "freeText",
        suggestions: [
          "Oui, je vais prendre aussi cette chemise alors.",
          "Y a-t-il d'autres promotions en cours ?",
          "Non merci, je vais prendre juste celui-ci."
        ],
        hints: "Répondez à l'offre de promotion ou posez une question sur le prix.",
        expectedKeywords: ["promotion", "prix", "prendre", "aussi", "chemise", "autres", "intéresse", "réduction"],
        acceptablePhrases: [
          "je vais prendre",
          "y a-t-il",
          "non merci",
          "cela m'intéresse"
        ],
        feedback: {
          correct: "Parfait ! Souhaitez-vous autre chose ou on passe en caisse ?",
          partial: "La promotion est valable sur tous les articles de la boutique.",
          incorrect: "Souhaitez-vous profiter de cette promotion ?"
        }
      },
      {
        id: 7,
        botMessage: "Très bien. Comment souhaitez-vous payer ? Nous acceptons les cartes, les espèces et les chèques.",
        inputMode: "suggestions",
        suggestions: [
          "Par carte bancaire, s'il vous plaît.",
          "En espèces.",
          "Puis-je payer en plusieurs fois ?"
        ],
        hints: "Indiquez votre mode de paiement préféré.",
        expectedKeywords: ["carte", "bancaire", "espèces", "chèque", "payer", "plusieurs fois", "accepter"],
        feedback: {
          correct: "Parfait, je vous accompagne à la caisse.",
          incorrect: "Comment souhaitez-vous régler votre achat ?"
        }
      },
      {
        id: 8,
        botMessage: "Voici votre ticket et votre achat. N'hésitez pas à revenir si vous avez besoin d'autre chose. Voulez-vous une carte de fidélité de notre magasin ?",
        inputMode: "hybrid",
        suggestions: [
          "Oui, ça m'intéresse. Comment ça fonctionne ?",
          "Non merci, peut-être une autre fois.",
          "J'en ai déjà une, merci."
        ],
        hints: "Indiquez si vous souhaitez une carte de fidélité.",
        expectedKeywords: ["carte", "fidélité", "fonctionne", "intéresse", "non", "merci", "déjà", "avoir"],
        feedback: {
          correct: "Merci pour votre visite. Bonne journée !",
          partial: "Notre carte de fidélité vous permet de cumuler des points pour des réductions futures.",
          incorrect: "Souhaitez-vous une carte de fidélité pour vos prochains achats ?"
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à faire du shopping en français, à essayer des vêtements et à effectuer un achat.",
    learningObjectives: [
      "Décrire ce que vous cherchez",
      "Parler des tailles et des couleurs",
      "Donner votre avis sur un vêtement",
      "Comprendre les prix et promotions",
      "Effectuer un paiement"
    ],
    grammar: {
      points: [
        "Adjectifs descriptifs (position et accord)",
        "Verbes d'opinion (aimer, préférer)",
        "Phrases interrogatives",
        "Conditionnel de politesse"
      ]
    }
  };

  export default shoppingClothes;
