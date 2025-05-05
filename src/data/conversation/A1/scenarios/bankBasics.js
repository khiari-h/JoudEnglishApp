// chatbot/A1/scenarios/bankBasics.js

const bankBasics = {
    id: 9,
    title: "Basic Banking",
    level: "A1",
    description: "Learn essential banking vocabulary and phrases for basic transactions like exchanging money.",
    estimatedTime: "10-15 minutes",
    vocabulary: ["bank", "money", "change", "dollar", "euro", "account", "cash", "coin", "bill", "ATM"],
    steps: [
      {
        id: 1,
        botMessage: "Good morning! Welcome to City Bank. How can I help you today?",
        inputMode: "suggestions",
        suggestions: [
          "I want to change money.",
          "Where can I exchange dollars?",
          "I need to get euros."
        ],
        hints: "Tell the bank what you need to do.",
        expectedKeywords: ["change", "exchange", "money", "dollars", "euros", "currency"],
        feedback: {
          correct: "I can help you with that.",
          incorrect: "Tell them if you want to change money or exchange currency."
        }
      },
      {
        id: 2,
        botMessage: "What currency would you like to exchange?",
        inputMode: "hybrid",
        suggestions: [
          "I have dollars. I need euros.",
          "Can I change pounds to dollars?",
          "From US dollars to euros, please."
        ],
        hints: "Specify what currency you have and what you need.",
        expectedKeywords: ["dollars", "euros", "pounds", "from", "to", "have", "need"],
        acceptablePhrases: [
          "i have",
          "i need",
          "from",
          "to"
        ],
        feedback: {
          correct: "How much would you like to exchange?",
          partial: "What currency do you have now?",
          incorrect: "Say what currency you have and what you want."
        }
      },
      {
        id: 3,
        botMessage: "How much money would you like to exchange?",
        inputMode: "freeText",
        suggestions: [
          "100 dollars, please.",
          "I want to change 200 euros.",
          "Is there a minimum amount?"
        ],
        hints: "Tell the amount you want to exchange.",
        expectedKeywords: ["100", "200", "dollars", "euros", "pound", "amount", "all"],
        feedback: {
          correct: "Let me check the current exchange rate.",
          partial: "Could you be more specific about the amount?",
          incorrect: "Say how much money you want to exchange."
        }
      },
      {
        id: 4,
        botMessage: "Today's rate is 1 dollar equals 0.85 euros. 100 dollars will give you 85 euros. Is that okay?",
        inputMode: "suggestions",
        suggestions: [
          "Yes, that's fine.",
          "Can I get small bills?",
          "Do you have coins too?"
        ],
        hints: "Accept the rate or ask about specific denominations.",
        expectedKeywords: ["yes", "okay", "fine", "small", "bills", "coins", "notes"],
        feedback: {
          correct: "Let me get that for you.",
          incorrect: "Say 'yes' or ask about specific money types."
        }
      },
      {
        id: 5,
        botMessage: "Do you have an account with us, or is this a cash transaction?",
        inputMode: "hybrid",
        suggestions: [
          "Cash transaction, please.",
          "I don't have an account.",
          "Yes, my account number is..."
        ],
        hints: "Tell if you have an account or want cash.",
        expectedKeywords: ["cash", "account", "no", "yes", "don't", "have"],
        feedback: {
          correct: "I'll process this for you now.",
          partial: "Account or cash exchange?",
          incorrect: "Say if you have an account or want cash."
        }
      },
      {
        id: 6,
        botMessage: "Here are your 85 euros. Please count them to make sure.",
        inputMode: "freeText",
        suggestions: [
          "Thank you. It's correct.",
          "Yes, 85 euros. Thank you!",
          "All correct. Thanks!"
        ],
        hints: "Confirm you received the correct amount.",
        expectedKeywords: ["thank", "correct", "right", "85", "euros", "yes", "good"],
        acceptablePhrases: [
          "thank you",
          "thanks",
          "correct",
          "right"
        ],
        feedback: {
          correct: "You're welcome! Is there anything else I can help you with?",
          partial: "Always count your money.",
          incorrect: "Confirm the amount is correct."
        }
      },
      {
        id: 7,
        botMessage: "Would you like a receipt for this transaction?",
        inputMode: "suggestions",
        suggestions: [
          "Yes, please.",
          "No, thank you.",
          "Yes, I need it for my records."
        ],
        hints: "Decide if you want a receipt.",
        expectedKeywords: ["yes", "no", "please", "receipt", "records", "need"],
        feedback: {
          correct: "Have a good day!",
          incorrect: "Say 'yes' or 'no' about the receipt."
        }
      }
    ],
    completionMessage: "Great job! You successfully completed a currency exchange transaction.",
    learningObjectives: [
      "Exchange currency",
      "Understand basic banking terms",
      "Deal with money amounts",
      "Ask about rates and fees",
      "Request specific denominations"
    ],
    grammar: {
      points: [
        "Simple present for transactions",
        "Numbers and amounts",
        "Questions with 'can'",
        "Prepositions with money"
      ]
    }
  };
  
  export default bankBasics;