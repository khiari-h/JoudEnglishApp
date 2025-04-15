import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  phraseCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 16,
  },
  phraseEnglish: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  phraseTranslation: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 16,
  },
  detailsButton: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  detailsButtonText: {
    fontSize: 16,
    fontWeight: '600',
  }
});

export default styles;