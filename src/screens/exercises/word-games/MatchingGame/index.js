// src/screens/exercises/wordGames/games/MatchingGame/index.js
import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import GameInstructions from "../GameInstructions";
import styles from "./style";

/**
 * Composant pour le jeu d'association de paires
 *
 * @param {Object} game - Données du jeu
 * @param {Array} selectedItems - Items sélectionnés par l'utilisateur
 * @param {Array} matchedItems - Items correctement appariés
 * @param {Array} shuffledOptions - Options mélangées
 * @param {boolean} showFeedback - Indique si le feedback est affiché
 * @param {string} levelColor - Couleur associée au niveau
 * @param {Function} onSelectItem - Fonction appelée lors de la sélection d'un item
 */
const MatchingGame = ({
  game,
  selectedItems,
  matchedItems,
  shuffledOptions,
  showFeedback,
  levelColor,
  onSelectItem,
}) => {
  // Handler stable pour la sélection d'un item
  const handleSelectItem = useCallback(
    (item, index, isMatched, feedbackVisible) => () => {
      if (!isMatched && !feedbackVisible) {
        onSelectItem(item, index);
      }
    },
    [onSelectItem]
  );

  return (
    <View style={styles.gameContainer}>
      <GameInstructions instructions={game.instructions} />

      <View style={styles.matchingContainer}>
        {shuffledOptions.map((item, index) => {
          const isMatched = matchedItems.includes(item);
          const isSelected = selectedItems.some(
            (selected) => selected.index === index
          );

          return (
            <TouchableOpacity
              key={item}
              style={[
                styles.matchingTile,
                isSelected && [
                  styles.selectedMatchingTile,
                  { borderColor: levelColor },
                ],
                isMatched && [
                  styles.matchedTile,
                  { backgroundColor: `${levelColor}20` },
                ],
              ]}
              onPress={handleSelectItem(item, index, isMatched, showFeedback)}
              disabled={isMatched || showFeedback}
            >
              <Text
                style={[
                  styles.matchingText,
                  isMatched && { color: levelColor },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {game.hint && (
        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>Hint: {game.hint}</Text>
        </View>
      )}
    </View>
  );
};

export default MatchingGame;

