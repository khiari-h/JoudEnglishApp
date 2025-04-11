// src/components/exercise-common/ExerciseHeader/index.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";

/**
 * En-tête standardisé pour tous les écrans d'exercices
 * Utilise maintenant une flèche de retour au lieu d'une croix
 */
const ExerciseHeader = ({
  title,
  level,
  progress,
  totalExercises,
  currentExercise,
  onClose,
  showProgress = true,
  levelColor = "#5E60CE",
  backIcon = "arrow-back", // Nouvelle prop avec valeur par défaut "arrow-back"
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

      {showProgress && (
        <View style={styles.progressContainer}>
          <View style={styles.countContainer}>
            <Text style={styles.exerciseCount}>
              {currentExercise}/{totalExercises}
            </Text>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progress}%`, backgroundColor: levelColor },
                ]}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ExerciseHeader;