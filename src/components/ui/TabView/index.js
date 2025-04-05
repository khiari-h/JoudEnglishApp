// src/components/ui/TabView/index.js
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";

/**
 * Composant TabView pour afficher du contenu dans des onglets
 */
const TabView = ({
  // Données des onglets
  tabs = [],
  initialTab = 0,
  renderScene,

  // Styles et apparence
  style,
  tabBarStyle,
  tabStyle,
  activeTabStyle,
  tabTextStyle,
  activeTabTextStyle,
  indicatorStyle,
  contentContainerStyle,

  // Personnalisation
  tabBarPosition = "top", // 'top', 'bottom'
  variant = "default", // 'default', 'scrollable', 'fixed', 'icon'

  // Comportement
  swipeable = true,
  lazy = false,

  // Fonctions de rappel
  onTabChange,

  // Props additionnelles
  testID,
}) => {
  // États
  const [activeIndex, setActiveIndex] = useState(initialTab);
  const [loadedTabs, setLoadedTabs] = useState([initialTab]);
  const [contentWidth, setContentWidth] = useState(0);

  // Refs
  const scrollX = useRef(new Animated.Value(0)).current;
  const indicatorAnimation = useRef(new Animated.Value(initialTab)).current;
  const scrollViewRef = useRef(null);
  const tabScrollViewRef = useRef(null);

  // Largeur de l'écran
  const windowWidth = Dimensions.get("window").width;

  // Calculer la largeur de l'onglet en fonction de la variante
  const getTabWidth = () => {
    switch (variant) {
      case "scrollable":
        return null; // La largeur est déterminée par le contenu
      case "fixed":
        return windowWidth / tabs.length;
      case "icon":
        return 80; // Largeur fixe pour les onglets avec icônes
      case "default":
      default:
        return tabs.length <= 3 ? windowWidth / tabs.length : windowWidth / 3;
    }
  };

  const tabWidth = getTabWidth();

  // Animer l'indicateur lors du changement d'onglet
  useEffect(() => {
    Animated.spring(indicatorAnimation, {
      toValue: activeIndex,
      useNativeDriver: true,
      tension: 300,
      friction: 35,
    }).start();

    // Faire défiler l'onglet actif au centre (si scrollable)
    if (variant === "scrollable" && tabScrollViewRef.current) {
      tabScrollViewRef.current.scrollTo({
        x:
          activeIndex * (tabWidth || 100) -
          windowWidth / 2 +
          (tabWidth || 100) / 2,
        animated: true,
      });
    }

    // Ajouter l'onglet aux onglets chargés (pour le mode lazy)
    if (lazy && !loadedTabs.includes(activeIndex)) {
      setLoadedTabs([...loadedTabs, activeIndex]);
    }

    // Appeler le callback
    if (onTabChange) {
      onTabChange(activeIndex);
    }
  }, [activeIndex]);

  // Gérer le changement d'onglet
  const handleTabPress = (index) => {
    setActiveIndex(index);

    // Faire défiler le contenu si swipeable
    if (swipeable && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * contentWidth,
        animated: true,
      });
    }
  };

  // Gérer le défilement du contenu (pour le mode swipeable)
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  // Gérer la fin du défilement
  const handleScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / contentWidth);

    if (page !== activeIndex) {
      setActiveIndex(page);
    }
  };

  // Calculer la position de l'indicateur
  const getIndicatorTranslate = () => {
    if (variant === "scrollable") {
      // La position dépend du défilement du TabBar
      return indicatorAnimation.interpolate({
        inputRange: tabs.map((_, i) => i),
        outputRange: tabs.map((_, i) => i * (tabWidth || 100)),
        extrapolate: "clamp",
      });
    }

    // Position par défaut
    return indicatorAnimation.interpolate({
      inputRange: tabs.map((_, i) => i),
      outputRange: tabs.map(
        (_, i) => i * (tabWidth || windowWidth / tabs.length)
      ),
      extrapolate: "clamp",
    });
  };

  // Calculer la largeur de l'indicateur
  const getIndicatorWidth = () => {
    return tabWidth || windowWidth / tabs.length;
  };

  // Rendu de l'onglet
  const renderTab = (tab, index) => {
    const isActive = index === activeIndex;

    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.tab,
          tabWidth && { width: tabWidth },
          tabStyle,
          isActive && styles.activeTab,
          isActive && activeTabStyle,
        ]}
        onPress={() => handleTabPress(index)}
        testID={`tab-${index}`}
        accessibilityRole="tab"
        accessibilityState={{ selected: isActive }}
      >
        {tab.icon && (
          <Ionicons
            name={tab.icon}
            size={24}
            color={isActive ? "#5E60CE" : "#6B7280"}
            style={styles.tabIcon}
          />
        )}

        <Text
          style={[
            styles.tabText,
            variant === "icon" && styles.iconTabText,
            tabTextStyle,
            isActive && styles.activeTabText,
            isActive && activeTabTextStyle,
          ]}
          numberOfLines={1}
        >
          {tab.title || tab.label || `Onglet ${index + 1}`}
        </Text>
      </TouchableOpacity>
    );
  };

  // Rendu de la barre d'onglets
  const renderTabBar = () => {
    const tabBar = (
      <View style={[styles.tabBar, tabBarStyle]}>
        {variant === "scrollable" ? (
          <ScrollView
            ref={tabScrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollableTabContainer}
          >
            {tabs.map((tab, index) => renderTab(tab, index))}

            <Animated.View
              style={[
                styles.indicator,
                {
                  width: getIndicatorWidth(),
                  transform: [{ translateX: getIndicatorTranslate() }],
                },
                indicatorStyle,
              ]}
            />
          </ScrollView>
        ) : (
          <View style={styles.fixedTabContainer}>
            {tabs.map((tab, index) => renderTab(tab, index))}

            <Animated.View
              style={[
                styles.indicator,
                {
                  width: getIndicatorWidth(),
                  transform: [{ translateX: getIndicatorTranslate() }],
                },
                indicatorStyle,
              ]}
            />
          </View>
        )}
      </View>
    );

    return tabBar;
  };

  // Rendu du contenu
  const renderContent = () => {
    // Gérer le dimensionnement du contenu
    const handleLayout = (event) => {
      const { width } = event.nativeEvent.layout;
      setContentWidth(width);
    };

    // Rendu du contenu swipeable
    if (swipeable) {
      return (
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          scrollEnabled={swipeable}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleScrollEnd}
          scrollEventThrottle={16}
          contentContainerStyle={styles.swipeableContentContainer}
          style={styles.contentContainer}
          onLayout={handleLayout}
        >
          {tabs.map((tab, index) => (
            <View key={index} style={[styles.scene, { width: contentWidth }]}>
              {(!lazy || loadedTabs.includes(index)) &&
                renderScene({ route: tab, index })}
            </View>
          ))}
        </ScrollView>
      );
    }

    // Rendu du contenu non swipeable
    return (
      <View style={[styles.contentContainer, contentContainerStyle]}>
        {(!lazy || loadedTabs.includes(activeIndex)) &&
          renderScene({ route: tabs[activeIndex], index: activeIndex })}
      </View>
    );
  };

  return (
    <View style={[styles.container, style]} testID={testID}>
      {/* Afficher la barre d'onglets en haut ou en bas selon tabBarPosition */}
      {tabBarPosition === "top" && renderTabBar()}

      {/* Contenu des onglets */}
      {renderContent()}

      {/* Afficher la barre d'onglets en bas si nécessaire */}
      {tabBarPosition === "bottom" && renderTabBar()}
    </View>
  );
};

export default TabView;
