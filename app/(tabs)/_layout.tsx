import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Utilisation d'icônes simples d'Expo

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000', // Utilisation d'une couleur de base
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff', // Exemple de couleur pour la barre de tab
          borderTopWidth: 0,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} /> // Icône d'Expo simple
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} /> // Icône d'Expo simple
          ),
        }}
      />
    </Tabs>
  );
}
