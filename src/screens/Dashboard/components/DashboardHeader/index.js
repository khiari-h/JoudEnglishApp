import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../../../components/layout/Header";
import JoudLogo from "../JoudLogo";
import { ThemeContext } from "../../../../contexts/ThemeContext";

const DashboardHeader = ({ name, streak }) => {
  // Récupération sécurisée du contexte
  const themeContext = useContext(ThemeContext);

  // Utilisation de valeurs par défaut si le contexte est undefined
  const colors = themeContext?.colors || {
    primary: "#5E60CE", // Couleur par défaut
    background: "#FFFFFF",
  };

  return (
    <Header
      title=""
      showBackButton={false}
      backgroundColor={colors.primary}
      rightComponent={
        <View>
          <JoudLogo />
        </View>
      }
    >
      <View>
        <Text>Welcome back, {name}!</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="flame" size={24} color="#FFB830" />
          <Text>{streak} day streak!</Text>
        </View>
      </View>
    </Header>
  );
};

export default DashboardHeader;
