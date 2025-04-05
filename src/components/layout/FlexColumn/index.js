// src/components/layout/FlexColumn/index.js
import React from "react";
import { View } from "react-native";
import styles from "./style";

/**
 * Composant de mise en page qui place ses enfants en colonne verticale
 * avec des options flexibles de disposition
 */
const FlexColumn = ({
  children,
  style,
  justifyContent = "flex-start", // flex-start, center, flex-end, space-between, space-around, space-evenly
  alignItems = "stretch", // flex-start, center, flex-end, stretch, baseline
  gap = 0, // Espacement entre les éléments
  padding = 0, // Padding global
  paddingHorizontal,
  paddingVertical,
  margin = 0, // Marge globale
  marginHorizontal,
  marginVertical,
  flex,
  width = "100%",
  backgroundColor,
}) => {
  // Construction du style avec les propriétés dynamiques
  const dynamicStyle = {
    justifyContent,
    alignItems,
    gap,
    padding,
    margin,
    width,
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
  if (flex !== undefined) dynamicStyle.flex = flex;
  if (backgroundColor !== undefined)
    dynamicStyle.backgroundColor = backgroundColor;

  return (
    <View style={[styles.container, dynamicStyle, style]}>{children}</View>
  );
};

export default FlexColumn;
