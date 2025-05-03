import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "@/src/components/ui/Card";
import styles from "./style";

/**
 * Composant pour continuer la dernière activité de l'utilisateur
 * Reçoit les données du parent (Dashboard) qui utilise le hook useLastActivity
 */
const ContinueLearningSection = ({
  lastActivity,
  onPress,
  accentColor = "#3B82F6",
  formatProgressSubtitle,
  isLoading = false
}) => {
  // État de chargement
  if (isLoading) {
    return (
      <Card
        style={[styles.card, { borderLeftColor: accentColor, borderLeftWidth: 4 }]}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={accentColor} />
          <Text style={styles.loadingText}>Chargement de votre dernière activité...</Text>
        </View>
      </Card>
    );
  }

  // Si aucune activité n'est disponible, afficher un état vide
  if (!lastActivity) {
    return (
      <Card
        style={[styles.card, { borderLeftColor: accentColor, borderLeftWidth: 4 }]}
      >
        <View style={styles.content}>
          <Text style={styles.emptyStateTitle}>Commencer votre apprentissage</Text>
          <Text style={styles.emptyStateDescription}>
            Choisissez un niveau et un exercice pour débuter votre parcours linguistique
          </Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: accentColor }]}
            onPress={() => onPress && onPress("levelSelection")}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Explorer les niveaux</Text>
          </TouchableOpacity>
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
      style={[styles.card, { borderLeftColor: accentColor, borderLeftWidth: 4 }]}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{lastActivity.title}</Text>
            
            {/* Sous-titre avec détails sur la position */}
            <View style={styles.subtitleRow}>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
            
            {/* Temps écoulé */}
            <View style={styles.timeContainer}>
              <Ionicons name="time-outline" size={14} color="#6B7280" />
              <Text style={styles.timeText}>{lastActivity.timeElapsed}</Text>
            </View>
          </View>
          
          {/* Bouton pour reprendre l'activité */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: accentColor }]}
            onPress={() => onPress && onPress(lastActivity)}
            activeOpacity={0.7}
          >
            <Ionicons name="play" size={16} color="white" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Reprendre</Text>
          </TouchableOpacity>
        </View>

        {/* Barre de progression */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { 
                  width: `${lastActivity.progress || 0}%`, 
                  backgroundColor: accentColor 
                }
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {Math.round(lastActivity.progress || 0)}%
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default ContinueLearningSection;