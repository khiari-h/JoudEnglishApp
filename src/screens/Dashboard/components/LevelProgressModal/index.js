import React, { useContext } from "react";
import { View, Text, ScrollView } from "react-native";
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
    background: "#FFFFFF"
  };

  // Préparer les données de niveaux avec progression par défaut
  const preparedLevels = [
    { id: 'a1', title: 'A1 - Beginner', color: '#22C55E', progress: 0 },
    { id: 'a2', title: 'A2 - Elementary', color: '#10B981', progress: 0 },
    { id: 'b1', title: 'B1 - Intermediate', color: '#3B82F6', progress: 0 },
    { id: 'b2', title: 'B2 - Upper Intermediate', color: '#8B5CF6', progress: 0 },
    { id: 'c1', title: 'C1 - Advanced', color: '#EC4899', progress: 0 },
    { id: 'c2', title: 'C2 - Proficiency', color: '#F43F5E', progress: 0 }
  ].map(defaultLevel => {
    // Merging default levels with provided levels (if any)
    const matchedLevel = levels.find(l => l.id.toLowerCase() === defaultLevel.id);
    return matchedLevel ? { ...defaultLevel, ...matchedLevel } : defaultLevel;
  });

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="My Language Level Progress"
      position="bottom"
      scrollable
      animationType="slide"
      contentContainerStyle={{ 
        backgroundColor: colors.background,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20 
      }}
      maxHeight="80%"
    >
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {preparedLevels.map((level) => (
            <Card
              key={level.id}
              title={level.title}
              style={[
                styles.levelCard, 
                { borderLeftColor: level.color, borderLeftWidth: 4 }
              ]}
              onPress={() => {
                onClose();
                onSelectLevel && onSelectLevel(level.id.toUpperCase());
              }}
            >
              <View style={styles.levelContent}>
                <View style={{ flex: 1, marginRight: 12 }}>
                  <ProgressBar
                    progress={level.progress}
                    fillColor={level.color}
                    height={6}
                    showPercentage
                    backgroundColor="#F3F4F6"
                  />
                </View>
                
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
        </ScrollView>

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