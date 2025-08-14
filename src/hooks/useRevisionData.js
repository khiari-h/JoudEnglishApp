// src/hooks/useRevisionData.js - REFACTORISÉ pour réduire la complexité cognitive
import { useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getVocabularyData } from '../utils/vocabulary/vocabularyDataHelper';
import { shuffleArray, shuffleAndTake, shuffleWithFallback } from '../utils/arrayUtils';

// Fonction utilitaire pour traiter les différents formats de wordRef
const processWordRef = (wordRef, category) => {
  let wordIndex;
  let timestamp = Date.now();
  
  // Support nouveau format (objet avec wordIndex + timestamp)
  if (typeof wordRef === 'object' && wordRef.wordIndex !== undefined) {
    wordIndex = wordRef.wordIndex;
    timestamp = wordRef.timestamp || timestamp;
  } 
  // Support ancien format (juste l'index)
  else if (typeof wordRef === 'number') {
    wordIndex = wordRef;
  }
  // Support très ancien format (string du mot)
  else if (typeof wordRef === 'string') {
    const foundIndex = category.words.findIndex(w => w.word === wordRef);
    if (foundIndex !== -1) wordIndex = foundIndex;
  }
  
  return { wordIndex, timestamp };
};

// Fonction pour traiter les mots d'une catégorie
const processCategoryWords = (wordRefs, categoryIndex, originalData, levelKey, mode, learnedWords) => {
  if (!Array.isArray(wordRefs) || wordRefs.length === 0) return;
  
  const catIndex = parseInt(categoryIndex);
  const category = originalData.exercises[catIndex];
  
  if (!category?.words) return;
  
  // Récupérer chaque mot appris
  wordRefs.forEach((wordRef) => {
    const { wordIndex, timestamp } = processWordRef(wordRef, category);
    
    // Récupérer le vrai mot depuis les données originales
    if (wordIndex !== undefined && category.words[wordIndex]) {
      const realWord = category.words[wordIndex];
      const learnedWord = createLearnedWord(realWord, levelKey, mode, catIndex, wordIndex, timestamp);
      learnedWords.push(learnedWord);
    }
  });
};

// Fonction pour créer un mot appris avec métadonnées
const createLearnedWord = (realWord, levelKey, mode, catIndex, wordIndex, timestamp) => ({
  // Données du mot
  word: realWord.word,
  translation: realWord.translation,
  definition: realWord.definition || '',
  example: realWord.example || '',
  
  // Métadonnées
  fromLevel: levelKey,
  fromMode: mode,
  categoryIndex: catIndex,
  wordIndex,
  timestamp,
  
  // ID unique pour éviter doublons
  uniqueId: `${levelKey}_${mode}_${catIndex}_${wordIndex}`
});

// Fonction pour charger les données d'un niveau spécifique
const loadLevelData = async (levelKey, mode, learnedWords) => {
  const storageKey = `vocabulary_${levelKey}_${mode}`;
  
  try {
    const stored = await AsyncStorage.getItem(storageKey);
    if (!stored) return;

    const data = JSON.parse(stored);
    const completedWordsRefs = data.completedWords || {};
    
    if (Object.keys(completedWordsRefs).length === 0) return;
    
    // Récupérer les données originales du vocabulaire
    const originalData = getVocabularyData(levelKey, mode);
    if (!originalData?.exercises) return;
    
    // Traiter chaque catégorie
    Object.entries(completedWordsRefs).forEach(([categoryIndex, wordRefs]) => {
      processCategoryWords(wordRefs, categoryIndex, originalData, levelKey, mode, learnedWords);
    });
  } catch (storageError) {
    console.error(`❌ Erreur traitement ${storageKey}:`, storageError);
  }
};

// Fonction pour générer les choix de réponses d'une question
const generateQuestionChoices = (word, allLearnedWords) => {
  // Pool des autres mots pour les mauvaises réponses
  const otherWords = allLearnedWords.filter(w => w.uniqueId !== word.uniqueId);
  
  // Prendre 3 mauvaises réponses
  let wrongAnswers = shuffleAndTake(otherWords, 3).map(w => w.translation);
  
  // Si pas assez de mauvaises réponses, compléter avec dataset de fallback
  if (wrongAnswers.length < 3) {
    const fallbackData = getVocabularyData('1', 'classic');
    if (fallbackData?.exercises?.[0]?.words) {
      const needed = 3 - wrongAnswers.length;
      const randomFallback = shuffleAndTake(
        fallbackData.exercises[0].words.filter(w => 
          !wrongAnswers.includes(w.translation) && w.translation !== word.translation
        ), 
        needed
      ).map(w => w.translation);
      
      wrongAnswers = [...wrongAnswers, ...randomFallback];
    }
  }
  
  // Mélanger toutes les réponses
  const choices = shuffleArray([word.translation, ...wrongAnswers.slice(0, 3)]);
  
  return choices;
};

// Fonction pour calculer les statistiques
const calculateStats = (allLearnedWords, revisionQuestions) => {
  const totalLearned = allLearnedWords.length;
  const byLevel = {};
  const byMode = {};
  
  allLearnedWords.forEach(word => {
    byLevel[word.fromLevel] = (byLevel[word.fromLevel] || 0) + 1;
    byMode[word.fromMode] = (byMode[word.fromMode] || 0) + 1;
  });
  
  return {
    totalLearned,
    byLevel,
    byMode,
    questionsGenerated: revisionQuestions.length
  };
};

const useRevisionData = (level = "mixed", questionsCount = 10) => {
  const [allLearnedWords, setAllLearnedWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour supprimer les doublons
  const removeDuplicates = (words) => {
    return words.filter((word, index, self) => 
      index === self.findIndex(w => w.uniqueId === word.uniqueId)
    );
  };

  // Fonction pour générer les questions de révision
  const generateRevisionQuestions = (words, count) => {
    if (words.length === 0) return [];

    // Mélanger et sélectionner
    const shuffledWords = shuffleArray(words);
    const selectedWords = shuffledWords.slice(0, Math.min(count, words.length));
    
    // Générer les questions avec choix
    return selectedWords.map((word) => {
      const choices = generateQuestionChoices(word, words);
      
      return {
        ...word,
        choices,
        correctAnswer: word.translation
      };
    });
  };

  // Fonction pour charger tous les mots appris
  const loadLearnedWords = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const learnedWords = [];
      
      const levels = level === "mixed" ? ['1', '2', '3', '4', '5', '6', 'bonus'] : [level];
      const modes = ['classic', 'fast'];

      // Charger les données de chaque niveau et mode
      for (const levelKey of levels) {
        for (const mode of modes) {
          await loadLevelData(levelKey, mode, learnedWords);
        }
      }
      
      // Supprimer les doublons potentiels basés sur uniqueId
      const uniqueWords = removeDuplicates(learnedWords);
      
      setAllLearnedWords(uniqueWords);
      
    } catch (mainError) {
      console.error('❌ Erreur générale useRevisionData:', mainError);
      setError(mainError.message);
      setAllLearnedWords([]);
    } finally {
      setIsLoading(false);
    }
  };

  // ========== RÉCUPÉRATION DES MOTS APPRIS ==========
  useEffect(() => {
    loadLearnedWords();
  }, [level]); // Recharger si le niveau change

  // ========== GÉNÉRATION DES QUESTIONS ==========
  const revisionQuestions = useMemo(() => {
    return generateRevisionQuestions(allLearnedWords, questionsCount);
  }, [allLearnedWords, questionsCount]);

  // ========== STATISTIQUES ==========
  const stats = useMemo(() => {
    return calculateStats(allLearnedWords, revisionQuestions);
  }, [allLearnedWords, revisionQuestions]);

  return {
    // Données principales
    allLearnedWords,
    revisionQuestions,
    
    // État
    isLoading,
    error,
    
    // Statistiques
    stats,
    
    // Méthodes utiles
    hasEnoughWords: allLearnedWords.length > 0,
    canGenerateQuestions: revisionQuestions.length > 0
  };
};

export default useRevisionData;