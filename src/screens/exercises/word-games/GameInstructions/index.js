// src/screens/exercises/wordGames/components/GameInstructions/index.js
import { Text } from "react-native";
import PropTypes from 'prop-types';
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

// ✅ Ajout de la validation des props
GameInstructions.propTypes = {
  instructions: PropTypes.string.isRequired,
};

export default GameInstructions;
