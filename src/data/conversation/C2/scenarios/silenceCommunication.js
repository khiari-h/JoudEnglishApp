const silenceCommunication = {
  id: 5,
  title: "S i l e n c e   a s   a   F o r m   o f   C o m m u n i c a t i o n",
  level: "C2",
  description:
    "Explore the subtle and powerful communicative functions of silence across cultural, emotional, and strategic contexts. This scenario invites you to analyze how silence can serve as a tool for expression, resistance, empathy, and ambiguity, and challenges you to articulate nuanced interpretations using advanced linguistic and argumentative skills.",
  estimatedTime: "30-40 minutes",
  vocabulary: [
    "non-verbal communication",
    "pregnant pause",
    "emotional subtext",
    "strategic silence",
    "communicative ambiguity",
    "implicit meaning",
    "interpersonal distance",
    "passive resistance",
    "unsaid tension",
    "tacit understanding",
    "pragmatic inference",
    "eloquent silence",
    "cultural conventions",
    "conversational implicature",
    "psychological restraint"
  ],
  steps: [
    {
      id: 1,
      botMessage:
        "Let’s begin with a foundational question. In your opinion, can silence be considered a legitimate form of communication? What functions might it serve in interpersonal, social, or political contexts?",
      inputMode: "freeText",
      suggestions: [
        "Silence is not merely the absence of speech, but a powerful communicative tool that can convey disapproval, reflection, solidarity, or emotional overwhelm. In political protests, silence may serve as resistance. In interpersonal conflict, it can express tension or protection. Its meaning depends heavily on context and shared cultural understanding."
      ],
      hints: "Reflect on contexts where silence communicates more than words.",
      expectedKeywords: ["communication", "context", "meaning", "non-verbal", "expression", "function"],
      acceptablePhrases: [
        "strategic silence",
        "non-verbal cue",
        "passive communication",
        "emotional signal",
        "social dynamic"
      ],
      feedback: {
        correct:
          "Excellent. You've recognized the complex and contextual nature of silence as a communicative act.",
        partial:
          "Good start. Could you expand more on how silence might function in political or emotional contexts?",
        incorrect:
          "Try to reflect on how silence, while non-verbal, can carry intentional meaning across situations."
      }
    },
    {
      id: 2,
      botMessage:
        "Silence can have very different meanings depending on cultural norms. How does the role of silence differ across cultures, and what challenges does this pose in intercultural communication?",
      inputMode: "freeText",
      suggestions: [
        "In some East Asian cultures, silence is associated with respect, humility, or deep thought, whereas in many Western cultures, silence in conversation may be perceived as awkward or evasive. These differences can lead to misinterpretation and tension in intercultural communication, especially in diplomacy or business negotiation."
      ],
      hints: "Think about how silence may be interpreted differently across societies.",
      expectedKeywords: ["culture", "interpretation", "miscommunication", "norms", "context"],
      acceptablePhrases: [
        "cultural variation",
        "pragmatic differences",
        "non-verbal norms",
        "cultural misunderstanding",
        "intercultural dynamics"
      ],
      feedback: {
        correct:
          "Well done. You’ve shown strong cultural awareness and understanding of how silence functions differently depending on context.",
        partial:
          "You're on the right path. Can you elaborate more on the impact of these cultural differences in real communication?",
        incorrect:
          "Try to consider specific examples of how silence is valued or avoided in different cultures and the communication challenges this creates."
      }
    },
    {
      id: 3,
      botMessage:
        "In emotional or intimate contexts, silence can be deeply expressive. Describe a situation in which silence might communicate empathy or emotional depth more effectively than words.",
      inputMode: "freeText",
      suggestions: [
        "In moments of grief or emotional pain, silence can express solidarity, presence, and compassion without the risk of saying the wrong thing. A quiet gesture or simply sitting with someone in silence can convey more support than verbal reassurance. It allows space for emotions to be felt and respected."
      ],
      hints: "Explore silence as an emotional or empathetic response.",
      expectedKeywords: ["empathy", "grief", "presence", "emotion", "intimacy"],
      acceptablePhrases: [
        "emotional resonance",
        "non-verbal empathy",
        "holding space",
        "shared silence",
        "compassion without words"
      ],
      feedback: {
        correct:
          "Beautifully expressed. You've captured the emotional subtlety and power of silence in personal relationships.",
        partial:
          "You're close. Can you add more detail about the emotional or human impact of silent presence?",
        incorrect:
          "Try to reflect on situations where words may be inadequate, and silence becomes meaningful on its own."
      }
    },
    {
      id: 4,
      botMessage:
        "Let’s turn to public discourse. How can silence be used strategically in politics, diplomacy, or activism?",
      inputMode: "freeText",
      suggestions: [
        "Silence can be a form of protest, as seen in moments of national silence for tragedy or in movements like silent marches. Diplomatically, silence can signal dissatisfaction or create space for negotiation. In politics, not answering a question can shift power or avoid committing to a stance, thus acting as rhetorical strategy."
      ],
      hints: "Think about silence as a rhetorical or strategic act.",
      expectedKeywords: ["strategy", "politics", "protest", "diplomacy", "power"],
      acceptablePhrases: [
        "rhetorical silence",
        "symbolic silence",
        "protest tactic",
        "strategic ambiguity",
        "non-verbal resistance"
      ],
      feedback: {
        correct:
          "Excellent analysis. Silence can be a calculated and powerful move in the public and political sphere.",
        partial:
          "Nice examples. Could you clarify how silence might shift the power dynamic in those cases?",
        incorrect:
          "Focus more on how silence is used intentionally in public or political settings to make a point."
      }
    },
    {
      id: 5,
      botMessage:
        "Finally, consider the role of silence in literature or film. How can an author or director use silence to create meaning, tension, or depth?",
      inputMode: "freeText",
      suggestions: [
        "In film, a pause in dialogue or a silent scene can heighten emotional tension or reveal internal conflict. In literature, the unsaid—the gaps between dialogue or the inner monologue left unspoken—can be more telling than explicit exposition. Silence invites the audience to participate actively in interpretation."
      ],
      hints: "Analyze silence as a narrative or artistic device.",
      expectedKeywords: ["film", "literature", "tension", "interpretation", "depth"],
      acceptablePhrases: [
        "narrative silence",
        "dramatic pause",
        "subtext",
        "reader inference",
        "artistic restraint"
      ],
      feedback: {
        correct:
          "Very insightful. You've shown how silence can become a tool for artistic and emotional resonance.",
        partial:
          "Good start. Could you expand more on how silence engages the reader or viewer in interpretation?",
        incorrect:
          "Try to focus on how silence can be used creatively to deepen narrative meaning or emotional impact."
      }
    }
  ],
  completionMessage:
    "Congratulations! You've completed the Silence as a Form of Communication scenario. Your responses demonstrated exceptional command of abstract language, emotional nuance, and cultural interpretation. You showed great skill in analyzing subtle communication dynamics and articulating your ideas with clarity and sensitivity—hallmarks of C2-level mastery.",
  learningObjectives: [
    "Analyze the communicative functions of silence across different contexts",
    "Compare cultural perspectives on silence and their pragmatic implications",
    "Interpret emotional subtext and unspoken meaning in interaction",
    "Use nuanced language to explore ambiguity, restraint, and intention",
    "Construct logically coherent arguments with appropriate hedging and subtlety"
  ],
  grammar: {
    points: [
      "Use of passive voice for neutrality and distance",
      "Advanced conditional structures for speculative reflection",
      "Nominalizations for abstract discussion (e.g. 'ambiguity', 'presence')",
      "Modal verbs expressing uncertainty, possibility, or strategic intent",
      "Complex sentence structures for layered reasoning",
      "Use of rhetorical questions and pauses to mirror the topic linguistically"
    ]
  }
};

export default silenceCommunication;

