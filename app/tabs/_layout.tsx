import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true, // Garde les labels visibles
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
          overflow: "hidden", // évite les flèches ou débordements
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginTop: 0, // Important pour éviter les flèches
        },
        tabBarIconStyle: {
          marginBottom: 0, // Alignement propre
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
          title: "Exercices",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "book" : "book-outline"} color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="conversationsExercise"
        options={{
          title: "Conversation",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "chatbubble" : "chatbubble-outline"} color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "settings" : "settings-outline"} color={color} size={size} />
          ),
        }}
      />

      {/* Écrans masqués */}
      <Tabs.Screen name="vocabularyRevision" options={{ href: null }} />
      <Tabs.Screen name="exerciseSelection" options={{ href: null }} />
      <Tabs.Screen name="levelAssessment" options={{ href: null }} />
      <Tabs.Screen name="vocabularyExercise" options={{ href: null }} />
      <Tabs.Screen name="grammarExercise" options={{ href: null }} />
      <Tabs.Screen name="readingExercise" options={{ href: null }} />
      <Tabs.Screen name="phrasesExercise" options={{ href: null }} />
      <Tabs.Screen name="spellingExercise" options={{ href: null }} />
      <Tabs.Screen name="errorCorrectionExercise" options={{ href: null }} />
      <Tabs.Screen name="wordGamesExercise" options={{ href: null }} />
    </Tabs>
  );
}
