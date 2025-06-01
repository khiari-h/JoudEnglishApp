import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LANGUAGE_LEVELS } from "../../../../utils/constants";
import styles from "./style";

/**
 * Modal pour afficher la progression détaillée par niveau
 * et permettre à l'utilisateur de changer son niveau actif
 * Mise à jour pour le système 1-6+B
 */
const LevelProgressModal = ({
  visible,
  levels = [],
  onClose,
  onSelectLevel,
}) => {
  // Trouver le niveau actif
  const activeLevel = levels.find((level) => level.isActive);
  const activeLevelId = activeLevel ? activeLevel.id : null;

  // Affichage du niveau (1,2,3,4,5,6 ou B pour bonus)
  const getLevelDisplay = (levelId) => {
    return levelId === "bonus" ? "B" : levelId;
  };

  // Obtenir le titre complet du niveau
  const getLevelTitle = (levelId) => {
    const levelInfo = LANGUAGE_LEVELS[levelId];
    if (levelInfo) {
      return levelInfo.title;
    }
    return `Niveau ${levelId}`;
  };

  // Affichage du niveau actif
  const getActiveLevelDisplay = () => {
    if (!activeLevelId) return null;
    return getLevelDisplay(activeLevelId);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Progression par niveau</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Information sur le niveau actif */}
          {activeLevelId && (
            <View style={styles.activeInfoContainer}>
              <Text style={styles.activeInfoText}>
                Niveau actif :{" "}
                <Text style={styles.activeInfoBold}>
                  {getActiveLevelDisplay()}
                </Text>
              </Text>
              <Text style={styles.activeInfoDescription}>
                Sélectionnez un niveau pour le définir comme actif et y accéder
                directement
              </Text>
            </View>
          )}

          <ScrollView
            style={styles.levelsScrollView}
            showsVerticalScrollIndicator={false}
          >
            {levels.map((level) => {
              const isActive = level.isActive || level.id === activeLevelId;
              const levelDisplay = getLevelDisplay(level.id);
              const levelTitle = getLevelTitle(level.id);

              return (
                <TouchableOpacity
                  key={level.id}
                  style={[
                    styles.levelCard,
                    {
                      borderLeftColor: level.color,
                      backgroundColor: isActive ? `${level.color}08` : "white",
                    },
                  ]}
                  onPress={() => onSelectLevel?.(level.id)}
                >
                  <View style={styles.levelCardContent}>
                    <View style={styles.levelHeader}>
                      <Text style={styles.levelTitle}>{levelTitle}</Text>
                      {isActive && (
                        <View style={styles.activeIndicatorContainer}>
                          <View
                            style={[
                              styles.activeIndicator,
                              { backgroundColor: level.color },
                            ]}
                          />
                          <Text
                            style={[styles.activeText, { color: level.color }]}
                          >
                            Actif
                          </Text>
                        </View>
                      )}
                    </View>

                    {/* Barre de progression */}
                    <View style={styles.levelProgressContainer}>
                      <View style={styles.levelProgressBar}>
                        <View
                          style={[
                            styles.levelProgressFill,
                            {
                              width: `${level.progress || 0}%`,
                              backgroundColor: level.color,
                            },
                          ]}
                        />
                      </View>
                      <Text style={styles.levelProgressText}>
                        {level.progress || 0}%
                      </Text>
                    </View>

                    {/* Informations spéciales pour le bonus */}
                    {level.id === "bonus" && (
                      <View style={styles.bonusInfoContainer}>
                        <Text
                          style={[styles.bonusInfoText, { color: level.color }]}
                        >
                          🔥 Vocabulaire • Expressions • Lecture
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Badge du niveau */}
                  <View
                    style={[
                      styles.levelBadge,
                      { backgroundColor: level.color },
                    ]}
                  >
                    <Text style={styles.levelBadgeText}>{levelDisplay}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity style={styles.closeModalButton} onPress={onClose}>
            <Text style={styles.closeModalButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LevelProgressModal;

