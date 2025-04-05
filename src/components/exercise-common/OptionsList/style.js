// src/components/exercise-common/OptionsList/styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Styles pour la mise en page verticale
  verticalContainer: {
    marginVertical: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: 'white',
  },
  optionItemText: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  
  // Styles pour la mise en page en grille
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  gridOptionItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: 'white',
  },
  gridOptionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#1F2937',
  },
  
  // Styles communs pour les états des options
  option: {
    borderColor: '#E5E7EB',
    backgroundColor: 'white',
  },
  selectedOption: {
    borderWidth: 2,
    backgroundColor: '#F9FAFB',
  },
  correctOption: {
    borderWidth: 2,
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  incorrectOption: {
    borderWidth: 2,
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  optionText: {
    color: '#1F2937',
  },
  selectedOptionText: {
    fontWeight: '600',
  },
  correctOptionText: {
    color: '#047857',
    fontWeight: '600',
  },
  incorrectOptionText: {
    color: '#B91C1C',
    fontWeight: '600',
  },
  selectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
});

export default styles;