import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Importation des routes
import { ROUTES } from "./routes";

// Écrans
import Dashboard from "../screens/Dashboard";
import LevelSelection from "../screens/LevelSelection";
import ExerciseSelection from "../screens/ExerciseSelection";

// Écrans d'exercices
import VocabularyExercise from "../screens/exercises/VocabularyExercise";
import GrammarExercise from "../screens/exercises/GrammarExercise";
import ChatbotExercise from "../screens/exercises/ChatbotExercise";

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
          component={ChatbotExercise}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;