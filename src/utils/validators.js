// src/utils/validators.js

/**
 * Validateurs génériques pour différents types de champs
 * 
 * Tous les validateurs retournent :
 * - null/undefined si la validation est réussie
 * - un message d'erreur (String) si la validation échoue
 */

// Valider qu'un champ est requis
export const validateRequired = (value, message = 'Ce champ est obligatoire') => {
    if (value === undefined || value === null || value === '') {
      return message;
    }
    
    if (Array.isArray(value) && value.length === 0) {
      return message;
    }
    
    return null;
  };
  
  // Valider une adresse email
  export const validateEmail = (value, message = 'Adresse email invalide') => {
    if (!value) return null; // Pas d'erreur si le champ est vide
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return message;
    }
    
    return null;
  };
  
  // Valider une longueur minimale
  export const validateMinLength = (value, minLength, message = `Doit contenir au moins ${minLength} caractères`) => {
    if (!value) return null; // Pas d'erreur si le champ est vide
    
    if (String(value).length < minLength) {
      return message;
    }
    
    return null;
  };
  
  // Valider une longueur maximale
  export const validateMaxLength = (value, maxLength, message = `Ne doit pas dépasser ${maxLength} caractères`) => {
    if (!value) return null; // Pas d'erreur si le champ est vide
    
    if (String(value).length > maxLength) {
      return message;
    }
    
    return null;
  };
  
  // Valider un nombre minimum
  export const validateMin = (value, min, message = `Doit être au moins ${min}`) => {
    if (!value && value !== 0) return null; // Pas d'erreur si le champ est vide
    
    const numValue = Number(value);
    if (isNaN(numValue) || numValue < min) {
      return message;
    }
    
    return null;
  };
  
  // Valider un nombre maximum
  export const validateMax = (value, max, message = `Doit être au maximum ${max}`) => {
    if (!value && value !== 0) return null; // Pas d'erreur si le champ est vide
    
    const numValue = Number(value);
    if (isNaN(numValue) || numValue > max) {
      return message;
    }
    
    return null;
  };
  
  // Valider que deux valeurs correspondent (ex: mot de passe et confirmation)
  export const validateMatch = (value, matchValue, message = 'Les valeurs ne correspondent pas') => {
    if (!value) return null; // Pas d'erreur si le champ est vide
    
    if (value !== matchValue) {
      return message;
    }
    
    return null;
  };
  
  // Valider avec une expression régulière
  export const validatePattern = (value, pattern, message = 'Format invalide') => {
    if (!value) return null; // Pas d'erreur si le champ est vide
    
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    
    if (!regex.test(value)) {
      return message;
    }
    
    return null;
  };
  
  // Valider qu'une valeur est dans un ensemble de valeurs possibles
  export const validateOneOf = (value, allowedValues, message = 'Valeur non autorisée') => {
    if (!value) return null; // Pas d'erreur si le champ est vide
    
    if (!allowedValues.includes(value)) {
      return message;
    }
    
    return null;
  };
  
  /**
   * Validateurs spécifiques pour l'application d'apprentissage des langues
   */
  
  // Valider une réponse d'exercice
  export const validateExerciseAnswer = (userAnswer, correctAnswer, options = {}) => {
    const { caseSensitive = false, ignoreWhitespace = true, ignoreAccents = true } = options;
    
    if (!userAnswer) return 'Veuillez entrer une réponse';
    
    let normalizedUserAnswer = userAnswer;
    let normalizedCorrectAnswer = correctAnswer;
    
    // Normaliser la casse si insensible à la casse
    if (!caseSensitive) {
      normalizedUserAnswer = normalizedUserAnswer.toLowerCase();
      normalizedCorrectAnswer = normalizedCorrectAnswer.toLowerCase();
    }
    
    // Normaliser les espaces si ignore les espaces
    if (ignoreWhitespace) {
      normalizedUserAnswer = normalizedUserAnswer.trim().replace(/\s+/g, ' ');
      normalizedCorrectAnswer = normalizedCorrectAnswer.trim().replace(/\s+/g, ' ');
    }
    
    // Normaliser les accents si ignore les accents
    if (ignoreAccents) {
      normalizedUserAnswer = normalizedUserAnswer.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      normalizedCorrectAnswer = normalizedCorrectAnswer.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    
    // Vérifier si les réponses correspondent
    if (normalizedUserAnswer !== normalizedCorrectAnswer) {
      return 'La réponse est incorrecte';
    }
    
    return null; // Pas d'erreur
  };
  
  // Fonction utilitaire pour combiner plusieurs validateurs
  export const combineValidators = (...validators) => {
    return (value) => {
      for (const validator of validators) {
        const error = validator(value);
        if (error) {
          return error;
        }
      }
      return null;
    };
  };
  
  // Exemples d'utilisation des validateurs combinés
  export const validatePassword = combineValidators(
    validateRequired,
    (value) => validateMinLength(value, 8, 'Le mot de passe doit contenir au moins 8 caractères'),
    (value) => validatePattern(value, /[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule'),
    (value) => validatePattern(value, /[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
  );
  
  export const validateUsername = combineValidators(
    validateRequired,
    (value) => validateMinLength(value, 3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères'),
    (value) => validateMaxLength(value, 20, 'Le nom d\'utilisateur ne doit pas dépasser 20 caractères'),
    (value) => validatePattern(value, /^[a-zA-Z0-9_]+$/, 'Le nom d\'utilisateur ne peut contenir que des lettres, chiffres et _')
  );