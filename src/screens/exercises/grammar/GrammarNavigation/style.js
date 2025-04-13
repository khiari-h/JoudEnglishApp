import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  actionContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  actionButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#e2e8f0',
  },
  enabledButton: {
    backgroundColor: '#3b82f6',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    padding: 14,
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prevButton: {
    marginRight: 10,
  },
  nextButton: {
    marginLeft: 10,
  },
  retryButton: {
    marginRight: 10,
  },
  skipButton: {
    marginLeft: 10,
  },
  navButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;