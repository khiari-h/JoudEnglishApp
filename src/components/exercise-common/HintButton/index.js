// src/components/exercise-common/HintButton/index.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";

/**
 * Bouton d'indice avec modal pour afficher des aides contextuelles
 * pendant les exercices
 */
const HintButton = ({
  hint,
  hintTitle = "Indice",
  hintType = "text", // 'text', 'example', 'rule'
  limitedHints = false,
  maxHints = 3,
  primaryColor = "#5E60CE",
  onUseHint = () => {},
}) => {
  // États
  const [modalVisible, setModalVisible] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hintRevealed, setHintRevealed] = useState(false);

  // Animation
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(20)).current;

  // Vérifier si les indices sont épuisés
  const hintsExhausted = limitedHints && hintsUsed >= maxHints;

  // Ouvrir la modal
  const openModal = () => {
    if (hintsExhausted) return;

    setModalVisible(true);

    // Réinitialiser les animations
    fadeAnim.setValue(0);
    translateY.setValue(20);
    setHintRevealed(false);
  };

  // Fermer la modal
  const closeModal = () => {
    setModalVisible(false);
  };

  // Révéler l'indice
  const revealHint = () => {
    if (hintRevealed) return;

    // Incrémenter le compteur d'indices
    const newHintsUsed = hintsUsed + 1;
    setHintsUsed(newHintsUsed);
    setHintRevealed(true);

    // Déclencher le callback
    onUseHint(newHintsUsed);

    // Animer l'apparition
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Déterminer l'icône en fonction du type d'indice
  const getHintIcon = () => {
    switch (hintType) {
      case "example":
        return "bookmarks-outline";
      case "rule":
        return "school-outline";
      case "text":
      default:
        return "bulb-outline";
    }
  };

  return (
    <View style={styles.container}>
      {/* Bouton d'indice */}
      <TouchableOpacity
        style={[
          styles.hintButton,
          { borderColor: primaryColor },
          hintsExhausted && styles.disabledHintButton,
        ]}
        onPress={openModal}
        disabled={hintsExhausted}
      >
        <Ionicons
          name={getHintIcon()}
          size={18}
          color={hintsExhausted ? "#9CA3AF" : primaryColor}
        />
        <Text
          style={[
            styles.hintButtonText,
            { color: hintsExhausted ? "#9CA3AF" : primaryColor },
          ]}
        >
          {limitedHints
            ? `Indice (${maxHints - hintsUsed}/${maxHints})`
            : "Indice"}
        </Text>
      </TouchableOpacity>

      {/* Modal pour afficher l'indice */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContent}>
                {/* En-tête de la modal */}
                <View style={styles.modalHeader}>
                  <View style={styles.titleContainer}>
                    <Ionicons
                      name={getHintIcon()}
                      size={20}
                      color={primaryColor}
                      style={styles.titleIcon}
                    />
                    <Text style={styles.modalTitle}>{hintTitle}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={closeModal}
                  >
                    <Ionicons name="close" size={24} color="#6B7280" />
                  </TouchableOpacity>
                </View>

                {/* Contenu de la modal */}
                <View style={styles.modalBody}>
                  {!hintRevealed ? (
                    <View style={styles.revealContainer}>
                      <Text style={styles.revealText}>
                        {limitedHints
                          ? `Vous avez utilisé ${hintsUsed} sur ${maxHints} indices disponibles.`
                          : "Besoin d'un coup de pouce ?"}
                      </Text>
                      <TouchableOpacity
                        style={[
                          styles.revealButton,
                          { backgroundColor: primaryColor },
                        ]}
                        onPress={revealHint}
                      >
                        <Text style={styles.revealButtonText}>
                          Révéler l'indice
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <Animated.View
                      style={[
                        styles.hintContentContainer,
                        {
                          opacity: fadeAnim,
                          transform: [{ translateY }],
                        },
                      ]}
                    >
                      <Text style={styles.hintText}>{hint}</Text>
                    </Animated.View>
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default HintButton;
