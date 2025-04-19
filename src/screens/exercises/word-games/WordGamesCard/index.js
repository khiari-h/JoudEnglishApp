// src/screens/exercises/wordGames/WordGamesCard/index.js
import React from "react";
import { View, Text, ScrollView, Animated } from "react-native";
import AnagramGame from "../games/AnagramGame";
import MatchingGame from "../games/MatchingGame";
import WordSearchGame from "../games/WordSearchGame";
import CategorizationGame from "../games/CategorizationGame";
import FeedbackMessage from "../components/FeedbackMessage";
import styles from "./style";

/**
 * Carte principale contenant le jeu actuel
 * 
 * @param {Object} currentGame - Jeu actuel à afficher
 * @param {Array} selectedItems - Items sélectionnés par l'utilisateur
 * @param {Array} matchedItems - Items correctement appariés
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
  onSelectItem
}) => {
  // Rendu en fonction du type de jeu
  const renderGameByType = () => {
    switch (currentGame.type) {
      case "anagram":
        return (
          <AnagramGame
            game={currentGame}
            selectedItems={selectedItems}
            shuffledOptions={shuffledOptions}
            showFeedback={showFeedback}
            levelColor={levelColor}
            onSelectItem={onSelectItem}
          />
        );
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
      case "word_search":
        return (
          <WordSearchGame
            game={currentGame}
            selectedItems={selectedItems}
            matchedItems={matchedItems}
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
              Unknown game type: {currentGame.type}
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
            correctAnswer={currentGame.correctAnswer}
            levelColor={levelColor}
          />
        )}
      </Animated.View>
    </ScrollView>
  );
};

export default WordGamesCard;