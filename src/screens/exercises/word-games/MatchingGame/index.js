// src/screens/exercises/word-games/MatchingGame/index.js - VERSION CORRIGÉE

import { View, Text, TouchableOpacity } from "react-native";
import { useCallback } from "react";
import PropTypes from 'prop-types';
import styles from "./style";

/**
 * Composant pour le jeu d'association de paires - VERSION CORRIGÉE
 * Problèmes résolus :
 * - Logique de sélection des paires
 * - Gestion des couleurs par paire
 * - Validation des correspondances
 * - Amélioration de la visibilité des éléments sélectionnés
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
  
  // ✅ CORRIGÉ : Debug simplifié
  console.log('🔍 DEBUG MatchingGame:', {
    gameType: game?.type,
    gameTitle: game?.title,
    shuffledOptionsLength: shuffledOptions?.length,
    selectedItemsLength: selectedItems?.length,
    matchedItemsLength: matchedItems?.length,
  });
  
  // Handler stable pour la sélection d'un item
  const handleItemPress = useCallback(
    (item, index) => {
      if (!matchedItems.some(matched => matched.item.id === item.id && matched.index === index) && !showFeedback) {
        onSelectItem(item, index);
      }
    },
    [onSelectItem, matchedItems, showFeedback]
  );

  // ✅ CORRIGÉ : Couleurs aléatoires pour chaque élément (pas par paire)
  const getRandomColor = (itemId) => {
    const colors = [
      '#ef4444', // Rouge vif
      '#3b82f6', // Bleu vif
      '#10b981', // Vert vif
      '#f59e0b', // Orange vif
      '#8b5cf6', // Violet vif
      '#ec4899', // Rose vif
      '#06b6d4', // Cyan vif
      '#84cc16', // Lime vif
      '#f97316', // Orange foncé
      '#6366f1', // Indigo
      '#14b8a6', // Teal
      '#f43f5e', // Rose foncé
    ];
    
    // ✅ CORRIGÉ : Utiliser l'ID unique de l'item pour une couleur aléatoire
    // Pas de lien avec originalPair pour éviter de donner les réponses
    const colorIndex = (itemId.charCodeAt(0) + itemId.charCodeAt(itemId.length - 1)) % colors.length;
    return colors[colorIndex];
  };

  return (
    <View style={styles.gameContainer}>
      {/* Instructions */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsText}>{game.instructions}</Text>
      </View>
      
      {/* Grille des items */}
      <View style={styles.matchingContainer}>
        {shuffledOptions.map((item, index) => {
          const isMatched = matchedItems.some(matched => 
            matched.item.id === item.id && matched.index === index
          );
          const isSelected = selectedItems.some(selected => 
            selected.item.id === item.id && selected.index === index
          );
          
          // ✅ CORRIGÉ : Couleur aléatoire unique pour chaque élément
          const itemColor = getRandomColor(item.id);
          
          return (
            <TouchableOpacity
              key={`${item.id}-${index}`}
              style={[
                styles.matchingTile,
                { borderColor: itemColor, borderWidth: 3 },
                isSelected && [
                  styles.selectedMatchingTile, 
                  { 
                    backgroundColor: itemColor + '30', // Plus transparent pour voir le texte
                    borderWidth: 4,
                    shadowColor: itemColor,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 4,
                    elevation: 5,
                  }
                ],
                isMatched && [
                  styles.matchedTile, 
                  { 
                    backgroundColor: itemColor + '60', // Plus opaque pour les éléments trouvés
                    borderWidth: 4,
                  }
                ],
              ]}
              onPress={() => handleItemPress(item, index)}
              disabled={isMatched}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.matchingText,
                  { 
                    color: isMatched ? '#ffffff' : itemColor, // Blanc sur fond coloré si trouvé
                    fontWeight: '700', // Plus gras pour meilleure lisibilité
                    fontSize: 16, // Taille de police plus grande
                  },
                  isSelected && { 
                    color: '#ffffff', // Blanc quand sélectionné pour contraste
                    textShadowColor: itemColor,
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 2,
                  },
                ]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      
      {/* ✅ CORRIGÉ : Indicateur de progression des paires */}
      {matchedItems.length > 0 && (
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Paires trouvées : {matchedItems.length / 2} / {game.pairs?.length || 0}
          </Text>
        </View>
      )}
    </View>
  );
};

// ✅ CORRIGÉ : PropTypes mis à jour
MatchingGame.propTypes = {
  game: PropTypes.shape({
    type: PropTypes.oneOf(['matching']).isRequired,
    title: PropTypes.string,
    instructions: PropTypes.string,
    pairs: PropTypes.arrayOf(PropTypes.shape({
      word: PropTypes.string.isRequired,
      match: PropTypes.string.isRequired,
    })),
  }).isRequired,
  selectedItems: PropTypes.arrayOf(PropTypes.shape({
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      originalPair: PropTypes.number.isRequired,
      pairId: PropTypes.number.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
  })).isRequired,
  matchedItems: PropTypes.arrayOf(PropTypes.shape({
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      originalPair: PropTypes.number.isRequired,
      pairId: PropTypes.number.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
  })).isRequired,
  shuffledOptions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    originalPair: PropTypes.number.isRequired,
    pairId: PropTypes.number.isRequired,
  })).isRequired,
  showFeedback: PropTypes.bool.isRequired,
  levelColor: PropTypes.string,
  onSelectItem: PropTypes.func.isRequired,
};

export default MatchingGame;

