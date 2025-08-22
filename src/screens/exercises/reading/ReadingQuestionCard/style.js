// ReadingQuestionCard/style.js - VERSION STYLE GRAMMAR avec design micro 🎯
import { StyleSheet, Platform } from 'react-native';

const createStyles = (levelColor = '#3B82F6') => StyleSheet.create({
  container: {
    marginBottom: 24,
  },

  // Question Header
  questionHeader: {
    marginBottom: 16,
  },

  questionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },

  // Question Section avec style "micro"
  questionSection: {
    backgroundColor: '#FEF3C7',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  sectionIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
  },

  questionText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#374151',
    lineHeight: 24,
    letterSpacing: 0.2,
  },

  // Options Container
  optionsContainer: {
    marginTop: 16,
    gap: 12,
  },

  optionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
    textAlign: 'center',
  },

  // =================== RADIO BUTTONS IDENTIQUES À GRAMMAR ===================
  optionContainer: {
    marginBottom: 8,
  },

  optionGradient: {
    borderRadius: 20,
    overflow: 'hidden',
  },

  optionInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    // backgroundColor: 'white', // SUPPRIMÉ pour que le gradient soit visible
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    // Transition iOS simulée avec l'ombre qui change
    ...Platform.select({
      ios: {
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
      },
    }),
  },

  optionIconContainer: {
    marginRight: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937', // Noir sur fond blanc (neutre)
    flex: 1,
    letterSpacing: 0.3,
  },

  // États de texte avec couleurs cohérentes du prototype
  selectedOptionText: {
    color: 'white', // Blanc sur fond bleu (sélectionné)
    fontWeight: '600',
  },

  correctOptionText: {
    color: 'white', // Blanc sur fond vert (correct)
    fontWeight: '600',
  },

  incorrectOptionText: {
    color: 'white', // Blanc sur fond rouge (incorrect)
    fontWeight: '600',
  },
});

export default createStyles;