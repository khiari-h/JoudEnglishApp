// src/components/exercise-common/HintButton/styles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const modalWidth = width * 0.85;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  hintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  hintButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  disabledHintButton: {
    borderColor: '#D1D5DB',
    backgroundColor: '#F9FAFB',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: modalWidth,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIcon: {
    marginRight: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 16,
  },
  revealContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  revealText: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 16,
  },
  revealButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  revealButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  hintContentContainer: {
    paddingVertical: 10,
  },
  hintText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1F2937',
  },
});

export default styles;