// src/screens/Dashboard/components/HeroContinueSection/index.js
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Card from "../../../../components/ui/Card";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import styles from "./style";

/**
 * Hero section pour continuer l'apprentissage
 * ✅ Hiérarchie visuelle claire + progress bar + CTA prominent
 */
const HeroContinueSection = ({
  lastActivity,
  onPress,
  accentColor = "#3B82F6",
  formatProgressSubtitle,
  isLoading = false,
}) => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext?.colors || {
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
  };

  // État de chargement
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
          <View style={styles.content}>
            {/* Pattern décoratif */}
            <View style={[styles.decorativePattern, { backgroundColor: `${accentColor}05` }]} />
            
            <View style={styles.emptyState}>
              <Text style={styles.heroEmoji}>🚀</Text>
              <Text style={[styles.heroTitle, { color: colors.text }]}>
                Commencer l'apprentissage
              </Text>
              <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
                Choisissez votre premier exercice
              </Text>
              
              <TouchableOpacity
                style={[styles.heroButton, { backgroundColor: accentColor }]}
                onPress={() => onPress?.('levelSelection')}
                activeOpacity={0.8}
              >
                <Text style={styles.heroButtonIcon}>▶️</Text>
                <Text style={styles.heroButtonText}>Commencer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </View>
    );
  }

  // Calculer les infos de progression
  const progressInfo = React.useMemo(() => {
    const levelNumber = lastActivity.level || 1;
    const currentWord = (lastActivity.metadata?.word || 0) + 1;
    const totalWords = lastActivity.metadata?.totalWords || 15;
    const percentage = Math.round((currentWord / totalWords) * 100);
    
    return {
      levelNumber,
      currentWord,
      totalWords,
      percentage: Math.min(percentage, 100)
    };
  }, [lastActivity]);

  // Format temps court et friendly
  const formatShortTime = (timeElapsed) => {
    if (!timeElapsed) return '';
    return timeElapsed
      .replace('Il y a ', '')
      .replace(' minute', 'min')
      .replace(' minutes', 'min')
      .replace(' heure', 'h')
      .replace(' heures', 'h')
      .replace('quelques instants', 'maintenant');
  };

  const timeAgo = formatShortTime(lastActivity.timeElapsed);

  return (
    <View style={styles.container}>
      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        <View style={styles.content}>
          {/* Pattern décoratif */}
          <View style={[styles.decorativePattern, { backgroundColor: `${accentColor}05` }]} />
          
          {/* Header avec emoji */}
          <View style={styles.header}>
            <Text style={styles.heroEmoji}>📚</Text>
            <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
              Reprendre
            </Text>
          </View>

          {/* HIÉRARCHIE L1 : Titre principal */}
          <Text style={[styles.heroTitle, { color: colors.text }]}>
            {lastActivity.title}
          </Text>

          {/* HIÉRARCHIE L2 : Context */}
          <View style={styles.contextRow}>
            <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
              Niveau {progressInfo.levelNumber}
            </Text>
            {timeAgo && (
              <>
                <Text style={[styles.contextSeparator, { color: colors.textSecondary }]}>•</Text>
                <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
                  {timeAgo}
                </Text>
              </>
            )}
          </View>

          {/* HIÉRARCHIE L3 : Progression avec barre */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={[styles.progressText, { color: colors.text }]}>
                Mot {progressInfo.currentWord}/{progressInfo.totalWords}
              </Text>
              <Text style={[styles.progressPercentage, { color: accentColor }]}>
                {progressInfo.percentage}%
              </Text>
            </View>
            
            {/* Barre de progression */}
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBarTrack, { backgroundColor: `${accentColor}15` }]}>
                <View 
                  style={[
                    styles.progressBarFill,
                    { 
                      width: `${progressInfo.percentage}%`,
                      backgroundColor: accentColor
                    }
                  ]} 
                />
              </View>
              
              {/* NOUVEAU : Mini achievement si > 50% */}
              {progressInfo.percentage > 50 && (
                <View style={styles.achievementBadge}>
                  <Text style={styles.achievementText}>🔥 Plus de la moitié !</Text>
                </View>
              )}
            </View>
          </View>

          {/* CTA Hero Button */}
          <TouchableOpacity
            style={[styles.heroButton, { backgroundColor: accentColor }]}
            onPress={() => onPress?.(lastActivity)}
            activeOpacity={0.8}
          >
            <Text style={styles.heroButtonIcon}>▶️</Text>
            <Text style={styles.heroButtonText}>Continuer</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
};

export default HeroContinueSection;