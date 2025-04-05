// src/components/exercise-common/WordCard/styles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = width - 40;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    marginVertical: 20,
  },
  card: {
    position: 'absolute',
    width: cardWidth,
    minHeight: 250,
    borderRadius: 16,
    padding: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    backfaceVisibility: 'hidden',
  },
  frontCard: {
    zIndex: 1,
  },
  backCard: {
    zIndex: 0,
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  word: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  phonetic: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  audioButton: {
    padding: 10,
    borderRadius: 30,
    marginVertical: 8,
  },
  contextButton: {
    alignItems: 'center',
    paddingVertical: 8,
    marginVertical: 10,
  },
  contextButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  contextContainer: {
    marginVertical: 16,
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  contextTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 6,
  },
  contextText: {
    fontSize: 15,
    color: '#1F2937',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  translationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 10,
  },
  translation: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 30,
  },
  flipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 'auto',
  },
  flipButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 8,
  },
});

export default styles;