// chatbot/A1/scenarios/askingDirections.js

const askingDirections = {
    id: 3,
    title: "Asking for Directions",
    level: "A1",
    description: "Learn how to ask for and understand simple directions to common places like museums, stations, and shops.",
    estimatedTime: "10-15 minutes",
    vocabulary: ["where", "museum", "station", "straight", "left", "right", "near", "far", "walk", "take", "bus"],
    steps: [
      {
        id: 1,
        botMessage: "Excuse me, you look lost. Can I help you?",
        inputMode: "suggestions",
        suggestions: [
          "Yes, please. Where is the museum?",
          "Hello. I'm looking for the train station.",
          "Can you help me find a supermarket?"
        ],
        hints: "Ask where a place is using 'Where is...?' or 'I'm looking for...'",
        expectedKeywords: ["yes", "where", "looking", "museum", "station", "supermarket", "please"],
        feedback: {
          correct: "I'd be happy to help!",
          incorrect: "Try asking 'Where is the museum?' or 'Where is the station?'"
        }
      },
      {
        id: 2,
        botMessage: "The museum is about 10 minutes from here. Do you want to walk or take the bus?",
        inputMode: "hybrid",
        suggestions: [
          "I prefer to walk.",
          "Is it far to walk?",
          "Which bus should I take?"
        ],
        hints: "Express your preference or ask for more information.",
        expectedKeywords: ["walk", "bus", "far", "take", "which", "prefer"],
        acceptablePhrases: [
          "i want",
          "i prefer",
          "walk",
          "bus"
        ],
        feedback: {
          correct: "Let me explain the way.",
          partial: "Good question! Let me help you decide.",
          incorrect: "You can walk or take the bus. What do you prefer?"
        }
      },
      {
        id: 3,
        botMessage: "To walk there: go straight on this street for two blocks, then turn right at the traffic lights.",
        inputMode: "freeText",
        suggestions: [
          "Two blocks, then right. Got it!",
          "Can you repeat that, please?",
          "Which street do I turn right on?"
        ],
        hints: "Confirm you understand or ask for more details.",
        expectedKeywords: ["straight", "right", "blocks", "got", "repeat", "understand", "sure"],
        feedback: {
          correct: "Great! You're on the right track.",
          partial: "You're understanding well!",
          incorrect: "Try to confirm like 'I understand' or ask to repeat."
        }
      },
      {
        id: 4,
        botMessage: "After you turn right, continue for about 5 minutes. The museum is on your left, next to a big park.",
        inputMode: "suggestions",
        suggestions: [
          "Next to a park. Thank you!",
          "Left side, near the park. Thanks!",
          "Is it open today?"
        ],
        hints: "Confirm the location or ask about opening times.",
        expectedKeywords: ["park", "left", "open", "today", "thank", "time", "hour"],
        feedback: {
          correct: "You're ready to go!",
          incorrect: "Confirm where it is: 'on the left' and 'next to the park'."
        }
      },
      {
        id: 5,
        botMessage: "Yes, it's open from 9 AM to 5 PM today. The entrance is free for students.",
        inputMode: "hybrid",
        suggestions: [
          "I have a student ID.",
          "How much for adults?",
          "Is there a café inside?"
        ],
        hints: "Ask practical questions about your visit.",
        expectedKeywords: ["student", "money", "cost", "price", "café", "restaurant", "toilet"],
        feedback: {
          correct: "Helpful to know!",
          partial: "Good question!",
          incorrect: "You can ask about price, student ID, or facilities."
        }
      },
      {
        id: 6,
        botMessage: "Adult tickets cost $5. There's a café on the third floor with nice city views.",
        inputMode: "freeText",
        suggestions: [
          "Thank you for your help!",
          "You're very helpful. Thanks!",
          "I appreciate it. Goodbye!"
        ],
        hints: "Thank the person for their help and say goodbye.",
        expectedKeywords: ["thank", "thanks", "bye", "goodbye", "help", "appreciate"],
        acceptablePhrases: [
          "thank you",
          "thanks",
          "bye",
          "goodbye"
        ],
        feedback: {
          correct: "You're welcome! Enjoy the museum!",
          partial: "Almost there! Don't forget to say goodbye.",
          incorrect: "End with 'Thank you' and 'Goodbye'."
        }
      }
    ],
    completionMessage: "Excellent! You can now ask for directions confidently and understand basic instructions.",
    learningObjectives: [
      "Ask for directions politely",
      "Understand basic directional vocabulary",
      "Confirm understanding",
      "Ask for practical information",
      "Thank people for help"
    ],
    grammar: {
      points: [
        "Question words (Where, Which, How)",
        "Prepositions of place (on, at, next to)",
        "Imperatives for directions (go, turn, continue)",
        "Present simple for opening times"
      ]
    }
  };

  export default askingDirections;
