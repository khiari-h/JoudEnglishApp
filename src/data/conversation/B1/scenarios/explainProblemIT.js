// chatbot/B1/scenarios/explainProblemIT.js

const explainProblemIT = {
    id: 6,
    title: "Explain Problem IT",
    level: "B1",
    description: "Learn how to describe a technical IT problem in detail and understand troubleshooting instructions.",
    estimatedTime: "15-20 minutes",
    vocabulary: ["ordinateur", "logiciel", "système d'exploitation", "planter", "connexion", "réseau", "redémarrer", "fichier", "mise à jour", "bogue"],
    steps: [
      {
        id: 1,
        botMessage: "Bonjour, vous êtes en ligne avec le service d'assistance technique de DigiSolutions. Je m'appelle Thomas. Comment puis-je vous aider aujourd'hui ?",
        inputMode: "suggestions",
        suggestions: [
          "Bonjour Thomas. Mon ordinateur portable se bloque régulièrement quand j'essaie d'ouvrir plusieurs applications en même temps, surtout depuis la dernière mise à jour.",
          "Bonjour. J'ai un problème avec mon logiciel de traitement de texte qui ne sauvegarde plus automatiquement mes documents et j'ai perdu plusieurs heures de travail.",
          "Bonjour. Je n'arrive plus à me connecter à ma messagerie professionnelle depuis hier. Un message d'erreur s'affiche mais je ne comprends pas ce qu'il signifie."
        ],
        hints: "Saluez et décrivez clairement le problème informatique que vous rencontrez.",
        expectedKeywords: ["ordinateur", "bloque", "logiciel", "traitement", "texte", "sauvegarde", "connecter", "messagerie", "erreur", "mise à jour"],
        feedback: {
          correct: "Merci pour ces informations. Pourriez-vous me donner plus de détails sur ce problème ? Par exemple, depuis quand l'avez-vous remarqué ?",
          incorrect: "Pourriez-vous décrire plus précisément le problème informatique que vous rencontrez ?"
        }
      },
      {
        id: 2,
        botMessage: "Depuis quand rencontrez-vous ce problème et dans quelles circonstances précises se produit-il ?",
        inputMode: "hybrid",
        suggestions: [
          "Le problème a commencé il y a environ une semaine, après l'installation d'une mise à jour. Il se produit systématiquement quand j'ouvre plus de trois applications en même temps, surtout des applications gourmandes en ressources.",
          "J'ai remarqué ce dysfonctionnement hier soir. Le logiciel fonctionnait normalement, puis l'écran a figé pendant quelques secondes et depuis, la fonction de sauvegarde automatique ne marche plus.",
          "Depuis hier matin, je ne peux plus accéder à mes emails. Le problème survient sur tous mes appareils (ordinateur, téléphone, tablette) donc je pense que c'est lié à mon compte et non à un appareil spécifique."
        ],
        hints: "Précisez quand le problème a commencé et dans quelles circonstances il se produit.",
        expectedKeywords: ["commencé", "semaine", "installation", "mise à jour", "remarqué", "dysfonctionnement", "fonctionnait", "normalement", "appareils", "compte"],
        acceptablePhrases: [
          "le problème a commencé",
          "j'ai remarqué",
          "depuis hier",
          "il se produit",
          "j'ai constaté"
        ],
        feedback: {
          correct: "Merci pour ces précisions. Avez-vous essayé certaines solutions par vous-même avant de nous contacter ?",
          partial: "Pouvez-vous préciser si le problème est constant ou s'il apparaît seulement dans certaines conditions ?",
          incorrect: "Indiquez depuis quand vous avez ce problème et dans quelles circonstances il se manifeste."
        }
      },
      {
        id: 3,
        botMessage: "Avez-vous déjà essayé certaines solutions ou manipulations pour résoudre ce problème avant de nous contacter ?",
        inputMode: "freeText",
        suggestions: [
          "Oui, j'ai essayé de redémarrer l'ordinateur plusieurs fois et j'ai même désinstallé puis réinstallé le logiciel problématique, mais rien n'a changé. J'ai aussi vérifié les mises à jour disponibles.",
          "J'ai consulté les forums en ligne et suivi quelques conseils comme vider le cache et supprimer les fichiers temporaires, mais le problème persiste. J'ai également exécuté un scan antivirus qui n'a rien détecté d'anormal.",
          "Je n'ai pas tenté grand-chose car je crains d'aggraver la situation. J'ai juste redémarré mon appareil et vérifié ma connexion internet qui fonctionne bien pour d'autres applications."
        ],
        hints: "Décrivez les solutions que vous avez déjà tentées pour résoudre le problème.",
        expectedKeywords: ["redémarrer", "désinstallé", "réinstallé", "mises à jour", "forums", "cache", "fichiers", "temporaires", "scan", "antivirus"],
        feedback: {
          correct: "Vous avez déjà essayé plusieurs solutions pertinentes. Pour mieux comprendre votre situation, pourriez-vous me donner des informations sur votre système ?",
          partial: "C'est une approche prudente. Avez-vous remarqué d'autres comportements inhabituels sur votre appareil ?",
          incorrect: "Indiquez si vous avez déjà essayé certaines solutions avant de nous contacter."
        }
      },
      {
        id: 4,
        botMessage: "Pour mieux comprendre votre situation, pourriez-vous me donner quelques informations sur votre système ? Par exemple, quel système d'exploitation utilisez-vous et quelle est la configuration de votre appareil ?",
        inputMode: "suggestions",
        suggestions: [
          "J'utilise Windows 11 sur un ordinateur portable acheté l'année dernière avec 8 Go de RAM et un processeur Intel Core i5. J'ai environ 60% d'espace disque libre.",
          "Je travaille sur un Mac avec macOS Monterey. C'est un MacBook Pro de 2020 avec 16 Go de RAM et 256 Go de stockage SSD, dont la moitié est utilisée.",
          "Mon système est Linux Ubuntu 22.04, installé sur un PC de bureau avec 32 Go de RAM et un processeur AMD Ryzen 7. J'ai plusieurs disques durs avec beaucoup d'espace disponible."
        ],
        hints: "Précisez votre système d'exploitation et les caractéristiques principales de votre appareil.",
        expectedKeywords: ["Windows", "Mac", "Linux", "RAM", "processeur", "disque", "espace", "stockage", "portable", "bureau"],
        feedback: {
          correct: "Merci pour ces informations techniques. D'après ce que vous m'avez décrit, je vais vous proposer quelques manipulations à essayer. Êtes-vous devant votre appareil actuellement ?",
          incorrect: "Veuillez préciser quel système d'exploitation vous utilisez et les caractéristiques principales de votre appareil."
        }
      },
      {
        id: 5,
        botMessage: "D'après les informations que vous m'avez fournies, je vais vous guider à travers quelques étapes de dépannage. Êtes-vous prêt(e) à suivre mes instructions maintenant ?",
        inputMode: "hybrid",
        suggestions: [
          "Oui, je suis devant mon ordinateur et prêt(e) à suivre vos instructions étape par étape.",
          "Je préfèrerais que vous m'expliquiez d'abord ce que nous allons faire et pourquoi, avant de commencer les manipulations techniques.",
          "Pas immédiatement, mais je peux prendre des notes. Pouvez-vous me donner les instructions par écrit pour que je puisse les suivre plus tard ?"
        ],
        hints: "Indiquez si vous êtes prêt à suivre les instructions de dépannage maintenant ou si vous préférez une autre approche.",
        expectedKeywords: ["prêt", "suivre", "instructions", "étape", "expliquiez", "d'abord", "notes", "écrit", "plus tard", "manipulations"],
        feedback: {
          correct: "Parfait. Nous allons procéder étape par étape. La première chose à faire est de vérifier si des mises à jour sont en attente.",
          partial: "Bien sûr, je comprends. Le problème semble lié à [explication technique du problème selon le cas évoqué].",
          incorrect: "Indiquez si vous pouvez suivre mes instructions maintenant ou si vous préférez une autre approche."
        }
      },
      {
        id: 6,
        botMessage: "Première étape : vérifiez s'il y a des mises à jour en attente pour votre système. Sur Windows, allez dans Paramètres > Windows Update. Sur Mac, allez dans Préférences Système > Mise à jour de logiciels. Sur Linux Ubuntu, ouvrez le terminal et tapez 'sudo apt update && sudo apt upgrade'. Pouvez-vous faire cela et me dire ce que vous constatez ?",
        inputMode: "freeText",
        suggestions: [
          "J'ai vérifié et il y a effectivement plusieurs mises à jour en attente. Je les installe maintenant. Faut-il redémarrer l'ordinateur après l'installation ?",
          "J'ai regardé et mon système est à jour. Aucune mise à jour n'est disponible ou en attente d'installation. Quelle est la prochaine étape ?",
          "J'ai essayé mais je rencontre un message d'erreur pendant la vérification des mises à jour. L'erreur indique : 'Impossible de se connecter au serveur de mise à jour'. Ma connexion internet fonctionne pourtant bien."
        ],
        hints: "Décrivez ce que vous constatez après avoir vérifié les mises à jour selon les instructions.",
        expectedKeywords: ["vérifié", "mises à jour", "attente", "installe", "redémarrer", "à jour", "aucune", "disponible", "erreur", "connexion"],
        acceptablePhrases: [
          "j'ai vérifié",
          "j'ai regardé",
          "j'ai essayé",
          "il y a",
          "je les installe"
        ],
        feedback: {
          correct: "Excellent. Après l'installation des mises à jour, veuillez redémarrer votre appareil. Ensuite, nous passerons à la vérification des ressources système.",
          partial: "Dans ce cas, passons directement à la vérification des ressources système pour identifier d'éventuels goulots d'étranglement.",
          incorrect: "Indiquez si vous avez pu vérifier les mises à jour et ce que vous avez constaté."
        }
      },
      {
        id: 7,
        botMessage: "Maintenant, vérifions les ressources de votre système pendant que le problème se produit. Pouvez-vous reproduire le problème, puis ouvrir le Gestionnaire des tâches (Windows), le Moniteur d'activité (Mac) ou le Moniteur système (Linux) pour voir quelle ressource est la plus sollicitée (CPU, mémoire, disque) ?",
        inputMode: "suggestions",
        suggestions: [
          "J'ai reproduit le problème et ouvert le gestionnaire. Je constate que la mémoire RAM est utilisée à près de 95% et que le CPU monte à 100% juste avant que l'ordinateur ne se bloque.",
          "J'ai essayé de reproduire le problème mais il ne se produit pas en ce moment. Est-ce que je devrais essayer autre chose ou attendre qu'il réapparaisse ?",
          "En surveillant les ressources, je remarque que c'est surtout l'utilisation du disque qui atteint 100%, même si la RAM et le CPU semblent normaux. Le disque semble très sollicité."
        ],
        hints: "Décrivez ce que vous observez dans le gestionnaire de ressources quand le problème se produit.",
        expectedKeywords: ["reproduit", "gestionnaire", "mémoire", "RAM", "CPU", "disque", "utilisée", "100%", "bloque", "ressources"],
        feedback: {
          correct: "Cette information est très utile pour diagnostiquer votre problème. Il semble que nous ayons identifié le goulot d'étranglement. Voici ce que je vous propose comme solution.",
          incorrect: "Essayez de reproduire le problème tout en surveillant les ressources système (CPU, mémoire, disque) et décrivez ce que vous observez."
        }
      },
      {
        id: 8,
        botMessage: "D'après votre diagnostic, je vous recommande la solution suivante : [solution spécifique au problème identifié]. Pensez-vous pouvoir appliquer cette solution ? Avez-vous des questions sur la procédure à suivre ?",
        inputMode: "hybrid",
        suggestions: [
          "Oui, je pense pouvoir appliquer cette solution. Pourriez-vous juste me préciser si je dois sauvegarder mes données avant de procéder ? Je ne voudrais pas perdre d'informations importantes.",
          "La solution me semble un peu complexe. Y a-t-il une alternative plus simple que je pourrais essayer d'abord, ou pourriez-vous me guider étape par étape ?",
          "Je vais essayer d'appliquer votre solution dès que possible. Si le problème persiste après cela, que me conseillez-vous de faire ? Devrais-je vous recontacter ?"
        ],
        hints: "Réagissez à la solution proposée en posant des questions spécifiques si nécessaire.",
        expectedKeywords: ["appliquer", "solution", "sauvegarder", "données", "complexe", "alternative", "guider", "étape", "persiste", "recontacter"],
        feedback: {
          correct: "Excellente question. Oui, il est toujours recommandé de sauvegarder vos données importantes avant toute intervention technique. Si le problème persiste après avoir essayé cette solution, n'hésitez pas à nous recontacter en mentionnant ce ticket : #45678. Y a-t-il autre chose que je puisse faire pour vous aujourd'hui ?",
          partial: "Je vais vous guider pas à pas. Commencez par [première étape détaillée], puis [deuxième étape]...",
          incorrect: "Indiquez si vous pensez pouvoir appliquer la solution proposée et si vous avez des questions spécifiques."
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à décrire un problème informatique technique de manière précise et à suivre des instructions de dépannage en français.",
    learningObjectives: [
      "Décrire précisément un problème technique",
      "Comprendre et suivre des instructions informatiques",
      "Donner des informations sur une configuration technique",
      "Utiliser le vocabulaire spécifique à l'informatique",
      "Poser des questions pertinentes sur une procédure technique"
    ],
    grammar: {
      points: [
        "Expression de la cause et de la conséquence",
        "Utilisation de l'impératif pour les instructions",
        "Structures hypothétiques (si...alors)",
        "Vocabulaire technique et expressions spécialisées"
      ]
    }
  };
  
  export default explainProblemIT;