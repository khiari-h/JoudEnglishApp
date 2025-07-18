// src/screens/ExerciseSelection/style.js - VERSION COMPLÈTE SIMPLE
import { StyleSheet, Platform } from 'react-native';

// Helper pour les gradients
export const getBackgroundGradient = (primaryColor, backgroundColor) => {
  return {
    colors: [
      `${primaryColor}10`, // Très transparent en haut
      backgroundColor,     // Couleur normale en bas
    ],
    locations: [0, 0.3],
  };
};

export default StyleSheet.create({
  // =================== HEADER ===================
  headerContainer: {
    // Container du header avec gradient
  },

  headerGradient: {
    paddingBottom: 20,
  },

  headerTitle: {
    // Style du titre dans le header
  },

  bonusText: {
    color: "rgba(255, 255, 255, 0.88)",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "400",
  },

  // =================== SCROLL CONTENT ===================
  scrollContent: {
    paddingTop: 20,
  },

  introSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  introText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },

  // =================== NIVEAUX CONTAINER ===================
  levelsContainer: {
    paddingHorizontal: 20,
  },

  // =================== CARDS D'EXERCICES ===================
  levelCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  cardContentStyle: {
    padding: 20,
  },

  // =================== HEADER DE CARD ===================
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  levelTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  levelMainTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 12,
  },

  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  levelBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },

  fastBadge: {
    backgroundColor: "#FED7AA",
    marginLeft: 6,
  },

  fastBadgeText: {
    color: "#F59E0B",
  },

  levelIcon: {
    fontSize: 24,
  },

  // =================== PROGRESSION ===================
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },

  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden',
  },

  progressFill: {
    height: 6,
    borderRadius: 3,
  },

  progressText: {
    fontSize: 12,
    fontWeight: '500',
    minWidth: 30,
  },

  // =================== BOUTON ===================
  startButton: {
    marginTop: 4,
  },
});