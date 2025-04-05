import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "@/src/contexts/ThemeContext";
import styles from "./style";

/**
 * Composant Section modernisé pour diviser le contenu en sections
 */
const Section = ({
  children,
  title,
  subtitle,
  action,
  actionText,
  actionIcon,
  onActionPress,
  style,
  titleStyle,
  subtitleStyle,
  actionTextStyle,
  withSeparator = false,
  themeColor,
  withMargin = true,
}) => {
  // Récupération du contexte de thème
  const themeContext = useContext(ThemeContext);
  const colors = themeContext?.colors || { primary: "#5E60CE" };

  // Couleur principale (utilise la couleur passée en prop ou celle du thème)
  const primaryColor = themeColor || colors.primary;

  return (
    <View style={[styles.container, withMargin && { marginBottom: 24 }, style]}>
      {/* En-tête de section repensé */}
      {(title || action || actionText) && (
        <View style={styles.header}>
          {title && (
            <View style={styles.titleContainer}>
              {/* Indicateur visuel vertical */}
              <View
                style={[
                  styles.titleIndicator,
                  { backgroundColor: primaryColor },
                ]}
              />

              <View>
                <Text style={[styles.title, titleStyle]}>
                  {title.toUpperCase()}
                </Text>

                {subtitle && (
                  <Text style={[styles.subtitle, subtitleStyle]}>
                    {subtitle}
                  </Text>
                )}
              </View>
            </View>
          )}

          {/* Bouton d'action (personnalisable avec une icône) */}
          {(action || actionText) && (
            <TouchableOpacity
              onPress={onActionPress}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              {action ? (
                action
              ) : (
                <>
                  <Text
                    style={[
                      styles.actionText,
                      {
                        color: primaryColor,
                        backgroundColor: `${primaryColor}10`,
                      },
                      actionTextStyle,
                    ]}
                  >
                    {actionText}
                  </Text>

                  {actionIcon && (
                    <Ionicons
                      name={actionIcon}
                      size={14}
                      color={primaryColor}
                      style={{ marginLeft: 4 }}
                    />
                  )}
                </>
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
