// src/components/ui/Modal/index.js
import React from "react";
import {
  Modal as RNModal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";

/**
 * Composant Modal personnalisé avec plusieurs variantes et animations
 */
const Modal = ({
  visible = false,
  onClose,
  title,
  children,
  footer,
  position = "center", // 'center', 'bottom', 'top'
  animationType = "fade", // 'none', 'slide', 'fade', 'custom'
  closeOnBackdropPress = true,
  showCloseButton = true,
  width,
  height,
  maxHeight,
  fullScreen = false,
  transparent = true,
  backdropColor = "rgba(0, 0, 0, 0.5)",
  backdropOpacity = 0.5,
  contentContainerStyle,
  headerStyle,
  footerStyle,
  bodyStyle,
  avoidKeyboard = true,
  scrollable = false,
  customAnimation,
}) => {
  // Animation personnalisée
  const [animation] = React.useState(new Animated.Value(0));

  // Exécuter l'animation personnalisée lorsque visible change
  React.useEffect(() => {
    if (animationType === "custom" && customAnimation) {
      Animated.timing(animation, {
        toValue: visible ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, animationType, customAnimation]);

  // Gérer le clic sur l'arrière-plan
  const handleBackdropPress = () => {
    if (closeOnBackdropPress && onClose) {
      onClose();
    }
  };

  // Calcul de la largeur de la modal
  const getModalWidth = () => {
    if (fullScreen) return "100%";
    if (width) return width;

    const screenWidth = Dimensions.get("window").width;
    switch (position) {
      case "bottom":
      case "top":
        return "100%";
      case "center":
      default:
        return Math.min(screenWidth - 48, 480);
    }
  };

  // Calcul de la hauteur de la modal
  const getModalHeight = () => {
    if (fullScreen) return "100%";
    if (height) return height;
    return "auto";
  };

  // Position de la modal
  const getPositionStyle = () => {
    switch (position) {
      case "bottom":
        return styles.bottomPosition;
      case "top":
        return styles.topPosition;
      case "center":
      default:
        return styles.centerPosition;
    }
  };

  // Style d'animation personnalisée
  const getCustomAnimationStyle = () => {
    if (animationType !== "custom" || !customAnimation) return {};

    switch (position) {
      case "bottom":
        return {
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [300, 0],
              }),
            },
          ],
        };
      case "top":
        return {
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [-300, 0],
              }),
            },
          ],
        };
      case "center":
      default:
        return {
          opacity: animation,
          transform: [
            {
              scale: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            },
          ],
        };
    }
  };

  // Construction du contenu de la modal
  const renderModalContent = () => {
    const modalContent = (
      <Animated.View
        style={[
          styles.contentContainer,
          getPositionStyle(),
          {
            width: getModalWidth(),
            height: getModalHeight(),
            maxHeight: maxHeight,
          },
          animationType === "custom" && getCustomAnimationStyle(),
          contentContainerStyle,
        ]}
      >
        {/* En-tête */}
        {(title || showCloseButton) && (
          <View style={[styles.header, headerStyle]}>
            <Text style={styles.title}>{title}</Text>
            {showCloseButton && (
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClose}
                hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Corps */}
        {scrollable ? (
          <ScrollView
            style={[styles.scrollableBody, bodyStyle]}
            contentContainerStyle={styles.scrollableContent}
            showsVerticalScrollIndicator
          >
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.body, bodyStyle]}>{children}</View>
        )}

        {/* Pied de page */}
        {footer && <View style={[styles.footer, footerStyle]}>{footer}</View>}
      </Animated.View>
    );

    // Envelopper dans KeyboardAvoidingView si nécessaire
    return avoidKeyboard ? (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        {modalContent}
      </KeyboardAvoidingView>
    ) : (
      modalContent
    );
  };

  return (
    <RNModal
      visible={visible}
      transparent={transparent}
      onRequestClose={onClose}
      animationType={animationType === "custom" ? "none" : animationType}
    >
      <View style={[styles.modalContainer, { backgroundColor: backdropColor }]}>
        {/* Touche de l'arrière-plan pour fermer */}
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        {/* Contenu de la modal */}
        {renderModalContent()}
      </View>
    </RNModal>
  );
};

export default Modal;

