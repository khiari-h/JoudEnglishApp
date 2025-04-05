
// src/components/layout/Container/index.js
import React from 'react';
import { View, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import styles from './styles';

/**
 * Conteneur principal pour les écrans de l'application
 * Assure la cohérence de la mise en page avec gestion des marges et du padding
 */
const Container = ({
  children,
  style,
  withScrollView = false,
  safeArea = true,
  statusBarColor = '#FFFFFF',
  statusBarStyle = 'dark-content',
  withPadding = true,
  backgroundColor = '#F9FAFB',
  scrollViewProps = {},
}) => {
  // Déterminer le composant wrapper principal (SafeAreaView ou View standard)
  const WrapperComponent = safeArea ? SafeAreaView : View;

  // Déterminer les styles principaux du conteneur
  const containerStyle = [
    styles.container,
    { backgroundColor },
    withPadding && styles.withPadding,
    style,
  ];

  // Contenu à rendre
  const content = (
    <>
      <StatusBar 
        backgroundColor={statusBarColor} 
        barStyle={statusBarStyle} 
      />
      {withScrollView ? (
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollViewContent}
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

  return (
    <WrapperComponent style={containerStyle}>
      {content}
    </WrapperComponent>
  );
};

export default Container;

