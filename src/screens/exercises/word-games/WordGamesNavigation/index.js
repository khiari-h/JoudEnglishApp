// src/screens/exercises/word-games/WordGamesNavigation/index.js - VERSION CORRIGÉE

import { View, TouchableOpacity, Text } from "react-native";
import { useCallback } from "react";
import PropTypes from 'prop-types';
import styles from "./style";

/**
 * Composant de navigation pour Word Games - VERSION CORRIGÉE
 * Problèmes résolus :
 * - Boutons qui débordent
 * - Logique de navigation incorrecte
 * - Affichage conditionnel des boutons selon le type de jeu
 */
const WordGamesNavigation = ({
  currentGame,
  showFeedback,
  selectedItems,
  isLastGame,
  canGoPrevious,
  levelColor = "#3b82f6",
  onCheckAnswer,
  onNext,
  onPrevious,
  canShowCheckButton,
}) => {
  
  // ✅ CORRIGÉ : Debug simplifié
  console.log('🔍 DEBUG WordGamesNavigation:', {
    gameType: currentGame?.type,
    showFeedback,
    selectedItemsLength: selectedItems?.length,
    isLastGame,
    canGoPrevious,
  });

  // ✅ CORRIGÉ : Déterminer le texte du bouton de vérification
  const getCheckButtonText = useCallback(() => {
    if (!currentGame) return "Vérifier";
    
    if (currentGame.type === 'matching') {
      return "Vérifier mes paires";
    } else if (currentGame.type === 'categorization') {
      return "Vérifier la réponse";
    }
    
    return "Vérifier";
  }, [currentGame, selectedItems]);

  // ✅ CORRIGÉ : Déterminer si le bouton de vérification est désactivé
  const isCheckButtonDisabled = useCallback(() => {
    if (!currentGame) return true;
    
    if (currentGame.type === 'matching') {
      // ✅ CORRIGÉ : Pour matching games, toujours activé
      return false;
    } else if (currentGame.type === 'categorization') {
      return selectedItems.length === 0;
    }
    
    return true;
  }, [currentGame, selectedItems]);

  return (
    <View style={styles.navigationContainer}>
      {/* ✅ CORRIGÉ : Bouton de vérification - affiché seulement quand on a des paires trouvées */}
      {currentGame?.type === 'matching' && !showFeedback && canShowCheckButton && (
        <TouchableOpacity
          style={[
            styles.checkAnswerButton,
            {
              backgroundColor: levelColor,
              opacity: 1,
            },
          ]}
          onPress={onCheckAnswer}
          activeOpacity={0.8}
        >
          <Text style={styles.checkAnswerButtonText}>
            {getCheckButtonText()}
          </Text>
        </TouchableOpacity>
      )}

      {/* ✅ CORRIGÉ : Bouton de vérification pour categorization games */}
      {currentGame?.type === 'categorization' && !showFeedback && (
        <TouchableOpacity
          style={[
            styles.checkAnswerButton,
            {
              backgroundColor: isCheckButtonDisabled() ? '#9ca3af' : levelColor,
              opacity: isCheckButtonDisabled() ? 0.6 : 1,
            },
          ]}
          onPress={onCheckAnswer}
          disabled={isCheckButtonDisabled()}
          activeOpacity={0.8}
        >
          <Text style={styles.checkAnswerButtonText}>
            {getCheckButtonText()}
          </Text>
        </TouchableOpacity>
      )}

      {/* ✅ CORRIGÉ : Instructions pour matching games */}
      {currentGame?.type === 'matching' && !showFeedback && (
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            💡 Sélectionnez 2 éléments pour former une paire, puis cliquez "Vérifier mes paires"
          </Text>
        </View>
      )}

      {/* ✅ CORRIGÉ : Boutons de navigation - affichés seulement après feedback */}
      {showFeedback && (
        <View style={styles.navigationButtonsContainer}>
          {/* Bouton Précédent */}
          {canGoPrevious && (
            <TouchableOpacity
              style={[styles.navigationButton, styles.previousButton]}
              onPress={onPrevious}
              activeOpacity={0.8}
            >
              <Text style={styles.navigationButtonText}>Précédent</Text>
            </TouchableOpacity>
          )}

          {/* Bouton Suivant */}
          <TouchableOpacity
            style={[
              styles.navigationButton,
              styles.nextButton,
              { backgroundColor: levelColor }
            ]}
            onPress={onNext}
            activeOpacity={0.8}
          >
            <Text style={styles.navigationButtonText}>
              {isLastGame ? "Terminer" : "Suivant"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

// ✅ CORRIGÉ : PropTypes mis à jour
WordGamesNavigation.propTypes = {
  currentGame: PropTypes.shape({
    type: PropTypes.oneOf(['matching', 'categorization']).isRequired,
  }),
  showFeedback: PropTypes.bool.isRequired,
  selectedItems: PropTypes.array.isRequired,
  isLastGame: PropTypes.bool.isRequired,
  canGoPrevious: PropTypes.bool.isRequired,
  levelColor: PropTypes.string,
  onCheckAnswer: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  canShowCheckButton: PropTypes.bool.isRequired,
};

export default WordGamesNavigation;