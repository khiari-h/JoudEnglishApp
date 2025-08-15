// src/screens/exercises/Conversation/ConversationConversationSelector/index.js
import { View } from "react-native";
import CategorySelector from "../../../../components/exercise-common/CategorySelector";
import styles from "./style";
import PropTypes from 'prop-types';

const ConversationSelector = ({
  scenarios,
  selectedIndex,
  onSelectScenario,
  levelColor = "#5E60CE",
}) => {
  // Transformer les scénarios pour correspondre au format du CategorySelector
  const formattedScenarios = scenarios.map((scenario, index) => ({
    id: index,
    name: scenario.title,
  }));

  return (
    <View style={styles.conversationSelector}>
      <CategorySelector
        categories={formattedScenarios}
        selectedCategory={selectedIndex === undefined ? 0 : selectedIndex}
        onSelectCategory={onSelectScenario}
        primaryColor={levelColor}
      />
    </View>
  );
};

// ✅ Ajout de la validation des props
ConversationSelector.propTypes = {
  // 'scenarios' est manquant dans la validation
  scenarios: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  // 'selectedIndex' est manquant dans la validation
  selectedIndex: PropTypes.number,
  // 'onSelectScenario' est manquant dans la validation
  onSelectScenario: PropTypes.func.isRequired,
  // 'levelColor' est manquant dans la validation
  levelColor: PropTypes.string,
};

export default ConversationSelector;