import { useRoute } from "@react-navigation/native";
import ChatbotExercise from "@/src/screens/exercises/conversations";

export default function ConversationExerciseScreen() {
  const route = useRoute();
  return <ChatbotExercise route={route} />;
}
