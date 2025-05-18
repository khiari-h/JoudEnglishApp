// grammarRulesC1.js
// Fichier contenant uniquement les règles grammaticales pour le niveau C1 du CECR

const grammarRulesC1 = [
    {
      id: 1,
      title: "Le fronting pour l'emphase",
      explanation: "Structures où l'élément important est placé au début de la phrase pour l'emphase.",
      examples: [
        { english: "Gone are the days when we could afford such luxury.", french: "Révolus sont les jours où nous pouvions nous permettre un tel luxe." },
        { english: "Little did they know what was about to happen.", french: "Peu savaient-ils ce qui allait se passer." },
        { english: "Such was his talent that everyone admired him.", french: "Tel était son talent que tous l'admiraient." }
      ],
      rules: [
        "Inversion avec adjectifs/adverbes: Little, rarely, seldom + auxiliaire + sujet",
        "So/such + inversion pour l'emphase",
        "Préposition + pronom relatif au début pour l'emphase",
        "Participes passés ou adverbes de lieu au début"
      ]
    },
    {
      id: 2,
      title: "Subjunctive mood avancé",
      explanation: "Utilisations sophistiquées du subjonctif en anglais dans différents contextes.",
      examples: [
        { english: "The committee proposed that he resign immediately.", french: "Le comité a proposé qu'il démissionne immédiatement." },
        { english: "Be that as it may, we must continue.", french: "Quoi qu'il en soit, nous devons continuer." },
        { english: "God save the Queen!", french: "Que Dieu sauve la Reine !" }
      ],
      rules: [
        "Verbes de demande: ask, demand, propose, suggest + (that) + sujet + base form",
        "Expressions figées: God save, be that as it may",
        "If this be true (style archaïque mais encore utilisé)",
        "Lest + sujet + base form (pour éviter que)"
      ]
    },
    {
      id: 3,
      title: "Discourse markers sophistiqués",
      explanation: "Marqueurs de discours avancés pour structurer les arguments et le texte académique.",
      examples: [
        { english: "To put it another way, the project failed.", french: "Autrement dit, le projet a échoué." },
        { english: "By and large, the results were satisfactory.", french: "Dans l'ensemble, les résultats étaient satisfaisants." },
        { english: "Be that as it may, we must proceed.", french: "Quoi qu'il en soit, nous devons continuer." }
      ],
      rules: [
        "Reformulation: in other words, to put it differently",
        "Généralisation: by and large, on the whole, for the most part",
        "Concession: for all that, all the same, even so",
        "Addition emphatique: what's more, moreover, furthermore"
      ]
    },
    {
      id: 4,
      title: "Cleft sentences avancées",
      explanation: "Structures clivées complexes pour mettre l'accent sur différents éléments de la phrase.",
      examples: [
        { english: "It was not until yesterday that he realized the truth.", french: "Ce n'est qu'hier qu'il a réalisé la vérité." },
        { english: "What he wants is quite clear.", french: "Ce qu'il veut est tout à fait clair." },
        { english: "The reason (why) we failed was lack of preparation.", french: "La raison pour laquelle nous avons échoué était le manque de préparation." }
      ],
      rules: [
        "Pseudo-cleft: What + clause + be + focus",
        "It-cleft: It + be + focus + relative clause",
        "All-cleft: All + clause + be + focus",
        "The reason (why) + clause + be + because..."
      ]
    },
    {
      id: 5,
      title: "Inversion après expressions négatives",
      explanation: "Inversion complexe avec des expressions négatives au début de la phrase.",
      examples: [
        { english: "Not since the war has the country faced such hardship.", french: "Jamais depuis la guerre le pays n'a fait face à de telles difficultés." },
        { english: "At no point did he consider giving up.", french: "À aucun moment il n'a envisagé d'abandonner." },
        { english: "In no way can this be considered acceptable.", french: "En aucun cas cela ne peut être considéré comme acceptable." }
      ],
      rules: [
        "Not only/since/until: inversion avec auxiliaire",
        "At no point/time: inversion formelle",
        "In no way/circumstances: inversion emphatique",
        "Nowhere/nowhere else: inversion de lieu"
      ]
    },
    {
      id: 6,
      title: "Complex participle clauses",
      explanation: "Clauses participiales complexes avec différentes formes et temps.",
      examples: [
        { english: "Having been thoroughly examined, the document was approved.", french: "Ayant été soigneusement examiné, le document a été approuvé." },
        { english: "Weather permitting, we'll hold the event outside.", french: "Si le temps le permet, nous organiserons l'événement à l'extérieur." },
        { english: "There being no alternative, we accepted their terms.", french: "N'ayant pas d'alternative, nous avons accepté leurs conditions." }
      ],
      rules: [
        "Absolute constructions: there being..., weather permitting",
        "Having been + past participle pour le passif",
        "Being + adjective/past participle pour l'état",
        "Participles avec leurs propres objets et adverbes"
      ]
    },
    {
      id: 7,
      title: "Distancing dans l'écriture académique",
      explanation: "Techniques pour maintenir l'objectivité et la neutralité dans l'écriture académique.",
      examples: [
        { english: "It could be argued that the results are inconclusive.", french: "On pourrait soutenir que les résultats ne sont pas concluants." },
        { english: "The data seems to suggest a correlation.", french: "Les données semblent suggérer une corrélation." },
        { english: "There appears to be a discrepancy in the findings.", french: "Il semble y avoir une divergence dans les résultats." }
      ],
      rules: [
        "It + modal + passive: It could be argued/suggested that...",
        "Appear/seem to + be/suggest/indicate",
        "The evidence would appear to...",
        "According to the data/research..."
      ]
    },
    {
      id: 8,
      title: "Hedging (atténuation) académique",
      explanation: "Techniques d'atténuation pour présenter les idées avec prudence dans le contexte académique.",
      examples: [
        { english: "The results tend to indicate a significant relationship.", french: "Les résultats tendent à indiquer une relation significative." },
        { english: "To a certain extent, the theory appears valid.", french: "Dans une certaine mesure, la théorie semble valable." },
        { english: "It is perhaps too early to draw definitive conclusions.", french: "Il est peut-être trop tôt pour tirer des conclusions définitives." }
      ],
      rules: [
        "Modal hedging: may, might, could, appear to",
        "Adverbial hedging: perhaps, possibly, apparently",
        "Limiting scope: to some extent, largely, relatively",
        "Epistemic markers: seem to, tend to, suggest that"
      ]
    },
    {
      id: 9,
      title: "Nominalization avancée",
      explanation: "Transformation de verbes et adjectifs en noms pour un style académique formel.",
      examples: [
        { english: "The implementation of the policy led to significant improvements.", french: "La mise en œuvre de la politique a conduit à des améliorations significatives." },
        { english: "The complexity of the situation requires careful consideration.", french: "La complexité de la situation nécessite une réflexion approfondie." },
        { english: "The hypothesis implies a correlation between the variables.", french: "L'hypothèse implique une corrélation entre les variables." }
      ],
      rules: [
        "Verbe → nom: implement → implementation, apply → application",
        "Adjectif → nom: complex → complexity, intense → intensity",
        "Usage dans les sujets de phrase (style formel)",
        "Éviter la répétition des verbes dans l'écriture académique"
      ]
    },
    {
      id: 10,
      title: "Rapport de discours indirect complexe",
      explanation: "Techniques avancées pour rapporter du discours avec précision et nuance.",
      examples: [
        { english: "The minister went on to explain that the reforms would be gradual.", french: "Le ministre a poursuivi en expliquant que les réformes seraient progressives." },
        { english: "She was quoted as saying that the decision was inevitable.", french: "Elle a été citée disant que la décision était inévitable." },
        { english: "According to sources close to the matter, negotiations are ongoing.", french: "Selon des sources proches du dossier, les négociations sont en cours." }
      ],
      rules: [
        "Verbs of reporting: go on to say, be quoted as saying",
        "Attribution to sources: according to, sources indicate that",
        "Distance markers: allegedly, reportedly, supposedly",
        "Academic reporting: the study concludes/suggests/indicates"
      ]
    },
    {
      id: 11,
      title: "Concessives avancées",
      explanation: "Expressions sophistiquées de concession et contraste.",
      examples: [
        { english: "Albeit controversial, the decision was necessary.", french: "Bien que controversée, la décision était nécessaire." },
        { english: "For all her experience, she found the task challenging.", french: "Malgré toute son expérience, elle trouva la tâche difficile." },
        { english: "Granted that the evidence is limited, we must proceed.", french: "Bien que les preuves soient limitées, nous devons continuer." }
      ],
      rules: [
        "Albeit + adjective/clause (bien que)",
        "For all + noun/pronoun (malgré)",
        "Granted (that) + clause (en admettant que)",
        "Much as/Even though avec inversion possible"
      ]
    },
    {
      id: 12,
      title: "Qualifying expressions",
      explanation: "Expressions pour nuancer et préciser des affirmations dans l'écriture académique.",
      examples: [
        { english: "The results are valid, at least to some degree.", french: "Les résultats sont valables, du moins dans une certaine mesure." },
        { english: "The theory holds true, up to a point.", french: "La théorie reste vraie, jusqu'à un certain point." },
        { english: "This approach works, within certain limitations.", french: "Cette approche fonctionne, dans certaines limites." }
      ],
      rules: [
        "Degree qualifiers: to some extent, to a certain degree",
        "Limitation markers: up to a point, within limits",
        "Conditional qualifiers: assuming that, provided that",
        "Academic precision: largely, partially, predominantly"
      ]
    },
    {
      id: 13,
      title: "Complex preposition patterns",
      explanation: "Modèles de prépositions complexes dans le discours formel et académique.",
      examples: [
        { english: "His success came at the expense of his health.", french: "Son succès s'est fait au détriment de sa santé." },
        { english: "The proposal falls within the scope of our project.", french: "La proposition entre dans le cadre de notre projet." },
        { english: "The decision was made on the basis of careful analysis.", french: "La décision a été prise sur la base d'une analyse approfondie." }
      ],
      rules: [
        "Complex preps: at the expense of, within the scope of",
        "On the basis of, on the grounds that",
        "In the light of, in view of (formal reasoning)",
        "With regard to, with respect to (academic reference)"
      ]
    },
    {
      id: 14,
      title: "Non-finite clauses sophistiqués",
      explanation: "Clauses non finies avancées pour un style académique et littéraire.",
      examples: [
        { english: "The door having been locked, we had to wait outside.", french: "La porte ayant été verrouillée, nous avons dû attendre dehors." },
        { english: "For him to succeed, conditions must be perfect.", french: "Pour qu'il réussisse, les conditions doivent être parfaites." },
        { english: "There being no objections, the motion was passed.", french: "N'y ayant pas d'objections, la motion a été adoptée." }
      ],
      rules: [
        "Absolute constructions: noun/pronoun + participle",
        "For + object + to-infinitive clauses",
        "There being + construction for existence",
        "Weather permitting/failing construction"
      ]
    },
    {
      id: 15,
      title: "Emphasis through repetition and parallelism",
      explanation: "Techniques rhétoriques pour créer l'emphase à travers la répétition et le parallélisme.",
      examples: [
        { english: "We shall fight on the beaches, we shall fight on the landing grounds...", french: "Nous combattrons sur les plages, nous combattrons sur les terrains d'atterrissage..." },
        { english: "Not only did he succeed, but he excelled.", french: "Non seulement il a réussi, mais il a excellé." },
        { english: "The more you practice, the better you become.", french: "Plus vous pratiquez, meilleur vous devenez." }
      ],
      rules: [
        "Parallel structures: verb + prep phrase || verb + prep phrase",
        "Correlative conjunctions: not only...but also, either...or",
        "Comparative parallelism: the more...the more",
        "Triadic structures for effect: came, saw, conquered"
      ]
    },
    {
      id: 16,
      title: "Advanced modal meanings",
      explanation: "Nuances sophistiquées des modaux pour exprimer des degrés de certitude et d'obligation.",
      examples: [
        { english: "The experiment would seem to confirm our hypothesis.", french: "L'expérience semblerait confirmer notre hypothèse." },
        { english: "He couldn't have succeeded without support.", french: "Il n'aurait pas pu réussir sans soutien." },
        { english: "The data might well indicate a correlation.", french: "Les données pourraient bien indiquer une corrélation." }
      ],
      rules: [
        "Would + seem/appear: probabilité avec distance",
        "Modal perfects with adverbs: might well have, could hardly have",
        "Necessity variations: be bound to, be obliged to",
        "Academic speculation: should/ought to + be/have"
      ]
    },
    {
      id: 17,
      title: "Restrictions and limitations in academic writing",
      explanation: "Techniques pour exprimer des restrictions et limitations de manière précise.",
      examples: [
        { english: "The findings are confined to urban areas.", french: "Les résultats se limitent aux zones urbaines." },
        { english: "This research is restricted to qualitative data.", french: "Cette recherche est limitée aux données qualitatives." },
        { english: "The scope of this study is narrowed to social factors.", french: "Le champ de cette étude est restreint aux facteurs sociaux." }
      ],
      rules: [
        "Scope limitation: confine to, restrict to, limit to",
        "Methodological boundaries: focus on, concentrate on",
        "Temporal restrictions: for this period, during this timeframe",
        "Geographic boundaries: within this region, in this context"
      ]
    },
    {
      id: 18,
      title: "Advanced passive constructions",
      explanation: "Constructions passives élaborées dans différents contextes académiques et formels.",
      examples: [
        { english: "The decision is to be taken at the highest level.", french: "La décision doit être prise au plus haut niveau." },
        { english: "Patients are to have undergone screening by next week.", french: "Les patients doivent avoir subi un dépistage d'ici la semaine prochaine." },
        { english: "The proposal is likely to be rejected.", french: "La proposition est susceptible d'être rejetée." }
      ],
      rules: [
        "Be to be + past participle (arrangement formel)",
        "Be to have + past participle (accomplissement prévu)",
        "Likely/unlikely to be + past participle",
        "Need to be + past participle (nécessité passive)"
      ]
    },
    {
      id: 19,
      title: "Cohesion and coherence devices",
      explanation: "Dispositifs sophistiqués pour assurer la cohésion et la cohérence dans l'écriture académique.",
      examples: [
        { english: "As far as methodology is concerned, we adopted a mixed approach.", french: "En ce qui concerne la méthodologie, nous avons adopté une approche mixte." },
        { english: "Turning to the results, we can observe significant variations.", french: "En nous tournant vers les résultats, nous pouvons observer des variations significatives." },
        { english: "With respect to the limitations, several factors need consideration.", french: "En ce qui concerne les limitations, plusieurs facteurs nécessitent une prise en compte." }
      ],
      rules: [
        "Topic shift: turning to, moving on to, as for",
        "Reference: as mentioned previously, as stated above",
        "Consequence: as a consequence, it follows that",
        "Exemplification: as illustrated by, as can be seen from"
      ]
    },
    {
      id: 20,
      title: "Conditional variations sophistiqués",
      explanation: "Variations complexes des structures conditionnelles pour des nuances précises.",
      examples: [
        { english: "Were circumstances different, the outcome might have been better.", french: "Si les circonstances avaient été différentes, le résultat aurait pu être meilleur." },
        { english: "But for your intervention, the situation would have deteriorated.", french: "Sans votre intervention, la situation se serait détériorée." },
        { english: "Given the constraints, we did reasonably well.", french: "Étant donné les contraintes, nous nous en sommes raisonnablement bien sortis." }
      ],
      rules: [
        "But for + noun (= if it were not for)",
        "Given that + clause (étant donné que)",
        "Were it not for... (style formel)",
        "Whether or not + clause (que... ou non)"
      ]
    },
    {
      id: 21,
      title: "Metaphorical language patterns",
      explanation: "Utilisation de structures métaphoriques dans le discours académique et formel.",
      examples: [
        { english: "The study sheds light on previously unexplored territories.", french: "L'étude jette la lumière sur des territoires jusque-là inexplorés." },
        { english: "The research navigates through complex theoretical frameworks.", french: "La recherche navigue à travers des cadres théoriques complexes." },
        { english: "These findings bridge the gap between theory and practice.", french: "Ces résultats comblent le fossé entre théorie et pratique." }
      ],
      rules: [
        "Academic metaphors: shed light on, bridge the gap",
        "Movement metaphors: navigate through, traverse",
        "Building metaphors: lay groundwork, construct arguments",
        "Light/darkness metaphors: illuminate, obscure"
      ]
    },
    {
      id: 22,
      title: "Cause-effect relationships complexes",
      explanation: "Expressions sophistiquées pour décrire des relations de cause à effet multiples.",
      examples: [
        { english: "The decline in sales can be attributed to multiple factors.", french: "La baisse des ventes peut être attribuée à plusieurs facteurs." },
        { english: "The implementation of new policies is precipitated by changing demographics.", french: "La mise en œuvre de nouvelles politiques est précipitée par l'évolution démographique." },
        { english: "The emergence of these patterns stems from underlying structural changes.", french: "L'émergence de ces modèles découle de changements structurels sous-jacents." }
      ],
      rules: [
        "Attribution: attribute to, ascribe to, trace to",
        "Causation: precipitate, trigger, give rise to",
        "Origin: stem from, derive from, emanate from",
        "Result: result in, culminate in, lead to"
      ]
    },
    {
      id: 23,
      title: "Syntactic complexity in academic prose",
      explanation: "Structures syntaxiques complexes typiques de la prose académique.",
      examples: [
        { english: "What has been established, through extensive research, is that...", french: "Ce qui a été établi, grâce à des recherches approfondies, c'est que..." },
        { english: "The extent to which these factors influence outcomes remains unclear.", french: "La mesure dans laquelle ces facteurs influencent les résultats reste floue." },
        { english: "That such variations exist is well documented in the literature.", french: "Que de telles variations existent est bien documenté dans la littérature." }
      ],
      rules: [
        "Embedded clauses: What has been established is that...",
        "Complex noun phrases with multiple modifiers",
        "The extent to which constructions",
        "That-clauses as subjects"
      ]
    },
    {
      id: 24,
      title: "Formulaic expressions dans le discours académique",
      explanation: "Expressions formulaïques communes dans l'écriture académique et formelle.",
      examples: [
        { english: "As far as can be ascertained, the data is accurate.", french: "Pour autant qu'on puisse le vérifier, les données sont exactes." },
        { english: "All things being equal, the results should be consistent.", french: "Toutes choses étant égales par ailleurs, les résultats devraient être cohérents." },
        { english: "In light of recent developments, a reassessment is necessary.", french: "À la lumière des développements récents, une réévaluation est nécessaire." }
      ],
      rules: [
        "Academic qualifiers: as far as can be ascertained",
        "Conditional assumptions: all things being equal",
        "Contextual references: in light of, in view of",
        "Introductory formulae: it should be noted that"
      ]
    },
    {
      id: 25,
      title: "Corpus et registre académique",
      explanation: "Conscience du registre et choix lexicaux appropriés pour différents contextes académiques.",
      examples: [
        { english: "The data demonstrates significant correlation coefficients.", french: "Les données démontrent des coefficients de corrélation significatifs." },
        { english: "Subsequent analysis revealed previously undetected patterns.", french: "Une analyse ultérieure a révélé des modèles jusque-là non détectés." },
        { english: "The methodology employed facilitates comprehensive data collection.", french: "La méthodologie employée facilite une collecte de données complète." }
      ],
      rules: [
        "Formal vs informal: demonstrate vs show, employ vs use",
        "Academic verbs: facilitate, implement, demonstrate",
        "Technical precision: coefficient, methodology, analysis",
        "Avoiding contractions and colloquialisms"
      ]
    },
    {
      id: 26,
      title: "Utilisation stratégique de la ponctuation",
      explanation: "Emploi précis et nuancé de la ponctuation pour structurer le discours académique et formel.",
      examples: [
        { english: "The research addresses three key areas: methodology, analysis and interpretation.", french: "La recherche aborde trois domaines clés : méthodologie, analyse et interprétation." },
        { english: "The findings—while preliminary—suggest a correlation; however, further research is needed.", french: "Les résultats—bien que préliminaires—suggèrent une corrélation ; cependant, des recherches supplémentaires sont nécessaires." },
        { english: "This approach (which we term 'integrative analysis') combines multiple perspectives.", french: "Cette approche (que nous appelons 'analyse intégrative') combine plusieurs perspectives." }
      ],
      rules: [
        "Deux-points : pour introduire des listes, explications ou élaborations",
        "Point-virgule : pour connecter des propositions indépendantes mais liées",
        "Tirets et parenthèses : pour insérer des informations complémentaires",
        "Italiques et guillemets : pour mettre en évidence des termes spécifiques ou néologismes"
      ]
    },
    {
      id: 27,
      title: "Euphémismes et langage diplomatique",
      explanation: "Techniques pour adoucir les critiques et maintenir la neutralité dans des contextes sensibles.",
      examples: [
        { english: "The results were somewhat less promising than anticipated.", french: "Les résultats étaient quelque peu moins prometteurs que prévu." },
        { english: "There appears to be room for improvement in the methodology.", french: "Il semble y avoir une marge d'amélioration dans la méthodologie." },
        { english: "The arguments presented are not entirely persuasive.", french: "Les arguments présentés ne sont pas entièrement convaincants." }
      ],
      rules: [
        "Litotes (double négation) : not insignificant = significant",
        "Adverbes atténuants : somewhat, rather, relatively, comparatively",
        "Verbes euphémiques : enhance (improve), address (fix), consider (criticize)",
        "Expressions indirectes : less than ideal, leaves something to be desired"
      ]
    },
    {
      id: 28,
      title: "Registre et adaptation stylistique",
      explanation: "Adaptation consciente du style linguistique selon le contexte et l'audience.",
      examples: [
        { english: "Our investigation yielded significant results. [formal]", french: "Notre investigation a donné des résultats significatifs. [formel]" },
        { english: "We found some pretty important stuff. [informal]", french: "Nous avons trouvé des choses assez importantes. [informel]" },
        { english: "The aforementioned considerations notwithstanding... [very formal]", french: "Nonobstant les considérations susmentionnées... [très formel]" }
      ],
      rules: [
        "Registre formel : nominalisation, voix passive, vocabulaire spécialisé",
        "Registre semi-formel : équilibre entre clarté et précision académique",
        "Adaptation au public : simplication pour les non-spécialistes, précision pour les experts",
        "Conventions de genre : différences entre article scientifique, rapport technique, vulgarisation"
      ]
    }
  ];
  
  export default grammarRulesC1;