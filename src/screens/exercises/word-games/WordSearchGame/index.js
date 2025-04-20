// src/screens/exercises/wordGames/games/WordSearchGame/index.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import GameInstructions from "../GameInstructions";
import styles from "./style";

/**
 * Composant pour le jeu de recherche de mots
 *
 * @param {Object} game - Données du jeu
 * @param {Array} selectedItems - Items sélectionnés par l'utilisateur
 * @param {Array} matchedItems - Mots trouvés
 * @param {boolean} showFeedback - Indique si le feedback est affiché
 * @param {string} levelColor - Couleur associée au niveau
 * @param {Function} onSelectItem - Fonction appelée lors de la sélection d'une lettre
 */
const WordSearchGame = ({
  game,
  selectedItems,
  matchedItems,
  showFeedback,
  levelColor,
  onSelectItem,
}) => {
  return (
    <View style={styles.gameContainer}>
      <GameInstructions instructions={game.instructions} />

      {/* Grille de recherche de mots */}
      <View style={styles.wordSearchGrid}>
        {game.grid.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.gridRow}>
            {row.map((letter, colIndex) => {
              const index = rowIndex * row.length + colIndex;
              const isSelected = selectedItems.some(
                (item) => item.index === index
              );

              return (
                <TouchableOpacity
                  key={`cell-${rowIndex}-${colIndex}`}
                  style={[
                    styles.gridCell,
                    isSelected && [
                      styles.selectedCell,
                      { backgroundColor: `${levelColor}30` },
                    ],
                  ]}
                  onPress={() => onSelectItem(letter, index)}
                  disabled={showFeedback}
                >
                  <Text
                    style={[
                      styles.gridCellText,
                      isSelected && { color: levelColor, fontWeight: "bold" },
                    ]}
                  >
                    {letter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>

      {/* Liste des mots à trouver */}
      <View style={styles.wordsToFindContainer}>
        <Text style={styles.wordsToFindTitle}>Words to find:</Text>
        <View style={styles.wordsToFindList}>
          {game.words.map((word, index) => (
            <Text
              key={`word-${index}`}
              style={[
                styles.wordToFind,
                matchedItems.includes(word) && [
                  styles.foundWord,
                  { color: levelColor },
                ],
              ]}
            >
              {word} {matchedItems.includes(word) && "✓"}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default WordSearchGame;
