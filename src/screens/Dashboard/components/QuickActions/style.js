// src/screens/Dashboard/components/QuickActions/style.js - VERSION AVEC DEBUG
import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  // =================== CONTAINER ===================
  container: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: -0.3,
  },

  // =================== 🔍 DEBUG SECTION ===================
  debugSection: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },

  debugTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 12,
  },

  // Debug Error
  debugError: {
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#EF4444',
  },

  debugErrorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DC2626',
    marginBottom: 4,
  },

  debugErrorDetails: {
    fontSize: 12,
    color: '#7F1D1D',
    fontStyle: 'italic',
  },

  // Debug Success
  debugSuccess: {
    backgroundColor: '#ECFDF5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#10B981',
  },

  debugSuccessText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#059669',
    marginBottom: 4,
  },

  debugReasonText: {
    fontSize: 12,
    color: '#047857',
    marginBottom: 4,
  },

  debugAvailableText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#059669',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },

  debugUnavailableText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#D97706',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },

  // Debug Loading
  debugLoading: {
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
  },

  debugLoadingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
  },

  // Debug Levels
  debugLevels: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },

  debugLevelsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },

  debugLevelText: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 2,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },

  // Debug Comparison
  debugComparison: {
    backgroundColor: '#EDE9FE',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#8B5CF6',
  },

  debugComparisonTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B21A8',
    marginBottom: 6,
  },

  debugComparisonText: {
    fontSize: 11,
    color: '#7C3AED',
    marginBottom: 2,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },

  // =================== ACTIONS LAYOUT ===================
  actionsRow: {
    gap: 12,
  },

  // =================== ACTION BUTTON ===================
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
    borderWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.04)",
    position: 'relative',
  },

  actionButtonDisabled: {
    opacity: 0.6,
  },

  // =================== ICÔNE ===================
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  actionIconText: {
    fontSize: 20,
  },

  // =================== CONTENU TEXTE ===================
  actionContent: {
    flex: 1,
  },

  actionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
    letterSpacing: -0.2,
  },

  actionSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    opacity: 0.8,
  },

  // =================== BADGE INFORMATIF ===================
  infoBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },

  infoText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6B7280',
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },

  // =================== FLÈCHE NAVIGATION ===================
  arrowContainer: {
    marginLeft: 12,
  },

  arrowText: {
    fontSize: 18,
    fontWeight: '600',
    opacity: 0.6,
  },

  // =================== RESPONSIVE ===================
  '@media (max-width: 350)': {
    container: {
      paddingHorizontal: 16,
    },

    debugSection: {
      padding: 12,
      marginBottom: 12,
    },

    debugTitle: {
      fontSize: 14,
      marginBottom: 10,
    },

    debugLevelText: {
      fontSize: 10,
    },

    actionButton: {
      padding: 14,
    },

    actionIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 14,
    },

    actionIconText: {
      fontSize: 18,
    },

    actionLabel: {
      fontSize: 15,
    },

    actionSubtitle: {
      fontSize: 12,
    },
  },
});