// src/utils/formatters.js

/**
 * Formatage des scores et pourcentages
 */

// Formater un score comme X/Y (Z%)
export const formatScore = (score, total) => {
    if (total === 0) return "0/0 (0%)";
    const percentage = Math.round((score / total) * 100);
    return `${score}/${total} (${percentage}%)`;
  };
  
  // Formater un score comme pourcentage seulement
  export const formatPercentage = (value) => {
    return `${Math.round(value)}%`;
  };
  
  /**
   * Formatage des dates et temps
   */
  
  // Formater une date au format localisé (ex: 15 avril 2023)
  export const formatDate = (date) => {
    if (!date) return '';
    
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  // Formater une date avec l'heure (ex: 15 avril 2023, 14:30)
  export const formatDateTime = (date) => {
    if (!date) return '';
    
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Formater une durée en secondes au format MM:SS
  export const formatDuration = (seconds) => {
    if (seconds === undefined || seconds === null) return '00:00';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Formater une durée de façon lisible (ex: 1h 30m, 45s)
  export const formatReadableDuration = (seconds) => {
    if (seconds === undefined || seconds === null) return '0s';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    let result = '';
    
    if (hours > 0) {
      result += `${hours}h `;
    }
    
    if (minutes > 0 || hours > 0) {
      result += `${minutes}m `;
    }
    
    if (remainingSeconds > 0 || (hours === 0 && minutes === 0)) {
      result += `${remainingSeconds}s`;
    }
    
    return result.trim();
  };
  
  // Formater une date relative (ex: il y a 2 jours, il y a 3 heures)
  export const formatRelativeTime = (date) => {
    if (!date) return '';
    
    const now = new Date();
    const inputDate = new Date(date);
    const diffMs = now - inputDate;
    
    // Convertir en secondes, minutes, heures, jours
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 30) {
      // Si plus d'un mois, on affiche la date complète
      return formatDate(date);
    } else if (diffDays > 0) {
      return `il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    } else if (diffMinutes > 0) {
      return `il y a ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    } else {
      return 'à l\'instant';
    }
  };
  
  /**
   * Formatage de texte
   */
  
  // Première lettre en majuscule
  export const capitalize = (text) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };
  
  // Première lettre de chaque mot en majuscule
  export const titleCase = (text) => {
    if (!text) return '';
    return text.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };
  
  // Tronquer un texte avec ellipsis
  export const truncate = (text, maxLength, suffix = '...') => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - suffix.length) + suffix;
  };
  
  /**
   * Formatage spécifique à l'apprentissage des langues
   */
  
  // Formater un niveau de langue CECRL avec description
  export const formatLanguageLevel = (level) => {
    const levels = {
      A1: 'A1 - Débutant',
      A2: 'A2 - Élémentaire',
      B1: 'B1 - Intermédiaire',
      B2: 'B2 - Intermédiaire avancé',
      C1: 'C1 - Avancé',
      C2: 'C2 - Maîtrise'
    };
    
    return levels[level] || level;
  };
  
  // Formater le type d'exercice
  export const formatExerciseType = (type) => {
    const types = {
      vocabulary: 'Vocabulaire',
      grammar: 'Grammaire',
      reading: 'Lecture',
      chatbot: 'Conversation',
      errorCorrection: 'Correction d\'erreurs',
      phrases: 'Expressions',
      spelling: 'Orthographe',
      wordGames: 'Jeux de mots',
      assessment: 'Évaluation'
    };
    
    return types[type] || titleCase(type);
  };
  
  // Formater un message de feedback selon le score
  export const formatFeedbackMessage = (score, total) => {
    const percentage = Math.round((score / total) * 100);
    
    if (percentage >= 90) {
      return 'Excellent ! Continue comme ça !';
    } else if (percentage >= 75) {
      return 'Très bien ! Tu es sur la bonne voie.';
    } else if (percentage >= 60) {
      return 'Bien ! Avec un peu plus de pratique, tu progresseras rapidement.';
    } else if (percentage >= 40) {
      return 'Pas mal. Continue à pratiquer régulièrement.';
    } else {
      return 'Courage ! L\'apprentissage prend du temps, persévère !';
    }
  };
  
  // Formater un nombre avec séparateur de milliers
  export const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };