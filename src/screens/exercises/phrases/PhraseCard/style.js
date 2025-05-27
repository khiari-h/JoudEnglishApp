// PhraseCard/style.js - VERSION COMPLÈTE

import { StyleSheet } from "react-native";

/**
 * Fonction qui génère les styles avec la couleur du niveau
 * Adaptée aux phrases (généralement plus longues que les mots individuels)
 * 
 * @param {string} levelColor - Couleur du niveau (ex: "#5E60CE")
 * @returns {Object} Objet StyleSheet
 */
const createStyles = (levelColor = "#5E60CE") =>
  StyleSheet.create({
    // Conteneur principal de la carte
    card: {
      overflow: "hidden",
      marginBottom: 20,
      marginHorizontal: 16,
    },
    
    // Contenu de la carte (sans padding pour contrôle total)
    cardContent: {
      padding: 0,
    },
    
    // Header avec la phrase principale
    phraseHeader: {
      paddingVertical: 24,
      paddingHorizontal: 20,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      backgroundColor: `${levelColor}15`, // 15% d'opacité de la couleur du niveau
    },
    
    // Texte de la phrase (adapté pour phrases plus longues)
    phraseText: {
      fontSize: 22,  // Plus petit que VocabularyWordCard car phrases plus longues
      fontWeight: "bold",
      color: levelColor,
      textAlign: "center",
      lineHeight: 28, // Line-height pour phrases multi-lignes
      paddingHorizontal: 10,
    },
    
    // Section traduction
    translationSection: {
      padding: 20,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: "#f3f4f6",
      alignItems: "center",
      minHeight: 100, // Hauteur minimum pour éviter les sauts
    },
    
    // Conteneur de la traduction affichée
    translationContainer: {
      alignItems: "center",
      width: "100%",
    },
    
    // Texte de la traduction
    translation: {
      fontSize: 18,  // Plus petit pour les phrases
      fontWeight: "bold",
      marginBottom: 16,
      color: levelColor,
      textAlign: "center",
      lineHeight: 24,
      paddingHorizontal: 10,
    },
    
    // Bouton pour masquer la traduction
    hideButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderRadius: 20,
      borderColor: levelColor,
      backgroundColor: "transparent",
    },
    
    // Texte du bouton masquer
    hideButtonText: {
      fontSize: 14,
      fontWeight: "500",
      color: levelColor,
    },
    
    // Bouton pour révéler la traduction
    revealButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 14,
      paddingHorizontal: 28,
      borderRadius: 25,
      width: "85%",
      backgroundColor: levelColor,
      shadowColor: levelColor,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 6,
    },
    
    // Texte du bouton révéler
    revealButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "600",
    },
    
    // Icône des boutons
    buttonIcon: {
      marginRight: 8,
    },
    
    // Section de contenu (exemple, contexte)
    contentSection: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: "#f3f4f6",
    },
    
    // Header de section (avec point coloré)
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    
    // Point coloré à côté du titre de section
    sectionDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 10,
      backgroundColor: levelColor,
    },
    
    // Titre de section (Exemple, Contexte)
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#374151",
    },
    
    // Texte de section
    sectionText: {
      fontSize: 15,
      color: "#4b5563",
      lineHeight: 22,
    },
    
    // Style pour le texte d'exemple
    exampleText: {
      fontStyle: "italic",
      color: "#6b7280",
    },
    
    // Style pour le texte de contexte
    contextText: {
      color: "#6b7280",
      fontWeight: "500",
    },
    
    // Conteneur de chargement
    loadingContainer: {
      padding: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    
    // Texte de chargement
    loadingText: {
      fontSize: 16,
      color: "#6b7280",
      textAlign: "center",
      fontStyle: "italic",
    },
  });

export default createStyles;