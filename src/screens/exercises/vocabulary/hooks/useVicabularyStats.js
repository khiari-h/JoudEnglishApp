// hooks/useVocabularyStats.js
import { useMemo } from "react";
import {
  calculateTotalWords,
  calculateCompletedWordsCount,
  calculateTotalProgress,
} from "../../../../utils/vocabulary/vocabularyStats";

/**
 * Hook pour tous les calculs de statistiques du vocabulaire
 * Utilise les fonctions utils pures avec optimisation React (useMemo)
 * Architecture best practice : logique pure + optimisation React séparées
 */
const useVocabularyStats = (vocabularyData, completedWords) => {
  
  // Calcul du nombre total de mots avec mémorisation
  const totalWords = useMemo(() => {
    return calculateTotalWords(vocabularyData?.exercises || []);
  }, [vocabularyData]);

  // Calcul du nombre de mots complétés avec mémorisation
  const completedWordsCount = useMemo(() => {
    return calculateCompletedWordsCount(completedWords);
  }, [completedWords]);

  // Calcul du progrès total avec mémorisation
  const totalProgress = useMemo(() => {
    return calculateTotalProgress(
      vocabularyData?.exercises || [],
      completedWords
    );
  }, [vocabularyData, completedWords]);

  return {
    totalWords,
    completedWordsCount,
    totalProgress,
  };
};

export default useVocabularyStats;