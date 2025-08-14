// src/components/ui/ProgressBar/index.js - Version Mobile-First Simple
import { View, Text } from "react-native";
import PropTypes from 'prop-types';
import createStyles from "./style";
import useProgressAnimation from "./useProgressAnimation";
import ProgressTrack from "./ProgressTrack";
import ProgressFill from "./ProgressFill";

/**
 * 🎯 ProgressBar - Version Mobile-First Ultra-Simple
 * - Focus sur l'essentiel : progression claire
 * - Pas de surcharge visuelle
 * - Animation fluide et subtile
 * - Lecture immédiate sur mobile
 */
const ProgressBar = ({
  progress = 0, // 0 à 100
  showPercentage = false,
  showValue = false,
  total = 100,
  height = 8,
  backgroundColor = "#E5E7EB",
  fillColor = "#5E60CE",
  borderRadius = 4,
  animated = true,
  animationDuration = 600,
  label,
  labelPosition = "top",
  style,
  valueFormatter = (value, totalValue) => `${value}/${totalValue}`,
  percentageFormatter = (percentage) => `${Math.round(percentage)}%`,
  testID,
}) => {
  const styles = createStyles(fillColor, height, borderRadius);
  
  const validProgress = Math.round(Math.min(Math.max(Number(progress) || 0, 0), 100));
  const { width } = useProgressAnimation({
    progress: validProgress,
    animated,
    duration: animationDuration,
  });

  // Rendu du label
  const renderLabel = () => {
    if (!label) return null;
    return <Text style={styles.label}>{label}</Text>;
  };

  // Rendu de la valeur
  const renderValue = () => {
    if (!showValue) return null;
    const calculatedValue = Math.round((validProgress / 100) * total);
    return (
      <Text style={styles.value}>{valueFormatter(calculatedValue, total)}</Text>
    );
  };

  // Rendu du pourcentage
  const renderPercentage = () => {
    if (!showPercentage) return null;
    return (
      <Text style={[styles.percentage, { color: fillColor }]}>
        {percentageFormatter(validProgress)}
      </Text>
    );
  };

  // Contenu au-dessus
  const renderTopContent = () => {
    if (labelPosition !== "top") return null;
    return (
      <View style={styles.topContentContainer}>
        {renderLabel()}
        <View style={styles.valuesContainer}>
          {renderValue()}
          {renderPercentage()}
        </View>
      </View>
    );
  };

  return (
    <View
      style={[styles.container, style]}
      testID={testID}
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: validProgress, text: percentageFormatter(validProgress) }}
      accessibilityLabel={label || undefined}
    >
      {/* Contenu au-dessus */}
      {renderTopContent()}

      {/* 📊 BARRE DE PROGRESSION SIMPLE ET CLAIRE */}
      <View style={styles.progressBarContainer}>
        <ProgressTrack style={styles.progressTrack} backgroundColor={backgroundColor} borderRadius={borderRadius} />
        <ProgressFill style={styles.progressFill} width={width} fillColor={fillColor} borderRadius={borderRadius} />
      </View>

      {/* Pourcentage en ligne si pas au-dessus */}
      {labelPosition !== "top" && showPercentage && (
        <View style={styles.inlinePercentage}>
          {renderPercentage()}
        </View>
      )}
    </View>
  );
};

// PropTypes pour le composant ProgressBar
ProgressBar.propTypes = {
  progress: PropTypes.number,
  showPercentage: PropTypes.bool,
  showValue: PropTypes.bool,
  total: PropTypes.number,
  height: PropTypes.number,
  backgroundColor: PropTypes.string,
  fillColor: PropTypes.string,
  borderRadius: PropTypes.number,
  animated: PropTypes.bool,
  animationDuration: PropTypes.number,
  label: PropTypes.string,
  labelPosition: PropTypes.oneOf(['top', 'bottom']),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valueFormatter: PropTypes.func,
  percentageFormatter: PropTypes.func,
  testID: PropTypes.string,
};

export default ProgressBar;