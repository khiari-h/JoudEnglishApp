import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "@/src/contexts/ThemeContext";
import ProgressBar from "@/src/components/ui/ProgressBar";
import styles from "./style";

/**
 * Composant Card réutilisable avec design amélioré et options supplémentaires
 * incluant une option de barre de progression
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
  // Nouvelles props pour la barre de progression
  progress = null, // Valeur de progression (null = pas de barre)
  progressColor, // Couleur de la barre (optionnel, utilise headerIconColor par défaut)
  progressHeight = 8,
  progressStyle,
  showPercentage = false,
  percentageFormatter = (val) => `${Math.round(val)}%`,
}) => {
  // Récupération du contexte de thème
  const themeContext = useContext(ThemeContext);
  const colors = themeContext?.colors || { primary: "#5E60CE" };

  // Couleur de l'icône (utilise celle fournie en prop ou la couleur principale du thème)
  const iconColor = headerIconColor || colors.primary;

  // Couleur de la barre de progression (utilise progressColor, ou iconColor, ou primary)
  const fillColor = progressColor || iconColor;

  // Déterminer si la carte est cliquable
  const isClickable = !!onPress;

  // Composant wrapper (TouchableOpacity ou View)
  const WrapperComponent = isClickable ? TouchableOpacity : View;

  // Props additionnelles pour le wrapper si cliquable
  const wrapperProps = isClickable ? { activeOpacity: 0.7, onPress } : {};

  // Déterminer si un header doit être affiché
  const showHeader = title || subtitle || headerRight || headerIcon;

  // Déterminer si une barre de progression doit être affichée - Modifié pour l'afficher même à 0%
  const showProgressBar = progress !== null;

  return (
    <WrapperComponent
      style={[
        styles.container,
        withShadow && styles.shadow,
        bordered && styles.bordered,
        withSideBorder && [
          styles.withSideBorder,
          { borderLeftColor: iconColor },
        ],
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
        <View
          style={[
            styles.cardBadge,
            { backgroundColor: `${iconColor}15` },
            badgeStyle,
          ]}
        >
          <Text
            style={[styles.badgeText, { color: iconColor }, badgeTextStyle]}
          >
            {badge}
          </Text>
        </View>
      )}

      {/* Header (optionnel) */}
      {showHeader && (
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {headerIcon &&
              (headerIconBackground ? (
                <View
                  style={[
                    styles.headerIconContainer,
                    { backgroundColor: `${iconColor}15` },
                  ]}
                >
                  <Ionicons name={headerIcon} size={20} color={iconColor} />
                </View>
              ) : (
                <Ionicons
                  name={headerIcon}
                  size={20}
                  color={iconColor}
                  style={styles.headerIcon}
                />
              ))}
            <View style={styles.headerTextContainer}>
              {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
              {subtitle && (
                <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
              )}
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

        {/* Barre de progression (optionnelle) - Affichée même à 0% */}
        {showProgressBar && (
          <ProgressBar
            progress={progress}
            fillColor={fillColor}
            height={progressHeight}
            backgroundColor={`${fillColor}15`}
            borderRadius={Math.floor(progressHeight / 2)}
            showPercentage={showPercentage}
            percentageFormatter={percentageFormatter}
            style={[{ marginTop: 12, marginBottom: 8 }, progressStyle]}
          />
        )}
      </View>

      {/* Footer (optionnel) */}
      {footer && <View style={[styles.footer, footerStyle]}>{footer}</View>}
    </WrapperComponent>
  );
};

export default Card;