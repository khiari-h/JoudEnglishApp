// src/screens/Dashboard/components/HeroContinueSection/index.js
import { useContext, useCallback } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Card from "../../../../components/ui/Card";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import styles from "./style";

const HeroCardContent = ({ lastActivity, accentColor, colors, handleContinue, localStyles }) => {
  const currentWord = (lastActivity.metadata?.word || 0) + 1;
  const totalWords = lastActivity.metadata?.totalWords || 15;
  const percentage = Math.min(Math.round((currentWord / totalWords) * 100), 100);
  return (
    <View style={localStyles.content}>
      <View style={localStyles.header}>
        <Text style={localStyles.emoji}>📚</Text>
        <Text style={[localStyles.label, { color: colors.textSecondary }]}>Reprendre</Text>
      </View>
      <Text style={[localStyles.title, { color: colors.text }]}>{lastActivity.title}</Text>
      <Text style={[localStyles.subtitle, { color: colors.textSecondary }]}> 
        Niv {lastActivity.level || 1}
        {typeof lastActivity.metadata?.categoryIndex === 'number' ? ` • Catégorie ${lastActivity.metadata.categoryIndex + 1}` : ''}
        • Mot {currentWord}/{totalWords}
      </Text>
      <View style={localStyles.progressContainer}>
        <View style={[localStyles.progressTrack, { backgroundColor: `${accentColor}15` }]}> 
          <View 
            style={[
              localStyles.progressFill,
              { 
                width: `${percentage}%`,
                backgroundColor: accentColor
              }
            ]} 
          />
        </View>
        <Text style={[localStyles.progressText, { color: accentColor }]}>{percentage}%</Text>
      </View>
      <TouchableOpacity
        style={[localStyles.button, { backgroundColor: accentColor }]}
        onPress={handleContinue}
        activeOpacity={0.8}
      >
        <Text style={localStyles.buttonText}>Continuer ▶️</Text>
      </TouchableOpacity>
    </View>
  );
};

const HeroEmptyCardContent = ({ accentColor, colors, handleLevelSelection, localStyles }) => (
  <View style={localStyles.content}>
    <Text style={localStyles.emoji}>🚀</Text>
    <Text style={[localStyles.title, { color: colors.text }]}>Commencer l&apos;apprentissage</Text>
    <Text style={[localStyles.subtitle, { color: colors.textSecondary }]}>Choisissez votre premier exercice</Text>
    <TouchableOpacity
      style={[localStyles.button, { backgroundColor: accentColor }]}
      onPress={handleLevelSelection}
      activeOpacity={0.8}
    >
      <Text style={localStyles.buttonText}>Commencer {'>'}</Text>
    </TouchableOpacity>
  </View>
);

const HeroContinueSection = ({
  lastActivity,
  onPress,
  accentColor = "#3B82F6",
  isLoading = false,
}) => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext?.colors || {
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
  };

  const handleLevelSelection = useCallback(() => onPress?.('levelSelection'), [onPress]);
  const handleContinue = useCallback(() => onPress?.(lastActivity), [onPress, lastActivity]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Card style={[styles.card, { backgroundColor: colors.surface }]}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={accentColor} />
            <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
              Chargement...
            </Text>
          </View>
        </Card>
      </View>
    );
  }

  // État vide - première utilisation
  if (!lastActivity) {
    return (
      <View style={styles.container}>
        <Card style={[styles.card, { backgroundColor: colors.surface }]}>
          <HeroEmptyCardContent
            accentColor={accentColor}
            colors={colors}
            handleLevelSelection={handleLevelSelection}
            localStyles={styles}
          />
        </Card>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        <HeroCardContent
          lastActivity={lastActivity}
          accentColor={accentColor}
          colors={colors}
          handleContinue={handleContinue}
          localStyles={styles}
        />
      </Card>
    </View>
  );
};

export default HeroContinueSection;