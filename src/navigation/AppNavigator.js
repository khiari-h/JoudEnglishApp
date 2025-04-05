import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importation des routes
import ROUTES from './routes';

// Écrans
import Dashboard from '../screens/Dashboard';

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
        {/* D'autres écrans seront ajoutés progressivement */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;