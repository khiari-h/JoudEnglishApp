// src/data/exercises/reading/readingA2Index.js

import readingTextsA2 from './categories/readingTextsA2.js';
import readingQuestionsA2 from './categories/readingQuestionsA2.js';

// Fonction pour combiner textes et questions
const combineTextWithQuestions = (textId) => {
  const text = readingTextsA2.find(t => t.id === textId);
  const questions = readingQuestionsA2.find(q => q.textId === textId);

  if (!text || !questions) {

    return null;
  }

  return {
    ...text,
    questions: questions.questions
  };
};

// Fonction pour obtenir tous les exercices combinés
const getAllA2Exercises = () => {
  return readingTextsA2.map(text => combineTextWithQuestions(text.id)).filter(Boolean);
};

// Fonction pour obtenir un exercice par ID
const getA2ExerciseById = (textId) => {
  return combineTextWithQuestions(textId);
};

// Fonction pour obtenir des exercices par difficulté
const getA2ExercisesByDifficulty = (difficulty) => {
  const filteredTexts = readingTextsA2.filter(text => text.difficulty === difficulty);
  return filteredTexts.map(text => combineTextWithQuestions(text.id)).filter(Boolean);
};

// Fonction pour obtenir des exercices par sujet
const getA2ExercisesByTopic = (topic) => {
  const filteredTexts = readingTextsA2.filter(text => 
    text.topics?.includes(topic)
  );
  return filteredTexts.map(text => combineTextWithQuestions(text.id)).filter(Boolean);
};

// Métadonnées du niveau A2
const a2Metadata = {
  level: "A2",
  totalTexts: readingTextsA2.length,
  totalQuestions: readingQuestionsA2.reduce((sum, q) => sum + q.questions.length, 0),
  averageWordCount: Math.round(readingTextsA2.reduce((sum, text) => sum + text.wordCount, 0) / readingTextsA2.length),
  
  // ✅ BEST PRACTICE : Tri numérique pour les difficultés (niveaux ordonnés)
  difficulties: [...new Set(readingTextsA2.map(text => text.difficulty))]
    .filter(difficulty => typeof difficulty === 'number')
    .sort((a, b) => a - b),
  
  // ✅ BEST PRACTICE : Tri alphabétique pour les topics (strings)
  topics: [...new Set(readingTextsA2.flatMap(text => text.topics))]
    .filter(topic => typeof topic === 'string' && topic.trim())
    .sort((a, b) => a.localeCompare(b)),
    
  description: "Elementary level reading comprehension exercises focusing on common situations, past experiences, and simple descriptions."
};

// Export par défaut avec structure complète
const readingA2Data = {
  metadata: a2Metadata,
  exercises: getAllA2Exercises(),

  // Fonctions utilitaires
  getAll: getAllA2Exercises,
  getById: getA2ExerciseById,
  getByDifficulty: getA2ExercisesByDifficulty,
  getByTopic: getA2ExercisesByTopic,

  // Accès séparé aux données brutes
  texts: readingTextsA2,
  questions: readingQuestionsA2
};

export default readingA2Data;

// Exports nommés pour plus de flexibilité
export {
  readingTextsA2,
  readingQuestionsA2,
  getAllA2Exercises,
  getA2ExerciseById,
  getA2ExercisesByDifficulty,
  getA2ExercisesByTopic,
  a2Metadata
};
