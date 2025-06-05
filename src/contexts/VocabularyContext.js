// contexts/VocabularyContext.js
/**
 * Context centralisé pour le module Vocabulary
 * Élimine le props drilling et centralise l'état
 */

import React, { createContext, useContext, useMemo } from 'react';
import { getLevelColor } from '../../../utils/vocabulary/vocabularyDataHelper';

// 🎯 Context pour les données statiques (ne changent pas)
const VocabularyStaticContext = createContext(null);

// 🔄 Context pour l'état dynamique (peut changer)
const VocabularyStateContext = createContext(null);

// 🎬 Context pour les actions
const VocabularyActionsContext = createContext(null);

// 📊 Context pour les données calculées
const VocabularyComputedContext = createContext(null);

/**
 * Provider qui combine tous les contexts
 */
export const VocabularyProvider = ({ 
  children, 
  level, 
  mode, 
  vocabularyData,
  // État
  categoryIndex,
  wordIndex,
  showTranslation,
  completedWords,
  showDetailedProgress,
  // Actions
  actions,
  // Données calculées
  computed
}) => {
  
  // 📋 Données statiques (ne changent jamais pendant l'exercice)
  const staticData = useMemo(() => ({
    level,
    mode,
    vocabularyData,
    levelColor: getLevelColor(level),
    progressKey: `${level}_${mode}`
  }), [level, mode, vocabularyData]);
  
  // 🔄 État dynamique
  const state = useMemo(() => ({
    categoryIndex,
    wordIndex,
    showTranslation,
    completedWords,
    showDetailedProgress
  }), [categoryIndex, wordIndex, showTranslation, completedWords, showDetailedProgress]);
  
  return (
    <VocabularyStaticContext.Provider value={staticData}>
      <VocabularyStateContext.Provider value={state}>
        <VocabularyActionsContext.Provider value={actions}>
          <VocabularyComputedContext.Provider value={computed}>
            {children}
          </VocabularyComputedContext.Provider>
        </VocabularyActionsContext.Provider>
      </VocabularyStateContext.Provider>
    </VocabularyStaticContext.Provider>
  );
};

/**
 * Hooks pour accéder aux différents contexts
 */

// 📋 Hook pour les données statiques
export const useVocabularyStatic = () => {
  const context = useContext(VocabularyStaticContext);
  if (!context) {
    throw new Error('useVocabularyStatic must be used within VocabularyProvider');
  }
  return context;
};

// 🔄 Hook pour l'état
export const useVocabularyState = () => {
  const context = useContext(VocabularyStateContext);
  if (!context) {
    throw new Error('useVocabularyState must be used within VocabularyProvider');
  }
  return context;
};

// 🎬 Hook pour les actions
export const useVocabularyActions = () => {
  const context = useContext(VocabularyActionsContext);
  if (!context) {
    throw new Error('useVocabularyActions must be used within VocabularyProvider');
  }
  return context;
};

// 📊 Hook pour les données calculées
export const useVocabularyComputed = () => {
  const context = useContext(VocabularyComputedContext);
  if (!context) {
    throw new Error('useVocabularyComputed must be used within VocabularyProvider');
  }
  return context;
};

/**
 * Hook composite qui donne accès à tout
 * Pour les cas où on a besoin de plusieurs contexts
 */
export const useVocabulary = () => {
  const staticData = useVocabularyStatic();
  const state = useVocabularyState();
  const actions = useVocabularyActions();
  const computed = useVocabularyComputed();
  
  return {
    // Données statiques
    level: staticData.level,
    mode: staticData.mode,
    vocabularyData: staticData.vocabularyData,
    levelColor: staticData.levelColor,
    progressKey: staticData.progressKey,
    
    // État
    categoryIndex: state.categoryIndex,
    wordIndex: state.wordIndex,
    showTranslation: state.showTranslation,
    completedWords: state.completedWords,
    showDetailedProgress: state.showDetailedProgress,
    
    // Actions
    ...actions,
    
    // Données calculées
    ...computed
  };
};

/**
 * Hook pour des besoins spécifiques (optimisation)
 */
export const useVocabularyCore = () => {
  const { level, mode, levelColor } = useVocabularyStatic();
  const { categoryIndex, wordIndex, showTranslation } = useVocabularyState();
  
  return {
    level,
    mode,
    levelColor,
    categoryIndex,
    wordIndex,
    showTranslation
  };
};