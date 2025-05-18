import { useRoute } from "@react-navigation/native";
import ConversationExercice from  "@/src/screens/exercises/conversationExercise";

export default function ConversationExerciseScreen() {
  const route = useRoute();
  return <ConversationExercise route={route} />;
}
