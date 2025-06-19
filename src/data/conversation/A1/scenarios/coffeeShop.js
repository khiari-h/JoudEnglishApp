// chatbot/A1/scenarios/coffeeShop.js

const coffeeShop = {
    id: 2,
    title: "At the Coffee Shop",
    level: "A1",
    description: "Practice ordering drinks and food at a café, including making simple requests and being polite.",
    estimatedTime: "12-18 minutes",
    vocabulary: ["coffee", "tea", "muffin", "water", "please", "thank you", "small", "large", "card", "cash"],
    steps: [
      {
        id: 1,
        botMessage: "Good morning! Welcome to City Coffee. What can I get for you today?",
        inputMode: "suggestions",
        suggestions: [
          "Hello, I would like a coffee, please.",
          "Good morning. Can I have a tea?",
          "Hi, I want a coffee."
        ],
        hints: "Start with a greeting and then order using 'I would like...' or 'Can I have...'",
        expectedKeywords: ["hello", "morning", "coffee", "tea", "please", "like", "want"],
        feedback: {
          correct: "Great! I've got that down.",
          incorrect: "Try starting with 'Hello' or 'Good morning' and ordering with 'I would like...'"
        }
      },
      {
        id: 2,
        botMessage: "Of course! Would you like that small, medium, or large?",
        inputMode: "hybrid",
        suggestions: [
          "A small, please.",
          "Medium, please.",
          "I would like a large."
        ],
        hints: "Just say the size with 'please' to be polite.",
        expectedKeywords: ["small", "medium", "large", "please"],
        acceptablePhrases: [
          "small",
          "medium",
          "large"
        ],
        feedback: {
          correct: "Perfect choice!",
          partial: "Good, but add 'please' to be polite!",
          incorrect: "Select a size: small, medium, or large."
        }
      },
      {
        id: 3,
        botMessage: "Would you like anything to eat with that? We have muffins and sandwiches.",
        inputMode: "freeText",
        suggestions: [
          "Yes, a muffin please.",
          "No, thank you.",
          "What kind of muffins do you have?"
        ],
        hints: "You can accept with 'Yes, please' or politely decline with 'No, thank you'",
        expectedKeywords: ["yes", "no", "muffin", "sandwich", "please", "thank", "what", "kind"],
        feedback: {
          correct: "Noted! Anything else?",
          partial: "Almost there! Don't forget to be polite.",
          incorrect: "Try 'Yes, please' or 'No, thank you'."
        }
      },
      {
        id: 4,
        botMessage: "We have chocolate, blueberry, and banana muffins today.",
        inputMode: "hybrid",
        suggestions: [
          "I'll take a chocolate muffin.",
          "A blueberry muffin, please.",
          "No muffin for me, thanks."
        ],
        hints: "Choose a flavor or politely decline again.",
        expectedKeywords: ["chocolate", "blueberry", "banana", "muffin", "please", "no", "thanks"],
        feedback: {
          correct: "Excellent choice!",
          incorrect: "Pick a flavor: chocolate, blueberry, or banana."
        }
      },
      {
        id: 5,
        botMessage: "That will be $5.50. How would you like to pay?",
        inputMode: "suggestions",
        suggestions: [
          "By card, please.",
          "I'll pay with cash.",
          "Card, thank you."
        ],
        hints: "Choose your payment method.",
        expectedKeywords: ["card", "cash", "pay", "please", "thanks"],
        feedback: {
          correct: "All set! Thank you.",
          incorrect: "You can pay by 'card' or 'cash'."
        }
      },
      {
        id: 6,
        botMessage: "Great! Your order will be ready in a moment. It's a nice day today, isn't it?",
        inputMode: "freeText",
        suggestions: [
          "Yes, it's very nice.",
          "Yes, I like sunny days.",
          "It's a bit cold, but nice."
        ],
        hints: "Make a simple comment about the weather.",
        expectedKeywords: ["yes", "nice", "sunny", "cold", "like", "weather"],
        acceptablePhrases: [
          "yes",
          "nice",
          "cold",
          "warm",
          "like"
        ],
        feedback: {
          correct: "Glad to hear that!",
          partial: "Good try! The weather is great for conversation.",
          incorrect: "You can say 'Yes, it's nice' or comment about the weather."
        }
      }
    ],
    completionMessage: "Well done! You successfully ordered at the coffee shop and made small talk about the weather.",
    learningObjectives: [
      "Order food and drinks politely",
      "Use 'please' and 'thank you'",
      "Make choices about size and type",
      "Handle payment options",
      "Engage in weather small talk"
    ],
    grammar: {
      points: [
        "Modal 'would like' for polite requests",
        "Present simple for preferences",
        "Question formation (How would you like...?)",
        "Can/Can I for requests"
      ]
    }
  };

  export default coffeeShop;
