// src/components/ui/Select/index.js
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  FlatList,
  TextInput,
  Animated,
  Platform,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";

/**
 * Composant Select pour sélectionner une option parmi une liste
 */
const Select = ({
  // Options et sélection
  options = [],
  value,
  onChange,
  placeholder = "Sélectionner une option",

  // Apparence
  label,
  error,
  hint,
  required = false,
  variant = "outlined", // 'outlined', 'underlined', 'filled'
  size = "medium", // 'small', 'medium', 'large'
  dropdownPosition = "bottom", // 'bottom', 'top'

  // Comportement
  searchable = false,
  multiple = false,
  disabled = false,
  closeOnSelect = true,

  // Styles personnalisés
  style,
  inputStyle,
  labelStyle,
  errorStyle,
  hintStyle,
  dropdownStyle,
  optionStyle,
  selectedOptionStyle,
  placeholderStyle,

  // Personnalisation
  customDropdownIcon,
  renderOption,
  renderSelectedOption,
  keyExtractor = (item) => item.value?.toString() || item.toString(),
  labelExtractor = (item) => item.label || item.toString(),
  noOptionsText = "Aucune option disponible",
  searchPlaceholder = "Rechercher...",
  clearButtonLabel = "Effacer",
  multipleSelectionLabel = (count) =>
    `${count} option${count !== 1 ? "s" : ""} sélectionnée${
      count !== 1 ? "s" : ""
    }`,

  // Props additionnelles
  testID,
}) => {
  // États
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedValue, setSelectedValue] = useState(value); // État local pour gérer la sélection
  const [dropdownLayout, setDropdownLayout] = useState(null); // Position pour placer la liste déroulante

  // Refs
  const selectRef = useRef(null);
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Effet pour mettre à jour les options filtrées lorsque les options changent
  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  // Effet pour mettre à jour lorsque la valeur externe change
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  // Animation de rotation de l'icône de flèche
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: modalVisible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [modalVisible]);

  // Rotation de l'icône
  const arrowRotation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  // Fermer la modale
  const closeModal = () => {
    setModalVisible(false);
    setSearchQuery("");
    setFilteredOptions(options);
  };

  // Ouvrir la modale
  const openModal = () => {
    if (disabled) return;

    if (selectRef.current) {
      selectRef.current.measureInWindow((x, y, width, height) => {
        setDropdownLayout({ x, y, width, height });
        setModalVisible(true);
      });
    }
  };

  // Gérer la recherche
  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = options.filter((item) =>
      labelExtractor(item).toLowerCase().includes(text.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  // Gérer la sélection d'une option
  const handleSelectOption = (option) => {
    if (multiple) {
      // Mode multi-sélection
      let newValue;

      if (Array.isArray(selectedValue)) {
        const isSelected = selectedValue.some(
          (item) => keyExtractor(item) === keyExtractor(option)
        );

        if (isSelected) {
          newValue = selectedValue.filter(
            (item) => keyExtractor(item) !== keyExtractor(option)
          );
        } else {
          newValue = [...selectedValue, option];
        }
      } else {
        newValue = [option];
      }

      setSelectedValue(newValue);

      if (onChange) {
        onChange(newValue);
      }

      if (closeOnSelect) {
        closeModal();
      }
    } else {
      // Mode sélection unique
      setSelectedValue(option);

      if (onChange) {
        onChange(option);
      }

      closeModal();
    }
  };

  // Vérifier si une option est sélectionnée
  const isOptionSelected = (option) => {
    if (multiple && Array.isArray(selectedValue)) {
      return selectedValue.some(
        (item) => keyExtractor(item) === keyExtractor(option)
      );
    }

    if (!selectedValue) return false;

    return keyExtractor(option) === keyExtractor(selectedValue);
  };

  // Effacer la sélection
  const clearSelection = () => {
    setSelectedValue(multiple ? [] : null);

    if (onChange) {
      onChange(multiple ? [] : null);
    }

    closeModal();
  };

  // Déterminer le texte à afficher dans l'input
  const getDisplayText = () => {
    if (!selectedValue) {
      return placeholder;
    }

    if (multiple && Array.isArray(selectedValue)) {
      if (selectedValue.length === 0) {
        return placeholder;
      }

      if (renderSelectedOption && selectedValue.length === 1) {
        return renderSelectedOption(selectedValue[0]);
      }

      return multipleSelectionLabel(selectedValue.length);
    }

    if (renderSelectedOption) {
      return renderSelectedOption(selectedValue);
    }

    return labelExtractor(selectedValue);
  };

  // Déterminer si le placeholder doit être affiché
  const shouldShowPlaceholder =
    !selectedValue ||
    (multiple && Array.isArray(selectedValue) && selectedValue.length === 0);

  // Déterminer les styles de la variante
  const getVariantStyles = () => {
    switch (variant) {
      case "underlined":
        return {
          container: styles.underlinedContainer,
          error: styles.underlinedError,
        };
      case "filled":
        return {
          container: styles.filledContainer,
          error: styles.filledError,
        };
      case "outlined":
      default:
        return {
          container: styles.outlinedContainer,
          error: styles.outlinedError,
        };
    }
  };

  // Déterminer les styles de taille
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          container: styles.smallContainer,
          text: styles.smallText,
          icon: 16,
        };
      case "large":
        return {
          container: styles.largeContainer,
          text: styles.largeText,
          icon: 24,
        };
      case "medium":
      default:
        return {
          container: styles.mediumContainer,
          text: styles.mediumText,
          icon: 20,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  // Rendu de l'option
  const renderOptionItem = ({ item }) => {
    const selected = isOptionSelected(item);
    const optionKey = keyExtractor(item);
    const optionLabel = labelExtractor(item);

    if (renderOption) {
      return renderOption({
        item,
        selected,
        onSelect: () => handleSelectOption(item),
      });
    }

    return (
      <TouchableOpacity
        style={[
          styles.option,
          selected && styles.selectedOption,
          selected && selectedOptionStyle,
          optionStyle,
        ]}
        onPress={() => handleSelectOption(item)}
      >
        <Text
          style={[styles.optionText, selected && styles.selectedOptionText]}
        >
          {optionLabel}
        </Text>

        {selected && <Ionicons name="checkmark" size={18} color="#5E60CE" />}
      </TouchableOpacity>
    );
  };

  // Calcul de la position du dropdown
  const getDropdownPosition = () => {
    if (!dropdownLayout) return {};

    const { height: windowHeight } = Dimensions.get("window");
    const { y, height } = dropdownLayout;

    const spaceBelow = windowHeight - y - height;
    const spaceAbove = y;

    const position = {};

    if (
      dropdownPosition === "top" ||
      (dropdownPosition === "bottom" &&
        spaceBelow < 200 &&
        spaceAbove > spaceBelow)
    ) {
      // Positionner au-dessus
      position.bottom = windowHeight - y;
    } else {
      // Positionner en-dessous
      position.top = y + height;
    }

    position.left = dropdownLayout.x;
    position.width = dropdownLayout.width;

    return position;
  };

  return (
    <View style={[styles.container, style]} testID={testID}>
      {/* Label */}
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {required && <Text style={styles.requiredMark}>*</Text>}
        </Text>
      )}

      {/* Select Input */}
      <TouchableOpacity
        ref={selectRef}
        style={[
          styles.selectContainer,
          variantStyles.container,
          sizeStyles.container,
          error && variantStyles.error,
          disabled && styles.disabled,
          inputStyle,
        ]}
        onPress={openModal}
        disabled={disabled}
      >
        <Text
          style={[
            styles.selectText,
            sizeStyles.text,
            shouldShowPlaceholder && styles.placeholder,
            shouldShowPlaceholder && placeholderStyle,
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {getDisplayText()}
        </Text>

        <Animated.View style={{ transform: [{ rotate: arrowRotation }] }}>
          {customDropdownIcon || (
            <Ionicons
              name="chevron-down"
              size={sizeStyles.icon}
              color={disabled ? "#9CA3AF" : "#6B7280"}
            />
          )}
        </Animated.View>
      </TouchableOpacity>

      {/* Messages d'erreur ou d'indication */}
      {error && <Text style={[styles.errorText, errorStyle]}>{error}</Text>}

      {hint && !error && (
        <Text style={[styles.hintText, hintStyle]}>{hint}</Text>
      )}

      {/* Modal pour la liste d'options */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeModal}
        >
          <View style={[styles.dropdown, getDropdownPosition(), dropdownStyle]}>
            {/* Barre de recherche (si searchable) */}
            {searchable && (
              <View style={styles.searchContainer}>
                <Ionicons
                  name="search"
                  size={18}
                  color="#9CA3AF"
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChangeText={handleSearch}
                  
                  clearButtonMode="while-editing"
                />
              </View>
            )}

            {/* Liste d'options */}
            {filteredOptions.length > 0 ? (
              <FlatList
                data={filteredOptions}
                keyExtractor={keyExtractor}
                renderItem={renderOptionItem}
                contentContainerStyle={styles.optionsList}
                keyboardShouldPersistTaps="handled"
              />
            ) : (
              <Text style={styles.noOptionsText}>{noOptionsText}</Text>
            )}

            {/* Bouton pour effacer la sélection */}
            {selectedValue && !shouldShowPlaceholder && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearSelection}
              >
                <Text style={styles.clearButtonText}>{clearButtonLabel}</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Select;
