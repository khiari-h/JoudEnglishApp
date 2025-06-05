// components/RecommendationsSection.jsx
/**
 * Composant pour afficher les recommandations intelligentes
 * Version propre utilisant la nouvelle architecture modulaire
 */

import React, { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Card from "../../../../components/ui/Card";
import Button from "../../../../components/ui/Button";
import useSmartRecommendations from "../../../../hooks/useSmartRecommendations";
import useExerciseTracking from "../../../../hooks/useExerciceTracking"; // ✅ Nouveau !
import styles from "./style";

const RecommendationsSection = ({
  lastActivity,
  exerciseTypes,
  currentLevel,
  onSelectExercise,
  accentColor = "#3B82F6",
  debugMode = false
}) => {

  // ✅ Obtenir les VRAIS temps directement depuis le nouveau hook
  const tracking = useExerciseTracking();
  const exerciseTimeStats = tracking.getFormattedStats(); // En minutes, correctes !

  // Utiliser le hook de recommandations intelligentes avec les VRAIS temps
  const { 
    smartRecommendation,
    getRecommendationStats 
  } = useSmartRecommendations(
    lastActivity, 
    exerciseTimeStats, // ✅ Maintenant c'est correct !
    currentLevel,
    exerciseTypes
  );

  // Contenu de la recommandation
  const recommendationContent = useMemo(() => {
    if (!smartRecommendation) {
      return null;
    }

    const { recommendationData } = smartRecommendation;

    // Message pour exercice de démarrage (premier usage)
    if (smartRecommendation.id === 'start_vocabulary') {
      return (
        <Card style={styles.recommendationCard}>
          <View style={styles.startRecommendationContent}>
            <View style={styles.messageHeader}>
              <Text style={styles.messageIcon}>{recommendationData.icon}</Text>
              <Text style={styles.messageTitle}>{recommendationData.title}</Text>
            </View>

            <Text style={styles.messageText}>
              {recommendationData.message}
            </Text>

            <Button
              title={recommendationData.button}
              variant="filled" 
              color={accentColor}
              fullWidth
              rightIcon="arrow-forward-outline"
              onPress={() => onSelectExercise?.(smartRecommendation)}
              style={styles.recommendationButton}
            />
          </View>
        </Card>
      );
    }

    // Message de recommandation par défaut
    if (smartRecommendation.id.startsWith('default_')) {
      return (
        <Card style={styles.recommendationCard}>
          <View style={styles.startRecommendationContent}>
            <View style={styles.messageHeader}>
              <Text style={styles.messageIcon}>{recommendationData.icon}</Text>
              <Text style={styles.messageTitle}>{recommendationData.title}</Text>
            </View>

            <Text style={styles.messageText}>
              {recommendationData.message}
            </Text>

            <Button
              title={recommendationData.button}
              variant="filled" 
              color={smartRecommendation.color}
              fullWidth
              rightIcon="arrow-forward-outline"
              onPress={() => onSelectExercise?.(smartRecommendation)}
              style={styles.recommendationButton}
            />
          </View>
        </Card>
      );
    }

    // Message de recommandation intelligente
    return (
      <Card style={styles.recommendationCard}>
        <View style={styles.recommendationContent}>
          {/* Header avec icône et titre coach */}
          <View style={styles.messageHeader}>
            <Text style={styles.messageIcon}>{recommendationData.icon}</Text>
            <Text style={styles.messageTitle}>{recommendationData.title}</Text>
          </View>

          {/* Message bienveillant */}
          <Text style={styles.messageText}>
            {recommendationData.message}
          </Text>

          {/* Info sur le temps passé */}
          {recommendationData.timeSpent > 0 && (
            <View style={styles.timeInfo}>
              <View style={styles.timeProgressContainer}>
                <View style={styles.timeDot} />
                <Text style={styles.timeText}>
                  {recommendationData.timeSpent} min sur {recommendationData.fromExercise}
                </Text>
              </View>
            </View>
          )}

          {/* Aperçu de l'exercice recommandé */}
          <TouchableOpacity
            style={styles.exercisePreview}
            onPress={() => onSelectExercise?.(smartRecommendation)}
            activeOpacity={0.7}
          >
            <View style={styles.exercisePreviewContent}>
              <View 
                style={[
                  styles.exerciseIconContainer, 
                  { backgroundColor: `${smartRecommendation.color}15` }
                ]}
              >
                <Text style={styles.exerciseIcon}>{smartRecommendation.icon}</Text>
              </View>

              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseTitle}>{smartRecommendation.title}</Text>
                <Text style={styles.exerciseDescription} numberOfLines={2}>
                  {smartRecommendation.description}
                </Text>
              </View>

              <View style={[styles.levelBadge, { backgroundColor: accentColor }]}>
                <Text style={styles.levelBadgeText}>{currentLevel}</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Bouton d'action principal */}
          <Button
            title={recommendationData.button}
            variant="filled"
            color={smartRecommendation.color}
            fullWidth
            rightIcon="arrow-forward-outline"
            onPress={() => onSelectExercise?.(smartRecommendation)}
            style={styles.recommendationButton}
          />
        </View>
      </Card>
    );
  }, [smartRecommendation, accentColor, currentLevel, onSelectExercise]);

  // Titre de la section
  const sectionTitle = useMemo(() => {
    if (!smartRecommendation) return "Recommandations";

    if (smartRecommendation.id === 'start_vocabulary') return "Pour toi";
    if (smartRecommendation.id.startsWith('default_')) return "Recommandation";
    return "Suggestion pour toi";
  }, [smartRecommendation]);

  // Debug info (seulement en mode debug)
  const debugInfo = useMemo(() => {
    if (!debugMode) return null;

    const stats = getRecommendationStats();
    
    return (
      <View style={styles.debugContainer}>
        <Text style={styles.debugTitle}>🔍 Debug Recommandations</Text>
        <Text style={styles.debugText}>
          Recommandation: {stats.smartRecommendation}
        </Text>
        <Text style={styles.debugText}>
          Seuil: {stats.threshold} min
        </Text>
        {Object.entries(exerciseTimeStats).map(([type, minutes]) => (
          <Text key={type} style={styles.debugText}>
            {type}: {minutes} min
          </Text>
        ))}
      </View>
    );
  }, [debugMode, getRecommendationStats, exerciseTimeStats]);

  if (!recommendationContent) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      {recommendationContent}
      {debugInfo}
    </View>
  );
};

export default RecommendationsSection;