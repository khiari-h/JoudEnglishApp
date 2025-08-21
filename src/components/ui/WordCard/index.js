// src/components/ui/WordCard/index.js - CARTE MOT/PHRASE/GRAMMAIRE/LECTURE/JEUX/ÉVALUATION MODERNE 2025 🎯

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PropTypes from "prop-types";
import createStyles from "./style";

/**
 * 🎯 WordCard - Carte mot/phrase/grammaire/lecture/jeux/évaluation moderne et réutilisable
 * Regroupe : Avancement + Contenu principal + Bouton reveal
 * Design inspiré des meilleures apps 2025
 * ✅ ADAPTÉ : Gère mots, phrases, exercices de grammaire, questions de lecture, jeux de mots ET évaluations
 * 
 * @param {string} content - Contenu principal (mot, phrase, question de grammaire, question de lecture, jeu ou évaluation)
 * @param {string} translation - Traduction, réponse ou contenu révélé
 * @param {string} counter - Compteur stylé (ex: "1 / 80")
 * @param {boolean} showTranslation - État d'affichage de la traduction/réponse
 * @param {function} onToggleTranslation - Fonction pour toggle traduction/réponse
 * @param {string} levelColor - Couleur du niveau
 * @param {string} revealText - Texte du bouton reveal
 * @param {string} hideText - Texte du bouton hide
 * @param {string} type - Type de contenu ("word", "phrase", "grammar", "reading", "game", ou "assessment")
 * @param {boolean} showCounter - Afficher le compteur (optionnel pour grammaire/lecture/jeux/évaluation)
 * @param {boolean} showRevealButton - Afficher le bouton reveal (optionnel pour lecture/jeux/évaluation)
 * @param {string} subtitle - Sous-titre optionnel (pour jeux de mots et évaluations)
 */
const WordCard = ({
  content,
  translation,
  counter,
  showTranslation,
  onToggleTranslation,
  levelColor = "#6366F1",
  revealText = "Révéler la traduction",
  hideText = "Masquer la traduction",
  type = "word", // "word", "phrase", "grammar", "reading", "game" ou "assessment"
  showCounter = true, // Optionnel pour grammaire/lecture/jeux/évaluation
  showRevealButton = true, // Optionnel pour lecture/jeux/évaluation
  subtitle, // Optionnel pour jeux de mots et évaluations
}) => {
  const styles = createStyles(levelColor, type);

  return (
    <View style={styles.container}>
      {/* 🎯 COMPTEUR AVANCEMENT - Style moderne (optionnel pour grammaire/lecture/jeux/évaluation) */}
      {showCounter && (
        <View style={styles.counterSection}>
          <View style={styles.counterBadge}>
            <View style={styles.counterDot} />
            <Text style={styles.counterText}>{counter}</Text>
          </View>
        </View>
      )}

      {/* 🎨 CONTENU PRINCIPAL - Centré avec underline */}
      <View style={styles.contentSection}>
        <Text style={styles.contentText}>{content}</Text>
        {subtitle && (
          <Text style={styles.subtitleText}>{subtitle}</Text>
        )}
        <View style={styles.contentUnderline} />
      </View>
      
      {/* 🔘 BOUTON REVEAL/HIDE - Gradient moderne (optionnel pour lecture/jeux/évaluation) */}
      {showRevealButton && (
        <TouchableOpacity
          style={styles.revealButton}
          onPress={onToggleTranslation}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[levelColor, `${levelColor}E6`]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.revealButtonGradient}
          >
            <Text style={styles.revealButtonText}>
              {showTranslation ? hideText : revealText}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}

      {/* 📝 CONTENU RÉVÉLÉ - Apparaît si showTranslation */}
      {showTranslation && (
        <View style={styles.translationContainer}>
          <Text style={styles.translationText}>{translation}</Text>
        </View>
      )}
    </View>
  );
};

// ✅ PropTypes pour la validation
WordCard.propTypes = {
  content: PropTypes.string.isRequired,
  translation: PropTypes.string.isRequired,
  counter: PropTypes.string,
  showTranslation: PropTypes.bool.isRequired,
  onToggleTranslation: PropTypes.func.isRequired,
  levelColor: PropTypes.string,
  revealText: PropTypes.string,
  hideText: PropTypes.string,
  type: PropTypes.oneOf(['word', 'phrase', 'grammar', 'reading', 'game', 'assessment']),
  showCounter: PropTypes.bool,
  showRevealButton: PropTypes.bool,
  subtitle: PropTypes.string,
};

// ✅ Valeurs par défaut
WordCard.defaultProps = {
  levelColor: "#6366F1",
  revealText: "Révéler la traduction",
  hideText: "Masquer la traduction",
  type: "word",
  showCounter: true,
  showRevealButton: true,
  counter: "1 / 1",
  subtitle: null,
};

export default WordCard;
