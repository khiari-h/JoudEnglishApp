import { useRoute } from "@react-navigation/native";


export default function WordGamesExerciseScreen() {
  const route = useRoute();
  return <WordGames route={route} />;
}
