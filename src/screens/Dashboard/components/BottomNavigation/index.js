import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import styles from "./style";

/**
 * Navigation en bas - Système 1-6+Bonus
 */
const BottomNavigation = ({
  activeTab = "home",
  onTabChange,
  accentColor = "#3B82F6",
  currentLevel = "1",
}) => {
  const router = useRouter();

  const tabs = [
    {
      id: "home",
      icon: "home-outline",
      activeIcon: "home",
      label: "Accueil",
      route: "/(tabs)/",
    },
    {
      id: "exercises",
      icon: "book-outline",
      activeIcon: "book",
      label: "Exercices",
      route: "/(tabs)/levelSelection",
    },
    {
      id: "chat",
      icon: "chatbubble-outline",
      activeIcon: "chatbubble",
      label: "Conversation",
      route: "/(tabs)/chatbotExercise",
    },
    {
      id: "profile",
      icon: "person-outline",
      activeIcon: "person",
      label: "Profil",
      route: "/(tabs)/profile",
    },
  ];

  const handleTabPress = (tab) => {
    if (onTabChange) {
      onTabChange(tab.id);
    }

    if (tab.id === "chat") {
      router.push({
        pathname: "/(tabs)/chatbotExercise",
        params: { level: currentLevel },
      });
    } else {
      router.push(tab.route);
    }
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        const iconName = isActive ? tab.activeIcon : tab.icon;

        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabButton}
            onPress={() => handleTabPress(tab)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={iconName}
              size={24}
              color={isActive ? accentColor : "#6B7280"}
            />
            <Text
              style={[
                styles.tabLabel,
                { color: isActive ? accentColor : "#6B7280" },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigation;

