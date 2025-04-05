// src/components/layout/Section/style.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
  },

  // En-tête repensé avec une approche plus moderne
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  // Conteneur de titre avec indicateur visuel
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  // Ligne verticale colorée avant le titre
  titleIndicator: {
    width: 3,
    height: 16,
    borderRadius: 3,
    marginRight: 8,
  },

  // Style du titre plus discret mais élégant
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#4B5563", // Gris un peu plus clair pour être plus discret
    letterSpacing: 0.2,
  },

  // Sous-titre plus léger
  subtitle: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 2,
  },

  // Action text dans un style bouton discret
  actionText: {
    fontSize: 13,
    fontWeight: "500",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },

  content: {
    width: "100%",
  },

  // Séparateur optionnel plus subtil
  separator: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginBottom: 14,
  },
});

export default styles;
