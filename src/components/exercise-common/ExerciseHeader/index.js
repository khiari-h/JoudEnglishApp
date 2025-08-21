// components/exercise-common/ExerciseHeader/index.js - VERSION MODESTE STYLE IPHONE
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import PropTypes from 'prop-types';
import { EXERCISE_TYPES, LANGUAGE_LEVELS } from "../../../utils/constants";
import styles from "./style";

/**
 * ✨ ExerciseHeader - Version Modeste Style iPhone
 * - Blanc pur légèrement teinté
 * - Design épuré et élégant
 * - Effets subtils et propres
 * - Style minimaliste et moderne
 */
const ExerciseHeader = ({
  title,
  level,
  exerciseType = "vocabulary",
  onClose,
  backIcon = "arrow-back",
}) => {
  const navigation = useNavigation();

  // Récupérer les infos de l'exercice (seule la couleur nous intéresse)
  const exerciseInfo = EXERCISE_TYPES[exerciseType] || EXERCISE_TYPES.vocabulary;
  const exerciseColor = exerciseInfo.color;

  // ✅ MAPPING INVERSE : Convertir niveau CECR (A1, A2, etc.) en niveau numérique (1, 2, etc.)
  // car LANGUAGE_LEVELS contient des niveaux numériques mais on reçoit des niveaux CECR
  const mapCECRToNumeric = (cecrLevel) => {
    const mapping = { A1: "1", A2: "2", B1: "3", B2: "4", C1: "5", C2: "6" };
    return mapping[cecrLevel] || "1"; // Fallback vers "1" si niveau non reconnu
  };

  // Récupérer la couleur du niveau
  const numericLevel = mapCECRToNumeric(level);
  const levelInfo = LANGUAGE_LEVELS[numericLevel] || LANGUAGE_LEVELS["1"];
  const levelColor = levelInfo.color;

  // Affichage du niveau
  const displayLevel = level === "bonus" ? "B" : level;

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
        {/* =================== SECTION GAUCHE =================== */}
        <HeaderLeftSection
          handleClose={handleClose}
          backIcon={backIcon}
          localStyles={styles}
        />

        {/* =================== TITRE CENTRÉ =================== */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{title}</Text>
        </View>

        {/* =================== BADGE NIVEAU - AVEC TRANSPARENCE =================== */}
        <LevelBadge
          displayLevel={displayLevel}
          localStyles={styles}
        />
      </View>
    </View>
  );
};

const HeaderLeftSection = ({ handleClose, backIcon, localStyles }) => (
  <View style={localStyles.leftSection}>
    <TouchableOpacity
      testID="back-button"
      style={localStyles.backButton}
      onPress={() => {
        handleClose();
      }}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      activeOpacity={0.6}
      accessibilityRole="button"
    >
      <Ionicons name={backIcon} size={20} color="#475569" />
    </TouchableOpacity>
  </View>
);

// PropTypes pour HeaderLeftSection
HeaderLeftSection.propTypes = {
  handleClose: PropTypes.func.isRequired,
  backIcon: PropTypes.string.isRequired,
  localStyles: PropTypes.object.isRequired,
};

const LevelBadge = ({ displayLevel, localStyles }) => (
  <View style={localStyles.levelBadge}> 
    <Text style={localStyles.levelText}>{displayLevel}</Text>
  </View>
);

// PropTypes pour LevelBadge
LevelBadge.propTypes = {
  displayLevel: PropTypes.string.isRequired,
  localStyles: PropTypes.object.isRequired,
};

// PropTypes pour le composant principal ExerciseHeader
ExerciseHeader.propTypes = {
  title: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  exerciseType: PropTypes.string,
  onClose: PropTypes.func,
  backIcon: PropTypes.string,
};

export default ExerciseHeader;