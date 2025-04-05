import { useRoute } from "@react-navigation/native";
import LevelSelection from "@/src/screens/LevelSelection";

export default function LevelSelectionScreen() {
  const route = useRoute();
  return <LevelSelection route={route} />;
}