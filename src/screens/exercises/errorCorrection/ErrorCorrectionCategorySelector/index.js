// src/components/screens/exercises/errorCorrection/ErrorCorrectionCategorySelector/index.js



import styles from "./style";

/**
 * Sélecteur de catégories pour les exercices de correction d'erreurs
 * Réutilise le composant CategorySelector générique
 */
const ErrorCorrectionCategorySelector = ({
  categories,
  selectedCategory,
  onSelectCategory,
  levelColor,
}) => {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        primaryColor={levelColor}
      />
    </View>
  );
};

export default ErrorCorrectionCategorySelector;

