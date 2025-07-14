// VocabularyExercise/VocabularyCategorySelector.js
import CategorySelector from "../../../../components/exercise-common/CategorySelector";

/**
 * Adaptateur pour le sélecteur de catégories de vocabulaire
 * Réutilise le composant générique CategorySelector
 */
const VocabularyCategorySelector = ({
  categories = [],
  selectedIndex = 0,
  onSelectCategory,
  levelColor,
}) => {
  // Transformation du format des catégories pour correspondre au composant générique
  const formattedCategories = categories.map((categoryTitle, index) => ({
    id: index,
    name: categoryTitle,
  }));

  // Fonction de callback adaptée - notre composant utilise des indices,
  // le composant générique utilise des IDs
  const handleCategorySelect = (categoryId) => {
    // Si l'option "Tous" est sélectionnée (null), nous sélectionnons la première catégorie
    if (categoryId === null) {
      onSelectCategory(0);
    } else {
      onSelectCategory(categoryId);
    }
  };

  return (
    <CategorySelector
      categories={formattedCategories}
      selectedCategory={selectedIndex === undefined ? 0 : selectedIndex}
      onSelectCategory={handleCategorySelect}
      primaryColor={levelColor}
    />
  );
};

export default VocabularyCategorySelector;

