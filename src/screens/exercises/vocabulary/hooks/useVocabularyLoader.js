// hooks/useVocabularyLoader.js
import { useEffect } from "react";

/**
 * Hook spécialisé pour gérer tous les effets de chargement du vocabulaire
 * Best practice : grouper les effets liés dans un hook dédié
 * 
 * @param {Object} dependencies - Toutes les dépendances nécessaires
 * @returns {Object} État du chargement
 */
const useVocabularyLoader = ({
  loaded,
  vocabularyData,
  lastPosition,
  restoreState,
  initializeProgress
}) => {

  // Effet 1 : Restaurer l'état une fois les données chargées
  useEffect(() => {
    if (loaded && lastPosition) {
      restoreState(lastPosition.categoryIndex, lastPosition.wordIndex);
    }
  }, [loaded, lastPosition, restoreState]);

  // Effet 2 : Initialiser la progression une fois les données chargées
  useEffect(() => {
    if (loaded && vocabularyData) {
      initializeProgress(vocabularyData);
    }
  }, [loaded, vocabularyData, initializeProgress]);

  // Retourner l'état du chargement (si besoin d'infos supplémentaires)
  return {
    isFullyLoaded: loaded && vocabularyData,
    isRestored: loaded && lastPosition,
  };
};

export default useVocabularyLoader;