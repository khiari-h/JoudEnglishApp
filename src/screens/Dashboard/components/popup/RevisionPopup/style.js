// src/components/popups/RevisionPopup/style.js - VERSION SIMPLE
import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  // =================== OVERLAY ===================
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  // =================== POPUP ===================
  popupContainer: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
      },
      android: {
        elevation: 10,
      },
    }),
  },

  gradientBackground: {
    borderRadius: 20,
  },

  // =================== HEADER ===================
  header: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },

  mainEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },

  congratsTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },

  achievementText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },

  // =================== CONTENT ===================
  content: {
    backgroundColor: 'white',
    padding: 20,
  },

  motivationText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1F2937',
  },

  // =================== STATS ===================
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },

  statItem: {
    alignItems: 'center',
    flex: 1,
  },

  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#8B5CF6',
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
  },

  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },

  // =================== BUTTONS ===================
  buttonsContainer: {
    gap: 12,
  },

  primaryButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },

  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  delayButtons: {
    flexDirection: 'row',
    gap: 8,
  },

  delayButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
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

  delayButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
});