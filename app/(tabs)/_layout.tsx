import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons"; 

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
        },
      }}
    >
      {/* Onglet Dashboard */}
      <Tabs.Screen
        name="dashboard" // Correspond au fichier src/screens/dashboard.js
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      {/* Onglet Home */}
      <Tabs.Screen
        name="index" // Correspond au fichier src/screens/index.js
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
