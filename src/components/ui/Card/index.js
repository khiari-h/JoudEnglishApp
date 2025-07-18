// src/components/ui/Card/index.js - Enhanced pour mobile badges
import { useContext } from "react";
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

  // Sous-composant pour le badge
  const CardBadge = ({ badge: cardBadge, iconColor: cardIconColor, badgeStyle: cardBadgeStyle, badgeTextStyle: cardBadgeTextStyle }) => {
    if (!cardBadge) return null;
    return (
      <View style={[
        styles.cardBadge,
        { backgroundColor: `${cardIconColor}15` },
        cardBadgeStyle,
      ]}>
        <Text style={[styles.badgeText, { color: cardIconColor }, cardBadgeTextStyle]}>
          {cardBadge}
        </Text>
      </View>
    );
  };

  // Sous-composant pour le contenu principal (inclut la progress bar)
  const CardContent = ({
    children: cardChildren,
    padding: cardPadding,
    compactMode: cardCompactMode,
    contentStyle: cardContentStyle,
    showProgressBar: cardShowProgressBar,
    progress: cardProgress,
    fillColor: cardFillColor,
    progressHeight: cardProgressHeight,
    showPercentage: cardShowPercentage,
    percentageFormatter: cardPercentageFormatter,
    progressStyle: cardProgressStyle
  }) => (
    <View style={[
      styles.content,
      cardPadding && styles.contentPadding,
      cardCompactMode && styles.contentCompact,
      cardContentStyle
    ]}>
      {cardChildren}
      {cardShowProgressBar && (
        <ProgressBar
          progress={cardProgress}
          fillColor={cardFillColor}
          height={cardProgressHeight}
          backgroundColor={`${cardFillColor}15`}
          borderRadius={Math.floor(cardProgressHeight / 2)}
          showPercentage={cardShowPercentage}
          percentageFormatter={cardPercentageFormatter}
          style={[
            { marginTop: cardCompactMode ? 8 : 12, marginBottom: cardCompactMode ? 4 : 8 },
            cardProgressStyle
          ]}
        />
      )}
    </View>
  );

  // Sous-composant pour le footer
  const CardFooter = ({ footer: localFooter, footerStyle: localFooterStyle }) => {
    if (!localFooter) return null;
    return <View style={[styles.footer, localFooterStyle]}>{localFooter}</View>;
  };

  // Sous-composant pour l'overlay
  const CardOverlay = ({ showOverlay: localShowOverlay, overlayContent: localOverlayContent, overlayStyle: localOverlayStyle }) => {
    if (!localShowOverlay) return null;
    return <View style={[styles.overlay, localOverlayStyle]}>{localOverlayContent}</View>;
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
      <CardBadge badge={badge} iconColor={iconColor} badgeStyle={badgeStyle} badgeTextStyle={badgeTextStyle} />
      {renderMobileHeader()}
      <CardContent
        padding={padding}
        compactMode={compactMode}
        contentStyle={contentStyle}
        showProgressBar={showProgressBar}
        progress={progress}
        fillColor={fillColor}
        progressHeight={progressHeight}
        showPercentage={showPercentage}
        percentageFormatter={percentageFormatter}
        progressStyle={progressStyle}
      >
        {children}
      </CardContent>
      <CardFooter footer={footer} footerStyle={footerStyle} />
      <CardOverlay showOverlay={showOverlay} overlayContent={overlayContent} overlayStyle={overlayStyle} />
    </WrapperComponent>
  );
};

export default Card;