// components/exercise-common/ExerciseHeader/style.js - VERSION HUMAINE & ÉPURÉE
import { StyleSheet, Platform } from 'react-native';

/**
 * 🕊️ Styles Humains & Épurés pour ExerciseHeader
 * - Blanc pur universel
 * - Respirant et fonctionnel
 * - Zéro superflu, zéro effet
 * - Élégance dans la simplicité
 * - Design "invisible" qui laisse place au contenu
 */
const styles = StyleSheet.create({
  // =================== CONTAINER PRINCIPAL ===================
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 16 : 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9', // Séparation ultra-discrète
  },

  // =================== CONTENU PRINCIPAL ===================
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // =================== SECTION GAUCHE ===================
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  // =================== BOUTON RETOUR - Ultra-simple ===================
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginRight: 16,
    // Pas d'ombre, pas d'effet - juste fonctionnel
  },

  // =================== SECTION TITRE ===================
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  // =================== ICÔNE EXERCICE - Simple ===================
  exerciseIcon: {
    fontSize: 24,
    marginRight: 12,
    opacity: 0.8, // Discret
  },

  // =================== TITRE - Typography épurée ===================
  title: {
    fontSize: 20,
    fontWeight: '600', // Medium weight - pas trop gras
    letterSpacing: 0.2, // Subtle
    flex: 1,
  },

  // =================== BADGE NIVEAU - Minimal ===================
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    // Pas d'ombre, pas d'effet - juste la couleur pure
  },
  levelText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: 0.3,
  },
});

export default styles;