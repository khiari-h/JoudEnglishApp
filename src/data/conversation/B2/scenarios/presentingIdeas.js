// chatbot/B2/scenarios/presentingIdeas.js

const presentingIdeas = {
    id: 5,
    title: "Presenting Innovative Ideas",
    level: "B2",
    description: "Present and defend an innovative concept or solution in a professional context, responding to questions and objections.",
    estimatedTime: "25-30 minutes",
    vocabulary: ["innovation", "concept", "prototype", "implementation", "feasibility", "scalability", "investment", "return", "disruption", "competitive advantage", "market analysis", "cost-effective", "user-centered", "sustainability", "integration"],
    steps: [
      {
        id: 1,
        botMessage: "Welcome to our innovation meeting. You mentioned you have a new concept to present. Could you introduce your idea briefly?",
        inputMode: "freeText",
        suggestions: [
          "I'd like to propose a smart waste management system that uses IoT sensors to optimize collection routes.",
          "My concept is a peer-to-peer skill-sharing platform specifically designed for remote rural communities.",
          "I've developed an idea for carbon-negative packaging made from agricultural waste products."
        ],
        hints: "Introduce your innovative concept clearly and concisely.",
        expectedKeywords: ["propose", "concept", "idea", "developed", "designed", "system", "platform", "solution", "innovative", "new approach"],
        feedback: {
          correct: "That sounds intriguing. Could you tell us more about what problem this solution addresses?",
          partial: "Could you clarify the core concept of your innovation?",
          incorrect: "Please introduce your innovative idea or concept more clearly."
        }
      },
      {
        id: 2,
        botMessage: "Interesting concept. What specific problem or gap in the market does your idea address?",
        inputMode: "hybrid",
        suggestions: [
          "Current solutions are inefficient and costly, leading to unnecessary resource waste and environmental impact.",
          "Existing options don't adequately serve the needs of underrepresented populations, creating an accessibility gap.",
          "The market lacks sustainable alternatives that maintain performance while reducing environmental footprint."
        ],
        hints: "Explain the problem your innovation solves and why current solutions are inadequate.",
        expectedKeywords: ["inefficient", "costly", "gap", "inadequate", "problem", "challenge", "unaddressed", "current", "existing", "market", "need", "opportunity"],
        acceptablePhrases: [
          "current solutions",
          "existing options",
          "the market lacks",
          "inadequate"
        ],
        feedback: {
          correct: "You've clearly identified a significant problem. How does your solution specifically address this challenge?",
          partial: "Can you elaborate on why this problem is significant enough to warrant a new solution?",
          incorrect: "Please explain what specific problem or market gap your innovation addresses."
        }
      },
      {
        id: 3,
        botMessage: "How does your proposed solution work? Could you walk us through the key components or features?",
        inputMode: "freeText",
        suggestions: [
          "Our system combines real-time data collection via sensors with AI-driven analytics to optimize processes and reduce waste by 40%.",
          "The platform uses a decentralized verification system and geolocation matching to connect users based on proximity and skill compatibility.",
          "We've developed a proprietary process that transforms agricultural byproducts into biodegradable packaging with enhanced durability."
        ],
        hints: "Describe how your innovation works, highlighting key features and components.",
        expectedKeywords: ["system", "process", "technology", "components", "features", "combines", "uses", "developed", "integrated", "designed", "functions"],
        feedback: {
          correct: "That's a clear explanation of how your solution works. What makes this approach innovative compared to existing alternatives?",
          partial: "Could you provide more details about the core functionality of your solution?",
          incorrect: "Please describe the key components or features of your innovation and how they work together."
        }
      },
      {
        id: 4,
        botMessage: "What evidence or data do you have to support the feasibility and potential impact of your idea?",
        inputMode: "hybrid",
        suggestions: [
          "Our prototype testing shows a 35% improvement in efficiency, and our market research indicates potential annual savings of €2.3 million for mid-sized companies.",
          "Initial user testing with 200 participants demonstrated 87% satisfaction rates and a 40% higher engagement level than comparative solutions.",
          "Laboratory tests confirm our material degrades 60% faster than current alternatives while maintaining structural integrity under standard conditions."
        ],
        hints: "Present supporting data, research, or testing results that validate your concept.",
        expectedKeywords: ["testing", "research", "data", "survey", "prototype", "pilot", "demonstrated", "confirms", "indicates", "evidence", "results", "findings"],
        acceptablePhrases: [
          "our prototype",
          "testing shows",
          "research indicates",
          "demonstrated",
          "tests confirm"
        ],
        feedback: {
          correct: "Your evidence is compelling. Have you considered potential challenges in implementing this solution?",
          partial: "That's helpful information. Do you have any more specific data to support your claims?",
          incorrect: "Please provide concrete evidence, data, or research findings that support the viability of your concept."
        }
      },
      {
        id: 5,
        botMessage: "Your concept requires significant resources for development. How would you justify the necessary investment?",
        inputMode: "freeText",
        suggestions: [
          "Our financial projections indicate a break-even point at 18 months with an ROI of 130% over five years, making this an attractive investment despite the initial outlay.",
          "While development costs are substantial, the technology creates a defensible market position with multiple revenue streams and strong intellectual property protection.",
          "The investment aligns with strategic sustainability goals and provides first-mover advantage in an emerging regulatory environment that will eventually make such solutions mandatory."
        ],
        hints: "Justify the investment by explaining the financial return, strategic value, or competitive advantage.",
        expectedKeywords: ["ROI", "return", "investment", "cost", "value", "profit", "savings", "strategic", "competitive", "advantage", "position", "benefits", "outweigh"],
        feedback: {
          correct: "You've made a strong business case for the investment. Who are the key stakeholders or partners needed to make this successful?",
          partial: "You've touched on some important points. Could you elaborate more on the specific returns expected?",
          incorrect: "Please justify why this innovation deserves investment despite the significant resources required."
        }
      },
      {
        id: 6,
        botMessage: "I'm concerned about the scalability of your solution. What happens if demand increases rapidly or if we need to adapt to different markets?",
        inputMode: "hybrid",
        suggestions: [
          "We've designed a modular architecture that allows for incremental scaling without service disruption, and our cloud infrastructure can handle a 500% increase in user load.",
          "The core technology is adaptable across multiple sectors with minimal modification, and we've identified three potential market extensions in our five-year roadmap.",
          "Our production process can scale through distributed manufacturing partnerships, reducing capital expenditure while maintaining quality control through our proprietary standards."
        ],
        hints: "Address concerns about scalability and adaptability of your innovation.",
        expectedKeywords: ["scalable", "modular", "flexible", "adaptable", "designed", "infrastructure", "handle", "capacity", "expansion", "growth", "accommodate"],
        acceptablePhrases: [
          "designed for scaling",
          "can handle",
          "adaptable across",
          "process can scale",
          "without disruption"
        ],
        feedback: {
          correct: "You've addressed the scalability concern effectively. What timeline do you envision for implementation?",
          partial: "You've mentioned some scaling strategies. Could you be more specific about capacity limitations?",
          incorrect: "Please explain how your solution can scale to meet increasing demand or adapt to different market contexts."
        }
      },
      {
        id: 7,
        botMessage: "Your competitor recently announced a similar product. How does your solution differentiate itself in the marketplace?",
        inputMode: "freeText",
        suggestions: [
          "While superficially similar, our solution offers 30% better performance metrics and integrates with existing systems, significantly reducing switching costs for customers.",
          "Our approach prioritizes user privacy and data ownership, addressing growing regulatory concerns that our competitor's solution neglects entirely.",
          "We've secured exclusive partnerships with key industry players and have patents pending on three core technologies that provide sustainable competitive advantage."
        ],
        hints: "Explain your competitive advantage and unique selling proposition.",
        expectedKeywords: ["differentiate", "unique", "advantage", "competitor", "superior", "better", "exclusive", "patent", "proprietary", "integration", "performance"],
        feedback: {
          correct: "You've clearly articulated your competitive advantage. To conclude, what are the next steps you propose for this project?",
          partial: "You've identified some differences. Could you elaborate on why these matter to potential customers?",
          incorrect: "Please explain what makes your solution different or better than the competitor's similar product."
        }
      },
      {
        id: 8,
        botMessage: "Based on your presentation, what resources and timeline would you need to move forward with this concept?",
        inputMode: "hybrid",
        suggestions: [
          "We need a development team of five specialists for six months and approximately €250,000 in funding to deliver a market-ready prototype by Q3.",
          "Our three-phase implementation plan requires cross-departmental collaboration and an initial investment of €180,000, with key milestones at 3, 6, and 12 months.",
          "We propose starting with a limited pilot involving two strategic customers, requiring minimal resources for three months before reassessing for full-scale development."
        ],
        hints: "Outline the resources, budget, and timeline needed to implement your idea.",
        expectedKeywords: ["team", "budget", "funding", "timeline", "months", "phases", "milestones", "resources", "investment", "development", "implementation"],
        acceptablePhrases: [
          "need a team",
          "funding to deliver",
          "implementation plan",
          "initial investment",
          "propose starting"
        ],
        feedback: {
          correct: "Thank you for presenting such a well-thought-out concept. Your proposal will be given serious consideration.",
          partial: "Could you provide more specific details about your resource requirements and timeframe?",
          incorrect: "Please specify what resources, budget, and timeline you would need to implement your innovation."
        }
      }
    ],
    completionMessage: "Excellent presentation! You've successfully demonstrated the ability to present and defend an innovative concept, addressing questions and concerns professionally while using appropriate business and technical vocabulary.",
    learningObjectives: [
      "Present innovative ideas clearly and persuasively",
      "Support concepts with relevant data and evidence",
      "Address objections and concerns effectively",
      "Articulate competitive advantages and unique selling points",
      "Justify resource requirements and investment needs",
      "Use appropriate business and technical vocabulary"
    ],
    grammar: {
      points: [
        "Present simple for describing features and capabilities",
        "Present perfect for describing development and research",
        "Conditional structures for describing potential outcomes",
        "Comparative and superlative forms",
        "Modal verbs for expressing possibility and necessity"
      ]
    }
  };
  
  export default presentingIdeas;