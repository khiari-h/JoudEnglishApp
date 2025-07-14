// ErrorCorrectionWordSection/index.js - WRAPPER INTELLIGENT (pattern VocabularyWordSection)

import { memo } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FullCorrectionMode from "../modes/FullCorrectionMode";
import IdentifyErrorsMode from "../modes/IdentifyErrorsMode";
import MultipleChoiceMode from "../modes/MultipleChoiceMode";
import createStyles from "./style";

/**
 * ⚡ ErrorCorrectionWordSection - Wrapper intelligent
 * Garde toute la logique métier (compteur, mode switching, etc.)
 * Pattern identique à VocabularyWordSection
 * 
 * @param {Object} currentExercise - Exercice actuel avec ses propriétés
 * @param {string} exerciseCounter - Compteur stylé (ex: "5 / 20")
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
 */
const ErrorCorrectionWordSection = memo(({
  currentExercise,
  exerciseCounter,
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
}) => {
  const styles = createStyles();
  
  return (
    <View style={styles.container}>
      {/* 🎯 COMPTEUR STYLÉ - Garde la logique existante */}
      <View style={styles.counterSection}>
        <LinearGradient
          colors={[`${levelColor}08`, `${levelColor}04`, 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.counterGradient}
        >
          {/* Compteur principal */}
          <View style={[styles.counterBadge, { borderColor: `${levelColor}20` }]}>
            <Text style={[styles.counterText, { color: levelColor }]}>
              {exerciseCounter}
            </Text>
          </View>
        </LinearGradient>
      </View>

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

ErrorCorrectionWordSection.displayName = "ErrorCorrectionWordSection";

export default ErrorCorrectionWordSection;