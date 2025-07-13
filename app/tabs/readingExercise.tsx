import { useRoute } from "@react-navigation/native";


export default function ReadingExerciseScreen() {
  const route = useRoute();
  return <Reading route={route} />;
}
