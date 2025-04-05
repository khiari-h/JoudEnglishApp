// src/components/exercise-common/CategorySelector/index.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './styles';

/**
 * Sélecteur de catégories horizontal pour filtrer les exercices par sujet
 */
const CategorySelector = ({
  categories = [],
  selectedCategory,
  onSelectCategory,
  primaryColor = '#5E60CE',
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Option "Tous" toujours présente */}
        <TouchableOpacity
          style={[
            styles.categoryItem,
            selectedCategory === null && { 
              backgroundColor: `${primaryColor}15`,
              borderColor: primaryColor 
            }
          ]}
          onPress={() => onSelectCategory(null)}
        >
          <Text 
            style={[
              styles.categoryText,
              selectedCategory === null && { color: primaryColor, fontWeight: '600' }
            ]}
          >
            Tous
          </Text>
        </TouchableOpacity>
        
        {/* Autres catégories */}
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryItem,
              selectedCategory === category.id && { 
                backgroundColor: `${primaryColor}15`,
                borderColor: primaryColor 
              }
            ]}
            onPress={() => onSelectCategory(category.id)}
          >
            <Text 
              style={[
                styles.categoryText,
                selectedCategory === category.id && { color: primaryColor, fontWeight: '600' }
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