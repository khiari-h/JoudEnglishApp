// components/exercise-common/ExerciseHeader/index.js - VERSION ULTRA-MODERNE 2025
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import PropTypes from 'prop-types';
import { EXERCISE_TYPES, LANGUAGE_LEVELS } from "../../../utils/constants";
import styles from "./style";

/**
 * 🔥 ExerciseHeader - Version Ultra-Moderne 2025
 * - Design ultra-clean inspiré des meilleures apps
 * - Gradients modernes au lieu d'effets glossy
 * - Typography moderne et lisible
 * - Micro-interactions et animations subtiles
 */
const ExerciseHeader = ({
  title,
  level,
  exerciseType = "vocabulary",
  onClose,
  backIcon = "arrow-back",
  mode = null, // Nouveau prop pour afficher le mode (fast, classic, etc.)
}) => {
  const navigation = useNavigation();

  // Récupérer les infos de l'exercice
  const exerciseInfo = EXERCISE_TYPES[exerciseType] || EXERCISE_TYPES.vocabulary;

  // ✅ MAPPING INVERSE : Convertir niveau CECR (A1, A2, etc.) en niveau numérique
  const mapCECRToNumeric = (cecrLevel) => {
    const mapping = { A1: "1", A2: "2", B1: "3", B2: "4", C1: "5", C2: "6" };
    return mapping[cecrLevel] || "1";
  };

  // Récupérer les infos du niveau
  const numericLevel = mapCECRToNumeric(level);
  const levelInfo = LANGUAGE_LEVELS[numericLevel] || LANGUAGE_LEVELS["1"];

  // Affichage du niveau
  const displayLevel = level === "bonus" ? "B" : level;

  // Récupérer l'icône de l'exercice
  const getExerciseIcon = (type) => {
    const iconMap = {
      vocabulary: "book-outline",
      grammar: "construct-outline", 
      conjugation: "language-outline",
      comprehension: "reader-outline",
      listening: "headset-outline"
    };
    return iconMap[type] || "book-outline";
  };

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      navigation.goBack();
    }
  }, [onClose, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* =================== BOUTON RETOUR MODERNE =================== */}
        <TouchableOpacity
          testID="back-button"
          style={styles.backButton}
          onPress={handleClose}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          activeOpacity={0.7}
          accessibilityRole="button"
        >
          <Ionicons name={backIcon} size={18} color="#374151" />
        </TouchableOpacity>

        {/* =================== SECTION CENTRE - TITRE + ICÔNE + MODE =================== */}
        <View style={styles.centerSection}>
          {/* Container titre + icône */}
          <View style={styles.titleContainer}>
            <Ionicons 
              name={getExerciseIcon(exerciseType)} 
              size={20} 
              color="#6366F1" 
              style={styles.titleIcon}
            />
            <Text style={styles.title}>{title}</Text>
          </View>

          {/* Mode indicator - Si fourni */}
          {mode && (
            <>
              <View style={styles.separator} />
              <View style={styles.modeContainer}>
                <View style={styles.modeIndicator} />
                <Text style={styles.modeText}>{mode}</Text>
              </View>
            </>
          )}
        </View>

        {/* =================== BADGE NIVEAU MODERNE =================== */}
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>{displayLevel}</Text>
        </View>
      </View>
    </View>
  );
};

// PropTypes
ExerciseHeader.propTypes = {
  title: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  exerciseType: PropTypes.string,
  onClose: PropTypes.func,
  backIcon: PropTypes.string,
  mode: PropTypes.string, // Nouveau prop pour le mode
};

export default ExerciseHeader;