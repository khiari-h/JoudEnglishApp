import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Styles pour le modal
  modalCustomContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  modalCustomBody: {
    padding: 0,
  },
  modalInnerContent: {
    padding: 16,
  },
  modalFooter: {
    padding: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    backgroundColor: '#f5f5f5',
  },
  modalFooterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  detailSection: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  exampleItem: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  exampleText: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  exampleTranslation: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
  },
});

export default styles;