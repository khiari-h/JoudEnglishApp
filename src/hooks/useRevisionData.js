// src/hooks/useRevisionData.js - HOOK POUR RÉCUPÉRER LES MOTS APPRIS
import { useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getVocabularyData } from '../utils/vocabulary/vocabularyDataHelper';

const useRevisionData = (level = "mixed", questionsCount = 10) => {
  const [allLearnedWords, setAllLearnedWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ========== RÉCUPÉRATION DES MOTS APPRIS ==========
  useEffect(() => {
    const loadLearnedWords = async () => {
      
      try {
        setIsLoading(true);
        setError(null);
        let learnedWords = [];
        
        const levels = level === "mixed" ? ['1', '2', '3', '4', '5', '6', 'bonus'] : [level];
        const modes = ['classic', 'fast'];

        for (const levelKey of levels) {
          for (const mode of modes) {
            const storageKey = `vocabulary_${levelKey}_${mode}`;
            
            try {
              const stored = await AsyncStorage.getItem(storageKey);
              if (!stored) {
                continue;
              }

              const data = JSON.parse(stored);
              const completedWordsRefs = data.completedWords || {};
              
              if (Object.keys(completedWordsRefs).length === 0) {
                continue;
              }
              
              // Récupérer les données originales du vocabulaire
              const originalData = getVocabularyData(levelKey, mode);
              if (!originalData?.exercises) {
                // Pas de données originales pour ce niveau/mode
                return;
              }
              
              // Traiter chaque catégorie
              Object.entries(completedWordsRefs).forEach(([categoryIndex, wordRefs]) => {
                if (!Array.isArray(wordRefs) || wordRefs.length === 0) return;
                
                const catIndex = parseInt(categoryIndex);
                const category = originalData.exercises[catIndex];
                
                if (!category?.words) {
                  // Catégorie introuvable dans ce niveau/mode
                  return;
                }
                
                // Récupérer chaque mot appris
                wordRefs.forEach((wordRef) => {
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
                  
                  // Récupérer le vrai mot depuis les données originales
                  if (wordIndex !== undefined && category.words[wordIndex]) {
                    const realWord = category.words[wordIndex];
                    learnedWords.push({
                      // Données du mot
                      word: realWord.word,
                      translation: realWord.translation,
                      definition: realWord.definition || '',
                      example: realWord.example || '',
                      
                      // Métadonnées
                      fromLevel: levelKey,
                      fromMode: mode,
                      categoryIndex: catIndex,
                      wordIndex: wordIndex,
                      timestamp: timestamp,
                      
                      // ID unique pour éviter doublons
                      uniqueId: `${levelKey}_${mode}_${catIndex}_${wordIndex}`
                    });
                    
                  } else {
                    // WordIndex introuvable dans la catégorie
                    return;
                  }
                });
              });
              
            } catch (error) {
              console.error(`❌ Erreur traitement ${storageKey}:`, error);
            }
          }
        }
        
        // Supprimer les doublons potentiels basés sur uniqueId
        const uniqueWords = learnedWords.filter((word, index, self) => 
          index === self.findIndex(w => w.uniqueId === word.uniqueId)
        );
        
        setAllLearnedWords(uniqueWords);
        
      } catch (error) {
        console.error('❌ Erreur générale useRevisionData:', error);
        setError(error.message);
        setAllLearnedWords([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadLearnedWords();
  }, [level]); // Recharger si le niveau change

  // ========== GÉNÉRATION DES QUESTIONS ==========
  const revisionQuestions = useMemo(() => {
    if (allLearnedWords.length === 0) return [];

    // Mélanger et sélectionner
    const shuffledWords = [...allLearnedWords].sort(() => Math.random() - 0.5);
    const selectedWords = shuffledWords.slice(0, Math.min(questionsCount, allLearnedWords.length));
    
    // Générer les choix pour chaque question
    const questionsWithChoices = selectedWords.map((word, idx) => {
      // Pool des autres mots pour les mauvaises réponses
      const otherWords = allLearnedWords.filter(w => w.uniqueId !== word.uniqueId);
      
      // Prendre 3 mauvaises réponses
      let wrongAnswers = otherWords
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => w.translation);
      
      // Si pas assez de mauvaises réponses, compléter avec dataset de fallback
      if (wrongAnswers.length < 3) {
        const fallbackData = getVocabularyData('1', 'classic');
        if (fallbackData?.exercises?.[0]?.words) {
          const needed = 3 - wrongAnswers.length;
          const randomFallback = fallbackData.exercises[0].words
            .sort(() => Math.random() - 0.5)
            .filter(w => !wrongAnswers.includes(w.translation) && w.translation !== word.translation)
            .slice(0, needed)
            .map(w => w.translation);
          
          wrongAnswers = [...wrongAnswers, ...randomFallback];
        }
      }
      
      // Mélanger toutes les réponses
      const choices = [word.translation, ...wrongAnswers.slice(0, 3)]
        .sort(() => Math.random() - 0.5);
      
      return {
        ...word,
        choices,
        correctAnswer: word.translation
      };
    });

    return questionsWithChoices;
    
  }, [allLearnedWords, questionsCount]);

  // ========== STATISTIQUES ==========
  const stats = useMemo(() => {
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