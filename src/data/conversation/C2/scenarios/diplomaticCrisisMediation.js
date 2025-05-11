const diplomaticCrisisMediation = {
  id: 4,
  title: "Diplomatic Crisis Mediation",
  level: "C2",
  description:
    "Engage in high-level simulated mediation of an international diplomatic crisis. Demonstrate mastery of negotiation language, strategic communication, cultural sensitivity, and the ability to manage high-stakes dialogue under pressure. Analyze motives, anticipate consequences, propose viable resolutions, and maintain neutrality while ensuring the interests of multiple stakeholders are addressed.",
  estimatedTime: "35-40 minutes",
  vocabulary: [
    "de-escalation",
    "bilateral talks",
    "third-party mediator",
    "confidence-building measures",
    "backchannel diplomacy",
    "multilateral negotiations",
    "diplomatic immunity",
    "territorial integrity",
    "conflict resolution",
    "strategic ambiguity",
    "memorandum of understanding",
    "non-aggression pact",
    "sanctions regime",
    "preliminary accord",
    "dispute settlement mechanism",
    "confidential briefing",
    "joint communiqué",
    "rhetorical neutrality",
    "good offices",
    "political leverage"
  ],
  steps: [
    {
      id: 1,
      botMessage:
        "Welcome to your diplomatic simulation. A territorial dispute between two neighboring countries has escalated after military maneuvers near the border. As a neutral mediator, how would you initiate dialogue and build initial trust between the parties?",
      inputMode: "freeText",
      suggestions: [
        "I would begin by arranging a confidential preliminary meeting with both sides to establish ground rules, emphasizing the importance of peaceful resolution and mutual respect. Trust can be fostered through transparency, neutral location selection, and the use of a structured agenda that gives equal voice to both parties."
      ],
      hints: "Propose initial de-escalation and confidence-building strategies.",
      expectedKeywords: ["trust", "neutral", "preliminary", "confidence-building", "ground rules"],
      acceptablePhrases: ["initial dialogue", "build trust", "confidential meeting", "de-escalation", "third-party mediator"],
      feedback: {
        correct: "Excellent. Initiating trust through structured dialogue and neutral facilitation is essential to diffusing tension.",
        partial: "A solid start. Could you elaborate on how you'd ensure neutrality and encourage both sides to engage?",
        incorrect: "Try to focus on building trust first through neutral and non-confrontational steps before proposing any resolution."
      }
    },
    {
      id: 2,
      botMessage:
        "One side demands immediate withdrawal of troops as a condition for talks, while the other insists on security guarantees first. How would you mediate this standoff?",
      inputMode: "freeText",
      suggestions: [
        "I would propose a phased agreement, beginning with symbolic gestures such as pulling back non-combat units and issuing a joint statement of non-aggression. These steps can serve as confidence-building measures while negotiations for a full security guarantee proceed."
      ],
      hints: "Recommend balanced steps to reduce immediate tension while respecting both parties’ core concerns.",
      expectedKeywords: ["phased", "confidence-building", "joint statement", "security guarantees", "withdrawal"],
      acceptablePhrases: ["de-escalation", "symbolic gestures", "reciprocity", "non-aggression", "security roadmap"],
      feedback: {
        correct: "Well done. A phased, reciprocal approach often allows each party to maintain dignity while easing tensions.",
        partial: "You’re on the right track. Could you add more about sequencing or how you'd address mutual concerns?",
        incorrect: "Try to suggest solutions that avoid unilateral concessions and promote balanced, step-by-step progress."
      }
    },
    {
      id: 3,
      botMessage:
        "Cultural misunderstandings and historical grievances are increasing the emotional stakes in the room. How would you handle this as a mediator while keeping negotiations constructive?",
      inputMode: "freeText",
      suggestions: [
        "I would acknowledge the emotional weight of the grievances while redirecting the discussion toward shared future interests. Incorporating culturally sensitive language and allowing time for emotional expression can diffuse tension and rebuild rapport."
      ],
      hints: "Focus on managing emotions without ignoring historical context.",
      expectedKeywords: ["cultural sensitivity", "grievances", "constructive", "emotional", "redirect"],
      acceptablePhrases: ["emotional tension", "historical grievances", "shared goals", "reframe", "respectful tone"],
      feedback: {
        correct: "Exactly. Acknowledging and respectfully reframing emotional concerns helps sustain constructive engagement.",
        partial: "You're moving in the right direction. Can you also include techniques for maintaining a collaborative atmosphere?",
        incorrect: "Try to focus on de-escalating emotional tension without dismissing the underlying cultural or historical context."
      }
    },
    {
      id: 4,
      botMessage:
        "A third-party nation offers to host and moderate the next round of talks but has strategic interests in the region. Do you accept the offer? Justify your decision.",
      inputMode: "freeText",
      suggestions: [
        "I would consider the offer only if the third-party's neutrality can be guaranteed through international oversight or co-moderation with a truly impartial actor such as the UN. The perception of bias could undermine the legitimacy of the process."
      ],
      hints: "Weigh the benefits of logistical support vs. risks to perceived neutrality.",
      expectedKeywords: ["neutrality", "bias", "third-party", "strategic interests", "moderation"],
      acceptablePhrases: ["impartial", "legitimacy", "UN oversight", "co-moderation", "perceived bias"],
      feedback: {
        correct: "Excellent reasoning. Safeguarding impartiality is key to maintaining credibility in high-stakes mediation.",
        partial: "You’ve identified important points. Could you address how to manage perceptions of bias more directly?",
        incorrect: "Focus on the importance of perceived neutrality in mediation—even logistical offers must be carefully vetted."
      }
    },
    {
      id: 5,
      botMessage:
        "Both sides agree in principle to a de-escalation plan, but disagree on verification measures. How would you propose a solution that satisfies both?",
      inputMode: "freeText",
      suggestions: [
        "I would propose involving an international verification body, such as the OSCE or UN observers, to monitor compliance. Their reports would be shared transparently with all stakeholders to maintain accountability and trust."
      ],
      hints: "Suggest impartial, transparent verification strategies.",
      expectedKeywords: ["verification", "compliance", "monitoring", "transparency", "accountability"],
      acceptablePhrases: ["international observers", "neutral monitors", "OSCE", "UN", "confidence-building"],
      feedback: {
        correct: "Perfect. Independent monitoring is essential to verifying compliance and reinforcing trust.",
        partial: "Good direction. Can you elaborate on how transparency and credibility would be ensured?",
        incorrect: "Avoid placing verification in the hands of any party involved. Suggest impartial, trusted mechanisms instead."
      }
    }
  ],
    completionMessage: "Congratulations! You've successfully completed the Diplomatic Crisis Mediation scenario. Your responses demonstrated outstanding command of advanced diplomatic discourse, including strategic negotiation techniques, cultural sensitivity, and high-stakes mediation skills. You have shown exceptional fluency, clarity, and sophistication in articulating nuanced perspectives under pressure—hallmarks of C2-level English proficiency in international affairs.",
  learningObjectives: [
    "Demonstrate mastery of advanced diplomatic and negotiation vocabulary",
    "Simulate high-level mediation scenarios with realism and nuance",
    "Strategically manage dialogue under pressure while maintaining neutrality",
    "Formulate persuasive arguments with tact and cultural sensitivity",
    "Apply advanced discourse strategies in high-stakes conflict settings",
    "Evaluate geopolitical complexity and propose viable solutions",
    "Use rhetorical precision to defuse tensions and build consensus"
  ],
  grammar: {
    points: [
      "Conditional structures for hypothetical diplomatic scenarios",
      "Passive voice for neutral, formal mediation tone",
      "Nominalization for abstraction and formality in strategic proposals",
      "Complex sentence structures with embedded clauses",
      "Advanced modal verbs for negotiation (e.g., might, must, could have)",
      "Rhetorical questions and hedging for diplomatic indirection",
      "Cohesive devices for managing extended argumentative turns"
    ]
  }

};

export default diplomaticCrisisMediation;
