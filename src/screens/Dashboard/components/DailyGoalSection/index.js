import React from "react";
import { View, Text } from "react-native";
import Card from "@/src/components/ui/Card";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";

/**
 * Composant pour afficher et suivre l'objectif quotidien
 */
const DailyGoalSection = ({
  completed = 0,
  total = 5,
  accentColor = "#3B82F6"
}) => {
  // Calculer le pourcentage de complétion
  const percentage = Math.round((completed / total) * 100);
  
  // Générer les cercles de progression
  const renderProgressCircles = () => {
    const circles = [];
    
    for (let i = 0; i < total; i++) {
      const isCompleted = i < completed;
      circles.push(
        <View
          key={i}
          style={[
            styles.circle,
            isCompleted ? 
              [styles.completedCircle, { backgroundColor: accentColor }] : 
              styles.incompleteCircle
          ]}
        >
          {isCompleted ? (
            <Ionicons name="checkmark" size={16} color="white" />
          ) : (
            <Text style={styles.circleText}>{i + 1}</Text>
          )}
        </View>
      );
    }
    
    return circles;
  };
  
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Objectif du jour</Text>
          <View style={styles.goalInfo}>
            <Ionicons name="time-outline" size={14} color="#6B7280" style={styles.icon} />
            <Text style={styles.subtitle}>
              {completed}/{total} exercices
            </Text>
          </View>
        </View>
        <View style={[styles.badge, { backgroundColor: accentColor }]}>
          <Text style={styles.badgeText}>{percentage}%</Text>
        </View>
      </View>
      
      <View style={styles.progressCirclesContainer}>
        {renderProgressCircles()}
      </View>
    </Card>
  );
};

export default DailyGoalSection;