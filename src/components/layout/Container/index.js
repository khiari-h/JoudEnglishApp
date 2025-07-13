// src/components/layout/Container/index.js


// ✅ CHANGEMENT : Utiliser SafeAreaView moderne au lieu du basique
import styles from "./style";

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
  scrollViewProps = {},
  // ✅ NOUVEAUX PROPS pour plus de contrôle SafeArea
  safeAreaEdges = ['top', 'left', 'right'], // Par défaut pas de bottom pour garder navigation
  ...props
}) => {
  // Déterminer le composant wrapper principal


  // Déterminer les styles principaux du conteneur
  const containerStyle = [
    styles.container,
    { backgroundColor },
    withPadding && styles.withPadding,
    style,
  ];

  // Props spécifiques pour SafeAreaView moderne
  const safeAreaProps = safeArea ? {
    edges: safeAreaEdges,
    ...props
  } : {};

  // Contenu à rendre
  const content = (
    <>
      {/* StatusBar conditionnelle */}
      {withStatusBar && (
        <StatusBar backgroundColor={statusBarColor} barStyle={statusBarStyle} />
      )}
      
      {withScrollView ? (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollViewContent,
            // ✅ Padding bottom pour home indicator
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

  return (
    <WrapperComponent 
      style={containerStyle}
      {...safeAreaProps}
    >
      {content}
    </WrapperComponent>
  );
};

export default Container;

// ✅ Export des edges prédéfinis pour flexibilité
export const CONTAINER_SAFE_EDGES = {
  ALL: ['top', 'bottom', 'left', 'right'],
  NO_BOTTOM: ['top', 'left', 'right'], // Pour garder navigation
  NO_TOP: ['bottom', 'left', 'right'],  // Pour modals avec header custom
  HORIZONTAL: ['left', 'right'],        // Juste les côtés
  NONE: []                              // Aucune SafeArea
};