// src/components/ui/LoadingIndicator/index.js
import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Modal,
  Animated,
  Easing,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";

/**
 * Composant LoadingIndicator pour afficher un indicateur de chargement
 */
const LoadingIndicator = ({
  // Options de base
  visible = true,
  text,
  size = "medium", // 'small', 'medium', 'large'
  color = "#5E60CE",

  // Type et variante
  type = "spinner", // 'spinner', 'dots', 'pulse', 'custom'
  variant = "default", // 'default', 'overlay', 'fullscreen'
  customIcon,

  // Options de l'overlay
  overlayColor = "rgba(0, 0, 0, 0.4)",
  overlayAnimation = "fade", // 'fade', 'slide', 'none'

  // Style
  style,
  textStyle,
  indicatorStyle,

  // Callbacks
  onRequestClose,
}) => {
  // Animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Effet pour l'animation de rotation continue
  useEffect(() => {
    if (visible && type === "custom") {
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinAnim.setValue(0);
    }
  }, [visible, type]);

  // Effet pour l'animation de pulsation
  useEffect(() => {
    if (visible && type === "pulse") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 700,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [visible, type]);

  // Effet pour l'animation de fade
  useEffect(() => {
    if (overlayAnimation === "fade") {
      Animated.timing(fadeAnim, {
        toValue: visible ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else if (overlayAnimation === "none") {
      fadeAnim.setValue(visible ? 1 : 0);
    }
  }, [visible, overlayAnimation]);

  // Obtenir les styles de taille
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          container: styles.smallContainer,
          indicator: styles.smallIndicator,
          text: styles.smallText,
          spinnerSize: "small",
          iconSize: 20,
        };
      case "large":
        return {
          container: styles.largeContainer,
          indicator: styles.largeIndicator,
          text: styles.largeText,
          spinnerSize: "large",
          iconSize: 32,
        };
      case "medium":
      default:
        return {
          container: styles.mediumContainer,
          indicator: styles.mediumIndicator,
          text: styles.mediumText,
          spinnerSize: "small",
          iconSize: 24,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  // Rendu de l'indicateur en fonction du type
  const renderIndicator = () => {
    switch (type) {
      case "dots":
        return (
          <View
            style={[styles.dotsContainer, sizeStyles.indicator, indicatorStyle]}
          >
            <View
              style={[styles.dot, styles.dot1, { backgroundColor: color }]}
            />
            <View
              style={[styles.dot, styles.dot2, { backgroundColor: color }]}
            />
            <View
              style={[styles.dot, styles.dot3, { backgroundColor: color }]}
            />
          </View>
        );
      case "pulse":
        return (
          <Animated.View
            style={[
              styles.pulseContainer,
              sizeStyles.indicator,
              indicatorStyle,
              { transform: [{ scale: pulseAnim }] },
            ]}
          >
            <View style={[styles.pulse, { backgroundColor: color }]} />
          </Animated.View>
        );
      case "custom":
        return (
          <Animated.View
            style={[
              styles.customContainer,
              sizeStyles.indicator,
              indicatorStyle,
              {
                transform: [
                  {
                    rotate: spinAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "360deg"],
                    }),
                  },
                ],
              },
            ]}
          >
            {customIcon || (
              <Ionicons
                name="refresh-outline"
                size={sizeStyles.iconSize}
                color={color}
              />
            )}
          </Animated.View>
        );
      case "spinner":
      default:
        return (
          <ActivityIndicator
            size={sizeStyles.spinnerSize}
            color={color}
            style={[sizeStyles.indicator, indicatorStyle]}
          />
        );
    }
  };

  // Contenu principal
  const content = (
    <View
      style={[
        styles.container,
        sizeStyles.container,
        variant === "default" && styles.defaultContainer,
        style,
      ]}
    >
      {renderIndicator()}

      {text && (
        <Text style={[styles.text, sizeStyles.text, { color }, textStyle]}>
          {text}
        </Text>
      )}
    </View>
  );

  // Rendu en fonction de la variante
  if (variant === "overlay" || variant === "fullscreen") {
    return (
      <Modal
        transparent
        visible={visible}
        onRequestClose={onRequestClose}
        animationType={overlayAnimation === "slide" ? "slide" : "none"}
      >
        <Animated.View
          style={[
            styles.overlay,
            variant === "fullscreen" && styles.fullscreen,
            { backgroundColor: overlayColor, opacity: fadeAnim },
          ]}
        >
          {content}
        </Animated.View>
      </Modal>
    );
  }

  // Variante par défaut (inline)
  return visible ? content : null;
};

export default LoadingIndicator;
