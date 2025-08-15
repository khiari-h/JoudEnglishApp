// src/components/ui/Card/index.js - CORRIGÉ pour éliminer les 16 violations SonarQube
import { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { ThemeContext } from "../../../contexts/ThemeContext";
import ProgressBar from "../ProgressBar";
import styles from "./style";

// Composant CardBadge extrait
const CardBadge = ({ badge, iconColor, badgeStyle, badgeTextStyle }) => {
  if (!badge) return null;
  return (
    <View style={[
      styles.cardBadge,
      { backgroundColor: `${iconColor}15` },
      badgeStyle,
    ]}>
      <Text style={[styles.badgeText, { color: iconColor }, badgeTextStyle]}>
        {badge}
      </Text>
    </View>
  );
};

// PropTypes pour CardBadge
CardBadge.propTypes = {
  badge: PropTypes.string,
  iconColor: PropTypes.string.isRequired,
  badgeStyle: PropTypes.object,
  badgeTextStyle: PropTypes.object,
};

// Composant CardContent extrait
const CardContent = ({
  children,
  padding,
  compactMode,
  contentStyle,
  showProgressBar,
  progress,
  fillColor,
  progressHeight,
  showPercentage,
  percentageFormatter,
  progressStyle
}) => (
  <View style={[
    styles.content,
    padding && styles.contentPadding,
    compactMode && styles.contentCompact,
    contentStyle
  ]}>
    {children}
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
);

// PropTypes pour CardContent
CardContent.propTypes = {
  children: PropTypes.node,
  padding: PropTypes.bool,
  compactMode: PropTypes.bool,
  contentStyle: PropTypes.object,
  showProgressBar: PropTypes.bool,
  progress: PropTypes.number,
  fillColor: PropTypes.string,
  progressHeight: PropTypes.number,
  showPercentage: PropTypes.bool,
  percentageFormatter: PropTypes.func,
  progressStyle: PropTypes.object,
};

// Composant CardFooter extrait
const CardFooter = ({ footer, footerStyle }) => {
  if (!footer) return null;
  return <View style={[styles.footer, footerStyle]}>{footer}</View>;
};

// PropTypes pour CardFooter
CardFooter.propTypes = {
  footer: PropTypes.node,
  footerStyle: PropTypes.object,
};

// Composant CardOverlay extrait
const CardOverlay = ({ showOverlay, overlayContent, overlayStyle }) => {
  if (!showOverlay) return null;
  return <View style={[styles.overlay, overlayStyle]}>{overlayContent}</View>;
};

// PropTypes pour CardOverlay
CardOverlay.propTypes = {
  showOverlay: PropTypes.bool,
  overlayContent: PropTypes.node,
  overlayStyle: PropTypes.object,
};

// Composant HeaderIcon extrait
const HeaderIcon = ({ headerIcon, iconColor, headerIconBackground, compactMode }) => {
  if (!headerIcon) return null;
  
  if (headerIconBackground) {
    return (
      <View style={[
        styles.headerIconContainer,
        { backgroundColor: `${iconColor}15` },
        compactMode && styles.headerIconContainerCompact
      ]}>
        <Ionicons name={headerIcon} size={compactMode ? 18 : 20} color={iconColor} />
      </View>
    );
  }
  
  return (
    <Ionicons
      name={headerIcon}
      size={compactMode ? 18 : 20}
      color={iconColor}
      style={styles.headerIcon}
    />
  );
};

// PropTypes pour HeaderIcon
HeaderIcon.propTypes = {
  headerIcon: PropTypes.string,
  iconColor: PropTypes.string.isRequired,
  headerIconBackground: PropTypes.bool,
  compactMode: PropTypes.bool,
};

// Composant TitleWithBadge extrait
const TitleWithBadge = ({ title, titleBadge, badgeColor, compactMode, titleStyle, titleBadgeStyle, badgeTextStyle }) => {
  if (!title) return null;
  
  return (
    <View style={styles.titleWithBadgeContainer}>
      <Text style={[
        styles.title,
        { color: titleStyle?.color || "#1F2937" },
        compactMode && styles.titleCompact,
        titleStyle
      ]}>
        {title}
      </Text>
      
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
  );
};

// PropTypes pour TitleWithBadge
TitleWithBadge.propTypes = {
  title: PropTypes.string,
  titleBadge: PropTypes.string,
  badgeColor: PropTypes.string,
  compactMode: PropTypes.bool,
  titleStyle: PropTypes.shape({
    color: PropTypes.string,
  }),
  titleBadgeStyle: PropTypes.object,
  badgeTextStyle: PropTypes.object,
};

// Composant HeaderRight extrait
const HeaderRight = ({ rightIcon, headerRight, compactMode, rightIconStyle }) => (
  <View style={styles.headerRight}>
    {rightIcon && (
      <Text style={[
        styles.rightIconText,
        compactMode && styles.rightIconTextCompact,
        rightIconStyle
      ]}>
        {rightIcon}
      </Text>
    )}
    {headerRight}
  </View>
);

// PropTypes pour HeaderRight
HeaderRight.propTypes = {
  rightIcon: PropTypes.string,
  headerRight: PropTypes.node,
  compactMode: PropTypes.bool,
  rightIconStyle: PropTypes.object,
};

// Fonction renderMobileHeader simplifiée
const renderMobileHeader = (props) => {
  const { showHeader, titleLayout, compactMode, headerIcon, iconColor, headerIconBackground, title, titleBadge, badgeColor, titleStyle, titleBadgeStyle, badgeTextStyle, subtitle, subtitleStyle, rightIcon, rightIconStyle, headerRight } = props;
  
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
        <HeaderIcon 
          headerIcon={headerIcon} 
          iconColor={iconColor} 
          headerIconBackground={headerIconBackground} 
          compactMode={compactMode} 
        />
        
        <View style={styles.headerTextContainer}>
          <TitleWithBadge 
            title={title}
            titleBadge={titleBadge}
            badgeColor={badgeColor}
            compactMode={compactMode}
            titleStyle={titleStyle}
            titleBadgeStyle={titleBadgeStyle}
            badgeTextStyle={badgeTextStyle}
          />
          
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

      <HeaderRight 
        rightIcon={rightIcon}
        headerRight={headerRight}
        compactMode={compactMode}
        rightIconStyle={rightIconStyle}
      />
    </View>
  );
};

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

  // Props pour renderMobileHeader
  const headerProps = {
    showHeader,
    titleLayout,
    compactMode,
    headerIcon,
    iconColor,
    headerIconBackground,
    title,
    titleBadge,
    badgeColor,
    titleStyle,
    titleBadgeStyle,
    badgeTextStyle,
    subtitle,
    subtitleStyle,
    rightIcon,
    rightIconStyle,
    headerRight
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
      {renderMobileHeader(headerProps)}
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

// PropTypes pour Card
Card.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  headerRight: PropTypes.node,
  headerIcon: PropTypes.string,
  headerIconColor: PropTypes.string,
  headerIconBackground: PropTypes.bool,
  onPress: PropTypes.func,
  footer: PropTypes.node,
  footerStyle: PropTypes.object,
  style: PropTypes.object,
  titleStyle: PropTypes.object,
  subtitleStyle: PropTypes.object,
  contentStyle: PropTypes.object,
  withShadow: PropTypes.bool,
  bordered: PropTypes.bool,
  withSideBorder: PropTypes.bool,
  elevated: PropTypes.bool,
  padding: PropTypes.bool,
  margin: PropTypes.bool,
  badge: PropTypes.string,
  badgeStyle: PropTypes.object,
  badgeTextStyle: PropTypes.object,
  isActive: PropTypes.bool,
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.number,
  testID: PropTypes.string,
  progress: PropTypes.number,
  progressColor: PropTypes.string,
  progressHeight: PropTypes.number,
  progressStyle: PropTypes.object,
  showPercentage: PropTypes.bool,
  percentageFormatter: PropTypes.func,
  titleBadge: PropTypes.string,
  titleBadgeColor: PropTypes.string,
  titleBadgeStyle: PropTypes.object,
  titleLayout: PropTypes.oneOf(['row', 'column']),
  rightIcon: PropTypes.string,
  rightIconStyle: PropTypes.object,
  compactMode: PropTypes.bool,
  showOverlay: PropTypes.bool,
  overlayContent: PropTypes.node,
  overlayStyle: PropTypes.object,
};

export default Card;