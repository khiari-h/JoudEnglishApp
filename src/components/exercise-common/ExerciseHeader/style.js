// components/exercise-common/ExerciseHeader/style.js
import { StyleSheet, Platform } from 'react-native';

/**
 * 🏆 Styles niveau LDC (Paris Saint-Germain) pour ExerciseHeader
 * - Gradients riches et contrastés
 * - Glassmorphism effects
 * - Typography premium
 * - Ombres spectaculaires
 * - Cercles décoratifs
 */
const styles = StyleSheet.create({
  // =================== CONTAINER PRINCIPAL ===================
  container: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  gradientBackground: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 20 : 16,
    paddingBottom: 20,
    borderBottomLeftRadius: 24, // Plus arrondis pour un effet premium
    borderBottomRightRadius: 24,
    position: 'relative',
    // Ombre spectaculaire pour l'ensemble du header
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  // =================== CERCLES DÉCORATIFS ===================
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.6,
  },
  circle1: {
    width: 100,
    height: 100,
    top: -50,
    right: -30,
  },
  circle2: {
    width: 60,
    height: 60,
    bottom: -30,
    left: -20,
  },

  // =================== CONTENU PRINCIPAL ===================
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2, // Au-dessus des cercles décoratifs
  },

  // =================== SECTION GAUCHE ===================
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  // =================== BOUTON RETOUR - Glassmorphism ===================
  backButton: {
    width: 44, // Plus grand pour un effet premium
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16, // Plus arrondi
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)', // Effet glassmorphism
    // Ombre pour le bouton
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  backButtonInner: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },

  // =================== SECTION TITRE ===================
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  // =================== ICÔNE EXERCICE - Premium ===================
  exerciseIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)', // Glassmorphism
    // Ombre pour l'icône
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  exerciseIcon: {
    fontSize: 22,
    zIndex: 2,
  },
  iconGlow: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    zIndex: 1,
    opacity: 0.6,
  },

  // =================== TITRE - Typography premium ===================
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20, // Plus grand pour plus de présence
    fontWeight: '800', // Ultra bold
    letterSpacing: 0.5, // Espacement élégant
    marginBottom: 4,
    // Ombre pour le texte
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
    }),
  },
  titleUnderline: {
    width: 40,
    height: 3,
    borderRadius: 1.5,
    opacity: 0.8,
  },

  // =================== SECTION NIVEAU ===================
  levelSection: {
    marginLeft: 16,
  },

  // =================== BADGE NIVEAU - Hero style ===================
  levelBadge: {
    borderRadius: 20, // Plus arrondi
    overflow: 'hidden',
    // Ombre spectaculaire pour le badge niveau
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  levelBadgeInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Glassmorphism
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  levelText: {
    color: 'white',
    fontWeight: '800', // Ultra bold
    fontSize: 16,
    letterSpacing: 0.5,
    marginRight: 6,
    // Ombre pour le texte du niveau
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
    }),
  },
  levelStar: {
    fontSize: 14,
    opacity: 0.9,
  },
});

export default styles;