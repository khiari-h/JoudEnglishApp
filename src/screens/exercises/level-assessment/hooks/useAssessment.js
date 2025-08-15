// src/screens/exercises/level-assessment/hooks/useAssessment.js - VERSION CORRIGÉE

import { useState, useEffect, useRef, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAssessmentData } from '../../../../utils/assessment/assessmentDataHelper';

/**
 * 🎯 Hook unifié pour Level Assessment
 * Remplace useAssessmentState + useAssessmentProgress
 * Simple, efficace, maintenable - pattern identique à useVocabulary
 */
const useAssessment = (level = "A1") => {
  
  // =================== ERROR HANDLING HELPER ===================
  const handleStorageError = (error, operation, fallback = null) => {
    console.warn(`Assessment storage error in ${operation}:`, error);
    return fallback;
  };

  // =================== STORAGE KEYS ===================
  const STORAGE_KEY = `assessment_${level}_position`;
  const ANSWERS_KEY = `assessment_${level}_answers`;
  const RESULTS_KEY = `assessment_${level}_results`;

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

  // =================== DATA LOADING ===================
  useEffect(() => {
    const loadData = async () => {
      try {
        // Charger données d'évaluation
        const data = getAssessmentData(level);
        setAssessmentData(data);
        setSections(Object.keys(data));

        // Charger position sauvegardée
        try {
          const savedPosition = await AsyncStorage.getItem(STORAGE_KEY);
          if (savedPosition) {
            const position = JSON.parse(savedPosition);
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
            setAssessmentResults(results);
            if (results.completedAt) {
              setTestCompleted(true);
            }
          }
        } catch (resultsError) {
          handleStorageError(resultsError, 'load results');
        }
      } catch (error) {
        // ✅ Gestion d'erreur appropriée
        console.error('Error loading assessment data:', error);
      } finally {
        setLoaded(true);
      }
    };
    loadData();
  }, [level]);

  // Save data to storage
  const saveData = useCallback(async () => {
    try {
      // Sauvegarder position
      const dataToSave = {
        sectionIndex: sections.indexOf(currentSection),
        questionIndex: currentQuestionIndex,
        timestamp: Date.now()
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));

      // Sauvegarder réponses
      await AsyncStorage.setItem(ANSWERS_KEY, JSON.stringify(userAnswers));
    } catch (error) {
      // ✅ Gestion d'erreur appropriée
      handleStorageError(error, 'saveData');
      // Fallback: continuer sans sauvegarde
    }
  }, [currentSection, currentQuestionIndex, userAnswers, sections, STORAGE_KEY, ANSWERS_KEY]);

  // Auto-save when data changes
  useEffect(() => {
    if (loaded && currentSection) saveData();
  }, [saveData, loaded, currentSection]);

  // Initialize first section
  useEffect(() => {
    if (loaded && !currentSection && sections.length > 0 && !isInitialized.current) {
      // Restaurer position ou commencer au début
      if (lastPosition && sections[lastPosition.sectionIndex]) {
        setCurrentSection(sections[lastPosition.sectionIndex]);
        setCurrentQuestionIndex(lastPosition.questionIndex);
      } else {
        setCurrentSection(sections[0]);
        setCurrentQuestionIndex(0);
      }
      isInitialized.current = true;
    }
  }, [loaded, currentSection, sections, lastPosition]);

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
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
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
      return { completed: true };
    }

    // Navigation normale
    if (currentQuestionIndex < totalQuestionsInSection - 1) {
      // Question suivante dans la section
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Section suivante
      const nextSectionIndex = currentSectionIndex + 1;
      if (nextSectionIndex < sections.length) {
        setCurrentSection(sections[nextSectionIndex]);
        setCurrentQuestionIndex(0);
      }
    }
    
    setSelectedAnswer(null);
    setShowFeedback(false);
    return { completed: false };
  }, [sections, currentSection, currentQuestionIndex, totalQuestionsInSection]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      // Question précédente dans la section
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      // Section précédente
      const currentSectionIndex = sections.indexOf(currentSection);
      if (currentSectionIndex > 0) {
        const prevSection = sections[currentSectionIndex - 1];
        const prevSectionData = assessmentData[prevSection];
        const lastQuestionIndex = (prevSectionData.questions?.length || 1) - 1;
        
        setCurrentSection(prevSection);
        setCurrentQuestionIndex(lastQuestionIndex);
      }
    }
    
    setSelectedAnswer(null);
    setShowFeedback(false);
  }, [currentQuestionIndex, sections, currentSection, assessmentData]);

  // =================== COMPLETION LOGIC ===================
  const saveAssessmentResults = useCallback(async (results) => {
    try {
      const resultsWithTimestamp = {
        ...results,
        timestamp: Date.now(),
      };
      setAssessmentResults(resultsWithTimestamp);
      await AsyncStorage.setItem(RESULTS_KEY, JSON.stringify(resultsWithTimestamp));
    } catch (error) {
      // ✅ Gestion d'erreur appropriée
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
    } catch (error) {
      // ✅ Gestion d'erreur appropriée
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
    return sections.indexOf(currentSection) > 0;
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