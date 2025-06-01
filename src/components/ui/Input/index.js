// src/components/ui/Input/index.js
import React, { useState, useRef, forwardRef } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Animated,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";

/**
 * Composant Input pour les champs de saisie de texte
 * avec différentes variantes et états
 */
const Input = forwardRef(
  (
    {
      // Valeur et manipulation
      value,
      onChangeText,
      defaultValue,
      placeholder = "",
      keyboardType = "default",
      autoCapitalize = "none",
      secureTextEntry = false,
      autoFocus = false,
      editable = true,
      returnKeyType,

      // Apparence
      variant = "outlined", // 'outlined', 'underlined', 'filled'
      size = "medium", // 'small', 'medium', 'large'
      label,
      hint,
      error,
      success,
      required = false,
      floatingLabel = false,

      // Icônes et boutons
      leftIcon,
      rightIcon,
      leftIconColor = "#6B7280",
      rightIconColor = "#6B7280",
      showClearButton = false,
      showPasswordToggle = false,

      // Fonction de callback
      onSubmitEditing,
      onFocus,
      onBlur,
      onPressLeftIcon,
      onPressRightIcon,
      onPressClear,

      // Validation
      validate,

      // Style
      style,
      labelStyle,
      inputStyle,
      hintStyle,
      errorStyle,
      successStyle,
      containerStyle,

      // Autres props pour TextInput
      ...textInputProps
    },
    ref
  ) => {
    // États locaux
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(
      !secureTextEntry
    );
    const [internalValue, setInternalValue] = useState(defaultValue || "");
    const [validationError, setValidationError] = useState("");

    // Animation pour le label flottant
    const labelAnim = useRef(
      new Animated.Value(value || defaultValue ? 1 : 0)
    ).current;

    // Référence au TextInput
    const inputRef = useRef(null);

    // Combiner les références (celle passée en prop et la référence locale)
    const handleRef = (el) => {
      inputRef.current = el;
      if (ref) {
        if (typeof ref === "function") {
          ref(el);
        } else {
          ref.current = el;
        }
      }
    };

    // Gérer le focus
    const handleFocus = (e) => {
      setIsFocused(true);

      if (floatingLabel) {
        Animated.timing(labelAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }

      if (onFocus) {
        onFocus(e);
      }
    };

    // Gérer la perte de focus
    const handleBlur = (e) => {
      setIsFocused(false);

      // Animer le label de retour si nécessaire
      if (floatingLabel && !(value || internalValue)) {
        Animated.timing(labelAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }

      // Valider à la perte de focus
      if (validate) {
        const result = validate(value || internalValue);
        setValidationError(result || "");
      }

      if (onBlur) {
        onBlur(e);
      }
    };

    // Gérer le changement de texte
    const handleChangeText = (text) => {
      setInternalValue(text);

      if (onChangeText) {
        onChangeText(text);
      }

      // Effacer l'erreur de validation lorsque l'utilisateur tape
      if (validationError) {
        setValidationError("");
      }
    };

    // Gérer la soumission
    const handleSubmitEditing = (e) => {
      if (validate) {
        const result = validate(value || internalValue);
        setValidationError(result || "");

        if (result && onSubmitEditing) {
          return;
        }
      }

      if (onSubmitEditing) {
        onSubmitEditing(e);
      }
    };

    // Effacer le texte
    const handleClear = () => {
      setInternalValue("");
      if (onChangeText) {
        onChangeText("");
      }
      if (onPressClear) {
        onPressClear();
      }
      inputRef.current?.focus();
    };

    // Basculer la visibilité du mot de passe
    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    // Déterminer les styles de la variante
    const getVariantStyles = () => {
      switch (variant) {
        case "underlined":
          return {
            container: styles.underlinedContainer,
            input: styles.underlinedInput,
            focused: styles.underlinedFocused,
            error: styles.underlinedError,
            success: styles.underlinedSuccess,
          };
        case "filled":
          return {
            container: styles.filledContainer,
            input: styles.filledInput,
            focused: styles.filledFocused,
            error: styles.filledError,
            success: styles.filledSuccess,
          };
        case "outlined":
        default:
          return {
            container: styles.outlinedContainer,
            input: styles.outlinedInput,
            focused: styles.outlinedFocused,
            error: styles.outlinedError,
            success: styles.outlinedSuccess,
          };
      }
    };

    // Déterminer les styles de taille
    const getSizeStyles = () => {
      switch (size) {
        case "small":
          return {
            container: styles.smallContainer,
            input: styles.smallInput,
            label: styles.smallLabel,
            icon: styles.smallIcon,
            iconSize: 16,
          };
        case "large":
          return {
            container: styles.largeContainer,
            input: styles.largeInput,
            label: styles.largeLabel,
            icon: styles.largeIcon,
            iconSize: 24,
          };
        case "medium":
        default:
          return {
            container: styles.mediumContainer,
            input: styles.mediumInput,
            label: styles.mediumLabel,
            icon: styles.mediumIcon,
            iconSize: 20,
          };
      }
    };

    const variantStyles = getVariantStyles();
    const sizeStyles = getSizeStyles();

    // Déterminer les styles d'état
    const getStateStyles = () => {
      if (error || validationError) {
        return variantStyles.error;
      }
      if (success) {
        return variantStyles.success;
      }
      if (isFocused) {
        return variantStyles.focused;
      }
      return {};
    };

    // Pour le label flottant, calculer les positions animées
    const getLabelPosition = () => {
      if (!floatingLabel) return {};

      const translateY = labelAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -25],
      });

      const fontSize = labelAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [sizeStyles.label.fontSize, 12],
      });

      return {
        transform: [{ translateY }],
        fontSize,
      };
    };

    // Rendu du label (flottant ou statique)
    const renderLabel = () => {
      if (!label) return null;

      const labelText = (
        <>
          {label}
          {required && <Text style={styles.requiredMark}>*</Text>}
        </>
      );

      if (floatingLabel) {
        return (
          <Animated.Text
            style={[
              styles.label,
              sizeStyles.label,
              getLabelPosition(),
              error || validationError ? styles.errorLabel : null,
              success ? styles.successLabel : null,
              labelStyle,
            ]}
            onPress={() => inputRef.current?.focus()}
          >
            {labelText}
          </Animated.Text>
        );
      }

      return (
        <Text
          style={[
            styles.label,
            sizeStyles.label,
            error || validationError ? styles.errorLabel : null,
            success ? styles.successLabel : null,
            labelStyle,
          ]}
        >
          {labelText}
        </Text>
      );
    };

    // Rendu des messages d'erreur, d'indice, de succès
    const renderMessages = () => {
      if (error || validationError) {
        return (
          <Text style={[styles.errorText, errorStyle]}>
            {error || validationError}
          </Text>
        );
      }

      if (success) {
        return (
          <Text style={[styles.successText, successStyle]}>
            {typeof success === "string" ? success : "Validation réussie"}
          </Text>
        );
      }

      if (hint) {
        return <Text style={[styles.hintText, hintStyle]}>{hint}</Text>;
      }

      return null;
    };

    return (
      <View style={[styles.container, containerStyle]}>
        {/* Label (si non flottant ou si flottant mais pas de focus/valeur) */}
        {label && !floatingLabel && renderLabel()}

        {/* Container principal de l'input */}
        <View
          style={[
            styles.inputContainer,
            variantStyles.container,
            sizeStyles.container,
            getStateStyles(),
            style,
          ]}
        >
          {/* Label flottant */}
          {floatingLabel && renderLabel()}

          {/* Icône de gauche */}
          {leftIcon && (
            <TouchableOpacity
              style={styles.leftIconContainer}
              onPress={onPressLeftIcon}
              disabled={!onPressLeftIcon}
            >
              <Ionicons
                name={leftIcon}
                size={sizeStyles.iconSize}
                color={leftIconColor}
                style={sizeStyles.icon}
              />
            </TouchableOpacity>
          )}

          {/* Input */}
          <TextInput
            ref={handleRef}
            style={[
              styles.input,
              variantStyles.input,
              sizeStyles.input,
              leftIcon && styles.inputWithLeftIcon,
              (rightIcon || showClearButton || showPasswordToggle) &&
                styles.inputWithRightIcon,
              inputStyle,
            ]}
            value={value !== undefined ? value : internalValue}
            onChangeText={handleChangeText}
            placeholder={
              !floatingLabel || isFocused || value || internalValue
                ? placeholder
                : ""
            }
            placeholderTextColor="#9CA3AF"
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            secureTextEntry={
              showPasswordToggle ? !isPasswordVisible : secureTextEntry
            }
            
            editable={editable}
            returnKeyType={returnKeyType}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onSubmitEditing={handleSubmitEditing}
            {...textInputProps}
          />

          {/* Bouton d'effacement */}
          {showClearButton && (value || internalValue) && (
            <TouchableOpacity
              style={styles.rightIconContainer}
              onPress={handleClear}
            >
              <Ionicons
                name="close-circle"
                size={sizeStyles.iconSize}
                color="#9CA3AF"
                style={sizeStyles.icon}
              />
            </TouchableOpacity>
          )}

          {/* Bouton de basculement de visibilité du mot de passe */}
          {showPasswordToggle && (
            <TouchableOpacity
              style={styles.rightIconContainer}
              onPress={togglePasswordVisibility}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={sizeStyles.iconSize}
                color="#9CA3AF"
                style={sizeStyles.icon}
              />
            </TouchableOpacity>
          )}

          {/* Icône de droite */}
          {rightIcon && !showClearButton && !showPasswordToggle && (
            <TouchableOpacity
              style={styles.rightIconContainer}
              onPress={onPressRightIcon}
              disabled={!onPressRightIcon}
            >
              <Ionicons
                name={rightIcon}
                size={sizeStyles.iconSize}
                color={rightIconColor}
                style={sizeStyles.icon}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Messages (erreur, indice, succès) */}
        {renderMessages()}
      </View>
    );
  }
);

export default Input;
