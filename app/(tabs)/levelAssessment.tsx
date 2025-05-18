import { useRoute } from "@react-navigation/native";
import LevelAssessment from "../../src/screens/exercises/level-assessment";

export default function LevelAssessmentScreen() {
  const route = useRoute();
  return <LevelAssessment route={route} />;
}
