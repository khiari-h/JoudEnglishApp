// src/screens/VocabularyRevision/components/QuizContent.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationButtons from '../../../components/exercise-common/NavigationButtons';import PropTypes from 'prop-types';
 // ✅ Import du composant NavigationButtons

const QuizContent = ({
  currentQuestion,
  selectedAnswer,
  showResult,
  handleAnswer,
  handleContinue,
  colors,
  localStyles,
}) => {
  if (!currentQuestion) {
    return null;
  }

  // Détermine si la réponse de l'utilisateur est correcte
  const isAnswerCorrect = showResult && selectedAnswer === currentQuestion.correctAnswer;

  // Configuration du feedback
  const feedbackColor = isAnswerCorrect ? '#10B981' : '#EF4444'; // Vert pour correct, Rouge pour incorrect

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <View>
        {/* Question Card */}
        <View style={localStyles.questionSection}>
          <View style={[localStyles.questionCard, { borderColor: colors.primary }]}>
            <View style={localStyles.questionLabelContainer}>
              <Text style={[localStyles.questionLabel, { color: colors.textSecondary }]}>Traduisez ce mot :</Text>
            </View>
            <Text style={[localStyles.wordToTranslate, { color: colors.text }]}>{currentQuestion.word}</Text>
          </View>
        </View>

        {/* Choices */}
        <View style={localStyles.choicesSection}>
          {currentQuestion.choices.map((choice, index) => {
            const isSelected = selectedAnswer === choice;
            const isCorrectAnswer = choice === currentQuestion.correctAnswer;

            let buttonStyle = [localStyles.choiceButton];
            let textStyle = [localStyles.choiceText, { color: colors.text }];
            let icon = null;

            if (showResult) {
              if (isCorrectAnswer) {
                // Surligne la bonne réponse en vert
                buttonStyle.push(localStyles.choiceCorrect);
                textStyle.push(localStyles.choiceTextCorrect);
                icon = <Icon name="check-circle" style={[localStyles.choiceIcon, { color: '#10B981' }]} />;
              } else if (isSelected && !isCorrectAnswer) {
                // Surligne la mauvaise réponse de l'utilisateur en rouge
                buttonStyle.push(localStyles.choiceWrong);
                textStyle.push(localStyles.choiceTextWrong);
                icon = <Icon name="close-circle" style={[localStyles.choiceIcon, { color: '#EF4444' }]} />;
              }
            }

            return (
              <TouchableOpacity
                key={`choice-${choice}-${index}`}
                style={buttonStyle}
                onPress={() => handleAnswer(choice)}
                disabled={showResult}
              >
                <View style={localStyles.choiceButtonInner}>
                  <View style={localStyles.choiceNumberContainer}>
                    <Text style={localStyles.choiceNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={textStyle}>{choice}</Text>
                  {icon}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Continue Button : Apparaît seulement après une réponse */}
      {showResult && (
        <View style={[localStyles.feedbackContainer, { backgroundColor: colors.background }]}>
          {/* Message de feedback */}
          <View style={localStyles.feedbackMessageRow}>
            <Icon
              name={isAnswerCorrect ? 'check-circle' : 'information'}
              style={[localStyles.feedbackIcon, { color: feedbackColor }]}
            />
            <Text style={[localStyles.feedbackText, { color: feedbackColor }]}>
              {isAnswerCorrect
                ? 'Bonne réponse !'
                : `La bonne réponse était : ${currentQuestion.correctAnswer}`
              }
            </Text>
          </View>

          {/* ✅ NavigationButtons centré pour une meilleure UX */}
          <View style={{ alignItems: 'center', marginTop: 16 }}>
            <NavigationButtons
              onNext={handleContinue}
              disablePrevious={true} // Pas de bouton précédent dans le quiz
              disableNext={false}
              primaryColor={isAnswerCorrect ? "#10B981" : "#5E60CE"} // Vert si correct, violet sinon
              buttonLabels={{
                next: "Continuer",
                finish: "Continuer"
              }}
              isLast={false} // Toujours "Continuer", jamais "Terminer"
            />
          </View>
        </View>
      )}
    </View>
  );
};


QuizContent.propTypes = {
  currentQuestion: PropTypes.func.isRequired,
  selectedAnswer: PropTypes.any.isRequired,
  showResult: PropTypes.bool.isRequired,
  handleAnswer: PropTypes.func.isRequired,
  handleContinue: PropTypes.func.isRequired,
  colors: PropTypes.any.isRequired,
  localStyles: PropTypes.any.isRequired,
};

export default QuizContent;