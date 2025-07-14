// src/components/exercise-common/ExerciseCard/index.js
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";

/**
 * Carte représentant un type d'exercice dans la sélection des exercices
 */
const ExerciseCard = ({
  title,
  description,
  icon,
  progress,
  color = "#5E60CE",
  onPress,
  isNew = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: color, borderLeftWidth: 4 }]}
      onPress={onPress}
    >
      <View style={styles.topSection}>
        <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
          <Text style={styles.icon}>{icon}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>

      {progress > 0 ? (
        <View style={styles.progressSection}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progress}%`, backgroundColor: color },
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color }]}>{progress}%</Text>
          </View>
        </View>
      ) : isNew ? (
        <View style={styles.badgeContainer}>
          <View style={[styles.badge, { backgroundColor: `${color}15` }]}>
            <Text style={[styles.badgeText, { color }]}>Nouveau</Text>
          </View>
        </View>
      ) : null}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: color }]}
          onPress={onPress}
        >
          <Text style={styles.buttonText}>Commencer</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ExerciseCard;

