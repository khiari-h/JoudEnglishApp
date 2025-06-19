// chatbot/B1/scenarios/educationChoices.js

const educationChoices = {
    id: 12,
    title: "Education Choices",
    level: "B1",
    description: "Learn how to discuss educational paths, describe academic experiences and explain career choices.",
    estimatedTime: "15-20 minutes",
    vocabulary: ["études", "parcours", "diplôme", "spécialisation", "formation", "compétences", "université", "stage", "orientation", "débouchés"],
    steps: [
      {
        id: 1,
        botMessage: "Bonjour ! J'ai entendu dire que vous avez fait des études intéressantes. Pouvez-vous me parler de votre parcours éducatif ?",
        inputMode: "suggestions",
        suggestions: [
          "Après le baccalauréat scientifique, j'ai étudié l'ingénierie pendant cinq ans à l'université. J'ai obtenu mon diplôme avec une spécialisation en informatique et j'ai fait un stage de six mois dans une entreprise technologique.",
          "J'ai d'abord fait deux ans de médecine, mais j'ai réalisé que ce n'était pas fait pour moi. Je me suis réorienté vers la psychologie où j'ai obtenu une licence puis un master en psychologie clinique.",
          "Je n'ai pas suivi un parcours traditionnel. Après le lycée, j'ai travaillé pendant quelques années avant de reprendre des études en formation continue. J'ai obtenu un BTS en commerce international tout en travaillant à mi-temps."
        ],
        hints: "Décrivez votre parcours éducatif en mentionnant vos études, diplômes et éventuelles réorientations.",
        expectedKeywords: ["baccalauréat", "étudié", "université", "diplôme", "spécialisation", "stage", "licence", "master", "formation", "BTS"],
        feedback: {
          correct: "C'est un parcours très intéressant ! Qu'est-ce qui vous a motivé à choisir cette voie d'études ?",
          incorrect: "Pourriez-vous décrire votre parcours scolaire et les études que vous avez suivies ?"
        }
      },
      {
        id: 2,
        botMessage: "Qu'est-ce qui vous a motivé à choisir cette voie d'études particulière ?",
        inputMode: "hybrid",
        suggestions: [
          "J'ai toujours été passionné(e) par les sciences et la résolution de problèmes. L'ingénierie me permettait de combiner ces deux aspects tout en ayant de bonnes perspectives d'emploi dans un secteur qui m'intéresse.",
          "Mon choix a été influencé par un professeur inspirant au lycée qui m'a fait découvrir cette discipline. J'ai aussi été attiré(e) par la diversité des débouchés professionnels que ces études offraient.",
          "En fait, c'était un compromis entre mes centres d'intérêt personnels et les réalités du marché du travail. Je cherchais une formation qui me plaise mais qui m'offre aussi de réelles opportunités professionnelles."
        ],
        hints: "Expliquez les raisons qui ont motivé votre choix d'études.",
        expectedKeywords: ["passionné", "sciences", "perspectives", "emploi", "influencé", "professeur", "débouchés", "compromis", "centres d'intérêt", "marché"],
        acceptablePhrases: [
          "j'ai toujours été passionné",
          "mon choix a été influencé",
          "c'était un compromis",
          "ce qui m'a motivé",
          "j'ai choisi cette voie"
        ],
        feedback: {
          correct: "Je comprends vos motivations. Avec le recul, êtes-vous satisfait(e) de ce choix d'études ? Y a-t-il des choses que vous auriez faites différemment ?",
          partial: "C'est intéressant de voir comment vos intérêts ont guidé votre parcours.",
          incorrect: "Expliquez pourquoi vous avez choisi cette voie d'études plutôt qu'une autre."
        }
      },
      {
        id: 3,
        botMessage: "Avec le recul, êtes-vous satisfait(e) de ce choix d'études ? Y a-t-il des choses que vous auriez faites différemment ?",
        inputMode: "freeText",
        suggestions: [
          "Globalement, je suis satisfait(e) de mon parcours car il m'a ouvert les portes du métier que j'exerce aujourd'hui. Cependant, j'aurais peut-être dû faire plus de stages pratiques pendant mes études pour avoir une meilleure idée du monde professionnel.",
          "Je ne regrette pas mon choix, mais j'aurais aimé avoir plus d'informations sur les différentes spécialisations possibles avant de me décider. J'aurais peut-être choisi une orientation légèrement différente qui correspondrait mieux à mes aspirations actuelles.",
          "Si c'était à refaire, je choisirais probablement la même discipline mais dans un établissement différent. J'ai trouvé que mon université était trop théorique et pas assez connectée aux réalités du marché du travail dans ce domaine."
        ],
        hints: "Dites si vous êtes satisfait(e) de votre parcours éducatif et ce que vous auriez pu faire différemment.",
        expectedKeywords: ["satisfait", "parcours", "ouvert", "portes", "stages", "regrette", "informations", "spécialisations", "orientation", "établissement"],
        feedback: {
          correct: "C'est une réflexion intéressante sur votre parcours. Dans quelle mesure pensez-vous que vos études vous ont préparé(e) à votre carrière actuelle ?",
          partial: "L'expérience nous permet souvent de porter un regard différent sur nos choix passés.",
          incorrect: "Exprimez votre niveau de satisfaction concernant vos choix éducatifs et mentionnez ce que vous auriez pu faire différemment."
        }
      },
      {
        id: 4,
        botMessage: "Dans quelle mesure estimez-vous que vos études vous ont bien préparé(e) à votre carrière actuelle ?",
        inputMode: "suggestions",
        suggestions: [
          "Mes études m'ont donné une base théorique solide, mais j'ai dû acquérir beaucoup de compétences pratiques une fois en poste. Il y avait un décalage entre le contenu académique et les exigences professionnelles réelles.",
          "La formation que j'ai reçue était très complète et axée sur la pratique, avec de nombreux projets en conditions réelles. Je me suis senti(e) bien préparé(e) pour entrer dans le monde du travail.",
          "Certains aspects de ma formation ont été très utiles, notamment les compétences techniques, mais j'ai dû développer par moi-même des compétences transversales comme la gestion de projet ou la communication qui sont essentielles dans mon métier."
        ],
        hints: "Évaluez comment vos études vous ont préparé(e) à votre carrière actuelle.",
        expectedKeywords: ["base", "théorique", "compétences", "pratiques", "décalage", "académique", "formation", "projets", "techniques", "transversales"],
        feedback: {
          correct: "C'est une analyse pertinente du lien entre formation et réalités professionnelles. Quels conseils donneriez-vous à quelqu'un qui souhaite se lancer dans le même domaine d'études aujourd'hui ?",
          incorrect: "Expliquez dans quelle mesure votre formation académique vous a préparé(e) à votre carrière professionnelle."
        }
      },
      {
        id: 5,
        botMessage: "Quels conseils donneriez-vous à quelqu'un qui souhaite se lancer dans le même domaine d'études aujourd'hui ?",
        inputMode: "hybrid",
        suggestions: [
          "Je lui conseillerais de bien se renseigner sur les différentes écoles et leurs spécificités, de multiplier les stages pendant les études, et de commencer à se constituer un réseau professionnel le plus tôt possible. Les compétences techniques sont importantes, mais le réseau l'est tout autant.",
          "Je suggérerais de combiner des études théoriques avec des projets personnels concrets dans le domaine. Par exemple, si on étudie l'informatique, créer des applications ou contribuer à des projets open source en parallèle des cours.",
          "Je recommanderais de prendre le temps d'explorer différentes branches du domaine avant de se spécialiser, car les étudiants ont souvent une vision limitée des possibilités professionnelles. Je conseillerais aussi d'apprendre au moins une langue étrangère, c'est un vrai plus."
        ],
        hints: "Donnez des conseils pratiques à quelqu'un qui voudrait suivre le même parcours éducatif que vous.",
        expectedKeywords: ["renseigner", "écoles", "stages", "réseau", "théoriques", "projets", "personnels", "explorer", "branches", "spécialiser"],
        feedback: {
          correct: "Ce sont d'excellents conseils, très pratiques. Comment voyez-vous l'évolution de ce domaine d'études dans les années à venir ?",
          partial: "Ce conseil est particulièrement pertinent dans le contexte éducatif actuel.",
          incorrect: "Donnez des conseils pratiques à quelqu'un qui voudrait faire les mêmes études que vous."
        }
      },
      {
        id: 6,
        botMessage: "Comment pensez-vous que ce domaine d'études va évoluer dans les prochaines années ? Les compétences recherchées seront-elles différentes ?",
        inputMode: "freeText",
        suggestions: [
          "Je pense que les formations vont devenir plus interdisciplinaires. Dans mon domaine technique, les compétences en communication et en éthique sont de plus en plus valorisées. Les programmes devront s'adapter pour inclure ces dimensions transversales.",
          "Les avancées technologiques transforment rapidement ce secteur. Les étudiants devront être formés à des outils qui n'existent peut-être pas encore. La capacité d'adaptation et d'apprentissage continu sera plus importante que les connaissances spécifiques.",
          "Je crois que les formations hybrides, mêlant présentiel et distanciel, vont se généraliser. Les compétences numériques seront essentielles dans tous les domaines. Les parcours seront aussi plus personnalisés, avec des micro-certifications complémentaires au diplôme principal."
        ],
        hints: "Décrivez comment vous imaginez l'évolution future de ce domaine d'études et des compétences requises.",
        expectedKeywords: ["interdisciplinaires", "communication", "éthique", "technologiques", "transforment", "adaptation", "apprentissage", "hybrides", "numériques", "personnalisés"],
        acceptablePhrases: [
          "je pense que",
          "les formations vont",
          "les étudiants devront",
          "je crois que",
          "les compétences seront"
        ],
        feedback: {
          correct: "C'est une analyse perspicace des tendances éducatives futures. Pensez-vous que l'apprentissage tout au long de la vie deviendra plus important que les diplômes initiaux ?",
          partial: "Vous avez identifié une tendance importante dans l'évolution des formations.",
          incorrect: "Expliquez comment ce domaine d'études pourrait évoluer dans le futur et quelles nouvelles compétences seront demandées."
        }
      },
      {
        id: 7,
        botMessage: "Pensez-vous que la formation continue et l'apprentissage tout au long de la vie prennent le pas sur la formation initiale traditionnelle ?",
        inputMode: "suggestions",
        suggestions: [
          "Absolument. Dans mon secteur, les connaissances deviennent obsolètes très rapidement. Le diplôme initial est une base, mais il faut constamment se former pour rester pertinent. Les entreprises valorisent d'ailleurs de plus en plus cette capacité à évoluer.",
          "Je pense que les deux approches sont complémentaires. Un bon socle initial reste fondamental, mais il doit être complété par une mise à jour régulière des compétences. Le rythme de l'innovation ne nous laisse pas le choix.",
          "Je reste convaincu(e) que la formation initiale garde une grande valeur, notamment pour les compétences fondamentales et la méthodologie. Cependant, les périodes d'apprentissage et de travail vont probablement s'alterner davantage tout au long de la vie."
        ],
        hints: "Donnez votre opinion sur l'importance relative de la formation initiale et de la formation continue.",
        expectedKeywords: ["obsolètes", "diplôme", "base", "former", "pertinent", "complémentaires", "socle", "mise à jour", "fondamentales", "méthodologie"],
        feedback: {
          correct: "C'est une réflexion pertinente sur l'équilibre entre formation initiale et continue. Pour finir, quel est selon vous le plus grand défi du système éducatif actuel ?",
          incorrect: "Donnez votre avis sur l'importance relative de la formation initiale par rapport à l'apprentissage tout au long de la vie."
        }
      },
      {
        id: 8,
        botMessage: "Pour terminer, quel est selon vous le plus grand défi du système éducatif actuel ?",
        inputMode: "hybrid",
        suggestions: [
          "Je pense que le plus grand défi est d'adapter les méthodes d'enseignement aux nouvelles façons d'apprendre des jeunes générations, tout en leur transmettant des compétences durables dans un monde en constante évolution technologique.",
          "Le principal défi est de réduire le fossé entre éducation et monde professionnel. Trop d'étudiants obtiennent des diplômes qui ne correspondent pas aux besoins réels du marché du travail, créant à la fois chômage et pénurie de compétences.",
          "Pour moi, le défi majeur est l'accès équitable à une éducation de qualité. Les inégalités se creusent entre ceux qui peuvent accéder aux meilleures formations et les autres, ce qui limite la mobilité sociale et le développement du potentiel de nombreux jeunes talents."
        ],
        hints: "Identifiez ce que vous considérez comme le défi principal du système éducatif aujourd'hui.",
        expectedKeywords: ["adapter", "méthodes", "compétences", "durables", "fossé", "professionnel", "diplômes", "besoins", "accès", "inégalités"],
        feedback: {
          correct: "C'est effectivement un défi majeur pour l'éducation contemporaine. Merci beaucoup pour cette discussion enrichissante sur votre parcours éducatif et vos réflexions sur l'éducation !",
          partial: "Vous soulevez un point crucial pour l'avenir de l'éducation.",
          incorrect: "Identifiez ce que vous considérez comme le principal défi du système éducatif actuel."
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à discuter en détail de votre parcours éducatif, à analyser vos choix d'études et à partager votre vision sur l'évolution du système éducatif.",
    learningObjectives: [
      "Décrire un parcours éducatif de façon détaillée",
      "Expliquer les motivations de choix d'études",
      "Analyser la relation entre formation et carrière",
      "Formuler des conseils en matière d'orientation",
      "Réfléchir sur les tendances éducatives contemporaines"
    ],
    grammar: {
      points: [
        "Utilisation du passé composé et de l'imparfait pour raconter",
        "Conditionnel présent pour les hypothèses",
        "Expressions d'opinion et d'argumentation",
        "Connecteurs logiques pour structurer le discours"
      ]
    }
  };

  export default educationChoices;
