// chatbot/B1/scenarios/complainingService.js

const complainingService = {
    id: 5,
    title: "Complaining Service",
    level: "B1",
    description: "Learn how to formulate a structured complaint about a service and negotiate a solution.",
    estimatedTime: "15-20 minutes",
    vocabulary: ["réclamation", "insatisfaction", "remboursement", "compensation", "défectueux", "délai", "qualité", "service client", "résoudre", "exiger"],
    steps: [
      {
        id: 1,
        botMessage: "Bonjour et bienvenue au service client de TechPlus. Je suis Marie, comment puis-je vous aider aujourd'hui ?",
        inputMode: "suggestions",
        suggestions: [
          "Bonjour, j'appelle au sujet du smartphone que j'ai acheté dans votre magasin la semaine dernière. Il présente déjà plusieurs problèmes.",
          "Bonjour Marie. Je souhaite faire une réclamation concernant le service de réparation que j'ai utilisé le mois dernier et qui n'a pas résolu mon problème.",
          "Bonjour. Je vous contacte car ma commande en ligne n'a toujours pas été livrée alors que le délai annoncé est dépassé depuis 10 jours."
        ],
        hints: "Saluez et présentez clairement l'objet de votre réclamation.",
        expectedKeywords: ["bonjour", "réclamation", "problème", "smartphone", "service", "réparation", "commande", "livraison", "délai", "dépassé"],
        feedback: {
          correct: "Je suis désolée d'apprendre cela. Pourriez-vous m'expliquer plus précisément quel est le problème rencontré ?",
          incorrect: "Pourriez-vous préciser la raison de votre appel et l'objet de votre réclamation ?"
        }
      },
      {
        id: 2,
        botMessage: "Je comprends votre frustration. Pourriez-vous me décrire plus précisément les problèmes que vous rencontrez ?",
        inputMode: "hybrid",
        suggestions: [
          "L'écran se fige régulièrement et certaines applications se ferment sans raison. De plus, la batterie se décharge très rapidement, en moins de 4 heures, ce qui est anormal pour un appareil neuf.",
          "Après la réparation, le même problème persiste : l'appareil surchauffe après seulement 10 minutes d'utilisation. J'ai déjà payé 150€ pour une réparation qui n'a rien résolu.",
          "Ma commande numéro 45678 devait être livrée le 15 juin. Nous sommes le 25 et je n'ai toujours rien reçu malgré deux relances par email restées sans réponse."
        ],
        hints: "Décrivez précisément les problèmes rencontrés avec le service ou le produit, en donnant des détails concrets.",
        expectedKeywords: ["écran", "applications", "batterie", "réparation", "problème", "persiste", "surchauffe", "commande", "livrée", "relances"],
        acceptablePhrases: [
          "l'écran se",
          "le problème persiste",
          "l'appareil",
          "ma commande",
          "devait être"
        ],
        feedback: {
          correct: "Merci pour ces précisions. Avez-vous déjà entrepris des démarches pour résoudre ce problème ?",
          partial: "Pourriez-vous préciser depuis quand exactement vous rencontrez ces difficultés ?",
          incorrect: "Décrivez en détail les problèmes que vous rencontrez avec le produit ou service."
        }
      },
      {
        id: 3,
        botMessage: "Avez-vous déjà essayé de résoudre ce problème ou contacté nos services auparavant ?",
        inputMode: "freeText",
        suggestions: [
          "Oui, j'ai appelé votre service technique qui m'a suggéré de réinitialiser l'appareil, ce que j'ai fait, mais les problèmes persistent. J'ai aussi envoyé un email la semaine dernière qui est resté sans réponse.",
          "C'est ma première démarche officielle, mais j'ai déjà signalé le problème au technicien lors de la réparation qui m'a assuré que tout fonctionnerait parfaitement.",
          "J'ai contacté le service de livraison qui m'a renvoyé vers vous en m'expliquant que le colis avait bien quitté vos entrepôts mais qu'ils n'ont aucune trace de son acheminement."
        ],
        hints: "Expliquez les démarches que vous avez déjà entreprises pour résoudre le problème.",
        expectedKeywords: ["appelé", "service", "technique", "réinitialiser", "email", "signalé", "technicien", "contacté", "livraison", "entrepôts"],
        feedback: {
          correct: "Je vois que vous avez déjà essayé de résoudre ce problème. Quelle solution attendez-vous de notre part aujourd'hui ?",
          partial: "Merci pour cette information. Avez-vous conservé une référence de votre précédente démarche ?",
          incorrect: "Indiquez si vous avez déjà entrepris des démarches pour résoudre ce problème avant cet appel."
        }
      },
      {
        id: 4,
        botMessage: "Je comprends la situation. Quelle solution souhaiteriez-vous obtenir pour résoudre ce problème ?",
        inputMode: "suggestions",
        suggestions: [
          "Je voudrais un remplacement de l'appareil puisqu'il est encore sous garantie et que les problèmes sont apparus dès les premiers jours d'utilisation.",
          "J'attends un remboursement des frais de réparation puisque le service n'a pas résolu le problème, et une nouvelle intervention gratuite pour réparer correctement mon appareil.",
          "Je demande la livraison express de ma commande sous 48h, ou bien un remboursement complet si ce n'est pas possible."
        ],
        hints: "Exprimez clairement quelle solution vous attendez (remboursement, échange, réparation, compensation...).",
        expectedKeywords: ["remplacement", "garantie", "remboursement", "frais", "réparation", "gratuite", "livraison", "express", "commande", "compensation"],
        feedback: {
          correct: "Je comprends votre demande. Laissez-moi vérifier ce qui est possible selon notre politique de service client.",
          incorrect: "Pourriez-vous préciser quelle solution vous conviendrait pour résoudre ce problème ?"
        }
      },
      {
        id: 5,
        botMessage: "Après vérification de votre dossier, je peux vous proposer les options suivantes : une réparation gratuite dans notre centre technique ou un avoir de 50% de la valeur de votre achat. Cependant, un remplacement complet n'est possible qu'après deux tentatives de réparation infructueuses selon notre politique.",
        inputMode: "hybrid",
        suggestions: [
          "Je préfère l'option de réparation gratuite, mais j'aimerais avoir l'assurance que le problème sera définitivement résolu cette fois-ci. Pouvez-vous me le garantir ?",
          "Ces propositions ne me satisfont pas. Le produit est défectueux dès le départ et je souhaite un remboursement complet plutôt qu'un avoir partiel. C'est mon droit en tant que consommateur.",
          "Je comprends votre politique, mais compte tenu des désagréments subis et du temps perdu, j'aimerais négocier une compensation supplémentaire ou une extension de garantie."
        ],
        hints: "Réagissez à la proposition en exprimant votre préférence ou en négociant une meilleure solution.",
        expectedKeywords: ["préfère", "réparation", "garantir", "satisfont", "défectueux", "remboursement", "avoir", "droit", "compensation", "extension"],
        feedback: {
          correct: "Je comprends votre point de vue. Laissez-moi voir ce que je peux faire pour améliorer notre offre.",
          partial: "C'est une demande légitime. Permettez-moi de consulter les options disponibles.",
          incorrect: "Indiquez si vous êtes satisfait de ces propositions ou quelle autre solution vous préféreriez."
        }
      },
      {
        id: 6,
        botMessage: "Après consultation avec mon responsable, voici ce que je peux vous proposer : nous pouvons effectuer la réparation sous 48h avec un appareil de prêt pendant la durée de l'intervention, et si le problème persiste après cette réparation, nous procéderons à un échange à neuf. Est-ce que cette solution vous conviendrait ?",
        inputMode: "freeText",
        suggestions: [
          "Oui, cette proposition me convient si vous pouvez me garantir par écrit que l'échange sera automatique en cas d'échec de la réparation. Pouvez-vous m'envoyer une confirmation par email ?",
          "C'est une amélioration, mais le délai de 48h est trop long pour moi car j'ai besoin de mon appareil pour des raisons professionnelles. Pouvez-vous proposer une solution plus rapide ?",
          "J'accepte cette proposition. Comment va se dérouler la procédure pour le dépôt de l'appareil et le prêt du matériel de remplacement ?"
        ],
        hints: "Répondez à la nouvelle proposition en l'acceptant, en la refusant ou en demandant des précisions supplémentaires.",
        expectedKeywords: ["convient", "garantir", "écrit", "échange", "automatique", "amélioration", "délai", "long", "accepte", "procédure"],
        acceptablePhrases: [
          "cette proposition me convient",
          "c'est une amélioration",
          "j'accepte cette proposition",
          "pouvez-vous garantir",
          "comment va se dérouler"
        ],
        feedback: {
          correct: "Parfait, je vais vous envoyer une confirmation par email avec tous les détails de notre accord et la procédure à suivre.",
          partial: "Je comprends votre préoccupation. Laissez-moi voir si nous pouvons ajuster le délai.",
          incorrect: "Veuillez indiquer si cette nouvelle proposition vous convient ou si vous souhaitez d'autres ajustements."
        }
      },
      {
        id: 7,
        botMessage: "J'ai enregistré notre accord. Un email de confirmation va vous être envoyé avec les détails de la procédure. Avez-vous d'autres questions concernant cette réclamation ?",
        inputMode: "suggestions",
        suggestions: [
          "Non, c'est clair. Merci d'avoir pris ma réclamation en compte et d'avoir trouvé une solution satisfaisante.",
          "Oui, j'aimerais savoir quel est le délai maximum pour déposer mon appareil au service technique ? J'ai des contraintes de planning cette semaine.",
          "Une dernière question : si le problème se reproduit après la période de garantie, quelle sera votre politique ?"
        ],
        hints: "Indiquez si vous avez des questions supplémentaires ou remerciez pour la résolution.",
        expectedKeywords: ["clair", "merci", "réclamation", "solution", "satisfaisante", "délai", "maximum", "déposer", "garantie", "politique"],
        feedback: {
          correct: "Le délai est de 15 jours pour déposer votre appareil. Après ce délai, il faudrait refaire une demande. Concernant les problèmes hors garantie, nous proposons des réparations à tarif préférentiel pour nos clients fidèles.",
          incorrect: "Avez-vous d'autres questions sur la procédure ou êtes-vous satisfait de la résolution proposée ?"
        }
      },
      {
        id: 8,
        botMessage: "Merci pour votre compréhension. Afin d'améliorer nos services, pourriez-vous me dire ce qui, selon vous, aurait pu éviter ce problème initialement ?",
        inputMode: "hybrid",
        suggestions: [
          "Un contrôle qualité plus rigoureux avant la vente des produits aurait probablement permis de détecter ce défaut. Ou au moins une meilleure information sur la procédure de retour dès l'achat.",
          "Une meilleure formation de vos techniciens et un suivi plus personnalisé après la réparation auraient pu éviter cette situation et ma frustration.",
          "Des délais de livraison plus réalistes et un système de suivi de commande plus transparent m'auraient évité de devoir faire cette réclamation."
        ],
        hints: "Donnez votre avis sur ce qui aurait pu éviter le problème initial ou améliorer le service.",
        expectedKeywords: ["contrôle", "qualité", "information", "formation", "techniciens", "suivi", "délais", "livraison", "réalistes", "transparent"],
        feedback: {
          correct: "Merci beaucoup pour ce retour constructif. Nous prenons note de vos suggestions pour améliorer nos services. Votre satisfaction est notre priorité et nous vous remercions pour votre fidélité malgré cet incident.",
          partial: "C'est un excellent point que vous soulevez. Nous allons le transmettre à notre équipe qualité.",
          incorrect: "Donnez votre avis sur ce qui aurait pu éviter ce problème ou améliorer notre service."
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à formuler une réclamation structurée, à négocier une solution satisfaisante et à exprimer votre opinion sur l'amélioration du service.",
    learningObjectives: [
      "Expliquer clairement un problème avec un service ou produit",
      "Formuler une réclamation de manière structurée et polie",
      "Négocier une solution satisfaisante",
      "Exprimer son insatisfaction de manière constructive",
      "Utiliser le vocabulaire spécifique aux réclamations"
    ],
    grammar: {
      points: [
        "Conditionnel pour exprimer des demandes polies",
        "Structures pour exprimer l'insatisfaction",
        "Formules de politesse dans un contexte formel",
        "Expression de la cause et de la conséquence"
      ]
    }
  };

  export default complainingService;
