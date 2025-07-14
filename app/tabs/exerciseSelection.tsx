// app/(tabs)/exerciseSelection.tsx
import { useCurrentLevel } from "../../src/contexts/CurrentLevelContext";
import ExerciseSelection from "../../src/screens/ExerciseSelection";

export default function ExerciseSelectionScreen() {
  const { currentLevel } = useCurrentLevel();

  return <ExerciseSelection level={currentLevel} />;
}
