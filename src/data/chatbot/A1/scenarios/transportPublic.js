// chatbot/A1/scenarios/transportPublic.js

const transportPublic = {
    id: 10,
    title: "Using Public Transport",
    level: "A1",
    description: "Learn basic phrases for using buses, trains, and other public transportation.",
    estimatedTime: "10-15 minutes",
    vocabulary: ["bus", "train", "ticket", "station", "stop", "platform", "schedule", "arrive", "depart", "fare"],
    steps: [
      {
        id: 1,
        botMessage: "Hello! This is the ticket office. How can I help you?",
        inputMode: "suggestions",
        suggestions: [
          "I need a bus ticket, please.",
          "Where can I buy a train ticket?",
          "How much is a ticket to downtown?"
        ],
        hints: "Ask about tickets for public transport.",
        expectedKeywords: ["ticket", "bus", "train", "buy", "need", "much", "price"],
        feedback: {
          correct: "I'd be happy to help you with that.",
          incorrect: "Ask about buying a ticket or the price."
        }
      },
      {
        id: 2,
        botMessage: "Where would you like to go?",
        inputMode: "hybrid",
        suggestions: [
          "To the airport, please.",
          "I want to go to the city center.",
          "To Central Station."
        ],
        hints: "Tell your destination.",
        expectedKeywords: ["airport", "city", "center", "station", "downtown", "go", "to"],
        acceptablePhrases: [
          "to",
          "airport",
          "city center",
          "downtown"
        ],
        feedback: {
          correct: "How many tickets do you need?",
          partial: "Which place exactly?",
          incorrect: "Say where you want to go using 'to' + place."
        }
      },
      {
        id: 3,
        botMessage: "How many tickets do you need?",
        inputMode: "freeText",
        suggestions: [
          "One ticket, please.",
          "Two adult tickets.",
          "One adult and one child ticket."
        ],
        hints: "Specify the number and type of tickets.",
        expectedKeywords: ["one", "two", "adult", "child", "ticket", "please"],
        feedback: {
          correct: "The fare to the city center is $3 per person.",
          partial: "How many people are traveling?",
          incorrect: "Say how many tickets: one, two, etc."
        }
      },
      {
        id: 4,
        botMessage: "A ticket to the city center costs $3. Would you like a single or return ticket?",
        inputMode: "suggestions",
        suggestions: [
          "A single ticket, please.",
          "Return ticket, please.",
          "What's the difference?"
        ],
        hints: "Choose between one-way or round-trip ticket.",
        expectedKeywords: ["single", "return", "round", "trip", "both", "difference"],
        feedback: {
          correct: "Perfect!",
          incorrect: "Choose 'single' for one-way or 'return' for round-trip."
        }
      },
      {
        id: 5,
        botMessage: "What time do you want to travel?",
        inputMode: "hybrid",
        suggestions: [
          "As soon as possible.",
          "Around 3 PM.",
          "What time is the next bus?"
        ],
        hints: "Tell when you want to travel.",
        expectedKeywords: ["now", "soon", "3", "time", "next", "bus", "train", "morning", "afternoon"],
        feedback: {
          correct: "Let me check the schedule.",
          partial: "Morning or afternoon?",
          incorrect: "Say when you want to travel: now, afternoon, etc."
        }
      },
      {
        id: 6,
        botMessage: "The next bus leaves at 3:15 PM from platform 2. It arrives at 3:45 PM.",
        inputMode: "freeText",
        suggestions: [
          "Platform 2. Thank you!",
          "Arrives at 3:45. Got it!",
          "Is it direct or do I need to change?"
        ],
        hints: "Confirm understanding or ask more questions.",
        expectedKeywords: ["platform", "15", "45", "change", "direct", "understand", "okay"],
        acceptablePhrases: [
          "platform 2",
          "got it",
          "understand",
          "thank you"
        ],
        feedback: {
          correct: "Great! Here's your ticket.",
          partial: "Did you understand the information?",
          incorrect: "Confirm the platform and time."
        }
      },
      {
        id: 7,
        botMessage: "Here's your ticket and $1 change. Have a good trip!",
        inputMode: "suggestions",
        suggestions: [
          "Thank you very much!",
          "Thanks for your help!",
          "Thank you. Goodbye!"
        ],
        hints: "Thank them politely.",
        expectedKeywords: ["thank", "thanks", "goodbye", "bye", "help"],
        feedback: {
          correct: "You're welcome! Safe travels!",
          incorrect: "Don't forget to say 'thank you'."
        }
      }
    ],
    completionMessage: "Excellent! You can now buy public transport tickets confidently.",
    learningObjectives: [
      "Buy transport tickets",
      "Ask about destinations and times",
      "Understand basic schedule information",
      "Deal with money and change",
      "Ask for platform/gate information"
    ],
    grammar: {
      points: [
        "Questions about time and place",
        "Need vs want for requests",
        "Telling time and dates",
        "Prepositions of movement (to, from)"
      ]
    }
  };
  
  export default transportPublic;