// chatbot/A1/scenarios/restaurantReservation.js

const restaurantReservation = {
    id: 5,
    title: "Making a Restaurant Reservation",
    level: "A1",
    description: "Learn to make a reservation at a restaurant, including specifying date, time, and number of people.",
    estimatedTime: "12-15 minutes",
    vocabulary: ["reservation", "table", "people", "time", "today", "tomorrow", "lunch", "dinner", "name", "phone number"],
    steps: [
      {
        id: 1,
        botMessage: "Good afternoon, Roma Restaurant. How can I help you?",
        inputMode: "suggestions",
        suggestions: [
          "I'd like to make a reservation, please.",
          "Do you have a table for tonight?",
          "Hello, I want to book a table."
        ],
        hints: "Start with a polite request for a reservation.",
        expectedKeywords: ["reservation", "table", "book", "tonight", "want", "like"],
        feedback: {
          correct: "I'd be happy to help with that.",
          incorrect: "Try saying 'I'd like to make a reservation' or 'I want a table'."
        }
      },
      {
        id: 2,
        botMessage: "When would you like to come?",
        inputMode: "hybrid",
        suggestions: [
          "Tonight at 7 PM.",
          "Tomorrow for lunch.",
          "This Friday at 8 PM."
        ],
        hints: "Specify when you want to come using day and time.",
        expectedKeywords: ["tonight", "tomorrow", "friday", "lunch", "dinner", "pm", "am", "time"],
        acceptablePhrases: [
          "tonight",
          "tomorrow",
          "today",
          "friday"
        ],
        feedback: {
          correct: "Let me check our availability.",
          partial: "Could you be more specific about the time?",
          incorrect: "Mention the day and time, like 'tonight at 7 PM'."
        }
      },
      {
        id: 3,
        botMessage: "How many people will be in your party?",
        inputMode: "freeText",
        suggestions: [
          "Table for two, please.",
          "Four people.",
          "There will be three of us."
        ],
        hints: "Tell how many people using numbers.",
        expectedKeywords: ["two", "three", "four", "people", "table", "for"],
        feedback: {
          correct: "Got it!",
          partial: "How many exactly?",
          incorrect: "Use numbers like 'two', 'three', or 'four people'."
        }
      },
      {
        id: 4,
        botMessage: "We have a table for two at 7 PM tonight. May I have your name for the reservation?",
        inputMode: "hybrid",
        suggestions: [
          "My name is [your name].",
          "It's under [your name].",
          "The reservation is for [your name]."
        ],
        hints: "Give your name for the booking.",
        expectedKeywords: ["name", "under", "my", "reservation"],
        feedback: {
          correct: "Thank you!",
          partial: "What's the name for the reservation?",
          incorrect: "Say 'My name is...' or 'It's under...'"
        }
      },
      {
        id: 5,
        botMessage: "And may I have a phone number where we can reach you?",
        inputMode: "suggestions",
        suggestions: [
          "It's 555-1234.",
          "My number is 555-9876.",
          "You can call me at 555-4321."
        ],
        hints: "Give a phone number (you can make one up).",
        expectedKeywords: ["number", "phone", "call", "555"],
        feedback: {
          correct: "Perfect!",
          incorrect: "Provide a phone number starting with 'It's...' or 'My number is...'"
        }
      },
      {
        id: 6,
        botMessage: "Any special requests or dietary restrictions?",
        inputMode: "freeText",
        suggestions: [
          "No, nothing special.",
          "I'm vegetarian.",
          "We have a child. Do you have high chairs?"
        ],
        hints: "Mention any special needs or say 'nothing special'.",
        expectedKeywords: ["no", "nothing", "vegetarian", "child", "allergy", "special"],
        acceptablePhrases: [
          "no",
          "nothing",
          "vegetarian",
          "allergy"
        ],
        feedback: {
          correct: "I've noted that.",
          partial: "Any special requirements?",
          incorrect: "Say 'No, nothing special' or mention dietary needs."
        }
      },
      {
        id: 7,
        botMessage: "Your reservation is confirmed for tonight at 7 PM for two people under [your name]. We look forward to seeing you!",
        inputMode: "hybrid",
        suggestions: [
          "Thank you very much.",
          "Great! See you tonight.",
          "Thanks for your help."
        ],
        hints: "Thank them and confirm the reservation.",
        expectedKeywords: ["thank", "thanks", "see", "great", "tonight"],
        feedback: {
          correct: "You're welcome!",
          incorrect: "Don't forget to say 'thank you'."
        }
      }
    ],
    completionMessage: "Excellent! You've successfully made a restaurant reservation.",
    learningObjectives: [
      "Make a reservation",
      "Specify date and time",
      "Give personal information",
      "Handle special requests",
      "Use future tense for plans"
    ],
    grammar: {
      points: [
        "Present for arrangements (I'd like to...)",
        "Time expressions (tonight, tomorrow)",
        "Numbers and quantities",
        "Present perfect for confirmation"
      ]
    }
  };
  
  export default restaurantReservation;