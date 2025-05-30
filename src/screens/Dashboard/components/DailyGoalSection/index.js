import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "../../../../components/ui/Card";
import Button from "../../../../components/ui/Button";
import useDailyGoal from "../../../../hooks/useDailyGoal";
import styles from "./style";

/**
 * Composant intelligent pour les objectifs quotidiens avec progression vers évaluation
 */
const DailyGoalSection = ({
  currentLevel,
  progress,
  accentColor = "#3B82F6",
  onStartExercise,
  onStartEvaluation
}) => {
  const {
    todayGoal,
    todayCompleted,
    statusMessage,
    cycleStatus,
    handleEvaluationResponse,
    completeEvaluation,
    completeTodayGoal
  } = useDailyGoal(currentLevel, progress);

  // Gérer le clic sur l'objectif du jour
  const handleGoalPress = () => {
    if (todayCompleted) return;
    
    if (todayGoal && onStartExercise) {
      onStartExercise(todayGoal.type, currentLevel);
    }
  };

  // Gérer l'offre d'évaluation
  const handleEvaluationOffer = (accepted) => {
    const result = handleEvaluationResponse(accepted);
    
    if (result && onStartEvaluation) {
      onStartEvaluation(currentLevel);
    } else {
      // Message de encouragement si décliné
      Alert.alert(
        "Pas de stress !",
        "Continue à t'entraîner, on retente dans quelques jours 😊",
        [{ text: "OK" }]
      );
    }
  };

  // Affichage selon l'état du cycle
  if (statusMessage) {
    // États spéciaux : évaluation, accomplissement, etc.
    return (
      <Card style={styles.card}>
        <View style={styles.specialStateContainer}>
          <Text style={styles.specialTitle}>{statusMessage.title}</Text>
          <Text style={styles.specialMessage}>{statusMessage.message}</Text>
          
          {statusMessage.type === 'evaluation_offer' && (
            <View style={styles.buttonContainer}>
              <Button
                title={statusMessage.buttons[0]}
                variant="filled"
                color={accentColor}
                onPress={() => handleEvaluationOffer(true)}
                style={styles.acceptButton}
              />
              <Button
                title={statusMessage.buttons[1]}
                variant="outlined"
                color={accentColor}
                onPress={() => handleEvaluationOffer(false)}
                style={styles.declineButton}
              />
            </View>
          )}
          
          {statusMessage.type === 'free_mode' && (
            <Button
              title={statusMessage.buttons[0]}
              variant="filled"
              color={accentColor}
              onPress={() => onStartEvaluation && onStartEvaluation(currentLevel)}
              style={styles.evaluationButton}
            />
          )}
          
          {statusMessage.type === 'completed' && (
            <Button
              title={statusMessage.buttons[0]}
              variant="filled"
              color={accentColor}
              onPress={() => completeEvaluation()}
              style={styles.continueButton}
            />
          )}
        </View>
      </Card>
    );
  }

  // Affichage normal : objectif quotidien
  if (!todayGoal) return null;

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Défi du jour</Text>
          <View style={styles.goalInfo}>
            <Ionicons 
              name="trophy-outline" 
              size={16} 
              color="#6B7280" 
              style={styles.icon} 
            />
            <Text style={styles.subtitle}>
              {todayCompleted ? "Objectif atteint !" : todayGoal.message}
            </Text>
          </View>
        </View>
        
        <View 
          style={[
            styles.badge, 
            { 
              backgroundColor: todayCompleted ? "#10B981" : accentColor 
            }
          ]}
        >
          <Text style={styles.badgeText}>
            {todayCompleted ? "✓" : "!"}
          </Text>
        </View>
      </View>

      {/* Exercice du jour */}
      <TouchableOpacity
        style={[
          styles.exerciseContainer,
          { 
            backgroundColor: todayCompleted ? "#F0FDF4" : `${todayGoal.color}08`,
            borderColor: todayCompleted ? "#10B981" : todayGoal.color,
          }
        ]}
        onPress={handleGoalPress}
        disabled={todayCompleted}
        activeOpacity={0.7}
      >
        <View style={styles.exerciseContent}>
          <View 
            style={[
              styles.exerciseIconContainer,
              { backgroundColor: `${todayGoal.color}15` }
            ]}
          >
            <Text style={styles.exerciseIcon}>{todayGoal.icon}</Text>
          </View>
          
          <View style={styles.exerciseInfo}>
            <Text style={styles.exerciseTitle}>{todayGoal.title}</Text>
            <Text style={styles.exerciseDescription}>
              {todayGoal.description}
            </Text>
          </View>
          
          {todayCompleted ? (
            <View style={styles.completedIndicator}>
              <Ionicons name="checkmark-circle" size={32} color="#10B981" />
            </View>
          ) : (
            <View style={styles.actionIndicator}>
              <Ionicons name="chevron-forward" size={24} color={todayGoal.color} />
            </View>
          )}
        </View>
      </TouchableOpacity>

      {/* Message d'encouragement ou statut */}
      <View style={styles.statusContainer}>
        {todayCompleted ? (
          <Text style={styles.encouragementText}>
            🎉 Bien joué ! Rendez-vous demain pour un nouveau défi
          </Text>
        ) : (
          <Text style={styles.encouragementText}>
            💪 Un exercice par jour, c'est parti !
          </Text>
        )}
      </View>
    </Card>
  );
};

export default DailyGoalSection;