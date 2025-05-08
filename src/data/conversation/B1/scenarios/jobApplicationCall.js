// chatbot/B1/scenarios/jobApplicationCall.js

const jobApplicationCall = {
    id: 1,
    title: "Job Application Call",
    level: "B1",
    description: "Learn how to call to apply for a job, explain your qualifications and arrange an interview.",
    estimatedTime: "15-20 minutes",
    vocabulary: ["candidature", "poste", "CV", "expérience", "compétences", "entretien", "disponibilité", "recrutement", "qualifications", "motivation"],
    steps: [
      {
        id: 1,
        botMessage: "Entreprise TechSolutions, bonjour. Marie Dupont à l'appareil, que puis-je faire pour vous ?",
        inputMode: "suggestions",
        suggestions: [
          "Bonjour Madame, je m'appelle... Je vous appelle au sujet de l'annonce pour le poste de développeur web que j'ai vue sur votre site.",
          "Bonjour, je souhaiterais parler à la personne responsable du recrutement concernant une offre d'emploi.",
          "Bonjour, je me permets de vous contacter car je suis intéressé(e) par le poste d'assistant marketing que vous proposez."
        ],
        hints: "Saluez et présentez-vous en indiquant la raison précise de votre appel.",
        expectedKeywords: ["bonjour", "appelle", "sujet", "annonce", "poste", "intéressé", "recrutement", "offre", "emploi", "développeur"],
        feedback: {
          correct: "Oui, bien sûr. Je suis justement responsable du recrutement pour ce poste. Puis-je avoir votre nom complet ?",
          incorrect: "Pourriez-vous préciser pour quel poste vous appelez et comment vous avez eu connaissance de cette offre ?"
        }
      },
      {
        id: 2,
        botMessage: "Très bien. Pourriez-vous me dire comment vous avez découvert cette offre d'emploi et pourquoi ce poste vous intéresse ?",
        inputMode: "hybrid",
        suggestions: [
          "J'ai découvert cette offre sur le site Emploi.fr et ce poste m'intéresse car il correspond parfaitement à mes compétences en développement et à mon expérience dans le secteur technologique.",
          "Un ami qui travaille dans votre entreprise m'a parlé de ce poste. Je suis particulièrement attiré(e) par les projets innovants sur lesquels vous travaillez.",
          "J'ai vu votre annonce sur LinkedIn. Ce qui m'attire dans ce poste, c'est la possibilité de travailler sur des projets internationaux et de développer mes compétences en management."
        ],
        hints: "Expliquez comment vous avez trouvé l'offre et pourquoi ce poste vous intéresse particulièrement.",
        expectedKeywords: ["découvert", "offre", "site", "intéresse", "correspond", "compétences", "expérience", "ami", "projets", "attiré"],
        acceptablePhrases: [
          "j'ai découvert",
          "ce poste m'intéresse",
          "ce qui m'attire",
          "j'ai vu votre annonce"
        ],
        feedback: {
          correct: "Merci pour ces précisions. Pourriez-vous me parler brièvement de votre parcours professionnel et de vos qualifications pour ce poste ?",
          partial: "Je vois. Et quelles compétences particulières pensez-vous pouvoir apporter à notre entreprise ?",
          incorrect: "Pourriez-vous me dire comment vous avez trouvé notre offre d'emploi et ce qui vous intéresse dans ce poste ?"
        }
      },
      {
        id: 3,
        botMessage: "Pourriez-vous me parler de votre expérience professionnelle et des compétences que vous pourriez apporter à notre entreprise ?",
        inputMode: "freeText",
        suggestions: [
          "J'ai travaillé pendant trois ans comme développeur dans une agence web où j'ai géré des projets pour de grands clients. Mes compétences en programmation et en résolution de problèmes seraient un atout pour votre équipe.",
          "Après avoir obtenu mon master en marketing digital, j'ai occupé un poste d'assistant marketing pendant deux ans où j'ai développé des campagnes qui ont augmenté les ventes de 20%. Je maîtrise les outils d'analyse et les réseaux sociaux.",
          "J'ai cinq ans d'expérience en tant que chef de projet dans le secteur technologique. Je suis particulièrement compétent(e) dans la gestion d'équipe et l'optimisation des processus, ce qui pourrait être bénéfique pour vos projets actuels."
        ],
        hints: "Présentez votre expérience professionnelle et vos compétences pertinentes pour le poste.",
        expectedKeywords: ["travaillé", "expérience", "développeur", "marketing", "projet", "compétences", "master", "gestion", "équipe", "années"],
        feedback: {
          correct: "Votre expérience semble très pertinente pour notre poste. Avez-vous déjà envoyé votre CV ou souhaitez-vous le faire ?",
          partial: "Ces compétences sont intéressantes. Dans quels secteurs d'activité avez-vous travaillé précisément ?",
          incorrect: "Pourriez-vous me donner plus de détails sur votre parcours professionnel et vos compétences ?"
        }
      },
      {
        id: 4,
        botMessage: "Avez-vous déjà envoyé votre CV ou souhaitez-vous me l'envoyer par email ?",
        inputMode: "suggestions",
        suggestions: [
          "Je n'ai pas encore envoyé mon CV. Je peux vous l'envoyer dès aujourd'hui par email. Quelle est l'adresse à utiliser ?",
          "J'ai déjà soumis mon CV sur votre site web hier, au nom de... Vous devriez l'avoir dans votre système.",
          "Je préfèrerais vous l'envoyer directement après notre appel. Puis-je avoir votre adresse email professionnelle ?"
        ],
        hints: "Indiquez si vous avez déjà envoyé votre CV et comment vous comptez le faire parvenir.",
        expectedKeywords: ["envoyé", "CV", "email", "adresse", "soumis", "site", "système", "directement", "appel", "aujourd'hui"],
        feedback: {
          correct: "Parfait. Vous pouvez m'envoyer votre CV à recrutement@techsolutions.fr. Quelles sont vos disponibilités pour un entretien ?",
          incorrect: "Dites-moi si vous avez déjà envoyé votre CV ou si vous souhaitez le faire maintenant."
        }
      },
      {
        id: 5,
        botMessage: "Très bien. Quelles seraient vos disponibilités pour un entretien la semaine prochaine ? Nous proposons des créneaux lundi et mardi matin, ou jeudi après-midi.",
        inputMode: "hybrid",
        suggestions: [
          "Je suis disponible lundi matin à partir de 10h ou mardi matin à n'importe quelle heure qui vous conviendrait.",
          "Jeudi après-midi me conviendrait parfaitement. Je suis libre à partir de 14h.",
          "Je préfèrerais mardi matin si possible, vers 11h. Est-ce qu'un entretien en visioconférence est envisageable ?"
        ],
        hints: "Indiquez vos disponibilités pour l'entretien parmi les options proposées.",
        expectedKeywords: ["disponible", "lundi", "mardi", "jeudi", "matin", "après-midi", "heure", "partir", "conviendrait", "visioconférence"],
        feedback: {
          correct: "Parfait, nous pouvons donc convenir d'un entretien à ce moment-là. Préférez-vous un entretien en personne ou en visioconférence ?",
          partial: "Ce créneau pourrait être possible. Laissez-moi vérifier l'agenda et je vous confirmerai.",
          incorrect: "Pouvez-vous me préciser vos disponibilités parmi les créneaux proposés pour la semaine prochaine ?"
        }
      },
      {
        id: 6,
        botMessage: "D'accord pour cet horaire. S'agit-il d'un entretien en personne dans nos locaux ou préférez-vous une visioconférence ?",
        inputMode: "freeText",
        suggestions: [
          "Je préfèrerais un entretien en personne, si possible. Je trouve que c'est plus convivial pour faire connaissance.",
          "Une visioconférence serait plus pratique pour moi car je suis actuellement en déplacement. Quel logiciel utilisez-vous ?",
          "Je suis flexible et peux m'adapter aux deux formats. Quelle option est la plus adaptée à votre processus de recrutement ?"
        ],
        hints: "Indiquez si vous préférez un entretien en personne ou en visioconférence.",
        expectedKeywords: ["préfèrerais", "personne", "visioconférence", "pratique", "logiciel", "flexible", "adapter", "processus", "recrutement", "déplacement"],
        acceptablePhrases: [
          "je préfèrerais",
          "serait plus pratique",
          "je suis flexible",
          "je peux m'adapter"
        ],
        feedback: {
          correct: "C'est noté. Avez-vous des questions concernant le poste ou l'entreprise avant notre entretien ?",
          partial: "Je comprends votre préférence. Nous utilisons habituellement Zoom pour nos entretiens à distance.",
          incorrect: "Pourriez-vous préciser si vous préférez venir dans nos locaux ou faire l'entretien par visioconférence ?"
        }
      },
      {
        id: 7,
        botMessage: "Avant de terminer, avez-vous des questions sur le poste, l'entreprise ou le processus de recrutement ?",
        inputMode: "suggestions",
        suggestions: [
          "Pourriez-vous me donner plus d'informations sur l'équipe avec laquelle je travaillerais ?",
          "Quel est le processus de recrutement complet ? Y aura-t-il plusieurs entretiens ?",
          "Quelles sont les possibilités d'évolution au sein de votre entreprise pour ce poste ?"
        ],
        hints: "Posez une question pertinente sur le poste ou l'entreprise.",
        expectedKeywords: ["équipe", "travaillerais", "processus", "recrutement", "entretiens", "évolution", "entreprise", "poste", "informations", "possibilités"],
        feedback: {
          correct: "Excellente question. Notre processus comprend généralement deux entretiens : un premier avec moi et un second avec le responsable d'équipe et un membre de l'équipe technique.",
          incorrect: "Avez-vous des questions sur l'entreprise, le poste ou notre processus de recrutement ?"
        }
      },
      {
        id: 8,
        botMessage: "Parfait. Je vous remercie pour votre appel et votre intérêt pour notre entreprise. Je vous confirmerai notre rendez-vous par email après avoir reçu votre CV. Est-ce que cela vous convient ?",
        inputMode: "hybrid",
        suggestions: [
          "Oui, cela me convient parfaitement. Je vous envoie mon CV aujourd'hui et j'attends votre confirmation par email. Merci pour votre temps.",
          "C'est parfait. Je vous remercie pour ces informations et pour votre disponibilité. À bientôt pour l'entretien.",
          "Très bien. Y a-t-il autre chose que je devrais préparer pour l'entretien à part mon CV ?"
        ],
        hints: "Remerciez la personne et confirmez votre compréhension des prochaines étapes.",
        expectedKeywords: ["convient", "parfaitement", "envoie", "CV", "merci", "temps", "informations", "disponibilité", "bientôt", "entretien"],
        feedback: {
          correct: "Excellent. J'ai hâte de recevoir votre CV et de vous rencontrer lors de l'entretien. Je vous souhaite une excellente journée !",
          partial: "Pour l'entretien, pensez aussi à préparer quelques exemples concrets de vos réalisations professionnelles.",
          incorrect: "Veuillez confirmer si vous êtes d'accord avec ces prochaines étapes."
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à mener un appel téléphonique pour postuler à un emploi, en expliquant vos motivations et compétences, et en organisant un entretien.",
    learningObjectives: [
      "Initier un appel professionnel pour postuler à un emploi",
      "Présenter ses qualifications et son expérience",
      "Expliquer sa motivation pour un poste",
      "Organiser un entretien d'embauche",
      "Poser des questions pertinentes sur l'entreprise"
    ],
    grammar: {
      points: [
        "Conditionnel présent pour exprimer la politesse",
        "Questions formelles et indirectes",
        "Temps du passé pour décrire l'expérience",
        "Expressions de disponibilité et préférence"
      ]
    }
  };
  
  export default jobApplicationCall;