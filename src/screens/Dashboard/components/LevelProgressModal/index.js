// src/components/Dashboard/components/LevelProgressModal/index.js
import React, { useContext } from "react";
import { View, Text } from "react-native";
import Modal from "@/src/components/ui/Modal";
import Card from "@/src/components/ui/Card";
import ProgressBar from "@/src/components/ui/ProgressBar";
import Button from "@/src/components/ui/Button";
import { ThemeContext } from "@/src/contexts/ThemeContext";
import styles from "./style";

const LevelProgressModal = ({ visible, levels = [], onClose, onSelectLevel }) => {
  // Récupération sécurisée du contexte
  const themeContext = useContext(ThemeContext);

  // Utilisation de valeurs par défaut si le contexte est undefined
  const colors = themeContext?.colors || {
    primary: "#5E60CE",
  };

  // Vérifier si levels est défini et a des éléments
  const hasLevels = Array.isArray(levels) && levels.length > 0;

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="My Language Level Progress"
      position="bottom"
      scrollable
      animationType="custom"
      maxHeight="80%"
    >
      <View style={styles.container}>
        {hasLevels ? (
          <View style={styles.levelsList}>
            {levels.map((level) => (
              <Card
                key={level.id}
                title={level.title}
                style={styles.levelCard}
                onPress={() => {
                  onClose();
                  onSelectLevel && onSelectLevel(level.id.toUpperCase());
                }}
              >
                <View style={styles.levelContent}>
                  <ProgressBar
                    progress={level.progress}
                    fillColor={level.color}
                    height={6}
                    showPercentage
                    backgroundColor="#F3F4F6"
                  />
                  
                  <View style={styles.badgeContainer}>
                    <View
                      style={[
                        styles.levelBadge,
                        { backgroundColor: level.color }
                      ]}
                    >
                      <Text style={styles.levelBadgeText}>
                        {level.id.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        ) : (
          <Text style={styles.emptyText}>No level progress data available</Text>
        )}

        <Button
          title="Close"
          variant="filled"
          color="primary"
          fullWidth
          onPress={onClose}
          style={styles.closeButton}
        />
      </View>
    </Modal>
  );
};

export default LevelProgressModal;