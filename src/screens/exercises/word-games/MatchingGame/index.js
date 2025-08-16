// src/screens/exercises/word-games/MatchingGame/index.js - AVEC PROPTYPES

import { View, Text, TouchableOpacity } from "react-native";
import { useCallback } from "react";
import PropTypes from 'prop-types';
import styles from "./style";

/**
 * Composant pour le jeu d'association de paires
 *
 * @param {Object} game - Données du jeu
 * @param {Array} selectedItems - Items sélectionnés par l'utilisateur
 * @param {Array} matchedItems - Items correctement appariés
 * @param {Array} shuffledOptions - Options mélangées
 * @param {boolean} showFeedback - Indique si le feedback est affiché
 * @param {string} levelColor - Couleur associée au niveau
 * @param {Function} onSelectItem - Fonction appelée lors de la sélection d'un item
 */
const MatchingGame = ({
  game,
  selectedItems,
  matchedItems,
  shuffledOptions,
  showFeedback,
  levelColor = "#3b82f6",
  onSelectItem,
}) => {
  
  // ✅ AJOUTÉ : Debug pour voir exactement ce que MatchingGame reçoit
  console.log('🔍 DEBUG MatchingGame:', {
    game: !!game,
    gameInstructions: game?.instructions,
    shuffledOptions,
    selectedItems,
    matchedItems,
    showFeedback
  });
  
  // ✅ AJOUTÉ : Debug détaillé pour voir le contenu de chaque option
  console.log('🔍 DEBUG shuffledOptions détaillé:', shuffledOptions.map((item, index) => ({
    index,
    item,
    itemType: typeof item,
    itemKeys: item ? Object.keys(item) : 'null/undefined',
    itemText: item?.text,
    itemId: item?.id
  })));
  
  // Handler stable pour la sélection d'un item
  const handleItemPress = useCallback(
    (item, index) => {
      if (!matchedItems.some(matched => matched.item.id === item.id && matched.index === index) && !showFeedback) {
        onSelectItem(item, index);
      }
    },
    [onSelectItem, matchedItems, showFeedback]
  );

  return (
    <View style={styles.gameContainer}>
      {console.log('🔍 DEBUG: Début du JSX MatchingGame')}
      
      {/* ✅ CORRIGÉ : Remplacé GameInstructions par un composant simple */}
      <View style={styles.instructionsContainer}>
        {console.log('🔍 DEBUG: Rendu instructionsContainer')}
        <Text style={styles.instructionsText}>{game.instructions}</Text>
        {console.log('🔍 DEBUG: Rendu instructionsText')}
      </View>
      
      {console.log('🔍 DEBUG: Avant shuffledOptions.length')}
      {console.log('🔍 DEBUG: shuffledOptions.length:', shuffledOptions.length)}
      
      <View style={styles.matchingContainer}>
        {console.log('🔍 DEBUG: Rendu matchingContainer')}
        
        {shuffledOptions.map((item, index) => {
          console.log(`🔍 DEBUG: Rendu item ${index}:`, item);
          const isMatched = matchedItems.some(matched => 
            matched.item.id === item.id && matched.index === index
          );
          const isSelected = selectedItems.some(selected => 
            selected.item.id === item.id && selected.index === index
          );
          
          // ✅ AJOUTÉ : Couleurs différentes pour chaque paire
          const pairColors = [
            '#ef4444', // Rouge
            '#3b82f6', // Bleu
            '#10b981', // Vert
            '#f59e0b', // Orange
            '#8b5cf6', // Violet
          ];
          const pairColor = pairColors[item.originalPair % pairColors.length];
          
          return (
            <TouchableOpacity
              key={`${item}-${index}`}
              style={[
                styles.matchingTile,
                { borderColor: pairColor, borderWidth: 2 },
                isSelected && [styles.selectedMatchingTile, { backgroundColor: pairColor + '20' }],
                isMatched && [styles.matchedTile, { backgroundColor: pairColor + '40' }],
              ]}
              onPress={() => handleItemPress(item, index)}
              disabled={isMatched}
            >
              {console.log(`🔍 DEBUG: Rendu TouchableOpacity pour item ${index}`)}
              <Text
                style={[
                  styles.matchingText,
                  { color: pairColor, fontWeight: '600' },
                  isMatched && { color: '#ffffff' },
                ]}
              >
                {console.log(`🔍 DEBUG: Rendu Text pour item ${index}:`, item)}
                {item.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      
      {console.log('🔍 DEBUG: Fin du JSX MatchingGame')}

      {game.hint && (
        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>Hint: {game.hint}</Text>
        </View>
      )}
    </View>
  );
};

// PropTypes pour le composant MatchingGame
MatchingGame.propTypes = {
  game: PropTypes.shape({
    instructions: PropTypes.string.isRequired,
    hint: PropTypes.string,
  }).isRequired,
  selectedItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  matchedItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  shuffledOptions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  showFeedback: PropTypes.bool.isRequired,
  levelColor: PropTypes.string,
  onSelectItem: PropTypes.func.isRequired,
};

export default MatchingGame;

