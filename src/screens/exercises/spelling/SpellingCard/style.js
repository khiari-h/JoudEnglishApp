// SpellingCard/style.js - STYLES ROBUSTES ET ORGANISÉS

import { StyleSheet, Platform } from "react-native";

/**
 * 🎨 Styles robustes pour SpellingCard
 * Organisation claire par sections
 */
const styles = StyleSheet.create({
  // =================== CONTAINER ===================
  scrollView: {
    flex: 1,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 20,
    marginVertical: 8,
    position: "relative",
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: "#64748b",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  completedCard: {
    borderLeftWidth: 6,
    borderLeftColor: "#10b981",
  },

  // =================== ERROR STATE ===================
  errorContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorText: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '600',
    textAlign: 'center',
  },

  // =================== BADGES ===================
  completedBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#10b981",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#10b981",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  completedText: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
  },

  // =================== SECTIONS ===================
  exerciseContent: {
    paddingTop: 24,
    paddingHorizontal: 20,
  },

  inputSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  hintSection: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },

  feedbackSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  // =================== CONTENT TYPES ===================
  homophoneHeader: {
    marginBottom: 16,
  },

  fallbackContainer: {
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },

  instruction: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    textAlign: "center",
    lineHeight: 26,
  },

  // =================== DEBUG (Development) ===================
  debugSection: {
    backgroundColor: '#fef2f2',
    margin: 16,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },

  debugText: {
    fontSize: 12,
    color: '#7f1d1d',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
});

export default styles;