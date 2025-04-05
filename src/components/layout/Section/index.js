// src/components/layout/Section/index.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";

/**
 * Composant Section pour diviser le contenu en sections avec titre et action optionnelle
 */
const Section = ({
  children,
  title,
  subtitle,
  action,
  actionText,
  onActionPress,
  style,
  titleStyle,
  subtitleStyle,
  actionTextStyle,
  withSeparator = false,
  withMargin = true,
}) => {
  return (
    <View style={[styles.container, withMargin && styles.withMargin, style]}>
      {/* En-tête de section avec titre et action optionnelle */}
      {(title || action) && (
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}

            {subtitle && (
              <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
            )}
          </View>

          {(action || actionText) && (
            <TouchableOpacity onPress={onActionPress}>
              {action ? (
                action
              ) : (
                <Text style={[styles.actionText, actionTextStyle]}>
                  {actionText}
                </Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Séparateur optionnel */}
      {withSeparator && <View style={styles.separator} />}

      {/* Contenu de la section */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default Section;
