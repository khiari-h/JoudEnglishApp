import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 16,
  },

  // Styles pour la section d'introduction
  introSection: {
    marginBottom: 24,
  },
  introText: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
    textAlign: 'center',
  },

  // Styles pour les cartes de niveau
  levelsContainer: {
    marginBottom: 20,
  },
  levelCard: {
    marginBottom: 16,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
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
    padding: 16,
  },
  levelDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },

  // Styles pour la barre de progression
  progressBar: {
    marginBottom: 16,
  },

  // Styles pour le bouton
  startButton: {
    marginTop: 4,
  },
});
