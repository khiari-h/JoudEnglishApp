// src/screens/Dashboard/components/QuickActions/style.js
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

  // =================== ACTIONS LAYOUT ===================
  actionsRow: {
    gap: 12, // Espace entre les boutons
  },

  // =================== ACTION BUTTON ===================
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    // Ombres subtiles
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

  // =================== ACCESSIBILITY ===================
  actionButtonFocused: {
    borderWidth: 2,
    borderColor: '#3B82F6',
  },

  // =================== ANIMATIONS ===================
  actionButtonPressed: {
    transform: [{ scale: 0.98 }],
  },

  // =================== UTILS ===================
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  flexRow: {
    flexDirection: 'row',
  },

  flex1: {
    flex: 1,
  },
});