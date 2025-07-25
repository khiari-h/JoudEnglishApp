// src/screens/exercises/wordGames/components/GameInstructions/index.js


import styles from "./style";

/**
 * Composant pour afficher les instructions d'un jeu
 * 
 * @param {string} instructions - Instructions du jeu
 */
const GameInstructions = ({ instructions }) => {
  return (
    <Text style={styles.gameInstructions}>
      {instructions}
    </Text>
  );
};

export default GameInstructions;
