// chatbot/A2/scenarios/makingAppointments.js

const makingAppointments = {
    id: 7,
    title: "Making Appointments",
    level: "A2",
    description: "Learn how to make different types of appointments by phone.",
    estimatedTime: "15-20 minutes",
    vocabulary: ["rendez-vous", "disponibilité", "horaire", "reporter", "annuler", "confirmer", "secrétaire", "agenda", "prendre rendez-vous", "préférence"],
    steps: [
      {
        id: 1,
        botMessage: "Cabinet médical du Dr Martin, bonjour. Que puis-je faire pour vous ?",
        inputMode: "suggestions",
        suggestions: [
          "Bonjour, je voudrais prendre rendez-vous avec le Dr Martin, s'il vous plaît.",
          "Bonjour, je suis patient(e) du Dr Martin et j'ai besoin d'un rendez-vous urgent.",
          "Bonjour, je souhaite reporter mon rendez-vous prévu demain."
        ],
        hints: "Saluez et expliquez pourquoi vous appelez.",
        expectedKeywords: ["bonjour", "rendez-vous", "prendre", "reporter", "urgent", "patient", "besoin", "souhaite"],
        feedback: {
          correct: "Bien sûr, je peux vous aider avec cela.",
          incorrect: "Pourriez-vous préciser si vous souhaitez prendre, reporter ou annuler un rendez-vous ?"
        }
      },
      {
        id: 2,
        botMessage: "C'est pour quel type de consultation ?",
        inputMode: "hybrid",
        suggestions: [
          "C'est pour un contrôle annuel.",
          "J'ai de la fièvre et mal à la gorge depuis deux jours.",
          "J'ai besoin de renouveler mon ordonnance pour mes médicaments."
        ],
        hints: "Expliquez la raison de votre consultation.",
        expectedKeywords: ["contrôle", "annuel", "fièvre", "gorge", "ordonnance", "renouveler", "médicaments", "besoin"],
        acceptablePhrases: [
          "c'est pour",
          "j'ai besoin",
          "je dois",
          "j'ai mal à"
        ],
        feedback: {
          correct: "Je comprends. Avez-vous une préférence pour le jour et l'heure du rendez-vous ?",
          partial: "Est-ce que c'est urgent ou pouvez-vous attendre quelques jours ?",
          incorrect: "Pouvez-vous me préciser la raison de votre consultation ?"
        }
      },
      {
        id: 3,
        botMessage: "Quand seriez-vous disponible ? Avez-vous une préférence pour le jour et l'heure ?",
        inputMode: "freeText",
        suggestions: [
          "Je préférerais en début de semaine prochaine, lundi ou mardi matin si possible.",
          "Je suis disponible tous les après-midi après 14h.",
          "Le plus tôt possible, c'est assez urgent."
        ],
        hints: "Indiquez vos disponibilités ou préférences de jour et d'heure.",
        expectedKeywords: ["disponible", "préférerais", "semaine", "matin", "après-midi", "lundi", "mardi", "urgent", "possible"],
        feedback: {
          correct: "Laissez-moi vérifier les disponibilités du docteur...",
          partial: "À quelle heure seriez-vous disponible ce jour-là ?",
          incorrect: "Veuillez indiquer quand vous seriez disponible pour ce rendez-vous."
        }
      },
      {
        id: 4,
        botMessage: "Je peux vous proposer mardi prochain à 10h ou jeudi à 15h30. Quelle option vous conviendrait le mieux ?",
        inputMode: "suggestions",
        suggestions: [
          "Mardi à 10h me conviendrait parfaitement.",
          "Je préfère jeudi à 15h30, s'il vous plaît.",
          "Est-ce qu'il y a une possibilité plus tôt que mardi ?"
        ],
        hints: "Choisissez une des options proposées ou demandez d'autres possibilités.",
        expectedKeywords: ["mardi", "jeudi", "10h", "15h30", "conviendrait", "préfère", "possibilité", "plus tôt", "option"],
        feedback: {
          correct: "Très bien, c'est noté.",
          incorrect: "Pourriez-vous choisir entre mardi 10h et jeudi 15h30 ?"
        }
      },
      {
        id: 5,
        botMessage: "Puis-je avoir votre nom et prénom, s'il vous plaît ?",
        inputMode: "hybrid",
        suggestions: [
          "Je m'appelle Marie Dubois.",
          "C'est au nom de Pierre Martin.",
          "Mon nom est Sophie Lambert."
        ],
        hints: "Donnez votre nom et prénom.",
        expectedKeywords: ["appelle", "nom", "prénom", "marie", "pierre", "sophie", "dubois", "martin", "lambert"],
        feedback: {
          correct: "Merci. Avez-vous déjà consulté le Dr Martin ou est-ce votre première visite ?",
          partial: "Pourriez-vous épeler votre nom de famille, s'il vous plaît ?",
          incorrect: "J'ai besoin de votre nom et prénom pour le rendez-vous."
        }
      },
      {
        id: 6,
        botMessage: "Est-ce votre première consultation chez le Dr Martin ou êtes-vous déjà patient(e) ?",
        inputMode: "freeText",
        suggestions: [
          "Je suis déjà patient(e) du Dr Martin.",
          "C'est ma première consultation.",
          "J'ai déjà consulté il y a deux ans, mais pas récemment."
        ],
        hints: "Précisez si vous êtes un nouveau patient ou non.",
        expectedKeywords: ["déjà", "patient", "première", "consultation", "consulté", "récemment", "ans", "nouveau"],
        acceptablePhrases: [
          "je suis déjà",
          "c'est ma première",
          "j'ai déjà consulté",
          "je suis un nouveau"
        ],
        feedback: {
          correct: "Très bien, j'ai noté l'information. Avez-vous un numéro de téléphone où l'on peut vous joindre ?",
          partial: "Depuis combien de temps êtes-vous suivi(e) par le Dr Martin ?",
          incorrect: "Merci de préciser si vous avez déjà consulté le Dr Martin ou si c'est votre première visite."
        }
      },
      {
        id: 7,
        botMessage: "Quel est votre numéro de téléphone, s'il vous plaît ?",
        inputMode: "suggestions",
        suggestions: [
          "Mon numéro est le 06 12 34 56 78.",
          "Vous pouvez me joindre au 01 23 45 67 89.",
          "C'est le 07 98 76 54 32."
        ],
        hints: "Donnez votre numéro de téléphone.",
        expectedKeywords: ["numéro", "téléphone", "joindre", "06", "01", "07", "portable", "fixe"],
        feedback: {
          correct: "Parfait, j'ai noté votre numéro.",
          incorrect: "J'ai besoin de votre numéro de téléphone pour confirmer le rendez-vous."
        }
      },
      {
        id: 8,
        botMessage: "Très bien, votre rendez-vous est confirmé pour [jour] à [heure]. N'oubliez pas d'apporter votre carte vitale et une pièce d'identité. Souhaitez-vous que je vous envoie un SMS de rappel la veille ?",
        inputMode: "hybrid",
        suggestions: [
          "Oui, s'il vous plaît, ce serait gentil.",
          "Non merci, ce n'est pas nécessaire.",
          "Je préférerais un rappel par email, si possible."
        ],
        hints: "Indiquez si vous souhaitez un rappel pour le rendez-vous.",
        expectedKeywords: ["oui", "non", "rappel", "SMS", "email", "nécessaire", "gentil", "préférerais", "merci"],
        feedback: {
          correct: "C'est noté. Nous vous verrons donc [jour] à [heure]. Passez une bonne journée !",
          partial: "À quelle adresse email puis-je vous envoyer le rappel ?",
          incorrect: "Souhaitez-vous recevoir un rappel pour votre rendez-vous ?"
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à prendre un rendez-vous médical par téléphone en français.",
    learningObjectives: [
      "Prendre un rendez-vous par téléphone",
      "Expliquer la raison d'une consultation",
      "Indiquer ses disponibilités",
      "Donner ses coordonnées personnelles",
      "Comprendre les informations pratiques"
    ],
    grammar: {
      points: [
        "Conditionnel de politesse",
        "Questions avec inversion",
        "Expressions de temps et d'horaire",
        "Verbes au futur proche"
      ]
    }
  };
  
  export default makingAppointments;