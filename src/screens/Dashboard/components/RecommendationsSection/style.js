// src/screens/Dashboard/components/RecommendationsSection/style.js
import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  // =================== CONTAINER SECTION ===================
  container: {
    marginBottom: 16, // ✅ RÉDUIT de 20→16 (plus compact)
  },
  sectionTitle: {
    fontSize: 17, // ✅ RÉDUIT de 18→17
    fontWeight: '700',
    marginBottom: 10, // ✅ RÉDUIT de 12→10
    paddingHorizontal: 4,
    letterSpacing: -0.3,
  },
  
  // =================== CARD COMPACT ===================
  recommendationCard: {
    borderRadius: 12,
    overflow: 'hidden',
    // Ombres app native légères
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
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

  // =================== CONTENU COMPACT ===================
  startRecommendationContent: {
    padding: 16, // ✅ RÉDUIT de 20→16
  },
  recommendationContent: {
    padding: 16, // ✅ RÉDUIT de 20→16
  },

  // =================== HEADER MESSAGE COMPACT ===================
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // ✅ RÉDUIT de 12→10
  },
  messageIcon: {
    fontSize: 22, // ✅ RÉDUIT de 24→22
    marginRight: 8,
  },
  messageTitle: {
    fontSize: 16, // ✅ RÉDUIT de 18→16
    fontWeight: '700',
    flex: 1,
    letterSpacing: -0.2,
  },

  // =================== MESSAGE PRINCIPAL COMPACT ===================
  messageText: {
    fontSize: 14, // ✅ RÉDUIT de 15→14
    lineHeight: 20, // ✅ RÉDUIT de 22→20
    marginBottom: 12, // ✅ RÉDUIT de 16→12
  },

  // =================== INFO TEMPS COMPACT ===================
  timeInfo: {
    marginBottom: 12, // ✅ RÉDUIT de 16→12
  },
  timeProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 6, // ✅ RÉDUIT de 8→6
    paddingHorizontal: 10, // ✅ RÉDUIT de 12→10
    borderRadius: 8,
  },
  timeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 8,
  },
  timeText: {
    fontSize: 12, // ✅ RÉDUIT de 13→12
    fontWeight: '500',
  },

  // =================== APERÇU EXERCICE COMPACT ===================
  exercisePreview: {
    backgroundColor: '#FAFBFC',
    borderRadius: 10, // ✅ RÉDUIT de 12→10
    marginBottom: 12, // ✅ RÉDUIT de 16→12
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  exercisePreviewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12, // ✅ RÉDUIT de 16→12
  },
  exerciseIconContainer: {
    width: 42, // ✅ RÉDUIT de 48→42 (cohérence DailyGoal)
    height: 42, // ✅ RÉDUIT de 48→42
    borderRadius: 10, // ✅ RÉDUIT de 12→10
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, // ✅ RÉDUIT de 12→10
  },
  exerciseIcon: {
    fontSize: 22, // ✅ RÉDUIT de 24→22
  },
  exerciseInfo: {
    flex: 1,
    marginRight: 10, // ✅ RÉDUIT de 12→10
  },
  exerciseTitle: {
    fontSize: 15, // ✅ RÉDUIT de 16→15
    fontWeight: '600',
    marginBottom: 2,
    letterSpacing: -0.1,
  },
  exerciseDescription: {
    fontSize: 12, // ✅ RÉDUIT de 13→12
    lineHeight: 16, // ✅ RÉDUIT de 18→16
  },
  levelBadge: {
    paddingHorizontal: 6, // ✅ RÉDUIT de 8→6
    paddingVertical: 3, // ✅ RÉDUIT de 4→3
    borderRadius: 6, // ✅ RÉDUIT de 8→6
    minWidth: 26, // ✅ RÉDUIT de 32→26
    alignItems: 'center',
  },
  levelBadgeText: {
    fontSize: 11, // ✅ RÉDUIT de 12→11
    fontWeight: '700',
    color: 'white',
  },

  // =================== BOUTON ACTION COMPACT ===================
  recommendationButton: {
    marginTop: 2, // ✅ RÉDUIT de 4→2
  },

  // =================== NOUVEAU : PROGRESSION STYLES ÉPURÉS ===================
  progressRecommendationContent: {
    padding: 16,
  },
  progressBarContainer: {
    marginBottom: 12,
  },
  progressBarTrack: {
    height: 8, // ✅ Un peu plus épais pour mieux voir
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 8,
    borderRadius: 4,
    // Transition smooth (sera géré par React Native)
  },
  progressText: {
    fontSize: 14, // ✅ Plus lisible
    fontWeight: '500',
    marginBottom: 0, // Override si nécessaire
  },
  progressGoal: {
    fontSize: 12,
    fontWeight: '600', // ✅ Un peu plus bold pour le pourcentage
    color: '#6B7280', // Sera overridé par le composant
  },
});