// src/components/screens/exercises/reading/VocabularyPopup/index.js
import React from "react";
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from "react-native";
import styles from "./style";

/**
 * Popup pour afficher les définitions de vocabulaire
 */
const VocabularyPopup = ({
  visible,
  word,
  definition,
  onClose,
}) => {
  if (!visible || !word) return null;

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={styles.popup}>
              <View style={styles.header}>
                <Text style={styles.word}>{word}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={onClose}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.definition}>{definition}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default VocabularyPopup;