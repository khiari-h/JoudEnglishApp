// src/components/screens/exercises/errorCorrection/ErrorCorrectionExerciseCard/style.js
import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    margin: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  scrollContent: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  exerciseTypeLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
  },
  // Styles pour le mode de correction complète
  fullCorrectionContainer: {
    marginBottom: 16,
  },
  originalTextContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  originalTextLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 8,
  },
  originalText: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 24,
  },
  correctionInput: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#334155',
    minHeight: 120,
    textAlignVertical: 'top',
    lineHeight: 24,
  },
  correctInput: {
    borderColor: '#10b981',
    backgroundColor: '#f0fdf4',
  },
  incorrectInput: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  // Styles pour le mode d'identification d'erreurs
  identifyContainer: {
    marginBottom: 16,
  },
  instructionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 12,
  },
  wordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
  },
  word: {
    marginHorizontal: 4,
    marginVertical: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedWord: {
    borderWidth: 1,
  },
  highlightedWord: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  wordText: {
    fontSize: 16,
    color: '#334155',
  },
  highlightedWordText: {
    color: '#ef4444',
    fontWeight: '600',
  },
  identifyHelp: {
    fontSize: 14,
    color: '#64748b',
    fontStyle: 'italic',
    marginTop: 12,
    textAlign: 'center',
  },
  // Styles pour le mode choix multiple
  multipleChoiceContainer: {
    marginBottom: 16,
  },
  choicesLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 12,
  },
  choicesContainer: {
    marginBottom: 16,
  },
  choiceOption: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  selectedChoiceOption: {
    backgroundColor: '#eff6ff',
    borderWidth: 2,
  },
  correctChoiceOption: {
    backgroundColor: '#f0fdf4',
    borderWidth: 2,
    borderColor: '#10b981',
  },
  incorrectChoiceOption: {
    backgroundColor: '#fef2f2',
    borderWidth: 2,
    borderColor: '#ef4444',
  },
  choiceOptionText: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 24,
  },
  correctChoiceOptionText: {
    color: '#10b981',
    fontWeight: '600',
  },
  incorrectChoiceOptionText: {
    color: '#ef4444',
    fontWeight: '600',
  },
  // Styles pour le bouton d'indice et feedback
  hintButtonContainer: {
    marginVertical: 12,
    alignItems: 'center',
  },
  feedbackContainer: {
    marginTop: 16,
  },
});

export default styles;
