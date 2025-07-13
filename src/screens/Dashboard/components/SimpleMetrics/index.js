// src/screens/Dashboard/components/SimpleMetrics/index.js - MÉTRIQUES CORRIGÉES



import { ThemeContext } from "../../../../contexts/ThemeContext";
import useActivityMetrics from "../../../../hooks/useActivityMetrics";
import useDailyWords from "../../../../hooks/useDailyWords";
import styles from "./style";

/**
 * 📊 SimpleMetrics - CORRIGÉ
 * ✅ Temps quotidien (pas total)
 * ✅ Mots sans trend
 * ✅ Plus de confusion quotidien/cumulatif
 */
const SimpleMetrics = ({ accentColor = "#3B82F6" }) => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext?.colors || {
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
  };

  // =================== HOOKS CORRIGÉS ===================
  const { 
    currentStreak, 
    streakTrend, 
    formattedTime // ✅ Maintenant quotidien
  } = useActivityMetrics();

  const { 
    wordsToday,
    isLoading: wordsLoading 
    // ✅ Plus de trend
  } = useDailyWords();

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

  // =================== DONNÉES DES MÉTRIQUES CORRIGÉES ===================
  const metrics = [
    {
      id: 'streak',
      icon: '🔥',
      value: (currentStreak || 0).toString(),
      label: 'Jours de suite',
      trend: streakTrend, // ✅ Gardé pour streak
    },
    {
      id: 'words',
      icon: '📚',
      value: (wordsToday || 0).toString(),
      label: 'Mots aujourd\'hui',
      trend: null, // ✅ SUPPRIMÉ : plus de trend trompeur
    },
    {
      id: 'time',
      icon: '⏱️',
      value: formattedTime || '0min',
      label: 'Temps aujourd\'hui', // ✅ CHANGÉ : quotidien
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
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        📊 Aujourd'hui
      </Text>
      
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
 * 📈 Carte métrique individuelle - INCHANGÉE
 */

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

export default SimpleMetrics;