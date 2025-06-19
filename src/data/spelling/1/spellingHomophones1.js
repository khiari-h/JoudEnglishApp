// data/exercises/spelling/spellingHomophonesA1.js
export default {
  title: "A1 Homophones",
  description: "Practice distinguishing words that sound the same but have different meanings and spellings",
  exercises: [
    // ===== TO/TOO/TWO (1-4) - Most problematic group =====
    {
      type: "homophones",
      instruction: "Choose the correct word to complete the sentence",
      sentence: "I want _____ go home.",
      choices: ["to", "too", "two"],
      correctAnswer: "to",
      hasHint: true,
      hint: "'To' is used before a verb (infinitive form).",
      explanation: "'To' is used before verbs in the infinitive form: 'I want to go', 'I like to read'. It shows direction or purpose."
    },
    {
      type: "homophones", 
      instruction: "Choose the correct word to complete the sentence",
      sentence: "This pizza is _____ hot!",
      choices: ["to", "too", "two"],
      correctAnswer: "too",
      hasHint: true,
      hint: "'Too' means 'very much' or 'more than enough'.",
      explanation: "'Too' means 'very much', 'more than enough', or 'also': 'too hot', 'too difficult', 'me too'."
    },
    {
      type: "homophones",
      instruction: "Choose the correct word to complete the sentence", 
      sentence: "I have _____ dogs at home.",
      choices: ["to", "too", "two"],
      correctAnswer: "two",
      hasHint: true,
      hint: "'Two' is the number 2.",
      explanation: "'Two' is the number 2. It's used for counting: 'two cats', 'two books', 'two years old'."
    },
    {
      type: "homophones",
      instruction: "Choose the correct word to complete the sentence",
      sentence: "She goes _____ school every day.",
      choices: ["to", "too", "two"],
      correctAnswer: "to",
      hasHint: true,
      hint: "'To' shows direction - where someone is going.",
      explanation: "'To' shows direction or destination: 'go to school', 'come to me', 'walk to the park'."
    },

    // ===== YOUR/YOU'RE (5-7) - Very frequent errors =====
    {
      type: "homophones",
      instruction: "Choose the correct word to complete the sentence",
      sentence: "_____ welcome!",
      choices: ["Your", "You're"],
      correctAnswer: "You're",
      hasHint: true,
      hint: "'You're' is short for 'you are'.",
      explanation: "'You're' is a contraction of 'you are': 'You're welcome' = 'You are welcome'. 'Your' shows possession."
    },
    {
      type: "homophones",
      instruction: "Choose the correct word to complete the sentence",
      sentence: "Is this _____ book?",
      choices: ["your", "you're"],
      correctAnswer: "your", 
      hasHint: true,
      hint: "'Your' shows that something belongs to you.",
      explanation: "'Your' shows possession - something that belongs to you: 'your book', 'your house', 'your name'."
    },
    {
      type: "homophones",
      instruction: "Choose the correct word to complete the sentence",
      sentence: "I think _____ very smart.",
      choices: ["your", "you're"],
      correctAnswer: "you're",
      hasHint: true,
      hint: "Try replacing the blank with 'you are' - does it make sense?",
      explanation: "'You're' = 'you are'. The sentence becomes 'I think you are very smart', which is correct."
    },

    // ===== THERE/THEIR (8-10) - Daily usage =====
    {
      type: "homophones",
      instruction: "Choose the correct word to complete the sentence",
      sentence: "Put the book over _____.",
      choices: ["there", "their"],
      correctAnswer: "there",
      hasHint: true,
      hint: "'There' shows a place or location.",
      explanation: "'There' indicates a place or location: 'over there', 'go there', 'there is'. It's like pointing to a place."
    },
    {
      type: "homophones",
      instruction: "Choose the correct word to complete the sentence", 
      sentence: "_____ house is very big.",
      choices: ["There", "Their"],
      correctAnswer: "Their",
      hasHint: true,
      hint: "'Their' shows that something belongs to them (more than one person).",
      explanation: "'Their' shows possession by more than one person: 'their house', 'their car', 'their children'."
    },
    {
      type: "homophones",
      instruction: "Choose the correct word to complete the sentence",
      sentence: "_____ are many cats in the garden.",
      choices: ["There", "Their"],
      correctAnswer: "There",
      hasHint: true,
      hint: "'There are' is used to say that something exists.",
      explanation: "'There are' means that something exists or is present: 'There are cats', 'There are books', 'There are people'."
    },

    // ===== ITS/IT'S (11-12) - Common contractions =====
    {
      type: "homophones",
      instruction: "Choose the correct word to complete the sentence",
      sentence: "_____ raining outside.",
      choices: ["Its", "It's"],
      correctAnswer: "It's",
      hasHint: true,
      hint: "'It's' is short for 'it is'.",
      explanation: "'It's' is a contraction of 'it is' or 'it has': 'It's raining' = 'It is raining'. 'Its' shows possession."
    },
    {
      type: "homophones",
      instruction: "Choose the correct word to complete the sentence",
      sentence: "The dog wagged _____ tail.",
      choices: ["its", "it's"],
      correctAnswer: "its",
      hasHint: true,
      hint: "'Its' shows that something belongs to 'it' (no apostrophe for possession here).",
      explanation: "'Its' shows possession without an apostrophe: 'its tail', 'its color', 'its name'. It's like 'his' or 'her' but for things."
    },

    // ===== HERE/HEAR (13-14) - Identical sounds =====
    {
      type: "homophones",
      instruction: "Choose the correct word to complete the sentence",
      sentence: "Come _____ right now!",
      choices: ["here", "hear"],
      correctAnswer: "here",
      hasHint: true,
      hint: "'Here' means 'in this place'.",
      explanation: "'Here' means 'in this place' or 'to this place': 'come here', 'I am here', 'put it here'."
    },
    {
      type: "homophones",
      instruction: "Choose the correct word to complete the sentence",
      sentence: "I can _____ the music.",
      choices: ["here", "hear"],
      correctAnswer: "hear",
      hasHint: true,
      hint: "'Hear' is what you do with your ears.",
      explanation: "'Hear' means to perceive sound with your ears: 'I hear music', 'Can you hear me?', 'I heard a noise'."
    },

    // ===== NO/KNOW (15) - Basic but important =====
    {
      type: "homophones",
      instruction: "Choose the correct word to complete the sentence",
      sentence: "I _____ your name.",
      choices: ["no", "know"],
      correctAnswer: "know",
      hasHint: true,
      hint: "'Know' means to have information about something.",
      explanation: "'Know' means to have knowledge or information: 'I know you', 'Do you know English?'. 'No' is the opposite of 'yes'."
    }
  ]
};
