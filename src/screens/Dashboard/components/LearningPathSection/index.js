import React, { useContext } from "react";
import { View, Text } from "react-native";
import Section from "@/src/components/layout/Section";
import Card from "@/src/components/ui/Card";
import Button from "@/src/components/ui/Button";
import { ThemeContext } from "@/src/contexts/ThemeContext";

const LearningPathSection = ({ onSelectLevel, onViewProgress }) => {
  // Récupération sécurisée du contexte
  const themeContext = useContext(ThemeContext);

  // Utilisation de valeurs par défaut si le contexte est undefined
  const colors = themeContext?.colors || {
    primary: "#5E60CE", // Couleur par défaut
    background: "#FFFFFF",
  };

  return (
    <Section
      title="Learning Path"
      actionText="Select Level"
      onActionPress={onSelectLevel}
    >
      <Card style={{ backgroundColor: colors.primary }}>
        <View>
          <Text>Start Your English Journey</Text>
          <Text>Choose a level from beginner to advanced</Text>
        </View>
        <View>
          <Text>🌐</Text>
        </View>
      </Card>

      <Button
        title="View My Progress"
        variant="outlined"
        color="primary"
        fullWidth
        onPress={onViewProgress}
      />
    </Section>
  );
};

export default LearningPathSection;
