// src/components/layout/FlexRow/index.js
import React from "react";
import { View } from "react-native";
import styles from "./style";

/**
 * Composant de mise en page qui place ses enfants en rangée horizontale
 * avec des options flexibles de disposition
 */
const FlexRow = ({
  children,
  style,
  justifyContent = "flex-start", // flex-start, center, flex-end, space-between, space-around, space-evenly
  alignItems = "center", // flex-start, center, flex-end, stretch, baseline
  wrap = false, // flex-wrap: nowrap | wrap
  gap = 0, // Espacement entre les éléments
  padding = 0, // Padding global
  paddingHorizontal,
  paddingVertical,
  margin = 0, // Marge globale
  marginHorizontal,
  marginVertical,
}) => {
  // Construction du style avec les propriétés dynamiques
  const dynamicStyle = {
    justifyContent,
    alignItems,
    flexWrap: wrap ? "wrap" : "nowrap",
    gap,
    padding,
    margin,
  };

  // Ajout des propriétés optionnelles si définies
  if (paddingHorizontal !== undefined)
    dynamicStyle.paddingHorizontal = paddingHorizontal;
  if (paddingVertical !== undefined)
    dynamicStyle.paddingVertical = paddingVertical;
  if (marginHorizontal !== undefined)
    dynamicStyle.marginHorizontal = marginHorizontal;
  if (marginVertical !== undefined)
    dynamicStyle.marginVertical = marginVertical;

  return (
    <View style={[styles.container, dynamicStyle, style]}>{children}</View>
  );
};

export default FlexRow;
