// src/components/popups/RevisionPopup/style.js - VERSION CORRIGÉE
import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  // =================== CONTAINER & OVERLAY ===================
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  popupContainer: {
    width: width * 0.9,
    maxWidth: 380,
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
        elevation: 20,
      },
    }),
  },

  // =================== HEADER ===================
  header: {
    alignItems: 'center',
    padding: 24,
    paddingBottom: 20,
  },

  celebration: {
    fontSize: 40,
    marginBottom: 16,
  },

  mainTitle: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1F2937',
  },

  wordsCounter: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#4B5563',
  },

  // =================== BODY (CHOICES) ===================
  body: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },

  // ✅ SUPPRIMÉ le primaryButton - on utilise un style uniforme

  // Conteneur pour tous les choix
  choicesContainer: {
    // Tous les choix dans le même container
  },

  // ✅ Style uniforme pour TOUS les boutons
  choiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16, // ✅ Un peu plus de padding
    borderWidth: 1,
    borderColor: '#F3F4F6',
    marginBottom: 14,
    minHeight: 60, // ✅ Même hauteur pour tous
  },

  // ✅ Modifier STYLÉ pour l'option principale
  primaryChoiceModifier: {
    borderWidth: 2,
    borderColor: '#10B981', 
    backgroundColor: '#ECFDF5', // ✅ Background vert plus prononcé
    // ✅ Gradient effect avec shadow
    ...Platform.select({
      ios: {
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
    // ✅ Animation scale légère
    transform: [{ scale: 1.02 }],
  },

  choiceIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  choiceTextContainer: {
    flex: 1,
  },

  choiceLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },

  // ✅ Label principal STYLÉ
  primaryChoiceLabel: {
    fontWeight: '700',
    fontSize: 16,
    color: '#065F46', // ✅ Vert foncé pour plus de contraste
  },

  choiceSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 2,
  },
});