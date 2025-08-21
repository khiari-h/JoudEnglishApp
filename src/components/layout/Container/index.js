// src/components/layout/Container/index.js

import { View, StatusBar, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./style";
import PropTypes from 'prop-types'; // ✅ Ajout de l'import de PropTypes

/**
 * Conteneur principal pour les écrans de l'application
 * Assure la cohérence de la mise en page avec gestion des marges et du padding
 */
const Container = ({
  children,
  style,
  withScrollView = false,
  safeArea = true,
  statusBarColor = "#FFFFFF",
  statusBarStyle = "dark-content",
  withStatusBar = true,
  withPadding = true,
  backgroundColor = "#F9FAFB",
  gradientColors = null, // 🎨 NOUVEAU : Couleurs de gradient
  scrollViewProps = {},
  safeAreaEdges = ['top', 'left', 'right'],
  ...props
}) => {
  const WrapperComponent = safeArea ? SafeAreaView : View;

  const containerStyle = [
    styles.container,
    !gradientColors && { backgroundColor }, // 🎨 Background normal si pas de gradient
    withPadding && styles.withPadding,
    style,
  ];

  const safeAreaProps = safeArea ? {
    edges: safeAreaEdges,
    ...props
  } : {};

  const content = (
    <>
      {withStatusBar && (
        <StatusBar backgroundColor={statusBarColor} barStyle={statusBarStyle} />
      )}
      
      {withScrollView ? (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollViewContent,
            { paddingBottom: safeArea ? 34 : 0 }
          ]}
          showsVerticalScrollIndicator={false}
          {...scrollViewProps}
        >
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </>
  );

  // 🎨 RENDRE AVEC GRADIENT OU BACKGROUND NORMAL
  if (gradientColors) {
    return (
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.container, withPadding && styles.withPadding, style]}
      >
        <WrapperComponent 
          style={[styles.container, { backgroundColor: 'transparent' }]}
          {...safeAreaProps}
        >
          {content}
        </WrapperComponent>
      </LinearGradient>
    );
  }

  return (
    <WrapperComponent 
      style={containerStyle}
      {...safeAreaProps}
    >
      {content}
    </WrapperComponent>
  );
};

// ✅ Ajout de la validation des props
Container.propTypes = {
  // 'children' est manquant dans la validation
  children: PropTypes.node,
  // 'style' est manquant
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  // 'withScrollView' est manquant
  withScrollView: PropTypes.bool,
  // 'safeArea' est manquant
  safeArea: PropTypes.bool,
  // 'statusBarColor' est manquant
  statusBarColor: PropTypes.string,
  // 'statusBarStyle' est manquant
  statusBarStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content']),
  // 'withStatusBar' est manquant
  withStatusBar: PropTypes.bool,
  // 'withPadding' est manquant
  withPadding: PropTypes.bool,
  // 'backgroundColor' est manquant
  backgroundColor: PropTypes.string,
  // 'gradientColors' est manquant dans la validation
  gradientColors: PropTypes.arrayOf(PropTypes.string),
  // 'scrollViewProps' est manquant
  scrollViewProps: PropTypes.object,
  // 'safeAreaEdges' est manquant
  safeAreaEdges: PropTypes.arrayOf(PropTypes.oneOf(['top', 'bottom', 'left', 'right'])),
};

// ✅ Export des edges prédéfinis pour flexibilité
export const CONTAINER_SAFE_EDGES = {
  ALL: ['top', 'bottom', 'left', 'right'],
  NO_BOTTOM: ['top', 'left', 'right'],
  NO_TOP: ['bottom', 'left', 'right'],
  HORIZONTAL: ['left', 'right'],
  NONE: []
};

export default Container;