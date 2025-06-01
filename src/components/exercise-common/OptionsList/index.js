// src/components/exercise-common/OptionsList/index.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";

/**
 * Liste d'options sélectionnables pour les exercices à choix multiples
 */
const OptionsList = ({
  options = [],
  selectedOptionId = null,
  onSelectOption,
  correctOptionId = null,
  showCorrectAnswer = false,
  disabled = false,
  primaryColor = "#5E60CE",
  layout = "vertical", // 'vertical' ou 'grid'
}) => {
  // Détermine si une option est correcte (utile pour l'affichage des réponses)
  const isCorrectOption = (optionId) => {
    return showCorrectAnswer && optionId === correctOptionId;
  };

  // Détermine si une option est incorrecte (utile pour l'affichage des réponses)
  const isIncorrectSelection = (optionId) => {
    return (
      showCorrectAnswer &&
      selectedOptionId === optionId &&
      optionId !== correctOptionId
    );
  };

  // Définit le style pour chaque option
  const getOptionStyle = (optionId) => {
    if (isCorrectOption(optionId)) {
      return styles.correctOption;
    }
    if (isIncorrectSelection(optionId)) {
      return styles.incorrectOption;
    }
    if (selectedOptionId === optionId) {
      return {
        ...styles.selectedOption,
        borderColor: primaryColor,
      };
    }
    return styles.option;
  };

  // Définit le style du texte pour chaque option
  const getOptionTextStyle = (optionId) => {
    if (isCorrectOption(optionId)) {
      return styles.correctOptionText;
    }
    if (isIncorrectSelection(optionId)) {
      return styles.incorrectOptionText;
    }
    if (selectedOptionId === optionId) {
      return {
        ...styles.selectedOptionText,
        color: primaryColor,
      };
    }
    return styles.optionText;
  };

  // Rendu pour la mise en page verticale
  const renderVerticalOptions = () => (
    <View style={styles.verticalContainer}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[styles.optionItem, getOptionStyle(option.id)]}
          onPress={() => !disabled && onSelectOption(option.id)}
          disabled={disabled}
        >
          <Text style={[styles.optionItemText, getOptionTextStyle(option.id)]}>
            {option.text}
          </Text>

          {isCorrectOption(option.id) && (
            <Ionicons name="checkmark-circle" size={24} color="#10B981" />
          )}

          {isIncorrectSelection(option.id) && (
            <Ionicons name="close-circle" size={24} color="#EF4444" />
          )}

          {selectedOptionId === option.id && !showCorrectAnswer && (
            <View
              style={[
                styles.selectedIndicator,
                { backgroundColor: primaryColor },
              ]}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  // Rendu pour la mise en page en grille
  const renderGridOptions = () => (
    <View style={styles.gridContainer}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.gridOptionItem,
            getOptionStyle(option.id),
            { width: `${100 / Math.min(options.length, 2) - 2}%` },
          ]}
          onPress={() => !disabled && onSelectOption(option.id)}
          disabled={disabled}
        >
          <Text style={[styles.gridOptionText, getOptionTextStyle(option.id)]}>
            {option.text}
          </Text>

          {isCorrectOption(option.id) && (
            <Ionicons name="checkmark-circle" size={24} color="#10B981" />
          )}

          {isIncorrectSelection(option.id) && (
            <Ionicons name="close-circle" size={24} color="#EF4444" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  return layout === "vertical" ? renderVerticalOptions() : renderGridOptions();
};

export default OptionsList;

