import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Importation des routes
import { ROUTES } from "./routes";

// Écrans principaux
import Dashboard from "../screens/Dashboard";
import LevelSelection from "../screens/LevelSelection";
import ExerciseSelection from "../screens/ExerciseSelection";

// Écrans d'exercices - Imports corrigés pour correspondre aux noms des composants réels
import VocabularyExercise from "../screens/exercises/vocabulary";
import GrammarExercise from "../screens/exercises/grammar";
import ConversationsExercise from "../screens/exercises/conversations"; // Renommé de ChatbotExercise
import PhrasesExercise from "../screens/exercises/phrases";
import ReadingExercise from "../screens/exercises/reading";
import ErrorCorrectionExercise from "../screens/exercises/errorCorrection";
import WordGamesExercise from "../screens/exercises/word-games";
import SpellingExercise from "../screens/exercises/spelling";
import LevelAssessment from "../screens/exercises/level-assessment";

// Configuration du navigateur
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ROUTES.DASHBOARD}
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Écrans principaux */}
        <Stack.Screen name={ROUTES.DASHBOARD} component={Dashboard} />
        <Stack.Screen
          name={ROUTES.LEVEL_SELECTION}
          component={LevelSelection}
        />
        <Stack.Screen
          name={ROUTES.EXERCISE_SELECTION}
          component={ExerciseSelection}
        />

        {/* Routes des exercices - Composants corrigés */}
        <Stack.Screen
          name={ROUTES.VOCABULARY_EXERCISE}
          component={VocabularyExercise}
        />
        <Stack.Screen
          name={ROUTES.GRAMMAR_EXERCISE}
          component={GrammarExercise}
        />
        <Stack.Screen
          name={ROUTES.CONVERSATIONS_EXERCISE}
          component={ConversationsExercise} // Renommé de ChatbotExercise
        />
        <Stack.Screen
          name={ROUTES.PHRASES_EXERCISE}
          component={PhrasesExercise}
        />
        <Stack.Screen
          name={ROUTES.READING_EXERCISE}
          component={ReadingExercise}
        />
        <Stack.Screen
          name={ROUTES.ERROR_CORRECTION_EXERCISE}
          component={ErrorCorrectionExercise}
        />
        <Stack.Screen
          name={ROUTES.WORD_GAMES_EXERCISE}
          component={WordGamesExercise}
        />
        <Stack.Screen
          name={ROUTES.SPELLING_EXERCISE}
          component={SpellingExercise}
        />
        <Stack.Screen
          name={ROUTES.ASSESSMENT_EXERCISE}
          component={LevelAssessment}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

