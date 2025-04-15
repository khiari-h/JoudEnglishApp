// src/screens/exercises/phrases/PhrasesCategorySelector/index.js
import React from "react";
import CategorySelector from "../../../../components/exercise-common/CategorySelector";

const PhrasesCategorySelector = ({
  categories,
  selectedIndex,
  onSelectCategory,
  levelColor,
}) => {
  // Transformer les catégories pour correspondre au format du CategorySelector
  const formattedCategories = categories.map((category) => ({
    id: category.id,
    name: category.name
  }));

  return (
    <CategorySelector
      categories={formattedCategories}
      selectedCategory={selectedIndex === undefined ? 0 : selectedIndex}
      onSelectCategory={onSelectCategory}
      primaryColor={levelColor}
    />
  );
};

export default PhrasesCategorySelector;
