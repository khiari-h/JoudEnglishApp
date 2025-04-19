// src/screens/exercises/spelling/SpellingCard/index.js
import React from "react";
import { View, Text, ScrollView } from "react-native";
import SpellingInput from "../SpellingInput";
import SpellingHint from "../SpellingHint";
import SpellingFeedback from "../SpellingFeedback";
import SpellingCorrection from "../exercises/SpellingCorrection";
import SpellingRule from "../exercises/SpellingRule";
import styles from "./style";

/**
 * Carte principale pour afficher un exercice d'orthographe
 * 
 * @param {Object} exercise - L'exercice actuel
 * @param {string} userInput - La réponse saisie par l'utilisateur
 * @param {boolean} showHint - Indique si l'indice doit être affiché
 * @param {boolean} showFeedback - Indique si le feedback doit être affiché
 * @param {boolean} isCorrect - Indique si la réponse est correcte
 * @param {boolean} isCompleted - Indique si l'exercice a déjà été complété
 * @param {Function} onChangeText - Fonction appelée lors de la modification du texte
 * @param {Function} onToggleHint - Fonction pour afficher/masquer l'indice
 * @param {string} levelColor - Couleur associée au niveau
 */
const SpellingCard = ({
  exercise,
  userInput,
  showHint,
  showFeedback,
  isCorrect,
  isCompleted,
  onChangeText,
  onToggleHint,
  levelColor
}) => {
  if (!exercise) return null;

  // Afficher le bon composant selon le type d'exercice
  const renderExerciseContent = () => {
    switch (exercise.type) {
      case "correction":
        return (
          <SpellingCorrection
            wordToCorrect={exercise.wordToCorrect}
            instruction={exercise.instruction}
          />
        );
      case "spelling_rule":
        return (
          <SpellingRule
            rule={exercise.rule}
            instruction={exercise.instruction}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={[
        styles.card, 
        isCompleted && { borderLeftWidth: 4, borderLeftColor: "#10b981" }
      ]}>
        {isCompleted && (
          <View style={styles.completedBadge}>
            <Text style={styles.completedText}>Completed</Text>
          </View>
        )}
        
        {/* Contenu de l'exercice */}
        {renderExerciseContent()}
        
        {/* Zone de saisie */}
        <SpellingInput
          value={userInput}
          onChangeText={onChangeText}
          disabled={showFeedback}
          levelColor={levelColor}
        />
        
        {/* Indice */}
        {exercise.hasHint && (
          <SpellingHint
            hint={exercise.hint}
            showHint={showHint}
            onToggle={onToggleHint}
            levelColor={levelColor}
          />
        )}
        
        {/* Feedback */}
        {showFeedback && (
          <SpellingFeedback
            isCorrect={isCorrect}
            correctAnswer={exercise.correctAnswer}
            explanation={exercise.explanation}
            levelColor={levelColor}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default SpellingCard;