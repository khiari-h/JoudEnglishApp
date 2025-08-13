// src/components/ui/Modal/ModalBody.js
import React from "react";
import { View, ScrollView } from "react-native";
import styles from "./style";

export default function ModalBody({ children, scrollable, bodyStyle }) {
  if (scrollable) {
    return (
      <ScrollView
        style={[styles.scrollableBody, bodyStyle]}
        contentContainerStyle={styles.scrollableContent}
        showsVerticalScrollIndicator
      >
        {children}
      </ScrollView>
    );
  }

  return <View style={[styles.body, bodyStyle]}>{children}</View>;
}


