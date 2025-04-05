// src/components/layout/Grid/index.js
import React from "react";
import { View, Dimensions } from "react-native";
import styles from "./style";

/**
 * Composant Grid pour organiser les éléments en disposition grille
 * avec un nombre de colonnes configurable
 */
const Grid = ({
  children,
  columns = 2,
  columnGap = 8,
  rowGap = 8,
  padding = 0,
  style,
  itemContainerStyle,
}) => {
  // Si enfants est null ou undefined, retourner null
  if (!children) {
    return null;
  }

  // Convertir en tableau si ce n'est pas déjà le cas
  const childrenArray = React.Children.toArray(children);

  // Créer des lignes de la grille
  const rows = [];

  // Calculer le nombre d'items par ligne
  const itemsPerRow = columns;

  // Calculer la largeur disponible (sans les espaces entre les colonnes)
  const windowWidth = Dimensions.get("window").width - padding * 2;
  const totalGapWidth = columnGap * (itemsPerRow - 1);
  const itemWidth = (windowWidth - totalGapWidth) / itemsPerRow;

  // Créer les rangées
  for (let i = 0; i < childrenArray.length; i += itemsPerRow) {
    const rowItems = childrenArray.slice(i, i + itemsPerRow);

    // Ajouter les items à une ligne
    const rowItemsWithWrapper = rowItems.map((child, index) => (
      <View
        key={index}
        style={[
          styles.itemWrapper,
          {
            width: itemWidth,
            marginRight: index < rowItems.length - 1 ? columnGap : 0,
          },
          itemContainerStyle,
        ]}
      >
        {child}
      </View>
    ));

    // Ajouter la ligne à la liste des lignes
    rows.push(
      <View
        key={i / itemsPerRow}
        style={[
          styles.row,
          { marginBottom: i + itemsPerRow < childrenArray.length ? rowGap : 0 },
        ]}
      >
        {rowItemsWithWrapper}
      </View>
    );
  }

  return <View style={[styles.container, { padding }, style]}>{rows}</View>;
};

export default Grid;
