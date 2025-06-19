// src/screens/Dashboard/components/QuickActions/style.js - VERSION COMPLÈTE SIMPLE
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

  loadingText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 20,
  },

  // =================== ACTIONS LAYOUT ===================
  actionsGrid: {
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
  },

  actionButtonDisabled: {
    opacity: 0.5,
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

  // =================== CONTENU ===================
  actionContent: {
    flex: 1,
  },

  actionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },

  actionSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    opacity: 0.8,
  },

  // =================== FLÈCHE ===================
  arrow: {
    fontSize: 18,
    fontWeight: '600',
    opacity: 0.6,
    marginLeft: 12,
  },
});