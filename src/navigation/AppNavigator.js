import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Importation des routes
import { ROUTES } from "./routes";

// Écrans principaux
import Dashboard from "../screens/Dashboard";
import LevelSelection from "../screens/LevelSelection";
import ExerciseSelection from "../screens/ExerciseSelection";

// Écrans d'exercices
import VocabularyExercise from "../screens/exercises/VocabularyExercise";
import GrammarExercise from "../screens/exercises/GrammarExercise";
import ChatbotExerciseScreen from "../screens/exercises/ChatbotExerciseScreen";
import PhrasesExercise from "../screens/exercises/PhrasesExercise";
import ReadingExerciseScreen from "../screens/exercises/ReadingExerciseScreen";
import ErrorCorrectionExercise from "../screens/exercises/ErrorCorrectionExercise";
import WordGamesExerciseScreen from "../screens/exercises/WordGamesExerciseScreen";
import SpellingExerciseScreen from "../screens/exercises/SpellingExerciseScreen";
import LevelAssessmentScreen from "../screens/exercises/LevelAssessmentScreen";

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

        {/* Routes des exercices */}
        <Stack.Screen
          name={ROUTES.VOCABULARY_EXERCISE}
          component={VocabularyExercise}
        />
        <Stack.Screen
          name={ROUTES.GRAMMAR_EXERCISE}
          component={GrammarExercise}
        />
        <Stack.Screen
          name={ROUTES.CHATBOT_EXERCISE}
          component={ChatbotExerciseScreen}
        />
        <Stack.Screen
          name={ROUTES.PHRASES_EXERCISE}
          component={PhrasesExercise}
        />
        <Stack.Screen
          name={ROUTES.READING_EXERCISE}
          component={ReadingExerciseScreen}
        />
        <Stack.Screen
          name={ROUTES.ERROR_CORRECTION_EXERCISE}
          component={ErrorCorrectionExercise}
        />
        <Stack.Screen
          name={ROUTES.WORD_GAMES_EXERCISE}
          component={WordGamesExerciseScreen}
        />
        <Stack.Screen
          name={ROUTES.SPELLING_EXERCISE}
          component={SpellingExerciseScreen}
        />
        <Stack.Screen
          name={ROUTES.ASSESSMENT_EXERCISE}
          component={LevelAssessmentScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;