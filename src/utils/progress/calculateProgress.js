// src/utils/progress/calculateProgress.js - UTILS CENTRALISÉS POUR LE CALCUL DE PROGRESSION

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getVocabularyData } from '../vocabulary/vocabularyDataHelper';
import { getReadingData } from '../reading/readingDataHelper';
import { getGrammarData } from '../grammar/grammarDataHelper';
import { getPhrasesData } from '../phrases/phrasesDataHelper';
import { getConversationData } from '../conversation/conversationDataHelper';
import { getWordGamesData } from '../wordGames/wordGamesDataHelper';
import { BONUS_EXERCISES } from '../constants'; // ✅ AJOUT de l'import

// =================== VOCABULAIRE ===================


// =================== VOCABULAIRE - LOGIQUE EXISTANTE ===================

export const calculateVocabularyProgress = async (level) => {
  try {
    const storageKey = `vocabulary_${level}_classic`;
    const savedData = await AsyncStorage.getItem(storageKey);
    
    if (!savedData) {
      return 0;
    }
    
    const data = JSON.parse(savedData);
    const completedWords = data.completedWords || {};
    
    const vocabularyData = getVocabularyData(level, 'classic');
    if (!vocabularyData) {
      return 0;
    }
    
    const totalWords = vocabularyData.exercises.reduce((sum, cat) => 
      sum + (cat.words?.length || 0), 0
    );
    
    let completedCount = 0;
    Object.values(completedWords).forEach(categoryWords => {
      if (Array.isArray(categoryWords)) {
        completedCount += categoryWords.length;
      }
    });
    
    const percentage = totalWords > 0 ? (completedCount / totalWords) * 100 : 0;
    return Math.round(percentage);
    
  } catch (error) {
    return 0;
  }
};

// GRAMMAR
export const calculateGrammarProgress = async (level) => {
  try {
    const storageKey = `grammar_${level}`;
    
    // 🔍 DEBUG : Vérifier AsyncStorage
    const savedData = await AsyncStorage.getItem(storageKey);
    console.log('🔍 GRAMMAR COMPARISON:', {
      storageKey,
      savedData,
      grammarData: getGrammarData(level),
      completedExercises: savedData ? JSON.parse(savedData).completedExercises : null
    });
    
    if (!savedData) {
      return 0;
    }
    
    const data = JSON.parse(savedData);
    const completedExercises = data.completedExercises || {};
    
    const grammarData = getGrammarData(level);
    if (!grammarData) {
      return 0;
    }
    
    // ✅ CORRIGÉ : grammarData est un tableau de règles, pas un objet avec exercises
    const totalExercises = grammarData.reduce((sum, rule) => 
      sum + (rule.exercises?.length || 0), 0
    );
    
    let completedCount = 0;
    Object.values(completedExercises).forEach((exerciseIndices, index) => {
      if (Array.isArray(exerciseIndices)) {
        completedCount += exerciseIndices.length;
      }
    });
    
    // 🔍 DEBUG : Vérifier les valeurs
    console.log('🔍 GRAMMAR DEBUG:', {
      totalExercises,
      completedCount,
      percentage: totalExercises > 0 ? (completedCount / totalExercises) * 100 : 0
    });
    
    const percentage = totalExercises > 0 ? (completedCount / totalExercises) * 100 : 0;
    return Math.round(percentage);
  } catch (error) {
    return 0;
  }
};

// READING
export const calculateReadingProgress = async (level) => {
  console.log('🚨 DÉBUT calculateReadingProgress pour niveau:', level);
  try {
    const storageKey = `reading_progress_${level}`;
    console.log('🚨 StorageKey Reading:', storageKey);
    
    // 🔍 DEBUG : Vérifier AsyncStorage
    const savedData = await AsyncStorage.getItem(storageKey);
    console.log('🔍 DEBUG - AsyncStorage.getItem result:', savedData);
    
    if (!savedData) {
      console.log('🚨 Aucune données sauvegardées pour Reading niveau', level);
      return 0;
    }
    
    const data = JSON.parse(savedData);
    console.log('🔍 DEBUG - Données parsées depuis AsyncStorage:', data);
    console.log('🔍 DEBUG - Structure des données:', Object.keys(data));
    
    const completedQuestions = data.completedQuestions || {};
    console.log('🔍 DEBUG - completedQuestions extrait:', completedQuestions);
    console.log('🔍 DEBUG - Type de completedQuestions:', typeof completedQuestions);
    console.log('🔍 DEBUG - Nombre de clés dans completedQuestions:', Object.keys(completedQuestions).length);
    
    // ✅ CORRIGÉ : Récupérer les VRAIES données comme useVocabulary.js
    console.log('🔍 DEBUG - Appel getReadingData avec level:', level);
    const readingData = getReadingData(level);
    console.log('🔍 DEBUG - readingData reçu:', readingData);
    console.log('🔍 DEBUG - Type de readingData:', typeof readingData);
    console.log('🔍 DEBUG - Clés de readingData:', readingData ? Object.keys(readingData) : 'null');
    
    if (!readingData) {
      return 0;
    }
    
    console.log('🔍 DEBUG - readingData.exercises:', readingData.exercises);
    console.log('🔍 DEBUG - Nombre d\'exercices:', readingData.exercises.length);
    
    // Calcul réel du total comme dans readingStats.js
    const totalQuestions = readingData.exercises.reduce((sum, ex) => {
      const questionsCount = ex.questions?.length || 0;
      console.log(`🔍 DEBUG - Exercice "${ex.title}": ${questionsCount} questions`);
      return sum + questionsCount;
    }, 0);
    
    console.log('🔍 DEBUG - Total questions calculé:', totalQuestions);
    
    // Compter questions complétées
    let completedCount = 0;
    Object.values(completedQuestions).forEach((questionIndices, index) => {
      if (Array.isArray(questionIndices)) {
        console.log(`🔍 DEBUG - Exercice ${index}: ${questionIndices.length} questions complétées`);
        completedCount += questionIndices.length;
      } else {
        console.log(`🔍 DEBUG - Exercice ${index}: questionIndices n'est pas un array:`, questionIndices);
      }
    });
    
    console.log('🔍 DEBUG - Total questions complétées:', completedCount);
    
    // Calcul correct au lieu de constante bidon
    const percentage = totalQuestions > 0 ? (completedCount / totalQuestions) * 100 : 0;
    console.log('🔍 DEBUG - Pourcentage calculé:', percentage);
    
    // 🔍 DEBUG TEMPORAIRE
    console.log(`🔍 DEBUG Reading Niveau ${level}:`);
    console.log(`   - Clé stockage: ${storageKey}`);
    console.log(`   - Données sauvegardées:`, data);
    console.log(`   - Questions complétées:`, completedQuestions);
    console.log(`   - Total questions: ${totalQuestions}`);
    console.log(`   - Questions complétées: ${completedCount}`);
    console.log(`   - Pourcentage: ${percentage}%`);
    
    return Math.min(Math.round(percentage), 100);
    
  } catch (error) {
    console.error('🚨 ERREUR dans calculateReadingProgress:', error);
    console.error('🔍 DEBUG - Stack trace complet:', error.stack);
    return handleProgressError(error, 'calculateReadingProgress', level, 0);
  }
};

// PHRASES
export const calculatePhrasesProgress = async (level) => {
  console.log('🚨 DÉBUT calculatePhrasesProgress pour niveau:', level);
  try {
    const storageKey = `phrases_${level}`;
    console.log('🚨 StorageKey Phrases:', storageKey);
    
    // 🔍 DEBUG : Vérifier AsyncStorage
    const savedData = await AsyncStorage.getItem(storageKey);
    console.log('🔍 DEBUG - AsyncStorage.getItem result:', savedData);
    
    if (!savedData) {
      console.log('🚨 Aucune données sauvegardées pour Phrases niveau', level);
      return 0;
    }
    
    const data = JSON.parse(savedData);
    console.log('🔍 DEBUG - Données parsées depuis AsyncStorage:', data);
    console.log('🔍 DEBUG - Structure des données:', Object.keys(data));
    
    // ✅ CORRIGÉ : Récupérer completedPhrases (objet) au lieu de completedCount (nombre)
    const completedPhrases = data.completedPhrases || {};
    console.log('🔍 DEBUG - completedPhrases extrait:', completedPhrases);
    
    // ✅ CORRIGÉ : Récupérer les VRAIES données comme les autres modules
    const phrasesData = getPhrasesData(level);
    console.log('🔍 DEBUG - getPhrasesData result:', phrasesData);
    console.log('🔍 DEBUG - Structure phrasesData:', Object.keys(phrasesData || {}));
    
    if (!phrasesData) {
      return 0;
    }
    
    console.log('🔍 DEBUG - Nombre de phrases/catégories:', phrasesData.phrases?.length || phrasesData.categories?.length);
    
    // ✅ CORRIGÉ : Phrases est un tableau direct, pas des catégories avec phrases
    const totalPhrases = phrasesData.phrases?.length || 0;
    console.log('🔍 DEBUG - Total phrases calculé:', totalPhrases);
    
    // Compter phrases complétées
    let completedCount = 0;
    Object.values(completedPhrases).forEach((phraseIndices, index) => {
      if (Array.isArray(phraseIndices)) {
        console.log(`🔍 DEBUG - Catégorie ${index}: ${phraseIndices.length} phrases complétées`);
        completedCount += phraseIndices.length;
      } else {
        console.log(`🔍 DEBUG - Catégorie ${index}: phraseIndices n'est pas un array:`, phraseIndices);
      }
    });
    
    console.log('🔍 DEBUG - Total phrases complétées:', completedCount);
    
    // Calcul correct au lieu de constante bidon
    const percentage = totalPhrases > 0 ? (completedCount / totalPhrases) * 100 : 0;
    console.log('🔍 DEBUG - Pourcentage final phrases (calcul manuel):', percentage);
    
    return Math.round(percentage);
  } catch (error) {
    console.error('🚨 Erreur dans calculatePhrasesProgress:', error);
    return 0;
  }
};

// CONVERSATIONS
export const calculateConversationsProgress = async (level) => {
  console.log('🚨 DÉBUT calculateConversationsProgress pour niveau:', level);
  try {
    const storageKey = `conversation_${level}`;
    console.log('🚨 StorageKey Conversations:', storageKey);
    
    // 🔍 DEBUG : Vérifier AsyncStorage
    const savedData = await AsyncStorage.getItem(storageKey);
    console.log('🔍 DEBUG - AsyncStorage.getItem result:', savedData);
    
    if (!savedData) {
      console.log('🚨 Aucune données sauvegardées pour Conversations niveau', level);
      return 0;
    }
    
    const data = JSON.parse(savedData);
    console.log('🔍 DEBUG - Données parsées depuis AsyncStorage:', data);
    console.log('🔍 DEBUG - Structure des données:', Object.keys(data));
    
    // ✅ CORRIGÉ : Récupérer completedScenarios (objet) au lieu de completedCount (nombre)
    const completedScenarios = data.completedScenarios || {};
    console.log('🔍 DEBUG - completedScenarios extrait:', completedScenarios);
    
    // ✅ CORRIGÉ : Récupérer les VRAIES données comme les autres modules
    const conversationData = getConversationData(level);
    console.log('🔍 DEBUG - getConversationData result:', conversationData);
    console.log('🔍 DEBUG - Structure conversationData:', Object.keys(conversationData || {}));
    
    if (!conversationData) {
      return 0;
    }
    
    console.log('🔍 DEBUG - Nombre de scénarios:', conversationData.exercises.length);
    
// ✅ CORRIGÉ : CALCUL MANUEL DIRECT - Compter les scénarios !
const totalScenarios = conversationData.exercises.length;
console.log('🔍 DEBUG - Total scénarios calculé:', totalScenarios);

// ✅ CORRIGÉ : Compter les scénarios complétés !
let completedCount = 0;
Object.values(completedScenarios).forEach((scenarioData, index) => {
  if (scenarioData !== null && scenarioData !== undefined) {
    console.log(`🔍 DEBUG - Scénario ${index}: complété`);
    completedCount += 1;  // ✅ 1 scénario = 1 point
  } else {
    console.log(`🔍 DEBUG - Scénario ${index}: non complété`);
  }
});

console.log('🔍 DEBUG - Total scénarios complétés:', completedCount);

// Calcul correct au lieu de constante bidon
const percentage = totalScenarios > 0 ? (completedCount / totalScenarios) * 100 : 0;
console.log('🔍 DEBUG - Pourcentage final conversations (scénarios):', percentage);

    
    return Math.round(percentage);
  } catch (error) {
    console.error('🚨 Erreur dans calculateConversationsProgress:', error);
    return 0;
  }
};



// WORD GAMES
export const calculateWordGamesProgress = async (level) => {
  console.log('🚨 DÉBUT calculateWordGamesProgress pour niveau:', level);
  try {
    // ✅ CORRIGÉ : Utiliser la même clé que dans constants.js et useWordGames.js
    const storageKey = `word_games_completed_${level}`;
    console.log('🚨 StorageKey Word Games:', storageKey);
    
    // 🔍 DEBUG : Vérifier AsyncStorage
    const savedData = await AsyncStorage.getItem(storageKey);
    console.log('🔍 DEBUG - AsyncStorage.getItem result:', savedData);
    
    if (!savedData) {
      console.log('🚨 Aucune données sauvegardées pour Word Games niveau', level);
      return 0;
    }
    
    const data = JSON.parse(savedData);
    console.log('🔍 DEBUG - Données parsées depuis AsyncStorage:', data);
    console.log('🔍 DEBUG - Structure des données:', Object.keys(data));
    
    // ✅ CORRIGÉ : Les données sont directement l'objet completedGames
    const completedGames = data || {};  // ← Les données sont directement l'objet completedGames
    console.log('🔍 DEBUG - completedGames extrait:', completedGames);
    
    // ✅ CORRIGÉ : Récupérer les VRAIES données comme les autres modules
    const wordGamesData = getWordGamesData(level);
    console.log('🔍 DEBUG - getWordGamesData result:', wordGamesData);
    console.log('🔍 DEBUG - Structure wordGamesData:', Object.keys(wordGamesData || {}));
    
    if (!wordGamesData) {
      return 0;
    }
    
    console.log('🔍 DEBUG - Nombre de jeux:', wordGamesData.games.length);
    
    // ✅ CORRIGÉ : COPIER EXACTEMENT la logique de wordGamesStats.js
    // calculateTotalGames(wordGamesData)
    const totalGames = wordGamesData.games?.length || 0;
    console.log('🔍 DEBUG - Total jeux calculé:', totalGames);
    
    // calculateCompletedGamesCount(completedGames) - LOGIQUE EXACTE
    const completedCount = Object.values(completedGames).filter(game => game.completed).length;
    console.log('🔍 DEBUG - Total jeux complétés:', completedCount);
    
    // calculateTotalProgress - LOGIQUE EXACTE
    const percentage = totalGames > 0 ? Math.min(100, (completedCount / totalGames) * 100) : 0;
    console.log('🔍 DEBUG - Pourcentage final word games (calcul manuel):', percentage);
    
    return Math.round(percentage);
  } catch (error) {
    console.error('🚨 Erreur dans calculateWordGamesProgress:', error);
    return 0;
  }
};

// ✅ SUPPRIMÉ : calculateAssessmentProgress n'est plus utilisé

// =================== CALCUL GLOBAL - CORRIGÉ ===================

export const calculateAllProgress = async () => {
  console.log('🚨 DÉBUT calculateAllProgress');
  
  // 🔍 DEBUG : Lister toutes les clés de stockage disponibles
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    console.log('🔍 TOUTES LES CLÉS DE STOCKAGE DISPONIBLES:', allKeys);
    
    // Filtrer les clés qui pourraient contenir des données de progression
    const progressKeys = allKeys.filter(key => 
      key.includes('vocabulary') || 
      key.includes('grammar') || 
      key.includes('reading') || 
      key.includes('phrases') || 
      key.includes('conversation') || 
      key.includes('error') || 
      key.includes('word') || 
      key.includes('assessment')
    );
    console.log('🔍 CLÉS DE PROGRESSION TROUVÉES:', progressKeys);
  } catch (error) {
    console.warn('🔍 Erreur lors de la récupération des clés:', error);
  }
  
  try {
    const newLevelProgress = {};
    const newExerciseProgress = {};

    // ✅ MODIFIÉ : Exclure le niveau bonus, s'arrêter au niveau 6
    const levels = ['1', '2', '3', '4', '5', '6'];
    
    const exerciseCalculators = {
      vocabulary: calculateVocabularyProgress,
      grammar: calculateGrammarProgress,
      reading: calculateReadingProgress,
      phrases: calculatePhrasesProgress,
      conversations: calculateConversationsProgress,
      wordGames: calculateWordGamesProgress,
    };

    await Promise.all(
      levels.map(async (level) => {
        console.log(`🚨 Calcul progression pour niveau: ${level}`);
        
        // ✅ SIMPLIFIÉ : Plus de logique bonus, tous les exercices sont disponibles
        const availableExercises = Object.keys(exerciseCalculators);

        console.log(`🚨 Exercices disponibles pour niveau ${level}:`, availableExercises);

        const results = await Promise.all(
          availableExercises.map(async (exerciseType) => {
            try {
              console.log(`🚨 Calcul ${exerciseType} pour niveau ${level}`);
              const calculator = exerciseCalculators[exerciseType];
              const value = await calculator(level);
              console.log(`🚨 Résultat ${exerciseType} niveau ${level}: ${value}%`);
              return { exerciseType, value };
            } catch (e) {
              console.warn(`Erreur calcul ${exerciseType} niveau ${level}:`, e);
              return { exerciseType, value: 0 };
            }
          })
        );

        let levelTotal = 0;
        let levelCompleted = 0;
        results.forEach(({ exerciseType, value }) => {
          if (!newExerciseProgress[exerciseType]) newExerciseProgress[exerciseType] = {};
          newExerciseProgress[exerciseType][level] = value;
          levelTotal += 1;  // ✅ CORRIGÉ : Compter le nombre d'exercices
          levelCompleted += value;
        });

        newLevelProgress[level] = levelTotal > 0
          ? Math.round(levelCompleted / levelTotal)  // ✅ CORRIGÉ : Moyenne simple
          : 0;
        
        console.log(`🚨 Progression niveau ${level}: ${newLevelProgress[level]}%`);
      })
    );

    console.log('🚨 FIN calculateAllProgress - newExerciseProgress:', newExerciseProgress);
    console.log('🚨 FIN calculateAllProgress - newLevelProgress:', newLevelProgress);
    return { levelProgress: newLevelProgress, exerciseProgress: newExerciseProgress };
    
  } catch (error) {
    console.error('🚨 Erreur calcul progression globale:', error);
    return { levelProgress: {}, exerciseProgress: {} };
  }
};

// =================== GETTERS UTILES ===================

export const getLevelProgress = (levelProgress, level) => {
  return levelProgress[level] || 0;
};

export const getExerciseProgress = (exerciseProgress, exerciseType, level) => {
  const progress = exerciseProgress[exerciseType]?.[level] || 0;
  
  // ✅ AJOUTÉ : Log de debug pour voir ce qui est retourné
  console.log(`🔍 getExerciseProgress(${exerciseType}, ${level}):`, {
    exerciseProgress: exerciseProgress[exerciseType],
    levelProgress: exerciseProgress[exerciseType]?.[level],
    finalProgress: progress
  });
  
  return progress;
};

export const hasProgress = (exerciseProgress, exerciseType, level) => {
  return getExerciseProgress(exerciseProgress, exerciseType, level) > 0;
};

// =================== FONCTION D'AIDE POUR GESTION ERREUR ===================

const handleProgressError = (error, functionName, level, defaultValue) => {
  console.error(`🚨 ERREUR dans ${functionName} pour niveau ${level}:`, error);
  console.error('🔍 Stack trace:', error.stack);
  return defaultValue;
};