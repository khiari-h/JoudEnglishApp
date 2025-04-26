import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Section from "@/src/components/layout/Section";
import Card from "@/src/components/ui/Card";
import ProgressBar from "@/src/components/ui/ProgressBar";
import { ThemeContext } from "@/src/contexts/ThemeContext";
import styles from "./style";

/**
 * Composant pour afficher la dernière activité de l'utilisateur
 * Version optimisée pour utiliser les données fournies par le parent au lieu d'un hook indépendant
 * 
 * @param {Object} lastActivity - L'objet contenant les données de la dernière activité
 * @param {Function} onPress - Fonction appelée lorsque l'utilisateur clique sur l'activité
 * @param {Function} formatProgressSubtitle - Fonction pour formater le sous-titre de l'activité
 * @param {Boolean} isLoading - Indique si les données sont en cours de chargement
 */
const LastActivitySection = ({ lastActivity, onPress, formatProgressSubtitle, isLoading }) => {
  // Récupération sécurisée du contexte
  const themeContext = useContext(ThemeContext);

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
        subtitle={formatProgressSubtitle ? formatProgressSubtitle(lastActivity) : ''}
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