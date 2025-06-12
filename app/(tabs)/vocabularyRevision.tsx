import { useRoute } from "@react-navigation/native";
import VocabularyRevision from "../../src/screens/VocabularyRevision";

export default function VocabularyRevisionScreen() {
  const route = useRoute();
  return <VocabularyRevision route={route} />;
}
