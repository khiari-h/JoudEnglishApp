// src/screens/exercises/wordGames/games/AnagramGame/index.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import GameInstructions from "../../components/GameInstructions";
import styles from "./style";

/**
 * Composant pour le jeu d'anagrammes
 * 
 * @param {Object} game - Données du jeu
 * @param {Array} selectedItems - Items sélectionnés par l'utilisateur
 * @param {Array} shuffledOptions - Lettres mélangées
 * @param {boolean} showFeedback - Indique si le feedback est affiché
 * @param {string} levelColor - Couleur associée au niveau
 * @param {Function} onSelectItem - Fonction appelée lors de la sélection d'une lettre
 */
const AnagramGame = ({
  game,
  selectedItems,
  shuffledOptions,
  showFeedback,
  levelColor,
  onSelectItem
}) => {
  return (
    <View style={styles.gameContainer}>
      <GameInstructions instructions={game.instructions} />

      {/* Zone de réponse de l'utilisateur */}
      <View style={styles.answerContainer}>
        {selectedItems.map((item, index) => (
          <TouchableOpacity
            key={`selected-${index}`}
            style={[styles.letterTile, { backgroundColor: `${levelColor}20` }]}
            onPress={() => onSelectItem(item.value, item.index)}
          >
            <Text style={[styles.letterText, { color: levelColor }]}>
              {item.value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lettres disponibles */}
      <View style={styles.lettersContainer}>
        {shuffledOptions.map((letter, index) => {
          const isSelected = selectedItems.some((item) => item.index === index);
          return (
            <TouchableOpacity
              key={`letter-${index}`}
              style={[styles.letterTile, isSelected && styles.selectedTile]}
              onPress={() => onSelectItem(letter, index)}
              disabled={isSelected || showFeedback}
            >
              <Text style={styles.letterText}>{letter}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Indice si disponible */}
      {game.hint && (
        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>Hint: {game.hint}</Text>
        </View>
      )}
    </View>
  );
};

export default AnagramGame;