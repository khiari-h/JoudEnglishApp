import React from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Modal 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";

/**
 * Modal pour afficher la progression détaillée par niveau
 * et permettre à l'utilisateur de changer son niveau actif
 */
const LevelProgressModal = ({ 
  visible, 
  levels = [], 
  onClose, 
  onSelectLevel 
}) => {
  // Trouver le niveau actif
  const activeLevel = levels.find(level => level.isActive);
  const activeLevelId = activeLevel ? activeLevel.id.toUpperCase() : null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              Progression par niveau
            </Text>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={onClose}
            >
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Information sur le niveau actif */}
          {activeLevelId && (
            <View style={styles.activeInfoContainer}>
              <Text style={styles.activeInfoText}>
                Niveau actif : <Text style={styles.activeInfoBold}>{activeLevelId}</Text>
              </Text>
              <Text style={styles.activeInfoDescription}>
                Sélectionnez un niveau pour le définir comme actif et y accéder directement
              </Text>
            </View>
          )}

          <ScrollView 
            style={styles.levelsScrollView}
            showsVerticalScrollIndicator={false}
          >
            {levels.map((level) => {
              const formattedId = level.id.toUpperCase();
              const isActive = level.isActive || formattedId === activeLevelId;
              
              return (
                <TouchableOpacity
                  key={level.id}
                  style={[
                    styles.levelCard, 
                    { 
                      borderLeftColor: level.color,
                      backgroundColor: isActive ? `${level.color}08` : "white"
                    }
                  ]}
                  onPress={() => onSelectLevel && onSelectLevel(formattedId)}
                >
                  <View style={styles.levelCardContent}>
                    <View style={styles.levelHeader}>
                      <Text style={styles.levelTitle}>{level.title}</Text>
                      {isActive && (
                        <View style={styles.activeIndicatorContainer}>
                          <View style={[styles.activeIndicator, { backgroundColor: level.color }]} />
                          <Text style={[styles.activeText, { color: level.color }]}>Actif</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.levelProgressContainer}>
                      <View style={styles.levelProgressBar}>
                        <View
                          style={[
                            styles.levelProgressFill,
                            {
                              width: `${level.progress}%`,
                              backgroundColor: level.color,
                            },
                          ]}
                        />
                      </View>
                      <Text style={styles.levelProgressText}>
                        {level.progress}%
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.levelBadge,
                      { backgroundColor: level.color },
                    ]}
                  >
                    <Text style={styles.levelBadgeText}>
                      {formattedId}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={onClose}
          >
            <Text style={styles.closeModalButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LevelProgressModal;