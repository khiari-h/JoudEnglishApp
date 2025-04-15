import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.8,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderTopWidth: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1e293b',
  },
  detailSection: {
    marginBottom: 15,
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 10,
  },
  detailLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  },
  detailText: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 22,
  },
  exampleItem: {
    marginBottom: 10,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#e0e0e0',
  },
  exampleText: {
    fontSize: 15,
    color: '#0f172a',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  exampleTranslation: {
    fontSize: 14,
    color: '#64748b',
  },
  closeButton: {
    marginTop: 15,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default styles;