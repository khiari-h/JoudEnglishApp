// chatbot/B1/scenarios/rentingCar.js

const rentingCar = {
    id: 11,
    title: "Renting a Car",
    level: "B1",
    description: "Learn how to rent a car, discuss rental conditions, and handle problems with a rental vehicle.",
    estimatedTime: "15-20 minutes",
    vocabulary: ["location", "voiture", "permis de conduire", "assurance", "caution", "réservoir", "kilométrage", "dommages", "contrat", "frais supplémentaires"],
    steps: [
      {
        id: 1,
        botMessage: "Bonjour et bienvenue à l'agence de location AutoPlus. Comment puis-je vous aider aujourd'hui ?",
        inputMode: "suggestions",
        suggestions: [
          "Bonjour, je souhaiterais louer une voiture pour 5 jours à partir de demain. Quels types de véhicules proposez-vous ?",
          "Bonjour, j'ai une réservation au nom de Martin pour aujourd'hui. Je viens récupérer le véhicule.",
          "Bonjour, je cherche une voiture familiale pour un voyage de deux semaines. Pouvez-vous me renseigner sur vos tarifs ?"
        ],
        hints: "Saluez et expliquez ce que vous recherchez comme location de voiture.",
        expectedKeywords: ["bonjour", "louer", "voiture", "jours", "réservation", "récupérer", "véhicule", "familiale", "voyage", "tarifs"],
        feedback: {
          correct: "Bien sûr, je vais vous aider avec votre demande de location. Avez-vous déjà loué chez nous auparavant ?",
          incorrect: "Pourriez-vous préciser ce que vous recherchez comme type de location de voiture ?"
        }
      },
      {
        id: 2,
        botMessage: "Avez-vous déjà loué chez nous auparavant ? Si non, puis-je voir votre permis de conduire et une pièce d'identité, s'il vous plaît ?",
        inputMode: "hybrid",
        suggestions: [
          "Non, c'est la première fois que je loue dans votre agence. Voici mon permis de conduire et ma carte d'identité. Est-ce que ma carte de crédit sera également nécessaire ?",
          "Oui, j'ai déjà loué chez vous l'année dernière. Mon numéro de client est le 45789, mais j'ai quand même apporté tous mes documents.",
          "Je n'ai jamais loué chez vous, mais j'ai mon permis et mon passeport avec moi. Je voudrais savoir si un permis international est nécessaire ?"
        ],
        hints: "Indiquez si vous avez déjà loué chez eux et mentionnez les documents que vous avez.",
        expectedKeywords: ["première", "fois", "voici", "permis", "carte", "identité", "crédit", "loué", "année", "documents"],
        acceptablePhrases: [
          "non, c'est la première fois",
          "oui, j'ai déjà loué",
          "je n'ai jamais loué",
          "voici mon permis",
          "j'ai mon permis"
        ],
        feedback: {
          correct: "Merci pour vos documents. En effet, nous aurons besoin de votre carte de crédit pour la caution. Quel type de véhicule recherchez-vous précisément ?",
          partial: "Votre numéro de client est bien dans notre système. Quel type de véhicule souhaiteriez-vous cette fois-ci ?",
          incorrect: "Veuillez indiquer si vous avez déjà loué chez nous et montrer vos documents d'identité."
        }
      },
      {
        id: 3,
        botMessage: "Quel type de véhicule recherchez-vous ? Nous proposons différentes catégories : économique, compacte, berline, SUV et minivan.",
        inputMode: "freeText",
        suggestions: [
          "Je cherche une voiture économique, la moins chère possible. C'est juste pour me déplacer en ville, donc quelque chose de petit et facile à garer me conviendrait parfaitement.",
          "Je préférerais une berline confortable, car nous allons faire un long trajet sur autoroute. Idéalement avec une bonne climatisation et un GPS intégré.",
          "Il me faudrait un SUV ou un minivan, car nous sommes 5 personnes avec beaucoup de bagages. Est-ce que ces modèles ont un grand coffre ?"
        ],
        hints: "Précisez le type de véhicule que vous souhaitez et pourquoi ce choix vous convient.",
        expectedKeywords: ["économique", "chère", "déplacer", "ville", "berline", "confortable", "trajet", "autoroute", "SUV", "minivan"],
        feedback: {
          correct: "Parfait, j'ai plusieurs options qui correspondent à vos besoins. Quelle est la durée exacte de location souhaitée ?",
          partial: "Nous avons ce type de véhicule disponible. Avez-vous des exigences particulières concernant la transmission ou les options ?",
          incorrect: "Veuillez préciser quel type de véhicule vous intéresse parmi nos catégories disponibles."
        }
      },
      {
        id: 4,
        botMessage: "Pour quelle durée souhaitez-vous louer ce véhicule, et quelles sont vos dates de départ et de retour prévues ?",
        inputMode: "suggestions",
        suggestions: [
          "Je souhaite louer la voiture du 15 au 20 de ce mois, donc pour 5 jours. Je la prendrai vers 10h le 15 et la ramènerai vers 18h le 20.",
          "Pour une semaine exactement, du lundi prochain au lundi suivant. Je passerai la prendre en début d'après-midi et la rapporterai en matinée.",
          "J'aurais besoin du véhicule pour un week-end, du vendredi soir au lundi matin. Est-ce que vous proposez des tarifs spéciaux pour les week-ends ?"
        ],
        hints: "Indiquez précisément la durée et les dates de votre location.",
        expectedKeywords: ["jours", "mois", "semaine", "lundi", "week-end", "vendredi", "prendrai", "ramènerai", "passerai", "rapporterai"],
        feedback: {
          correct: "C'est noté. Laissez-moi vérifier la disponibilité pour ces dates... Nous avons bien un véhicule disponible. Concernant l'assurance, quelle formule souhaitez-vous ?",
          incorrect: "Pourriez-vous préciser les dates exactes de début et de fin de location ?"
        }
      },
      {
        id: 5,
        botMessage: "Pour l'assurance, nous proposons trois formules : de base (avec franchise de 1000€), intermédiaire (franchise de 500€) ou tous risques (sans franchise). Quelle formule préférez-vous ?",
        inputMode: "hybrid",
        suggestions: [
          "Je préfère l'assurance tous risques, même si c'est plus cher. Je serai plus tranquille sans franchise en cas de problème.",
          "L'option intermédiaire me convient. Pouvez-vous me préciser ce qui est couvert exactement avec cette formule ?",
          "Quelle est la différence de prix entre ces formules ? Ma propre assurance couvre déjà certains dommages sur les véhicules de location."
        ],
        hints: "Choisissez une formule d'assurance ou demandez plus d'informations sur les options.",
        expectedKeywords: ["tous risques", "tranquille", "sans", "intermédiaire", "convient", "couvert", "différence", "prix", "propre", "assurance"],
        feedback: {
          correct: "Très bien. Concernant le carburant, nous vous remettons le véhicule avec le plein d'essence et vous devez le rendre de la même façon. Est-ce que cela vous convient ?",
          partial: "L'assurance intermédiaire couvre les dommages au véhicule, vol, incendie, avec une franchise de 500€. Elle n'inclut pas les dommages aux pneus et vitres.",
          incorrect: "Veuillez indiquer quelle formule d'assurance vous préférez ou demander plus d'informations sur ces options."
        }
      },
      {
        id: 6,
        botMessage: "Pour le carburant, notre politique est 'plein-plein' : nous vous remettons le véhicule avec le réservoir plein et vous devez le rendre de la même façon. D'accord ? Souhaitez-vous ajouter des options comme GPS, siège bébé ou chaînes à neige ?",
        inputMode: "freeText",
        suggestions: [
          "C'est parfait pour le carburant. J'aimerais ajouter un GPS, car je ne connais pas bien la région. Quel est le coût supplémentaire pour cette option ?",
          "Pas de problème pour le plein d'essence au retour. Je n'ai pas besoin d'options supplémentaires, j'utiliserai le GPS de mon téléphone.",
          "Je comprends pour le carburant. Je voudrais ajouter un siège enfant pour un enfant de 3 ans. Est-ce que vous proposez aussi un service de livraison du véhicule à mon hôtel ?"
        ],
        hints: "Répondez concernant la politique de carburant et indiquez si vous souhaitez des options supplémentaires.",
        expectedKeywords: ["carburant", "parfait", "GPS", "région", "coût", "supplémentaire", "plein", "essence", "siège", "enfant"],
        acceptablePhrases: [
          "c'est parfait",
          "pas de problème",
          "je comprends",
          "j'aimerais ajouter",
          "je n'ai pas besoin"
        ],
        feedback: {
          correct: "Le GPS coûte 5€ par jour supplémentaire. Je vais l'ajouter à votre contrat. Préférez-vous payer maintenant ou au retour du véhicule ?",
          partial: "Très bien, nous n'ajouterons pas d'options supplémentaires.",
          incorrect: "Veuillez confirmer que vous acceptez la politique de carburant et préciser si vous voulez des options supplémentaires."
        }
      },
      {
        id: 7,
        botMessage: "Je vais maintenant préparer votre contrat de location. Préférez-vous payer maintenant l'intégralité, ou payer une partie maintenant et le reste au retour du véhicule ?",
        inputMode: "suggestions",
        suggestions: [
          "Je préfère payer la totalité maintenant, comme ça ce sera réglé. Je peux payer par carte bancaire.",
          "Je voudrais payer un acompte maintenant et le reste à mon retour. Quel est le montant minimum à verser aujourd'hui ?",
          "Avant de décider, pourriez-vous me détailler le coût total avec toutes les options et assurances ? Y a-t-il des frais supplémentaires dont nous n'avons pas parlé ?"
        ],
        hints: "Indiquez comment vous préférez payer et/ou demandez des précisions sur le coût total.",
        expectedKeywords: ["payer", "totalité", "maintenant", "acompte", "reste", "retour", "montant", "minimum", "coût", "frais"],
        feedback: {
          correct: "Parfait, je vais préparer la facture pour un paiement intégral. Le montant total est de 345€, incluant la location, l'assurance et le GPS.",
          incorrect: "Veuillez indiquer si vous préférez payer maintenant ou partiellement."
        }
      },
      {
        id: 8,
        botMessage: "Votre véhicule est prêt. Avant de vous donner les clés, je dois vous informer qu'il y a une petite éraflure sur l'aile avant droite, déjà notée sur le contrat. Souhaitez-vous faire le tour du véhicule ensemble pour vérifier son état ?",
        inputMode: "hybrid",
        suggestions: [
          "Oui, je préfère qu'on fasse le tour ensemble et qu'on vérifie bien tous les dommages existants. Je voudrais aussi prendre des photos pour ma propre documentation.",
          "D'accord pour la vérification. Est-ce que je dois signaler tout nouveau dommage à mon retour ? Que se passe-t-il en cas de panne pendant la location ?",
          "Bien sûr, allons voir le véhicule. J'aimerais aussi que vous m'expliquiez rapidement les fonctionnalités spécifiques de cette voiture, comme l'ouverture du réservoir et le démarrage."
        ],
        hints: "Répondez à la proposition de vérification du véhicule et posez éventuellement des questions supplémentaires.",
        expectedKeywords: ["vérification", "ensemble", "dommages", "existants", "photos", "signaler", "panne", "fonctionnalités", "réservoir", "démarrage"],
        feedback: {
          correct: "Allons-y ensemble. Vous avez raison de vouloir documenter l'état du véhicule. En cas de panne, vous avez un numéro d'assistance 24h/24 dans les documents de bord. Pour toute question ou problème, n'hésitez pas à nous contacter. Bonne route !",
          partial: "Je vais vous montrer les principales fonctionnalités du véhicule et nous vérifierons son état ensemble.",
          incorrect: "Indiquez si vous acceptez de faire une vérification de l'état du véhicule avant de partir."
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à louer une voiture en français, en comprenant les conditions de location et en gérant les vérifications nécessaires.",
    learningObjectives: [
      "Décrire ses besoins pour une location de voiture",
      "Comprendre les conditions de location (assurance, carburant)",
      "Négocier des options supplémentaires",
      "Discuter des modalités de paiement",
      "Vérifier et signaler l'état d'un véhicule"
    ],
    grammar: {
      points: [
        "Conditionnel pour les demandes polies",
        "Futur proche pour les actions planifiées",
        "Vocabulaire spécifique à la location de voiture",
        "Questions directes et indirectes"
      ]
    }
  };
  
  export default rentingCar;