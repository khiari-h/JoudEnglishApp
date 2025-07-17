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

  // Rendu du contenu standard du header
  const renderStandardContent = () => (
    <View style={styles.standardContainer}>
      {/* Composant gauche ou bouton retour */}
      {leftComponent ? (
        leftComponent
      ) : showBackButton ? (
        <TouchableOpacity
          onPress={handleBackPress}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityRole="button"
        >
          <Ionicons name="chevron-back" size={24} color={textColor} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholderButton} />
      )}

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
      {rightComponent ? (
        rightComponent
      ) : rightIcon ? (
        <TouchableOpacity
          onPress={onRightPress}
          style={styles.rightButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name={rightIcon} size={24} color={textColor} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholderButton} />
      )}
    </View>
  );

  // Rendu du contenu en mode titre large
  const renderLargeTitleContent = () => (
    <View style={styles.largeTitleWrapper}>
      {/* Ligne supérieure avec bouton retour et éventuel composant à droite */}
      <View style={styles.topRow}>
        {leftComponent ? (
          leftComponent
        ) : showBackButton ? (
          <TouchableOpacity
            onPress={handleBackPress}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={24} color={textColor} />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholderButton} />
        )}

        {/* Composant de droite (ou icône) */}
        {rightComponent ? (
          <View style={styles.rightComponentContainer}>{rightComponent}</View>
        ) : rightIcon ? (
          <TouchableOpacity
            onPress={onRightPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name={rightIcon} size={24} color={textColor} />
          </TouchableOpacity>
        ) : null}
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
      {children ? (
        <View style={styles.childrenContainer}>{children}</View>
      ) : largeTitleMode ? (
        renderLargeTitleContent()
      ) : (
        renderStandardContent()
      )}
    </View>
  );
};

export default Header;

