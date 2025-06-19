// SpellingProgress/style.js - VERSION ULTRA-SIMPLE

import { StyleSheet, Platform } from "react-native";

const createStyles = (levelColor = "#3b82f6") =>
  StyleSheet.create({
    // =================== CONTAINER ===================
    container: {
      marginHorizontal: 16,
      marginBottom: 16,
      borderRadius: 20,
      overflow: 'hidden',
    },

    gradient: {
      paddingVertical: 20,
      paddingHorizontal: 24,
    },

    // =================== HEADER ===================
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },

    title: {
      fontSize: 18,
      fontWeight: '700',
      color: '#374151',
    },

    stats: {
      fontSize: 16,
      fontWeight: '600',
    },

    // =================== PROGRESS BAR ===================
    progressBarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    progressBarTrack: {
      flex: 1,
      height: 8,
      borderRadius: 4,
      marginRight: 16,
    },

    progressBarFill: {
      height: '100%',
      borderRadius: 4,
      minWidth: 4, // Pour toujours voir un peu de progress
    },

    percentage: {
      fontSize: 16,
      fontWeight: '700',
      minWidth: 45,
      textAlign: 'right',
    },
  });

export default createStyles;