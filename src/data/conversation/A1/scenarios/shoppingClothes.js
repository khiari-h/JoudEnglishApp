// chatbot/A1/scenarios/shoppingClothes.js

const shoppingClothes = {
    id: 4,
    title: "Shopping for Clothes",
    level: "A1",
    description: "Practice shopping for clothes, asking about sizes, colors, and prices.",
    estimatedTime: "15-20 minutes",
    vocabulary: ["size", "color", "blue", "red", "shirt", "shoes", "try on", "cheap", "expensive", "how much"],
    steps: [
      {
        id: 1,
        botMessage: "Hello! Welcome to Fashion Shop. Can I help you find something today?",
        inputMode: "suggestions",
        suggestions: [
          "I'm looking for a T-shirt.",
          "Do you have jeans in my size?",
          "I need new shoes."
        ],
        hints: "Tell what you're looking for using 'I'm looking for...' or 'I need...'",
        expectedKeywords: ["looking", "need", "want", "shirt", "jeans", "shoes", "dress"],
        feedback: {
          correct: "Great! I can help you with that.",
          incorrect: "Try saying 'I'm looking for...' or 'I need...'"
        }
      },
      {
        id: 2,
        botMessage: "We have many T-shirts. What size do you need?",
        inputMode: "hybrid",
        suggestions: [
          "I wear size medium.",
          "I think I'm a large.",
          "Size small, please."
        ],
        hints: "Tell your size using 'I wear size...' or 'I'm a...'",
        expectedKeywords: ["size", "small", "medium", "large", "wear", "think"],
        acceptablePhrases: [
          "size",
          "small",
          "medium",
          "large"
        ],
        feedback: {
          correct: "Let me show you our T-shirts in that size.",
          partial: "Good, but which size exactly?",
          incorrect: "Tell me your size: small, medium, or large."
        }
      },
      {
        id: 3,
        botMessage: "Here are our medium T-shirts. We have blue, red, white, and black. What color do you prefer?",
        inputMode: "freeText",
        suggestions: [
          "I like the blue one.",
          "Can I see the red one?",
          "Do you have green?"
        ],
        hints: "Say which color you like using 'I like...' or 'Can I see...'",
        expectedKeywords: ["blue", "red", "white", "black", "like", "prefer", "see", "color"],
        feedback: {
          correct: "Here you go!",
          partial: "Almost! Which color would you like?",
          incorrect: "Choose a color: blue, red, white, or black."
        }
      },
      {
        id: 4,
        botMessage: "Here's the blue T-shirt. You can try it on in the fitting room over there.",
        inputMode: "suggestions",
        suggestions: [
          "Thank you. I'll try it on.",
          "How much does it cost?",
          "Do you have a mirror?"
        ],
        hints: "Try the shirt on or ask about the price.",
        expectedKeywords: ["try", "cost", "price", "much", "mirror", "thanks"],
        feedback: {
          correct: "Of course!",
          incorrect: "You can try it on or ask 'How much does it cost?'"
        }
      },
      {
        id: 5,
        botMessage: "This T-shirt costs $15. It's good quality and comfortable.",
        inputMode: "hybrid",
        suggestions: [
          "That's a good price.",
          "It's expensive for me.",
          "Do you have something cheaper?"
        ],
        hints: "Comment on the price or ask for alternatives.",
        expectedKeywords: ["good", "expensive", "cheap", "something", "other", "price"],
        feedback: {
          correct: "We have some on sale too.",
          partial: "Let me check other options for you.",
          incorrect: "Is the price good or expensive for you?"
        }
      },
      {
        id: 6,
        botMessage: "I'll take it. Do you accept credit cards?",
        inputMode: "freeText",
        suggestions: [
          "Yes, we accept all credit cards.",
          "Cash only, sorry.",
          "Credit card is fine."
        ],
        hints: "Tell about payment methods you accept.",
        expectedKeywords: ["yes", "accept", "card", "credit", "cash", "payment"],
        acceptablePhrases: [
          "yes",
          "accept",
          "card",
          "cash"
        ],
        feedback: {
          correct: "Perfect! I'll ring that up for you.",
          partial: "Good! Any specific payment methods?",
          incorrect: "Say 'Yes, we accept cards' or 'Cash only'."
        }
      },
      {
        id: 7,
        botMessage: "Would you like a bag for your T-shirt?",
        inputMode: "hybrid",
        suggestions: [
          "Yes, please.",
          "No, thank you.",
          "A small bag, please."
        ],
        hints: "Accept or decline the bag offer politely.",
        expectedKeywords: ["yes", "no", "please", "thank", "bag"],
        feedback: {
          correct: "Here you go!",
          incorrect: "Say 'Yes, please' or 'No, thank you'."
        }
      },
      {
        id: 8,
        botMessage: "Thank you for shopping with us! Have a nice day!",
        inputMode: "suggestions",
        suggestions: [
          "Thank you. Goodbye!",
          "Thanks for your help!",
          "Have a nice day too!"
        ],
        hints: "End the conversation politely.",
        expectedKeywords: ["thank", "goodbye", "bye", "day", "help"],
        feedback: {
          correct: "Come back soon!",
          incorrect: "Say 'Thank you' and 'Goodbye'."
        }
      }
    ],
    completionMessage: "Well done! You successfully shopped for clothes and completed a purchase.",
    learningObjectives: [
      "Ask about sizes and colors",
      "Talk about prices",
      "Try on clothes",
      "Make a purchase",
      "Use polite shopping phrases"
    ],
    grammar: {
      points: [
        "Present simple for shopping",
        "How much questions",
        "Can I/Do you have...?",
        "Adjectives for description"
      ]
    }
  };

  export default shoppingClothes;
