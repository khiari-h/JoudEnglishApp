// src/screens/Dashboard/components/QuickActions/index.js - VERSION CORRIGÉE
import { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types'; // ✅ Import de PropTypes
import { ThemeContext } from "../../../../contexts/ThemeContext";
import { EXERCISES } from "../../../../utils/constants";
import styles from "./style";

const QuickActions = ({ currentLevel = "1" }) => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext?.colors || {
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
  };

  const [totalWords, setTotalWords] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // ========== COMPTAGE MOTS SIMPLES ==========
  const countWordsLearned = async () => {
    try {
      let total = 0;
      const levels = ['1', '2', '3', '4', '5', '6'];
      
      for (const level of levels) {
        try {
          const storageKey = `vocabulary_${level}_classic`;
          const savedData = await AsyncStorage.getItem(storageKey);
          
          if (savedData) {
            const data = JSON.parse(savedData);
            const completedWords = data.completedWords || {};
            
            total += Object.values(completedWords).reduce((sum, words) => {
              return sum + (Array.isArray(words) ? words.length : 0);
            }, 0);
          }
        } catch (levelError) {
          // ✅ Gestion d'erreur appropriée pour chaque niveau
          console.warn(`Error counting words for level ${level}:`, levelError);
          // Continue avec les autres niveaux
        }
      }
      return total;
    } catch (error) {
      // ✅ Gestion d'erreur appropriée
      console.error('Error counting total words learned:', error);
      return 0;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const count = await countWordsLearned();
      setTotalWords(count);
      setIsLoading(false);
    };
    loadData();
  }, [currentLevel]);

  // ========== NAVIGATION AVEC NOUVELLES CONSTANTES ==========
  const navigateToVocabulary = () => {
    router.push({
      pathname: EXERCISES.vocabulary.route,
      params: { level: currentLevel, mode: "classic" }
    });
  };

  const navigateToRevision = () => {
    if (totalWords < 10) {
      Alert.alert("Révision", "Apprenez au moins 10 mots avant de réviser.", [{ text: "OK" }]);
      return;
    }

    router.push({
      pathname: "/tabs/vocabularyRevision",
      params: {
        level: currentLevel,
        questionsCount: Math.min(10, totalWords),
        source: 'manual'
      }
    });
  };

  const navigateToTest = () => {
    router.push({
      pathname: EXERCISES.assessment.route,
      params: { level: currentLevel }
    });
  };

  // ========== ACTIONS AVEC NOUVELLES CONSTANTES ==========
  const actions = [
    {
      id: 'vocabulary',
      icon: EXERCISES.vocabulary.icon,
      label: EXERCISES.vocabulary.title,
      subtitle: 'Apprendre de nouveaux mots',
      action: navigateToVocabulary,
      color: EXERCISES.vocabulary.color
    },
    {
      id: 'revision',
      icon: '🔄',
      label: 'Révision',
      subtitle: totalWords >= 10 ? `${totalWords} mots disponibles` : 'Apprenez plus de mots',
      action: navigateToRevision,
      color: totalWords >= 10 ? '#8B5CF6' : '#6B7280',
      disabled: totalWords < 10
    },
    {
      id: 'test',
      icon: EXERCISES.assessment.icon,
      label: EXERCISES.assessment.title,
      subtitle: 'Évaluer vos connaissances',
      action: navigateToTest,
      color: EXERCISES.assessment.color
    }
  ];

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text testID="quick-actions-title" style={[styles.sectionTitle, { color: colors.text }]}>
          ⚡ Actions rapides
        </Text>
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
          Chargement...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text testID="quick-actions-title" style={[styles.sectionTitle, { color: colors.text }]}>
        ⚡ Actions rapides
      </Text>

      <View style={styles.actionsGrid}>
        {actions.map(action => (
          <TouchableOpacity
            key={action.id}
            style={[
              styles.actionButton,
              { backgroundColor: colors.surface },
              action.disabled && styles.actionButtonDisabled
            ]}
            onPress={action.action}
            activeOpacity={0.7}
            disabled={action.disabled}
            accessibilityRole="button"
            accessibilityLabel={`${action.label} – ${action.subtitle}`}
            accessibilityState={{ disabled: !!action.disabled }}
          >
            <View style={[styles.actionIcon, { backgroundColor: `${action.color}15` }]}>
              <Text style={styles.actionIconText}>{action.icon}</Text>
            </View>
            
            <View style={styles.actionContent}>
              <Text style={[styles.actionLabel, { color: colors.text }]}>
                {action.label}
              </Text>
              <Text style={[styles.actionSubtitle, { color: colors.textSecondary }]}>
                {action.subtitle}
              </Text>
            </View>

            <Text style={[styles.arrow, { color: colors.textSecondary }]}>
              →
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// ✅ Ajout de la validation des props
QuickActions.propTypes = {
  currentLevel: PropTypes.string.isRequired,
};

export default QuickActions;