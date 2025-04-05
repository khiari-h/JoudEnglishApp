// src/screens/Dashboard/components/DashboardHeader/index.js
import React, { useContext, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import Header from "../../../../components/layout/Header";
import styles from "./style";

/**
 * Logo animé pour le header du Dashboard
 */
const JoudLogo = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulseAnimation = Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(pulseAnimation, { iterations: 3 }).start();

    return () => {
      scaleAnim.stopAnimation();
    };
  }, []);

  return (
    <View style={styles.logoContainer}>
      <Animated.View
        style={[styles.logoBackground, { transform: [{ scale: scaleAnim }] }]}
      >
        <Text style={styles.logoText}>JOUD</Text>
      </Animated.View>
      <Text style={styles.logoTagline}>English Made Easy</Text>
    </View>
  );
};

/**
 * Composant pour afficher les statistiques rapides
 */
const QuickStats = ({ streak = 0 }) => {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>4</Text>
        <Text style={styles.statLabel}>Completed</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={styles.statValue}>2</Text>
        <Text style={styles.statLabel}>In Progress</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{streak}</Text>
        <Text style={styles.statLabel}>Day Streak</Text>
      </View>
    </View>
  );
};

/**
 * Header du Dashboard utilisant le composant Header amélioré
 */
const DashboardHeader = ({ name = "User", streak = 0 }) => {
  const theme = useContext(ThemeContext) || { colors: { primary: "#4a90e2" } };
  const { colors } = theme;
  const notificationCount = 2; // Exemple de notification

  // Composant de droite avec logo et notifications
  const headerRight = (
    <View style={styles.rightContainer}>
      {/* Icône de notification avec badge */}
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="notifications" size={24} color="white" />
        {notificationCount > 0 && (
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>{notificationCount}</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Icône de paramètres */}
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="settings-outline" size={22} color="white" />
      </TouchableOpacity>
    </View>
  );

  // Composant de gauche avec logo
  const headerLeft = <JoudLogo />;

  // Contenu additionnel pour le bas du header
  const streakComponent = (
    <View style={styles.streakContainer}>
      <Ionicons name="flame" size={24} color="#FFB830" />
      <Text style={styles.streakText}>{streak} day streak!</Text>
    </View>
  );

  // Composant pour le bas du header avec les stats
  const bottomComponent = (
    <View style={styles.bottomContainer}>
      {streakComponent}
      <QuickStats streak={streak} />
    </View>
  );

  return (
    <Header
      title={`Welcome back, ${name}!`}
      showBackButton={false}
      backgroundColor={colors.primary}
      textColor="white"
      statusBarColor={colors.primary}
      statusBarStyle="light-content"
      largeTitleMode={true}
      withShadow={false}
      leftComponent={headerLeft}
      rightComponent={headerRight}
      bottomComponent={bottomComponent}
    />
  );
};

export default DashboardHeader;
