// chatbot/A2/scenarios/meetingFriendOfFriend.js

const meetingFriendOfFriend = {
    id: 12,
    title: "Meeting Friend of Friend",
    level: "A2",
    description: "Learn how to make acquaintance with a new person through mutual friends.",
    estimatedTime: "15-20 minutes",
    vocabulary: ["présentation", "rencontre", "ami commun", "connaître", "intérêts", "passion", "en commun", "métier", "étudier", "discuter"],
    steps: [
      {
        id: 1,
        botMessage: "Salut ! Je m'appelle Thomas. Je suis un ami de Marie. Elle m'a beaucoup parlé de toi !",
        inputMode: "suggestions",
        suggestions: [
          "Bonjour Thomas, enchanté(e) ! Je m'appelle... Marie m'a aussi parlé de toi.",
          "Salut ! Ravi(e) de te rencontrer enfin. Comment connais-tu Marie ?",
          "Ah, tu es Thomas ! Marie m'a dit que tu serais là ce soir. Je suis..."
        ],
        hints: "Saluez la personne, présentez-vous et montrez que vous connaissez Marie.",
        expectedKeywords: ["bonjour", "salut", "enchanté", "ravi", "rencontrer", "connais", "marie", "appelle", "parlé", "soir"],
        feedback: {
          correct: "Enchanté(e) aussi ! Marie et moi, on se connaît depuis l'université.",
          incorrect: "N'oubliez pas de vous présenter et de mentionner notre amie commune, Marie."
        }
      },
      {
        id: 2,
        botMessage: "Marie et moi, on s'est rencontrés à l'université il y a 5 ans. Et toi, comment la connais-tu ?",
        inputMode: "hybrid",
        suggestions: [
          "On travaille ensemble depuis deux ans dans la même entreprise.",
          "On s'est rencontrés lors d'un cours de yoga l'année dernière.",
          "C'est ma voisine, on habite dans le même immeuble depuis trois ans."
        ],
        hints: "Expliquez comment vous avez rencontré Marie.",
        expectedKeywords: ["travaille", "ensemble", "entreprise", "rencontrés", "cours", "yoga", "voisine", "habite", "immeuble", "ans"],
        acceptablePhrases: [
          "on travaille ensemble",
          "on s'est rencontrés",
          "c'est ma voisine",
          "on habite dans"
        ],
        feedback: {
          correct: "Oh, c'est intéressant ! Marie m'a dit que tu étais très sympa. Qu'est-ce que tu fais dans la vie ?",
          partial: "Marie ne m'avait pas raconté cette histoire, c'est amusant !",
          incorrect: "Expliquez comment vous avez fait la connaissance de Marie."
        }
      },
      {
        id: 3,
        botMessage: "Marie m'a dit que tu avais un travail intéressant. Qu'est-ce que tu fais comme métier ?",
        inputMode: "freeText",
        suggestions: [
          "Je suis ingénieur informatique dans une startup qui développe des applications médicales.",
          "Je travaille comme professeur de langues dans un lycée international.",
          "Actuellement, je suis étudiant(e) en master de psychologie et je fais un stage dans un hôpital."
        ],
        hints: "Parlez de votre métier ou de vos études actuelles.",
        expectedKeywords: ["suis", "travaille", "ingénieur", "professeur", "étudiant", "startup", "langues", "psychologie", "stage", "master"],
        feedback: {
          correct: "Ça a l'air passionnant ! Moi, je travaille dans le marketing digital.",
          partial: "Tu aimes ce que tu fais ? Ça doit être un domaine enrichissant.",
          incorrect: "Parlez de votre profession ou de vos études."
        }
      },
      {
        id: 4,
        botMessage: "Moi, je travaille dans le marketing digital. C'est parfois stressant, mais j'aime beaucoup ce que je fais. Tu habites dans quel quartier de la ville ?",
        inputMode: "suggestions",
        suggestions: [
          "J'habite dans le centre-ville, près de la place principale.",
          "Je vis dans le quartier sud, c'est calme et il y a beaucoup d'espaces verts.",
          "J'ai un appartement à l'est, près du campus universitaire."
        ],
        hints: "Indiquez où vous habitez dans la ville.",
        expectedKeywords: ["habite", "vis", "appartement", "quartier", "centre-ville", "sud", "est", "calme", "près", "campus"],
        feedback: {
          correct: "Super, c'est un beau quartier ! Et ça fait longtemps que tu vis ici ?",
          incorrect: "Dites dans quelle partie de la ville vous habitez."
        }
      },
      {
        id: 5,
        botMessage: "Ça fait longtemps que tu habites ici ? Moi, j'ai déménagé l'année dernière.",
        inputMode: "hybrid",
        suggestions: [
          "Ça fait environ 3 ans que j'habite ici, je suis venu(e) pour le travail.",
          "Je suis né(e) ici, donc toute ma vie ! Je connais bien la ville.",
          "Non, je suis arrivé(e) il y a seulement 6 mois pour mes études."
        ],
        hints: "Précisez depuis combien de temps vous habitez dans cette ville.",
        expectedKeywords: ["fait", "ans", "habite", "venu", "travail", "né", "vie", "connais", "arrivé", "mois"],
        feedback: {
          correct: "Je vois ! Marie m'a dit que tu avais des passe-temps intéressants. Qu'est-ce que tu aimes faire pendant ton temps libre ?",
          partial: "C'est toujours une expérience intéressante de s'installer dans une nouvelle ville.",
          incorrect: "Dites depuis combien de temps vous vivez dans cette ville."
        }
      },
      {
        id: 6,
        botMessage: "Et qu'est-ce que tu aimes faire pendant ton temps libre ? Tu as des hobbies ou des passions ?",
        inputMode: "freeText",
        suggestions: [
          "J'adore la photographie, surtout les paysages naturels. Je fais aussi du vélo le week-end.",
          "Je suis passionné(e) de cuisine, j'aime tester de nouvelles recettes et recevoir des amis.",
          "Je joue d'un instrument de musique et je fais partie d'un groupe amateur."
        ],
        hints: "Parlez de vos hobbies et activités de loisirs.",
        expectedKeywords: ["adore", "passionné", "aime", "photographie", "vélo", "cuisine", "recettes", "instrument", "musique", "groupe"],
        acceptablePhrases: [
          "j'adore",
          "je suis passionné",
          "j'aime",
          "je fais",
          "je joue"
        ],
        feedback: {
          correct: "C'est super intéressant ! Moi aussi j'aime beaucoup l'art et la musique.",
          partial: "Ça a l'air vraiment passionnant ! Tu fais ça depuis longtemps ?",
          incorrect: "Parlez de vos activités préférées pendant votre temps libre."
        }
      },
      {
        id: 7,
        botMessage: "J'adore aussi la musique et je vais souvent à des concerts. Marie m'a dit que tu avais voyagé récemment. Tu es allé(e) où ?",
        inputMode: "suggestions",
        suggestions: [
          "J'ai visité l'Italie pendant deux semaines cet été, c'était magnifique.",
          "Je reviens d'un voyage au Portugal, j'ai adoré la cuisine et les plages.",
          "Je n'ai pas beaucoup voyagé récemment, mais j'aimerais aller au Japon l'année prochaine."
        ],
        hints: "Parlez d'un voyage récent ou de vos projets de voyage.",
        expectedKeywords: ["visité", "italie", "voyage", "portugal", "adoré", "voyagé", "récemment", "japon", "année", "prochaine"],
        feedback: {
          correct: "Oh, c'est un endroit magnifique ! J'aimerais y aller un jour. Tu as des photos ?",
          incorrect: "Parlez d'un voyage que vous avez fait ou que vous aimeriez faire."
        }
      },
      {
        id: 8,
        botMessage: "Dis-moi, est-ce que tu connais d'autres personnes à cette soirée ou tu es venu(e) uniquement pour voir Marie ?",
        inputMode: "hybrid",
        suggestions: [
          "Je connais surtout Marie et deux autres amis qui doivent arriver plus tard.",
          "Non, je ne connais que Marie, mais je suis content(e) de faire de nouvelles rencontres comme toi !",
          "En fait, je connais presque tout le monde ici, on travaille tous dans le même domaine."
        ],
        hints: "Indiquez qui vous connaissez à cette soirée et montrez votre intérêt à rencontrer de nouvelles personnes.",
        expectedKeywords: ["connais", "marie", "amis", "arriver", "nouvelles", "rencontres", "content", "domaine", "travaille", "tout le monde"],
        feedback: {
          correct: "C'est super de rencontrer de nouvelles personnes ! Si tu veux, je peux te présenter à quelques amis qui sont là ce soir.",
          partial: "Les amis de Marie sont généralement très sympas, tu devrais passer une bonne soirée.",
          incorrect: "Dites qui vous connaissez à cette soirée et si vous êtes ouvert(e) à rencontrer d'autres personnes."
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à faire connaissance avec une nouvelle personne en français.",
    learningObjectives: [
      "Se présenter et réagir à une présentation",
      "Parler de la façon dont on a rencontré des amis communs",
      "Discuter de son métier et lieu de résidence",
      "Échanger sur ses centres d'intérêt et voyages",
      "Entretenir une conversation sociale"
    ],
    grammar: {
      points: [
        "Utilisation du passé composé pour les événements passés",
        "Questions directes et indirectes",
        "Expressions de durée (ça fait, depuis)",
        "Verbes d'opinion au présent"
      ]
    }
  };
  
  export default meetingFriendOfFriend;