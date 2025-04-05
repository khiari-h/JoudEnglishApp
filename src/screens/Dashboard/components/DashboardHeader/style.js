// src/screens/Dashboard/components/DashboardHeader/styles.js
import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  // Logo
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoBackground: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  logoText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  logoTagline: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.8)",
    marginLeft: 8,
  },

  // Conteneur droit avec notifications et paramètres
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#FF3B30",
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "white",
  },
  notificationText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },

  // Streak
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  streakText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },

  // Stats
  bottomContainer: {
    width: "100%",
    marginTop: 8,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 12,
    marginTop: 10,
    padding: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
});

export default styles;
