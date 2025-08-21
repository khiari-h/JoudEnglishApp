// components/exercise-common/ExerciseHeader/style.js - VERSION GLOSSY AVEC PEPS
import { StyleSheet, Platform } from 'react-native';

/**
 * ✨ Styles Glossy avec Peps pour ExerciseHeader
 * - Titre glossy et moderne
 * - Bordure dorée/argentée subtile
 * - Style engageant et peps
 * - Design moderne et attractif
 */
const styles = StyleSheet.create({
  // =================== CONTAINER PRINCIPAL ===================
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 16 : 12,
    paddingBottom: 16,
    borderWidth: 1,
    borderColor: '#FCD34D', // Bordure dorée subtile
    ...Platform.select({
      ios: {
        shadowColor: '#FCD34D',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  // =================== CONTENU PRINCIPAL ===================
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },

  // =================== SECTION GAUCHE ===================
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
    zIndex: 10, // Pour être au-dessus du titre en position absolute
  },

  // =================== BOUTON RETOUR ===================
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#FFFFFF', // Fond blanc pur
    borderWidth: 2,
    borderColor: '#E2E8F0', // Bordure plus visible
    zIndex: 10, // Pour être au-dessus du titre en position absolute
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  // =================== SECTION TITRE - CENTRÉE ===================
  titleSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // =================== TITRE - GLOSSY ET MODERNE ===================
  title: {
    fontSize: 24,
    fontWeight: '600', // Moins gras
    color: '#1E293B',
    letterSpacing: -0.3,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto', // Police moderne
    // Effet glossy
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    // Bordure subtile pour l'effet glossy
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },

  // =================== BADGE NIVEAU - DORÉ AVEC TRANSPARENCE ===================
  levelBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 48,
    backgroundColor: 'rgba(255, 215, 0, 0.9)', // Fond doré avec transparence
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.6)', // Bordure dorée
    ...Platform.select({
      ios: {
        shadowColor: '#FFD700',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  levelText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#B8860B', // Texte doré foncé
    letterSpacing: 0.4,
  },
});

export default styles;