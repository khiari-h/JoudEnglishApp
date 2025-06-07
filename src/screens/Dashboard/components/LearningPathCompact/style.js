// src/screens/Dashboard/components/LearningPathCompact/style.js
import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  // =================== CONTAINER SECTION ===================
  container: {
    marginBottom: 16, // ✅ RÉDUIT de 20→16 (cohérence)
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10, // ✅ RÉDUIT de 12→10
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 17, // ✅ RÉDUIT de 18→17 (cohérence avec autres sections)
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  actionText: {
    fontSize: 13, // ✅ RÉDUIT de 14→13
    fontWeight: '600',
  },
  
  // =================== CARD COMPACT ===================
  card: {
    padding: 16, // ✅ RÉDUIT de 20→16
    // Ombres app native légères (via Card générique)
  },
  
  // =================== PROGRESSION INFO COMPACT ===================
  progressInfoContainer: {
    marginBottom: 12, // ✅ RÉDUIT de 16→12
  },
  globalProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6, // ✅ RÉDUIT de 8→6
    paddingVertical: 6, // ✅ RÉDUIT de 8→6
    paddingHorizontal: 10, // ✅ RÉDUIT de 12→10
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  globalProgressLabel: {
    fontSize: 15, // ✅ RÉDUIT de 16→15
    fontWeight: '600',
  },
  globalProgressValue: {
    fontSize: 17, // ✅ RÉDUIT de 18→17
    fontWeight: '700',
  },
  activeInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 3, // ✅ RÉDUIT de 4→3
  },
  activeInfoLabel: {
    fontSize: 13, // ✅ RÉDUIT de 14→13
  },
  activeInfoBadge: {
    paddingHorizontal: 8, // ✅ RÉDUIT de 10→8
    paddingVertical: 3, // ✅ RÉDUIT de 4→3
    borderRadius: 8, // ✅ RÉDUIT de 10→8
  },
  activeInfoText: {
    fontSize: 11, // ✅ RÉDUIT de 12→11
    fontWeight: '700',
    color: 'white',
  },
  
  // =================== DESCRIPTION COMPACT ===================
  levelDescription: {
    fontSize: 13, // ✅ RÉDUIT de 14→13
    marginBottom: 12, // ✅ RÉDUIT de 16→12
    lineHeight: 18, // ✅ RÉDUIT de 20→18
  },
  
  // =================== NIVEAUX CONTAINER COMPACT ===================
  levelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16, // ✅ RÉDUIT de 20→16
    paddingHorizontal: 4,
  },
  levelButton: {
    alignItems: 'center',
  },
  levelCircle: {
    width: 36, // ✅ RÉDUIT de 40→36 (plus compact)
    height: 36, // ✅ RÉDUIT de 40→36
    borderRadius: 18, // ✅ RÉDUIT de 20→18
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  
  // =================== ÉTATS NIVEAUX ===================
  activeLevelCircle: {
    // Ombres réduites pour style app native
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  completedLevelCircle: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  futureLevelCircle: {
    backgroundColor: '#F3F4F6',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  
  // =================== TEXTES NIVEAUX COMPACT ===================
  activeLevelText: {
    fontSize: 15, // ✅ RÉDUIT de 16→15
    fontWeight: '700',
    color: 'white',
  },
  completedLevelText: {
    fontSize: 15, // ✅ RÉDUIT de 16→15
    fontWeight: '600',
  },
  futureLevelText: {
    fontSize: 15, // ✅ RÉDUIT de 16→15
    fontWeight: '500',
  },
  
  // =================== BOUTON EXPLORER COMPACT ===================
  exploreButton: {
    marginTop: 2, // ✅ RÉDUIT de 4→2
  },
});