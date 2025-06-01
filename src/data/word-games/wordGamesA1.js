// src/data/exercises/wordGames/wordGamesA1.js

export default {
  level: "A1",
  description: "Basic vocabulary games for beginners - learning through play",
  games: [
    // Matching games
    {
      type: "matching",
      title: "Match Objects with Colors",
      instructions: "Match each object with its typical color.",
      pairs: [
        { word: "Banana", match: "Yellow" },
        { word: "Sky", match: "Blue" },
        { word: "Grass", match: "Green" },
        { word: "Tomato", match: "Red" },
      ],
      hint: "Think about the natural colors of these objects",
      maxScore: 10,
    },
    {
      type: "matching",
      title: "Match Words with Meanings",
      instructions: "Match each English word with its meaning.",
      pairs: [
        { word: "House", match: "Home" },
        { word: "Car", match: "Vehicle" },
        { word: "Dog", match: "Pet" },
        { word: "Book", match: "Reading" },
      ],
      maxScore: 10,
    },
    {
      type: "matching",
      title: "Match Numbers",
      instructions: "Match each number with its written form.",
      pairs: [
        { word: "1", match: "One" },
        { word: "2", match: "Two" },
        { word: "3", match: "Three" },
        { word: "4", match: "Four" },
        { word: "5", match: "Five" },
      ],
      maxScore: 10,
    },

    // Categorization games
    {
      type: "categorization",
      title: "Food Categories",
      instructions: "Select all words that belong to the given category.",
      categories: {
        Fruits: ["apple", "banana", "orange", "grape"],
        Animals: ["dog", "cat", "bird", "fish"],
        Colors: ["red", "blue", "green", "yellow"],
      },
      currentCategory: "Fruits",
      words: [
        "apple",
        "banana", 
        "dog",
        "red",
        "orange",
        "house",
        "grape",
        "car",
      ],
      maxScore: 10,
    },
    {
      type: "categorization", 
      title: "Animals Category",
      instructions: "Select all words that belong to the given category.",
      categories: {
        Fruits: ["apple", "banana", "orange", "grape"],
        Animals: ["dog", "cat", "bird", "fish"],
        Colors: ["red", "blue", "green", "yellow"],
      },
      currentCategory: "Animals",
      words: [
        "dog",
        "apple", 
        "cat",
        "red",
        "bird",
        "house",
        "fish",
        "banana",
      ],
      maxScore: 10,
    },
    {
      type: "categorization",
      title: "Colors Category", 
      instructions: "Select all words that belong to the given category.",
      categories: {
        Fruits: ["apple", "banana", "orange", "grape"],
        Animals: ["dog", "cat", "bird", "fish"],
        Colors: ["red", "blue", "green", "yellow"],
      },
      currentCategory: "Colors",
      words: [
        "red",
        "dog",
        "blue", 
        "apple",
        "green",
        "car",
        "yellow",
        "house",
      ],
      maxScore: 10,
    },
  ],
};
