// VocabularyExercise/VocabularyWordCard/style.js
import { StyleSheet } from "react-native";

// Fonction qui génère les styles avec la couleur du niveau
const createStyles = (levelColor = "#5E60CE") =>
  StyleSheet.create({
    card: {
      overflow: "hidden",
      marginBottom: 20,
      marginHorizontal: 16,
    },
    cardContent: {
      padding: 0,
    },
    wordHeader: {
      paddingVertical: 20,
      paddingHorizontal: 20,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      backgroundColor: `${levelColor}15`,
    },
    wordText: {
      fontSize: 30,
      fontWeight: "bold",
      color: levelColor, // Utilise la couleur du niveau
      textAlign: "center",
    },
    translationSection: {
      padding: 20,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: "#f3f4f6",
      alignItems: "center",
    },
    translationContainer: {
      alignItems: "center",
      width: "100%",
    },
    translation: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
      color: levelColor, // Utilise la couleur du niveau
    },
    hideButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderRadius: 20,
      borderColor: levelColor, // Utilise la couleur du niveau
    },
    hideButtonText: {
      fontSize: 14,
      fontWeight: "500",
      color: levelColor, // Utilise la couleur du niveau
    },
    revealButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 25,
      width: "80%",
      backgroundColor: levelColor, // Utilise la couleur du niveau
    },
    revealButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "600",
    },
    buttonIcon: {
      marginRight: 8,
    },
    contentSection: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: "#f3f4f6",
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    sectionDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: 10,
      backgroundColor: levelColor, // Utilise la couleur du niveau
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#374151",
    },
    sectionText: {
      fontSize: 16,
      color: "#4b5563",
      lineHeight: 24,
    },
    exampleText: {
      fontStyle: "italic",
    },
  });

export default createStyles;
