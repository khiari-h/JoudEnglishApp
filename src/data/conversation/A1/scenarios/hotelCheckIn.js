// chatbot/A1/scenarios/hotelCheckIn.js

const hotelCheckIn = {
    id: 6,
    title: "Hotel Check-In",
    level: "A1",
    description: "Practice checking into a hotel, asking about facilities, and handling basic hotel situations.",
    estimatedTime: "10-15 minutes",
    vocabulary: ["reservation", "check-in", "room", "key", "wifi", "breakfast", "reception", "floor", "elevator", "night"],
    steps: [
      {
        id: 1,
        botMessage: "Good afternoon, welcome to the Grand Hotel. How can I help you?",
        inputMode: "suggestions",
        suggestions: [
          "I have a reservation.",
          "I'm checking in.",
          "Hello, I'm here to check in."
        ],
        hints: "Tell them you have a reservation or want to check in.",
        expectedKeywords: ["reservation", "check", "in", "booking", "stay"],
        feedback: {
          correct: "Welcome! I'd be happy to help.",
          incorrect: "Say 'I have a reservation' or 'I'm checking in'."
        }
      },
      {
        id: 2,
        botMessage: "May I have your name, please?",
        inputMode: "hybrid",
        suggestions: [
          "My name is John Smith.",
          "It's under Emily Johnson.",
          "I'm Michael Brown."
        ],
        hints: "Give your name for the reservation.",
        expectedKeywords: ["name", "my", "under", "I'm"],
        acceptablePhrases: [
          "my name",
          "i'm",
          "it's under"
        ],
        feedback: {
          correct: "Thank you, let me find your reservation.",
          partial: "And your last name?",
          incorrect: "Please give your full name."
        }
      },
      {
        id: 3,
        botMessage: "Yes, I found your reservation. You booked for 3 nights, is that correct?",
        inputMode: "freeText",
        suggestions: [
          "Yes, that's correct.",
          "Actually, it's for 2 nights.",
          "Can you check again? It should be 4 nights."
        ],
        hints: "Confirm or correct the number of nights.",
        expectedKeywords: ["yes", "correct", "3", "two", "three", "night", "wrong"],
        feedback: {
          correct: "Perfect!",
          partial: "Let me update that for you.",
          incorrect: "Please confirm: is it 3 nights?"
        }
      },
      {
        id: 4,
        botMessage: "Here is your room key. You're in room 312 on the third floor. Is this your first time at our hotel?",
        inputMode: "suggestions",
        suggestions: [
          "Yes, it's my first time.",
          "No, I stayed here last year.",
          "Yes, can you tell me about the hotel?"
        ],
        hints: "Answer about your experience with the hotel.",
        expectedKeywords: ["yes", "no", "first", "time", "before", "stayed"],
        feedback: {
          correct: "Great! Let me give you some information.",
          incorrect: "Have you been here before? Yes or no?"
        }
      },
      {
        id: 5,
        botMessage: "The wifi password is 'Hotel2023'. Breakfast is served from 7 to 10 AM in the restaurant. Any questions?",
        inputMode: "hybrid",
        suggestions: [
          "Where is the elevator?",
          "Is there a swimming pool?",
          "What time is checkout?"
        ],
        hints: "Ask about hotel facilities or services.",
        expectedKeywords: ["elevator", "pool", "checkout", "restaurant", "bar", "gym"],
        feedback: {
          correct: "Let me explain.",
          partial: "What else would you like to know?",
          incorrect: "Ask about facilities like elevator, pool, or checkout time."
        }
      },
      {
        id: 6,
        botMessage: "The elevator is just around the corner. Pool is on the roof, and checkout is at 11 AM. Enjoy your stay!",
        inputMode: "freeText",
        suggestions: [
          "Thank you for all the information!",
          "Thanks. Have a good day!",
          "Great, thanks for your help!"
        ],
        hints: "Thank them politely for the information.",
        expectedKeywords: ["thank", "thanks", "information", "help", "good", "day"],
        acceptablePhrases: [
          "thank you",
          "thanks",
          "good day"
        ],
        feedback: {
          correct: "You're welcome! Enjoy your stay!",
          partial: "Don't forget to thank them!",
          incorrect: "End with 'Thank you' or 'Thanks'."
        }
      }
    ],
    completionMessage: "Excellent! You've successfully checked into a hotel and got important information.",
    learningObjectives: [
      "Check into a hotel",
      "Provide personal information",
      "Ask about hotel facilities",
      "Understand basic instructions",
      "Handle common hotel situations"
    ],
    grammar: {
      points: [
        "Present perfect for bookings",
        "Yes/No questions and answers",
        "Ordinal numbers (floors)",
        "Time expressions (from...to)"
      ]
    }
  };

  export default hotelCheckIn;
