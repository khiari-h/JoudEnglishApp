// src/components/modals/RevisionPreferencesModal/style.js
import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  // =================== OVERLAY & MODAL ===================
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  modalContainer: {
    width: width * 0.92,
    maxWidth: 380,
    maxHeight: height * 0.95,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.3,
        shadowRadius: 30,
      },
      android: {
        elevation: 20,
      },
    }),
  },

  // =================== HEADER ===================
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    position: 'relative',
  },

  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 16,
  },

  headerIcon: {
    fontSize: 32,
    marginBottom: 8,
  },

  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.5,
  },

  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },

  // =================== CONTENT ===================
  content: {
    padding: 16,
    flex: 1,
  },

  section: {
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
    letterSpacing: -0.3,
  },

  sectionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },

  // =================== STYLES CONTAINER ===================
  stylesContainer: {
    gap: 12,
  },

  styleCard: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  styleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  styleIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },

  styleInfo: {
    flex: 1,
  },

  styleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
    letterSpacing: -0.2,
  },

  styleSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },

  styleDescription: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
    lineHeight: 16,
  },

  selectedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  selectedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },

  // =================== SUMMARY ===================
  summary: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },

  summaryWarning: {
    backgroundColor: '#FEF3C7',
    borderLeftColor: '#F59E0B',
  },

  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 8,
    letterSpacing: -0.2,
  },

  summaryTitleWarning: {
    color: '#92400E',
  },

  summaryText: {
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 4,
    lineHeight: 20,
  },

  summaryTextWarning: {
    color: '#78350F',
  },

  summaryHighlight: {
    fontWeight: '700',
    color: '#3B82F6',
  },

  summaryNote: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
    marginTop: 8,
    lineHeight: 16,
  },

  summaryNoteWarning: {
    color: '#92400E',
  },

  // =================== BUTTONS ===================
  buttons: {
    gap: 12,
  },

  confirmButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.3,
  },

  skipButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  skipButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.1,
  },

  // =================== RESPONSIVE ===================
  '@media (max-width: 350)': {
    modalContainer: {
      width: width * 0.96,
      maxWidth: 340,
    },

    header: {
      paddingVertical: 16,
      paddingHorizontal: 12,
    },

    content: {
      padding: 12,
    },

    headerTitle: {
      fontSize: 22,
    },

    headerSubtitle: {
      fontSize: 15,
    },

    styleCard: {
      padding: 10,
    },

    styleTitle: {
      fontSize: 15,
    },

    styleSubtitle: {
      fontSize: 12,
    },

    summaryTitle: {
      fontSize: 15,
    },

    summaryText: {
      fontSize: 13,
    },

    section: {
      marginBottom: 12,
    },

    summary: {
      padding: 10,
      marginBottom: 12,
    },

    closeButton: {
      top: 12,
      right: 8,
      width: 28,
      height: 28,
      borderRadius: 14,
    },

    closeButtonText: {
      fontSize: 14,
    },
  },

  '@media (max-height: 700)': {
    modalContainer: {
      maxHeight: height * 0.98,
    },

    header: {
      paddingVertical: 16,
    },

    content: {
      padding: 12,
    },

    section: {
      marginBottom: 12,
    },

    summary: {
      marginBottom: 12,
      padding: 10,
    },

    styleCard: {
      padding: 10,
    },

    closeButton: {
      top: 12,
      right: 12,
      width: 28,
      height: 28,
      borderRadius: 14,
    },

    closeButtonText: {
      fontSize: 14,
    },
  },

  // =================== ACCESSIBILITY ===================
  accessibleButton: {
    // Géré automatiquement par React Native
  },

  focusable: {
    // Géré automatiquement par React Native
  },
});