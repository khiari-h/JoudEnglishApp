// chatbot/B1/scenarios/travelExperiences.js

const travelExperiences = {
    id: 10,
    title: "Travel Experiences",
    level: "B1",
    description: "Learn how to narrate travel experiences in detail, describe places visited and make recommendations.",
    estimatedTime: "15-20 minutes",
    vocabulary: ["voyage", "destination", "découverte", "séjour", "hébergement", "itinéraire", "incontournable", "authentique", "expérience", "recommandation"],
    steps: [
      {
        id: 1,
        botMessage: "Bonjour ! J'ai entendu dire que vous avez fait un voyage intéressant récemment. Quelle destination avez-vous visitée et pourquoi avez-vous choisi cet endroit ?",
        inputMode: "suggestions",
        suggestions: [
          "J'ai passé deux semaines au Portugal l'été dernier. J'ai choisi cette destination pour sa riche histoire, ses plages magnifiques et sa gastronomie réputée à des prix abordables.",
          "Je suis allé(e) au Japon au printemps. C'était un rêve depuis longtemps car je suis fasciné(e) par la culture japonaise, entre tradition et modernité, et je voulais voir les cerisiers en fleurs.",
          "J'ai fait un road trip dans les parcs nationaux de l'ouest américain. J'adore la nature et les grands espaces, et cette région offre des paysages spectaculaires très différents les uns des autres."
        ],
        hints: "Indiquez la destination que vous avez visitée et expliquez les raisons de votre choix.",
        expectedKeywords: ["destination", "choisi", "passé", "semaines", "été", "printemps", "culture", "nature", "fasciné", "rêve"],
        feedback: {
          correct: "Quelle destination intéressante ! Combien de temps a duré votre voyage et comment l'avez-vous organisé ?",
          incorrect: "Pourriez-vous préciser quelle destination vous avez visitée et pourquoi vous avez choisi cet endroit ?"
        }
      },
      {
        id: 2,
        botMessage: "Combien de temps a duré votre voyage et comment l'avez-vous organisé ? Avez-vous tout préparé à l'avance ou préférez-vous l'improvisation ?",
        inputMode: "hybrid",
        suggestions: [
          "Mon voyage a duré 10 jours. J'ai réservé les vols et les hôtels à l'avance, mais j'ai gardé une certaine flexibilité pour les activités quotidiennes en fonction de la météo et de mon énergie.",
          "J'y suis resté(e) trois semaines. J'ai organisé ce voyage avec une agence spécialisée car c'était ma première fois dans ce pays et je voulais être sûr(e) de ne rien manquer d'essentiel.",
          "Ce séjour d'un mois était assez improvisé. J'avais juste réservé le premier hébergement et acheté un billet aller-retour. J'aime la liberté de décider sur place selon les rencontres et les découvertes."
        ],
        hints: "Précisez la durée de votre voyage et votre approche en matière d'organisation (préparation vs improvisation).",
        expectedKeywords: ["duré", "jours", "semaines", "mois", "réservé", "organisé", "agence", "flexibilité", "improvisé", "liberté"],
        acceptablePhrases: [
          "mon voyage a duré",
          "j'y suis resté",
          "ce séjour était",
          "j'ai réservé",
          "j'ai organisé"
        ],
        feedback: {
          correct: "C'est une bonne façon d'organiser un voyage. Quel a été le moment le plus mémorable ou la découverte la plus surprenante de votre séjour ?",
          partial: "Cette approche a ses avantages. Avez-vous rencontré des imprévus avec cette organisation ?",
          incorrect: "Précisez la durée de votre voyage et comment vous l'avez organisé (planification à l'avance ou improvisation)."
        }
      },
      {
        id: 3,
        botMessage: "Quel a été le moment le plus mémorable ou la découverte la plus surprenante de votre voyage ?",
        inputMode: "freeText",
        suggestions: [
          "Le moment le plus marquant a été notre randonnée jusqu'à un temple isolé en montagne au lever du soleil. La vue était à couper le souffle et l'atmosphère de sérénité inoubliable, surtout que nous étions les seuls visiteurs à cette heure-là.",
          "J'ai été surpris(e) par un village côtier peu touristique que nous avons découvert par hasard. Nous y avons dégusté le meilleur repas de tout notre séjour, préparé par une famille locale qui nous a accueillis comme si nous étions des amis de longue date.",
          "La rencontre avec un artisan traditionnel qui nous a invités dans son atelier a été un moment privilégié. Il nous a montré des techniques transmises depuis des générations et nous a raconté l'histoire de son métier avec une passion contagieuse."
        ],
        hints: "Racontez un moment ou une découverte particulièrement marquant(e) de votre voyage avec des détails précis.",
        expectedKeywords: ["moment", "marquant", "randonnée", "temple", "vue", "village", "surpris", "rencontre", "artisan", "passion"],
        feedback: {
          correct: "Quelle expérience fascinante ! Avez-vous rencontré des difficultés ou des défis particuliers pendant votre voyage ?",
          partial: "Cette découverte semble vraiment spéciale. Avez-vous pu capturer ce moment en photo ?",
          incorrect: "Décrivez un moment ou une découverte particulièrement mémorable de votre voyage."
        }
      },
      {
        id: 4,
        botMessage: "Avez-vous rencontré des difficultés ou des défis pendant votre voyage ? Comment les avez-vous surmontés ?",
        inputMode: "suggestions",
        suggestions: [
          "Nous avons eu un problème avec notre réservation d'hôtel qui avait été perdue. Heureusement, le personnel a été compréhensif et nous a trouvé une autre chambre dans un établissement partenaire à proximité.",
          "La barrière de la langue a été plus problématique que prévu, surtout dans les zones rurales. J'ai dû utiliser une application de traduction et beaucoup de langage corporel pour communiquer, ce qui a créé des situations parfois comiques.",
          "Un de nos vols intérieurs a été annulé à cause de la météo, ce qui a bouleversé notre itinéraire. Nous avons dû réorganiser notre parcours et sauter une étape prévue, mais cela nous a permis de passer plus de temps dans un lieu que nous avons adoré."
        ],
        hints: "Décrivez un problème que vous avez rencontré durant votre voyage et comment vous l'avez résolu.",
        expectedKeywords: ["problème", "réservation", "barrière", "langue", "annulé", "météo", "itinéraire", "communiquer", "réorganiser", "résolu"],
        feedback: {
          correct: "Vous avez bien géré cette situation ! Qu'avez-vous le plus apprécié dans la culture locale ou les habitudes de vie des habitants ?",
          incorrect: "Mentionnez une difficulté que vous avez rencontrée pendant votre voyage et expliquez comment vous y avez fait face."
        }
      },
      {
        id: 5,
        botMessage: "Qu'avez-vous particulièrement apprécié dans la culture locale ou les habitudes de vie des habitants ?",
        inputMode: "hybrid",
        suggestions: [
          "J'ai été impressionné(e) par le rythme de vie détendu et la façon dont les habitants prennent le temps de savourer les moments simples, comme les repas en famille ou les promenades du soir. Cela m'a fait réfléchir sur notre course permanente contre le temps.",
          "Ce qui m'a marqué, c'est l'hospitalité naturelle des locaux. Même avec peu de moyens, ils étaient toujours prêts à partager et à aider. Cette générosité spontanée m'a beaucoup touché(e) et inspiré(e).",
          "J'ai adoré la relation harmonieuse que les habitants entretiennent avec la nature. Leurs pratiques quotidiennes de développement durable sont intégrées naturellement dans leur mode de vie, sans être vécues comme des contraintes."
        ],
        hints: "Décrivez un aspect de la culture locale ou du mode de vie qui vous a particulièrement plu ou impressionné.",
        expectedKeywords: ["rythme", "vie", "habitants", "temps", "hospitalité", "locaux", "partager", "générosité", "relation", "nature"],
        feedback: {
          correct: "C'est fascinant d'observer ces différences culturelles. Quels conseils donneriez-vous à quelqu'un qui souhaite visiter cette destination ?",
          partial: "Cette observation culturelle est très intéressante. Pensez-vous pouvoir intégrer certains de ces aspects dans votre vie quotidienne ?",
          incorrect: "Indiquez un aspect de la culture locale ou des habitudes de vie qui vous a particulièrement impressionné."
        }
      },
      {
        id: 6,
        botMessage: "Si quelqu'un souhaitait visiter cette destination, quels conseils ou recommandations lui donneriez-vous ?",
        inputMode: "freeText",
        suggestions: [
          "Je recommanderais d'éviter la haute saison touristique pour profiter des lieux avec moins de monde et des prix plus abordables. Il est aussi essentiel d'apprendre quelques phrases de base dans la langue locale, cela fait une grande différence dans les interactions. Ne manquez surtout pas la région côtière qui est moins connue mais absolument magnifique.",
          "Mon conseil principal serait de prévoir suffisamment de temps pour chaque étape et ne pas vouloir tout voir. Mieux vaut explorer moins d'endroits mais plus en profondeur. Je suggère aussi de s'éloigner des circuits touristiques classiques et de loger dans des hébergements locaux pour une expérience plus authentique.",
          "Je conseillerais de bien se renseigner sur les coutumes locales avant de partir pour éviter les impairs culturels. Par exemple, certains gestes anodins chez nous peuvent être considérés comme irrespectueux là-bas. Aussi, prévoyez un budget un peu plus élevé que prévu car certaines régions sont plus chères qu'on ne le pense."
        ],
        hints: "Donnez des conseils pratiques et des recommandations à quelqu'un qui voudrait visiter cette destination.",
        expectedKeywords: ["recommanderais", "éviter", "saison", "apprendre", "phrases", "prévoir", "temps", "s'éloigner", "circuits", "coutumes"],
        acceptablePhrases: [
          "je recommanderais",
          "mon conseil serait",
          "je conseillerais",
          "ne manquez pas",
          "il est important de"
        ],
        feedback: {
          correct: "Ce sont d'excellents conseils qui seront certainement utiles aux futurs voyageurs. Avez-vous rapporté des souvenirs particuliers de ce voyage ?",
          partial: "Ces recommandations sont très pertinentes pour quelqu'un qui prépare son voyage.",
          incorrect: "Donnez quelques conseils pratiques à une personne qui souhaiterait visiter cette destination."
        }
      },
      {
        id: 7,
        botMessage: "Avez-vous rapporté des souvenirs particuliers ou avez-vous adopté certaines pratiques ou habitudes découvertes pendant ce voyage ?",
        inputMode: "suggestions",
        suggestions: [
          "J'ai rapporté des produits artisanaux locaux, notamment des céramiques faites à la main qui me rappellent chaque jour ce voyage. J'ai aussi adopté leur façon de préparer le café, un rituel que je continue de pratiquer chez moi.",
          "Plus que des objets, j'ai rapporté des milliers de photos qui me permettent de revivre ces moments. Et depuis ce voyage, j'ai intégré la pratique de la méditation matinale que j'ai découverte là-bas, cela a vraiment changé mon quotidien.",
          "J'ai ramené quelques spécialités culinaires et des épices introuvables chez nous. Mais surtout, ce voyage m'a donné envie d'apprendre la langue, ce que je fais depuis mon retour. C'est une façon de maintenir un lien avec cette culture qui m'a tant plu."
        ],
        hints: "Décrivez les souvenirs (objets, photos, habitudes) que vous avez rapportés de votre voyage.",
        expectedKeywords: ["rapporté", "artisanaux", "photos", "adopté", "pratique", "méditation", "spécialités", "culinaires", "apprendre", "langue"],
        feedback: {
          correct: "Ces souvenirs sont une belle façon de prolonger l'expérience du voyage. Envisagez-vous de retourner dans ce pays ou avez-vous d'autres destinations en tête pour vos prochains voyages ?",
          incorrect: "Parlez des souvenirs que vous avez rapportés ou des habitudes que vous avez adoptées suite à ce voyage."
        }
      },
      {
        id: 8,
        botMessage: "Pour conclure, envisagez-vous de retourner dans ce pays ou avez-vous d'autres destinations qui vous font rêver pour vos prochains voyages ?",
        inputMode: "hybrid",
        suggestions: [
          "J'aimerais définitivement y retourner un jour, mais cette fois pour explorer la partie nord que je n'ai pas eu le temps de visiter. Cependant, mon prochain voyage sera probablement en Amérique latine, une région que je n'ai jamais explorée mais qui m'attire pour sa diversité culturelle et naturelle.",
          "Je pense que je n'y retournerai pas immédiatement, car j'aime découvrir de nouveaux endroits. Mon prochain projet est un voyage en Asie du Sud-Est pour découvrir la Thaïlande, le Vietnam et le Cambodge. Je suis particulièrement intéressé(e) par les sites historiques et la cuisine locale.",
          "J'envisage d'y retourner dès l'année prochaine, car j'ai créé des liens avec des locaux et je me suis senti(e) vraiment à l'aise dans ce pays. Mais j'ai aussi une longue liste de destinations de rêve, notamment la Nouvelle-Zélande pour ses paysages spectaculaires et son mode de vie proche de la nature."
        ],
        hints: "Indiquez si vous souhaitez retourner dans ce pays et/ou quelles sont vos futures destinations de voyage.",
        expectedKeywords: ["retourner", "prochain", "voyage", "explorer", "découvrir", "projet", "Asie", "Amérique", "intéressé", "destinations"],
        feedback: {
          correct: "Ces projets de voyage semblent passionnants ! Merci beaucoup d'avoir partagé votre expérience de voyage et vos impressions. C'était très enrichissant !",
          partial: "Il y a tant de belles destinations à découvrir dans le monde. Chaque voyage nous apporte de nouvelles perspectives.",
          incorrect: "Dites si vous aimeriez retourner dans ce pays et/ou quelles autres destinations vous intéressent pour l'avenir."
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à raconter une expérience de voyage en détail, à décrire des lieux, des moments marquants et à formuler des recommandations en français.",
    learningObjectives: [
      "Raconter chronologiquement une expérience de voyage",
      "Décrire des lieux et des moments marquants avec précision",
      "Exprimer des réactions personnelles face à des découvertes culturelles",
      "Formuler des conseils et des recommandations",
      "Utiliser le vocabulaire spécifique au voyage et au tourisme"
    ],
    grammar: {
      points: [
        "Passé composé et imparfait pour le récit",
        "Expressions de temps et de lieu",
        "Adjectifs descriptifs et comparatifs",
        "Conditionnel pour les conseils et recommandations"
      ]
    }
  };
  
  export default travelExperiences;