// components/exercise-common/ExerciseHeader/index.js - VERSION HUMAINE & ÉPURÉE
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { EXERCISE_TYPES, LANGUAGE_LEVELS } from "../../../utils/constants";
import styles from "./style";

/**
 * 🕊️ ExerciseHeader - Version Humaine & Épurée
 * - Design "invisible" qui met en avant le contenu
 * - Blanc pur universel
 * - Simplicité et fonctionnalité
 * - Zéro superflu, zéro bling-bling
 * - Élégance dans la sobriété
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
      <View style={styles.content}>
        {/* =================== SECTION GAUCHE =================== */}
        <View style={styles.leftSection}>
          {/* Bouton retour - ultra-simple */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleClose}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            activeOpacity={0.6}
          accessibilityRole="button"
          >
            <Ionicons name={backIcon} size={22} color="#64748b" />
          </TouchableOpacity>

          {/* Titre avec icône - design épuré */}
          <View style={styles.titleSection}>
            {/* Icône d'exercice simple */}
            <Text style={styles.exerciseIcon}>{exerciseIcon}</Text>
            
            {/* Titre épuré */}
            <Text style={[styles.title, { color: exerciseColor }]}>
              {title}
            </Text>
          </View>
        </View>

        {/* =================== BADGE NIVEAU - Minimal =================== */}
        <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
          <Text style={styles.levelText}>{displayLevel}</Text>
        </View>
      </View>
    </View>
  );
};

export default ExerciseHeader;