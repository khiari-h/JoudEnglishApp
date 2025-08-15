// src/components/screens/exercises/errorCorrection/ErrorCorrectionCategorySelector/index.js
import { View } from "react-native";
import CategorySelector from "../../../../components/exercise-common/CategorySelector";
import styles from "./style";
import PropTypes from 'prop-types';

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

// ✅ Définition de PropTypes pour la validation des props
ErrorCorrectionCategorySelector.propTypes = {
  // 'categories' est manquant dans la validation
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  // 'selectedCategory' est manquant dans la validation
  selectedCategory: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  // 'onSelectCategory' est manquant dans la validation
  onSelectCategory: PropTypes.func.isRequired,
  // 'levelColor' est manquant dans la validation
  levelColor: PropTypes.string,
};

export default ErrorCorrectionCategorySelector;