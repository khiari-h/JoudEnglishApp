// src/components/exercise-common/ExerciseCard/index.js
import { memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import styles from "./style";

/**
 * Carte représentant un type d'exercice dans la sélection des exercices
 * 
 * @param {string} title - Titre de l'exercice
 * @param {string} description - Description courte de l'exercice
 * @param {string} icon - Icône ou emoji représentant l'exercice
 * @param {number} progress - Pourcentage de progression (0-100)
 * @param {string} color - Couleur principale de la carte
 * @param {function} onPress - Callback appelé au clic sur la carte
 * @param {boolean} isNew - Indique si l'exercice est nouveau (badge "Nouveau")
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
              {/* testID utile pour vérifier la largeur dynamique de la barre de progression dans les tests unitaires */}
              <View
                style={[styles.progressFill, { width: `${Math.round(Number(progress) || 0)}%`, backgroundColor: color }]}
                testID="progress-fill"
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

// PropTypes pour la validation des props
ExerciseCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  color: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
};

// Valeurs par défaut
ExerciseCard.defaultProps = {
  color: "#5E60CE",
  isNew: false,
};

export default memo(ExerciseCard);