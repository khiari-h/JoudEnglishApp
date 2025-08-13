// src/components/ui/Modal/ModalFooter.js
import React from "react";
import { View } from "react-native";
import PropTypes from 'prop-types';
import styles from "./style";

export default function ModalFooter({ footer, footerStyle }) {
  if (!footer) return null;
  return <View style={[styles.footer, footerStyle]}>{footer}</View>;
}

ModalFooter.propTypes = {
  footer: PropTypes.node,
  footerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};


