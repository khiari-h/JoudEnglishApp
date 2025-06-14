// src/screens/VocabularyRevision/style.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // =================== CONTAINER ===================
  container: {
    flex: 1,
    padding: 20,
  },

  // =================== HEADER ===================
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 20,
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },

  questionCounter: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  currentScore: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  // =================== PROGRESS ===================
  progressContainer: {
    marginBottom: 32,
  },

  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },

  progressFill: {
    height: 4,
    backgroundColor: 'white',
    borderRadius: 2,
  },

  // =================== QUESTION CARD ===================
  questionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  wordToTranslate: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 8,
    textAlign: 'center',
  },

  instruction: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
  },

  wordSource: {
    fontSize: 12,
    color: '#a0aec0',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },

  // =================== CHOICES ===================
  choicesContainer: {
    flex: 1,
    gap: 12,
  },

  choiceButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  choiceSelected: {
    backgroundColor: '#667eea',
    transform: [{ scale: 1.02 }],
  },

  choiceCorrect: {
    backgroundColor: '#48bb78',
  },

  choiceWrong: {
    backgroundColor: '#f56565',
  },

  choiceText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a202c',
    flex: 1,
  },

  choiceTextCorrect: {
    color: 'white',
  },

  choiceTextWrong: {
    color: 'white',
  },

  feedbackIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },

  // =================== RESULT SCREEN ===================
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  resultEmoji: {
    fontSize: 64,
    marginBottom: 24,
  },

  resultTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },

  resultMessage: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },

  scoreContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
    minWidth: 120,
  },

  scoreText: {
    color: 'white',
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 4,
  },

  percentageText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 18,
    fontWeight: '600',
  },

  // =================== BUTTONS ===================
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },

  primaryButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  primaryButtonText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },

  secondaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});