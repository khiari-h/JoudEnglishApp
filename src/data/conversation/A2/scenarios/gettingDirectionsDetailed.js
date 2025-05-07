// chatbot/A2/scenarios/gettingDirectionsDetailed.js

const gettingDirectionsDetailed = {
    id: 10,
    title: "Getting Directions Detailed",
    level: "A2",
    description: "Learn how to ask for and understand complex directions in a city.",
    estimatedTime: "15-20 minutes",
    vocabulary: ["direction", "itinéraire", "chemin", "tourner", "traverser", "continuer", "carrefour", "rond-point", "transport en commun", "distance"],
    steps: [
      {
        id: 1,
        botMessage: "Bonjour ! Vous semblez chercher votre chemin. Est-ce que je peux vous aider ?",
        inputMode: "suggestions",
        suggestions: [
          "Bonjour, je cherche la gare centrale, s'il vous plaît.",
          "Excusez-moi, pouvez-vous m'indiquer le chemin pour aller au musée d'art moderne ?",
          "Bonjour, je suis perdu(e). Comment aller à la place principale de la ville ?"
        ],
        hints: "Saluez la personne et demandez votre chemin vers un lieu spécifique.",
        expectedKeywords: ["bonjour", "cherche", "gare", "musée", "indiquer", "chemin", "aller", "perdu", "place", "comment"],
        feedback: {
          correct: "Bien sûr, je peux vous aider à vous orienter.",
          incorrect: "Demandez votre chemin vers un lieu précis pour que je puisse vous aider."
        }
      },
      {
        id: 2,
        botMessage: "Je connais bien cet endroit. Préférez-vous y aller à pied ou en transport en commun ?",
        inputMode: "hybrid",
        suggestions: [
          "Je préfère y aller à pied si ce n'est pas trop loin.",
          "Quels transports en commun puis-je prendre pour y arriver ?",
          "Quelle est la façon la plus rapide d'y arriver ?"
        ],
        hints: "Indiquez votre préférence pour le mode de déplacement.",
        expectedKeywords: ["pied", "transport", "commun", "loin", "rapide", "prendre", "préfère", "façon", "arriver", "bus"],
        acceptablePhrases: [
          "je préfère",
          "puis-je prendre",
          "la façon la plus",
          "est-ce loin"
        ],
        feedback: {
          correct: "D'accord, je vais vous indiquer le meilleur itinéraire.",
          partial: "C'est à environ 20 minutes à pied ou 10 minutes en bus.",
          incorrect: "Dites-moi si vous préférez marcher ou prendre les transports en commun."
        }
      },
      {
        id: 3,
        botMessage: "Pour y aller à pied, c'est assez simple. D'abord, continuez tout droit sur cette rue jusqu'au grand carrefour avec les feux tricolores.",
        inputMode: "freeText",
        suggestions: [
          "D'accord, et après le carrefour, que dois-je faire ?",
          "C'est à quelle distance, ce carrefour ?",
          "Y a-t-il des points de repère spécifiques pour reconnaître ce carrefour ?"
        ],
        hints: "Demandez des informations supplémentaires sur l'itinéraire.",
        expectedKeywords: ["après", "carrefour", "distance", "repère", "reconnaître", "faire", "ensuite", "loin", "combien", "minutes"],
        feedback: {
          correct: "Le carrefour est à environ 300 mètres. Vous verrez une grande pharmacie au coin.",
          partial: "Vous devriez atteindre ce carrefour en 5 minutes environ.",
          incorrect: "Posez une question sur l'itinéraire ou la prochaine étape."
        }
      },
      {
        id: 4,
        botMessage: "Au carrefour, tournez à gauche dans la rue Principale et continuez pendant environ 10 minutes. Vous passerez devant un supermarché et une école.",
        inputMode: "suggestions",
        suggestions: [
          "Et après l'école, je dois continuer tout droit ?",
          "Est-ce que la rue change de nom à un moment donné ?",
          "Y a-t-il des croisements importants à surveiller ?"
        ],
        hints: "Demandez des précisions sur la suite de l'itinéraire.",
        expectedKeywords: ["après", "école", "continuer", "droit", "rue", "nom", "change", "croisements", "surveiller", "importants"],
        feedback: {
          correct: "Après l'école, vous arriverez à un rond-point. Il faudra prendre la deuxième sortie.",
          incorrect: "Posez une question pour obtenir plus de détails sur l'itinéraire après l'école."
        }
      },
      {
        id: 5,
        botMessage: "Au rond-point, prenez la deuxième sortie et continuez sur l'avenue de la République. Votre destination sera sur votre droite, juste après la banque.",
        inputMode: "hybrid",
        suggestions: [
          "Comment reconnaîtrai-je le bâtiment exactement ?",
          "À quelle distance se trouve le rond-point de ma destination finale ?",
          "Y a-t-il un passage piéton pour traverser l'avenue si nécessaire ?"
        ],
        hints: "Demandez des détails sur la destination finale ou d'autres précisions.",
        expectedKeywords: ["reconnaître", "bâtiment", "distance", "rond-point", "destination", "finale", "passage", "piéton", "traverser", "avenue"],
        feedback: {
          correct: "Le bâtiment est grand avec une façade bleue et il y a une statue devant l'entrée. C'est à environ 200 mètres du rond-point.",
          partial: "Oui, il y a plusieurs passages piétons bien marqués sur cette avenue.",
          incorrect: "Posez une question sur la destination finale ou des détails pratiques."
        }
      },
      {
        id: 6,
        botMessage: "En tout, cela devrait vous prendre environ 20-25 minutes à pied. Si vous préférez les transports, vous pouvez prendre le bus numéro 7 qui s'arrête juste en face d'ici.",
        inputMode: "freeText",
        suggestions: [
          "Où exactement se trouve l'arrêt de bus ?",
          "À quelle fréquence passe le bus numéro 7 ?",
          "Combien de temps dure le trajet en bus ?"
        ],
        hints: "Posez une question sur les transports en commun.",
        expectedKeywords: ["arrêt", "bus", "trouve", "fréquence", "passe", "numéro", "combien", "temps", "trajet", "dure"],
        acceptablePhrases: [
          "où se trouve",
          "à quelle fréquence",
          "combien de temps",
          "est-ce que"
        ],
        feedback: {
          correct: "L'arrêt de bus est juste au coin de la rue, à 50 mètres d'ici. Le bus passe toutes les 10 minutes en journée.",
          partial: "Le trajet en bus dure environ 8-10 minutes jusqu'à votre destination.",
          incorrect: "Posez une question sur les détails du transport en bus."
        }
      },
      {
        id: 7,
        botMessage: "Pour le bus, vous devez descendre à l'arrêt 'Place Centrale', c'est le cinquième arrêt. Ensuite, c'est à 2 minutes à pied, en suivant les panneaux.",
        inputMode: "suggestions",
        suggestions: [
          "Faut-il acheter un ticket à l'avance ou je peux payer dans le bus ?",
          "Y a-t-il une application mobile pour suivre les horaires des bus ?",
          "Le bus circule-t-il aussi le dimanche ?"
        ],
        hints: "Posez une question pratique sur l'utilisation du bus.",
        expectedKeywords: ["ticket", "acheter", "avance", "payer", "application", "mobile", "horaires", "circule", "dimanche", "suivre"],
        feedback: {
          correct: "Vous pouvez acheter votre ticket directement dans le bus auprès du chauffeur. Et oui, il y a une application de la ville pour suivre les bus en temps réel.",
          incorrect: "Posez une question pratique concernant l'utilisation du bus."
        }
      },
      {
        id: 8,
        botMessage: "Avez-vous une préférence maintenant ? Souhaitez-vous prendre le bus ou marcher ?",
        inputMode: "hybrid",
        suggestions: [
          "Je pense que je vais marcher, la journée est belle et j'ai le temps.",
          "Je vais prendre le bus, ça me semble plus simple.",
          "Merci pour toutes ces informations, je vais décider en fonction de la météo."
        ],
        hints: "Indiquez votre choix final et remerciez pour les informations.",
        expectedKeywords: ["marcher", "bus", "prendre", "merci", "informations", "pense", "simple", "temps", "météo", "décider"],
        feedback: {
          correct: "Excellente décision ! N'hésitez pas si vous avez besoin d'autres informations. Bon trajet !",
          partial: "C'est un bon choix. Avez-vous besoin d'autres précisions avant de partir ?",
          incorrect: "Indiquez si vous préférez marcher ou prendre le bus et remerciez pour les indications."
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à demander des directions détaillées et à comprendre un itinéraire complexe en français.",
    learningObjectives: [
      "Demander son chemin de façon précise",
      "Comprendre des itinéraires complexes",
      "Poser des questions sur les transports en commun",
      "Demander des clarifications et des détails",
      "Utiliser le vocabulaire de l'orientation en ville"
    ],
    grammar: {
      points: [
        "Impératif pour les directions",
        "Questions avec inversion",
        "Prépositions de lieu",
        "Expressions de durée et de distance"
      ]
    }
  };
  
  export default gettingDirectionsDetailed;