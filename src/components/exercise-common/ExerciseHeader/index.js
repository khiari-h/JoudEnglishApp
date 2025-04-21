// src/components/exercise-common/ExerciseHeader/index.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";

/**
 * En-tête standardisé pour tous les écrans d'exercices
 * Version simplifiée sans barre de progression
 */
const ExerciseHeader = ({
  title,
  level,
  onClose,
  levelColor = "#5E60CE",
  backIcon = "arrow-back",
}) => {
  const navigation = useNavigation();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleClose}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name={backIcon} size={24} color="#6B7280" />
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>

        <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
          <Text style={styles.levelText}>{level}</Text>
        </View>
      </View>
    </View>
  );
};

export default ExerciseHeader;