// components/exercise-common/ExerciseHeader/style.js - VERSION ULTRA-MODERNE 2025
import { StyleSheet, Platform } from 'react-native';

/**
 * 🔥 Styles Ultra-Modernes 2025 pour ExerciseHeader
 * - Design ultra-clean et épuré
 * - Gradients modernes (indigo/purple)
 * - Micro-interactions et shadows subtiles
 * - Typography moderne et lisible
 * - Inspiré des meilleures apps du moment
 */
const styles = StyleSheet.create({
  // =================== CONTAINER PRINCIPAL ===================
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24, // Plus d'espace
    paddingTop: Platform.OS === 'ios' ? 20 : 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9', // Bordure ultra-subtile
    // Shadow ultra-subtile
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },

  // =================== CONTENU PRINCIPAL ===================
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // =================== BOUTON RETOUR MODERNE ===================
  backButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12, // Coins arrondis modernes
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    // Shadow subtile
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  // =================== SECTION CENTRE ===================
  centerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  // =================== CONTAINER TITRE + ICÔNE ===================
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // =================== ICÔNE TITRE ===================
  titleIcon: {
    marginRight: 8,
  },

  // =================== TITRE MODERNE ===================
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    letterSpacing: -0.2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },

  // =================== SÉPARATEUR ===================
  separator: {
    width: 1,
    height: 16,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 12,
  },

  // =================== CONTAINER MODE ===================
  modeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
  },

  // =================== INDICATEUR MODE (POINT ANIMÉ) ===================
  modeIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6366F1',
    marginRight: 4,
    // Animation sera ajoutée via Animated API si nécessaire
  },

  // =================== TEXTE MODE ===================
  modeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366F1',
    textTransform: 'capitalize',
  },

  // =================== BADGE NIVEAU MODERNE ===================
  levelBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    // Gradient indigo to purple
    backgroundColor: '#6366F1',
    // Shadow moderne
    ...Platform.select({
      ios: {
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  // =================== TEXTE NIVEAU ===================
  levelText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
});

export default styles;