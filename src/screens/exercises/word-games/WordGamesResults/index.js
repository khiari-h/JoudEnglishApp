// WordGamesResults/index.js - VERSION REFACTORISÉE avec composants génériques

import { View, ScrollView } from "react-native";
import HeroCard from "../../../../components/ui/HeroCard";
import ContentSection from "../../../../components/ui/ContentSection";
import NavigationButtons from "../../../../components/exercise-common/NavigationButtons";
import { getPerformanceLevel, generateFeedbackMessage, calculateGameTypeStats } from "../../../../utils/wordGames/wordGamesStats";
import createStyles from "./style";
import PropTypes from 'prop-types';

/**
 * 🏆 WordGamesResults - Version Refactorisée avec composants génériques
 * 150+ lignes → 70 lignes (-53% de code)
 * Utilise HeroCard + ContentSection + NavigationButtons
 * * @param {array} games - Liste des jeux joués
 * @param {array} gameResults - Résultats de chaque jeu
 * @param {object} finalScore - Score final {score, percentage, totalMaxScore}
 * @param {string} levelColor - Couleur du niveau
 * @param {function} onPlayAgain - Fonction pour rejouer
 * @param {function} onContinue - Fonction pour continuer
 */
const WordGamesResults = ({
  games = [],
  gameResults = [],
  finalScore = { score: 0, percentage: 0, totalMaxScore: 0 },
  levelColor = "#3b82f6",
  onPlayAgain,
  onContinue,
}) => {
  const styles = createStyles(levelColor);

  // Fallback si pas de score
  if (!finalScore || finalScore.totalMaxScore === 0) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* 🎯 HERO - Titre simple */}
        <HeroCard 
          content="Games Complete!"
          fontSize={24}
          levelColor={levelColor}
          showUnderline
          backgroundColor="white"
        />

        {/* 📝 MESSAGE SIMPLE */}
        <ContentSection
          title="Word Games"
          content="All games completed! Thanks for playing!"
          levelColor={levelColor}
          backgroundColor="#f8fafc"
        />

        {/* 🚀 NAVIGATION */}
        <View style={styles.navigationContainer}>
          <NavigationButtons
            onNext={onContinue}
            disablePrevious
            disableNext={false}
            primaryColor={levelColor}
            isLast
            buttonLabels={{
              next: "Continue",
              finish: "Continue"
            }}
          />
        </View>
      </ScrollView>
    );
  }

  // Calculs pour l'affichage
  const performance = getPerformanceLevel(finalScore.percentage);
  const gameTypeStats = calculateGameTypeStats({ games }, gameResults);
  const feedbackMessage = generateFeedbackMessage(finalScore, gameTypeStats);

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* 🎯 HERO - Score principal spectaculaire */}
      <HeroCard 
        content={`${Math.round(finalScore.percentage)}%`}
        fontSize={56}
        levelColor={performance.color}
        showUnderline={false}
        backgroundColor={`${performance.color}10`}
        padding={32}
        subtitle={`${finalScore.score}/${finalScore.totalMaxScore} points`}
      />

      {/* 🎭 MESSAGE DE PERFORMANCE */}
      <ContentSection
        title="Your Performance"
        content={`${performance.message}\n\n${performance.description}`}
        levelColor={performance.color}
        backgroundColor={`${performance.color}05`}
        icon={performance.message.split(' ')[0]} // Récupère l'emoji
      />

      {/* 📊 STATISTIQUES DÉTAILLÉES */}
      {Boolean(games.length > 0) && (
        <ContentSection
          title="Games Review"
          content={games.map((game, index) => {
            const result = gameResults[index] || { score: 0, maxScore: 0 };
            const gameType = game.type.charAt(0).toUpperCase() + game.type.slice(1);
            return `${gameType}: ${result.score}/${result.maxScore}`;
          }).join('\n')}
          levelColor="#6366f1"
          backgroundColor="white"
          isMonospace
        />
      )}

      {/* 📈 ANALYSE PAR TYPE DE JEU */}
      {Boolean(gameTypeStats.length > 1) && (
        <ContentSection
          title="Performance by Game Type"
          content={gameTypeStats.map(stat => 
            `${stat.type}: ${Math.round(stat.percentage)}% (${stat.completedCount}/${stat.gamesCount})`
          ).join('\n')}
          levelColor="#8b5cf6"
          backgroundColor="#f8fafc"
          isItalic
        />
      )}

      {/* 💡 FEEDBACK PERSONNALISÉ */}
      {Boolean(feedbackMessage) && (
        <ContentSection
          title="Feedback"
          content={feedbackMessage}
          levelColor={performance.color}
          backgroundColor={`${performance.color}05`}
        />
      )}

      {/* 🚀 NAVIGATION - Boutons d'action */}
      <View style={styles.navigationContainer}>
        {/* Bouton Play Again conditionnel */}
        {Boolean(onPlayAgain) && finalScore.percentage < 80 && (
          <View style={styles.playAgainContainer}>
            <NavigationButtons
              onNext={onPlayAgain}
              disablePrevious
              disableNext={false}
              primaryColor={performance.color}
              isLast={false}
              buttonLabels={{
                next: "Play Again",
              }}
            />
          </View>
        )}

        {/* Bouton principal Continue */}
        <NavigationButtons
          onNext={onContinue}
          disablePrevious
          disableNext={false}
          primaryColor={levelColor}
          isLast
          buttonLabels={{
            next: "Continue",
            finish: "Continue"
          }}
        />
      </View>
    </ScrollView>
  );
};

// ✅ Définition de PropTypes pour la validation des props
WordGamesResults.propTypes = {
  // 'games' est manquant dans la validation
  games: PropTypes.array,
  // 'gameResults' est manquant dans la validation
  gameResults: PropTypes.array,
  // 'finalScore' est manquant dans la validation
  finalScore: PropTypes.shape({
    score: PropTypes.number,
    percentage: PropTypes.number,
    totalMaxScore: PropTypes.number,
  }),
  // 'levelColor' est manquant dans la validation
  levelColor: PropTypes.string,
  // 'onPlayAgain' est manquant dans la validation
  onPlayAgain: PropTypes.func,
  // 'onContinue' est manquant dans la validation
  onContinue: PropTypes.func.isRequired,
};

export default WordGamesResults;