// src/screens/exercises/phrases/PhrasesCategorySelector/index.js - VERSION FIXÉE
import CategorySelector from "../../../../components/exercise-common/CategorySelector";
import { useCallback } from "react";
import PropTypes from 'prop-types';

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
  const handleCategorySelect = useCallback((categoryId) => {
    onSelectCategory(categoryId);
  }, [onSelectCategory]);

  return (
    <CategorySelector
      categories={formattedCategories}
      selectedCategory={selectedIndex} // 🎯 FIX : Maintenant selectedIndex correspond à category.id
      onSelectCategory={handleCategorySelect}
      primaryColor={levelColor}
    />
  );
};

// ✅ Définition de PropTypes pour la validation des props
PhrasesCategorySelector.propTypes = {
  // 'categories' est manquant dans la validation
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  // 'selectedIndex' est manquant dans la validation
  selectedIndex: PropTypes.number.isRequired,
  // 'onSelectCategory' est manquant dans la validation
  onSelectCategory: PropTypes.func.isRequired,
  // 'levelColor' est manquant dans la validation
  levelColor: PropTypes.string,
};

export default PhrasesCategorySelector;