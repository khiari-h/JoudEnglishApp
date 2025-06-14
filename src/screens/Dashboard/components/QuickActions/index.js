// src/screens/Dashboard/components/QuickActions/index.js
import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router"; // ✅ Expo Router au lieu de React Navigation
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from "../../../../contexts/ThemeContext";
import useUnifiedRevisionSystem from "../../../../hooks/useUnifiedRevisionSystem";
import RevisionPreferencesModal from "./RevisionPreferencesModal";
import { resetAllVocabularyData } from "../../../../utils/resetVocabularyData";
import styles from "./style"; // ✅ Import des styles séparés

/**
 * Quick Actions - SYSTÈME UNIFIÉ avec Expo Router
 * ✅ Navigation cohérente avec router.push()
 * ✅ Styles séparés dans style.js
 */
const QuickActions = ({ 
  currentLevel = "1", 
  progressContext,
  accentColor = "#3B82F6" 
}) => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext?.colors || {
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
  };

  // ========== 🔍 COMPTAGE RÉEL DES MOTS ==========
  const [realWordsData, setRealWordsData] = useState({
    totalWordsLearned: 0,
    isLoading: true,
    levelDetails: {}
  });

  // ========== 🎯 SYSTÈME UNIFIÉ DE RÉVISION ==========
  const {
    revisionData,
    revisionSettings,
    showPreferencesModal,
    handlePreferencesChoice,
    handleStartRevision,
    handleManualRevision,
    resetRevisionSystem,
    isAvailable,
    canDoManualRevision,
    debugInfo
  } = useUnifiedRevisionSystem(realWordsData.totalWordsLearned);

  // ========== COMPTAGE DES MOTS RÉELS ==========
  const countRealWordsLearned = async () => {
    try {
      console.log("🔍 QuickActions - Comptage mots réels...");
      
      let totalWords = 0;
      const levelDetails = {};
      const levels = ['1', '2', '3', '4', '5', '6', 'bonus'];
      const modes = ['classic', 'fast'];

      for (const level of levels) {
        let levelTotal = 0;
        const levelModes = {};

        for (const mode of modes) {
          const storageKey = `vocabulary_${level}_${mode}`;
          
          try {
            const stored = await AsyncStorage.getItem(storageKey);
            if (stored) {
              const data = JSON.parse(stored);
              const completedWords = data.completedWords || {};
              
              const wordsCount = Object.values(completedWords).reduce((sum, categoryWords) => {
                return sum + (Array.isArray(categoryWords) ? categoryWords.length : 0);
              }, 0);

              levelModes[mode] = { completedWords: wordsCount };
              levelTotal += wordsCount;
              totalWords += wordsCount;
            } else {
              levelModes[mode] = { completedWords: 0 };
            }
          } catch (error) {
            levelModes[mode] = { completedWords: 0, error: error.message };
          }
        }

        levelDetails[level] = {
          total: levelTotal,
          modes: levelModes
        };
      }

      return {
        totalWordsLearned: totalWords,
        levelDetails
      };
    } catch (error) {
      console.error("🔍 QuickActions - Erreur comptage:", error);
      return {
        totalWordsLearned: 0,
        levelDetails: {}
      };
    }
  };

  // ========== CHARGEMENT INITIAL ==========
  useEffect(() => {
    const loadData = async () => {
      setRealWordsData(prev => ({ ...prev, isLoading: true }));
      const data = await countRealWordsLearned();
      setRealWordsData({
        ...data,
        isLoading: false
      });
    };
    loadData();
  }, [currentLevel]);

  // ========== GESTIONNAIRES AVEC EXPO ROUTER ==========

  // Révision automatique/programmée
  const handleScheduledRevision = async () => {
    try {
      console.log("🚀 QuickActions - Démarrage révision programmée...");
      const revisionParams = await handleStartRevision();
      
      // ✅ Navigation Expo Router vers vocabulaire en mode révision
      router.push({
        pathname: "/(tabs)/vocabularyRevision", // ✅ Chemin Expo Router
        params: {
          level: currentLevel,
          wordsToReview: revisionParams.wordsToReview,
          questionsCount: revisionParams.questionsCount,
          source: revisionParams.source,
          mode: 'revision'
        }
      });
      console.log("✅ Navigation révision réussie !");
    } catch (error) {
      console.error('❌ Erreur démarrage révision:', error);
      // Fallback
      router.push("/(tabs)/vocabularyRevision");
    }
  };

  // Révision manuelle (bouton disponible même sans seuil)
  const handleManualRevisionPress = () => {
    if (canDoManualRevision) {
      console.log("🚀 QuickActions - Démarrage révision manuelle...");
      const revisionParams = handleManualRevision();
      
      // ✅ Navigation Expo Router
      router.push({
        pathname: "/(tabs)/vocabularyRevision",
        params: {
          level: currentLevel,
          wordsToReview: revisionParams.wordsToReview,
          questionsCount: revisionParams.questionsCount,
          source: revisionParams.source,
          mode: 'manual'
        }
      });
    } else {
      Alert.alert(
        "Révision non disponible",
        "Apprenez au moins 10 mots avant de pouvoir réviser.",
        [{ text: "OK" }]
      );
    }
  };

  // Navigation vers vocabulaire classique
  const handleVocabularyPress = () => {
    console.log("📖 Navigation vers vocabulaire classique...");
    // ✅ Navigation Expo Router
    router.push({
      pathname: "/(tabs)/vocabularyExercise",
      params: {
        level: currentLevel, 
        mode: "classic" 
      }
    });
  };

  // Navigation vers test de niveau
  const handleTestPress = () => {
    console.log("🎯 Navigation vers test de niveau...");
    // ✅ Navigation Expo Router
    router.push({
      pathname: "/(tabs)/levelAssessment",
      params: {
        level: currentLevel 
      }
    });
  };

  // Choix des préférences lors du premier déclenchement
  const handlePreferencesModalChoice = (frequency, wordsCount, styleId) => {
    console.log("⚙️ Choix préférences:", { frequency, wordsCount, styleId });
    handlePreferencesChoice(frequency, wordsCount, styleId);
  };

  const handleSkipPreferences = (frequency, wordsCount, styleId) => {
    console.log("⏭️ Skip préférences, utilisation valeurs par défaut");
    handlePreferencesChoice(frequency, wordsCount, styleId);
  };

  // Reset pour tests
  const handleResetForTesting = () => {
    Alert.alert(
      "Reset données",
      "Supprimer toutes les données pour tester le système ?",
      [
        { text: "Annuler", style: "cancel" },
        { 
          text: "Reset complet", 
          style: "destructive",
          onPress: async () => {
            await resetAllVocabularyData();
            await resetRevisionSystem();
            setRealWordsData({ totalWordsLearned: 0, isLoading: false, levelDetails: {} });
            Alert.alert("Reset", "Toutes les données ont été supprimées");
          }
        }
      ]
    );
  };

  // ========== CONFIGURATION ACTIONS ==========
  const actions = [
    {
      id: 'vocabulary',
      icon: '📖',
      label: 'Vocabulaire',
      subtitle: 'Exercice de base',
      action: handleVocabularyPress, // ✅ Fonction avec Expo Router
      available: true,
      color: '#10B981'
    },
    {
      id: 'revision',
      icon: '🔄',
      label: 'Révision',
      subtitle: isAvailable 
        ? `${revisionData.wordsToReview} mots à revoir`
        : `Dans ${revisionData.nextMilestone || '?'} mots`,
      action: isAvailable ? handleScheduledRevision : handleManualRevisionPress, // ✅ Fonctions avec Expo Router
      available: true, // Toujours disponible, mais comportement différent
      color: isAvailable ? '#8B5CF6' : '#6B7280'
    },
    {
      id: 'test',
      icon: '🎯',
      label: 'Test niveau',
      subtitle: 'Évaluation',
      action: handleTestPress, // ✅ Fonction avec Expo Router
      available: true,
      color: '#F59E0B'
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        ⚡ Actions rapides
      </Text>

      {/* 🔍 DEBUG SYSTÈME UNIFIÉ */}
      {__DEV__ && (
        <View style={styles.debugSection}>
          <Text style={styles.debugTitle}>🎯 Système Unifié de Révision</Text>
          
          {realWordsData.isLoading ? (
            <View style={styles.debugLoading}>
              <Text style={styles.debugLoadingText}>⏳ Chargement...</Text>
            </View>
          ) : (
            <View style={styles.debugSuccess}>
              <Text style={styles.debugSuccessText}>
                ✅ Total: {realWordsData.totalWordsLearned} mots
              </Text>
              <Text style={styles.debugReasonText}>
                📝 {revisionData.reason}
              </Text>
              <Text style={styles.debugInfoText}>
                🎯 Type: {revisionData.triggerType} | Style: {revisionSettings.styleId} | Fréquence: {revisionSettings.frequency} mots
              </Text>
              
              {isAvailable ? (
                <Text style={styles.debugAvailableText}>
                  🚀 RÉVISION PROGRAMMÉE: {revisionData.wordsToReview} mots
                </Text>
              ) : (
                <Text style={styles.debugUnavailableText}>
                  🔄 Manuel disponible: {canDoManualRevision ? 'OUI' : 'NON'}
                </Text>
              )}
            </View>
          )}

          {/* Détails par niveau */}
          {!realWordsData.isLoading && (
            <View style={styles.debugLevels}>
              <Text style={styles.debugLevelsTitle}>📊 Détails par niveau:</Text>
              {Object.entries(realWordsData.levelDetails).map(([level, data]) => (
                <Text key={level} style={styles.debugLevelText}>
                  {`Niveau ${level}: ${data.total} mots (C:${data.modes.classic?.completedWords || 0} F:${data.modes.fast?.completedWords || 0})`}
                </Text>
              ))}
            </View>
          )}

          {/* Bouton reset pour tests */}
          <TouchableOpacity
            style={styles.debugResetButton}
            onPress={handleResetForTesting}
          >
            <Text style={styles.debugResetText}>🗑️ Reset pour test</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.actionsRow}>
        {actions.map(action => (
          <ActionButton
            key={action.id}
            action={action}
            colors={colors}
            onPress={action.action}
            isRevisionScheduled={action.id === 'revision' && isAvailable}
          />
        ))}
      </View>

      {/* Modal de choix des préférences */}
      <RevisionPreferencesModal
        visible={showPreferencesModal}
        onChoice={handlePreferencesModalChoice}
        onSkip={handleSkipPreferences}
      />
    </View>
  );
};

/**
 * Bouton d'action avec support révision programmée/manuelle
 */
const ActionButton = ({ action, colors, onPress, isRevisionScheduled = false }) => {
  return (
    <TouchableOpacity
      style={[
        styles.actionButton,
        { backgroundColor: colors.surface },
        !action.available && styles.actionButtonDisabled
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[
        styles.actionIcon, 
        { backgroundColor: `${action.color}15` }
      ]}>
        <Text style={styles.actionIconText}>{action.icon}</Text>
      </View>
      
      <View style={styles.actionContent}>
        <Text style={[styles.actionLabel, { color: colors.text }]}>
          {action.label}
        </Text>
        <Text style={[
          styles.actionSubtitle, 
          { color: colors.textSecondary }
        ]}>
          {action.subtitle}
        </Text>
      </View>

      {/* Badge spécial pour révision programmée */}
      {action.id === 'revision' && isRevisionScheduled && (
        <View style={[styles.infoBadge, { backgroundColor: '#8B5CF6' }]}>
          <Text style={[styles.infoText, { color: 'white' }]}>PRÊT</Text>
        </View>
      )}

      {/* Badge manuel pour révision non programmée */}
      {action.id === 'revision' && !isRevisionScheduled && (
        <View style={styles.infoBadge}>
          <Text style={styles.infoText}>Manuel</Text>
        </View>
      )}

      <View style={styles.arrowContainer}>
        <Text style={[styles.arrowText, { color: colors.textSecondary }]}>
          →
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default QuickActions;