// src/components/ui/Card/index.js
import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "@/src/contexts/ThemeContext";
import styles from "./style";

/**
 * Composant Card réutilisable avec design amélioré et options supplémentaires
 */
const Card = ({
  children,
  title,
  subtitle,
  headerRight,
  headerIcon,
  headerIconColor,
  headerIconBackground = true,
  onPress,
  footer,
  footerStyle,
  style,
  titleStyle,
  subtitleStyle,
  contentStyle,
  withShadow = true,
  bordered = false,
  withSideBorder = false,
  elevated = true,
  padding = true,
  margin = true,
  badge,
  badgeStyle,
  badgeTextStyle,
  isActive = false,
  backgroundColor = "white",
  borderRadius = 12,
  testID,
}) => {
  // Récupération du contexte de thème
  const themeContext = useContext(ThemeContext);
  const colors = themeContext?.colors || { primary: "#5E60CE" };
  
  // Couleur de l'icône (utilise celle fournie en prop ou la couleur principale du thème)
  const iconColor = headerIconColor || colors.primary;
  
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
        withSideBorder && [styles.withSideBorder, { borderLeftColor: iconColor }],
        elevated && styles.elevated,
        margin && styles.margin,
        isActive && [styles.activeCard, { borderColor: iconColor }],
        { backgroundColor, borderRadius },
        style,
      ]}
      testID={testID}
      {...wrapperProps}
    >
      {/* Badge optionnel */}
      {badge && (
        <View style={[styles.cardBadge, { backgroundColor: `${iconColor}15` }, badgeStyle]}>
          <Text style={[styles.badgeText, { color: iconColor }, badgeTextStyle]}>
            {badge}
          </Text>
        </View>
      )}
      
      {/* Header (optionnel) */}
      {showHeader && (
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {headerIcon && (
              headerIconBackground ? (
                <View style={[styles.headerIconContainer, { backgroundColor: `${iconColor}15` }]}>
                  <Ionicons
                    name={headerIcon}
                    size={20}
                    color={iconColor}
                  />
                </View>
              ) : (
                <Ionicons
                  name={headerIcon}
                  size={20}
                  color={iconColor}
                  style={styles.headerIcon}
                />
              )
            )}
            <View style={styles.headerTextContainer}>
              {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
              {subtitle && <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>}
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