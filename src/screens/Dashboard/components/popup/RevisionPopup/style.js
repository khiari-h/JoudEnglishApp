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
    maxWidth: 400,
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
  },

  // =================== HEADER SECTION ===================
  header: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 24,
    paddingHorizontal: 24,
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

  // =================== BUTTONS ===================
  buttonsContainer: {
    gap: 16,
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

  secondaryButtons: {
    flexDirection: 'row',
    gap: 12,
  },

  secondaryButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.1,
  },

  // =================== RESPONSIVE ===================
  '@media (max-width: 350)': {
    popupContainer: {
      width: width * 0.95,
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
    },

    statsContainer: {
      padding: 16,
    },

    statNumber: {
      fontSize: 20,
    },

    primaryButton: {
      paddingVertical: 16,
    },

    secondaryButton: {
      paddingVertical: 12,
    },
  },

  '@media (max-height: 700)': {
    header: {
      paddingTop: 24,
      paddingBottom: 16,
    },

    content: {
      padding: 20,
    },

    benefitsList: {
      marginBottom: 24,
    },

    statsContainer: {
      marginBottom: 20,
    },
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

  // =================== ACCESSIBILITY ===================
  accessibleButton: {
    // Sera géré par React Native automatiquement
  },

  // =================== LANDSCAPE MODE ===================
  '@media (orientation: landscape)': {
    popupContainer: {
      width: width * 0.7,
      maxWidth: 500,
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
});