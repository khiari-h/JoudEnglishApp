import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardTab() {
  return (
    <Tabs.Screen 
      name="dashboard"
      options={{
        title: 'Dashboard',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons 
            name="home-outline" 
            color={color} 
            size={size} 
          />
        ),
      }}
    />
  );
}