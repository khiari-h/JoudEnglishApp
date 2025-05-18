import { useRoute } from "@react-navigation/native";
import ConversationExercise from "@/src/screens/exercises/conversations";

export default function ConversationExerciseScreen() {
  const route = useRoute();
  return <ConversationExercise route={route} />;
}
