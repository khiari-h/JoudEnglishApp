// src/screens/exercises/wordGames/WordGamesCard/index.js
import { View, Text, ScrollView, Animated } from "react-native";
import PropTypes from 'prop-types';
import MatchingGame from "../MatchingGame";
import CategorizationGame from "../CategorizationGame";
import FeedbackMessage from "../FeedbackMessage";
import styles from "./style";

/**
 * Carte principale contenant le jeu actuel
 * Version simplifiée - Matching et Categorization uniquement
 *
 * @param {Object} currentGame - Jeu actuel à afficher
 * @param {Array} selectedItems - Items sélectionnés par l'utilisateur
 * @param {Array} matchedItems - Items correctement appariés (pour matching)
 * @param {Array} shuffledOptions - Options mélangées pour le jeu
 * @param {boolean} showFeedback - Indique si le feedback doit être affiché
 * @param {boolean} isCorrect - Indique si la réponse est correcte
 * @param {string} levelColor - Couleur associée au niveau
 * @param {Object} fadeAnim - Animation de fondu
 * @param {Object} bounceAnim - Animation de rebond
 * @param {Function} onSelectItem - Fonction appelée lors de la sélection d'un item
 */
const WordGamesCard = ({
  currentGame,
  selectedItems,
  matchedItems,
  shuffledOptions,
  showFeedback,
  isCorrect,
  levelColor,
  fadeAnim,
  bounceAnim,
  onSelectItem,
}) => {
  
  // ✅ AJOUTÉ : Debug pour voir pourquoi le jeu ne s'affiche pas
  console.log('🔍 DEBUG WordGamesCard:', {
    currentGame: !!currentGame,
    currentGameType: currentGame?.type,
    currentGameTitle: currentGame?.title,
    shuffledOptionsLength: shuffledOptions?.length,
    selectedItemsLength: selectedItems?.length,
    matchedItemsLength: matchedItems?.length,
    showFeedback,
    isCorrect
  });
  
  // Rendu en fonction du type de jeu (seulement matching et categorization)
  const renderGameByType = () => {
    console.log('🔍 DEBUG renderGameByType:', {
      currentGameType: currentGame?.type,
      currentGameTitle: currentGame?.title
    });
    
    switch (currentGame.type) {
      case "matching":
        console.log('🔍 DEBUG: Rendu MatchingGame');
        return (
          <MatchingGame
            game={currentGame}
            selectedItems={selectedItems}
            matchedItems={matchedItems}
            shuffledOptions={shuffledOptions}
            showFeedback={showFeedback}
            levelColor={levelColor}
            onSelectItem={onSelectItem}
          />
        );
      case "categorization":
        console.log('🔍 DEBUG: Rendu CategorizationGame');
        return (
          <CategorizationGame
            game={currentGame}
            selectedItems={selectedItems}
            shuffledOptions={shuffledOptions}
            showFeedback={showFeedback}
            levelColor={levelColor}
            onSelectItem={onSelectItem}
          />
        );
      default:
        console.log('🔍 DEBUG: Type de jeu non supporté:', currentGame.type);
        return (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              Unsupported game type: {currentGame.type}
            </Text>
            <Text style={styles.errorSubText}>
              Only matching and categorization games are supported.
            </Text>
          </View>
        );
    }
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
    >
      <Animated.View
        style={[
          styles.gameCardContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: bounceAnim }],
          },
        ]}
      >
        {/* Titre du jeu */}
        {currentGame.title && (
          <Text style={styles.gameTitle}>{currentGame.title}</Text>
        )}

        {/* Rendu du jeu actuel */}
        {renderGameByType()}

        {/* Feedback après vérification */}
        {showFeedback && (
          <FeedbackMessage
            isCorrect={isCorrect}
            successMessage={currentGame.successMessage}
            failureMessage={currentGame.failureMessage}
            levelColor={levelColor}
          />
        )}
      </Animated.View>
    </ScrollView>
  );
};

// PropTypes pour le composant principal WordGamesCard
WordGamesCard.propTypes = {
  currentGame: PropTypes.shape({
    type: PropTypes.oneOf(['matching', 'categorization']).isRequired,
    title: PropTypes.string,
    successMessage: PropTypes.string,
    failureMessage: PropTypes.string,
  }).isRequired,
  selectedItems: PropTypes.array.isRequired,
  matchedItems: PropTypes.array.isRequired,
  shuffledOptions: PropTypes.array.isRequired,
  showFeedback: PropTypes.bool.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  levelColor: PropTypes.string.isRequired,
  fadeAnim: PropTypes.object.isRequired,
  bounceAnim: PropTypes.object.isRequired,
  onSelectItem: PropTypes.func.isRequired,
};

export default WordGamesCard;
