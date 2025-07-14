import CategorySelector from "../../../../components/exercise-common/CategorySelector";

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

export default GrammarRuleSelector;

