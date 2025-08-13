# useExerciseListData

Prépare la liste des exercices pour `ExerciseSelection` (progression par exercice, filtration bonus, fast-vocab).

## API
- Entrée: `{ level, getExerciseProgress(exerciseId, level), hasProgress(exerciseId, level) }`
- Sortie: `{ levelInfo, exercises: Array<ExerciseCardData> }`

### ExerciseCardData
- `{ id, title, route, progress, hasProgress, color, icon, isFast }`

## Notes
- Calculs mémorisés avec `useMemo`.
- Pas d’effets; pure transformation.
