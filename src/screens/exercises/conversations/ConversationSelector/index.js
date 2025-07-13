// src/screens/exercises/Conversation/ConversationConversationSelector/index.js



import styles from "./style";

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

export default ConversationSelector;

