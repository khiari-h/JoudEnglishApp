// components/exercise-common/ExerciseHeader/index.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { EXERCISE_TYPES, LANGUAGE_LEVELS } from "../../../utils/constants";
import styles from "./style";

/**
 * 🏆 ExerciseHeader - Design Niveau LDC (Paris Saint-Germain)
 * - Gradients riches et contrastés
 * - Glassmorphism effects
 * - Typography premium
 * - Ombres spectaculaires
 * - Micro-animations subtiles
 */
const ExerciseHeader = ({
  title,
  level,
  exerciseType = "vocabulary",
  onClose,
  backIcon = "arrow-back",
}) => {
  const navigation = useNavigation();

  // Récupérer les infos de l'exercice
  const exerciseInfo = EXERCISE_TYPES[exerciseType] || EXERCISE_TYPES.vocabulary;
  const exerciseColor = exerciseInfo.color;
  const exerciseIcon = exerciseInfo.icon;

  // Récupérer la couleur du niveau
  const levelInfo = LANGUAGE_LEVELS[level] || LANGUAGE_LEVELS["1"];
  const levelColor = levelInfo.color;

  // Affichage du niveau
  const displayLevel = level === "bonus" ? "B" : level;

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {/* 🎨 GRADIENT BACKGROUND - Plus riche et contrasté */}
      <LinearGradient
        colors={[
          `${exerciseColor}18`, // Plus opaque pour plus de présence
          `${exerciseColor}10`,
          `${exerciseColor}06`,
          'transparent'
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        {/* Cercles décoratifs en arrière-plan */}
        <View style={[styles.decorativeCircle, styles.circle1, { backgroundColor: `${exerciseColor}08` }]} />
        <View style={[styles.decorativeCircle, styles.circle2, { backgroundColor: `${exerciseColor}05` }]} />

        <View style={styles.content}>
          {/* =================== SECTION GAUCHE =================== */}
          <View style={styles.leftSection}>
            {/* Bouton retour avec glassmorphism */}
            <TouchableOpacity
              style={[styles.backButton, { backgroundColor: `${exerciseColor}12` }]}
              onPress={handleClose}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              activeOpacity={0.7}
            >
              <View style={[styles.backButtonInner, { backgroundColor: `${exerciseColor}08` }]}>
                <Ionicons name={backIcon} size={20} color={exerciseColor} />
              </View>
            </TouchableOpacity>

            {/* Titre avec icône - Design premium */}
            <View style={styles.titleSection}>
              {/* Icône d'exercice avec effet glassmorphism */}
              <View style={[styles.exerciseIconContainer, { backgroundColor: `${exerciseColor}15` }]}>
                <Text style={styles.exerciseIcon}>{exerciseIcon}</Text>
                <View style={[styles.iconGlow, { backgroundColor: `${exerciseColor}20` }]} />
              </View>
              
              {/* Titre avec typography premium */}
              <View style={styles.titleContainer}>
                <Text style={[styles.title, { color: exerciseColor }]}>
                  {title}
                </Text>
                <View style={[styles.titleUnderline, { backgroundColor: `${exerciseColor}40` }]} />
              </View>
            </View>
          </View>

          {/* =================== BADGE NIVEAU - Hero style =================== */}
          <View style={styles.levelSection}>
            <LinearGradient
              colors={[levelColor, `${levelColor}E6`, `${levelColor}CC`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.levelBadge}
            >
              {/* Effet glassmorphism sur le badge */}
              <View style={styles.levelBadgeInner}>
                <Text style={styles.levelText}>{displayLevel}</Text>
                <View style={styles.levelStar}>⭐</View>
              </View>
            </LinearGradient>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default ExerciseHeader;