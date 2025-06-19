// src/components/ui/ContentSection/index.js
import React from "react";
import { View, Text } from "react-native";
import Card from "../Card";
import createStyles from "./style";

/**
 * 📝 ContentSection - Composant générique pour sections de contenu
 * Usage : Examples, Context, Rules, Explanations, etc.
 * 
 * @param {string} title - Titre de la section (ex: "Example", "Context", "Rule")
 * @param {string} content - Contenu principal de la section
 * @param {string} levelColor - Couleur du niveau
 * @param {string} backgroundColor - Couleur de fond (optionnel)
 * @param {boolean} isItalic - Mettre le contenu en italique
 * @param {boolean} showIcon - Afficher l'icône/dot coloré
 * @param {object} containerStyle - Style personnalisé pour le container
 */
const ContentSection = ({
  title = "Content",
  content,
  levelColor = "#5E60CE",
  backgroundColor,
  isItalic = false,
  showIcon = true,
  containerStyle = {},
}) => {
  const styles = createStyles(levelColor, backgroundColor);

  // Ne pas rendre si pas de contenu
  if (!content) return null;

  return (
    <Card
      withShadow
      borderRadius={18}
      style={[styles.card, containerStyle]}
      contentStyle={styles.cardContent}
    >
      {/* Header avec titre et ligne décorative */}
      <View style={styles.header}>
        {showIcon && (
          <View style={[styles.iconDot, { backgroundColor: levelColor }]} />
        )}
        <Text style={styles.title}>{title}</Text>
        <View style={styles.decorativeLine} />
      </View>
      
      {/* Contenu */}
      <Text style={[styles.contentText, isItalic && styles.italicText]}>
        {content}
      </Text>
    </Card>
  );
};

export default ContentSection;