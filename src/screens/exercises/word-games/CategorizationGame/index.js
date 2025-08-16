// src/screens/exercises/word-games/CategorizationGame/index.js - DESIGN UNIFIÉ AVEC MATCHING + COULEURS UNIQUES

import { View, Text, TouchableOpacity } from "react-native";
import { useCallback } from "react";
import PropTypes from 'prop-types';
import styles from "./style";

/**
 * Composant pour le jeu de catégorisation - DESIGN UNIFIÉ AVEC MATCHING + COULEURS UNIQUES
 * Problèmes résolus :
 * - Logique de sélection des mots
 * - Gestion des items sélectionnés
 * - Interface utilisateur cohérente avec matching games
 * - Design épuré et élégant
 * - Couleurs uniques par tile comme dans le matching
 */
const CategorizationGame = ({
  game,
  selectedItems,
  shuffledOptions,
  showFeedback,
  levelColor,
  onSelectItem,
}) => {
  
  // ✅ AJOUTÉ : Couleurs uniques pour chaque tile (comme dans matching)
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
    
    // Utiliser l'ID unique de l'item pour une couleur aléatoire
    const colorIndex = (itemId.charCodeAt(0) + itemId.charCodeAt(itemId.length - 1)) % colors.length;
    return colors[colorIndex];
  };
  
  // ✅ CORRIGÉ : Handler simple et efficace
  const handleSelectItem = useCallback(
    (item, index) => {
      if (!showFeedback) {
        onSelectItem(item, index);
      }
    },
    [onSelectItem, showFeedback]
  );

  return (
    <View style={styles.gameContainer}>
      {/* ✅ SIMPLIFIÉ : Instructions sans doublon */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsText}>
          {game.title}
        </Text>
      </View>

      {/* ✅ SIMPLIFIÉ : Container de catégorie sans redondance */}
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>
          Category:{" "}
          <Text style={{ 
            color: levelColor || "#3b82f6", 
            fontWeight: '600' 
          }}>
            {game.currentCategory}
          </Text>
        </Text>
        <Text style={styles.categorySubtitle}>
          Select all the words that belong to this category
        </Text>
      </View>

      {/* ✅ CORRIGÉ : Grille des mots avec couleurs uniques comme dans matching */}
      <View style={styles.wordsContainer}>
        {shuffledOptions.map((item, index) => {
          const isSelected = selectedItems.some((selected) => 
            selected.item.id === item.id && selected.index === index
          );

          // ✅ AJOUTÉ : Couleur unique pour chaque tile (comme dans matching)
          const itemColor = getRandomColor(item.id);

          return (
            <TouchableOpacity
              key={`${item.id}-${index}`}
              style={[
                styles.wordTile,
                { 
                  borderColor: itemColor, 
                  borderWidth: 3, // ✅ AJOUTÉ : Bordure épaisse comme dans matching
                },
                isSelected && [
                  styles.selectedWordTile,
                  {
                    backgroundColor: itemColor + '30', // ✅ AJOUTÉ : Même style que matching
                    borderWidth: 4,
                    shadowColor: itemColor,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 4,
                    elevation: 5,
                  },
                ],
              ]}
              onPress={() => handleSelectItem(item, index)}
              disabled={showFeedback}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.wordTileText,
                  { 
                    color: itemColor, // ✅ AJOUTÉ : Texte coloré comme dans matching
                    fontWeight: '700', // ✅ AJOUTÉ : Plus gras comme dans matching
                  },
                  isSelected && { 
                    color: '#ffffff', // ✅ AJOUTÉ : Blanc quand sélectionné comme dans matching
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
      
      {/* Indice simple et élégant */}
      {game.hint && (
        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>💡 {game.hint}</Text>
        </View>
      )}
    </View>
  );
};

// ✅ CORRIGÉ : PropTypes mis à jour
CategorizationGame.propTypes = {
  game: PropTypes.shape({
    type: PropTypes.oneOf(['categorization']).isRequired,
    title: PropTypes.string,
    instructions: PropTypes.string,
    currentCategory: PropTypes.string.isRequired,
    categories: PropTypes.object.isRequired,
    words: PropTypes.array.isRequired,
    hint: PropTypes.string,
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

export default CategorizationGame;