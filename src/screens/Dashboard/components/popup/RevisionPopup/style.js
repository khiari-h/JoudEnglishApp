// src/components/popups/RevisionPopup/style.js
import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  // =================== OVERLAY ===================
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40, // Ajout padding vertical
  },

  // =================== CONFETTI ANIMATION ===================
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    pointerEvents: 'none',
  },

  confettiEmoji: {
    position: 'absolute',
    fontSize: 24,
    top: 20,
  },

  // =================== POPUP CONTAINER ===================
  popupContainer: {
    width: width * 0.9,
    maxWidth: 420,
    maxHeight: height * 0.9, // ✅ Ajout contrainte hauteur
    minHeight: height * 0.5, // ✅ Hauteur minimum
    borderRadius: 24,
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

  gradientBackground: {
    borderRadius: 24,
    flex: 1, // ✅ Ajout flex pour occuper tout l'espace
  },

  // =================== HEADER SECTION ===================
  header: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 24,
    paddingHorizontal: 24,
    flexShrink: 0, // ✅ Empêche le header de se compresser
  },

  emojiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },

  mainEmoji: {
    fontSize: 48,
    textAlign: 'center',
  },

  sideEmoji: {
    fontSize: 20,
    position: 'absolute',
    right: -8,
    top: -8,
  },

  congratsTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  achievementText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  // =================== CONTENT SECTION ===================
  content: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    marginTop: 8,
    flex: 1, // ✅ Prend l'espace disponible
    justifyContent: 'space-between', // ✅ Distribue l'espace
  },

  // ✅ Container scrollable pour le contenu
  scrollableContent: {
    flex: 1,
  },

  motivationText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 26,
  },

  // =================== STATS CONTAINER ===================
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  statItem: {
    alignItems: 'center',
    flex: 1,
  },

  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: -0.5,
  },

  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
  },

  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 20,
  },

  // =================== BENEFITS LIST ===================
  benefitsList: {
    marginBottom: 32,
    flexShrink: 0, // ✅ Empêche la compression
  },

  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },

  benefitIcon: {
    fontSize: 16,
    marginRight: 12,
    width: 20,
    textAlign: 'center',
  },

  benefitText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    lineHeight: 20,
  },

  // =================== BUTTONS CONTAINER ===================
  buttonsContainer: {
    gap: 16,
    flexShrink: 0, // ✅ Les boutons gardent leur taille
    paddingTop: 16, // ✅ Espace au dessus des boutons
  },

  primaryButton: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: "#8B5CF6",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },

  primaryButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.3,
  },

  // =================== DELAY BUTTONS GRID ===================
  delayButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  delayButton: {
    flex: 1,
    minWidth: '48%',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  delayButtonSnooze: {
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B',
  },

  delayButtonPostpone: {
    backgroundColor: '#DBEAFE',
    borderColor: '#3B82F6',
  },

  delayButtonIgnore: {
    backgroundColor: '#FEE2E2',
    borderColor: '#EF4444',
  },

  delayButtonClose: {
    backgroundColor: '#F3F4F6',
    borderColor: '#6B7280',
  },

  delayButtonIcon: {
    fontSize: 16,
    marginBottom: 4,
  },

  delayButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
    textAlign: 'center',
  },

  delayButtonSubtext: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'center',
  },

  // =================== RESPONSIVE DESIGN ===================
  // ✅ Petits écrans
  '@media (max-width: 350)': {
    overlay: {
      paddingHorizontal: 16,
      paddingVertical: 30,
    },

    popupContainer: {
      width: width * 0.95,
      maxWidth: 350,
      maxHeight: height * 0.92,
      minHeight: height * 0.6,
    },

    header: {
      paddingTop: 24,
      paddingBottom: 20,
      paddingHorizontal: 20,
    },

    content: {
      padding: 20,
    },

    congratsTitle: {
      fontSize: 24,
    },

    motivationText: {
      fontSize: 16,
      marginBottom: 20,
    },

    statsContainer: {
      padding: 16,
      marginBottom: 20,
    },

    statNumber: {
      fontSize: 20,
    },

    benefitsList: {
      marginBottom: 24,
    },

    primaryButton: {
      paddingVertical: 16,
    },

    delayButton: {
      paddingVertical: 10,
      paddingHorizontal: 6,
    },

    delayButtonText: {
      fontSize: 11,
    },

    delayButtonSubtext: {
      fontSize: 9,
    },
  },

  // ✅ Écrans courts (hauteur limitée)
  '@media (max-height: 700)': {
    overlay: {
      paddingVertical: 20,
    },

    popupContainer: {
      maxHeight: height * 0.95,
      minHeight: height * 0.7,
    },

    header: {
      paddingTop: 20,
      paddingBottom: 16,
    },

    content: {
      padding: 16,
    },

    motivationText: {
      fontSize: 16,
      marginBottom: 16,
    },

    benefitsList: {
      marginBottom: 20,
    },

    statsContainer: {
      marginBottom: 16,
      padding: 16,
    },

    buttonsContainer: {
      gap: 12,
      paddingTop: 12,
    },

    delayButton: {
      paddingVertical: 8,
    },

    delayButtonText: {
      fontSize: 11,
    },

    delayButtonSubtext: {
      fontSize: 9,
    },
  },

  // ✅ Très petits écrans (hauteur critique)
  '@media (max-height: 600)': {
    overlay: {
      paddingVertical: 10,
    },

    popupContainer: {
      maxHeight: height * 0.98,
      minHeight: height * 0.8,
    },

    header: {
      paddingTop: 16,
      paddingBottom: 12,
    },

    congratsTitle: {
      fontSize: 22,
      marginBottom: 6,
    },

    achievementText: {
      fontSize: 14,
    },

    content: {
      padding: 12,
    },

    motivationText: {
      fontSize: 15,
      marginBottom: 12,
    },

    statsContainer: {
      padding: 12,
      marginBottom: 12,
    },

    statNumber: {
      fontSize: 18,
    },

    statLabel: {
      fontSize: 10,
    },

    benefitsList: {
      marginBottom: 16,
    },

    benefitItem: {
      marginBottom: 8,
    },

    benefitText: {
      fontSize: 12,
    },

    buttonsContainer: {
      gap: 8,
      paddingTop: 8,
    },

    primaryButton: {
      paddingVertical: 12,
    },

    primaryButtonText: {
      fontSize: 15,
    },

    delayButton: {
      paddingVertical: 6,
      paddingHorizontal: 4,
    },

    delayButtonIcon: {
      fontSize: 14,
      marginBottom: 2,
    },

    delayButtonText: {
      fontSize: 10,
      marginBottom: 1,
    },

    delayButtonSubtext: {
      fontSize: 8,
    },
  },

  // =================== LANDSCAPE MODE ===================
  '@media (orientation: landscape)': {
    overlay: {
      paddingVertical: 20,
    },

    popupContainer: {
      width: width * 0.8,
      maxWidth: 500,
      maxHeight: height * 0.9,
      minHeight: height * 0.7,
    },

    header: {
      paddingTop: 20,
      paddingBottom: 16,
    },

    content: {
      padding: 20,
    },

    statsContainer: {
      marginBottom: 20,
    },

    benefitsList: {
      marginBottom: 20,
    },
  },

  // =================== ACCESSIBILITY ===================
  accessibleButton: {
    // Géré automatiquement par React Native
  },

  // =================== ANIMATIONS HELPERS ===================
  fadeIn: {
    opacity: 1,
  },

  fadeOut: {
    opacity: 0,
  },

  scaleIn: {
    transform: [{ scale: 1 }],
  },

  scaleOut: {
    transform: [{ scale: 0.8 }],
  },
});