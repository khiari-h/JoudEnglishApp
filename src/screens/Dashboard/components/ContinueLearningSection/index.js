import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "../../../../components/ui/Card";
import styles from "./style";

/**
 * Composant pour continuer la dernière activité de l'utilisateur
 * Textes cohérents avec le nom du composant
 */
const ContinueLearningSection = ({
  lastActivity,
  onPress,
  accentColor = "#3B82F6",
  formatProgressSubtitle,
  isLoading = false,
}) => {
  // État de chargement
  if (isLoading) {
    return (
      <Card
        style={[
          styles.card,
          { borderLeftColor: accentColor, borderLeftWidth: 4 },
        ]}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={accentColor} />
          <Text style={styles.loadingText}>
            Chargement de votre activité récente...
          </Text>
        </View>
      </Card>
    );
  }

  // Si aucune activité n'est disponible, juste informer
  if (!lastActivity) {
    return (
      <Card
        style={[
          styles.card,
          { borderLeftColor: accentColor, borderLeftWidth: 4 },
        ]}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Activité récente</Text>
              <Text style={styles.emptyStateDescription}>
                Aucune activité récente trouvée
              </Text>
            </View>
          </View>

          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateHint}>
              💡 Vos prochains exercices apparaîtront ici
            </Text>
          </View>
        </View>
      </Card>
    );
  }

  // Obtenir le sous-titre formaté pour afficher des détails précis sur la position
  const subtitle = formatProgressSubtitle
    ? formatProgressSubtitle(lastActivity)
    : `Niveau ${lastActivity.level}`;

  return (
    <Card
      style={[
        styles.card,
        { borderLeftColor: accentColor, borderLeftWidth: 4 },
      ]}
    >
      <View style={styles.content}>
        {/* Titre principal */}
        <Text style={styles.title}>Continuer l'apprentissage</Text>

        {/* Activité et détails */}
        <Text style={styles.activityTitle}>
          {lastActivity.title} • {subtitle.split(" • ")[0]}
        </Text>

        {/* Ligne avec niveau/temps et bouton */}
        <View style={styles.bottomRow}>
          <View style={styles.metaInfo}>
            <Text style={styles.levelText}>Niveau {lastActivity.level}</Text>
            <Text style={styles.separator}> • </Text>
            <View style={styles.timeContainer}>
              <Ionicons name="time-outline" size={12} color="#6B7280" />
              <Text style={styles.timeText}>{lastActivity.timeElapsed}</Text>
            </View>
          </View>

          {/* Bouton pour reprendre l'activité */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: accentColor }]}
            onPress={() => onPress && onPress(lastActivity)}
            activeOpacity={0.7}
          >
            <Ionicons
              name="play"
              size={16}
              color="white"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Reprendre</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

export default ContinueLearningSection;
