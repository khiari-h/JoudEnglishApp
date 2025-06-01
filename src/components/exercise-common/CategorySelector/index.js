import React from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import styles from "./style";

/**
 * Sélecteur de catégories horizontal pour filtrer les exercices par sujet
 */
const CategorySelector = ({
  categories = [],
  selectedCategory,
  onSelectCategory,
  primaryColor = "#5E60CE",
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Uniquement les catégories spécifiques */}
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryItem,
              selectedCategory === category.id && {
                backgroundColor: `${primaryColor}15`,
                borderColor: primaryColor,
              },
            ]}
            onPress={() => onSelectCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && {
                  color: primaryColor,
                  fontWeight: "600",
                },
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategorySelector;

