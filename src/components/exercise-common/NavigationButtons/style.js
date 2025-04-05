// src/components/exercise-common/NavigationButtons/styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Styles pour la variante standard
  standardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  previousButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  previousButtonText: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 4,
  },
  skipButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  skipButtonText: {
    fontSize: 14,
    color: '#6B7280',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 8,
  },
  disabledButton: {
    backgroundColor: '#D1D5DB',
  },
  
  // Styles pour la variante compacte
  compactContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  compactButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  compactButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    marginHorizontal: 12,
  },
  disabledCompactButton: {
    opacity: 0.5,
  },
  progressIndicator: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B5563',
    paddingHorizontal: 16,
  },
  compactSkipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  compactSkipButtonText: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 4,
  },
  
  // Styles pour la variante centrée
  centeredContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  centeredNextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    justifyContent: 'center',
    marginBottom: 12,
    width: '80%',
  },
  centeredNextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 8,
  },
  centeredPreviousButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  centeredPreviousButtonText: {
    fontSize: 16,
    color: '#6B7280',
  },
  centeredSkipButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  centeredSkipButtonText: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default styles;