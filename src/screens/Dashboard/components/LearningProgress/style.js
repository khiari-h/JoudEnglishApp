// src/screens/Dashboard/components/LearningProgress/style.js
import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  // =================== CONTAINER PRINCIPAL ===================
  container: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  
  // =================== CARTE PRINCIPALE ===================
  card: {
    padding: 20,
    borderRadius: 16,
    // Ombres subtiles
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
    borderWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.04)",
  },

  // =================== HEADER ===================
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  
  progressInfo: {
    flex: 1,
  },
  
  progressTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  
  progressSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  
  progressBadge: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  
  progressPercentage: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },

  // =================== PROGRESSION GLOBALE ===================
  globalProgressContainer: {
    marginBottom: 24,
  },
  
  globalProgressTrack: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  
  globalProgressFill: {
    height: 8,
    borderRadius: 4,
    ...Platform.select({
      ios: {
        shadowColor: "#3B82F6",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  
  progressLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },

  // =================== NIVEAUX - SOLUTION SIMPLE ET FIABLE ===================
  levelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // ✅ SIMPLE : space-around fonctionne mieux
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10, // ✅ Marge interne pour éviter les débordements
  },
  
  levelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    // ✅ PAS de width fixe - laisse React Native gérer
  },
  
  levelCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // =================== ÉTATS DES NIVEAUX ===================
  activeLevelCircle: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  
  futureLevelCircle: {
    backgroundColor: '#F3F4F6',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  
  // =================== TEXTES DES NIVEAUX ===================
  levelText: {
    fontSize: 16,
    fontWeight: '700',
  },
  
  activeLevelText: {
    color: 'white',
  },
  
  futureLevelText: {
    // Couleur définie dans le composant
  },

  // =================== BOUTON D'ACTION ===================
  actionButton: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.04)',
  },
  
  actionButtonText: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.2,
  },

  // =================== RESPONSIVE ===================
  '@media (max-width: 350)': {
    card: {
      padding: 16,
    },
    
    levelCircle: {
      width: 36,
      height: 36,
      borderRadius: 18,
    },
    
    levelText: {
      fontSize: 14,
    },
    
    progressTitle: {
      fontSize: 16,
    },
    
    levelsContainer: {
      paddingHorizontal: 8, // Moins de marge sur petits écrans
    },
  },
});