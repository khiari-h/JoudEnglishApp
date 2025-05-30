// src/screens/Dashboard/components/DailyGoalSection/style.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    backgroundColor: "white",
    padding: 16,
  },
  
  // Header normal
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  goalInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 6,
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    minWidth: 32,
    alignItems: 'center',
  },
  badgeText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },

  // Exercice du jour
  exerciseContainer: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  exerciseContent: {
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
  actionIndicator: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedIndicator: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Messages d'encouragement
  statusContainer: {
    alignItems: 'center',
  },
  encouragementText: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // États spéciaux (évaluations, accomplissements)
  specialStateContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  specialTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  specialMessage: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
  },

  // Boutons pour évaluations
  buttonContainer: {
    width: '100%',
    gap: 8,
  },
  acceptButton: {
    marginBottom: 8,
  },
  declineButton: {
    marginBottom: 0,
  },
  evaluationButton: {
    marginTop: 4,
  },
  continueButton: {
    marginTop: 4,
  },
});