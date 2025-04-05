import React, { useContext } from "react";
import Section from "@/src/components/layout/Section";
import Card from "@/src/components/ui/Card";
import ProgressBar from "@/src/components/ui/ProgressBar";
import { ThemeContext } from "@/src/contexts/ThemeContext";

const LastActivitySection = ({ lastActivity, onPress }) => {
  // Récupération sécurisée du contexte
  const themeContext = useContext(ThemeContext);

  // Utilisation de valeurs par défaut si le contexte est undefined
  const colors = themeContext?.colors || {
    primary: "#5E60CE", // Couleur par défaut
    background: "#FFFFFF",
  };

  return (
    <Section title="Continue Learning">
      <Card
        title={lastActivity.title}
        subtitle={lastActivity.topic}
        onPress={onPress}
        headerIcon={lastActivity.icon}
        headerIconColor={colors.primary}
        footer={
          <ProgressBar
            progress={lastActivity.progress}
            height={6}
            fillColor={colors.primary}
            showPercentage
          />
        }
      />
    </Section>
  );
};

export default LastActivitySection;
