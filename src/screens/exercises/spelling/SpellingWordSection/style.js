// SpellingWordSection/style.js - VERSION SIMPLE

import { StyleSheet, Platform } from "react-native";

const createStyles = (levelColor = "#3b82f6") =>
  StyleSheet.create({
    // =================== CONTAINER ===================
    container: {
      flex: 1,
      paddingBottom: 20,
    },

    // =================== COMPTEUR ===================
    counterSection: {
      marginHorizontal: 16,
      marginBottom: 16,
      borderRadius: 20,
      overflow: 'hidden',
    },
    
    counterGradient: {
      paddingVertical: 16,
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    counterBadge: {
      backgroundColor: 'white',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 16,
      borderWidth: 1,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    
    counterText: {
      fontSize: 18,
      fontWeight: '800',
      letterSpacing: 0.5,
    },

    completedBadge: {
      backgroundColor: '#16a34a',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      marginBottom: 10,
    },
    
    completedText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '600',
    },

    // =================== CONTENU ===================
    content: {
      flex: 1,
      paddingHorizontal: 16,
    },

    instruction: {
      fontSize: 18,
      fontWeight: '600',
      color: '#374151',
      textAlign: 'center',
      marginBottom: 20,
      lineHeight: 26,
    },

    // =================== RÈGLE ===================
    ruleContainer: {
      backgroundColor: '#f8fafc',
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      borderLeftWidth: 4,
      borderLeftColor: levelColor,
    },
    
    ruleTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: '#374151',
      marginBottom: 8,
    },
    
    ruleText: {
      fontSize: 15,
      color: '#4b5563',
      lineHeight: 22,
    },

    // =================== PHRASE ===================
    sentenceContainer: {
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#e5e7eb',
    },
    
    sentenceText: {
      fontSize: 18,
      color: '#374151',
      textAlign: 'center',
      lineHeight: 26,
    },

    // =================== INPUT TEXTE ===================
    inputContainer: {
      marginBottom: 20,
    },
    
    inputLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: '#475569',
      marginBottom: 8,
    },
    
    textInput: {
      height: 50,
      borderWidth: 2,
      borderRadius: 12,
      paddingHorizontal: 16,
      fontSize: 18,
      fontWeight: '500',
      color: '#1e293b',
      backgroundColor: 'white',
    },
    
    disabledInput: {
      backgroundColor: '#f1f5f9',
      opacity: 0.7,
      borderColor: '#e2e8f0',
    },

    // =================== CHOIX MULTIPLES ===================
    choicesContainer: {
      marginBottom: 20,
    },
    
    choicesLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: '#475569',
      marginBottom: 12,
    },
    
    choiceButton: {
      backgroundColor: 'white',
      borderWidth: 2,
      borderRadius: 12,
      padding: 16,
      marginBottom: 10,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        },
        android: {
          elevation: 1,
        },
      }),
    },
    
    choiceSelected: {
      backgroundColor: `${levelColor}08`,
    },
    
    choiceText: {
      fontSize: 16,
      color: '#374151',
      fontWeight: '500',
    },

    // =================== INDICE ===================
    hintContainer: {
      marginBottom: 20,
    },
    
    hintButton: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderRadius: 12,
      padding: 12,
      alignItems: 'center',
      marginBottom: 10,
    },
    
    hintButtonText: {
      fontSize: 14,
      fontWeight: '600',
    },
    
    hintContent: {
      borderRadius: 12,
      padding: 16,
    },
    
    hintText: {
      fontSize: 14,
      color: '#4b5563',
      fontStyle: 'italic',
      lineHeight: 20,
    },

    // =================== FEEDBACK ===================
    feedbackContainer: {
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
    },
    
    feedbackTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 8,
    },
    
    correctAnswer: {
      fontSize: 16,
      color: '#374151',
      marginBottom: 8,
    },
    
    explanation: {
      fontSize: 14,
      color: '#6b7280',
      lineHeight: 20,
      fontStyle: 'italic',
    },
  });

export default createStyles;