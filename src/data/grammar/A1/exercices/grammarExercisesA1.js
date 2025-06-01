// grammarExercisesA1.js
// Fichier contenant uniquement les exercices pour le niveau A1 du CECR

const grammarExercisesA1 = {
    1: [ // Le verbe 'être' (to be)
      {
        type: "fillInTheBlank",
        question: "She ___ a doctor.",
        answer: "is",
        options: ["am", "is", "are"]
      },
      {
        type: "transformation",
        question: "They are students. (make negative)",
        answer: "They are not students. / They aren't students."
      }
    ],
    2: [ // Le présent simple
      {
        type: "fillInTheBlank",
        question: "He ___ (study) English every day.",
        answer: "studies"
      },
      {
        type: "transformation",
        question: "She likes coffee. (make negative)",
        answer: "She does not like coffee. / She doesn't like coffee."
      }
    ],
    3: [ // Le présent continu
      {
        type: "fillInTheBlank",
        question: "Look! It ___ (rain) outside.",
        answer: "is raining"
      },
      {
        type: "transformation",
        question: "They are watching TV. (make interrogative)",
        answer: "Are they watching TV?"
      }
    ],
    4: [ // Les pronoms personnels
      {
        type: "fillInTheBlank",
        question: "This book is for ___ (John and me).",
        answer: "us"
      },
      {
        type: "transformation",
        question: "Give the book to Mark. → Give the book to ___.",
        answer: "him"
      }
    ],
    5: [ // Les adjectifs possessifs
      {
        type: "fillInTheBlank",
        question: "She has a dog. ___ dog is brown.",
        answer: "Her"
      },
      {
        type: "matching",
        pairs: [
          { item: "I", match: "my" },
          { item: "you", match: "your" },
          { item: "they", match: "their" }
        ]
      }
    ],
    6: [ // Les articles
      {
        type: "fillInTheBlank",
        question: "She is ___ university student.",
        answer: "a"
      },
      {
        type: "fillInTheBlank",
        question: "He has ___ apple and ___ banana.",
        answer: "an, a"
      }
    ],
    7: [ // Les noms au pluriel
      {
        type: "fillInTheBlank",
        question: "One tomato, two _____.",
        answer: "tomatoes"
      },
      {
        type: "transformation",
        question: "She has one child. → She has two _____.",
        answer: "children"
      }
    ],
    8: [ // Les prépositions de base
      {
        type: "fillInTheBlank",
        question: "I live ___ Paris ___ France.",
        answer: "in, in"
      },
      {
        type: "multipleChoice",
        question: "She arrives ___ 8 o'clock ___ the morning.",
        options: ["in, in", "at, in", "on, at", "at, at"],
        answer: "at, in"
      }
    ],
    9: [ // Formation des questions
      {
        type: "transformation",
        question: "She lives in London. (make a question)",
        answer: "Does she live in London?"
      },
      {
        type: "reorder",
        question: "where / does / live / he",
        answer: "Where does he live?"
      }
    ],
    10: [ // There is/There are
      {
        type: "fillInTheBlank",
        question: "_____ a cat and two dogs in the garden.",
        answer: "There are"
      },
      {
        type: "transformation",
        question: "There is a teacher in the classroom. (make negative)",
        answer: "There isn't a teacher in the classroom."
      }
    ],
    11: [ // Le modal 'can'
      {
        type: "fillInTheBlank",
        question: "She ___ play the piano very well.",
        answer: "can"
      },
      {
        type: "transformation",
        question: "I can speak English. (make negative)",
        answer: "I cannot speak English. / I can't speak English."
      }
    ],
    12: [ // Have got
      {
        type: "fillInTheBlank",
        question: "She ___ got a sister.",
        answer: "has"
      },
      {
        type: "transformation",
        question: "I have got a dog. (make interrogative)",
        answer: "Have you got a dog?"
      }
    ],
    13: [ // Les démonstratifs
      {
        type: "fillInTheBlank",
        question: "___ are my shoes here, and ___ are your shoes over there.",
        answer: "These, those"
      },
      {
        type: "multipleChoice",
        question: "___ is a good book.",
        options: ["This", "That", "These", "Those"],
        answer: "This"
      }
    ],
    14: [ // Some et any
      {
        type: "fillInTheBlank",
        question: "I have ___ questions for you.",
        answer: "some"
      },
      {
        type: "fillInTheBlank",
        question: "Are there ___ students in the classroom?",
        answer: "any"
      }
    ],
    15: [ // Quantifieurs de base
      {
        type: "fillInTheBlank",
        question: "She doesn't have ___ free time.",
        answer: "much"
      },
      {
        type: "fillInTheBlank",
        question: "There are ___ students in this school.",
        answer: "many"
      }
    ],
    16: [ // Les adverbes de fréquence
      {
        type: "fillInTheBlank",
        question: "He ___ goes to the gym. (5 days per week)",
        answer: "often",
        options: ["never", "sometimes", "often", "always"]
      },
      {
        type: "reorder",
        question: "always / early / she / arrives",
        answer: "She always arrives early."
      }
    ],
    17: [ // Le génitif possessif ('s)
      {
        type: "transformation",
        question: "The car of John → _______",
        answer: "John's car"
      },
      {
        type: "fillInTheBlank",
        question: "The ___ (children) toys are on the floor.",
        answer: "children's"
      }
    ],
    18: [ // Les conjonctions simples
      {
        type: "fillInTheBlank",
        question: "I like tea ___ coffee.",
        answer: "and"
      },
      {
        type: "multipleChoice",
        question: "I want to go out, ___ it's raining.",
        options: ["and", "but", "or", "so"],
        answer: "but"
      }
    ],
    19: [ // L'impératif
      {
        type: "transformation",
        question: "You close the door. (make an order)",
        answer: "Close the door!"
      },
      {
        type: "fillInTheBlank",
        question: "___ quiet, please! The baby is sleeping.",
        answer: "Be",
        options: ["Be", "Are", "Is", "Am"]
      }
    ],
    20: [ // Les mots interrogatifs
      {
        type: "fillInTheBlank",
        question: "___ is your name?",
        answer: "What",
        options: ["What", "Where", "When", "Who"]
      },
      {
        type: "matching",
        pairs: [
          { item: "Where", match: "place" },
          { item: "When", match: "time" },
          { item: "Who", match: "person" },
          { item: "Why", match: "reason" },
          { item: "How", match: "manner" }
        ]
      }
    ]
  };

  export default grammarExercisesA1;
