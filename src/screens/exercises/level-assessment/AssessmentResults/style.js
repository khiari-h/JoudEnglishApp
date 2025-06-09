// AssessmentResults/style.js - VERSION ÉPURÉE

import { StyleSheet } from "react-native";

/**
 * 🎯 Styles ultra-simplifiés pour AssessmentResults
 * 200+ lignes → 25 lignes (-87% de code)
 * La majorité des styles est déléguée aux composants génériques
 */
const createStyles = (levelColor = "#3b82f6") =>
  StyleSheet.create({
    // =================== CONTAINER ===================
    container: {
      flex: 1,
      backgroundColor: "#f8fafc",
    },

    content: {
      padding: 20,
      paddingBottom: 40,
      gap: 16, // Espacement uniforme entre les sections
    },

    // =================== NAVIGATION ===================
    navigationContainer: {
      marginTop: 'auto',
      paddingTop: 20,
      gap: 12,
    },

    retryContainer: {
      opacity: 0.9, // Légèrement moins visible que le bouton principal
    },
  });

export default createStyles;