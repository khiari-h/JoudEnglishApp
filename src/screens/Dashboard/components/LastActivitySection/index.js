import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Section from "@/src/components/layout/Section";
import Card from "@/src/components/ui/Card";
import ProgressBar from "@/src/components/ui/ProgressBar";
import { ThemeContext } from "@/src/contexts/ThemeContext";
import styles from "./style";

const LastActivitySection = ({ lastActivity, onPress }) => {
  // Récupération sécurisée du contexte
  const themeContext = useContext(ThemeContext);

  // Utilisation de valeurs par défaut si le contexte est undefined
  const colors = themeContext?.colors || {
    primary: "#5E60CE", // Couleur par défaut
    background: "#FFFFFF",
  };

  // Composant pour le bouton Reprendre
  const ResumeButton = () => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.resumeButton, { backgroundColor: colors.primary }]}
    >
      <Ionicons name="play" size={14} color="white" style={styles.resumeIcon} />
      <Text style={styles.resumeText}>Reprendre</Text>
    </TouchableOpacity>
  );

  // Composant pour afficher le temps
  const TimeInfo = () => (
    <View style={styles.timeInfoContainer}>
      <Ionicons
        name="time-outline"
        size={14}
        color="#6B7280"
        style={styles.timeIcon}
      />
      <Text style={styles.timeText}>
        {lastActivity.timeElapsed || "Il y a 5 minutes"}
      </Text>
    </View>
  );

  return (
    <Section
      title="Dernier exercice"
      actionIcon="chevron-forward"
      actionText="Tous"
      onActionPress={() => onPress && onPress("all")}
    >
      <Card
        title={lastActivity.title || "Les bases de la grammaire"}
        subtitle={lastActivity.topic || "Exercice 3 sur 5"}
        onPress={onPress}
        headerIcon={lastActivity.icon || "book-outline"}
        headerIconColor={colors.primary}
        style={styles.cardContainer}
        footer={
          <View style={styles.footerContainer}>
            <View style={styles.progressContainer}>
              <TimeInfo />
              <ProgressBar
                progress={lastActivity.progress || 60}
                height={5}
                fillColor={colors.primary}
                backgroundColor="#F3F4F6"
                showPercentage
              />
            </View>
            <ResumeButton />
          </View>
        }
      />
    </Section>
  );
};

export default LastActivitySection;
