// src/components/ui/Card/index.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";

/**
 * Composant Card réutilisable avec différentes variantes et options
 */
const Card = ({
  children,
  title,
  subtitle,
  headerRight,
  headerIcon,
  headerIconColor = "#5E60CE",
  onPress,
  footer,
  footerStyle,
  style,
  contentStyle,
  withShadow = true,
  bordered = false,
  elevated = true,
  padding = true,
  margin = true,
  backgroundColor = "white",
  borderRadius = 10,
  testID,
}) => {
  // Déterminer si la carte est cliquable
  const isClickable = !!onPress;

  // Composant wrapper (TouchableOpacity ou View)
  const WrapperComponent = isClickable ? TouchableOpacity : View;

  // Props additionnelles pour le wrapper si cliquable
  const wrapperProps = isClickable ? { activeOpacity: 0.7, onPress } : {};

  // Déterminer si un header doit être affiché
  const showHeader = title || subtitle || headerRight || headerIcon;

  return (
    <WrapperComponent
      style={[
        styles.container,
        withShadow && styles.shadow,
        bordered && styles.bordered,
        elevated && styles.elevated,
        margin && styles.margin,
        { backgroundColor, borderRadius },
        style,
      ]}
      testID={testID}
      {...wrapperProps}
    >
      {/* Header (optionnel) */}
      {showHeader && (
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {headerIcon && (
              <Ionicons
                name={headerIcon}
                size={20}
                color={headerIconColor}
                style={styles.headerIcon}
              />
            )}
            <View style={styles.headerTextContainer}>
              {title && <Text style={styles.title}>{title}</Text>}
              {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>
          </View>

          {headerRight && <View style={styles.headerRight}>{headerRight}</View>}
        </View>
      )}

      {/* Contenu de la carte */}
      <View
        style={[styles.content, padding && styles.contentPadding, contentStyle]}
      >
        {children}
      </View>

      {/* Footer (optionnel) */}
      {footer && <View style={[styles.footer, footerStyle]}>{footer}</View>}
    </WrapperComponent>
  );
};

export default Card;
