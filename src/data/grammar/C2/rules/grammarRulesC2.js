// grammarRulesC2.js
// Fichier contenant uniquement les règles grammaticales pour le niveau C2 du CECR

const grammarRulesC2 = [
  {
    id: 1,
    title: "Inversion archaïque et stylistique",
    explanation: "Structures d'inversion sophistiquées utilisées dans la littérature et le discours formel hautement stylisé.",
    examples: [
      { english: "Gone were the days of innocence and simplicity.", french: "Révolues étaient les jours d'innocence et de simplicité." },
      { english: "Great though his achievements may be, he remains humble.", french: "Aussi grands que soient ses accomplissements, il reste humble." },
      { english: "Thus spoke the prophet, and all were silent.", french: "Ainsi parla le prophète, et tous se turent." }
    ],
    rules: [
      "Though + adjective/adverb au début avec inversion",
      "Adjectif qualificatif au début avec verbe 'be' inversé",
      "Adverbes de mouvement au début: thus, hence, thence",
      "Participial inversion: standing before them was... / such was..."
    ]
  },
  {
    id: 2,
    title: "Modalité épistémique supérieure",
    explanation: "Nuances sophistiquées de modalité pour exprimer des degrés de certitude, de probabilité et d'attitude.",
    examples: [
      { english: "One would be inclined to think that this assumption lacks merit.", french: "On serait enclin à penser que cette hypothèse manque de fondement." },
      { english: "It would not be unreasonable to suppose that the evidence points elsewhere.", french: "Il ne serait pas déraisonnable de supposer que les preuves indiquent autre chose." },
      { english: "The evidence would tend to militate against such a conclusion.", french: "Les preuves tendraient à militer contre une telle conclusion." }
    ],
    rules: [
      "Be inclined to think/believe/suggest",
      "Would tend to indicate/suggest/show",
      "Not be unreasonable to suppose/assume",
      "Militate for/against construction"
    ]
  },
  {
    id: 3,
    title: "Subjunctive mood archaïque et formel",
    explanation: "Utilisations rares et formelles du subjonctif, y compris des formes archaïques encore trouvées dans la littérature.",
    examples: [
      { english: "Had I but known, I would have acted differently.", french: "N'eût-ce été que j'avais su, j'aurais agi différemment." },
      { english: "Come what may, we shall persevere.", french: "Advienne que pourra, nous persévérerons." },
      { english: "Be it resolved that this motion be adopted forthwith.", french: "Qu'il soit résolu que cette motion soit adoptée sans délai." }
    ],
    rules: [
      "Had I but/only known (= If only I had known)",
      "Come what may (= whatever happens)",
      "Be it resolved that... (style parlementaire)",
      "Lest + subject + uninflected form"
    ]
  },
  {
    id: 4,
    title: "Discourse metaphors et métastructures",
    explanation: "Structures métaphoriques complexes qui organisent le discours au niveau macrostructural.",
    examples: [
      { english: "The argument unfolds along the following trajectory...", french: "L'argumentation se déploie selon la trajectoire suivante..." },
      { english: "These findings constitute a cornerstone of the theoretical edifice.", french: "Ces résultats constituent une pierre angulaire de l'édifice théorique." },
      { english: "The discourse navigates between the Scylla of oversimplification and the Charybdis of obscurity.", french: "Le discours navigue entre Charybde de la simplification excessive et Scylla de l'obscurité." }
    ],
    rules: [
      "Journey metaphors: trajectory, navigate, path",
      "Building metaphors: edifice, cornerstone, foundation",
      "Water metaphors: flow, stream, current",
      "Classical allusions: Scylla and Charybdis, Pandora's box"
    ]
  },
  {
    id: 5,
    title: "Cataphoric et anaphoric references complexes",
    explanation: "Techniques sophistiquées de référence textuelle au-delà des pronoms simples.",
    examples: [
      { english: "What follows is a detailed exposition of the methodology employed in this study.", french: "Ce qui suit est une exposition détaillée de la méthodologie employée dans cette étude." },
      { english: "The aforementioned considerations notwithstanding, we must proceed with caution.", french: "Les considérations susmentionnées nonobstant, nous devons procéder avec prudence." },
      { english: "The latter proposition, whilst theoretically sound, faces practical limitations.", french: "Cette dernière proposition, bien que théoriquement solide, se heurte à des limitations pratiques." }
    ],
    rules: [
      "Cataphoric: what follows, in what follows, as will be shown",
      "Anaphoric: the aforementioned, the latter/former, as stated previously",
      "Demonstrative phrases: this being the case, such being the situation",
      "Academic references: in the preceding section, as outlined above"
    ]
  },
  {
    id: 6,
    title: "Metalinguistic commentaire",
    explanation: "Techniques pour commenter sur le langage et le discours lui-même dans le texte.",
    examples: [
      { english: "If I may be permitted to use a colloquialism, the plan went south.", french: "Si je peux me permettre d'employer un familiarisme, le plan a capoté." },
      { english: "To employ a somewhat hackneyed phrase, Rome wasn't built in a day.", french: "Pour employer une expression quelque peu éculée, Rome ne s'est pas bâtie en un jour." },
      { english: "Pardon the pun, but this theory lacks foundational support.", french: "Pardonnez le calembour, mais cette théorie manque de soutien fondamental." }
    ],
    rules: [
      "If I may be permitted to...",
      "To employ/use a phrase/expression",
      "Pardon the mixed metaphor/pun",
      "To put it in layman's terms/technical terms"
    ]
  },
  {
    id: 7,
    title: "Information packaging sophistiqué",
    explanation: "Techniques avancées pour organiser et présenter l'information de manière stratégique.",
    examples: [
      { english: "Not insignificant is the fact that previous studies overlooked this variable.", french: "Non négligeable est le fait que les études précédentes ont omis cette variable." },
      { english: "What bears emphasizing is the replicability of these results.", french: "Ce qu'il convient de souligner est la reproductibilité de ces résultats." },
      { english: "Worthy of note is the consistency across multiple trials.", french: "Digne de mention est la cohérence à travers plusieurs essais." }
    ],
    rules: [
      "Not insignificant/unimportant is the fact that...",
      "What bears emphasizing/mentioning/highlighting is...",
      "Worthy of note/attention/consideration is...",
      "Of particular interest/importance/relevance is..."
    ]
  },
  {
    id: 8,
    title: "Register shift and code-switching",
    explanation: "Maîtrise consciente du changement de registre et de style pour des effets rhétoriques.",
    examples: [
      { english: "The economic indicators suggest—dare I say it—a recession looms.", french: "Les indicateurs économiques suggèrent—oserai-je le dire—qu'une récession se profile." },
      { english: "The theory, as it were, fails to account for practical realities.", french: "La théorie, pour ainsi dire, ne tient pas compte des réalités pratiques." },
      { english: "Colloquially speaking, the project was dead in the water.", french: "En termes familiers, le projet était mort dans l'eau." }
    ],
    rules: [
      "Parenthetical asides: dare I say, if you will",
      "Register markers: colloquially speaking, academically speaking",
      "Hedging with style shift: as it were, so to speak",
      "Calculated informality: let's face it, to put it bluntly"
    ]
  },
  {
    id: 9,
    title: "Irony et indirect critique",
    explanation: "Techniques sophistiquées d'ironie et de critique indirecte dans le discours académique.",
    examples: [
      { english: "One might be forgiven for questioning the validity of such assumptions.", french: "On pourrait être pardonné de questionner la validité de telles hypothèses." },
      { english: "The methodology employed, while certainly novel, raises certain questions.", french: "La méthodologie employée, bien que certainement novatrice, soulève certaines questions." },
      { english: "It would be an understatement to say the evidence is inconclusive.", french: "Ce serait un euphémisme de dire que les preuves ne sont pas concluantes." }
    ],
    rules: [
      "One might be forgiven for...",
      "Euphemistic understatement for criticism",
      "Damning with faint praise: while certainly interesting...",
      "Litotes for emphasis: not inconsiderable, not unimpressive"
    ]
  },
  {
    id: 10,
    title: "Conditional sophistication extrême",
    explanation: "Structures conditionnelles hautement stylisées et nuancées.",
    examples: [
      { english: "Had it not been for the intervention of chance, the outcome would have differed markedly.", french: "N'eût été l'intervention du hasard, le résultat aurait différé notablement." },
      { english: "Were one to consider the implications thoroughly, certain inconsistencies emerge.", french: "Si l'on devait considérer les implications à fond, certaines incohérences émergent." },
      { english: "Should circumstances have aligned differently, the conclusions might well have been reversed.", french: "Si les circonstances s'étaient alignées différemment, les conclusions auraient pu être inversées." }
    ],
    rules: [
      "Had it not been for... (formal regret)",
      "Were one to... (impersonal conditional)",
      "Should circumstances have... (rare perfect conditional)",
      "Lest... (formal purpose/prevention)"
    ]
  },
  {
    id: 11,
    title: "Idiomatic académique élaboré",
    explanation: "Expressions idiomatiques spécifiques au registre académique le plus avancé.",
    examples: [
      { english: "This finding flies in the face of conventional wisdom.", french: "Cette découverte va à l'encontre de la sagesse conventionnelle." },
      { english: "The evidence cuts across traditional disciplinary boundaries.", french: "Les preuves transcendent les frontières disciplinaires traditionnelles." },
      { english: "These results call into question the entire theoretical framework.", french: "Ces résultats remettent en question l'ensemble du cadre théorique." }
    ],
    rules: [
      "Fly in the face of (contradict)",
      "Cut across (transcend boundaries)",
      "Call into question (challenge)",
      "Turn on its head (reverse understanding)"
    ]
  },
  {
    id: 12,
    title: "Nominalization et dénominalization stratégique",
    explanation: "Utilisation sophistiquée de la nominalisation et sa déconstruction pour l'effect rhétorique.",
    examples: [
      { english: "The implementation of the policy, or rather, how the policy was implemented...", french: "La mise en œuvre de la politique, ou plutôt, comment la politique a été mise en œuvre..." },
      { english: "The consideration of ethical implications necessitates that we consider ethically...", french: "La considération des implications éthiques nécessite que nous considérions de manière éthique..." },
      { english: "To reify this abstract concept, let us examine what reification entails.", french: "Pour réifier ce concept abstrait, examinons ce qu'implique la réification." }
    ],
    rules: [
      "Intentional dénominalisation for emphasis",
      "Metalinguistic commentary on nominalisation",
      "Verb → noun → verb for effect",
      "Deliberate repetition for rhetorical purpose"
    ]
  },
  {
    id: 13,
    title: "Hedging épistémique sophistiqué",
    explanation: "Techniques avancées d'atténuation pour nuancer les affirmations avec précision.",
    examples: [
      { english: "The data would appear to suggest, albeit tentatively, a correlation.", french: "Les données semblent suggérer, bien que de manière provisoire, une corrélation." },
      { english: "One might venture to propose that the relationship is not entirely coincidental.", french: "On pourrait se hasarder à proposer que la relation n'est pas entièrement fortuite." },
      { english: "It would not be entirely unreasonable to hypothesize that causation may be involved.", french: "Il ne serait pas entièrement déraisonnable d'émettre l'hypothèse qu'une causalité pourrait être impliquée." }
    ],
    rules: [
      "Modal stacking: would appear to suggest",
      "Multiple hedges in sequence",
      "Venture to propose/suggest",
      "Degrees of certainty: entirely, partially, marginally"
    ]
  },
  {
    id: 14,
    title: "Concessive sophistication",
    explanation: "Structures concessives hautement élaborées pour des arguments nuancés.",
    examples: [
      { english: "Notwithstanding the inherent limitations of the methodology...", french: "Nonobstant les limitations inhérentes de la méthodologie..." },
      { english: "The evidence, compelling as it may be, does not constitute conclusive proof.", french: "Les preuves, aussi convaincantes soient-elles, ne constituent pas une preuve concluante." },
      { english: "Granting the validity of the premises, the conclusions remain disputable.", french: "En admettant la validité des prémisses, les conclusions restent discutables." }
    ],
    rules: [
      "Notwithstanding: formal/legal concession",
      "Adjective + as/though + clause + may/might be",
      "Granting (that) + clause",
      "For all (that) + clause"
    ]
  },
  {
    id: 15,
    title: "Discours rapporté et attribution sophistiqués",
    explanation: "Techniques avancées pour rapporter et attribuer des idées avec précision académique.",
    examples: [
      { english: "Smith (2020) contends that the phenomenon transcends simple categorization.", french: "Smith (2020) soutient que le phénomène transcende une simple catégorisation." },
      { english: "The theory, as propounded by Johnson et al., posits a tripartite framework.", french: "La théorie, telle que développée par Johnson et al., postule un cadre tripartite." },
      { english: "According to the prevailing scholarly consensus, the matter remains unresolved.", french: "Selon le consensus universitaire dominant, la question reste non résolue." }
    ],
    rules: [
      "Academic reporting verbs: contend, posit, propound",
      "Citation integration: as propounded by, as theorized by",
      "Collective attribution: scholarly consensus, academic literature",
      "Qualification of sources: prevailing view, dominant perspective"
    ]
  },
  {
    id: 16,
    title: "Syntax parallèle complexe",
    explanation: "Structures parallèles hautement élaborées pour l'effet rhétorique et la clarté.",
    examples: [
      { english: "Not only does the theory account for observed phenomena, but it also predicts future occurrences with remarkable accuracy.", french: "Non seulement la théorie explique les phénomènes observés, mais elle prédit aussi les occurrences futures avec une précision remarquable." },
      { english: "Whether the results can be generalized to other populations or whether they remain context-specific constitutes a matter of ongoing debate.", french: "La question de savoir si les résultats peuvent être généralisés à d'autres populations ou s'ils restent spécifiques au contexte constitue une question de débat en cours." }
    ],
    rules: [
      "Balanced binary structures",
      "Whether...or whether constructions",
      "Parallel negation structures",
      "Correlative conjunctions with clauses"
    ]
  },
  {
    id: 17,
    title: "Deixis et temporal anchoring",
    explanation: "Références spatio-temporelles sophistiquées dans le discours académique.",
    examples: [
      { english: "As I write this in the summer of 2024, the implications of these findings continue to resonate.", french: "Alors que j'écris ceci à l'été 2024, les implications de ces découvertes continuent de résonner." },
      { english: "At the time of this writing, consensus remains elusive.", french: "Au moment où j'écris ces lignes, le consensus reste insaisissable." },
      { english: "In the present state of knowledge, such categorization appears premature.", french: "Dans l'état actuel des connaissances, une telle catégorisation semble prématurée." }
    ],
    rules: [
      "Temporal anchoring: as I write, at this juncture",
      "Knowledge state: in the present state of knowledge",
      "Epistemic time: currently, presently, as things stand",
      "Relative temporal positioning: at the time of writing"
    ]
  },
  {
    id: 18,
    title: "Modality dense et surposée",
    explanation: "Stratification de plusieurs modalités pour créer des nuances fines.",
    examples: [
      { english: "One might reasonably be expected to anticipate that such a methodology would necessarily yield questionable results.", french: "On pourrait raisonnablement s'attendre à anticiper qu'une telle méthodologie donnerait nécessairement des résultats discutables." },
      { english: "It could conceivably be argued that the potential implications might well necessitate reconsideration.", french: "On pourrait concevoir que les implications potentielles pourraient bien nécessiter une reconsidération." }
    ],
    rules: [
      "Multiple modal lexemes: might possibly could",
      "Adverbial modal stacking: reasonably, conceivably",
      "Necessity within possibility: might well necessitate",
      "Expectation modals: be expected to, be anticipated to"
    ]
  },
  {
    id: 19,
    title: "Genre-switching et style hybride",
    explanation: "Mélange conscient de genres et styles pour des effets rhétoriques spécifiques.",
    examples: [
      { english: "One might frame the question thus: what paradigmatic shift do these findings herald?", french: "On pourrait formuler la question ainsi : quel changement paradigmatique ces découvertes annoncent-elles ?" },
      { english: "The methodology, if one may employ a culinary metaphor, follows a recipe for empirical rigor.", french: "La méthodologie, si on peut se permettre une métaphore culinaire, suit une recette de rigueur empirique." }
    ],
    rules: [
      "Conscious register mixing",
      "Rhetorical questions in academic prose",
      "Domain metaphor introduction",
      "Narrative elements in analysis"
    ]
  },
  {
    id: 20,
    title: "Ellipsis sophistiqué",
    explanation: "Techniques d'ellipse élaborées pour la concision et l'effet stylistique.",
    examples: [
      { english: "The first hypothesis proved correct; the second, less so.", french: "La première hypothèse s'est avérée correcte ; la seconde, moins." },
      { english: "Some researchers advocate for qualitative methods, others for quantitative.", french: "Certains chercheurs préconisent les méthodes qualitatives, d'autres les quantitatives." },
      { english: "What was once considered peripheral has become central; what was central, marginal.", french: "Ce qui était autrefois considéré comme périphérique est devenu central ; ce qui était central, marginal." }
    ],
    rules: [
      "Comparative ellipsis with omitted elements",
      "Parallel structure with elliptical second clause",
      "Noun phrase ellipsis in contrast",
      "Polysyndetic vs asyndetic ellipsis"
    ]
  },
  {
    id: 21,
    title: "Metalinguistic reflection",
    explanation: "Réflexion explicite sur le langage utilisé et ses implications.",
    examples: [
      { english: "To characterize this as 'revolutionary' might seem hyperbolic, yet the term captures the essence of the transformation.", french: "Qualifier cela de 'révolutionnaire' pourrait sembler hyperbolique, pourtant ce terme capture l'essence de la transformation." },
      { english: "The choice of the term 'paradigm' here is deliberate, invoking Kuhn's framework.", french: "Le choix du terme 'paradigme' ici est délibéré, invoquant le cadre de Kuhn." },
      { english: "In employing the metaphor of 'scaffolding,' I aim to emphasize the supportive nature of the theory.", french: "En employant la métaphore d'échafaudage', je vise à souligner la nature de soutien de la théorie." }
    ],
    rules: [
      "Explicit lexical choice justification",
      "Etymology and semantic evolution",
      "Metaphor analysis and explanation",
      "Register consciousness commentary"
    ]
  },
  {
    id: 22,
    title: "Presupposition et implicature gestion",
    explanation: "Gestion sophistiquée des présuppositions et implications implicites.",
    examples: [
      { english: "Even granting the validity of these assumptions, which themselves require scrutiny...", french: "Même en admettant la validité de ces hypothèses, qui elles-mêmes nécessitent un examen..." },
      { english: "The notion that objectivity is attainable—a premise we must question—underpins this argument.", french: "La notion que l'objectivité est atteignable—une prémisse que nous devons questionner—sous-tend cet argument." },
      { english: "To say the evidence is 'compelling' is to invite examination of what constitutes compelling evidence.", french: "Dire que les preuves sont 'convaincantes' invite à examiner ce qui constitue des preuves convaincantes." }
    ],
    rules: [
      "Explicit presupposition marking",
      "Parenthetical challenges to assumptions",
      "Scare quotes for problematic terms",
      "Invitation to critical examination"
    ]
  },
  {
    id: 23,
    title: "Syntactic ambiguity résolue",
    explanation: "Gestion consciente de l'ambiguïté syntaxique pour la clarté académique.",
    examples: [
      { english: "The students who had studied thoroughly passed, as opposed to those who had studied thoroughly passed exams.", french: "Les étudiants qui avaient étudié à fond ont réussi, par opposition à ceux qui avaient étudié aux examens réussis à fond." },
      { english: "More important than studying grammar is understanding its application—not 'more important than studying grammar' the activity.", french: "Plus important que d'étudier la grammaire est de comprendre son application—pas 'plus important que d'étudier la grammaire' l'activité." }
    ],
    rules: [
      "Disambiguation through repetition",
      "Structural parallelism for clarity",
      "Parenthetical specification",
      "Relative clause disambiguation"
    ]
  },
  {
    id: 24,
    title: "Recursive structures et nesting",
    explanation: "Structures récursives sophistiquées qui permettent une expression nuancée.",
    examples: [
      { english: "The evidence that researchers, who had access to data that was itself contested, used to support claims that others had questioned, remains controversial.", french: "Les preuves que les chercheurs, qui avaient accès à des données elles-mêmes contestées, ont utilisées pour soutenir des affirmations que d'autres avaient questionnées, restent controversées." },
      { english: "What studies of studies of methodology have shown is that methodological meta-analysis, itself a methodology, requires its own methodological framework.", french: "Ce que les études d'études de méthodologie ont montré est que la méta-analyse méthodologique, elle-même une méthodologie, nécessite son propre cadre méthodologique." }
    ],
    rules: [
      "Multiple levels of embedding",
      "Self-referential structures",
      "Recursive definitions",
      "Meta-level constructions"
    ]
  },
  {
    id: 25,
    title: "Rhétorique académique et persuasion sophistiquée",
    explanation: "Techniques rhétoriques avancées pour l'argumentation et la persuasion académique.",
    examples: [
      { english: "One need not subscribe to the theoretical framework wholesale to appreciate its explanatory power.", french: "On n'a pas besoin de souscrire au cadre théorique en gros pour apprécier son pouvoir explicatif." },
      { english: "The implications extend beyond the immediate scope of this study, reaching into domains heretofore unconsidered.", french: "Les implications s'étendent au-delà de la portée immédiate de cette étude, atteignant des domaines jusqu'à présent non considérés." },
      { english: "That such a methodology yields consistent results across diverse contexts speaks to its robustness rather than its limitations.", french: "Qu'une telle méthodologie produise des résultats cohérents dans divers contextes témoigne de sa robustesse plutôt que de ses limitations." }
    ],
    rules: [
      "Concessive persuasion: need not accept entirely",
      "Scope extension rhetoric",
      "Positive reframing of limitations",
      "Appeal to universality: across diverse contexts"
    ]
  },
  {
    id: 26,
    title: "Analyse critique du discours",
    explanation: "Méthodes d'analyse et de déconstruction des structures rhétoriques et des constructions idéologiques dans le discours.",
    examples: [
      { english: "The text subtly reinforces dominant narratives through its selective emphasis on certain aspects of the issue.", french: "Le texte renforce subtilement les récits dominants par son accent sélectif sur certains aspects de la question." },
      { english: "Such phrasing reveals underlying assumptions that merit interrogation.", french: "Une telle formulation révèle des hypothèses sous-jacentes qui méritent d'être interrogées." },
      { english: "The rhetorical devices employed herein function to naturalize what are, in fact, contingent social arrangements.", french: "Les dispositifs rhétoriques employés ici fonctionnent pour naturaliser ce qui sont, en fait, des arrangements sociaux contingents." }
    ],
    rules: [
      "Identification des présupposés idéologiques",
      "Analyse des stratégies d'exclusion/inclusion",
      "Déconstruction des binarités conceptuelles",
      "Examen des métaphores conceptuelles structurantes"
    ]
  },
  {
    id: 27,
    title: "Jeux de mots et double sens",
    explanation: "Utilisation consciente de l'ambiguïté lexicale et sémantique à des fins stylistiques et argumentatives.",
    examples: [
      { english: "Their groundbreaking research was, quite literally, breaking new ground in geological exploration.", french: "Leur recherche révolutionnaire était, au sens propre, en train de creuser de nouveaux terrains dans l'exploration géologique." },
      { english: "The gravity of the situation cannot be overstated—particularly in astrophysical terms.", french: "La gravité de la situation ne peut être surestimée—particulièrement en termes astrophysiques." },
      { english: "His illuminating presentation shed light on several previously obscure theoretical dark corners.", french: "Sa présentation éclairante a jeté de la lumière sur plusieurs coins théoriques obscurs auparavant dans l'ombre." }
    ],
    rules: [
      "Double sens délibéré: exploitation des multiples significations",
      "Jeux sur polysémie technique/ordinaire",
      "Paronomase: jeux sur des mots similaires phonétiquement",
      "Exploitation consciente de métaphores figées"
    ]
  },
  {
    id: 28,
    title: "Usage littéraire de structures archaïques",
    explanation: "Emploi stratégique de formes grammaticales archaïques pour des effets stylistiques particuliers.",
    examples: [
      { english: "Whence cometh this notion, if not from a fundamentally flawed understanding?", french: "D'où vient donc cette notion, si ce n'est d'une compréhension fondamentalement imparfaite ?" },
      { english: "One must needs consider the historical context.", french: "Force est de considérer le contexte historique." },
      { english: "Methinks the theory doth promise too much.", french: "Il me semble que la théorie promet trop." }
    ],
    rules: [
      "Inversion sujet-verbe archaïque",
      "Formes verbales obsolètes: doth, hath, cometh",
      "Pronoms archaïques: thee, thou, thy, thine",
      "Archaïsmes lexicaux délibérés: ere, betwixt, forsooth, verily"
    ]
  }
];

export default grammarRulesC2;
