// src/components/modals/LevelProgressModal/index.js
import React, { useContext } from "react";
import { View, ScrollView, Text } from "react-native";
import Modal from "@/src/components/ui/Modal";
import Card from "@/src/components/ui/Card";
import ProgressBar from "@/src/components/ui/ProgressBar";
import Button from "@/src/components/ui/Button";
import { ThemeContext } from "@/src/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";

const LevelProgressModal = ({ visible, onClose, onSelectLevel }) => {
  // Récupération sécurisée du contexte
  const themeContext = useContext(ThemeContext);

  // Utilisation de valeurs par défaut si le contexte est undefined
  const colors = themeContext?.colors || {
    primary: "#5E60CE", // Couleur par défaut
  };

  // Données des niveaux du CECRL
  const levels = [
    {
      id: "A1",
      title: "Débutant",
      description: "Expressions familières et quotidiennes",
      progress: 80,
      color: "#22C55E", // Vert
      completedHours: 96,
      totalHours: 120,
    },
    {
      id: "A2",
      title: "Élémentaire",
      description: "Communication simple sur sujets familiers",
      progress: 65,
      color: "#10B981", // Vert clair
      completedHours: 104,
      totalHours: 160,
    },
    {
      id: "B1",
      title: "Intermédiaire",
      description: "Communication en voyage et sur sujets personnels",
      progress: 45,
      color: "#3B82F6", // Bleu
      completedHours: 81,
      totalHours: 180,
    },
    {
      id: "B2",
      title: "Intermédiaire avancé",
      description: "Communication spontanée avec locuteurs natifs",
      progress: 30,
      color: "#8B5CF6", // Violet
      completedHours: 60,
      totalHours: 200,
    },
    {
      id: "C1",
      title: "Avancé",
      description: "Expression fluide dans contextes complexes",
      progress: 15,
      color: "#EC4899", // Rose
      completedHours: 36,
      totalHours: 240,
    },
    {
      id: "C2",
      title: "Maîtrise",
      description: "Compréhension et expression sans effort",
      progress: 5,
      color: "#F43F5E", // Rouge
      completedHours: 14,
      totalHours: 280,
    },
  ];

  const handleSelectLevel = (levelId) => {
    onClose();
    onSelectLevel && onSelectLevel(levelId);
  };

  // Fonction pour grouper les niveaux par paires
  const getLevelPairs = () => {
    const pairs = [];
    for (let i = 0; i < levels.length; i += 2) {
      pairs.push([
        levels[i],
        i + 1 < levels.length ? levels[i + 1] : null,
      ]);
    }
    return pairs;
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Progression linguistique"
      position="bottom"
      scrollable
      animationType="custom"
      maxHeight="80%"
    >
      <View style={styles.container}>
        {/* En-tête explicatif */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Votre progression dans le Cadre Européen Commun de Référence pour les Langues
          </Text>
        </View>

        {/* Grille de niveaux */}
        <ScrollView style={styles.scrollView}>
          {getLevelPairs().map((pair, index) => (
            <View key={index} style={styles.levelRow}>
              {pair.map((level, idx) => 
                level ? (
                  <Card
                    key={level.id}
                    style={[styles.levelCard, { borderLeftColor: level.color }]}
                    withShadow={true}
                    borderRadius={12}
                    margin={false}
                    onPress={() => handleSelectLevel(level.id)}
                  >
                    <View style={styles.levelHeader}>
                      <View style={styles.levelTitleContainer}>
                        <Text style={styles.levelTitle}>{level.title}</Text>
                        <View style={[styles.levelBadge, { backgroundColor: level.color }]}>
                          <Text style={styles.levelBadgeText}>{level.id}</Text>
                        </View>
                      </View>
                    </View>
                    
                    <Text style={styles.levelDescription} numberOfLines={2}>
                      {level.description}
                    </Text>
                    
                    <View style={styles.progressContainer}>
                      <ProgressBar
                        progress={level.progress}
                        fillColor={level.color}
                        height={6}
                        showPercentage
                        backgroundColor="#F3F4F6"
                      />
                    </View>
                    
                    <View style={styles.hoursContainer}>
                      <Ionicons name="time-outline" size={14} color="#6B7280" />
                      <Text style={styles.hoursText}>
                        {level.completedHours}/{level.totalHours} heures
                      </Text>
                    </View>
                  </Card>
                ) : (
                  <View key={`empty-${idx}`} style={styles.emptyCard} />
                )
              )}
            </View>
          ))}
        </ScrollView>

        {/* Footer avec le bouton de fermeture */}
        <View style={styles.footer}>
          <Button
            title="Fermer"
            variant="filled"
            color="primary"
            fullWidth
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
};

export default LevelProgressModal;