// src/components/screens/exercises/reading/ReadingTextSelector/index.js
import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from "./style";

/**
 * Sélecteur de textes pour l'exercice de lecture
 */
const ReadingTextSelector = ({
  exercises,
  selectedIndex,
  onSelectExercise,
  scrollViewRef,
  levelColor,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Texts:</Text>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {exercises.map((exercise, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.textButton,
              selectedIndex === index && [
                styles.selectedTextButton,
                { borderColor: levelColor },
              ],
            ]}
            onPress={() => onSelectExercise(index)}
          >
            <Text
              style={[
                styles.textButtonText,
                selectedIndex === index && { color: levelColor },
              ]}
            >
              {exercise.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ReadingTextSelector;