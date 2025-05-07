// chatbot/A2/scenarios/jobInterview.js

const jobInterview = {
    id: 4,
    title: "Job Interview",
    level: "A2",
    description: "Learn how to answer basic job interview questions and present your skills and experience.",
    estimatedTime: "15-20 minutes",
    vocabulary: ["CV", "expérience", "qualifications", "compétences", "disponibilité", "salaire", "poste", "études", "entreprise", "candidature"],
    steps: [
      {
        id: 1,
        botMessage: "Bonjour, bienvenue chez InfoTech. Je suis Mme Dubois, responsable des ressources humaines. Asseyez-vous, je vous en prie. Comment allez-vous aujourd'hui ?",
        inputMode: "suggestions",
        suggestions: [
          "Bonjour Madame, je vais bien merci. Je suis heureux(se) d'être ici.",
          "Très bien, merci. Je suis content(e) de vous rencontrer.",
          "Un peu nerveux(se), mais ça va. Merci de me recevoir."
        ],
        hints: "Répondez à la salutation et exprimez votre état d'esprit.",
        expectedKeywords: ["bonjour", "bien", "merci", "content", "heureux", "nerveux", "rencontrer", "recevoir"],
        feedback: {
          correct: "Parfait. Commençons l'entretien.",
          incorrect: "N'oubliez pas de saluer la personne et de dire comment vous vous sentez."
        }
      },
      {
        id: 2,
        botMessage: "Pouvez-vous vous présenter brièvement et me parler de votre parcours ?",
        inputMode: "hybrid",
        suggestions: [
          "Je m'appelle... et j'ai... ans. J'ai étudié... et j'ai travaillé comme...",
          "Je suis... J'ai un diplôme en... et trois ans d'expérience dans...",
          "Bien sûr. J'ai terminé mes études en... et j'ai commencé à travailler dans..."
        ],
        hints: "Présentez-vous et parlez brièvement de vos études et expériences.",
        expectedKeywords: ["appelle", "étudié", "diplôme", "expérience", "travaillé", "ans", "études", "commencé"],
        acceptablePhrases: [
          "je m'appelle",
          "j'ai étudié",
          "j'ai travaillé",
          "j'ai un diplôme",
          "j'ai terminé"
        ],
        feedback: {
          correct: "Merci pour cette présentation. Pourquoi êtes-vous intéressé(e) par ce poste chez nous ?",
          partial: "Pouvez-vous me préciser votre expérience professionnelle ?",
          incorrect: "Présentez-vous et parlez de votre parcours professionnel."
        }
      },
      {
        id: 3,
        botMessage: "Pourquoi êtes-vous intéressé(e) par ce poste dans notre entreprise ?",
        inputMode: "freeText",
        suggestions: [
          "Votre entreprise a une excellente réputation et ce poste correspond parfaitement à mes compétences.",
          "J'admire les projets de votre entreprise et je souhaite développer mes compétences dans ce domaine.",
          "Ce poste représente une évolution logique dans ma carrière et votre entreprise est leader dans ce secteur."
        ],
        hints: "Expliquez votre motivation pour ce poste et cette entreprise.",
        expectedKeywords: ["intéressé", "motivation", "entreprise", "poste", "compétences", "projets", "carrière", "développer"],
        feedback: {
          correct: "Merci pour votre intérêt. Quelles sont vos principales compétences professionnelles ?",
          partial: "Qu'est-ce qui vous attire spécifiquement dans notre entreprise ?",
          incorrect: "Expliquez pourquoi vous voulez travailler ici."
        }
      },
      {
        id: 4,
        botMessage: "Quelles sont vos principales compétences pour ce poste ?",
        inputMode: "suggestions",
        suggestions: [
          "Je suis organisé(e), je travaille bien en équipe et j'ai de l'expérience en gestion de projets.",
          "Je parle trois langues et j'ai d'excellentes compétences en communication et en informatique.",
          "Je suis très autonome, créatif(ve) et j'apprends rapidement."
        ],
        hints: "Décrivez vos principales compétences professionnelles.",
        expectedKeywords: ["compétences", "organisé", "équipe", "langues", "communication", "autonome", "expérience", "informatique"],
        feedback: {
          correct: "Ces compétences sont très pertinentes pour le poste. Quelle est votre expérience la plus importante ?",
          incorrect: "Parlez de vos compétences professionnelles principales."
        }
      },
      {
        id: 5,
        botMessage: "Pouvez-vous me parler d'une expérience professionnelle dont vous êtes fier(ère) ?",
        inputMode: "hybrid",
        suggestions: [
          "Dans mon dernier poste, j'ai dirigé un projet qui a augmenté les ventes de 15%.",
          "J'ai résolu un problème important pour un client, ce qui a renforcé notre relation commerciale.",
          "J'ai créé une nouvelle méthode de travail qui a amélioré l'efficacité de l'équipe."
        ],
        hints: "Décrivez une réalisation professionnelle importante.",
        expectedKeywords: ["projet", "résolu", "problème", "améliorer", "équipe", "client", "créé", "dirigé"],
        feedback: {
          correct: "C'est très impressionnant. Quelles sont vos disponibilités si vous êtes sélectionné(e) ?",
          partial: "Quels ont été les résultats concrets de cette expérience ?",
          incorrect: "Racontez une expérience professionnelle réussie."
        }
      },
      {
        id: 6,
        botMessage: "Quelles sont vos disponibilités ? Quand pourriez-vous commencer ?",
        inputMode: "freeText",
        suggestions: [
          "Je suis disponible immédiatement.",
          "Je dois respecter un préavis d'un mois avec mon employeur actuel.",
          "Je peux commencer à partir du 15 du mois prochain."
        ],
        hints: "Indiquez quand vous pourriez commencer à travailler.",
        expectedKeywords: ["disponible", "immédiatement", "préavis", "commencer", "mois", "partir", "employeur", "actuel"],
        acceptablePhrases: [
          "je suis disponible",
          "je peux commencer",
          "à partir de",
          "je dois respecter"
        ],
        feedback: {
          correct: "Parfait, c'est noté. Avez-vous des questions sur le poste ou l'entreprise ?",
          partial: "Y a-t-il des contraintes particulières concernant vos horaires ?",
          incorrect: "Dites-moi quand vous pourriez commencer à travailler."
        }
      },
      {
        id: 7,
        botMessage: "Avez-vous des questions concernant le poste ou notre entreprise ?",
        inputMode: "suggestions",
        suggestions: [
          "Quelles seraient mes principales responsabilités au quotidien ?",
          "Comment se déroule la période d'intégration dans l'entreprise ?",
          "Y a-t-il des possibilités d'évolution au sein de l'entreprise ?"
        ],
        hints: "Posez une question sur le poste ou l'entreprise.",
        expectedKeywords: ["responsabilités", "intégration", "évolution", "équipe", "projets", "formation", "horaires", "salaire"],
        feedback: {
          correct: "Excellente question. Pour terminer, quelles sont vos attentes en termes de salaire ?",
          incorrect: "N'hésitez pas à poser une question sur le travail ou l'entreprise."
        }
      },
      {
        id: 8,
        botMessage: "Quelles sont vos attentes salariales pour ce poste ?",
        inputMode: "hybrid",
        suggestions: [
          "J'espère un salaire entre 2500 et 3000 euros brut par mois.",
          "Quel est le salaire habituellement proposé pour ce type de poste ?",
          "Je suis ouvert(e) à la discussion, mais j'aimerais au moins 30 000 euros annuels."
        ],
        hints: "Indiquez vos attentes salariales ou demandez des informations sur le salaire.",
        expectedKeywords: ["salaire", "euros", "mois", "annuel", "attentes", "proposé", "discussion", "minimum"],
        feedback: {
          correct: "Merci pour ces informations. Nous avons terminé l'entretien. Nous vous recontacterons très prochainement.",
          partial: "Ce montant correspond à notre fourchette pour ce poste.",
          incorrect: "Parlez de vos attentes concernant le salaire."
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à répondre aux questions d'un entretien d'embauche en français.",
    learningObjectives: [
      "Se présenter professionnellement",
      "Parler de ses compétences et expériences",
      "Exprimer ses motivations",
      "Comprendre et répondre aux questions d'entretien",
      "Parler de salaire et disponibilités"
    ],
    grammar: {
      points: [
        "Passé composé pour les expériences",
        "Présent pour les compétences actuelles",
        "Conditionnel pour exprimer des souhaits",
        "Adjectifs qualificatifs professionnels"
      ]
    }
  };
  
  export default jobInterview;