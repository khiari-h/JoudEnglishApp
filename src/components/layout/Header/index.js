// src/components/layout/Header/index.js
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import PropTypes from 'prop-types';
import styles from "./style";

/**
 * Composant d'en-tête réutilisable pour les écrans de l'application
 * avec support amélioré pour le contenu personnalisé
 */
const Header = ({
  // Options de base
  title,
  showBackButton = true,
  onBackPress,
  rightComponent,
  rightIcon,
  onRightPress,

  // Style et apparence
  backgroundColor = "#FFFFFF",
  textColor = "#1F2937",
  withShadow = true,
  withBottomBorder = false,
  withStatusBar = true,
  statusBarColor = "#FFFFFF",
  statusBarStyle = "dark-content",
  condensed = false,

  // Mode titre large
  largeTitleMode = false,
  subtitle,

  // Nouveaux paramètres pour plus de flexibilité
  leftComponent, // Composant personnalisé à gauche (remplace le bouton retour si fourni)
  bottomComponent, // Composant personnalisé sous le titre/sous-titre
  children, // Contenu personnalisé pour le header (remplace tout le contenu standard si fourni)
  contentContainerStyle, // Style pour le conteneur de contenu
  titleContainerStyle, // Style pour le conteneur de titre
}) => {
  const navigation = useNavigation();

  // Fonction pour le bouton retour
  const handleBackPress = useCallback(() => {
    if (onBackPress) {
      onBackPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [onBackPress, navigation]);

  // ✅ Extraction de la logique conditionnelle pour améliorer la lisibilité
  
  // Fonction pour déterminer le composant gauche
  const renderLeftComponent = () => {
    if (leftComponent) return leftComponent;
    if (showBackButton) {
      return (
        <TouchableOpacity
          onPress={handleBackPress}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityRole="button"
          testID="back-button"
        >
          <Ionicons name="chevron-back" size={24} color={textColor} />
        </TouchableOpacity>
      );
    }
    return <View style={styles.placeholderButton} />;
  };
  
  // Fonction pour déterminer le composant droit
// Dans renderRightComponent :
const renderRightComponent = () => {
  if (rightComponent) return rightComponent;
  if (rightIcon) {
    // Vérifier si c'est un emoji ou un nom d'icône
    const isEmoji = rightIcon.length <= 2 && /\p{Emoji}/u.test(rightIcon);
    
    return (
      <TouchableOpacity onPress={onRightPress} style={styles.rightButton}>
        {isEmoji ? (
          <Text style={styles.emojiIcon}>{rightIcon}</Text>
        ) : (
          <Ionicons name={rightIcon} size={24} color={textColor} />
        )}
      </TouchableOpacity>
    );
  }
  return <View style={styles.placeholderButton} />;
};
  
  // Fonction pour déterminer le composant droit en mode titre large
  const renderLargeTitleRightComponent = () => {
    if (rightComponent) {
      return <View style={styles.rightComponentContainer}>{rightComponent}</View>;
    }
    if (rightIcon) {
      return (
        <TouchableOpacity
          onPress={onRightPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name={rightIcon} size={24} color={textColor} />
        </TouchableOpacity>
      );
    }
    return null;
  };

  // Rendu du contenu standard du header
  const renderStandardContent = () => (
    <View style={styles.standardContainer}>
      {/* Composant gauche ou bouton retour */}
      {renderLeftComponent()}

      {/* Titre */}
      <Text
        style={[
          styles.title,
          { color: textColor },
          condensed && styles.condensedTitle,
          titleContainerStyle,
        ]}
        numberOfLines={1}
      >
        {title}
      </Text>

      {/* Composant droite ou icône */}
      {renderRightComponent()}
    </View>
  );

  // Rendu du contenu en mode titre large
  const renderLargeTitleContent = () => (
    <View style={styles.largeTitleWrapper}>
      {/* Ligne supérieure avec bouton retour et éventuel composant à droite */}
      <View style={styles.topRow}>
        {renderLeftComponent()}

        {/* Composant de droite (ou icône) */}
        {renderLargeTitleRightComponent()}
      </View>

      {/* Conteneur de titre avec style personnalisable */}
      <View style={titleContainerStyle}>
        {/* Grand titre */}
        <Text style={[styles.largeTitle, { color: textColor }]}>{title}</Text>

        {/* Sous-titre (optionnel) */}
        {subtitle && <Text style={styles.largeTitleSubtitle}>{subtitle}</Text>}
      </View>

      {/* Composant supplémentaire sous le titre (si fourni) */}
      {bottomComponent && (
        <View style={styles.bottomComponentContainer}>{bottomComponent}</View>
      )}
    </View>
  );

  // ✅ Fonction pour déterminer le contenu principal
  const renderMainContent = () => {
    if (children) {
      return <View style={styles.childrenContainer}>{children}</View>;
    }
    if (largeTitleMode) {
      return renderLargeTitleContent();
    }
    return renderStandardContent();
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor },
        withShadow && styles.withShadow,
        withBottomBorder && styles.withBorder,
        condensed && styles.condensed,
        largeTitleMode && styles.largeTitleContainer,
        contentContainerStyle,
      ]}
    >
      {/* StatusBar (optionnel) */}
      {withStatusBar && (
        <StatusBar backgroundColor={statusBarColor} barStyle={statusBarStyle} />
      )}

      {/* Contenu personnalisé ou contenu standard */}
      {renderMainContent()}
    </View>
  );
};

// PropTypes pour le composant Header
Header.propTypes = {
  // Options de base
  title: PropTypes.string,
  showBackButton: PropTypes.bool,
  onBackPress: PropTypes.func,
  rightComponent: PropTypes.node,
  rightIcon: PropTypes.string,
  onRightPress: PropTypes.func,

  // Style et apparence
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  withShadow: PropTypes.bool,
  withBottomBorder: PropTypes.bool,
  withStatusBar: PropTypes.bool,
  statusBarColor: PropTypes.string,
  statusBarStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content']),
  condensed: PropTypes.bool,

  // Mode titre large
  largeTitleMode: PropTypes.bool,
  subtitle: PropTypes.string,

  // Composants personnalisés
  leftComponent: PropTypes.node,
  bottomComponent: PropTypes.node,
  children: PropTypes.node,
  contentContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  titleContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Header;

