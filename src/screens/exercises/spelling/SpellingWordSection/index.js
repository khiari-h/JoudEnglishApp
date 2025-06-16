// SpellingWordSection/index.js - VERSION SIMPLE ET PROPRE

import React, { memo } from "react";
import { View, Text, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import HeroCard from "../../../../components/ui/HeroCard";
import createStyles from "./style";

/**
 * ⚡ SpellingWordSection - Version Simple
 * Fini les complications, ça marche direct !
 */
const SpellingWordSection = memo(({
  currentExercise,
  exerciseCounter,
  level,
  levelColor,
  userInput,
  showHint,
  showFeedback,
  isCorrect,
  isCompleted,
  onChangeText,
  onToggleHint,
}) => {
  const styles = createStyles(levelColor);

  if (!currentExercise) return null;

  return (
    <View style={styles.container}>
      {/* COMPTEUR */}
      <View style={styles.counterSection}>
        <LinearGradient
          colors={[`${levelColor}08`, `${levelColor}04`, 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.counterGradient}
        >
          {isCompleted && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedText}>✓ Complété</Text>
            </View>
          )}

          <View style={[styles.counterBadge, { borderColor: `${levelColor}20` }]}>
            <Text style={[styles.counterText, { color: levelColor }]}>
              {exerciseCounter}
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/* CONTENU */}
      <View style={styles.content}>
        
        {/* INSTRUCTION */}
        {currentExercise.instruction && (
          <Text style={styles.instruction}>
            {currentExercise.instruction}
          </Text>
        )}

        {/* MOT À CORRIGER */}
        {currentExercise.wordToCorrect && (
          <HeroCard 
            content={currentExercise.wordToCorrect}
            fontSize={32}
            levelColor={levelColor}
            showUnderline={true}
          />
        )}

        {/* RÈGLE D'ORTHOGRAPHE */}
        {currentExercise.rule && (
          <View style={styles.ruleContainer}>
            <Text style={styles.ruleTitle}>📝 Règle :</Text>
            <Text style={styles.ruleText}>{currentExercise.rule}</Text>
          </View>
        )}

        {/* PHRASE AVEC BLANC (pour homophones) */}
        {currentExercise.sentence && (
          <View style={styles.sentenceContainer}>
            <Text style={styles.sentenceText}>{currentExercise.sentence}</Text>
          </View>
        )}

        {/* CHOIX MULTIPLES (homophones) */}
        {currentExercise.choices && currentExercise.choices.length > 0 ? (
          <View style={styles.choicesContainer}>
            <Text style={styles.choicesLabel}>Choisissez le mot correct :</Text>
            {currentExercise.choices.map((choice, index) => {
              const isSelected = userInput === choice;
              
              return (
                <View
                  key={index}
                  style={[
                    styles.choiceButton,
                    isSelected && styles.choiceSelected,
                    { borderColor: isSelected ? levelColor : '#e2e8f0' }
                  ]}
                  onPress={() => !showFeedback && onChangeText(choice)}
                >
                  <Text style={[
                    styles.choiceText,
                    isSelected && { color: levelColor, fontWeight: '700' }
                  ]}>
                    {String.fromCharCode(65 + index)}. {choice}
                  </Text>
                </View>
              );
            })}
          </View>
        ) : (
          /* INPUT TEXTE (pour correction et règles) */
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Votre réponse :</Text>
            <TextInput
              style={[
                styles.textInput,
                { borderColor: levelColor },
                showFeedback && styles.disabledInput
              ]}
              value={userInput}
              onChangeText={onChangeText}
              placeholder="Tapez votre réponse ici..."
              placeholderTextColor="#94a3b8"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!showFeedback}
            />
          </View>
        )}

        {/* INDICE */}
        {currentExercise.hint && (
          <View style={styles.hintContainer}>
            <View
              style={[styles.hintButton, { borderColor: levelColor }]}
              onPress={onToggleHint}
            >
              <Text style={[styles.hintButtonText, { color: levelColor }]}>
                💡 {showHint ? 'Masquer' : 'Voir'} l'indice
              </Text>
            </View>
            
            {showHint && (
              <View style={[styles.hintContent, { backgroundColor: `${levelColor}10` }]}>
                <Text style={styles.hintText}>{currentExercise.hint}</Text>
              </View>
            )}
          </View>
        )}

        {/* FEEDBACK */}
        {showFeedback && (
          <View style={[
            styles.feedbackContainer,
            { backgroundColor: isCorrect ? '#dcfce7' : '#fef2f2' }
          ]}>
            <Text style={[
              styles.feedbackTitle,
              { color: isCorrect ? '#16a34a' : '#dc2626' }
            ]}>
              {isCorrect ? '✅ Correct !' : '❌ Incorrect'}
            </Text>
            
            {!isCorrect && (
              <Text style={styles.correctAnswer}>
                Bonne réponse : <Text style={{ fontWeight: '700' }}>
                  {currentExercise.correctAnswer}
                </Text>
              </Text>
            )}
            
            {currentExercise.explanation && (
              <Text style={styles.explanation}>
                {currentExercise.explanation}
              </Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
});

SpellingWordSection.displayName = "SpellingWordSection";

export default SpellingWordSection;