import { useRoute } from "@react-navigation/native";
import ErrorCorrection from "../../src/screens/exercises/errorCorrection";

export default function ErrorCorrectionExerciseScreen() {
  const route = useRoute();
  return <ErrorCorrection route={route} />;
}
