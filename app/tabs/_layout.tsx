import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const hiddenScreens = [
  "vocabularyRevision",
  "levelAssessment",
  "vocabularyExercise",
  "grammarExercise",
  "readingExercise",
  "phrasesExercise",
  "spellingExercise",
  "errorCorrectionExercise",
  "wordGamesExercise",
  "conversationsExercise", 
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#E5E5EA",
          paddingBottom: 6,
          paddingTop: 6,
          height: 60,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 5,
          overflow: "hidden",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginTop: 0,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
      }}
    >
      {/* Onglets visibles */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="levelSelection"
        options={{
          title: "Niveaux",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "layers" : "layers-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="exerciseSelection"
        options={{
          title: "Exercices",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "list" : "list-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Réglages",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "settings" : "settings-outline"} color={color} size={size} />
          ),
        }}
      />

      {/* Écrans masqués */}
      {hiddenScreens.map((screenName) => (
        <Tabs.Screen key={screenName} name={screenName} options={{ href: null }} />
      ))}
    </Tabs>
  );
}
