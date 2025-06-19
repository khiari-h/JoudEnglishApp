// VocabularyWordCard/style.js - VERSION REFACTORISÉE (280 → 15 lignes)

import { StyleSheet } from "react-native";

/**
 * 🎯 Styles ultra-simplifiés pour VocabularyWordCard
 * La majorité des styles est dans les composants génériques
 * Plus besoin de glassmorphism, Platform.select, etc.
 */
const createStyles = (levelColor = "#5E60CE") =>
  StyleSheet.create({
    // =================== CONTAINER SIMPLE ===================
    container: {
      marginHorizontal: 16,
      marginVertical: 8,
    },
  });

export default createStyles;