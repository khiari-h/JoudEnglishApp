// src/screens/Dashboard/components/SimpleMetrics/index.js
import React, { useContext } from "react";
import { View, Text } from "react-native";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import styles from "./style";

/**
 * Métriques simples et utiles
 * ✅ 2-3 métriques max, données réelles uniquement
 */
const SimpleMetrics = ({
  metrics = [],
  accentColor = "#3B82F6"
}) => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext?.colors || {
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
  };

  // Si pas de métriques OU toutes à 0, ne rien afficher
  if (!metrics || metrics.length === 0) {
    return null;
  }

  // Limiter à 3 métriques max pour éviter surcharge
  const displayMetrics = metrics.slice(0, 3);

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        📊 Aujourd'hui
      </Text>
      
      <View style={styles.metricsGrid}>
        {displayMetrics.map((metric) => (
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
 * Carte métrique individuelle
 */
const MetricCard = ({ metric, colors, accentColor }) => {
  const getTrendStyle = (trend) => {
    if (!trend) return null;
    
    const isPositive = trend.includes('+');
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