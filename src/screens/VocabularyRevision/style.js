// src/screens/VocabularyRevision/style.js
import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  // =================== CONTAINER ===================
  container: {
    flex: 1,
  },

  // =================== HEADER ===================
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  buttonIcon: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },

  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  titleEmoji: {
    fontSize: 20,
  },

  titleText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },

  // =================== PROGRESS SECTION ===================
  progressSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },

  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  progressText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '500',
  },

  scoreText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },

  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },

  progressFill: {
    height: 6,
    backgroundColor: 'white',
    borderRadius: 3,
    ...Platform.select({
      ios: {
        shadowColor: "#fff",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
    }),
  },

  // =================== REVISION INFO ===================
  revisionInfo: {
    alignItems: 'center',
    marginTop: 8,
  },

  revisionInfoText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },

  // =================== CONTENT ===================
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },

  // =================== QUESTION CARD ===================
  questionCard: {
    borderRadius: 16,
    padding: 32,
    marginBottom: 24,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
      },
      android: {
        elevation: 12,
      },
    }),
    borderWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.06)",
  },

  questionType: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },

  questionWord: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.5,
    textAlign: 'center',
    lineHeight: 38,
  },

  questionInstruction: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
  },

  questionSource: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 8,
    opacity: 0.7,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // =================== CHOICES GRID ===================
  choicesGrid: {
    flex: 1,
    gap: 12,
    marginBottom: 24,
  },

  choiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    gap: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  choiceSelected: {
    borderColor: '#8B5CF6',
    backgroundColor: 'rgba(139, 92, 246, 0.05)',
    ...Platform.select({
      ios: {
        shadowColor: "#8B5CF6",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  choiceCorrect: {
    borderColor: '#10B981',
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
    ...Platform.select({
      ios: {
        shadowColor: "#10B981",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  choiceWrong: {
    borderColor: '#EF4444',
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
    ...Platform.select({
      ios: {
        shadowColor: "#EF4444",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  choiceLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },

  choiceLetterCorrect: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },

  choiceLetterWrong: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },

  choiceLetterText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280',
  },

  choiceLetterTextSelected: {
    color: 'white',
  },

  choiceLetterTextCorrect: {
    color: 'white',
  },

  choiceLetterTextWrong: {
    color: 'white',
  },

  choiceText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },

  feedbackIcon: {
    fontSize: 20,
    marginLeft: 8,
  },

  // =================== ACTION BUTTON ===================
  actionButton: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
      },
      android: {
        elevation: 8,
      },
    }),
  },

  actionButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.3,
  },

  // =================== LOADING STATE ===================
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  loadingText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: -0.2,
  },

  loadingSubtext: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.8,
    lineHeight: 20,
  },

  // =================== FINISH SCREEN ===================
  finishContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },

  finishEmoji: {
    fontSize: 64,
    marginBottom: 24,
    textAlign: 'center',
  },

  finishTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },

  finishMessage: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },

  scoreContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    minWidth: 160,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  scoreText: {
    color: 'white',
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -1,
    marginBottom: 4,
  },

  scorePercentage: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 18,
    fontWeight: '600',
  },

  // =================== SOURCE INFO ===================
  sourceInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    alignItems: 'center',
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

  sourceText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },

  finishButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  finishButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: -0.2,
  },

  // =================== RESPONSIVE DESIGN ===================
  '@media (max-width: 350)': {
    content: {
      paddingHorizontal: 16,
    },

    questionCard: {
      padding: 24,
    },

    questionWord: {
      fontSize: 28,
    },

    choiceButton: {
      padding: 16,
      gap: 12,
    },

    choiceText: {
      fontSize: 16,
    },

    finishContainer: {
      paddingHorizontal: 24,
    },

    finishTitle: {
      fontSize: 24,
    },

    scoreText: {
      fontSize: 32,
    },

    loadingText: {
      fontSize: 15,
    },

    loadingSubtext: {
      fontSize: 13,
    },

    sourceText: {
      fontSize: 11,
    },

    revisionInfoText: {
      fontSize: 11,
    },

    questionSource: {
      fontSize: 10,
    },
  },

  '@media (max-height: 700)': {
    progressSection: {
      paddingBottom: 20,
    },

    questionCard: {
      padding: 24,
      marginBottom: 20,
    },

    choicesGrid: {
      marginBottom: 20,
    },

    finishContainer: {
      paddingHorizontal: 24,
    },

    scoreContainer: {
      marginBottom: 12,
      padding: 20,
    },

    sourceInfo: {
      marginBottom: 12,
    },
  },

  // =================== ANIMATIONS ===================
  slideIn: {
    opacity: 1,
    transform: [{ translateY: 0 }],
  },

  slideOut: {
    opacity: 0,
    transform: [{ translateY: 20 }],
  },

  fadeIn: {
    opacity: 1,
  },

  fadeOut: {
    opacity: 0,
  },

  // =================== ACCESSIBILITY ===================
  accessibleButton: {
    // Géré automatiquement par React Native
  },

  focusable: {
    // Géré automatiquement par React Native
  },
});