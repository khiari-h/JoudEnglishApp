import { useRef, useCallback, memo } from "react";
import { View, TouchableOpacity, Text, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import PropTypes from 'prop-types';
import createStyles from "./style";

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
    
    // Animations
    const prevScale = useRef(new Animated.Value(1)).current;
    const nextScale = useRef(new Animated.Value(1)).current;

    const handlePrevPress = useCallback(() => {
        if (disablePrevious) return;
        
        Animated.sequence([
            Animated.spring(prevScale, { toValue: 0.96, tension: 400, friction: 10, useNativeDriver: true }),
            Animated.spring(prevScale, { toValue: 1, tension: 300, friction: 8, useNativeDriver: true })
        ]).start();
        
        setTimeout(() => onPrevious(), 60);
    }, [disablePrevious, prevScale, onPrevious]);

    const handleNextPress = useCallback(() => {
        if (disableNext) return;
        
        Animated.sequence([
            Animated.spring(nextScale, { toValue: 0.96, tension: 400, friction: 10, useNativeDriver: true }),
            Animated.spring(nextScale, { toValue: 1, tension: 300, friction: 8, useNativeDriver: true })
        ]).start();
        
        setTimeout(() => onNext(), 60);
    }, [disableNext, nextScale, onNext]);

    return (
        <View style={styles.container}>
            <View style={styles.buttonsRow}>
                
                {/* 🔙 BOUTON PRÉCÉDENT */}
                {!disablePrevious && (
                    <Animated.View style={{ transform: [{ scale: prevScale }] }}>
                        <TouchableOpacity
                            style={[styles.previousButton, disablePrevious && styles.disabled]}
                            onPress={handlePrevPress}
                            disabled={disablePrevious}
                            activeOpacity={0.8}
                            accessibilityRole="button"
                            accessibilityLabel={buttonLabels.previous}
                            accessibilityState={{ disabled: !!disablePrevious }}
                        >
                            <Ionicons name="chevron-back" size={18} color={primaryColor} />
                            <Text style={[styles.previousText, { color: primaryColor }]}>
                                {buttonLabels.previous}
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}

                {/* ⏭️ BOUTON SUIVANT */}
                {!disableNext && (
                    <Animated.View style={{ transform: [{ scale: nextScale }] }}>
                        <TouchableOpacity
                            testID="next-button"
                            style={[styles.nextButtonContainer, disableNext && styles.disabled]}
                            onPress={handleNextPress}
                            disabled={disableNext}
                            activeOpacity={0.9}
                            accessibilityRole="button"
                            accessibilityLabel={isLast ? buttonLabels.finish : buttonLabels.next}
                            accessibilityState={{ disabled: !!disableNext }}
                        >
                            <LinearGradient
                                colors={
                                    isLast 
                                        ? ['#10B981', '#059669']
                                        : [primaryColor, `${primaryColor}E6`]
                                }
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.nextButton}
                            >
                                <Text style={styles.nextText}>
                                    {isLast ? buttonLabels.finish : buttonLabels.next}
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
                )}
            </View>
        </View>
    );
};

// PropTypes pour le composant principal NavigationButtons
NavigationButtons.propTypes = {
    onNext: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
    disablePrevious: PropTypes.bool,
    disableNext: PropTypes.bool,
    primaryColor: PropTypes.string,
    buttonLabels: PropTypes.shape({
        previous: PropTypes.string,
        next: PropTypes.string,
        finish: PropTypes.string,
    }),
    isLast: PropTypes.bool,
};

export default memo(NavigationButtons);