
// src/components/layout/Header/index.js
import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

/**
 * Composant d'en-tête réutilisable pour les écrans de l'application
 */
const Header = ({
  title,
  showBackButton = true,
  onBackPress,
  rightComponent,
  rightIcon,
  onRightPress,
  backgroundColor = '#FFFFFF',
  textColor = '#1F2937',
  withShadow = true,
  withBottomBorder = false,
  withStatusBar = true,
  statusBarColor = '#FFFFFF',
  statusBarStyle = 'dark-content',
  condensed = false,
  largeTitleMode = false,
  subtitle,
}) => {
  const navigation = useNavigation();

  // Fonction pour le bouton retour
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
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
      ]}
    >
      {/* StatusBar (optionnel) */}
      {withStatusBar && (
        <StatusBar 
          backgroundColor={statusBarColor} 
          barStyle={statusBarStyle} 
        />
      )}

      {/* Mode titre large (style iOS) */}
      {largeTitleMode ? (
        <View style={styles.largeTitleWrapper}>
          {/* Ligne supérieure avec bouton retour et éventuel composant à droite */}
          <View style={styles.topRow}>
            {showBackButton && (
              <TouchableOpacity
                onPress={handleBackPress}
                style={styles.backButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons 
                  name="chevron-back" 
                  size={24} 
                  color={textColor} 
                />
              </TouchableOpacity>
            )}

            {/* Composant de droite (ou icône) */}
            {rightComponent || rightIcon ? (
              <View style={styles.rightComponentContainer}>
                {rightComponent ? (
                  rightComponent
                ) : (
                  <TouchableOpacity
                    onPress={onRightPress}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons 
                      name={rightIcon} 
                      size={24} 
                      color={textColor} 
                    />
                  </TouchableOpacity>
                )}
              </View>
            ) : null}
          </View>

          {/* Grand titre */}
          <Text style={[styles.largeTitle, { color: textColor }]}>
            {title}
          </Text>

          {/* Sous-titre (optionnel) */}
          {subtitle && (
            <Text style={styles.largeTitleSubtitle}>
              {subtitle}
            </Text>
          )}
        </View>
      ) : (
        // Mode standard (titre centré)
        <View style={styles.standardContainer}>
          {/* Bouton retour (optionnel) */}
          {showBackButton ? (
            <TouchableOpacity
              onPress={handleBackPress}
              style={styles.backButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons 
                name="chevron-back" 
                size={24} 
                color={textColor} 
              />
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
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>

          {/* Composant de droite (ou icône, ou placeholder) */}
          {rightComponent ? (
            rightComponent
          ) : rightIcon ? (
            <TouchableOpacity
              onPress={onRightPress}
              style={styles.rightButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons 
                name={rightIcon} 
                size={24} 
                color={textColor} 
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.placeholderButton} />
          )}
        </View>
      )}
    </View>
  );
};

export default Header;
