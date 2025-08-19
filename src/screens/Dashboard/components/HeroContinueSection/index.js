// src/screens/Dashboard/components/HeroContinueSection/index.js
import { useContext, useCallback } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import PropTypes from 'prop-types';
import Card from "../../../../components/ui/Card";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import styles from "./style";

const HeroCardContent = ({ lastActivity, accentColor, colors, handleContinue, localStyles }) => {
  // ✅ SIMPLIFIÉ : Plus de logique complexe, juste affichage simple
  const getModuleName = () => {
    switch (lastActivity.type) {
      case 'vocabulary': return 'Vocabulaire';
      case 'phrases': return 'Expressions';
      case 'grammar': return 'Grammaire';
      case 'reading': return 'Lecture';
      case 'conversations': return 'Conversations';
      case 'wordGames': return 'Jeux de mots';
      default: return 'Exercice';
    }
  };

  return (
    <View style={localStyles.content}>
      <View style={localStyles.header}>
        <Text style={localStyles.emoji}>📚</Text>
        <Text style={[localStyles.label, { color: colors.textSecondary }]}>Dernière activité</Text>
      </View>
      <Text style={[localStyles.title, { color: colors.text }]}>
        {getModuleName()} Niveau {lastActivity.level || 1}
      </Text>
      <Text style={[localStyles.subtitle, { color: colors.textSecondary }]}> 
        Continuez votre apprentissage
      </Text>
      <TouchableOpacity
        testID="continue-activity-button"
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
        testID="level-selection-button"
        accessibilityLabel="Commencer"
        accessibilityRole="button"
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
      <View testID="hero-empty-section" style={styles.container}>
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
    <View testID="hero-continue-section" style={styles.container}>
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

// PropTypes pour HeroCardContent
HeroCardContent.propTypes = {
  lastActivity: PropTypes.shape({
    type: PropTypes.string.isRequired,
    level: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  accentColor: PropTypes.string.isRequired,
  colors: PropTypes.object.isRequired,
  handleContinue: PropTypes.func.isRequired,
  localStyles: PropTypes.object.isRequired,
};

// PropTypes pour HeroEmptyCardContent
HeroEmptyCardContent.propTypes = {
  accentColor: PropTypes.string.isRequired,
  colors: PropTypes.object.isRequired,
  handleLevelSelection: PropTypes.func.isRequired,
  localStyles: PropTypes.object.isRequired,
};

// PropTypes pour le composant principal HeroContinueSection
HeroContinueSection.propTypes = {
  lastActivity: PropTypes.shape({
    type: PropTypes.string,
    level: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onPress: PropTypes.func,
  accentColor: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default HeroContinueSection;