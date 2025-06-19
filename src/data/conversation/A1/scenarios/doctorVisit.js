// chatbot/A1/scenarios/doctorVisit.js

const doctorVisit = {
    id: 7,
    title: "Visiting the Doctor",
    level: "A1",
    description: "Learn basic medical vocabulary and how to describe simple health problems to a doctor.",
    estimatedTime: "12-15 minutes",
    vocabulary: ["doctor", "appointment", "sick", "headache", "fever", "medicine", "hurt", "better", "symptom", "pain"],
    steps: [
      {
        id: 1,
        botMessage: "Good morning! Do you have an appointment?",
        inputMode: "suggestions",
        suggestions: [
          "Yes, I have an appointment at 10 AM.",
          "My name is [your name]. I booked for 10:30.",
          "Yes, I'm here to see Dr. Smith."
        ],
        hints: "Confirm your appointment time and possibly your name.",
        expectedKeywords: ["yes", "appointment", "10", "name", "doctor", "here"],
        feedback: {
          correct: "Great! The doctor will see you shortly.",
          incorrect: "Please confirm your appointment and give your name."
        }
      },
      {
        id: 2,
        botMessage: "What seems to be the problem today?",
        inputMode: "hybrid",
        suggestions: [
          "I have a headache.",
          "I feel sick.",
          "My stomach hurts."
        ],
        hints: "Describe your basic symptoms using simple phrases.",
        expectedKeywords: ["headache", "sick", "hurt", "pain", "fever", "cough", "stomach"],
        acceptablePhrases: [
          "i have",
          "i feel",
          "my"
        ],
        feedback: {
          correct: "I see. How long have you had this?",
          partial: "Could you be more specific?",
          incorrect: "Describe what hurts or how you feel."
        }
      },
      {
        id: 3,
        botMessage: "How long have you had this headache?",
        inputMode: "freeText",
        suggestions: [
          "Since yesterday.",
          "For two days.",
          "It started this morning."
        ],
        hints: "Tell when the problem started using simple time expressions.",
        expectedKeywords: ["yesterday", "days", "two", "morning", "week", "today", "since"],
        feedback: {
          correct: "Do you have any other symptoms?",
          partial: "When exactly did it start?",
          incorrect: "Use time words like 'yesterday' or 'two days'."
        }
      },
      {
        id: 4,
        botMessage: "Do you have a fever too?",
        inputMode: "suggestions",
        suggestions: [
          "Yes, I feel hot.",
          "No, just the headache.",
          "I think so. I'm very warm."
        ],
        hints: "Answer yes or no and add more details if you can.",
        expectedKeywords: ["yes", "no", "fever", "hot", "warm", "cold", "think"],
        feedback: {
          correct: "I understand.",
          incorrect: "Answer 'yes' or 'no' about having a fever."
        }
      },
      {
        id: 5,
        botMessage: "Are you taking any medicine now?",
        inputMode: "hybrid",
        suggestions: [
          "No, nothing.",
          "Yes, I take aspirin.",
          "Just vitamins."
        ],
        hints: "Tell about any medicines you're taking.",
        expectedKeywords: ["no", "yes", "medicine", "aspirin", "vitamin", "painkiller", "nothing"],
        feedback: {
          correct: "Okay, I'll check your temperature now.",
          partial: "What medicines exactly?",
          incorrect: "Say what medicines you take or 'no, nothing'."
        }
      },
      {
        id: 6,
        botMessage: "Your temperature is normal. I think you have a simple headache. I'll give you some medicine.",
        inputMode: "freeText",
        suggestions: [
          "How often should I take it?",
          "Are there side effects?",
          "When will I feel better?"
        ],
        hints: "Ask practical questions about the medicine.",
        expectedKeywords: ["often", "take", "side", "effects", "better", "when", "how", "long"],
        acceptablePhrases: [
          "how often",
          "how many",
          "when",
          "side effects"
        ],
        feedback: {
          correct: "Good question! Let me explain.",
          partial: "Any other questions about the medicine?",
          incorrect: "Ask about taking the medicine or side effects."
        }
      },
      {
        id: 7,
        botMessage: "Take one tablet every 6 hours with food. You should feel better in 2-3 days. Come back if it doesn't improve.",
        inputMode: "suggestions",
        suggestions: [
          "Thank you, doctor.",
          "Okay, I understand. Thanks!",
          "Thank you for your help."
        ],
        hints: "Thank the doctor for the help.",
        expectedKeywords: ["thank", "thanks", "doctor", "okay", "understand"],
        feedback: {
          correct: "You're welcome! Take care and get well soon!",
          incorrect: "Don't forget to thank the doctor."
        }
      }
    ],
    completionMessage: "Well done! You successfully described your symptoms and understood the doctor's advice.",
    learningObjectives: [
      "Describe basic health symptoms",
      "Talk about duration of illness",
      "Understand simple medical advice",
      "Ask about medicine and treatment",
      "Use present perfect for duration"
    ],
    grammar: {
      points: [
        "Present perfect (How long have you...?)",
        "Present simple for describing symptoms",
        "Modal verbs (should, will)",
        "Time expressions (for, since)"
      ]
    }
  };

  export default doctorVisit;
