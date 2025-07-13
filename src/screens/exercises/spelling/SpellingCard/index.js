// SpellingCard/index.js - VERSION PROPRE










import styles from "./style";

const SpellingCard = ({
  exercise,
  userInput,
  showHint,
  showFeedback,
  isCorrect,
  isCompleted,
  onChangeText,
  onToggleHint,
  levelColor,
}) => {
  
  if (!exercise) {
    return (
      <View style={styles.card}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Exercice non trouvé</Text>
        </View>
      </View>
    );
  }

  const renderExerciseContent = () => {
    switch (exercise.type) {
      case "correction":
        return (
          <HeroCard 
            content={exercise.wordToCorrect}
            fontSize={32}
            levelColor={levelColor}
            showUnderline={true}
          />
        );
        
      case "spelling_rule":
        return (
          <HeroCard 
            content={exercise.rule}
            fontSize={18}
            levelColor={levelColor}
            showUnderline={false}
          />
        );
        
      case "homophones":
        return (
          <View style={styles.homophoneHeader}>
            <Text style={styles.instruction}>{exercise.instruction}</Text>
          </View>
        );
        
      default:
        return (
          <View style={styles.fallbackContainer}>
            <Text style={styles.instruction}>
              {exercise.instruction || "Instructions non disponibles"}
            </Text>
          </View>
        );
    }
  };

  const renderInputArea = () => {
    if (exercise.type === "homophones") {
      return (
        <HomophoneChoices
          sentence={exercise.sentence}
          choices={exercise.choices || []}
          selectedChoice={userInput}
          onSelectChoice={onChangeText}
          disabled={showFeedback}
          levelColor={levelColor}
        />
      );
    } else {
      return (
        <SpellingInput
          value={userInput}
          onChangeText={onChangeText}
          disabled={showFeedback}
          levelColor={levelColor}
        />
      );
    }
  };

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={[
        styles.card,
        isCompleted && styles.completedCard
      ]}>
        
        {isCompleted && (
          <View style={styles.completedBadge}>
            <Text style={styles.completedText}>✓ Complété</Text>
          </View>
        )}

        <View style={styles.exerciseContent}>
          {renderExerciseContent()}
        </View>

        <View style={styles.inputSection}>
          {renderInputArea()}
        </View>

        {exercise.hint && (
          <View style={styles.hintSection}>
            <RevealButton
              isRevealed={showHint}
              revealedContent={exercise.hint}
              revealText="Afficher l'indice"
              hideText="Masquer l'indice"
              onToggle={onToggleHint}
              levelColor={levelColor}
            />
          </View>
        )}

        {showFeedback && (
          <View style={styles.feedbackSection}>
            <SpellingFeedback
              isCorrect={isCorrect}
              correctAnswer={exercise.correctAnswer}
              explanation={exercise.explanation}
              levelColor={levelColor}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default SpellingCard;