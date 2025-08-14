// src/components/ui/Modal/index.js
import React, { useCallback } from "react";
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
import PropTypes from 'prop-types';
import styles from "./style";
import useModalAnimation from "./useModalAnimation";
import ModalBackdrop from "./ModalBackdrop";
import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";

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
  contentContainerStyle,
  headerStyle,
  footerStyle,
  bodyStyle,
  avoidKeyboard = true,
  scrollable = false,
  customAnimation,
}) => {
  const customStyle = useModalAnimation({ visible, animationType, position, customAnimation });

  // Gérer le clic sur l'arrière-plan
  const handleBackdropPress = useCallback(() => {
    if (closeOnBackdropPress && onClose) {
      onClose();
    }
  }, [closeOnBackdropPress, onClose]);

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
  const getCustomAnimationStyle = () => customStyle;

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
            maxHeight,
          },
          animationType === "custom" && getCustomAnimationStyle(),
          contentContainerStyle,
        ]}
      >
        <ModalHeader title={title} showCloseButton={showCloseButton} onClose={onClose} headerStyle={headerStyle} />

        <ModalBody scrollable={scrollable} bodyStyle={bodyStyle}>{children}</ModalBody>

        <ModalFooter footer={footer} footerStyle={footerStyle} />
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
        <ModalBackdrop backdropColor={backdropColor} onPress={handleBackdropPress} />

        {/* Contenu de la modal */}
        {renderModalContent()}
      </View>
    </RNModal>
  );
};

// PropTypes pour le composant Modal
Modal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.node,
  position: PropTypes.oneOf(['center', 'bottom', 'top']),
  animationType: PropTypes.oneOf(['none', 'slide', 'fade', 'custom']),
  closeOnBackdropPress: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fullScreen: PropTypes.bool,
  transparent: PropTypes.bool,
  backdropColor: PropTypes.string,
  contentContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  headerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  footerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  bodyStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  avoidKeyboard: PropTypes.bool,
  scrollable: PropTypes.bool,
  customAnimation: PropTypes.object,
};

export default Modal;

