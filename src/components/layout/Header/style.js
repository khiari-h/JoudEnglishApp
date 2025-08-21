// src/components/layout/Header/styles.js - VERSION MODERNE & ATTRACTIVE

import { StyleSheet, Platform, StatusBar, Dimensions } from "react-native";

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 44 : StatusBar.currentHeight;
const HEADER_HEIGHT = Platform.OS === "ios" ? 44 : 56;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    paddingTop: Platform.OS === "ios" ? STATUSBAR_HEIGHT : 0,
  },
  
  // =================== OMBRES MODERNES ===================
  withShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  
  withBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  
  // =================== CONTAINER STANDARD AMÉLIORÉ ===================
  standardContainer: {
    height: HEADER_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20, // Plus d'espace
    position: 'relative',
  },
  
  condensed: {
    height: Platform.OS === "ios" ? 40 : 48,
  },
  
  // =================== TITRE MODERNE ===================
  title: {
    fontSize: 19,
    fontWeight: "700", // Plus gras
    textAlign: "center",
    flex: 1,
    letterSpacing: 0.3, // Espacement des lettres
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  
  condensedTitle: {
    fontSize: 17,
  },
  
  // =================== BOUTONS MODERNISÉS ===================
  backButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -8,
    backgroundColor: 'rgba(255,255,255,0.2)', // Fond glassmorphism
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    // Ombre pour le bouton
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  
  rightButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    marginRight: -8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  
  placeholderButton: {
    width: 32,
  },

  // =================== MODE TITRE LARGE MODERNISÉ ===================
  largeTitleContainer: {
    height: "auto",
    minHeight: HEADER_HEIGHT + STATUSBAR_HEIGHT + 80, // Plus haut
    position: 'relative',
    overflow: 'hidden',
  },
  
  largeTitleWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 24, // Plus d'espace
    position: 'relative',
    zIndex: 2,
  },
  
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: HEADER_HEIGHT,
  },
  
  // =================== TITRE LARGE SPECTACULAIRE ===================
  largeTitle: {
    fontSize: 34, // Plus grand
    fontWeight: "800", // Extra bold
    letterSpacing: -0.5, // Lettres plus serrées pour un look moderne
    marginTop: 16,
    lineHeight: 40,
    // Ombre de texte plus prononcée
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  
  largeTitleSubtitle: {
    fontSize: 17,
    color: "rgba(255,255,255,0.85)", // Plus visible
    marginTop: 6,
    marginBottom: 12,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  
  rightComponentContainer: {
    alignItems: "flex-end",
  },

  // =================== COMPOSANTS ADDITIONNELS ===================
  bottomComponentContainer: {
    marginTop: 12,
    marginBottom: 8,
  },
  
  childrenContainer: {
    width: "100%",
  },

  // =================== EFFETS VISUELS MODERNES ===================
  gradientBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  
  // Pattern géométrique en arrière-plan
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    zIndex: 1,
  },
  
  // Forme ondulée en bas
  wavyBottom: {
    position: "absolute",
    bottom: -2,
    left: 0,
    right: 0,
    height: 24,
    zIndex: 3,
  },
  
  // =================== ÉLÉMENTS DÉCORATIFS ===================
  decorativeCircle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.08)',
    top: -40,
    right: -20,
    zIndex: 1,
  },
  
  decorativeCircleSmall: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.05)',
    top: 20,
    left: -10,
    zIndex: 1,
  },
  
  // =================== PROGRESS RING (pour niveau) ===================
  progressContainer: {
    position: 'absolute',
    top: 16,
    right: 20,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  
  progressRing: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  
  progressText: {
    position: 'absolute',
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
  },
  
  // =================== BADGE NIVEAU ===================
  levelBadge: {
    position: 'absolute',
    top: -8,
    left: 20,
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    zIndex: 3,
    // Ombre pour le badge
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  
  levelBadgeText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  
  // =================== RESPONSIVE ===================
  smallScreen: {
    paddingHorizontal: 16,
  },
  
  // Style pour écrans plus petits
  compactTitle: {
    fontSize: 28,
  },
});

export default styles;