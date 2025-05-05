// chatbot/A1/scenarios/supermarketShopping.js

const supermarketShopping = {
    id: 8,
    title: "Supermarket Shopping",
    level: "A1",
    description: "Practice shopping for groceries, asking about products and understanding basic checkout procedures.",
    estimatedTime: "10-15 minutes",
    vocabulary: ["supermarket", "bread", "milk", "egg", "cheese", "fruit", "vegetable", "meat", "aisle", "checkout"],
    steps: [
      {
        id: 1,
        botMessage: "Welcome to FreshMart Supermarket! Can I help you find something?",
        inputMode: "suggestions",
        suggestions: [
          "Yes, where can I find bread?",
          "I'm looking for the milk.",
          "Where is the cheese section?"
        ],
        hints: "Ask where to find specific items using 'Where can I find...?' or 'Where is...'",
        expectedKeywords: ["where", "find", "milk", "bread", "cheese", "section", "aisle"],
        feedback: {
          correct: "I'll show you!",
          incorrect: "Ask 'Where can I find...?' or 'Where is...?'"
        }
      },
      {
        id: 2,
        botMessage: "The bread is in aisle 3. We have many types today. Do you want white or brown bread?",
        inputMode: "hybrid",
        suggestions: [
          "I prefer white bread.",
          "Brown bread, please.",
          "Do you have whole wheat?"
        ],
        hints: "Tell your preference for bread type.",
        expectedKeywords: ["white", "brown", "wheat", "prefer", "like", "want"],
        acceptablePhrases: [
          "i want",
          "i like",
          "white",
          "brown"
        ],
        feedback: {
          correct: "Good choice!",
          partial: "Which type of bread?",
          incorrect: "Choose white, brown, or whole wheat bread."
        }
      },
      {
        id: 3,
        botMessage: "Great! Here's our fresh white bread. Would you like anything else?",
        inputMode: "freeText",
        suggestions: [
          "Yes, I need eggs too.",
          "Where is the fruit section?",
          "I need milk, please."
        ],
        hints: "Ask for more items or directions to other sections.",
        expectedKeywords: ["eggs", "milk", "fruit", "cheese", "need", "want", "yes", "no"],
        feedback: {
          correct: "I'll help you find that.",
          partial: "What else do you need?",
          incorrect: "Say what else you need or ask where to find it."
        }
      },
      {
        id: 4,
        botMessage: "Eggs are on the right side, next to the dairy products. How many eggs do you need?",
        inputMode: "suggestions",
        suggestions: [
          "A dozen, please.",
          "12 eggs.",
          "One carton of eggs."
        ],
        hints: "Specify how many eggs you want.",
        expectedKeywords: ["dozen", "12", "six", "eggs", "carton", "many"],
        feedback: {
          correct: "Here you are!",
          incorrect: "Tell how many eggs: a dozen or 12?"
        }
      },
      {
        id: 5,
        botMessage: "Do you need any fruits or vegetables today?",
        inputMode: "hybrid",
        suggestions: [
          "Yes, I need bananas.",
          "Do you have fresh apples?",
          "No, that's all for today."
        ],
        hints: "Decide if you want produce or decline politely.",
        expectedKeywords: ["yes", "no", "banana", "apple", "fruit", "vegetable", "fresh", "need"],
        feedback: {
          correct: "The fruit section is over there.",
          partial: "Which fruits or vegetables?",
          incorrect: "Answer yes or no, and specify what you want."
        }
      },
      {
        id: 6,
        botMessage: "Are you ready to checkout? The cashier is free now.",
        inputMode: "freeText",
        suggestions: [
          "Yes, I'm ready.",
          "I forgot milk. Where is it?",
          "One more thing, please."
        ],
        hints: "Confirm you're ready or mention if you forgot something.",
        expectedKeywords: ["yes", "ready", "forgot", "need", "milk", "one", "more"],
        acceptablePhrases: [
          "yes",
          "ready",
          "forgot",
          "need"
        ],
        feedback: {
          correct: "Great! Follow me to the cashier.",
          partial: "Let me help you quickly.",
          incorrect: "Say 'yes, I'm ready' or mention what you forgot."
        }
      },
      {
        id: 7,
        botMessage: "Your total is $12.50. How would you like to pay?",
        inputMode: "suggestions",
        suggestions: [
          "By card, please.",
          "I'll pay with cash.",
          "Do you accept mobile payment?"
        ],
        hints: "Choose your payment method.",
        expectedKeywords: ["card", "cash", "credit", "mobile", "pay", "payment"],
        feedback: {
          correct: "Perfect! Thank you for shopping with us!",
          incorrect: "Choose card, cash, or mobile payment."
        }
      }
    ],
    completionMessage: "Excellent! You successfully did your grocery shopping in English.",
    learningObjectives: [
      "Ask for product locations",
      "Understand basic food vocabulary",
      "Specify quantities",
      "Handle checkout procedures",
      "Use polite shopping phrases"
    ],
    grammar: {
      points: [
        "Questions with 'where'",
        "Quantities and numbers",
        "Present simple for shopping",
        "Prepositions of place"
      ]
    }
  };
  
  export default supermarketShopping;