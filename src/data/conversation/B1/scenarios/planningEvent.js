// chatbot/B1/scenarios/planningEvent.js

const planningEvent = {
    id: 7,
    title: "Planning Event",
    level: "B1",
    description: "Learn how to organize a collective event, assign tasks and discuss logistics.",
    estimatedTime: "15-20 minutes",
    vocabulary: ["organisation", "planification", "événement", "budget", "invitations", "programme", "réservation", "logistique", "bénévoles", "coordination"],
    steps: [
      {
        id: 1,
        botMessage: "Bonjour ! J'ai entendu dire que tu voulais organiser un événement. De quel type d'événement s'agit-il et quel en est l'objectif principal ?",
        inputMode: "suggestions",
        suggestions: [
          "Nous organisons une fête pour célébrer les 50 ans de notre association culturelle. L'objectif est de réunir les membres actuels et anciens pour un moment convivial.",
          "Je prépare une conférence professionnelle sur l'innovation dans notre secteur. Nous voulons faciliter le réseautage et présenter les nouvelles tendances.",
          "Nous planifions une collecte de fonds pour une cause humanitaire. L'événement doit sensibiliser le public et récolter des dons pour financer un projet spécifique."
        ],
        hints: "Décrivez le type d'événement que vous organisez et son objectif principal.",
        expectedKeywords: ["fête", "célébrer", "conférence", "professionnelle", "réseautage", "collecte", "fonds", "humanitaire", "sensibiliser", "projet"],
        feedback: {
          correct: "C'est un événement intéressant ! Avez-vous déjà fixé une date et un lieu pour cet événement ?",
          incorrect: "Pourriez-vous préciser quel type d'événement vous souhaitez organiser et dans quel but ?"
        }
      },
      {
        id: 2,
        botMessage: "Avez-vous déjà fixé une date et choisi un lieu pour cet événement ?",
        inputMode: "hybrid",
        suggestions: [
          "Nous avons prévu d'organiser l'événement le samedi 15 octobre, mais nous hésitons encore entre deux lieux : une salle municipale au centre-ville ou un espace en plein air si la météo le permet.",
          "La date est fixée au 23 novembre prochain. Pour le lieu, nous avons réservé une option sur un hôtel qui dispose d'une salle de conférence adaptée à nos besoins, mais le contrat n'est pas encore signé.",
          "Nous avons plusieurs dates possibles en septembre, mais nous n'avons pas encore choisi définitivement. Quant au lieu, nous recherchons encore un espace approprié qui corresponde à notre budget."
        ],
        hints: "Précisez si vous avez déjà fixé une date et un lieu pour l'événement, ou où vous en êtes dans cette réflexion.",
        expectedKeywords: ["date", "prévu", "organiser", "lieu", "salle", "centre", "plein air", "réservé", "option", "budget"],
        acceptablePhrases: [
          "nous avons prévu",
          "la date est fixée",
          "nous avons plusieurs dates",
          "nous hésitons",
          "nous recherchons"
        ],
        feedback: {
          correct: "Très bien. Combien de personnes prévoyez-vous d'accueillir à cet événement ?",
          partial: "Il est important de confirmer ces éléments assez rapidement. Avez-vous des critères particuliers pour le choix du lieu ?",
          incorrect: "Indiquez si vous avez déjà choisi une date et un lieu pour votre événement."
        }
      },
      {
        id: 3,
        botMessage: "Combien de personnes estimez-vous accueillir à cet événement, et avez-vous établi un budget prévisionnel ?",
        inputMode: "freeText",
        suggestions: [
          "Nous attendons environ 80 à 100 personnes. Notre budget prévisionnel est de 3000 euros, qui couvrirait la location de la salle, la nourriture, les boissons et quelques décorations.",
          "L'événement devrait réunir 150 participants, principalement des professionnels du secteur. Nous avons un budget de 7500 euros, financé par les frais d'inscription et quelques sponsors.",
          "Pour l'instant, nous estimons entre 50 et 70 participants. Concernant le budget, nous disposons de 1500 euros provenant de notre association, mais nous cherchons des moyens de l'augmenter."
        ],
        hints: "Indiquez le nombre approximatif de participants attendus et le budget dont vous disposez.",
        expectedKeywords: ["personnes", "participants", "budget", "euros", "location", "nourriture", "financer", "frais", "sponsors", "association"],
        feedback: {
          correct: "Ces informations sont importantes pour la planification. Avez-vous déjà une équipe pour organiser cet événement ? Comment avez-vous réparti les tâches ?",
          partial: "Avec ce nombre de participants, il faudra bien gérer la logistique. Comment envisagez-vous de répartir ce budget ?",
          incorrect: "Précisez combien de personnes vous prévoyez d'accueillir et quel est votre budget approximatif."
        }
      },
      {
        id: 4,
        botMessage: "Avez-vous déjà constitué une équipe pour organiser cet événement et comment avez-vous réparti les différentes tâches ?",
        inputMode: "suggestions",
        suggestions: [
          "Oui, nous avons formé un comité de 5 personnes. J'ai pris en charge la coordination générale, deux personnes s'occupent de la logistique, une autre gère les invitations et la communication, et la dernière s'occupe du budget.",
          "Nous sommes une petite équipe de 3 personnes qui gère tout pour l'instant, mais nous prévoyons de recruter des bénévoles pour le jour J. Nous n'avons pas encore formalisé la répartition des tâches.",
          "Pour le moment, je m'occupe de presque tout avec l'aide ponctuelle de collègues. J'aimerais justement des conseils sur comment déléguer efficacement les différentes responsabilités."
        ],
        hints: "Décrivez votre équipe organisatrice et la répartition des responsabilités entre les membres.",
        expectedKeywords: ["équipe", "comité", "coordination", "logistique", "invitations", "communication", "budget", "bénévoles", "répartition", "responsabilités"],
        feedback: {
          correct: "Vous semblez bien organisés ! Concernant le programme de l'événement, avez-vous déjà établi un planning des activités ?",
          incorrect: "Veuillez préciser si vous avez déjà une équipe pour organiser l'événement et comment vous avez réparti les tâches."
        }
      },
      {
        id: 5,
        botMessage: "Concernant le programme, avez-vous déjà établi un planning des activités prévues pour cet événement ?",
        inputMode: "hybrid",
        suggestions: [
          "Nous avons une ébauche de programme : accueil à 18h, discours officiels à 18h30, buffet à 19h, puis une soirée animée avec musique et possibilité de danser. Nous réfléchissons encore à quelques animations surprises.",
          "Le programme de la conférence est quasiment finalisé : sessions plénières le matin, ateliers thématiques l'après-midi, et une table ronde avec des experts pour clôturer. Nous cherchons encore un intervenant principal.",
          "Nous avons des idées mais rien de définitif. Nous prévoyons des témoignages, une vente aux enchères et une petite performance artistique, mais l'ordre et la durée de ces activités ne sont pas encore déterminés."
        ],
        hints: "Décrivez le programme prévu pour votre événement, même s'il n'est pas encore définitif.",
        expectedKeywords: ["programme", "accueil", "discours", "buffet", "animée", "sessions", "ateliers", "table ronde", "témoignages", "vente"],
        feedback: {
          correct: "Votre programme semble bien pensé. Comment envisagez-vous de gérer les invitations et la communication autour de l'événement ?",
          partial: "C'est un bon début. Avez-vous estimé la durée de chaque activité pour vous assurer que tout s'enchaîne bien ?",
          incorrect: "Indiquez si vous avez déjà prévu un programme d'activités pour votre événement."
        }
      },
      {
        id: 6,
        botMessage: "Comment prévoyez-vous de gérer les invitations et la communication autour de votre événement ?",
        inputMode: "freeText",
        suggestions: [
          "Nous allons envoyer des invitations personnalisées par email trois semaines avant l'événement, avec relance une semaine avant. Nous utiliserons aussi nos réseaux sociaux et le bouche-à-oreille pour élargir l'audience.",
          "Nous avons créé un site web dédié à l'événement avec un formulaire d'inscription en ligne. La promotion se fera via une campagne sur LinkedIn et par des emails ciblés à notre base de contacts professionnels.",
          "Pour les invitations, nous utiliserons un service en ligne qui permet de suivre les confirmations de présence. Nous prévoyons également des affiches dans les lieux stratégiques et un communiqué de presse local."
        ],
        hints: "Expliquez votre stratégie pour les invitations et la communication autour de l'événement.",
        expectedKeywords: ["invitations", "email", "réseaux sociaux", "site web", "inscription", "promotion", "campagne", "confirmations", "affiches", "communiqué"],
        acceptablePhrases: [
          "nous allons envoyer",
          "nous avons créé",
          "nous utiliserons",
          "la promotion se fera",
          "nous prévoyons"
        ],
        feedback: {
          correct: "Votre stratégie de communication semble bien structurée. Quels défis ou problèmes potentiels anticipez-vous dans l'organisation de cet événement ?",
          partial: "C'est une bonne approche. Avez-vous prévu un système pour gérer les réponses et confirmer les présences ?",
          incorrect: "Décrivez comment vous comptez gérer les invitations et faire connaître votre événement."
        }
      },
      {
        id: 7,
        botMessage: "Quels défis ou problèmes potentiels anticipez-vous dans l'organisation de cet événement et comment prévoyez-vous d'y faire face ?",
        inputMode: "suggestions",
        suggestions: [
          "Notre principal souci est le respect du budget car les coûts augmentent. Nous prévoyons de chercher des sponsors supplémentaires et d'optimiser certaines dépenses, comme la décoration, en sollicitant des talents internes.",
          "La gestion du temps me préoccupe, car nous avons un calendrier serré. Nous avons créé un rétroplanning détaillé avec des points d'étape hebdomadaires pour nous assurer que tout avance correctement.",
          "Je m'inquiète du taux de participation réel par rapport aux inscriptions. Pour éviter les désistements de dernière minute, nous envisageons une caution symbolique et des rappels réguliers avant l'événement."
        ],
        hints: "Identifiez les défis principaux que vous anticipez et expliquez comment vous comptez les gérer.",
        expectedKeywords: ["budget", "coûts", "sponsors", "temps", "calendrier", "rétroplanning", "participation", "inscriptions", "désistements", "caution"],
        feedback: {
          correct: "Ce sont des préoccupations légitimes et vos solutions semblent pertinentes. Avez-vous prévu un plan d'évaluation pour mesurer le succès de votre événement ?",
          incorrect: "Mentionnez quels problèmes potentiels vous anticipez dans l'organisation et comment vous prévoyez de les résoudre."
        }
      },
      {
        id: 8,
        botMessage: "Pour finir, comment prévoyez-vous d'évaluer le succès de votre événement une fois qu'il sera terminé ?",
        inputMode: "hybrid",
        suggestions: [
          "Nous distribuerons un questionnaire de satisfaction aux participants et mesurerons le taux de participation réel. Pour une collecte de fonds, le montant récolté sera évidemment un indicateur clé de réussite.",
          "Nous analyserons plusieurs critères : le nombre de participants, les retombées médiatiques, les nouveaux contacts établis et les commentaires sur les réseaux sociaux. Un débriefing avec l'équipe complètera cette évaluation.",
          "Le succès sera mesuré principalement par les retours qualitatifs des participants et l'atteinte de nos objectifs initiaux. Nous prévoyons également une réunion de bilan avec toutes les parties prenantes."
        ],
        hints: "Expliquez comment vous comptez évaluer si votre événement a été un succès.",
        expectedKeywords: ["questionnaire", "satisfaction", "taux", "participation", "montant", "analyserons", "critères", "retombées", "commentaires", "débriefing"],
        feedback: {
          correct: "Excellent ! Votre approche d'évaluation vous permettra d'apprendre de cette expérience pour vos futurs événements. Merci pour tous ces détails sur votre organisation. Je vous souhaite beaucoup de succès !",
          partial: "C'est une bonne méthode d'évaluation. Prévoyez-vous de documenter ces apprentissages pour vos futurs événements ?",
          incorrect: "Indiquez comment vous comptez mesurer le succès de votre événement une fois qu'il sera terminé."
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à planifier un événement collectif en français, en abordant tous les aspects de l'organisation, de la logistique et de la coordination.",
    learningObjectives: [
      "Discuter des aspects logistiques d'un événement",
      "Expliquer la répartition des tâches et responsabilités",
      "Présenter un programme d'activités",
      "Élaborer une stratégie de communication",
      "Anticiper et résoudre des problèmes potentiels"
    ],
    grammar: {
      points: [
        "Futur simple et futur proche",
        "Expressions de temps et de séquence",
        "Conditionnel pour les hypothèses",
        "Tournures impersonnelles pour les recommandations"
      ]
    }
  };
  
  export default planningEvent;