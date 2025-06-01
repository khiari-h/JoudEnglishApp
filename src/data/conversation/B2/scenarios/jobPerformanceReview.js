// chatbot/B2/scenarios/jobPerformanceReview.js

const jobPerformanceReview = {
    id: 2,
    title: "Job Performance Review",
    level: "B2",
    description: "Learn how to participate in a professional performance evaluation, discuss achievements, areas for improvement, and career development.",
    estimatedTime: "20-25 minutes",
    vocabulary: ["évaluation", "performance", "objectifs", "compétences", "réalisations", "progression", "développement", "feedback", "amélioration", "perspectives"],
    steps: [
      {
        id: 1,
        botMessage: "Bonjour, merci de vous être libéré(e) pour cet entretien annuel d'évaluation. Avant d'aborder vos objectifs et résultats spécifiques, j'aimerais que vous me fassiez un bilan général de votre année professionnelle. Quels ont été, selon vous, vos principales réussites et défis ?",
        inputMode: "suggestions",
        suggestions: [
          "Bonjour. Cette année a été globalement positive pour moi. Ma principale réussite a été la gestion du projet X, livré dans les délais malgré des contraintes budgétaires importantes. J'ai également renforcé mes compétences en management d'équipe. Le principal défi a été la réorganisation du département qui a demandé beaucoup d'adaptabilité.",
          "Cette année a comporté plusieurs défis. J'ai dû m'approprier rapidement de nouvelles responsabilités suite au départ de mon collègue. Malgré ces difficultés, j'ai réussi à maintenir la qualité de service et même à améliorer la satisfaction client de 12%. La communication avec certains départements reste cependant un point à améliorer.",
          "L'année a été intense mais enrichissante. J'ai particulièrement réussi à développer notre présence sur les réseaux sociaux, augmentant notre engagement de 30%. J'ai également pris l'initiative de former trois nouveaux collaborateurs. Mon principal défi a été la gestion du temps face à la multiplication des projets simultanés."
        ],
        hints: "Présentez un bilan équilibré de votre année professionnelle, en mentionnant à la fois des réussites concrètes et des défis rencontrés.",
        expectedKeywords: ["réussite", "défi", "projet", "compétences", "management", "responsabilités", "satisfaction", "améliorer", "initiative", "gestion"],
        feedback: {
          correct: "Merci pour ce bilan bien structuré. J'aimerais approfondir certains aspects. Pourriez-vous détailler davantage l'une de vos réussites et expliquer comment vous l'avez accomplie ?",
          incorrect: "Pourriez-vous présenter un bilan plus complet de votre année professionnelle, en mentionnant à la fois des réussites et des défis ?"
        }
      },
      {
        id: 2,
        botMessage: "Pourriez-vous approfondir l'une de vos principales réussites professionnelles de cette année ? J'aimerais comprendre votre méthodologie, les obstacles surmontés et les compétences mobilisées.",
        inputMode: "hybrid",
        suggestions: [
          "Concernant la gestion du projet X, j'ai d'abord établi une méthodologie agile avec des sprints de deux semaines, permettant une grande réactivité face aux changements de priorités. Le principal obstacle a été la réduction budgétaire de 15% imposée en cours de projet, que j'ai surmontée en renégociant certains contrats avec les fournisseurs et en optimisant nos ressources internes. J'ai mobilisé mes compétences en négociation, en gestion de crise et en leadership pour maintenir la motivation de l'équipe malgré ces contraintes.",
          "L'amélioration de la satisfaction client a été ma priorité. J'ai commencé par analyser en profondeur les retours négatifs reçus l'année précédente, identifiant trois problèmes récurrents. J'ai ensuite mis en place un nouveau processus de traitement des demandes, avec un suivi personnalisé pour chaque client. L'obstacle principal était la résistance au changement de certains collègues, que j'ai surmontée par la formation et la démonstration progressive des résultats. Cette réussite a nécessité des compétences d'analyse, de pédagogie et de persévérance.",
          "Pour développer notre présence digitale, j'ai élaboré une stratégie de contenu ciblée basée sur une analyse approfondie de notre audience. Le défi majeur était notre manque d'expérience dans ce domaine. J'ai donc commencé par me former intensivement, puis j'ai créé un calendrier éditorial structuré et mis en place des indicateurs de performance précis. J'ai dû faire preuve d'autodidaxie, de créativité et de rigueur analytique. Ce qui a fait la différence, c'est ma capacité à traduire des données complexes en actions concrètes pour continuellement améliorer notre approche."
        ],
        hints: "Détaillez une réussite professionnelle spécifique en expliquant votre méthode, les difficultés rencontrées et les compétences utilisées.",
        expectedKeywords: ["méthodologie", "agile", "obstacle", "réduction", "surmontée", "processus", "analyse", "stratégie", "défi", "indicateurs"],
        acceptablePhrases: [
          "j'ai d'abord établi",
          "le principal obstacle a été",
          "j'ai mobilisé mes compétences",
          "j'ai commencé par",
          "j'ai mis en place"
        ],
        feedback: {
          correct: "Votre explication est très détaillée et montre clairement votre approche méthodique. Parlons maintenant des aspects de votre travail qui pourraient être améliorés. Quels sont les points sur lesquels vous pensez devoir progresser ?",
          partial: "C'est un bon exemple de réussite. Pourriez-vous préciser quelles compétences spécifiques vous avez mobilisées pour surmonter les obstacles mentionnés ?",
          incorrect: "Veuillez détailler plus précisément une réussite professionnelle spécifique, en expliquant votre méthode de travail, les obstacles rencontrés et les compétences mobilisées."
        }
      },
      {
        id: 3,
        botMessage: "Merci pour cette explication détaillée. Dans une démarche d'amélioration continue, quels sont selon vous les aspects de votre travail sur lesquels vous pourriez progresser ? Avez-vous identifié des points à améliorer ?",
        inputMode: "freeText",
        suggestions: [
          "J'ai identifié trois axes d'amélioration principaux. Premièrement, ma gestion du temps pourrait être optimisée, car je me retrouve parfois à travailler dans l'urgence sur certains dossiers. Je pourrais mieux planifier mes tâches et apprendre à déléguer davantage. Deuxièmement, je dois renforcer mes compétences techniques sur les nouveaux outils d'analyse de données que nous utilisons désormais. Enfin, je pense que ma communication écrite dans les rapports complexes pourrait gagner en concision et en clarté.",
          "Mon principal axe de progression concerne les compétences de négociation et de gestion des conflits. Lors de désaccords avec d'autres départements, j'ai parfois tendance à éviter la confrontation ou, au contraire, à me montrer trop intransigeant sur mes positions. Je dois trouver un meilleur équilibre et développer des techniques de communication plus assertives. Par ailleurs, j'ai besoin d'améliorer ma maîtrise de l'anglais professionnel pour les échanges avec nos partenaires internationaux.",
          "Je dois progresser dans trois domaines. D'abord, l'équilibre vie professionnelle-personnelle : je m'investis parfois excessivement au détriment de mon bien-être. Ensuite, la prise de parole en public : lors des présentations importantes, je manque encore d'aisance et de persuasion. Enfin, je souhaite approfondir mes connaissances sectorielles pour mieux anticiper les évolutions du marché et proposer des stratégies plus innovantes."
        ],
        hints: "Identifiez honnêtement vos axes d'amélioration professionnels et expliquez pourquoi ils sont importants.",
        expectedKeywords: ["gestion", "temps", "déléguer", "compétences", "techniques", "communication", "négociation", "conflits", "équilibre", "anticipation"],
        feedback: {
          correct: "J'apprécie votre capacité d'auto-évaluation. Comment envisagez-vous concrètement de travailler sur ces points à améliorer ? Avez-vous déjà un plan d'action en tête ?",
          partial: "Vous avez identifié des points intéressants. Pourriez-vous préciser pourquoi ces aspects sont particulièrement importants dans votre rôle actuel ?",
          incorrect: "Veuillez identifier plus précisément les aspects de votre travail qui pourraient être améliorés et expliquer pourquoi."
        }
      },
      {
        id: 4,
        botMessage: "Pour travailler sur ces axes d'amélioration, avez-vous déjà réfléchi à un plan d'action concret ? Quelles mesures envisagez-vous de prendre ?",
        inputMode: "suggestions",
        suggestions: [
          "Pour améliorer ma gestion du temps, j'ai commencé à utiliser une méthode de planification hebdomadaire plus structurée et j'envisage de suivre une formation spécifique sur la priorisation des tâches. Concernant les compétences techniques, j'ai identifié deux certifications pertinentes que je souhaiterais obtenir cette année. Pour ma communication écrite, je prévois de demander systématiquement des retours sur mes rapports à des collègues expérimentés et d'adapter mes documents en conséquence.",
          "J'ai élaboré un plan en trois volets pour développer mes compétences en négociation. Premièrement, je me suis inscrit(e) à un atelier mensuel sur la communication assertive. Deuxièmement, j'ai demandé à observer des sessions de négociation menées par notre directeur commercial pour m'inspirer de ses techniques. Enfin, je compte solliciter plus de responsabilités dans les discussions avec nos partenaires pour me mettre en situation réelle, tout en demandant un feedback régulier.",
          "Pour améliorer l'équilibre professionnel-personnel, je me suis fixé des limites plus strictes : ne pas consulter mes emails après 20h et préserver mon week-end. Concernant la prise de parole, j'ai rejoint un club d'art oratoire et je m'exerce régulièrement en filmant mes présentations pour analyser mes points faibles. Pour approfondir mes connaissances sectorielles, je me suis abonné(e) à trois publications spécialisées et j'ai prévu de participer à deux conférences majeures dans notre domaine cette année."
        ],
        hints: "Présentez un plan d'action concret et réaliste pour améliorer vos points faibles identifiés.",
        expectedKeywords: ["planification", "formation", "certifications", "retours", "atelier", "observer", "feedback", "limites", "analyser", "conférences"],
        feedback: {
          correct: "Votre plan d'action est bien structuré et comprend des étapes concrètes. Revenons à vos objectifs professionnels. Dans quelle mesure estimez-vous avoir atteint les objectifs fixés lors de la dernière évaluation ?",
          incorrect: "Veuillez proposer des actions concrètes et réalistes pour améliorer les points faibles que vous avez identifiés."
        }
      },
      {
        id: 5,
        botMessage: "Concernant les objectifs qui avaient été fixés lors de votre dernière évaluation, dans quelle mesure estimez-vous les avoir atteints ? Y a-t-il des objectifs partiellement ou non atteints, et si oui, pourquoi ?",
        inputMode: "hybrid",
        suggestions: [
          "Sur les cinq objectifs fixés l'année dernière, j'estime en avoir pleinement atteint trois. Le développement commercial a dépassé les attentes avec une croissance de 15% contre 10% visés. La réduction des coûts opérationnels de 7% et la mise en place du nouveau CRM ont également été réalisés avec succès. En revanche, le lancement de la nouvelle gamme de produits a pris du retard en raison de problèmes d'approvisionnement indépendants de ma volonté. Quant à l'objectif de formation de l'équipe, il n'a été que partiellement atteint car deux recrutements prévus ont été reportés, limitant la restructuration envisagée.",
          "J'ai atteint la majorité de mes objectifs, particulièrement ceux liés à la qualité de service (satisfaction client à 92% pour un objectif de 85%) et à l'optimisation des processus internes. L'objectif d'expansion territoriale a été partiellement atteint : nous avons ouvert deux nouveaux marchés sur les trois prévus, le troisième ayant été retardé suite à une étude de marché révélant des conditions défavorables. Le seul objectif non atteint concerne le développement d'une nouvelle fonctionnalité technique, car nous avons collectivement décidé de réorienter nos priorités vers la sécurisation de notre infrastructure existante.",
          "Mes objectifs principaux concernaient l'amélioration des indicateurs de performance de l'équipe et le développement de nouveaux partenariats. Pour le premier, les résultats sont positifs avec une augmentation de productivité de 12%, dépassant l'objectif de 10%. Concernant les partenariats, j'ai établi quatre nouvelles collaborations stratégiques sur les cinq prévues. L'objectif de réduction du turnover n'a été que partiellement atteint (diminution de 15% contre 25% visés), principalement en raison du contexte concurrentiel intense dans notre secteur qui a conduit à plusieurs départs vers des concurrents proposant des rémunérations supérieures."
        ],
        hints: "Évaluez objectivement l'atteinte de vos objectifs professionnels, en expliquant les raisons des succès et des échecs éventuels.",
        expectedKeywords: ["objectifs", "atteint", "dépassé", "partiellement", "retard", "croissance", "réduction", "satisfaction", "expansion", "raison"],
        feedback: {
          correct: "Merci pour cette analyse honnête et détaillée de vos objectifs. Discutons maintenant de votre développement professionnel à plus long terme. Quelles sont vos aspirations d'évolution au sein de l'entreprise ?",
          partial: "Votre bilan est intéressant. Pourriez-vous préciser ce que vous auriez pu faire différemment concernant les objectifs partiellement atteints ?",
          incorrect: "Veuillez évaluer plus précisément l'atteinte de vos objectifs professionnels fixés lors de la dernière évaluation, en expliquant les raisons des succès et des échecs."
        }
      },
      {
        id: 6,
        botMessage: "À plus long terme, comment envisagez-vous votre développement professionnel ? Quelles sont vos aspirations d'évolution au sein de l'entreprise pour les prochaines années ?",
        inputMode: "freeText",
        suggestions: [
          "À moyen terme, j'aimerais évoluer vers un poste de responsable d'équipe plus large, en prenant en charge l'ensemble du département. Cela me permettrait de mettre à profit mon expertise technique tout en développant davantage mes compétences managériales. À plus long terme, je m'intéresse à une évolution transversale qui me permettrait de piloter des projets stratégiques impliquant plusieurs départements. Pour y parvenir, je souhaite approfondir ma compréhension des enjeux financiers et stratégiques de l'entreprise, peut-être via une formation complémentaire en management.",
          "Mon objectif à court terme est de devenir expert(e) référent(e) dans notre domaine technique, ce qui impliquerait moins de management direct mais plus de conseil stratégique et d'innovation. À horizon 3-5 ans, je souhaiterais contribuer au développement international de l'entreprise, idéalement en prenant la responsabilité d'une nouvelle filiale à l'étranger. Cette aspiration m'a d'ailleurs motivé(e) à améliorer mes compétences linguistiques et interculturelles. Je reste cependant ouvert(e) à d'autres opportunités qui pourraient émerger selon l'évolution de notre secteur.",
          "Je vois mon évolution professionnelle selon deux axes complémentaires. D'une part, je souhaite approfondir mon expertise sectorielle pour devenir une ressource stratégique incontournable sur notre marché. D'autre part, je m'intéresse de plus en plus à la dimension formation et transmission des compétences. J'envisage donc à terme un rôle hybride combinant expertise et développement des talents, peut-être comme responsable de notre académie interne ou en créant une nouvelle fonction dédiée à l'innovation et au knowledge management."
        ],
        hints: "Décrivez vos aspirations d'évolution professionnelle à moyen et long terme, en lien avec vos compétences et les opportunités de l'entreprise.",
        expectedKeywords: ["évoluer", "responsable", "expertise", "développement", "stratégiques", "formation", "international", "innovation", "compétences", "opportunités"],
        acceptablePhrases: [
          "j'aimerais évoluer",
          "mon objectif est",
          "je souhaiterais",
          "à moyen terme",
          "à plus long terme"
        ],
        feedback: {
          correct: "Ces aspirations sont intéressantes et semblent bien alignées avec vos compétences. Pour vous accompagner dans cette évolution, quels types de formations ou d'accompagnement pensez-vous nécessaires ?",
          partial: "Votre projet professionnel est intéressant. Pourriez-vous préciser comment il s'articule avec les orientations stratégiques de l'entreprise ?",
          incorrect: "Veuillez décrire plus précisément vos aspirations d'évolution professionnelle au sein de l'entreprise, à moyen et long terme."
        }
      },
      {
        id: 7,
        botMessage: "Pour soutenir votre développement professionnel, quels types de formations, d'accompagnement ou de nouvelles responsabilités pensez-vous nécessaires ?",
        inputMode: "suggestions",
        suggestions: [
          "Pour progresser vers mes objectifs, j'aurais besoin de trois types de développement complémentaires. D'abord, une formation certifiante en management d'équipe pour structurer mes compétences actuelles. Ensuite, un mentorat par un cadre dirigeant qui pourrait m'offrir une vision plus stratégique de l'entreprise. Enfin, j'aimerais prendre la responsabilité d'un projet transversal pour mettre en pratique ces compétences et gagner en visibilité auprès d'autres départements.",
          "Je souhaiterais approfondir mon expertise technique par une certification avancée dans notre domaine, idéalement la certification X reconnue internationalement. En parallèle, je bénéficierais grandement d'une immersion de quelques semaines dans notre filiale étrangère pour comprendre les spécificités de ce marché. Enfin, j'aimerais élargir progressivement mes responsabilités en supervisant un aspect stratégique supplémentaire, comme la relation avec nos partenaires clés.",
          "Pour réaliser mes ambitions professionnelles, je vois trois axes de développement. Premièrement, suivre une formation en leadership stratégique pour renforcer ma vision globale. Deuxièmement, participer à notre programme de shadowing avec les membres du comité de direction pour mieux comprendre les enjeux stratégiques. Troisièmement, j'aimerais avoir l'opportunité de représenter notre entreprise lors d'événements sectoriels majeurs pour développer mon réseau professionnel et ma compréhension des tendances du marché."
        ],
        hints: "Identifiez les formations, accompagnements ou nouvelles responsabilités nécessaires à votre développement professionnel.",
        expectedKeywords: ["formation", "certifiante", "mentorat", "projet", "expertise", "immersion", "responsabilités", "leadership", "shadowing", "réseau"],
        feedback: {
          correct: "Ces besoins de développement sont bien identifiés et cohérents avec vos aspirations. Pour terminer cet entretien, aimeriez-vous me faire part d'autres points que nous n'aurions pas abordés ou de feedback sur notre collaboration ?",
          incorrect: "Veuillez préciser quels types de formations, d'accompagnement ou de nouvelles responsabilités vous sembleraient nécessaires pour soutenir votre développement professionnel."
        }
      },
      {
        id: 8,
        botMessage: "Pour conclure cet entretien d'évaluation, y a-t-il d'autres sujets que vous souhaiteriez aborder ou des commentaires sur notre collaboration que vous aimeriez partager ?",
        inputMode: "hybrid",
        suggestions: [
          "J'aimerais aborder la question de l'équilibre entre autonomie et supervision dans notre relation de travail. J'apprécie la confiance que vous m'accordez, mais je trouverais bénéfique d'avoir des points d'étape plus réguliers sur certains projets complexes. Par ailleurs, je tiens à souligner que l'ambiance positive que vous instaurez dans l'équipe contribue significativement à notre motivation collective. J'aimerais également savoir comment vous percevez ma contribution à la dynamique d'équipe.",
          "Un point que nous n'avons pas abordé concerne l'évolution de notre structure organisationnelle suite à la fusion annoncée. Je m'interroge sur l'impact potentiel sur mon poste et mes responsabilités. Par ailleurs, j'apprécie particulièrement votre style de management qui favorise l'initiative, mais je me demande si vous avez des attentes spécifiques concernant ma prise de décision autonome versus la consultation préalable sur certains sujets sensibles.",
          "Je souhaiterais revenir sur le processus de communication interne, qui présente selon moi des opportunités d'amélioration. Il m'arrive de recevoir des informations importantes tardivement, ce qui complique parfois mon organisation. Sur un plan plus personnel, je tiens à vous remercier pour votre soutien lors de la période difficile que j'ai traversée en début d'année. Cette flexibilité m'a permis de maintenir mon engagement professionnel malgré les circonstances."
        ],
        hints: "Abordez d'autres points pertinents non discutés ou exprimez votre feedback sur la collaboration professionnelle.",
        expectedKeywords: ["équilibre", "autonomie", "supervision", "confiance", "fusion", "impact", "management", "communication", "interne", "soutien"],
        feedback: {
          correct: "Merci pour ces observations pertinentes. Je les prends en compte et nous pourrons approfondir certains points dans nos prochains échanges. Pour conclure cet entretien, je tiens à vous remercier pour votre contribution significative cette année. Nous allons formaliser les objectifs pour l'année à venir en tenant compte de nos échanges d'aujourd'hui et je vous ferai parvenir un compte-rendu de cette évaluation dans les prochains jours. Avez-vous des questions avant que nous terminions ?",
          partial: "Ce point mérite effectivement d'être approfondi. Nous pourrons en reparler lors d'un prochain échange.",
          incorrect: "Y a-t-il d'autres sujets professionnels que vous souhaiteriez aborder ou des commentaires sur notre collaboration de travail ?"
        }
      }
    ],
    completionMessage: "Félicitations ! Vous avez réussi à participer de manière constructive à un entretien d'évaluation professionnelle, en présentant vos réalisations, en analysant vos axes d'amélioration et en discutant de votre développement professionnel.",
    learningObjectives: [
      "Présenter ses réalisations professionnelles de façon structurée",
      "Analyser ses forces et faiblesses de manière objective",
      "Formuler un plan de développement professionnel cohérent",
      "Évaluer l'atteinte d'objectifs professionnels",
      "Discuter de ses aspirations d'évolution de carrière"
    ],
    grammar: {
      points: [
        "Utilisation du passé composé et de l'imparfait pour décrire des réalisations",
        "Conditionnel pour exprimer des souhaits professionnels",
        "Articulation logique du discours avec des connecteurs",
        "Vocabulaire professionnel spécifique à l'évaluation"
      ]
    }
  };

  export default jobPerformanceReview;
