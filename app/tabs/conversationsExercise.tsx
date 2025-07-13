// app/(tabs)/conversationsExercise.tsx
import { useRoute } from "@react-navigation/native";


export default function ConversationsExerciseScreen() {
  const route = useRoute();
  return <ConversationsExercise route={route} />;
}
