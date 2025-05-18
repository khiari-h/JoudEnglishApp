import { useRoute } from "@react-navigation/native";
import LevelSelection from "../../src/screens/LevelSelection";

export default function LevelSelectionScreen() {
  // Comme LevelSelection n'attend pas de prop route,
  // nous n'avons pas besoin de passer de paramètres
  return <LevelSelection />;
}
