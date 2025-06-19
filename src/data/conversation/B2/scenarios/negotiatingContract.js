// chatbot/B2/scenarios/negotiatingContract.js

const negotiatingContract = {
    id: 3,
    title: "Negotiating Contract",
    level: "B2",
    description: "Learn how to negotiate contract terms effectively, discuss conditions, make concessions, and reach a mutually beneficial agreement.",
    estimatedTime: "20-25 minutes",
    vocabulary: ["contrat", "clause", "négociation", "proposition", "condition", "modalité", "engagement", "compromis", "accord", "garantie"],
    steps: [
      {
        id: 1,
        botMessage: "Bonjour, je suis Jean Dupont, directeur des achats chez TechSolutions. Nous avons examiné votre proposition pour la fourniture de services informatiques et souhaiterions discuter de certains points avant de finaliser le contrat. Pourriez-vous nous rappeler les principaux éléments de votre offre ?",
        inputMode: "suggestions",
        suggestions: [
          "Bonjour Monsieur Dupont. Merci de me recevoir. Pour rappel, notre proposition comprend la fourniture et la maintenance de votre infrastructure informatique pour une durée de trois ans, incluant le matériel, les logiciels, le support technique 24h/24 et une formation initiale pour vos équipes. Le montant global est de 450 000 euros, avec un paiement échelonné en trois versements annuels.",
          "Bonjour. Notre offre couvre le développement sur mesure d'une solution logicielle adaptée à vos besoins spécifiques, incluant les phases d'analyse, de conception, de développement et de tests. Nous proposons également une période de maintenance de 12 mois après la livraison. L'ensemble est estimé à 220 000 euros, avec un calendrier de livraison étalé sur 10 mois.",
          "Bonjour Monsieur Dupont. Notre proposition porte sur la prestation de services de conseil en transformation digitale pour une durée de 18 mois. Elle comprend l'audit initial, l'élaboration d'une stratégie, l'accompagnement au changement et le suivi de la mise en œuvre. Le tarif proposé est de 15 000 euros mensuels, avec une équipe de trois consultants dédiés à mi-temps sur votre projet."
        ],
        hints: "Présentez clairement les principaux éléments de votre offre commerciale en rappelant les services, la durée et le montant.",
        expectedKeywords: ["proposition", "fourniture", "maintenance", "développement", "solution", "prestation", "conseil", "montant", "durée", "services"],
        feedback: {
          correct: "Merci pour ce rappel. Votre offre présente plusieurs points intéressants, mais nous avons quelques préoccupations concernant les conditions de paiement et les délais. Quelles seraient vos possibilités d'ajustement sur ces aspects ?",
          incorrect: "Pourriez-vous résumer plus clairement les principaux éléments de votre offre, en précisant les services inclus, la durée et le montant total ?"
        }
      },
      {
        id: 2,
        botMessage: "Merci pour ce rappel. J'apprécie plusieurs aspects de votre proposition, mais nous avons des préoccupations concernant les conditions de paiement et les délais proposés. Pourriez-vous nous indiquer quelle flexibilité vous avez sur ces points ?",
        inputMode: "hybrid",
        suggestions: [
          "Concernant les conditions de paiement, nous pourrions envisager un échelonnement plus progressif, par exemple en six versements semestriels plutôt que trois annuels, sans modifier le montant global. Pour les délais, nous avons une certaine marge de manœuvre et pourrions accélérer le déploiement initial en mobilisant des ressources supplémentaires. Toutefois, cela pourrait avoir un impact sur d'autres aspects du projet. Quels seraient précisément vos besoins en termes de calendrier ?",
          "Nous comprenons vos préoccupations et sommes disposés à revoir notre proposition. Sur le plan financier, nous pourrions reconsidérer la répartition des paiements en les alignant davantage sur les livrables effectifs plutôt que sur un calendrier fixe. Quant aux délais, ils ont été calculés pour garantir la qualité des prestations, mais nous pourrions identifier certaines phases prioritaires à accélérer. Pourriez-vous préciser quelles contraintes temporelles sont les plus importantes pour vous ?",
          "Je comprends tout à fait vos préoccupations. Pour les modalités de paiement, nous pourrions proposer une formule avec un acompte réduit à 20% au lieu des 33% initialement prévus, puis des paiements mensuels liés à l'avancement du projet. Concernant les délais, nous maintenons notre engagement sur la durée globale, mais nous pouvons réorganiser les phases pour vous livrer plus rapidement certaines fonctionnalités critiques. Quels seraient les éléments les plus urgents pour votre activité ?"
        ],
        hints: "Montrez votre flexibilité concernant les conditions de paiement et les délais tout en demandant des précisions sur les besoins du client.",
        expectedKeywords: ["flexibilité", "échelonnement", "versements", "délais", "ressources", "impact", "répartition", "livrables", "acompte", "prioritaires"],
        acceptablePhrases: [
          "nous pourrions envisager",
          "nous avons une certaine marge",
          "nous sommes disposés à",
          "nous pourrions reconsidérer",
          "je comprends vos préoccupations"
        ],
        feedback: {
          correct: "J'apprécie votre flexibilité. Nos contraintes principales concernent la trésorerie et la nécessité d'avoir une première phase opérationnelle rapidement. Parlons maintenant des garanties et du niveau de service. Que proposez-vous en cas de dysfonctionnement ou si les objectifs de performance ne sont pas atteints ?",
          partial: "Votre proposition d'ajustement est intéressante. Pourriez-vous être plus précis sur les modifications de calendrier que vous pourriez nous proposer ?",
          incorrect: "Veuillez indiquer plus clairement quelles adaptations vous pourriez proposer concernant les conditions de paiement et les délais."
        }
      },
      {
        id: 3,
        botMessage: "Concernant les garanties et le niveau de service, que proposez-vous exactement en cas de dysfonctionnement ou si les objectifs de performance ne sont pas atteints ? Votre offre initiale manque de précisions sur ces aspects essentiels pour nous.",
        inputMode: "freeText",
        suggestions: [
          "Notre contrat inclut une garantie complète pendant toute la durée du partenariat. En cas de dysfonctionnement, nous nous engageons à intervenir sous 4 heures ouvrées et à résoudre le problème sous 24 heures pour les incidents critiques. Si ce délai n'est pas respecté, des pénalités progressives s'appliquent, pouvant atteindre 10% du montant mensuel facturé. Concernant les performances, nous définissons ensemble des indicateurs clés mesurables et nous nous engageons contractuellement sur des niveaux minimums. Si ces objectifs ne sont pas atteints pendant deux mois consécutifs, vous bénéficiez d'une réduction de 15% sur la facturation mensuelle jusqu'au retour à la normale.",
          "Nous accordons une grande importance à la qualité de service. Notre proposition comprend un accord de niveau de service (SLA) détaillé qui prévoit différents niveaux d'intervention selon la gravité des incidents. Pour les bugs critiques affectant l'exploitation, notre temps de réponse garanti est de 2 heures avec résolution sous 8 heures, 24/7. En termes de performance, nous garantissons une disponibilité de 99,5% sur une base mensuelle. Chaque non-conformité entraîne des crédits de service automatiques calculés selon une échelle précise, que nous pouvons personnaliser selon vos priorités spécifiques.",
          "Notre approche des garanties repose sur trois piliers. Premièrement, un engagement de moyens renforcé avec une équipe dédiée et des processus de qualité certifiés ISO 9001. Deuxièmement, un système de mesure continue des performances avec des tableaux de bord accessibles en temps réel. Troisièmement, un mécanisme de compensation financière en cas de non-atteinte des objectifs : 5% de réduction par point de pourcentage en dessous des seuils convenus. Nous proposons également une clause de sortie anticipée sans pénalité si les dysfonctionnements persistent malgré trois plans d'action correctifs consécutifs."
        ],
        hints: "Détaillez vos garanties, niveaux de service, temps de réponse et compensations en cas de problème ou de performance insuffisante.",
        expectedKeywords: ["garantie", "intervenir", "pénalités", "indicateurs", "engagement", "SLA", "disponibilité", "crédits", "compensation", "sortie"],
        feedback: {
          correct: "Ces garanties sont substantielles et répondent en grande partie à nos préoccupations. J'aimerais maintenant aborder la question de la propriété intellectuelle et de la confidentialité des données. Quelle est votre position sur ces aspects ?",
          partial: "Vos garanties techniques semblent solides, mais j'aimerais des précisions sur les mécanismes de compensation financière en cas de non-respect des engagements.",
          incorrect: "Veuillez détailler plus précisément vos garanties et niveaux de service, notamment les délais d'intervention, les engagements de performance et les compensations prévues en cas de problème."
        }
      },
      {
        id: 4,
        botMessage: "Concernant la propriété intellectuelle et la confidentialité des données, quelle est votre position ? Ces aspects sont particulièrement sensibles pour notre entreprise qui opère dans un secteur concurrentiel et traite des données confidentielles.",
        inputMode: "suggestions",
        suggestions: [
          "Sur la propriété intellectuelle, notre position est claire : tous les développements spécifiques réalisés pour votre entreprise vous appartiendront entièrement. Vous disposerez des codes sources et de tous les droits d'exploitation sans limitation. Concernant la confidentialité, nous proposons un accord strict qui engage non seulement notre entreprise mais également individuellement chaque collaborateur intervenant sur votre projet. Nous mettons en œuvre des procédures de sécurité ISO 27001 et pouvons accepter des audits de sécurité à votre initiative.",
          "Nous respectons pleinement les préoccupations liées à la propriété intellectuelle et à la confidentialité. Notre contrat standard prévoit que les droits sur les livrables vous sont concédés via une licence perpétuelle et mondiale, tandis que nous conservons la propriété du code source des composants génériques. Toutefois, nous sommes ouverts à négocier une cession complète moyennant un ajustement tarifaire. Pour la confidentialité, nous sommes prêts à signer un accord spécifique avec des clauses de non-divulgation renforcées et des pénalités dissuasives.",
          "Notre approche combine sécurité et pragmatisme. Nous distinguons clairement les composants logiciels standards, sur lesquels vous obtenez une licence d'utilisation illimitée, et les développements spécifiques dont la propriété vous est intégralement transférée. Pour la confidentialité, nous appliquons une politique de cloisonnement strict des données et proposons des mesures techniques avancées : chiffrement de bout en bout, accès restreint basé sur les rôles, et journalisation complète des accès. Nous sommes également disposés à signer tout accord de confidentialité que vous jugeriez nécessaire."
        ],
        hints: "Expliquez clairement votre position sur la propriété intellectuelle des livrables et les mesures de confidentialité des données.",
        expectedKeywords: ["propriété", "droits", "codes sources", "confidentialité", "accord", "sécurité", "licence", "cession", "chiffrement", "audit"],
        feedback: {
          correct: "Votre position sur ces questions est rassurante. Une dernière préoccupation concerne la pérennité de votre entreprise et la continuité de service. Quelles garanties pouvez-vous nous offrir dans l'hypothèse d'une restructuration ou de difficultés au sein de votre société ?",
          incorrect: "Veuillez préciser votre position concernant la propriété intellectuelle des développements et les mesures de confidentialité des données."
        }
      },
      {
        id: 5,
        botMessage: "La pérennité de votre entreprise et la continuité de service nous préoccupent également. Quelles garanties pouvez-vous nous apporter à cet égard, notamment en cas de restructuration ou de difficultés au sein de votre société ?",
        inputMode: "hybrid",
        suggestions: [
          "Je comprends parfaitement cette préoccupation légitime. Pour vous rassurer, je peux vous indiquer que notre entreprise existe depuis 15 ans, avec une croissance stable et une solidité financière que nous pouvons documenter par nos bilans certifiés. Sur le plan contractuel, nous proposons plusieurs dispositifs de sécurisation : d'abord, un compte séquestre pour les codes sources, actualisé à chaque version majeure. Ensuite, un plan de réversibilité détaillé avec une assistance garantie de 6 mois. Enfin, nous pouvons souscrire une assurance spécifique couvrant les frais de transition vers un autre prestataire en cas de défaillance de notre part.",
          "Notre groupe compte aujourd'hui plus de 500 collaborateurs répartis dans 8 pays, avec une santé financière solide et des investisseurs stables. Toutefois, nous prenons très au sérieux votre préoccupation et proposons des garanties concrètes : premièrement, un dépôt des codes et de la documentation technique auprès d'un tiers de confiance. Deuxièmement, une clause de transfert de compétences qui nous obligerait, en cas de difficulté, à former votre équipe ou un prestataire de votre choix. Troisièmement, une garantie bancaire couvrant les étapes critiques du projet, activable sur simple notification en cas de manquement grave de notre part.",
          "Bien que notre entreprise soit reconnue comme un acteur stable du marché depuis plus de 12 ans, nous comprenons parfaitement cette inquiétude. Nous avons élaboré une politique de continuité de service qui inclut : un processus de réversibilité clairement défini et testé régulièrement ; la documentation exhaustive de tous les développements et configurations ; la possible mise à disposition d'un de nos experts pendant une période transitoire ; et une clause de transfert de licence qui vous permettrait d'utiliser nos outils propriétaires pendant 24 mois même en cas de rupture contractuelle. Par ailleurs, nous sommes prêts à adapter ces dispositifs selon vos exigences particulières."
        ],
        hints: "Présentez des garanties concrètes concernant la pérennité de votre entreprise et la continuité de service en cas de problème.",
        expectedKeywords: ["pérennité", "solidité", "compte séquestre", "réversibilité", "assistance", "dépôt", "transfert", "garantie bancaire", "documentation", "clause"],
        feedback: {
          correct: "Vos garanties sur ce point sont substantielles et nous rassurent. Compte tenu de notre discussion, je propose de synthétiser les points sur lesquels nous sommes d'accord et ceux qui nécessitent encore des ajustements. Pourriez-vous récapituler les concessions que vous êtes prêt à faire par rapport à votre offre initiale ?",
          partial: "Ces éléments sont intéressants. Toutefois, pourriez-vous préciser les modalités concrètes de mise en œuvre du plan de réversibilité que vous mentionnez ?",
          incorrect: "Veuillez présenter plus clairement les garanties que vous pouvez offrir concernant la continuité de service en cas de difficultés au sein de votre entreprise."
        }
      },
      {
        id: 6,
        botMessage: "Nous avons abordé plusieurs points importants. Pourriez-vous maintenant récapituler les principales concessions ou adaptations que vous êtes prêt à faire par rapport à votre proposition initiale, afin que je puisse évaluer si nous pouvons parvenir à un accord ?",
        inputMode: "freeText",
        suggestions: [
          "Suite à notre discussion, je suis en mesure de vous proposer les adaptations suivantes : 1) Sur les conditions financières : passage de trois à six versements échelonnés, avec un premier paiement réduit à 15% au lieu de 33% initialement. 2) Sur les délais : accélération de la phase de déploiement initial avec livraison des fonctionnalités critiques sous 2 mois au lieu de 4. 3) Sur les garanties : renforcement des pénalités en cas de non-respect des SLA, portées à 15% du montant mensuel. 4) Sur la propriété intellectuelle : cession complète des droits sur tous les développements, y compris les composants semi-génériques que nous avions initialement exclus. 5) Sur la réversibilité : extension de la période d'assistance à 9 mois au lieu de 6 en cas de transition vers un autre prestataire. Ces concessions représentent un effort commercial significatif, justifié par l'importance stratégique de votre entreprise et notre souhait d'établir un partenariat durable.",
          "Après avoir écouté vos préoccupations, voici les adaptations que je peux vous proposer : 1) Une modification du calendrier de paiement avec des versements mensuels liés à des jalons précis plutôt que des versements forfaitaires. 2) L'ajout d'une clause de performance avec des pénalités automatiques atteignant jusqu'à 20% de la facturation mensuelle en cas de non-respect des objectifs convenus pendant plus de deux mois consécutifs. 3) Un renforcement des garanties de confidentialité incluant la possibilité d'audits inopinés et l'engagement individuel écrit de chaque intervenant. 4) La mise en place d'un compte séquestre pour le code source avec mises à jour hebdomadaires. 5) Une réduction tarifaire globale de 5% en contrepartie d'un engagement ferme sur 3 ans au lieu des 2 ans initialement discutés. Ces ajustements répondent selon moi à l'essentiel de vos préoccupations tout en préservant l'équilibre économique du projet.",
          "Voici les principales concessions que je suis autorisé à vous proposer aujourd'hui : 1) Une révision des conditions de paiement avec un premier versement réduit à 20% et le solde échelonné sur toute la durée du projet selon l'avancement réel. 2) L'ajout d'une phase de prototypage rapide, livrée sous 6 semaines, pour valider les choix techniques et fonctionnels avant le déploiement complet. 3) Un renforcement significatif des pénalités en cas de défaillance, pouvant atteindre 25% de la valeur mensuelle du contrat. 4) L'intégration d'une clause d'audit technique par un tiers indépendant, à vos frais mais à votre initiative, pour vérifier la qualité et la sécurité des livrables. 5) La possibilité de résilier le contrat avec un préavis réduit à 2 mois au lieu de 6 pendant la première année, si nos services ne répondent pas à vos attentes. Ces adaptations témoignent de notre volonté de construire une relation de confiance tout en maintenant des conditions économiquement viables pour nos deux entreprises."
        ],
        hints: "Récapitulez clairement les concessions ou adaptations que vous proposez par rapport à votre offre initiale.",
        expectedKeywords: ["adaptations", "conditions", "financières", "délais", "garanties", "pénalités", "propriété", "intellectuelle", "réversibilité", "réduction"],
        acceptablePhrases: [
          "je suis en mesure de vous proposer",
          "voici les adaptations",
          "les principales concessions",
          "nous pouvons modifier",
          "j'accepte de"
        ],
        feedback: {
          correct: "Merci pour cette synthèse claire. Vos concessions répondent effectivement à plusieurs de nos préoccupations majeures. Il reste quelques points à discuter, notamment [point spécifique selon la réponse]. Seriez-vous ouvert à une dernière négociation sur cet aspect avant que nous puissions finaliser l'accord ?",
          partial: "Vos propositions sont intéressantes. Cependant, vous n'avez pas abordé la question de [point manquant selon la réponse]. Pourriez-vous nous indiquer votre position sur ce point particulier ?",
          incorrect: "Veuillez récapituler plus précisément les concessions ou adaptations que vous êtes prêt à faire par rapport à votre offre initiale, notamment sur les aspects financiers, les délais, les garanties et la propriété intellectuelle."
        }
      },
      {
        id: 7,
        botMessage: "Vos concessions répondent à la plupart de nos préoccupations, mais nous avons encore besoin d'un ajustement concernant les modalités de résiliation anticipée. Notre direction souhaite une possibilité de sortie plus souple, étant donné l'incertitude économique actuelle. Quelle serait votre position à ce sujet ?",
        inputMode: "suggestions",
        suggestions: [
          "Je comprends cette préoccupation légitime dans le contexte actuel. Nous pourrions assouplir les conditions de résiliation en proposant une sortie anticipée sans pénalité après la première année, avec un simple préavis de trois mois. Pour les six premiers mois, période où nos investissements initiaux sont les plus importants, nous demanderions un dédommagement dégressif, partant de 30% du montant restant et diminuant chaque mois. Cette solution équilibrée vous offrirait la flexibilité recherchée tout en protégeant minimalement notre engagement initial.",
          "Cette demande est compréhensible. Je vous propose un compromis : vous pourriez résilier le contrat à tout moment avec un préavis de deux mois, moyennant une indemnité égale à 20% de la valeur restante du contrat. Cette formule vous donnerait une grande flexibilité tout en nous permettant d'amortir partiellement nos investissements. Nous pourrions également envisager d'inclure des clauses spécifiques de résiliation sans indemnité dans certains cas précis, comme un changement majeur dans votre organisation ou une évolution technologique rendant notre solution obsolète.",
          "Je suis sensible à cette demande et souhaite trouver une solution satisfaisante. Voici ma proposition : une option de résiliation trimestrielle avec un préavis d'un mois, et une indemnité forfaitaire fixée à deux mois de facturation, quel que soit le moment de la résiliation. Cette formule est simple, prévisible, et représente un risque limité pour vous. Elle nous permet également de sécuriser minimalement notre investissement tout en vous offrant la souplesse recherchée. Seriez-vous d'accord avec cette approche équilibrée ?"
        ],
        hints: "Proposez un compromis sur les conditions de résiliation anticipée qui offre plus de flexibilité au client tout en protégeant vos intérêts.",
        expectedKeywords: ["résiliation", "préavis", "pénalité", "dédommagement", "dégressif", "indemnité", "valeur", "amortir", "investissements", "forfaitaire"],
        feedback: {
          correct: "Cette proposition concernant la résiliation anticipée me semble équilibrée et répond à notre préoccupation. Je pense que nous avons maintenant abordé tous les points importants et que nous sommes proches d'un accord. Quelles seraient les prochaines étapes pour formaliser notre entente ?",
          incorrect: "Veuillez proposer un compromis plus précis concernant les conditions de résiliation anticipée du contrat."
        }
      },
      {
        id: 8,
        botMessage: "Je pense que nous avons maintenant couvert tous les points essentiels et que nous sommes proches d'un accord. Quelles seraient les prochaines étapes pour formaliser notre entente et dans quel délai pourriez-vous nous soumettre une proposition révisée intégrant tous ces éléments ?",
        inputMode: "hybrid",
        suggestions: [
          "Je suis ravi que nous ayons pu avancer de manière constructive. Pour les prochaines étapes, je vous propose de vous envoyer dès demain un compte-rendu détaillé de notre discussion, formalisant les points d'accord. Dans un délai de trois jours ouvrables, vous recevrez une proposition contractuelle complète intégrant toutes les modifications convenues. Si cette proposition répond à vos attentes, nous pourrons organiser une session de signature la semaine prochaine. Parallèlement, nous commencerons à mobiliser notre équipe projet pour préparer le lancement dès la signature, afin de respecter les délais accélérés que nous avons négociés.",
          "Je suis très satisfait de l'avancée de nos discussions. Voici ce que je vous propose comme prochaines étapes : d'ici vendredi, je vous ferai parvenir une proposition commerciale révisée intégrant tous les points abordés aujourd'hui. Cette proposition sera accompagnée d'une version préliminaire du contrat et des SLA associés. Après validation de votre côté, nous pourrons organiser une réunion technique pour préciser certains aspects opérationnels avec vos équipes, puis procéder à la signature formelle. Notre objectif serait de démarrer le projet d'ici trois semaines. Ce calendrier vous convient-il ?",
          "Suite à notre discussion fructueuse, je m'engage à vous transmettre une proposition révisée complète sous 48 heures, comprenant l'offre commerciale actualisée et les annexes contractuelles détaillant chaque point abordé aujourd'hui (conditions de paiement, délais, garanties, propriété intellectuelle et clauses de sortie). Je vous proposerai également un planning de démarrage précis et l'organisation d'une première réunion de cadrage dès la semaine prochaine pour ne pas perdre de temps. Si la proposition vous convient, nous pourrions envisager une signature pour la fin du mois. Cela vous paraît-il réaliste ?"
        ],
        hints: "Présentez les prochaines étapes de la formalisation de l'accord et proposez un calendrier précis pour la proposition révisée.",
        expectedKeywords: ["compte-rendu", "proposition", "contractuelle", "modifications", "signature", "mobiliser", "révisée", "réunion", "technique", "calendrier"],
        feedback: {
          correct: "Ce plan d'action me semble tout à fait approprié. Nous attendrons donc votre proposition révisée dans les délais indiqués et organiserons ensuite une revue interne rapide. Si tout est conforme à nos discussions, nous devrions pouvoir avancer vers la signature selon le calendrier que vous proposez. Je vous remercie pour cette négociation constructive et me réjouis de notre future collaboration.",
          partial: "Votre proposition de calendrier est intéressante. Pourriez-vous préciser quand exactement nous pourrions recevoir le contrat révisé avec tous les éléments négociés aujourd'hui ?",
          incorrect: "Veuillez préciser plus clairement les prochaines étapes pour finaliser notre accord et indiquer dans quel délai vous pourriez nous soumettre une proposition révisée."
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à mener une négociation contractuelle complexe en français, en proposant des compromis constructifs et en trouvant un terrain d'entente mutuellement bénéfique.",
    learningObjectives: [
      "Présenter et défendre une offre commerciale",
      "Négocier des conditions contractuelles spécifiques",
      "Proposer des compromis équilibrés face à des objections",
      "Discuter de clauses techniques et juridiques complexes",
      "Conclure un accord commercial de manière professionnelle"
    ],
    grammar: {
      points: [
        "Conditionnel pour formuler des propositions",
        "Connecteurs logiques pour structurer l'argumentation",
        "Vocabulaire juridique et commercial spécifique",
        "Structures de concession et de compromis"
      ]
    }
  };

  export default negotiatingContract;
