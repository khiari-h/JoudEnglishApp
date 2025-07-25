// src/screens/exercises/wordGames/games/CategorizationGame/index.js



import styles from "./style";

/**
 * Composant pour le jeu de catégorisation
 *
 * @param {Object} game - Données du jeu
 * @param {Array} selectedItems - Items sélectionnés par l'utilisateur
 * @param {Array} shuffledOptions - Options mélangées
 * @param {boolean} showFeedback - Indique si le feedback est affiché
 * @param {string} levelColor - Couleur associée au niveau
 * @param {Function} onSelectItem - Fonction appelée lors de la sélection d'un mot
 */
const CategorizationGame = ({
  game,
  selectedItems,
  shuffledOptions,
  showFeedback,
  levelColor,
  onSelectItem,
}) => {
  return (
    <View style={styles.gameContainer}>
      <GameInstructions instructions={game.instructions} />

      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>
          Category:{" "}
          <Text style={{ color: levelColor }}>{game.currentCategory}</Text>
        </Text>
        <Text style={styles.categorySubtitle}>
          Select all words that belong to this category:
        </Text>
      </View>

      <View style={styles.wordsContainer}>
        {shuffledOptions.map((word, index) => {
          const isSelected = selectedItems.some((item) => item.value === word);

          return (
            <TouchableOpacity
              key={`word-${index}`}
              style={[
                styles.wordTile,
                isSelected && [
                  styles.selectedWordTile,
                  {
                    backgroundColor: `${levelColor}30`,
                    borderColor: levelColor,
                  },
                ],
              ]}
              onPress={() => onSelectItem(word, index)}
              disabled={showFeedback}
            >
              <Text
                style={[
                  styles.wordTileText,
                  isSelected && { color: levelColor },
                ]}
              >
                {word}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CategorizationGame;

