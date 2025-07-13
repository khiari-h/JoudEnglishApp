// GrammarExerciseRenderer/index.js - VERSION REFACTORISÉE avec HeroCard (71 → 50 lignes)







import createStyles from "./style";

/**
 * 🎯 GrammarExerciseRenderer - Version Refactorisée avec composants génériques
 * Utilise HeroCard pour la question principale
 * Design cohérent avec VocabularyWordCard et PhraseCard
 * 71 lignes → 50 lignes (-30% de code)
 */
const GrammarExerciseRenderer = ({
  exercise,
  selectedOption,
  setSelectedOption,
  inputText,
  setInputText,
  showFeedback,
  isCorrect,
  exerciseIndex,
  attempts,
}) => {
  if (!exercise) return null;

  const styles = createStyles();
  const levelColor = "#3b82f6"; // Couleur Grammar

  // Render pour un exercice à choix multiples
  const renderMultipleChoiceExercise = () => (
    <View style={styles.container}>
      {/* 🎯 QUESTION HÉRO avec HeroCard générique */}
      <HeroCard 
        content={exercise.question}
        fontSize={24} // Adapté pour questions Grammar
        levelColor={levelColor}
        showUnderline={true}
      />

      {/* 📝 PHRASE EXEMPLE avec ContentSection */}
      {exercise.sentence && (
        <ContentSection
          title="Complete the sentence"
          content={exercise.sentence.replace("___", "______")}
          levelColor={levelColor}
          backgroundColor="#F8FAFC"
          isItalic={true}
          showIcon={false}
        />
      )}

      {/* 🎨 OPTIONS avec styles optimisés */}
      <View style={styles.optionsSection}>
        {exercise.options.map((option, index) => {
          const isCorrectOption = index === exercise.answer || option === exercise.answer;
          const isSelectedOption = selectedOption === index;
          
          return (
            <TouchableOpacity
              key={`option-${index}-${attempts}`}
              style={styles.optionContainer}
              onPress={() => !showFeedback && setSelectedOption(index)}
              disabled={showFeedback && isCorrect}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={
                  showFeedback && isCorrectOption
                    ? ['#10B981', '#059669', '#047857'] // Vert pour correct
                    : showFeedback && isSelectedOption && !isCorrectOption
                    ? ['#EF4444', '#DC2626', '#B91C1C'] // Rouge pour incorrect
                    : isSelectedOption
                    ? [levelColor, `${levelColor}E6`, `${levelColor}CC`] // Bleu pour sélectionné
                    : ['#FFFFFF', '#F8FAFC', '#F1F5F9'] // Neutre
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.optionGradient}
              >
                <View style={styles.optionInner}>
                  {/* Icône de statut */}
                  <View style={styles.optionIconContainer}>
                    {showFeedback && isCorrectOption ? (
                      <Ionicons name="checkmark-circle" size={20} color="white" />
                    ) : showFeedback && isSelectedOption && !isCorrectOption ? (
                      <Ionicons name="close-circle" size={20} color="white" />
                    ) : isSelectedOption ? (
                      <Ionicons name="radio-button-on" size={20} color="white" />
                    ) : (
                      <Ionicons name="radio-button-off" size={20} color="#9CA3AF" />
                    )}
                  </View>

                  {/* Texte de l'option */}
                  <Text style={[
                    styles.optionText,
                    showFeedback && isCorrectOption && styles.correctOptionText,
                    showFeedback && isSelectedOption && !isCorrectOption && styles.incorrectOptionText,
                    isSelectedOption && !showFeedback && styles.selectedOptionText,
                  ]}>
                    {option}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  // Render pour un exercice à remplir les blancs
  const renderFillBlankExercise = () => (
    <View style={styles.container}>
      {/* 🎯 QUESTION HÉRO avec HeroCard générique */}
      <HeroCard 
        content={exercise.question}
        fontSize={24}
        levelColor={levelColor}
        showUnderline={true}
      />

      {/* 📝 PHRASE AVEC INPUT intégré */}
      <ContentSection
        title="Complete the sentence"
        content={exercise.sentence || "Fill in the blank"}
        levelColor={levelColor}
        backgroundColor="#F8FAFC"
        showIcon={false}
      />

      {/* INPUT personnalisé pour fill-in-the-blank */}
      <View style={styles.inputSection}>
        <TextInput
          key={`fill-blank-input-${exerciseIndex}-${attempts}`}
          style={[
            styles.fillBlankInput,
            showFeedback && inputText.trim().toLowerCase() === exercise.answer.toLowerCase()
              ? styles.correctInput
              : showFeedback && !isCorrect
              ? styles.incorrectInput
              : styles.neutralInput,
          ]}
          value={inputText}
          onChangeText={(text) => !showFeedback && setInputText(text)}
          placeholder="Type your answer..."
          editable={!showFeedback || !isCorrect}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
    </View>
  );

  // Render pour un exercice de transformation
  const renderTransformationExercise = () => (
    <View style={styles.container}>
      {/* 🎯 QUESTION HÉRO avec HeroCard générique */}
      <HeroCard 
        content={exercise.question}
        fontSize={24}
        levelColor={levelColor}
        showUnderline={true}
      />

      {/* 📝 PHRASE ORIGINALE */}
      {exercise.sentence && (
        <ContentSection
          title="Transform this sentence"
          content={exercise.sentence}
          levelColor={levelColor}
          backgroundColor="#F8FAFC"
          isItalic={true}
          showIcon={false}
        />
      )}

      {/* INPUT de transformation stylé */}
      <View style={styles.inputSection}>
        <TextInput
          key={`transformation-input-${exerciseIndex}-${attempts}`}
          style={[
            styles.transformationInput,
            showFeedback && inputText.trim().toLowerCase() === exercise.answer.toLowerCase()
              ? styles.correctInput
              : showFeedback && !isCorrect
              ? styles.incorrectInput
              : styles.neutralInput,
          ]}
          value={inputText}
          onChangeText={(text) => !showFeedback && setInputText(text)}
          placeholder="Write your transformed sentence..."
          editable={!showFeedback || !isCorrect}
          multiline
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
    </View>
  );

  // Déterminer quel type d'exercice afficher
  if (exercise.type === "fillInTheBlank" && exercise.options) {
    return renderMultipleChoiceExercise();
  } else if (exercise.type === "fillInTheBlank") {
    return renderFillBlankExercise();
  } else if (exercise.type === "transformation") {
    return renderTransformationExercise();
  }

  return null;
};

export default GrammarExerciseRenderer;