export const vocab = {
  title: "Intelligence Artificielle et Analyse de Données",
  words: [
    // Concepts fondamentaux de l'IA et du ML (50 mots)

    {
      word: "validation data",
      translation: "données de validation",
      example:
        "Hyperparameters were optimized using performance on the validation data, separate from the training set.",
    },
    {
      word: "test data",
      translation: "données de test",
      example:
        "The final evaluation used previously unseen test data to assess real-world performance.",
    },

    {
      word: "hyperparameter optimization",
      translation: "optimisation des hyperparamètres",
      example:
        "Bayesian hyperparameter optimization efficiently explores the parameter space by leveraging information from previous evaluations.",
    },

    {
      word: "loss function",
      translation: "fonction de perte",
      example:
        "The loss function quantifies the difference between predicted outputs and ground truth values.",
    },

    {
      word: "discriminative model",
      translation: "modèle discriminatif",
      example:
        "Discriminative models focus on decision boundaries between classes rather than modeling the full data distribution.",
    },
    {
      word: "classification",
      translation: "classification",
      example:
        "The classification algorithm assigns input examples to discrete categories based on their features.",
    },

    {
      word: "clustering",
      translation: "regroupement",
      example:
        "Clustering algorithms identify natural groupings in data based on similarity measures.",
    },
    {
      word: "dimensionality reduction",
      translation: "réduction de dimensionnalité",
      example:
        "Dimensionality reduction techniques compress high-dimensional data while preserving important structures.",
    },

    {
      word: "random forest",
      translation: "forêt aléatoire",
      example:
        "Random forests combine multiple decision trees to reduce overfitting and improve generalization.",
    },
    {
      word: "gradient boosting",
      translation: "amplification de gradient",
      example:
        "Gradient boosting sequentially builds models that correct errors made by previous iterations.",
    },
    {
      word: "support vector machine",
      translation: "machine à vecteurs de support",
      example:
        "Support vector machines find optimal hyperplanes that maximize the margin between different classes.",
    },
    {
      word: "k-nearest neighbors",
      translation: "k plus proches voisins",
      example:
        "The k-nearest neighbors algorithm classifies points based on majority votes from their closest neighbors.",
    },
    {
      word: "convolutional neural network",
      translation: "réseau neuronal convolutif",
      example:
        "Convolutional neural networks excel at visual recognition tasks through specialized layer architectures.",
    },
    {
      word: "recurrent neural network",
      translation: "réseau neuronal récurrent",
      example:
        "Recurrent neural networks process sequential data by maintaining internal state information.",
    },
    {
      word: "transformer",
      translation: "transformeur",
      example:
        "Transformer architectures revolutionized language processing through attention mechanisms and parallel computation.",
    },
    {
      word: "generative adversarial network",
      translation: "réseau antagoniste génératif",
      example:
        "Generative adversarial networks consist of competing networks that simultaneously improve generation quality.",
    },
    {
      word: "reinforcement learning agent",
      translation: "agent d'apprentissage par renforcement",
      example:
        "The reinforcement learning agent learned optimal strategies through repeated interactions with its environment.",
    },

    {
      word: "speech recognition",
      translation: "reconnaissance vocale",
      example:
        "The speech recognition system converts spoken language into text with contextual understanding.",
    },

    // Techniques avancées et modèles (50 mots)
    {
      word: "deep neural network",
      translation: "réseau neuronal profond",
      example:
        "Deep neural networks with multiple layers can learn increasingly abstract representations of input data.",
    },

    {
      word: "multilayer perceptron",
      translation: "perceptron multicouche",
      example:
        "The multilayer perceptron contains input, hidden, and output layers fully connected between adjacent levels.",
    },
    {
      word: "activation function",
      translation: "fonction d'activation",
      example:
        "Non-linear activation functions enable neural networks to model complex relationships in data.",
    },
    {
      word: "rectified linear unit",
      translation: "unité linéaire rectifiée",
      example:
        "ReLU activation functions accelerate training by addressing vanishing gradient problems in deep networks.",
    },
    {
      word: "softmax function",
      translation: "fonction softmax",
      example:
        "The softmax function converts raw model outputs into probability distributions across classes.",
    },
    {
      word: "batch normalization",
      translation: "normalisation par lots",
      example:
        "Batch normalization stabilizes and accelerates neural network training by normalizing layer inputs.",
    },
    {
      word: "dropout",
      translation: "abandon",
      example:
        "Dropout prevents co-adaptation of neurons by randomly deactivating units during training.",
    },
    {
      word: "early stopping",
      translation: "arrêt précoce",
      example:
        "Early stopping prevents overfitting by terminating training when validation performance begins to deteriorate.",
    },
    {
      word: "parameter tuning",
      translation: "ajustement des paramètres",
      example:
        "Systematic parameter tuning identified optimal configuration for the production model.",
    },
    {
      word: "batch size",
      translation: "taille du lot",
      example:
        "Larger batch sizes enable more stable gradient estimates but require more memory during training.",
    },
    {
      word: "learning rate",
      translation: "taux d'apprentissage",
      example:
        "Adaptive learning rate schedules adjust optimization step sizes throughout training for better convergence.",
    },
    {
      word: "weight initialization",
      translation: "initialisation des poids",
      example:
        "Proper weight initialization prevents signal vanishing or explosion in deep networks.",
    },

    {
      word: "self-attention",
      translation: "auto-attention",
      example:
        "Self-attention allows models to consider relationships between all positions in a sequence simultaneously.",
    },
    {
      word: "multi-head attention",
      translation: "attention multi-têtes",
      example:
        "Multi-head attention projects inputs into multiple subspaces to capture different relationship types.",
    },
    {
      word: "encoder-decoder architecture",
      translation: "architecture encodeur-décodeur",
      example:
        "Encoder-decoder architectures transform input sequences into intermediate representations before generating outputs.",
    },
    {
      word: "long short-term memory",
      translation: "mémoire à long et à court terme",
      example:
        "LSTM units maintain information over extended sequences through specialized gating mechanisms.",
    },
    {
      word: "gated recurrent unit",
      translation: "unité récurrente à portes",
      example:
        "GRUs simplify LSTM architecture while maintaining ability to capture long-range dependencies.",
    },
    {
      word: "sequence-to-sequence model",
      translation: "modèle séquence-à-séquence",
      example:
        "Sequence-to-sequence models transform input sequences into output sequences of potentially different lengths.",
    },
    {
      word: "autoencoder",
      translation: "auto-encodeur",
      example:
        "Autoencoders learn efficient data representations by reconstructing inputs through compressed encodings.",
    },
    {
      word: "variational autoencoder",
      translation: "auto-encodeur variationnel",
      example:
        "Variational autoencoders learn probabilistic latent representations enabling controlled generation.",
    },

    {
      word: "fine-tuning",
      translation: "ajustement fin",
      example:
        "Fine-tuning adapts pre-trained models to specific domains or tasks with smaller, specialized datasets.",
    },

    {
      word: "meta-learning",
      translation: "méta-apprentissage",
      example:
        "Meta-learning algorithms learn how to learn, developing strategies that generalize across different tasks.",
    },
    {
      word: "multitask learning",
      translation: "apprentissage multitâche",
      example:
        "Multitask learning simultaneously trains models on related tasks to improve performance through shared representations.",
    },

    {
      word: "domain adaptation",
      translation: "adaptation de domaine",
      example:
        "Domain adaptation techniques bridge distribution gaps between training and deployment environments.",
    },

    {
      word: "curriculum learning",
      translation: "apprentissage par curriculum",
      example:
        "Curriculum learning presents training examples in increasing complexity to facilitate more efficient learning.",
    },

    {
      word: "multimodal learning",
      translation: "apprentissage multimodal",
      example:
        "Multimodal learning integrates information from different data types like text, images, and audio.",
    },
    {
      word: "graph neural network",
      translation: "réseau neuronal de graphe",
      example:
        "Graph neural networks process data with irregular structure by operating on node and edge representations.",
    },
    {
      word: "knowledge distillation",
      translation: "distillation de connaissances",
      example:
        "Knowledge distillation transfers capabilities from larger models to smaller, more efficient ones.",
    },

    {
      word: "pruning",
      translation: "élagage",
      example:
        "Network pruning removes redundant parameters to create smaller, more efficient models without significant performance loss.",
    },
    {
      word: "model deployment",
      translation: "déploiement de modèle",
      example:
        "Model deployment integrates AI systems into production environments with monitoring and maintenance capabilities.",
    },
    {
      word: "model serving",
      translation: "service de modèle",
      example:
        "Efficient model serving infrastructure handles prediction requests at scale with low latency requirements.",
    },
    {
      word: "model versioning",
      translation: "versionnage de modèle",
      example:
        "Model versioning systems track changes throughout the development lifecycle for reproducibility and rollback capabilities.",
    },
    {
      word: "model monitoring",
      translation: "surveillance de modèle",
      example:
        "Continuous model monitoring detects performance degradation and data drift in production environments.",
    },

    // Analyse de données et techniques statistiques (50 mots)

    {
      word: "exploratory data analysis",
      translation: "analyse exploratoire des données",
      example:
        "Exploratory data analysis examines distributions and relationships before formal modeling begins.",
    },

    {
      word: "p-value",
      translation: "valeur p",
      example:
        "The p-value quantifies evidence against the null hypothesis in hypothesis testing.",
    },

    {
      word: "correlation",
      translation: "corrélation",
      example:
        "Correlation measures strength and direction of relationships between variables without implying causation.",
    },

    {
      word: "linear regression",
      translation: "régression linéaire",
      example:
        "Linear regression models relationships between variables using straight-line functions.",
    },
    {
      word: "logistic regression",
      translation: "régression logistique",
      example:
        "Logistic regression predicts categorical outcomes through probability estimation.",
    },

    {
      word: "principal component analysis",
      translation: "analyse en composantes principales",
      example:
        "Principal component analysis reduces dimensionality while preserving maximum variance.",
    },

    {
      word: "seasonality",
      translation: "saisonnalité",
      example:
        "The analysis revealed strong seasonality with consistent patterns repeating annually.",
    },

    {
      word: "association rule learning",
      translation: "apprentissage des règles d'association",
      example:
        "Association rule learning identifies co-occurring elements within transactional datasets.",
    },

    {
      word: "pivot table",
      translation: "tableau croisé dynamique",
      example:
        "Pivot tables aggregate and summarize data across multiple dimensions for comparative analysis.",
    },
    {
      word: "heatmap",
      translation: "carte thermique",
      example:
        "The correlation heatmap visually represents relationship strengths between multiple variables.",
    },
    {
      word: "scatter plot",
      translation: "nuage de points",
      example:
        "Scatter plots reveal relationships between two continuous variables including potential non-linearities.",
    },
    {
      word: "histogram",
      translation: "histogramme",
      example:
        "Histograms display frequency distributions of continuous variables across defined intervals.",
    },
    {
      word: "box plot",
      translation: "boîte à moustaches",
      example:
        "Box plots summarize distributions through quartiles while highlighting potential outliers.",
    },

    {
      word: "data preprocessing",
      translation: "prétraitement des données",
      example:
        "Data preprocessing transforms raw information into formats suitable for modeling and analysis.",
    },

    {
      word: "feature selection",
      translation: "sélection des caractéristiques",
      example:
        "Feature selection identifies the most informative variables while removing redundant or irrelevant ones.",
    },

    {
      word: "ETL process",
      translation: "processus ETL",
      example:
        "ETL processes extract data from sources, transform it to appropriate formats, and load it into analytical systems.",
    },

    {
      word: "distributed computing",
      translation: "informatique distribuée",
      example:
        "Distributed computing frameworks parallelize data processing across multiple machines.",
    },

    {
      word: "streaming analytics",
      translation: "analyse en continu",
      example:
        "Streaming analytics processes data in real-time as it arrives rather than in batches.",
    },

    // Applications et considérations éthiques (50 mots)

    {
      word: "personalization algorithm",
      translation: "algorithme de personnalisation",
      example:
        "Personalization algorithms tailor experiences to individual users based on their characteristics and history.",
    },

    {
      word: "virtual assistant",
      translation: "assistant virtuel",
      example:
        "The virtual assistant integrates with multiple systems to perform tasks through natural language commands.",
    },

    {
      word: "fraud detection",
      translation: "détection de fraude",
      example:
        "Advanced fraud detection systems identify suspicious patterns that indicate potentially illicit activities.",
    },
    {
      word: "image recognition",
      translation: "reconnaissance d'image",
      example:
        "Image recognition technologies automatically identify objects, people, and activities in visual data.",
    },

    {
      word: "natural language understanding",
      translation: "compréhension du langage naturel",
      example:
        "Natural language understanding extracts meaning and intent from human communication.",
    },
    {
      word: "natural language generation",
      translation: "génération de langage naturel",
      example:
        "Natural language generation produces human-like text based on provided information and context.",
    },
    {
      word: "text summarization",
      translation: "résumé de texte",
      example:
        "Automatic text summarization condenses documents while preserving key information and meaning.",
    },
    {
      word: "machine translation",
      translation: "traduction automatique",
      example:
        "Neural machine translation systems convert text between languages while maintaining semantic meaning.",
    },
    {
      word: "demand forecasting",
      translation: "prévision de la demande",
      example:
        "Demand forecasting models predict future customer requirements based on historical patterns and contextual factors.",
    },
    {
      word: "dynamic pricing",
      translation: "tarification dynamique",
      example:
        "Dynamic pricing algorithms adjust rates in real-time based on demand, competition, and other market factors.",
    },

    {
      word: "customer lifetime value prediction",
      translation: "prédiction de la valeur vie client",
      example:
        "Advanced models forecast customer lifetime value to optimize acquisition and retention strategies.",
    },
    {
      word: "churn prediction",
      translation: "prédiction d'attrition",
      example:
        "Churn prediction identifies customers likely to discontinue services, enabling proactive retention efforts.",
    },
    {
      word: "algorithmic trading",
      translation: "trading algorithmique",
      example:
        "Algorithmic trading systems execute financial transactions based on predefined rules and market conditions.",
    },
    {
      word: "risk modeling",
      translation: "modélisation du risque",
      example:
        "Sophisticated risk modeling evaluates potential threats across multiple variables and scenarios.",
    },
    {
      word: "credit scoring",
      translation: "évaluation du crédit",
      example:
        "Machine learning credit scoring assesses default risk using diverse data beyond traditional financial factors.",
    },
    {
      word: "supply chain optimization",
      translation: "optimisation de la chaîne d'approvisionnement",
      example:
        "AI-driven supply chain optimization balances inventory, transportation, and production constraints for maximum efficiency.",
    },

    {
      word: "model transparency",
      translation: "transparence du modèle",
      example:
        "Model transparency enables understanding of how AI systems arrive at specific decisions or predictions.",
    },
    {
      word: "black box problem",
      translation: "problème de la boîte noire",
      example:
        "The black box problem refers to AI systems producing outputs without explainable reasoning processes.",
    },

    {
      word: "feature importance",
      translation: "importance des caractéristiques",
      example:
        "Feature importance analysis reveals which variables most significantly influence model predictions.",
    },
    {
      word: "model interpretability",
      translation: "interprétabilité du modèle",
      example:
        "Model interpretability techniques help humans understand how AI systems reach specific conclusions.",
    },

    {
      word: "demographic parity",
      translation: "parité démographique",
      example:
        "Demographic parity requires equal prediction rates across protected groups regardless of base rates.",
    },

    {
      word: "bias mitigation",
      translation: "atténuation des biais",
      example:
        "Bias mitigation techniques address unfairness in training data and model behavior.",
    },

    {
      word: "privacy-preserving machine learning",
      translation: "apprentissage automatique respectueux de la vie privée",
      example:
        "Privacy-preserving machine learning enables analysis without exposing individual sensitive data.",
    },

    {
      word: "model governance",
      translation: "gouvernance des modèles",
      example:
        "Model governance establishes policies and procedures for responsible AI development and deployment.",
    },

    {
      word: "human-AI collaboration",
      translation: "collaboration homme-IA",
      example:
        "Human-AI collaboration leverages complementary strengths of people and machines for enhanced outcomes.",
    },

    {
      word: "AI regulation",
      translation: "réglementation de l'IA",
      example:
        "AI regulation frameworks establish boundaries and requirements for artificial intelligence development and use.",
    },

    {
      word: "algorithmic impact assessment",
      translation: "évaluation de l'impact algorithmique",
      example:
        "Algorithmic impact assessments evaluate potential consequences before deploying automated systems.",
    },
  ],
};
