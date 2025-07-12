// src/components/settings/RevisionSettings/style.js
import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F8FAFC',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    color: '#1F2937',
  },

  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  toggleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },

  frequencySection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  frequencyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color: '#374151',
  },

  frequencyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },

  frequencyOptionSelected: {
    backgroundColor: '#E3F2FD',
    borderWidth: 2,
    borderColor: '#2196F3',
  },

  frequencyOptionDefault: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E0E0E0',
  },

  frequencyText: {
    flex: 1,
    fontSize: 15,
  },

  frequencyTextSelected: {
    color: '#1976D2',
    fontWeight: '600',
  },

  frequencyTextDefault: {
    color: '#333',
  },

  checkIcon: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '700',
  },

  nextRevisionInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 15,
    fontStyle: 'italic',
    textAlign: 'center',
  },

  disabledWarning: {
    backgroundColor: '#FFF3E0',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
    marginTop: 20,
  },

  warningTitle: {
    color: '#E65100',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5,
  },

  warningMessage: {
    color: '#BF360C',
    fontSize: 14,
    lineHeight: 20,
  },

  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
});