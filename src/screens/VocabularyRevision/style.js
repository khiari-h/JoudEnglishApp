// src/screens/VocabularyRevision/style.js - STYLES PROPRES ET MODERNES
import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  // =================== CONTAINER ===================
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  // =================== HEADER PROPRE ===================
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 16,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  backButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },

  headerCenter: {
    alignItems: 'center',
  },

  questionCounter: {
    fontSize: 18,
    fontWeight: '700',
  },

  totalQuestions: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 2,
  },

  scoreChip: {
    minWidth: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  scoreChipText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },

  // =================== PROGRESS ===================
  progressSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
  },

  progressBarQuiz: {
    height: 6,
    borderRadius: 3,
  },

  progressText: {
    fontSize: 14,
    fontWeight: '600',
    minWidth: 40,
    textAlign: 'right',
  },

  // =================== QUESTION ===================
  questionSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },

  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderTopWidth: 4,
    borderTopColor: '#3B82F6', // or your intended color
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.07,
        shadowRadius: 16,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  questionLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },

  questionLabelIcon: {
    fontSize: 20,
  },

  questionLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6B7280',
  },

  wordToTranslate: {
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },

  levelInfo: {
    fontSize: 12,
    fontWeight: '500',
    fontStyle: 'italic',
  },

  // =================== CHOIX (REDESIGN) ===================
  choicesSection: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 16,
    justifyContent: 'center', // Pour centrer les choix s'ils sont peu nombreux
    paddingBottom: 20,
  },

  choiceButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
    overflow: 'hidden',
  },

  choiceButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    gap: 16,
  },

  choiceNumberContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  choiceNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6B7280',
  },

  choiceText: {
    fontSize: 17,
    fontWeight: '600',
    flex: 1,
  },

  choiceSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },

  choiceCorrect: {
    borderColor: '#10B981',
    backgroundColor: '#DCFCE7',
  },

  choiceWrong: {
    borderColor: '#EF4444',
    backgroundColor: '#FEE2E2',
  },

  choiceTextCorrect: {
    color: '#059669',
  },
  choiceTextWrong: {
    color: '#DC2626',
  },

  choiceIcon: {
    fontSize: 24,
    fontWeight: '700',
  },

  // =================== FEEDBACK & ACTION FOOTER ===================
  feedbackContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 16, // Espace entre le message et le bouton
  },

  feedbackMessageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  feedbackIcon: {
    fontSize: 20,
  },

  feedbackText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  continueButton: {
    flexDirection: 'row', // Pour aligner le texte et l'icône
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  continueButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 8, // Espace entre le texte et l'icône
  },

  continueButtonIcon: {
    fontSize: 22,
    color: '#FFFFFF',
  },

  // =================== RÉSULTATS MODERNES ===================
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },

  resultEmoji: {
    fontSize: 64,
    marginBottom: 24,
  },

  resultTitle: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },

  resultMessage: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },

  // =================== SCORE CARD MODERNE ===================
  scoreCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
    minWidth: width * 0.7,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
      },
      android: {
        elevation: 8,
      },
    }),
  },

  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },

  scoreNumber: {
    fontSize: 48,
    fontWeight: '900',
  },

  scoreSlash: {
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 4,
  },

  progressBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden',
  },

  progressFill: {
    height: 8,
    borderRadius: 4,
  },

  percentageText: {
    fontSize: 18,
    fontWeight: '700',
  },

  sourceText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 32,
    fontStyle: 'italic',
  },

  // =================== BOUTONS MODERNES ===================
  buttonsContainer: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
    maxWidth: 320,
  },

  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6, // ✅ Réduit de 8 à 6
  },

  restartButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 16, // ✅ Réduit de 20 à 16
    borderWidth: 2,
    borderColor: '#E5E7EB',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  restartIcon: {
    fontSize: 16, // ✅ Réduit de 18 à 16
  },

  restartText: {
    fontSize: 15, // ✅ Réduit de 16 à 15
    fontWeight: '600',
    color: '#1F2937',
  },

  finishButton: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 16, // ✅ Réduit de 20 à 16
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  finishIcon: {
    fontSize: 16, // ✅ Réduit de 18 à 16
    color: '#FFFFFF',
  },

  finishText: {
    fontSize: 15, // ✅ Réduit de 16 à 15
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // =================== EMPTY STATE ===================
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },

  emptyEmoji: {
    fontSize: 64,
    marginBottom: 24,
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },

  emptyMessage: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },

  emptyButton: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});