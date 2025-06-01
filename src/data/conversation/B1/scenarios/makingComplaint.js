// chatbot/B1/scenarios/makingComplaint.js

const makingComplaint = {
    id: 15,
    title: "Making Complaint",
    level: "B1",
    description: "Learn how to file a formal complaint, use appropriate formal language, and follow proper procedures.",
    estimatedTime: "15-20 minutes",
    vocabulary: ["réclamation", "préjudice", "dédommagement", "responsabilité", "formel", "dysfonctionnement", "délai", "recours", "contrat", "litige"],
    steps: [
      {
        id: 1,
        botMessage: "Bonjour, vous êtes au service des réclamations. Je suis Mme Leroy. Comment puis-je vous aider aujourd'hui ?",
        inputMode: "suggestions",
        suggestions: [
          "Bonjour Madame. Je souhaite déposer une réclamation concernant un produit défectueux que j'ai acheté dans votre magasin la semaine dernière. J'ai conservé le ticket de caisse et la garantie.",
          "Bonjour. Je vous contacte au sujet d'un service que j'ai payé et qui n'a pas été effectué conformément au contrat. Malgré plusieurs relances, je n'ai pas obtenu de solution satisfaisante.",
          "Bonjour Madame Leroy. Je viens de recevoir ma facture mensuelle et j'y ai constaté des frais supplémentaires non justifiés. J'aimerais obtenir des explications et un remboursement."
        ],
        hints: "Saluez formellement et expliquez clairement l'objet de votre réclamation.",
        expectedKeywords: ["bonjour", "réclamation", "défectueux", "service", "contrat", "facture", "frais", "remboursement", "ticket", "garantie"],
        feedback: {
          correct: "Je vous remercie pour ces premières informations. Pourriez-vous me donner plus de détails sur ce problème et quand il est survenu exactement ?",
          incorrect: "Pourriez-vous préciser clairement l'objet de votre réclamation ?"
        }
      },
      {
        id: 2,
        botMessage: "Pourriez-vous me donner davantage de détails sur ce problème et m'indiquer précisément quand il est survenu ?",
        inputMode: "hybrid",
        suggestions: [
          "J'ai acheté un ordinateur portable le 15 mai dernier dans votre magasin du centre commercial Les Arcades. Dès le lendemain, l'écran affichait des lignes horizontales et s'éteignait régulièrement. J'ai essayé de suivre les instructions du manuel sans succès.",
          "J'ai souscrit à votre service de nettoyage professionnel le 3 juin, avec un rendez-vous programmé pour le 10 juin. Le technicien est venu mais n'a effectué qu'une partie des prestations prévues dans le forfait. J'ai immédiatement signalé le problème par téléphone à votre service client.",
          "La facture en question est celle du mois de mai, reçue le 2 juin. J'y constate des frais d'abonnement à des services premium que je n'ai jamais demandés ni activés, pour un montant total de 45,90€. J'ai vérifié mon historique d'utilisation, qui confirme que je n'ai pas accédé à ces services."
        ],
        hints: "Donnez des détails précis sur le problème : dates, lieux, circonstances, et actions déjà entreprises.",
        expectedKeywords: ["acheté", "souscrit", "facture", "date", "problème", "signalé", "technique", "montant", "service", "client"],
        acceptablePhrases: [
          "j'ai acheté",
          "j'ai souscrit",
          "la facture en question",
          "le problème est survenu",
          "j'ai essayé de"
        ],
        feedback: {
          correct: "Merci pour ces précisions. Qu'avez-vous déjà entrepris comme démarches pour résoudre ce problème et quelles ont été les réponses reçues ?",
          partial: "Je comprends mieux la situation. Avez-vous conservé des preuves de cet achat/contrat ?",
          incorrect: "Veuillez donner des détails précis sur le problème, notamment les dates, lieux et circonstances."
        }
      },
      {
        id: 3,
        botMessage: "Quelles démarches avez-vous déjà entreprises pour tenter de résoudre ce problème et quelles réponses avez-vous obtenues ?",
        inputMode: "freeText",
        suggestions: [
          "Je suis retourné au magasin le 17 mai avec l'appareil défectueux. Le vendeur a constaté le problème mais m'a dit qu'il devait l'envoyer au service technique pour diagnostic, avec un délai de 3 semaines minimum. Cela me paraît excessif pour un produit neuf sous garantie. J'ai demandé un échange, ce qui m'a été refusé.",
          "J'ai appelé votre service client le jour même (10 juin) et on m'a promis qu'un responsable me recontacterait sous 48h. N'ayant reçu aucun appel, j'ai envoyé un email le 13 juin avec photos des zones non nettoyées à l'appui. Votre réponse par email proposait simplement un nouveau rendez-vous dans un mois, ce qui ne me convient pas.",
          "J'ai d'abord contacté le service client par téléphone le 3 juin. L'opérateur m'a affirmé que j'avais activé ces services via l'application mobile, ce qui est faux. J'ai ensuite envoyé un email demandant des preuves de cette activation, mais je n'ai reçu qu'une réponse automatique. Après une seconde tentative par téléphone hier, on m'a conseillé de faire une réclamation formelle."
        ],
        hints: "Décrivez les démarches déjà effectuées pour résoudre le problème et les réponses reçues.",
        expectedKeywords: ["retourné", "appelé", "email", "service", "client", "promis", "recontacterait", "réponse", "proposait", "contacté"],
        feedback: {
          correct: "Je comprends votre frustration face à ces réponses insatisfaisantes. Quelle solution attendez-vous précisément de notre part aujourd'hui ?",
          partial: "Je vois que vous avez tenté plusieurs approches. Ces réponses n'ont clairement pas répondu à vos attentes.",
          incorrect: "Veuillez préciser quelles démarches vous avez déjà entreprises pour résoudre ce problème et les réponses obtenues."
        }
      },
      {
        id: 4,
        botMessage: "Quelle solution précise attendez-vous de notre part pour résoudre ce litige de manière satisfaisante pour vous ?",
        inputMode: "suggestions",
        suggestions: [
          "Je demande un échange immédiat de l'appareil défectueux contre un modèle identique neuf. Si ce n'est pas possible, je souhaite un remboursement intégral, conformément à mes droits pour un produit défectueux dans les 30 jours suivant l'achat.",
          "J'attends soit l'exécution complète du service pour lequel j'ai payé, et ce dans un délai de 7 jours, soit un remboursement de 50% correspondant aux prestations non effectuées. Je demande également un geste commercial pour le désagrément causé.",
          "Je demande l'annulation immédiate de ces frais indus et leur remboursement sur ma prochaine facture. Je souhaite également recevoir une confirmation écrite que ces services ont bien été désactivés et ne me seront plus jamais facturés sans mon consentement explicite."
        ],
        hints: "Formulez clairement la solution que vous attendez : remboursement, échange, réparation, dédommagement, etc.",
        expectedKeywords: ["demande", "échange", "remboursement", "intégral", "conformément", "droits", "exécution", "délai", "annulation", "confirmation"],
        feedback: {
          correct: "J'ai bien noté votre demande. Pour traiter formellement votre réclamation, je vais avoir besoin de certaines informations complémentaires.",
          incorrect: "Veuillez préciser quelle solution vous attendez pour résoudre ce problème (remboursement, échange, réparation...)."
        }
      },
      {
        id: 5,
        botMessage: "Pour que je puisse enregistrer formellement votre réclamation, j'aurais besoin de quelques informations administratives. Pouvez-vous me communiquer votre nom complet, votre numéro client ou de facture, ainsi qu'une adresse email ou postale pour le suivi ?",
        inputMode: "hybrid",
        suggestions: [
          "Bien sûr. Je m'appelle Martin Dubois, mon numéro client est le 45789213 (figurant sur ma facture d'achat). Mon adresse email est martin.dubois@email.com et mon adresse postale est 15 rue des Lilas, 75011 Paris.",
          "Je suis Sophie Lefèvre, le numéro de la facture concernée est F-20230603-4578. Vous pouvez me contacter par email à sophie.lefevre@email.com ou par téléphone au 06 12 34 56 78 en journée.",
          "Mon nom est Alexandre Moreau, je n'ai pas mon numéro client sous les yeux mais mon adresse de livraison est 27 avenue Victor Hugo, 33000 Bordeaux. Pour le suivi, mon email est alex.moreau@email.com et mon téléphone le 07 98 76 54 32."
        ],
        hints: "Fournissez vos coordonnées complètes pour l'enregistrement formel de votre réclamation.",
        expectedKeywords: ["nom", "appelle", "numéro", "client", "facture", "adresse", "email", "postale", "téléphone", "contacter"],
        feedback: {
          correct: "Merci pour ces informations. J'enregistre votre réclamation sous la référence REC-23789. Quelle est votre disponibilité si nous avons besoin de vous contacter pour des informations supplémentaires ?",
          partial: "Merci. Pourriez-vous également me donner un numéro de téléphone où nous pourrions vous joindre en cas de besoin ?",
          incorrect: "Veuillez me communiquer vos coordonnées complètes pour l'enregistrement de votre réclamation."
        }
      },
      {
        id: 6,
        botMessage: "Votre réclamation est maintenant enregistrée sous la référence REC-23789. Nous allons l'examiner dans les meilleurs délais. Pouvez-vous me préciser votre disponibilité si nous avons besoin de vous contacter pour des informations complémentaires ou pour vous proposer une solution ?",
        inputMode: "freeText",
        suggestions: [
          "Je suis généralement disponible par téléphone en semaine entre 12h et 14h, ou après 18h. Vous pouvez aussi me contacter par email à tout moment, je consulte mes messages plusieurs fois par jour et je m'engage à vous répondre sous 24h.",
          "Je préfère être contacté(e) par email dans un premier temps, car mes horaires de travail sont variables. Si un appel téléphonique est nécessaire, je suis disponible le mardi et le jeudi toute la journée, ou le mercredi matin avant 11h.",
          "Vous pouvez me joindre par téléphone du lundi au vendredi, de préférence entre 9h et 17h. En cas d'impossibilité, laissez-moi un message avec vos disponibilités et je vous rappellerai. Pour les documents ou confirmations écrites, utilisez mon adresse email."
        ],
        hints: "Indiquez vos disponibilités et préférences pour être contacté(e) dans le cadre du suivi de votre réclamation.",
        expectedKeywords: ["disponible", "téléphone", "semaine", "email", "horaires", "travail", "joindre", "préférence", "message", "rappellerai"],
        acceptablePhrases: [
          "je suis disponible",
          "vous pouvez me contacter",
          "je préfère être contacté",
          "vous pouvez me joindre",
          "mes horaires sont"
        ],
        feedback: {
          correct: "C'est bien noté. Quel est le meilleur moyen de vous envoyer les documents officiels relatifs à votre réclamation ?",
          partial: "Merci pour ces précisions sur vos disponibilités.",
          incorrect: "Veuillez préciser vos disponibilités et préférences pour être contacté(e) concernant votre réclamation."
        }
      },
      {
        id: 7,
        botMessage: "Concernant le traitement de votre réclamation, notre procédure standard prévoit un délai de réponse de 10 jours ouvrés. Cependant, certains cas peuvent nécessiter des vérifications supplémentaires. Souhaitez-vous être informé(e) de l'avancement de votre dossier pendant cette période ?",
        inputMode: "suggestions",
        suggestions: [
          "Oui, j'apprécierais d'être tenu(e) au courant de l'avancement de mon dossier. Je comprends que le traitement puisse prendre du temps, mais je souhaite savoir quelles étapes ont été franchies, même s'il n'y a pas encore de solution définitive.",
          "Je préfère attendre votre réponse définitive dans le délai indiqué, à condition qu'il soit respecté. S'il devait y avoir un retard, je voudrais en être informé(e) avec une explication et une nouvelle date prévisionnelle de résolution.",
          "Je souhaite uniquement être contacté(e) si vous avez besoin d'informations supplémentaires ou lorsque vous aurez une proposition concrète à me faire. Les mises à jour intermédiaires ne sont pas nécessaires."
        ],
        hints: "Indiquez si vous souhaitez être informé(e) de l'avancement de votre dossier pendant son traitement.",
        expectedKeywords: ["informé", "avancement", "dossier", "traitement", "attendre", "réponse", "définitive", "délai", "retard", "contacté"],
        feedback: {
          correct: "Nous respecterons votre souhait concernant le suivi. En cas de résolution favorable de votre réclamation, comment préférez-vous que la compensation vous soit versée ?",
          incorrect: "Veuillez indiquer si vous souhaitez être tenu(e) informé(e) de l'avancement de votre dossier pendant son traitement."
        }
      },
      {
        id: 8,
        botMessage: "Nous allons tout mettre en œuvre pour résoudre votre réclamation dans les meilleurs délais. Avant de clôturer cet enregistrement, avez-vous d'autres informations ou précisions à apporter à votre dossier ?",
        inputMode: "hybrid",
        suggestions: [
          "Non, je pense vous avoir communiqué toutes les informations nécessaires. Je vous remercie d'avoir enregistré ma réclamation et j'attends votre retour dans le délai indiqué. Pourriez-vous me confirmer par email la bonne réception de ma demande avec la référence du dossier ?",
          "Oui, j'aimerais préciser que je suis client chez vous depuis plus de 5 ans et que c'est la première fois que je rencontre un problème. J'espère que cet historique de fidélité sera pris en compte dans le traitement de ma demande.",
          "Une dernière chose : je souhaiterais savoir s'il existe un service de médiation indépendant que je pourrais contacter si jamais nous ne parvenions pas à un accord satisfaisant. J'espère sincèrement que ce ne sera pas nécessaire, mais je préfère connaître toutes les options."
        ],
        hints: "Indiquez si vous avez des informations supplémentaires à ajouter et/ou remerciez pour l'enregistrement de votre réclamation.",
        expectedKeywords: ["communiqué", "informations", "nécessaires", "remercie", "client", "fidélité", "historique", "médiation", "indépendant", "accord"],
        feedback: {
          correct: "J'ai bien noté cette information supplémentaire. Un email de confirmation vous sera envoyé aujourd'hui avec la référence de votre dossier. Nous vous remercions de votre patience et vous tiendrons informé(e) selon vos préférences. N'hésitez pas à nous recontacter si besoin en mentionnant votre référence de dossier.",
          partial: "Je vous confirmerai par email la réception de votre réclamation avec la référence de dossier. Nous vous remercions de votre confiance.",
          incorrect: "Veuillez indiquer si vous avez d'autres informations à ajouter à votre dossier de réclamation."
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à déposer une réclamation formelle de manière structurée et professionnelle en français.",
    learningObjectives: [
      "Expliquer clairement un problème dans un contexte formel",
      "Utiliser un vocabulaire administratif approprié",
      "Formuler précisément des demandes de compensation",
      "Fournir des informations structurées et chronologiques",
      "Interagir avec un service client de manière assertive mais courtoise"
    ],
    grammar: {
      points: [
        "Conjugaison au passé composé et à l'imparfait",
        "Formulations polies et conditionnelles",
        "Connecteurs logiques pour structurer la réclamation",
        "Registre formel et administratif"
      ]
    }
  };

  export default makingComplaint;
