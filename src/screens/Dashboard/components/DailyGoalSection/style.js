// src/screens/Dashboard/components/DailyGoalSection/style.js
import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  // =================== CARD COMPACT APP NATIVE ===================
  card: {
    borderRadius: 12,
    marginBottom: 10, // ✅ RÉDUIT de 16→10
    overflow: "hidden",
    padding: 12, // ✅ RÉDUIT de 16→12
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

  // =================== HEADER COMPACT ===================
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10, // ✅ RÉDUIT de 16→10
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15, // ✅ RÉDUIT de 16→15
    fontWeight: "600",
    marginBottom: 3, // ✅ RÉDUIT de 4→3
    letterSpacing: -0.2,
  },
  goalInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 6,
  },
  subtitle: {
    fontSize: 12, // ✅ RÉDUIT de 13→12
  },
  badge: {
    paddingHorizontal: 8, // ✅ RÉDUIT de 10→8
    paddingVertical: 3, // ✅ RÉDUIT de 4→3
    borderRadius: 12, // ✅ RÉDUIT de 16→12
    minWidth: 28, // ✅ RÉDUIT de 32→28
    alignItems: 'center',
  },
  badgeText: {
    color: "white",
    fontWeight: "600",
    fontSize: 13, // ✅ RÉDUIT de 14→13
  },

  // =================== EXERCICE CONTAINER OPTIMISÉ ===================
  exerciseContainer: {
    borderRadius: 10, // ✅ RÉDUIT de 12→10
    borderWidth: 1,
    marginBottom: 10, // ✅ RÉDUIT de 12→10
  },
  exerciseContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12, // ✅ RÉDUIT de 16→12
  },
  exerciseIconContainer: {
    width: 42, // ✅ RÉDUIT de 48→42
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
    marginBottom: 3, // ✅ RÉDUIT de 4→3
  },
  exerciseGoalText: {
    fontSize: 11, // ✅ RÉDUIT de 12→11
    fontStyle: 'italic',
    lineHeight: 14, // ✅ RÉDUIT de 16→14
  },
  
  // =================== BOUTON COMPACT ===================
  markCompleteButton: {
    paddingHorizontal: 10, // ✅ RÉDUIT de 12→10
    paddingVertical: 5, // ✅ RÉDUIT de 6→5
    borderRadius: 6, // ✅ RÉDUIT de 8→6
    borderWidth: 1,
    backgroundColor: 'rgba(59, 130, 246, 0.04)',
  },
  markCompleteText: {
    fontSize: 11, // ✅ RÉDUIT de 12→11
    fontWeight: '600',
    textAlign: 'center',
  },
  
  completedIndicator: {
    width: 28, // ✅ RÉDUIT de 32→28
    height: 28, // ✅ RÉDUIT de 32→28
    justifyContent: 'center',
    alignItems: 'center',
  },

  // =================== STATUS COMPACT ===================
  statusContainer: {
    alignItems: 'center',
    marginTop: 4,
  },
  encouragementText: {
    fontSize: 12, // ✅ RÉDUIT de 13→12
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // =================== ÉTATS SPÉCIAUX COMPACTS ===================
  specialStateContainer: {
    alignItems: 'center',
    paddingVertical: 6, // ✅ RÉDUIT de 8→6
  },
  specialTitle: {
    fontSize: 18, // ✅ RÉDUIT de 20→18
    fontWeight: '700',
    marginBottom: 6, // ✅ RÉDUIT de 8→6
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  specialMessage: {
    fontSize: 14, // ✅ RÉDUIT de 15→14
    lineHeight: 20, // ✅ RÉDUIT de 22→20
    textAlign: 'center',
    marginBottom: 16, // ✅ RÉDUIT de 20→16
  },

  // =================== BOUTONS ÉVALUATIONS COMPACTS ===================
  buttonContainer: {
    width: '100%',
    gap: 6, // ✅ RÉDUIT de 8→6
  },
  acceptButton: {
    marginBottom: 6, // ✅ RÉDUIT de 8→6
  },
  declineButton: {
    marginBottom: 0,
  },
  evaluationButton: {
    marginTop: 2, // ✅ RÉDUIT de 4→2
  },
  continueButton: {
    marginTop: 2, // ✅ RÉDUIT de 4→2
  },
});