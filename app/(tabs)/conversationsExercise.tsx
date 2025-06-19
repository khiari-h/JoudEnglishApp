// app/(tabs)/conversationsExercise.tsx
import { useRoute } from "@react-navigation/native";
import ConversationsExercise from "../../src/screens/exercises/conversations";

export default function ConversationsExerciseScreen() {
  const route = useRoute();
  return <ConversationsExercise route={route} />;
}
