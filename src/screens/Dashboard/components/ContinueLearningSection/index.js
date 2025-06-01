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

  // Extraire les infos pour le nouveau format
  const levelNumber = lastActivity.level;
  const mode = lastActivity.metadata?.mode;
  const modeText = mode === 'fast' ? 'Fast' : mode === 'classic' ? 'Classique' : '';
  const categoryIndex = (lastActivity.metadata?.category || 0) + 1;
  const wordIndex = (lastActivity.metadata?.word || 0) + 1;

  // Format temps court
  const formatShortTime = (timeElapsed) => {
    if (!timeElapsed) return '';
    return timeElapsed
      .replace('Il y a ', '')
      .replace(' minute', 'min')
      .replace(' minutes', 'min')
      .replace(' heure', 'h')
      .replace(' heures', 'h')
      .replace(' jour', 'j')
      .replace(' jours', 'j')
      .replace('quelques instants', 'maintenant');
  };

  return (
    <Card
      style={[
        styles.card,
        { borderLeftColor: accentColor, borderLeftWidth: 4 },
      ]}
    >
      <View style={styles.content}>
        {/* Titre avec emoji */}
        <View style={styles.titleRow}>
          <Text style={styles.emoji}>📚</Text>
          <Text style={styles.title}>Reprendre où vous vous êtes arrêté</Text>
        </View>

        {/* Ligne d'infos */}
        <View style={styles.infoRow}>
          <Text style={styles.exerciseTitle}>
            {lastActivity.title} {modeText && `${modeText} `}
          </Text>

          {/* Badge niveau */}
          <View style={[styles.levelBadge, { backgroundColor: accentColor }]}>
            <Text style={styles.levelBadgeText}>{levelNumber}</Text>
          </View>

          <Text style={styles.positionText}>
            • Mot {wordIndex} ({categoryIndex}) • 
          </Text>

          <Text style={styles.timeText}>
            {formatShortTime(lastActivity.timeElapsed)}
          </Text>
        </View>

        {/* Bouton avec emoji */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: accentColor }]}
          onPress={() => onPress?.(lastActivity)}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonEmoji}>▶️</Text>
          <Text style={styles.buttonText}>Continuer</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default ContinueLearningSection;
