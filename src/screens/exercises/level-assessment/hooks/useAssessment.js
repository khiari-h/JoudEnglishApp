// src/screens/exercises/level-assessment/hooks/useAssessment.js - VERSION COMPLÈTE RESTAURÉE

import { useState, useEffect, useRef, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAssessmentData } from '../../../../utils/assessment/assessmentDataHelper';

/**
 * 🎯 Hook unifié pour Level Assessment - VERSION COMPLÈTE
 * Toutes les fonctionnalités avancées restaurées : sauvegarde, restauration, gestion d'erreurs
 */
const useAssessment = (level = "1") => {
  
  // =================== ERROR HANDLING HELPER ===================
  const handleStorageError = (error, operation, fallback = null) => {
    console.warn(`Assessment storage error in ${operation}:`, error);
    return fallback;
  };

  // =================== STORAGE KEYS ===================
  // ✅ CORRIGÉ : Clés dynamiques selon le niveau
  const STORAGE_KEY = `assessment_${level}_position`;
  const ANSWERS_KEY = `assessment_${level}_answers`;
  const RESULTS_KEY = `assessment_results_${level}`;

  // =================== STATE ===================
  const [sections, setSections] = useState([]);
  const [currentSection, setCurrentSection] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [assessmentResults, setAssessmentResults] = useState({});
  const [lastPosition, setLastPosition] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [assessmentData, setAssessmentData] = useState({});

  const isInitialized = useRef(false);

  // =================== DATA LOADING COMPLET ===================
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('🔄 DEBUG: Loading assessment data for level:', level);
        
        // Charger données d'évaluation
        const data = getAssessmentData(level);
        console.log('📊 DEBUG: Assessment data loaded:', {
          hasData: !!data,
          dataKeys: data ? Object.keys(data) : [],
          level
        });
        
        if (!data || Object.keys(data).length === 0) {
          console.error('❌ DEBUG: No assessment data found for level:', level);
          setLoaded(true);
          return;
        }
        
        // Filtrer les sections d'évaluation (exclure les métadonnées)
        const validSections = Object.keys(data).filter(key => {
          const section = data[key];
          return section && 
                 typeof section === 'object' && 
                 section.questions && 
                 Array.isArray(section.questions) &&
                 section.title;
        });
        
        console.log('🔍 DEBUG: Valid sections found:', validSections);
        
        if (validSections.length === 0) {
          console.error('❌ DEBUG: No valid sections found in data');
          setLoaded(true);
          return;
        }
        
        // Initialiser les données
        setAssessmentData(data);
        setSections(validSections);

        // Charger position sauvegardée
        try {
          const savedPosition = await AsyncStorage.getItem(STORAGE_KEY);
          if (savedPosition) {
            const position = JSON.parse(savedPosition);
            console.log('💾 DEBUG: Position restored:', position);
            setLastPosition(position);
          }
        } catch (positionError) {
          handleStorageError(positionError, 'load position');
        }

        // Charger réponses sauvegardées
        try {
          const savedAnswers = await AsyncStorage.getItem(ANSWERS_KEY);
          if (savedAnswers) {
            const answers = JSON.parse(savedAnswers);
            console.log('💾 DEBUG: Answers restored:', Object.keys(answers));
            setUserAnswers(answers);
          }
        } catch (answersError) {
          handleStorageError(answersError, 'load answers');
        }

        // Charger résultats sauvegardés
        try {
          const savedResults = await AsyncStorage.getItem(RESULTS_KEY);
          if (savedResults) {
            const results = JSON.parse(savedResults);
            console.log('💾 DEBUG: Results restored:', results);
            setAssessmentResults(results);
            if (results.completedAt) {
              setTestCompleted(true);
            }
          }
        } catch (resultsError) {
          handleStorageError(resultsError, 'load results');
        }
        
        console.log('✅ DEBUG: Data loading completed successfully');
        
      } catch (error) {
        console.error('❌ DEBUG: Error loading assessment data:', error);
      } finally {
        setLoaded(true);
      }
    };
    
    loadData();
  }, [level]);

  // ✅ AJOUTÉ : Reset quand niveau change (comme useGrammar/useVocabulary)
  useEffect(() => {
    console.log(`🔄 DEBUG useAssessment - Level changed to: ${level}`);
    console.log(`   - Resetting state for new level`);
    
    // Reset de l'état au changement de niveau
    setUserAnswers({});
    setCurrentSection(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setTestCompleted(false);
    setAssessmentResults({});
    setLastPosition(null);
    setLoaded(false);
    isInitialized.current = false;
    
    // Reset des clés de stockage pour le nouveau niveau
    const newStorageKey = `assessment_${level}_position`;
    const newAnswersKey = `assessment_${level}_answers`;
    const newResultsKey = `assessment_results_${level}`;
    
    console.log(`   - New storage keys: ${newStorageKey}, ${newAnswersKey}, ${newResultsKey}`);
  }, [level]);

  // =================== COMPUTED VALUES ===================
  const currentSectionData = assessmentData[currentSection] || {};
  const currentQuestion = currentSectionData.questions?.[currentQuestionIndex] || null;
  const totalSections = sections.length;
  const totalQuestionsInSection = currentSectionData.questions?.length || 0;

  // =================== STORAGE FUNCTIONS ===================
  const savePosition = useCallback(async () => {
    try {
      const dataToSave = {
        sectionIndex: sections.indexOf(currentSection),
        questionIndex: currentQuestionIndex,
        timestamp: Date.now()
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      console.log('💾 DEBUG: Position saved:', dataToSave);
    } catch (error) {
      handleStorageError(error, 'savePosition');
    }
  }, [currentSection, currentQuestionIndex, sections, STORAGE_KEY]);

  const saveAnswers = useCallback(async () => {
    try {
      await AsyncStorage.setItem(ANSWERS_KEY, JSON.stringify(userAnswers));
      console.log('💾 DEBUG: Answers saved');
    } catch (error) {
      handleStorageError(error, 'saveAnswers');
    }
  }, [userAnswers, ANSWERS_KEY]);

  // =================== AUTO-SAVE EFFECTS ===================
  useEffect(() => {
    if (loaded && currentSection && isInitialized.current) {
      savePosition();
    }
  }, [loaded, currentSection, savePosition]);

  useEffect(() => {
    if (loaded && currentSection && Object.keys(userAnswers).length > 0 && isInitialized.current) {
      const timeoutId = setTimeout(() => {
        saveAnswers();
      }, 1000); // Délai de 1 seconde
      
      return () => clearTimeout(timeoutId);
    }
  }, [loaded, currentSection, userAnswers, saveAnswers]);

  // =================== INITIALIZATION EFFECT ===================
  useEffect(() => {
    if (loaded && !currentSection && sections.length > 0 && !isInitialized.current) {
      console.log('🚀 DEBUG: Initializing first section');
      
      // Restaurer position ou commencer au début
      if (lastPosition && 
          lastPosition.sectionIndex >= 0 && 
          lastPosition.sectionIndex < sections.length &&
          sections[lastPosition.sectionIndex]) {
        console.log('🔄 DEBUG: Restoring saved position:', lastPosition);
        setCurrentSection(sections[lastPosition.sectionIndex]);
        setCurrentQuestionIndex(lastPosition.questionIndex || 0);
      } else {
        console.log('🆕 DEBUG: Starting from first section');
        setCurrentSection(sections[0]);
        setCurrentQuestionIndex(0);
      }
      
      isInitialized.current = true;
      console.log('✅ DEBUG: First section initialized successfully');
    }
  }, [loaded, sections, lastPosition]);

  // =================== NAVIGATION ACTIONS ===================
  const changeSection = useCallback((sectionKey) => {
    if (sections.includes(sectionKey)) {
      setCurrentSection(sectionKey);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  }, [sections]);

  const changeQuestion = useCallback((questionIndex) => {
    if (questionIndex >= 0 && questionIndex < totalQuestionsInSection) {
      setCurrentQuestionIndex(questionIndex);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  }, [totalQuestionsInSection]);

  const handleSelectAnswer = useCallback((answerIndex) => {
    if (!showFeedback) {
      setSelectedAnswer(answerIndex);
    }
  }, [showFeedback]);

  const validateAnswer = useCallback(() => {
    if (selectedAnswer !== null && !showFeedback) {
      setShowFeedback(true);
      
      // Sauvegarder la réponse
      const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;
      setUserAnswers(prev => ({
        ...prev,
        [currentSection]: {
          ...prev[currentSection],
          [currentQuestionIndex]: {
            selectedAnswer,
            isCorrect,
            timestamp: Date.now()
          }
        }
      }));
    }
  }, [selectedAnswer, showFeedback, currentQuestion, currentSection, currentQuestionIndex]);

  const tryAgain = useCallback(() => {
    setSelectedAnswer(null);
    setShowFeedback(false);
  }, []);

  // =================== MAIN NAVIGATION ===================
  const handleNext = useCallback(() => {
    // Vérifier si fin de l'évaluation
    const currentSectionIndex = sections.indexOf(currentSection);
    const isLastSection = currentSectionIndex === sections.length - 1;
    const isLastQuestion = currentQuestionIndex === totalQuestionsInSection - 1;

    if (isLastSection && isLastQuestion) {
      // Calculer et sauvegarder résultats finaux
      setTestCompleted(true);
      
      // ✅ AJOUTÉ : Sauvegarder immédiatement la progression
      const dataToSave = {
        completedAt: new Date().toISOString(),
        timestamp: Date.now(),
        level,
        sections: sections.length,
        totalQuestions: Object.values(assessmentData).reduce((sum, section) => 
          sum + (section.questions?.length || 0), 0
        )
      };
      
      // Sauvegarder en arrière-plan (non-bloquant)
      AsyncStorage.setItem(RESULTS_KEY, JSON.stringify(dataToSave))
        .catch(error => console.warn('Erreur sauvegarde assessment:', error));
      
      return { completed: true };
    }

    // Navigation normale
    if (currentQuestionIndex < totalQuestionsInSection - 1) {
      // Question suivante dans la section
      const newQuestionIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newQuestionIndex);
      
      // ✅ AJOUTÉ : Sauvegarder la position après navigation
      const dataToSave = {
        sectionIndex: currentSectionIndex,
        questionIndex: newQuestionIndex,
        timestamp: Date.now()
      };
      
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
        .catch(error => console.warn('Erreur sauvegarde assessment handleNext:', error));
    } else {
      // Section suivante
      const nextSectionIndex = currentSectionIndex + 1;
      if (nextSectionIndex < sections.length) {
        setCurrentSection(sections[nextSectionIndex]);
        setCurrentQuestionIndex(0);
        
        // ✅ AJOUTÉ : Sauvegarder la position après changement de section
        const dataToSave = {
          sectionIndex: nextSectionIndex,
          questionIndex: 0,
          timestamp: Date.now()
        };
        
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
          .catch(error => console.warn('Erreur sauvegarde assessment changeSection:', error));
      }
    }
    
    setSelectedAnswer(null);
    setShowFeedback(false);
    return { completed: false };
  }, [sections, currentSection, currentQuestionIndex, totalQuestionsInSection, STORAGE_KEY, assessmentData, RESULTS_KEY]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      // Question précédente dans la section
      const newQuestionIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newQuestionIndex);
      
      // ✅ AJOUTÉ : Sauvegarder la position après navigation
      const dataToSave = {
        sectionIndex: sections.indexOf(currentSection),
        questionIndex: newQuestionIndex,
        timestamp: Date.now()
      };
      
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
        .catch(error => console.warn('Erreur sauvegarde assessment handlePrevious:', error));
    } else {
      // Section précédente
      const currentSectionIndex = sections.indexOf(currentSection);
      if (currentSectionIndex > 0) {
        const prevSection = sections[currentSectionIndex - 1];
        const prevSectionData = assessmentData[prevSection];
        const lastQuestionIndex = (prevSectionData.questions?.length || 1) - 1;
        
        setCurrentSection(prevSection);
        setCurrentQuestionIndex(lastQuestionIndex);
        
        // ✅ AJOUTÉ : Sauvegarder la position après changement de section
        const dataToSave = {
          sectionIndex: currentSectionIndex - 1,
          questionIndex: lastQuestionIndex,
          timestamp: Date.now()
        };
        
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
          .catch(error => console.warn('Erreur sauvegarde assessment changeSection:', error));
      }
    }
    
    setSelectedAnswer(null);
    setShowFeedback(false);
  }, [currentQuestionIndex, sections, currentSection, assessmentData, STORAGE_KEY]);

  // =================== COMPLETION LOGIC ===================
  const saveAssessmentResults = useCallback(async (results) => {
    try {
      const resultsWithTimestamp = {
        ...results,
        timestamp: Date.now(),
      };
      setAssessmentResults(resultsWithTimestamp);
      await AsyncStorage.setItem(RESULTS_KEY, JSON.stringify(resultsWithTimestamp));
      console.log('💾 DEBUG: Assessment results saved');
    } catch (error) {
      handleStorageError(error, 'saveAssessmentResults');
      // Fallback: garder les résultats en mémoire même si la sauvegarde échoue
    }
  }, [RESULTS_KEY]);

  const resetAssessment = useCallback(async () => {
    try {
      await AsyncStorage.multiRemove([STORAGE_KEY, RESULTS_KEY, ANSWERS_KEY]);
      setCurrentSection(sections[0]);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setTestCompleted(false);
      setUserAnswers({});
      setAssessmentResults({});
      setLastPosition({ sectionIndex: 0, questionIndex: 0 });
      isInitialized.current = false;
      console.log('🔄 DEBUG: Assessment reset successfully');
    } catch (error) {
      handleStorageError(error, 'resetAssessment');
      // Fallback: réinitialiser l'état local même si la suppression échoue
      setCurrentSection(sections[0]);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setTestCompleted(false);
      setUserAnswers({});
      setAssessmentResults({});
      setLastPosition({ sectionIndex: 0, questionIndex: 0 });
      isInitialized.current = false;
    }
  }, [STORAGE_KEY, RESULTS_KEY, ANSWERS_KEY, sections]);

  // =================== COMPUTED STATS ===================
  const getStats = useCallback(() => {
    const totalQuestions = sections.reduce((sum, sectionKey) => {
      return sum + (assessmentData[sectionKey]?.questions?.length || 0);
    }, 0);

    let correctAnswers = 0;
    let answeredQuestions = 0;

    Object.values(userAnswers).forEach(section => {
      Object.values(section).forEach(answer => {
        answeredQuestions++;
        if (answer.isCorrect) {
          correctAnswers++;
        }
      });
    });

    const currentSectionIndex = sections.indexOf(currentSection) + 1;
    const answeredInCurrentSection = Object.keys(userAnswers[currentSection] || {}).length;

    return {
      totalQuestions,
      answeredQuestions,
      correctAnswers,
      totalSections,
      currentSectionIndex,
      totalQuestionsInSection,
      answeredInCurrentSection,
      percentage: answeredQuestions > 0 ? (correctAnswers / answeredQuestions) * 100 : 0
    };
  }, [sections, assessmentData, userAnswers, currentSection, totalQuestionsInSection]);

  // =================== COMPUTED DISPLAY ===================
  const getDisplayData = useCallback(() => {
    const currentSectionIndex = sections.indexOf(currentSection) + 1;
    const sectionTitle = currentSectionData.title || `Section ${currentSectionIndex}`;
    const questionNumber = currentQuestionIndex + 1;

    return {
      currentSectionIndex,
      sectionTitle,
      questionNumber,
      currentQuestion,
      currentSectionData
    };
  }, [sections, currentSection, currentSectionData, currentQuestionIndex, currentQuestion]);

  // =================== VALIDATION ===================
  const canGoToPrevious = useCallback(() => {
    if (currentQuestionIndex > 0) return true;
    const currentSectionIndex = sections.indexOf(currentSection);
    return currentSectionIndex > 0;
  }, [currentQuestionIndex, sections, currentSection]);

  const isLastQuestionInSection = currentQuestionIndex === totalQuestionsInSection - 1;
  const isLastSection = sections.indexOf(currentSection) === sections.length - 1;

  return {
    // State
    currentSection,
    currentQuestionIndex,
    selectedAnswer,
    showFeedback,
    testCompleted,
    userAnswers,
    assessmentResults,
    loaded,
    
    // Data
    currentQuestion,
    currentSectionData,
    totalSections,
    totalQuestionsInSection,
    sections, // ✅ AJOUTÉ pour AssessmentProgress
    assessmentData, // ✅ AJOUTÉ pour AssessmentProgress
    
    // Actions
    changeSection,
    changeQuestion,
    handleSelectAnswer,
    validateAnswer,
    tryAgain,
    handleNext,
    handlePrevious,
    saveAssessmentResults,
    resetAssessment,
    setTestCompleted,
    
    // Computed
    canGoToPrevious: canGoToPrevious(),
    isLastQuestionInSection,
    isLastSection,
    stats: getStats(),
    display: getDisplayData(),
  };
};

export default useAssessment;