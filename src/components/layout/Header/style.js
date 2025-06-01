// src/components/layout/Header/styles.js
import { StyleSheet, Platform, StatusBar, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 44 : StatusBar.currentHeight;
const HEADER_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    paddingTop: Platform.OS === "ios" ? STATUSBAR_HEIGHT : 0,
  },
  withShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  withBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  standardContainer: {
    height: HEADER_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  condensed: {
    height: Platform.OS === "ios" ? 40 : 48,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  condensedTitle: {
    fontSize: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -8,
  },
  rightButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: -8,
  },
  placeholderButton: {
    width: 32,
  },

  // Styles pour le mode titre large
  largeTitleContainer: {
    height: "auto",
    minHeight: HEADER_HEIGHT + STATUSBAR_HEIGHT + 44,
  },
  largeTitleWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: HEADER_HEIGHT,
  },
  largeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 0.35,
    marginTop: 8,
  },
  largeTitleSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 4,
    marginBottom: 8,
  },
  rightComponentContainer: {
    alignItems: "flex-end",
  },

  // Nouveaux styles
  bottomComponentContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  childrenContainer: {
    width: "100%",
  },

  // Styles pour les effets visuels
  gradientBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  wavyBottom: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    height: 20,
    zIndex: 1,
  },
});

export default styles;
