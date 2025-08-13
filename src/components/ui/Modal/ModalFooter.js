// src/components/ui/Modal/ModalFooter.js
import React from "react";
import { View } from "react-native";
import styles from "./style";

export default function ModalFooter({ footer, footerStyle }) {
  if (!footer) return null;
  return <View style={[styles.footer, footerStyle]}>{footer}</View>;
}


