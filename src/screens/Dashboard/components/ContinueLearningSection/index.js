import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Card from "../../../../components/ui/Card";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import styles from "./style";

/**
 * Composant pour continuer la dernière activité de l'utilisateur
 * ✅ VERSION COMPACT : style.js statique + overrides minimaux ThemeContext
 */
const ContinueLearningSection = ({
  lastActivity,
  onPress,
  accentColor = "#3B82F6",
  formatProgressSubtitle,
  isLoading = false,
}) => {
  // ✅ ThemeContext avec valeurs par défaut pour éviter le crash
  const themeContext = useContext(ThemeContext);
  const colors = themeContext?.colors || {
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
  };

  // État de chargement
  if (isLoading) {
    return (
      <Card
        style={[
          styles.card,
          { 
            backgroundColor: colors.surface,
            borderLeftColor: accentColor, 
            borderLeftWidth: 4 
          },
        ]}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={accentColor} />
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
            Chargement de votre activité récente...
          </Text>
        </View>
      </Card>
    );
  }

  // Si aucune activité n'est disponible
  if (!lastActivity) {
    return (
      <Card
        style={[
          styles.card,
          { 
            backgroundColor: colors.surface,
            borderLeftColor: accentColor, 
            borderLeftWidth: 4 
          },
        ]}
      >
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.emoji}>📚</Text>
            <Text style={[styles.title, { color: colors.text }]}>
              Activité récente
            </Text>
          </View>

          <Text style={[styles.emptyStateDescription, { color: colors.textSecondary }]}>
            Aucune activité récente trouvée
          </Text>

          <View style={styles.emptyStateContainer}>
            <Text style={[styles.emptyStateHint, { color: colors.textSecondary }]}>
              💡 Vos prochains exercices apparaîtront ici
            </Text>
          </View>
        </View>
      </Card>
    );
  }

  // Obtenir le sous-titre formaté
  const subtitle = formatProgressSubtitle
    ? formatProgressSubtitle(lastActivity)
    : `Niveau ${lastActivity.level}`;

  // Extraire les infos pour le format
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
        { 
          backgroundColor: colors.surface,
          borderLeftColor: accentColor, 
          borderLeftWidth: 4 
        },
      ]}
    >
      <View style={styles.content}>
        {/* Titre avec emoji */}
        <View style={styles.titleRow}>
          <Text style={styles.emoji}>📚</Text>
          <Text style={[styles.title, { color: colors.text }]}>
            Reprendre où vous vous êtes arrêté
          </Text>
        </View>

        {/* Ligne d'infos */}
        <View style={styles.infoRow}>
          <Text style={[styles.exerciseTitle, { color: colors.text }]}>
            {lastActivity.title} {modeText && `${modeText} `}
          </Text>

          {/* Badge niveau */}
          <View style={[styles.levelBadge, { backgroundColor: accentColor }]}>
            <Text style={styles.levelBadgeText}>{levelNumber}</Text>
          </View>

          <Text style={[styles.positionText, { color: colors.textSecondary }]}>
            • Mot {wordIndex} ({categoryIndex}) • 
          </Text>

          <Text style={[styles.timeText, { color: colors.textSecondary }]}>
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