// ErrorCorrectionWordSection/index.js - WRAPPER INTELLIGENT avec PropTypes complets

import { memo } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PropTypes from 'prop-types';
import FullCorrectionMode from "../modes/FullCorrectionMode";
import IdentifyErrorsMode from "../modes/IdentifyErrorsMode";
import createStyles from "./style";

/**
 * ⚡ ErrorCorrectionWordSection - Wrapper intelligent
 * Garde toute la logique métier (compteur, mode switching, etc.)
 * Pattern identique à VocabularyWordSection
 * 
 * @param {Object} currentExercise - Exercice actuel avec ses propriétés
 * @param {string} categoryName - Nom de la catégorie (ex: "Articles", "Verb to Be")
 * @param {string} correctionMode - Mode de correction (full/identify/multiple_choice)
 * @param {string} levelColor - Couleur du niveau
 * @param {boolean} showFeedback - État d'affichage du feedback
 * @param {boolean} isCorrect - Réponse correcte ou non
 * @param {string} userCorrection - Texte corrigé (mode full)
 * @param {Array} selectedErrorIndices - Indices sélectionnés (mode identify)
 * @param {number} selectedChoiceIndex - Choix sélectionné (mode multiple_choice)
 * @param {function} onChangeUserCorrection - Callback mode full
 * @param {function} onToggleErrorIndex - Callback mode identify
 * @param {function} onSelectChoice - Callback mode multiple_choice
 * @param {Component} MultipleChoiceMode - Composant pour le mode multiple choice
 */
const ErrorCorrectionWordSection = memo(({
  currentExercise,
  categoryName,
  correctionMode,
  levelColor,
  showFeedback,
  isCorrect,
  // Mode-specific props
  userCorrection,
  selectedErrorIndices,
  selectedChoiceIndex,
  onChangeUserCorrection,
  onToggleErrorIndex,
  onSelectChoice,
  MultipleChoiceMode,
}) => {
  const styles = createStyles();
  
  return (
    <View style={styles.container}>
      {/* 🎯 NOM DE CATÉGORIE - Remplacé le compteur par le nom de catégorie */}
      <CategorySection categoryName={categoryName} levelColor={levelColor} styles={styles} />

      {/* 🎨 MODE SWITCHING - Affiche le bon composant selon le mode */}
      {correctionMode === 'full' && (
        <FullCorrectionMode
          exercise={currentExercise}
          userCorrection={userCorrection}
          onChangeUserCorrection={onChangeUserCorrection}
          showFeedback={showFeedback}
          isCorrect={isCorrect}
          levelColor={levelColor}
        />
      )}

      {correctionMode === 'identify' && (
        <IdentifyErrorsMode
          exercise={currentExercise}
          selectedErrorIndices={selectedErrorIndices}
          onToggleErrorIndex={onToggleErrorIndex}
          showFeedback={showFeedback}
          levelColor={levelColor}
        />
      )}

      {correctionMode === 'multiple_choice' && (
        <MultipleChoiceMode
          exercise={currentExercise}
          selectedChoiceIndex={selectedChoiceIndex}
          onSelectChoice={onSelectChoice}
          showFeedback={showFeedback}
          levelColor={levelColor}
        />
      )}

      {/* 🚨 MODE INCONNU */}
      {!['full', 'identify', 'multiple_choice'].includes(correctionMode) && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Mode de correction inconnu: {correctionMode}
          </Text>
        </View>
      )}
    </View>
  );
});

// PropTypes pour le composant principal ErrorCorrectionWordSection
ErrorCorrectionWordSection.propTypes = {
  currentExercise: PropTypes.object.isRequired,
  categoryName: PropTypes.string.isRequired,
  correctionMode: PropTypes.oneOf(['full', 'identify', 'multiple_choice']).isRequired,
  levelColor: PropTypes.string.isRequired,
  showFeedback: PropTypes.bool.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  // Mode-specific props
  userCorrection: PropTypes.string,
  selectedErrorIndices: PropTypes.arrayOf(PropTypes.number),
  selectedChoiceIndex: PropTypes.number,
  onChangeUserCorrection: PropTypes.func,
  onToggleErrorIndex: PropTypes.func,
  onSelectChoice: PropTypes.func,
  MultipleChoiceMode: PropTypes.elementType, // PropTypes for the MultipleChoiceMode component
};

ErrorCorrectionWordSection.displayName = "ErrorCorrectionWordSection";

// ✅ COMPOSANT CategorySection - Affiche le nom de la catégorie
const CategorySection = ({ categoryName, levelColor, styles }) => (
  <View style={styles.counterSection}>
    <LinearGradient
      colors={[`${levelColor}08`, `${levelColor}04`, 'transparent']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.counterGradient}
    >
      {/* Nom de la catégorie */}
      <View style={[styles.counterBadge, { borderColor: `${levelColor}20` }]}> 
        <Text style={[styles.counterText, { color: levelColor }]}> 
          {categoryName}
        </Text>
      </View>
    </LinearGradient>
  </View>
);

// ✅ PropTypes pour CategorySection
CategorySection.propTypes = {
  categoryName: PropTypes.string.isRequired,
  levelColor: PropTypes.string.isRequired,
  styles: PropTypes.shape({
    counterSection: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    counterGradient: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    counterBadge: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    counterText: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  }).isRequired,
};

export default ErrorCorrectionWordSection;