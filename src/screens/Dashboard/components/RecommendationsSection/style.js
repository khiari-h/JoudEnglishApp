// src/screens/Dashboard/components/RecommendationsSection/style.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  recommendationCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },

  // Contenu pour recommandation de démarrage
  startRecommendationContent: {
    padding: 20,
  },

  // Contenu pour recommandation normale
  recommendationContent: {
    padding: 20,
  },

  // Header avec icône et titre
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  messageIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  messageTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
  },

  // Message principal
  messageText: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 16,
  },

  // Info sur le temps passé
  timeInfo: {
    marginBottom: 16,
  },
  timeProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 8,
    paddingHorizontal: 12,
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
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },

  // Aperçu de l'exercice recommandé
  exercisePreview: {
    backgroundColor: '#FAFBFC',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  exercisePreviewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  exerciseIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  exerciseIcon: {
    fontSize: 24,
  },
  exerciseInfo: {
    flex: 1,
    marginRight: 12,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  exerciseDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    minWidth: 32,
    alignItems: 'center',
  },
  levelBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
  },

  // Bouton d'action
  recommendationButton: {
    marginTop: 4,
  },
});