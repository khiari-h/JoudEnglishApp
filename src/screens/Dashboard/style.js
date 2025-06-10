// src/screens/Dashboard/style.js - VERSION REFACTORISÉE
import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  // =================== LAYOUT PRINCIPAL ===================
  container: {
    flex: 1,
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingTop: 0, // Header gère son propre spacing
    paddingBottom: 32, // Plus de respiration en bas (+16px)
    // Pas de paddingHorizontal ici - chaque composant gère le sien
  },
  
  bottomSpacer: {
    height: 80, // +20px pour navigation bottom (+60px initial)
  },

  // =================== ÉTATS DE CHARGEMENT ===================
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  
  loadingText: {
    fontSize: 16,
    fontWeight: '600', // +100 weight
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
    lineHeight: 20,
  },

  // =================== RESPONSIVE DESIGN ===================
  // Pour les petits écrans
  '@media (max-height: 680)': {
    scrollContent: {
      paddingBottom: 24, // Moins d'espace en bas
    },
    
    bottomSpacer: {
      height: 60, // Retour à la valeur originale
    },
  },
  
  // Pour les très petits écrans
  '@media (max-width: 350)': {
    scrollContent: {
      paddingBottom: 20,
    },
    
    loadingContainer: {
      paddingHorizontal: 16,
    },
  },
  
  // =================== ANIMATIONS & TRANSITIONS ===================
  
  // Animation fade pour les composants qui apparaissent
  fadeIn: {
    opacity: 1,
  },
  
  fadeOut: {
    opacity: 0,
  },
  
  // Animation scale pour les interactions
  scalePressed: {
    transform: [{ scale: 0.98 }],
  },
  
  scaleNormal: {
    transform: [{ scale: 1 }],
  },

  // =================== ACCESSIBILITÉ ===================
  
  // Styles pour les éléments focusables
  focusable: {
    // Outline sera géré par le système natif
  },
  
  // Contrastes élevés pour accessibilité
  highContrast: {
    borderWidth: 2,
    borderColor: '#000',
  },

  // =================== PERFORMANCE ===================
  
  // Styles pour optimiser le rendu
  optimized: {
    shouldRasterizeIOS: true,
    renderToHardwareTextureAndroid: true,
  },
  
  // Style pour éviter le reflow
  absolutePosition: {
    position: 'absolute',
  },
  
  relativePosition: {
    position: 'relative',
  },

  // =================== UTILS GLOBAUX ===================
  
  // Centrage
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Flex utils
  flex1: {
    flex: 1,
  },
  
  flexRow: {
    flexDirection: 'row',
  },
  
  flexColumn: {
    flexDirection: 'column',
  },
  
  // Spacing utils (pour debug si besoin)
  debugBorder: {
    borderWidth: 1,
    borderColor: 'red',
  },
  
  debugBackground: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
  },
});

export default styles;