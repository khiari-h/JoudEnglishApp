// src/screens/exercises/phrases/PhrasesCategorySelector/index.js - VERSION FIXÉE
import React from "react";
import CategorySelector from "../../../../components/exercise-common/CategorySelector";

const PhrasesCategorySelector = ({
  categories,
  selectedIndex,
  onSelectCategory,
  levelColor,
}) => {
  // 🎯 FIX : categories est un array de strings, pas d'objets
  // Transformer les noms de catégories en objets avec index comme id
  const formattedCategories = categories.map((categoryName, index) => ({
    id: index, // Utiliser l'index comme id pour correspondre à selectedIndex
    name: categoryName
  }));

  // 🎯 FIX : Utiliser selectedIndex directement (pas de transformation)
  const handleCategorySelect = (categoryId) => {
    // categoryId est maintenant l'index, on peut l'utiliser directement
    onSelectCategory(categoryId);
  };

  return (
    <CategorySelector
      categories={formattedCategories}
      selectedCategory={selectedIndex} // 🎯 FIX : Maintenant selectedIndex correspond à category.id
      onSelectCategory={handleCategorySelect}
      primaryColor={levelColor}
    />
  );
};

export default PhrasesCategorySelector;