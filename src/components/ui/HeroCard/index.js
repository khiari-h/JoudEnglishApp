// src/components/ui/HeroCard/index.js
import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import createStyles from "./style";

/**
 * 🎯 HeroCard - Composant générique pour contenu principal
 * Usage : Vocabulary, Phrases, Grammar, Reading, etc.
 * 
 * @param {string} content - Contenu principal à afficher
 * @param {number} fontSize - Taille du texte (42 pour mots, 28 pour phrases, etc.)
 * @param {string} levelColor - Couleur du niveau
 * @param {number} lineHeight - Hauteur de ligne (optionnel)
 * @param {string} textAlign - Alignement du texte
 * @param {boolean} showUnderline - Afficher la ligne décorative
 * @param {object} containerStyle - Style personnalisé pour le container
 */
const HeroCard = ({
  content,
  fontSize = 32,
  levelColor = "#5E60CE",
  lineHeight,
  textAlign = "center",
  showUnderline = true,
  containerStyle = {},
}) => {
  const styles = createStyles(levelColor);
  
  // Calcul automatique du lineHeight si non fourni
  const calculatedLineHeight = lineHeight || Math.round(fontSize * 1.3);

  return (
    <View style={[styles.heroSection, containerStyle]}>
      <LinearGradient
        colors={[`${levelColor}12`, `${levelColor}08`, `${levelColor}04`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroGradient}
      >
        {/* Cercles décoratifs */}
        <View style={[styles.decorativeCircle, styles.circle1, { backgroundColor: `${levelColor}08` }]} />
        <View style={[styles.decorativeCircle, styles.circle2, { backgroundColor: `${levelColor}06` }]} />
        
        {/* Contenu principal */}
        <View style={styles.contentContainer}>
          <Text 
            style={[
              styles.contentText, 
              { 
                color: levelColor,
                fontSize,
                lineHeight: calculatedLineHeight,
                textAlign,
              }
            ]}
          >
            {content}
          </Text>
          
          {/* Ligne décorative */}
          {showUnderline && (
            <View style={[styles.underline, { backgroundColor: levelColor }]} />
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

export default HeroCard;