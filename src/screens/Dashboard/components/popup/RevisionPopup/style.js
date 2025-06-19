// src/components/popups/RevisionPopup/style.js - VERSION SIMPLE AVEC SCROLL
import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  // =================== OVERLAY & MODAL ===================
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  popupContainer: {
    width: width * 0.9,
    maxWidth: 400,
    maxHeight: height * 0.8, // ✅ Hauteur max pour éviter débordement
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.25,
        shadowRadius: 25,
      },
      android: {
        elevation: 15,
      },
    }),
  },

  // =================== HEADER FIXE ===================
  header: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  celebration: {
    fontSize: 40,
    marginBottom: 12,
  },

  mainTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 6,
  },

  wordsCounter: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },

  motivation: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // =================== SCROLL CONTAINER ===================
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 30, // ✅ Espace en bas pour scroll complet
  },

  // =================== INFO SECTION ===================
  infoSection: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  infoItem: {
    alignItems: 'center',
    flex: 1,
  },

  infoEmoji: {
    fontSize: 16,
    marginBottom: 4,
  },

  infoText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    textAlign: 'center',
  },

  infoDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 8,
  },

  // =================== CHOICES ===================
  choicesContainer: {
    gap: 12,
    marginBottom: 16,
  },

  choiceButton: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  choiceContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  choiceEmoji: {
    fontSize: 20,
    marginRight: 12,
  },

  choiceTexts: {
    flex: 1,
  },

  choiceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },

  choiceSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
  },

  primaryArrow: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 8,
  },

  // =================== FOOTER NOTE ===================
  footerNote: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  noteText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
  },
});