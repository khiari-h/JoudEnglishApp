import { useRoute } from "@react-navigation/native";


export default function LevelAssessmentScreen() {
  const route = useRoute();
  return <LevelAssessment route={route} />;
}
