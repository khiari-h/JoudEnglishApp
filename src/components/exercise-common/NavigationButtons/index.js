// NavigationButtons/index.js - SIMPLE & EFFICACE 🎯





import createStyles from "./style";

/**
 * 🎯 NavigationButtons - Coupe au gel sur le côté
 * - Simple mais léché
 * - Pas de délire glassmorphism
 * - Juste propre et moderne
 */
const NavigationButtons = ({
  onNext,
  onPrevious,
  disablePrevious = false,
  disableNext = false,
  primaryColor = "#5E60CE",
  buttonLabels = {
    previous: "Précédent",
    next: "Suivant",
    finish: "Terminer",
  },
  isLast = false,
}) => {
  const styles = createStyles(primaryColor);
  
  // Animations subtiles - pas de délire
  const prevScale = useRef(new Animated.Value(1)).current;
  const nextScale = useRef(new Animated.Value(1)).current;

  const nextButtonLabel = isLast ? buttonLabels.finish : buttonLabels.next;

  // Animation simple pour précédent
  const handlePrevPress = () => {
    if (disablePrevious) return;
    
    Animated.sequence([
      Animated.spring(prevScale, { 
        toValue: 0.96, 
        tension: 400,
        friction: 10,
        useNativeDriver: true 
      }),
      Animated.spring(prevScale, { 
        toValue: 1, 
        tension: 300,
        friction: 8,
        useNativeDriver: true 
      })
    ]).start();
    
    setTimeout(() => onPrevious(), 60);
  };

  // Animation simple pour suivant
  const handleNextPress = () => {
    if (disableNext) return;
    
    Animated.sequence([
      Animated.spring(nextScale, { 
        toValue: 0.96, 
        tension: 400,
        friction: 10,
        useNativeDriver: true 
      }),
      Animated.spring(nextScale, { 
        toValue: 1, 
        tension: 300,
        friction: 8,
        useNativeDriver: true 
      })
    ]).start();
    
    setTimeout(() => onNext(), 60);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsRow}>
        
        {/* 🔙 BOUTON PRÉCÉDENT - Ghost propre */}
        {!disablePrevious && (
          <Animated.View style={{ transform: [{ scale: prevScale }] }}>
            <TouchableOpacity
              style={styles.previousButton}
              onPress={handlePrevPress}
              disabled={disablePrevious}
              activeOpacity={0.8}
            >
              <Ionicons name="chevron-back" size={18} color={primaryColor} />
              <Text style={[styles.previousText, { color: primaryColor }]}>
                {buttonLabels.previous}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* ⏭️ BOUTON SUIVANT - Gradient propre */}
        <Animated.View style={{ transform: [{ scale: nextScale }] }}>
          <TouchableOpacity
            style={styles.nextButtonContainer}
            onPress={handleNextPress}
            disabled={disableNext}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={
                isLast 
                  ? ['#10B981', '#059669'] // Vert simple
                  : [primaryColor, `${primaryColor}E6`] // Gradient léger
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.nextButton}
            >
              <Text style={styles.nextText}>
                {nextButtonLabel}
              </Text>
              <Ionicons
                name={isLast ? "checkmark" : "chevron-forward"}
                size={18}
                color="white"
                style={styles.nextIcon}
              />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default NavigationButtons;