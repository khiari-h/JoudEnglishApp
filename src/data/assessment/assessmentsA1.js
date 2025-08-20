// src/data/assessments/AssessmentA1.js

export default {
  level: "A1",
  description: "Évaluez vos compétences de base en anglais niveau A1",
  totalQuestions: 40, // ← MIS À JOUR (8 sections × 5 questions)
  timeLimit: 45, // minutes
  passScore: 70, // pourcentage

  vocabulary: {
    title: "Vocabulaire",
    description: "Testez votre connaissance des mots de base",
    icon: "📚",
    questions: [
      {
        text: "Which word means 'a place where you live'?",
        options: ["Car", "House", "Book", "Phone"],
        correctAnswer: 1,
        explanation: "A 'house' is a building where people live.",
      },
      {
        text: "What is this? 🍎",
        options: ["Orange", "Banana", "Apple", "Strawberry"],
        correctAnswer: 2,
        explanation: "This is an apple, a common fruit that is often red or green.",
      },
      {
        text: "Which word describes the color of the sky on a clear day?",
        options: ["Red", "Green", "Yellow", "Blue"],
        correctAnswer: 3,
        explanation: "The sky appears blue on a clear day.",
      },
      {
        text: "Which is a family member?",
        options: ["Teacher", "Mother", "Doctor", "Friend"],
        correctAnswer: 1,
        explanation: "A 'mother' is a female parent in a family.",
      },
      {
        text: "What do you use to write?",
        options: ["Pen", "Cup", "Chair", "Shoe"],
        correctAnswer: 0,
        explanation: "A 'pen' is a tool used for writing.",
      },
    ],
  },

  grammar: {
    title: "Grammaire",
    description: "Testez votre compréhension des structures grammaticales de base",
    icon: "📝",
    questions: [
      {
        text: "_____ name is John.",
        options: ["I", "My", "Me", "Mine"],
        correctAnswer: 1,
        explanation: "We use 'My' as a possessive adjective before a noun.",
      },
      {
        text: "There _____ a book on the table.",
        options: ["are", "am", "is", "be"],
        correctAnswer: 2,
        explanation: "We use 'is' with singular nouns like 'a book'.",
      },
      {
        text: "I _____ coffee every morning.",
        options: ["drinking", "drink", "drinks", "drank"],
        correctAnswer: 1,
        explanation: "For habits in the present simple, we use the base form of the verb with 'I'.",
      },
      {
        text: "She _____ like spicy food.",
        options: ["don't", "not", "doesn't", "isn't"],
        correctAnswer: 2,
        explanation: "For negation in the present simple with he/she/it, we use 'doesn't'.",
      },
      {
        text: "_____ they have a car?",
        options: ["Do", "Does", "Are", "Have"],
        correctAnswer: 0,
        explanation: "For questions in the present simple with they/we/you, we use 'Do'.",
      },
    ],
  },

  phrases_expressions: {
    title: "Expressions & Politesse",
    description: "Testez votre connaissance des expressions courantes",
    icon: "🗣️",
    questions: [
      {
        text: "What do you say when you meet someone for the first time?",
        options: ["Goodbye", "Hello, nice to meet you", "See you later", "I'm sorry"],
        correctAnswer: 1,
        explanation: "When meeting someone for the first time, you typically say 'Hello, nice to meet you'.",
      },
      {
        text: "How do you ask for someone's name?",
        options: ["How are you?", "Where are you from?", "What's your name?", "How old are you?"],
        correctAnswer: 2,
        explanation: "To ask for someone's name, you say 'What's your name?'",
      },
      {
        text: "What do you say to thank someone?",
        options: ["Sorry", "Please", "Excuse me", "Thank you"],
        correctAnswer: 3,
        explanation: "To express gratitude, you say 'Thank you'.",
      },
      {
        text: "How do you ask for the price of something?",
        options: ["How much is it?", "Where is it?", "What time is it?", "Who is it?"],
        correctAnswer: 0,
        explanation: "To ask about price, you say 'How much is it?'",
      },
      {
        text: "What do you say when leaving?",
        options: ["Good morning", "Welcome", "Goodbye", "Excuse me"],
        correctAnswer: 2,
        explanation: "When leaving, you typically say 'Goodbye'.",
      },
    ],
  },

  numbers_time: {
    title: "Nombres & Heure",
    description: "Testez votre connaissance des nombres et de l'heure",
    icon: "🕐",
    questions: [
      {
        text: "What number comes after fifteen?",
        options: ["Fourteen", "Sixteen", "Thirteen", "Seventeen"],
        correctAnswer: 1,
        explanation: "After fifteen (15) comes sixteen (16).",
      },
      {
        text: "How do you say '3:30' in English?",
        options: ["Three thirty", "Half past three", "Three and half", "Both A and B"],
        correctAnswer: 3,
        explanation: "You can say '3:30' as both 'three thirty' and 'half past three'.",
      },
      {
        text: "What is 'vingt' in English?",
        options: ["Twelve", "Twenty", "Thirty", "Fifty"],
        correctAnswer: 1,
        explanation: "'Vingt' means 'twenty' in English.",
      },
      {
        text: "How do you ask about someone's age?",
        options: ["How old are you?", "What age you have?", "How many years?", "What is your old?"],
        correctAnswer: 0,
        explanation: "To ask about age, you say 'How old are you?'",
      },
      {
        text: "What time expression means 'morning'?",
        options: ["p.m.", "a.m.", "o'clock", "past"],
        correctAnswer: 1,
        explanation: "'a.m.' (ante meridiem) refers to morning hours before noon.",
      },
    ],
  },

  can_cant: {
    title: "Can / Can't",
    description: "Testez votre connaissance du modal 'can'",
    icon: "💪",
    questions: [
      {
        text: "I _____ swim very well.",
        options: ["can", "can't", "could", "should"],
        correctAnswer: 0,
        explanation: "Use 'can' to express ability. 'I can swim' means I have the ability to swim.",
      },
      {
        text: "She _____ speak Chinese.",
        options: ["can", "can't", "cans", "cannot to"],
        correctAnswer: 0,
        explanation: "'Can' is used to express ability. 'She can speak Chinese' means she has this ability.",
      },
      {
        text: "_____ you drive a car?",
        options: ["Can", "Do", "Are", "Have"],
        correctAnswer: 0,
        explanation: "To ask about ability, we use 'Can you...?'",
      },
      {
        text: "I _____ play the piano. I never learned.",
        options: ["can", "can't", "could", "couldn't"],
        correctAnswer: 1,
        explanation: "'Can't' (cannot) expresses inability. 'I can't play' means I don't have this ability.",
      },
      {
        text: "Dogs _____ fly.",
        options: ["can", "can't", "could", "should"],
        correctAnswer: 1,
        explanation: "Dogs cannot fly naturally, so we use 'can't' to express this impossibility.",
      },
    ],
  },

  prepositions: {
    title: "Prépositions Simples",
    description: "Testez votre connaissance des prépositions de base",
    icon: "📍",
    questions: [
      {
        text: "I live _____ Paris.",
        options: ["at", "in", "on", "by"],
        correctAnswer: 1,
        explanation: "We use 'in' with cities and countries. 'I live in Paris'.",
      },
      {
        text: "The book is _____ the table.",
        options: ["in", "at", "on", "by"],
        correctAnswer: 2,
        explanation: "We use 'on' when something is on the surface of something else.",
      },
      {
        text: "I wake up _____ 7 o'clock.",
        options: ["in", "on", "at", "by"],
        correctAnswer: 2,
        explanation: "We use 'at' with specific times. 'At 7 o'clock', 'at midnight'.",
      },
      {
        text: "My birthday is _____ May.",
        options: ["at", "in", "on", "by"],
        correctAnswer: 1,
        explanation: "We use 'in' with months, years, and seasons. 'In May', 'in 2024'.",
      },
      {
        text: "The meeting is _____ Monday.",
        options: ["at", "in", "on", "by"],
        correctAnswer: 2,
        explanation: "We use 'on' with days of the week and specific dates. 'On Monday'.",
      },
    ],
  },

  demonstratives: {
    title: "Démonstratifs",
    description: "Testez votre connaissance de this, that, these, those",
    icon: "👉",
    questions: [
      {
        text: "_____ is my book. (the book is near you)",
        options: ["This", "That", "These", "Those"],
        correctAnswer: 0,
        explanation: "'This' is used for singular objects that are close to the speaker.",
      },
      {
        text: "_____ are my friends. (the friends are near you)",
        options: ["This", "That", "These", "Those"],
        correctAnswer: 2,
        explanation: "'These' is used for plural objects that are close to the speaker.",
      },
      {
        text: "_____ car over there is expensive. (pointing to a distant car)",
        options: ["This", "That", "These", "Those"],
        correctAnswer: 1,
        explanation: "'That' is used for singular objects that are far from the speaker.",
      },
      {
        text: "_____ people in the photo are my family. (pointing to a photo)",
        options: ["This", "That", "These", "Those"],
        correctAnswer: 3,
        explanation: "'Those' is used for plural objects that are far from the speaker or in a photo/picture.",
      },
      {
        text: "What is _____ ? (pointing to something in your hand)",
        options: ["this", "that", "these", "those"],
        correctAnswer: 0,
        explanation: "'This' is used when referring to something close to you, like in your hand.",
      },
    ],
  },

  reading_comprehension: {
    title: "Compréhension Écrite",
    description: "Lisez le texte et répondez aux questions",
    icon: "📖",
    questions: [
      {
        text: "Read: 'My name is Sarah. I am 22 years old. I live in London with my cat, Luna. I work in a hospital.' Where does Sarah work?",
        options: ["In a school", "In a hospital", "In a shop", "In a restaurant"],
        correctAnswer: 1,
        explanation: "According to the text, Sarah works in a hospital.",
      },
      {
        text: "Read: 'I wake up at 6:30. I have breakfast at 7:00. I leave home at 8:00. I start work at 9:00.' When does this person leave home?",
        options: ["6:30", "7:00", "8:00", "9:00"],
        correctAnswer: 2,
        explanation: "The text states 'I leave home at 8:00'.",
      },
      {
        text: "Read: 'The library is open Monday to Friday, 9 AM to 6 PM. On Saturday, it opens from 10 AM to 4 PM. It is closed on Sunday.' When is the library closed?",
        options: ["Monday", "Saturday morning", "Sunday", "Friday evening"],
        correctAnswer: 2,
        explanation: "The text clearly states 'It is closed on Sunday'.",
      },
      {
        text: "Read: 'Tom has two sisters and one brother. His sisters are 16 and 14. His brother is 12.' How many children are in Tom's family?",
        options: ["Three", "Four", "Five", "Six"],
        correctAnswer: 1,
        explanation: "Tom + two sisters + one brother = four children total.",
      },
      {
        text: "Read: 'Today is sunny and warm. The temperature is 25°C. It's a perfect day for a picnic in the park.' What's the weather like today?",
        options: ["Cold and rainy", "Sunny and warm", "Cloudy and cool", "Windy and cold"],
        correctAnswer: 1,
        explanation: "The text describes the weather as 'sunny and warm'.",
      },
    ],
  },

};