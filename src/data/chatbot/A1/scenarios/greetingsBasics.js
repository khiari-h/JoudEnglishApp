// chatbot/A1/scenarios/greetingsBasics.js

const greetingsBasics = {
    id: 1,
    title: "Basic Greetings and Introductions",
    level: "A1",
    description: "Learn how to greet people and introduce yourself in simple everyday situations.",
    estimatedTime: "10-15 minutes",
    vocabulary: ["hello", "my name", "I am", "how are you", "nice to meet you", "where are you from"],
    steps: [
      {
        id: 1,
        botMessage: "Hello! Welcome to our English practice session.",
        inputMode: "suggestions", // start with suggestions for beginners
        suggestions: [
          "Hello!",
          "Hi there!",
          "Good morning."
        ],
        hints: "Start with a simple greeting.",
        expectedKeywords: ["hello", "hi", "good", "morning"],
        feedback: {
          correct: "Great! You've started the conversation well.",
          incorrect: "Try to greet back with 'Hello' or 'Hi'."
        }
      },
      {
        id: 2,
        botMessage: "My name is Alex. What's your name?",
        inputMode: "hybrid",
        suggestions: [
          "My name is [Your name].",
          "I'm [Your name].",
          "I am [Your name]."
        ],
        hints: "Use 'My name is...' or 'I'm...' to introduce yourself.",
        expectedKeywords: ["name", "I'm", "I am"],
        acceptablePhrases: [
          "my name",
          "i am",
          "i'm"
        ],
        feedback: {
          correct: "Nice to meet you!",
          incorrect: "Try saying 'My name is...' or 'I'm...'"
        }
      },
      {
        id: 3,
        botMessage: "Nice to meet you! How are you today?",
        inputMode: "hybrid",
        suggestions: [
          "I'm fine, thank you.",
          "I'm good, thanks.",
          "I'm okay, how about you?"
        ],
        hints: "Respond to 'How are you?' and it's polite to ask back.",
        expectedKeywords: ["fine", "good", "okay", "thank", "thanks", "you"],
        feedback: {
          correct: "I'm fine too, thank you for asking!",
          incorrect: "Try 'I'm fine, thank you' or 'I'm good, thanks'."
        }
      },
      {
        id: 4,
        botMessage: "I'm from the United States. Where are you from?",
        inputMode: "freeText", // encourage free input
        suggestions: [
          "I'm from [country].",
          "I come from [country].",
          "I live in [country]."
        ],
        hints: "Tell where you are from using 'I'm from...' or 'I come from...'",
        expectedKeywords: ["from", "live", "come", "country"],
        acceptablePhrases: [
          "i'm from",
          "i am from",
          "i come from",
          "i live"
        ],
        feedback: {
          correct: "That's wonderful! I'd love to learn about your country.",
          partial: "Close! Try 'I'm from...' or 'I come from...'",
          incorrect: "Don't worry! You can say 'I'm from [country]' or 'I come from [country]'."
        }
      },
      {
        id: 5,
        botMessage: "What do you do? Are you a student?",
        inputMode: "hybrid",
        suggestions: [
          "Yes, I'm a student.",
          "No, I'm a [job].",
          "I work as a [job]."
        ],
        hints: "Tell about your occupation or studies.",
        expectedKeywords: ["student", "work", "job", "teacher", "engineer"],
        feedback: {
          correct: "That's interesting! I hope you enjoy it.",
          incorrect: "Try 'I'm a student' or 'I work as a [job]'."
        }
      },
      {
        id: 6,
        botMessage: "Do you speak any other languages?",
        inputMode: "freeText",
        suggestions: [
          "I speak [language].",
          "Yes, I speak a little [language].",
          "No, only English and my native language."
        ],
        hints: "Tell about languages you know using 'I speak...'",
        expectedKeywords: ["speak", "language", "french", "spanish", "little", "no"],
        acceptablePhrases: [
          "i speak",
          "i know",
          "a little",
          "yes",
          "no"
        ],
        feedback: {
          correct: "That's great! Speaking multiple languages is very useful.",
          partial: "You're doing well! Keep trying!",
          incorrect: "You can say 'I speak [language]' or 'No, just English'."
        }
      },
      {
        id: 7,
        botMessage: "Well, it was nice talking to you. Have a good day!",
        inputMode: "suggestions",
        suggestions: [
          "Nice talking to you too! Have a great day!",
          "Thank you. Goodbye!",
          "Thanks! Bye!"
        ],
        hints: "End the conversation politely with a goodbye.",
        expectedKeywords: ["nice", "thank", "bye", "goodbye", "day"],
        feedback: {
          correct: "Excellent! You've completed the basic greetings conversation.",
          incorrect: "Try saying 'Nice talking to you too!' or 'Goodbye!'"
        }
      }
    ],
    completionMessage: "Well done! You've successfully completed the basic greetings scenario. You can now introduce yourself and hold a simple conversation in English.",
    learningObjectives: [
      "Master basic greetings",
      "Introduce yourself confidently",
      "Ask and answer simple questions",
      "End a conversation politely"
    ],
    grammar: {
      points: [
        "Present simple 'be' (I am, you are)",
        "Personal pronouns (I, you, my, your)",
        "Question formation (How are you? What's your name?)",
        "Simple present (I speak, I work)"
      ]
    }
  };
  
  export default greetingsBasics;