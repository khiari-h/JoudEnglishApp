import React, { useContext } from "react";
import { View, Text } from "react-native";
import Section from "@/src/components/layout/Section";
import Card from "@/src/components/ui/Card";
import Button from "@/src/components/ui/Button";
import ProgressBar from "@/src/components/ui/ProgressBar";
import { ThemeContext } from "@/src/contexts/ThemeContext";

const DailyChallengeSection = ({ challenge, onStartChallenge }) => {
  // Récupération sécurisée du contexte
  const themeContext = useContext(ThemeContext);

  // Utilisation de valeurs par défaut si le contexte est undefined
  const colors = themeContext?.colors || {
    primary: "#5E60CE", // Couleur par défaut
    background: "#FFFFFF",
  };

  return (
    <Section
      title="Today's Challenge"
      actionText="Tomorrow's Challenge →"
      onActionPress={() => {}}
    >
      <Card
        title={challenge.title}
        subtitle={challenge.description}
        style={{ borderLeftColor: challenge.color, borderLeftWidth: 4 }}
        headerIcon={challenge.icon}
        headerIconColor={challenge.color}
        footer={
          <Button
            title="Start Challenge"
            color={challenge.color}
            variant="filled"
            fullWidth
            onPress={onStartChallenge}
          />
        }
      >
        <View>
          <Text>
            {challenge.progress}/{challenge.total}
          </Text>
          <ProgressBar
            progress={(challenge.progress / challenge.total) * 100}
            fillColor={challenge.color}
            height={8}
          />
        </View>
      </Card>
    </Section>
  );
};

export default DailyChallengeSection;
