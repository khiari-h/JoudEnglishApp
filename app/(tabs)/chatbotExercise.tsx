import { useRoute } from "@react-navigation/native";
import ChatbotExercise from "@/src/screens/exercises/chatbot";

export default function ChatbotExerciseScreen() {
 const route = useRoute();
 return <ChatbotExercise route={route} />;
}