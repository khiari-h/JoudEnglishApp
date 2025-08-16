// src/screens/exercises/word-games/CategorizationGame/style.js - DESIGN UNIFIÉ AVEC MATCHING
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  gameContainer: {
    width: "100%",
    paddingHorizontal: 16,
  },
  
  // Instructions simples et élégantes (comme matching)
  instructionsContainer: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6",
  },
  instructionsText: {
    fontSize: 16,
    color: "#334155",
    textAlign: "center",
    fontWeight: "500",
  },
  
  // Container de catégorie simple et élégant
  categoryContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderLeftWidth: 4, // ✅ AJOUTÉ : Bordure gauche pour la couleur de catégorie
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 8,
    textAlign: "center",
  },
  categorySubtitle: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
    fontWeight: "400",
  },
  
  // Grille des mots avec le même design que matching
  wordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  
  // Tiles des mots avec le MÊME design que matching
  wordTile: {
    width: "48%",
    height: 50,
    borderRadius: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  
  // Style pour les mots sélectionnés (comme matching)
  selectedWordTile: {
    borderWidth: 2,
    backgroundColor: "#f8fafc",
    borderColor: "#3b82f6",
  },
  
  // Texte des mots (comme matching)
  wordTileText: {
    fontSize: 16,
    color: "#334155",
    textAlign: "center",
    fontWeight: "500",
  },
  
  // Container d'indice (comme matching)
  hintContainer: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  hintText: {
    fontSize: 14,
    color: "#64748b",
    fontStyle: "italic",
  },
});

export default styles;
