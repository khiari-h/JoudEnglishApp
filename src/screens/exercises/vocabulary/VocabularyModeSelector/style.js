// src/screens/exercises/vocabulary/VocabularyModeSelector/style.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // === CONTENEUR PRINCIPAL ===
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  // === HEADER ===
  header: {
    backgroundColor: "#ffffff",
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  backButtonText: {
    fontSize: 20,
    color: "#475569",
    fontWeight: "600",
  },

  headerContent: {
    alignItems: "center",
  },

  levelBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12,
  },

  levelBadgeText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 8,
  },

  headerSubtitle: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
  },

  // === CONTENU ===
  content: {
    flex: 1,
    padding: 20,
  },

  // === CARTES DE MODE ===
  modeCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 2,
    borderColor: "transparent",
  },

  fastModeCard: {
    borderColor: "#fed7aa",
    backgroundColor: "#fffbf7",
  },

  fastBadge: {
    position: "absolute",
    top: -8,
    right: 20,
    backgroundColor: "#f59e0b",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: "#f59e0b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },

  fastBadgeText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  // === HEADER DE MODE ===
  modeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  modeIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  modeIcon: {
    fontSize: 24,
  },

  modeTitleContainer: {
    flex: 1,
  },

  modeTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 2,
  },

  modeSubtitle: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },

  arrowContainer: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  arrow: {
    fontSize: 20,
    fontWeight: "600",
  },

  // === DESCRIPTION ===
  modeDescription: {
    marginBottom: 16,
    paddingLeft: 4,
  },

  descriptionText: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
  },

  // === STATISTIQUES ===
  modeStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },

  statItem: {
    alignItems: "center",
  },

  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 2,
  },

  statLabel: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
    textTransform: "uppercase",
  },

  // === NOTE EXPLICATIVE ===
  noteContainer: {
    flexDirection: "row",
    backgroundColor: "#f0f9ff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6",
  },

  noteIcon: {
    fontSize: 18,
    marginRight: 12,
    marginTop: 2,
  },

  noteText: {
    flex: 1,
    fontSize: 14,
    color: "#1e40af",
    lineHeight: 20,
  },

  noteBold: {
    fontWeight: "600",
  },

  // === RESPONSIVE ===
  "@media (max-width: 768px)": {
    modeCard: {
      padding: 20,
    },
    
    headerTitle: {
      fontSize: 24,
    },
    
    modeTitle: {
      fontSize: 18,
    },
  },
});

export default styles;