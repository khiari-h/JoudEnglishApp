// src/components/ui/Modal/ModalHeader.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from 'prop-types';
import styles from "./style";

export default function ModalHeader({ title, showCloseButton, onClose, headerStyle }) {
  if (!title && !showCloseButton) return null;
  return (
    <View style={[styles.header, headerStyle]}>
      <Text style={styles.title}>{title}</Text>
      {showCloseButton && (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          accessibilityRole="button"
          accessibilityLabel="Close modal"
        >
          <Ionicons name="close" size={24} color="#6B7280" />
        </TouchableOpacity>
      )}
    </View>
  );
}

ModalHeader.propTypes = {
  title: PropTypes.string,
  showCloseButton: PropTypes.bool,
  onClose: PropTypes.func,
  headerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};


