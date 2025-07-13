// src/components/ui/ProgressBar/index.js - Version Mobile-First Simple


import createStyles from "./style";

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
  valueFormatter = (value, total) => `${value}/${total}`,
  percentageFormatter = (percentage) => `${Math.round(percentage)}%`,
  testID,
}) => {
  const styles = createStyles(fillColor, height, borderRadius);
  
  // Calculer le pourcentage validé
  const validProgress = Math.min(Math.max(progress, 0), 100);

  // Animation simple de la barre
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      Animated.timing(progressAnim, {
        toValue: validProgress,
        duration: animationDuration,
        useNativeDriver: false,
      }).start();
    } else {
      progressAnim.setValue(validProgress);
    }
  }, [validProgress, animated, animationDuration]);

  // Largeur animée
  const width = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
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
    <View style={[styles.container, style]} testID={testID}>
      {/* Contenu au-dessus */}
      {renderTopContent()}

      {/* 📊 BARRE DE PROGRESSION SIMPLE ET CLAIRE */}
      <View style={styles.progressBarContainer}>
        {/* Track de fond simple */}
        <View style={[styles.progressTrack, { backgroundColor, borderRadius }]} />
        
        {/* Barre de progression */}
        <Animated.View
          style={[
            styles.progressFill,
            {
              width,
              backgroundColor: fillColor,
              borderRadius,
            },
          ]}
        />
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

export default ProgressBar;