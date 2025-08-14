// src/screens/Dashboard/components/SimpleMetrics/index.js - AVEC RAFRAÎCHISSEMENT

import { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import PropTypes from 'prop-types';
import { ThemeContext } from "../../../../contexts/ThemeContext";
import useActivityMetrics from "../../../../hooks/useActivityMetrics";
import useDailyWords from "../../../../hooks/useDailyWords";
import styles from "./style";

/**
 * 📊 SimpleMetrics - AVEC SYSTÈME DE RAFRAÎCHISSEMENT
 */
const SimpleMetrics = ({ 
  accentColor = "#3B82F6", 
  refreshKey = 0 // 🔥 NOUVELLE PROP pour forcer le rafraîchissement
}) => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext?.colors || {
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
  };

  // =================== ÉTAT LOCAL POUR FORCER LE REFRESH ===================
  const [localRefresh, setLocalRefresh] = useState(0);

  // =================== HOOKS AVEC REFRESH ===================
  const { 
    currentStreak, 
    streakTrend, 
    formattedTime,
    refresh: refreshMetrics // 🔥 Si ton hook a une fonction refresh
  } = useActivityMetrics(localRefresh); // Passe le trigger local

  const { 
    wordsToday,
    isLoading: wordsLoading,
    refresh: refreshWords // 🔥 Si ton hook a une fonction refresh
  } = useDailyWords(localRefresh); // Passe le trigger local

  // =================== ÉCOUTE DU REFRESH DU PARENT ===================
  useEffect(() => {
    if (refreshKey > 0) {
      // Force le rechargement des données
      setLocalRefresh(prev => prev + 1);
      
      // Si les hooks ont des fonctions refresh, les appeler
      if (refreshMetrics) refreshMetrics();
      if (refreshWords) refreshWords();
    }
  }, [refreshKey, refreshMetrics, refreshWords]);

  // =================== LOADING STATE ===================
  if (wordsLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={accentColor} />
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
            Chargement des métriques...
          </Text>
        </View>
      </View>
    );
  }

  // =================== DONNÉES DES MÉTRIQUES ===================
  const metrics = [
    {
      id: 'streak',
      icon: '🔥',
      value: (currentStreak || 0).toString(),
      label: 'Jours de suite',
      trend: streakTrend,
    },
    {
      id: 'words',
      icon: '📚',
      value: (wordsToday || 0).toString(),
      label: 'Mots aujourd\'hui',
      trend: null,
    },
    {
      id: 'time',
      icon: '⏱️',
      value: formattedTime || '0min',
      label: 'Temps aujourd\'hui',
      trend: null,
    }
  ];

  // Masquer si toutes les métriques sont à 0
  const hasActivity = currentStreak > 0 || wordsToday > 0 || (formattedTime && formattedTime !== '0min');
  
  if (!hasActivity) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🎯</Text>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            Commencez votre première session !
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
            Vos statistiques apparaîtront ici
          </Text>
        </View>
      </View>
    );
  }

  // =================== RENDER PRINCIPAL ===================
  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>📊 Aujourd&apos;hui</Text>
      
      <View style={styles.metricsGrid}>
        {metrics.map((metric) => (
          <MetricCard
            key={metric.id}
            metric={metric}
            colors={colors}
            accentColor={accentColor}
          />
        ))}
      </View>
    </View>
  );
};

/**
 * 📈 Carte métrique individuelle
 */
const MetricCard = ({ metric, colors }) => {
  const getTrendStyle = (trend) => {
    if (!trend) return null;
    
    const isPositive = trend.includes('+') || trend.includes('🏆') || trend.includes('💪') || trend.includes('🔥');
    const isNegative = trend.includes('-');
    
    if (isPositive) {
      return {
        backgroundColor: '#DCFCE7',
        color: '#16A34A'
      };
    }
    
    if (isNegative) {
      return {
        backgroundColor: '#FEF2F2', 
        color: '#DC2626'
      };
    }
    
    return {
      backgroundColor: '#F1F5F9',
      color: '#64748B'
    };
  };

  const trendStyle = getTrendStyle(metric.trend);

  return (
    <View style={[styles.metricCard, { backgroundColor: colors.surface }]}>
      {/* Trend indicator */}
      {metric.trend && trendStyle && (
        <View style={[styles.trendIndicator, { backgroundColor: trendStyle.backgroundColor }]}>
          <Text style={[styles.trendText, { color: trendStyle.color }]}>
            {metric.trend}
          </Text>
        </View>
      )}
      
      {/* Icon */}
      <Text style={styles.metricIcon}>{metric.icon}</Text>
      
      {/* Value */}
      <Text style={[styles.metricValue, { color: colors.text }]}>
        {metric.value}
      </Text>
      
      {/* Label */}
      <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>
        {metric.label}
      </Text>
    </View>
  );
};

// PropTypes pour MetricCard
MetricCard.propTypes = {
  metric: PropTypes.shape({
    id: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    trend: PropTypes.string,
  }).isRequired,
  colors: PropTypes.shape({
    surface: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    textSecondary: PropTypes.string.isRequired,
  }).isRequired,
};

// PropTypes pour le composant principal SimpleMetrics
SimpleMetrics.propTypes = {
  accentColor: PropTypes.string,
  refreshKey: PropTypes.number,
};

export default SimpleMetrics;