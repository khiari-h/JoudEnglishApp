import CategorySelector from "../../../../components/exercise-common/CategorySelector";
import PropTypes from 'prop-types';

/**
 * Sélecteur de règles grammaticales réutilisant le CategorySelector générique
 *
 * @param {Array} rules - Liste des règles disponibles
 * @param {number} selectedIndex - Index de la règle sélectionnée
 * @param {function} onSelectRule - Fonction à appeler lors de la sélection d'une règle
 * @param {string} levelColor - Couleur du niveau actuel
 */
const GrammarRuleSelector = ({
  rules,
  selectedIndex,
  onSelectRule,
  levelColor = "#3b82f6",
}) => {
  // Transformer les règles pour correspondre au format du CategorySelector
  const formattedRules = rules.map((rule, index) => ({
    id: index,
    name: rule.title,
  }));

  return (
    <CategorySelector
      categories={formattedRules}
      selectedCategory={selectedIndex === undefined ? 0 : selectedIndex}
      onSelectCategory={onSelectRule}
      primaryColor={levelColor}
    />
  );
};

// ✅ Définition de PropTypes pour la validation des props
GrammarRuleSelector.propTypes = {
  // 'rules' est manquant dans la validation
  rules: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  // 'selectedIndex' est manquant dans la validation
  selectedIndex: PropTypes.number.isRequired,
  // 'onSelectRule' est manquant dans la validation
  onSelectRule: PropTypes.func.isRequired,
  // 'levelColor' est manquant dans la validation
  levelColor: PropTypes.string,
};

export default GrammarRuleSelector;