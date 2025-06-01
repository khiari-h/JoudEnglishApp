// chatbot/A2/scenarios/phoneProblems.js

const phoneProblems = {
    id: 11,
    title: "Phone Problems",
    level: "A2",
    description: "Learn how to report a technical problem by phone with a customer service.",
    estimatedTime: "15-20 minutes",
    vocabulary: ["problème technique", "service client", "facture", "contrat", "réclamation", "panne", "connexion", "résoudre", "dépanner", "assistance"],
    steps: [
      {
        id: 1,
        botMessage: "Service client de MobiPhone, bonjour. Je suis Thomas, comment puis-je vous aider aujourd'hui ?",
        inputMode: "suggestions",
        suggestions: [
          "Bonjour, j'ai un problème avec mon téléphone portable qui ne capte plus le réseau depuis hier.",
          "Bonjour, je vous appelle au sujet de ma dernière facture qui me semble incorrecte.",
          "Bonjour, j'ai besoin d'aide pour configurer ma messagerie vocale."
        ],
        hints: "Saluez et expliquez quel problème vous avez avec votre téléphone.",
        expectedKeywords: ["bonjour", "problème", "téléphone", "portable", "réseau", "facture", "incorrecte", "configurer", "messagerie", "aide"],
        feedback: {
          correct: "Je comprends. Pouvez-vous me donner plus de détails sur ce problème ?",
          incorrect: "Pourriez-vous me préciser quel est votre problème avec votre téléphone ou votre service ?"
        }
      },
      {
        id: 2,
        botMessage: "Je vais vous aider à résoudre ce problème. Pouvez-vous me confirmer votre nom et votre numéro de téléphone, s'il vous plaît ?",
        inputMode: "hybrid",
        suggestions: [
          "Je m'appelle Marie Dupont et mon numéro est le 06 12 34 56 78.",
          "Mon nom est Pierre Martin, numéro 07 98 76 54 32.",
          "C'est au nom de Sophie Lambert, avec le numéro 06 23 45 67 89."
        ],
        hints: "Donnez votre nom et numéro de téléphone.",
        expectedKeywords: ["appelle", "nom", "numéro", "06", "07", "téléphone", "martin", "dupont", "lambert"],
        acceptablePhrases: [
          "je m'appelle",
          "mon nom est",
          "c'est au nom de",
          "mon numéro est"
        ],
        feedback: {
          correct: "Merci pour ces informations. Depuis quand rencontrez-vous ce problème exactement ?",
          partial: "Pourriez-vous épeler votre nom de famille, s'il vous plaît ?",
          incorrect: "J'ai besoin de votre nom complet et de votre numéro de téléphone pour accéder à votre dossier."
        }
      },
      {
        id: 3,
        botMessage: "Depuis quand rencontrez-vous ce problème avec votre téléphone ?",
        inputMode: "freeText",
        suggestions: [
          "Le problème a commencé hier soir, vers 20h.",
          "Ça fait environ trois jours que ça ne fonctionne pas correctement.",
          "J'ai remarqué ce problème ce matin en me réveillant."
        ],
        hints: "Précisez depuis quand vous avez ce problème.",
        expectedKeywords: ["commencé", "hier", "jours", "matin", "soir", "remarqué", "environ", "fonctionner", "problème", "réveillant"],
        feedback: {
          correct: "D'accord. Avez-vous essayé de redémarrer votre téléphone ou de réinitialiser les paramètres réseau ?",
          partial: "Y a-t-il eu un événement particulier qui pourrait être lié à ce problème ?",
          incorrect: "J'ai besoin de savoir depuis quand exactement vous rencontrez ce problème."
        }
      },
      {
        id: 4,
        botMessage: "Avez-vous déjà essayé certaines solutions pour résoudre ce problème, comme redémarrer votre téléphone ou vérifier les paramètres ?",
        inputMode: "suggestions",
        suggestions: [
          "Oui, j'ai redémarré plusieurs fois et vérifié les paramètres réseau, mais rien ne change.",
          "J'ai seulement éteint et rallumé mon téléphone, mais je n'ai pas touché aux paramètres.",
          "Non, je ne savais pas quoi faire, c'est pourquoi je vous appelle."
        ],
        hints: "Indiquez si vous avez déjà essayé de résoudre le problème et comment.",
        expectedKeywords: ["redémarré", "vérifié", "paramètres", "éteint", "rallumé", "réseau", "change", "touché", "savais", "appelle"],
        feedback: {
          correct: "Je comprends. Nous allons devoir effectuer quelques vérifications sur votre ligne.",
          incorrect: "Veuillez me dire si vous avez déjà essayé des solutions pour résoudre votre problème."
        }
      },
      {
        id: 5,
        botMessage: "Je vais vérifier l'état de votre ligne dans notre système. Un instant, s'il vous plaît... Effectivement, je vois qu'il y a un problème technique dans votre secteur. Plusieurs clients sont affectés.",
        inputMode: "hybrid",
        suggestions: [
          "Combien de temps va durer cette panne ?",
          "Est-ce que vous allez m'accorder une compensation sur ma facture ?",
          "Que puis-je faire en attendant pour avoir du réseau ?"
        ],
        hints: "Posez une question sur la durée du problème ou les solutions possibles.",
        expectedKeywords: ["combien", "temps", "durer", "panne", "compensation", "facture", "attendant", "réseau", "faire", "accorder"],
        feedback: {
          correct: "Nos techniciens travaillent sur ce problème et nous estimons qu'il sera résolu dans les prochaines 24 heures.",
          partial: "Je comprends votre frustration. C'est effectivement très gênant.",
          incorrect: "Avez-vous des questions sur la durée de la panne ou sur les solutions temporaires ?"
        }
      },
      {
        id: 6,
        botMessage: "Nos équipes techniques travaillent déjà sur ce problème et nous espérons le résoudre dans les 24 heures. Souhaitez-vous que nous vous envoyions un SMS quand le problème sera résolu ?",
        inputMode: "freeText",
        suggestions: [
          "Oui, j'apprécierais d'être informé(e) par SMS quand le problème sera résolu.",
          "Y a-t-il un numéro d'incident que je peux noter pour suivre l'avancement ?",
          "Non merci, mais j'aimerais savoir s'il y a une solution alternative en attendant."
        ],
        hints: "Répondez à la proposition d'être informé par SMS ou posez une autre question.",
        expectedKeywords: ["oui", "apprécierais", "informé", "SMS", "incident", "noter", "suivre", "non", "alternative", "attendant"],
        acceptablePhrases: [
          "oui, j'apprécierais",
          "y a-t-il",
          "non merci",
          "j'aimerais savoir"
        ],
        feedback: {
          correct: "Très bien, nous vous enverrons un SMS dès que le réseau sera rétabli dans votre secteur.",
          partial: "Le numéro d'incident est le 45678. Vous pouvez suivre son statut sur notre site web.",
          incorrect: "Souhaitez-vous recevoir une notification quand le problème sera résolu ?"
        }
      },
      {
        id: 7,
        botMessage: "En attendant que le problème soit résolu, vous pouvez essayer de vous connecter en Wi-Fi pour passer des appels ou utiliser les applications. Avez-vous accès à un réseau Wi-Fi chez vous ?",
        inputMode: "suggestions",
        suggestions: [
          "Oui, j'ai le Wi-Fi à la maison, je vais essayer cette solution.",
          "Non, je n'ai pas de Wi-Fi disponible. Y a-t-il une autre solution ?",
          "Comment puis-je configurer mon téléphone pour passer des appels en Wi-Fi ?"
        ],
        hints: "Indiquez si vous avez accès au Wi-Fi ou demandez une autre solution.",
        expectedKeywords: ["oui", "wi-fi", "maison", "essayer", "solution", "non", "disponible", "autre", "configurer", "appels"],
        feedback: {
          correct: "Parfait. Je peux vous expliquer comment configurer les appels Wi-Fi si vous le souhaitez.",
          incorrect: "Veuillez me dire si vous avez accès à un réseau Wi-Fi pour cette solution temporaire."
        }
      },
      {
        id: 8,
        botMessage: "Y a-t-il autre chose que je puisse faire pour vous aujourd'hui ?",
        inputMode: "hybrid",
        suggestions: [
          "Non, merci beaucoup pour votre aide.",
          "Oui, pouvez-vous m'envoyer un récapitulatif de notre conversation par email ?",
          "Juste une dernière question : ce type de problème est-il fréquent dans ma région ?"
        ],
        hints: "Indiquez si vous avez besoin d'autre chose ou remerciez pour l'aide.",
        expectedKeywords: ["non", "merci", "aide", "oui", "récapitulatif", "email", "dernière", "question", "fréquent", "région"],
        feedback: {
          correct: "Je vous en prie. N'hésitez pas à nous recontacter si le problème persiste après 24 heures. Bonne journée !",
          partial: "Je vous envoie un récapitulatif à l'adresse email associée à votre compte.",
          incorrect: "Avez-vous d'autres questions ou puis-je faire autre chose pour vous aider ?"
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à signaler un problème technique par téléphone et à comprendre les solutions proposées en français.",
    learningObjectives: [
      "Signaler un problème technique",
      "Donner des informations personnelles",
      "Comprendre des instructions techniques",
      "Poser des questions sur les solutions",
      "Demander des précisions sur un service"
    ],
    grammar: {
      points: [
        "Questions avec inversion",
        "Passé composé pour décrire des actions récentes",
        "Conditionnel pour exprimer des souhaits",
        "Expressions de temps (depuis, pendant)"
      ]
    }
  };

  export default phoneProblems;
