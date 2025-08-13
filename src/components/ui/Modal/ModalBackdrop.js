// src/components/ui/Modal/ModalBackdrop.js
import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import styles from "./style";

export default function ModalBackdrop({ backdropColor, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View testID="modal-backdrop" style={[styles.backdrop, { backgroundColor: backdropColor }]} />
    </TouchableWithoutFeedback>
  );
}


