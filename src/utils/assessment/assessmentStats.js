/**
 * Calcule la moyenne des scores d'un tableau d'objets { score }
 */
export const calculateAverageScore = (data = []) => {
  if (!Array.isArray(data) || data.length === 0) return 0;
  const total = data.reduce((sum, item) => sum + (item.score || 0), 0);
  return total / data.length;
};
// utils/assessment/assessmentStats.js

/**
 * 📊 Fonctions utilitaires pour les statistiques d'évaluation
 * Pattern identique à vocabularyStats.js
 */

// =================== CALCULS DE BASE ===================

/**
 * Calcule le nombre total de questions dans toutes les sections
 */
export const calculateTotalQuestions = (assessmentData = {}, sections = []) =>
  sections.reduce((total, sectionKey) => {
    const section = assessmentData[sectionKey];
    return total + (section?.questions?.length || 0);
  }, 0);

/**
 * Calcule le nombre de questions répondues
 */
export const calculateAnsweredQuestionsCount = (userAnswers = {}) =>
  Object.keys(userAnswers).reduce((count, sectionKey) => {
    const sectionAnswers = userAnswers[sectionKey] || {};
    return count + Object.keys(sectionAnswers).length;
  }, 0);

/**
 * Calcule le nombre de réponses correctes
 */
export const calculateCorrectAnswersCount = (userAnswers = {}) =>
  Object.keys(userAnswers).reduce((count, sectionKey) => {
    const sectionAnswers = userAnswers[sectionKey] || {};
    return count + Object.values(sectionAnswers).filter(answer => answer.isCorrect).length;
  }, 0);

// =================== CALCULS DE PROGRESSION ===================

/**
 * Calcule la progression totale (pourcentage de questions répondues)
 */
export const calculateTotalProgress = (assessmentData = {}, sections = [], userAnswers = {}) => {
  const totalQuestions = calculateTotalQuestions(assessmentData, sections);
  const answeredQuestions = calculateAnsweredQuestionsCount(userAnswers);
  return totalQuestions > 0 ? Math.min(100, (answeredQuestions / totalQuestions) * 100) : 0;
};

/**
 * Calcule la progression d'une section spécifique
 */
export const calculateSectionProgress = (assessmentData = {}, sectionKey = "", userAnswers = {}) => {
  const section = assessmentData[sectionKey];
  const totalInSection = section?.questions?.length || 0;
  const answeredInSection = Object.keys(userAnswers[sectionKey] || {}).length;
  
  return totalInSection > 0 ? Math.min(100, (answeredInSection / totalInSection) * 100) : 0;
};

/**
 * Calcule la progression par section pour l'expansion ProgressCard
 */
export const calculateSectionProgressData = (assessmentData = {}, sections = [], userAnswers = {}) => {
  return sections.map((sectionKey, index) => {
    const section = assessmentData[sectionKey];
    const totalInSection = section?.questions?.length || 0;
    const sectionAnswers = userAnswers[sectionKey] || {};
    const answeredInSection = Object.keys(sectionAnswers).length;
    const correctInSection = Object.values(sectionAnswers).filter(answer => answer.isCorrect).length;
    const progress = calculateSectionProgress(assessmentData, sectionKey, userAnswers);

    return {
      title: section?.title || `Section ${index + 1}`,
      totalQuestions: totalInSection,
      answeredQuestions: answeredInSection,
      correctAnswers: correctInSection,
      progress,
      accuracy: answeredInSection > 0 ? (correctInSection / answeredInSection) * 100 : 0
    };
  });
};

// =================== CALCULS DE SCORE ===================

/**
 * Calcule le score final de l'utilisateur
 */
export const calculateUserScore = (userAnswers = {}) => {
  let correctAnswers = 0;
  let totalAnswered = 0;

  Object.values(userAnswers).forEach(section => {
    Object.values(section).forEach(answer => {
      totalAnswered++;
      if (answer.isCorrect) {
        correctAnswers++;
      }
    });
  });

  return {
    correctAnswers,
    totalQuestions: totalAnswered, // Questions réellement répondues
    percentage: totalAnswered > 0 ? (correctAnswers / totalAnswered) * 100 : 0,
    scoreOutOf20: totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 20) : 0
  };
};

/**
 * Détermine le niveau de performance basé sur le score
 */
export const getPerformanceLevel = (percentage) => {
  if (percentage >= 80) return { level: 'excellent', color: '#16a34a' };
  if (percentage >= 60) return { level: 'good', color: '#ea580c' };
  if (percentage >= 40) return { level: 'fair', color: '#dc2626' };
  return { level: 'poor', color: '#b91c1c' };
};

/**
 * Calcule les statistiques complètes pour l'affichage
 */
export const calculateCompleteStats = (assessmentData = {}, sections = [], userAnswers = {}) => {
  const totalQuestions = calculateTotalQuestions(assessmentData, sections);
  const answeredQuestions = calculateAnsweredQuestionsCount(userAnswers);
  const correctAnswers = calculateCorrectAnswersCount(userAnswers);
  const totalProgress = calculateTotalProgress(assessmentData, sections, userAnswers);
  const userScore = calculateUserScore(userAnswers);
  const performance = getPerformanceLevel(userScore.percentage);
  const sectionProgressData = calculateSectionProgressData(assessmentData, sections, userAnswers);

  return {
    // Statistiques globales
    totalQuestions,
    answeredQuestions,
    correctAnswers,
    totalProgress,
    
    // Score utilisateur
    userScore,
    performance,
    
    // Données par section
    sectionProgressData,
    
    // Ratios
    accuracy: answeredQuestions > 0 ? (correctAnswers / answeredQuestions) * 100 : 0,
    completion: totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0
  };
};