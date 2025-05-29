// src/screens/exercises/vocabulary/VocabularyModeSelector/index.js
import React from "react";
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { router } from "expo-router";
import { 
  getLevelColor, 
  getLevelDisplayName, 
  isBonusLevel, 
  getAvailableLevels 
} from "../../../../utils/vocabulary/vocabularyDataHelper";
import styles from "./style";

/**
 * Écran de sélection du mode de vocabulaire (Classic ou Fast)
 */
const VocabularyModeSelector = ({ route }) => {
  const { level } = route.params;
  const levelColor = getLevelColor(level);
  const levelDisplayName = getLevelDisplayName(level);
  
  // Si c'est BLevel, rediriger directement vers Fast (seule option)
  React.useEffect(() => {
    if (isBonusLevel(level)) {
      handleModeSelect('fast');
    }
  }, [level]);

  const handleModeSelect = (mode) => {
    router.replace({
      pathname: '/exercises/vocabulary', // ← Chemin correct vers index.js
      params: { level, mode }
    });
  };

  const handleBack = () => {
    router.back();
  };

  // Si c'est un niveau bonus, pas besoin d'afficher l'écran
  if (isBonusLevel(level)) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
            <Text style={styles.levelBadgeText}>Niveau {level}</Text>
          </View>
          <Text style={styles.headerTitle}>{levelDisplayName}</Text>
          <Text style={styles.headerSubtitle}>Choisissez votre mode d'apprentissage</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Mode Classic */}
        <TouchableOpacity 
          style={styles.modeCard}
          onPress={() => handleModeSelect('classic')}
          activeOpacity={0.8}
        >
          <View style={styles.modeHeader}>
            <View style={styles.modeIconContainer}>
              <Text style={styles.modeIcon}>📚</Text>
            </View>
            <View style={styles.modeTitleContainer}>
              <Text style={styles.modeTitle}>Mode Classique</Text>
              <Text style={styles.modeSubtitle}>Apprentissage complet</Text>
            </View>
            <View style={styles.arrowContainer}>
              <Text style={[styles.arrow, { color: levelColor }]}>→</Text>
            </View>
          </View>
          
          <View style={styles.modeDescription}>
            <Text style={styles.descriptionText}>
              • Vocabulaire thématique organisé par catégories{'\n'}
              • Définitions et exemples détaillés{'\n'}
              • Progression structurée et complète{'\n'}
              • Idéal pour un apprentissage approfondi
            </Text>
          </View>
          
          <View style={styles.modeStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>~800</Text>
              <Text style={styles.statLabel}>mots</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>15-20</Text>
              <Text style={styles.statLabel}>catégories</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Mode Fast */}
        <TouchableOpacity 
          style={[styles.modeCard, styles.fastModeCard]}
          onPress={() => handleModeSelect('fast')}
          activeOpacity={0.8}
        >
          <View style={styles.fastBadge}>
            <Text style={styles.fastBadgeText}>TOP 1000</Text>
          </View>
          
          <View style={styles.modeHeader}>
            <View style={styles.modeIconContainer}>
              <Text style={styles.modeIcon}>⚡</Text>
            </View>
            <View style={styles.modeTitleContainer}>
              <Text style={styles.modeTitle}>Mode Fast</Text>
              <Text style={[styles.modeSubtitle, { color: '#f59e0b' }]}>
                Les mots essentiels
              </Text>
            </View>
            <View style={styles.arrowContainer}>
              <Text style={[styles.arrow, { color: '#f59e0b' }]}>→</Text>
            </View>
          </View>
          
          <View style={styles.modeDescription}>
            <Text style={styles.descriptionText}>
              • Les 1000 mots les plus utilisés{'\n'}
              • Apprentissage rapide et efficace{'\n'}
              • Basé sur la fréquence d'usage{'\n'}
              • Parfait pour débuter rapidement
            </Text>
          </View>
          
          <View style={styles.modeStats}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: '#f59e0b' }]}>1000</Text>
              <Text style={styles.statLabel}>mots</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: '#f59e0b' }]}>7</Text>
              <Text style={styles.statLabel}>niveaux</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Note explicative */}
        <View style={styles.noteContainer}>
          <Text style={styles.noteIcon}>💡</Text>
          <Text style={styles.noteText}>
            <Text style={styles.noteBold}>Conseil :</Text> Le mode Fast est idéal pour acquérir rapidement les bases, 
            tandis que le mode Classique offre une progression plus détaillée.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VocabularyModeSelector;