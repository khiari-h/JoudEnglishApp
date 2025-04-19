// src/screens/exercises/wordGames/WordGamesHeader/index.js
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./style";

/**
 * En-tête pour l'exercice de jeux de mots (Word Games)
 * 
 * @param {string} level - Niveau de langue (A1, A2, etc.)
 * @param {string} levelColor - Couleur associée au niveau
 * @param {Function} onBackPress - Fonction appelée lorsque le bouton retour est pressé
 */
const WordGamesHeader = ({ level, levelColor, onBackPress }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBackPress}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
        <Text style={styles.levelBadgeText}>{level}</Text>
      </View>
      <Text style={styles.headerTitle}>Word Games</Text>
    </View>
  );
};

export default WordGamesHeader;