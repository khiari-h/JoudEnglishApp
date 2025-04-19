// src/components/screens/exercises/reading/ReadingHeader/index.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";

/**
 * En-tête pour l'écran d'exercice de lecture
 */
const ReadingHeader = ({ level, onBackPress, levelColor }) => {
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
      <Text style={styles.exerciseTitle}>Reading</Text>
    </View>
  );
};

export default ReadingHeader;