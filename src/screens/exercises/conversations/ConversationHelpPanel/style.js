import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#334155',
  },
  helpText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  helpButton: {
    alignSelf: 'flex-start',
    padding: 8,
    margin: 16,
  },
  helpButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default styles;
