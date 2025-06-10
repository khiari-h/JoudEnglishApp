// src/screens/Dashboard/components/HeroContinueSection/style.js
import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  // =================== CONTAINER ===================
  container: {
    paddingHorizontal: 20,
    marginBottom: 24, // +8px pour plus de respiration
  },
  
  // =================== CARD HERO ===================
  card: {
    borderRadius: 16, // +4px pour plus moderne
    overflow: "hidden",
    // Ombres plus prononcées pour hero section
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 }, // +3px
        shadowOpacity: 0.12, // +0.06 pour plus de depth
        shadowRadius: 8, // +4px
      },
      android: {
        elevation: 6, // +4 pour plus de depth
      },
    }),
    borderWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.04)",
  },
  
  content: {
    padding: 24, // +12px pour hero section (était 12px)
    position: 'relative',
  },
  
  // Pattern décoratif subtil
  decorativePattern: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    opacity: 0.6,
  },

  // =================== HEADER SECTION ===================
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16, // +8px pour plus de respiration
    position: 'relative',
    zIndex: 2,
  },
  
  heroEmoji: {
    fontSize: 24, // +6px pour plus d'impact (était 18px)
    marginRight: 12, // +4px
  },
  
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    opacity: 0.8,
  },

  // =================== HIÉRARCHIE VISUELLE ===================
  
  // L1 : Titre principal - Plus gros et bold
  heroTitle: {
    fontSize: 24, // +2px pour encore plus d'impact (était 22px)
    fontWeight: "800", // Plus bold
    marginBottom: 8,
    letterSpacing: -0.5, // Meilleure lisibilité
    lineHeight: 30, // +2px pour meilleur espacement
    position: 'relative',
    zIndex: 2,
  },
  
  // L2 : Context - Taille moyenne
  contextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, // +8px pour séparation claire
    position: 'relative',
    zIndex: 2,
  },
  
  heroSubtitle: {
    fontSize: 15, // +2px pour lisibilité (était 13px)
    fontWeight: "500",
  },
  
  contextSeparator: {
    fontSize: 15,
    marginHorizontal: 8,
    opacity: 0.6,
  },

  // =================== PROGRESSION SECTION ===================
  progressSection: {
    marginBottom: 24, // +12px pour séparation hero button
    position: 'relative',
    zIndex: 2,
  },
  
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12, // +4px
  },
  
  // L3 : Progression - Taille moyenne avec emphasis
  progressText: {
    fontSize: 17, // +4px pour importance (était 13px)
    fontWeight: "600", // +100 weight
    letterSpacing: -0.2,
  },
  
  progressPercentage: {
    fontSize: 17, // +4px pour match progressText
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  
  // Barre de progression moderne
  progressBarContainer: {
    marginTop: 8,
  },
  
  progressBarTrack: {
    height: 8, // +2px pour plus de visibilité (était 6px)
    borderRadius: 4,
    overflow: 'hidden',
  },
  
  progressBarFill: {
    height: 8,
    borderRadius: 4,
    // Transition smooth
    ...Platform.select({
      ios: {
        shadowColor: "#3B82F6",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  
  // Achievement badge pour gamification
  achievementBadge: {
    marginTop: 8,
    alignSelf: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  
  achievementText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#16A34A',
    textAlign: 'center',
  },

  // =================== HERO BUTTON - PLUS PROMINENT ===================
  heroButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32, // +18px pour bouton hero (était 14px)
    paddingVertical: 16, // +8px pour bouton hero (était 8px)
    borderRadius: 12, // +4px pour plus moderne
    // Ombres prononcées pour CTA
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2, // Plus prononcé
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
    position: 'relative',
    zIndex: 2,
  },
  
  heroButtonIcon: {
    fontSize: 20, // +4px pour plus d'impact (était 16px)
    marginRight: 10, // +4px
  },
  
  heroButtonText: {
    color: "white",
    fontSize: 17, // +4px pour bouton hero (était 13px)
    fontWeight: "700", // +200 weight
    letterSpacing: -0.3,
  },

  // =================== ÉTATS SPÉCIAUX ===================
  
  // Loading state
  loadingContainer: {
    padding: 24, // Match content padding
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  
  loadingText: {
    fontSize: 15,
    marginLeft: 12,
    fontWeight: "500",
  },
  
  // Empty state
  emptyState: {
    alignItems: 'center',
    paddingVertical: 12,
    position: 'relative',
    zIndex: 2,
  },
  
  // =================== RESPONSIVE ===================
  '@media (max-width: 350)': {
    content: {
      padding: 20,
    },
    
    heroTitle: {
      fontSize: 20,
    },
    
    heroButton: {
      paddingHorizontal: 24,
      paddingVertical: 14,
    },
    
    heroButtonText: {
      fontSize: 16,
    },
  },
});