import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import styles from './style';

/**
 * Sélecteur de règles grammaticales
 * Affiche une liste horizontale de règles disponibles
 * 
 * @param {Array} rules - Liste des règles disponibles
 * @param {number} selectedIndex - Index de la règle sélectionnée
 * @param {function} onSelectRule - Fonction à appeler lors de la sélection d'une règle
 * @param {string} levelColor - Couleur du niveau actuel
 */
const GrammarRuleSelector = ({ 
  rules, 
  selectedIndex, 
  onSelectRule,
  levelColor = "#3b82f6" 
}) => {
  return (
    <View style={styles.ruleSelector}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.rulesContainer}
      >
        {rules.map((rule, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.ruleButton,
              selectedIndex === index && { borderColor: levelColor, borderWidth: 2 }
            ]}
            onPress={() => onSelectRule(index)}
          >
            <Text style={[
              styles.ruleButtonText,
              selectedIndex === index && { color: levelColor, fontWeight: '600' }
            ]}>
              {rule.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default GrammarRuleSelector;