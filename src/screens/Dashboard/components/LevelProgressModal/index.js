import React, { useContext } from "react";
import { View, ScrollView } from "react-native";
import Modal from "@/src/components/ui/Modal";
import Card from "@/src/components/ui/Card";
import ProgressBar from "@/src/components/ui/ProgressBar";
import Badge from "@/src/components/ui/Badge";
import Button from "@/src/components/ui/Button";
import { ThemeContext } from "@/src/contexts/ThemeContext";

const LevelProgressModal = ({ visible, levels, onClose, onSelectLevel }) => {
  // Récupération sécurisée du contexte
  const themeContext = useContext(ThemeContext);

  // Utilisation de valeurs par défaut si le contexte est undefined
  const colors = themeContext?.colors || {
    primary: "#5E60CE", // Couleur par défaut
    background: "#FFFFFF",
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="My Language Level Progress"
      position="bottom"
      scrollable
    >
      <ScrollView>
        {levels.map((level) => (
          <Card
            key={level.id}
            title={level.title}
            onPress={() => {
              onClose();
              onSelectLevel(level.id.toUpperCase());
            }}
          >
            <View>
              <ProgressBar
                progress={level.progress}
                fillColor={level.color}
                height={6}
                showPercentage
              />
            </View>
            <Badge
              label={level.id.toUpperCase()}
              color="primary"
              style={{ backgroundColor: level.color }}
            />
          </Card>
        ))}
      </ScrollView>

      <Button
        title="Close"
        variant="filled"
        color="primary"
        fullWidth
        onPress={onClose}
      />
    </Modal>
  );
};

export default LevelProgressModal;
