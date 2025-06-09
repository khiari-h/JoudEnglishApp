// SpellingWordSection/index.js - WRAPPER INTELLIGENT (pattern VocabularyWordSection)

import React, { memo } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SpellingCorrection from "../SpellingCorrection";
import SpellingRule from "../SpellingRule";
import SpellingInput from "../SpellingInput";
import SpellingHint from "../SpellingHint";
import SpellingFeedback from "../SpellingFeedback";
import HomophoneChoices from "../HomophoneChoices";
import createStyles from "./style";

/**
 * ⚡ SpellingWordSection - Wrapper intelligent
 * Remplace SpellingCard complexe par un wrapper simple
 * Pattern identique à VocabularyWordSection et ErrorCorrectionWordSection
 * 
 * @param {Object} currentExercise - Exercice actuel avec ses propriétés
 * @param {string} exerciseCounter - Compteur stylé (ex: "5 / 20")
 * @param {string} level - Niveau actuel
 * @param {string} levelColor - Couleur du niveau
 * @param {string} userInput - Réponse utilisateur
 * @param {boolean} showHint - Afficher l'indice
 * @param {boolean} showFeedback - Afficher le feedback
 * @param {boolean} isCorrect - Réponse correcte
 * @param {boolean} isCompleted - Exercice déjà complété
 * @param {function} onChangeText - Callback pour changer le texte
 * @param {function} onToggleHint - Callback pour toggle l'indice
 */
const SpellingWordSection = memo(({
  currentExercise,
  exerciseCounter,
  level,
  levelColor,
  userInput,
  showHint,
  showFeedback,
  isCorrect,
  isCompleted,
  onChangeText,
  onToggleHint,
}) => {
  const styles = createStyles(levelColor);
  
  if (!currentExercise) return null;

  return (
    <View style={styles.container}>
      {/* 🎯 COMPTEUR STYLÉ - Pattern identique aux autres exercices */}
      <View style={styles.counterSection}>
        <LinearGradient
          colors={[`${levelColor}08`, `${levelColor}04`, 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.counterGradient}
        >
          {/* Badge complété */}
          {isCompleted && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedText}>✓ Complété</Text>
            </View>
          )}

          {/* Compteur principal */}
          <View style={[styles.counterBadge, { borderColor: `${levelColor}20` }]}>
            <Text style={[styles.counterText, { color: levelColor }]}>
              {exerciseCounter}
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/* 🎨 CONTENU EXERCICE - Switch selon le type */}
      <View style={styles.exerciseContent}>
        {/* CORRECTION MODE */}
        {currentExercise.type === 'correction' && (
          <SpellingCorrection
            wordToCorrect={currentExercise.wordToCorrect}
            instruction={currentExercise.instruction}
            levelColor={levelColor}
          />
        )}

        {/* SPELLING RULE MODE */}
        {currentExercise.type === 'spelling_rule' && (
          <SpellingRule
            rule={currentExercise.rule}
            instruction={currentExercise.instruction}
            levelColor={levelColor}
          />
        )}

        {/* HOMOPHONES MODE */}
        {currentExercise.type === 'homophones' && (
          <View style={styles.homophoneContainer}>
            <Text style={styles.instruction}>{currentExercise.instruction}</Text>
          </View>
        )}

        {/* ZONE DE SAISIE - Switch selon le type */}
        {currentExercise.type === 'homophones' ? (
          <HomophoneChoices
            sentence={currentExercise.sentence}
            choices={currentExercise.choices}
            selectedChoice={userInput}
            onSelectChoice={onChangeText}
            disabled={showFeedback}
            levelColor={levelColor}
          />
        ) : (
          <SpellingInput
            value={userInput}
            onChangeText={onChangeText}
            disabled={showFeedback}
            levelColor={levelColor}
          />
        )}

        {/* INDICE */}
        {currentExercise.hint && (
          <SpellingHint
            hint={currentExercise.hint}
            showHint={showHint}
            onToggle={onToggleHint}
            levelColor={levelColor}
          />
        )}

        {/* FEEDBACK */}
        {showFeedback && (
          <SpellingFeedback
            isCorrect={isCorrect}
            correctAnswer={currentExercise.correctAnswer}
            explanation={currentExercise.explanation}
            levelColor={levelColor}
          />
        )}
      </View>
    </View>
  );
});

SpellingWordSection.displayName = "SpellingWordSection";

export default SpellingWordSection;