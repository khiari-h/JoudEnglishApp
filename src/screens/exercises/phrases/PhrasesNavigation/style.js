import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  navigationButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previousButton: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  nextButton: {
    backgroundColor: '#5E60CE',
  },
  navigationButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  }
});

export default styles;