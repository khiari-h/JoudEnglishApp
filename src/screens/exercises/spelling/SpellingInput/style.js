// SpellingInput/style.js - VERSION SANS DEBUG

import { StyleSheet, Platform } from "react-native";

const createStyles = (levelColor = "#3b82f6") =>
  StyleSheet.create({
    container: {
      marginVertical: 16,
    },

    errorText: {
      fontSize: 14,
      color: '#ef4444',
      fontWeight: '600',
      textAlign: 'center',
      backgroundColor: '#fef2f2',
      padding: 12,
      borderRadius: 8,
      borderLeftWidth: 4,
      borderLeftColor: '#ef4444',
    },

    label: {
      fontSize: 16,
      fontWeight: "600",
      color: "#374151",
      marginBottom: 12,
      letterSpacing: 0.3,
    },

    input: {
      height: 56,
      borderWidth: 2,
      borderRadius: 16,
      paddingHorizontal: 20,
      paddingVertical: 16,
      fontSize: 18,
      fontWeight: "500",
      color: "#1e293b",
      backgroundColor: "#ffffff",
      ...Platform.select({
        ios: {
          shadowColor: levelColor,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        android: {
          elevation: 2,
        },
      }),
    },

    disabledInput: {
      backgroundColor: "#f8fafc",
      color: "#64748b",
      opacity: 0.8,
      borderColor: "#e2e8f0",
      ...Platform.select({
        ios: {
          shadowOpacity: 0,
        },
        android: {
          elevation: 0,
        },
      }),
    },
  });

export default createStyles;