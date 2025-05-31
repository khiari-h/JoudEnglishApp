import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { EXERCISE_TYPES, LANGUAGE_LEVELS } from "../../../utils/constants";
import styles from "./style";

/**
 * En-tête redesigné pour tous les écrans d'exercices
 * Option B : couleur par exercice + gradient subtil + icônes thématiques
 */
const ExerciseHeader = ({
  title,
  level,
  exerciseType = "vocabulary", // Type d'exercice pour récupérer couleur/icône
  onClose,
  backIcon = "arrow-back",
}) => {
  const navigation = useNavigation();

  // Récupérer les infos de l'exercice depuis les constantes
  const exerciseInfo = EXERCISE_TYPES[exerciseType] || EXERCISE_TYPES.vocabulary;
  const exerciseColor = exerciseInfo.color;
  const exerciseIcon = exerciseInfo.icon;
  
  // Récupérer la couleur du niveau pour le badge
  const levelInfo = LANGUAGE_LEVELS[level] || LANGUAGE_LEVELS["1"];
  const levelColor = levelInfo.color;
  
  // Affichage du niveau (1,2,3,4,5,6 ou B pour bonus)
  const displayLevel = level === "bonus" ? "B" : level;

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigation.goBack();
    }
  };

  return (
    <LinearGradient
      colors={[`${exerciseColor}12`, `${exerciseColor}04`, "transparent"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.leftSection}>
          {/* Bouton retour stylé */}
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: `${exerciseColor}15` }]}
            onPress={handleClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name={backIcon} size={20} color={exerciseColor} />
          </TouchableOpacity>

          {/* Titre avec icône */}
          <View style={styles.titleSection}>
            <Text style={styles.exerciseIcon}>{exerciseIcon}</Text>
            <Text style={[styles.title, { color: exerciseColor }]}>{title}</Text>
          </View>
        </View>

        {/* Badge niveau */}
        <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
          <Text style={styles.levelText}>{displayLevel}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default ExerciseHeader;