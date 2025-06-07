import React, { useMemo, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Card from "../../../../components/ui/Card";
import Button from "../../../../components/ui/Button";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import useSmartRecommendations from "../../../../hooks/useSmartRecommendations";
import useExerciseTracking from "../../../../hooks/useExerciceTracking";
import styles from "./style";

/**
 * Composant pour afficher les recommandations intelligentes
 * ✅ VERSION ROBUSTE : Section TOUJOURS visible, jamais de disparition
 */
const RecommendationsSection = ({
  lastActivity,
  exerciseTypes,
  currentLevel,
  onSelectExercise,
  accentColor = "#3B82F6",
  debugMode = false
}) => {
  // ✅ ThemeContext avec valeurs par défaut pour éviter le crash
  const themeContext = useContext(ThemeContext);
  const colors = themeContext?.colors || {
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
  };

  // ✅ Obtenir les VRAIS temps directement depuis le hook
  const tracking = useExerciseTracking();
  const exerciseTimeStats = tracking.getFormattedStats();

  // Utiliser le hook de recommandations intelligentes
  const { 
    smartRecommendation,
    getRecommendationStats 
  } = useSmartRecommendations(
    lastActivity, 
    exerciseTimeStats,
    currentLevel,
    exerciseTypes
  );

  // ✅ NOUVEAU : Contenu TOUJOURS présent (jamais null)
  const recommendationContent = useMemo(() => {
    // Toujours avoir une recommandation (grâce au hook robuste)
    const recommendation = smartRecommendation;
    
    // ✅ FIX : Une seule déclaration de recommendationData
    if (!recommendation?.recommendationData) {
      return null; // Au cas où il y aurait vraiment un problème
    }
    
    const { recommendationData } = recommendation;

    // ✅ CAS 1 : Recommandation de progression (style moderne épuré)
    if (recommendation.isProgress) {
      return (
        <Card style={[styles.recommendationCard, { backgroundColor: colors.surface }]}>
          <View style={styles.progressRecommendationContent}>
            {/* Header moderne épuré */}
            <View style={styles.messageHeader}>
              <Text style={styles.messageIcon}>⏱️</Text>
              <Text style={[styles.messageTitle, { color: colors.text }]}>
                Objectif en cours
              </Text>
            </View>

            {/* Info condensée sur une ligne */}
            <Text style={[styles.progressText, { color: colors.text, marginBottom: 12 }]}>
              {recommendation.title} • {recommendationData.timeSpent || 0} min sur {(recommendationData.timeSpent || 0) + (recommendationData.remaining || 0)} min
            </Text>

            {/* Barre de progression + pourcentage */}
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarTrack}>
                <View 
                  style={[
                    styles.progressBarFill,
                    { 
                      width: `${Math.min(recommendationData.progress || 0, 100)}%`,
                      backgroundColor: recommendation.color
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.progressGoal, { color: colors.textSecondary, textAlign: 'center', marginTop: 6 }]}>
                {recommendationData.progress || 0}%
              </Text>
            </View>

            <Button
              title="Continuer"
              variant="filled"
              color={recommendation.color}
              fullWidth
              rightIcon="arrow-forward-outline"
              onPress={() => onSelectExercise?.(recommendation)}
              style={styles.recommendationButton}
            />
          </View>
        </Card>
      );
    }

    // ✅ CAS 2 : Recommandation de démarrage
    if (recommendation.id === 'start_vocabulary') {
      return (
        <Card style={[styles.recommendationCard, { backgroundColor: colors.surface }]}>
          <View style={styles.startRecommendationContent}>
            <View style={styles.messageHeader}>
              <Text style={styles.messageIcon}>{recommendationData.icon}</Text>
              <Text style={[styles.messageTitle, { color: colors.text }]}>
                {recommendationData.title}
              </Text>
            </View>

            <Text style={[styles.messageText, { color: colors.textSecondary }]}>
              {recommendationData.message}
            </Text>

            <Button
              title={recommendationData.button}
              variant="filled" 
              color={accentColor}
              fullWidth
              rightIcon="arrow-forward-outline"
              onPress={() => onSelectExercise?.(recommendation)}
              style={styles.recommendationButton}
            />
          </View>
        </Card>
      );
    }

    // ✅ CAS 3 : Recommandation par défaut
    if (recommendation.id.startsWith('default_') || recommendation.id.startsWith('emergency_')) {
      return (
        <Card style={[styles.recommendationCard, { backgroundColor: colors.surface }]}>
          <View style={styles.startRecommendationContent}>
            <View style={styles.messageHeader}>
              <Text style={styles.messageIcon}>{recommendationData.icon}</Text>
              <Text style={[styles.messageTitle, { color: colors.text }]}>
                {recommendationData.title}
              </Text>
            </View>

            <Text style={[styles.messageText, { color: colors.textSecondary }]}>
              {recommendationData.message}
            </Text>

            <Button
              title={recommendationData.button}
              variant="filled" 
              color={recommendation.color}
              fullWidth
              rightIcon="arrow-forward-outline"
              onPress={() => onSelectExercise?.(recommendation)}
              style={styles.recommendationButton}
            />
          </View>
        </Card>
      );
    }

    // ✅ CAS 4 : Recommandation intelligente (avec aperçu)
    return (
      <Card style={[styles.recommendationCard, { backgroundColor: colors.surface }]}>
        <View style={styles.recommendationContent}>
          {/* Header avec icône et titre coach */}
          <View style={styles.messageHeader}>
            <Text style={styles.messageIcon}>{recommendationData.icon}</Text>
            <Text style={[styles.messageTitle, { color: colors.text }]}>
              {recommendationData.title}
            </Text>
          </View>

          {/* Message bienveillant */}
          <Text style={[styles.messageText, { color: colors.textSecondary }]}>
            {recommendationData.message}
          </Text>

          {/* Info sur le temps passé */}
          {recommendationData.timeSpent > 0 && (
            <View style={styles.timeInfo}>
              <View style={styles.timeProgressContainer}>
                <View style={styles.timeDot} />
                <Text style={[styles.timeText, { color: colors.textSecondary }]}>
                  {recommendationData.timeSpent} min sur {recommendationData.fromExercise}
                </Text>
              </View>
            </View>
          )}

          {/* Aperçu de l'exercice recommandé */}
          <TouchableOpacity
            style={styles.exercisePreview}
            onPress={() => onSelectExercise?.(recommendation)}
            activeOpacity={0.7}
          >
            <View style={styles.exercisePreviewContent}>
              <View 
                style={[
                  styles.exerciseIconContainer, 
                  { backgroundColor: `${recommendation.color}15` }
                ]}
              >
                <Text style={styles.exerciseIcon}>{recommendation.icon}</Text>
              </View>

              <View style={styles.exerciseInfo}>
                <Text style={[styles.exerciseTitle, { color: colors.text }]}>
                  {recommendation.title}
                </Text>
                <Text style={[styles.exerciseDescription, { color: colors.textSecondary }]} numberOfLines={2}>
                  {recommendation.description}
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
            color={recommendation.color}
            fullWidth
            rightIcon="arrow-forward-outline"
            onPress={() => onSelectExercise?.(recommendation)}
            style={styles.recommendationButton}
          />
        </View>
      </Card>
    );
  }, [smartRecommendation, accentColor, currentLevel, onSelectExercise, colors]);

  // ✅ NOUVEAU : Titre dynamique
  const sectionTitle = useMemo(() => {
    if (smartRecommendation?.isProgress) return "Continue ton objectif";
    if (smartRecommendation?.id === 'start_vocabulary') return "Pour toi";
    if (smartRecommendation?.id.startsWith('default_')) return "Recommandation";
    return "Suggestion pour toi";
  }, [smartRecommendation]);

  // ✅ Debug info (optionnel)
  const debugInfo = useMemo(() => {
    if (!debugMode) return null;

    const stats = getRecommendationStats();
    
    return (
      <View style={{ backgroundColor: '#f0f0f0', padding: 8, marginTop: 8, borderRadius: 4 }}>
        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>🔍 Debug Recommandations</Text>
        <Text style={{ fontSize: 9 }}>ID: {stats.smartRecommendation}</Text>
        <Text style={{ fontSize: 9 }}>Progress: {stats.isProgress ? 'Oui' : 'Non'}</Text>
        <Text style={{ fontSize: 9 }}>Seuil: {stats.threshold} min</Text>
      </View>
    );
  }, [debugMode, getRecommendationStats]);

  // ✅ TOUJOURS rendre quelque chose (jamais null)
  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        {sectionTitle}
      </Text>
      {recommendationContent}
      {debugInfo}
    </View>
  );
};

export default RecommendationsSection;