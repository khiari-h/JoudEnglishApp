// src/components/ui/HeroCard/index.js - VERSION MOBILE-FRIENDLY
import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import createStyles from "./style";

/**
 * 🎯 HeroCard - Version Mobile-Friendly Premium
 * - Backgrounds solides pour lisibilité mobile
 * - Ombres neutres (pas colorées)
 * - Contrastes optimisés (WCAG AA)
 * - Cross-platform cohérent
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
  children,
}) => {
  const styles = createStyles(levelColor);
  
  // Calcul automatique du lineHeight si non fourni
  const calculatedLineHeight = lineHeight || Math.round(fontSize * 1.3);

  return (
    <View style={[styles.heroSection, containerStyle]}>
      <LinearGradient
        colors={[
          'white',
          `${levelColor}08`, // Gradient très subtil vers couleur
          `${levelColor}12`   // Légèrement plus visible
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroGradient}
      >
        {/* Cercles décoratifs - plus visibles */}
        <View style={[styles.decorativeCircle, styles.circle1, { backgroundColor: `${levelColor}15` }]} />
        <View style={[styles.decorativeCircle, styles.circle2, { backgroundColor: `${levelColor}10` }]} />
        
        {/* Contenu principal */}
        <View style={styles.contentContainer}>
          {content ? (
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
          ) : null}
          {children}
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