// ReadingQuestionCard/style.js - VERSION DYNAMIQUE
import { StyleSheet, Platform } from "react-native";

/**
 * 🎯 Styles dynamiques pour ReadingQuestionCard
 * Micro-interactions, animations, feedback visuel premium
 */
const createStyles = (levelColor = "#3b82f6") =>
  StyleSheet.create({
    // =================== CONTAINER ===================
    container: {
      marginHorizontal: 16,
      marginVertical: 8,
    },

    // =================== QUESTION HEADER ===================
    questionHeader: {
      marginBottom: 16,
    },

    // =================== OPTIONS SECTION ===================
    optionsContainer: {
      marginTop: 20,
    },
    
    optionsTitle: {
      fontSize: 16,
      fontWeight: "700",
      marginBottom: 16,
      paddingHorizontal: 4,
      textAlign: 'center',
    },

    // =================== OPTION BUTTONS ===================
    optionButton: {
      backgroundColor: "white",
      borderWidth: 2,
      borderColor: "#e2e8f0",
      borderRadius: 16,
      padding: 18,
      marginBottom: 12,
      position: 'relative',
      overflow: 'hidden',
      // Ombre dynamique
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
        },
        android: {
          elevation: 2,
        },
      }),
    },

    // Gradient overlay
    optionGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: 14,
    },

    optionContent: {
      flexDirection: "row",
      alignItems: "center",
      zIndex: 1,
    },

    // Lettre de l'option
    optionLetterContainer: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.05)',
    },

    optionLetter: {
      fontSize: 16,
      fontWeight: "800",
    },

    optionText: {
      fontSize: 16,
      color: "#334155",
      flex: 1,
      lineHeight: 24,
      fontWeight: "500",
    },

    // =================== ÉTATS DES OPTIONS ===================
    optionSelected: {
      backgroundColor: "#eff6ff",
      borderColor: levelColor,
      transform: [{ scale: 1.02 }],
      // Ombre plus prononcée pour la sélection
      ...Platform.select({
        ios: {
          shadowColor: levelColor,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
        },
        android: {
          elevation: 4,
        },
      }),
    },

    optionCorrect: {
      backgroundColor: "#f0fdf4",
      borderColor: "#10b981",
      borderWidth: 3,
      // Ombre verte pour succès
      ...Platform.select({
        ios: {
          shadowColor: "#10b981",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 12,
        },
        android: {
          elevation: 6,
        },
      }),
    },

    optionIncorrect: {
      backgroundColor: "#fef2f2",
      borderColor: "#ef4444",
      borderWidth: 3,
      // Ombre rouge pour erreur
      ...Platform.select({
        ios: {
          shadowColor: "#ef4444",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 12,
        },
        android: {
          elevation: 6,
        },
      }),
    },

    // =================== TEXTES DES ÉTATS ===================
    optionCorrectText: {
      color: "#10b981",
      fontWeight: "600",
    },

    optionIncorrectText: {
      color: "#ef4444",
      fontWeight: "600",
    },

    // =================== CONFETTI ANIMATION ===================
    confettiContainer: {
      position: 'absolute',
      top: -20,
      left: 0,
      right: 0,
      alignItems: 'center',
      zIndex: 10,
    },

    confettiText: {
      fontSize: 24,
      textAlign: 'center',
      letterSpacing: 8,
    },
  });

export default createStyles;