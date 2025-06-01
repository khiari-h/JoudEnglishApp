// chatbot/A2/scenarios/atTheDoctorSpecialist.js

const atTheDoctorSpecialist = {
    id: 6,
    title: "At The Doctor Specialist",
    level: "A2",
    description: "Learn how to consult a medical specialist and explain specific health problems.",
    estimatedTime: "15-20 minutes",
    vocabulary: ["symptômes", "douleur", "traitement", "médicament", "ordonnance", "analyses", "allergie", "spécialiste", "consultation", "rendez-vous"],
    steps: [
      {
        id: 1,
        botMessage: "Bonjour, je suis le Docteur Moreau, cardiologue. Asseyez-vous, je vous en prie. Qu'est-ce qui vous amène aujourd'hui ?",
        inputMode: "suggestions",
        suggestions: [
          "Bonjour Docteur. J'ai des douleurs à la poitrine depuis quelques jours.",
          "Bonjour. Mon médecin traitant m'a envoyé chez vous pour un contrôle.",
          "Bonjour Docteur. J'ai des problèmes de palpitations cardiaques."
        ],
        hints: "Saluez le médecin et expliquez brièvement pourquoi vous consultez.",
        expectedKeywords: ["bonjour", "docteur", "douleurs", "poitrine", "médecin", "traitant", "envoyé", "contrôle", "palpitations"],
        feedback: {
          correct: "Je comprends. Depuis combien de temps avez-vous ces symptômes ?",
          incorrect: "Bonjour. Pouvez-vous m'expliquer pourquoi vous consultez aujourd'hui ?"
        }
      },
      {
        id: 2,
        botMessage: "Depuis combien de temps ressentez-vous ces symptômes ?",
        inputMode: "hybrid",
        suggestions: [
          "Depuis environ deux semaines.",
          "Ça a commencé il y a trois jours, après un effort physique.",
          "C'est régulier depuis plusieurs mois, mais ça s'est aggravé récemment."
        ],
        hints: "Précisez depuis quand vous avez ces symptômes.",
        expectedKeywords: ["depuis", "semaines", "jours", "mois", "commencé", "régulier", "aggravé", "récemment", "effort"],
        acceptablePhrases: [
          "depuis",
          "ça a commencé",
          "c'est régulier",
          "il y a"
        ],
        feedback: {
          correct: "D'accord. Pouvez-vous décrire précisément ces douleurs ou symptômes ?",
          partial: "Ces symptômes sont-ils constants ou apparaissent-ils à certains moments ?",
          incorrect: "J'ai besoin de savoir depuis combien de temps vous avez ces symptômes."
        }
      },
      {
        id: 3,
        botMessage: "Pouvez-vous décrire plus précisément vos symptômes ? Où ressentez-vous la douleur exactement ?",
        inputMode: "freeText",
        suggestions: [
          "C'est une douleur au milieu de la poitrine, comme une pression.",
          "J'ai des palpitations surtout quand je monte les escaliers ou après un effort.",
          "Je sens comme un pincement du côté gauche et parfois j'ai du mal à respirer."
        ],
        hints: "Décrivez précisément vos symptômes et leur localisation.",
        expectedKeywords: ["douleur", "poitrine", "palpitations", "effort", "pincement", "gauche", "respirer", "pression", "milieu"],
        feedback: {
          correct: "Je vois. Est-ce que cette douleur irradie vers d'autres parties du corps ?",
          partial: "Cette douleur est-elle constante ou intermittente ?",
          incorrect: "Décrivez plus précisément où vous ressentez la douleur et comment elle se manifeste."
        }
      },
      {
        id: 4,
        botMessage: "Est-ce que vous prenez actuellement des médicaments ?",
        inputMode: "suggestions",
        suggestions: [
          "Non, je ne prends aucun médicament régulièrement.",
          "Oui, je prends des médicaments pour l'hypertension.",
          "Seulement des vitamines et parfois des analgésiques pour les maux de tête."
        ],
        hints: "Indiquez si vous prenez des médicaments et lesquels.",
        expectedKeywords: ["médicaments", "prends", "hypertension", "vitamines", "analgésiques", "régulièrement", "aucun", "non"],
        feedback: {
          correct: "Merci pour ces informations. Avez-vous des allergies médicamenteuses connues ?",
          incorrect: "Veuillez m'indiquer si vous prenez actuellement des médicaments."
        }
      },
      {
        id: 5,
        botMessage: "Avez-vous des antécédents médicaux personnels ou familiaux de maladies cardiaques ?",
        inputMode: "hybrid",
        suggestions: [
          "Mon père a eu un infarctus à 60 ans.",
          "Non, pas à ma connaissance.",
          "J'ai déjà eu des problèmes d'arythmie il y a quelques années."
        ],
        hints: "Mentionnez vos antécédents médicaux personnels ou familiaux.",
        expectedKeywords: ["antécédents", "père", "mère", "infarctus", "problèmes", "cardiaques", "arythmie", "connaissance", "familiaux"],
        feedback: {
          correct: "Je vous remercie pour ces informations. Je vais maintenant vous examiner.",
          partial: "Y a-t-il d'autres antécédents médicaux importants à signaler ?",
          incorrect: "Veuillez me dire si vous ou votre famille avez des antécédents de maladies cardiaques."
        }
      },
      {
        id: 6,
        botMessage: "Je vais vous examiner maintenant. Je vais écouter votre cœur et prendre votre tension. Respirez normalement... Votre tension est un peu élevée, à 15/9. Je vais vous prescrire un électrocardiogramme et une prise de sang.",
        inputMode: "freeText",
        suggestions: [
          "Est-ce que c'est grave, docteur ?",
          "Quand dois-je faire ces examens ?",
          "Que recherchez-vous avec ces examens ?"
        ],
        hints: "Posez une question sur votre état ou les examens prescrits.",
        expectedKeywords: ["grave", "docteur", "quand", "examens", "recherchez", "faire", "électrocardiogramme", "sang", "tension"],
        acceptablePhrases: [
          "est-ce que",
          "quand dois-je",
          "que recherchez-vous",
          "c'est grave"
        ],
        feedback: {
          correct: "Il n'y a pas d'inquiétude immédiate, mais ces examens nous permettront d'avoir une vision plus précise.",
          partial: "Ces examens sont standard pour évaluer votre situation cardiaque.",
          incorrect: "Avez-vous des questions sur votre état ou les examens que je vous prescris ?"
        }
      },
      {
        id: 7,
        botMessage: "En attendant les résultats des examens, je vais vous prescrire un médicament pour réguler votre tension artérielle. Prenez une pilule chaque matin. Avez-vous des questions sur ce traitement ?",
        inputMode: "suggestions",
        suggestions: [
          "Y a-t-il des effets secondaires à ce médicament ?",
          "Combien de temps dois-je prendre ce traitement ?",
          "Puis-je continuer mes activités sportives avec ce médicament ?"
        ],
        hints: "Posez une question sur le traitement prescrit.",
        expectedKeywords: ["effets", "secondaires", "combien", "temps", "traitement", "continuer", "activités", "sportives", "médicament"],
        feedback: {
          correct: "Les effets secondaires possibles sont des maux de tête ou des vertiges légers au début du traitement.",
          incorrect: "Avez-vous des questions sur le médicament prescrit ?"
        }
      },
      {
        id: 8,
        botMessage: "Très bien. Je vous revois dans deux semaines avec les résultats de vos examens. D'ici là, si vos douleurs s'intensifient ou si vous avez d'autres symptômes, n'hésitez pas à me contacter ou à consulter les urgences. Avez-vous d'autres questions ?",
        inputMode: "hybrid",
        suggestions: [
          "Non, merci docteur. À dans deux semaines.",
          "Dois-je modifier mon alimentation en attendant ?",
          "Comment puis-je prendre rendez-vous pour les examens ?"
        ],
        hints: "Posez une dernière question ou remerciez le médecin.",
        expectedKeywords: ["merci", "docteur", "alimentation", "rendez-vous", "examens", "prendre", "modifier", "deux", "semaines"],
        feedback: {
          correct: "Très bien. Voici votre ordonnance. La secrétaire va vous aider pour les rendez-vous d'examens. Au revoir et prenez soin de vous.",
          partial: "Je vous conseille de limiter le sel et les graisses saturées. Voici votre ordonnance.",
          incorrect: "Avez-vous une dernière question avant de terminer la consultation ?"
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à consulter un médecin spécialiste en français et à expliquer vos symptômes.",
    learningObjectives: [
      "Décrire des symptômes médicaux précis",
      "Comprendre les instructions d'un médecin",
      "Parler de son historique médical",
      "Poser des questions sur un traitement",
      "Comprendre une ordonnance médicale"
    ],
    grammar: {
      points: [
        "Expressions de durée et de fréquence",
        "Verbes de sensation (ressentir, avoir mal)",
        "Impératif pour suivre des instructions",
        "Questions avec inversion"
      ]
    }
  };

  export default atTheDoctorSpecialist;
