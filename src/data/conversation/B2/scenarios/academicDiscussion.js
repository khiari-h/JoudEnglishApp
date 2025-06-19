// chatbot/B2/scenarios/academicDiscussion.js

const academicDiscussion = {
    id: 4,
    title: "Academic Discussion",
    level: "B2",
    description: "Participate in an academic discussion about a research topic with detailed vocabulary and structured argumentation.",
    estimatedTime: "25-30 minutes",
    vocabulary: ["theory", "methodology", "analysis", "evidence", "hypothesis", "findings", "literature review", "qualitative", "quantitative", "correlation", "causation", "interpretation", "critique", "implications", "peer-reviewed"],
    steps: [
      {
        id: 1,
        botMessage: "Welcome to today's academic seminar on climate change impacts. What aspect of this topic interests you most?",
        inputMode: "hybrid",
        suggestions: [
          "I'm particularly interested in the economic implications of climate change.",
          "My research focuses on environmental justice and vulnerable populations.",
          "I'd like to discuss mitigation strategies versus adaptation approaches."
        ],
        hints: "Share your specific academic interest within the broader topic.",
        expectedKeywords: ["interested", "research", "focus", "economic", "environmental", "social", "impact", "mitigation", "adaptation", "justice"],
        acceptablePhrases: [
          "interested in",
          "my research",
          "would like to discuss",
          "concerned about"
        ],
        feedback: {
          correct: "That's an interesting perspective. Let's explore that further.",
          partial: "Could you elaborate on your specific interest within that area?",
          incorrect: "Please indicate which aspect of climate change you'd like to focus on in our discussion."
        }
      },
      {
        id: 2,
        botMessage: "Excellent. There's been considerable research on economic impacts. What methodological approaches do you find most convincing when analyzing this relationship?",
        inputMode: "freeText",
        suggestions: [
          "I find longitudinal studies that track economic indicators over time more convincing than cross-sectional approaches.",
          "Economic modeling that incorporates multiple variables tends to provide more robust conclusions.",
          "Qualitative case studies offer deeper insights than purely quantitative analyses in this context."
        ],
        hints: "Discuss research methodologies and their relative strengths.",
        expectedKeywords: ["longitudinal", "cross-sectional", "quantitative", "qualitative", "modeling", "case studies", "data", "analysis", "approach", "method", "variables"],
        feedback: {
          correct: "You raise valid points about methodological considerations. The choice of methods certainly influences findings.",
          partial: "Could you expand on why you prefer that methodological approach?",
          incorrect: "Please comment on research methodologies - qualitative, quantitative, modeling approaches, etc."
        }
      },
      {
        id: 3,
        botMessage: "Recent studies by the Intergovernmental Panel on Climate Change suggest a 3.2% reduction in global GDP by 2050 under current warming scenarios. How do you interpret these findings?",
        inputMode: "hybrid",
        suggestions: [
          "These estimates likely understate the economic impact due to limitations in accounting for non-market goods and tipping points.",
          "The global figure masks significant regional disparities, with developing economies facing disproportionate losses.",
          "We should consider these findings in conjunction with adaptation costs and opportunity costs of inaction."
        ],
        hints: "Critically evaluate the research findings and their implications.",
        expectedKeywords: ["understate", "overstate", "regional", "disparities", "limitations", "methodology", "consider", "adaptation", "developing", "tipping points", "non-market"],
        feedback: {
          correct: "That's a thoughtful analysis that addresses both the findings and their limitations.",
          partial: "You've made an interesting point. Could you elaborate on the implications?",
          incorrect: "Please provide a critical interpretation of the economic findings mentioned."
        }
      },
      {
        id: 4,
        botMessage: "Your point about regional disparities is well-taken. How might we incorporate equity considerations into economic analyses of climate impacts?",
        inputMode: "freeText",
        suggestions: [
          "Disaggregating data by region and socioeconomic status would highlight distributive impacts that aggregate measures obscure.",
          "We should employ mixed methods that combine quantitative economic metrics with qualitative measures of wellbeing and vulnerability.",
          "Participatory research approaches that include affected communities in defining impact metrics could lead to more equitable frameworks."
        ],
        hints: "Discuss methods for integrating equity considerations into economic analysis.",
        expectedKeywords: ["disaggregate", "distribute", "vulnerable", "communities", "mixed methods", "participatory", "socioeconomic", "framework", "wellbeing", "metrics", "justice"],
        feedback: {
          correct: "You've identified important approaches to integrating equity considerations into economic analyses.",
          partial: "That's a starting point. Could you elaborate on specific methodological approaches?",
          incorrect: "Please suggest ways to incorporate equity and justice considerations into economic analyses of climate impacts."
        }
      },
      {
        id: 5,
        botMessage: "In the literature, there's an ongoing debate about discounting rates when valuing future climate impacts. What position do you take on this methodological question?",
        inputMode: "hybrid",
        suggestions: [
          "High discount rates unethically devalue future generations' welfare and should be replaced with declining discount rates.",
          "The choice of discount rate should reflect ethical judgments about intergenerational equity rather than market interest rates.",
          "Different discount rates should be applied to different categories of impact, with lower rates for irreversible damages."
        ],
        hints: "Take a position on the discount rate debate and justify it.",
        expectedKeywords: ["discount", "future", "generations", "intergenerational", "equity", "ethics", "declining", "irreversible", "justify", "welfare", "value"],
        feedback: {
          correct: "You've articulated a well-reasoned position on this complex methodological and ethical question.",
          partial: "You've touched on an important aspect. Could you develop your argument further?",
          incorrect: "Please state and justify your position on how future impacts should be valued through discount rates."
        }
      },
      {
        id: 6,
        botMessage: "Your colleagues have recently published contradictory findings suggesting that climate adaptation is more cost-effective than mitigation. How would you respond to this claim in an academic context?",
        inputMode: "freeText",
        suggestions: [
          "I would question the temporal boundaries of their analysis, as mitigation benefits accrue over longer timeframes than typically modeled.",
          "Their conclusion likely depends on assumptions about technological innovation and implementation costs that warrant critical examination.",
          "This presents a false dichotomy; optimal policy approaches require a balanced portfolio of adaptation and mitigation strategies."
        ],
        hints: "Formulate an academic response to the contradictory claim.",
        expectedKeywords: ["question", "assumptions", "methodology", "evidence", "temporal", "dichotomy", "balanced", "critical", "examination", "limitations", "context"],
        feedback: {
          correct: "That's a thoughtful academic response that engages critically with the contradictory findings.",
          partial: "You've made a good start. Could you develop your counterargument more fully?",
          incorrect: "Please provide a scholarly response that critically engages with the contradictory findings."
        }
      },
      {
        id: 7,
        botMessage: "To conclude our discussion, what directions for future research would you recommend to advance our understanding of this topic?",
        inputMode: "hybrid",
        suggestions: [
          "We need interdisciplinary research that integrates economic models with earth system science to better capture feedback effects.",
          "Longitudinal studies tracking community-level adaptive capacity and economic resilience would fill important knowledge gaps.",
          "Developing standardized metrics for non-market impacts would improve comparability across different economic analyses."
        ],
        hints: "Propose specific directions for future research.",
        expectedKeywords: ["interdisciplinary", "integrate", "longitudinal", "standardized", "metrics", "knowledge gaps", "methodology", "frameworks", "comparative", "tracking", "develop"],
        feedback: {
          correct: "You've identified valuable directions for future research that would address current limitations in the field.",
          partial: "That's an interesting suggestion. Could you be more specific about methodological approaches?",
          incorrect: "Please suggest specific directions for future research that would advance knowledge in this field."
        }
      }
    ],
    completionMessage: "Excellent! You've successfully demonstrated the ability to engage in a sophisticated academic discussion, articulating complex ideas with appropriate terminology and responding to scholarly arguments.",
    learningObjectives: [
      "Articulate complex academic positions clearly",
      "Critically evaluate research methodologies",
      "Interpret scientific findings and their implications",
      "Engage with counterarguments in a scholarly manner",
      "Employ specialized academic vocabulary appropriately",
      "Propose directions for further research"
    ],
    grammar: {
      points: [
        "Formal academic register",
        "Hedging language (may, might, could, appears to)",
        "Complex sentence structures with subordinate clauses",
        "Passive voice for emphasizing findings rather than researchers",
        "Transitional phrases for developing arguments"
      ]
    }
  };

  export default academicDiscussion;
