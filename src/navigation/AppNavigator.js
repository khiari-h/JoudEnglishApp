import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importation des routes
import ROUTES from './routes';

// Écrans
import Dashboard from '../screens/Dashboard';
import LevelSelection from '../screens/LevelSelection';
import ExerciseSelection from '../screens/ExerciseSelection';

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
        <Stack.Screen 
          name={ROUTES.DASHBOARD} 
          component={Dashboard} 
        />
        <Stack.Screen 
          name={ROUTES.LEVEL_SELECTION} 
          component={LevelSelection} 
        />
        <Stack.Screen 
          name={ROUTES.EXERCISE_SELECTION} 
          component={ExerciseSelection} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;