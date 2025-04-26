// src/components/dashboard/LastActivitySection/index.js
import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Section from "@/src/components/layout/Section";
import Card from "@/src/components/ui/Card";
import ProgressBar from "@/src/components/ui/ProgressBar";
import { ThemeContext } from "@/src/contexts/ThemeContext";
import useLastActivity from "@/src/hooks/useLastActivity";
import styles from "./style";

const LastActivitySection = ({ onPress }) => {
  // Récupération sécurisée du contexte
  const themeContext = useContext(ThemeContext);

  // Utilisation du hook pour récupérer la dernière activité
  const { getLastActivity, isLoading, formatProgressSubtitle } = useLastActivity();
  const lastActivity = getLastActivity();

  // Utilisation de valeurs par défaut si le contexte est undefined
  const colors = themeContext?.colors || {
    primary: "#5E60CE", // Couleur par défaut
    background: "#FFFFFF",
  };

  // Si aucune activité n'est trouvée ou si chargement en cours
  if (isLoading || !lastActivity) {
    return null;
  }

  // Composant pour le bouton Reprendre
  const ResumeButton = () => (
    <TouchableOpacity
      onPress={() => onPress && onPress(lastActivity)}
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
        {lastActivity.timeElapsed}
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
        title={lastActivity.title}
        subtitle={formatProgressSubtitle(lastActivity)}
        onPress={() => onPress && onPress(lastActivity)}
        headerIcon={lastActivity.icon}
        headerIconColor={colors.primary}
        style={styles.cardContainer}
        footer={
          <View style={styles.footerContainer}>
            <View style={styles.progressContainer}>
              <TimeInfo />
              <ProgressBar
                progress={lastActivity.progress}
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