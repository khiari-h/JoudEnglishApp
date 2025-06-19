// src/components/popups/RevisionPopup/index.js - VERSION SIMPLE AVEC SCROLL
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContext } from '../../../contexts/ThemeContext';
import styles from './style';

const RevisionPopup = ({
  visible = false,
  totalWordsLearned = 50,
  questionsCount = 10,
  currentLevel = "mixed",
  onChoice,
  onDismiss,
}) => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext?.colors || {
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
  };

  const handleChoice = (choice) => {
    onChoice?.(choice);
  };

  if (!visible) return null;

  const choices = [
    {
      id: 'now',
      emoji: '⚡',
      title: 'Réviser maintenant',
      subtitle: `${questionsCount} questions • ~3 min`,
      color: '#10B981',
      primary: true
    },
    {
      id: 'later_50',
      emoji: '⏰',
      title: 'RDV dans 50 mots',
      subtitle: `Prochaine révision à ${totalWordsLearned + 50} mots`,
      color: '#3B82F6'
    },
    {
      id: 'later_100',
      emoji: '⏳',
      title: 'RDV dans 100 mots',
      subtitle: `Prochaine révision à ${totalWordsLearned + 100} mots`,
      color: '#F59E0B'
    },
    {
      id: 'disable',
      emoji: '❌',
      title: 'Pas de révision',
      subtitle: 'Désactiver les révisions automatiques',
      color: '#6B7280'
    }
  ];

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          
          {/* Header fixe */}
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.header}
          >
            <Text style={styles.celebration}>🎯</Text>
            <Text style={styles.mainTitle}>Time to réviser !</Text>
            <Text style={styles.wordsCounter}>
              {totalWordsLearned} mots appris
            </Text>
            <Text style={styles.motivation}>
              C'est le moment de consolider !
            </Text>
          </LinearGradient>

          {/* Contenu scrollable */}
          <ScrollView 
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Info rapide */}
            <View style={styles.infoSection}>
              <View style={styles.infoItem}>
                <Text style={styles.infoEmoji}>📚</Text>
                <Text style={styles.infoText}>{questionsCount} questions</Text>
              </View>
              <View style={styles.infoDivider} />
              <View style={styles.infoItem}>
                <Text style={styles.infoEmoji}>⏱️</Text>
                <Text style={styles.infoText}>~3 minutes</Text>
              </View>
              <View style={styles.infoDivider} />
              <View style={styles.infoItem}>
                <Text style={styles.infoEmoji}>🧠</Text>
                <Text style={styles.infoText}>Mémorisation</Text>
              </View>
            </View>

            {/* Choix */}
            <View style={styles.choicesContainer}>
              {choices.map((choice) => (
                <TouchableOpacity
                  key={choice.id}
                  style={[
                    styles.choiceButton,
                    { 
                      backgroundColor: choice.primary ? choice.color : colors.surface,
                      borderColor: choice.primary ? choice.color : '#E5E7EB'
                    }
                  ]}
                  onPress={() => handleChoice(choice.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.choiceContent}>
                    <Text style={styles.choiceEmoji}>{choice.emoji}</Text>
                    <View style={styles.choiceTexts}>
                      <Text style={[
                        styles.choiceTitle,
                        { color: choice.primary ? '#FFFFFF' : colors.text }
                      ]}>
                        {choice.title}
                      </Text>
                      <Text style={[
                        styles.choiceSubtitle,
                        { 
                          color: choice.primary 
                            ? 'rgba(255, 255, 255, 0.8)' 
                            : colors.textSecondary 
                        }
                      ]}>
                        {choice.subtitle}
                      </Text>
                    </View>
                    {choice.primary && (
                      <Text style={styles.primaryArrow}>→</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Note en bas */}
            <View style={styles.footerNote}>
              <Text style={[styles.noteText, { color: colors.textSecondary }]}>
                💡 Vous pouvez modifier ces préférences à tout moment
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default RevisionPopup;