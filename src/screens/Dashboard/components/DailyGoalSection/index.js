import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "../../../../components/ui/Card";
import Button from "../../../../components/ui/Button";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import useDailyGoal from "../../../../hooks/useDailyGoal";
import styles from "./style";

/**
 * Composant intelligent pour les objectifs quotidiens avec validation simple
 * ✅ VERSION CLEAN : style.js statique + overrides minimaux ThemeContext
 */
const DailyGoalSection = ({
  currentLevel,
  progress,
  accentColor = "#3B82F6",
  onStartEvaluation
}) => {
  // ✅ ThemeContext avec valeurs par défaut pour éviter le crash
  const themeContext = useContext(ThemeContext);
  const colors = themeContext?.colors || {
    surface: "#FFFFFF",
    text: "#1F2937", 
    textSecondary: "#6B7280",
    success: "#10B981",
  };

  const {
    todayGoal,
    todayCompleted,
    statusMessage,
    cycleStatus,
    handleEvaluationResponse,
    completeEvaluation,
    completeTodayGoal
  } = useDailyGoal(currentLevel, progress);

  const handleMarkAsComplete = () => {
    if (todayCompleted) return;

    Alert.alert(
      "Objectif terminé ?",
      `Avez-vous fait un exercice de ${todayGoal.title.toLowerCase()} aujourd'hui ?`,
      [
        {
          text: "Pas encore",
          style: "cancel"
        },
        {
          text: "Oui, c'est fait ! ✅",
          onPress: () => {
            completeTodayGoal(todayGoal.type);
            setTimeout(() => {
              Alert.alert(
                "Bravo ! 🎉",
                "Objectif du jour atteint ! Continuez comme ça !",
                [{ text: "Merci !" }]
              );
            }, 500);
          }
        }
      ]
    );
  };

  const handleEvaluationOffer = (accepted) => {
    const result = handleEvaluationResponse(accepted);

    if (result && onStartEvaluation) {
      onStartEvaluation(currentLevel);
    } else {
      Alert.alert(
        "Pas de stress !",
        "Continue à t'entraîner, on retente dans quelques jours 😊",
        [{ text: "OK" }]
      );
    }
  };

  // Affichage selon l'état du cycle
  if (statusMessage) {
    return (
      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        <View style={styles.specialStateContainer}>
          <Text style={[styles.specialTitle, { color: colors.text }]}>
            {statusMessage.title}
          </Text>
          <Text style={[styles.specialMessage, { color: colors.textSecondary }]}>
            {statusMessage.message}
          </Text>

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
              onPress={() => onStartEvaluation?.(currentLevel)}
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
    <Card style={[styles.card, { backgroundColor: colors.surface }]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: colors.text }]}>
            Défi du jour
          </Text>
          <View style={styles.goalInfo}>
            <Ionicons 
              name="trophy-outline" 
              size={16} 
              color={colors.textSecondary}
              style={styles.icon} 
            />
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {todayCompleted ? "Objectif atteint !" : todayGoal.message}
            </Text>
          </View>
        </View>

        <View 
          style={[
            styles.badge, 
            { 
              backgroundColor: todayCompleted ? (colors.success) : accentColor 
            }
          ]}
        >
          <Text style={styles.badgeText}>
            {todayCompleted ? "✓" : "!"}
          </Text>
        </View>
      </View>

      {/* Affichage de l'objectif avec validation */}
      <View
        style={[
          styles.exerciseContainer,
          { 
            backgroundColor: todayCompleted ? 
              (colors.success + "10") : 
              `${todayGoal.color}08`,
            borderColor: todayCompleted ? 
              (colors.success) : 
              todayGoal.color,
          }
        ]}
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
            <Text style={[styles.exerciseTitle, { color: colors.text }]}>
              {todayGoal.title}
            </Text>
            <Text style={[styles.exerciseDescription, { color: colors.textSecondary }]}>
              {todayGoal.description}
            </Text>
            {!todayCompleted && (
              <Text style={[styles.exerciseGoalText, { color: colors.textSecondary + "80" }]}>
                🎯 Faites un exercice de {todayGoal.title.toLowerCase()} aujourd'hui
              </Text>
            )}
          </View>

          {todayCompleted ? (
            <View style={styles.completedIndicator}>
              <Ionicons 
                name="checkmark-circle" 
                size={28}
                color={colors.success} 
              />
            </View>
          ) : (
            <TouchableOpacity 
              style={[
                styles.markCompleteButton,
                { borderColor: todayGoal.color }
              ]}
              onPress={handleMarkAsComplete}
              activeOpacity={0.7}
            >
              <Text style={[styles.markCompleteText, { color: todayGoal.color }]}>
                Marquer terminé
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Message d'encouragement */}
      <View style={styles.statusContainer}>
        {todayCompleted ? (
          <Text style={[styles.encouragementText, { color: colors.textSecondary }]}>
            🎉 Bien joué ! Rendez-vous demain pour un nouveau défi
          </Text>
        ) : (
          <Text style={[styles.encouragementText, { color: colors.textSecondary }]}>
            💪 Un exercice par jour, c'est parti !
          </Text>
        )}
      </View>
    </Card>
  );
};

export default DailyGoalSection;