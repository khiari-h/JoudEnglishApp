// src/screens/exercises/wordGames/WordGamesCard/index.js
import { View, Text, ScrollView, Animated } from "react-native";
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import MatchingGame from "../MatchingGame";
import CategorizationGame from "../CategorizationGame";
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
  levelColor = "#3b82f6",
  fadeAnim,
  bounceAnim,
  onSelectItem,
  showPairFeedback,
  pairFeedbackMessage,
}) => {
  
  // ✅ AJOUTÉ : Animation pour l'info-bulle des paires
  const pairFeedbackAnim = useRef(new Animated.Value(0)).current;
  
  // ✅ AJOUTÉ : Animation d'apparition/disparition de l'info-bulle
  useEffect(() => {
    if (showPairFeedback) {
      // Animation d'apparition avec rebond
      Animated.spring(pairFeedbackAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      // Animation de disparition
      Animated.timing(pairFeedbackAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [showPairFeedback, pairFeedbackAnim]);
  
  // ✅ SIMPLIFIÉ : Debug essentiel seulement
  console.log('🔍 DEBUG WordGamesCard:', {
    currentGame: !!currentGame,
    showFeedback,
    isCorrect
  });
  
  // Rendu en fonction du type de jeu (seulement matching et categorization)
  const renderGameByType = () => {
    switch (currentGame.type) {
      case "matching":
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

        {/* ✅ AJOUTÉ : Info-bulle de feedback des paires (affichée pendant le jeu) */}
        {showPairFeedback && (
          <Animated.View
            style={[
              styles.pairFeedbackContainer,
              styles.successPairFeedback,
              {
                opacity: pairFeedbackAnim,
                transform: [{ scale: pairFeedbackAnim }],
              },
            ]}
          >
            <Text style={styles.pairFeedbackText}>
              {pairFeedbackMessage}
            </Text>
          </Animated.View>
        )}

        {/* Feedback après vérification */}
        {showFeedback && (
          <View style={styles.feedbackContainer}>
            {isCorrect ? (
              <View style={[styles.feedbackMessage, styles.successMessage]}>
                <Text style={styles.feedbackIcon}>🎉</Text>
                <Text style={styles.feedbackTitle}>Good job !</Text>
                <Text style={styles.feedbackText}>
                  Toutes vos paires sont correctes !
                </Text>
              </View>
            ) : (
              <View style={[styles.feedbackMessage, styles.errorMessage]}>
                <Text style={styles.feedbackIcon}>❌</Text>
                <Text style={styles.feedbackTitle}>Try again !</Text>
                <Text style={styles.feedbackText}>
                  Certaines paires sont incorrectes. Le jeu va se remélanger...
                </Text>
              </View>
            )}
          </View>
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
  }),
  selectedItems: PropTypes.array.isRequired,
  matchedItems: PropTypes.array.isRequired,
  shuffledOptions: PropTypes.array.isRequired,
  showFeedback: PropTypes.bool.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  levelColor: PropTypes.string,
  fadeAnim: PropTypes.object,
  bounceAnim: PropTypes.object,
  onSelectItem: PropTypes.func.isRequired,
  // ✅ AJOUTÉ : Props pour le feedback des paires
  showPairFeedback: PropTypes.bool.isRequired,
  pairFeedbackMessage: PropTypes.string.isRequired,
};

export default WordGamesCard;
