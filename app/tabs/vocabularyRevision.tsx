import { useRoute } from "@react-navigation/native";


export default function VocabularyRevisionScreen() {
  const route = useRoute();
  return <VocabularyRevision route={route} />;
}
