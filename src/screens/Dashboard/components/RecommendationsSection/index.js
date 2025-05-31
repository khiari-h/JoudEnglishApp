import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Card from "../../../../components/ui/Card";
import Button from "../../../../components/ui/Button";
import useSmartRecommendations from "../../../../hooks/useSmartRecommendations";
import styles from "./style";

/**
 * Composant pour afficher UNE recommandation intelligente basée sur :
 * - Le temps passé sur chaque type d'exercice (VRAIES DONNÉES maintenant !)
 * - Un parcours pédagogique optimal
 * - Des messages bienveillants style "coach"
 */
const RecommendationsSection = ({
  lastActivity,
  exerciseTimeStats = {},
  currentLevel,
  onSelectExercise,
  accentColor = "#3B82F6",
}) => {

  // Utiliser le hook de recommandations intelligentes avec vraies données
  const { smartRecommendation } = useSmartRecommendations(
    lastActivity, 
    exerciseTimeStats, // Maintenant ce sont les VRAIES données !
    currentLevel
  );

  // Debug : afficher les données reçues
  console.log("📋 RecommendationsSection - exerciseTimeStats reçues:", exerciseTimeStats);
  console.log("🎯 RecommendationsSection - smartRecommendation:", smartRecommendation);

  // Le hook retourne TOUJOURS une recommandation maintenant
  if (!smartRecommendation) {
    console.log("❌ Pas de recommandation - ne devrait jamais arriver !");
    return null;
  }

  const { recommendationData } = smartRecommendation;

  // Message pour exercice de démarrage (premier usage)
  if (smartRecommendation.id === 'start_vocabulary') {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Pour toi</Text>
        
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
              onPress={() => onSelectExercise && onSelectExercise(smartRecommendation)}
              style={styles.recommendationButton}
            />
          </View>
        </Card>
      </View>
    );
  }

  // Message de recommandation par défaut (pas assez de temps)
  if (smartRecommendation.id === 'default_vocabulary') {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Recommandation</Text>
        
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
              onPress={() => onSelectExercise && onSelectExercise(smartRecommendation)}
              style={styles.recommendationButton}
            />
          </View>
        </Card>
      </View>
    );
  }

  // Message de recommandation intelligente (basée sur temps réel !)
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Suggestion pour toi</Text>
      
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
          
          {/* Info sur le temps passé RÉEL */}
          {recommendationData.timeSpent && (
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
            onPress={() => onSelectExercise && onSelectExercise(smartRecommendation)}
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
            onPress={() => onSelectExercise && onSelectExercise(smartRecommendation)}
            style={styles.recommendationButton}
          />
        </View>
      </Card>
    </View>
  );
};

export default RecommendationsSection;