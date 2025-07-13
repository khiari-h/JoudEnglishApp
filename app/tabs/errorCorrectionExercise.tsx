import { useRoute } from "@react-navigation/native";


export default function ErrorCorrectionExerciseScreen() {
  const route = useRoute();
  return <ErrorCorrection route={route} />;
}
