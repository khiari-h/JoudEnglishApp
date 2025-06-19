// src/components/ui/Card/index.js - Enhanced pour mobile badges
import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../../../contexts/ThemeContext";
import ProgressBar from "../ProgressBar";
import styles from "./style";

/**
 * Composant Card réutilisable avec support amélioré pour badges mobiles
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
  
  // Props pour barre de progression
  progress = null,
  progressColor,
  progressHeight = 8,
  progressStyle,
  showPercentage = false,
  percentageFormatter = (val) => `${Math.round(val)}%`,
  
  // =================== NOUVELLES PROPS MOBILE ===================
  // Support pour badge dans le titre (comme "Niveau [1]")
  titleBadge, // Texte du badge (ex: "1")
  titleBadgeColor, // Couleur du badge (ex: "#3b82f6")
  titleBadgeStyle, // Style custom du badge
  titleLayout = "row", // "row" | "column" - layout du header
  
  // Support pour icône à droite
  rightIcon, // Nom de l'icône (ex: "🌱")
  rightIconStyle, // Style de l'icône
  
  // Mode compact mobile
  compactMode = false, // Active le mode compact
  
  // Support pour overlay (ex: niveau verrouillé)
  showOverlay = false,
  overlayContent, // Contenu de l'overlay
  overlayStyle, // Style de l'overlay
}) => {
  // Récupération du contexte de thème
  const themeContext = useContext(ThemeContext);
  const colors = themeContext?.colors || { primary: "#5E60CE" };

  // Couleur de l'icône
  const iconColor = headerIconColor || colors.primary;
  
  // Couleur de la barre de progression
  const fillColor = progressColor || iconColor;
  
  // Couleur du badge titre
  const badgeColor = titleBadgeColor || iconColor;

  // Déterminer si la carte est cliquable
  const isClickable = Boolean(onPress);
  const WrapperComponent = isClickable ? TouchableOpacity : View;
  const wrapperProps = isClickable ? { activeOpacity: 0.7, onPress } : {};

  // Déterminer si un header doit être affiché
  const showHeader = title || subtitle || headerRight || headerIcon || titleBadge;
  
  // Déterminer si une barre de progression doit être affichée
  const showProgressBar = progress !== null;

  // =================== RENDER HEADER MOBILE ===================
  const renderMobileHeader = () => {
    if (!showHeader) return null;

    return (
      <View style={[
        styles.header,
        titleLayout === "column" && styles.headerColumn,
        compactMode && styles.headerCompact
      ]}>
        <View style={[
          styles.headerLeft,
          titleLayout === "column" && styles.headerLeftColumn
        ]}>
          {/* Icône header (si présente) */}
          {headerIcon && (
            headerIconBackground ? (
              <View style={[
                styles.headerIconContainer,
                { backgroundColor: `${iconColor}15` },
                compactMode && styles.headerIconContainerCompact
              ]}>
                <Ionicons name={headerIcon} size={compactMode ? 18 : 20} color={iconColor} />
              </View>
            ) : (
              <Ionicons
                name={headerIcon}
                size={compactMode ? 18 : 20}
                color={iconColor}
                style={styles.headerIcon}
              />
            )
          )}
          
          {/* Conteneur de texte avec badge */}
          <View style={styles.headerTextContainer}>
            {/* Titre avec badge inline */}
            {title && (
              <View style={styles.titleWithBadgeContainer}>
                <Text style={[
                  styles.title,
                  { color: titleStyle?.color || "#1F2937" },
                  compactMode && styles.titleCompact,
                  titleStyle
                ]}>
                  {title}
                </Text>
                
                {/* Badge dans le titre */}
                {titleBadge && (
                  <View style={[
                    styles.titleBadge,
                    { backgroundColor: badgeColor },
                    compactMode && styles.titleBadgeCompact,
                    titleBadgeStyle
                  ]}>
                    <Text style={[
                      styles.titleBadgeText,
                      compactMode && styles.titleBadgeTextCompact,
                      badgeTextStyle
                    ]}>
                      {titleBadge}
                    </Text>
                  </View>
                )}
              </View>
            )}
            
            {/* Sous-titre */}
            {subtitle && (
              <Text style={[
                styles.subtitle,
                compactMode && styles.subtitleCompact,
                subtitleStyle
              ]}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>

        {/* Partie droite du header */}
        <View style={styles.headerRight}>
          {/* Icône à droite (ex: emoji) */}
          {rightIcon && (
            <Text style={[
              styles.rightIconText,
              compactMode && styles.rightIconTextCompact,
              rightIconStyle
            ]}>
              {rightIcon}
            </Text>
          )}
          
          {/* Composant header right */}
          {headerRight}
        </View>
      </View>
    );
  };

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
        compactMode && styles.containerCompact,
        { backgroundColor, borderRadius },
        style,
      ]}
      testID={testID}
      {...wrapperProps}
    >
      {/* Badge optionnel (coin supérieur) */}
      {badge && (
        <View style={[
          styles.cardBadge,
          { backgroundColor: `${iconColor}15` },
          badgeStyle,
        ]}>
          <Text style={[styles.badgeText, { color: iconColor }, badgeTextStyle]}>
            {badge}
          </Text>
        </View>
      )}

      {/* Header mobile amélioré */}
      {renderMobileHeader()}

      {/* Contenu de la carte */}
      <View style={[
        styles.content,
        padding && styles.contentPadding,
        compactMode && styles.contentCompact,
        contentStyle
      ]}>
        {children}

        {/* Barre de progression */}
        {showProgressBar && (
          <ProgressBar
            progress={progress}
            fillColor={fillColor}
            height={progressHeight}
            backgroundColor={`${fillColor}15`}
            borderRadius={Math.floor(progressHeight / 2)}
            showPercentage={showPercentage}
            percentageFormatter={percentageFormatter}
            style={[
              { marginTop: compactMode ? 8 : 12, marginBottom: compactMode ? 4 : 8 },
              progressStyle
            ]}
          />
        )}
      </View>

      {/* Footer */}
      {footer && (
        <View style={[styles.footer, footerStyle]}>
          {footer}
        </View>
      )}

      {/* Overlay (ex: niveau verrouillé) */}
      {showOverlay && (
        <View style={[styles.overlay, overlayStyle]}>
          {overlayContent}
        </View>
      )}
    </WrapperComponent>
  );
};

export default Card;