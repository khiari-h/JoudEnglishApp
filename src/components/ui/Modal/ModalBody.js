// src/components/ui/Modal/ModalBody.js
import React from "react";
import { View, ScrollView } from "react-native";
import PropTypes from 'prop-types';
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

ModalBody.propTypes = {
  children: PropTypes.node.isRequired,
  scrollable: PropTypes.bool,
  bodyStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};


