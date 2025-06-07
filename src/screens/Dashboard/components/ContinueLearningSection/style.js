// src/screens/Dashboard/components/ContinueLearningSection/style.js
import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  // =================== CARD COMPACT APP NATIVE ===================
  card: {
    borderRadius: 12,
    marginBottom: 10, // ✅ RÉDUIT de 16→10 (cohérence avec DailyGoal)
    overflow: "hidden",
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
  content: {
    padding: 12, // ✅ RÉDUIT de 16→12 (cohérence avec DailyGoal)
  },

  // =================== DESIGN MODERNE AVEC EMOJI ===================
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8, // ✅ RÉDUIT pour plus compact
  },
  emoji: {
    fontSize: 18,
    marginRight: 8,
  },
  title: {
    fontSize: 15, // ✅ RÉDUIT de 15→15 (cohérence)
    fontWeight: "600",
    flex: 1,
    letterSpacing: -0.2,
  },
  
  // =================== INFO ROW COMPACT ===================
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 10, // ✅ RÉDUIT de 12→10
  },
  exerciseTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  levelBadge: {
    borderRadius: 8, // ✅ RÉDUIT de 10→8
    paddingHorizontal: 5, // ✅ RÉDUIT de 6→5
    paddingVertical: 2,
    marginLeft: 6,
    marginRight: 4,
  },
  levelBadgeText: {
    color: "white",
    fontSize: 11, // ✅ RÉDUIT de 12→11
    fontWeight: "600",
  },
  positionText: {
    fontSize: 12, // ✅ RÉDUIT de 13→12
    marginLeft: 2,
  },
  timeText: {
    fontSize: 12, // ✅ RÉDUIT de 13→12
    marginLeft: 4,
  },
  
  // =================== BOUTON COMPACT ===================
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14, // ✅ RÉDUIT de 16→14
    paddingVertical: 8, // ✅ RÉDUIT de 10→8
    borderRadius: 8,
  },
  buttonEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 13, // ✅ RÉDUIT de 14→13
    fontWeight: "500",
  },

  // =================== ÉTATS VIDES COMPACTS ===================
  emptyStateDescription: {
    fontSize: 13, // ✅ RÉDUIT de 14→13
    marginBottom: 12, // ✅ RÉDUIT de 16→12
    lineHeight: 18, // ✅ RÉDUIT de 20→18
  },
  emptyStateContainer: {
    marginTop: 6, // ✅ RÉDUIT de 8→6
  },
  emptyStateHint: {
    fontSize: 12, // ✅ RÉDUIT de 13→12
    fontStyle: "italic",
  },
  
  // =================== LOADING COMPACT ===================
  loadingContainer: {
    padding: 12, // ✅ RÉDUIT de 16→12
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 13, // ✅ RÉDUIT de 14→13
    marginLeft: 10, // ✅ RÉDUIT de 12→10
  },
});