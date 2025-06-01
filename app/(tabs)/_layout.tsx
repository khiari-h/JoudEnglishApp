import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#E5E5EA",
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
      }}
    >
      {/* Onglet Accueil - Dashboard */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* Onglet Exercices - Sélection niveau */}
      <Tabs.Screen
        name="levelSelection"
        options={{
          title: "Exercices",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* Onglet Conversation - Chatbot */}
      <Tabs.Screen
        name="chatbotExercise"
        options={{
          title: "Conversation",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "chatbubble" : "chatbubble-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* Masquer tous les autres écrans */}
      <Tabs.Screen name="exerciseSelection" options={{ href: null }} />
      <Tabs.Screen name="levelAssessment" options={{ href: null }} />
      <Tabs.Screen name="vocabularyExercise" options={{ href: null }} />
      <Tabs.Screen name="grammarExercise" options={{ href: null }} />
      <Tabs.Screen name="readingExercise" options={{ href: null }} />
      <Tabs.Screen name="phrasesExercise" options={{ href: null }} />
      <Tabs.Screen name="conversationsExercise" options={{ href: null }} />
      <Tabs.Screen name="spellingExercise" options={{ href: null }} />
      <Tabs.Screen name="errorCorrectionExercise" options={{ href: null }} />
      <Tabs.Screen name="wordGamesExercise" options={{ href: null }} />
    </Tabs>
  );
}
