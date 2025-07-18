// src/screens/LevelSelection/style.js - VERSION COMPLÈTE SIMPLE
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

  // =================== SCROLL CONTENT ===================
  modernScrollContent: {
    paddingTop: 20,
  },

  modernIntro: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  modernIntroText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },

  // =================== NIVEAUX CONTAINER ===================
  modernLevelsContainer: {
    paddingHorizontal: 20,
  },

  // =================== CARDS DE NIVEAUX ===================
  modernCard: {
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

  modernCardContent: {
    padding: 20,
  },

  // =================== HEADER DE CARD ===================
  modernCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  modernTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  modernTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 12,
  },

  modernBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  modernBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },

  modernIcon: {
    fontSize: 24,
  },

  // =================== PROGRESSION ===================
  modernProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },

  modernProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden',
  },

  modernProgressFill: {
    height: 6,
    borderRadius: 3,
  },

  modernProgressText: {
    fontSize: 12,
    fontWeight: '500',
    minWidth: 30,
  },

  // =================== BOUTON ===================
  modernButton: {
    marginTop: 4,
  },
});