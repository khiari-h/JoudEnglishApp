// chatbot/B1/scenarios/businessMeeting.js

const businessMeeting = {
    id: 13,
    title: "Business Meeting",
    level: "B1",
    description: "Learn how to participate effectively in a professional meeting, present ideas and discuss project-related topics.",
    estimatedTime: "15-20 minutes",
    vocabulary: ["réunion", "ordre du jour", "projet", "objectifs", "présentation", "proposer", "délai", "budget", "collaborateur", "prendre la parole"],
    steps: [
      {
        id: 1,
        botMessage: "Bonjour à tous. Merci d'être présents pour cette réunion concernant le projet Horizon. Avant de commencer, pouvez-vous vous présenter brièvement et indiquer votre rôle dans ce projet ?",
        inputMode: "suggestions",
        suggestions: [
          "Bonjour, je m'appelle Marie Dubois, je suis responsable marketing et je m'occupe de la stratégie de communication pour le lancement du projet Horizon.",
          "Bonjour à tous. Je suis Thomas Martin, chef de projet technique. Mon équipe est chargée du développement de la plateforme et du respect des délais de livraison.",
          "Bonjour. Je suis Claire Lefèvre du service commercial. Je travaille sur l'analyse des besoins clients et je fais le lien entre leurs attentes et les fonctionnalités du produit."
        ],
        hints: "Présentez-vous en indiquant votre nom, votre fonction et votre rôle dans le projet.",
        expectedKeywords: ["m'appelle", "responsable", "marketing", "chef", "projet", "technique", "service", "commercial", "besoins", "clients"],
        feedback: {
          correct: "Merci pour votre présentation. Passons maintenant à l'ordre du jour de notre réunion.",
          incorrect: "Pourriez-vous vous présenter en précisant votre rôle dans le projet Horizon ?"
        }
      },
      {
        id: 2,
        botMessage: "Voici l'ordre du jour : premièrement, le point sur l'avancement du projet ; deuxièmement, les difficultés rencontrées ; et enfin, le planning des prochaines étapes. Pouvez-vous nous faire un bref état des lieux de votre partie du projet ?",
        inputMode: "hybrid",
        suggestions: [
          "Pour ma part, nous avons finalisé la stratégie marketing et les supports de communication sont en cours de création. Nous sommes dans les temps selon le planning initial, mais nous attendons encore la validation des visuels par la direction.",
          "Concernant le développement technique, nous avons rencontré quelques difficultés avec l'intégration des nouvelles fonctionnalités. Nous avons un retard d'environ une semaine, mais nous mettons en place des solutions pour rattraper ce délai.",
          "Du côté commercial, les retours des clients tests sont globalement positifs. Nous avons recueilli plusieurs suggestions d'amélioration que j'ai synthétisées dans un rapport que je vous ai envoyé hier par email."
        ],
        hints: "Décrivez l'état d'avancement de votre partie du projet, en mentionnant les progrès et éventuels problèmes.",
        expectedKeywords: ["finalisé", "cours", "temps", "planning", "difficultés", "retard", "solutions", "retours", "clients", "suggestions"],
        acceptablePhrases: [
          "nous avons finalisé",
          "nous sommes dans les temps",
          "nous avons rencontré",
          "nous avons un retard",
          "les retours sont"
        ],
        feedback: {
          correct: "Merci pour ce compte-rendu. Quelles sont les principales difficultés que vous avez rencontrées jusqu'à présent ?",
          partial: "C'est noté. Y a-t-il des points spécifiques qui nécessitent une attention particulière ?",
          incorrect: "Veuillez présenter l'état d'avancement de votre partie du projet."
        }
      },
      {
        id: 3,
        botMessage: "Quelles sont les principales difficultés ou obstacles que vous avez rencontrés jusqu'à présent dans votre partie du projet ?",
        inputMode: "freeText",
        suggestions: [
          "Le principal défi que nous rencontrons concerne les délais de validation qui sont plus longs que prévu. Cela retarde la production de nos supports et pourrait impacter la date de lancement si nous ne trouvons pas une solution rapidement.",
          "Nous faisons face à des problèmes techniques d'intégration entre la nouvelle plateforme et les systèmes existants. De plus, deux membres clés de l'équipe ont été absents, ce qui a ralenti notre progression sur certaines fonctionnalités critiques.",
          "Notre difficulté majeure est le manque de clarté dans les spécifications initiales, ce qui nous a obligés à faire plusieurs allers-retours avec les clients. Par ailleurs, le budget alloué pour les tests utilisateurs est insuffisant par rapport à nos besoins réels."
        ],
        hints: "Décrivez les principaux problèmes ou obstacles que vous rencontrez dans votre travail sur ce projet.",
        expectedKeywords: ["défi", "délais", "validation", "retarde", "impacter", "problèmes", "intégration", "ralenti", "clarté", "spécifications"],
        feedback: {
          correct: "Je comprends ces difficultés. Avez-vous des suggestions ou des solutions à proposer pour surmonter ces obstacles ?",
          partial: "Ce sont effectivement des défis importants à gérer.",
          incorrect: "Veuillez préciser les difficultés spécifiques que vous rencontrez dans votre partie du projet."
        }
      },
      {
        id: 4,
        botMessage: "Avez-vous des suggestions ou des solutions à proposer pour résoudre ces difficultés ?",
        inputMode: "suggestions",
        suggestions: [
          "Je propose que nous mettions en place un processus de validation accéléré pour les contenus marketing, avec des réunions de validation hebdomadaires plutôt que d'attendre que tout soit finalisé.",
          "Nous pourrions renforcer temporairement l'équipe technique avec deux développeurs du projet Alpha qui vient de se terminer. J'ai déjà discuté de cette possibilité avec leur responsable.",
          "Je suggère d'organiser un atelier de clarification des besoins avec les clients principaux pour fixer définitivement les spécifications et éviter les changements constants qui nous ralentissent."
        ],
        hints: "Proposez des solutions concrètes aux problèmes mentionnés précédemment.",
        expectedKeywords: ["propose", "processus", "validation", "accéléré", "renforcer", "équipe", "développeurs", "atelier", "clarification", "besoins"],
        feedback: {
          correct: "Ce sont d'excellentes propositions. Concernant le planning des prochaines étapes, quels sont selon vous les échéances critiques à respecter ?",
          incorrect: "Veuillez proposer des solutions concrètes pour résoudre les difficultés que vous avez mentionnées."
        }
      },
      {
        id: 5,
        botMessage: "Parlons maintenant du planning. Quelles sont les prochaines étapes importantes et les échéances critiques que nous devons respecter ?",
        inputMode: "hybrid",
        suggestions: [
          "La prochaine étape cruciale est la finalisation des supports marketing d'ici deux semaines, car nous devons les envoyer à l'impression. Ensuite, nous avons la présentation aux investisseurs le 15 du mois prochain qui nécessite que tout soit prêt.",
          "Côté technique, nous devons impérativement terminer l'intégration des API d'ici vendredi prochain pour pouvoir commencer les tests utilisateurs la semaine suivante. La date limite pour la version stable est fixée au 20 du mois prochain.",
          "Pour le volet commercial, nous devons finaliser les contrats avec nos partenaires avant la fin du mois. La formation des équipes commerciales est prévue dans trois semaines, donc tous les documents de formation doivent être prêts d'ici là."
        ],
        hints: "Décrivez les prochaines étapes importantes du projet et leurs échéances.",
        expectedKeywords: ["finalisation", "supports", "semaines", "présentation", "investisseurs", "intégration", "tests", "version", "contrats", "formation"],
        feedback: {
          correct: "Ces échéances sont bien notées. Comment pouvons-nous améliorer la coordination entre nos différentes équipes pour respecter ces délais ?",
          partial: "Ces jalons sont importants. Y a-t-il d'autres dates clés dont nous devrions tenir compte ?",
          incorrect: "Veuillez indiquer les prochaines étapes importantes du projet et leurs dates limites."
        }
      },
      {
        id: 6,
        botMessage: "Pour améliorer notre efficacité collective, comment pourrions-nous mieux coordonner le travail entre nos différentes équipes ?",
        inputMode: "freeText",
        suggestions: [
          "Je propose que nous utilisions un outil de gestion de projet partagé où chaque équipe mettrait à jour son avancement quotidiennement. Nous pourrions également organiser une courte réunion de synchronisation deux fois par semaine pour traiter rapidement les problèmes inter-équipes.",
          "Nous devrions désigner un représentant par équipe qui participera à une réunion de coordination hebdomadaire. Ces personnes seraient responsables de la communication des décisions et de l'avancement à leurs équipes respectives.",
          "Je suggère de créer un document collaboratif listant toutes les dépendances entre nos équipes, avec les dates critiques et les responsables pour chaque livrable. Cela nous donnerait une visibilité collective sur les priorités et les blocages potentiels."
        ],
        hints: "Proposez des moyens concrets d'améliorer la coordination entre les équipes.",
        expectedKeywords: ["outil", "gestion", "projet", "partagé", "réunion", "synchronisation", "représentant", "coordination", "document", "collaboratif"],
        acceptablePhrases: [
          "je propose que",
          "nous devrions",
          "je suggère de",
          "il serait utile de",
          "nous pourrions"
        ],
        feedback: {
          correct: "Ce sont d'excellentes suggestions pour améliorer notre coordination. Y a-t-il d'autres points que vous souhaiteriez aborder avant de conclure cette réunion ?",
          partial: "Cette approche pourrait effectivement faciliter la coordination entre nos équipes.",
          incorrect: "Proposez des moyens concrets pour améliorer la coordination entre les différentes équipes du projet."
        }
      },
      {
        id: 7,
        botMessage: "Avant de conclure, y a-t-il d'autres points que vous souhaiteriez aborder concernant le projet Horizon ?",
        inputMode: "suggestions",
        suggestions: [
          "J'aimerais soulever la question du budget supplémentaire nécessaire pour les tests utilisateurs, comme mentionné précédemment. Pouvons-nous envisager un réajustement des ressources allouées ?",
          "Je voudrais discuter de la communication externe autour du projet. Devons-nous commencer à communiquer sur les réseaux sociaux ou attendre le lancement officiel ?",
          "Je me demande si nous ne devrions pas prévoir un plan de secours au cas où les délais ne seraient pas tenus. Pourrions-nous envisager un lancement en deux phases si nécessaire ?"
        ],
        hints: "Mentionnez un point supplémentaire que vous souhaitez discuter concernant le projet.",
        expectedKeywords: ["budget", "supplémentaire", "tests", "communication", "externe", "réseaux", "sociaux", "plan", "secours", "phases"],
        feedback: {
          correct: "C'est un point important à discuter. Nous allons l'ajouter à l'ordre du jour de notre prochaine réunion pour l'examiner en détail.",
          incorrect: "Y a-t-il un autre aspect du projet que vous souhaiteriez aborder avant de terminer la réunion ?"
        }
      },
      {
        id: 8,
        botMessage: "Merci à tous pour votre participation active. Pour résumer, nous avons fait le point sur l'avancement du projet, identifié les difficultés principales et proposé des solutions. Nos prochaines étapes sont claires. La prochaine réunion est prévue jeudi prochain à la même heure. D'ici là, pourriez-vous envoyer un bref compte-rendu de votre avancement à toute l'équipe ?",
        inputMode: "hybrid",
        suggestions: [
          "Oui, bien sûr. Je préparerai un résumé de l'avancement marketing avec les points clés et les prochaines actions, et je l'enverrai par email d'ici demain soir.",
          "D'accord, je vais faire un point avec mon équipe technique dès cet après-midi et je partagerai un document détaillant notre progression et les solutions aux problèmes d'intégration.",
          "Entendu. Je compilerai les retours clients dans un format synthétique et je le diffuserai à tous. Je prendrai aussi contact avec vous concernant l'atelier de clarification des besoins que j'ai proposé."
        ],
        hints: "Confirmez que vous enverrez un compte-rendu et précisez ce qu'il contiendra.",
        expectedKeywords: ["préparerai", "résumé", "avancement", "email", "point", "équipe", "document", "compilerai", "retours", "synthétique"],
        feedback: {
          correct: "Parfait, j'attends vos comptes-rendus. Merci à tous pour cette réunion productive et bonne continuation sur le projet Horizon !",
          partial: "Très bien, n'oubliez pas d'inclure les prochaines actions et les échéances dans votre compte-rendu.",
          incorrect: "Veuillez confirmer que vous enverrez un compte-rendu de votre avancement à l'équipe."
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à participer activement à une réunion professionnelle en français, en présentant votre travail, en identifiant des problèmes et en proposant des solutions.",
    learningObjectives: [
      "Se présenter dans un contexte professionnel",
      "Faire un compte-rendu d'avancement",
      "Identifier et expliquer des problèmes",
      "Proposer des solutions concrètes",
      "Participer à la planification d'un projet"
    ],
    grammar: {
      points: [
        "Conditionnel pour les suggestions",
        "Futur proche pour les actions planifiées",
        "Expressions formelles de réunion",
        "Vocabulaire de la gestion de projet"
      ]
    }
  };
  
  export default businessMeeting;